// Starts the real server over stdio and talks to it the way a client does.

import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const ENTRY = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'index.js');
const client = new Client({ name: 'test', version: '0.0.0' });

before(async () => {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [ENTRY] }));
});
after(() => client.close());

/** @param {string} name @param {object} args */
async function call(name, args) {
  const result = await client.callTool({ name, arguments: args });
  return result.content[0].text;
}

test('exposes the tools', async () => {
  const { tools } = await client.listTools();
  assert.deepEqual(tools.map((tool) => tool.name).sort(), [
    'create_plugin',
    'get_member',
    'get_sample',
    'list_editors',
    'search_api',
    'typecheck_plugin',
    'validate_config',
  ]);
});

test('get_sample lists the samples and returns one with its files', async () => {
  const list = await call('get_sample', {});
  assert.match(list, /^insert-text \[panel; word\]/m);
  const sample = await call('get_sample', { id: 'insert-text' });
  assert.match(sample, /--- config\.json ---/);
  assert.match(sample, /--- scripts\/code\.js ---[\s\S]*Asc\.scope\.text/);
  const missing = await client.callTool({ name: 'get_sample', arguments: { id: 'nope' } });
  assert.equal(missing.isError, true);
});

test('create_plugin returns the text files when no directory is given', async () => {
  const text = await call('create_plugin', { name: 'Demo', description: 'Demo', editors: ['word'] });
  assert.match(text, /^panel plugin "Demo" for word, minVersion 7\.0\.0\./);
  assert.match(text, /--- config\.json ---/);
  assert.match(text, /https:\/\/onlyoffice\.github\.io\/sdkjs-plugins\/v1\/plugins\.js/);
});

test('create_plugin writes into an empty directory and refuses a non-empty one', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'oo-create-'));
  try {
    const target = path.join(dir, 'demo');
    const args = { name: 'Demo', description: 'Demo', editors: ['word'], kind: 'window', directory: target };
    assert.match(await call('create_plugin', args), /Wrote 22 files/);
    assert.ok(fs.existsSync(path.join(target, 'jsconfig.json')));
    assert.ok(fs.existsSync(path.join(target, 'resources', 'dark', 'icon@1.5x.png')));
    const again = await client.callTool({ name: 'create_plugin', arguments: args });
    assert.equal(again.isError, true);
    assert.match(again.content[0].text, /is not empty; nothing was written/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('list_editors names every editor', async () => {
  const editors = JSON.parse(await call('list_editors', {}));
  assert.deepEqual(Object.keys(editors).sort(), ['cell', 'forms', 'pdf', 'slide', 'word']);
});

test('search_api puts an exact name first', async () => {
  const text = await call('search_api', { query: 'GetSelectedText' });
  assert.match(text.split('\n')[0], /executeMethod\("GetSelectedText"/);
});

test('search_api says when the edition filter hid the answer', async () => {
  const text = await call('search_api', { query: 'AnnotateParagraph', editor: 'word', edition: 'community' });
  assert.match(text, /^Nothing matches/);
  assert.match(text, /left out by edition/);
});

test('get_member returns a method with its docs link', async () => {
  const text = await call('get_member', { name: 'ApiParagraph.AddText', editor: 'word' });
  assert.match(text, /^\[word\] method ApiParagraph\.AddText/);
  assert.match(text, /"docsUrl": "https:\/\/api\.onlyoffice\.com\//);
});

test('get_member reads the runtime under the names people write', async () => {
  const text = await call('get_member', { name: 'window.Asc.plugin.callCommand' });
  assert.match(text, /^\[runtime\] AscPlugin\.callCommand/);
  assert.match(text, /Asc\.scope/);
});

test('get_member finds plugin-window events', async () => {
  const text = await call('get_member', { name: 'onClick' });
  assert.match(text, /^\[runtime\] plugin-window event onClick/);
});

test('get_member says where a member exists when it is not in the asked editor', async () => {
  const text = await call('get_member', { name: 'AnnotateParagraph', editor: 'cell' });
  assert.match(text, /does not exist in cell\. It exists in: word/);
});

test('search_api finds executeMethod names sdkjs leaves undocumented', async () => {
  const text = await call('search_api', { query: 'AddContextMenuItem' });
  assert.match(text.split('\n')[0], /^\[all editors; undocumented\] executeMethod\("AddContextMenuItem", \[items: ContextMenuItems\]/);
});

test('get_member returns the shape executeMethods take', async () => {
  const text = await call('get_member', { name: 'OLEProperties', editor: 'word' });
  assert.match(text, /^\[word\] typedef OLEProperties \(taken or returned by executeMethods\)/);
  assert.match(text, /"objectId": \{/);
});

test('get_member calls a type with no entry of its own a type instead of saying it does not exist', async () => {
  const text = await call('get_member', { name: 'localeTranslate' });
  assert.match(text, /^localeTranslate is a parameter or result type, not a member: Button use it\./);
});

test('get_member reads the editor theme a plugin receives', async () => {
  const text = await call('get_member', { name: 'AscTheme.Type' });
  assert.match(text, /^\[runtime\] AscTheme\.Type\n/);
  assert.match(text, /"signature": "Type: \\"light\\" \| \\"dark\\";"/);
});

test('get_member says plainly that an invented member does not exist', async () => {
  const text = await call('get_member', { name: 'ApiParagraph.AddMagicText', editor: 'word' });
  assert.match(text, /^ApiParagraph\.AddMagicText does not exist in word\./);
});
