import type { Cell } from "../generated/cell";
import type { CellMethodArgs, CellMethodReturnMap } from "../generated/cell-methods";
import type { EditorGlobal } from "../plugin/editor";

declare global {
    interface Window {
        Api: Cell.Api;
        Editor: EditorGlobal<CellMethodArgs, CellMethodReturnMap>;
    }

    var Api: Cell.Api;
    var Editor: EditorGlobal<CellMethodArgs, CellMethodReturnMap>;
}

export type CellApi = Cell.Api;
export type { Cell };

export {};
