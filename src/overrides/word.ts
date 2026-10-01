// Manual overrides for Word typedefs the generator cannot resolve from any source - the
// DefinitelyTyped pattern, used only where sdkjs documents a name it never declares.
//
// This file used to carry ten more entries: `ApiTableOfContents`, `ApiTableOfFigures` and their
// supporting types (`TocPr`, `TofPr`, `TocLeader`, `TocStyle`, ...). They are now generated from
// their real source - those classes are declared in the commercial extension sources, which the
// generator reads directly - so the hand-written versions would shadow the genuine declarations and
// drift on the next change there. `generate-types.js` warns when an override becomes resolvable;
// that warning is what prompted the removal.
//
// What remains are the two annotation payload shapes, which sdkjs references from its event
// documentation but declares nowhere.

/**
 * A grammar/spellcheck-style annotation attached to a paragraph - the payload of
 * `onBlurAnnotation`/`onFocusAnnotation`/`onClickAnnotation`. Kept in sync by hand with the
 * identical shape `scripts/generate-plugin-methods.js` derives independently for the same concept
 * from a different sdkjs source (word/api_plugins.js) - see src/generated/word-methods.ts.
 */
export interface TextAnnotation {
  /** ID of the paragraph containing the annotation. */
  paragraphId: string;
  /** ID of the annotation range. */
  rangeId: string;
  /** Annotation type (e.g., `"grammar"`). */
  name?: string;
}

/** A text range within a paragraph associated with an annotation - see {@link TextAnnotation}. */
export interface TextAnnotationRange {
  /** Unique identifier for the range. */
  id: string;
  /** Starting index of the text range. */
  start: number;
  /** Length of the text range. */
  length: number;
  /** Annotation type (e.g., `"grammar"`). */
  name?: string;
}
