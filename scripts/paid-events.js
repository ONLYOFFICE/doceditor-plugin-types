// Which editor events only a commercial build ever fires.
//
// `word/plugin-events.js` in the open sdkjs documents `onClickAnnotation`, `onParagraphText` and
// friends, so they look free in autocomplete - but every dispatch site lives in sdkjs-ext's
// annotation engine. On a Community build `GetCustomTextAnnotator()` returns null, there is no
// event manager, attaching a handler succeeds and it is simply never called. Nothing fails at
// compile time and nothing fails loudly at runtime either, which is the worst shape a gap can
// have, so the declarations carry `@requires` and say it.
//
// Derived, never listed by hand: an event is commercial-only when sdkjs-ext dispatches it and the
// open sdkjs does not. Both `generate-types.js` (which marks the generated per-editor
// `EditorEventArgs`) and `check-plugin-events.js` (which audits the hand-written `PluginEventMap`
// and re-checks the generated side) read it from here, so the two surfaces cannot disagree about
// which events are paid - they did until this was shared, and only the hand-written half was
// marked.

const fs = require('fs');
const path = require('path');

// Every event name dispatched from JavaScript under `root`.
//
// `plugin-events.js` / `base-plugin-events.js` are skipped when asked: they are pure JSDoc
// declaration files, so a name appearing there says the event is documented, not that this
// checkout fires it - which is the whole distinction being drawn.
function dispatchedEvents(root, { skipPluginEventsFiles = false } = {}) {
  const names = new Set();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'deploy' || entry.name === 'node_modules' || entry.name === '.git') continue;
        walk(full);
      } else if (entry.name.endsWith('.js')) {
        if (skipPluginEventsFiles && /plugin-events\.js$|base-plugin-events\.js$/.test(entry.name)) continue;
        const text = fs.readFileSync(full, 'utf8');
        for (const m of text.matchAll(/onPluginEvent2?\s*\(\s*"([A-Za-z0-9_]+)"/g)) names.add(m[1]);
      }
    }
  };
  walk(root);
  return names;
}

// `{ paidOnly: Set<string>, free: Set<string> }`, or null when there is no sdkjs-ext checkout to
// compare against. Callers treat null as "cannot tell" and skip rather than assuming everything is
// free: without the extension sources, absence of a dispatch site proves nothing.
function paidEventSets(sdkjsRoot, sdkjsExtRoot) {
  if (!sdkjsRoot || !sdkjsExtRoot) return null;
  const free = dispatchedEvents(sdkjsRoot, { skipPluginEventsFiles: true });
  const ext = dispatchedEvents(sdkjsExtRoot, { skipPluginEventsFiles: true });
  return { free, paidOnly: new Set([...ext].filter((name) => !free.has(name))) };
}

module.exports = { dispatchedEvents, paidEventSets };
