import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import { BrowserFrame, ButtonLink, CtaPanel, SCREENS, SectionHeader } from '../components/ui';
import { LINKS } from '../config';
import { PLANS, type Plan } from '../content/plans';
import { PRICING_FAQ } from '../content/pricingFaq';
import { FaqList } from '../components/einvoicing';

type Billing = 'monthly' | 'annual';

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

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
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
        <h3 className="text-xl font-semibold">{plan.name}</h3>
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
  { group: 'Subscribers', rows: [['Active subscriptions', '25', '100', '250']] },
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
      ['Custom domain & brand control', false, false, true],
    ],
  },
  {
    group: 'E-invoicing',
    rows: [
      ['XRechnung & ZUGFeRD e-invoices', true, true, true],
      ['EN 16931 validation', true, true, true],
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
      ['Smart dunning', false, true, true],
    ],
  },
  {
    group: 'Integrations',
    rows: [
      ['Accounting software integration', false, true, true],
      ['REST API & webhooks', false, false, true],
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
      <SectionHeader title="Compare Subscription Billing plans" />
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

/** Answers live in the HTML (native disclosure); the same lists feed the FAQPage structured data. */
function Faq() {
  return (
    <section className="container-x pb-12" aria-labelledby="pricing-faq">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={<span id="pricing-faq">Pricing questions, answered plainly</span>} />
        <div className="mt-12">
          <FaqList items={PRICING_FAQ} />
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual');

  return (
    <>
      <section className="container-x pt-16 text-center sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="Pricing"
          title="Simple, predictable pricing for billing and e-invoicing."
          lead="Start free, no card required. E-invoicing is included in every plan, month-to-month, with no setup fee and no long-term contract."
        />
        {/* Older links point at /pricing/#billing and /pricing/#e-invoicing; both now land on the one set of plans. */}
        <span id="billing" aria-hidden="true" />
        <span id="e-invoicing" aria-hidden="true" />
      </section>

      <h2 className="sr-only">Subscription Billing plans</h2>
      <div className="container-x text-center">
        <BillingToggle value={billing} onChange={setBilling} />
      </div>
      <section className="container-x grid gap-6 py-14 sm:py-16 lg:grid-cols-3" aria-label="Subscription Billing plans">
        {PLANS.map((p) => (
          <PlanCard key={p.name} plan={p} billing={billing} />
        ))}
      </section>
      <section className="container-x pt-8 sm:pt-12">
        <BrowserFrame
          src={SCREENS.billing}
          alt="The Billing page: subscription control center with MRR, active accounts and failed subscriptions"
          className="mx-auto max-w-[1180px]"
        />
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
          The real billing page, on every tier, not just Advanced
        </p>
      </section>
      <Comparison />

      <div className="border-t border-line pt-20 sm:pt-24">
        <Faq />
      </div>

      <CtaPanel
        eyebrow="Still deciding"
        title="Try it on your own plans before you commit."
        subtitle="Every plan starts free, with no card required."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Talk to Sales', to: LINKS.sales }}
      />
    </>
  );
}
