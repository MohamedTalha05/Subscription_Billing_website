import { Fragment, useEffect, useState, type KeyboardEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Check, Minus } from 'lucide-react';
import { BrowserFrame, ButtonLink, CtaPanel, SCREENS, SectionHeader } from '../components/ui';
import { LINKS } from '../config';
import { PLANS, type Plan } from '../content/plans';
import { PRICING_FAQ } from '../content/pricingFaq';
import { EInvoicingPlanCards, FaqList } from '../components/einvoicing';
import {
  EINVOICING_ENTERPRISE,
  EINVOICING_PRICING_FAQ,
  EINVOICING_PRICING_NOTE,
  EINVOICING_UNIT_COST,
  POSTAGE_COMPARISON,
} from '../content/eInvoicing';

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

/* ---------------- E-Invoicing panel ---------------- */

const euro2 = (n: number) => `€${n.toFixed(2)}`;

function EInvoicingPricing() {
  return (
    <>
      <EInvoicingPlanCards />
      <p className="mt-8 text-center text-[0.9375rem] text-muted">{EINVOICING_PRICING_NOTE}</p>

      <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h3 className="font-display text-2xl">What one e-invoice costs</h3>
          <p className="mt-3 leading-relaxed">
            When you use your plan’s full volume. {POSTAGE_COMPARISON}
          </p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[420px] border-collapse text-left">
              <caption className="sr-only">E-Invoicing cost per e-invoice by plan</caption>
              <thead>
                <tr className="bg-surface font-mono text-xs uppercase tracking-[0.14em] text-muted">
                  <th scope="col" className="px-5 py-4 font-medium">Plan</th>
                  <th scope="col" className="px-5 py-4 text-right font-medium">E-invoices / month</th>
                  <th scope="col" className="px-5 py-4 text-right font-medium">Price / month</th>
                  <th scope="col" className="px-5 py-4 text-right font-medium">Per e-invoice</th>
                </tr>
              </thead>
              <tbody className="tabular-nums">
                {EINVOICING_UNIT_COST.map((r) => (
                  <tr key={r.name} className="border-t border-line-soft">
                    <th scope="row" className="px-5 py-4 font-semibold text-fg">{r.name}</th>
                    <td className="px-5 py-4 text-right">{r.included}</td>
                    <td className="px-5 py-4 text-right">€{r.price}</td>
                    <td className="px-5 py-4 text-right font-mono text-fg">
                      {r.perInvoice === null ? 'free' : `≈ ${euro2(r.perInvoice)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <article className="card flex flex-col p-7">
          <h3 className="text-xl font-semibold">{EINVOICING_ENTERPRISE.name}</h3>
          <p className="mt-2 leading-relaxed">{EINVOICING_ENTERPRISE.desc}</p>
          <p className="font-display mt-5 text-3xl text-fg">{EINVOICING_ENTERPRISE.price}</p>
          <ul className="mt-5 flex-1 space-y-2.5 text-[0.9375rem]">
            {EINVOICING_ENTERPRISE.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-fg/90">
                <Check size={17} className="mt-[3px] shrink-0 text-mint" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <ButtonLink to={LINKS.sales} variant="ghost" size="md" className="mt-7 w-full">
            Contact Sales
          </ButtonLink>
        </article>
      </div>
    </>
  );
}

/* ---------------- Product tabs ---------------- */

type Product = 'billing' | 'e-invoicing';

const TABS: { id: Product; label: string; sub: string }[] = [
  { id: 'billing', label: 'Subscription Billing', sub: 'Priced by active subscriptions' },
  { id: 'e-invoicing', label: 'E-Invoicing', sub: 'Priced by e-invoices per month' },
];

/**
 * Both panels are rendered into the HTML (the inactive one is hidden), so
 * search engines and AI assistants see every price. /pricing/#e-invoicing
 * opens the E-Invoicing tab directly.
 */
function ProductTabs({ value, onChange }: { value: Product; onChange: (p: Product) => void }) {
  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === value);
    const next = TABS[(i + (e.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
    onChange(next.id);
    document.getElementById(`tab-${next.id}`)?.focus();
  };
  return (
    <div role="tablist" aria-label="Product" className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-1.5 rounded-2xl border border-line bg-surface p-1.5">
      {TABS.map((t) => {
        const active = t.id === value;
        return (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`panel-${t.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t.id)}
            onKeyDown={onKey}
            className={`rounded-xl px-4 py-3 text-left transition ${active ? 'bg-mint text-mint-ink' : 'text-body hover:text-fg'}`}
          >
            <span className="block font-semibold">{t.label}</span>
            <span className={`block text-xs ${active ? 'text-mint-ink/80' : 'text-muted'}`}>{t.sub}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- FAQ ---------------- */

/** Answers live in the HTML (native disclosure); the same lists feed the FAQPage structured data. */
function Faq() {
  return (
    <section className="container-x pb-12" aria-labelledby="pricing-faq">
      <div className="mx-auto max-w-4xl">
        <SectionHeader title={<span id="pricing-faq">Pricing questions, answered plainly</span>} />
        <p className="eyebrow mt-12">Subscription Billing</p>
        <div className="mt-2">
          <FaqList items={PRICING_FAQ} />
        </div>
        <p className="eyebrow mt-12">E-Invoicing</p>
        <div className="mt-2">
          <FaqList items={EINVOICING_PRICING_FAQ} openFirst={false} />
        </div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>('annual');
  const [product, setProduct] = useState<Product>('billing');
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#e-invoicing') setProduct('e-invoicing');
    else if (hash === '#billing') setProduct('billing');
  }, [hash]);

  const choose = (p: Product) => {
    setProduct(p);
    window.history.replaceState(null, '', `#${p}`);
  };

  return (
    <>
      <section className="container-x pt-16 text-center sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="Pricing"
          title="Simple, predictable pricing for billing and e-invoicing."
          lead="Start free, no card required. Each product has its own plans, month-to-month, with no setup fee and no long-term contract."
        />
        {/* Hash targets so /pricing/#billing and /pricing/#e-invoicing land on the tabs. */}
        <span id="billing" aria-hidden="true" />
        <span id="e-invoicing" aria-hidden="true" />
        <ProductTabs value={product} onChange={choose} />
      </section>

      <div id="panel-billing" role="tabpanel" aria-labelledby="tab-billing" hidden={product !== 'billing'}>
        <h2 className="sr-only">Subscription Billing plans</h2>
        <div className="container-x text-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>
        <section className="container-x grid gap-6 py-14 sm:py-16 lg:grid-cols-3" aria-label="Subscription Billing plans">
          {PLANS.map((p) => (
            <PlanCard key={p.name} plan={p} billing={billing} />
          ))}
        </section>
        <p className="container-x pb-16 text-center text-[0.9375rem] text-muted">
          Processing over €100k a month? A 250k/month package is available at €499/month.{' '}
          <Link to={LINKS.sales} className="link-mint">
            Contact sales
          </Link>
          .
        </p>
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
      </div>

      <div id="panel-e-invoicing" role="tabpanel" aria-labelledby="tab-e-invoicing" hidden={product !== 'e-invoicing'}>
        <h2 className="sr-only">E-Invoicing plans</h2>
        <section className="container-x py-14 sm:py-16">
          <EInvoicingPricing />
        </section>
      </div>

      <div className="border-t border-line pt-20 sm:pt-24">
        <Faq />
      </div>

      <CtaPanel
        eyebrow="Still deciding"
        title="Try it on your own plans before you commit."
        subtitle="Both products start free, with no card required."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Talk to Sales', to: LINKS.sales }}
      />
    </>
  );
}
