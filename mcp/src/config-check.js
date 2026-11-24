// Checks a plugin's config.json: against the package's schema, then - when the plugin's directory
// is known - against the files around it (icons, pages, how index.html loads plugins.js).
// Reports problems in the words a plugin author would use, not as raw JSON Schema output.

import fs from 'node:fs';
import path from 'node:path';
import Ajv2019 from 'ajv/dist/2019.js';
import { configSchemaPath } from './data.js';
import { compareVersions } from './catalog.js';

/**
 * Fields the schema requires only because a marketplace listing needs them; the editor runs a
 * plugin without them. Mirrors ROOT_REQUIRED_BEYOND_TYPES / DEFINITION_REQUIRED_BEYOND_TYPES in
 * scripts/generate-config-schema.js (a test keeps the two equal).
 */
export const MARKETPLACE_REQUIRED = Object.freeze({
  PluginConfig: ['offered', 'version', 'minVersion'],
  StoreConfig: ['background', 'icons', 'screenshots'],
});

/**
 * Which definition a `required` error came from. Ajv reports `schemaPath` relative to the
 * definition a `$ref` led into, so the root and StoreConfig both say `#/required`; the place in
 * the document tells them apart.
 * @param {import('ajv').ErrorObject} error
 */
function requiredOwner(error) {
  if (error.instancePath === '') return 'PluginConfig';
  if (/^\/variations\/\d+\/store$/.test(error.instancePath)) return 'StoreConfig';
  return null;
}

/**
 * @typedef {object} Finding
 * @property {'error' | 'marketplace' | 'warning'} level
 *   error: the editor will not load or show the plugin as intended; marketplace: fine to run, not
 *   ready to publish; warning: works, but probably not what was meant
 * @property {string} where   e.g. `variations[0].icons2[1]`
 * @property {string} message
 */

let validator;
function validate(config) {
  if (!validator) {
    const schema = JSON.parse(fs.readFileSync(configSchemaPath(), 'utf8'));
    validator = new Ajv2019({ allErrors: true, strict: false, verbose: true }).compile(schema);
  }
  validator(config);
  return validator.errors ?? [];
}

/**
 * @param {string} text  config.json content
 * @param {string} [dir] the plugin's directory, to check the files the config names
 * @returns {Finding[]}
 */
export function checkConfig(text, dir) {
  let config;
  try {
    config = JSON.parse(text);
  } catch (error) {
    return [{ level: 'error', where: 'config.json', message: `not valid JSON: ${error.message}` }];
  }
  if (!config || typeof config !== 'object' || Array.isArray(config)) {
    return [{ level: 'error', where: 'config.json', message: 'must be a JSON object' }];
  }

  const findings = schemaFindings(validate(config));
  findings.push(...consistencyFindings(config));
  if (dir) findings.push(...fileFindings(config, dir));
  const order = { error: 0, marketplace: 1, warning: 2 };
  return findings.sort((a, b) => order[a.level] - order[b.level]);
}

/** @param {import('ajv').ErrorObject[]} errors */
function schemaFindings(errors) {
  // An anyOf that failed reports every branch's own complaint too; keep the one summary line.
  const anyOfPaths = errors.filter((e) => e.keyword === 'anyOf').map((e) => e.instancePath);
  const relevant = errors.filter(
    (e) => e.keyword === 'anyOf' || !(e.schemaPath.includes('/anyOf/') && anyOfPaths.some((p) => e.instancePath.startsWith(p))),
  );

  /** @type {Finding[]} */
  const findings = [];
  const seen = new Set();
  for (const error of relevant) {
    const finding = describeSchemaError(error);
    if (!finding) continue;
    const key = `${finding.where}\u0000${finding.message}`;
    if (seen.has(key)) continue;
    seen.add(key);
    findings.push(finding);
  }
  return findings;
}

/** @param {import('ajv').ErrorObject} error @returns {Finding | null} */
function describeSchemaError(error) {
  const where = readablePath(error.instancePath);
  switch (error.keyword) {
    case 'required': {
      const field = error.params.missingProperty;
      const marketplace = MARKETPLACE_REQUIRED[requiredOwner(error)]?.includes(field) ?? false;
      return {
        level: marketplace ? 'marketplace' : 'error',
        where,
        message: `missing "${field}"${marketplace ? ' (the marketplace needs it; the editor runs without it)' : ''}`,
      };
    }
    case 'additionalProperties': {
      const field = error.params.additionalProperty;
      const known = Object.keys(error.parentSchema?.properties ?? {});
      const hint = closest(field, known);
      return {
        level: 'error',
        where,
        message: `unknown field "${field}" - the editor ignores it${hint ? `; did you mean "${hint}"?` : ''}`,
      };
    }
    case 'enum':
      return { level: 'error', where, message: `must be one of ${error.params.allowedValues.map((v) => JSON.stringify(v)).join(', ')}` };
    case 'type':
      return { level: 'error', where, message: `must be ${error.params.type}` };
    case 'anyOf':
      return { level: 'error', where, message: 'has a shape the editor does not read; see a sample config for the accepted forms' };
    case 'contains':
    case 'minContains':
    case 'maxContains':
      return {
        level: 'marketplace',
        where,
        message: 'exactly one variation must carry a "store" block - the marketplace reads the listing from it',
      };
    default:
      return { level: 'error', where, message: error.message ?? error.keyword };
  }
}

/** Mistakes the schema cannot see: values that are well-formed but disagree with each other. */
function consistencyFindings(config) {
  /** @type {Finding[]} */
  const findings = [];
  if (typeof config.guid === 'string' && !/^asc\.\{[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}\}$/i.test(config.guid)) {
    findings.push({ level: 'warning', where: 'guid', message: 'expected the form asc.{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}' });
  }
  for (const field of ['version', 'minVersion']) {
    if (typeof config[field] === 'string' && !/^\d+\.\d+\.\d+$/.test(config[field])) {
      findings.push({ level: 'warning', where: field, message: 'expected three numbers, e.g. "1.0.0"' });
    }
  }
  const variations = Array.isArray(config.variations) ? config.variations : [];
  variations.forEach((variation, i) => {
    if (!variation || typeof variation !== 'object') return;
    if (['panelRight', 'background'].includes(variation.type)) {
      const min = typeof config.minVersion === 'string' ? config.minVersion : null;
      if (!min || compareVersions(min, '8.1.0') < 0) {
        findings.push({
          level: 'warning',
          where: `variations[${i}].type`,
          message: `"${variation.type}" is read by editors from 8.1.0; older ones treat the plugin by its isVisual/isInsideMode flags. Set minVersion to "8.1.0" or later`,
        });
      }
    }
    if (variation.type === undefined && variation.isVisual === undefined && variation.isSystem !== true) {
      findings.push({
        level: 'warning',
        where: `variations[${i}]`,
        message: 'neither "type" nor "isVisual" is set, so the editor starts it as an invisible plugin with no window',
      });
    }
  });
  return findings;
}

/** Files the config names that are not there, and how the pages load the plugin SDK. */
function fileFindings(config, dir) {
  /** @type {Finding[]} */
  const findings = [];
  const missing = (where, rel, what, level = /** @type {Finding['level']} */ ('error'), note = '') => {
    if (typeof rel !== 'string' || /^(https?:)?\/\//.test(rel)) return;
    const target = path.join(dir, rel);
    if (!fs.existsSync(target)) findings.push({ level, where, message: `${what} "${rel}" does not exist${note}` });
  };

  const variations = Array.isArray(config.variations) ? config.variations : [];
  variations.forEach((variation, i) => {
    if (!variation || typeof variation !== 'object') return;
    const at = `variations[${i}]`;
    missing(`${at}.url`, variation.url, 'page');
    if (typeof variation.url === 'string' && !/^(https?:)?\/\//.test(variation.url)) {
      findings.push(...pageFindings(path.join(dir, variation.url), `${at}.url`));
    }
    // The first variation is the plugin's button. Later ones are usually windows the plugin opens
    // itself, where the icon is never drawn - a stale path there is untidy, not broken.
    const iconLevel = i === 0 ? 'error' : 'warning';
    const iconNote = i === 0 ? '' : ' (shown only if this variation appears as a button)';
    for (const [where, rel] of iconPaths(variation.icons, `${at}.icons`)) missing(where, rel, 'icon', iconLevel, iconNote);
    for (const [where, rel] of iconPaths(variation.icons2, `${at}.icons2`)) missing(where, rel, 'icon', iconLevel, iconNote);
    const store = variation.store;
    if (store && typeof store === 'object') {
      for (const theme of ['light', 'dark']) missing(`${at}.store.icons.${theme}`, store.icons?.[theme], 'store icon directory');
      (Array.isArray(store.screenshots) ? store.screenshots : []).forEach((shot, n) =>
        missing(`${at}.store.screenshots[${n}]`, shot, 'screenshot'),
      );
      if (Array.isArray(store.screenshots) && !store.screenshots.length) {
        findings.push({ level: 'marketplace', where: `${at}.store.screenshots`, message: 'the marketplace listing has no screenshots' });
      }
    }
  });
  return findings;
}

/**
 * The files an icon path template stands for. web-apps accepts one string that encodes the whole
 * set, e.g. `resources/%theme-type%(light|dark)/icon%scale%(default).%extension%(png)`; this
 * expands it the way the editor does (Common.UI.iconsStr2IconsObj): each `%name%(a|b)` takes every
 * listed value, `default` scales mean 100-200%, a 100% scale adds nothing and others add `@1.25x`,
 * the `normal` state adds nothing and others add `_hover`. A `*` scale names no single file and is
 * skipped.
 * @param {string} template
 * @returns {string[]}
 */
export function expandIconTemplate(template) {
  if (!template.includes('%')) return [template];
  const param = (name, fallback) => {
    const match = new RegExp(`%${name}%\\(([^)]*)\\)`).exec(template);
    return match ? { token: match[0], at: match.index, values: match[1].split('|') } : { token: '', at: -1, values: fallback };
  };
  const themeName = param('theme-name', ['']);
  const themeType = param('theme-type', ['']);
  const state = param('state', ['normal']);
  const scale = param('scale', ['100']);
  const extension = param('extension', []);

  const scales = scale.values.flatMap((v) => (v === 'default' ? ['100', '125', '150', '175', '200'] : [v.replace(/%$/, '')]));
  const raster = extension.values.filter((v) => v !== 'svg');
  const ext = raster.length ? raster[raster.length - 1] : extension.values.includes('svg') ? 'svg' : '';
  // A scale token right after "/" is the whole file name, so the 100% file is "icon", not "".
  const scaleBase = scale.at > 0 && template[scale.at - 1] === '/' ? 'icon' : '';

  const out = [];
  for (const name of themeName.values) {
    for (const type of themeType.values) {
      for (const s of scales) {
        if (s === '*' || s === '') continue;
        const n = Number.parseInt(s, 10);
        const suffix = n === 100 ? '' : `@${String(n / 100).replace(/0+$/, '').replace(/\.$/, '')}x`;
        let url = template;
        if (themeName.token) url = url.split(themeName.token).join(name);
        if (themeType.token) url = url.split(themeType.token).join(type);
        if (scale.token) url = url.split(scale.token).join(scaleBase + suffix);
        if (extension.token) url = url.split(extension.token).join(ext);
        for (const st of state.values) {
          if (!state.token) out.push(url);
          else if (st === 'normal') out.push(url.replace(state.token, '').replace('//', '/'));
          else out.push(url.replace(state.token, `_${st}`));
        }
      }
    }
  }
  return [...new Set(out)];
}

/** Every icon path in `icons`/`icons2`, which come in several shapes (see IconConfig). */
function iconPaths(value, where) {
  const out = [];
  const visit = (node, at) => {
    if (typeof node === 'string') for (const file of expandIconTemplate(node)) out.push([at, file]);
    else if (Array.isArray(node)) node.forEach((item, i) => visit(item, `${at}[${i}]`));
    else if (node && typeof node === 'object') {
      for (const [key, item] of Object.entries(node)) {
        if (key === 'style' || key === 'theme') continue;
        visit(item, /^[\w$]+$/.test(key) ? `${at}.${key}` : `${at}["${key}"]`);
      }
    }
  };
  visit(value, where);
  return out;
}

/**
 * How a page loads plugins.js. A relative path into a sdkjs-plugins checkout (`../v1/plugins.js`)
 * works only inside that repository; installed anywhere else the page has no plugin API at all.
 */
function pageFindings(file, where) {
  if (!fs.existsSync(file)) return [];
  const html = fs.readFileSync(file, 'utf8');
  const sources = [...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1]);
  const sdk = sources.filter((src) => /(^|\/)plugins\.js(\?|$)/.test(src));
  if (!sdk.length) {
    return [{ level: 'error', where, message: 'the page does not load plugins.js, so window.Asc.plugin never exists' }];
  }
  return sdk
    .filter((src) => !/^(https?:)?\/\//.test(src))
    .map((src) => ({
      level: /** @type {const} */ ('error'),
      where,
      message:
        `loads plugins.js from the relative path "${src}", which exists only inside the sdkjs-plugins repository; ` +
        'use https://onlyoffice.github.io/sdkjs-plugins/v1/plugins.js',
    }));
}

/** `/variations/0/icons2/1` -> `variations[0].icons2[1]`. */
function readablePath(pointer) {
  if (!pointer) return 'config.json';
  return pointer
    .split('/')
    .slice(1)
    .map((part) => part.replace(/~1/g, '/').replace(/~0/g, '~'))
    .reduce((acc, part) => (/^\d+$/.test(part) ? `${acc}[${part}]` : acc ? `${acc}.${part}` : part), '');
}

/** The known name a mistyped one most likely meant: same letters ignoring case, or one edit away. */
function closest(name, candidates) {
  const lower = name.toLowerCase();
  const sameCase = candidates.find((c) => c.toLowerCase() === lower);
  if (sameCase) return sameCase;
  let best = null;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const d = distance(lower, candidate.toLowerCase());
    if (d < bestDistance) {
      best = candidate;
      bestDistance = d;
    }
  }
  return bestDistance <= Math.max(1, Math.floor(name.length / 5)) ? best : null;
}

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cur = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = cur;
    }
  }
  return row[b.length];
}
