import { z } from 'zod';
import { EDITORS, classDetail, methodDetail, editorIndex, runtimeTypes, entries } from '../catalog.js';
import { readApi, hasApi } from '../data.js';
import { search, formatHit } from '../search.js';

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerGetMember(server) {
  server.registerTool(
    'get_member',
    {
      title: 'Get an API member',
      description:
        'Returns the full reference for one plugin API member: description, parameters, return type, ' +
        'the editor version it appeared in, whether it needs Developer Edition, and its docs link. ' +
        'Accepts "Class.Method" (ApiParagraph.AddText), a class (ApiParagraph), an executeMethod ' +
        'name (GetSelectedText), an event (onAddComment), a typedef, or a runtime member ' +
        '(Asc.plugin.callCommand, PluginConfig).',
      inputSchema: {
        name: z.string().min(1).describe('Exact member name as search_api printed it'),
        editor: z.enum(EDITORS).optional().describe('Editor to look in; omit to look in all of them'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ name, editor }) => ({ content: [{ type: 'text', text: describe(name, editor) }] }),
  );
}

/**
 * @param {string} rawName
 * @param {string} [editor]
 * @returns {string}
 */
export function describe(rawName, editor) {
  const name = normalize(rawName);

  const runtime = lookupRuntime(name);
  if (runtime) return runtime;

  const editors = editor ? [editor] : EDITORS;
  const found = [];
  for (const ed of editors) {
    const result = lookupInEditor(ed, name);
    if (result) found.push({ editor: ed, ...result });
  }

  if (!found.length) {
    const elsewhere = editor ? EDITORS.filter((ed) => ed !== editor && lookupInEditor(ed, name)) : [];
    if (elsewhere.length) {
      return `${name} does not exist in ${editor}. It exists in: ${elsewhere.join(', ')}.`;
    }
    const usedBy = parameterTypeUsers(name);
    if (usedBy.length) {
      return (
        `${name} is a parameter or result type, not a member: ${usedBy.slice(0, 6).join(', ')}` +
        `${usedBy.length > 6 ? ` and ${usedBy.length - 6} more` : ''} use it. It has no entry of its own in the ` +
        'API index, so its shape is only what those signatures say.'
      );
    }
    const { hits } = search(name, { editors, runtime: true, limit: 5 });
    const closest = hits.length ? `\n\nClosest matches:\n${hits.map(formatHit).join('\n')}` : '';
    return `${name} does not exist${editor ? ` in ${editor}` : ''}.${closest}`;
  }

  // Identical detail in several editors (most of the shared object model) prints once.
  const groups = new Map();
  for (const item of found) {
    const body = JSON.stringify(item.detail, null, 2);
    const key = `${item.title}\u0000${body}`;
    if (!groups.has(key)) groups.set(key, { title: item.title, body, editors: [] });
    groups.get(key).editors.push(item.editor);
  }
  return [...groups.values()].map((g) => `[${g.editors.join(', ')}] ${g.title}\n${g.body}`).join('\n\n');
}

/**
 * executeMethod parameter types (ContextMenuItem, OLEProperties, ...) are written into signatures
 * but have no entry of their own in artifacts/api. Which members name this one, so a lookup for it
 * can say "a type, used here" instead of a wrong "does not exist".
 * @param {string} name
 * @returns {string[]}
 */
function parameterTypeUsers(name) {
  if (!/^[A-Za-z_$][\w$]*$/.test(name)) return [];
  const word = new RegExp(`\\b${name}\\b`);
  const users = new Set();
  for (const editor of [...EDITORS, null]) {
    for (const entry of entries(editor)) {
      if (entry.name !== name && word.test(entry.signature)) {
        users.add(entry.kind === 'executeMethod' ? entry.name : entry.owner ? `${entry.owner}.${entry.name}` : entry.name);
      }
    }
  }
  return [...users].sort();
}

/** Accepts the spellings people actually write: window.Asc.plugin.x, executeMethod("X"), Api.X. */
function normalize(raw) {
  let name = raw.trim();
  const quoted = /^(?:window\.)?(?:Asc\.plugin\.)?(?:executeMethod|callMethodAsync|attachEditorEvent)\(\s*["']([^"']+)["']/.exec(name);
  if (quoted) return quoted[1];
  name = name.replace(/\(.*$/, '').replace(/^window\./, '');
  if (name.startsWith('Asc.plugin.')) name = `AscPlugin.${name.slice('Asc.plugin.'.length)}`;
  return name;
}

function lookupRuntime(name) {
  const types = runtimeTypes();
  const [owner, member, ...rest] = name.split('.');
  if (rest.length) return null;
  const type = types.get(owner);
  if (!type) {
    if (member) return null;
    // A plugin-window event (onClick, onWindowResize, ...) is a member of PluginEventMap, and an
    // executeMethod sdkjs leaves undocumented (AddContextMenuItem, ...) one of UndocumentedMethodArgs.
    const event = types.get('PluginEventMap')?.members?.[owner];
    if (event) return `[runtime] plugin-window event ${owner} (attachEvent)\n${JSON.stringify(event, null, 2)}`;
    const method = types.get('UndocumentedMethodArgs')?.members?.[owner];
    if (method) {
      return (
        `[all editors] executeMethod ${owner} (undocumented by ONLYOFFICE: no compatibility promise)\n` +
        JSON.stringify(method, null, 2)
      );
    }
    return null;
  }
  if (!member) {
    const { members, ...own } = type;
    const memberLines = Object.entries(members ?? {}).map(([n, m]) => `  ${m.signature ?? n}`);
    return (
      `[runtime] ${owner} (${type.section})\n${JSON.stringify(own, null, 2)}` +
      (memberLines.length ? `\n\nMembers:\n${memberLines.join('\n')}` : '')
    );
  }
  const detail = type.members?.[member];
  if (!detail) return null;
  return `[runtime] ${owner}.${member}\n${JSON.stringify(detail, null, 2)}`;
}

/**
 * @param {string} editor
 * @param {string} name
 * @returns {{ title: string, detail: any } | null}
 */
function lookupInEditor(editor, name) {
  const index = editorIndex(editor);
  const [owner, member, ...rest] = name.split('.');
  if (rest.length) return null;

  if (member) {
    if (!index.classes[owner]?.[member]) return null;
    return { title: `method ${owner}.${member}`, detail: methodDetail(editor, owner, member) };
  }

  if (index.classes[name]) {
    const { methods, ...own } = classDetail(editor, name) ?? {};
    const signatures = Object.values(index.classes[name]);
    return { title: `class ${name}`, detail: { ...own, methods: signatures } };
  }
  const execute = readApi(`${editor}/executeMethods.json`)[name];
  if (execute) return { title: `executeMethod ${name}`, detail: execute };
  const event = readApi(`${editor}/events.json`)[name];
  if (event) return { title: `event ${name}`, detail: event };
  const typedef = readApi(`${editor}/typedefs.json`)[name];
  if (typedef) return { title: `typedef ${name}`, detail: typedef };
  const shape = hasApi(`${editor}/executeMethodTypedefs.json`) ? readApi(`${editor}/executeMethodTypedefs.json`)[name] : undefined;
  if (shape) return { title: `typedef ${name} (taken or returned by executeMethods)`, detail: shape };
  return null;
}
