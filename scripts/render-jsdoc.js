// Turning a doclet into the JSDoc block that ships in the .d.ts: markdown conversion, wrapping, and the
// tag order a tooltip reads best in. Shared so the executeMethod surface and the object model can never
// present the same information differently.

const DOC_WIDTH = 100;

// Both prose sources are HTML-flavored (`<b>"tile"</b> - if the image is smaller...`), while editors
// render a JSDoc block as markdown. Only known inline tags are translated - nothing else is stripped,
// so type-ish text such as `Array.<ApiRun>` inside a description survives untouched.
// Docusaurus admonition kinds sdkjs actually uses, mapped to how they should read as prose. An
// unrecognised kind falls back to its own name rather than being dropped.
const ADMONITION_LABELS = {
  note: 'Note', tip: 'Tip', info: 'Info', warning: 'Warning',
  caution: 'Caution', danger: 'Important',
};

function htmlToMarkdown(text) {
  return text
    // sdkjs writes site-relative inline links (`{@link /docs/plugins/... AddComment}`), which resolve
    // to nothing in an editor tooltip.
    .replace(/\{@link\s+(\/docs\/)/g, '{@link https://api.onlyoffice.com$1')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(?:b|strong)>/gi, '**')
    .replace(/<\/?(?:i|em)>/gi, '_')
    .replace(/<\/?code>/gi, '`')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    // `<note>` is the older spelling of the same thing, and it used to reach the declarations as a
    // literal tag. sdkjs rewrote 67 of its notes as the `:::note` fence below in v10.0.0.138 and
    // left ten behind (cell 2, pdf 4, word 4), so both spellings are live. They deliberately produce
    // the same prose: otherwise a member's description would change for no reason the day someone
    // reformats its comment upstream.
    .replace(/<note>\s*([\s\S]*?)\s*<\/note>/gi, '**Note:**\n$1')
    // Docusaurus admonitions. sdkjs writes these for the docs site's renderer, so the raw `:::`
    // fences reached the declarations verbatim and read as noise in a hover tooltip. The label is
    // the part worth keeping - a `:::danger[Breaking Change]` block is exactly what a reader must
    // not miss - so it becomes bold lead-in text and the fences go away.
    .replace(/^:::(\w+)(?:\[([^\]]*)\])?[ 	]*$/gm, (_, kind, label) => {
      const text = label || ADMONITION_LABELS[kind.toLowerCase()] || kind;
      return `**${text}:**`;
    })
    .replace(/^:::[ 	]*$/gm, '');
}

function withoutExamples(description) {
  return String(description || '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^[ \t]*#+[ \t]*Try it[ \t]*$/gim, '')
    .trim();
}

// The "## Try it" section carrying a fenced runnable snippet is the most valuable part of the
// office-js-api-declarations prose, and it's unreadable when flattened into a one-line `/** ... */`
// comment - it becomes a real `@example` tag instead. The fence's info string carries a
// document-builder directive (```js document-builder={"documentType": "word"}) that means nothing
// outside the docs site, so only the language survives.
function splitDescription(raw) {
  const examples = [];
  const text = String(raw || '')
    .replace(/\r\n?/g, '\n')
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_, code) => {
      examples.push(code.trim());
      return '';
    })
    .replace(/^[ \t]*#+[ \t]*Try it[ \t]*$/gim, '')
    .replace(/\n{3,}/g, '\n\n');
  return { summary: text.trim(), examples };
}

// An inline `{@link url Label}` tag must stay on one line - split across two, editors render the
// literal text instead of a link - so it is wrapped as a single (possibly over-long) word.
function toWords(paragraph) {
  const words = [];
  for (const word of paragraph.trim().split(/\s+/)) {
    const pending = words.length > 0 ? words[words.length - 1] : '';
    if (pending.includes('{@link') && !pending.includes('}')) words[words.length - 1] = `${pending} ${word}`;
    else words.push(word);
  }
  return words;
}

function wrapText(text, width) {
  const lines = [];
  for (const paragraph of text.split('\n')) {
    if (!paragraph.trim()) {
      if (lines.length > 0 && lines[lines.length - 1] !== '') lines.push('');
      continue;
    }
    let line = '';
    for (const word of toWords(paragraph)) {
      if (line && `${line} ${word}`.length > width) {
        lines.push(line);
        line = word;
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    if (line) lines.push(line);
  }
  while (lines.length > 0 && lines[lines.length - 1] === '') lines.pop();
  return lines;
}

// sdkjs writes `@returns {?ApiComment} - Returns null if the comment was not added.`, and jsdoc keeps
// that separator hyphen in the description for `@returns` (unlike `@param`, where it strips it) -
// re-emitted as-is it would read as a stray bullet right after the tag.
function cleanProse(text) {
  return String(text || '').replace(/^\s*-\s+/, '').trimEnd();
}

// Continuation lines of a wrapped tag are indented so the tag's own text stays visually attached to
// it rather than reading as the start of a new tag.
function taggedLines(tag, text) {
  const wrapped = text ? wrapText(text, DOC_WIDTH - 4) : [];
  if (wrapped.length === 0) return [tag];
  return wrapped.map((line, index) => (index === 0 ? `${tag} ${line}` : `  ${line}`));
}

function renderJsDoc(doc, indent) {
  const { summary, examples } = splitDescription(doc.description);
  const blocks = [];

  if (summary) blocks.push(wrapText(htmlToMarkdown(cleanProse(summary)), DOC_WIDTH));

  const tags = [];
  // A member that only exists in a commercial build is marked at the top of the tag block, ahead
  // of @param: someone reading a tooltip has to see the licence requirement before the signature
  // details, not after them. Only generate-plugin-methods.js sets this today (sdkjs-ext methods).
  if (doc.requires) tags.push(...taggedLines('@requires', doc.requires));
  // `docParams` when the signature collapsed an options bag into a record (see optionsBagFields in
  // generate-types.js): the record carries the field names and types, these lines carry their prose.
  const docParams = doc.docParams || doc.params || [];
  for (const param of docParams) {
    if (param.description) {
      tags.push(...taggedLines(`@param ${param.name} -`, htmlToMarkdown(cleanProse(param.description))));
    }
  }
  // sdkjs records a parameter's default in `[name=value]` form, which jsdoc hands back as
  // `defaultvalue` - previously parsed and then dropped. Emitted per parameter (rather than as a
  // single bare `@default`) because a method can document several, and an editor renders the tag
  // verbatim, so naming the parameter is what makes it readable.
  for (const param of docParams) {
    if (param.defaultValue !== undefined && param.defaultValue !== '') {
      tags.push(`@default ${param.name} = ${String(param.defaultValue).trim()}`);
    }
  }
  if (doc.returnDescription) {
    tags.push(...taggedLines('@returns', htmlToMarkdown(cleanProse(doc.returnDescription))));
  }
  if (doc.since) tags.push(`@since ${String(doc.since).trim()}`);
  if (doc.deprecated) {
    tags.push(...taggedLines('@deprecated', typeof doc.deprecated === 'string' ? htmlToMarkdown(cleanProse(doc.deprecated)) : ''));
  }
  if (tags.length > 0) blocks.push(tags);

  // Every example, uncapped and without exception. This was briefly removed on the grounds that
  // examples are ~47% of the generated .d.ts, which turned out to be the wrong benchmark: TypeScript
  // itself ships `lib.dom.d.ts` at 1.8 MB in every install, so declarations of this size are
  // unremarkable. And the "unreadable in a tooltip" case is 5 members out of 2712 (18 exceed 2 KB,
  // median 492 B) - not worth a size threshold that would split members into documented and
  // undocumented by an arbitrary rule. `artifacts/api/` keeps its own copy for consumers reading JSON.
  for (const example of examples) {
    blocks.push(['@example', '```js', ...example.split('\n').map((line) => line.trimEnd()), '```']);
  }
  if (doc.docsUrl) blocks.push([`@see ${doc.docsUrl}`]);

  if (blocks.length === 0) return '';

  // A `*/` anywhere in the prose or in an example would end the comment early and turn the rest of
  // the file into syntax errors.
  const escape = (line) => line.replace(/\*\//g, '*\\/');
  const lines = blocks.flatMap((block, index) => (index === 0 ? block : ['', ...block]));
  if (lines.length === 1) return `${indent}/** ${escape(lines[0])} */\n`;
  const body = lines.map((line) => (line ? `${indent} * ${escape(line)}` : `${indent} *`)).join('\n');
  return `${indent}/**\n${body}\n${indent} */\n`;
}

module.exports = { DOC_WIDTH, htmlToMarkdown, withoutExamples, splitDescription, toWords, wrapText, cleanProse, taggedLines, renderJsDoc };
