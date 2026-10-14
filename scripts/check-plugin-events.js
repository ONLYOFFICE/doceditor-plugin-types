// Drift checker for the plugin-window event surface: sdkjs documents `attachEvent`/`event_on*` names
// via `@alias` doclets (all `@memberof Plugin`) in common/base-plugin-events.js, plus each editor's
// own <editor>/plugin-events.js / sdkjs-forms/plugin-events.js (mirrors
// tools/docs/plugins/config/events/<editor>.json in the ONLYOFFICE/onlyoffice super-repo). This
// script diffs that source against our hand-maintained `src/plugin/events.d.ts` so an event
// ONLYOFFICE adds later doesn't silently go untyped - it fails CI instead.
//
// The equivalent check for executeMethod names (word/cell/slide/pdf/forms) no longer lives here:
// `scripts/generate-plugin-methods.js` now generates `src/generated/*-methods.ts` directly from the
// same sdkjs JSDoc, and `npm run check-generated` (a `git diff --exit-code` against `src/generated`
// after a fresh regeneration) already catches drift there - a separate name-only diff would be
// redundant with a generator that reproduces the full body anyway.
//
// Deliberately does NOT generate events.d.ts: PluginEventMap's payload shapes are hand-curated
// against ONLYOFFICE's own documented examples. This only answers "is anything documented but
// missing from our types" - a human still writes the actual addition.

const fs = require('fs');
const path = require('path');
const { resolveSdkjsPaths, resolveSdkjsExt } = require('./resolve-paths.js');
const { paidEventSets } = require('./paid-events.js');

const PACKAGE_ROOT = path.join(__dirname, '..');

// `@typeofeditors` codes, as used throughout sdkjs's own JSDoc.
const EDITOR_CODES = { word: 'CDE', cell: 'CSE', slide: 'CPE', pdf: 'PDFE', forms: 'CFE' };

// Mirrors tools/docs/plugins/config/events/<editor>.json in the ONLYOFFICE/onlyoffice super-repo:
// the common file (filtered by @typeofeditors) plus each editor's own event source.
function eventSources(paths, editor) {
  const common = path.join(paths.sdkjs, 'common', 'base-plugin-events.js');
  switch (editor) {
    case 'word': return [common, path.join(paths.sdkjs, 'word', 'plugin-events.js')];
    case 'cell': return [common, path.join(paths.sdkjs, 'cell', 'plugin-events.js')];
    case 'slide': return [common, path.join(paths.sdkjs, 'slide', 'plugin-events.js')];
    case 'pdf': return [common, path.join(paths.sdkjs, 'pdf', 'plugin-events.js')];
    case 'forms': return [common, path.join(paths.sdkjsForms, 'plugin-events.js')];
    default: throw new Error(`Unknown editor: ${editor}`);
  }
}

// Splits on `/**` rather than using a JSDoc parser: these blocks are simple enough (a handful of
// single-line tags) that a full parse isn't needed, and this stays dependency-free.
function extractDocumentedEvents(filePath, editorCode) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8');
  const blocks = text.split(/\/\*\*/).slice(1);
  const names = [];
  for (const block of blocks) {
    const head = block.split('*/')[0];
    const aliasMatch = head.match(/@alias\s+(\w+)/);
    if (!aliasMatch || /@undocumented/.test(head)) continue;
    // The common file's events are shared across several editors - only the ones whose
    // @typeofeditors tag actually includes this editor's code apply here. No tag at all means
    // "applies to every editor".
    const editorsTag = head.match(/@typeofeditors\s*(\[[^\]]*\])/);
    if (editorsTag) {
      let codes;
      try { codes = JSON.parse(editorsTag[1].replace(/'/g, '"')); } catch { codes = []; }
      if (!codes.includes(editorCode)) continue;
    }
    names.push(aliasMatch[1]);
  }
  return names;
}

function checkEvents(paths) {
  const documented = new Set();
  for (const editor of Object.keys(EDITOR_CODES)) {
    for (const source of eventSources(paths, editor)) {
      for (const name of extractDocumentedEvents(source, EDITOR_CODES[editor])) documented.add(name);
    }
  }

  const eventsPath = path.join(PACKAGE_ROOT, 'src', 'plugin', 'events.d.ts');
  const ours = fs.readFileSync(eventsPath, 'utf8');
  const missing = [...documented].filter((name) => !new RegExp(`\\b${name}\\b`).test(ours));

  if (missing.length > 0) {
    console.error(`events: missing documented plugin event(s): ${missing.join(', ')}`);
    return missing.length;
  }
  console.log(`events: ${documented.size} documented plugin events (common + per-editor) all present`);
  return 0;
}

// Both surfaces, because they are declared in different places and drifted apart once already:
// the hand-written `PluginEventMap` carried `@requires` on all four annotation events while the
// generated per-editor `EditorEventArgs` carried it on none, and this check only looked at the
// first - so it reported "all marked" while half the surface said nothing.
function checkPaidEvents(paths) {
  if (!paths.sdkjsExt) {
    console.log('events: paid-event marking not checked (no sdkjs-ext checkout)');
    return 0;
  }

  const sets = paidEventSets(paths.sdkjs, paths.sdkjsExt);
  const free = sets.free;
  const paidOnly = [...sets.paidOnly].sort();

  const eventsPath = path.join(PACKAGE_ROOT, 'src', 'plugin', 'events.d.ts');
  const source = fs.readFileSync(eventsPath, 'utf8');

  // The `@requires` tag has to sit in the JSDoc block immediately above the entry, so slice from the
  // previous entry rather than searching the whole file.
  const isMarked = (name) => {
    const at = source.indexOf(`\n    ${name}: [`);
    if (at === -1) return null;
    const blockStart = source.lastIndexOf('/**', at);
    return blockStart !== -1 && source.slice(blockStart, at).includes('@requires');
  };

  const problems = [];
  for (const name of paidOnly) {
    const marked = isMarked(name);
    if (marked === null) continue; // not declared at all - the existing coverage check reports that
    if (!marked) problems.push(`${name}: fired only by sdkjs-ext but not marked @requires`);
  }
  for (const name of free) {
    if (isMarked(name) === true) problems.push(`${name}: marked @requires but the open sdkjs fires it too`);
  }

  // The generated side. `EditorEventArgs` is emitted per editor from the same derived set, so a
  // miss here means the generator did not run with an sdkjs-ext checkout, not that someone forgot
  // a tag - but it ships the same unmarked declaration either way.
  let generatedChecked = 0;
  for (const editor of ['word', 'cell', 'slide', 'pdf', 'forms']) {
    const file = path.join(PACKAGE_ROOT, 'src', 'generated', `${editor}.ts`);
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    const at = text.indexOf('export type EditorEventArgs');
    if (at === -1) continue;
    const block = text.slice(at);
    for (const name of paidOnly) {
      const entry = block.indexOf(`\n    ${name}: [`);
      if (entry === -1) continue;
      generatedChecked += 1;
      const blockStart = block.lastIndexOf('/**', entry);
      const marked = blockStart !== -1 && block.slice(blockStart, entry).includes('@requires');
      if (!marked) problems.push(`${name}: unmarked in src/generated/${editor}.ts (EditorEventArgs)`);
    }
  }

  if (problems.length > 0) {
    console.error(`events: paid-event marking is out of date -\n  ${problems.join('\n  ')}`);
    return problems.length;
  }
  console.log(`events: ${paidOnly.length} commercial-only event(s) marked @requires in PluginEventMap and ${generatedChecked} generated declaration(s)`);
  return 0;
}

function main() {
  const paths = resolveSdkjsPaths();
  paths.sdkjsExt = resolveSdkjsExt(paths);
  const missingEvents = checkEvents(paths) + checkPaidEvents(paths);
  if (missingEvents > 0) {
    throw new Error(`${missingEvents} documented plugin event(s) are missing from the package - see above.`);
  }
}

try {
  main();
} catch (error) {
  console.error(`Plugin-event drift check failed: ${error.message}`);
  process.exitCode = 1;
}
