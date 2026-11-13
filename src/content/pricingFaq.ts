/**
 * Pricing questions. Rendered on the pricing page and published as FAQPage
 * structured data, so the visible answer and the machine-readable answer
 * never drift apart. Keep answers self-contained: AI assistants often quote
 * a single answer without the question around it.
 */
export type Faq = { q: string; a: string };

export const PRICING_FAQ: Faq[] = [
  {
    q: 'How is Subscription Billing priced?',
    a: 'Subscription Billing is priced in flat monthly tiers based on how many active subscriptions you manage: Free covers up to 25, Professional (€9 a month) covers up to 100, and Advanced (€19 a month) covers up to 250. You never pay a percentage of the revenue you process.',
  },
  {
    q: 'Is there a setup fee?',
    a: 'No. There is no setup or onboarding fee on any Subscription Billing tier. You only pay for the plan you choose.',
  },
  {
    q: 'Am I locked into a contract?',
    a: 'No. Every Subscription Billing tier is month-to-month. Annual billing is optional and gives you a 19% discount.',
  },
  {
    q: 'What if I process more than €100k a month?',
    a: 'A 250k/month package is available at €499 a month. Talk to sales and we will size it to your volume.',
  },
  {
    q: 'Can I move over from Stripe Billing or Chargebee?',
    a: 'Yes. Keep your existing gateway and merchant account, import your plans and customers, and we can set up your first plan with you live on a call.',
  },
  {
    q: 'Do you support SEPA as well as cards?',
    a: 'Yes. SEPA direct debit, cards and wallets are supported through the gateways you connect, and dunning rules can be set per payment method.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel from your account settings; your plan stays active until the end of the current billing period.',
  },
  {
    q: "What's your refund policy?",
    a: 'Cancelling stops future charges, and the current billing period remains active until it ends. See Section 18 of our Terms & Conditions for full details, or contact us about a specific case.',
  },
];
