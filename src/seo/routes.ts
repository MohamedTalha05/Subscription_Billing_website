/**
 * One registry for every public page: its address, title, description,
 * structured data and how it is listed for search engines and AI assistants.
 *
 * The build-time prerenderer, the sitemap, robots.txt, llms.txt and the
 * in-browser head updates all read from this list, so a page added here is
 * picked up everywhere. The header and footer only show links to paths that
 * exist here, so navigation never points at a page that hasn't been built.
 */
import { PRICING_FAQ } from '../content/pricingFaq';
import { COMPLIANCE_FAQ, EINVOICING_FAQ, EINVOICING_PRICING_FAQ, MANDATE_REVIEWED } from '../content/eInvoicing';
import { HOME_FAQ } from '../content/homeFaq';
import { DE_CONTENT } from '../content/eInvoicing.de';
import { TRANSLATIONS, type Lang } from '../i18n';
import { ALL_FAQ } from '../content/faq';
import { GUIDES, guidePath } from '../content/guides';
import {
  article,
  breadcrumbs,
  itemList,
  eInvoicingProduct,
  faqPage,
  organization,
  subscriptionBillingProduct,
  webPage,
  website,
} from './schema';

export type LlmsGroup = 'Products' | 'Solutions' | 'Pricing' | 'Guides' | 'Trust & compliance' | 'Company' | 'Legal' | 'Deutsch';

export type RouteMeta = {
  /** Directory-style path with a trailing slash, e.g. "/pricing/". Home is "/". */
  path: string;
  /** Full <title>. Keep under ~60 characters. */
  title: string;
  /** Meta description. Keep under ~160 characters and lead with the answer. */
  description: string;
  /** Short name for breadcrumbs and llms.txt. */
  name: string;
  /** Group in llms.txt; omit to leave the page out of llms.txt. */
  llms?: LlmsGroup;
  changefreq?: 'weekly' | 'monthly' | 'yearly';
  priority?: number;
  noindex?: boolean;
  /** Extra JSON-LD nodes for this page (organization, website, webpage and breadcrumbs are added automatically). */
  schema?: () => Record<string, unknown>[];
  /** Schema.org type of the page itself. */
  pageType?: string;
  /** ISO date the facts on this page were last checked; published as lastReviewed / dateModified. */
  reviewed?: string;
  /** Parent page for breadcrumbs (Home › parent › page). */
  parent?: { name: string; path: string };
  /** Page language; English when omitted. */
  lang?: Lang;
  /** Same page in each language, for hreflang links. Set automatically from TRANSLATIONS. */
  alternates?: Partial<Record<Lang, string>>;
  /** 1200×630 social preview image (path under public/). Defaults to the site image. */
  ogImage?: string;
};

export const SITE_ROUTES: RouteMeta[] = [
  {
    path: '/',
    name: 'Home',
    title: 'Subscription Billing & German E-Invoicing | MYFUNDBOX',
    description:
      'Recurring billing, dunning and payouts plus XRechnung and ZUGFeRD e-invoicing in one platform. Subscription Billing by MYFUNDBOX, built compliant.',
    llms: 'Products',
    changefreq: 'weekly',
    priority: 1,
    schema: () => [subscriptionBillingProduct(), eInvoicingProduct(), faqPage('/', HOME_FAQ)],
  },
  {
    path: '/subscription-billing/',
    name: 'Subscription Billing',
    title: 'Subscription Billing Features: Plans, Dunning, Payouts',
    description:
      'Flat and tiered plans, pay links, smart dunning, Stripe, PayPal, GoCardless and Mollie in one ledger, revenue analytics and GDPR tooling for SaaS.',
    llms: 'Products',
    changefreq: 'monthly',
    priority: 0.9,
    schema: () => [subscriptionBillingProduct()],
  },
  {
    path: '/e-invoicing/',
    name: 'E-Invoicing',
    title: 'E-Invoicing Software for Germany: XRechnung & ZUGFeRD',
    description:
      'Create, validate and generate XRechnung and ZUGFeRD e-invoices and send them to Lexware Office, DATEV or sevdesk. Free for 5 e-invoices a month.',
    llms: 'Products',
    changefreq: 'monthly',
    priority: 0.9,
    schema: () => [eInvoicingProduct(), faqPage('/e-invoicing/', EINVOICING_FAQ)],
  },
  {
    path: '/compliance/',
    name: 'E-invoicing mandate',
    title: 'German E-Invoicing Mandate 2025–2028: Deadlines & Rules',
    description:
      'Who must issue e-invoices in Germany and when: receiving since 2025, issuing from 2027 above €800,000 revenue, all businesses from 2028. Formats explained.',
    llms: 'Trust & compliance',
    changefreq: 'monthly',
    priority: 0.8,
    reviewed: MANDATE_REVIEWED,
    schema: () => [faqPage('/compliance/', COMPLIANCE_FAQ)],
  },
  {
    path: '/pricing/',
    name: 'Pricing',
    title: 'Pricing: Subscription Billing & E-Invoicing Plans',
    description:
      'Subscription Billing: free for 25 subscriptions, then €9 or €19 a month. E-Invoicing: 5 free e-invoices a month, then €9 or €24. No setup fee.',
    llms: 'Pricing',
    changefreq: 'monthly',
    priority: 0.9,
    schema: () => [
      subscriptionBillingProduct(),
      eInvoicingProduct(),
      faqPage('/pricing/', [...PRICING_FAQ, ...EINVOICING_PRICING_FAQ]),
    ],
  },
  {
    path: '/integrations/',
    name: 'Integrations',
    title: 'Integrations: Stripe, PayPal, Lexware Office, DATEV, sevdesk',
    description:
      'Payment gateways for Subscription Billing (Stripe, PayPal, GoCardless, Mollie) and accounting software for E-Invoicing, each with its real status.',
    llms: 'Products',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/security/',
    name: 'Security & Compliance',
    title: 'Security & Compliance: GDPR, PSD2, EU VAT | Subscription Billing',
    description:
      'How we protect billing and invoice data: GDPR data rights, PSD2 SCA testing, real-time VIES VAT checks, e-invoice audit trails, encryption and access control.',
    llms: 'Trust & compliance',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/solutions/saas/',
    name: 'For SaaS companies',
    title: 'Subscription Billing & E-Invoicing for SaaS Companies',
    description:
      'Bill every subscription with smart dunning and multi-gateway payouts, and issue XRechnung or ZUGFeRD e-invoices to German business customers.',
    llms: 'Solutions',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/solutions/businesses/',
    name: 'For SMEs & service businesses',
    title: 'E-Invoicing for SMEs, Agencies and Freelancers in Germany',
    description:
      'A simple e-invoicing workspace for German SMEs and service businesses: create, check and send XRechnung and ZUGFeRD without new accounting software.',
    llms: 'Solutions',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/faq/',
    name: 'FAQ',
    title: 'FAQ: E-Invoicing Mandate, XRechnung & Pricing',
    description:
      'Answers on the German e-invoicing mandate, XRechnung, ZUGFeRD and EN 16931, Subscription Billing, E-Invoicing, pricing and data protection.',
    llms: 'Guides',
    changefreq: 'monthly',
    priority: 0.7,
    schema: () => [faqPage('/faq/', ALL_FAQ)],
  },
  {
    path: '/resources/',
    name: 'Guides',
    title: 'E-Invoicing Guides: XRechnung, ZUGFeRD, EN 16931',
    description:
      'Practical guides to German e-invoicing: what counts as an e-invoice, XRechnung vs ZUGFeRD, the 2027 deadline and preparing your SaaS.',
    llms: 'Guides',
    changefreq: 'weekly',
    priority: 0.7,
    pageType: 'CollectionPage',
    schema: () => [itemList('E-invoicing guides', GUIDES.map((g) => ({ name: g.title, path: guidePath(g.slug) })))],
  },
  ...GUIDES.map(
    (g): RouteMeta => ({
      path: guidePath(g.slug),
      name: g.title,
      // Long titles drop the suffix so the whole title fits in search results (~60 characters).
      title: g.title.length + 23 <= 60 ? `${g.title} | Subscription Billing` : g.title,
      description: g.description,
      llms: 'Guides',
      changefreq: 'monthly',
      priority: 0.6,
      reviewed: g.reviewed,
      parent: { name: 'Guides', path: '/resources/' },
      schema: () => [article(g)],
    }),
  ),
  {
    path: '/about/',
    name: 'About',
    title: 'About MYFUNDBOX | Subscription Billing',
    description:
      'MYFUNDBOX GmbH builds Subscription Billing and E-Invoicing in Wolfsburg, Germany: billing and e-invoicing infrastructure that works with your existing systems.',
    llms: 'Company',
    changefreq: 'yearly',
    priority: 0.5,
    pageType: 'AboutPage',
  },
  {
    path: '/contact/',
    name: 'Contact',
    title: 'Book a Demo or Contact Sales | Subscription Billing',
    description:
      'Talk to the MYFUNDBOX team: book a 20-minute demo, start a free trial or ask about volume pricing. A person replies within one business day.',
    llms: 'Company',
    changefreq: 'yearly',
    priority: 0.6,
    pageType: 'ContactPage',
  },
  {
    path: '/impressum/',
    name: 'Impressum',
    title: 'Impressum (Legal Notice) | Subscription Billing',
    description: 'Legal notice for Subscription Billing, operated by MYFUNDBOX GmbH, Wolfsburg, Germany.',
    llms: 'Legal',
    changefreq: 'yearly',
    priority: 0.2,
  },
  {
    path: '/terms/',
    name: 'Terms & Conditions',
    title: 'Terms & Conditions (AGB) | Subscription Billing',
    description: 'Terms and conditions for business customers using the Subscription Billing platform by MYFUNDBOX GmbH.',
    llms: 'Legal',
    changefreq: 'yearly',
    priority: 0.2,
  },
  {
    path: '/cookies/',
    name: 'Cookie Policy',
    title: 'Cookie Policy | Subscription Billing',
    description:
      'Cookies on the Subscription Billing website: none of its own, no tracking or advertising cookies and no third-party services. Fonts are served locally.',
    llms: 'Legal',
    changefreq: 'yearly',
    priority: 0.2,
  },
  {
    path: '/privacy/',
    name: 'Privacy Policy',
    title: 'Privacy Policy (Datenschutzerklärung) | Subscription Billing',
    description: 'How MYFUNDBOX GmbH processes personal data for the Subscription Billing website and platform under the GDPR.',
    llms: 'Legal',
    changefreq: 'yearly',
    priority: 0.2,
  },
];


/* ---------- German pages ---------- */

const DE_ROUTES: RouteMeta[] = [
  {
    path: '/de/e-rechnung/',
    name: 'E-Rechnung',
    title: 'E-Rechnung erstellen: XRechnung & ZUGFeRD | MYFUNDBOX',
    description:
      'E-Rechnungen erstellen, prüfen und als XRechnung oder ZUGFeRD erzeugen und an Lexware Office, DATEV oder sevdesk übertragen. Kostenlos für 5 im Monat.',
    lang: 'de',
    llms: 'Deutsch',
    changefreq: 'monthly',
    priority: 0.9,
    schema: () => [eInvoicingProduct(), faqPage('/de/e-rechnung/', DE_CONTENT.EINVOICING_FAQ)],
  },
  {
    path: '/de/e-rechnungspflicht/',
    name: 'E-Rechnungspflicht',
    title: 'E-Rechnungspflicht 2025, 2027, 2028: Fristen & Regeln',
    description:
      'Wer muss wann E-Rechnungen ausstellen? Empfang seit 2025, Ausstellung ab 2027 über 800.000 € Umsatz, ab 2028 für alle. XRechnung und ZUGFeRD erklärt.',
    lang: 'de',
    llms: 'Deutsch',
    changefreq: 'monthly',
    priority: 0.8,
    reviewed: MANDATE_REVIEWED,
    schema: () => [faqPage('/de/e-rechnungspflicht/', DE_CONTENT.COMPLIANCE_FAQ)],
  },
  {
    path: '/de/e-rechnung-fuer-kmu/',
    name: 'E-Rechnung für KMU',
    title: 'E-Rechnung für KMU, Agenturen und Selbstständige',
    description:
      'Der einfache E-Rechnungs-Arbeitsplatz für KMU, Agenturen, Berater und Dienstleister: XRechnung und ZUGFeRD ohne neue Buchhaltungssoftware.',
    lang: 'de',
    llms: 'Deutsch',
    changefreq: 'monthly',
    priority: 0.8,
  },
];

SITE_ROUTES.push(...DE_ROUTES);

// Social preview images (generated by scripts/og-images.mjs). Most specific prefix wins.
const OG_IMAGES: [string, string][] = [
  ['/de/', '/og/de-e-rechnung.png'],
  ['/e-invoicing/', '/og/e-invoicing.png'],
  ['/solutions/businesses/', '/og/e-invoicing.png'],
  ['/compliance/', '/og/mandate.png'],
  ['/resources/', '/og/mandate.png'],
  ['/subscription-billing/', '/og/subscription-billing.png'],
  ['/solutions/saas/', '/og/subscription-billing.png'],
];
for (const r of SITE_ROUTES) {
  r.ogImage ??= OG_IMAGES.find(([prefix]) => r.path.startsWith(prefix))?.[1];
}

// Link every translated pair both ways (hreflang).
for (const [en, de] of Object.entries(TRANSLATIONS)) {
  const enRoute = SITE_ROUTES.find((r) => r.path === en);
  const deRoute = SITE_ROUTES.find((r) => r.path === de);
  if (!enRoute || !deRoute) throw new Error(`Missing route for translation pair ${en} / ${de}`);
  enRoute.alternates = deRoute.alternates = { en, de };
}

export const NOT_FOUND: RouteMeta = {
  path: '/404/',
  name: 'Page not found',
  title: 'Page not found | Subscription Billing',
  description: 'The page you were looking for does not exist or has moved.',
  noindex: true,
};

/** Old addresses that now live elsewhere. The prerenderer writes a redirect page for each. */
export const REDIRECTS: Record<string, string> = {
  '/features/': '/subscription-billing/',
};

/** "/pricing", "/pricing/" and "/pricing/index.html" all normalise to "/pricing/". */
export function normalizePath(pathname: string): string {
  let p = pathname.replace(/index\.html$/, '');
  if (!p.startsWith('/')) p = `/${p}`;
  if (!p.endsWith('/')) p = `${p}/`;
  return p;
}

const BY_PATH = new Map(SITE_ROUTES.map((r) => [r.path, r]));

export function getRouteMeta(pathname: string): RouteMeta {
  return BY_PATH.get(normalizePath(pathname)) ?? NOT_FOUND;
}

/** True when a page exists at this path (query strings and hashes are ignored). */
export function isLive(to: string): boolean {
  if (/^[a-z]+:/i.test(to)) return true;
  return BY_PATH.has(normalizePath(to.split(/[?#]/)[0]));
}

/** The complete JSON-LD graph for a page. */
export function jsonLdGraph(meta: RouteMeta): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [
    organization(),
    website(),
    webPage(meta.path, meta.title, meta.description, meta.pageType, meta.reviewed, meta.lang ?? 'en'),
  ];
  if (meta.path !== '/' && !meta.noindex) {
    graph.push(
      breadcrumbs([
        { name: meta.lang === 'de' ? 'Startseite' : 'Home', path: '/' },
        ...(meta.parent ? [meta.parent] : []),
        { name: meta.name, path: meta.path },
      ]),
    );
  }
  if (meta.schema) graph.push(...meta.schema());
  return { '@context': 'https://schema.org', '@graph': graph };
}
