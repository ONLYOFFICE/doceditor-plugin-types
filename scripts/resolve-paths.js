// Single source of truth for where this package's external inputs live. Every script that reads
// outside the package (both generators, all three checkers) used to carry its own copy of
// readOption plus a resolve* pair - five near-duplicates that had already drifted:
// check-plugin-events.js never verified sdkjs-forms exists (a missing checkout would have meant
// silently checking fewer events), and adding a source meant editing five files. Now a source is
// one entry in SOURCES.
//
// The convention is identical for every source: `--<option>` beats `<ENV_VAR>`, which beats the
// default (a sibling checkout of sdkjs, or a path inside the monorepo). Returned paths are
// absolute. A missing required source throws a message naming both the env var and the flag.

const fs = require('fs');
const path = require('path');

const PACKAGE_ROOT = path.join(__dirname, '..');

function readOption(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index === -1 ? undefined : process.argv[index + 1];
}

const SOURCES = {
  sdkjs: {
    label: 'sdkjs',
    kind: 'directory',
    option: 'sdkjs',
    env: 'SDKJS_PATH',
    hint: '<path-to-sdkjs>',
  },
  sdkjsForms: {
    label: 'sdkjs-forms',
    kind: 'directory',
    option: 'sdkjs-forms',
    env: 'SDKJS_FORMS_PATH',
    hint: '<path-to-sdkjs-forms>',
    defaultPath: (resolved) => path.resolve(resolved.sdkjs, '..', 'sdkjs-forms'),
  },
  sdkjsExt: {
    label: 'sdkjs-ext',
    kind: 'directory',
    option: 'sdkjs-ext',
    env: 'SDKJS_EXT_PATH',
    hint: '<path-to-sdkjs-ext>',
    defaultPath: (resolved) => path.resolve(resolved.sdkjs, '..', 'sdkjs-ext'),
  },
  pluginsRuntime: {
    label: 'plugins.dev.js',
    kind: 'file',
    option: 'runtime',
    env: 'PLUGINS_RUNTIME_PATH',
    hint: '<path-to-plugins.dev.js>',
    defaultPath: () => path.resolve(PACKAGE_ROOT, '..', 'plugins.dev.js'),
  },
  pluginsContent: {
    label: 'Plugin content',
    kind: 'directory',
    option: 'content',
    env: 'PLUGINS_CONTENT_PATH',
    hint: '<path-to-sdkjs-plugins/content>',
    defaultPath: () => path.resolve(PACKAGE_ROOT, '..', '..', 'content'),
  },
};

// Resolves one SOURCES entry to an absolute path. `resolved` carries the sources resolved so far,
// so an entry can default to a sibling of another (sdkjsForms next to sdkjs, ...).
//
// `optional: true` returns null instead of throwing when the path was never configured and its default
// sibling is absent. That is the case of a package checked out on its own, away from the monorepo it
// currently sits in: `plugins.dev.js` and `sdkjs-plugins/content/` are simply not there, and failing
// would tell a newcomer their setup is broken when it is complete. An explicitly configured path that
// does not exist still throws - that is a typo, not an absence.
function resolveSource(name, resolved = {}, { required = true, optional = false } = {}) {
  const spec = SOURCES[name];
  if (!spec) throw new Error(`Unknown source: ${name}`);

  const explicit = readOption(spec.option) || process.env[spec.env];
  const configured = explicit || spec.defaultPath?.(resolved);
  if (!configured) {
    if (optional) return null;
    throw new Error(`Set ${spec.env} or pass --${spec.option} ${spec.hint}.`);
  }
  const abs = path.resolve(configured);
  if (!fs.existsSync(abs)) {
    if (optional && !explicit) return null;
    if (required) {
      throw new Error(`${spec.label} ${spec.kind} does not exist: ${abs}. Set ${spec.env} or pass --${spec.option} ${spec.hint}.`);
    }
  }
  return abs;
}

function resolveSdkjsPaths() {
  const resolved = {};
  resolved.sdkjs = resolveSource('sdkjs');
  resolved.sdkjsForms = resolveSource('sdkjsForms', resolved);
  return resolved;
}

// sdkjs-ext is not a public repository, so its absence gets an explicit opt-out flag rather than a
// plain error - but the flag is required: a missing checkout once silently produced 104 instead of
// 109 Word methods and 51 instead of 57 Slide methods, exiting 0. Without the flag, fail.
function resolveSdkjsExt(resolvedSdkjsPaths) {
  const spec = SOURCES.sdkjsExt;
  const configured = readOption(spec.option) || process.env[spec.env] || spec.defaultPath(resolvedSdkjsPaths);
  const resolved = path.resolve(configured);

  if (!fs.existsSync(resolved)) {
    if (process.argv.includes('--allow-missing-sdkjs-ext')) {
      console.warn(`[warn] sdkjs-ext not found at ${resolved}; generating WITHOUT it - the word and slide method surfaces will be incomplete.`);
      return null;
    }
    throw new Error(`sdkjs-ext directory does not exist: ${resolved}. Set SDKJS_EXT_PATH or pass --sdkjs-ext <path>; pass --allow-missing-sdkjs-ext to generate a deliberately incomplete surface anyway.`);
  }
  return resolved;
}

// The documentation checkout supplies every runnable @example. Accepts either the repository root
// or the inner project directory, since the GitHub archive nests one inside the other
// (`api.onlyoffice.com-master/api.onlyoffice.com`); returns the site/docs directory itself.
function resolveDocsPath() {
  const docs = readOption('docs') || process.env.DOCS_PATH;
  if (!docs) {
    throw new Error('Set DOCS_PATH or pass --docs <path-to-api.onlyoffice.com> (the documentation checkout supplying runnable examples).');
  }
  for (const candidate of [path.join(path.resolve(docs), 'site', 'docs'), path.join(path.resolve(docs), 'api.onlyoffice.com', 'site', 'docs')]) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(`Documentation checkout has no site/docs directory: ${path.resolve(docs)}`);
}

module.exports = {
  readOption,
  SOURCES,
  resolveSource,
  resolveSdkjsPaths,
  resolveSdkjsExt,
  resolveDocsPath,
};
