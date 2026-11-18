# Changelog

Versions mirror the ONLYOFFICE editor release this package's types were generated from - see
[Versioning](README.md#versioning).

## 10.0.3

Generated from sdkjs `v10.0.3.58`. 324 members added, 217 retyped, 12 removed.

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

## 10.0.0

First published release. Generated from sdkjs `v10.0.0.159`.
