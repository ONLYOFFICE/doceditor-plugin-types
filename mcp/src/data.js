// Where the API tree and the config.json schema are read from. A packed package has them in
// mcp/data (see scripts/copy-data.js); a repository checkout reads the root, so a regenerated
// artifacts/api is picked up without copying.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MCP_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PACKED = path.join(MCP_ROOT, 'data');
const PACKED_API = path.join(PACKED, 'api');

const API_ROOT = fs.existsSync(PACKED_API) ? PACKED_API : path.join(MCP_ROOT, '..', 'artifacts', 'api');
const CONFIG_SCHEMA = fs.existsSync(PACKED_API)
  ? path.join(PACKED, 'config.schema.json')
  : path.join(MCP_ROOT, '..', 'schemas', 'config.schema.json');

const cache = new Map();

/**
 * Reads one JSON file of the API tree, relative to its root, e.g. `word/index.json`.
 * @param {string} relativePath
 * @returns {any}
 */
export function readApi(relativePath) {
  if (!cache.has(relativePath)) {
    cache.set(relativePath, JSON.parse(fs.readFileSync(path.join(API_ROOT, relativePath), 'utf8')));
  }
  return cache.get(relativePath);
}

/**
 * Whether a file of the API tree exists, relative to its root.
 * @param {string} relativePath
 * @returns {boolean}
 */
export function hasApi(relativePath) {
  return cache.has(relativePath) || fs.existsSync(path.join(API_ROOT, relativePath));
}

/** @returns {string} Absolute path of schemas/config.schema.json. */
export function configSchemaPath() {
  return CONFIG_SCHEMA;
}

/**
 * The self-contained declaration bundle for one editor (artifacts/ambient): every plugin global
 * plus that editor's `Api`, with no imports - what a plugin script is checked against.
 * @param {string} editor
 * @returns {string}
 */
export function ambientBundlePath(editor) {
  const name = `onlyoffice-doceditor-plugin-types.${editor}.ambient.d.ts`;
  return fs.existsSync(PACKED_API)
    ? path.join(PACKED, 'ambient', name)
    : path.join(MCP_ROOT, '..', 'artifacts', 'ambient', name);
}
