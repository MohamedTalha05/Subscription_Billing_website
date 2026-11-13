import { Logo } from './Logo';
import { ProtectedEmail, SmartLink } from './ui';
import { CONTACT, FOOTER_COLUMNS, NAV_DE } from '../config';
import { isLive } from '../seo/routes';
import { localizedPath, useLang } from '../i18n';

const COPY = {
  en: {
    blurb: `Subscription billing, e-invoicing, dunning, payouts and EU compliance tooling for SaaS and subscription businesses. A product of ${CONTACT.company}.`,
    tagline: 'Made for recurring revenue, built for Europe.',
  },
  de: {
    blurb: `Abo-Abrechnung, E-Rechnung, Mahnwesen, Auszahlungen und EU-Compliance für SaaS- und Abo-Unternehmen. Ein Produkt der ${CONTACT.company}.`,
    tagline: 'Gemacht für wiederkehrende Umsätze, gebaut für Europa.',
  },
};

const DE_LINKS = [
  { to: '/de/e-rechnung/', label: 'E-Rechnung' },
  { to: '/de/e-rechnungspflicht/', label: 'E-Rechnungspflicht' },
  { to: '/de/e-rechnung-fuer-kmu/', label: 'E-Rechnung für KMU' },
];

export function Footer() {
  const lang = useLang();
  const tr = (label: string) => (lang === 'de' ? NAV_DE[label]?.label ?? label : label);

  // Only link to pages that exist; a column with no live links is hidden.
  const columns = FOOTER_COLUMNS.map((c) => ({
    title: tr(c.title),
    links: c.links.filter((l) => isLive(l.to)).map((l) => ({ label: tr(l.label), to: localizedPath(l.to, lang) })),
  })).filter((c) => c.links.length > 0);

  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(5,1fr)] lg:gap-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-[19rem] text-[0.9375rem] leading-relaxed text-body">{COPY[lang].blurb}</p>
          <p className="mt-5 font-mono text-sm text-muted">
            <ProtectedEmail compact />
          </p>
        </div>
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <SmartLink to={l.to} className="text-[0.9375rem] text-body transition hover:text-fg">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-x">
        <div className="flex flex-col gap-3 border-t border-line py-8 text-sm text-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {CONTACT.company} · Subscription Billing
          </span>
          {lang === 'en' && (
            // Sitewide links to the German pages so crawlers and German readers find them from any page.
            <nav aria-label="Auf Deutsch" lang="de" className="flex flex-wrap gap-x-4 gap-y-1">
              <span>Auf Deutsch:</span>
              {DE_LINKS.filter((l) => isLive(l.to)).map((l) => (
                <SmartLink key={l.to} to={l.to} hrefLang="de" className="underline-offset-2 transition hover:text-fg hover:underline">
                  {l.label}
                </SmartLink>
              ))}
            </nav>
          )}
          <span>{COPY[lang].tagline}</span>
        </div>
      </div>
    </footer>
  );
}
