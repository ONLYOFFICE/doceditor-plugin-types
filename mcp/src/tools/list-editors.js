import { readApi } from '../data.js';

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerListEditors(server) {
  server.registerTool(
    'list_editors',
    {
      title: 'List editors',
      description:
        'Lists the ONLYOFFICE editors a plugin can target (word, cell, slide, pdf, forms) with how many ' +
        'classes, methods, executeMethod names and events each one has. Call it first to pick the editor.',
      annotations: { readOnlyHint: true, openWorldHint: false },
    },
    async () => {
      const { editors } = readApi('index.json');
      return { content: [{ type: 'text', text: JSON.stringify(editors, null, 2) }] };
    },
  );
}
