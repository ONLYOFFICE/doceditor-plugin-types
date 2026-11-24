// One module per tool; this list is the whole surface the server exposes.

import { registerListEditors } from './list-editors.js';
import { registerSearchApi } from './search-api.js';
import { registerGetMember } from './get-member.js';
import { registerGetSample } from './get-sample.js';
import { registerCreatePlugin } from './create-plugin.js';
import { registerValidateConfig } from './validate-config.js';
import { registerTypecheckPlugin } from './typecheck-plugin.js';

/** @param {import('@modelcontextprotocol/sdk/server/mcp.js').McpServer} server */
export function registerTools(server) {
  registerListEditors(server);
  registerSearchApi(server);
  registerGetMember(server);
  registerGetSample(server);
  registerCreatePlugin(server);
  registerValidateConfig(server);
  registerTypecheckPlugin(server);
}
