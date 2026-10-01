// config.json shape - ButtonConfig/VariationConfig/PluginConfig and their supporting types.
// PluginInfo is not here even though it also describes config-shaped data: it's a runtime-plugin
// concept (window.Asc.plugin.info), not a static config.json shape, so it lives in ./src/plugin/plugin.d.ts.

interface ButtonConfig {
    isViewer?: boolean;
    primary?: boolean;
    text: string;
    textLocale?: Record<string, string>;
}

type EditorType = 'word' | 'cell' | 'slide' | 'pdf';

type IconScale = '100%' | '125%' | '150%' | '175%' | '200%';

type IconScaleEntry = {
    active?: string;
    hover?: string;
    normal: string;
};

type IconConfig = {
    [K in IconScale]?: IconScaleEntry;
} & {
    /** Light/dark icon set variant - real-world config.json files pair this with `theme`. */
    style?: 'light' | 'dark';
    /** Icon theme name, e.g. `"flat"`/`"flatDark"` - not a fixed enum in practice. */
    theme?: string;
    /** Fallback used for any scale not otherwise listed. */
    default?: IconScaleEntry;
};

type InitDataType = 'text' | 'html' | 'ole' | 'desktop' | 'desktop-external' | 'none' | 'sign';

type MenuType = 'left' | 'right';

interface PluginConfig {
    $schema?: string;
    baseUrl?: string;
    /**
     * Places the plugin in its own group in the **Plugins** tab, separated from the rest. Omitted,
     * the plugin joins the last group. Read as `item.group.name` / `item.group.rank`.
     */
    group?: {
        name: string;
        /** Position of the group in the tab, an integer from 1. */
        rank: number;
    };
    guid: string;
    /** A help/support link for the plugin. */
    help?: string;
    /** On desktop editors, serves the plugin through the `onlyoffice://` custom scheme instead of `file://`, so it gets a real origin with working CORS and a secure context. */
    onlyofficeScheme?: boolean;
    minVersion?: string;
    name: string;
    nameLocale?: Record<string, string>;
    /** The plugin author who proposed the plugin for publication. */
    offered?: string;
    variations: VariationConfig[];
    /**
     * The plugin's own version, e.g. `"1.0"`. Optional per the reference, and genuinely omitted by
     * shipped plugins - `guid`, `name` and `variations` are the only required top-level fields.
     */
    version?: string;
}

interface InstalledPluginInfo {
    baseUrl: string;
    canRemoved: boolean;
    guid: string;
    obj: PluginConfig;
    removed?: boolean;
}

interface StoreConfig {
    background?: {
        dark: string;
        light: string;
    };
    categories?: string[];
    icons?: {
        dark: string;
        light: string;
    };
    screenshots?: string[];
}

interface VariationConfig {
    /** Defaults to no buttons (an empty toolbar) when omitted - routinely omitted in practice. */
    buttons?: ButtonConfig[];
    cryptoDisabledForExternalCloud?: string;
    cryptoDisabledForInternalCloud?: string;
    cryptoDisabledOnStart?: string;
    cryptoMode?: string;
    description: string;
    descriptionLocale?: Record<string, string>;
    EditorsSupport: EditorType[];
    events?: string[];
    fixedSize?: boolean;
    /** Some plugins use the same rich per-scale shape here as `icons2` instead of a plain path/map. */
    icons?: Record<string, string> | string[] | string | IconConfig[];
    icons2?: IconConfig[];
    initData?: string;
    initDataType?: InitDataType;
    initOnSelectionChanged?: boolean;
    isCanDocked?: boolean;
    isCustomWindow?: boolean;
    isDisplayedInViewer?: boolean;
    isInsideMode?: boolean;
    isModal?: boolean;
    /** Whether the variation's content needs sequential numbering (used by some panel plugins). */
    /**
     * Whether the created panel starts expanded (`true`, the default) or collapsed (`false`).
     *
     * Panel variations only - `type` of `"panel"` or `"panelRight"`. The side-menu button and the
     * panel are created either way; `false` only skips expanding it on render, leaving the user to
     * open it from the button. Read as `isActivated !== false`, so omitting it and setting it to
     * `true` are the same - only `false` does anything.
     * @since 8.3.0
     */
    isActivated?: boolean;
    isSystem?: boolean;
    isTargeted?: boolean;
    isUpdateOleOnResize?: boolean;
    isViewer?: boolean;
    /** Omitted in practice about as often as it's set explicitly. */
    isVisual?: boolean;
    menu?: MenuType;
    /** executeMethod names this variation calls - purely descriptive/documentation, not enforced. */
    methods?: string[];
    name?: string;
    nameLocale?: Record<string, string>;
    /** Store listing screenshots for this specific variation (see also StoreConfig.screenshots). */
    screens?: string[];
    size?: number[];
    store?: StoreConfig;
    type?: VariationType;
    url: string;
}

type VariationType = 'window' | 'panel' | 'panelRight' | 'background' | 'system';

export type {
    ButtonConfig,
    EditorType,
    IconScale,
    IconScaleEntry,
    IconConfig,
    InitDataType,
    MenuType,
    PluginConfig,
    InstalledPluginInfo,
    StoreConfig,
    VariationConfig,
    VariationType,
};
