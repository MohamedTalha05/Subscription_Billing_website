import type { Faq } from './pricingFaq';

/** Top questions shown on the home page and published as FAQPage structured data. */
export const HOME_FAQ: Faq[] = [
  {
    q: 'What is Subscription Billing by MYFUNDBOX?',
    a: 'Subscription Billing by MYFUNDBOX is a billing platform for SaaS and subscription businesses. Subscription Billing runs plans, pay links, dunning, payouts and EU compliance tooling, and its E-Invoicing product creates German XRechnung and ZUGFeRD e-invoices.',
  },
  {
    q: 'Do I need e-invoicing if I sell subscriptions in Germany?',
    a: 'If you invoice other businesses in Germany, yes. You must already be able to receive e-invoices; issuing them becomes mandatory from 1 January 2027 for businesses above €800,000 revenue and from 1 January 2028 for everyone else. Subscription renewals are invoices too.',
  },
  {
    q: 'Can I keep my payment gateway?',
    a: 'Yes. Subscription Billing connects Stripe, PayPal, GoCardless and Mollie, so you keep your existing merchant account and reconcile all payouts in one ledger.',
  },
  {
    q: 'Does E-Invoicing replace my accounting software?',
    a: 'No. E-Invoicing creates, validates and generates e-invoices and hands them to Lexware Office, DATEV or sevdesk. Bookkeeping and tax processes stay in your accounting software.',
  },
  {
    q: 'How much does it cost?',
    a: 'Subscription Billing is free for up to 25 active subscriptions, then €9 or €19 a month. E-Invoicing is free for 5 e-invoices a month, then €9 or €24 a month. Prices exclude VAT, with no setup fee.',
  },
];
