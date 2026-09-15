// A file with no top-level import/export is a "script" in TypeScript's sense:
// every interface/type/namespace declared in it is automatically global, and
// `declare global { ... }` is invalid there (it's only legal inside a module) - so that block gets
// unwrapped into plain top-level declarations instead.
//
// Produces one self-contained bundle per editor:
//   dist/ambient/onlyoffice-plugins-types.<editor>.ambient.d.ts
//
// Each one carries Asc/AscPlugin/events/buttons/config/theme/services, that single editor's
// namespace and executeMethod types, and - for the four editors that have one - a global `Api`.
// Nothing else has to be loaded alongside it.
//
// One bundle per editor rather than a shared base plus per-editor addons, even though that repeats
// the ~55 KB of non-editor declarations five times: the editor namespaces are the bulk of the text
// (0.4-2.4 MB each) and none of them references another, so a combined bundle made every consumer
// parse all five to use one. Whoever loads this pays for parsing, not just downloading - a Monaco
// worker binds the whole blob before it can answer the first completion.
//
// AscPlugin's executeMethod/callMethodAsync/attachEditorEvent/detachEditorEvent are written in the
// modular sources as an intersection of one call signature per editor; each bundle keeps only its
// own (see pruneEditorOverloads). Whatever that leaves dangling - `src/plugin/events.d.ts` refers to
// a few typedefs that only word-methods.ts declares, for instance - is pulled back in by name from
// the other editors' generated sources, with TypeScript itself deciding what is missing.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'dist', 'ambient');

// Flattening to global scope puts every declaration in the same namespace as the DOM lib, where a
// name we share with it stops being a separate type and becomes a declaration *merge*. That is fine
// when the shapes agree and fatal when they don't: sdkjs's `ImageData` typedef (a base64 image with
// `src`/`width`/`height`) merges with the DOM's canvas `ImageData`, whose `width`/`height` are
// `readonly`, and every consumer compiling with `"lib": ["DOM"]` gets TS2687. The modular package is
// unaffected - there each file is a module and the name is local to it - so the rename belongs here,
// not in the generator, where it would be a breaking change for npm consumers who import the type.
const AMBIENT_RENAMES = {
  ImageData: 'AscImageData',
};

// Names we merge with the DOM on purpose. `Window` is the whole point of `declare global` in
// index.d.ts: it adds `Asc`/`AscDesktopEditor` to the real Window, and merging is what makes that
// work.
const INTENTIONAL_DOM_MERGES = new Set(['Window']);

// Everything not tied to one editor. Repeated in all five bundles.
const SHARED_FILES = [
  'src/theme/index.d.ts',
  'src/config/plugin-config.d.ts',
  'src/plugin/events.d.ts',
  'src/plugin/buttons.d.ts',
  'src/plugin/plugin.d.ts',
  'src/services/desktop-editor.d.ts',
  'src/services/simple-request.d.ts',
];

// Editor name -> the namespace its generated sources declare, in the order bundles are written.
const EDITOR_NAMESPACES = {
  word: 'Word',
  cell: 'Cell',
  slide: 'Slide',
  pdf: 'Pdf',
  forms: 'Forms',
};

// The four editors with a global `Api`. Forms has none: its methods are reached through
// executeMethod and the `Forms` namespace, and the modular package has no src/editors/forms.d.ts to
// derive one from - inventing a global that no editor actually exposes would be worse than its
// absence.
const EDITOR_API_FILES = {
  word: 'src/editors/word.d.ts',
  cell: 'src/editors/cell.d.ts',
  slide: 'src/editors/slide.d.ts',
  pdf: 'src/editors/pdf.d.ts',
};

const editorSources = (editor) => [`src/generated/${editor}.ts`, `src/generated/${editor}-methods.ts`];

function stripModuleSyntax(source) {
  return source
    // import type { A, B } from "..."; (single- or multi-line)
    .replace(/^\s*import\s+type\s*\{[\s\S]*?\}\s*from\s*["'][^"']+["'];?\s*$/gm, '')
    // export type { A, B } from "..."; / export type { A, B };
    .replace(/^\s*export\s+type\s*\{[\s\S]*?\}\s*(?:from\s*["'][^"']+["'])?;?\s*$/gm, '')
    // export type * from "...";
    .replace(/^\s*export\s+type\s*\*\s*from\s*["'][^"']+["'];?\s*$/gm, '')
    // bare export { A, B }; re-export lists (word/cell/slide/pdf-methods.d.ts use this form
    // without the `type` keyword, at varying indentation) - never nested inside a namespace in
    // these sources, so stripping any indentation level is safe.
    .replace(/^[ \t]*export\s*\{[\s\S]*?\}\s*;?\s*$/gm, '')
    // export namespace X { ... } -> declare namespace X { ... } (needed once the file has no
    // other import/export left, or `export` here would have nothing to attach to as a module)
    .replace(/^export\s+namespace\s+/gm, 'declare namespace ')
    // Any other top-level `export interface/type/enum/class/const/...` is a real declaration
    // (not a re-export list) - drop just the `export` keyword. A single leftover top-level
    // `export` anywhere would make TypeScript treat the whole bundle as a module again, silently
    // scoping every other bare `interface`/`type` in it to that module instead of the global
    // scope - so this must catch every declaration keyword, not just the ones seen so far.
    .replace(/^export\s+(?=(?:interface|type|enum|class|abstract\s+class|function|const|let|var)\b)/gm, '')
    .trim();
}

// The generated `src/generated/*-methods.ts` files each declare their own local copy of every
// shared typedef they reference (Color, EventType, SelectionType, unresolved-ref stubs like
// `localeTranslate`, ...) rather than importing a common module - deliberate, since as real ES
// modules those names are file-scoped and importing/exporting them between the 5 files would
// reintroduce the TS2308 ambiguous-export collisions `generate-plugin-methods.js` was built to
// avoid. Flattening those files into one global-scope bundle turns the same file-scoped
// identically-named identifiers into duplicate GLOBAL ones, which TypeScript rejects - so the
// bundle keeps only the first copy of each, and only after verifying every later copy is textually
// identical (a name collision between two genuinely different shapes must fail loudly, not be
// silently papered over).
function popTrailingJsDocComment(output) {
  let end = output.length;
  while (end > 0 && output[end - 1].trim() === '') end -= 1;
  if (end === 0 || !/^\s*\*\/\s*$/.test(output[end - 1])) return null;
  let start = end - 1;
  while (start >= 0 && !/^\s*\/\*\*/.test(output[start])) start -= 1;
  if (start < 0) return null;
  const comment = output.slice(start, end);
  output.length = start;
  return comment;
}

// Splits the lines strictly between an interface's `{` and closing `}` into per-member chunks
// (each chunk is a member's own leading `/** ... */` comment, if any, plus its `name[?]: type;`
// line) by tracking brace depth so a member whose type is itself an inline `{ ... }` object still
// ends up as one chunk instead of being cut mid-type.
function splitInterfaceMembers(bodyLines) {
  const members = [];
  let depth = 0;
  let current = [];
  for (const line of bodyLines) {
    current.push(line);
    for (const ch of line) {
      if (ch === '{') depth += 1;
      else if (ch === '}') depth -= 1;
    }
    if (depth === 0 && /;\s*$/.test(line)) {
      members.push(current);
      current = [];
    }
  }
  if (current.some((l) => l.trim() !== '')) members.push(current);
  return members;
}

function memberNameAndSignature(memberLines) {
  for (const line of memberLines) {
    const m = line.match(/^\s*(?:\[?['"]?([A-Za-z_$][A-Za-z0-9_$-]*)['"]?\]?)(\??)\s*:\s*(.*)$/);
    if (m) return { name: m[1], optional: m[2] === '?', typeAndRest: m[3] };
  }
  return null;
}

// Two same-named `interface` bodies from different editors' generated files can legitimately
// differ - sdkjs's own JSDoc for a nominally "shared" typedef (CommentData, ...) isn't always
// identical across editors (e.g. word's CommentData documents `UserId`, other editors' don't).
// Flattened into one ambient global, the more permissive shape (member present in every body,
// with the same type, wins as-is; a member missing from or optional in ANY body is kept but forced
// optional in the merge) is the only one that stays assignable from every editor's real result
// object. Returns null (caller falls back to a hard error) if either body isn't a plain interface
// or a member's underlying type genuinely disagrees across bodies - that's a real conflict, not a
// benign optionality difference, and must not be silently guessed at.
function mergeInterfaceBodies(nameForErrors, blockA, blockB) {
  const linesA = blockA.split('\n');
  const linesB = blockB.split('\n');
  const openA = linesA[0].match(/\{\s*$/);
  const openB = linesB[0].match(/\{\s*$/);
  if (!openA || !openB || linesA[linesA.length - 1].trim() !== '}' || linesB[linesB.length - 1].trim() !== '}') {
    return null;
  }
  const membersA = splitInterfaceMembers(linesA.slice(1, -1));
  const membersB = splitInterfaceMembers(linesB.slice(1, -1));
  const sigB = new Map(membersB.map((m) => [memberNameAndSignature(m)?.name, m]));
  const seenNamesB = new Set();

  const mergedMembers = membersA.map((memberLines) => {
    const sigA = memberNameAndSignature(memberLines);
    if (!sigA) return memberLines;
    const other = sigB.get(sigA.name);
    if (!other) return forceOptional(memberLines, sigA);
    seenNamesB.add(sigA.name);
    const sigOther = memberNameAndSignature(other);
    if (sigOther.typeAndRest !== sigA.typeAndRest) return null; // real type conflict
    return sigA.optional || sigOther.optional ? forceOptional(memberLines, sigA) : memberLines;
  });
  if (mergedMembers.includes(null)) return null;

  const extraFromB = membersB.filter((m) => {
    const sig = memberNameAndSignature(m);
    return sig && !seenNamesB.has(sig.name);
  }).map((m) => forceOptional(m, memberNameAndSignature(m)));

  const body = [...mergedMembers, ...extraFromB].flat();
  return [linesA[0], ...body, '}'].join('\n');
}

function forceOptional(memberLines, sig) {
  if (sig.optional) return memberLines;
  const idx = memberLines.findIndex((l) => memberNameAndSignature([l])?.name === sig.name);
  if (idx === -1) return memberLines;
  const out = memberLines.slice();
  out[idx] = out[idx].replace(/^(\s*(?:\[?['"]?[A-Za-z_$][A-Za-z0-9_$-]*['"]?\]?))(\s*:)/, '$1?$2');
  return out;
}

// Walks a flattened source's top-level `interface X { ... }` / `type X = ...;` declarations,
// yielding each one's name and line range. Brace-depth tracking (rather than stopping at the first
// closing brace) keeps a declaration whose body contains nested object types in one piece.
function* eachTopLevelDeclaration(lines) {
  const declRe = /^(?:export\s+)?(?:interface|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)\b/;
  let i = 0;
  while (i < lines.length) {
    const match = lines[i].match(declRe);
    if (!match) {
      i += 1;
      continue;
    }
    let depth = 0;
    let sawBrace = false;
    let j = i;
    for (; j < lines.length; j += 1) {
      for (const ch of lines[j]) {
        if (ch === '{') { depth += 1; sawBrace = true; }
        else if (ch === '}') depth -= 1;
      }
      const closed = sawBrace ? depth === 0 : /;\s*$/.test(lines[j]);
      if (closed) { j += 1; break; }
    }
    yield { name: match[1], start: i, end: j };
    i = j;
  }
}

// Every top-level declaration of a source, keyed by name and carrying its own doc comment. This is
// the pool a per-editor bundle pulls a missing shared typedef out of.
function collectTopLevelBlocks(source) {
  const lines = source.split('\n');
  const blocks = new Map();
  for (const { name, start, end } of eachTopLevelDeclaration(lines)) {
    const preceding = lines.slice(0, start);
    const comment = popTrailingJsDocComment(preceding) || [];
    blocks.set(name, [...comment, ...lines.slice(start, end)].join('\n'));
  }
  return blocks;
}

function dedupeTopLevelDeclarations(source) {
  const lines = source.split('\n');
  const seen = new Map();
  const output = [];
  let cursor = 0;
  for (const { name, start, end } of eachTopLevelDeclaration(lines)) {
    output.push(...lines.slice(cursor, start));
    cursor = end;
    const block = lines.slice(start, end).join('\n');
    const comment = popTrailingJsDocComment(output);
    if (seen.has(name)) {
      const existing = seen.get(name);
      if (existing !== block) {
        // `type NAME = unknown;` is generate-plugin-methods.js's stub for a type ref it couldn't
        // resolve FROM THAT EDITOR'S OWN source files - not evidence the name has no real shape,
        // just that whichever file declares it wasn't in that editor's source list (`comment` is a
        // real word/forms typedef a Pdf method also references, but pdf/api_plugins.js never
        // declares it). Prefer the real declared shape another editor's parse already found.
        const stubRe = new RegExp(`^type ${name} = unknown;$`);
        if (stubRe.test(existing) && !stubRe.test(block)) {
          seen.set(name, block);
          output[output.indexOf(existing)] = block;
          continue;
        }
        if (stubRe.test(block) && !stubRe.test(existing)) continue;
        const merged = mergeInterfaceBodies(name, existing, block);
        if (merged === null) {
          throw new Error(`Ambient bundle: '${name}' is declared twice with different bodies - cannot flatten into one global scope. First:\n${existing}\n\nSecond:\n${block}`);
        }
        seen.set(name, merged);
        const idx = output.indexOf(existing);
        if (idx !== -1) output[idx] = merged;
      }
      // Otherwise an identical duplicate (and its doc-comment, just popped) - drop both.
    } else {
      seen.set(name, block);
      if (comment) output.push(...comment);
      output.push(block);
    }
  }
  output.push(...lines.slice(cursor));
  return output.join('\n');
}

function unwrapDeclareGlobal(source) {
  const match = source.match(/declare\s+global\s*\{/);
  if (!match) throw new Error('Expected a declare global {} block');
  let depth = 1;
  const start = match.index + match[0].length;
  let end = start;
  for (; end < source.length; end += 1) {
    if (source[end] === '{') depth += 1;
    if (source[end] === '}') depth -= 1;
    if (depth === 0) break;
  }
  // Everything inside the block carries the wrapper's indentation; unwrapped to the top level it
  // would read as if it were still nested, so the whole block is shifted left by its own common
  // indentation instead of just having its first line trimmed.
  const raw = source.slice(start, end).replace(/^\n+/, '').replace(/\s+$/, '');
  const indentWidths = raw.split('\n').filter((line) => line.trim()).map((line) => line.match(/^[ \t]*/)[0].length);
  const commonIndent = Math.min(...indentWidths);
  const inner = raw.split('\n').map((line) => line.slice(commonIndent)).join('\n');
  // `declare global { var X: Y; }` doesn't need `declare` on `var` (it's implied by the wrapper),
  // but once unwrapped to bare top level, `var`/`function`/`const`/`let`/`class` all need an
  // explicit `declare` - unlike `interface`/`type`/`namespace`, which are ambient either way.
  return inner.replace(/^(\s*)(var|function|const|let|class)\s/gm, '$1declare $2 ');
}

function readStripped(relPath) {
  const raw = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  return stripModuleSyntax(raw);
}

function mentionsEditor(text, namespace) {
  return new RegExp(`\\b${namespace}(?:MethodName|MethodArgs|MethodReturn)\\b|\\b${namespace}\\.`).test(text);
}

// AscPlugin types executeMethod, callMethodAsync, attachEditorEvent and detachEditorEvent as an
// intersection of call signatures - one per editor, one per line, chained with `&` and closed by a
// `;`. Keeping another editor's signature in a single-editor bundle would drag that editor's whole
// namespace in with it, so each bundle keeps only its own, plus the editor-independent signatures
// (executeMethod's CloseWindow/ShowButton/ResizeWindow). A property whose type isn't laid out as a
// recognizable chain is left exactly as it is rather than guessed at.
function pruneEditorOverloads(source, keepNamespace) {
  const others = Object.values(EDITOR_NAMESPACES).filter((ns) => ns !== keepNamespace);
  const headRe = /^(\s*)([A-Za-z_$][\w$]*\??\s*:\s*)(\(.*\))\s*&\s*$/;
  const altRe = /^\s*(\(.*\))\s*(&|;)\s*$/;
  const commentRe = /^\s*(?:\/\*\*|\*|\*\/)/;

  const lines = source.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const head = lines[i].match(headRe);
    if (!head) {
      out.push(lines[i]);
      i += 1;
      continue;
    }
    const [, indent, prefix, firstSignature] = head;
    // Each alternative is [...its own doc-comment lines, its signature line].
    const alternatives = [[firstSignature]];
    let pendingComment = [];
    let closed = false;
    let j = i + 1;
    for (; j < lines.length; j += 1) {
      const alt = lines[j].match(altRe);
      if (alt) {
        alternatives.push([...pendingComment, alt[1]]);
        pendingComment = [];
        if (alt[2] === ';') {
          closed = true;
          j += 1;
          break;
        }
        continue;
      }
      if (commentRe.test(lines[j])) {
        pendingComment.push(lines[j]);
        continue;
      }
      break;
    }
    if (!closed) {
      out.push(lines[i]);
      i += 1;
      continue;
    }

    const kept = alternatives.filter((alt) => !others.some((ns) => mentionsEditor(alt.join('\n'), ns)));
    if (kept.length === 0) {
      throw new Error(`Ambient bundle: pruning '${prefix.trim()}' for ${keepNamespace} left no call signature.`);
    }
    kept.forEach((alt, k) => {
      const signature = alt[alt.length - 1];
      out.push(...alt.slice(0, -1));
      const terminator = k === kept.length - 1 ? ';' : ' &';
      out.push(k === 0 ? `${indent}${prefix}${signature}${terminator}` : `${indent}    ${signature}${terminator}`);
    });
    i = j;
  }
  return out.join('\n');
}

function applyAmbientRenames(body) {
  let renamed = body;
  for (const [from, to] of Object.entries(AMBIENT_RENAMES)) {
    renamed = renamed.replace(new RegExp(`\\b${from}\\b`, 'g'), to);
  }
  return renamed;
}

function domGlobalNames() {
  const libDir = path.dirname(require.resolve('typescript'));
  const dom = fs.readFileSync(path.join(libDir, 'lib.dom.d.ts'), 'utf8');
  const names = new Set();
  for (const m of dom.matchAll(/^(?:interface|declare var|declare function|type)\s+([A-Za-z_$][\w$]*)/gm)) {
    names.add(m[1]);
  }
  return names;
}

// A collision is only visible once the bundle is loaded next to the DOM lib. Fails the build rather
// than renaming silently: a new collision needs a human to decide whether it is an accident
// (rename) or an augmentation (allow).
function assertNoDomCollisions(bundle) {
  const dom = domGlobalNames();
  const clashes = [];
  for (const m of bundle.matchAll(/^(?:interface|type|declare var|declare function|declare namespace)\s+([A-Za-z_$][\w$]*)/gm)) {
    const name = m[1];
    if (dom.has(name) && !INTENTIONAL_DOM_MERGES.has(name)) clashes.push(name);
  }
  if (clashes.length > 0) {
    throw new Error(`Ambient bundle declares global name(s) that collide with lib.dom: ${[...new Set(clashes)].join(', ')}. Add a rename to AMBIENT_RENAMES, or to INTENTIONAL_DOM_MERGES if merging is intended.`);
  }
}

// Without this, a pruning failure would hide instead of surfacing: if pruneEditorOverloads stopped
// recognizing a chain (plugin.d.ts reformatted, a new property added in another shape), the leftover
// signature's `CellMethodName`/`Cell.EditorEventName` would simply come back as an unresolved name
// and the pull-in step would satisfy it from another editor's sources - a bundle that still compiles
// and is still wrong, quietly carrying the editor the split was meant to leave out.
function assertNoOtherEditors(bundle, keepNamespace) {
  const found = Object.values(EDITOR_NAMESPACES)
    .filter((ns) => ns !== keepNamespace)
    .filter((ns) => mentionsEditor(bundle, ns));
  if (found.length > 0) {
    throw new Error(`Ambient bundle for ${keepNamespace} still refers to ${found.join(', ')} - pruneEditorOverloads did not recognize a call-signature chain.`);
  }
}

// Type-checks a candidate bundle the way a consumer sees it: on its own, next to lib.dom. Nothing
// else in this repo checks the flattened output, so this is also the correctness gate for the
// flattening itself - a reference left dangling by pruning surfaces here as TS2304 instead of in
// somebody's editor. lib.*.d.ts source files are parsed once and reused across the five bundles.
const libSourceFiles = new Map();

function bundleDiagnostics(bundleText) {
  const ts = require('typescript');
  // TypeScript normalizes every path it asks the host about to forward slashes, so the in-memory
  // file has to be named that way too - `path.join` on Windows produces backslashes, the host's
  // `name === checkPath` comparisons never match, and the program silently ends up with no source
  // file at all and no diagnostics to report.
  const checkPath = `${ROOT.replace(/\\/g, '/')}/__ambient-check.ts`;
  const options = {
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2020,
    lib: ['lib.es2020.d.ts', 'lib.dom.d.ts'],
    types: [],
  };
  const host = ts.createCompilerHost(options, true);
  const readFile = host.readFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const getSourceFile = host.getSourceFile.bind(host);
  host.readFile = (name) => (name === checkPath ? bundleText : readFile(name));
  host.fileExists = (name) => name === checkPath || fileExists(name);
  host.getSourceFile = (name, ...rest) => {
    if (name === checkPath) return ts.createSourceFile(checkPath, bundleText, ts.ScriptTarget.ES2020, true);
    if (!libSourceFiles.has(name)) libSourceFiles.set(name, getSourceFile(name, ...rest));
    return libSourceFiles.get(name);
  };
  const program = ts.createProgram([checkPath], options, host);
  const source = program.getSourceFile(checkPath);
  // Without this, any future mismatch between the name we hand TypeScript and the one it asks the
  // host for turns this whole gate into a no-op that reports a clean bundle.
  if (!source) throw new Error(`Ambient bundle check: TypeScript did not load ${checkPath}.`);
  return {
    ts,
    diagnostics: [...program.getSyntacticDiagnostics(source), ...program.getSemanticDiagnostics(source)],
  };
}

// TS2304 "Cannot find name", TS2503 "Cannot find namespace", TS2552 "Cannot find name ... did you
// mean". The identifier is read back out of the bundle at the diagnostic's own span rather than
// parsed out of the message, which is localized and reworded between TypeScript releases.
const UNRESOLVED_NAME_CODES = new Set([2304, 2503, 2552]);

function buildEditorBundle(editor, pool) {
  const namespace = EDITOR_NAMESPACES[editor];
  const apiFile = EDITOR_API_FILES[editor];
  const apiLine = apiFile
    ? `,\n// plus the global \`Api: ${namespace}.Api\`.`
    : `.\n// ${namespace} has no global \`Api\` - its methods are called through Asc.plugin.executeMethod.`;
  const header = `// AUTO-GENERATED - do not edit by hand. Run \`npm run generate-ambient\` to regenerate.
// Self-contained, non-module ambient bundle of @onlyoffice/plugins-types for the "${editor}" editor,
// for tools (e.g. a Monaco editor's addExtraLib()) that want one global-scope .d.ts blob instead of
// an installable, module-based npm package. Declares Asc/AscPlugin and the ${namespace} namespace${apiLine}
// Load exactly one of the five bundles: they declare the same globals with different types.
// Source of truth is still the modular package under src/ - this is a build artifact, not something
// to hand-edit.
`;

  const globalBlock = unwrapDeclareGlobal(fs.readFileSync(path.join(ROOT, 'index.d.ts'), 'utf8'));
  const apiBlock = apiFile ? unwrapDeclareGlobal(readStripped(apiFile)) : null;

  const sections = [...editorSources(editor), ...SHARED_FILES].map((relPath) => {
    const content = relPath === 'src/plugin/plugin.d.ts'
      ? pruneEditorOverloads(readStripped(relPath), namespace)
      : readStripped(relPath);
    return `// ---- ${relPath} ----\n${content}\n`;
  });

  const pulled = new Map();
  for (let round = 0; round <= 8; round += 1) {
    const preamble = pulled.size > 0
      ? ["// ---- typedefs used by the shared sources, declared in another editor's ----", ...pulled.values(), ''].join('\n')
      : '';
    const body = applyAmbientRenames(dedupeTopLevelDeclarations([preamble, ...sections].join('\n')));
    const tail = [`// ---- window.Asc / window.AscDesktopEditor / window.AscSimpleRequest ----\n${globalBlock}\n`];
    if (apiBlock) tail.push(`// ---- global Api ----\n${apiBlock}\n`);
    const bundle = [header, body, ...tail].join('\n');

    const { ts, diagnostics } = bundleDiagnostics(bundle);
    const missing = new Set(
      diagnostics
        .filter((d) => UNRESOLVED_NAME_CODES.has(d.code) && d.start !== undefined)
        .map((d) => bundle.substr(d.start, d.length)),
    );
    if (missing.size === 0) {
      if (diagnostics.length > 0) {
        const shown = diagnostics.slice(0, 5)
          .map((d) => `  TS${d.code}: ${ts.flattenDiagnosticMessageText(d.messageText, ' ')}`)
          .join('\n');
        throw new Error(`Ambient bundle for '${editor}' does not type-check (${diagnostics.length} diagnostics):\n${shown}`);
      }
      assertNoDomCollisions(bundle);
      assertNoOtherEditors(bundle, namespace);
      return { bundle, pulled: [...pulled.keys()] };
    }

    const unavailable = [...missing].filter((name) => !pool.has(name));
    if (unavailable.length > 0) {
      throw new Error(`Ambient bundle for '${editor}' references ${unavailable.join(', ')}, which no editor's generated sources declare.`);
    }
    for (const name of missing) pulled.set(name, pool.get(name));
  }
  throw new Error(`Ambient bundle for '${editor}': unresolved references keep appearing after 8 rounds of pulling declarations in.`);
}

// Only the *-methods.ts files, not the namespace ones: a typedef a pruned bundle can still be
// missing lives at their top level, whereas anything inside `namespace Word { ... }` is reachable
// only as `Word.X`, and pruning removed every such reference by construction.
function sharedTypedefPool() {
  const sources = Object.keys(EDITOR_NAMESPACES)
    .map((editor) => readStripped(`src/generated/${editor}-methods.ts`))
    .join('\n');
  return collectTopLevelBlocks(dedupeTopLevelDeclarations(sources));
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const pool = sharedTypedefPool();
  const written = new Set();

  for (const editor of Object.keys(EDITOR_NAMESPACES)) {
    const { bundle, pulled } = buildEditorBundle(editor, pool);
    const fileName = `onlyoffice-plugins-types.${editor}.ambient.d.ts`;
    fs.writeFileSync(path.join(OUT_DIR, fileName), bundle);
    written.add(fileName);
    const extra = pulled.length > 0 ? ` (+${pulled.length} pulled in: ${pulled.join(', ')})` : '';
    console.log(`Generated dist/ambient/${fileName} - ${(Buffer.byteLength(bundle) / 1048576).toFixed(2)} MB${extra}`);
  }

  // The bundles are tracked in git, so a renamed or dropped output would otherwise linger as a
  // stale file that still looks generated.
  for (const name of fs.readdirSync(OUT_DIR)) {
    if (!written.has(name)) {
      fs.unlinkSync(path.join(OUT_DIR, name));
      console.log(`Removed stale dist/ambient/${name}`);
    }
  }
}

main();
