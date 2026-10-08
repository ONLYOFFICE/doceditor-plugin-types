// Types this editor's object model needs that sdkjs does not declare - the shape behind a method
// it documents as `@returns {object}`. See src/overrides/word.ts for the full rationale: the name
// is ours, scripts/overrides-tables.js is what points the method here, and both halves come out
// together when sdkjs documents a real return type.
//
// Duplicated per editor rather than shared because each editor's namespace is generated
// independently and an override file feeds exactly one of them.

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
