// Ranks catalog entries against a free-text query. Plain token matching, not embeddings: member
// names are the vocabulary people search with, and an exact name must always win.

import { EDITORS, entries, compareVersions } from './catalog.js';

/**
 * A member as found, with every class and editor that has the same name and signature folded in -
 * an inherited method (ApiRun.SetBold, ApiParagraph.SetBold, ...) or one shared by several editors
 * is one hit, not a page of near-duplicates.
 * @typedef {object} Hit
 * @property {import('./catalog.js').Entry} entry  the best-scoring representative
 * @property {string[]} owners
 * @property {string[]} editors
 * @property {number} score
 */

/**
 * @param {string} query
 * @param {object} [options]
 * @param {string[]} [options.editors]      default: all editors and the runtime
 * @param {boolean} [options.runtime]       include the plugin runtime (Asc.plugin, config.json)
 * @param {string[]} [options.kinds]
 * @param {'any' | 'community'} [options.edition]
 * @param {string} [options.editorVersion]  drop members whose `since` is newer
 * @param {number} [options.limit]
 * @returns {{ hits: Hit[], total: number, hidden: number, partial: boolean }}
 *   `hidden` counts matches the edition/editorVersion filters dropped; `partial` says no member
 *   matched every word, so the hits match only some of them.
 */
export function search(query, options = {}) {
  const { editors = EDITORS, runtime = true, kinds, edition = 'any', editorVersion, limit = 15 } = options;
  const tokens = tokenize(query);
  if (!tokens.length) return { hits: [], total: 0, hidden: 0, partial: false };
  const whole = query.trim();

  const pool = editors.flatMap((editor) => entries(editor));
  if (runtime) pool.push(...entries(null));
  const filters = { kinds, edition, editorVersion };
  const weights = tokenWeights(pool, tokens);

  let partial = false;
  let found = collect(pool, tokens, weights, whole, filters, false);
  // Only when nothing matched at all: a member the filters hid is an answer ("not in your
  // edition"), and loose matches around it would bury that answer.
  if (!found.groups.size && !found.hidden.size && tokens.length > 1) {
    partial = true;
    found = collect(pool, tokens, weights, whole, filters, true);
  }

  const ranked = [...found.groups.values()].sort(
    (a, b) => b.score - a.score || a.entry.name.length - b.entry.name.length || a.entry.name.localeCompare(b.entry.name),
  );
  for (const hit of ranked) {
    // The representative's own class first, so the line reads as a real, callable member.
    hit.owners.sort((a, b) => (a === hit.entry.owner ? -1 : b === hit.entry.owner ? 1 : a.localeCompare(b)));
  }
  return { hits: ranked.slice(0, limit), total: ranked.length, hidden: found.hidden.size, partial };
}

/**
 * Scores the pool and folds equal members into hits.
 * @param {import('./catalog.js').Entry[]} pool
 * @param {string[]} tokens
 * @param {number[]} weights
 * @param {string} whole  the query as typed, trimmed
 * @param {{ kinds?: string[], edition: string, editorVersion?: string }} filters
 * @param {boolean} partial
 */
function collect(pool, tokens, weights, whole, { kinds, edition, editorVersion }, partial) {
  /** @type {Map<string, Hit>} */
  const groups = new Map();
  const hidden = new Set();
  for (const entry of pool) {
    if (kinds && !kinds.includes(entry.kind)) continue;
    const score = scoreEntry(entry, tokens, weights, whole, partial);
    if (!score) continue;

    const key = `${entry.kind}\u0000${entry.name}\u0000${entry.signature}`;
    const filteredOut =
      (edition === 'community' && entry.paid) ||
      (editorVersion && entry.since && compareVersions(entry.since, editorVersion) > 0);
    if (filteredOut) {
      hidden.add(key);
      continue;
    }
    const group = groups.get(key);
    if (!group) {
      groups.set(key, {
        entry,
        owners: entry.owner ? [entry.owner] : [],
        editors: entry.editor ? [entry.editor] : [],
        score,
      });
      continue;
    }
    if (entry.owner && !group.owners.includes(entry.owner)) group.owners.push(entry.owner);
    if (entry.editor && !group.editors.includes(entry.editor)) group.editors.push(entry.editor);
    if (score > group.score) {
      group.score = score;
      group.entry = entry;
    }
  }
  // A member hidden in one editor but shown in another is not hidden.
  for (const key of groups.keys()) hidden.delete(key);
  return { groups, hidden };
}

/**
 * Splits a query into lowercase tokens; `Api.Foo` and `ApiRun.SetBold` stay usable as one
 * token through the whole-query match in `scoreEntry`.
 * @param {string} query
 */
function tokenize(query) {
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9_]+/)
    .filter(Boolean);
  const meaningful = tokens.filter((token) => !STOP_WORDS.has(token));
  // A query made only of stop words ("for", "to") is still a query, not an empty one.
  return meaningful.length ? meaningful : tokens;
}

// Words that match nearly every description and so only add noise to the ranking.
const STOP_WORDS = new Set(['a', 'an', 'the', 'of', 'to', 'in', 'on', 'for', 'and', 'or', 'with', 'from', 'by', 'is', 'how']);

/**
 * Every token has to match somewhere, or the entry is out. Where it matched decides the weight:
 * the member's name, then its class, its signature, and last its description. In `partial` mode
 * a member may miss words, as long as its own name carries at least one of them - "insert html"
 * still finds PasteHtml, whose text never says "insert".
 * @param {import('./catalog.js').Entry} entry
 * @param {string[]} tokens
 * @param {number[]} weights  per token, from `tokenWeights`
 * @param {string} whole  the query as typed, trimmed
 * @param {boolean} partial
 */
function scoreEntry(entry, tokens, weights, whole, partial) {
  const { name, owner, signature, description } = lowered(entry);
  const query = whole.toLowerCase();
  if (query === name || (owner && query === `${owner}.${name}`)) {
    // Case decides between onClick (an event) and onclick (a menu item field).
    return whole === entry.name || whole === `${entry.owner}.${entry.name}` ? 1000 : 999;
  }

  let score = 0;
  let inName = false;
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    let base;
    // When words are missing anyway, how exactly one word matched says little: let rarity decide.
    if (partial && name.includes(token)) base = 10;
    else if (name === token) base = 30;
    else if (name.startsWith(token)) base = 15;
    else if (name.includes(token)) base = 10;
    else if (owner.includes(token)) base = 6;
    else if (signature.includes(token)) base = 3;
    else if (description.includes(token)) base = 2;
    else if (partial) continue;
    else return 0;
    score += base * weights[i];
    if (name.includes(token)) inName = true;
  }
  return partial && !inName ? 0 : score;
}

/**
 * Rarer words weigh more (inverse document frequency): in "insert html", "html" names a handful
 * of members and "insert" hundreds, so PasteHtml should outrank every Insert*.
 * @param {import('./catalog.js').Entry[]} pool
 * @param {string[]} tokens
 * @returns {number[]}
 */
function tokenWeights(pool, tokens) {
  const counts = tokens.map(() => 0);
  for (const entry of pool) {
    const { name, owner, signature, description } = lowered(entry);
    const text = `${name} ${owner} ${signature} ${description}`;
    tokens.forEach((token, i) => {
      if (text.includes(token)) counts[i]++;
    });
  }
  return counts.map((count) => Math.log(1 + pool.length / (count + 1)));
}

const loweredCache = new WeakMap();

/** @param {import('./catalog.js').Entry} entry */
function lowered(entry) {
  let value = loweredCache.get(entry);
  if (!value) {
    value = {
      name: entry.name.toLowerCase(),
      owner: entry.owner.toLowerCase(),
      signature: entry.signature.toLowerCase(),
      description: entry.description.toLowerCase(),
    };
    loweredCache.set(entry, value);
  }
  return value;
}

/**
 * One line per hit, readable by a person and by a model.
 * @param {Hit} hit
 */
export function formatHit(hit) {
  const { entry } = hit;
  const where = hit.editors.length
    ? `[${hit.editors.join(', ')}]`
    : entry.kind === 'executeMethod'
      ? '[all editors; undocumented]'
      : '[runtime]';
  const full =
    entry.kind === 'method' || (entry.kind === 'runtime' && entry.owner)
      ? `${entry.owner}.${entry.signature.startsWith(entry.name) ? entry.signature : entry.name}`
      : entry.signature;
  // Some runtime types are whole maps written out inline; get_member has the full text.
  const qualified = full.length > 220 ? `${full.slice(0, 200)}…` : full;
  const notes = [entry.kind];
  const others = hit.owners.filter((owner) => owner !== entry.owner);
  if (others.length) {
    notes.push(`also on ${others.slice(0, 4).join(', ')}${others.length > 4 ? ` +${others.length - 4}` : ''}`);
  }
  if (entry.since) notes.push(`since ${entry.since}`);
  if (entry.paid) notes.push('Developer Edition only');
  return `${where} ${qualified} — ${notes.join('; ')}`;
}
