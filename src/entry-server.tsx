/**
 * Server entry used only at build time by scripts/prerender.mjs. It renders a
 * route to HTML and re-exports the SEO registry, so the prerenderer, sitemap
 * and llms.txt all use exactly the same route data as the app.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App';

export { SITE_ROUTES, NOT_FOUND, REDIRECTS, getRouteMeta } from './seo/routes';
export { headTags, titleTag } from './seo/head';
export { SITE, SITE_URL, absoluteUrl } from './seo/site';
export { llmsFacts } from './seo/llms';

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
