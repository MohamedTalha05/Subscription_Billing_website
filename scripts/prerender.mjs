/**
 * Build step 3 of 3: turn the single-page app into one static HTML file per
 * route, so search engines and AI crawlers (most of which don't run
 * JavaScript) get the full content of every page.
 *
 *   1. vite build                     → dist/ (client bundle + index.html template)
 *   2. vite build --ssr …             → dist-ssr/entry-server.js
 *   3. node scripts/prerender.mjs     → this file
 *
 * Writes into dist/:
 *   <route>/index.html   every page in src/seo/routes.ts, with its own head tags
 *   404.html             served by GitHub Pages for unknown addresses
 *   <old>/index.html     redirect pages for moved addresses
 *   sitemap.xml, robots.txt, llms.txt, llms-full.txt
 *
 * Then checks every page (one <h1>, title and description length, duplicates)
 * and fails the build on errors.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const ssr = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const { render, SITE_ROUTES, NOT_FOUND, REDIRECTS, headTags, titleTag, SITE, SITE_URL, absoluteUrl, llmsFacts } = ssr;

const template = await readFile(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"><!--app-html--></div>')) {
  throw new Error('index.html is missing the <!--seo:start--> / <!--app-html--> markers');
}

const today = new Date().toISOString().slice(0, 10);

function page(meta, appHtml) {
  return template
    .replace('<html lang="en">', `<html lang="${meta.lang ?? 'en'}">`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `${titleTag(meta)}\n    ${headTags(meta)}`)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-prerendered="${meta.path}">${appHtml}</div>`);
}

async function write(relPath, contents) {
  const file = join(dist, relPath);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

const fileFor = (path) => (path === '/' ? 'index.html' : `${path.replace(/^\/|\/$/g, '')}/index.html`);

/* ---------- HTML → plain text (for llms-full.txt) ---------- */

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'", '#x27': "'" };

function htmlToText(html) {
  const main = html.match(/<main[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? html;
  let s = main
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/gi, '')
    .replace(/<h([1-6])[^>]*>/gi, (_, l) => `\n\n${'#'.repeat(Number(l))} `)
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<(td|th)[^>]*>/gi, ' | ')
    .replace(/<\/(p|div|section|article|header|footer|ul|ol|table|tr|figure|figcaption|blockquote|summary|details|dl|dt|dd|aside|nav)>/gi, '\n')
    .replace(/<\/(span|a|strong|em|b|code|button|label)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&(#?\w+);/g, (m, e) => ENTITIES[e] ?? (e.startsWith('#') ? String.fromCodePoint(Number(e.slice(1).replace(/^x/, '0x'))) : m));
  s = s
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').replace(/ ([.,;:!?)])/g, '$1').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/^- \n/gm, '');
  return s.trim();
}

/* ---------- pages ---------- */

const rendered = [];
for (const meta of SITE_ROUTES) {
  const appHtml = render(meta.path);
  await write(fileFor(meta.path), page(meta, appHtml));
  rendered.push({ meta, appHtml });
}

// 404 page: GitHub Pages serves dist/404.html for any unknown address.
await write('404.html', page(NOT_FOUND, render(NOT_FOUND.path)));

// Redirect pages for moved addresses (GitHub Pages can't send server redirects).
for (const [from, to] of Object.entries(REDIRECTS)) {
  const target = absoluteUrl(to);
  await write(
    fileFor(from),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Moved to ${to}</title>
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${target}" />
    <meta http-equiv="refresh" content="0; url=${to}" />
  </head>
  <body>
    <p>This page has moved to <a href="${to}">${target}</a>.</p>
  </body>
</html>
`,
  );
}

/* ---------- sitemap.xml ---------- */

const indexable = SITE_ROUTES.filter((r) => !r.noindex);
await write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map(
    (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>
    <lastmod>${today}</lastmod>${
      r.alternates
        ? Object.entries(r.alternates)
            .map(([l, p]) => `\n    <xhtml:link rel="alternate" hreflang="${l}" href="${absoluteUrl(p)}"/>`)
            .join('') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(r.alternates.en)}"/>`
        : ''
    }${r.changefreq ? `\n    <changefreq>${r.changefreq}</changefreq>` : ''}${
      r.priority != null ? `\n    <priority>${r.priority.toFixed(1)}</priority>` : ''
    }
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

/* ---------- robots.txt ---------- */

const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'Bingbot', 'DuckAssistBot',
  'meta-externalagent', 'MistralAI-User', 'CCBot',
];
await write(
  'robots.txt',
  `# ${SITE.fullName}
# Search engines and AI assistants are welcome to crawl, index and cite this site.

User-agent: *
Allow: /

# AI crawlers, listed explicitly so their access is unambiguous.
${AI_CRAWLERS.map((ua) => `User-agent: ${ua}`).join('\n')}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
);

/* ---------- security.txt (RFC 9116) ---------- */

// Contact goes to the security page, so the email address stays out of reach of harvesters.
const expires = new Date(Date.now() + 365 * 86_400_000).toISOString();
await write(
  '.well-known/security.txt',
  `Contact: ${absoluteUrl('/security/#report-vulnerability')}
Expires: ${expires}
Preferred-Languages: en, de
Canonical: ${absoluteUrl('/.well-known/security.txt')}
Policy: ${absoluteUrl('/security/')}
`,
);

/* ---------- llms.txt and llms-full.txt (https://llmstxt.org) ---------- */

const groups = ['Products', 'Solutions', 'Pricing', 'Guides', 'Trust & compliance', 'Company', 'Deutsch', 'Legal'];
const llmsSections = groups
  .map((g) => {
    const items = indexable.filter((r) => r.llms === g);
    if (!items.length) return '';
    const title = g === 'Legal' ? 'Optional' : g === 'Deutsch' ? 'Deutsch (German pages)' : g;
    return `## ${title}\n\n${items.map((r) => `- [${r.name}](${absoluteUrl(r.path)}): ${r.description}`).join('\n')}`;
  })
  .filter(Boolean)
  .join('\n\n');

await write(
  'llms.txt',
  `# ${SITE.fullName}

> ${SITE.summary}

Key facts:

${llmsFacts().map((f) => `- ${f}`).join('\n')}

${llmsSections}

## Full text

- [Every page as plain text](${SITE_URL}/llms-full.txt): The complete content of this website in one file.
`,
);

await write(
  'llms-full.txt',
  `# ${SITE.fullName}

> ${SITE.summary}

Generated ${today} from ${SITE_URL}. Each section below is one page of the website.

${rendered
  .filter(({ meta }) => !meta.noindex)
  .map(({ meta, appHtml }) => `---\n\nURL: ${absoluteUrl(meta.path)}\nTitle: ${meta.title}\nSummary: ${meta.description}\n\n${htmlToText(appHtml)}`)
  .join('\n\n')}
`,
);

/* ---------- checks ---------- */

const problems = [];
const warnings = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
for (const { meta, appHtml } of rendered) {
  const h1s = (appHtml.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1) problems.push(`${meta.path}: ${h1s} <h1> elements (expected exactly 1)`);
  if (meta.title.length > 65) warnings.push(`${meta.path}: title is ${meta.title.length} characters (aim for ≤ 60)`);
  if (meta.description.length > 165) warnings.push(`${meta.path}: description is ${meta.description.length} characters (aim for ≤ 160)`);
  if (seenTitles.has(meta.title)) problems.push(`${meta.path}: same title as ${seenTitles.get(meta.title)}`);
  if (seenDescriptions.has(meta.description)) problems.push(`${meta.path}: same description as ${seenDescriptions.get(meta.description)}`);
  seenTitles.set(meta.title, meta.path);
  seenDescriptions.set(meta.description, meta.path);
  const imgsWithoutAlt = (appHtml.match(/<img(?![^>]*\balt=)[^>]*>/gi) || []).length;
  if (imgsWithoutAlt) problems.push(`${meta.path}: ${imgsWithoutAlt} <img> without alt text`);
}

await rm(ssrDir, { recursive: true, force: true });

console.log(`\nPrerendered ${rendered.length} pages + 404 + ${Object.keys(REDIRECTS).length} redirect(s) for ${SITE_URL}`);
for (const { meta } of rendered) console.log(`  ${fileFor(meta.path).padEnd(36)} ${meta.title}`);
console.log('  sitemap.xml, robots.txt, llms.txt, llms-full.txt');
for (const w of warnings) console.warn(`  warning: ${w}`);
if (problems.length) {
  for (const p of problems) console.error(`  error: ${p}`);
  process.exit(1);
}
