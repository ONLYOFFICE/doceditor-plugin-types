// Copies what the server reads from the repository root into mcp/data, so the published package
// carries the API tree it was built with and works offline. Runs as `prepack`; in a checkout the
// server reads the root directly and this copy is not needed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const MCP_ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = path.join(MCP_ROOT, '..');
const DATA = path.join(MCP_ROOT, 'data');

const COPIES = [
  ['artifacts/api', 'api'],
  ['artifacts/ambient', 'ambient'],
  ['schemas/config.schema.json', 'config.schema.json'],
];

fs.rmSync(DATA, { recursive: true, force: true });
for (const [from, to] of COPIES) {
  fs.cpSync(path.join(REPO_ROOT, from), path.join(DATA, to), { recursive: true });
}
fs.copyFileSync(path.join(REPO_ROOT, 'LICENSE'), path.join(MCP_ROOT, 'LICENSE'));

console.log(`Copied ${COPIES.map(([from]) => from).join(', ')} and LICENSE into mcp/`);
