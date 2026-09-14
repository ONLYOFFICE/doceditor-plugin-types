// Drift checker for PARAM_OPTIONAL_FROM in overrides-tables.js.
//
// sdkjs's JSDoc marks a number of parameters required that are optional in fact - `@param {Type} name`
// where `[name]` was meant - and the generator corrects them from a table. The table is hand-written,
// so it needs the same treatment as every other hand-written fact in this package: a check that
// re-derives it from the source and fails when the two disagree.
//
// The evidence is ONLYOFFICE's own example on the member's documentation page: if it calls the method
// with fewer arguments than the signature requires, the signature rejects the vendor's own sample
// code. Fails in both directions - a mismatch with no entry, and an entry whose value no longer
// equals the smallest documented call. Needs DOCS_PATH.

const fs = require('fs');
const path = require('path');
const { resolveDocsPath } = require('./resolve-paths.js');
const { PARAM_OPTIONAL_FROM } = require('./overrides-tables.js');

const PACKAGE_ROOT = path.join(__dirname, '..');
const API_DIR = path.join(PACKAGE_ROOT, 'dist', 'api');
const BACKSLASH = String.fromCharCode(92);
const NL = String.fromCharCode(10);
const FENCE = '```';

const DOCS_SECTION = {
  word: 'document-api',
  cell: 'spreadsheet-api',
  slide: 'presentation-api',
  forms: 'form-api',
  pdf: 'pdf-api',
};

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

// Argument counts of every `.name(...)` call in the given code, by balanced scan. Strings are skipped
// so a comma inside one is not counted, and an empty argument list reads as 0 rather than 1.
function callArities(code, name) {
  const out = [];
  const needle = `.${name}(`;
  let i = code.indexOf(needle);
  while (i !== -1) {
    let j = i + needle.length;
    let depth = 1;
    let count = 0;
    let sawToken = false;
    let quote = null;
    let closed = false;
    for (; j < code.length; j++) {
      const ch = code[j];
      if (quote) {
        if (ch === quote && code[j - 1] !== BACKSLASH) quote = null;
        sawToken = true;
        continue;
      }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; sawToken = true; continue; }
      if ('([{'.includes(ch)) { depth++; sawToken = true; continue; }
      if (')]}'.includes(ch)) { depth--; if (depth === 0) { closed = true; break; } continue; }
      if (ch === ',' && depth === 1) { count++; continue; }
      if (ch.charCodeAt(0) > 32) sawToken = true;
    }
    if (closed) out.push(sawToken ? count + 1 : 0);
    i = code.indexOf(needle, j);
  }
  return out;
}

// The code inside the `## Example` section's fences, with line comments stripped: a prose line like
// `// Use Api.attachEvent() to ...` otherwise reads as a zero-argument call and invents a mismatch.
function exampleCode(markdown) {
  const tail = markdown.split('## Example')[1];
  if (!tail) return '';
  const parts = tail.split(FENCE);
  let code = '';
  for (let k = 1; k < parts.length; k += 2) code += parts[k].slice(parts[k].indexOf(NL) + 1) + NL;
  return code
    .split(NL)
    .map((line) => { const at = line.indexOf('//'); return at === -1 ? line : line.slice(0, at); })
    .join(NL);
}

function findMismatches(docsRoot) {
  const found = new Map();
  for (const [editor, section] of Object.entries(DOCS_SECTION)) {
    const classesDir = path.join(API_DIR, editor, 'classes');
    if (!fs.existsSync(classesDir)) continue;
    for (const file of walk(classesDir)) {
      if (file.endsWith('_class.json')) continue;
      const data = JSON.parse(fs.readFileSync(file, 'utf8'));
      const sharded = !data.methods;
      const className = sharded ? path.basename(path.dirname(file)) : path.basename(file, '.json');
      const members = sharded ? { [path.basename(file, '.json')]: data } : data.methods;
      for (const [method, info] of Object.entries(members)) {
        const required = (info.params || []).filter((p) => !p.optional).length;
        if (required === 0) continue;
        const page = path.join(docsRoot, 'office-api', 'usage-api', section, className, 'Methods', `${method}.md`);
        if (!fs.existsSync(page)) continue;
        const arities = callArities(exampleCode(fs.readFileSync(page, 'utf8')), method);
        if (arities.length === 0) continue;
        const min = Math.min(...arities);
        if (min >= required) continue;
        const key = `${className}.${method}`;
        if (!found.has(key) || min < found.get(key).min) found.set(key, { min, required, editor });
      }
    }
  }
  return found;
}

// Smallest documented call for `Class.method`, taken from that member's own page in every editor that
// declares it. Returns null when no example calls it at all.
//
// Deliberately not widened to the class's other pages, though that would find more: a call reads as
// plain text, so `.GetRange()` in a sibling example may well be a different class's genuinely
// zero-argument `GetRange`, and nothing here can tell the receiver apart. The narrow rule under-reports
// - `ApiRange.GetAddress` is corrected to four arguments where sibling pages suggest zero - but it
// never loosens a parameter that is really required, which is the error that would matter.
function observedMinimum(docsRoot, key) {
  const [className, method] = key.split('.');
  const arities = [];
  for (const section of Object.values(DOCS_SECTION)) {
    const page = path.join(docsRoot, 'office-api', 'usage-api', section, className, 'Methods', `${method}.md`);
    if (!fs.existsSync(page)) continue;
    arities.push(...callArities(exampleCode(fs.readFileSync(page, 'utf8')), method));
  }
  return arities.length === 0 ? null : Math.min(...arities);
}

function main() {
  if (!fs.existsSync(API_DIR)) {
    throw new Error(`${path.relative(PACKAGE_ROOT, API_DIR)} is missing - run \`npm run generate\` first.`);
  }
  const docsRoot = resolveDocsPath();
  const mismatches = findMismatches(docsRoot);

  // `SearchAndReplace` is a different defect and deliberately has no entry: sdkjs documents one object
  // parameter plus its nested properties (`@param {Object} oProperties`, `@param {string}
  // oProperties.searchString`), and the generator flattens those into separate positional parameters.
  // Marking them optional would hide the wrong shape rather than fix it.
  const KNOWN_UNFIXED = new Set(['ApiDocument.SearchAndReplace']);

  // The check runs against the *corrected* output, so a working entry produces no mismatch at all -
  // its absence is the success condition, not evidence of staleness. What is verified instead is that
  // each entry's value still equals the smallest documented call, which catches both a correction that
  // has become too loose and one that was never loose enough.
  const problems = [];
  for (const [key, m] of mismatches) {
    if (KNOWN_UNFIXED.has(key)) continue;
    if (!(key in PARAM_OPTIONAL_FROM)) {
      problems.push(`${key}: signature requires ${m.required} argument(s), but a documented example (${m.editor}) calls it with ${m.min} - add \`'${key}': ${m.min}\` to PARAM_OPTIONAL_FROM`);
    }
  }
  for (const [key, value] of Object.entries(PARAM_OPTIONAL_FROM)) {
    const observed = observedMinimum(docsRoot, key);
    if (observed === null) {
      problems.push(`${key}: no documented example calls it any more - the entry has no evidence behind it`);
    } else if (observed !== value) {
      problems.push(`${key}: entry says ${value}, but the smallest documented call now passes ${observed} argument(s)`);
    }
  }

  if (problems.length > 0) {
    console.error(`arity: PARAM_OPTIONAL_FROM is out of date -${NL}  ${problems.join(`${NL}  `)}`);
    throw new Error(`${problems.length} arity correction(s) out of date - see above.`);
  }
  console.log(`arity: ${Object.keys(PARAM_OPTIONAL_FROM).length} parameter corrections all still backed by a documented example`);
}

try {
  main();
} catch (error) {
  console.error(`Arity check failed: ${error.message}`);
  process.exitCode = 1;
}
