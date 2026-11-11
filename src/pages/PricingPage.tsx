import { Fragment, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Minus, Plus } from 'lucide-react';
import { BrowserFrame, ButtonLink, CtaPanel, Ratings, SCREENS, SectionHeader, usePageTitle } from '../components/ui';
import { LINKS } from '../config';

type Billing = 'monthly' | 'annual';

/** Annual saves 19% — €9 → €7.29 and €19 → €15.39 per month. */
const PLANS = [
  {
    name: 'Free',
    desc: 'For testing the waters before your first paid customer.',
    price: { monthly: 0, annual: 0 },
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
    desc: 'For a SaaS scaling past its first few hundred customers.',
    price: { monthly: 9, annual: 7.29 },
    popular: true,
    cta: { label: 'Start Free Trial', to: LINKS.trial },
    features: [
      'Up to 500 active subscriptions',
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
    desc: 'For platforms that have outgrown subscriber limits entirely.',
    price: { monthly: 19, annual: 15.39 },
    cta: { label: 'Talk to Sales', to: LINKS.sales },
    features: [
      'Unlimited active subscriptions',
      'Multiple payment gateways',
      'Tax, invoicing & sales integrations',
      'Smart dunning management',
      'REST API & webhooks',
      'Custom domain',
      'Dedicated support',
    ],
  },
];

const formatPrice = (n: number) => (Number.isInteger(n) ? `€${n}` : `€${n.toFixed(2)}`);

function BillingToggle({ value, onChange }: { value: Billing; onChange: (b: Billing) => void }) {
  const annual = value === 'annual';
  return (
    <div className="mt-10 flex items-center justify-center gap-3.5 text-[0.9375rem] font-medium">
      <span className={annual ? 'text-body' : 'text-fg'}>Monthly</span>
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        aria-label="Bill annually"
        onClick={() => onChange(annual ? 'monthly' : 'annual')}
        className={`relative h-8 w-14 rounded-full transition-colors ${annual ? 'bg-mint' : 'bg-line'}`}
      >
        <span
          className={`absolute top-1 h-6 w-6 rounded-full bg-canvas transition-all ${annual ? 'left-7' : 'left-1'}`}
        />
      </button>
      <span className={annual ? 'text-fg' : 'text-body'}>Annual</span>
      <span className="rounded-full bg-amber-bg px-3 py-1 text-sm text-amber">Save 19%</span>
    </div>
  );
}

function PlanCard({ plan, billing }: { plan: (typeof PLANS)[number]; billing: Billing }) {
  const price = plan.price[billing];
  const suffix = price === 0 ? 'Free forever' : billing === 'annual' ? 'per month, billed yearly' : 'per month';
  return (
    <article
      className={`relative flex flex-col rounded-2xl p-8 ${
        plan.popular
          ? 'border border-amber/80 bg-surface shadow-[0_0_0_1px_var(--color-amber),0_30px_60px_-30px_rgba(217,168,87,0.35)]'
          : 'card'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">{plan.name}</h2>
        {plan.popular && (
          <span className="rounded-full bg-amber px-2.5 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-[#2a1d05]">
            Most popular
          </span>
        )}
      </div>
      <p className="mt-2 min-h-[3.25rem] text-[0.9375rem] leading-relaxed">{plan.desc}</p>
      <div className="mt-6">
        <p className="font-display text-5xl tabular-nums text-fg">{formatPrice(price)}</p>
        <p className="mt-2 text-sm text-muted">{suffix}</p>
      </div>
      <ButtonLink
        to={plan.cta.to}
        variant={plan.popular ? 'primary' : 'ghost'}
        size="md"
        className="mt-7 w-full"
      >
        {plan.cta.label}
      </ButtonLink>
      <ul className="mt-8 space-y-3.5 border-t border-line pt-7 text-[0.9375rem]">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-fg/90">
            <Check size={17} className="mt-[3px] shrink-0 text-mint" />
            {f}
          </li>
        ))}
      </ul>
    </article>
  );
}

/* ---------------- Comparison ---------------- */

type Cell = boolean | string;
const COMPARISON: { group: string; rows: [string, Cell, Cell, Cell][] }[] = [
  { group: 'Subscribers', rows: [['Active subscriptions', '25', '500', 'Unlimited']] },
  {
    group: 'Security',
    rows: [
      ['2FA authentication', true, true, true],
      ['Secure checkout', true, true, true],
    ],
  },
  {
    group: 'Billing',
    rows: [
      ['Hybrid billing (one-off + recurring)', true, true, true],
      ['Customer import & customer portal', true, true, true],
      ['Automated invoices', true, true, true],
      ['Custom domain & brand control', false, true, true],
    ],
  },
  { group: 'Discounts', rows: [['Coupons & discounts', false, false, true]] },
  {
    group: 'Tax',
    rows: [
      ['EU VAT validation', true, true, true],
      ['Inclusive/exclusive tax, multiple tax profiles', true, true, true],
      ['Global tax, US sales tax & Avalara', true, true, true],
    ],
  },
  {
    group: 'Payments',
    rows: [
      ['Multiple payment gateways', true, true, true],
      ['Payment links & embeddable checkout', true, true, true],
      ['Dunning & refund management', true, true, true],
    ],
  },
  { group: 'Support', rows: [['Support level', 'Email & chat', 'Email & chat', 'Dedicated']] },
];

function CellValue({ v }: { v: Cell }) {
  if (v === true)
    return (
      <span className="inline-block h-2 w-2 rounded-full bg-mint" role="img" aria-label="Included" />
    );
  if (v === false) return <Minus size={14} className="inline text-faint" aria-label="Not included" />;
  return <span className="font-mono text-fg">{v}</span>;
}

function Comparison() {
  return (
    <section className="container-x py-24 sm:py-28">
      <SectionHeader title="Here's how the plans compare" />
      <div className="mx-auto mt-12 max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line font-mono text-sm uppercase tracking-[0.15em] text-muted">
              <th scope="col" className="py-5 pl-4 font-medium">Feature</th>
              <th scope="col" className="w-[16%] py-5 text-center font-medium">Free</th>
              <th scope="col" className="w-[16%] py-5 text-center font-medium">Professional</th>
              <th scope="col" className="w-[16%] py-5 text-center font-medium">Advanced</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((g) => (
              <Fragment key={g.group}>
                <tr className="border-b border-line">
                  <th scope="rowgroup" colSpan={4} className="pb-4 pl-4 pt-8 text-lg font-semibold text-fg">
                    {g.group}
                  </th>
                </tr>
                {g.rows.map(([label, ...cells]) => (
                  <tr key={label} className="border-b border-line-soft">
                    <th scope="row" className="py-5 pl-4 text-[1.0625rem] font-normal text-fg/90">
                      {label}
                    </th>
                    {cells.map((c, i) => (
                      <td key={i} className="py-5 text-center">
                        <CellValue v={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-10 text-center text-lg">
        Need something outside these tiers?{' '}
        <Link to={LINKS.sales} className="link-mint">
          Contact sales for special pricing →
        </Link>
      </p>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQ = [
  {
    q: 'How is pricing calculated?',
    a: 'By default, pricing is revenue-based — a percentage of what you process. Invoice-based pricing is available on request if your team prefers a flat fee instead.',
  },
  { q: 'Is there a setup fee?', a: 'No. There is no setup or onboarding fee on any tier — you only pay for the plan you choose.' },
  {
    q: 'Am I locked into a contract?',
    a: 'No. Every tier is month-to-month. Annual billing is optional and simply gives you the 19% discount.',
  },
  {
    q: 'What if I process more than €100k a month?',
    a: 'A 250k/month package is available at €499/month. Talk to sales and we will size it to your volume.',
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

function FaqItem({ q, a, defaultOpen }: { q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold text-fg"
        >
          {q}
          {open ? <Minus size={18} className="shrink-0 text-muted" /> : <Plus size={18} className="shrink-0 text-muted" />}
        </button>
      </h3>
      <div id={id} hidden={!open} className="-mt-1 pb-7 text-lg leading-relaxed">
        {a}
      </div>
    </div>
  );
}

function Faq() {
  return (
    <section className="container-x pb-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title="Pricing questions, answered plainly" />
        <div className="mt-10">
          {FAQ.map((f, i) => (
            <FaqItem key={f.q} {...f} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  usePageTitle('Pricing');
  const [billing, setBilling] = useState<Billing>('annual');

  return (
    <>
      <section className="container-x pt-16 text-center sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="Pricing"
          title="Clear plans for every stage, with simple, predictable pricing."
          lead="Start free, no card required. Month-to-month on every tier — no long-term contract, no setup fee, cancel anytime."
        />
        <BillingToggle value={billing} onChange={setBilling} />
      </section>

      <section className="container-x grid gap-6 py-14 sm:py-16 lg:grid-cols-3">
        {PLANS.map((p) => (
          <PlanCard key={p.name} plan={p} billing={billing} />
        ))}
      </section>

      <p className="container-x pb-16 text-center text-[0.9375rem] text-muted">
        Processing over €100k a month? A 250k/month package is available at €499/month —{' '}
        <Link to={LINKS.sales} className="link-mint">
          contact sales
        </Link>
        .
      </p>

      <Ratings />

      <section className="container-x pt-20 sm:pt-24">
        <BrowserFrame
          src={SCREENS.billing}
          alt="The Billing page: subscription control center with MRR, active accounts and failed subscriptions"
          className="mx-auto max-w-[1180px]"
        />
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
          The real billing page — every tier, not just Advanced
        </p>
      </section>

      <Comparison />
      <Faq />

      <CtaPanel
        eyebrow="Still deciding"
        title="Try it on your own plans before you commit."
        subtitle="Every tier starts with a free trial — no card required."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Talk to Sales', to: LINKS.sales }}
        caption="Talk to sales reaches a person, same day."
      />
    </>
  );
}
