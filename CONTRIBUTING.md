# Contributing

How `@onlyoffice/doceditor-plugin-types` is put together: what is generated and from what, what each check
guards, how to read the machine-readable index, and where everything lives. For consuming the package
in a plugin see [README.md](README.md); [AGENTS.md](AGENTS.md) is the condensed version for coding
agents.

Almost nothing here is written by hand. `src/generated/`, `artifacts/` and `schemas/` are produced from the
ONLYOFFICE editor sources; only `src/plugin/`, `src/config/`, `src/services/` and `src/overrides/` are
authored directly. Regenerating needs local checkouts of those editor sources, which are not publicly
available - if you have access, the clone, tag and release procedure is in the team's internal notes.

## Generating Types

The generator parses the JSDoc comments straight out of a local `sdkjs` (and `sdkjs-forms`) checkout
using the `jsdoc` package, rather than fetching a prebuilt snapshot over the network - this picks up
API changes immediately and avoids a few data-quality bugs in stale snapshots (e.g. duplicated method
entries with a corrupted return type).

Building needs local checkouts of the editor sources, which are not public - the clone, tag and
release steps live in the team's internal notes rather than here. Every source's commit, tag and file
hashes land in `src/generated/generation-manifest.json`, which stays in the repository and is not
published to npm.

`npm run generate` only regenerates the Api object model (`src/generated/{word,cell,slide,pdf,forms}.ts`).
The `Asc.plugin.executeMethod` surface (`src/generated/*-methods.ts` - `<Editor>MethodArgs`/
`MethodName`/`MethodReturn`) is a separate generator, `scripts/generate-plugin-methods.js`, parsing
`Api.prototype["pluginMethod_<Name>"]` doclets from the same sdkjs/sdkjs-forms checkout plus
the commercial extension sources (for the methods only they document, in Word and Slide):

```bash
SDKJS_PATH=/path/to/sdkjs npm run generate-plugin-methods
```

It runs automatically as part of `postgenerate` (see [Ambient bundle](#ambient-bundle-non-npm-consumers)
below), so a plain `npm run generate` regenerates both halves together. Where sdkjs's own JSDoc gives
no usable signal at all, or contradicts real, documented `executeMethod` call examples, a small set of
override tables at the top of the script (`OPTIONAL_PROPERTY_OVERRIDES`, `TYPE_OVERRIDES`,
`TYPEDEF_TYPE_OVERRIDES`, `METHOD_OVERRIDES`) correct the generated shape - each entry is commented
with the specific example it was derived from, so before adding a new one, check whether the
mismatch is already covered.

`scripts/generate-types.js` (the Api object model generator) has an analogous but separate mechanism
for classes/typedefs it can't resolve at all - not a signature correction, but a whole missing
declaration (the class is fully documented in sdkjs, but the individual source file that declares it
only exists in ONLYOFFICE's prebuilt deploy bundle, not a plain checkout). `src/overrides/<editor>.ts`
holds hand-written `export interface`/`export type` declarations for exactly those names, the same
pattern DefinitelyTyped uses for undocumented corners of a real-world API; the generator splices an
override in wherever it would otherwise emit a blind `export type X = unknown;` stub, and warns if an
override is no longer needed (a later sdkjs checkout resolved the same name from a real source too).

Runnable examples come from a checkout of the documentation site, `DOCS_PATH` (or `--docs`),
pointing at either an `api.onlyoffice.com` clone or an unpacked archive of it:

```bash
SDKJS_PATH=/path/to/sdkjs DOCS_PATH=/path/to/api.onlyoffice.com npm run generate
```

The page for a member is addressed by exactly the segments its `docsUrl` already carries -
`site/docs/office-api/usage-api/<section>/<Class>/Methods/<Method>.md` - so the lookup is derived,
not guessed (99.9% of existing `docsUrl`s resolve to a file). The generator takes the `## Example`
section's fenced blocks and drops the site-only fence directive (```javascript editor-docx), the
same way it used to drop `document-builder={...}`.

This replaced 9 MB of vendored snapshots of the same site; the reasoning is in the changelog.

`executeMethod` examples come from a separate tree in the same checkout -
`plugins/interacting-with-editors/<section>/Methods/<Method>.md`, keyed by method name with no class
segment - wired up in `generate-plugin-methods.js`. Worth having separately from the object model's:
these are complete functions calling `window.Asc.plugin.executeMethod`, which is what a plugin author
actually writes.

The docs site trails sdkjs by several minor versions (its own CHANGELOG version is recorded in
`generation-manifest.json`), which is why some members still have no example and ~10% of `@see`
links 404 today. Both improve on their own as it catches up; neither is a defect to work around.

### Documentation carried by the types

Every generated class, typedef, property and method carries a real multi-line JSDoc block, so a hover
in the editor shows what the reference site shows:

````typescript
/**
 * Adds a comment to the current document selection, or to the current word if no text is selected.
 *
 * @param sText - The comment text.
 * @param sAuthor - The author's name.
 * @returns Returns null if the comment was not added.
 *
 * @example
 * ```js
 * let doc = Api.GetDocument();
 * doc.AddComment("This is a comment to the document.", "Jane");
 * ```
 *
 * @see https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiDocument/Methods/AddComment/
 */
AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment;
````

Everything in that block comes from the sources above, not from hand-written prose:

- the description, with the docs' inline HTML (`<b>"tile"</b>`) translated to markdown;
- `@param`/`@returns` from the documented arguments and return value - param prose is merged by
  parameter *name*, since the snapshot occasionally documents a different arity than current sdkjs;
- `@default`, from a parameter's `[name=value]` form;
- `@since`, where sdkjs records the editor version a member first appeared in;
- `@example`, from the docs' "## Try it" snippet (its `document-builder={...}` fence directive, which
  means nothing outside the docs site, is dropped);
- `@see`, built from the `@see office-js-api/Examples/{Editor}/<Class>/Methods/<Method>.js` path in
  the source doclet. `{Editor}` is a literal placeholder that the docs pipeline fills in per editor,
  and so does this generator - substituting it is what makes the link derive from sdkjs rather than
  from the snapshot, which is why PDF has documentation links at all.

Examples are emitted in full and uncapped - into the declarations only. `artifacts/api/` deliberately
carries none: it would be the same text a second time, 4.5 MB and 45% of the tree, and every member
with an example also has a `docsUrl`.
Dropping them from the declarations was tried and reverted: the case for it was that they are ~47%
of the generated `.d.ts`, which is the wrong benchmark - TypeScript ships `lib.dom.d.ts` at 1.8 MB
in every install, so declarations this size are unremarkable - and the "unreadable in a tooltip"
problem is 5 members out of 2712 (18 exceed 2 KB; the median is 492 B). A size threshold would have
split members into documented and undocumented by an arbitrary rule, which costs more than five
awkward tooltips.

Roughly 10% of `@see` links point at pages the documentation site has not published yet, because it
trails sdkjs by several minor versions. They start resolving as it catches up. Do not filter them
against a local docs checkout: that would drop correct links to pages about to exist, and make this
package's output depend on the site's release cadence instead of the API's.

## Paid members

The commercial extension sources declare a surface that needs a paid edition.
It contributes on three levels, all of them read directly by the generators:

| level | source | size |
| --- | --- | --- |
| `executeMethod` names | `<editor>/api_plugins.js` **and** `common/apiBase_plugins.js` | 19 entries across the editors |
| object model | `js-api/<editor>/*.js` | 191 methods, ~30 classes |
| runtime behaviour | `common/apiBase.js` | the GroupActions machinery |

Members carry `@requires`, the tag reaches `artifacts/api/` as a structured `requires` field, and each
editor's compact index lists them outright. What follows is what the marking does *not* cover, and why.

Two traps, both of which produced real bugs. ext has a `common/apiBase_plugins.js` of its own that is
*not* a copy - reading only the per-editor `api_plugins.js` silently dropped
`StartGroupActions`/`EndGroupActions` from four editors. And classes carry no `@typeofeditors` tag
while their methods do, so pointing Forms at `js-api/word` filtered out every method and kept the
classes, yielding empty `interface ApiTableOfContents {}` declarations - which accept any object, and
are worse than an absent class. Forms reads no ext js-api for that reason.

Licence notes on the documentation site are *not* turned into `@requires`. All 14 of them restrict an
argument value rather than the call:

| member | what is actually gated |
| --- | --- |
| `StartAction` / `EndAction` (×5 editors) | only `type: "GroupActions"`; `"Information"` and `"Block"` work everywhere |
| `CreateChart` / `AddChart` (×4) | only style ids outside 1-48 |

Tagging these would tell a Community Edition plugin author the method is unavailable, which is false
- and did happen: the first version of the check compared the note against parameter *names*, and
`GroupActions` is a *value*. Matching values would not have caught it either, since sdkjs types that
parameter as `"Information" | "Block"` and omits `"GroupActions"` altogether (a `METHOD_OVERRIDES`
entry restores it). `docsLicence()` therefore only ever returns prose, which goes into the
description where `htmlToMarkdown` renders it as a bold `Note:`.

`GroupActions` is the model for the distinction: the open sdkjs carries the dispatch and a stub whose
`isGroupActions()` returns `false`, ext overrides it with the real grouping. The call succeeds on every
edition and the callback fires - only the effect is absent, which is why the method is not in the paid
union.

Nothing is restricted by default. TypeScript's only marker that shows up in a completion *list* is
`@deprecated`, and reusing it here would be untrue - these members are not going away - as well as a
build break for teams whose lint rules reject deprecated members. So enforcement is offered, not
imposed: a project targeting Community Edition constrains on `<Editor>FreeMethodName` and gets a
compile error naming the method. `test/paid-methods.js` pins both directions.

Generated without those sources none of this exists: the members are absent, nothing is marked, and
the output is exactly the Community Edition surface.

**The paid *entry point* is not modelled here.** The Automation API (`docEditor.createConnector()`)
requires ONLYOFFICE Docs Developer, but it is not a separate API - the docs say outright that its
method list "is the same as for the plugins", and its `executeMethod`/`callCommand`/`attachEvent`
take the names and payloads this package already declares. It belongs to `DocsAPI`, so it is typed in
`@onlyoffice/doceditor-types` - generically, with no dependency on this package: a project that wants
precise names supplies the type parameters itself, `function exec<N extends WordMethodName>(name: N,
args: WordMethodArgs[N])`. The two packages do not move together (9.4.2 against 10.0.0) and that one
has no dependencies at all, so coupling them by version would break on the first release; copying the
surface across would drift the moment sdkjs adds a method. `test/connector-contract.d.ts` pins the
names such a caller reaches for and fails the build if one stops being exported.

sdkjs is the source of truth for structure (classes, methods, params - it can't drift from the
actual runtime), for prose, and for the `@see` links. The documentation checkout contributes exactly
one thing: the runnable examples, which genuinely cannot be regenerated from sdkjs - its JSDoc
carries only a `@see office-js-api/Examples/{Editor}/<Class>/Methods/<Method>.js` *path*, and the
code itself lives in the docs repository.

That prose precedence was measured, not assumed. Across Word, 789 of the 845 methods documented in
both sources have byte-identical prose once the example is removed - and of the 56 that differ,
sdkjs is the longer, fresher text in 42, including three carrying `Breaking Change` / version notes
the docs predate. Preferring the docs, as this once did, lost real information (`Api.CreateTable`'s
9.4.0 parameter-order warning) to gain nothing measurable.

## Correcting sdkjs's JSDoc

Three tables hold corrections where sdkjs's JSDoc contradicts its own implementation or examples.
None of them is a style preference - each entry exists because the generated output was demonstrably
wrong, and each carries the evidence in a comment.

| table | where | corrects |
| --- | --- | --- |
| `METHOD_OVERRIDES` | `generate-plugin-methods.js` | `executeMethod` parameter types, optionality, return types |
| `OPTIONAL_PROPERTY_OVERRIDES` / `TYPE_OVERRIDES` | `generate-plugin-methods.js` | typedef properties |
| `PARAM_OPTIONAL_FROM` | `generate-types.js` | object-model parameters marked required that are not |

`PARAM_OPTIONAL_FROM` is the largest at 57 entries, and the reason is a single recurring JSDoc defect:
`@param {Type} name` written where `[name]` was meant. Left alone it made the generated signature
reject the vendor's own sample code - `worksheet.GetRange("A2")` appears 5932 times across the
spreadsheet examples and did not type-check.

Two independent confirmations are required before adding an entry, and both were present for all 57:

1. The example on that member's own documentation page calls it with fewer arguments.
2. The sdkjs implementation guards against the argument being absent - `if (!Range2)`,
   `undefined === col`, `typeof x`.

`npm run check-arity` re-derives the list from the documentation and fails in both directions: an entry
whose value no longer matches the smallest documented call, and a mismatch with no entry at all. Run it
after regenerating against a new sdkjs release.

The same applies to the file tree at the end of this document: `npm run check-structure` compares it
against disk in both directions, for the directories meant to be listed file by file. It was added
after the tree was found listing 8 of 15 scripts - three of them missing long before the module split
that finally exposed it. An unguarded hand-written fact drifts silently.

The same check covers the measured numbers README.md, AGENTS.md and CONTRIBUTING.md quote - the five
ambient bundle sizes, the size of `artifacts/api/`, and the paid-member counts - each derived from
disk rather than from another document, since two documents agreeing with each other while both being
wrong is the case worth catching. It is also why the numbers are checked at all: every one of them is
quoted in at least two places (a bundle size in README.md's table and again in the tree below), so the
normal failure is updating one copy and missing the other. The paid count read 211 in both documents
while the changelog had already recorded 227, and the size of `artifacts/api/` was simultaneously
right in AGENTS.md and stale here. A fact that no document states any more is reported too: a pattern
that has stopped matching guards nothing, and a silent gate is worse than no gate.

CHANGELOG.md is deliberately excluded. Its entries describe what was true at a release, and must not
be rewritten when disk moves on.

`npm run check-package` does the same for the one fact that is invisible in a checkout: what
`npm publish` would actually ship. It runs `npm pack --dry-run` and rejects anything outside the
package's declared shape (a new directory under `src/` publishes itself the moment it exists),
anything deliberately excluded that came back, a `files` entry matching nothing, an `.npmignore`
(which would override `files` wholesale), and - the one that prompted it - an `exports` or
`typesVersions` subpath resolving to a file the tarball does not contain. That last failure is
otherwise invisible until someone installs the package: the repository has the file either way.

A check guards only what it actually runs against, so this one is wired into publishing rather than
left to be remembered. `npm run verify` is the six checks that need no editor sources - typecheck,
test, both schema checks, structure, package - and it is `prepublishOnly`, so `npm publish` runs it
whether the workflow is publishing or a person is. The other six read sdkjs and cannot run where
those sources are absent, which is why the release path verifies a subset rather than everything;
`check-generated` and `check-release-sources` stay a local gate to run before tagging.

Two limits are deliberate. The evidence is taken only from the member's **own** page, never from
sibling pages of the same class: a call is matched as plain text, so `.GetRange()` in a sibling example
may be a different class's genuinely zero-argument `GetRange`, and nothing distinguishes the receiver.
That under-reports - `ApiRange.GetAddress` is corrected to four arguments where wider evidence suggests
zero - but it never loosens a parameter that really is required, which is the error that would matter.
And `ApiDocument.SearchAndReplace` is excluded by name: its mismatch comes from the generator
flattening a documented object parameter and its nested properties into separate positional
parameters, so marking them optional would hide the wrong shape rather than correct it.

## Type-checking

```bash
npm run check-runtime       # checks Asc.plugin/Asc.Buttons against plugins.dev.js + sdkjs (needs SDKJS_PATH)
npm run check-plugin-events # checks attachEvent/event_on* names against sdkjs's own JSDoc (needs SDKJS_PATH)
npm run check-generated     # regenerates src/generated and fails if the checked-in output differs (needs SDKJS_PATH, a git checkout)
npm run typecheck           # checks index.d.ts + src/generated/*.ts + src/*.d.ts
npm test                    # five programs: shared + one per editor (see below)
npm run test:word           # a single editor's program, for a faster edit/check loop
```

`npm test` compiles **six** TypeScript programs, not one. The four editor entry points each declare
the same global `Api` with a different type, so putting two of them in one program is an immediate
`TS2403` collision - which is why a shared `declare var Api: any` stub used to sit in `test/`,
silently reducing every `Api.*` call in the copied documentation examples to `any`. Now
`tsconfig.test.<editor>.json` gives each editor's examples the real `Word.Api`/`Cell.Api`/... global,
and `tsconfig.typecheck.json` keeps the editor-agnostic files (`example.js`, which is a deliberately
multi-editor sampler with its own `any`, and the plugin-runtime tests). Each editor program also
compiles `test/<editor>-api-global.js`, whose `@ts-expect-error` on another editor's entry method
only holds while that program's `Api` is genuinely typed - so the stub cannot creep back unnoticed.

`tsconfig.test.forms.json` is the sixth. Forms has no editor entry point to borrow - its methods are
reached through `executeMethod` and there is no global `Api: Forms.Api` - but its documented examples
still call `Api.GetDocument()` and `Api.ReplaceTextSmart()` inside `callCommand` bodies, both Word's,
so that is the global it compiles against. It is a program of its own rather than a slot in the word
one because the copied snippets declare top-level variables that collide across files.

The examples in `test/{pdf,forms}-methods-original-examples.js` are the same text, taken from the
`@example` blocks of the generated `*-methods.ts` rather than re-copied from the site. Two liberties,
neither touching a snippet: each example sits in a function of its own (several declare the same
top-level variable with different shapes), and names the surrounding page defines but the copied
block does not are declared as `any` at the top. Adding them found a real defect on the first run -
`GetSelectedContent` typed its options object as required while ONLYOFFICE's own example omits it -
which is now a `METHOD_OVERRIDES` entry rather than a suppression.

`check-runtime` is a static Level 2 check with two halves, against two sources:

- *Bootstrap assignments* - `Asc.plugin`'s `guid`/`windowID`/event handlers/registration methods,
  `Asc.Buttons`, the button constructors and `Asc.scope.prototype.clear`, verified in both
  directions against the checked-in `sdkjs-plugins/v1/plugins.dev.js` (the unminified runtime - its
  qualified names like `window.Asc.plugin.X` stay stable across rebuilds, unlike the minified
  `plugins.js`'s single-letter aliases).
- *API completeness* - every member sdkjs's own JSDoc documents with `@memberof Plugin` /
  `@memberof InputHelper` in `common/plugins/plugin_base_api.js` must be declared by us. This half
  needs `SDKJS_PATH` (same as `generate`). It exists because the bulk of the API - `callCommand`,
  `executeMethod`, `callModule`, `createInputHelper`, ... - is installed by `startPluginApi()` and
  never appears in `plugins.dev.js` at all; checking only that file previously let ~10 documented
  members go undeclared while this script still reported success. A documented `onFoo` satisfies the
  check when declared as either `onFoo` or `event_onFoo`, since editor-dispatched events reach the
  plugin as `Asc.plugin["event_" + name]`.

Note that `@undocumented` is deliberately *not* filtered in this second half: in
`plugin_base_api.js` that tag happens to sit on every method (`callCommand`, `executeMethod`, ...)
rather than marking non-public members the way it does in the method/event sources.

Neither half launches an editor or verifies host-provided `executeMethod` behavior; those require a
real browser/Desktop Editor smoke test.

`check-plugin-events` is a drift check, not a generator: plugin-window events (`attachEvent`,
`event_on*`) are hand-curated in `src/plugin/events.d.ts` rather than generated, since their payload
shapes need richer modeling than a mechanical `@param`-to-tuple conversion gives. The script diffs
`@alias` names documented in `sdkjs/common/base-plugin-events.js` (shared across editors, filtered by
`@typeofeditors`) plus each editor's own `<editor>/plugin-events.js` / `sdkjs-forms/plugin-events.js`
against that file and fails if anything documented (and not tagged `@undocumented`) is missing.
Requires `SDKJS_PATH` (same as `generate`). The equivalent check for `executeMethod` names doesn't
need a separate drift check: `generate-plugin-methods.js` generates the full body directly, and
`check-generated` already fails CI if regenerating produces anything different from what's checked in.

Run these after editing any `.d.ts` file or regenerating types - `skipLibCheck` is intentionally
off in `tsconfig.json` so mistakes in the declaration files themselves (e.g. a type that isn't
actually exported) surface immediately instead of being silently ignored.

`peerDependencies` declares `typescript: >=5.0.0`, and that floor is real, not cautious: `index.d.ts`
re-exports every editor namespace with `export type * from "..."`, which TypeScript only parses from
5.0 on (4.9 rejects it with `TS1383: Only named exports may use 'export type'`). Lowering the floor
without first rewriting those 14 re-exports as named `export type { ... }` lists ships a package that
fails to parse on the very first file.

`npm run check-schema` regenerates `schemas/config.schema.json` from the types and fails if the
checked-in copy differs. It exists because the schema is a build artifact with no other guard:
it silently went stale once, still requiring only `variations` while `PluginConfig` had grown two
more required fields, so `validate-schema` was passing against an outdated schema rather than
against the types it claims to mirror. Run it after touching anything under `src/config/`.

`npm run validate-schema` checks `schemas/config.schema.json` against every real `config.json`
already in this monorepo (`sdkjs-plugins/content/*/config.json`) - not part of `npm test` since it
needs that sibling directory, which only exists inside this checkout. A small `KNOWN_ISSUES`
allowlist in the script tracks the couple of plugins whose `config.json` has a genuine mistake (a
misplaced field, a typo) rather than a schema gap; anything else that fails is a real regression.

## Ambient bundle (non-npm consumers)

`npm run generate-ambient` flattens the modular sources into import/export-free `.d.ts` blobs - the
format tools that don't install npm packages expect, such as a Monaco editor's `addExtraLib()` (the
same mechanism used by the ONLYOFFICE plugin playground for its `Api.*` autocomplete). It also runs
automatically as a `postgenerate` step whenever `npm run generate` regenerates the types from
`sdkjs`, so the bundles can't silently go stale relative to the modular package. They are written to
`artifacts/ambient/` - tracked in git, like everything under `artifacts/`, so the generated files are
directly linkable/reviewable, but excluded from the npm package (`package.json`'s `files`) since npm
consumers get the modular package instead:

```text
artifacts/ambient/onlyoffice-doceditor-plugin-types.word.ambient.d.ts   # 2.51 MB - Asc/AscPlugin/events/buttons/
                                                          # config/theme/services + namespace Word
                                                          # + a global `Api: Word.Api`
artifacts/ambient/onlyoffice-doceditor-plugin-types.cell.ambient.d.ts   # 2.48 MB - ...same, for Cell
artifacts/ambient/onlyoffice-doceditor-plugin-types.slide.ambient.d.ts  # 1.46 MB - ...same, for Slide
artifacts/ambient/onlyoffice-doceditor-plugin-types.pdf.ambient.d.ts    # 1.42 MB - ...same, for Pdf
artifacts/ambient/onlyoffice-doceditor-plugin-types.forms.ambient.d.ts  # 0.56 MB - ...same, for Forms, minus the
                                                          # global `Api` (Forms has none: its
                                                          # methods go through executeMethod)
```

Each bundle is self-contained. Load exactly one, and nothing alongside it - the five declare the
same globals with different types:

```js
monaco.languages.typescript.javascriptDefaults.addExtraLib(wordBundleText, "onlyoffice.word.d.ts");
```

One bundle per editor, even though that repeats the ~55 KB of non-editor declarations five times:
the editor namespaces are the bulk of the text (0.5-2.5 MB each) and none of them references
another, so a combined bundle made every consumer parse all five to use one. That is paid on load,
not just on download - a Monaco worker binds the whole blob before it can answer the first
completion.

Splitting them means `AscPlugin`'s `executeMethod`, `callMethodAsync`, `attachEditorEvent` and
`detachEditorEvent` - written in the modular sources as an intersection of one call signature per
editor - have to keep only their own editor's signature, or that signature would drag the other
editor's whole namespace back in (`pruneEditorOverloads`). A visible side effect: the string-literal
completion for `executeMethod("...")` now offers one editor's method names instead of all five
editors' names merged into one list.

Pruning can leave a reference dangling - `src/plugin/events.d.ts`, for instance, uses typedefs only
`word-methods.ts` declares. Rather than hand-maintaining a list of those, each candidate bundle is
type-checked with TypeScript itself, and whatever comes back as TS2304/TS2503/TS2552 is pulled in
by name from the other editors' generated sources before checking again. That same pass is the
correctness gate for the flattening as a whole: generation fails unless every bundle compiles clean
against `lib.dom`, which nothing else in this repo checks.

A file with no top-level `import`/`export` is a TypeScript "script": every `interface`/`type`/
`namespace` in it is automatically global, so this is what a `declare global {}` block would need
to look like if it weren't wrapped in a module - unlike the modular npm package, it doesn't need
installing, only loading as text.

That global scope is shared with the DOM lib, so a name we happen to share with it stops being a
separate type and becomes a declaration *merge* - harmless when the shapes agree, fatal when they
don't. sdkjs's `ImageData` typedef (a base64 image: `src`, `width`, `height`) merged with the
canvas `ImageData`, whose `width`/`height` are `readonly`, and every consumer compiling with
`"lib": ["DOM"]` got `TS2687`. The bundle therefore renames such names on flatten -
`AMBIENT_RENAMES` in the generator, currently just `ImageData` → `AscImageData` - and
`assertNoDomCollisions` fails the build if a new shared name appears, so the next one has to be
classified rather than silently shipped. `Window` is in `INTENTIONAL_DOM_MERGES`: merging with it
is exactly how `declare global` adds `Asc` to the real `Window`.

The rename lives in the ambient generator, not in the type generator: in the modular package each
file is a module, so `ImageData` is local to it and collides with nothing. Renaming it there would
be a breaking change for consumers importing the type, to fix a problem they don't have.

## Machine-readable index (AI agents, search, RAG)

`artifacts/api/` is the same API surface as the `.d.ts` files - every class, method, typedef, editor event
and `executeMethod` - but as JSON for tools that don't parse TypeScript. Each entry carries its
signature, markdown description, parameter list, return type, runnable `examples`, `since` version
and the verified `docsUrl` (derived from the sources, never guessed):

```json
"AddComment": {
  "signature": "AddComment(sText: string, sAuthor?: string, sUserId?: string): ApiComment",
  "description": "Adds a comment to the current range.",
  "docsUrl": "https://api.onlyoffice.com/docs/office-api/usage-api/document-api/ApiRange/Methods/AddComment/",
  "examples": ["let doc = Api.GetDocument(); ..."],
  "params": [{ "name": "sText", "type": "string", "description": "The comment text (required.)" }, ...],
  "returns": { "type": "ApiComment", "description": "Returns null if the comment was not added." }
}
```

Alongside the per-editor directories there is `runtime.json`, covering the other half of the API -
how you write a plugin at all, rather than what you do inside a `callCommand` body. It is grouped as
`plugin` (`AscPlugin`, `Asc`, events, buttons), `config` (the `config.json` types) and `services`,
and carries each member's real declared signature plus its JSDoc:

```json
"callCommand": {
  "signature": "callCommand: <T>(command: () => T & CommandSerializable<T>, isClose?: boolean, ...) => void",
  "description": "Runs `command` inside the editor's process, where the global `Api` is the entry point. ..."
}
```

### Why it is a tree and not one file

It used to be a single `artifacts/api-index.json`. That file reached **6.3 MB / ~1.6M tokens** - about
eight times a typical model context - so the one consumer it was built for could not read it at all,
only grep fragments out of pretty-printed JSON. The layout is now sized for how an agent actually
works: load a small index, then read exactly one detail file.

```text
artifacts/api/index.json                     manifest: editors, counts, navigation (~1 KB)
artifacts/api/<editor>/index.json            every member name -> signature (7k-41k tokens)
artifacts/api/<editor>/classes/<Class>.json  full detail for one class
artifacts/api/<editor>/classes/<Class>/      ...sharded per method when a class exceeds 80 KB,
                                        with the class's own prose in _class.json
artifacts/api/<editor>/{typedefs,events,executeMethods}.json
artifacts/api/runtime.json                   AscPlugin/config/services
```

Sharding is a threshold rule rather than a special case: most classes are tiny (median 1.6 KB), but a
few - `ApiWorksheetFunction` is the Excel formula library with 416 members - would otherwise be a
single 100k-token read and reintroduce exactly the problem the split exists to solve.

Two ways to get it: fetch the git-tracked files from raw.githubusercontent.com, or regenerate
locally with `npm run generate`. It is deliberately not in the npm package - at 4.89 MB it was 37%
of the install for something only an agent reads, and an agent reaching for it can fetch it over
HTTP, while everyone installing the package for editor completion carried it for nothing.
Written by `generate-types.js` (object model + events), `generate-plugin-methods.js` (executeMethod
surface) and `generate-runtime-index.js` (`runtime.json`); each replaces its own section wholesale,
so removed members disappear instead of going stale.

`generate-runtime-index.js` is the one generator that reads *this package's* declarations rather
than sdkjs - via the TypeScript compiler API, so the published signature is the one we actually
authored (`callCommand`'s serializability constraint, `executeMethod`'s overload chain) rather than
a re-transcription of sdkjs's looser `@param {Function}` JSDoc. Because its inputs are hand-written
files that change without a regeneration, it needs no `SDKJS_PATH` and has its own drift guard:
`npm run check-runtime-index` regenerates and fails if the checked-in `artifacts/api/` differs.
Run it after editing anything under `src/plugin/`, `src/config/` or `src/services/`. `AGENTS.md` in this directory condenses the
plugin-authoring contract (`callCommand` serialization, `Asc.scope`, the three channels) plus these
lookup pointers for coding agents.

## Project Structure

```
onlyoffice-types/
├── index.d.ts            # Barrel file: imports every module below and re-exports the public API
├── src/
│   ├── generated/        # Auto-generated Office API types, one namespace per editor
│   │   ├── word.ts        # namespace Word { ... }
│   │   ├── cell.ts        # namespace Cell { ... }
│   │   ├── slide.ts       # namespace Slide { ... }
│   │   ├── forms.ts       # namespace Forms { ... }
│   │   ├── pdf.ts         # namespace Pdf { ... }
│   │   ├── word-methods.ts  # executeMethod names/args/returns for Word
│   │   ├── cell-methods.ts  # executeMethod names/args/returns for Cell
│   │   ├── slide-methods.ts # executeMethod names/args/returns for Slide
│   │   ├── pdf-methods.ts   # executeMethod names/args/returns for PDF
│   │   ├── forms-methods.ts # executeMethod names/args/returns for Forms
│   │   ├── api-report.json # unresolved types and `any` occurrences, per editor
│   │   └── generation-manifest.json # source commits, tags and file hashes this output came from
│   ├── overrides/          # Hand-maintained declarations for the handful of classes/typedefs
│   │   │                   # generate-types.js can't resolve from a plain sdkjs checkout
│   │   ├── word.ts
│   │   ├── cell.ts
│   │   └── pdf.ts
│   ├── editors/            # /word, /cell, /slide, /pdf entry points (declare each editor's global Api)
│   │   ├── word.d.ts
│   │   ├── cell.d.ts
│   │   ├── slide.d.ts
│   │   └── pdf.d.ts
│   ├── theme/
│   │   └── index.d.ts      # AscTheme, KnownThemeName
│   ├── config/
│   │   ├── plugin-config.d.ts # PluginConfig, VariationConfig, ButtonConfig, IconConfig, ...
│   │   └── index.d.ts         # re-exports plugin-config.d.ts - the /config entry point
│   ├── plugin/
│   │   ├── plugin.d.ts     # Asc, AscPlugin, PluginWindow, PluginScope, PluginInfo (the hub module)
│   │   ├── events.d.ts     # PluginEventMap and plugin-window-level event types
│   │   ├── buttons.d.ts    # Buttons, ButtonBase and its Toolbar/ContextMenu/... subtypes
│   │   ├── editor.d.ts     # shapes of the global Editor: method proxy + RunMacro
│   │   └── index.d.ts      # re-exports the files above - the /plugin entry point
│   └── services/
│       ├── desktop-editor.d.ts  # AscDesktopEditor
│       ├── simple-request.d.ts  # AscSimpleRequest
│       └── index.d.ts           # re-exports both - the /services entry point
├── schemas/
│   └── config.schema.json
├── artifacts/             # generated, tracked in git, NOT published to npm - fetched over raw.githubusercontent
│   ├── api/                # machine-readable API tree (compact indexes + per-class detail) for agents/RAG
│   └── ambient/            # five self-contained no-import .d.ts bundles, one per editor (Monaco etc.)
├── scripts/                   # generators, the modules they share, and the drift checkers
│   ├── generate-types.js          # Api object model generator (src/generated/{word,cell,slide,pdf,forms}.ts)
│   ├── generate-plugin-methods.js # executeMethod surface generator (src/generated/*-methods.ts)
│   ├── generate-runtime-index.js  # artifacts/api/runtime.json from this package's own declarations
│   ├── generate-ambient-bundle.js # flattened no-import bundle for Monaco-style tooling
│   ├── generate-config-schema.js  # schemas/config.schema.json from src/config
│   ├── api-index.js               # writer for the artifacts/api tree (splitting + sharding)
│   ├── resolve-paths.js           # one SOURCES table: every checkout path and env var
│   ├── render-jsdoc.js            # doclet -> the JSDoc block that ships in the .d.ts
│   ├── provenance.js              # git metadata, file hashes, the release-tag gate
│   ├── ext-provenance.js          # what counts as commercial, and the @requires wording
│   ├── overrides-tables.js        # PARAM_OPTIONAL_FROM - corrections to sdkjs's own JSDoc
│   ├── check-runtime-contract.js
│   ├── check-plugin-events.js
│   ├── check-arity.js
│   ├── check-structure.js         # this tree, and the measured numbers the docs quote, vs disk
│   ├── check-package-contents.js  # what `npm publish` would ship, and that exports resolve in it
│   └── validate-config-schema.js
├── tsconfig.json           # builds/typechecks the library itself
├── tsconfig.typecheck.json # editor-agnostic test program (example.js + runtime tests)
├── tsconfig.test.word.json # one program per editor - each declares the global Api differently
├── tsconfig.test.cell.json
├── tsconfig.test.slide.json
├── tsconfig.test.pdf.json
├── tsconfig.test.forms.json # Forms has no Api global of its own - borrows word's, see the file
├── example.js             # Usage examples
├── test/                  # Call-shape smoke tests copied from the official docs
├── README.md              # for someone consuming the package from npm
├── CONTRIBUTING.md        # this file - for someone working on the package
├── AGENTS.md              # authoring contract + lookup pointers for coding agents
├── CHANGELOG.md           # one section per editor release, newest first
├── LICENSE                # Apache-2.0
├── package.json
└── package-lock.json      # pins jsdoc and typescript, so generation is reproducible
```

Each interface/type is physically declared in exactly one module (e.g. `AscPlugin` lives in
`src/plugin/plugin.d.ts`, `AscTheme` in `src/theme/index.d.ts`); `index.d.ts` only imports and
re-exports them, so it stays a genuine barrel file rather than a second copy of the same content.
Each of `src/plugin/`, `src/config/`, `src/services/`, and `src/theme/` has its own `index.d.ts` that
re-exports everything in that directory - that's what the root package's `/plugin`, `/config`,
`/services` entry points (see [README.md](README.md#modular-entry-points)) resolve to;
`@onlyoffice/doceditor-plugin-types/plugin/*` resolves directly to the individual file (e.g. `/plugin/events`
→ `src/plugin/events.d.ts`).
