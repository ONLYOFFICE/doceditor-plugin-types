import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { checkConfig } from '../config-check.js';

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerValidateConfig(server) {
  server.registerTool(
    'validate_config',
    {
      title: 'Validate config.json',
      description:
        'Checks a plugin config.json against the official schema and explains each problem: unknown ' +
        'or misspelled fields, wrong values, what the marketplace still needs. Given the plugin ' +
        'directory it also checks that every icon, page and screenshot the config names exists, and ' +
        'that index.html loads plugins.js from a URL that works outside the sdkjs-plugins repository.',
      inputSchema: {
        path: z.string().optional().describe('Absolute path to the plugin directory or to its config.json'),
        config: z.string().optional().describe('config.json text, when there is no file to point at'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ path: target, config }) => {
      let text = config;
      let dir;
      if (target) {
        if (!path.isAbsolute(target)) return fail('`path` must be absolute.');
        const file = fs.existsSync(target) && fs.statSync(target).isDirectory() ? path.join(target, 'config.json') : target;
        if (!fs.existsSync(file)) return fail(`${file} does not exist.`);
        text = fs.readFileSync(file, 'utf8');
        dir = path.dirname(file);
      }
      if (text === undefined) return fail('Pass `path` or `config`.');

      const findings = checkConfig(text, dir);
      if (!findings.length) {
        return ok(`config.json is valid${dir ? ', and every file it names exists' : ''}.`);
      }
      const label = { error: 'ERROR', marketplace: 'MARKETPLACE', warning: 'WARNING' };
      const counts = ['error', 'marketplace', 'warning']
        .map((level) => [level, findings.filter((f) => f.level === level).length])
        .filter(([, n]) => n)
        .map(([level, n]) => `${n} ${level}${n === 1 ? '' : 's'}`);
      const lines = findings.map((f) => `${label[f.level]} ${f.where}: ${f.message}`);
      const tail = dir ? '' : '\n\nFiles were not checked: pass `path` to check icons, pages and plugins.js.';
      return ok(`${counts.join(', ')}.\n\n${lines.join('\n')}${tail}`);
    },
  );
}

function ok(text) {
  return { content: [{ type: 'text', text }] };
}

function fail(text) {
  return { content: [{ type: 'text', text }], isError: true };
}
