import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { CtaPanel } from '../components/ui';
import { formatDate } from '../components/einvoicing';
import { COMPLIANCE_DISCLAIMER } from '../content/eInvoicing';
import { guideBySlug, guidePath } from '../content/guides';
import { LINKS } from '../config';
import NotFoundPage from './NotFoundPage';

export default function GuidePage() {
  const { slug = '' } = useParams();
  const guide = guideBySlug(slug);
  if (!guide) return <NotFoundPage />;

  const related = guide.related.map(guideBySlug).filter((g) => g !== undefined);

  return (
    <>
      <article className="container-x pb-16 pt-12 sm:pt-16">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Breadcrumb" className="font-mono text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/resources/" className="inline-flex items-center gap-1 hover:text-fg">
                  <ArrowLeft size={14} aria-hidden="true" /> Guides
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-mint">{guide.category}</li>
            </ol>
          </nav>

          <header className="mt-8">
            <h1 className="font-display text-[2.25rem] leading-[1.1] sm:text-[3rem]">{guide.title}</h1>
            <p className="mt-5 text-xl leading-relaxed">{guide.description}</p>
            <p className="mt-6 font-mono text-sm text-muted">
              Published <time dateTime={guide.published}>{formatDate(guide.published)}</time> · Last reviewed{' '}
              <time dateTime={guide.reviewed}>{formatDate(guide.reviewed)}</time> · {guide.readMinutes} min read · By
              MYFUNDBOX
            </p>
          </header>

          {guide.compliance && (
            <aside className="card mt-10 flex gap-3.5 rounded-xl p-5">
              <Info size={18} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
              <p className="text-[0.9375rem] leading-relaxed text-fg/85">{COMPLIANCE_DISCLAIMER}</p>
            </aside>
          )}

          <div className="mt-6">
            {guide.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 className="font-display text-2xl sm:text-[1.75rem]">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)} className="mt-4 text-lg leading-[1.8]">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {guide.compliance && (
            <p className="mt-12 rounded-xl border border-line p-5">
              <Link to="/compliance/#timeline" className="link-mint inline-flex items-center gap-1">
                See the compliance timeline for current dates and their review status{' '}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </p>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line" aria-labelledby="related">
          <div className="container-x py-16 sm:py-20">
            <h2 id="related" className="font-display text-2xl">
              Related guides
            </h2>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((g) => (
                <li key={g.slug}>
                  <Link to={guidePath(g.slug)} className="card flex h-full flex-col p-6 transition hover:border-mint/50">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-mint">{g.category}</p>
                    <h3 className="mt-3 text-lg font-semibold">{g.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed">{g.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaPanel
        eyebrow="Ready for German e-invoicing?"
        title="Create and validate your first e-invoice today."
        subtitle="Free for up to 5 e-invoices a month. Your accounting software stays as it is."
        primary={{ label: 'Start Free', to: LINKS.trial }}
        secondary={{ label: 'See E-Invoicing', to: '/e-invoicing/' }}
      />
    </>
  );
}
