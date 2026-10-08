const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');
const { mergeApiIndex } = require('./api-index.js');

const PACKAGE_ROOT = path.join(__dirname, '..');

const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'src', 'generated');

// Runnable examples come from a checkout of the documentation site (api.onlyoffice.com), which is
// where they actually live: sdkjs's JSDoc carries only a `@see office-js-api/Examples/...` *path*,
// and the code sits in the docs repository. The page for a member is addressed by the same three
// segments as its `docsUrl`, so nothing here is guessed.
//
// This replaces the vendored `scripts/legacy-api/*.json` snapshots (9 MB), which were a pinned dump
// of the same site: they aged in place, covered four editors of five (PDF had none, and therefore no
// examples at all), and reached only 3003 members against 5831 available here.
const DOCS_SECTION_DIR = 'office-api/usage-api';
const DOCS_EDITOR_SECTION = {
  word: 'document-api',
  cell: 'spreadsheet-api',
  slide: 'presentation-api',
  forms: 'form-api',
  pdf: 'pdf-api',
};
const EDITORS = {
  word: { code: 'CDE', sources: ['word/apiBuilder.js', 'word/plugin-events.js'] },
  cell: { code: 'CSE', sources: ['word/apiBuilder.js', 'slide/apiBuilder.js', 'cell/apiBuilder.js', 'cell/plugin-events.js'] },
  slide: { code: 'CPE', sources: ['word/apiBuilder.js', 'slide/apiBuilder.js', 'slide/plugin-events.js'] },
  forms: { code: 'CFE', sources: ['word/apiBuilder.js', '../sdkjs-forms/apiBuilder.js', '../sdkjs-forms/plugin-events.js'] },
  pdf: { code: 'PDFE', sources: ['word/apiBuilder.js', 'pdf/apiBuilder.js', 'pdf/plugin-events.js'] },
};
const NAMESPACE_MAP = {
  word: 'Word',
  cell: 'Cell',
  slide: 'Slide',
  forms: 'Forms',
  pdf: 'Pdf',
};

// A handful of real, working editor events aren't documented via a `@event` JSDoc block anywhere
// (unlike everything plugin-events.js does document) - confirmed instead against the exact sdkjs
// call site that dispatches each one via `window.g_asc_plugins.onPluginEvent(name, ...)`.
const MANUAL_EVENTS = {
  word: {
    // word/Editor/Document.js CDocument.prototype.OnAttachParagraph/OnDetachParagraph
    onParagraphAdd: { params: [{ name: 'data', type: '{ InternalId: string }' }], description: 'Fired when a paragraph is added to the document.' },
    onParagraphRemove: { params: [{ name: 'data', type: '{ InternalId: string }' }], description: 'Fired when a paragraph is removed from the document.' },
    // word/Editor/Document.js CDocument.prototype.OnAttachContentControl/OnDetachContentControl
    onContentControlAdd: { params: [{ name: 'control', type: 'ContentControl' }], description: 'Fired when a content control is added to the document.' },
    onContentControlRemove: { params: [{ name: 'control', type: 'ContentControl' }], description: 'Fired when a content control is removed from the document.' },
  },
};

// Path resolution lives in ./resolve-paths.js - one SOURCES table shared by every script that
// reads outside this package, so a new source or a changed convention is a one-file edit.
const { resolveSdkjsPaths, resolveSdkjsExt, resolveDocsPath } = require('./resolve-paths.js');
const { isFromExt, developerEditionRequirement } = require('./ext-provenance.js');
const { PARAM_OPTIONAL_FROM, RETURN_TYPE_OVERRIDE } = require('./overrides-tables.js');
const { getGitMetadata, sha256File, packageVersion, assertSourcesReleasable } = require('./provenance.js');
const {
  DOC_WIDTH, htmlToMarkdown, withoutExamples, splitDescription, wrapText, cleanProse, taggedLines, renderJsDoc,
} = require('./render-jsdoc.js');

// The `## Example` section of a member's page, as fenced blocks. The fence carries an editor
// directive (```javascript editor-docx) that means nothing outside the docs site, so only the
// language survives - the same treatment the old snapshots' `document-builder={...}` got.
function docsExamples(file) {
  if (!fs.existsSync(file)) return [];
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n');
  const section = text.split(/^## Example\s*$/m)[1];
  if (!section) return [];
  // Stop at the next `## ` heading so a later section's code block isn't swept in.
  const body = section.split(/^## /m)[0];
  return [...body.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((m) => m[1].trim()).filter(Boolean);
}

// A licence note from the documentation site, as prose for the member's description, or null.
//
// Deliberately never an `@requires` tag. Every note in these trees restricts an argument *value*, not
// the call: `StartAction` works on any edition unless `type` is `"GroupActions"`, `CreateChart` only
// gates style ids above 48. Tagging the member would claim it is unavailable on Community Edition,
// which is false. `@requires` is reserved for provenance - see isFromExt.
function docsLicence(file) {
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, 'utf8').replace(/\r\n?/g, '\n');

  const blocks = text.matchAll(/^:::(?:note|info|caution|warning|danger)[^\n]*\n([\s\S]*?)^:::[ \t]*$/gm);
  for (const [, body] of blocks) {
    if (!/available only for/i.test(body)) continue;

    const editions = [...body.matchAll(/\[(ONLYOFFICE Docs [A-Za-z]+)\]/g)].map((m) => m[1]);
    if (editions.length === 0) continue;

    const sentence = body
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // `terms` is every parameter name AND every string literal in a parameter's type. Matching only
    // names was not enough: `StartAction`'s note reads "GroupActions are available only for
    // Enterprise and Developer", and `GroupActions` is a *value* of its `type` parameter
    // (`"Information" | "Block" | "GroupActions"`), not a parameter name. So the note is the
    // conditional kind - the call is free, one argument value is not - but the name-only check
    // missed it and tagged all ten StartAction/EndAction members as wholly paid, which is exactly
    // the false claim this guard exists to prevent.

    // Split rather than concatenate. The note names the editions and so does the tag, so joining
    // Returned as prose for the description, not as an `@requires` tag. Every note found in these
    // trees restricts an argument *value* rather than the call - see the call site in
    // generate-plugin-methods.js - so the sentence, which says exactly which behaviour is gated, is
    // the honest form. Tagging the method would claim it is unavailable on Community Edition.
    return sentence;
  }
  return null;
}

function docsMethodFile(docsRoot, editor, className, methodName) {
  return path.join(docsRoot, DOCS_SECTION_DIR, DOCS_EDITOR_SECTION[editor], className, 'Methods', `${methodName}.md`);
}

// Examples are appended to the description as fenced blocks rather than carried in their own field,
// because that is what `splitDescription` already lifts into `@example` for the declarations and
// into `examples` for artifacts/api - one representation, both consumers.
function applyDocsExamples(classes, editor, docsRoot) {
  let applied = 0;
  for (const [className, classData] of Object.entries(classes)) {
    for (const [methodName, method] of Object.entries(classData.methods)) {
      const examples = docsExamples(docsMethodFile(docsRoot, editor, className, methodName));
      if (examples.length === 0) continue;
      method.description = [method.description, ...examples.map((code) => `\`\`\`js\n${code}\n\`\`\``)]
        .filter(Boolean)
        .join('\n\n');
      applied += examples.length;
    }
  }
  return applied;
}


// sdkjs-ext declares whole object-model classes of its own under `js-api/<editor>/` -
// `ApiTableOfContents`, `ApiListObject`, `ApiSort`, `ApiDocumentVisitor` and friends. How many
// members that is today is `paidMethods` in each editor's `artifacts/api/<editor>/index.json`.
// sdkjs's own apiBuilder.js only *references* them (`ApiTableOfContents` appears twice there, as a
// return type; the class's 71 JSDoc lines live in ext), so reading sdkjs alone produced
// `export type ApiTableOfContents = unknown;` stubs - which is why `src/overrides/` had to declare
// several of them by hand.
//
// Reading ext directly replaces those hand-written stubs with generated declarations *and* makes the
// licence provenance derivable: a doclet whose `meta.path` is inside the ext checkout came from the
// commercial extensions, so it can be marked without a hardcoded name list.
// Deliberately no `forms` mapping. Forms shares `word/apiBuilder.js` with Word, so pointing it at
// `js-api/word` looked consistent - but every doclet there is tagged `@typeofeditors ["CDE"]` (or a
// list that still omits CFE), so the methods are all filtered out for Forms while the *classes*,
// which carry no editor tag, are not. The result was five empty `interface ApiTableOfContents {}`
// declarations in forms.ts, and an empty interface in TypeScript accepts any object - strictly worse
// than the class being absent.
function extJsApiSources(editor, paths) {
  if (!paths.sdkjsExt) return [];
  const dir = path.join(paths.sdkjsExt, 'js-api', editor);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith('.js')).sort()
    .map((file) => path.join(dir, file));
}

// `sdkjs-ext/<editor>/api_plugins.js` is the executeMethod surface, read here only for the typedefs
// it declares: `TextAnnotation` and `TextAnnotationRange` live there, while `apiBuilder.js` refers to
// them from its event documentation, so without this they stay unresolvable and need a hand-written
// stub in src/overrides/. The methods in the same file belong to the other generator and are dropped
// by their `pluginMethod_` naming - see `isPluginMethodDoclet`.
function extPluginSources(editor, paths) {
  if (!paths.sdkjsExt) return [];
  const file = path.join(paths.sdkjsExt, editor, 'api_plugins.js');
  return fs.existsSync(file) ? [file] : [];
}

function getSourcePaths(editor, paths) {
  const own = EDITORS[editor].sources.map((source) => (source.startsWith('../sdkjs-forms/')
    ? path.join(paths.sdkjsForms, source.slice('../sdkjs-forms/'.length))
    : path.join(paths.sdkjs, source)));
  return [...own, ...extJsApiSources(editor, paths), ...extPluginSources(editor, paths)];
}

function runJsdoc(sources) {
  const jsdoc = require.resolve('jsdoc/jsdoc.js');
  const result = spawnSync(process.execPath, [jsdoc, '-X', ...sources], {
    encoding: 'utf8',
    maxBuffer: 100 * 1024 * 1024,
  });

  if (result.status !== 0) throw new Error(result.stderr || 'JSDoc failed to generate doclets.');
  return JSON.parse(result.stdout);
}

function cleanName(name) {
  return name ? name.replace('<anonymous>~', '').replaceAll('"', '') : name;
}

function hasEditorTag(item, editorCode) {
  return item.tags?.some((tag) => tag.title === 'typeofeditors' && tag.value.includes(editorCode));
}

// A doclet from `sdkjs-ext/<editor>/api_plugins.js`. That file is read for its typedefs only: its
// methods are `executeMethod` names carrying `@memberof Api`, and `Api` is also the object model's
// entry class, so taking them at face value put `AnnotateParagraph`, `SetParagraphHtml` and five
// others on `Api` as if they were callable inside a `callCommand` body. They are not - they belong
// to the surface generate-plugin-methods.js builds.
function isPluginMethodDoclet(item) {
  return item.meta?.filename === 'api_plugins.js';
}

function filterDoclets(doclets, editorCode) {
  return doclets.filter((item) => {
    if (isPluginMethodDoclet(item)) return item.kind === 'typedef' && !item.name?.startsWith('_');
    if (item.kind === 'typedef' || item.kind === 'class') return !item.name?.startsWith('_');
    if (item.kind === 'event') return hasEditorTag(item, editorCode);
    if (item.kind !== 'function' && item.kind !== 'method') return false;
    return item.scope !== 'inner' && !item.longname?.includes('private') && hasEditorTag(item, editorCode);
  }).map((item) => ({
    ...item,
    name: cleanName(item.name),
    memberof: cleanName(item.memberof),
    longname: cleanName(item.longname),
  }));
}

function fetchApiDefinitions(paths) {
  const results = {};

  for (const [editor, config] of Object.entries(EDITORS)) {
    const sources = getSourcePaths(editor, paths);
    console.log(`Reading ${editor} JSDoc from ${sources.join(', ')}...`);
    results[editor] = filterDoclets(runJsdoc(sources), config.code);
  }

  return results;
}







const LF = String.fromCharCode(10);

function splitTopLevel(str, sep) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of str) {
    if (ch === '<') depth++;
    else if (ch === '>') depth--;
    if (ch === sep && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function parseTypeName(n) {
  if (!n || n === 'null') return 'null';
  if (n.startsWith('?')) return parseTypeName(n.slice(1));  // JSDoc nullable: ?Type -> Type
  if (n.endsWith(')[]') && n.startsWith('(')) return `(${parseTypeName(n.slice(1, -3))})[]`;
  if (n.endsWith('[]')) return `${parseTypeName(n.slice(0, -2))}[]`;
  if (n.startsWith('(') && n.endsWith(')')) return `(${parseTypeName(n.slice(1, -1))})`;
  if (n.startsWith('Array.<') && n.endsWith('>')) return `${parseTypeName(n.slice(7, -1))}[]`;
  if (n.startsWith('Array.')) return `${parseTypeName(n.slice(6))}[]`;
  if (n.includes('|')) return splitTopLevel(n, '|').map(parseTypeName).join(' | ');
  if (n === 'undefined') return 'undefined';
  // JSDoc's "any type" wildcard (`@property {*} FormValue`) - `unknown` keeps the package's no-`any`
  // guarantee while still accepting every value the runtime can put there.
  if (n === '*') return 'unknown';
  if (n === 'Number') return 'number';
  if (n === 'String') return 'string';
  if (n === 'Boolean') return 'boolean';
  if (n === 'bool') return 'boolean';
  if (n === 'Array' || n === 'array') return 'unknown[]';
  if (n === 'Object') return 'object';
  // Same reasoning as `*` just above - `@param {any}` is JSDoc's other spelling of "unconstrained",
  // and passing it through as literal `any` would be the one place left that could reintroduce it
  // into otherwise `any`-free output.
  if (n === 'any') return 'unknown';
  if (n === 'function' || n === 'Function') return '(...args: unknown[]) => unknown';
  // `twips`/`EMU`/`pt`/`mm`/`rad`/`percentage` are NOT collapsed to `number` here on purpose: sdkjs
  // declares each as a real `@typedef {number}` with prose explaining the unit ("Twentieths of a
  // point (equivalent to 1/1440th of an inch)"), and the generator emits those typedefs - collapsing
  // every use site to bare `number` shipped a documented alias that nothing referenced (`EMU` had 0
  // uses, `twips` 1) and dropped the unit from every hover. They all resolve to `number`, so keeping
  // the alias is purely additive. `byte` has no such typedef in the sources, so it still maps
  // directly.
  if (n === 'byte') return 'number';
  // `JSON` is not a type sdkjs declares anywhere - it is shorthand for "the serialized form",
  // and both sides of every ToJSON/FromJSON pair are strings: the documented examples all call
  // `JSON.parse` on the result. Mapped here rather than waited on, because the name appears 39
  // times across the four apiBuilder files; `{string}` in sdkjs is the proper fix and makes this
  // branch dead but harmless.
  if (n === 'JSON') return 'string';
  if (n === 'base64img') return 'string';
  if (n === 'range') return 'unknown';
  if (n.startsWith('"') && n.endsWith('"')) return n;
  if (n.startsWith('Array.<') && n.endsWith('>')) {
    const inner = n.slice(7, -1);
    return `${parseTypeName(inner)}[]`;
  }
  if (n.startsWith('Object.<') && n.endsWith('>')) {
    const inner = n.slice(8, -1);
    const parts = splitTopLevel(inner, ',');
    const keyType = parts[0] ? parseTypeName(parts[0]) : 'string';
    const valType = parts[1] ? parseTypeName(parts[1]) : 'unknown';
    return `Record<${keyType}, ${valType}>`;
  }
  return n;
}

// An options bag, rebuilt from the parameters jsdoc flattened out of it.
//
// sdkjs documents one the ordinary way - `@param {object} [options]` followed by
// `@param {boolean} [options.Numbering=true]`, over an implementation that takes a single
// argument. jsdoc reports those children as further entries in `params`, distinguished only by a
// dot in the name, and sanitizing that dot to an underscore turned each one into its own
// positional parameter: `GetText` came out with seven, of which six do not exist. The real one
// was left as bare `object`, so every field name and type was lost while `GetText({}, false)` -
// a call that silently does nothing - type-checked.
//
// Collapsed back into a record on the parent instead. Applied only to the shape actually present
// in the sources (one level deep, parent declared, no `name[].field` array syntax - all 100
// nested parameters across 19 members measured); anything else falls through to the old
// behaviour rather than being guessed at.
function optionsBagFields(children) {
  return children.map((child) => {
    const key = child.name.slice(child.name.indexOf('.') + 1);
    const safe = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
    const acceptsUndefined = child.type?.names?.includes('undefined');
    const names = acceptsUndefined
      ? child.type.names.filter((type) => type !== 'undefined')
      : child.type?.names;
    const type = withNullable(parseType(names?.length ? { ...child.type, names } : child.type), child);
    const optional = child.optional || child.defaultvalue !== undefined || acceptsUndefined;
    return `${safe}${optional ? '?' : ''}: ${type}`;
  }).join('; ');
}

// The bag parameter's own type, with the record substituted for its `object` member. `object` is
// usually the whole of it, but not always: ApiPresentation#Traverse takes `{object | boolean}`,
// where the boolean is a shorthand for "defaults", and only the object half describes the fields.
function optionsBagType(param, children) {
  const record = `{ ${optionsBagFields(children)} }`;
  const names = param.type?.names;
  if (!names || names.length === 0) return record;
  return names
    .map((name) => (name === 'object' || name === 'Object' ? record : parseTypeName(name)))
    .join(' | ');
}

// Groups `params` into the bags that can be collapsed and the entries to emit.
//
// `docParams` keeps every original entry, dotted names and all: the field prose and `@default`
// values belong in the member's JSDoc, and collapsing the signature should not throw them away.
function groupOptionsBags(params) {
  const children = new Map();
  for (const param of params) {
    if (typeof param.name !== 'string') continue;
    const dot = param.name.indexOf('.');
    if (dot === -1) continue;
    const bag = param.name.slice(0, dot);
    if (!children.has(bag)) children.set(bag, []);
    children.get(bag).push(param);
  }

  const bags = new Map();
  for (const [bag, entries] of children) {
    const parent = params.find((param) => param.name === bag);
    const simple = entries.every((entry) => entry.name.split('.').length === 2 && !entry.name.includes('['));
    if (parent && simple) bags.set(bag, entries);
  }

  const emitted = params.filter((param) => {
    if (typeof param.name !== 'string') return true;
    const dot = param.name.indexOf('.');
    return dot === -1 || !bags.has(param.name.slice(0, dot));
  });

  return { bags, emitted };
}

// Which RETURN_TYPE_OVERRIDE entries were actually applied, and which turned out to be obsolete
// because sdkjs now documents a real type there. Module-level because the gate runs once, after
// every editor: an entry only used by `slide` must not look unused while `word` is being built.
const returnOverridesApplied = new Set();
const returnOverridesLanded = new Map();

function parseType(typeObj) {
  if (!typeObj || !typeObj.names) return 'unknown';
  return typeObj.names.map(parseTypeName).join(' | ');
}

// jsdoc normalizes the nullable prefix on both `@returns` and `@param`: `{?ApiComment}` arrives as a clean
// `type.names: ["ApiComment"]` plus a separate `nullable: true` flag, so the `?` never reaches
// `parseType` and the nullability was being dropped on the floor. What that cost is visible on
// `Api.GetByInternalId` - `@returns {?(ApiDocument | ...)}` over an implementation whose first
// branch is `if (!obj) return null` - and on `ApiRange#AddComment`, whose own `@returns` prose
// reads "Returns null if the comment was not added" while the emitted type promised an
// `ApiComment`. Both made the correct `if (obj)` guard look redundant to the compiler.
//
// The other spelling, `{ApiParagraph | null}`, already arrives as a `null` member of `type.names`
// and is handled by `parseTypeName`; this only covers the flag form. `unknown` and `void` already
// admit null, so appending there would be noise.
function withNullable(type, entry) {
  if (!entry || entry.nullable !== true) return type;
  if (type === 'unknown' || type === 'void' || type === 'null') return type;
  if (splitTopLevel(type, '|').includes('null')) return type;
  return `${type} | null`;
}

// sdkjs writes some returns as an inline record - `@returns {{r: byte, g: byte, b: byte, a: byte}}`
// on `GetRGBA`, `{{Type: LineEndType, Width: LineEndSize, Length: LineEndSize} | null}` on the arrow
// getters. jsdoc parses the braces and then throws the shape away: the doclet's `type.names` is just
// `["Object"]`, so going through `parseType` alone turned a fully documented shape into bare
// `object`. The shape is still in the doclet's raw `comment`, so it is recovered from there.
//
// Deliberately narrow. Only a brace-balanced record of `name: Type` pairs is accepted - no nested
// records, no optional-key syntax - and anything else falls back to whatever `parseType` said. A
// half-understood shape would be worse than the honest `object` it replaces.
// Splits a JSDoc type expression on top-level `|`, respecting `{}`, `()`, `<>` and `[]`.
function splitUnion(expr) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of expr) {
    if (ch === '{' || ch === '(' || ch === '<' || ch === '[') depth += 1;
    else if (ch === '}' || ch === ')' || ch === '>' || ch === ']') depth -= 1;
    if (ch === '|' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

// Splits a record body on top-level `,` or `;`, respecting nesting.
function splitFields(body) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const ch of body) {
    if (ch === '{' || ch === '(' || ch === '<' || ch === '[') depth += 1;
    else if (ch === '}' || ch === ')' || ch === '>' || ch === ']') depth -= 1;
    if ((ch === ',' || ch === ';') && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

// One JSDoc type expression to TypeScript, recovering the inline record shapes jsdoc throws away.
//
// jsdoc parses `{{r: byte, g: byte}}` and then reports the doclet's `type.names` as plain
// `["Object"]`, so anything that goes through `parseType` alone loses the shape. The text survives
// in the doclet's raw `comment`, which is what this reads.
//
// Returns null when the expression is not one it fully understands, and every caller falls back to
// `parseType`. A half-understood shape would be worse than the honest `object` it replaces, so the
// rule is all-or-nothing per expression: one unparsable field and the whole record is declined.
//
// Handles a record anywhere in a union and records nested inside records, because sdkjs writes
// both: `ApiFormRoles#GetRoleColor` is `{null | {r:byte, g:byte, b:byte}}` and the `ContentControl`
// typedef has `{{Color: {R: number, G: number, B: number, A: number}}}`. An earlier version took
// only a record that was the entire expression and bailed on any inner `{`, which left those as
// `object` even though sdkjs documents them in full.
function jsdocTypeToTs(expr) {
  const text = String(expr || '').trim();
  if (!text) return null;

  const members = splitUnion(text);
  if (members.length === 0) return null;
  if (members.length > 1) {
    const parts = members.map(jsdocTypeToTs);
    if (parts.some((part) => part === null)) return null;
    return parts.join(' | ');
  }

  const single = members[0];
  if (!single.startsWith('{')) {
    // Not a record - `parseTypeName` already covers arrays, Array.<>, Object.<>, primitives.
    if (single.includes('{')) return null;
    return parseTypeName(single);
  }
  if (!single.endsWith('}')) return null;

  const fields = [];
  for (const part of splitFields(single.slice(1, -1))) {
    const match = /^([A-Za-z_$][A-Za-z0-9_$]*)(\?)?\s*:\s*([\s\S]+)$/.exec(part.trim());
    if (!match) return null;
    const type = jsdocTypeToTs(match[3]);
    if (type === null) return null;
    fields.push(`${match[1]}${match[2] ? '?' : ''}: ${type}`);
  }
  if (fields.length === 0) return null;
  return `{ ${fields.join('; ')} }`;
}

// The raw `{...}` type expression of a tag in a doclet comment, brace-balanced.
//
// `name` selects one `@property` or `@param` out of several; omit it for `@returns`. The comment is
// unwrapped first - a tag can span lines, each continued line starting with ` * `.
function tagTypeExpression(comment, tag, name) {
  if (!comment) return null;
  const flat = comment.replace(/\r?\n\s*\*?[ \t]?/g, ' ');
  const marker = `@${tag}`;
  let from = 0;
  for (;;) {
    const at = flat.indexOf(marker, from);
    if (at === -1) return null;
    from = at + marker.length;
    const open = flat.indexOf('{', at);
    if (open === -1) return null;

    let depth = 0;
    let close = -1;
    for (let i = open; i < flat.length; i += 1) {
      if (flat[i] === '{') depth += 1;
      else if (flat[i] === '}') {
        depth -= 1;
        if (depth === 0) { close = i; break; }
      }
    }
    if (close === -1) return null;

    if (!name) return flat.slice(open + 1, close).trim();
    // `@property {Type} [Color] - prose` / `@property {Type} Color - prose`
    const after = flat.slice(close + 1).trimStart();
    const declared = /^\[?([A-Za-z_$][A-Za-z0-9_$.]*)/.exec(after);
    if (declared && declared[1] === name) return flat.slice(open + 1, close).trim();
  }
}

// Back-compatible entry point: the recovered type for a tag, or null to fall back to `parseType`.
function inlineRecordType(comment, tag, name) {
  const expr = tagTypeExpression(comment, tag, name);
  if (expr === null || expr === undefined) return null;
  if (!expr.includes('{')) return null;   // nothing jsdoc lost - let parseType handle it
  return jsdocTypeToTs(expr);
}

// Every documented sdkjs member carries a `@see office-js-api/Examples/<Editor>/<Class>/Methods/<Method>.js`
// tag pointing at its runnable example in ONLYOFFICE's docs repository. Those same three segments
// address the public reference page for that member, so a stable api.onlyoffice.com link can be
// derived from data already in the doclet - no per-class URL table to maintain and nothing to guess
// (a hand-built URL for an undocumented member would be a 404 in every hover tooltip).
const DOCS_BASE = 'https://api.onlyoffice.com/docs/office-api/usage-api';
const DOCS_SECTIONS = {
  Word: 'document-api',
  Cell: 'spreadsheet-api',
  Slide: 'presentation-api',
  Forms: 'form-api',
  Form: 'form-api',
  Pdf: 'pdf-api',
};

// sdkjs writes the editor segment as a literal `{Editor}` placeholder
// (`office-js-api/Examples/{Editor}/Api/Methods/GetDocument.js`) which the docs pipeline fills in
// per editor. Without substituting it here the path simply failed to parse, so `docsUrl` came from
// the pinned snapshot instead of from sdkjs - which is why PDF, the one editor with no snapshot, had
// no documentation links at all despite sdkjs carrying 536 such paths for it. `Editor` is the
// generator's current editor; `Forms` maps to the form-api section, which is where the docs put
// every Forms class that has methods of its own.
const EDITOR_SEGMENT = { word: 'Word', cell: 'Cell', slide: 'Slide', forms: 'Forms', pdf: 'Pdf' };

function parseSeeEntry(see, editor) {
  const placeholder = EDITOR_SEGMENT[editor];
  for (const raw of (Array.isArray(see) ? see : [see])) {
    const entry = String(raw || '').replace(/\{Editor\}/g, placeholder || '');
    const match = /Examples\/([A-Za-z]+)\/([A-Za-z0-9_]+)\/Methods\/([A-Za-z0-9_]+)\.js/.exec(entry);
    // "Enumerations" is a real segment here, but typedefs have no per-editor reference page.
    if (match && DOCS_SECTIONS[match[1]]) {
      return { section: DOCS_SECTIONS[match[1]], className: match[2], methodName: match[3] };
    }
  }
  return null;
}

function methodDocsUrl(see, editor) {
  const parsed = parseSeeEntry(see, editor);
  // A `constructor.js` example documents the class itself, not a callable member - the reference
  // site has no /Methods/constructor/ page for it.
  if (!parsed || parsed.methodName === 'constructor') return '';
  return `${DOCS_BASE}/${parsed.section}/${parsed.className}/Methods/${parsed.methodName}/`;
}

function classDocsUrl(see, editor) {
  const parsed = parseSeeEntry(see, editor);
  return parsed ? `${DOCS_BASE}/${parsed.section}/${parsed.className}/` : '';
}

// A single flattened signature ("every param from the first optional one onward is optional") is
// correct whenever a method's own per-param optionality is monotonic (once optional, stays
// optional) - the common case, and the only shape a plain `extends`-free TS signature can express
// anyway. Real sdkjs methods occasionally break that: `ApiDrawing#SetRelativeHeight(relativeFrom?,
// percent)` takes an optional leading param followed by a required one, so real calls come in two
// shapes - `SetRelativeHeight(50)` and `SetRelativeHeight(relativeFromH, 50)` - that the flattened
// `(relativeFrom?, percent?)` signature can't distinguish (it wrongly also accepts zero args).
// Exactly one such "optional run closed by a later required param" is a well-defined, common
// pattern (a skippable leading/middle argument) with an unambiguous two-overload fix: one signature
// with just the required params, one with everything (the previously-optional run pinned back to
// required, since this specific call shape needs it). Two or more such gaps (e.g. two independent
// optional flag+value pairs) don't have an unambiguous decomposition into two overloads without
// knowing which combinations the implementation actually accepts - those keep the single flattened
// signature rather than risk generating an incomplete or wrong overload set.
function buildOverloadParams(params, ownOptional) {
  let gapRegions = 0;
  let inOptionalRun = false;
  for (const isOpt of ownOptional) {
    if (isOpt) inOptionalRun = true;
    else if (inOptionalRun) { gapRegions += 1; inOptionalRun = false; }
  }
  if (gapRegions !== 1) return null;

  const lastRequiredIndex = ownOptional.reduce((last, isOpt, i) => (isOpt ? last : i), -1);
  // Params retain the flattened/cascaded `optional` value from `params` (true for a required param
  // that merely comes after an earlier optional one) - both overloads below need to override it
  // explicitly rather than trust that value, which is exactly the ambiguity being resolved here.
  const requiredOnly = params.filter((_, i) => !ownOptional[i]).map((p) => ({ ...p, optional: false }));
  const anchored = params.map((p, i) => ({ ...p, optional: i > lastRequiredIndex && ownOptional[i] }));
  return [requiredOnly, anchored];
}

const DEVELOPER_EDITION_REQUIREMENT = developerEditionRequirement('member');

function extractClasses(data, editor, extRoot) {
  const classes = {};

  for (const item of data) {
    if (item.kind === 'class' && item.name && !item.name.startsWith('_')) {
      const className = item.name;
      classes[className] = {
        description: item.description || '',
        since: item.since || '',
        deprecated: item.deprecated || '',
        docsUrl: classDocsUrl(item.see, editor),
        requires: isFromExt(item, extRoot) ? DEVELOPER_EDITION_REQUIREMENT : '',
        // sdkjs classes commonly do `ApiOleObject.prototype = Object.create(ApiDrawing.prototype)`
        // and JSDoc-tag the relationship with `@extends {ApiDrawing}` (-> `augments` here) -
        // without modeling that as a real TS `extends`, every method tagged `@memberof ApiDrawing`
        // (there are dozens, shared across every drawing-like class in each editor) would silently
        // be missing from ApiOleObject/ApiShape/ApiImage/etc.
        extends: item.augments || [],
        methods: {},
        properties: {}
      };
    }
  }

  for (const item of data) {
    if ((item.kind === 'function' || item.kind === 'method') && item.name && item.memberof) {
      const className = item.memberof.replace('#', '');
      if (classes[className]) {
        // office-js-api-declarations sometimes lists the same method twice for a class — once with
        // a properly parsed @returns tag, once more with a malformed one (parsedType: null) whose
        // type was actually scraped from an unrelated method (e.g. ApiRun#GetClassType's second
        // entry claims "textPr", copied from ApiTextPr#GetClassType, instead of the real "run").
        // The malformed duplicate always comes second, so once a method has a good entry recorded,
        // skip any further entry whose return type didn't parse cleanly rather than let it clobber
        // the correct one.
        const alreadyRecorded = classes[className].methods[item.name];
        const firstReturnType = item.returns && item.returns[0] && item.returns[0].type;
        const parsedCleanly = !firstReturnType || firstReturnType.parsedType != null;
        if (alreadyRecorded && !parsedCleanly) continue;

        const seenNames = new Set();
        let hasOptional = false;
        const ownOptional = [];
        // Index from which sdkjs's own JSDoc is wrong about a parameter being required - see
        // PARAM_OPTIONAL_FROM. `Infinity` when there is no correction for this member.
        const optionalFrom = PARAM_OPTIONAL_FROM[`${className}.${item.name}`] ?? Infinity;
        const { bags: optionsBags, emitted: emittedParams } = groupOptionsBags(item.params || []);
        const params = emittedParams.map(p => {
          let name = p.name.replace(/[^a-zA-Z0-9_$]/g, '_');
          if (seenNames.has(name)) {
            let i = 2;
            while (seenNames.has(`${name}_${i}`)) i++;
            name = `${name}_${i}`;
          }
          seenNames.add(name);
          const acceptsUndefined = p.type?.names?.includes('undefined');
          // `@param {?twips} nValue` is nullable, and that is all it is - the parameter stays
          // required and gains `null` as an accepted value. This used to read the nullable prefix
          // as "may be omitted" and mark the parameter optional, on the strength of one member
          // (ApiPresentation#AddSlide: "If not specified, the slide will be added to the end").
          // That generalization does not hold: ApiTablePr#SetCellSpacing documents `"Null" means
          // that no spacing will be applied` over an implementation whose only branch is
          // `if (null === nValue)`, which `undefined` never reaches - omitting the argument is a
          // different call, not a shorter spelling of the same one. Members where sdkjs really does
          // accept both spellings say so (ApiParagraph#SetNumbering checks `undefined ===
          // numberingLevel || null === numberingLevel`) and are corrected per member via
          // PARAM_OPTIONAL_FROM, which is where a judgement about one member's arity belongs.
          //
          // The test it was written against never ran, either: jsdoc normalizes the prefix into a
          // `nullable: true` flag and strips the `?` from `type.names`, so the old
          // `names.some(n => n.startsWith('?'))` matched 0 of the 128 nullable parameters in the
          // sources. Removing it is behaviour-preserving; the `| null` on the type is the new part.
          const isOwnOptional = Boolean(p.optional || p.defaultvalue !== undefined || acceptsUndefined)
            || ownOptional.length >= optionalFrom;
          ownOptional.push(isOwnOptional);
          if (isOwnOptional) hasOptional = true;
          const names = acceptsUndefined ? p.type.names.filter(type => type !== 'undefined') : p.type?.names;
          return {
            name,
            type: optionsBags.has(p.name)
              ? optionsBagType(p, optionsBags.get(p.name))
              : withNullable(parseType(names?.length ? { ...p.type, names } : p.type), p),
            optional: hasOptional,
            defaultValue: p.defaultvalue,
            description: p.description || '',
          };
        });

        const overrideKey = `${editor}.${className}.${item.name}`;
        const documentedReturn = item.returns && item.returns.length > 0
          ? withNullable(
              inlineRecordType(item.comment, 'returns') || parseType(item.returns[0].type),
              item.returns[0],
            )
          : 'void';
        // RETURN_TYPE_OVERRIDE only speaks about returns sdkjs documents as `object`. Anything else
        // there means the upstream fix has landed and the entry is now shadowing a real annotation,
        // which the gate below reports instead of letting it pass.
        let returnType = documentedReturn;
        if (overrideKey in RETURN_TYPE_OVERRIDE) {
          if (/^(?:object|Object)(?: \| null)?$/.test(documentedReturn)) {
            returnType = RETURN_TYPE_OVERRIDE[overrideKey];
            returnOverridesApplied.add(overrideKey);
          } else {
            returnOverridesLanded.set(overrideKey, documentedReturn);
          }
        }

        // Every original entry, including the ones folded into a bag above - renderJsDoc reads this
        // so the per-field descriptions and defaults survive the collapse.
        const docParams = optionsBags.size === 0 ? null : (item.params || []).map(p => ({
          name: p.name,
          defaultValue: p.defaultvalue,
          description: p.description || '',
        }));

        classes[className].methods[item.name] = {
          params,
          docParams,
          overloadParams: buildOverloadParams(params, ownOptional),
          returnType,
          description: item.description || '',
          returnDescription: (item.returns && item.returns[0] && item.returns[0].description) || '',
          since: item.since || '',
          deprecated: item.deprecated || '',
          docsUrl: methodDocsUrl(item.see, editor),
          see: item.see || [],
          requires: isFromExt(item, extRoot) ? DEVELOPER_EDITION_REQUIREMENT : '',
        };
      }
    }

    if (item.kind === 'member' && item.name && item.memberof) {
      const className = item.memberof.replace('#', '');
      if (classes[className]) {
        classes[className].properties[item.name] = {
          // `unknown`, not `any`: a property with no `@type` tag at all is exactly as unknown as a
          // documented `{*}`/`{any}` one (see parseTypeName) - defaulting to `any` here would be a
          // silent, untested way for real `any` to reappear in otherwise `any`-free output.
          type: item.type ? parseType(item.type) : 'unknown',
          description: item.description || '',
          optional: item.optional || false
        };
      }
    }
  }

  // A class doclet itself rarely carries a `@see` example path, but every one of its members does,
  // and each such path names the class - so its reference page can be derived from any member.
  for (const classData of Object.values(classes)) {
    if (classData.docsUrl) continue;
    for (const method of Object.values(classData.methods)) {
      const url = classDocsUrl(method.see, editor);
      if (url) {
        classData.docsUrl = url;
        break;
      }
    }
  }

  return classes;
}

function extractTypedefs(data) {
  const typedefs = {};
  for (const item of data) {
    if (item.kind === 'typedef' && item.name && !item.name.startsWith('_')) {
      const hasProps = item.properties && item.properties.length > 0;
      typedefs[item.name] = {
        description: item.description || '',
        since: item.since || '',
        deprecated: item.deprecated || '',
        type: hasProps ? null : parseType(item.type),
        properties: hasProps ? item.properties.map(p => ({
          name: p.name,
          // Same inline-record recovery as `@returns`: the ContentControl typedef documents
          // `@property {{Color: {R: number, G: number, B: number, A: number}}} [Border]`, which
          // jsdoc flattens to `Object` before the generator ever sees it.
          type: inlineRecordType(item.comment, 'property', p.name)
            || withNullable(parseType(p.type), p),
          optional: p.optional || false,
          description: p.description || ''
        })) : []
      };
    }
  }
  return typedefs;
}

function extractEvents(data, manualEvents) {
  const events = { ...manualEvents };

  for (const item of data) {
    if (item.kind !== 'event' || !item.name) continue;

    // A nested field of an object param shows up two different ways depending on which JSDoc tag
    // documented it: a repeated `@param {number} data.slideIndex` lands in `params` (dotted name),
    // while `@property {string} data.paragraphId` (used alongside a single `@param {Object} data`)
    // lands in the separate `properties` array instead - merge both before grouping.
    const allParams = [...(item.params || []), ...(item.properties || [])];
    const topLevel = allParams.filter((p) => !p.name.includes('.'));
    const nested = allParams.filter((p) => p.name.includes('.'));

    const params = topLevel.map((p) => {
      const ownNested = nested.filter((np) => np.name.startsWith(`${p.name}.`));
      if (ownNested.length > 0) {
        const props = ownNested
          .map((np) => `${np.name.slice(p.name.length + 1)}: ${parseType(np.type)}`)
          .join('; ');
        return { name: p.name, type: `{ ${props} }` };
      }
      return { name: p.name, type: parseType(p.type) };
    });

    events[item.name] = { params, description: item.description || '' };
  }

  return events;
}










function generateEventArgsType(events) {
  const eventNames = Object.keys(events).sort();
  if (eventNames.length === 0) return '';

  let output = 'export type EditorEventArgs = {\n';
  eventNames.forEach((name, index) => {
    const event = events[name];
    const doc = renderJsDoc({ description: event.description }, '  ');
    if (doc.includes('\n *') && index > 0) output += '\n';
    const tuple = event.params.map((p) => `${p.name}: ${p.type}`).join(', ');
    output += `${doc}  ${name}: [${tuple}];\n`;
  });
  output += '};\n\nexport type EditorEventName = keyof EditorEventArgs;\n';
  return output;
}

// Maps each `GetClassType()` string literal to the class that returns it.
//
// `Api.GetByInternalId` and friends return a union of ten classes, and the obvious way to pick one
// apart - `if (o.GetClassType() === "paragraph")` - does not narrow it: TypeScript discriminates a
// union on a *property* with a literal type, and the result of a method call is not one, however
// literal its type. There is no declaration that changes that, so the narrowing has to come from a
// user-defined type predicate, and this map is what spares the author from hand-writing the
// literal-to-class table that predicate needs:
//
//   function isClass<K extends keyof Word.ClassTypeMap>(
//     o: { GetClassType(): string }, k: K,
//   ): o is Word.ClassTypeMap[K] {
//     return o.GetClassType() === k;
//   }
//
// Not a bijection, and the map says so rather than picking a winner: three literals in word (and
// one or two in each other editor) are returned by two classes - `ApiTextPr` and `ApiRangeTextPr`
// both answer "textPr" - so those keys carry the union. Knowing the literal genuinely does not
// tell you which of the two you hold.
function generateClassTypeMap(classes, classNames) {
  const byLiteral = new Map();
  for (const className of classNames) {
    const method = classes[className].methods && classes[className].methods.GetClassType;
    const literal = method && /^"([^"]+)"$/.exec(method.returnType);
    if (!literal) continue;
    if (!byLiteral.has(literal[1])) byLiteral.set(literal[1], []);
    byLiteral.get(literal[1]).push(className);
  }
  if (byLiteral.size === 0) return '';

  const doc = [
    '/**',
    ' * Maps every `GetClassType()` return value to the class that returns it.',
    ' *',
    ' * Intended for writing a type predicate that narrows the unions returned by members such',
    ' * as `Api.GetByInternalId`, which `GetClassType()` alone cannot narrow - a method call is',
    ' * not a discriminant, only a property is.',
    ' *',
    ' * ```ts',
    ' * function isClass<K extends keyof ClassTypeMap>(',
    ' *   o: { GetClassType(): string }, k: K,',
    ' * ): o is ClassTypeMap[K] {',
    ' *   return o.GetClassType() === k;',
    ' * }',
    ' *',
    ' * const o = Api.GetByInternalId(id);',
    ' * if (o && isClass(o, "paragraph")) o.Select();',
    ' * ```',
    ' *',
    ' * A few literals are returned by more than one class and map to the union of them.',
    ' */',
  ];

  const entries = [...byLiteral.keys()].sort().map((literal) => {
    const names = byLiteral.get(literal).slice().sort();
    return '  ' + JSON.stringify(literal) + ': ' + names.join(' | ') + ';';
  });

  return [
    ...doc,
    'export interface ClassTypeMap {',
    ...entries,
    '}',
    '',
    'export type ClassTypeName = keyof ClassTypeMap;',
    '',
  ].join(LF);
}

function methodTypeSignature(method) {
  const params = method.params.map((p) => `${p.optional ? '?' : ''}${p.type}`).join(', ');
  return `(${params}) => ${method.returnType}`;
}

function propertyTypeSignature(prop) {
  return `${prop.optional ? '?' : ''}${prop.type}`;
}

// sdkjs's own JSDoc frequently re-documents an inherited member under the subclass's own
// `@memberof` (e.g. ApiChart's doc page lists `GetContent`/`SetSize`/... alongside its own
// `GetClassType`, even though only `GetClassType` actually behaves differently from
// ApiDrawing's) - so a name appearing in both `classData` and `base` is not by itself evidence
// of a real override. Compare the two declared signatures and only treat it as conflicting (and
// worth `Omit`-ting from the `extends` clause) when they actually differ.
function findConflictingMembers(classData, base) {
  const conflicts = [];
  const ownMemberNames = new Set([...Object.keys(classData.methods), ...Object.keys(classData.properties)]);
  for (const name of ownMemberNames) {
    const baseMethod = base.methods[name];
    const ownMethod = classData.methods[name];
    if (baseMethod && ownMethod) {
      if (methodTypeSignature(baseMethod) !== methodTypeSignature(ownMethod)) conflicts.push(name);
      continue;
    }
    const baseProp = base.properties[name];
    const ownProp = classData.properties[name];
    if (baseProp && ownProp) {
      if (propertyTypeSignature(baseProp) !== propertyTypeSignature(ownProp)) conflicts.push(name);
      continue;
    }
    // Same name, but a method on one side and a plain property on the other - always a real
    // conflict (a callable can't also be assignable as a data property of the same name).
    if ((baseMethod && ownProp) || (baseProp && ownMethod)) conflicts.push(name);
  }
  return conflicts;
}

function generateInterface(className, classData, allClasses) {
  let output = renderJsDoc({
    description: classData.description,
    since: classData.since,
    deprecated: classData.deprecated,
    docsUrl: classData.docsUrl,
  }, '');

  const extendsList = (classData.extends || []).map((baseClassName) => {
    const base = allClasses[baseClassName];
    if (!base) return baseClassName;
    // A subclass re-declaring a base member with an incompatible type (almost always
    // GetClassType(): "someMoreSpecificLiteral" vs the base's own GetClassType(): "baseLiteral")
    // makes a plain `extends BaseClass` fail with "incorrectly extends" - Omit only the member(s)
    // that are genuinely incompatible, since its own declaration (below) already covers them; a
    // same-signature redeclaration needs no Omit at all and can extend the base class directly.
    const conflicts = findConflictingMembers(classData, base);
    return conflicts.length > 0
      ? `Omit<${baseClassName}, ${conflicts.map((n) => `"${n}"`).join(' | ')}>`
      : baseClassName;
  });
  const extendsClause = extendsList.length > 0 ? ` extends ${extendsList.join(', ')}` : '';
  output += `export interface ${className}${extendsClause} {\n`;

  // A documented member is preceded by a blank line so its comment block doesn't visually merge with
  // the member above it; undocumented ones stay packed together as before.
  const members = [];

  const propertyNames = Object.keys(classData.properties).sort();
  for (const propName of propertyNames) {
    const prop = classData.properties[propName];
    const optional = prop.optional ? '?' : '';
    members.push({
      doc: renderJsDoc({ description: prop.description }, '  '),
      code: `  ${propName}${optional}: ${prop.type};\n`,
    });
  }

  const methodNames = Object.keys(classData.methods).sort();
  if (propertyNames.length > 0 && methodNames.length > 0) members.push({ doc: '', code: '\n' });

  const renderParams = (params) => params
    .map(p => p.optional ? `${p.name}?: ${p.type}` : `${p.name}: ${p.type}`)
    .join(', ');

  for (const methodName of methodNames) {
    const method = classData.methods[methodName];
    // A real, unambiguous overload pair (see buildOverloadParams) - two call signatures, one doc
    // comment attached to the first the way TS overloads normally read.
    const signatures = method.overloadParams || [method.params];
    const code = signatures
      .map((params) => `  ${methodName}(${renderParams(params)}): ${method.returnType};\n`)
      .join('');

    members.push({
      doc: renderJsDoc(method, '  '),
      code,
    });
  }

  members.forEach((member, index) => {
    if (member.doc && index > 0) output += '\n';
    output += member.doc + member.code;
  });

  output += '}\n';
  return output;
}

function generateTypedef(name, typedefData) {
  let output = renderJsDoc({
    description: typedefData.description,
    since: typedefData.since,
    deprecated: typedefData.deprecated,
  }, '');
  if (typedefData.properties.length > 0) {
    output += `export interface ${name} {\n`;
    typedefData.properties.forEach((prop, index) => {
      const doc = renderJsDoc({ description: prop.description }, '  ');
      if (doc && index > 0) output += '\n';
      const opt = prop.optional ? '?' : '';
      output += `${doc}  ${prop.name}${opt}: ${prop.type};\n`;
    });
    output += '}\n';
  } else {
    output += `export type ${name} = ${typedefData.type || 'unknown'};\n`;
  }
  return output;
}

function methodSignature(name, method) {
  const params = method.params
    .map((p) => `${p.name}${p.optional ? '?' : ''}: ${p.type}`)
    .join(', ');
  return `${name}(${params}): ${method.returnType}`;
}

// Prose only. The runnable snippets are deliberately dropped here: they are already in the JSDoc of
// every generated member, so carrying them in the index too shipped the same 4.5 MB of text twice in
// two representations - 45% of `artifacts/api` for nothing. Every member that has an example also has a
// `docsUrl` (5938 of 5938 measured), and a consumer reading the index has the `.d.ts` beside it, so
// nothing becomes unreachable.
function proseFields(description) {
  const { summary } = splitDescription(description);
  return summary ? { description: htmlToMarkdown(cleanProse(summary)) } : {};
}

function deprecatedField(deprecated) {
  return deprecated ? { deprecated: typeof deprecated === 'string' ? deprecated : true } : {};
}

function buildApiIndexSection(classes, typedefs, events) {
  const classesIndex = {};
  for (const [className, classData] of Object.entries(classes)) {
    const methods = {};
    for (const [methodName, method] of Object.entries(classData.methods)) {
      methods[methodName] = {
        signature: methodSignature(methodName, method),
        ...proseFields(method.description),
        ...(method.docsUrl ? { docsUrl: method.docsUrl } : {}),
        ...(method.since ? { since: method.since } : {}),
        // Carried through so a licence filter is one field lookup, the same as on the
        // executeMethod surface - without it the tag existed only in the .d.ts and an agent reading
        // artifacts/api/ could not tell a paid member from a free one.
        ...(method.requires ? { requires: method.requires } : {}),
        ...deprecatedField(method.deprecated),
        params: method.params.map((p) => ({
          name: p.name,
          type: p.type,
          ...(p.optional ? { optional: true } : {}),
          ...(p.description ? { description: htmlToMarkdown(cleanProse(p.description)) } : {}),
        })),
        returns: {
          type: method.returnType,
          ...(method.returnDescription
            ? { description: htmlToMarkdown(cleanProse(method.returnDescription)) }
            : {}),
        },
      };
    }
    const properties = {};
    for (const [propName, prop] of Object.entries(classData.properties)) {
      properties[propName] = {
        type: prop.type,
        ...(prop.optional ? { optional: true } : {}),
        ...(prop.description ? { description: htmlToMarkdown(cleanProse(prop.description)) } : {}),
      };
    }
    classesIndex[className] = {
      ...proseFields(classData.description),
      ...(classData.docsUrl ? { docsUrl: classData.docsUrl } : {}),
      ...(classData.since ? { since: classData.since } : {}),
      ...deprecatedField(classData.deprecated),
      ...(classData.extends && classData.extends.length > 0 ? { extends: classData.extends } : {}),
      ...(Object.keys(methods).length > 0 ? { methods } : {}),
      ...(Object.keys(properties).length > 0 ? { properties } : {}),
    };
  }

  const typedefsIndex = {};
  for (const [name, typedefData] of Object.entries(typedefs)) {
    const properties = {};
    for (const prop of typedefData.properties) {
      properties[prop.name] = {
        type: prop.type,
        ...(prop.optional ? { optional: true } : {}),
        ...(prop.description ? { description: htmlToMarkdown(cleanProse(prop.description)) } : {}),
      };
    }
    typedefsIndex[name] = {
      ...proseFields(typedefData.description),
      ...(typedefData.since ? { since: typedefData.since } : {}),
      ...deprecatedField(typedefData.deprecated),
      ...(typedefData.type ? { type: typedefData.type } : {}),
      ...(Object.keys(properties).length > 0 ? { properties } : {}),
    };
  }

  const eventsIndex = {};
  for (const [name, event] of Object.entries(events)) {
    eventsIndex[name] = {
      ...proseFields(event.description),
      params: event.params.map((p) => ({ name: p.name, type: p.type })),
    };
  }

  return { classes: classesIndex, typedefs: typedefsIndex, events: eventsIndex };
}

const TS_BUILTINS = new Set([
  'Array', 'Record', 'Object', 'Function', 'Promise', 'Date', 'Map', 'Set',
  'Error', 'RegExp', 'Symbol', 'ReadonlyArray', 'Partial', 'Required', 'Readonly',
  'Pick', 'Omit', 'Exclude', 'Extract', 'NonNullable', 'ReturnType', 'JSON',
  'ArrayBuffer', 'Uint8Array', 'Int8Array', 'Uint16Array', 'Int16Array',
  'Uint32Array', 'Int32Array', 'Float32Array', 'Float64Array', 'Blob', 'File',
]);

function collectCustomTypeRefs(str) {
  // Only collect identifiers that can be type references. String literal enum values such as
  // "Area" and "BarClustered" must not become fake cross-file type stubs. Object-literal property
  // names such as `InternalId: string` are not type references either - including the optional
  // form `Numbering?: boolean`, which an options-bag record is made of.
  const withoutStrings = str
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, '')
    .replace(/\b[A-Z][a-zA-Z0-9]+\b(?=\??\s*:)/g, '');
  const refs = [];
  for (const m of (withoutStrings.match(/\b[A-Z][a-zA-Z0-9]+\b/g) || [])) {
    if (!TS_BUILTINS.has(m)) refs.push(m);
  }
  return refs;
}

function collectReferencedApiTypes(classes, typedefs, events) {
  const refs = new Set();
  for (const classData of Object.values(classes)) {
    for (const baseClass of classData.extends || []) refs.add(baseClass);
    for (const method of Object.values(classData.methods)) {
      collectCustomTypeRefs(method.returnType).forEach(t => refs.add(t));
      for (const p of method.params) collectCustomTypeRefs(p.type).forEach(t => refs.add(t));
    }
    for (const prop of Object.values(classData.properties)) {
      collectCustomTypeRefs(prop.type).forEach(t => refs.add(t));
    }
  }
  for (const td of Object.values(typedefs)) {
    if (td.type) collectCustomTypeRefs(td.type).forEach(t => refs.add(t));
    for (const prop of td.properties) collectCustomTypeRefs(prop.type).forEach(t => refs.add(t));
  }
  for (const event of Object.values(events || {})) {
    for (const p of event.params) collectCustomTypeRefs(p.type).forEach(t => refs.add(t));
  }
  return refs;
}

const OVERRIDES_DIR = path.join(PACKAGE_ROOT, 'src', 'overrides');

// Splits a src/overrides/<editor>.ts file into per-name blocks (its `export interface X {...}` /
// `export type X = ...;` plus any immediately preceding `/** ... */` doc comment), the same way
// generate-ambient-bundle.js's dedupeTopLevelDeclarations walks generated output - reused here for
// the same reason: a name-keyed block is easy to splice in or compare against a real definition.
function parseOverrideBlocks(text) {
  const lines = text.split('\n');
  const declRe = /^export\s+(?:interface|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b/;
  const blocks = {};
  let i = 0;
  while (i < lines.length) {
    const match = lines[i].match(declRe);
    if (!match) { i += 1; continue; }

    let start = i;
    let j = i - 1;
    while (j >= 0 && lines[j].trim() === '') j -= 1;
    if (j >= 0 && /^\s*\*\/\s*$/.test(lines[j])) {
      let k = j;
      while (k >= 0 && !/^\s*\/\*\*/.test(lines[k])) k -= 1;
      if (k >= 0) start = k;
    }

    let depth = 0;
    let sawBrace = false;
    let end = i;
    for (; end < lines.length; end += 1) {
      for (const ch of lines[end]) {
        if (ch === '{') { depth += 1; sawBrace = true; }
        else if (ch === '}') depth -= 1;
      }
      const closed = sawBrace ? depth === 0 : /;\s*$/.test(lines[end]);
      if (closed) { end += 1; break; }
    }

    blocks[match[1]] = lines.slice(start, end).join('\n');
    i = end;
  }
  return blocks;
}

// A handful of classes/typedefs sdkjs documents fully but that this package can't reach from a
// plain sdkjs checkout (the individual source file only exists in ONLYOFFICE's prebuilt deploy
// bundle, or the reference is a plain naming mistake in sdkjs's own JSDoc) - see
// src/overrides/cell.ts for the full rationale. Loaded once per editor and spliced into the
// generated output in place of a blind `export type X = unknown;` stub, the same pattern
// DefinitelyTyped uses for undocumented corners of a real-world API.
function loadOverrides(typeName) {
  const overridePath = path.join(OVERRIDES_DIR, `${typeName}.ts`);
  if (!fs.existsSync(overridePath)) return {};
  return parseOverrideBlocks(fs.readFileSync(overridePath, 'utf8'));
}

function generateDtsFile(data, typeName, namespaceName, docsRoot, extRoot) {
  const editorName = typeName === 'forms' ? 'form' : typeName;
  let body = '';

  const typedefs = extractTypedefs(data);
  const classes = extractClasses(data, typeName, extRoot);
  const exampleCount = applyDocsExamples(classes, typeName, docsRoot);

  const typedefNames = Object.keys(typedefs).sort();
  for (const name of typedefNames) {
    body += generateTypedef(name, typedefs[name]);
    body += '\n';
  }

  const classNames = Object.keys(classes).sort();

  const events = extractEvents(data, MANUAL_EVENTS[typeName]);

  const definedNames = new Set([...classNames, ...typedefNames]);
  const referenced = collectReferencedApiTypes(classes, typedefs, events);

  const overrides = loadOverrides(typeName);
  const shadowedOverrides = Object.keys(overrides).filter((name) => definedNames.has(name));
  if (shadowedOverrides.length > 0) {
    console.warn(`[${namespaceName}] override(s) in src/overrides/${typeName}.ts are now resolved from real sdkjs sources too - remove from the override file: ${shadowedOverrides.join(', ')}`);
  }
  const activeOverrides = Object.fromEntries(Object.entries(overrides).filter(([name]) => !definedNames.has(name)));
  // An override's own body can reference further names (e.g. ApiTableOfContents.SetPr's `TocPr`
  // param) that need the same "is this resolved anywhere?" treatment as anything the real sdkjs
  // doclets reference - otherwise those would slip through unstubbed instead of falling back to
  // `unknown` like every other unresolved reference does. Unlike collectReferencedApiTypes's other
  // callers (always passed an isolated type string), this runs on full method-declaration lines, so
  // two things collectCustomTypeRefs doesn't otherwise need to guard against must be stripped first:
  // `/** prose */` doc comments (capitalized English words read as type references) and method names
  // immediately followed by `(` (a declaration, not a reference).
  for (const block of Object.values(activeOverrides)) {
    const withoutComments = block.replace(/\/\*\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
    const typesOnly = withoutComments.replace(/\b[A-Za-z_$][A-Za-z0-9_$]*(?=\s*\()/g, '');
    collectCustomTypeRefs(typesOnly).forEach((t) => referenced.add(t));
  }

  const activeOverrideNames = Object.keys(activeOverrides).sort();
  if (activeOverrideNames.length > 0) {
    body += `// Manual overrides for types sdkjs's own JSDoc doesn't resolve from its usual sources.\n// Their sources are src/overrides/${typeName}.ts in the repository; the declarations are inlined\n// here, so the npm package does not carry that directory.\n`;
    for (const name of activeOverrideNames) {
      body += `${activeOverrides[name]}\n`;
    }
    body += '\n';
  }

  const stubs = [...referenced].filter((t) => !definedNames.has(t) && !activeOverrides[t]).sort();
  if (stubs.length > 0) {
    body += `// Cross-file type stubs\n`;
    for (const stub of stubs) {
      body += `export type ${stub} = unknown;\n`;
    }
    body += '\n';
    console.warn(`[${namespaceName}] unresolved API types (${stubs.length}): ${stubs.join(', ')}`);
  }

  // The entry-point class is always literally named "Api" in the source data
  // (e.g. Api.GetDocument(), Api.GetActiveSheet(), Api.GetPresentation()).
  // Namespacing per editor (Word.Api, Cell.Api, ...) keeps it and every other
  // type reachable and disambiguated across editors - same-named classes like
  // ApiParagraph exist in every editor with a different shape, so a flat export
  // would collide; nesting them under Word/Cell/Slide/Forms makes every type
  // importable from every editor without ambiguity.
  for (const className of classNames) {
    body += generateInterface(className, classes[className], classes);
    body += '\n';
  }

  const classTypeMap = generateClassTypeMap(classes, classNames);
  if (classTypeMap) {
    body += classTypeMap;
    body += LF;
  }

  // executeMethod-style event args map, parsed from plugin-events.js (+ MANUAL_EVENTS above for
  // the small number of real events that aren't documented via a JSDoc @event block anywhere) -
  // lets attachEditorEvent/detachEditorEvent be typed per event name/payload the same way
  // executeMethod already is per method name/args.
  const eventArgsType = generateEventArgsType(events);
  if (eventArgsType) {
    body += eventArgsType;
    body += '\n';
  }

  let output = `// Auto-generated from ONLYOFFICE/sdkjs JSDoc\n`;
  output += `// Editor type: ${editorName}\n\n`;
  output += `export namespace ${namespaceName} {\n`;
  output += body
    .split('\n')
    .map(line => (line ? `  ${line}` : line))
    .join('\n');
  output += '}\n';

  const codeOnly = output
    .split('\n')
    .filter(line => !/^\s*(?:\/\/|\/\*|\*)/.test(line))
    .join('\n');
  const anyOccurrences = (codeOnly.match(/\bany\b/g) || []).length;
  return {
    content: output,
    stats: {
      classes: classNames.length,
      typedefs: typedefNames.length,
      unresolvedTypes: stubs,
      anyOccurrences,
    },
    indexSection: buildApiIndexSection(classes, typedefs, events),
  };
}






// The docs site is routinely consumed as a downloaded archive rather than a clone, so git metadata
// is often absent. Its own CHANGELOG's newest heading identifies the release just as well, and works
// either way; the git commit is still recorded when there is one.
function getDocsMetadata(docsRoot) {
  const repoRoot = path.resolve(docsRoot, '..', '..');
  const git = getGitMetadata(repoRoot);

  let version = null;
  const changelog = path.join(repoRoot, 'CHANGELOG.md');
  if (fs.existsSync(changelog)) {
    const match = fs.readFileSync(changelog, 'utf8').match(/^##\s*v?(\d+\.\d+(?:\.\d+)?)/m);
    if (match) version = match[1];
  }

  return { ...git, ...(version ? { version } : {}) };
}

function buildGenerationManifest(paths, docsRoot) {
  const repositories = {
    sdkjs: getGitMetadata(paths.sdkjs),
    sdkjsForms: getGitMetadata(paths.sdkjsForms),
    // The documentation checkout supplies every runnable example, so what produced this output
    // includes its version - and its lag behind sdkjs is what explains both the members without
    // examples and the ~10% of @see links that 404 today.
    docs: getDocsMetadata(docsRoot),
  };
  assertSourcesReleasable(repositories);

  const sourceFiles = [];
  const seen = new Set();

  for (const editor of Object.keys(EDITORS)) {
    for (const sourcePath of getSourcePaths(editor, paths)) {
      if (seen.has(sourcePath)) continue;
      seen.add(sourcePath);
      const sourceRepo = sourcePath.startsWith(paths.sdkjsForms)
        ? paths.sdkjsForms
        : paths.sdkjs;
      sourceFiles.push({
        repository: sourceRepo === paths.sdkjsForms ? 'sdkjs-forms' : 'sdkjs',
        // Forward slashes always: `path.relative` yields the host separator, so a Windows run
        // recorded `word\apiBuilder.js` and the same commit regenerated on Linux produced
        // `word/apiBuilder.js` - a diff in a file `check-generated` compares, with nothing about the
        // types actually changed. These are repository-relative identifiers, not host paths.
        path: path.relative(sourceRepo, sourcePath).split(path.sep).join('/'),
        sha256: sha256File(sourcePath),
      });
    }
  }

  // Cheap self-check rather than a separate script: the manifest is compared across machines by
  // `check-generated`, so a host separator leaking back into a path is a portability bug that must
  // fail at generation time, not show up as a mystery diff in someone else's CI.
  const hostPaths = sourceFiles.filter((file) => file.path.includes('\\'));
  if (hostPaths.length > 0) {
    throw new Error(`Manifest paths must use forward slashes, got: ${hostPaths.map((f) => f.path).join(', ')}`);
  }

  // generate-plugin-methods.js owns `repositories.sdkjsExt` and `pluginMethodSourceFiles` - it reads
  // sdkjs-ext, which this generator does not. Carry whatever it recorded through instead of writing
  // the manifest wholesale, so running this script on its own doesn't erase the other half of the
  // provenance record.
  const existing = readExistingManifest();

  return {
    // Only versions that are pinned by package-lock.json, and therefore identical for everyone
    // running `npm ci` on this commit. The Node version used to be recorded here too, but it is
    // ambient rather than pinned: any contributor or CI runner on a different Node rewrote the
    // manifest and failed `check-generated` with nothing about the types changed. jsdoc genuinely
    // affects the parsed doclets and typescript the runtime index, so those stay.
    generator: {
      packageVersion: JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8')).version,
      jsdoc: packageVersion('jsdoc'),
      typescript: packageVersion('typescript'),
    },
    repositories: {
      ...(existing.repositories?.sdkjsExt ? { sdkjsExt: existing.repositories.sdkjsExt } : {}),
      ...repositories,
    },
    sourceFiles,
    ...(existing.pluginMethodSourceFiles ? { pluginMethodSourceFiles: existing.pluginMethodSourceFiles } : {}),
  };
}

function readExistingManifest() {
  const manifestPath = path.join(OUTPUT_DIR, 'generation-manifest.json');
  if (!fs.existsSync(manifestPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch {
    return {};
  }
}

// The switch-off mechanism for RETURN_TYPE_OVERRIDE.
//
// An override is a stopgap against an upstream defect, and the expensive failure mode is not the
// stopgap - it is forgetting it. Left in place after sdkjs is fixed, it silently replaces a correct
// annotation with a frozen copy that then drifts, and nothing ever says so.
//
// So every entry has to justify itself on each run, and the two ways it can stop doing that are
// reported apart:
//
//   landed  - sdkjs now documents a real type there. The workaround has done its job and is now in
//             the way; deleting the line is the whole change.
//   unused  - the member is gone, renamed, or the key never matched. The entry protects nothing,
//             and an override nobody can see firing is indistinguishable from one that does not
//             work.
//
// Both fail the build rather than warn: a warning in a generator that prints 40 lines of progress
// is a warning nobody reads.
function reportReturnTypeOverrides() {
  const keys = Object.keys(RETURN_TYPE_OVERRIDE);
  const unused = keys.filter((key) => !returnOverridesApplied.has(key) && !returnOverridesLanded.has(key));

  for (const [key, documented] of returnOverridesLanded) {
    console.error(`RETURN_TYPE_OVERRIDE['${key}'] is obsolete - sdkjs now documents ${documented} there. Remove the entry.`);
  }
  for (const key of unused) {
    console.error(`RETURN_TYPE_OVERRIDE['${key}'] matched no member - the key is wrong, or the member is gone. Remove or fix it.`);
  }
  if (returnOverridesLanded.size > 0 || unused.length > 0) {
    throw new Error(`${returnOverridesLanded.size + unused.length} RETURN_TYPE_OVERRIDE entry/entries no longer earn their place - see above.`);
  }
  if (returnOverridesApplied.size > 0) {
    console.log(`Applied ${returnOverridesApplied.size} return-type override(s) for sdkjs OBJECT returns (see scripts/overrides-tables.js).`);
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const paths = { ...resolveSdkjsPaths(), sdkjsExt: resolveSdkjsExt(resolveSdkjsPaths()) };
  const docsRoot = resolveDocsPath();
  const apiData = await fetchApiDefinitions(paths);
  const report = {};

  for (const [typeName, data] of Object.entries(apiData)) {
    const generated = generateDtsFile(data, typeName, NAMESPACE_MAP[typeName], docsRoot, paths.sdkjsExt);
    const filename = `${typeName}.ts`;
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), generated.content);
    report[typeName] = generated.stats;
    mergeApiIndex(typeName, generated.indexSection);
    console.log(`Generated ${filename} with ${generated.stats.classes} classes`);
  }

  reportReturnTypeOverrides();

  fs.writeFileSync(path.join(OUTPUT_DIR, 'api-report.json'), `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'generation-manifest.json'), `${JSON.stringify(buildGenerationManifest(paths, docsRoot), null, 2)}\n`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'api-report.json')}`);
  console.log(`Wrote ${path.join(OUTPUT_DIR, 'generation-manifest.json')}`);
  console.log('Done!');
}

module.exports = {
  resolveDocsPath,
  docsExamples,
  docsLicence,
  resolveSdkjsPaths,
  runJsdoc,
  parseType,
  parseTypeName,
  splitTopLevel,
  collectCustomTypeRefs,
  TS_BUILTINS,
};

// Only run the sdkjs->src/generated pipeline when invoked directly (`node scripts/generate-types.js`)
// - other scripts (e.g. generate-plugin-methods.js) require this file purely for its parsing
// utilities and must not trigger a second, unrelated generation run as a side effect.
if (require.main === module) {
  // `catch(console.error)` printed the failure and still exited 0, so every gate in this file was
  // advisory in practice - including `--require-clean-sources`, whose whole job is to stop a
  // release being generated from a dirty checkout, and `check-generated`, which runs this before
  // diffing. A generator that cannot generate has to fail.
  main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exitCode = 1;
  });
}
