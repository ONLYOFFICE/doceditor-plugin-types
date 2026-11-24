import { z } from 'zod';
import { listSamples, readSample } from '../samples.js';

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerGetSample(server) {
  server.registerTool(
    'get_sample',
    {
      title: 'Get a sample plugin',
      description:
        'Small working ONLYOFFICE plugins, one technique each (callCommand with Asc.scope, following ' +
        'the selection, a modal window with buttons). Call without an id to list them; with an id to ' +
        'get every file of that sample. Copy the pattern, not the guid.',
      inputSchema: {
        id: z.string().optional().describe('Sample id from the list; omit to list the samples'),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ id }) => {
      if (!id) {
        const lines = listSamples().map(
          (s) => `${s.id} [${s.kind}; ${s.editors.join(', ')}] - ${s.description}\n  shows: ${s.shows.join('; ')}`,
        );
        return { content: [{ type: 'text', text: lines.join('\n\n') }] };
      }
      const sample = readSample(id);
      if (!sample) {
        const ids = listSamples().map((s) => s.id).join(', ');
        return { content: [{ type: 'text', text: `No sample "${id}". Available: ${ids}.` }], isError: true };
      }
      const head =
        `${sample.meta.title} [${sample.meta.kind}; ${sample.meta.editors.join(', ')}]\n${sample.meta.description}\n\n` +
        'Icons under resources/ are not included: create_plugin generates a set. ' +
        'Give a plugin built from this sample its own guid.';
      const body = sample.files.map((file) => `--- ${file.path} ---\n${file.text}`).join('\n');
      return { content: [{ type: 'text', text: `${head}\n\n${body}` }] };
    },
  );
}
