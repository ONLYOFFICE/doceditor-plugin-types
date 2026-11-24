// Plugin methods that sdkjs implements and marks `@undocumented`.
//
// They are real `pluginMethod_*` entries in `sdkjs/common/apiBase_plugins.js`, callable through
// both channels, and plugins in this repository's own ecosystem call them - but they carry
// `@undocumented`, so ONLYOFFICE excludes them from api.onlyoffice.com and the generator excludes
// them too (`generate-plugin-methods.js`: `if (item.undocumented) continue;`). That exclusion is
// the right default - the published surface is what the package mirrors - and the methods below
// are the deliberate exceptions, declared by hand because real plugins depend on them.
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

import type { ContextMenuItem, ToolbarMenuMainItem } from "../generated/word-methods";

/**
 * What `AddContextMenuItem`/`UpdateContextMenuItem` take: the plugin's own guid and its entries.
 *
 * sdkjs's JSDoc says `@param {ContextMenuItem[]} items`, but the implementation reads
 * `items["guid"]` and `items["items"]` off the one argument, and the plugins.js button helper sends
 * exactly this object - `executeMethod("AddContextMenuItem", [{ guid, items }])`.
 */
interface ContextMenuItems {
    /** The calling plugin's guid - `window.Asc.plugin.guid`. */
    guid: string;
    /** The entries to show; an empty array shows none, which still answers the request. */
    items: ContextMenuItem[];
}

/** Argument tuples, by method name. */
interface UndocumentedMethodArgs {
    /**
     * Adds the plugin's entries to the context menu that is opening. The answer to
     * `onContextMenuShow`: a plugin that listens for that event must call this every time, with an
     * empty `items` array when it has nothing to add, or the editor keeps waiting for it before it
     * shows the menu. Clicks arrive through `attachContextMenuClickEvent(id, ...)`.
     * @since 7.4.0
     */
    AddContextMenuItem: [items: ContextMenuItems];

    /**
     * Replaces the plugin's entries in a context menu that is already open, e.g. once an
     * asynchronous check decides what to offer.
     * @since 7.4.0
     */
    UpdateContextMenuItem: [items: ContextMenuItems];

    /**
     * Adds toolbar tabs and buttons for the plugin. Clicks arrive through
     * `attachToolbarMenuClickEvent(id, ...)`.
     *
     * One object, not an array: sdkjs's JSDoc says `ToolbarMenuMainItem[]` and the office-js-api
     * example passes `[[item]]`, but the implementation reads `items["guid"]` and `items["tabs"]`
     * directly, and the plugins.js button helper sends `[{ guid, tabs }]`.
     * @since 8.1.0
     */
    AddToolbarMenuItem: [items: ToolbarMenuMainItem];

    /**
     * Replaces the plugin's toolbar items added by `AddToolbarMenuItem`, matched by id.
     * @since 8.1.0
     */
    UpdateToolbarMenuItem: [items: ToolbarMenuMainItem];

    /**
     * Closes a plugin modal window. `windowId` is the window's `PluginWindow.id` (a GUID string)
     * or the `windowID` the window's `button` call reports - sdkjs's own `PluginWindow.close` sends
     * `executeMethod("CloseWindow", [this.id])`.
     */
    CloseWindow: [windowId: string];

    /** Shows or hides one of the plugin's own buttons. */
    ShowButton: [buttonId: string, visible: boolean, align?: string];

    /**
     * Brings a plugin window or panel forward - what `PluginWindow.activate` sends.
     */
    ActivateWindow: [frameId: string, isFocus?: boolean];

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
 * Only `ResizeWindow` carries a value: it is the one of these that calls
 * `setPluginMethodReturnAsync()` and later answers `onPluginMethodReturn("resize_result")`. The
 * others return synchronously, so their callback fires with nothing - which is still worth
 * declaring, because the Promise form (`await Editor.CloseWindow(win.id)`) resolves at that moment.
 */
interface UndocumentedMethodReturnMap {
    AddContextMenuItem: void;
    UpdateContextMenuItem: void;
    AddToolbarMenuItem: void;
    UpdateToolbarMenuItem: void;
    ActivateWindow: void;
    CloseWindow: void;
    ShowButton: void;
    ResizeWindow: "resize_result";
    OnWindowDockChangedCallback: void;
}

type UndocumentedMethodName = keyof UndocumentedMethodArgs;

type UndocumentedMethodReturn<T extends UndocumentedMethodName> = UndocumentedMethodReturnMap[T];

export type {
    ContextMenuItems,
    UndocumentedMethodArgs,
    UndocumentedMethodReturnMap,
    UndocumentedMethodName,
    UndocumentedMethodReturn,
};
