// Manual override for a Pdf-referenced typedef that generate-types.js can't resolve from this
// package's own sources. See src/overrides/word.ts for the general rationale.

/**
 * A paragraph numbering bullet type, referenced by a `word/apiBuilder.js` method also tagged for
 * Pdf - genuinely declared in `slide/apiBuilder.js`, not one of Pdf's own sources
 * (`word/apiBuilder.js`, `pdf/apiBuilder.js`, `pdf/plugin-events.js`). Adding all of
 * `slide/apiBuilder.js` as a Pdf source to resolve this one typedef would pull Slide's entire class
 * set into the Pdf namespace, so it's a one-line override instead.
 */
export type BulletType = "None" | "ArabicPeriod" | "ArabicParenR" | "RomanUcPeriod" | "RomanLcPeriod" | "AlphaLcParenR" | "AlphaLcPeriod" | "AlphaUcParenR" | "AlphaUcPeriod";

/**
 * `PdfFile.ToBase64` is tagged `@returns {Base64}`, but sdkjs never declares a `Base64` typedef
 * anywhere - a naming slip, not a gap in this checkout. The implementation returns
 * `AscCommon.Base64.encode(...)`, i.e. a string, and the sibling typedef in the same file spells the
 * convention out: `@typedef {string} Base64Img`.
 */
export type Base64 = string;
