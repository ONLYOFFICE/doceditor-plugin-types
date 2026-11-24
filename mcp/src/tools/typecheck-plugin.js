import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { findPluginScripts, typecheck } from '../typecheck.js';

const EDITORS = ['word', 'cell', 'slide', 'pdf', 'forms'];
const MAX_LINES = 60;

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerTypecheckPlugin(server) {
  server.registerTool(
    'typecheck_plugin',
    {
      title: 'Type-check a plugin',
      description:
        'Runs the TypeScript checker over a plugin\'s own JavaScript against the official plugin API ' +
        'types, once per editor in its config.json. Catches calls to members that do not exist (an ' +
        'invented Api method, a misspelled executeMethod name), wrong argument counts and types, and ' +
        'returning editor objects out of callCommand. Scripts are found through the plugin\'s HTML ' +
        'pages; bundled libraries are skipped.',
      inputSchema: {
        path: z.string().describe('Absolute path to the plugin directory'),
        editors: z.array(z.enum(EDITORS)).optional().describe('Editors to check against; default: EditorsSupport from config.json'),
        files: z.array(z.string()).optional().describe('Scripts to check, relative to the directory; default: found through the pages'),
        strict: z.boolean().default(false).describe('Also report what TypeScript strict mode reports (implicit any, possible null)'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ path: dir, editors, files, strict }) => {
      if (!path.isAbsolute(dir) || !fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
        return fail('`path` must be the absolute path of an existing plugin directory.');
      }

      const targets = editors ?? editorsFromConfig(dir);
      if (!targets.length) return fail('No editors to check: config.json has no EditorsSupport; pass `editors`.');

      const found = findPluginScripts(dir);
      const scripts = files ?? found.checked;
      const missing = scripts.filter((file) => !fs.existsSync(path.join(dir, file)));
      if (missing.length) return fail(`Not found: ${missing.join(', ')}`);
      if (!scripts.length) {
        return fail(
          `No plugin scripts found through ${found.pages.length} page(s)` +
            (found.skipped.length ? ` (skipped: ${found.skipped.map((s) => `${s.file} - ${s.reason}`).join('; ')})` : '') +
            '. Pass `files` to name them.',
        );
      }

      // The same mistake usually shows in every editor, worded with that editor's type names
      // (WordMethodArgs, CellMethodArgs); print it once, by place and code, with the editors it hits.
      const merged = new Map();
      const undeclared = new Map();
      for (const editor of targets) {
        const result = typecheck(dir, scripts, editor, { strict });
        for (const p of result.problems) {
          const key = `${p.file}:${p.line}:${p.column}:${p.code}`;
          if (!merged.has(key)) merged.set(key, { ...p, editors: [] });
          merged.get(key).editors.push(editor);
        }
        for (const [name, count] of result.undeclared) undeclared.set(name, Math.max(undeclared.get(name) ?? 0, count));
      }

      const problems = [...merged.values()].sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line || a.column - b.column);
      const head = `Checked ${scripts.join(', ')} against ${targets.join(', ')}${strict ? ' (strict)' : ''}.`;
      const parts = [head];

      if (!problems.length) parts.push('No type errors.');
      else {
        const lines = problems.slice(0, MAX_LINES).map((p) => {
          const scope = p.editors.length === targets.length ? '' : ` [${p.editors.join(', ')} only]`;
          return `${p.file}:${p.line}:${p.column} TS${p.code}${scope} ${p.message.replace(/\n\s*/g, ' ')}`;
        });
        if (problems.length > MAX_LINES) lines.push(`... and ${problems.length - MAX_LINES} more.`);
        const byCode = new Map();
        for (const p of problems) byCode.set(p.code, (byCode.get(p.code) ?? 0) + 1);
        const summary = [...byCode].sort((a, b) => b[1] - a[1]).map(([code, n]) => `TS${code} x${n}`).join(', ');
        parts.push(`${problems.length} problem${problems.length === 1 ? '' : 's'} (${summary}):\n${lines.join('\n')}`);
        if (problems.some((p) => p.editors.length < targets.length)) {
          parts.push(
            'A problem marked "[... only]" appears in some editors but not others: either the member is ' +
              'missing in those editors, or the line sits in a branch for another editor and can be ignored.',
          );
        }
        if (problems.some((p) => p.code === 2339 || p.code === 2551 || p.code === 2769)) {
          parts.push('For "does not exist" and "no overload matches", search_api and get_member show what does exist.');
        }
      }
      if (undeclared.size) {
        const names = [...undeclared].map(([name, count]) => `${name} (${count})`).join(', ');
        parts.push(`Not declared anywhere the checker can see: ${names}. Usually globals from a library page script that is not checked; otherwise a typo.`);
      }
      if (!files && found.skipped.length) {
        parts.push(`Not checked: ${found.skipped.map((s) => `${s.file} (${s.reason})`).join(', ')}.`);
      }
      return { content: [{ type: 'text', text: parts.join('\n\n') }] };
    },
  );
}

function editorsFromConfig(dir) {
  try {
    const config = JSON.parse(fs.readFileSync(path.join(dir, 'config.json'), 'utf8'));
    const editors = new Set((config.variations ?? []).flatMap((v) => v.EditorsSupport ?? []));
    return EDITORS.filter((editor) => editors.has(editor));
  } catch {
    return [];
  }
}

function fail(text) {
  return { content: [{ type: 'text', text }], isError: true };
}
