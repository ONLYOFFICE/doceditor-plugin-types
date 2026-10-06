import type { Word } from "./src/generated/word";
import type { Cell } from "./src/generated/cell";
import type { Slide } from "./src/generated/slide";
import type { Pdf } from "./src/generated/pdf";

import type { EditorType } from "./src/config";
import type { Asc, EditorGlobal } from "./src/plugin";
import type { AscDesktopEditor, AscSimpleRequest } from "./src/services";

import type { WordMethodArgs, WordMethodReturnMap } from "./src/generated/word-methods";
import type { CellMethodArgs, CellMethodReturnMap } from "./src/generated/cell-methods";
import type { SlideMethodArgs, SlideMethodReturnMap } from "./src/generated/slide-methods";
import type { PdfMethodArgs, PdfMethodReturnMap } from "./src/generated/pdf-methods";

declare global {
    interface Window {
        Asc: Asc;
        AscDesktopEditor?: AscDesktopEditor;
        AscSimpleRequest?: AscSimpleRequest;
    }
    var Asc: Asc;
    var AscDesktopEditor: AscDesktopEditor | undefined;
    var AscSimpleRequest: AscSimpleRequest | undefined;
}

export type Api<T extends EditorType> =
    T extends "word" ? Word.Api :
    T extends "cell" ? Cell.Api :
    T extends "slide" ? Slide.Api :
    T extends "pdf" ? Pdf.Api :
    never;

/**
 * The global `Editor` of one editor, resolved by name - the counterpart to {@link Api} and
 * distributive over a union the same way, so `Editor<"word" | "cell">` is the union of both.
 *
 * An editor entry point declares the global itself, so a single-editor plugin never needs this. It
 * exists for the case the entry points cannot serve: a plugin whose `EditorsSupport` lists several
 * editors cannot include two of them in one program - they collide on `Editor` exactly as they do
 * on `Api` - and so has to declare the global itself:
 *
 * ```typescript
 * import type { Api as ApiOf, Editor as EditorOf } from "@onlyoffice/doceditor-plugin-types";
 *
 * declare global {
 *     var Api: ApiOf<"word" | "cell">;
 *     var Editor: EditorOf<"word" | "cell">;
 * }
 * ```
 *
 * Over a union, a method both editors have is callable directly; one only a single editor has is
 * not, which is the honest answer - the plugin runs in one of them and the program does not know
 * which. Narrow by `Asc.plugin.info.editorType` and cast, as with `Api`.
 */
export type Editor<T extends EditorType> =
    T extends "word" ? EditorGlobal<WordMethodArgs, WordMethodReturnMap> :
    T extends "cell" ? EditorGlobal<CellMethodArgs, CellMethodReturnMap> :
    T extends "slide" ? EditorGlobal<SlideMethodArgs, SlideMethodReturnMap> :
    T extends "pdf" ? EditorGlobal<PdfMethodArgs, PdfMethodReturnMap> :
    never;

export type * from "./src/generated/forms";
export type * from "./src/generated/word";
export type * from "./src/generated/cell";
export type * from "./src/generated/slide";
export type * from "./src/generated/pdf";

export type * from "./src/generated/word-methods";
export type * from "./src/generated/cell-methods";
export type * from "./src/generated/slide-methods";
export type * from "./src/generated/pdf-methods";
export type * from "./src/generated/forms-methods";

export type * from "./src/services";
export type * from "./src/config";
export type * from "./src/theme";
export type * from "./src/plugin";
