import type { ReactNode } from 'react';

export type LegalSection = { id: string; title: string; body: ReactNode };

/* Small typographic helpers so the documents read as plain content. */
export const P = ({ children }: { children: ReactNode }) => <p className="mt-5 leading-[1.85]">{children}</p>;
export const B = ({ children }: { children: ReactNode }) => <strong className="font-semibold text-fg">{children}</strong>;
export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="font-display mt-8 text-lg">{children}</h3>
);
export const UL = ({ items }: { items: ReactNode[] }) => (
  <ul className="mt-4 list-disc space-y-2.5 pl-11 leading-[1.75] marker:text-faint">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);
export const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="mt-5">
    <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">{label}</p>
    <div className="mt-1.5 text-fg">{children}</div>
  </div>
);
export const Note = ({ children }: { children: ReactNode }) => (
  <p className="mt-5 font-mono text-[0.95rem] text-body">{children}</p>
);

export function LegalPage({
  title,
  subtitle,
  meta,
  sections,
  showToc = true,
  closing,
}: {
  title: string;
  subtitle: string;
  meta?: ReactNode;
  sections: LegalSection[];
  showToc?: boolean;
  closing?: ReactNode;
}) {
  return (
    <article className="mx-auto w-full max-w-[64rem] px-4 py-14 sm:px-8 sm:py-16">
      <header>
        <h1 className="font-display text-[2.5rem] leading-tight sm:text-[3.25rem]">{title}</h1>
        <p className="mt-4 font-mono text-lg text-muted">{subtitle}</p>
        {meta && <div className="mt-4 font-mono text-[0.9rem] leading-loose text-muted">{meta}</div>}
      </header>

      {showToc && (
        <nav aria-label="Contents" className="card mt-12 rounded-2xl p-7">
          <h2 className="font-mono text-sm font-medium uppercase tracking-[0.18em] !text-muted">Contents</h2>
          <ol className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-body transition hover:text-mint">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className={showToc ? 'mt-16' : 'mt-10'}>
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className={`py-10 ${i > 0 ? 'border-t border-line' : ''}`}>
            <h2 className="font-display text-2xl">{s.title}</h2>
            {s.body}
          </section>
        ))}
      </div>

      {closing && (
        <p className="border-t border-line pt-10 font-mono text-[0.95rem] leading-relaxed text-muted">{closing}</p>
      )}
    </article>
  );
}
