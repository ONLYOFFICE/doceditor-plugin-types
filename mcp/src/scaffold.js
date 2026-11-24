// The files of a new, minimal, working plugin: config.json that passes schemas/config.schema.json,
// index.html, scripts/code.js, placeholder icons, and the setup that type-checks the scripts against
// @onlyoffice/doceditor-plugin-types in the author's own editor. Only builds them - writing is the
// caller's.

import { randomUUID } from 'node:crypto';
import { ICON_SCALES, placeholderIcons } from './icons.js';
import { compareVersions } from './catalog.js';
import { readApi } from './data.js';

const TYPES_PACKAGE = '@onlyoffice/doceditor-plugin-types';

export const PLUGIN_KINDS = Object.freeze(['panel', 'panelRight', 'window', 'background']);

const PLUGINS_SDK = 'https://onlyoffice.github.io/sdkjs-plugins/v1';

// `type` is read by editors since 8.1; older ones only know the isVisual/isInsideMode/isModal
// flags. The flags go into every config so a panel or window works on any version, and `type` only
// where no flag combination can say it - which is what raises the floor for those two kinds.
const KIND_CONFIG = {
  panel: { flags: { isVisual: true, isModal: false, isInsideMode: true } },
  window: { flags: { isVisual: true, isModal: true, isInsideMode: false } },
  panelRight: { flags: { type: 'panelRight', isVisual: true, isModal: false, isInsideMode: true }, minVersion: '8.1.0' },
  background: { flags: { type: 'background', isVisual: false, isModal: false, isInsideMode: false }, minVersion: '8.1.0' },
};

/**
 * @typedef {object} PluginOptions
 * @property {string} name
 * @property {string} description
 * @property {Array<'word' | 'cell' | 'slide' | 'pdf'>} editors
 * @property {'panel' | 'panelRight' | 'window' | 'background'} kind
 * @property {string} [offered]     author shown in the marketplace
 * @property {string} [minVersion]  lowest editor version; raised when the kind needs more
 */

/**
 * @param {PluginOptions} options
 * @returns {{ files: Map<string, string | Buffer>, minVersion: string, notes: string[] }}
 */
export function buildPlugin(options) {
  const kind = KIND_CONFIG[options.kind];
  const notes = [];
  let minVersion = options.minVersion ?? kind.minVersion ?? '7.0.0';
  if (kind.minVersion && compareVersions(minVersion, kind.minVersion) < 0) {
    notes.push(`minVersion raised from ${minVersion} to ${kind.minVersion}: "${options.kind}" plugins need it.`);
    minVersion = kind.minVersion;
  }

  const files = new Map();
  files.set('config.json', `${JSON.stringify(config(options, kind.flags, minVersion), null, 2)}\n`);
  files.set('index.html', html(options));
  files.set('scripts/code.js', code(options));
  for (const [path, data] of typeSetup(options)) files.set(path, data);
  for (const [path, data] of placeholderIcons()) files.set(path, data);
  return { files, minVersion, notes };
}

/**
 * Autocompletion and checking for the plugin's scripts in VS Code, Cursor and any editor that reads
 * jsconfig.json, after one `npm install`. The editor never sees these files: package.json and
 * node_modules are the author's tooling, not part of the plugin.
 *
 * The globals are declared over the editors in EditorsSupport, as the types package's README
 * recommends for a plugin serving several of them: `Api` inside callCommand is then the union of
 * those editors' entry points, and a method only one editor has needs a cast there.
 * @param {PluginOptions} options
 * @returns {Map<string, string>}
 */
function typeSetup({ name, editors }) {
  // The release line this server's data was built from. Types follow the editor's version, so the
  // same major is the one that matches the API this plugin was scaffolded against.
  const { version = '10.0.0' } = readApi('index.json');
  const range = `^${version.split('.')[0]}.0.0`;
  const editorList = editors.map((editor) => `"${editor}"`).join(' | ');

  const files = new Map();
  files.set(
    'package.json',
    `${JSON.stringify(
      {
        name: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'onlyoffice-plugin',
        private: true,
        description: 'Development setup only: the plugin itself needs none of this.',
        scripts: { typecheck: 'tsc -p jsconfig.json' },
        devDependencies: { [TYPES_PACKAGE]: range, typescript: '^5.9.3' },
      },
      null,
      2,
    )}\n`,
  );
  files.set(
    'jsconfig.json',
    `${JSON.stringify(
      {
        // module/moduleResolution are not optional: a jsconfig.json defaults to "classic"
        // resolution, which cannot find a scoped npm package, and with skipLibCheck (also a
        // jsconfig default) the failed import in types/globals.d.ts is silent - Api becomes `any`
        // and nothing is checked.
        compilerOptions: {
          checkJs: true,
          noEmit: true,
          target: 'ES2020',
          module: 'ESNext',
          moduleResolution: 'bundler',
          lib: ['ES2020', 'DOM'],
          types: [TYPES_PACKAGE],
        },
        include: ['scripts/**/*.js', 'types/**/*.d.ts'],
      },
      null,
      2,
    )}\n`,
  );
  files.set(
    'types/globals.d.ts',
    `// The editor globals for the editors in config.json's EditorsSupport. Keep the list in step with it.
import type { Api as ApiOf, Editor as EditorOf } from "${TYPES_PACKAGE}";

declare global {
    var Api: ApiOf<${editorList}>;
    var Editor: EditorOf<${editorList}>;
}

export {};
`,
  );
  files.set('.gitignore', 'node_modules/\n');
  return files;
}

function config({ name, description, editors, kind, offered }, flags, minVersion) {
  const icon = (style, suffix) => `resources/${style}/icon${suffix}.png`;
  const iconSet = (style) => {
    const set = { style };
    for (const { scale, suffix } of ICON_SCALES) set[scale] = { normal: icon(style, suffix) };
    return set;
  };
  const variation = {
    description,
    url: 'index.html',
    icons: [icon('light', ''), icon('light', '@2x')],
    icons2: [iconSet('light'), iconSet('dark')],
    isViewer: false,
    EditorsSupport: editors,
    ...flags,
    initDataType: 'none',
    initData: '',
  };
  if (kind === 'window') {
    variation.buttons = [
      { text: 'OK', primary: true },
      { text: 'Cancel', primary: false },
    ];
    variation.size = [400, 160];
  }
  if (kind === 'panel' || kind === 'panelRight') variation.buttons = [];
  variation.store = {
    background: { light: '#F5F5F5', dark: '#444444' },
    icons: { light: 'resources/store/icons', dark: 'resources/store/icons' },
    screenshots: [],
  };

  return {
    name,
    guid: `asc.{${randomUUID().toUpperCase()}}`,
    version: '1.0.0',
    minVersion,
    offered: offered ?? 'Your name or company',
    variations: [variation],
  };
}

function html({ name, kind }) {
  const body =
    kind === 'background'
      ? ''
      : `
  <div class="content">
    <label for="text">Text to insert</label>
    <textarea id="text" class="form-control">Hello from ${escapeHtml(name)}</textarea>${
      kind === 'window' ? '' : '\n    <button id="insert" class="btn-text-default">Insert</button>'
    }
  </div>
`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(name)}</title>
  <script type="text/javascript" src="${PLUGINS_SDK}/plugins.js"></script>
  <script type="text/javascript" src="${PLUGINS_SDK}/plugins-ui.js"></script>
  <link rel="stylesheet" href="${PLUGINS_SDK}/plugins.css">
  <style>
    .content { display: flex; flex-direction: column; gap: 8px; padding: 12px; }
    textarea { min-height: 60px; resize: vertical; }
  </style>
  <script type="text/javascript" src="scripts/code.js"></script>
</head>
<body>${body}</body>
</html>
`;
}

function code({ kind }) {
  // PasteText works in every editor, so a multi-editor scaffold needs no per-editor branch. For
  // the object model (Api.* inside callCommand), see get_sample "insert-text".
  const insert = `  /**
   * @param {string} text
   * @param {() => void} [onDone]
   */
  function insertText(text, onDone) {
    window.Asc.plugin.executeMethod('PasteText', [text], onDone);
  }
`;
  if (kind === 'background') {
    return `// Background plugin: no window. It starts with the editor (once enabled in the plugin manager)
// and reacts to events. Subscribe to editor events with attachEditorEvent, e.g. in Word:
//   window.Asc.plugin.attachEditorEvent('onAddComment', function (comment) { ... });
(function (window) {
  window.Asc.plugin.init = function () {
    console.log('Plugin started in', window.Asc.plugin.info.editorType);
  };

  window.Asc.plugin.button = function () {};
})(window);
`;
  }
  if (kind === 'window') {
    return `(function (window) {
${insert}
  window.Asc.plugin.init = function () {};

  // Buttons from config.json, by position: 0 is OK, 1 is Cancel; the window's own close is -1.
  window.Asc.plugin.button = function (id) {
    const close = function () {
      window.Asc.plugin.executeCommand('close', '');
    };
    if (id !== 0) {
      close();
      return;
    }
    const text = /** @type {HTMLTextAreaElement} */ (document.getElementById('text')).value;
    insertText(text, close);
  };
})(window);
`;
  }
  return `(function (window) {
${insert}
  window.Asc.plugin.init = function () {
    const button = /** @type {HTMLButtonElement} */ (document.getElementById('insert'));
    const field = /** @type {HTMLTextAreaElement} */ (document.getElementById('text'));
    button.onclick = function () {
      insertText(field.value);
    };
  };

  // A panel has no buttons of its own; the editor calls this when the panel is closed.
  window.Asc.plugin.button = function () {
    window.Asc.plugin.executeCommand('close', '');
  };
})(window);
`;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}
