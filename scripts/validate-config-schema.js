// Validates schemas/config.schema.json against every real plugin config.json - the strongest
// evidence the schema is right, since these are the files the editors actually load. Not part of
// `npm test`: unlike everything else here it needs input from outside the package.
//
// The default looks next door (`sdkjs-plugins/content/`), which is free while this package lives in
// the monorepo. `PLUGINS_CONTENT_PATH` / `--content <path>` points it anywhere else - the same
// convention the generators use for sdkjs - so moving the package out is a configuration change, not
// a code change. The files themselves are public
// (github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content), so a checkout of
// the monorepo is enough; nothing needs vendoring into this package, which would only rot.
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv/dist/2019');
const { resolveSource } = require('./resolve-paths.js');
const { ROOT_REQUIRED_BEYOND_TYPES, DEFINITION_REQUIRED_BEYOND_TYPES } = require('./generate-config-schema.js');

const PACKAGE_ROOT = path.join(__dirname, '..');

// The schema is deliberately stricter than the plugins that already shipped: it describes what a
// config.json should carry before publication, and `minVersion` alone is absent from most of the
// corpus. Those misses are worth reporting and not worth failing over - missing metadata, not a
// broken file. Everything else (an unknown property, a wrong type, a typo'd key) is a defect in
// that plugin and still fails the check.
//
// Scoped by `schemaPath`, not by field name, so a `required` added to some other definition later
// counts as structural instead of being waved through because the name happens to match. The lists
// come from the generator rather than a second copy here.
const ADVISORY_REQUIRED = [
  ...ROOT_REQUIRED_BEYOND_TYPES.map((field) => ({ field, schemaPath: '#/required' })),
  ...Object.entries(DEFINITION_REQUIRED_BEYOND_TYPES).flatMap(([definition, fields]) =>
    fields.map((field) => ({ field, schemaPath: `#/definitions/${definition}/required` }))),
];

const isAdvisory = (error) => error.keyword === 'required'
  && ADVISORY_REQUIRED.some((a) => a.field === error.params.missingProperty && a.schemaPath === error.schemaPath);

// Whose config.json counts as evidence about the schema. 36 of the 55 published plugins are
// ONLYOFFICE's own; the other 19 come from outside contributors and are not a specification - a
// field only they use says what one author wrote, not what the editor supports. So a structural
// error in a third-party config is reported and does not fail the check: it is their file, not
// ours to fix, and not grounds for widening the types.
//
// What does justify widening them is the editor's own source. `isActivated` reached
// VariationConfig that way - web-apps reads `variation.isActivated !== false` - and the plugin
// using it happens to be third-party, which is beside the point.
const FIRST_PARTY = 'Ascensio System SIA';

// Confirmed real mistakes in one of ONLYOFFICE's own config.json files (not gaps in the schema) -
// tracked here instead of silently ignored, so a NEW, unexpected failure elsewhere still fails the
// check. Re-verify against the live file before removing an entry; an entry that stops failing is
// reported rather than left to excuse a name nobody rechecks.
//
// The two it used to hold - datepicker's root-level `type`/`icons` and pomodoro's `isviewer` typo -
// are both third-party, and third-party defects are now reported by ownership instead of listed
// one by one here.
const KNOWN_ISSUES = {
  apertium: '`variations[0].isNeedNumbering` - no editor code reads it. Searched sdkjs, sdkjs-ext, sdkjs-forms, web-apps and the marketplace; the only occurrence anywhere is this config. It was in VariationConfig until the field audit found nothing behind it.',
};

function main() {
  // The 52 real plugin configs live in the monorepo this package currently sits in. Checked out on its
  // own they are simply not there, so skip rather than fail - `npm run check-schema` still proves the
  // schema matches the types it was generated from.
  const contentDir = resolveSource('pluginsContent', {}, { optional: true });
  if (!contentDir) {
    console.log('schema: skipped - no sdkjs-plugins/content checkout (set PLUGINS_CONTENT_PATH to validate against real configs)');
    return;
  }
  const schema = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'schemas', 'config.schema.json'), 'utf8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);

  const dirs = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  let pass = 0;
  const unexpectedFailures = [];
  const incomplete = new Map();
  const thirdParty = new Map();
  const usedKnownIssues = new Set();

  for (const dir of dirs) {
    const configPath = path.join(contentDir, dir, 'config.json');
    if (!fs.existsSync(configPath)) continue;

    let data;
    try {
      data = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (err) {
      console.log(`${dir}: SKIP (invalid JSON: ${err.message})`);
      continue;
    }

    if (validate(data)) {
      pass += 1;
      continue;
    }

    const advisory = validate.errors.filter(isAdvisory);
    const structural = validate.errors.filter((err) => !isAdvisory(err));
    const ours = data.offered === FIRST_PARTY;
    // Counted for our own plugins only. A third-party author's missing `minVersion` is not a gap
    // anyone here closes, and mixing them in hides how much of it is ours.
    if (ours && advisory.length > 0) {
      incomplete.set(dir, advisory.map((err) => err.params.missingProperty));
    }

    if (structural.length === 0) {
      // Valid as a file; only short of metadata the schema asks of a plugin before publication.
      pass += 1;
      continue;
    }

    const lines = structural.map((err) => `  ${err.instancePath || '(root)'} ${err.message}`);
    // Ownership first: KNOWN_ISSUES is for defects in our own configs, which someone here can fix.
    if (!ours) {
      thirdParty.set(dir, { offered: data.offered, lines });
      continue;
    }

    if (dir in KNOWN_ISSUES) {
      usedKnownIssues.add(dir);
      console.log(`${dir}: known issue - ${KNOWN_ISSUES[dir]}`);
      continue;
    }

    unexpectedFailures.push(dir);
    console.log(`${dir}: FAIL`);
    for (const line of lines) console.log(line);
  }

  console.log(`\n${pass} passed, ${unexpectedFailures.length} unexpected failures, ${Object.keys(KNOWN_ISSUES).length} known issues.`);

  if (thirdParty.size > 0) {
    console.log(`\n${thirdParty.size} third-party config(s) rejected - reported, not failed; these are not ONLYOFFICE's files:`);
    for (const [dir, { offered, lines }] of thirdParty) {
      console.log(`  ${dir} (offered: ${offered ?? 'not set'})`);
      for (const line of lines) console.log(`  ${line}`);
    }
  }

  // A KNOWN_ISSUES entry that no longer fires is either fixed upstream or now covered by the
  // third-party rule. Left in place it reads as a live defect and quietly excuses a name.
  const stale = Object.keys(KNOWN_ISSUES).filter((dir) => !usedKnownIssues.has(dir));
  if (stale.length > 0) {
    console.log(`\nKNOWN_ISSUES entries that no longer fail: ${stale.join(', ')} - remove them or confirm the issue is still real.`);
  }

  if (incomplete.size > 0) {
    // Grouped by field: the interesting number is how many plugins are missing each one, which is
    // what decides whether a rule is worth keeping or the corpus is worth fixing.
    const byField = new Map();
    for (const [dir, fields] of incomplete) {
      for (const field of fields) byField.set(field, [...(byField.get(field) || []), dir]);
    }
    console.log(`\n${incomplete.size} valid but incomplete - missing metadata the schema asks for before publication:`);
    for (const [field, dirs_] of [...byField].sort((a, b) => b[1].length - a[1].length)) {
      const shown = dirs_.length > 6 ? `${dirs_.slice(0, 6).join(', ')}, +${dirs_.length - 6} more` : dirs_.join(', ');
      console.log(`  ${field}: ${dirs_.length} (${shown})`);
    }
  }

  if (unexpectedFailures.length > 0) {
    console.error(`\nSchema rejected config.json files not in KNOWN_ISSUES: ${unexpectedFailures.join(', ')}`);
    process.exitCode = 1;
  }
}

main();
