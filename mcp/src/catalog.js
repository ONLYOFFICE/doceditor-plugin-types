// The API tree as a flat list of members, plus reads of one member's detail. Knows the tree's
// layout (index.json, classes/<Class>.json or classes/<Class>/<Method>.json, executeMethods.json,
// events.json, typedefs.json, runtime.json) so the tools don't have to.

import { readApi, hasApi } from './data.js';

/** @typedef {'method' | 'executeMethod' | 'event' | 'typedef' | 'runtime'} Kind */

/**
 * One searchable member. `owner` is the class for `method`, the runtime type (AscPlugin,
 * PluginConfig, ...) for a runtime member, and empty otherwise.
 * @typedef {object} Entry
 * @property {string | null} editor  null for the editor-independent plugin runtime
 * @property {Kind} kind
 * @property {string} owner
 * @property {string} name
 * @property {string} signature
 * @property {string} description
 * @property {string} [since]
 * @property {boolean} paid          absent from Community Edition builds
 */

export const EDITORS = Object.freeze(['word', 'cell', 'slide', 'pdf', 'forms']);
export const RUNTIME_SECTIONS = Object.freeze(['plugin', 'config', 'services']);

/** @param {string} editor @param {string} className */
export function classDetail(editor, className) {
  if (hasApi(`${editor}/classes/${className}.json`)) return readApi(`${editor}/classes/${className}.json`);
  if (hasApi(`${editor}/classes/${className}/_class.json`)) return readApi(`${editor}/classes/${className}/_class.json`);
  return null;
}

/** @param {string} editor @param {string} className @param {string} method */
export function methodDetail(editor, className, method) {
  const cls = classDetail(editor, className);
  if (!cls) return null;
  if (!cls.sharded) return cls.methods?.[method] ?? null;
  const file = `${editor}/classes/${className}/${method}.json`;
  return hasApi(file) ? readApi(file) : null;
}

/** @param {string} editor */
export function editorIndex(editor) {
  return readApi(`${editor}/index.json`);
}

/** Every runtime type, keyed by name, with the section it lives in. */
export function runtimeTypes() {
  const runtime = readApi('runtime.json');
  const types = new Map();
  for (const section of RUNTIME_SECTIONS) {
    for (const [name, type] of Object.entries(runtime[section] ?? {})) types.set(name, { section, ...type });
  }
  return types;
}

const entryCache = new Map();

/**
 * Every member of one editor, or of the plugin runtime when `editor` is null.
 * @param {string | null} editor
 * @returns {Entry[]}
 */
export function entries(editor) {
  const key = editor ?? 'runtime';
  if (!entryCache.has(key)) entryCache.set(key, editor ? editorEntries(editor) : runtimeEntries());
  return entryCache.get(key);
}

function editorEntries(editor) {
  const index = editorIndex(editor);
  const paidMethods = new Set(index.paidMethods ?? []);
  const paidExecute = new Set(index.paidExecuteMethods ?? []);
  /** @type {Entry[]} */
  const list = [];

  for (const [className, members] of Object.entries(index.classes)) {
    for (const [name, signature] of Object.entries(members)) {
      const detail = methodDetail(editor, className, name) ?? {};
      list.push({
        editor,
        kind: 'method',
        owner: className,
        name,
        signature,
        description: detail.description ?? '',
        since: detail.since,
        paid: paidMethods.has(`${className}.${name}`) || Boolean(detail.requires),
      });
    }
  }

  const execute = readApi(`${editor}/executeMethods.json`);
  for (const [name, detail] of Object.entries(execute)) {
    list.push({
      editor,
      kind: 'executeMethod',
      owner: '',
      name,
      signature: detail.signature ?? index.executeMethods[name],
      description: detail.description ?? '',
      since: detail.since,
      paid: paidExecute.has(name) || Boolean(detail.requires),
    });
  }

  for (const [name, detail] of Object.entries(readApi(`${editor}/events.json`))) {
    const params = (detail.params ?? []).map((p) => `${p.name}: ${p.type}`).join(', ');
    list.push({
      editor,
      kind: 'event',
      owner: '',
      name,
      signature: `attachEditorEvent("${name}", (${params}) => void)`,
      description: detail.description ?? '',
      since: detail.since,
      paid: Boolean(detail.requires),
    });
  }

  // The object model's typedefs, then the shapes executeMethods take and return. The second file is
  // newer than some published trees, so its absence is not an error.
  const executeTypedefs = hasApi(`${editor}/executeMethodTypedefs.json`) ? readApi(`${editor}/executeMethodTypedefs.json`) : {};
  for (const source of [readApi(`${editor}/typedefs.json`), executeTypedefs]) {
    for (const [name, detail] of Object.entries(source)) {
      list.push({
        editor,
        kind: 'typedef',
        owner: '',
        name,
        signature: typedefSignature(name, detail),
        description: detail.description ?? '',
        since: detail.since,
        paid: Boolean(detail.requires),
      });
    }
  }
  return list;
}

/** `type X = A | B` for an alias, `X { a: string; b?: number }` for an object typedef. */
function typedefSignature(name, detail) {
  if (!detail.properties) return `type ${name} = ${detail.type ?? 'object'}`;
  const fields = Object.entries(detail.properties).map(([key, p]) => `${key}${p.optional ? '?' : ''}: ${p.type}`);
  return `${name} { ${fields.join('; ')} }`;
}

// Type-level plumbing behind executeMethod's overloads, not something a plugin author looks up:
// UndocumentedMethodArgs is listed by its members (as executeMethod entries), the rest not at all.
const PLUMBING = new Set(['UndocumentedMethodArgs', 'UndocumentedMethodReturnMap', 'UndocumentedMethodName', 'UndocumentedMethodReturn']);

function runtimeEntries() {
  /** @type {Entry[]} */
  const list = [];
  for (const [typeName, type] of runtimeTypes()) {
    if (PLUMBING.has(typeName) && typeName !== 'UndocumentedMethodArgs') continue;
    if (typeName === 'UndocumentedMethodArgs') {
      pushMembers(list, typeName, type);
      continue;
    }
    list.push({
      editor: null,
      kind: 'runtime',
      owner: '',
      name: typeName,
      // A type that has members is listed by them; its inline text can be a whole map.
      signature: type.members || !type.type ? `${type.kind ?? 'interface'} ${typeName}` : `type ${typeName} = ${type.type}`,
      description: type.description ?? '',
      since: type.since,
      paid: Boolean(type.requires),
    });
    pushMembers(list, typeName, type);
  }
  return list;
}

/**
 * One entry per member of a runtime type. Two maps hold something else than members, and are
 * presented the way they are used: PluginEventMap the plugin-window events, UndocumentedMethodArgs
 * the executeMethod names sdkjs leaves out of its docs (AddContextMenuItem, ResizeWindow, ...),
 * which work in every editor and appear in no editor's executeMethods.json.
 * @param {Entry[]} list
 * @param {string} typeName
 * @param {any} type
 */
function pushMembers(list, typeName, type) {
  for (const [name, member] of Object.entries(type.members ?? {})) {
    const signature = member.signature ?? name;
    const tuple = /^\w+\??:\s*\[(.*)\];?$/s.exec(signature)?.[1];
    const as =
      tuple === undefined ? null : typeName === 'PluginEventMap' ? 'event' : typeName === 'UndocumentedMethodArgs' ? 'executeMethod' : null;
    list.push({
      editor: null,
      kind: as ?? 'runtime',
      owner: as ? '' : typeName,
      name,
      signature:
        as === 'event'
          ? `attachEvent("${name}", (${tuple}) => void)`
          : as === 'executeMethod'
            ? `executeMethod("${name}", [${tuple}], callback?)`
            : signature,
      description: member.description ?? '',
      since: member.since,
      paid: Boolean(member.requires),
    });
  }
}

/**
 * Compares dotted version strings numerically: "10.0.0" > "9.3.1".
 * @param {string} a @param {string} b
 * @returns {number} negative, zero or positive
 */
export function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const diff = (pa[i] || 0) - (pb[i] || 0);
    if (diff) return diff;
  }
  return 0;
}
