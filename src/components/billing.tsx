/**
 * Subscription Billing sections shared by the product page. Moved from the
 * home page, which now introduces both products.
 */
import { ChartLine, Loader, MessageSquare, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeader } from './ui';
import { LINKS } from '../config';

/* ---------------- AI copilot (roadmap) ---------------- */

const AI = [
  { icon: ChartLine, title: 'Churn prediction', desc: 'Flags at-risk customers from real usage and payment behavior, with a risk score and the reason behind it — not a guess.' },
  { icon: ShieldAlert, title: 'Revenue leakage detection', desc: 'Surfaces the uncollected VAT, stale paused subscriptions and failed-retry patterns quietly costing you money every month.' },
  { icon: MessageSquare, title: 'Conversational finance assistant', desc: 'Ask about churn risk, MRR projections or recovery workflows in plain language, and get an answer grounded in your own data.' },
];

export function AICopilot() {
  return (
    <section className="border-y border-line bg-surface py-24 sm:py-28">
      <div className="container-x text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-line bg-[#141a2a] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-violet-soft">
          <Loader size={13} /> In development — not live yet
        </span>
        <SectionHeader
          className="mt-6"
          title="An AI copilot for your revenue, built into Subscription Billing."
          lead="We're building a finance assistant that reads your real subscription data — not a demo, your actual churn, payments and tax records — so a problem surfaces before it shows up in next month's MRR, not after."
        />
        <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {AI.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="rounded-2xl border border-violet-line/70 bg-violet-card p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-violet text-white">
                <Icon size={20} />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-[0.9375rem] text-muted">
          On our roadmap, not shipped yet —{' '}
          <Link to={LINKS.earlyAccess} className="text-violet-soft underline underline-offset-4 hover:text-white">
            tell us you want early access →
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Steps ---------------- */

const STEPS = [
  { n: '01', label: 'Connect', title: 'Connect a gateway', desc: 'Add Stripe, PayPal, GoCardless or Mollie. Keep your existing merchant account.' },
  { n: '02', label: 'Configure', title: 'Create plans & pay links', desc: 'Flat or tiered pricing, tax rates by region, and a branded checkout link to share.' },
  { n: '03', label: 'Collect', title: 'Get paid, automatically', desc: 'Renewals, retries, payouts and invoices run themselves. You watch the dashboard.' },
];

export function Steps() {
  return (
    <section className="border-t border-line">
     <div className="container-x py-24 sm:py-28">
      <SectionHeader eyebrow="From signup to settlement" title="Live in an afternoon." />
      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((s) => (
          <li key={s.n} className="border-t-2 border-mint/80 pt-7">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              {s.n} / {s.label}
            </p>
            <h3 className="font-display mt-4 text-[1.375rem]">{s.title}</h3>
            <p className="mt-3 leading-relaxed">{s.desc}</p>
          </li>
        ))}
      </ol>
     </div>
    </section>
  );
}

/* ---------------- Metrics ---------------- */

const METRICS = [
  { value: '€284,600', label: 'Annual recurring revenue' },
  { value: '1,284', label: 'Transactions tracked' },
  { value: '4', label: 'Payment gateways, one ledger' },
  { value: '6', label: 'Subscription lifecycle states' },
];

export function Metrics() {
  return (
    <section className="container-x py-8">
      <div className="card rounded-3xl p-8 sm:p-12">
        <SectionHeader
          align="left"
          eyebrow="What your dashboard looks like on day one"
          title="Real numbers, not a vanity metric built for a screenshot."
          lead="Every figure traces back to a real subscription, invoice or payout — the same data your finance team would reconcile by hand otherwise."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label} className="flex flex-col-reverse bg-surface px-6 py-6">
              <dt className="mt-2 text-sm text-muted">{m.label}</dt>
              <dd className="font-mono text-3xl font-medium tracking-tight text-mint sm:text-[2.125rem]">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

