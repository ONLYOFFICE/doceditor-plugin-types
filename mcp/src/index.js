#!/usr/bin/env node
// stdio entry point: `npx -y @onlyoffice/doceditor-plugin-mcp`.

import { createRequire } from 'node:module';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index.js';

const { version } = createRequire(import.meta.url)('../package.json');

const server = new McpServer({ name: 'onlyoffice-doceditor-plugin', version });
registerTools(server);
await server.connect(new StdioServerTransport());
