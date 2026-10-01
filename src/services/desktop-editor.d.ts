// Native C++ object injected by ONLYOFFICE Desktop Editor into the browser window.
//
// Unreachable inside a `callCommand` body, and the interface below says so. The mechanism: the
// editor evaluates that body against a scope it builds itself (`_safePluginEval` in sdkjs's
// common/macros.js), binding this name to an empty object alongside sandboxed
// `setTimeout`/`setInterval`/`XMLHttpRequest`. The declaration stays global anyway - the plugin
// frame is where it is meant to be used, and a global cannot be scoped away inside one body.

type DesktopDialogType = 'plugin' | 'images' | 'cell' | 'word' | 'slide';

/**
 * The ONLYOFFICE Desktop Editor bridge, present only when the plugin runs in the desktop app -
 * hence `AscDesktopEditor | undefined` on the global.
 *
 * Not reachable inside `Asc.plugin.callCommand`: that body runs in the editor's own scope, where the
 * editor rebinds this name to an empty object. Read what you need in the plugin frame and pass it in
 * through `Asc.scope`.
 */
interface AscDesktopEditor {
    // Plugin management
    GetInstallPlugins(): string;
    GetBackupPlugins(): string;
    PluginInstall(path: string): boolean;

    // File dialogs
    OpenFilenameDialog(type: DesktopDialogType, multiple: boolean, callback: (file: string | string[]) => void): void;

    // Local file operations
    LocalStartOpen(): void;
    LocalFileSave(params: string, password: string, docinfo?: unknown, fileType?: number, jsonOptions?: string, passwordOld?: string): void;
    LocalFileSaveChanges(changes: string, deleteIndex: number, count: number): void;
    LocalFileGetSaved(): boolean;
    LocalFileGetSourcePath(): string;
    LocalFileGetRelativePath(path: string): string;
    LocalFileGetOpenChangesCount(): number;
    LocalFileGetImageUrl(path: string): string;
    LocalFileGetImageUrlCorrect(path: string): string;
    IsLocalFileExist(path: string): boolean;
    GetOpenedFile(path: string): ArrayBuffer | null;
    AddChanges(type: number, base64: string): void;

    // Document state
    SetDocumentName(name: string): void;
    onDocumentModifiedChanged(isModified: boolean): void;
    SetLocalRestrictions(value: number): void;
    SetAdvancedOptions(xml: string): void;
    NativeViewerOpen(password: string): void;
    CheckUserId(): string;

    // Encryption
    buildCryptedEnd(success: boolean): void;

    // External conversions
    startExternalConvertation(type: string, params: string): void;
}

export type { DesktopDialogType, AscDesktopEditor };
