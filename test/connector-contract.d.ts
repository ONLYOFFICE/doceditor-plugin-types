// The names a caller needs to type the Automation API's `Connector` precisely.
//
// `Connector` (`docEditor.createConnector()`) belongs to DocsAPI, not to this package, and is typed
// in @onlyoffice/doceditor-types. But it is not a separate API: its `executeMethod`, `callCommand`
// and `attachEvent` take exactly the same names, arguments and payloads a plugin uses, so anyone
// wanting real autocomplete on a connector call reaches for the types below.
//
// That happens in the *consumer's* project, not through a dependency between the two packages.
// `doceditor-types` declares `Connector` generically -
// `executeMethod<N extends string = string, A extends unknown[] = unknown[], R = unknown>` - and a
// project that wants precision supplies the parameters itself:
//
//   function exec<N extends WordMethodName>(name: N, args: WordMethodArgs[N]) {
//     connector.executeMethod(name, args);
//   }
//
// A hard dependency was considered and rejected: `doceditor-types` has none at all today, and the two
// packages do not move together - it is on 9.4.2 while this is on 10.0.0 - so pinning them to a shared
// editor version would have broken on the first release. Copying the surface across instead is worse
// still: two hand-maintained copies of `WordMethodArgs` drift the moment sdkjs adds a method.
//
// So the contract is one-directional and this file guards it: every name below must stay exported
// from the root barrel, or `npm test` fails.
//
// Type-only, and `test/` is not in package.json's `files`, so nothing here ships.

import type {
    // executeMethod, per editor.
    WordMethodName, WordMethodArgs, WordMethodReturn,
    CellMethodName, CellMethodArgs, CellMethodReturn,
    SlideMethodName, SlideMethodArgs, SlideMethodReturn,
    PdfMethodName, PdfMethodArgs, PdfMethodReturn,
    FormsMethodName, FormsMethodArgs, FormsMethodReturn,
    // attachEvent/detachEvent.
    PluginEventMap, PluginEventName, PluginEventHandler,
    // callCommand's serializability constraint - the connector runs the same isolated context, so
    // the same restriction on what a command may return applies.
    CommandSerializable,
    // addToolbarMenuItem/addContextMenuItem/updateContextMenuItem.
    ContextMenuItem, ToolbarMenuMainItem, ToolbarMenuTab, ToolbarMenuItem, ToolbarMenuItemType,
    EditorType,
} from "../index";

// Referencing each name is what makes the import a real dependency: an unused type import is
// erased, so the check would pass even after an export disappeared.
type _ExecuteMethod = [
    WordMethodName, WordMethodArgs, WordMethodReturn<"GetVersion">,
    CellMethodName, CellMethodArgs, CellMethodReturn<"GetVersion">,
    SlideMethodName, SlideMethodArgs, SlideMethodReturn<"GetVersion">,
    PdfMethodName, PdfMethodArgs, PdfMethodReturn<"GetVersion">,
    FormsMethodName, FormsMethodArgs, FormsMethodReturn<"GetVersion">,
];

type _Events = [PluginEventMap, PluginEventName, PluginEventHandler<"onClick">];

type _Commands = CommandSerializable<{ pages: number }>;

type _Menus = [ContextMenuItem, ToolbarMenuMainItem, ToolbarMenuTab, ToolbarMenuItem, ToolbarMenuItemType];

type _Editors = EditorType;

export type { _ExecuteMethod, _Events, _Commands, _Menus, _Editors };
