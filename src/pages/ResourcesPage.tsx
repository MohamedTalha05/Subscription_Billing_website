import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CtaPanel, SectionHeader } from '../components/ui';
import { formatDate } from '../components/einvoicing';
import { GUIDES, guidePath } from '../content/guides';
import { LINKS } from '../config';

export default function ResourcesPage() {
  const [featured, ...rest] = GUIDES;
  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="Guides"
          title="E-invoicing guides, reviewed when the rules change."
          lead="Practical articles on German e-invoicing, XRechnung, ZUGFeRD, EN 16931 and billing compliance. Each guide shows when it was last checked."
        />
      </section>

      <section className="container-x pb-20 sm:pb-24" aria-label="All guides">
        <Link
          to={guidePath(featured.slug)}
          className="group block rounded-2xl border border-mint/40 bg-highlight/30 p-8 transition hover:border-mint sm:p-10"
        >
          <p className="eyebrow">Featured · {featured.category}</p>
          <h2 className="font-display mt-4 max-w-3xl text-[1.75rem] leading-tight sm:text-[2.25rem]">{featured.title}</h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed">{featured.description}</p>
          <p className="mt-6 inline-flex items-center gap-1 font-semibold text-mint">
            Read the guide <ArrowRight size={16} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
          </p>
        </Link>

        <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((g) => (
            <li key={g.slug}>
              <Link to={guidePath(g.slug)} className="card flex h-full flex-col p-7 transition hover:border-mint/50">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-mint">{g.category}</p>
                <h2 className="font-display mt-3 text-xl leading-snug">{g.title}</h2>
                <p className="mt-3 flex-1 leading-relaxed">{g.description}</p>
                <p className="mt-5 font-mono text-xs text-muted">
                  {g.readMinutes} min read · Reviewed <time dateTime={g.reviewed}>{formatDate(g.reviewed)}</time>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaPanel
        eyebrow="Ready for e-invoicing?"
        title="Put the guides into practice with your first e-invoice."
        subtitle="Free for up to 5 e-invoices a month, with no change to your accounting software."
        primary={{ label: 'Start Free', to: LINKS.trial }}
        secondary={{ label: 'See E-Invoicing', to: '/e-invoicing/' }}
      />
    </>
  );
}
