# Guidance for AI agents

This package is the TypeScript definition set for the ONLYOFFICE Document Editor Plugin API. Two audiences: agents
**authoring a plugin** with these types, and agents **working on this package** itself.

## Authoring a plugin

### Mental model of the runtime

A plugin runs in an iframe and talks to the editor through `window.Asc.plugin`. There are exactly
three channels, and confusing them is the most common source of broken plugin code:

1. **`callCommand(fn, isClose)`** — the ONLY way to touch the document object model (`Api.*`). The
   editor serializes `fn`'s source with `Function.prototype.toString()` and re-runs it inside the
   editor process. Consequences:
   - the callback is a fresh scope: no closures, no variables from the plugin page, no imports —
     everything it references must be declared inside it. **The types cannot catch this** (TypeScript
     has no notion of closure capture); it is the one rule you must hold yourself;
   - pass data in via `window.Asc.scope` (a plain JSON-able object) before the call, read it inside
     as `Asc.scope.<key>` or the bare `scope` the runtime injects;
   - `fn` runs in the editor's context, where the global `Api` (not `Asc.plugin`) is the entry point;
   - whatever `fn` returns is delivered to the callback, but only if it survives the process
     boundary — the editor drops anything carrying methods to `undefined`. **The types do catch
     this**: returning an `Api.*` object is a compile error, so `return doc` fails and
     `return doc.GetAllParagraphs().map(p => p.GetText())` is what you want.
   - prefer `await callCommandAsync(fn)` over the callback form; `callMethodAsync(name, args)` is
     the same for `executeMethod`. Better still, see `Editor.RunMacro` below - it passes arguments
     into the body, which is what makes the no-closures rule survivable.
2. **`executeMethod("Name", [args], callback)`** — editor-provided utility methods (get selected
   text, insert content, show input helpers, ...). Typed per editor: a known method name gives its
   argument tuple and callback result type; an unknown name falls back to a loosely typed overload.
   `GetMacros`/`SetMacros` are the known trap: the wire format is a raw JSON **string** —
   `JSON.parse`/`JSON.stringify` it yourself.

   Since sdkjs `v10.0.0.119` the same methods are also plain functions on a global `Editor`, and that
   is what new code should use: `await Editor.GetSelectedText()` instead of
   `executeMethod("GetSelectedText", [], cb)`. Arguments are spread rather than passed as an array; a
   trailing function is still taken as a callback, and without one the call returns a Promise.

   `Editor.RunMacro(fn, ...args)` is the one member that is not a renamed `executeMethod`. It runs
   `fn` inside the editor the way `callCommand` does, but **serializes the extra arguments into the
   body**, so data no longer has to travel through `Asc.scope`, and it wraps the body in
   `try`/`catch`, so a throw comes back as a rejected Promise instead of a callback that never fires.
   The serializability rule still applies to the arguments and the return value, and the types
   enforce it on both.
3. **Events** — `Asc.plugin.attachEditorEvent("onName", cb)` for editor events (typed per editor via
   `EditorEventArgs`), plus plugin-window-level handlers assigned as properties
   (`Asc.plugin.init`, `.button`, `.onMethodReturn`, ...).

### Consuming these types

- Add the root package plus exactly ONE editor entry point to `tsconfig.json`:
  `"types": ["@onlyoffice/doceditor-plugin-types", "@onlyoffice/doceditor-plugin-types/word"]`
  (`/word`, `/cell`, `/slide`, `/pdf`). Two editor entry points in one project make the global `Api`
  declarations collide — that is intentional, a plugin's `callCommand` code runs in one editor.
- Any type from any editor remains importable regardless (`import type { Cell } from
  "@onlyoffice/doceditor-plugin-types/cell"`), because each editor's object model lives in its own namespace
  (`Word`, `Cell`, `Slide`, `Forms`, `Pdf`) and same-named classes don't collide.
- `import type { Api } from "@onlyoffice/doceditor-plugin-types"` + `Api<"word">` resolves the entry-point
  class generically.
- A plugin's `config.json` can be validated against `schemas/config.schema.json` (add a `$schema`
  field pointing at the raw GitHub URL, or map the project's `config.json` files in the editor).

### Looking up the API without guessing

- `artifacts/api/` (`https://raw.githubusercontent.com/ONLYOFFICE/doceditor-plugin-types/master/artifacts/api/<path>`)
  — every class/method/typedef/event/executeMethod with signature, markdown description, parameter
  list, return type, `since` version and a verified `docsUrl`. Search this before inventing a method
  name; if a member isn't there, it isn't public API. **Runnable examples are not here** — they are
  in the JSDoc of the corresponding member in the `.d.ts`, and every member that has one also has a
  `docsUrl`; carrying them in both places duplicated 4.5 MB of identical text.

  It lives in git, **not in the npm package** — at 4.87 MB it was 37% of an install that most
  consumers make for editor completion alone. If you have no network, fall back to the `.d.ts`: the
  same facts are in each member's JSDoc (`@since`, `@see`, `@requires` for paid members), and
  `<Editor>PaidMethodName` types the paid `executeMethod` names.

  **It is a tree, split so that no single read is large. Read it in two steps, and do not
  concatenate it** — the whole point of the layout is that you never load more than you need:

  1. `artifacts/api/<editor>/index.json` — every member name mapped to its signature, for one editor
    (7k–41k tokens). This is the file to hold in context while you work.
  2. Then exactly one detail file: `<editor>/classes/<Class>.json`, or
    `<editor>/classes/<Class>/<Method>.json` when a class was large enough to be sharded per method
    (`_class.json` in that directory holds the class's own prose).

  Also: `<editor>/typedefs.json`, `<editor>/events.json`, `<editor>/executeMethods.json`, and
  `runtime.json` for the plugin runtime itself (`AscPlugin.callCommand`, the async variants, `Asc`,
  buttons, plugin events, `config.json` types). `artifacts/api/index.json` is a ~1 KB manifest listing the
  editors and restating this navigation.

  Rule of thumb for which half to search: `<editor>/…` answers what you do *inside* a `callCommand`
  body; `runtime.json` answers how you write the plugin around it.
- **Check `requires` before recommending a member.** 227 members need ONLYOFFICE Docs Developer
  Edition and are not present in a Community Edition build: 22 `executeMethod` names and 205
  object-model methods (`ApiTableOfContents`, `ApiListObject`, `ApiSort`, ...). They carry a `requires` field in `artifacts/api/`, and each editor's `index.json` lists them
  outright - `paidExecuteMethods` and `paidMethods` - so a single read answers it. The executeMethod
  names are also typed as `<Editor>PaidMethodName`. Suggesting one to a Community Edition
  user produces code that compiles and fails at runtime, so prefer an unmarked member and say so
  when only a marked one exists. A `Note:` in a description about a paid edition is *not* the same
  thing - those restrict an argument value, not the call (`StartAction` is free unless `type` is
  `"GroupActions"`).
- Every generated member's JSDoc carries the same information (hover in the editor): description,
  `@param`/`@returns`, `@default`, `@since`, a runnable `@example` and an `@see` link to
  api.onlyoffice.com. About 10% of those links point at pages the docs site has not published yet -
  it trails sdkjs by a few minor versions - so a 404 there means "not documented yet", not "wrong
  member".
- `artifacts/ambient/` holds five flattened no-import `.d.ts` bundles, one per editor:
  `onlyoffice-doceditor-plugin-types.<editor>.ambient.d.ts` for `word`, `cell`, `slide`, `pdf`, `forms`. Each
  is self-contained (0.55-2.51 MB) - load exactly one, since the five declare the same globals with
  different types. Written for editors that take a single global-scope blob (a Monaco
  `addExtraLib()`), and useful here for a different reason - see below. Not shipped in the npm
  package (those consumers take the modular sources instead) - fetch from git:
  `https://raw.githubusercontent.com/ONLYOFFICE/doceditor-plugin-types/master/artifacts/ambient/<file>`.

### Checking the plugin code you just wrote

Read `artifacts/api/` to find an API; run the code past a compiler to find out whether you used it
correctly. An ambient bundle makes the second step one command with no install and no tsconfig,
which is what a sandbox or a tool call usually has room for:

```bash
tsc --noEmit --allowJs --checkJs --target ES2020 --lib es2020,dom \
    onlyoffice-doceditor-plugin-types.word.ambient.d.ts plugin.js
```

Plugin code is written against globals with no imports, which is exactly the shape a single
global-scope `.d.ts` checks. What that catches, on real mistakes rather than in principle: a
misspelled `executeMethod` name, an argument of the wrong type, a method that belongs to a different
editor, and a member that does not exist (with TypeScript's own "Did you mean" suggestion). Correct
code produces no output, so any output is a defect to fix before handing the code over.

Use the bundle for the editor the plugin targets. Each one carries only its own editor's
`executeMethod` names, so calling a Cell-only method from a Word plugin is rejected rather than
accepted.

The modular package checks the same things if `npm install` is available, but needs a tsconfig with
one editor entry point in `files` and a separate program per editor - the four editors declare the
same global `Api`, so two in one program is a TS2403 collision.

Do not put a bundle in your context: `word` alone is ~2.6M characters. It is something to run, not
to read - `artifacts/api/` is the surface meant for reading, and it carries what the JSDoc does not
express in machine-readable form (`requires` for paid members, `since`, a verified `docsUrl`).

## Working on this package

### Commands

```bash
npm test                 # tsc over the package + example.js + test/*.js (skipLibCheck off)
npm run typecheck        # package only
npm run check-runtime    # full API surface vs sdkjs (SDKJS_PATH); the plugins.dev.js half skips outside the monorepo
npm run check-plugin-events  # plugin-window event map vs sdkjs event sources (SDKJS_PATH)
npm run validate-schema  # schemas/config.schema.json vs every real config.json (skips outside the monorepo)
npm run check-arity      # parameter-optionality corrections vs the documented examples (DOCS_PATH)
npm run check-structure  # CONTRIBUTING.md's file tree, and every measured number the docs quote
npm run check-package    # what `npm publish` would ship, and that every exports subpath resolves in it
npm run verify           # the six checks that need no editor sources; runs as prepublishOnly too
npm run generate         # regenerate src/generated from sdkjs + rebuild artifacts/api
                         # (postgenerate also regenerates executeMethod types and artifacts/ambient)
```

`generate` also needs `DOCS_PATH` - a checkout (clone or unpacked archive) of the api.onlyoffice.com
documentation site, which supplies every runnable `@example`. sdkjs's JSDoc carries only a `@see`
path to those files, not the code.

`generate` needs local checkouts of the editor sources (`SDKJS_PATH` env or `--sdkjs`, plus its
siblings), which are not publicly available. The exact expected source
commits are pinned in `src/generated/generation-manifest.json` - present in the repository, not in the
published package; regenerating from those commits must produce a byte-identical tree
(`npm run check-generated`).

### Invariants worth knowing

- `src/generated/api-report.json` tracks `anyOccurrences` (must stay 0) and `unresolvedTypes` (a
  short list of types sdkjs references but never documents). A regeneration that only changes
  documentation leaves this file untouched — a diff here means the sdkjs sources moved, not the
  docs.
- Correctness fixes that contradict sdkjs's own JSDoc (a parameter that real calls omit, a wire
  type that differs from the declared one) belong in the override tables in
  `scripts/generate-plugin-methods.js` with a comment citing the real usage — never as hand edits
  to `src/generated/*`, which the next regeneration would silently revert.
- The same hand-edit rule applies to `artifacts/api/` and `artifacts/ambient/*`: both are build
  artifacts of the generators, tracked in git only so they are directly linkable/reviewable.
- JSDoc prose goes through `htmlToMarkdown`/`cleanProse`/`splitDescription` in
  `scripts/generate-types.js`; docs-site links are derived from the `@see
  office-js-api/Examples/<Editor>/<Class>/Methods/<Method>.js` paths in the source doclets, so a
  link is never emitted for a member the docs site doesn't document.
