/**
 * The FAQ page: every question on the site, grouped by topic, with
 * duplicates removed. Built from the per-page lists so an answer edited in
 * one place changes everywhere.
 */
import { COMPLIANCE_FAQ, EINVOICING_FAQ, EINVOICING_PRICING_FAQ } from './eInvoicing';
import { HOME_FAQ } from './homeFaq';
import { PRICING_FAQ, type Faq } from './pricingFaq';

const SECURITY_FAQ: Faq[] = [
  {
    q: 'Is Subscription Billing GDPR compliant?',
    a: 'Subscription Billing and E-Invoicing are built on GDPR principles such as data minimisation, role-based access and tenant separation, and support access, portability and erasure requests. For a data processing agreement (AVV), contact us. Details are on the Security & Compliance page.',
  },
  {
    q: 'Do you store card numbers?',
    a: 'No. Card details stay with your payment gateway (Stripe, PayPal, GoCardless or Mollie). Subscription Billing stores only the token and the last four digits it needs to show you.',
  },
  {
    q: 'Who can see my invoice data?',
    a: 'Only people in your organization, according to their role: owners, accountants and viewers each see and do only what their role allows. Every invoice action and sign-in is recorded in the audit log.',
  },
];

const byQ = (list: Faq[], q: string) => {
  const f = list.find((x) => x.q === q);
  if (!f) throw new Error(`FAQ not found: ${q}`);
  return f;
};

export type FaqCategory = { id: string; title: string; items: Faq[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'basics',
    title: 'E-invoicing basics',
    items: [
      ...EINVOICING_FAQ.slice(0, 5),
      byQ(COMPLIANCE_FAQ, 'What is the difference between XRechnung and ZUGFeRD?'),
      byQ(COMPLIANCE_FAQ, 'What is a Leitweg-ID?'),
    ],
  },
  {
    id: 'mandate',
    title: 'Mandate & deadlines',
    items: [
      byQ(COMPLIANCE_FAQ, 'Do businesses in Germany already have to receive e-invoices?'),
      byQ(EINVOICING_FAQ, 'When do I have to issue e-invoices?'),
      byQ(EINVOICING_FAQ, 'Does the obligation apply to small businesses?'),
      byQ(HOME_FAQ, 'Do I need e-invoicing if I sell subscriptions in Germany?'),
    ],
  },
  {
    id: 'subscription-billing',
    title: 'Subscription Billing',
    items: [
      byQ(HOME_FAQ, 'What is Subscription Billing by MYFUNDBOX?'),
      byQ(HOME_FAQ, 'Can I keep my payment gateway?'),
      byQ(PRICING_FAQ, 'Can I move over from Stripe Billing or Chargebee?'),
      byQ(PRICING_FAQ, 'Do you support SEPA as well as cards?'),
    ],
  },
  {
    id: 'e-invoicing',
    title: 'E-Invoicing',
    items: EINVOICING_FAQ.slice(7),
  },
  {
    id: 'pricing',
    title: 'Pricing',
    items: [
      byQ(HOME_FAQ, 'How much does it cost?'),
      ...PRICING_FAQ.filter((f) => !['Can I move over from Stripe Billing or Chargebee?', 'Do you support SEPA as well as cards?'].includes(f.q)),
      ...EINVOICING_PRICING_FAQ,
    ],
  },
  { id: 'security', title: 'Security & GDPR', items: SECURITY_FAQ },
];

/** Every question once, for the FAQPage structured data. */
export const ALL_FAQ: Faq[] = (() => {
  const seen = new Set<string>();
  return FAQ_CATEGORIES.flatMap((c) => c.items).filter((f) => (seen.has(f.q) ? false : (seen.add(f.q), true)));
})();
