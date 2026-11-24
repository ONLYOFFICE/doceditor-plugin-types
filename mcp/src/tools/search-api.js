import { z } from 'zod';
import { EDITORS } from '../catalog.js';
import { search, formatHit } from '../search.js';

const KINDS = ['method', 'executeMethod', 'event', 'typedef', 'runtime'];

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerSearchApi(server) {
  server.registerTool(
    'search_api',
    {
      title: 'Search the plugin API',
      description:
        'Finds ONLYOFFICE plugin API members by name or by what they do: object-model methods used ' +
        'inside callCommand (Api.*, ApiParagraph.*, ...), executeMethod names, editor events, typedefs, ' +
        'and the plugin runtime (Asc.plugin, config.json). Search before using any member you are not ' +
        'sure exists - a member that is not found here does not exist. Then call get_member for details.',
      inputSchema: {
        query: z.string().min(1).describe('Member name or words, e.g. "GetSelectedText", "ApiParagraph.AddText", "bold text"'),
        editor: z.enum(EDITORS).optional().describe('Only this editor; omit to search all of them'),
        kind: z.enum(KINDS).optional().describe('Only this kind of member'),
        edition: z
          .enum(['any', 'community'])
          .default('any')
          .describe('"community" drops members that only exist in ONLYOFFICE Docs Developer Edition'),
        editorVersion: z
          .string()
          .regex(/^\d+(\.\d+)*$/)
          .optional()
          .describe('Lowest editor version the plugin supports, e.g. "8.2"; drops members added later'),
        limit: z.number().int().min(1).max(50).default(15),
      },
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async ({ query, editor, kind, edition, editorVersion, limit }) => {
      const { hits, total, hidden, partial } = search(query, {
        editors: editor ? [editor] : EDITORS,
        runtime: !editor || kind === 'runtime',
        kinds: kind ? [kind] : undefined,
        edition,
        editorVersion,
        limit,
      });
      const notes = [];
      if (hidden) {
        notes.push(
          `${hidden} more match but were left out by ` +
            [edition === 'community' && 'edition', editorVersion && 'editorVersion'].filter(Boolean).join(' / ') +
            ': they do not exist in the editors you target.',
        );
      }
      if (editorVersion) notes.push('Members without a "since" are kept: their first version is not recorded.');

      if (!hits.length) {
        const text =
          `Nothing matches "${query}"${editor ? ` in ${editor}` : ''}. ` +
          'No member exists under that name; try other words or drop the filters.';
        return { content: [{ type: 'text', text: [text, ...notes].join('\n\n') }] };
      }
      const head = partial ? [`No member matches every word of "${query}"; these match some of them.`] : [];
      if (total > hits.length) notes.unshift(`${total - hits.length} more not shown; narrow the query or raise limit.`);
      return { content: [{ type: 'text', text: [...head, hits.map(formatHit).join('\n'), ...notes].join('\n\n') }] };
    },
  );
}
