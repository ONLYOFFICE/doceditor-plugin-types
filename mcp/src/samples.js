// The sample plugins in mcp/samples: one directory each, with sample.json describing it and the
// plugin's own files beside it. Icons are left out - create_plugin generates them.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SAMPLES_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'samples');

/**
 * @typedef {object} SampleMeta
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} editors
 * @property {string} kind
 * @property {string[]} shows  the techniques the sample demonstrates
 */

/** @returns {SampleMeta[]} */
export function listSamples() {
  return fs
    .readdirSync(SAMPLES_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ id: entry.name, ...readJson(path.join(SAMPLES_ROOT, entry.name, 'sample.json')) }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * @param {string} id
 * @returns {{ meta: SampleMeta, files: { path: string, text: string }[] } | null}
 */
export function readSample(id) {
  const meta = listSamples().find((sample) => sample.id === id);
  if (!meta) return null;
  const dir = path.join(SAMPLES_ROOT, id);
  const files = walk(dir)
    .filter((file) => file !== 'sample.json')
    .map((file) => ({ path: file, text: fs.readFileSync(path.join(dir, file), 'utf8') }));
  return { meta, files };
}

/** Relative paths of every file under `dir`, with forward slashes, config.json first. */
function walk(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(path.join(dir, prefix), { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(dir, rel));
    else out.push(rel);
  }
  const order = (file) => ['config.json', 'index.html'].indexOf(file) + 1 || 3;
  return out.sort((a, b) => order(a) - order(b) || a.localeCompare(b));
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}
