import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { headTags } from './head';
import { getRouteMeta } from './routes';

/**
 * Keeps <title>, meta tags, canonical link and JSON-LD in step with the
 * current route after client-side navigation. The first page load already has
 * the right tags from the prerendered HTML; this only matters when React
 * Router changes the page without a reload.
 */
export function SeoSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.title = meta.title;
    document.documentElement.lang = meta.lang ?? 'en';
    document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove());
    document.head.insertAdjacentHTML('beforeend', headTags(meta));
  }, [pathname]);
  return null;
}
