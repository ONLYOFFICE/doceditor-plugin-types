// Drift checker for the hand-written facts about this package's shape: the Project Structure tree in
// CONTRIBUTING.md, and the measured numbers the reader-facing documents quote. Why either is checked
// at all, and why CHANGELOG.md is left out, is in CONTRIBUTING.md rather than repeated here.
//
// Scoped to the directories meant to be enumerated one file at a time. `src/`, `artifacts/` and
// `test/` are described in the tree by shape rather than by listing, so adding a file there is not
// drift - but a new script, entry point or override is.

const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');
const NL = String.fromCharCode(10);
const FENCE = '```';

// Directory -> file extensions that must appear in the tree. A directory absent from disk is an error
// in itself: the tree would be describing something that no longer exists.
//
// `.` is the package root, and the one this check originally left out - which is how five root files
// (README.md, CONTRIBUTING.md, CHANGELOG.md, LICENSE, package-lock.json) sat missing from the tree
// while the check reported it clean. Root contents are few and stable, so they are the easiest thing
// here to keep honest.
const ENUMERATED = {
  '.': ['.json', '.md', '.js', 'LICENSE'],
  scripts: ['.js'],
  'src/overrides': ['.ts'],
  'src/editors': ['.d.ts'],
  'src/plugin': ['.d.ts'],
  'src/config': ['.d.ts'],
  'src/services': ['.d.ts'],
  'src/theme': ['.d.ts'],
  schemas: ['.json'],
};

function structureBlock() {
  const doc = fs.readFileSync(path.join(PACKAGE_ROOT, 'CONTRIBUTING.md'), 'utf8');
  const section = doc.split('## Project Structure')[1];
  if (!section) throw new Error('CONTRIBUTING.md has no "## Project Structure" section.');
  const parts = section.split(FENCE);
  if (parts.length < 2) throw new Error('The Project Structure section has no fenced tree.');
  return parts[1];
}

// Every file the tree mentions, with the directory the tree puts it in. The tree is ASCII art, so a
// name may sit behind box-drawing characters and be followed by a `#` comment.
//
// The directory matters, and used to be thrown away. Checking a listed name against a flat set of
// everything on disk means any file of that name anywhere satisfies it: `src/overrides/word.ts` was
// deleted while the tree still listed it, and the check stayed green because `src/generated/word.ts`
// exists. Indentation is a reliable four columns per level here, so the enclosing directory is
// recoverable and the check can ask whether that exact path exists.
function entriesIn(block) {
  const entries = [];
  const stack = [];
  for (const raw of block.split(NL)) {
    const line = raw.replace(/#.*$/, '');
    const marker = line.search(/[├└]/);
    if (marker === -1) continue;
    const depth = Math.floor(marker / 4);
    const label = line.slice(marker).replace(/^[├└][─-]*\s*/, '').trim();
    if (!label) continue;

    if (label.endsWith('/')) {
      stack.length = depth;
      stack[depth] = label.slice(0, -1);
      continue;
    }
    // Longest extension first: `js|json` would match `api-report.json` as `api-report.js`. The second
    // alternative catches extensionless root files - LICENSE is the only one today.
    const m = /^([A-Za-z0-9_.-]+\.(?:json|js|ts|md))|^(LICENSE)/.exec(label);
    if (m) entries.push({ name: m[1] || m[2], dir: stack.slice(0, depth).filter(Boolean).join('/') });
  }
  return entries;
}

// Root files the tree deliberately does not draw: build output, local tooling state and untracked
// working copies - none of them part of the package's shape.
const ROOT_IGNORED = new Set([
  '.gitignore',
  '.npmignore',
  '.editorconfig',
  'tsconfig.tsbuildinfo',
 'WIKI-building-and-releasing.md',
]);

// --- Measured numbers quoted in the documentation -------------------------------------------------

// CHANGELOG.md is deliberately absent: its entries record what was true at a release.
const NUMERIC_DOCS = ['README.md', 'AGENTS.md', 'CONTRIBUTING.md'];

const MB = 1048576;
// Same rounding the ambient generator prints, so a size copied from its output matches.
const mb = (bytes) => (bytes / MB).toFixed(2);

function directoryBytes(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    total += entry.isDirectory() ? directoryBytes(abs) : fs.statSync(abs).size;
  }
  return total;
}

// Every fact is derived from disk, never from another document.
function measure() {
  const ambient = path.join(PACKAGE_ROOT, 'artifacts', 'ambient');
  const bundles = new Map();
  for (const entry of fs.readdirSync(ambient)) {
    const m = /\.([a-z]+)\.ambient\.d\.ts$/.exec(entry);
    if (m) bundles.set(m[1], fs.statSync(path.join(ambient, entry)).size);
  }
  if (bundles.size === 0) throw new Error('artifacts/ambient holds no bundles to measure.');

  const paid = { executeMethods: 0, methods: 0 };
  for (const editor of fs.readdirSync(path.join(PACKAGE_ROOT, 'artifacts', 'api'), { withFileTypes: true })) {
    if (!editor.isDirectory()) continue;
    const index = path.join(PACKAGE_ROOT, 'artifacts', 'api', editor.name, 'index.json');
    if (!fs.existsSync(index)) continue;
    const parsed = JSON.parse(fs.readFileSync(index, 'utf8'));
    // Summed per editor, not deduplicated by name: `EndGroupActions` is listed by each of the four
    // editors that offer it, so four is what a reader comparing the prose against those lists counts.
    paid.executeMethods += (parsed.paidExecuteMethods || []).length;
    paid.methods += (parsed.paidMethods || []).length;
  }

  const sizes = [...bundles.values()];
  return {
    bundles,
    smallest: mb(Math.min(...sizes)),
    largest: mb(Math.max(...sizes)),
    apiBytes: directoryBytes(path.join(PACKAGE_ROOT, 'artifacts', 'api')),
    paid,
    wordChars: fs.readFileSync([...fs.readdirSync(ambient)]
      .map((e) => path.join(ambient, e))
      .find((p) => p.endsWith('.word.ambient.d.ts')), 'utf8').length,
  };
}

// A fact is a pattern plus what its captures must equal. `expected` turns a match into what was
// found and what disk says, plus an optional `note` when the mismatch needs explaining.
function numericFacts(actual) {
  return [
    {
      label: 'ambient bundle size',
      // The README table and the CONTRIBUTING tree both put the size on the same line as the file
      // name, so one rule covers them and any future mention that follows the same habit.
      pattern: /([a-z]+)\.ambient\.d\.ts`?\s*(?:\||#)\s*(\d+\.\d{2}) MB/g,
      expected: ([, editor, quoted]) => {
        const size = actual.bundles.get(editor);
        if (size === undefined) return { found: quoted, want: `a bundle named ${editor}`, note: 'no such bundle on disk' };
        return { found: quoted, want: mb(size) };
      },
    },
    {
      label: 'ambient bundle size range',
      pattern: /(\d+\.\d{2})-(\d+\.\d{2}) MB/g,
      expected: ([whole]) => ({ found: whole, want: `${actual.smallest}-${actual.largest} MB` }),
    },
    {
      label: 'artifacts/api size',
      pattern: /at (\d+\.\d{2}) MB it was/g,
      expected: ([, quoted]) => ({ found: quoted, want: mb(actual.apiBytes) }),
    },
    {
      label: 'paid members, total',
      pattern: /(\d+) members need/g,
      expected: ([, quoted]) => ({ found: quoted, want: String(actual.paid.executeMethods + actual.paid.methods) }),
    },
    {
      label: 'paid members, split',
      pattern: /(\d+) `executeMethod` names and (\d+)\s*\n?\s*object-model methods/g,
      expected: ([, names, methods]) => ({
        found: `${names} + ${methods}`,
        want: `${actual.paid.executeMethods} + ${actual.paid.methods}`,
      }),
    },
    {
      label: 'word bundle character count',
      pattern: /~(\d+(?:\.\d+)?)M characters/g,
      expected: ([, quoted]) => ({ found: quoted, want: (actual.wordChars / 1e6).toFixed(1) }),
    },
  ];
}

function checkNumbers() {
  const actual = measure();
  const problems = [];
  let mentions = 0;

  for (const fact of numericFacts(actual)) {
    let seen = 0;
    for (const file of NUMERIC_DOCS) {
      const text = fs.readFileSync(path.join(PACKAGE_ROOT, file), 'utf8');
      for (const match of text.matchAll(fact.pattern)) {
        seen += 1;
        const { found, want, note } = fact.expected(match);
        if (found === want) continue;
        const line = text.slice(0, match.index).split(NL).length;
        problems.push(`${file}:${line} ${fact.label} says ${found}, disk says ${want}${note ? ` (${note})` : ''}`);
      }
    }
    // A fact nobody states means the pattern has stopped matching - reworded or deleted - and this
    // check is silently guarding nothing. It has to be noisy about that.
    if (seen === 0) problems.push(`no document states the ${fact.label} any more - reword the pattern in ${path.basename(__filename)} or restore the mention`);
    mentions += seen;
  }
  return { problems, mentions, facts: numericFacts(actual).length };
}

function main() {
  const entries = entriesIn(structureBlock());
  const listed = new Set(entries.map((entry) => entry.name));
  const problems = [];

  for (const [dir, extensions] of Object.entries(ENUMERATED)) {
    const abs = path.join(PACKAGE_ROOT, dir);
    if (!fs.existsSync(abs)) {
      problems.push(`${dir}/ is in the tree but not on disk`);
      continue;
    }
    for (const entry of fs.readdirSync(abs)) {
      if (dir === '.' && (ROOT_IGNORED.has(entry) || !fs.statSync(path.join(abs, entry)).isFile())) continue;
      if (!extensions.some((ext) => entry.endsWith(ext))) continue;
      // `.d.ts` also ends with `.ts`; match on the real name either way.
      const where = dir === '.' ? entry : `${dir}/${entry}`;
      if (!listed.has(entry)) problems.push(`${where} exists but is missing from the tree`);
    }
  }

  // The other direction: a name the tree still claims that is gone from disk. Every source directory
  // counts here, not just the enumerated ones - `src/generated/` is described by shape rather than
  // listed, but the handful of names the tree does spell out there must still be real.
  const onDisk = new Set();
  const collect = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) collect(path.join(dir, entry.name));
      else onDisk.add(entry.name);
    }
  };
  for (const dir of ['src', 'scripts', 'schemas', 'test']) collect(path.join(PACKAGE_ROOT, dir));
  for (const { name, dir } of entries) {
    // The path the tree itself claims, when it gives one - a name-only match would accept a file of
    // that name in some other directory.
    if (dir) {
      if (!fs.existsSync(path.join(PACKAGE_ROOT, dir, name))) {
        problems.push(`${dir}/${name} is in the tree but not at that path`);
      }
      continue;
    }
    if (fs.existsSync(path.join(PACKAGE_ROOT, name))) continue;
    if (!onDisk.has(name)) problems.push(`${name} is in the tree but no longer exists`);
  }

  // Both halves are reported together rather than one failing first: a regeneration that moves the
  // numbers usually moves the tree as well, and fixing them one error at a time means running the
  // check once per edit.
  const numbers = checkNumbers();

  if (problems.length > 0) {
    console.error(`structure: CONTRIBUTING.md's Project Structure tree is out of date -${NL}  ${problems.sort().join(`${NL}  `)}`);
  }
  if (numbers.problems.length > 0) {
    console.error(`numbers: documentation disagrees with disk -${NL}  ${numbers.problems.sort().join(`${NL}  `)}`);
  }
  const total = problems.length + numbers.problems.length;
  if (total > 0) throw new Error(`${total} fact(s) out of sync - see above.`);

  console.log(`structure: ${listed.size} names in the tree, all ${Object.keys(ENUMERATED).length} enumerated directories match disk`);
  console.log(`numbers: ${numbers.facts} measured facts, ${numbers.mentions} mentions across ${NUMERIC_DOCS.length} documents match disk`);
}

try {
  main();
} catch (error) {
  console.error(`Structure check failed: ${error.message}`);
  process.exitCode = 1;
}
