/**
 * Renders the <head> tags for a page as an HTML string. The prerenderer writes
 * this string into each static page; in the browser, SeoSync swaps the same
 * tags in on every route change. Every tag carries data-seo so it can be
 * replaced as a set.
 */
import { jsonLdGraph, type RouteMeta } from './routes';
import { SITE, absoluteUrl } from './site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** JSON inside <script> must not contain "</script>" or "<!--". */
const safeJson = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c');

/** hreflang links: every language version of the page, plus x-default (English). */
function hreflangLinks(meta: RouteMeta): string[] {
  if (meta.noindex) return [];
  const versions = meta.alternates ?? { [meta.lang ?? 'en']: meta.path };
  const links = Object.entries(versions).map(
    ([lang, path]) => `<link rel="alternate" hreflang="${lang}" href="${absoluteUrl(path as string)}">`,
  );
  const fallback = versions.en ?? meta.path;
  links.push(`<link rel="alternate" hreflang="x-default" href="${absoluteUrl(fallback)}">`);
  return links;
}

export function headTags(meta: RouteMeta): string {
  const url = absoluteUrl(meta.path);
  const image = absoluteUrl(meta.ogImage ?? SITE.ogImage);
  const robots = meta.noindex
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  const tags = [
    `<meta name="description" content="${esc(meta.description)}">`,
    `<meta name="robots" content="${robots}">`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}">`,
    ...hreflangLinks(meta),
    `<meta property="og:site_name" content="${esc(SITE.name)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:locale" content="${meta.lang === 'de' ? 'de_DE' : SITE.locale}">`,
    ...(meta.alternates ? Object.keys(meta.alternates).filter((l) => l !== (meta.lang ?? 'en')).map((l) => `<meta property="og:locale:alternate" content="${l === 'de' ? 'de_DE' : SITE.locale}">`) : []),
    `<meta property="og:title" content="${esc(meta.title)}">`,
    `<meta property="og:description" content="${esc(meta.description)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(meta.title)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(meta.title)}">`,
    `<meta name="twitter:description" content="${esc(meta.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    `<script type="application/ld+json">${safeJson(jsonLdGraph(meta))}</script>`,
  ].filter(Boolean);

  return tags.map((t) => t.replace(/^<(\w+)/, '<$1 data-seo')).join('\n    ');
}

export function titleTag(meta: RouteMeta): string {
  return `<title>${esc(meta.title)}</title>`;
}
