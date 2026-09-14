// @ts-check

/**
 * Proves `<Editor>PaidMethodName` / `<Editor>FreeMethodName` are usable for enforcement, not just
 * present, and pins what counts as paid.
 *
 * Only one thing does: a method that comes from the commercial `sdkjs-ext` and is therefore absent
 * from a Community Edition build (11 across Word and Slide). Everything else the documentation marks
 * with a licence note restricts an argument *value*, not the call - `StartAction`/`EndAction` work
 * on any edition unless `type` is `"GroupActions"`, and `CreateChart` only gates style ids above 48.
 * Those keep the note in their description and are deliberately absent from the paid unions; the
 * assertions below are what stops them being re-added.
 *
 * `@ts-expect-error` gives both directions for free - an unused directive is itself an error - so a
 * union that grows or shrinks wrongly fails here instead of shipping.
 */

/**
 * Stands in for a plugin's own wrapper: something a team writes when it wants a compile error
 * rather than a runtime failure on Community Edition.
 *
 * @template {import("../index").WordFreeMethodName} T
 * @param {T} name
 * @param {import("../index").WordMethodArgs[T]} args
 * @returns {void}
 */
function runFreeOnly(name, args) {
  void name;
  void args;
}

// Ordinary free methods pass, and keep their argument typing through the constraint.
runFreeOnly("GetCurrentWord", []);
runFreeOnly("GetVersion", []);

// Free too, and the interesting case: the docs carry a licence note on this page, but it applies to
// `type: "GroupActions"` only. Rejecting it here would tell a Community Edition plugin author the
// method is unavailable, which is false - it is how the informational and blocking actions are shown.
runFreeOnly("StartAction", ["Block", "Working..."]);
runFreeOnly("EndAction", ["Block"]);

// @ts-expect-error - AnnotateParagraph comes from the commercial sdkjs-ext and does not exist in a
// Community Edition build at all, so the free-only constraint must reject it.
runFreeOnly("AnnotateParagraph", []);

/**
 * The paid union is a real union of the sdkjs-ext names, not `string` and not everything with a
 * licence note. Without this, widening it to `string` would make the assertion above pass for the
 * wrong reason.
 *
 * @type {import("../index").WordPaidMethodName}
 */
let paid = "AnnotateParagraph";
paid = "SetParagraphHtml";

// @ts-expect-error - GetCurrentWord is free, so it is not a member of the paid union.
paid = "GetCurrentWord";

// @ts-expect-error - StartAction is licence-*noted*, not licence-gated: the method ships in every
// edition, so it must not appear in the paid union.
paid = "StartAction";
void paid;

/**
 * An editor with no sdkjs-ext surface has an empty paid union, and that is the correct answer rather
 * than a bug - Cell's executeMethod surface is entirely available on Community Edition. Asserting it
 * as `never` documents that, and fails if a name is ever added without being reviewed.
 *
 * @type {import("../index").CellPaidMethodName}
 */
let cellPaid;
void cellPaid;

/** @type {import("../index").CellFreeMethodName} */
let cellFree = "AddComment";
cellFree = "StartAction";
void cellFree;

// The exact call sdkjs-plugins/content/zotero makes (src/app/index.js:652). It has to type-check:
// sdkjs's JSDoc omits the `"GroupActions"` value and its options object, so this is covered by a
// METHOD_OVERRIDES entry rather than by the source.
const keepSelection = true;
runFreeOnly("StartAction", ["GroupActions", { lockScroll: true, keepSelection: keepSelection }]);
runFreeOnly("EndAction", ["GroupActions", { scrollToTarget: false, cancel: false }]);

// @ts-expect-error - the options are a closed shape, so a misspelled key is caught rather than
// silently ignored by the editor at runtime.
runFreeOnly("StartAction", ["GroupActions", { lockScrol: true }]);
