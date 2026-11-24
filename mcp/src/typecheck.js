// Type-checks a plugin's own scripts against one editor's declaration bundle, in process, with the
// TypeScript compiler API. Finds which scripts are the plugin's own by reading its HTML pages.

import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { ambientBundlePath } from './data.js';

// Bigger than any hand-written plugin script, smaller than the bundled libraries (jQuery, a
// framework build) that ship inside many plugins and are not the author's code to check.
const MAX_SCRIPT_BYTES = 300 * 1024;
const LIBRARY_PATH = /(^|\/)(vendor|vendors|lib|libs|third[-_]?party|node_modules|dist)\/|\.min\.js$|(^|\/)v1\/plugins(-ui)?\.js$/i;

/**
 * The plugin's own scripts: every local <script src> of every page under the directory, minus
 * libraries. Inline scripts are not checked.
 * @param {string} dir
 * @returns {{ checked: string[], skipped: { file: string, reason: string }[], pages: string[] }}
 */
export function findPluginScripts(dir) {
  const pages = walk(dir).filter((file) => file.endsWith('.html'));
  const checked = new Set();
  const skipped = new Map();
  for (const page of pages) {
    const html = fs.readFileSync(path.join(dir, page), 'utf8');
    for (const [, raw] of html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)) {
      // A tag written from a JS string (document.write) escapes its slashes: scripts\/code.js.
      const src = raw.replace(/\\\//g, '/');
      if (/^(https?:)?\/\//.test(src) || src.startsWith('data:')) continue;
      const rel = path.posix.normalize(path.posix.join(path.posix.dirname(page), src.split(/[?#]/)[0]));
      if (rel.startsWith('..')) {
        skipped.set(rel, 'outside the plugin directory');
        continue;
      }
      const abs = path.join(dir, rel);
      // No extension: the name is put together at runtime ("code" + suffix + ".js").
      if (!/\.[cm]?js$/i.test(rel)) skipped.set(rel, 'name built at runtime; pass `files`');
      else if (!fs.existsSync(abs)) skipped.set(rel, 'referenced by a page but missing');
      else if (LIBRARY_PATH.test(rel)) skipped.set(rel, 'a library, not plugin code');
      else if (fs.statSync(abs).size > MAX_SCRIPT_BYTES) skipped.set(rel, 'too large to be hand-written; probably a bundle');
      else checked.add(rel);
    }
  }
  return {
    checked: [...checked].sort(),
    skipped: [...skipped].map(([file, reason]) => ({ file, reason })),
    pages,
  };
}

/**
 * @typedef {object} Problem
 * @property {string} file   relative to the plugin directory
 * @property {number} line
 * @property {number} column
 * @property {number} code   TypeScript error code
 * @property {string} message
 */

/**
 * @param {string} dir
 * @param {string[]} files  relative to `dir`
 * @param {string} editor
 * @param {{ strict?: boolean }} [options]
 * @returns {{ problems: Problem[], undeclared: Map<string, number> }}
 *   `undeclared` counts "cannot find name" hits per name: globals that a library outside the
 *   checked files usually provides ($, jQuery, a framework), reported apart from real errors.
 */
export function typecheck(dir, files, editor, { strict = false } = {}) {
  const roots = [ambientBundlePath(editor), ...files.map((file) => path.join(dir, file))];
  const program = ts.createProgram(roots, {
    noEmit: true,
    allowJs: true,
    checkJs: true,
    strict,
    target: ts.ScriptTarget.ES2020,
    lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
    skipLibCheck: true,
    types: [],
  });

  const own = new Set(files.map((file) => path.resolve(dir, file)));
  /** @type {Problem[]} */
  const problems = [];
  const undeclared = new Map();
  for (const diagnostic of ts.getPreEmitDiagnostics(program)) {
    if (!diagnostic.file || !own.has(path.resolve(diagnostic.file.fileName))) continue;
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    // 2304/2552/2580-2583/2591-2592: a name used but declared nowhere in the program.
    if ([2304, 2552, 2580, 2581, 2582, 2583, 2591, 2592].includes(diagnostic.code)) {
      const name = /'([^']+)'/.exec(message)?.[1] ?? '?';
      undeclared.set(name, (undeclared.get(name) ?? 0) + 1);
      continue;
    }
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start ?? 0);
    problems.push({
      file: path.relative(dir, diagnostic.file.fileName).split(path.sep).join('/'),
      line: line + 1,
      column: character + 1,
      code: diagnostic.code,
      message,
    });
  }
  return { problems, undeclared };
}

function walk(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(path.join(dir, prefix), { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(dir, rel));
    else out.push(rel);
  }
  return out;
}
