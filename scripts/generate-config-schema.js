const fs = require('fs');
const path = require('path');
const { createGenerator } = require('ts-json-schema-generator');

const PACKAGE_ROOT = path.join(__dirname, '..');
const OUTPUT_DIR = path.join(PACKAGE_ROOT, 'schemas');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'config.schema.json');
// Required in the schema although the types mark them optional: the type says what the runtime
// accepts, the schema what a config.json should carry before it is published.
const ROOT_REQUIRED_BEYOND_TYPES = ['offered', 'version', 'minVersion'];
const DEFINITION_REQUIRED_BEYOND_TYPES = { StoreConfig: ['background', 'icons', 'screenshots'] };

// Generated straight from PluginConfig/VariationConfig/ButtonConfig/etc. in index.d.ts, so the
// shape can never drift from the TS types describing the same config.json - re-run
// `npm run generate-schema` after editing any of those interfaces.
const config = {
  path: path.join(PACKAGE_ROOT, 'index.d.ts'),
  tsconfig: path.join(PACKAGE_ROOT, 'tsconfig.json'),
  type: 'PluginConfig',
  // PluginConfig is re-exported (`export type { PluginConfig }` at the bottom of index.d.ts, not
  // declared inline as `export interface`) - ts-json-schema-generator's `expose: 'export'` mode
  // only follows direct declarations, not re-exports, so it can't find it that way. `'all'` still
  // only pulls in PluginConfig's actual transitive closure (ButtonConfig, EditorType, ...), not
  // every type in the file - the schema's `definitions` come out identical either way once the
  // root type is reachable.
  expose: 'all',
  topRef: false,
  skipTypeCheck: false,
  additionalProperties: false,
};

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const schema = createGenerator(config).createSchema(config.type);
  schema.$id = 'https://raw.githubusercontent.com/ONLYOFFICE/doceditor-plugin-types/master/schemas/config.schema.json';
  schema.title = 'ONLYOFFICE Plugin config.json';
  schema.description = 'Generated from PluginConfig (and the types it references) in index.d.ts - do not hand-edit, run `npm run generate-schema` instead.';
  schema.$schema = 'https://json-schema.org/draft/2019-09/schema';

  // Exactly one variation carries `store` - the marketplace entry for the plugin as a whole, not for
  // one of its windows. It cannot come from the TypeScript types: `store?:` on VariationConfig says
  // "any variation may have one", and no type-level construct says "exactly one element of this
  // array does". Required-on-every-variation would be wrong in the other direction; it rejects every
  // plugin with a second variation, which is most of them.
  const variations = schema.properties && schema.properties.variations;
  if (!variations || variations.type !== 'array') {
    throw new Error('PluginConfig.variations is no longer an array property - the store constraint below has nothing to attach to.');
  }
  variations.contains = { required: ['store'] };
  variations.minContains = 1;
  variations.maxContains = 1;

  // Both tables are applied the same way, and each name is checked against the properties actually
  // generated - a renamed field would otherwise make the rule require something that no longer
  // exists, which `additionalProperties: false` turns into a schema nothing can satisfy. Sorted so
  // the lists do not reorder between runs and show up as a diff.
  const require_ = (node, fields, where) => {
    for (const field of fields) {
      if (!node.properties || !node.properties[field]) {
        throw new Error(`${where} has no "${field}" property - the REQUIRED_BEYOND_TYPES entry names a field the schema does not describe.`);
      }
      node.required = node.required || [];
      if (!node.required.includes(field)) node.required.push(field);
    }
    node.required.sort();
  };

  require_(schema, ROOT_REQUIRED_BEYOND_TYPES, 'PluginConfig');
  for (const [name, fields] of Object.entries(DEFINITION_REQUIRED_BEYOND_TYPES)) {
    const node = schema.definitions && schema.definitions[name];
    if (!node) throw new Error(`No "${name}" definition in the generated schema - the REQUIRED_BEYOND_TYPES entry has nothing to attach to.`);
    require_(node, fields, name);
  }

  fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify(schema, null, 2)}\n`);
  console.log(`Generated ${path.relative(PACKAGE_ROOT, OUTPUT_FILE)}`);
}

// Exported so validate-config-schema.js can tell "stricter than the types on purpose" apart from a
// real defect without keeping its own copy of the lists. Two copies of a rule like this is how the
// stricter half ends up guarding something the other half no longer requires.
module.exports = { ROOT_REQUIRED_BEYOND_TYPES, DEFINITION_REQUIRED_BEYOND_TYPES };

if (require.main === module) main();
