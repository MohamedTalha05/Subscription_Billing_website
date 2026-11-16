import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CtaPanel, SectionHeader } from '../components/ui';
import { formatDate } from '../components/einvoicing';
import { GUIDES, guideBySlug, guidePath } from '../content/guides';
import { LINKS } from '../config';

/** Common starting questions, each pointing at the guide that answers it. */
const READING_PATHS = [
  {
    slug: 'german-e-invoicing-what-businesses-need-to-know',
    question: 'Does the e-invoicing mandate apply to my business?',
    answer: 'Start with the overview: who has to receive and issue e-invoices, from when, and which invoices are covered.',
  },
  {
    slug: 'xrechnung-vs-zugferd',
    question: 'Should we send XRechnung or ZUGFeRD?',
    answer: 'Compare the two formats, when customers ask for one or the other, and why both can come from the same invoice data.',
  },
  {
    slug: 'prepare-your-saas-for-german-e-invoicing',
    question: 'We run a SaaS. What do we need to change?',
    answer: 'A practical checklist for subscription businesses that issue an invoice on every renewal.',
  },
  {
    slug: 'how-e-invoicing-works-with-accounting-software',
    question: 'Do we have to replace our accounting software?',
    answer: 'No. See how an e-invoicing step hands invoices to Lexware Office, DATEV or sevdesk, and what stays the same.',
  },
];

export default function ResourcesPage() {
  const [featured, ...rest] = GUIDES;
  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="Resources & guides"
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

      <section className="container-x pb-20 sm:pb-24" aria-labelledby="start-here">
        <SectionHeader
          id="start-here"
          eyebrow="Where to start"
          title="Pick the guide that matches your question."
          lead="The guides build on each other, but you don't need to read them in order. Start with the one closest to the decision in front of you."
        />
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {READING_PATHS.map((p) => {
            const g = guideBySlug(p.slug);
            if (!g) return null;
            return (
              <li key={p.slug} className="card p-7">
                <h3 className="font-display text-xl leading-snug">{p.question}</h3>
                <p className="mt-3 leading-relaxed">{p.answer}</p>
                <Link to={guidePath(g.slug)} className="link-mint mt-4 inline-flex items-center gap-1 font-semibold">
                  {g.title} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 max-w-3xl space-y-4 text-lg leading-relaxed">
          <h2 className="font-display text-2xl text-fg">How these guides are kept current</h2>
          <p>
            German e-invoicing rules are phased in over several years and clarified in letters from the Federal Ministry
            of Finance, so a guide that was accurate last year can drift. Every guide shows the date it was last
            reviewed, and the dates, thresholds and transition periods themselves live in one place: the{' '}
            <Link to="/compliance/" className="link-mint">
              e-invoicing mandate timeline
            </Link>
            , which the guides link to rather than repeat.
          </p>
          <p>
            The guides explain how the rules work in practice. They are not legal or tax advice; for decisions about
            your own business, check with your tax advisor.
          </p>
        </div>
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
