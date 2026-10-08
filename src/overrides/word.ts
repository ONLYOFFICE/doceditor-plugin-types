// Types the Word object model needs that sdkjs does not declare - the shapes behind two methods it
// documents as `@returns {object}`.
//
// Different from this directory's other entries, and worth being precise about: elsewhere here
// sdkjs names a type and never declares it, so a declaration fills a hole sdkjs already pointed at.
// These two names are ours. sdkjs says `{object}` and names nothing, and the `RETURN_TYPE_OVERRIDE`
// table in scripts/overrides-tables.js is what points `GetDocumentInfo`/`GetStatistics` here.
//
// A stopgap on both halves, and removable as one change: when sdkjs documents a real return type,
// the override table's gate fails the build naming the entry, and the generator separately reports
// an override shadowed by a real declaration. Delete the table entries and this file together.
//
// Both shapes are read off the implementation in `sdkjs/word/apiBuilder.js`, not inferred from the
// prose, and the field names are the literal keys the implementation writes.

/**
 * Document properties, as returned by `ApiDocument.GetDocumentInfo` (and its Cell/Slide
 * equivalents, which build the same object).
 *
 * The implementation seeds every key up front - `"Application": ''`, `"CreatedRaw": null`,
 * `"Authors": []` - and then fills what the document has, so every field is always present and the
 * unset state is an empty string rather than `undefined`.
 *
 * `CreatedRaw` and `LastModifiedRaw` come straight from `asc_getCreated()`/`asc_getModified()` and
 * stay `null` when the document carries no such timestamp; `Created` and `LastModified` are those
 * same values rendered with `toLocaleString`, and stay `''` when the raw value is null.
 */
export interface DocumentInfo {
    /** The application the document was created with, including its version when one is reported. */
    Application: string;

    /** When the document was created, or null if it records no creation time. */
    CreatedRaw: Date | null;

    /** `CreatedRaw` formatted for the editor's current language, or `''` when it is null. */
    Created: string;

    /** When the document was last modified, or null if it records no modification time. */
    LastModifiedRaw: Date | null;

    /** `LastModifiedRaw` formatted for the editor's current language, or `''` when it is null. */
    LastModified: string;

    /** Who last modified the document. */
    LastModifiedBy: string;

    /** The document authors. */
    Authors: string[];

    /** The document title. */
    Title: string;

    /** The document tags. */
    Tags: string;

    /** The document subject. */
    Subject: string;

    /** The document comment. */
    Comment: string;
}

/**
 * Document statistics, as returned by `ApiDocument.GetStatistics`.
 *
 * Every field is a count taken from `oLogicDocument.Statistics` at the moment of the call. Note
 * that the two symbol counts differ in whether spaces are included, which their names do not quite
 * say: `SymbolsCount` is `SymbolsWOSpaces` and `SymbolsWSCount` is `SymbolsWhSpaces`.
 */
export interface DocumentStatistics {
    /** The number of pages. */
    PageCount: number;

    /** The number of words. */
    WordsCount: number;

    /** The number of paragraphs. */
    ParagraphCount: number;

    /** The number of symbols, not counting spaces. */
    SymbolsCount: number;

    /** The number of symbols, counting spaces. */
    SymbolsWSCount: number;
}
