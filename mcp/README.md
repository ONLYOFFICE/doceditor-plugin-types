# ONLYOFFICE Docs Plugin MCP Server

An [MCP](https://modelcontextprotocol.io) server for coding assistants that write plugins for the
ONLYOFFICE Docs editors. It answers from the same API tree that
[`@onlyoffice/doceditor-plugin-types`](https://www.npmjs.com/package/@onlyoffice/doceditor-plugin-types)
is generated from, so the assistant looks members up instead of guessing them.

## Tools

| Tool | What it does |
| --- | --- |
| `list_editors` | Editors a plugin can target, with class, method, executeMethod and event counts |
| `search_api` | Finds members by name or by what they do, across the object model (`callCommand`), `executeMethod`, editor and plugin-window events, typedefs and the plugin runtime. Filters: `editor`, `kind`, `edition: "community"` (drops Developer Edition members), `editorVersion` (drops members added later) |
| `get_member` | Full reference for one member: description, parameters, return type, `since`, Developer Edition requirement, docs link. Accepts `ApiParagraph.AddText`, `ApiParagraph`, `GetSelectedText`, `onAddComment`, `Asc.plugin.callCommand`, `PluginConfig` |
| `get_sample` | Small working plugins, one technique each: `insert-text` (callCommand + `Asc.scope`), `read-selection` (`initOnSelectionChanged`, any editor), `modal-window` (OK/Cancel buttons), `context-menu` (a background plugin answering `onContextMenuShow` with `AddContextMenuItem`). Without an id, lists them |
| `create_plugin` | A minimal working plugin for the chosen editors and kind (`panel`, `panelRight`, `window`, `background`): `config.json` that passes the schema, `index.html`, `scripts/code.js`, placeholder icons, and a type-checking setup over `@onlyoffice/doceditor-plugin-types` (`package.json`, `jsconfig.json`, `types/globals.d.ts`): after `npm install` the editor autocompletes and checks the API. With `directory` it writes the files (only into a new or empty directory); without it, returns the text files |
| `validate_config` | Checks `config.json` against the schema and says what each problem means: an unknown field with the name it most likely meant (`isviewer` → `isViewer`), a wrong value, what only the marketplace needs. Given the plugin directory, also checks that every icon (including `%theme-type%(light\|dark)` templates), page and screenshot exists, and that pages load `plugins.js` from a URL that works outside the sdkjs-plugins repository |
| `typecheck_plugin` | Runs TypeScript over the plugin's own scripts (found through its HTML pages; bundled libraries skipped) against the API types of each editor in `EditorsSupport`. Reports invented members, misspelled `executeMethod` names, wrong arguments; marks problems that hit only some editors; lists globals no checked file declares (`$` from jQuery) separately |

Every sample and every scaffold kind is checked in `npm test`: its `config.json` against the schema,
its code with `tsc` against each editor it targets.

Both lookups answer "does not exist" plainly instead of offering a near miss as if it were the
member asked for, and `search_api` says how many matches its filters left out.

## Setup

Runs locally over stdio and needs Node.js 18 or later.

**Any MCP client**: a stdio server started with

```
command: npx
args:    -y @onlyoffice/doceditor-plugin-mcp
```

The clients below, in their own words.

**Claude Code**

```bash
claude mcp add onlyoffice-plugin -- npx -y @onlyoffice/doceditor-plugin-mcp
```

**OpenAI Codex** (CLI, IDE extension and app share `~/.codex/config.toml`; a trusted project can
also have `.codex/config.toml`)

```bash
codex mcp add onlyoffice-plugin -- npx -y @onlyoffice/doceditor-plugin-mcp
```

or in `config.toml`:

```toml
[mcp_servers.onlyoffice-plugin]
command = "npx"
args = ["-y", "@onlyoffice/doceditor-plugin-mcp"]
```

**Gemini CLI** (`.gemini/settings.json` in the project, or `~/.gemini/settings.json` with
`--scope user`). The `--` keeps `-y` from being read as an option of `gemini` itself:

```bash
gemini mcp add onlyoffice-plugin npx -- -y @onlyoffice/doceditor-plugin-mcp
```

**Cursor** (`.cursor/mcp.json`), **Kimi Code** (`.kimi-code/mcp.json` in the project, or
`~/.kimi-code/mcp.json` for every project), **Gemini CLI** (the `mcpServers` key of its
`settings.json`) and **Claude Desktop** (`claude_desktop_config.json`)

```json
{
  "mcpServers": {
    "onlyoffice-plugin": {
      "command": "npx",
      "args": ["-y", "@onlyoffice/doceditor-plugin-mcp"]
    }
  }
}
```

In Kimi Code you can also add it without editing JSON: run `/mcp-config` and describe the server,
then check it with `/mcp`. A server added to `mcp.json` joins new sessions, not open ones; a
project-level entry is enabled once you trust the folder in Kimi Code's workspace prompt.

**VS Code** (`.vscode/mcp.json`)

```json
{
  "servers": {
    "onlyoffice-plugin": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@onlyoffice/doceditor-plugin-mcp"]
    }
  }
}
```

## Development

The package lives in `mcp/` of the types repository and reads `artifacts/api` and
`schemas/config.schema.json` from the repository root. `npm pack` copies them into `mcp/data` first,
so the published package works offline and matches the types it was built with.

```bash
cd mcp
npm install
npm test
```
