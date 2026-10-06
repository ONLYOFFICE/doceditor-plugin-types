// Plugin menu buttons (Asc.Buttons and the context-menu/toolbar/window-header/content-control
// button classes) - split out of index.d.ts since it's a self-contained group referencing only
// config types (EditorType/IconConfig), not the plugin runtime itself.

import type { EditorType, IconConfig } from "../config/plugin-config";
// The payload the editor passes to both context-menu hooks below; declared with the plugin-window
// events because that is where `onContextMenuShow` itself lives.
import type { ContextMenuShowEvent } from "./events";

type CustomMenuClickCallback = (data?: string) => void;

type ToolbarButtonType = "button" | "big-button";

interface ButtonMenuItem {
    id: string;
    text: string;
    hint?: string;
    items?: ButtonMenuItem[];
    onclick?: CustomMenuClickCallback;
}

interface ButtonBase {
    id: string;
    editors: EditorType[];
    icons: IconConfig | string[] | string | null;
    text: string;
    hint: string | null;
    data: string;
    separator: boolean;
    lockInViewMode: boolean;
    enableToggle: boolean;
    disabled: boolean;
    removed: boolean;
    parent: ButtonBase | null;
    childs: ButtonBase[] | null;
    menu?: ButtonMenuItem[];
    split?: boolean;
    pressed?: boolean;
    attachOnClick: (callback: CustomMenuClickCallback) => void;
    copy?: () => ButtonBase;
}

/**
 * One entry of the menu as the `Asc.Buttons` helper layer builds it - the object `toItem()` returns
 * and the two hooks below are handed. Only `id` and `text` are always present; every other field is
 * written only when the matching property is set on the button.
 *
 * Not the same shape as the generated `ContextMenuItem`, which is what `executeMethod`'s
 * `AddContextMenuItem` accepts: this one carries the helper's own `hint`, `separator`,
 * `lockInViewMode`, `enableToggle` and `pressed`, and has no `icons`.
 */
interface ContextMenuShowItem {
    id: string;
    text: string;
    hint?: string;
    separator?: boolean;
    data?: unknown;
    lockInViewMode?: boolean;
    enableToggle?: boolean;
    disabled?: boolean;
    pressed?: boolean;
    items?: ContextMenuShowItem[];
}

interface ButtonContextMenu extends ButtonBase {
    showOnOptionsType: string[];
    addCheckers: (...keys: string[]) => void;
    /**
     * Called first, every time the menu is about to be shown. Return `true` to drop this button
     * from this particular menu - the editor then skips it and all of its children, before the
     * `showOnOptionsType` and `EditorsSupport` tests run at all.
     *
     * Override to decide per invocation, from `options` or from where the button would be placed.
     * The default implementation returns `false`, so nothing is dropped.
     */
    onContextMenuShowAnalyze?: (options: ContextMenuShowEvent, parent: ContextMenuShowItem) => boolean;
    /**
     * Called once the item has been built and before it is pushed into the parent's `items`, so a
     * mutation here lands in the menu the editor renders. Children are processed afterwards.
     *
     * Use it to adjust text, `disabled` or `pressed` per invocation; returning anything is
     * pointless, as `onContextMenuShow` ignores the result.
     */
    onContextMenuShowExtendItem?: (options: ContextMenuShowEvent, item: ContextMenuShowItem) => void;
}

interface ButtonToolbar extends ButtonBase {
    type: ToolbarButtonType;
    tab: string;
}

interface ButtonContentControl extends ButtonBase {
    checker?: (contentControlId: string) => boolean | Promise<boolean>;
    addChecker: (checker: (contentControlId: string) => boolean | Promise<boolean>) => void;
}

interface ButtonWindowHeader extends ButtonBase {
    align: "left" | "center" | "right" | string;
    isLabel: boolean;
    isTitle: boolean;
}

interface Buttons {
    registerContextMenu: () => void;
    registerToolbarMenu: () => void;
    updateToolbarMenu: (id: string, text: string, buttons: ButtonToolbar[]) => void;
    registerWindowHeader: (id: string, buttons: ButtonWindowHeader[], frame?: WindowHeaderFrameOptions) => void;
    updateWindowHeader: (id: string, buttons: ButtonWindowHeader[], add?: boolean, frame?: WindowHeaderFrameOptions) => void;
    registerContentControl: () => void;
}

interface WindowHeaderFrameOptions {
    align?: "left" | "center" | "right" | string;
    isLabel?: boolean;
    isTitle?: boolean;
}

export type {
    CustomMenuClickCallback,
    ToolbarButtonType,
    ButtonMenuItem,
    ButtonBase,
    ButtonContextMenu,
    ContextMenuShowItem,
    ButtonToolbar,
    ButtonContentControl,
    ButtonWindowHeader,
    Buttons,
    WindowHeaderFrameOptions,
};
