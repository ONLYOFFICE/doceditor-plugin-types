# Changelog

Versions mirror the ONLYOFFICE editor release this package's types were generated from - see
[Versioning](README.md#versioning). Everything below `10.0.0` is development history from before the
first publish: neither `9.5.0` nor any `0.x` version was released to npm.

## 10.0.0

First published release. Generated from sdkjs `v10.0.0.138`.

The version follows the editor release the types were generated from (see
[Versioning](README.md#versioning)), so this supersedes the unpublished `9.5.0` below rather than
building on it: everything listed under `9.5.0` ships here, regenerated against 10.0.0.

### Added

- The global `Editor`, which sdkjs added in `v10.0.0.119`. Every `executeMethod` name is a function
  on it - `await Editor.GetSelectedText()` - with the arguments spread rather than passed as an
  array, a trailing function still taken as a callback, and a Promise when there is none. Typed per
  editor from the maps `executeMethod` already uses, and declared in the editor entry points beside
  `Api`, so the one-editor-per-program rule covers it unchanged.

  `Editor.RunMacro(fn, ...args)` is the member that is not a renamed `executeMethod`: it is
  `callCommand` with the extra arguments serialized into the macro body, so data reaches it as
  parameters instead of through `Asc.scope`, and with that body wrapped in `try`/`catch`, so a throw
  rejects the Promise instead of leaving a callback that never fires. `CommandSerializable` now
  constrains its arguments as well as its return value.

  Three call signatures per method rather than two: a tuple cannot place a required element after an
  optional one, so `[...Args, callback]` is inexpressible for a method whose last parameter is
  optional, and the callback form of `GetSelectedText(prop?)` would have demanded the argument it is
  allowed to omit. The extra signature covers passing a callback alone. A method called with *some*
  of its optional arguments and a callback stays out of reach - it fails as no-matching-overload
  rather than being silently accepted.
- The files an agent starts from point back at the guide: an `"agents"` field carrying AGENTS.md's
  raw URL on the manifest, each editor index and `runtime.json` - seven files - plus a line in each
  ambient bundle's header. `artifacts/` is not in the npm package, so it is normally reached by URL,
  and a fetch arrived with no way to learn that a guide exists, that `requires` marks a Developer
  Edition member, or that the runnable examples are in the `.d.ts` rather than here; only the
  top-level manifest described itself, and only its navigation. The manifest's `howToUse` gained
  those two facts as well.

  Deliberately not on the member files. Class details and per-method shards are reached through an
  index that already carries the pointer, and one identical line repeated across 448 class files made
  each of them open with something that is not about the class. `typedefs.json`, `events.json` and
  `executeMethods.json` could not take it at all: they are keyed by member name, so the key read as
  another member - it briefly put a method called `agents` in `word/executeMethods.json` and shifted
  every count in the compact index by one.
- `test/pdf-methods-original-examples.js` (22 examples) and `test/forms-methods-original-examples.js`
  (41) close the two gaps in example coverage: PDF had a 49-line smoke test where Word, Cell and
  Slide each compile ~650 lines of documented calls, and Forms had nothing at all. `npm test` now
  compiles six programs; the sixth, `tsconfig.test.forms.json`, exists because Forms has no editor
  entry point of its own and its examples still call Word's `Api` inside `callCommand` bodies.
  Unlike the three hand-copied files, these are taken from the `@example` blocks of the generated
  `*-methods.ts` - the same documentation text, one transcription instead of two.
- `npm run check-package` guards what `npm publish` would actually ship - the one hand-written fact
  with no check behind it, and the only one invisible in a checkout, since the repository holds the
  files either way. It runs `npm pack --dry-run` and rejects a published path outside the package's
  declared shape, a deliberately excluded one that came back, a `files` entry matching nothing, an
  `.npmignore` (which overrides `files` wholesale), and an `exports`/`typesVersions` subpath pointing
  at a file the tarball does not contain. The last of those is what prompted it: dropping `artifacts/api`
  left `exports["./api/*"]` resolving to nothing, which nobody would have hit before an install.
- The machine-readable index carries prose and signatures but no runnable examples, which halves it:
  9.1 MB to 4.7 MB, and the package from 18.1 MB to 13.5 MB. The examples were the same text already
  present in every member's JSDoc, so `artifacts/api` was shipping 4.5 MB of it a second time in a second
  representation - 45% of the tree. Every member with an example also carries a `docsUrl` (5938 of
  5938), and a consumer reading the index has the declarations beside it, so nothing became
  unreachable. A side effect: with the class files that much smaller, only three classes still exceed
  the 80 KB per-method sharding threshold, down from dozens.
- `artifacts/api/<editor>/index.json` lists `paidMethods` - every object-model member that needs a paid
  edition, as `Class.method`. The executeMethod half was already there as `paidExecuteMethods`, but
  the object model is by far the larger one (Cell's table and sort classes alone are ~100 members),
  so a reader holding only the compact index could see `ApiListObject.GetRange` with no hint that the
  whole class needs a commercial build. The detail files keep the `requires` string naming the
  edition; this is the same answer at the level an agent actually reads.
- `npm run check-structure` also guards the measured numbers README.md, AGENTS.md and CONTRIBUTING.md
  quote: the five ambient bundle sizes, the size of `artifacts/api/`, and the paid-member counts -
  seventeen mentions of six facts, each derived from disk rather than from another document. They
  were the last hand-written facts with nothing behind them, and they had drifted in both of the
  ways a repeated number does: the paid count read 211 in two documents while the changelog had
  already recorded 227, and the size of `artifacts/api/` was right in AGENTS.md and stale in
  CONTRIBUTING.md at the same time. The check found that second one on its first run.

  A fact that no document states any more is an error too, not a pass. A pattern that silently stops
  matching guards nothing, which is the failure mode of a gate rather than of the thing it gates.
  CHANGELOG.md is excluded on purpose: its entries record what was true at a release.

### Fixed

- `<note>` no longer reaches the declarations as a literal tag. sdkjs writes its notes two ways -
  the HTML-flavored `<note>...</note>` and the Docusaurus `:::note` fence - and only the fence was
  translated, so 124 descriptions across `src/generated` and `artifacts/api` carried a raw tag into
  the hover tooltip. Both spellings now produce the same `**Note:**` lead-in, which matters beyond
  the leak itself: sdkjs converted 67 of its notes to the fence in `v10.0.0.138`, and without this
  a member's description would have changed every time someone reformatted its comment upstream.
- `AscDesktopEditor` documents that it is not reachable inside a `callCommand` body. That body does
  not run in the plugin's scope: the editor evaluates it against a scope it builds itself
  (`_safePluginEval` in sdkjs's `common/macros.js`), where the name is bound to an empty object -
  `"AscDesktopEditor": {}` - alongside sandboxed `setTimeout`/`setInterval`/`XMLHttpRequest`. The
  global type promised the desktop bridge there and every call reached a TypeError instead. Prose
  only: the declaration stays global, since the plugin frame is where it is meant to be used and a
  global cannot be scoped away inside one function body.
- `executeMethod("GetSelectedContent", [])` did not type-check in any of the four editors that have
  the method. sdkjs's JSDoc marks its options object required, while ONLYOFFICE's own example on the
  method's page passes nothing - and both of the object's fields are optional, so an empty object
  carries no information anyway. Now a `METHOD_OVERRIDES` entry, the same correction
  `GetSelectedText` already had. Found by compiling the new Forms example file: `check-arity`
  re-derives the object-model corrections from the documentation but does not cover the
  `executeMethod` surface, so nothing else would have caught it.
- 88 generated signatures rejected ONLYOFFICE's own sample code. sdkjs's JSDoc writes
  `@param {Type} name` where `[name]` was meant, so parameters that are optional in fact came out
  required - `worksheet.GetRange("A2")`, which the spreadsheet examples use 5932 times, did not
  type-check, nor did `form.Delete()`, `chart.SetTitle(text, size)` or `range.GetCells()`. 57
  `Class.method` corrections now fix this, each backed by two independent confirmations: the example
  on that member's own documentation page calls it with fewer arguments, and the sdkjs implementation
  guards against the argument being absent (`if (!Range2)`, `undefined === col`). `npm run check-arity`
  re-derives the list and fails if an entry loses its evidence or a new mismatch appears.

  Keyed by `Class.method` rather than by method name: `Delete`, `Search` and `ToFixed` exist on dozens
  of classes, and loosening by name would reach namesakes whose parameters really are required. One
  mismatch is knowingly left - `ApiDocument.SearchAndReplace`, where the generator flattens a
  documented object parameter and its nested properties into separate positional parameters; marking
  those optional would hide the wrong shape instead of fixing it.
- `executeMethod` callbacks are typed `unknown` instead of `any` where sdkjs documents no `@returns`
  - 170 occurrences across 75 methods, and the last `any` in the generated surface. The original
  argument for `any` was that `void` would break the `if (result)` check real callback code performs,
  which is true but only rules out `void`: `unknown` allows `if (r)`, `!!r` and `String(r)` while still
  rejecting `r.foo`. So `any` was disabling type checking on 75 callbacks for nothing. The four `any`
  that remain are explicit `METHOD_OVERRIDES` entries with their own recorded reasons.
### Changed

- Renamed `@onlyoffice/plugins-types` → `@onlyoffice/doceditor-plugin-types`, with the repository
  following as `ONLYOFFICE/doceditor-plugin-types`. The old name would have been the only first-party
  package in the `@onlyoffice` scope without a product prefix, in a scope that also carries
  `docspace-plugin-sdk` - so the unqualified word `plugins` claimed a default across two products
  that both have plugins. The new name reuses the prefix `doceditor-types` already established and
  leaves the three of them reading as a set: `doceditor-types` for the embedding API,
  `doceditor-plugin-types` for the plugin API, `docspace-plugin-sdk` for the other product's.
  Free to do only because nothing is published yet; after a first publish a rename is a second
  package and a deprecation.

  The ambient bundles are renamed with it -
  `onlyoffice-doceditor-plugin-types.<editor>.ambient.d.ts`. Their name had been a literal in the
  generator, which is how it survived the previous rename and stayed `onlyoffice-plugins-types` while
  the package was something else; it is now derived from `package.json`'s `name`.
- Regenerated against sdkjs `v10.0.0.114` (with `sdkjs-ext` at the same tag and `sdkjs-forms` at
  `v10.0.0.100`, its newest - the forms sources have not moved since `v10.0.0.70`). Against the
  `v10.0.0.79` this package was first built from, that adds:
  - `ApiShd` in all five editors, `ApiTextRange` in Word, PDF and Forms, `ApiPresentationVisitor` in
    Slide - 9 new classes in total, and 174 new object-model members;
  - the `GetRestrictions` executeMethod everywhere, plus `SetParagraphHtml` and
    `SetParagraphRangeHtml` in Slide;
  - `ApiUniColor` accepted by `SetColor`/`SetShd` where it was previously applied as black, and
    `GetTextRange`/`HasTextContent` on the Word document API.

  The paid surface grows from 211 members to 227: 205 object-model methods and 22 executeMethod
  names. `check-arity`'s 57 corrections still hold against the new sources, so nothing sdkjs changed
  in those 221 commits invalidated the documented evidence behind them.
- Regenerated again against sdkjs `v10.0.0.138`, with `sdkjs-ext` and `sdkjs-forms` at the same tag.
  Over `v10.0.0.114` that adds 42 object-model members, among them Cell's `ApiTableStyle`,
  `ApiTableStyleElement`, `ApiTableStyleElements` and `ApiTableStyles`, `ApiPivotField.Group` and
  `ApiRange.RemoveDuplicates`, and sharpens several return types that had been documented as
  unconditional - `ApiRange.SetValue` now reports `false` when the cell was not written, and
  `RemoveRows` answers `null` where the rows cannot be removed. The paid surface is unchanged at
  227 members.

  Most of the diff is prose rather than API: sdkjs rewrote 67 of its `<note>` blocks as `:::note`
  fences and turned several inline enumerations into markdown lists, which reflows a large number
  of descriptions without changing a single signature.
- `dist/` is now `artifacts/`. The name said "what gets distributed" while describing the one part
  of the repository that npm never sees: not a byte of it is in the tarball, and it is reachable
  only over raw.githubusercontent.com. The mismatch was mild while `dist/api` was still in `files`
  and total once it was removed. Anyone consuming `dist/api/...` or `dist/ambient/...` by URL
  changes the path; this is the moment for it, before the public repository exists and the old URLs
  are anywhere. `dist/` is now free for its conventional meaning - `tsconfig.json`'s `outDir` points
  there, nothing emits into it, and it is gitignored.
- Every raw.githubusercontent.com link into this repository now points at `main` rather than `master`
  - the config schema's `$id`, the `$schema` line README tells plugin authors to copy, and the
  `artifacts/api` / `artifacts/ambient` locations AGENTS.md gives. They had been written for a branch this
  repository does not have, which nothing would have caught: the files resolve locally either way,
  and `artifacts/api` and `artifacts/ambient` are reachable only over those links now that neither ships on
  npm.
- `artifacts/api/` is no longer in the npm package, and `exports["./api/*"]` is gone with it. At 4.87 MB
  it was 37% of the install for a surface only an agent reads, and an agent that reaches for it can
  fetch it from raw.githubusercontent.com, where it stays tracked in git - while everyone installing
  the package for editor completion carried it for nothing. The package is now 35 files, 0.99 MB
  packed and 8.13 MB unpacked, down from 1201 files, 1.49 MB and 12.83 MB. Consumers who were
  importing `@onlyoffice/doceditor-plugin-types/api/<path>` must switch to the raw URL; nothing else moves,
  and the same facts remain in each member's JSDoc for an agent working offline.
- `artifacts/ambient/` is now five self-contained per-editor bundles -
  `onlyoffice-doceditor-plugin-types.{word,cell,slide,pdf,forms}.ambient.d.ts`, 0.55-2.50 MB each - instead of
  one 7.98 MB bundle plus four ~10-line `Api` addons. Load exactly one; nothing goes alongside it.
  The old layout made a consumer parse all five editor namespaces to use one: a word consumer loaded
  7.98 MB where it now loads 2.50 MB, and the first completion after `Api.GetDocument().` went from
  636-663 ms to 259-262 ms measured cold through `ts.LanguageService`, or 515-542 ms to 346-372 ms
  in Monaco 0.52.2. The completion itself is unchanged - 152 members either way. Total tracked size
  is practically unchanged (7.98 MB to 8.25 MB) because only the ~55 KB of non-editor declarations
  is duplicated; the editor namespaces, which are the bulk, do not reference each other.
  `Asc.plugin.executeMethod("...")` consequently completes with one editor's method names rather
  than all five editors' merged, and calling another editor's method is now a compile error instead
  of passing silently; `forms` has no global `Api`, matching the modular package.
- Generating the ambient bundles now type-checks each one against `lib.dom` and fails if it doesn't
  compile. Nothing else in this repo checks the flattened output, so dangling references used to be
  discoverable only in a consumer's editor.
- `Pdf.PdfFile.ToBase64` returned an unresolved `unknown`. sdkjs tags it `@returns {Base64}` but never
  declares that typedef; the implementation returns `AscCommon.Base64.encode(...)`, and the sibling
  `@typedef {string} Base64Img` in the same file spells out the convention. Declared as `string` in
  `src/overrides/pdf.ts`, which brings unresolved types back to zero across all five editors.
- `Cell.Api.Intersect` accepts up to 28 additional ranges - `Range3_Range30?: ApiRange` - where it
  previously took exactly two. The only signature change between sdkjs `v10.0.0.70` and `v10.0.0.77`.
- `SetHorFlip`/`SetVertFlip` on `ApiDrawing` and every drawing subclass in Word (`ApiChart`, `ApiShape`,
  `ApiImage`, `ApiGroup`, `ApiOleObject`, `ApiSmartArt`) now document their return value - "true if the
  operation is successful, false otherwise" - in place of a bare "returns false if param is invalid".
  Prose only; the signatures are unchanged.

## 9.5.0

Never released to npm. Generated from sdkjs `v9.5.0.150`, and superseded by `10.0.0` above, which
ships everything listed here regenerated against a newer editor.

### Breaking

- Versioning switched from independent `0.x` semver to mirroring the editor version, so this release
  follows `0.9.1` as `9.5.0`. Nothing was published under the old scheme.
- The machine-readable index is a tree, `dist/api/`, not the single `dist/api-index.json`, and is
  exported as `@onlyoffice/plugins-types/api/<path>`. The one file had reached 6.3 MB / ~1.6M tokens
  - roughly eight times a typical model context - so the AI-agent consumer it exists for could not
  read it at all, only grep fragments out of pretty-printed JSON. It is now split for two-step
  access: `<editor>/index.json` holds every name and signature for one editor (7k-41k tokens, meant
  to be held in context), and each class has its own detail file, sharded per method above 80 KB so
  that outliers like `ApiWorksheetFunction` (416 members) can't reintroduce the same problem.
  Member-for-member identical to the old index - 6677 methods, 287 `executeMethod` names.
- `peerDependencies` now requires `typescript >=5.0.0`. It always did in practice - `index.d.ts`
  re-exports the editor namespaces with `export type *`, which 4.x rejects outright (`TS1383`) - the
  declared floor was simply wrong.

### Added

- Real overloads for `Api.*` methods where an optional parameter is followed by a required one
  (`SetRelativeHeight`, `AddRows`/`AddColumns`, `AddMaster`, `AddLayout`, `CreateChart`, ...) -
  previously flattened into one signature that wrongly let the required parameter be omitted too.
- `src/overrides/{word,cell,pdf}.ts` - hand-maintained declarations (the DefinitelyTyped pattern) for
  8 classes/typedefs sdkjs documents fully but a plain checkout can't resolve (`ApiTableOfContents`,
  `ApiTableOfFigures`, `TextAnnotation`, `TextAnnotationRange`, `ApiListObject`, `ApiHyperlinks`,
  `PTCondition`, `BulletType`), replacing a blind `unknown` stub. Included in `tsconfig.typecheck.json`
  so they're type-checked on their own, not just once spliced into a generated file.
- `CONTRIBUTING.md` - generator/build internals split out of `README.md` (479 → ~120 lines).
- `callCommand` is now generic over its return value, constrained to what can actually cross the
  process boundary. The editor filters the result through `Asc.checkReturnCommand`, silently
  replacing anything carrying methods with `undefined`; returning an `Api.*` object (directly, in an
  array, or nested in a plain object) is now a compile error instead. The callback parameter is
  typed rather than `any` - the last `any` in the package's public surface.
- `callCommandAsync` / `callMethodAsync` - the promise-returning variants, present in the runtime
  but previously undeclared. `callMethodAsync` is typed per editor like `executeMethod`.
- The plugin API members sdkjs documents but we never declared: `callModule`, `loadModule`,
  `createInputHelper`, `getInputHelper`, `inputHelper_onSelectItem`, `onCommandCallback`,
  `onMethodReturn`, `onExternalPluginMessage`, plus the whole `InputHelper` class and
  `InputHelperItem`.
- `test/plugin-runtime-typing.js` - locks the above in with `@ts-expect-error` assertions, so
  loosening `callCommand` back to `any` fails the build.
- `test/<editor>-api-global.js` - asserts each editor entry point really types the global `Api`,
  via an `@ts-expect-error` on another editor's entry method that only holds while it does.
- The machine-readable index gains coverage of the plugin runtime (`dist/api/runtime.json`):
  `callCommand` and the async variants, `Asc`, buttons, plugin events, the `config.json` types.
  Previously it described only what happens inside a `callCommand` body, so searching it for
  `callCommand` or `PluginConfig` returned nothing. Generated by `generate-runtime-index.js` from
  this package's own declarations through the TypeScript compiler API, so the published signature is
  the authored one; guarded by `npm run check-runtime-index`, which needs no sdkjs checkout.
- `@default` tags on generated members. sdkjs records parameter defaults as `[name=value]` and the
  generator parsed them into the doclet, then dropped them - 254 of them in Word alone.
- Runnable examples now come from a checkout of the documentation site (`DOCS_PATH`), replacing 9 MB
  of vendored `scripts/legacy-api/*.json` snapshots that were a pinned dump of the same site. Nearly
  twice the coverage - 5839 examples against 3003 - and PDF has them for the first time (0 → 1178),
  since it never had a snapshot. The page for a member is addressed by the segments its `docsUrl`
  already carries, so the lookup is derived rather than guessed. The snapshots were verified
  redundant before deletion: with prose and `@see` links already coming from sdkjs, generating with
  and without them produced byte-identical output.
- `executeMethod` members carry runnable examples for the first time (251 of 287, across all five
  editors). They come from the plugin half of the same documentation checkout
  (`plugins/interacting-with-editors/<section>/Methods/`), which is a separate tree from the object
  model's - and a closer match to what a plugin author writes, being complete functions calling
  `window.Asc.plugin.executeMethod` rather than document-builder snippets.
- The commercial extension surface is now read directly, marked, and no longer hand-copied.
  Three things were wrong before:

  - **The object model from ext was invisible.** `ApiTableOfContents`, `ApiListObject`, `ApiSort`,
    `ApiListColumn` and friends are declared in the extension sources, not in sdkjs's `apiBuilder.js`
    (which only *references* them), so the generator emitted `= unknown` stubs and `src/overrides/`
    carried hand-written copies. Reading `js-api/` produces the real declarations - 191 methods
    across ~30 classes - and shrinks the override files from 8 classes plus supporting types to the
    5 names no source declares at all (`TextAnnotation`, `TextAnnotationRange`, `ApiHyperlinks`,
    `PTCondition`, `BulletType`). The generator's own "override is now resolvable" warning is what
    flagged the stale copies.
  - **Two documented `executeMethod`s were missing entirely.** `StartGroupActions` and
    `EndGroupActions` live in an extension source file that was never in the source
    list - only the per-editor `api_plugins.js` was - so all four editors that document them
    (`CDE`/`CFE`/`CSE`/`CPE`) lost both.
  - **`@requires` covered only a twelfth of the paid surface.** It is now derived for the object
    model the same way as for `executeMethod` - from each doclet's own `meta.path` rather than a
    name list - so 191 object-model methods carry it in the `.d.ts` *and* in `dist/api/`, alongside
    the 19 `executeMethod` entries.

- The names needed to type an Automation API `Connector` call precisely are now all exported. The
  connector (`docEditor.createConnector()`) belongs to DocsAPI, not here, but it is not a separate API:
  its `executeMethod`, `callCommand` and `attachEvent` take the same names, arguments and payloads a
  plugin uses. Five menu typedefs (`ContextMenuItem`, `ToolbarMenuMainItem`, `ToolbarMenuTab`,
  `ToolbarMenuItem`, `ToolbarMenuItemType`) were declared but file-local, so nobody outside could reach
  them; `test/connector-contract.d.ts` fails the build if any name in the contract stops being exported.

  No dependency runs between the two packages in either direction: `@onlyoffice/doceditor-types`
  declares the connector generically and a project that wants precision supplies the type parameters
  itself. Pinning them to each other was considered and rejected - that package has no dependencies at
  all and is on 9.4.2 while this is on 10.0.0, so a shared-version rule would have broken immediately.

### Fixed

- `extends Omit<Base, /* ~60 names */>` sheets, where sdkjs's JSDoc happened to redocument most of a
  base class's members unchanged: now only genuinely conflicting members (usually just
  `GetClassType`) are Omitted.
- `any` can no longer reappear through an untested fallback path (undocumented property, empty
  typedef, JSDoc's own `{any}` tag) - all three now resolve to `unknown` instead.
- `@see` links to api.onlyoffice.com are derived from sdkjs instead of the pinned snapshot, which
  more than doubles them (2804 → 6980) and gives PDF documentation links for the first time
  (0 → 1478). sdkjs writes the editor segment as a literal `{Editor}` placeholder
  (`office-js-api/Examples/{Editor}/Api/Methods/GetDocument.js`) that the docs pipeline fills in per
  editor; not substituting it meant the path failed to parse, so every link came from the snapshot -
  and PDF, the one editor without a snapshot, got none at all despite sdkjs carrying 536 such paths
  for it. This removes the second hidden dependency on the snapshot, after prose.

  About 10% of the links point at pages the documentation site has not published yet: the site
  tracks 9.1.0 while these types come from 9.5.0. They resolve as it catches up, and are
  deliberately *not* filtered against a local docs checkout - doing so would suppress correct links
  to pages that are about to exist, and tie this package's output to the site's release cadence
  rather than to the API.
- The ambient bundle failed to compile for anyone using `"lib": ["DOM"]`. Flattened to global scope,
  sdkjs's `ImageData` typedef merged with the DOM's canvas `ImageData`, whose `width`/`height` are
  `readonly`, giving `TS2687`. It is renamed to `AscImageData` on flatten, and the generator now
  fails if any other declaration collides with a `lib.dom` global, so the next one is classified
  rather than shipped. Only the bundle is affected - in the modular package each file is a module and
  the name is local to it.
- Docusaurus admonition fences reached the declarations verbatim: `:::note` / `:::danger[Breaking
  Change]` wrapped 8 prose blocks, including the chart-style licence note and two breaking-change
  warnings, and read as noise in a hover tooltip. They render as bold lead-in text (`**Note:**`,
  `**Breaking Change:**`) instead, so the label survives and the fences do not.
- The compact per-editor index was keyed off methods, so a class with no methods of its own was
  absent from it entirely - 56 of the 67 classes in the Forms namespace, whose members are all
  inherited. An agent scanning the index would have concluded `Forms.ApiChart` does not exist. It
  now lists classes, typedefs and events by name regardless.
- Descriptions were taken from the pinned `office-js-api-declarations` snapshot in preference to
  sdkjs, which meant newer prose was discarded for older: `Api.CreateTable`'s `Breaking Change` note
  about the 9.4.0 parameter-order reversal existed in sdkjs and never reached the types. Measured
  across Word, 789 of the 845 methods documented in both sources have identical prose once the
  example is stripped, and sdkjs is the longer, fresher text in 42 of the remaining 56. sdkjs prose
  now wins, the snapshot fills genuine gaps, and its runnable examples are still used - the snapshot
  remains their only source, since sdkjs carries just a `@see` path to a file in another repository
  (all 3003 `@example` blocks are unchanged).
- `generation-manifest.json` was not reproducible across machines, and `check-generated` diffs it:
  source paths came from `path.relative` and so carried the host separator (`word\apiBuilder.js` on
  Windows, `word/apiBuilder.js` on Linux), and the recorded Node version changed with whoever ran
  the generator. Paths are normalised to forward slashes (asserted at generation time) and the Node
  version is gone - `jsdoc` and `typescript` stay because package-lock.json pins them, so they are
  identical for everyone on a given commit, which is exactly what Node was not.
- Generation was silently non-deterministic in the commercial extension sources. They contribute real methods to Word and
  Slide, but a missing checkout was skipped by a `fs.existsSync` filter: generation exited 0 having
  produced 104 Word methods instead of 109 and 51 Slide methods instead of 57. A missing declared
  source is now an error (an explicit opt-out flag exists, with a warning), and the
  manifest records their commit, tag and per-file hashes - previously it recorded only sdkjs
  and sdkjs-forms, so the determinism guarantee did not cover a repository the build depended on.
- `--require-clean-sources` only inspected sdkjs and sdkjs-forms. The check now lives in one place
  and both generators apply it to every repository they actually read.
- `--require-release-tag` (and `npm run check-release-sources`) reject a source checkout sitting past
  a tag. The rule was prose in CONTRIBUTING and was violated immediately: `9.5.0`'s manifest records
  `v9.5.0.150-2-g586ec09e2d`. The two post-tag commits touch only the formula engine, and all ten
  generator inputs are byte-identical to the tag, so the shipped types are unaffected - but the
  manifest is a provenance record and should not have been able to disagree with the version.
- `PluginConfig` required `offered` and `version`, which the reference documents as optional and
  which real plugins omit (only 17 of 54 shipped configs carry `offered`). The mismatch was hidden
  because the checked-in `config.schema.json` had gone stale and still required neither, so
  `validate-schema` was checking configs against an outdated schema instead of the current types.
  Both are optional now, `guid`/`name`/`variations` remain required, and `npm run check-schema`
  guards the schema against drifting from the types again.
- The documentation examples were type-checked against `declare var Api: any`, so every `Api.*` call
  in them - the whole editor object model - was unchecked; only the `executeMethod` shapes were
  really covered. `npm test` now runs one program per editor, each with that editor's real global
  `Api`, and the examples pass against the actual generated types.
- `check-runtime` verified a hardcoded list of 13 names against `plugins.dev.js`, which holds only
  the bootstrap half of the runtime - the rest of the API is installed by `startPluginApi()` and
  never appears there, so 14 documented members were missing while the check still reported success.
  It now derives the expected surface from sdkjs's own `@memberof Plugin`/`@memberof InputHelper`
  JSDoc (needs `SDKJS_PATH`) and reports bootstrap coverage as such.

## 0.9.0

### Breaking

- Package renamed `onlyoffice-plugins-api` → `@onlyoffice/plugins-types` (the old name was never
  published; update `types` in `tsconfig.json` and import paths).
- Relicensed AGPL-3.0-or-later → Apache-2.0, matching `@onlyoffice/doceditor-types`. The editors
  themselves (`sdkjs`) stay AGPL-3.0-or-later.
- Ambient bundles are now one base `onlyoffice-plugins-types.ambient.d.ts` plus ~10-line per-editor
  `...<editor>-api.ambient.d.ts` addons instead of five self-contained copies. Load the base first,
  then exactly one addon.
- Hand-written `src/*-methods.d.ts` replaced by generated `src/generated/*-methods.ts`.

### Added

- JSDoc on every generated member: description, `@param`/`@returns`, `@since`, `@example` (from the
  docs' "Try it" snippets) and `@see` → api.onlyoffice.com. The 2012 methods previously had no
  documentation at all; class/typedef comments were single-line and unreadable in hovers.
- `dist/api-index.json` - the whole API surface (classes, typedefs, events, `executeMethod`s) as
  JSON with signatures, docs, examples and `docsUrl`, for search/RAG/coding agents. Shipped in the
  package (`@onlyoffice/plugins-types/api-index.json`) and tracked in git.
- `AGENTS.md` - the plugin-authoring contract and development invariants, for coding agents.
- The `executeMethod` surface is now generated from sdkjs JSDoc
  (`scripts/generate-plugin-methods.js`), adding the entire missing `FormsMethodArgs` family and
  per-editor gaps (`SetButtonDisabled`, `IsFillingForm`/`IsFillingPdfForm`, `SetParagraphHtml`,
  `InsertPresentationFromUrl`, ...). JSDoc/signature contradictions are resolved via documented
  override tables in the generator.
- `onEnableMouseEvent`/`onChangeRestrictions` in `PluginEventMap`; `onClick` payload typed as
  `isSelectionUse: boolean`.
- 23 more `PluginEventMap` entries, sourced from each editor's own `<editor>/plugin-events.js` /
  `sdkjs-forms/plugin-events.js` (previously only `common/base-plugin-events.js` was checked):
  Word's `onAddComment`, `onChangeCommentData`, `onChangeCurrentPage`, `onRemoveComment`,
  `onSubmitForm`, `onFocusContentControl`, `onBlurContentControl`, `onChangeContentControl`,
  `onHideContentControlTrack`, `onShowContentControlTrack`, `onInsertOleObjects`,
  `onBlurAnnotation`, `onFocusAnnotation`, `onClickAnnotation`, `onParagraphText`; Cell's
  `onChangeCurrentSheet`; Slide's `onChangeCurrentSlide`, `onSlideShowBegin`, `onSlideShowEnd`,
  `onSlideShowNextSlide`, `onSlideShowSlideChanged`; Pdf's `onSelectionEnd`, `onSelectionCancel`.
  The Word-only payloads reuse `ContentControl`/`comment`/`TextAnnotation`/`TextAnnotationRange`
  from `src/generated/word-methods.ts` rather than duplicating those shapes by hand.

### Fixed

- JSDoc's `{*}` wildcard now maps to `unknown` instead of invalid `*` in the output.
- The ambient bundle resolves shared/cross-file typedefs (`comment`, `FormsMethodArgs`, per-editor
  `CommentData`) into the global scope instead of missing or duplicating them.

### Changed

- The semantic unit typedefs (`twips`, `EMU`, `pt`, `mm`, `rad`, `percentage`) now survive into
  signatures instead of being collapsed to bare `number`. They were generated with real prose
  explaining the unit and then referenced almost nowhere - `EMU` had 0 uses, `twips` 1; they now
  appear 67 and 84 times in Word. Each is `= number`, so this is purely additive.
- `package.json` metadata aligned with `@onlyoffice/doceditor-types`: added `maintainers` and
  `bugs.email`, and `homepage` now points at the plugin docs portal rather than the repo README.
- `check-plugin-methods.js` → `check-plugin-events.js`: the `executeMethod`-name half is superseded
  by the generator plus `check-generated`; the surviving events check now also reads every editor's
  own `plugin-events.js` (previously only the common file), which is what surfaced the 23 events
  added above.

## 0.8.0

The initial development version - never published to npm.

### Breaking

- The root package no longer declares a cross-editor global `Api`. Each editor entry point (`/word`,
  `/cell`, `/slide`, `/pdf`) declares its own. If you referenced the bare global `Api`, add
  `declare const Api: Word.Api;` (or Cell/Slide/Pdf) per file, or `import ".../<editor>"` once.
- `PluginScope.prototype` is optional - plugins routinely replace `Asc.scope` with a plain payload.

### Added

- One namespace per editor (`Word`, `Cell`, `Slide`, `Forms`), so same-named classes never collide.
- `Pdf` namespace and PDF plugin API methods (`GetPageImage`, `GoToPage`, `ReplacePageContent`).
- Plugin menu APIs: context menu, toolbar, window header, content-control buttons, click handlers.
- Typed plugin event map with an `unknown[]` fallback for undocumented event names.
- `executeMethod` typed per method name/argument tuple (Word/Cell/Slide);
  `attachEditorEvent`/`detachEditorEvent` typed per editor event (including Pdf `onSelectionEnd`/
  `onSelectionCancel`).
- `Asc.plugin.guid`, `windowID` and custom menu click handler declarations.
- Modular entry points `/plugin`, `/config`, `/services`; `index.d.ts` is now a pure barrel file
  (1031 → 127 lines).
- `schemas/config.schema.json` generated from the `PluginConfig` types (`npm run generate-schema`),
  validated against every real `config.json` in this monorepo (`npm run validate-schema`).
- Pinned offline documentation snapshots, `generation-manifest.json` and `check-generated` -
  generation no longer needs the network.
- `npm run check-runtime`: static contract check of `Asc.plugin`/`Asc.Buttons`/button constructors
  against `plugins.dev.js`.
- Regression tests type-checking the official docs' own examples
  (`test/*-methods-original-examples.js`).

### Fixed

- Class inheritance modeled as real `interface ... extends ...` - ~100 subclasses (drawings, forms,
  ...) previously missed their entire base class's members.
- String enum values and object property names no longer produce fake type stubs; generated files
  contain no `any` (tracked in `src/generated/api-report.json`).
- Signature mismatches against the live docs (`Slide.ShowError` params, `GetSelectedText` options,
  `GetImageDataFromSelection` return shape for Cell/Slide).
