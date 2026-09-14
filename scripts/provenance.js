// Source provenance: where the generated output came from and whether it is fit to release.
//
// Both generators record it, so having one import it from the other made a shared contract look like
// a borrowed utility.

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const PACKAGE_ROOT = path.join(__dirname, '..');

function runGit(repo, args) {
  const result = spawnSync('git', ['-C', repo, ...args], {encoding: 'utf8'});
  return result.status === 0 ? result.stdout.trim() : null;
}

function getGitMetadata(repo) {
  if (!fs.existsSync(path.join(repo, '.git'))) return {commit: null, describe: null, dirty: null};
  const commit = runGit(repo, ['rev-parse', 'HEAD']);
  // `describe` is what ties this package's version to a product release: sdkjs tags releases as
  // `v9.5.0.150`, and this package's version mirrors the editor version those tags carry (see the
  // versioning table in README.md). Recording it makes the mapping auditable after the fact rather
  // than something a release engineer has to remember.
  const describe = runGit(repo, ['describe', '--tags', '--always']);
  const unstaged = spawnSync('git', ['-C', repo, 'diff', '--quiet'], {stdio: 'ignore'}).status;
  const staged = spawnSync('git', ['-C', repo, 'diff', '--cached', '--quiet'], {stdio: 'ignore'}).status;
  return {commit, describe, dirty: unstaged !== 0 || staged !== 0};
}

function sha256File(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex');
}

function packageVersion(packageName) {
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    return null;
  }
}

// Shared by both generators, because each reads a different set of repositories and a guard that
// only covers one of them is the bug it is meant to prevent: `--require-clean-sources` used to check
// sdkjs/sdkjs-forms only, while generate-plugin-methods.js was quietly reading sdkjs-ext too.
function assertSourcesReleasable(repositories) {
  if (process.argv.includes('--require-clean-sources')) {
    const dirty = Object.entries(repositories).filter(([, repo]) => repo.dirty).map(([name]) => name);
    if (dirty.length > 0) {
      throw new Error(`--require-clean-sources requires clean source checkouts; dirty: ${dirty.join(', ')}.`);
    }
  }

  // A release's version is the editor version its sources carry, so generating from a checkout that
  // sits *past* a tag produces types labelled with a release they were not built from. `git describe`
  // appends `-<commits>-g<sha>` in exactly that case; a checkout on the tag itself has no suffix.
  // This used to be prose in CONTRIBUTING ("move to the exact tag before publishing") and was
  // promptly violated - the 9.5.0 manifest recorded `v9.5.0.150-2-g586ec09e2d` - so it is a check now.
  if (process.argv.includes('--require-release-tag')) {
    const offTag = Object.entries(repositories)
      .filter(([, repo]) => repo.describe && /-\d+-g[0-9a-f]+$/.test(repo.describe))
      .map(([name, repo]) => `${name} is at ${repo.describe}`);
    if (offTag.length > 0) {
      throw new Error(`--require-release-tag requires every source checkout to sit exactly on a tag: ${offTag.join('; ')}. Check out the release tag and regenerate.`);
    }
  }
}

module.exports = { runGit, getGitMetadata, sha256File, packageVersion, assertSourcesReleasable };
