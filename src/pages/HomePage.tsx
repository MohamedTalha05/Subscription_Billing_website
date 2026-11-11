import {
  AppWindow,
  ArrowRight,
  Building2,
  ChartLine,
  CreditCard,
  FileText,
  Layers,
  Loader,
  MessageSquare,
  RotateCw,
  Shield,
  ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  BrowserFrame,
  ButtonLink,
  CheckList,
  CtaPanel,
  Eyebrow,
  Ratings,
  SCREENS,
  SectionHeader,
  usePageTitle,
  type Person,
} from '../components/ui';
import { LINKS } from '../config';

/* ---------------- Hero ---------------- */

function StatBubble({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div
      className={`absolute rounded-xl border border-line bg-[#0f211d]/95 px-4 py-3 shadow-2xl backdrop-blur sm:px-5 sm:py-3.5 ${className}`}
    >
      <p className="font-mono text-xs text-fg sm:text-sm">{label}</p>
      <p className="mt-0.5 font-mono text-lg font-medium text-mint sm:text-xl">{value}</p>
    </div>
  );
}

function Hero() {
  return (
    <section className="container-x grid items-center gap-14 pb-20 pt-14 sm:pb-24 sm:pt-20 lg:grid-cols-[1fr_1.08fr] lg:gap-12 lg:pb-28 lg:pt-24">
      <div>
        <Eyebrow>Subscription billing for SaaS</Eyebrow>
        <h1 className="font-display mt-5 text-[2.5rem] leading-[1.06] sm:text-[3.5rem] lg:text-[3.75rem]">
          Recurring revenue infrastructure, <span className="marker">built compliant</span> from the first invoice.
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed sm:text-[1.1875rem]">
          Plans, pay links, dunning, payouts, and EU tax &amp; GDPR tooling in one platform — so your SaaS can bill
          in fifteen currencies without hiring a compliance team to do it.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={LINKS.trial}>Start Free Trial</ButtonLink>
          <ButtonLink to={LINKS.demo} variant="ghost">
            Book a Demo
          </ButtonLink>
        </div>
        <p className="mt-6 font-mono text-sm text-muted">No card required · Live in an afternoon · Cancel anytime</p>
      </div>

      <div className="relative w-full pb-6 pl-0 sm:pl-6">
        <BrowserFrame src={SCREENS.dashboard} alt="Billing.eu dashboard showing ARR, forecast and collected revenue" eager />
        <StatBubble label="Annual recurring revenue" value="€284,600" className="right-3 -top-6 sm:-right-3" />
        <StatBubble label="Collected this month" value="+18.4%" className="-bottom-2 left-3 sm:left-0" />
      </div>
    </section>
  );
}

function Industries() {
  const chips = ['Dev tools', 'Vertical SaaS', 'Fintech', 'Data & analytics', 'Usage-based platforms'];
  return (
    <section className="border-t border-line">
      <div className="container-x flex flex-col items-center gap-5 py-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Built for teams selling subscriptions in</p>
        <ul className="flex flex-wrap justify-center gap-2.5">
          {chips.map((c) => (
            <li key={c} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-body">
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Platform grid ---------------- */

const PLATFORM = [
  { icon: AppWindow, title: 'Plans & Pay Links', desc: 'Flat or tiered pricing, custom billing intervals, and shareable checkout links with your own branding.' },
  { icon: RotateCw, title: 'Smart Dunning', desc: 'Automated retry cadence that adapts by payment method, with failed-payment alerts before customers churn.' },
  { icon: CreditCard, title: 'Multi-Gateway Payments', desc: 'Stripe, PayPal, GoCardless and Mollie behind one API, with payouts reconciled automatically.' },
  { icon: Layers, title: 'EU VAT & VIES', desc: 'Validates VAT IDs against VIES in real time and applies the right tax rate by customer region.' },
  { icon: Shield, title: 'GDPR Data Rights', desc: 'Portability exports and right-to-erasure, plus a customer-initiated deletion queue your team reviews.' },
  { icon: FileText, title: 'PSD2 Strong Auth', desc: 'Sandbox real Strong Customer Authentication flows before they ever reach a live customer.' },
  { icon: ChartLine, title: 'Revenue Analytics', desc: 'ARR, forecast and collected revenue, subscription health, and a per-customer next-billing view.' },
  { icon: Building2, title: 'Multi-Org Console', desc: 'A platform-wide view across every organization you run, with real impersonation for support.' },
];

function Platform() {
  return (
    <section className="container-x py-24 sm:py-28">
      <SectionHeader
        eyebrow="Everything billing touches"
        title="One platform for the whole subscription lifecycle."
        lead="Stop stitching together a payment processor, a tax plugin, and three Zapier automations that break every time a provider changes their API. It's all one system."
      />

      <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {PLATFORM.map(({ icon: Icon, title, desc }) => (
          <article key={title} className="bg-surface p-7 transition-colors hover:bg-surface-2">
            <span className="icon-tile">
              <Icon size={20} />
            </span>
            <h3 className="mt-6 text-lg font-semibold">{title}</h3>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- AI copilot (roadmap) ---------------- */

const AI = [
  { icon: ChartLine, title: 'Churn prediction', desc: 'Flags at-risk customers from real usage and payment behavior, with a risk score and the reason behind it — not a guess.' },
  { icon: ShieldAlert, title: 'Revenue leakage detection', desc: 'Surfaces the uncollected VAT, stale paused subscriptions and failed-retry patterns quietly costing you money every month.' },
  { icon: MessageSquare, title: 'Conversational finance assistant', desc: 'Ask about churn risk, MRR projections or recovery workflows in plain language, and get an answer grounded in your own data.' },
];

function AICopilot() {
  return (
    <section className="border-y border-line bg-surface py-24 sm:py-28">
      <div className="container-x text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-violet-line bg-[#141a2a] px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-violet-soft">
          <Loader size={13} /> In development — not live yet
        </span>
        <SectionHeader
          className="mt-6"
          title="An AI copilot for your revenue, built into Billing.eu."
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

/* ---------------- Control center ---------------- */

function ControlCenter() {
  return (
    <section className="container-x grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div>
        <SectionHeader
          align="left"
          eyebrow="Subscription control center"
          title="Every subscription's state at a glance — active, failed, or not started."
          lead="Estimated MRR, active accounts and failed subscriptions sit above the list, so your team opens the Billing page already knowing what needs attention today."
        />
        <CheckList
          className="mt-8 text-[1.0625rem]"
          items={[
            'Per-customer recurring settings, editable inline',
            'Filter by plan, payment method or status',
            'Export CSV or create a pay link in two clicks',
          ]}
        />
      </div>
      <BrowserFrame src={SCREENS.billing} alt="Billing page listing subscriptions with MRR, active accounts and failed subscriptions" />
    </section>
  );
}

/* ---------------- Steps ---------------- */

const STEPS = [
  { n: '01', label: 'Connect', title: 'Connect a gateway', desc: 'Add Stripe, PayPal, GoCardless or Mollie. Keep your existing merchant account.' },
  { n: '02', label: 'Configure', title: 'Create plans & pay links', desc: 'Flat or tiered pricing, tax rates by region, and a branded checkout link to share.' },
  { n: '03', label: 'Collect', title: 'Get paid, automatically', desc: 'Renewals, retries, payouts and invoices run themselves. You watch the dashboard.' },
];

function Steps() {
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

/* ---------------- Testimonials ---------------- */

const QUOTES: { quote: string; name: string; role: string; person: Person }[] = [
  {
    quote: 'We moved dunning off a cron job someone half-remembered writing. Retries now actually match how our customers pay.',
    name: 'Priya N.',
    role: 'Finance Lead, DataLoom',
    person: 'priya',
  },
  {
    quote: 'VAT validation at checkout alone saved us a quarter of back-and-forth with our accountant every filing period.',
    name: 'Marco E.',
    role: 'Co-founder, FlowStack',
    person: 'marco',
  },
  {
    quote: 'Support stopped forwarding us “please cancel my subscription” tickets. Customers just do it themselves now.',
    name: 'Jonas A.',
    role: 'Head of RevOps, BrightLedger',
    person: 'jonas',
  },
];

function Testimonials() {
  return (
    <section className="container-x pb-24 sm:pb-28">
      <SectionHeader
        eyebrow="What teams say once they're live"
        title="One system of record, fewer surprises at renewal."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {QUOTES.map((q) => (
          <figure key={q.name} className="card flex flex-col p-7 sm:p-8">
            <blockquote className="flex-1 text-[1.1875rem] leading-relaxed text-fg">“{q.quote}”</blockquote>
            <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
              <Avatar person={q.person} size={44} />
              <span>
                <span className="block font-semibold text-fg">{q.name}</span>
                <span className="block text-sm text-muted">{q.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
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

function Metrics() {
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

/* ---------------- Compliance ---------------- */

const COMPLIANCE = [
  { tag: 'GDPR', title: 'Data rights, end to end', desc: "Article 15 portability exports and Article 17 erasure, plus a customer-facing deletion request your team approves once nothing's outstanding." },
  { tag: 'PSD2', title: 'Strong Customer Auth sandbox', desc: 'Test real SCA challenge flows against your checkout before a single live customer hits one.' },
  { tag: 'Tax', title: 'EU VAT validated at checkout', desc: 'VAT IDs are checked against VIES in real time, with the right rate applied by customer region automatically.' },
];

function Compliance() {
  return (
    <section className="container-x grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <BrowserFrame
        src={SCREENS.gdpr}
        alt="GDPR data privacy dashboard with pending deletion requests and portability tools"
        className="order-2 lg:order-1"
      />
      <div className="order-1 lg:order-2">
        <SectionHeader
          align="left"
          eyebrow="Compliance, not an afterthought"
          title="The part most billing tools bolt on later, we built in first."
          lead="A customer's own deletion request lands in a real queue your team reviews — not a script someone runs once a year."
        />
        <div className="mt-8 space-y-3">
          {COMPLIANCE.map((c) => (
            <article key={c.tag} className="flex gap-4 rounded-xl border border-line p-5">
              <span className="mt-0.5 w-12 shrink-0 font-mono text-xs font-medium uppercase tracking-[0.12em] text-mint">
                {c.tag}
              </span>
              <div>
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{c.desc}</p>
              </div>
            </article>
          ))}
        </div>
        <Link to="/security" className="link-mint mt-7 inline-flex items-center gap-1">
          See the full Security &amp; Compliance page <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export default function HomePage() {
  usePageTitle('');
  return (
    <>
      <Hero />
      <Industries />
      <Ratings />
      <Platform />
      <AICopilot />
      <ControlCenter />
      <Steps />
      <Testimonials />
      <Metrics />
      <Compliance />
      <CtaPanel
        eyebrow="Ready when you are"
        title="Start billing in minutes, not a quarter-long migration."
        subtitle="Keep your existing payment gateway. Import your plans. Send your first pay link today."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Talk to Sales', to: LINKS.sales }}
      />
    </>
  );
}
