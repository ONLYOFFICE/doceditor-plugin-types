# Changelog

Versions mirror the ONLYOFFICE editor release this package's types were generated from - see
[Versioning](README.md#versioning).

## Unreleased

- `StoreConfig.platforms` (the new `PluginPlatform` type) - where a plugin works.
- `VariationConfig.disableReasons`, `ButtonBase.ignoreDisabledToolbar`, the
  `onChangeToolbarDisableReasons` event and the `GetToolbarDisableReasons` method (the new
  `ToolbarDisableReason` type) - plugin button state while the editor toolbar is disabled.
- `attachEditorEvent` types the events shared by all editors, as `attachEvent` does.

## 10.0.0

First published release. Generated from sdkjs `v10.0.0.159`.
