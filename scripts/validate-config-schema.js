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
const Ajv = require('ajv');
const { resolveSource } = require('./resolve-paths.js');

const PACKAGE_ROOT = path.join(__dirname, '..');

// Confirmed real mistakes in these specific plugins' own config.json (not gaps in the schema) -
// tracked here instead of silently ignored, so a NEW, unexpected failure elsewhere still fails
// the check. Re-verify against the live file before removing an entry.
const KNOWN_ISSUES = {
  datepicker: 'root-level `type`/`icons` - these belong inside `variations[i]`, not at the root (every other plugin does it correctly).',
  pomodoro: '`buttons[].isviewer` - typo of `isViewer` (lowercase v).',
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

    if (dir in KNOWN_ISSUES) {
      console.log(`${dir}: known issue - ${KNOWN_ISSUES[dir]}`);
      continue;
    }

    unexpectedFailures.push(dir);
    console.log(`${dir}: FAIL`);
    for (const err of validate.errors) {
      console.log(`  ${err.instancePath || '(root)'} ${err.message}`);
    }
  }

  console.log(`\n${pass} passed, ${unexpectedFailures.length} unexpected failures, ${Object.keys(KNOWN_ISSUES).length} known issues.`);

  if (unexpectedFailures.length > 0) {
    console.error(`\nSchema rejected config.json files not in KNOWN_ISSUES: ${unexpectedFailures.join(', ')}`);
    process.exitCode = 1;
  }
}

main();
