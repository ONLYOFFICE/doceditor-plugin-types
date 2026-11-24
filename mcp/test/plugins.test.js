// Every sample and every scaffold kind must be a plugin the editor accepts: config.json passes the
// package's schema, the icons it names exist, and its code type-checks against the editor it targets.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import Ajv2019 from 'ajv/dist/2019.js';
import { listSamples, readSample } from '../src/samples.js';
import { buildPlugin, PLUGIN_KINDS } from '../src/scaffold.js';
import { configSchemaPath } from '../src/data.js';

const require = createRequire(import.meta.url);
const REPO = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const validate = new Ajv2019({ allErrors: true, strict: false }).compile(
  JSON.parse(fs.readFileSync(configSchemaPath(), 'utf8')),
);

function assertValidConfig(config, label) {
  assert.ok(validate(config), `${label}: ${JSON.stringify(validate.errors, null, 2)}`);
}

/** Type-checks plugin scripts against one editor's self-contained declaration bundle. */
function typecheck(editor, files) {
  const bundle = path.join(REPO, 'artifacts', 'ambient', `onlyoffice-doceditor-plugin-types.${editor}.ambient.d.ts`);
  const tsc = require.resolve('typescript/bin/tsc');
  const args = ['--noEmit', '--allowJs', '--checkJs', '--strict', '--target', 'es2020', '--lib', 'es2020,dom', '--skipLibCheck', bundle, ...files];
  try {
    execFileSync(process.execPath, [tsc, ...args], { encoding: 'utf8' });
  } catch (error) {
    assert.fail(`tsc for ${editor}:\n${error.stdout}`);
  }
}

test('every sample config passes the schema', () => {
  for (const { id } of listSamples()) {
    const sample = readSample(id);
    const config = JSON.parse(sample.files.find((file) => file.path === 'config.json').text);
    assertValidConfig(config, id);
    assert.deepEqual(config.variations[0].EditorsSupport, sample.meta.editors, `${id}: sample.json editors`);
  }
});

test('every scaffold kind writes a config that passes the schema and names only files it writes', () => {
  for (const kind of PLUGIN_KINDS) {
    const { files } = buildPlugin({ name: `Test ${kind}`, description: 'Test', editors: ['word', 'cell'], kind });
    const config = JSON.parse(String(files.get('config.json')));
    assertValidConfig(config, kind);
    const variation = config.variations[0];
    const named = [
      ...variation.icons,
      ...variation.icons2.flatMap((set) => Object.values(set).flatMap((entry) => entry.normal ?? [])),
      variation.url,
    ];
    for (const file of named) assert.ok(files.has(file), `${kind}: ${file} is named but not written`);
    for (const dir of Object.values(variation.store.icons)) {
      assert.ok([...files.keys()].some((file) => file.startsWith(`${dir}/`)), `${kind}: store icons in ${dir}`);
    }
  }
});

test('scaffold raises minVersion for kinds older editors do not know', () => {
  const { minVersion, notes } = buildPlugin({ name: 'x', description: 'x', editors: ['word'], kind: 'panelRight', minVersion: '7.0.0' });
  assert.equal(minVersion, '8.1.0');
  assert.match(notes[0], /raised from 7\.0\.0 to 8\.1\.0/);
});

test('scaffold type setup resolves the types package and declares the globals over EditorsSupport', () => {
  const { files } = buildPlugin({ name: 'My Plugin!', description: 'x', editors: ['word', 'cell'], kind: 'panel' });
  const jsconfig = JSON.parse(String(files.get('jsconfig.json')));
  // Without these, jsconfig's "classic" default cannot resolve the package and checking silently stops.
  assert.equal(jsconfig.compilerOptions.moduleResolution, 'bundler');
  assert.equal(jsconfig.compilerOptions.checkJs, true);
  assert.match(String(files.get('types/globals.d.ts')), /var Api: ApiOf<"word" \| "cell">;/);
  const pkg = JSON.parse(String(files.get('package.json')));
  assert.equal(pkg.name, 'my-plugin');
  assert.match(pkg.devDependencies['@onlyoffice/doceditor-plugin-types'], /^\^\d+\.0\.0$/);
});

test('placeholder icons are valid PNGs of the right size', () => {
  const { files } = buildPlugin({ name: 'x', description: 'x', editors: ['word'], kind: 'panel' });
  const icon = /** @type {Buffer} */ (files.get('resources/light/icon@2x.png'));
  assert.equal(icon.subarray(1, 4).toString('ascii'), 'PNG');
  assert.equal(icon.readUInt32BE(16), 56);
  assert.equal(icon.readUInt32BE(20), 56);
});

test('sample and scaffold code type-checks against each editor it targets', { timeout: 300_000 }, () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oo-plugin-'));
  try {
    /** @type {Map<string, string[]>} */
    const byEditor = new Map();
    const add = (editor, file) => byEditor.set(editor, [...(byEditor.get(editor) ?? []), file]);

    for (const { id, editors } of listSamples()) {
      const file = path.join(dir, `sample-${id}.js`);
      fs.writeFileSync(file, readSample(id).files.find((f) => f.path === 'scripts/code.js').text);
      for (const editor of editors) add(editor, file);
    }
    for (const kind of PLUGIN_KINDS) {
      const file = path.join(dir, `scaffold-${kind}.js`);
      const editors = ['word', 'cell', 'slide', 'pdf'];
      fs.writeFileSync(file, String(buildPlugin({ name: 'x', description: 'x', editors, kind }).files.get('scripts/code.js')));
      for (const editor of editors) add(editor, file);
    }
    for (const [editor, files] of byEditor) typecheck(editor, files);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
