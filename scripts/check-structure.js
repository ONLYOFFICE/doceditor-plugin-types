// Drift checker for the Project Structure tree in CONTRIBUTING.md.
//
// Every other hand-written fact in this package has a check behind it - the arity corrections, the
// paid-event marking, the config schema, the machine-readable index. The file tree did not, and it
// rotted exactly the way an unguarded fact does: it listed 8 of 15 scripts, three of which had been
// missing since well before the module split that finally exposed it.
//
// Scoped to the directories whose contents are meant to be enumerated one file at a time. `src/`,
// `artifacts/` and `test/` are described in the tree by shape rather than by listing (`artifacts/api/` is 1200
// generated files), so adding a file there is not drift - but a new script, entry point or override is.

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

// Filenames the tree mentions. The tree is ASCII art, so a name may sit behind box-drawing characters
// and be followed by a `#` comment - only the name itself is of interest.
function namesIn(block) {
  const names = new Set();
  for (const line of block.split(NL)) {
    // Longest extension first: `js|json` would match `api-report.json` as `api-report.js`. The second
    // alternative catches extensionless root files - LICENSE is the only one today.
    const m = /([A-Za-z0-9_.-]+\.(?:json|js|ts|md))|(LICENSE)/.exec(line.replace(/#.*$/, ''));
    if (m) names.add(m[1] || m[2]);
  }
  return names;
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

function main() {
  const listed = namesIn(structureBlock());
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
  for (const name of listed) {
    if (fs.existsSync(path.join(PACKAGE_ROOT, name))) continue;
    if (!onDisk.has(name)) problems.push(`${name} is in the tree but no longer exists`);
  }

  if (problems.length > 0) {
    console.error(`structure: CONTRIBUTING.md's Project Structure tree is out of date -${NL}  ${problems.sort().join(`${NL}  `)}`);
    throw new Error(`${problems.length} file(s) out of sync - see above.`);
  }
  console.log(`structure: ${listed.size} names in the tree, all ${Object.keys(ENUMERATED).length} enumerated directories match disk`);
}

try {
  main();
} catch (error) {
  console.error(`Structure check failed: ${error.message}`);
  process.exitCode = 1;
}
