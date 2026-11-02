# Changelog

Versions mirror the ONLYOFFICE editor release this package's types were generated from - see
[Versioning](README.md#versioning).

## Unreleased

- `StoreConfig.platforms` (the new `PluginPlatform` type) - where a plugin works.
- `VariationConfig.lockReasons`, `ButtonBase.manageButtonState` and the
  `onChangeButtonDisableState` event (the new `ToolbarLockReason` type) - plugin button state while
  the editor toolbar is blocked.
- `attachEditorEvent` types the events shared by all editors, as `attachEvent` does.

## 10.0.0

First published release. Generated from sdkjs `v10.0.0.159`.
