// artifacts/api/ is the machine-readable companion to the types: the same signatures, descriptions,
// runnable examples and docs links the .d.ts JSDoc carries, but as JSON for tools that don't parse
// TypeScript (search indexes, RAG pipelines, AI agents).
//
// It is a tree, not one file. The previous single `artifacts/api-index.json` reached 6.3 MB /
// ~1.6M tokens - eight times a typical model context - so the one consumer it was built for could
// not read it, only grep fragments out of it. The layout below is sized for how an agent works:
// load a small index, then read exactly one detail file.
//
//   artifacts/api/index.json                     manifest: editors, counts, how to navigate (~1 KB)
//   artifacts/api/<editor>/index.json            every name -> signature for that editor (~20-40k tokens)
//   artifacts/api/<editor>/classes/<Class>.json  full detail for one class: docs, params, examples
//   artifacts/api/<editor>/classes/<Class>/      ...instead sharded per method when a class is huge
//   artifacts/api/<editor>/typedefs.json
//   artifacts/api/<editor>/events.json
//   artifacts/api/<editor>/executeMethods.json
//   artifacts/api/runtime.json                   AscPlugin/config/services (not per-editor)
//
// Each generator replaces its own section wholesale, so a renamed or removed member disappears on
// the next run instead of going stale.

const fs = require('fs');
const path = require('path');

const API_DIR = path.join(__dirname, '..', 'artifacts', 'api');

// A class detail file above this stops being "one small read" and gets sharded into per-method
// files. Only a handful of classes hit it - `ApiWorksheetFunction` is the Excel formula library with
// hundreds of members - but without the rule those few reintroduce exactly the problem this layout
// exists to solve.
const SHARD_THRESHOLD_BYTES = 80 * 1024;

function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortKeysDeep(value[key])]));
  }
  return value;
}

// This tree is not in the npm package, so it is normally reached by a raw.githubusercontent fetch,
// arriving with no way to learn that a guide exists, that `requires` marks a Developer Edition
// member, or that the runnable examples are in the .d.ts rather than here. The files a reader starts
// from therefore carry a pointer back to the guide: this manifest, each editor index, runtime.json.
//
// Only those seven. The member files - class details, per-method shards, typedefs/events/
// executeMethods - do not, for two reasons. The navigation they are reached through begins at an
// index that already carries the pointer; and repeating one identical line across 448 class files
// makes each of them open with something that is not about the class.
//
// Three of those shapes could not take it anyway: `typedefs.json`, `events.json` and
// `executeMethods.json` are keyed by member name, so an extra key reads as another member. Adding
// one there put a method called `agents` in word/executeMethods.json and shifted every count in the
// compact index by one, because buildEditorIndex counts what was written.
const AGENTS_GUIDE = 'https://raw.githubusercontent.com/ONLYOFFICE/doceditor-plugin-types/main/AGENTS.md';
const withGuide = (value) => ({ agents: AGENTS_GUIDE, ...value });

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(sortKeysDeep(value), null, 2)}\n`);
}

function removeIfExists(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function packageMeta() {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
  return { package: pkg.name, version: pkg.version };
}

// Names and signatures only - this is the file an agent is expected to hold in context, so it
// carries nothing beyond what answers "does this exist, and what is its shape".
//
// Classes are listed even when they have no methods of their own (56 of the 67 in the Forms
// namespace are exactly that - a documented shell whose members are inherited). Keying only off
// methods, as this first did, made those types unanswerable from the index: an agent scanning it
// would conclude `Forms.ApiChart` does not exist.
function buildEditorIndex(editorDir) {
  const classes = {};
  // `Class.method` for every object-model member that needs a paid edition - see the note on
  // `paidExecuteMethods` below for why this belongs in the compact index rather than only in the
  // detail files. Collected while walking the classes, so it cannot drift from what they say.
  const paidMethods = [];

  const classesDir = path.join(editorDir, 'classes');
  if (fs.existsSync(classesDir)) {
    for (const name of fs.readdirSync(classesDir)) {
      const full = path.join(classesDir, name);
      if (name.endsWith('.json')) {
        const cls = name.replace(/\.json$/, '');
        const data = JSON.parse(fs.readFileSync(full, 'utf8'));
        classes[cls] = Object.fromEntries(
          Object.entries(data.methods || {}).map(([method, m]) => {
            if (m.requires) paidMethods.push(`${cls}.${method}`);
            return [method, m.signature || ''];
          })
        );
      } else if (fs.statSync(full).isDirectory()) {
        classes[name] = {};
        for (const methodFile of fs.readdirSync(full)) {
          // `_class.json` holds the class's own prose, not a member.
          if (methodFile === '_class.json') continue;
          const data = JSON.parse(fs.readFileSync(path.join(full, methodFile), 'utf8'));
          const method = methodFile.replace(/\.json$/, '');
          if (data.requires) paidMethods.push(`${name}.${method}`);
          classes[name][method] = data.signature || '';
        }
      }
    }
  }
  paidMethods.sort();

  const readNames = (file) => (fs.existsSync(file)
    ? Object.keys(JSON.parse(fs.readFileSync(file, 'utf8')))
    : []);

  const executeMethodsFile = path.join(editorDir, 'executeMethods.json');
  const executeMethodsData = fs.existsSync(executeMethodsFile)
    ? JSON.parse(fs.readFileSync(executeMethodsFile, 'utf8'))
    : {};
  const executeMethods = Object.fromEntries(Object.entries(executeMethodsData)
    .map(([name, m]) => [name, m.signature || m.args || '']));

  // Which members need a paid edition, collected here rather than left for the reader to find by
  // opening every detail file. This index exists to be the one file an agent holds in context, and
  // recommending a licence-gated method to a Community Edition user produces code that compiles and
  // fails at runtime - so the answer has to be available at the same level as the names themselves.
  // Each method's own entry still carries the `requires` string naming the edition.
  const paidExecuteMethods = Object.entries(executeMethodsData)
    .filter(([, m]) => m.requires)
    .map(([name]) => name);

  return {
    classes,
    typedefs: readNames(path.join(editorDir, 'typedefs.json')),
    events: readNames(path.join(editorDir, 'events.json')),
    executeMethods,
    ...(paidExecuteMethods.length > 0 ? { paidExecuteMethods } : {}),
    // The object-model half of the same answer. It is the larger one by far - Cell's table and sort
    // classes alone are ~100 members - so leaving it out meant an agent reading this file could see
    // `ApiListObject.GetRange` and have no idea the whole class needs a paid build.
    ...(paidMethods.length > 0 ? { paidMethods } : {}),
  };
}

function rebuildRootIndex() {
  const editors = {};
  if (fs.existsSync(API_DIR)) {
    for (const editor of fs.readdirSync(API_DIR)) {
      const dir = path.join(API_DIR, editor);
      if (!fs.statSync(dir).isDirectory()) continue;
      const indexFile = path.join(dir, 'index.json');
      if (!fs.existsSync(indexFile)) continue;
      const index = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      const classes = index.classes || {};
      editors[editor] = {
        classes: Object.keys(classes).length,
        methods: Object.values(classes).reduce((n, ms) => n + Object.keys(ms).length, 0),
        typedefs: (index.typedefs || []).length,
        events: (index.events || []).length,
        executeMethods: Object.keys(index.executeMethods || {}).length,
      };
    }
  }

  writeJson(path.join(API_DIR, 'index.json'), withGuide({
    ...packageMeta(),
    howToUse: [
      'Load <editor>/index.json for every member name and signature in that editor.',
      'Then read one detail file: <editor>/classes/<Class>.json, or <editor>/classes/<Class>/<Method>.json when the class was sharded.',
      'executeMethod names live in <editor>/executeMethods.json; the plugin runtime (Asc.plugin, config.json) in runtime.json.',
      'Do not concatenate the tree - it is deliberately split so no single read is large.',
      'Runnable examples are not here - they are in each member\'s JSDoc in the .d.ts. `requires` marks a member absent from Community Edition builds.',
      `Read ${AGENTS_GUIDE} before working from this tree: it is what the "agents" field on this file, each editor index and runtime.json points at.`,
    ],
    editors,
  }));
}

function writeClasses(editorDir, classes) {
  const classesDir = path.join(editorDir, 'classes');
  removeIfExists(classesDir);

  for (const [name, data] of Object.entries(classes)) {
    const asOneFile = `${JSON.stringify(sortKeysDeep(data), null, 2)}\n`;
    if (Buffer.byteLength(asOneFile) <= SHARD_THRESHOLD_BYTES) {
      writeJson(path.join(classesDir, `${name}.json`), data);
      continue;
    }
    // Sharded: the class's own prose goes to _class.json, each method to its own file.
    const { methods = {}, ...classOwn } = data;
    writeJson(path.join(classesDir, name, '_class.json'), {
      ...classOwn,
      sharded: true,
      methodCount: Object.keys(methods).length,
    });
    for (const [method, m] of Object.entries(methods)) {
      writeJson(path.join(classesDir, name, `${method}.json`), m);
    }
  }
}

function mergeApiIndex(editor, sections) {
  const editorDir = path.join(API_DIR, editor);

  if (sections.classes) writeClasses(editorDir, sections.classes);
  for (const key of ['typedefs', 'events', 'executeMethods']) {
    if (!sections[key]) continue;
    writeJson(path.join(editorDir, `${key}.json`), sections[key]);
  }

  writeJson(path.join(editorDir, 'index.json'), withGuide(buildEditorIndex(editorDir)));
  rebuildRootIndex();
}

// The plugin runtime surface (Asc.plugin, config.json, the services bridge) is not per-editor, so it
// sits beside the editor directories rather than inside one.
function mergeRuntimeIndex(sections) {
  writeJson(path.join(API_DIR, 'runtime.json'), withGuide(sections));
  rebuildRootIndex();
}

module.exports = { mergeApiIndex, mergeRuntimeIndex, API_DIR };
