import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CtaPanel, SectionHeader } from '../components/ui';
import { AccountingSplit } from '../components/einvoicing';
import { CONTACT, LINKS } from '../config';

const PRINCIPLES = [
  {
    title: 'Infrastructure, not another accounting tool',
    desc: 'Businesses already have payment gateways and accounting software they trust. We build the billing and e-invoicing layers that work alongside them.',
  },
  {
    title: 'Honest about compliance',
    desc: 'Rules change. We show sources and review dates, label every integration with its real status, and never overstate what the products do.',
  },
  {
    title: 'Built for recurring revenue',
    desc: 'Subscriptions, memberships and renewals create invoices on a schedule. Our products are designed around that rhythm, from the first pay link to a compliant e-invoice.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-x pb-16 pt-16 sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="About"
          title="Billing and e-invoicing infrastructure for Germany and Europe."
          lead={`Subscription Billing is built by ${CONTACT.company} in Wolfsburg, Germany. We help SaaS companies and service businesses bill their customers and get ready for German e-invoicing, without replacing the systems they already use.`}
        />
      </section>

      <section className="border-t border-line" aria-labelledby="products">
        <div className="container-x grid gap-6 py-20 sm:py-24 md:grid-cols-2">
          <h2 id="products" className="sr-only">
            Our products
          </h2>
          <article className="card p-8">
            <p className="eyebrow">Product</p>
            <h3 className="font-display mt-4 text-2xl">Subscription Billing</h3>
            <p className="mt-3 text-lg leading-relaxed">
              Plans, pay links, dunning, payouts and EU compliance tooling for SaaS and subscription businesses.
            </p>
            <Link to="/subscription-billing/" className="link-mint mt-6 inline-flex items-center gap-1">
              Explore Subscription Billing <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <article className="card p-8">
            <p className="eyebrow">Product</p>
            <h3 className="font-display mt-4 text-2xl">E-Invoicing</h3>
            <p className="mt-3 text-lg leading-relaxed">
              XRechnung and ZUGFeRD e-invoices, validated against EN 16931 and handed to Lexware Office, DATEV or
              sevdesk.
            </p>
            <Link to="/e-invoicing/" className="link-mint mt-6 inline-flex items-center gap-1">
              Explore E-Invoicing <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="principles">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow="What we believe" title={<span id="principles">Our principles</span>} />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card p-7">
                <h3 className="font-display text-xl">{p.title}</h3>
                <p className="mt-3 leading-relaxed">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="fits">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow="Where we fit" title={<span id="fits">Keep your accounting. Add what's missing.</span>} />
          <div className="mx-auto mt-14 max-w-5xl">
            <AccountingSplit />
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="company">
        <div className="container-x py-16 sm:py-20">
          <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
            <h2 id="company" className="sr-only">
              Company details
            </h2>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Company</p>
              <p className="mt-2 text-fg">{CONTACT.company}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Address</p>
              <p className="mt-2 text-fg">{CONTACT.address}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Legal</p>
              <p className="mt-2">
                <Link to="/impressum/" className="link-mint">
                  Impressum
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaPanel
        eyebrow="Talk to us"
        title="Tell us how you bill today."
        subtitle="We'll show you where Subscription Billing and E-Invoicing fit, in a 20-minute call."
        primary={{ label: 'Contact Us', to: '/contact/' }}
        secondary={{ label: 'Start Free Trial', to: LINKS.trial }}
      />
    </>
  );
}
