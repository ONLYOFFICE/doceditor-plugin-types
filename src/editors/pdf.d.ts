import type { Pdf } from "../generated/pdf";
import type { PdfMethodArgs, PdfMethodReturnMap } from "../generated/pdf-methods";
import type { EditorGlobal } from "../plugin/editor";

declare global {
    interface Window {
        Api: Pdf.Api;
        Editor: EditorGlobal<PdfMethodArgs, PdfMethodReturnMap>;
    }

    var Api: Pdf.Api;
    var Editor: EditorGlobal<PdfMethodArgs, PdfMethodReturnMap>;
}

export type PdfApi = Pdf.Api;
export type { Pdf };

export {};
