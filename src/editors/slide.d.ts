import type { Slide } from "../generated/slide";
import type { SlideMethodArgs, SlideMethodReturnMap } from "../generated/slide-methods";
import type { EditorGlobal } from "../plugin/editor";

declare global {
    interface Window {
        Api: Slide.Api;
        Editor: EditorGlobal<SlideMethodArgs, SlideMethodReturnMap>;
    }

    var Api: Slide.Api;
    var Editor: EditorGlobal<SlideMethodArgs, SlideMethodReturnMap>;
}

export type SlideApi = Slide.Api;
export type { Slide };

export {};
