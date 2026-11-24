// validate_config and typecheck_plugin, through the real server, on plugins written for the test.

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { MARKETPLACE_REQUIRED, expandIconTemplate } from '../src/config-check.js';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const client = new Client({ name: 'test', version: '0.0.0' });
let tmp;

before(async () => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'oo-checks-'));
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [path.join(HERE, '..', 'src', 'index.js')] }));
});
after(async () => {
  await client.close();
  fs.rmSync(tmp, { recursive: true, force: true });
});

async function call(name, args) {
  const result = await client.callTool({ name, arguments: args });
  return result.content[0].text;
}

/** A fresh scaffold to break in one way per test. */
async function scaffold(name) {
  const dir = path.join(tmp, name);
  await call('create_plugin', { name, description: 'Test', editors: ['word', 'cell'], kind: 'panel', directory: dir });
  return dir;
}

function editJson(file, change) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  change(data);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

test('the marketplace-only fields match the schema generator', () => {
  const generator = require('../../scripts/generate-config-schema.js');
  assert.deepEqual(MARKETPLACE_REQUIRED.PluginConfig, generator.ROOT_REQUIRED_BEYOND_TYPES);
  assert.deepEqual(MARKETPLACE_REQUIRED.StoreConfig, generator.DEFINITION_REQUIRED_BEYOND_TYPES.StoreConfig);
});

test('icon path templates expand the way the editor expands them', () => {
  assert.deepEqual(expandIconTemplate('resources/%theme-type%(light|dark)/icon%scale%(100|150).%extension%(png)'), [
    'resources/light/icon.png',
    'resources/light/icon@1.5x.png',
    'resources/dark/icon.png',
    'resources/dark/icon@1.5x.png',
  ]);
  assert.deepEqual(expandIconTemplate('img/%scale%(100|200).%extension%(png)'), ['img/icon.png', 'img/icon@2x.png']);
});

test('validate_config: a fresh scaffold only lacks screenshots', async () => {
  const text = await call('validate_config', { path: await scaffold('fresh') });
  assert.match(text, /^1 marketplace\./);
  assert.match(text, /no screenshots/);
});

test('validate_config: names the field a typo meant and the files that are missing', async () => {
  const dir = await scaffold('broken');
  editJson(path.join(dir, 'config.json'), (config) => {
    config.variations[0].isvisual = true;
    delete config.offered;
  });
  fs.rmSync(path.join(dir, 'resources', 'dark', 'icon@2x.png'));
  const text = await call('validate_config', { path: path.join(dir, 'config.json') });
  assert.match(text, /ERROR variations\[0\]: unknown field "isvisual" - the editor ignores it; did you mean "isVisual"\?/);
  assert.match(text, /ERROR variations\[0\]\.icons2\[1\]\["200%"\]\.normal: icon "resources\/dark\/icon@2x\.png" does not exist/);
  assert.match(text, /MARKETPLACE config\.json: missing "offered"/);
});

test('validate_config: a relative plugins.js is an error', async () => {
  const dir = await scaffold('relative-sdk');
  const page = path.join(dir, 'index.html');
  fs.writeFileSync(page, fs.readFileSync(page, 'utf8').replace('https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js', '../v1/plugins.js'));
  const text = await call('validate_config', { path: dir });
  assert.match(text, /loads plugins\.js from the relative path "\.\.\/v1\/plugins\.js"/);
});

test('validate_config: accepts text and reports invalid JSON', async () => {
  assert.match(await call('validate_config', { config: '{ "name": ' }), /not valid JSON/);
});

test('typecheck_plugin: a fresh scaffold has no type errors', async () => {
  const text = await call('typecheck_plugin', { path: await scaffold('typed') });
  assert.match(text, /^Checked scripts\/code\.js against word, cell\./);
  assert.match(text, /No type errors\./);
});

test('typecheck_plugin: reports invented members and keeps undeclared globals apart', async () => {
  const dir = await scaffold('invented');
  const file = path.join(dir, 'scripts', 'code.js');
  fs.appendFileSync(
    file,
    [
      'window.Asc.plugin.callCommand(function () { Api.GetDocument().AddMagicText("x"); });',
      'window.Asc.plugin.executeMethod("GetSelectedTxt", []);',
      '$("#text").hide();',
      '',
    ].join('\n'),
  );
  const text = await call('typecheck_plugin', { path: dir, editors: ['word'] });
  assert.match(text, /TS2339 Property 'AddMagicText' does not exist on type 'ApiDocument'/);
  assert.match(text, /TS2769 No overload matches this call/);
  assert.match(text, /Not declared anywhere the checker can see: \$ \(1\)/);
});

test('typecheck_plugin: marks problems that hit only some editors', async () => {
  const dir = await scaffold('per-editor');
  fs.appendFileSync(
    path.join(dir, 'scripts', 'code.js'),
    'window.Asc.plugin.callCommand(function () { Api.GetActiveSheet(); });\n',
  );
  const text = await call('typecheck_plugin', { path: dir });
  assert.match(text, /\[word only\] Property 'GetActiveSheet' does not exist/);
});
