import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { buildPlugin, PLUGIN_KINDS } from '../scaffold.js';

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerCreatePlugin(server) {
  server.registerTool(
    'create_plugin',
    {
      title: 'Create a plugin skeleton',
      description:
        'Creates a minimal working ONLYOFFICE plugin: config.json that passes the official schema ' +
        '(new guid, icons, store block), index.html loading plugins.js from its absolute URL, ' +
        'scripts/code.js, and placeholder icons. With `directory` the files are written there (it must ' +
        'not exist or be empty); without it the text files are returned and the icons are left out.',
      inputSchema: {
        name: z.string().min(1).max(100).describe('Plugin name shown in the editor'),
        description: z.string().min(1).describe('One sentence: what the plugin does'),
        editors: z.array(z.enum(['word', 'cell', 'slide', 'pdf'])).min(1).describe('Editors the plugin runs in'),
        kind: z
          .enum(PLUGIN_KINDS)
          .default('panel')
          .describe(
            'panel: left side panel; panelRight: right side panel (8.1+); window: modal dialog with ' +
              'OK/Cancel; background: no UI, reacts to events (8.1+)',
          ),
        offered: z.string().optional().describe('Author or company for the marketplace'),
        minVersion: z.string().regex(/^\d+\.\d+\.\d+$/).optional().describe('Lowest supported editor version, e.g. "8.2.0"'),
        directory: z.string().optional().describe('Absolute path to write the plugin into'),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
    },
    async ({ directory, ...options }) => {
      const { files, minVersion, notes } = buildPlugin(options);
      const summary = [`${options.kind} plugin "${options.name}" for ${options.editors.join(', ')}, minVersion ${minVersion}.`, ...notes];

      if (!directory) {
        const text = [...files]
          .filter(([, data]) => typeof data === 'string')
          .map(([file, data]) => `--- ${file} ---\n${data}`)
          .join('\n');
        const icons = [...files.keys()].filter((file) => file.endsWith('.png'));
        summary.push(`Not written anywhere: pass \`directory\` to also get the ${icons.length} icon files config.json references.`);
        return { content: [{ type: 'text', text: `${summary.join('\n')}\n\n${text}` }] };
      }

      if (!path.isAbsolute(directory)) {
        return { content: [{ type: 'text', text: '`directory` must be an absolute path.' }], isError: true };
      }
      if (fs.existsSync(directory) && fs.readdirSync(directory).length) {
        return {
          content: [{ type: 'text', text: `${directory} is not empty; nothing was written. Pick a new or empty directory.` }],
          isError: true,
        };
      }
      for (const [file, data] of files) {
        const target = path.join(directory, ...file.split('/'));
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.writeFileSync(target, data);
      }
      summary.push(
        `Wrote ${files.size} files to ${directory}:`,
        ...[...files.keys()].map((file) => `  ${file}`),
        '',
        'Next: replace the placeholder icons and add screenshots to store.screenshots before publishing.',
      );
      return { content: [{ type: 'text', text: summary.join('\n') }] };
    },
  );
}
