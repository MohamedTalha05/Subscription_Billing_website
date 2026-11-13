import { LINKS } from '../config';

/**
 * Subscription Billing plans. Shared by the pricing page and the structured
 * data (JSON-LD) so search engines and AI assistants see the same prices as
 * visitors do.
 *
 * Annual billing saves 19%: €9 → €7.29 and €19 → €15.39 per month.
 */
export type Plan = {
  name: string;
  desc: string;
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
      'Tax, invoicing & sales integrations',
      'Smart dunning management',
      'REST API & webhooks',
      'Email & chat support',
    ],
  },
  {
    name: 'Professional',
    desc: 'For a SaaS growing past its first paying customers.',
    price: { monthly: 9, annual: 7.29 },
    limit: 'Up to 100 active subscriptions',
    popular: true,
    cta: { label: 'Start Free Trial', to: LINKS.trial },
    features: [
      'Up to 100 active subscriptions',
      'Multiple payment gateways',
      'Tax, invoicing & sales integrations',
      'Smart dunning management',
      'REST API & webhooks',
      'Custom domain',
      'Email & chat support',
    ],
  },
  {
    name: 'Advanced',
    desc: 'For platforms managing a larger subscriber base.',
    price: { monthly: 19, annual: 15.39 },
    limit: 'Up to 250 active subscriptions',
    cta: { label: 'Try Free', to: LINKS.trial },
    features: [
      'Up to 250 active subscriptions',
      'Multiple payment gateways',
      'Tax, invoicing & sales integrations',
      'Smart dunning management',
      'REST API & webhooks',
      'Custom domain',
      'Dedicated support',
    ],
  },
];

export const HIGH_VOLUME = {
  label: 'Processing over €100k a month',
  price: 499,
  desc: 'A 250k/month package is available at €499/month.',
};
