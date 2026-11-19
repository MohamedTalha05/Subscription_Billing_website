import { COMBINED_PRICING, LINKS } from '../config';

/** How e-invoicing appears in each plan's feature list, depending on the pricing model. */
const E_INVOICING_LINES = COMBINED_PRICING
  ? ['E-invoicing: XRechnung & ZUGFeRD', 'Tax & sales integrations']
  : ['Tax, e-invoicing & sales integrations'];

/**
 * Subscription Billing plans (e-invoicing is included when COMBINED_PRICING is on). Shared by the pricing page and the structured
 * data (JSON-LD) so search engines and AI assistants see the same prices as
 * visitors do.
 *
 * Annual billing is "2 months free": the yearly price is 10 × the monthly price
 * (€9 → €90 a year, €19 → €190 a year). The product app must charge the same amounts.
 */
export type Plan = {
  name: string;
  desc: string;
  /** monthly: price per month on monthly billing. annual: total per year on annual billing. */
  price: { monthly: number; annual: number };
  limit: string;
  popular?: boolean;
  cta: { label: string; to: string };
  features: string[];
};

export const PLANS: Plan[] = [
  {
    name: 'Free',
    desc: 'For testing the waters before your first paid customer.',
    price: { monthly: 0, annual: 0 },
    limit: 'Up to 25 active subscriptions',
    cta: { label: 'Get Started Free', to: LINKS.trial },
    features: [
      'Up to 25 active subscriptions',
      'Multiple payment gateways',
      ...E_INVOICING_LINES,
      'Dunning management',
      'Email & chat support',
    ],
  },
  {
    name: 'Professional',
    desc: 'For a SaaS growing past its first paying customers.',
    price: { monthly: 9, annual: 90 },
    limit: 'Up to 100 active subscriptions',
    popular: true,
    cta: { label: 'Start Free Trial', to: LINKS.trial },
    features: [
      'Up to 100 active subscriptions',
      'Multiple payment gateways',
      ...E_INVOICING_LINES,
      'Accounting software integration',
      'Smart dunning management',
      'Email & chat support',
    ],
  },
  {
    name: 'Advanced',
    desc: 'For platforms managing a larger subscriber base.',
    price: { monthly: 19, annual: 190 },
    limit: 'Up to 250 active subscriptions',
    cta: { label: 'Start Free Trial', to: LINKS.trial },
    features: [
      'Up to 250 active subscriptions',
      'Multiple payment gateways',
      ...E_INVOICING_LINES,
      'Accounting software integration',
      'Smart dunning management',
      'REST API & webhooks',
      'Custom domain',
      'Dedicated support',
    ],
  },
];
