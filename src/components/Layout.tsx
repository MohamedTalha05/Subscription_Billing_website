import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SeoSync } from '../seo/SeoSync';
import { LangContext, langFromPath } from '../i18n';

/** Jump to the top on page change, but respect in-page anchors like /terms#s5. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  return (
    <LangContext.Provider value={lang}>
    <div className="flex min-h-screen flex-col overflow-x-clip bg-canvas">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-mint focus:px-4 focus:py-2 focus:text-mint-ink"
      >
        {lang === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}
      </a>
      <ScrollManager />
      <SeoSync />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
    </LangContext.Provider>
  );
}
