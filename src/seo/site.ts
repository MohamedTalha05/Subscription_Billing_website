/**
 * Site identity used for SEO, structured data and the AI-crawler files.
 *
 * SITE_URL is the production origin (no trailing slash). The site deploys to
 * GitHub Pages under the custom domain in public/CNAME. Override per
 * environment with VITE_SITE_URL in `.env`.
 */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://subscriptionbilling.eu').replace(/\/+$/, '');

export const SITE = {
  name: 'Subscription Billing',
  /** Full entity name. Use it consistently so search engines and AI assistants connect every mention to one product. */
  fullName: 'Subscription Billing by MYFUNDBOX',
  tagline: 'Subscription billing for SaaS, built compliant from the first invoice.',
  summary:
    'Subscription Billing by MYFUNDBOX is a billing platform for SaaS and subscription businesses with two products. Subscription Billing combines plans, pay links, dunning, payment-gateway payouts, revenue analytics and EU compliance tooling (GDPR data rights, PSD2 Strong Customer Authentication testing and real-time EU VAT validation). E-Invoicing creates, validates and generates German XRechnung and ZUGFeRD e-invoices and hands them to accounting software such as Lexware Office, DATEV and sevdesk.',
  language: 'en',
  locale: 'en_US',
  logo: '/logo.png',
  /** Default 1200×630 social preview image; pages can set their own (see OG_IMAGES in routes.ts). */
  ogImage: '/og/default.png',
  company: {
    legalName: 'MYFUNDBOX GmbH',
    street: 'Schiller40 Coworking Space, Porschestraße 2c',
    postalCode: '38440',
    city: 'Wolfsburg',
    country: 'DE',
  },
} as const;

/**
 * Every page lives at a directory URL with a trailing slash (e.g. /pricing/),
 * because GitHub Pages serves /pricing/ from pricing/index.html directly and
 * answers /pricing with a redirect. Canonical links, the sitemap and internal
 * links all use the trailing-slash form so crawlers never hit a redirect.
 */
export function absoluteUrl(path: string): string {
  return SITE_URL + (path.startsWith('/') ? path : `/${path}`);
}
