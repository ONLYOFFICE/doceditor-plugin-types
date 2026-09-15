// Drift checker for what `npm publish` would actually ship.
//
// `package.json`'s `files` is a whitelist, and every other hand-written fact in this package has a
// check behind it while this one did not - a new directory under `src/` was published the moment it
// existed, and a directory dropped from `files` left `exports` pointing at paths no consumer would
// find. Both are invisible locally: the repository has the files either way, and only somebody who
// installed the published package would notice.
//
// Asks npm itself rather than reimplementing its whitelist/negation semantics (`files` supports
// `!`-prefixed exclusions, `.npmignore` overrides the whole list, and some names are always
// included or always dropped regardless).

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'package.json'), 'utf8'));

// Root-level files the package ships. Everything else at the root - tsconfigs, CONTRIBUTING.md,
// lockfile, example.js - is repository furniture.
const ALLOWED_ROOT_FILES = new Set([
  'index.d.ts',
  'package.json',
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'AGENTS.md',
]);

// Directories the package ships, by prefix.
const ALLOWED_PREFIXES = ['src/', 'schemas/'];

// Things whose absence is the point, each with the reason, so a future `files` edit that lets one
// back in fails with the argument rather than just a name.
const FORBIDDEN = [
  {
    pattern: /^src\/generated\/generation-manifest\.json$/,
    why: 'pins the exact source commits a build came from - repository provenance, not something a consumer can act on',
  },
  {
    pattern: /^artifacts\//,
    why: 'generated output kept in git for direct linking over raw.githubusercontent; npm consumers take the modular sources',
  },
  {
    pattern: /^dist\//,
    why: 'tsconfig.json\'s outDir - a stray local build, gitignored and never part of the package',
  },
  { pattern: /^scripts\//, why: 'generators need source checkouts nobody installing this package has' },
  { pattern: /^test\//, why: 'exercises this package, not a consumer\'s code' },
  { pattern: /^tsconfig/, why: 'this repository\'s own compiler settings' },
  { pattern: /^CONTRIBUTING\.md$/, why: 'about developing the package, not using it' },
];

// The entry points a consumer is told about, in README/AGENTS and in `exports`. Listed here as well
// so that dropping one is a failure rather than a silently smaller package.
const REQUIRED = [
  'index.d.ts',
  'schemas/config.schema.json',
  'src/editors/word.d.ts',
  'src/editors/cell.d.ts',
  'src/editors/slide.d.ts',
  'src/editors/pdf.d.ts',
  'src/plugin/index.d.ts',
  'src/config/index.d.ts',
  'src/services/index.d.ts',
  ...['word', 'cell', 'slide', 'pdf', 'forms'].flatMap((editor) => [
    `src/generated/${editor}.ts`,
    `src/generated/${editor}-methods.ts`,
  ]),
];

function packedFiles() {
  // npm writes the JSON to stdout and its notices to stderr.
  // A fixed command string through the shell: npm is `npm.cmd` on Windows, which current Node
  // refuses to spawn directly, and passing an argument array alongside `shell: true` is deprecated.
  // Nothing here is interpolated, so there is nothing to escape.
  const raw = execSync('npm pack --dry-run --json', {
    cwd: PACKAGE_ROOT,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
    maxBuffer: 64 * 1024 * 1024,
  });
  const report = JSON.parse(raw)[0];
  return { report, paths: report.files.map((f) => f.path) };
}

// `exports` nests condition objects ("types", "default", ...) around the actual target strings.
function targetsOf(value, out = []) {
  if (typeof value === 'string') out.push(value);
  else if (value && typeof value === 'object') Object.values(value).forEach((v) => targetsOf(v, out));
  return out;
}

function matchesTarget(target, paths) {
  const rel = target.replace(/^\.\//, '');
  if (!rel.includes('*')) return paths.includes(rel);
  const re = new RegExp(`^${rel.split('*').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*')}$`);
  return paths.some((p) => re.test(p));
}

function main() {
  const { report, paths } = packedFiles();
  const packed = new Set(paths);
  const problems = [];

  // One unwanted directory is one mistake, not 1166 of them: a whole `artifacts/api` slipping back in
  // would otherwise bury every other problem under a line per file.
  const groups = new Map();
  const group = (key, file, message) => {
    if (!groups.has(key)) groups.set(key, { message, files: [] });
    groups.get(key).files.push(file);
  };

  for (const file of paths) {
    const forbidden = FORBIDDEN.find((f) => f.pattern.test(file));
    if (forbidden) {
      group(forbidden.pattern.source, file, `is published but should not be - ${forbidden.why}`);
      continue;
    }
    const allowed = file.includes('/')
      ? ALLOWED_PREFIXES.some((prefix) => file.startsWith(prefix))
      : ALLOWED_ROOT_FILES.has(file);
    if (!allowed) {
      const key = file.includes('/') ? `${file.split('/')[0]}/` : file;
      group(key, file, 'is published but is not part of the package\'s declared shape - add it to ALLOWED_ROOT_FILES/ALLOWED_PREFIXES here if that is intended, or exclude it in package.json\'s "files"');
    }
  }
  for (const { message, files } of groups.values()) {
    const shown = files.length === 1
      ? files[0]
      : `${files[0]} (and ${files.length - 1} more)`;
    problems.push(`${shown} ${message}`);
  }

  for (const file of REQUIRED) {
    if (!packed.has(file)) problems.push(`${file} is missing from the published package`);
  }

  // A subpath that resolves to nothing is the failure mode of dropping a directory from `files`:
  // the package still installs, and the import fails only in the consumer's project.
  for (const [subpath, value] of Object.entries(pkg.exports || {})) {
    for (const target of targetsOf(value)) {
      if (!matchesTarget(target, paths)) {
        problems.push(`exports["${subpath}"] points at ${target}, which the published package does not contain`);
      }
    }
  }
  for (const [range, map] of Object.entries(pkg.typesVersions || {})) {
    for (const [subpath, targets] of Object.entries(map)) {
      for (const target of targets) {
        if (!matchesTarget(target, paths)) {
          problems.push(`typesVersions["${range}"]["${subpath}"] points at ${target}, which the published package does not contain`);
        }
      }
    }
  }

  // `files` entries are cheap to leave behind after a rename; an entry matching nothing is dead.
  for (const entry of pkg.files || []) {
    if (entry.startsWith('!')) continue;
    const name = entry.replace(/\/$/, '');
    if (!paths.some((p) => p === name || p.startsWith(`${name}/`))) {
      problems.push(`package.json "files" lists ${entry}, which matches nothing`);
    }
  }

  if (fs.existsSync(path.join(PACKAGE_ROOT, '.npmignore'))) {
    problems.push('.npmignore exists and overrides "files" wholesale - the whitelist in package.json stops applying');
  }

  if (problems.length > 0) {
    for (const problem of problems) console.error(`package: ${problem}`);
    console.error(`Package contents check failed: ${problems.length} problem(s).`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `Package contents OK: ${report.entryCount} files, ` +
    `${(report.size / 1048576).toFixed(2)} MB packed / ${(report.unpackedSize / 1048576).toFixed(2)} MB unpacked.`
  );
}

main();
