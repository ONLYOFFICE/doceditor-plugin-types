# Changelog

Versions mirror the ONLYOFFICE editor release this package's types were generated from - see
[Versioning](README.md#versioning).

## 10.0.3

Generated from sdkjs `v10.0.3.66`. 334 members added, 234 retyped, 12 removed.

Breaking for callers that passed it: `Cell.Api.InsertPivotExistingWorksheet` no longer takes
`confirmation`. The editor now always replaces the data under the pivot table when the call comes
from the API, so the argument is gone rather than ignored.

Removed, because the editor narrowed them rather than this package dropping them: `SetTextFill`/
`GetTextFill` now apply to Document and PDF only (gone from Spreadsheet and Presentation), and
`Api.CreateShd` with the `ApiShd` methods is gone from Spreadsheet.

Runnable examples now also come from office-js-api where the documentation site has no page for a
member yet, which is most of what this release added: 965 members gained a first example.

92 empty interfaces are gone - classes every one of whose members `@typeofeditors` assigns to other
editors, such as `Cell.ApiPresentation` or `Forms.ApiChartSeries`. They declared nothing and, being
empty, accepted any value assigned to them; 91 had been dead since the first release, and
`Cell.ApiShd` joined them in 10.0.3.

Also new in this release:

- `StoreConfig.platforms` (the new `PluginPlatform` type) - where a plugin works.
- `StoreConfig.keywords` (the new `PluginKeyword` and `PluginKeywords` types) - marketplace search
  words, for every language or per language.
- `VariationConfig.disableReasons`, `ButtonBase.ignoreDisabledToolbar`, the
  `onChangeToolbarDisableReasons` event and the `GetToolbarDisableReasons` method (the new
  `ToolbarDisableReason` type) - plugin button state while the editor toolbar is disabled.
- `attachEditorEvent` types the events shared by all editors, as `attachEvent` does.

Fixed:

- `onExternalMouseUp` and `onEnableMouseEvent` are no longer typed as `attachEvent` events or
  `event_on*` slots. The editor delivers them only to `Asc.plugin.onExternalMouseUp` and
  `Asc.plugin.onEnableMouseEvent`, so a handler attached the other way compiled and never ran.
  `onEnableMouseEvent` is now declared as a handler property, and both handlers are optional.
- `CloseWindow` takes the window id as a string - the `PluginWindow.id` GUID - not a number.
- `RemovePlugin`'s `backup` is an optional boolean. sdkjs documents it as a string, but the desktop
  editors read it only as a boolean, so a string meant "no backup".
- `PluginWindow.attachEvent` lets the caller name the payload type, `attachEvent<T>(name, (data: T)
  => void)`. A handler with a typed parameter used to be rejected; unnamed, the payload is `unknown`.

## 10.0.0

First published release. Generated from sdkjs `v10.0.0.159`.
