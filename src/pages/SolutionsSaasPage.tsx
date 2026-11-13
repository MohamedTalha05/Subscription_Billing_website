import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, FileCode2, Receipt, RotateCw } from 'lucide-react';
import { BrowserFrame, ButtonLink, CheckList, CtaPanel, Eyebrow, SCREENS, SectionHeader } from '../components/ui';
import { DeadlineStrip, PrepChecklist, StatusPill } from '../components/einvoicing';
import { PREPARE_SOFTWARE } from '../content/eInvoicing';
import { guidePath } from '../content/guides';
import { LINKS } from '../config';

const CHALLENGES = [
  { icon: RotateCw, title: 'Failed renewals quietly become churn', desc: 'Cards expire and SEPA mandates bounce. Without retries that match how each customer pays, revenue disappears between billing runs.' },
  { icon: Receipt, title: 'Every renewal is an invoice', desc: 'A monthly plan means twelve invoices a year per customer, each with the right VAT treatment for the customer’s country.' },
  { icon: CalendarClock, title: 'German B2B customers will need e-invoices', desc: 'From 2027, invoices to German businesses must be structured e-invoices for issuers above €800,000 revenue, and from 2028 for everyone.' },
  { icon: FileCode2, title: 'Compliance isn’t your product', desc: 'EN 16931 rules, XRechnung and ZUGFeRD generators and accounting connectors take ongoing work that pulls your team away from your roadmap.' },
];

const USE_CASES = [
  'SaaS billing', 'Subscription platforms', 'Membership software', 'Gym and studio software', 'Vertical SaaS',
  'Marketplaces', 'Donation and fundraising platforms', 'Usage-based platforms',
];

export default function SolutionsSaasPage() {
  return (
    <>
      <section className="container-x grid items-center gap-14 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:pt-24">
        <div>
          <Eyebrow>For SaaS companies</Eyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] leading-[1.06] sm:text-[3.25rem] lg:text-[3.5rem]">
            Bill every subscription, and be ready for German e-invoicing.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed sm:text-[1.1875rem]">
            Subscription Billing runs your plans, renewals, dunning and payouts. E-Invoicing turns invoices to German
            businesses into XRechnung or ZUGFeRD. You keep your gateway and your accounting software.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={LINKS.trial}>Start Free Trial</ButtonLink>
            <ButtonLink to={LINKS.demo} variant="ghost">
              Book a Demo
            </ButtonLink>
          </div>
        </div>
        <BrowserFrame src={SCREENS.billing} alt="Subscription Billing control center with MRR, active accounts and failed subscriptions" eager />
      </section>

      <div className="container-x pb-4">
        <DeadlineStrip />
      </div>

      <section className="container-x py-20 sm:py-24" aria-labelledby="challenges">
        <SectionHeader eyebrow="The problem" title={<span id="challenges">What recurring revenue makes hard</span>} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {CHALLENGES.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="bg-surface p-7">
              <span className="icon-tile">
                <Icon size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-lg font-semibold">{title}</h3>
              <p className="mt-2.5 leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="how">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow="How it fits" title={<span id="how">Two products, one billing stack</span>} />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <article className="card flex flex-col p-8">
              <p className="eyebrow">Subscription Billing</p>
              <h3 className="font-display mt-4 text-2xl">From pay link to payout</h3>
              <CheckList
                className="mt-6 flex-1"
                items={[
                  'Flat and tiered plans with custom billing intervals',
                  'Smart dunning that retries differently for card, SEPA and wallets',
                  'Stripe, PayPal, GoCardless and Mollie in one settlement ledger',
                  'EU VAT checked against VIES at checkout',
                  'ARR, forecast and subscription health dashboards',
                ]}
              />
              <Link to="/subscription-billing/" className="link-mint mt-7 inline-flex items-center gap-1">
                Explore Subscription Billing <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
            <article className="card flex flex-col p-8">
              <p className="eyebrow">E-Invoicing</p>
              <h3 className="font-display mt-4 text-2xl">From invoice to compliant e-invoice</h3>
              <CheckList
                className="mt-6 flex-1"
                items={[
                  'XRechnung and ZUGFeRD from the same invoice data',
                  'Validation against EN 16931 and German rules',
                  'Handover to Lexware Office, DATEV and sevdesk',
                  'Time-stamped audit trail for every invoice',
                  'Free for up to 5 e-invoices a month',
                ]}
              />
              <Link to="/e-invoicing/" className="link-mint mt-7 inline-flex items-center gap-1">
                Explore E-Invoicing <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </article>
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-mint/40 bg-highlight/30 p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-relaxed text-fg/90">
              <span className="mr-2 align-middle">
                <StatusPill status="Coming soon" />
              </span>
              Subscription Billing will hand every renewal straight to E-Invoicing, so recurring invoices to German
              businesses are compliant automatically.
            </p>
            <Link to="/integrations/#products" className="link-mint inline-flex shrink-0 items-center gap-1">
              See the integration <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="prepare">
        <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Get ready</Eyebrow>
            <h2 id="prepare" className="font-display mt-4 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
              What SaaS companies should prepare for e-invoicing
            </h2>
            <p className="mt-5 text-lg leading-relaxed">
              If your platform issues invoices, for your own plans or on behalf of your customers, those invoices need to
              be structured e-invoices once the obligation applies.
            </p>
            <Link to={guidePath('prepare-your-saas-for-german-e-invoicing')} className="link-mint mt-6 inline-flex items-center gap-1">
              Read the guide: preparing your SaaS <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <PrepChecklist title="Your checklist" items={PREPARE_SOFTWARE} />
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-16 text-center sm:py-20">
          <SectionHeader eyebrow="Built for" title="Platforms that invoice on a schedule" />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {USE_CASES.map((u) => (
              <li key={u} className="rounded-full border border-line px-4 py-2 text-body">
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaPanel
        eyebrow="Ready when you are"
        title="Bring your plans. We'll show you the rest."
        subtitle="Start free, or book 20 minutes with someone who will set up your first plan live on the call."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Book a Demo', to: LINKS.demo }}
      />
    </>
  );
}
