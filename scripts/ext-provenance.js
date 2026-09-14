// Which members come from the commercial sdkjs-ext, and what to say about them.
//
// Both generators need this and had identical copies of `isFromExt`, which is a bad place for a
// duplicate: it is the definition of "paid", and two copies can drift into disagreeing about what a
// Community Edition build contains. The manifest's own ext-file detection (`writeExtProvenance`) uses
// the same prefix test, so all three answers come from here.
//
// Provenance is the doclet's own `meta`, never a hardcoded name list - a member moving into or out of
// sdkjs-ext re-marks itself on the next regeneration instead of going stale.

const path = require('path');

function isFromExt(doclet, extRoot) {
  if (!extRoot || !doclet.meta || !doclet.meta.path) return false;
  return path.join(doclet.meta.path, doclet.meta.filename || '').startsWith(extRoot);
}

// The `@requires` text. `noun` differs only because the two surfaces read differently in a tooltip -
// an executeMethod name is a "method", an object-model entry may be a class or a property - and
// keeping both here is what stops them drifting apart in wording as well as in meaning.
//
// Deliberately names no internal repository. The reader needs to know which edition to run, not which
// of ONLYOFFICE's repositories the declaration came out of - and every other published @onlyoffice
// package names none either, so this one would have been the exception. The provenance itself stays in
// the generator, where it is derived from `meta.path`; only the wording shipped to consumers changes.
function developerEditionRequirement(noun) {
  return `ONLYOFFICE Docs Developer Edition. This ${noun} is not present in Community Edition builds.`;
}

module.exports = { isFromExt, developerEditionRequirement };
