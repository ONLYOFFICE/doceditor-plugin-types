// Manual overrides for Cell typedefs that no source resolves - not gaps in a checkout, but two real
// defects in sdkjs's own JSDoc.
//
// The general rationale for this directory, which used to live in word.ts: sdkjs documents a name it
// never declares anywhere, so the generator would emit `export type X = unknown;` and every use of it
// would go unchecked. A hand-written declaration here is spliced in instead - the pattern
// DefinitelyTyped uses for undocumented corners of a real API. It is a stopgap, not a home: whenever
// a real source starts declaring one of these, `generate-types.js` says so and the entry must go.
//
// That has happened twice already. word.ts is gone entirely - it held `TextAnnotation` and
// `TextAnnotationRange`, now read from `sdkjs-ext/<editor>/api_plugins.js`, and before that ten more
// (`ApiTableOfContents`, `ApiTableOfFigures`, `TocPr`, ...) that arrived once the generator began
// reading the extension sources directly. This file used to carry `ApiListObject`, `ApiListColumn`,
// `ApiListRow` and `ApiSort`, re-derived by hand from `sdkjs/deploy/sdkjs/cell/sdk-all.js`; they come
// from the extension sources now.
//
// The import and the alias below exist only so this file type-checks on its own (it is in
// tsconfig.typecheck.json for that reason). `loadOverrides` picks up only `export interface` /
// `export type` blocks, so neither the import nor the alias reaches the generated output.
import type { Cell } from "../generated/cell";

type ApiHyperlink = Cell.ApiHyperlink;

/**
 * `ApiWorksheet.GetHyperlinks`/`ApiRange.GetHyperlinks` are documented with `@returns {ApiHyperlinks}`,
 * but there is no `ApiHyperlinks` class anywhere in sdkjs (checked out, in the extensions, or in the
 * deploy bundle) - a naming mistake in sdkjs's own JSDoc. Both implementations actually
 * `.map(elem => new ApiHyperlink(elem, ws))`, i.e. a plain array of the real (singular) `ApiHyperlink`
 * class already generated in this file.
 */
export type ApiHyperlinks = ApiHyperlink[];

/**
 * `ApiFormatCondition`/`ApiAboveAverage` etc.'s `GetPTCondition()` (and the `PTCondition` property
 * alias) return `this.rule.pivot` directly - an internal pivot-table rule object with no public
 * `Api*` wrapper class anywhere in sdkjs, checked-out or bundled. There is nothing to model here;
 * `unknown` is the honest type, not a resolution gap to eventually fill in.
 */
export type PTCondition = unknown;
