import type { LucideIcon } from 'lucide-react';
import {
  Building2,
  ChartLine,
  Check,
  CirclePlus,
  CreditCard,
  FileText,
  Layers,
  LayoutGrid,
  RotateCw,
  Shield,
  TriangleAlert,
  User,
  Webhook,
  Zap,
} from 'lucide-react';
import { BrowserFrame, ButtonLink, CtaPanel, SCREENS, SectionHeader } from '../components/ui';
import { AICopilot, Metrics, Steps } from '../components/billing';
import { LINKS } from '../config';

type Item = { icon: LucideIcon; title: string; desc: string };
type Group = {
  n: string;
  title: string;
  desc: string;
  screen?: { src: string; alt: string };
  items: Item[];
};

const GROUPS: Group[] = [
  {
    n: '01',
    title: 'Billing & subscriptions',
    desc: 'Flat or tiered pricing, custom billing intervals, and a branded checkout your customers actually recognize as yours.',
    items: [
      { icon: Layers, title: 'Flat & tiered plans', desc: 'Build simple flat-rate plans or usage tiers, each with its own billing interval.' },
      { icon: Zap, title: 'Shareable Pay Links', desc: 'Send a single link for a one-off charge or a recurring subscription — no checkout code required.' },
      { icon: LayoutGrid, title: 'Branded checkout', desc: 'Your logo, your merchant name, your receipt prefix — on every invoice and checkout page.' },
    ],
  },
  {
    n: '02',
    title: 'Dunning & recovery',
    desc: "Failed payments don't have to mean lost customers. Retry logic adapts to how the customer actually pays.",
    screen: { src: SCREENS.billing, alt: 'Billing page with failed subscriptions and upcoming renewals' },
    items: [
      { icon: RotateCw, title: 'Automated retry cadence', desc: 'Failed charges retry on a schedule instead of silently lapsing.' },
      { icon: CreditCard, title: 'Payment-method-aware rules', desc: 'Filter and schedule retries differently for card, SEPA, or wallet payments.' },
      { icon: TriangleAlert, title: 'Failed-subscription alerts', desc: 'The Billing dashboard surfaces failed subscriptions before they pile up in a report nobody reads.' },
    ],
  },
  {
    n: '03',
    title: 'Payments & payouts',
    desc: 'Four gateways, one settlement ledger — so finance reconciles against one source of truth instead of four exports.',
    items: [
      { icon: CirclePlus, title: 'Stripe, PayPal, GoCardless, Mollie', desc: 'Connect the gateways you already use — nothing to migrate.' },
      { icon: ChartLine, title: 'Settlement ledger', desc: 'Gross, fees, and net payouts tracked per batch, per gateway.' },
      { icon: Check, title: 'Refunds & disputes', desc: 'Issue a full or partial refund and track disputes from the same payout record.' },
    ],
  },
  {
    n: '04',
    title: 'Analytics & forecasting',
    desc: 'The numbers a finance lead actually asks for, already assembled: ARR, forecast, collected revenue, and subscription health.',
    screen: { src: SCREENS.dashboard, alt: 'Financial reporting dashboard with revenue timeline and subscription health' },
    items: [
      { icon: ChartLine, title: 'Revenue timeline', desc: 'Funds collected by period, broken down by payment method share.' },
      { icon: Shield, title: 'Subscription health', desc: 'Active, trialing, paused, inactive and not-started — at a glance, not a query.' },
      { icon: User, title: 'Per-customer forecast', desc: 'Next billing date and projected amount, for every customer, one month out.' },
    ],
  },
  {
    n: '05',
    title: 'Privacy, tax & platform tools',
    desc: 'The parts most billing platforms treat as an integration you build yourself.',
    screen: { src: SCREENS.gdpr, alt: 'GDPR data privacy supervisor dashboard' },
    items: [
      { icon: Shield, title: 'GDPR data rights', desc: "Article 15 portability exports, Article 17 erasure, and a customer-initiated deletion request your team reviews before anything's anonymized." },
      { icon: FileText, title: 'PSD2 SCA sandbox', desc: 'Test Strong Customer Authentication challenge flows before they touch a real customer.' },
      { icon: Building2, title: 'Multi-org Super Admin', desc: 'One console across every organization you run, with real impersonation for support — not a separate mock view.' },
      { icon: Webhook, title: 'Webhook & API tools', desc: 'Dispatch and inspect webhook events, manage API keys, built for your developers, not against them.' },
    ],
  },
];

function FeatureCards({ items }: { items: Item[] }) {
  return (
    <div className="space-y-5">
      {items.map(({ icon: Icon, title, desc }) => (
        <article key={title} className="card flex items-start gap-4 p-5 sm:p-6">
          <span className="icon-tile">
            <Icon size={20} />
          </span>
          <div className="pt-0.5">
            <h3 className="text-[1.0625rem] font-semibold">{title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function FeatureGroup({ g }: { g: Group }) {
  return (
    <section className="border-t border-line">
      <div className="container-x grid items-start gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <p className="font-mono text-sm text-mint">{g.n}</p>
          <h2 className="font-display mt-3 text-[2rem] leading-[1.12] sm:text-[2.5rem]">{g.title}</h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed">{g.desc}</p>
        </div>
        <div>
          <FeatureCards items={g.items} />
          {g.screen && <BrowserFrame src={g.screen.src} alt={g.screen.alt} className="mt-8" />}
        </div>
      </div>
    </section>
  );
}

export default function SubscriptionBillingPage() {
  return (
    <>
      <section className="container-x py-16 sm:py-24">
        <SectionHeader
          as="h1"
          eyebrow="Subscription Billing"
          title="Every part of the subscription lifecycle, in one ledger."
          lead="From the first pay link to the last payout, here's exactly what Subscription Billing runs for you — grounded in what the product actually does, not a roadmap slide."
        />
      </section>

      <Steps />

      {GROUPS.map((g) => (
        <FeatureGroup key={g.n} g={g} />
      ))}

      <div className="border-t border-line pt-16 sm:pt-20">
        <Metrics />
      </div>

      <div className="mt-16 sm:mt-20">
        <AICopilot />
      </div>

      <section className="container-x py-16 sm:py-20">
        <div className="flex flex-col gap-6 rounded-2xl border border-mint/40 bg-highlight/30 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="eyebrow">Also from MYFUNDBOX</p>
            <h2 className="font-display mt-3 text-2xl sm:text-[1.75rem]">Invoicing businesses in Germany? Add E-Invoicing.</h2>
            <p className="mt-3 max-w-2xl leading-relaxed">
              Create, validate and generate XRechnung and ZUGFeRD e-invoices before the 2027 deadline, and hand them to
              Lexware Office, DATEV or sevdesk.
            </p>
          </div>
          <ButtonLink to="/e-invoicing/" variant="ghost" size="md" className="shrink-0">
            Explore E-Invoicing
          </ButtonLink>
        </div>
      </section>

      <div className="border-t border-line">
        <CtaPanel
          eyebrow="See it on your own plans"
          title="Bring your pricing. We'll show you the rest."
          subtitle="Start free, or book 20 minutes with someone who'll set up your first plan live on the call."
          primary={{ label: 'Start Free Trial', to: LINKS.trial }}
          secondary={{ label: 'Book a Demo', to: LINKS.demo }}
        />
      </div>
    </>
  );
}
