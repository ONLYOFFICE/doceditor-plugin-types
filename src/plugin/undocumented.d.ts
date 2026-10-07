// Plugin methods that sdkjs implements and marks `@undocumented`.
//
// They are real `pluginMethod_*` entries in `sdkjs/common/apiBase_plugins.js`, callable through
// both channels, and plugins in this repository's own ecosystem call them - but they carry
// `@undocumented`, so ONLYOFFICE excludes them from api.onlyoffice.com and the generator excludes
// them too (`generate-plugin-methods.js`: `if (item.undocumented) continue;`). That exclusion is
// the right default - the published surface is what the package mirrors - and these four are the
// deliberate exceptions, declared by hand because real plugins depend on them.
//
// Nothing here is covered by ONLYOFFICE's compatibility promise. A method can change shape or
// disappear in any release without that counting as a breaking change, and there is no
// documentation page to check a signature against: what each one accepts was read off the sdkjs
// implementation and off the calls real plugins make.
//
// One map, used by both channels. `Asc.plugin.executeMethod("ResizeWindow", [...])` and
// `Editor.ResizeWindow(...)` reach the same `pluginMethod_ResizeWindow` - `window.Editor` is a
// Proxy whose `get` forwards every name to `executeMethod` - so declaring them separately meant
// the two could drift, and they had: all three of the methods that existed here before were typed
// on `executeMethod` and missing from `Editor`, which is the form the docs tell new code to prefer.

/** Argument tuples, by method name. */
interface UndocumentedMethodArgs {
    /** Closes a plugin modal window. */
    CloseWindow: [windowId: number];

    /** Shows or hides one of the plugin's own buttons. */
    ShowButton: [buttonId: string, visible: boolean, align?: string];

    /**
     * Resizes the plugin modal window.
     *
     * sdkjs's own JSDoc for `pluginMethod_ResizeWindow` types size/minSize/maxSize as plain
     * `number`, but the web runtime (`onPluginWindowResize` in web-apps' Plugins.js) reads
     * `size[0]`/`size[1]` and `minSize.length`/`maxSize[0]` - all three are `[width, height]`
     * pairs on the wire, which is also how every real caller (e.g. the antidote and mendeley
     * plugins) passes them. minSize/maxSize are omitted when only resizing, and the callback
     * fires with `"resize_result"` once the window has been resized.
     */
    ResizeWindow: [
        frameId: string,
        size: [width: number, height: number],
        minSize?: [width: number, height: number],
        maxSize?: [width: number, height: number],
    ];

    /**
     * Acknowledges an `onDockedChanged` window event.
     *
     * Not a utility to call on its own - it is the second half of a handshake. When the window's
     * docked state changes, the editor parks a callback under
     * `dockCallbacks[pluginGuid + "_" + windowId]` and sends the plugin an `onWindowEvent` with
     * `eventName: "onDockedChanged"`. Calling this runs that callback and deletes it, so the
     * editor can finish what it was waiting on. Calling it with no pending callback does nothing.
     */
    OnWindowDockChangedCallback: [windowID: string];
}

/**
 * What the callback receives, by method name.
 *
 * Only `ResizeWindow` carries a value: it is the one of the four that calls
 * `setPluginMethodReturnAsync()` and later answers `onPluginMethodReturn("resize_result")`. The
 * others return synchronously, so their callback fires with nothing - which is still worth
 * declaring, because the Promise form (`await Editor.CloseWindow(1)`) resolves at that moment.
 */
interface UndocumentedMethodReturnMap {
    CloseWindow: void;
    ShowButton: void;
    ResizeWindow: "resize_result";
    OnWindowDockChangedCallback: void;
}

type UndocumentedMethodName = keyof UndocumentedMethodArgs;

type UndocumentedMethodReturn<T extends UndocumentedMethodName> = UndocumentedMethodReturnMap[T];

export type {
    UndocumentedMethodArgs,
    UndocumentedMethodReturnMap,
    UndocumentedMethodName,
    UndocumentedMethodReturn,
};
