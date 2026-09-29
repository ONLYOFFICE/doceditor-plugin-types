// The global `Editor` object: `Editor.GetSelectedText()` where `Asc.plugin.executeMethod` was.
//
// It is a Proxy installed by `startPluginApi()` (sdkjs `common/plugins/plugin_base_api.js`), and it
// has two kinds of member. Every name except `RunMacro` is forwarded to `executeMethod` with the
// arguments spread rather than passed as an array; `RunMacro` is its own thing, over `callCommand`.
// Both take a trailing callback or return a Promise. The Proxy answers `undefined` for `then`, which
// is what lets `await Editor.Something()` work - without that exclusion `await` would treat `Editor`
// itself as a thenable and hang.
//
// The declarations here are the shapes; each editor entry point (`src/editors/<editor>.d.ts`)
// declares the global itself with that editor's own method maps, the same way it declares `Api`.
// Two entry points in one program therefore collide on `Editor` exactly as they do on `Api`, and for
// the same reason: a plugin runs in one editor.

import type { CommandSerializable } from "./plugin";

/**
 * One forwarded method: `Editor.Name(...args)`.
 *
 * The callback form is declared as returning `void` even though the runtime returns `executeMethod`'s
 * own `true`/`false`. That boolean reports whether the call went out now or was queued behind another
 * one in flight - an internal detail of the single-method-at-a-time protocol, not an answer about the
 * method. `Asc.plugin.executeMethod` declares `void` for the same reason.
 *
 * Three signatures rather than two, because a tuple cannot put a required element after an optional
 * one: `[...Args, callback]` is not expressible when `Args` itself ends in an optional parameter, and
 * for a method like `GetSelectedText(prop?)` the callback form would otherwise demand the argument it
 * is allowed to omit. The second signature covers passing only a callback. What stays out of reach is
 * a method with several optional parameters called with some of them *and* a callback - rare enough
 * to leave; it is reported as no-matching-overload rather than silently accepted.
 */
type EditorMethod<Args extends unknown[], Result> = {
    (...args: Args): Promise<Result>;
    (callback: (result: Result) => void): void;
    (...args: [...Args, (result: Result) => void]): void;
};

/** Every `executeMethod` name of one editor, as a callable property. */
type EditorMethods<ArgsMap, ReturnMap> = {
    [K in keyof ArgsMap]: ArgsMap[K] extends unknown[]
        ? EditorMethod<ArgsMap[K], K extends keyof ReturnMap ? ReturnMap[K] : unknown>
        : never;
};

/**
 * `Editor.RunMacro(fn, ...args)` - `callCommand` with two long-standing traps closed.
 *
 * The arguments are `JSON.stringify`d into the macro source and applied to `fn` inside the editor,
 * so data reaches the body as parameters instead of through `Asc.scope`. They must therefore survive
 * JSON, which is what `CommandSerializable` states: a function anywhere in an argument is a compile
 * error rather than an `undefined` that only shows up at runtime.
 *
 * The body is also wrapped in `try`/`catch` by the runtime, and the Promise form rejects with an
 * `Error` carrying the original message. `callCommand` has no such path - a throw there is lost and
 * the callback simply never fires - so this is the form to reach for when the macro can fail.
 */
interface EditorRunMacro {
    <Result, Args extends unknown[]>(
        macro: (...args: Args) => Result & CommandSerializable<Result>,
        ...args: Args & CommandSerializable<Args>
    ): Promise<Result>;
    <Result, Args extends unknown[]>(
        macro: (...args: Args) => Result & CommandSerializable<Result>,
        ...argsAndCallback: [...(Args & CommandSerializable<Args>), (result: Result) => void]
    ): void;
}

/** The global `Editor` of one editor: its `executeMethod` names, plus `RunMacro`. */
type EditorGlobal<ArgsMap, ReturnMap> = EditorMethods<ArgsMap, ReturnMap> & {
    RunMacro: EditorRunMacro;
};

export type { EditorMethod, EditorMethods, EditorRunMacro, EditorGlobal };
