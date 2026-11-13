import {
  AppWindow,
  ArrowRight,
  Building2,
  ChartLine,
  Check,
  CreditCard,
  FileCode2,
  FileText,
  History,
  Layers,
  Plug,
  RotateCw,
  Shield,
  ShieldCheck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrowserFrame, ButtonLink, CheckList, CtaPanel, Eyebrow, SCREENS, SectionHeader } from '../components/ui';
import { DeadlineStrip, FaqList, PdfVsStructured, StatusPill } from '../components/einvoicing';
import { HOME_FAQ } from '../content/homeFaq';
import { ACCOUNTING, PAYMENT_GATEWAYS } from '../content/integrations';
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
    <section className="container-x grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.08fr] lg:gap-12 lg:pb-20 lg:pt-24">
      <div>
        <Eyebrow>Subscription billing &amp; e-invoicing</Eyebrow>
        <h1 className="font-display mt-5 text-[2.5rem] leading-[1.06] sm:text-[3.5rem] lg:text-[3.75rem]">
          Recurring revenue and German e-invoicing, <span className="marker">built compliant</span> from the first
          invoice.
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed sm:text-[1.1875rem]">
          Plans, pay links, dunning and payouts, plus XRechnung and ZUGFeRD e-invoices, EU VAT and GDPR tooling. Bill in
          fifteen currencies and meet Germany’s e-invoicing deadlines without hiring a compliance team.
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
        <BrowserFrame src={SCREENS.dashboard} alt="Subscription Billing dashboard showing ARR, forecast and collected revenue" eager />
        <StatBubble label="Annual recurring revenue" value="€284,600" className="right-3 -top-6 sm:-right-3" />
        <StatBubble label="Collected this month" value="+18.4%" className="-bottom-2 left-3 sm:left-0" />
      </div>
    </section>
  );
}

/* ---------------- Products ---------------- */

const PRODUCTS = [
  {
    eyebrow: 'For SaaS & subscription businesses',
    name: 'Subscription Billing',
    desc: 'Run the whole subscription lifecycle, from the first pay link to the last payout.',
    bullets: ['Flat and tiered plans, pay links', 'Smart dunning that adapts by payment method', 'Stripe, PayPal, GoCardless and Mollie in one ledger', 'EU VAT, GDPR and PSD2 tooling built in'],
    price: 'Free for up to 25 active subscriptions',
    to: '/subscription-billing/',
    cta: 'Explore Subscription Billing',
  },
  {
    eyebrow: 'For businesses invoicing in Germany',
    name: 'E-Invoicing',
    desc: 'Issue compliant e-invoices without changing your accounting software.',
    bullets: ['XRechnung and ZUGFeRD from the same data', 'Validation against EN 16931 and German rules', 'Handover to Lexware Office, DATEV and sevdesk', 'Audit trail for every invoice'],
    price: 'Free for 5 e-invoices a month',
    to: '/e-invoicing/',
    cta: 'Explore E-Invoicing',
  },
];

function Products() {
  return (
    <section className="container-x pb-20 pt-6 sm:pb-24" aria-labelledby="products">
      <h2 id="products" className="sr-only">
        Our products
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {PRODUCTS.map((p) => (
          <article key={p.name} className="card flex flex-col p-8 sm:p-9">
            <p className="eyebrow">{p.eyebrow}</p>
            <h3 className="font-display mt-4 text-[2rem] leading-tight">{p.name}</h3>
            <p className="mt-3 text-lg leading-relaxed">{p.desc}</p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-fg/90">
                  <Check size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm text-muted">{p.price}</p>
              <Link to={p.to} className="link-mint inline-flex items-center gap-1 font-semibold">
                {p.cta} <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Industries() {
  const chips = ['Vertical SaaS', 'Dev tools', 'Fintech', 'Agencies', 'Gyms & clubs', 'Education providers', 'Usage-based platforms'];
  return (
    <section className="border-t border-line">
      <div className="container-x flex flex-col items-center gap-5 py-8 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Built for teams billing in</p>
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
  { icon: ChartLine, title: 'Revenue Analytics', desc: 'ARR, forecast and collected revenue, subscription health, and a per-customer next-billing view.' },
  { icon: FileCode2, title: 'XRechnung & ZUGFeRD', desc: 'Generate either e-invoice format from the same validated invoice data.' },
  { icon: ShieldCheck, title: 'EN 16931 Validation', desc: 'Required fields, VAT and totals checked before an invoice goes out, with plain-language errors.' },
  { icon: Plug, title: 'Accounting Handover', desc: 'Transfer e-invoices to Lexware Office, DATEV or sevdesk. Your bookkeeping stays where it is.' },
  { icon: History, title: 'Audit Trail', desc: 'A time-stamped history of every invoice, from creation to validation to transfer.' },
  { icon: Layers, title: 'EU VAT & VIES', desc: 'Validates VAT IDs against VIES in real time and applies the right tax rate by customer region.' },
  { icon: Shield, title: 'GDPR Data Rights', desc: 'Portability exports and right-to-erasure, plus a customer-initiated deletion queue your team reviews.' },
  { icon: FileText, title: 'PSD2 Strong Auth', desc: 'Sandbox real Strong Customer Authentication flows before they ever reach a live customer.' },
  { icon: Building2, title: 'Multi-Org Console', desc: 'A platform-wide view across every organization you run, with real impersonation for support.' },
];

function Platform() {
  return (
    <section className="border-t border-line">
      <div className="container-x py-24 sm:py-28">
        <SectionHeader
          eyebrow="Everything billing touches"
          title="One platform, from subscription to compliant invoice."
          lead="Stop stitching together a payment processor, a tax plugin, an e-invoicing tool and three automations that break every time a provider changes their API."
        />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PLATFORM.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="bg-surface p-7 transition-colors hover:bg-surface-2">
              <span className="icon-tile">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Renewal → e-invoice ---------------- */

const RENEWAL_FLOW = [
  { product: 'Subscription Billing', step: 'A subscription renews' },
  { product: 'E-Invoicing', step: 'Invoice data validated against EN 16931' },
  { product: 'E-Invoicing', step: 'XRechnung or ZUGFeRD generated' },
  { product: 'Your accounting', step: 'Handed to Lexware Office, DATEV or sevdesk' },
];

function RenewalToInvoice() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="container-x py-24 sm:py-28">
        <div className="text-center">
          <StatusPill status="Coming soon" />
        </div>
        <SectionHeader
          className="mt-5"
          title="Every renewal becomes a compliant e-invoice."
          lead="Today the two products run side by side. Next, Subscription Billing will hand each renewal straight to E-Invoicing, so recurring invoices to German businesses are compliant without anyone touching them."
        />
        <ol className="mt-14 grid gap-4 md:grid-cols-4">
          {RENEWAL_FLOW.map((s, i) => (
            <li key={s.step} className="relative rounded-2xl border border-line bg-canvas p-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-mint">
                {String(i + 1).padStart(2, '0')} · {s.product}
              </p>
              <p className="mt-3 text-lg font-semibold text-fg">{s.step}</p>
              {i < RENEWAL_FLOW.length - 1 && (
                <ArrowRight
                  size={20}
                  className="absolute -right-3.5 top-1/2 hidden -translate-y-1/2 text-mint md:block"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
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
          title="Every subscription's state at a glance: active, failed, or not started."
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

/* ---------------- Why e-invoicing ---------------- */

function WhyEInvoicing() {
  return (
    <section className="border-t border-line">
      <div className="container-x py-24 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>German e-invoicing</Eyebrow>
            <h2 className="font-display mt-4 text-[2rem] leading-[1.12] sm:text-[2.5rem]">A PDF is not an e-invoice.</h2>
            <p className="mt-5 text-lg leading-relaxed">
              An e-invoice is structured data under the European standard EN 16931, such as XRechnung or ZUGFeRD, that
              the recipient’s software reads automatically. Businesses in Germany must already be able to receive them,
              and issuing them becomes mandatory from 2027.
            </p>
            <Link to="/compliance/" className="link-mint mt-6 inline-flex items-center gap-1">
              Who must issue e-invoices, and when <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <PdfVsStructured />
        </div>
        <div className="mt-10">
          <DeadlineStrip />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Integrations ---------------- */

function Integrations() {
  const groups = [
    { label: 'Payment gateways · Subscription Billing', items: PAYMENT_GATEWAYS },
    { label: 'Accounting software · E-Invoicing', items: ACCOUNTING.filter((a) => a.status !== 'Coming soon') },
  ];
  return (
    <section className="border-t border-line">
      <div className="container-x py-20 sm:py-24">
        <SectionHeader
          eyebrow="Integrations"
          title="Works with the tools you already pay for."
          lead="Keep your merchant accounts and your accounting software. Every integration shows its real status."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {groups.map((g) => (
            <div key={g.label} className="card p-7">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{g.label}</h3>
              <ul className="mt-5 divide-y divide-line-soft">
                {g.items.map((i) => (
                  <li key={i.name} className="flex items-center justify-between gap-4 py-3">
                    <span className="font-semibold text-fg">{i.name}</span>
                    <StatusPill status={i.status} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link to="/integrations/" className="link-mint inline-flex items-center gap-1">
            See all integrations <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------------- Compliance ---------------- */

const COMPLIANCE = [
  { tag: 'GDPR', title: 'Data rights, end to end', desc: "Article 15 portability exports and Article 17 erasure, plus a customer-facing deletion request your team approves once nothing's outstanding." },
  { tag: 'PSD2', title: 'Strong Customer Auth sandbox', desc: 'Test real SCA challenge flows against your checkout before a single live customer hits one.' },
  { tag: 'Tax', title: 'EU VAT validated at checkout', desc: 'VAT IDs are checked against VIES in real time, with the right rate applied by customer region automatically.' },
  { tag: 'E-Inv', title: 'Ready for the 2027 mandate', desc: 'XRechnung and ZUGFeRD validated against EN 16931 before they go out, with an audit trail for every invoice.' },
];

function Compliance() {
  return (
    <section className="border-t border-line">
      <div className="container-x grid items-center gap-14 py-24 sm:py-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
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
            lead="A customer's own deletion request lands in a real queue your team reviews, not a script someone runs once a year."
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
          <Link to="/security/" className="link-mint mt-7 inline-flex items-center gap-1">
            See the full Security &amp; Compliance page <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  return (
    <section className="border-t border-line">
      <div className="container-x py-20 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeader title="Questions, answered plainly" />
          <div className="mt-10">
            <FaqList items={HOME_FAQ} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Industries />
      <Platform />
      <RenewalToInvoice />
      <ControlCenter />
      <WhyEInvoicing />
      <Integrations />
      <Compliance />
      <Faq />
      <CtaPanel
        eyebrow="Ready when you are"
        title="Start billing in minutes, not a quarter-long migration."
        subtitle="Keep your existing payment gateway and accounting software. Import your plans. Send your first pay link or e-invoice today."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Talk to Sales', to: LINKS.sales }}
      />
    </>
  );
}
