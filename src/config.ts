/**
 * Central place for outbound links, contact details and navigation.
 *
 * Sign-in and trial (sign-up) links point at the product app. They can be
 * overridden per environment with VITE_SIGN_IN_URL / VITE_TRIAL_URL in `.env`.
 *
 * Internal paths use the trailing-slash form ("/pricing/") that matches the
 * prerendered pages on GitHub Pages; see src/seo/site.ts.
 */
export const LINKS = {
  signIn: import.meta.env.VITE_SIGN_IN_URL || 'https://app.subscriptionbilling.eu/?app=1',
  trial: import.meta.env.VITE_TRIAL_URL || 'https://app.subscriptionbilling.eu/?app=1&signup=1',
  demo: '/contact/?intent=demo',
  sales: '/contact/?intent=sales',
  earlyAccess: '/contact/?intent=early-access',
  integration: '/contact/?intent=integration',
} as const;

/**
 * The public support address is kept out of robots' reach: it is stored in
 * two parts (so no "name@domain" string exists in the HTML or the JavaScript
 * bundle), shown in pages as "support [at] app [dot] subscriptionbilling [dot] eu",
 * and only assembled in the browser when a visitor clicks "Show email address".
 * It is deliberately left out of structured data, llms.txt and mailto: links.
 * See ProtectedEmail in src/components/ui.tsx.
 */
export const PUBLIC_EMAIL = { user: 'support', domain: ['app', 'subscriptionbilling', 'eu'] } as const;

/** Human-readable, robot-unfriendly form: "support [at] app [dot] subscriptionbilling [dot] eu". */
export const PUBLIC_EMAIL_TEXT = `${PUBLIC_EMAIL.user} [at] ${PUBLIC_EMAIL.domain.join(' [dot] ')}`;

export const CONTACT = {
  legalEmail: 'sales@myfundbox.com',
  company: 'MYFUNDBOX GmbH',
  address: 'Schiller40 Coworking Space, Porschestraße 2c, 38440 Wolfsburg, Germany',
} as const;

export type NavLinkItem = { to: string; label: string; desc?: string };
export type NavEntry = NavLinkItem | { label: string; items: NavLinkItem[] };

/**
 * The full planned navigation. Header and footer drop any link whose page
 * isn't in the SEO route registry yet, and hide a group that ends up empty,
 * so pages appear in the menus as they are built.
 */
export const NAV: NavEntry[] = [
  {
    label: 'Products',
    items: [
      { to: '/subscription-billing/', label: 'Subscription Billing', desc: 'Plans, pay links, dunning and payouts' },
      { to: '/e-invoicing/', label: 'E-Invoicing', desc: 'XRechnung and ZUGFeRD, validated before they go out' },
      { to: '/integrations/', label: 'Integrations', desc: 'Payment gateways and accounting software' },
    ],
  },
  {
    label: 'Solutions',
    items: [
      { to: '/solutions/saas/', label: 'For SaaS companies', desc: 'Billing and an e-invoice for every renewal' },
      { to: '/solutions/businesses/', label: 'For SMEs & service businesses', desc: 'Agencies, consultants, gyms and clubs' },
    ],
  },
  { to: '/pricing/', label: 'Pricing' },
  {
    label: 'Resources',
    items: [
      { to: '/compliance/', label: 'E-invoicing mandate', desc: 'Who must do what, and when (2025–2028)' },
      { to: '/resources/', label: 'Guides', desc: 'XRechnung, ZUGFeRD and EN 16931 explained' },
      { to: '/faq/', label: 'FAQ', desc: 'Billing, e-invoicing and pricing questions' },
      { to: '/security/', label: 'Security & compliance', desc: 'GDPR, PSD2 and how we protect data' },
    ],
  },
];

export const FOOTER_COLUMNS: { title: string; links: NavLinkItem[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Subscription Billing', to: '/subscription-billing/' },
      { label: 'E-Invoicing', to: '/e-invoicing/' },
      { label: 'Integrations', to: '/integrations/' },
      { label: 'Pricing', to: '/pricing/' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'For SaaS companies', to: '/solutions/saas/' },
      { label: 'For SMEs & service businesses', to: '/solutions/businesses/' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'E-invoicing mandate', to: '/compliance/' },
      { label: 'Guides', to: '/resources/' },
      { label: 'FAQ', to: '/faq/' },
      { label: 'Security & Compliance', to: '/security/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about/' },
      { label: 'Contact', to: '/contact/' },
      { label: 'Book a Demo', to: LINKS.demo },
      { label: 'Sign In', to: LINKS.signIn },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Impressum', to: '/impressum/' },
      { label: 'Terms & Conditions', to: '/terms/' },
      { label: 'Privacy Policy', to: '/privacy/' },
      { label: 'Cookie Policy', to: '/cookies/' },
    ],
  },
];

/**
 * German labels for the header and footer, keyed by the English label.
 * Links still point at English pages unless a German version exists
 * (see TRANSLATIONS in src/i18n.ts).
 */
export const NAV_DE: Record<string, { label: string; desc?: string }> = {
  Products: { label: 'Produkte' },
  Solutions: { label: 'Lösungen' },
  Resources: { label: 'Ressourcen' },
  Company: { label: 'Unternehmen' },
  Legal: { label: 'Rechtliches' },
  'Subscription Billing': { label: 'Subscription Billing', desc: 'Tarife, Zahlungslinks, Mahnwesen und Auszahlungen' },
  'E-Invoicing': { label: 'E-Rechnung', desc: 'XRechnung und ZUGFeRD, vor dem Versand geprüft' },
  Integrations: { label: 'Integrationen', desc: 'Zahlungsanbieter und Buchhaltungssoftware' },
  'For SaaS companies': { label: 'Für SaaS-Unternehmen', desc: 'Abrechnung und eine E-Rechnung für jede Verlängerung' },
  'For SMEs & service businesses': { label: 'Für KMU & Dienstleister', desc: 'Agenturen, Berater, Studios und Vereine' },
  Pricing: { label: 'Preise' },
  'E-invoicing mandate': { label: 'E-Rechnungspflicht', desc: 'Wer muss was bis wann? (2025–2028)' },
  Guides: { label: 'Leitfäden', desc: 'XRechnung, ZUGFeRD und EN 16931 erklärt' },
  FAQ: { label: 'FAQ', desc: 'Fragen zu Abrechnung, E-Rechnung und Preisen' },
  'Security & compliance': { label: 'Sicherheit & Compliance', desc: 'DSGVO, PSD2 und Datenschutz' },
  'Security & Compliance': { label: 'Sicherheit & Compliance' },
  About: { label: 'Über uns' },
  Contact: { label: 'Kontakt' },
  'Book a Demo': { label: 'Demo buchen' },
  'Sign In': { label: 'Anmelden' },
  Impressum: { label: 'Impressum' },
  'Terms & Conditions': { label: 'AGB' },
  'Privacy Policy': { label: 'Datenschutz' },
  'Cookie Policy': { label: 'Cookie-Richtlinie' },
};
