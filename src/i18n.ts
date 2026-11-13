/**
 * Language handling. English is the default; German pages live under /de/
 * (only the e-invoicing pages have German versions so far). The language of
 * a page comes from its address, so prerendered HTML and the browser always
 * agree.
 */
import { createContext, useContext } from 'react';

export type Lang = 'en' | 'de';

export const LangContext = createContext<Lang>('en');
export const useLang = () => useContext(LangContext);

export const langFromPath = (pathname: string): Lang => (/^\/de(\/|$)/.test(pathname) ? 'de' : 'en');

/** Pick the string for the current language. */
export const pick = <T,>(lang: Lang, v: { en: T; de: T }): T => v[lang];

/**
 * Pages that exist in both languages: English path → German path.
 * The SEO registry turns these into hreflang links; the header uses them for
 * the language switch and to keep German visitors on German pages.
 */
export const TRANSLATIONS: Record<string, string> = {
  '/e-invoicing/': '/de/e-rechnung/',
  '/compliance/': '/de/e-rechnungspflicht/',
  '/solutions/businesses/': '/de/e-rechnung-fuer-kmu/',
};

const DE_TO_EN = Object.fromEntries(Object.entries(TRANSLATIONS).map(([en, de]) => [de, en]));

const norm = (p: string) => (p.endsWith('/') ? p : `${p}/`);

/** The same page in the other language, if it exists. */
export function counterpart(pathname: string): { lang: Lang; path: string } | null {
  const p = norm(pathname);
  if (TRANSLATIONS[p]) return { lang: 'de', path: TRANSLATIONS[p] };
  if (DE_TO_EN[p]) return { lang: 'en', path: DE_TO_EN[p] };
  return null;
}

/** For German visitors, point internal links at the German page when one exists. */
export function localizedPath(to: string, lang: Lang): string {
  if (lang !== 'de' || /^[a-z]+:/i.test(to)) return to;
  const [path, rest = ''] = to.split(/(?=[?#])/);
  const de = TRANSLATIONS[norm(path)];
  return de ? de + rest : to;
}

export const DE_HOME = '/de/e-rechnung/';
