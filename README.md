# OnlyOffice Plugin API Types

TypeScript type definitions for OnlyOffice plugins.

For the official plugin API reference, guides, and examples (not TypeScript-specific), see
[api.onlyoffice.com/docs/plugins/get-started](https://api.onlyoffice.com/docs/plugins/get-started/).
This package only adds TypeScript types on top of that API.

## Installation

```bash
npm install @onlyoffice/plugins-types
```

## Usage

Add the root package and the entry point for the editor your plugin supports to your `tsconfig.json`
(`/word`, `/cell`, `/slide`, or `/pdf`):

```json
{
  "compilerOptions": {
    "types": ["@onlyoffice/plugins-types", "@onlyoffice/plugins-types/word"]
  }
}
```

The editor entry point declares the matching global `Api` type inside `callCommand`; the root
package intentionally does not declare a cross-editor `Api` intersection, so only include one
editor's entry point per project. Alternatively, reference it directly in a file:
`/// <reference types="@onlyoffice/plugins-types/word" />`. A plugin that supports several editors is
not stuck with one - see [Plugins that support several editors](#plugins-that-support-several-editors).

```typescript
// plugin.ts
window.Asc.plugin.init = function() {
    window.Asc.plugin.callCommand(function() {
        const doc = Api.GetDocument();
        const para = Api.CreateParagraph();
        para.AddText('Hello from plugin!');
        doc.InsertContent([para]);
    }, true);
};

window.Asc.plugin.button = function(id) {
    console.log('Button clicked:', id);
};

window.Asc.plugin.executeMethod("GetSelectedText", [], function (text) {
    console.log('Selected:', text);
});
```

## API Types

Every editor's API is generated into its own TypeScript namespace (`Word`, `Cell`, `Slide`, `Forms`,
`Pdf`), so same-named classes across editors never collide - any type from any editor is importable
regardless of which editor's entry point your `tsconfig.json` declares:

```typescript
import type { Word } from "@onlyoffice/plugins-types/word";

window.Asc.plugin.callCommand(function() {
    const wordApi: Word.Api = Api;
    console.log(wordApi.GetDocument().GetAllParagraphs()[0].GetText());
});
```

`Cell`/`Slide`/`Pdf` follow the same pattern from `@onlyoffice/plugins-types/cell`, `/slide`, `/pdf`.
`Api<T>` (from the root package) also resolves the entry-point class generically, e.g. `Api<"word">`
is `Word.Api`.

`window.Asc.plugin.executeMethod` is typed per editor, by method name and argument tuple
(`WordMethodArgs`/`CellMethodArgs`/`SlideMethodArgs`/`PdfMethodArgs`/`FormsMethodArgs`). One documented
trap: `GetMacros`/`SetMacros` (all editors) use a raw JSON **string** wire format - `JSON.parse`/
`JSON.stringify` it yourself.

`attachEditorEvent`/`detachEditorEvent` are typed the same way per editor
(`Word.EditorEventArgs`/...), and `attachEvent`/plugin-window-level events (`onContextMenuShow`,
`onWindowResize`, ...) are typed via `PluginEventMap` - an unknown event name in either case falls
back to a loose `unknown[]`/`unknown` overload rather than `any`.

```typescript
window.Asc.plugin.attachEditorEvent("onParagraphAdd", (data) => {
    console.log(data.InternalId); // data: { InternalId: string }
});
```

## config.json Schema

`schemas/config.schema.json` validates a plugin's `config.json` (generated from this package's own
`PluginConfig`/`VariationConfig`/`ButtonConfig` types, so it can't drift). Point your editor at it:

```json
{
  "$schema": "https://raw.githubusercontent.com/ONLYOFFICE/plugins-types/main/schemas/config.schema.json",
  "name": "My Plugin"
}
```

or map your plugins' `config.json` files to it once in your editor's settings instead of adding the
field to each one (VS Code: `json.schemas`).

## Plugins that support several editors

`EditorsSupport` in `config.json` is a list, and a plugin that serves Word and Cell is ordinary. Only
one thing is affected: the global `Api` inside `callCommand`. Everything else - `Asc.plugin`,
`executeMethod`, events, buttons - comes from the root package and is editor-independent, so a
multi-editor project types it without any special arrangement.

Two entry points in one program collide on purpose (`TS2403`): `Api` cannot be two types at once, and
a silent `any` would leave every `Api.*` call unchecked. Pick whichever fits the project.

**Declare `Api` yourself, over the editors you support.** One program, no editor entry point, a cast
in each command body - which is where you already branch on the editor anyway. `Api<T>` distributes,
so the parameter is the same list as `EditorsSupport` in your `config.json`:

```typescript
import type { Api as ApiOf, Word, Cell } from "@onlyoffice/plugins-types";

declare global { var Api: ApiOf<"word" | "cell">; }

if (Asc.plugin.info.editorType === "word") {
    Asc.plugin.callCommand(function () {
        const api = Api as Word.Api;
        return api.GetDocument().GetAllParagraphs().map(p => p.GetText());
    });
}
```

Naming the editors rather than writing `Word.Api | Cell.Api` by hand is what keeps the list honest:
casting to an editor outside it - `Api as Pdf.Api` here - is a `TS2352` error rather than code that
compiles and fails wherever it runs.

The cast is not a loophole: members stay checked (`GetAllParagraphss` is still an error), and the
union has no discriminating field for TypeScript to narrow on by itself, so stating the editor is
what the type system needs from you.

**Or split the programs.** One `tsconfig` per editor, each with its own entry point and the command
bodies for that editor; a third for the shared runtime code that never touches `Api`. No casts, and
`Api` is the real type inside each body. This is what this repository does for its own tests.

One caveat either way: `executeMethod` is not narrowed per editor. All five editors' method names are
accepted whichever entry point you include, so a Cell-only name type-checks in a Word program.

## Modular entry points

The root package remains the compatibility entry point. The same runtime types are also available by
layer for smaller imports: `@onlyoffice/plugins-types/plugin` (`AscPlugin`, events, buttons),
`/plugin/events`, `/plugin/buttons`, `/config`, `/services` - type-only re-exports of the same
declarations the root package uses, so existing root imports remain compatible.

## Without npm: one `.d.ts` per editor

Some tools want a single global-scope `.d.ts` as text rather than an installed package - a Monaco
editor's `addExtraLib()`, a browser playground, a sandbox that has no package manager. For those the
repository carries five flattened bundles, one per editor, with no `import`/`export` in them:

```text
https://raw.githubusercontent.com/ONLYOFFICE/plugins-types/main/artifacts/ambient/<file>
```

| `<file>` | size |
| -------- | ---- |
| `onlyoffice-plugins-types.word.ambient.d.ts` | 2.49 MB |
| `onlyoffice-plugins-types.cell.ambient.d.ts` | 2.42 MB |
| `onlyoffice-plugins-types.slide.ambient.d.ts` | 1.43 MB |
| `onlyoffice-plugins-types.pdf.ambient.d.ts` | 1.37 MB |
| `onlyoffice-plugins-types.forms.ambient.d.ts` | 0.54 MB |

Each is self-contained - `Asc`, `AscPlugin`, that editor's namespace and its global `Api`. Load
exactly one: all five declare the same globals with different types.

```javascript
const text = await fetch(url).then((r) => r.text());
monaco.languages.typescript.javascriptDefaults.addExtraLib(text, "onlyoffice.word.d.ts");
```

That is enough for `Api.` to complete inside a `callCommand` body and for
`Asc.plugin.executeMethod("` to offer that editor's method names - only that editor's, so a
Cell-only name is not suggested in a Word plugin. `forms` is the one exception with no global `Api`:
its methods go through `executeMethod`.

The same file also works as a checker with no project setup at all, which is useful in CI or a
sandbox:

```bash
tsc --noEmit --allowJs --checkJs --target ES2020 --lib es2020,dom \
    onlyoffice-plugins-types.word.ambient.d.ts plugin.js
```

These bundles are **not** in the npm package - an npm consumer gets the modular sources instead, and
does not need a 2.5 MB blob. They are generated from the same sources as the published types and
regenerated with them, so they cannot drift.

## Versioning

This package's version tracks the ONLYOFFICE editor version its types were generated from, the same
way [`@onlyoffice/doceditor-types`](https://www.npmjs.com/package/@onlyoffice/doceditor-types) tracks
Docs Server:

| Package version | Editors (sdkjs) version |
| --------------- | ----------------------- |
| 10.0.0          | 10.0.0                  |

Pick the package version matching the editors you target. Because the version identifies a product
release rather than the shape of the type surface, it is **not** semver over these declarations: a
new editor release can rename or retype an API in any version segment, so a type-level breaking
change can arrive in what looks like a patch. Pin exactly (`"@onlyoffice/plugins-types": "10.0.0"`)
if that matters to you, and read the [changelog](CHANGELOG.md) before moving between editor
versions. Each release records the exact editor commit it was generated from; that record lives in
the [repository](https://github.com/ONLYOFFICE/plugins-types), not in the published package.

## For AI agents

[AGENTS.md](AGENTS.md) is the guide: the runtime's three channels and what confuses them, how to
look a member up without guessing, how to check plugin code you wrote against a compiler, and which
211 members need a paid edition. It ships inside the npm package, so an installed copy has it at
`node_modules/@onlyoffice/plugins-types/AGENTS.md`.

What it points to for looking a member up lives in this repository rather than the package:
`artifacts/api/`, the same API surface as JSON - signature, description, `since`, a verified docs
link, and `requires` where a paid edition is needed - split into a tree so no single read is large.
Fetch it from
`https://raw.githubusercontent.com/ONLYOFFICE/plugins-types/main/artifacts/api/<path>`, starting at
`index.json`. Each index and class file carries a link back to the guide, so a file fetched on its
own says where the instructions are.

For type-checking the code an agent just wrote, the per-editor bundles above are the short path:
one file, one `tsc` command, no install.

## Contributing / how the types are generated

Almost nothing here is written by hand - the editor types are generated from the ONLYOFFICE editor
sources. [CONTRIBUTING.md](CONTRIBUTING.md) covers what is generated and from what, what each check
guards, how to read the machine-readable index, and the project layout.

## License

[Apache-2.0](LICENSE), Copyright 2026 Ascensio System SIA - the same license as
[`@onlyoffice/doceditor-types`](https://www.npmjs.com/package/@onlyoffice/doceditor-types), so these
declarations can be consumed by plugins under any license. Note that this covers the type
declarations only; the ONLYOFFICE editors themselves (`sdkjs`, from whose JSDoc these types are
generated) remain under AGPL-3.0-or-later.
