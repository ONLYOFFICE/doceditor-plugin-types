import type { Word } from "../generated/word";
import type { WordMethodArgs, WordMethodReturnMap } from "../generated/word-methods";
import type { EditorGlobal } from "../plugin/editor";

declare global {
    interface Window {
        Api: Word.Api;
        Editor: EditorGlobal<WordMethodArgs, WordMethodReturnMap>;
    }

    var Api: Word.Api;
    var Editor: EditorGlobal<WordMethodArgs, WordMethodReturnMap>;
}

export type WordApi = Word.Api;
export type { Word };

export {};
