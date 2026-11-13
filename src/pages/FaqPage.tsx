import { CtaPanel, SectionHeader } from '../components/ui';
import { FaqList } from '../components/einvoicing';
import { FAQ_CATEGORIES } from '../content/faq';
import { LINKS } from '../config';

/**
 * Every answer sits in the HTML (native disclosure), grouped by topic with
 * plain anchor links, so search engines and AI assistants can read and link
 * to each group without running any script.
 */
export default function FaqPage() {
  return (
    <>
      <section className="container-x pb-10 pt-16 sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="FAQ"
          title="Questions about billing and e-invoicing, answered plainly."
          lead="The e-invoicing mandate, formats, Subscription Billing, E-Invoicing, pricing and data protection."
        />
        <nav aria-label="FAQ topics" className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {FAQ_CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-full border border-line px-4 py-2 text-sm text-body transition hover:border-mint/60 hover:text-fg"
            >
              {c.title}
            </a>
          ))}
        </nav>
      </section>

      <div className="container-x pb-20 sm:pb-24">
        <div className="mx-auto max-w-4xl">
          {FAQ_CATEGORIES.map((c) => (
            <section key={c.id} id={c.id} className="pt-14" aria-labelledby={`${c.id}-title`}>
              <h2 id={`${c.id}-title`} className="font-display text-[1.75rem] sm:text-[2rem]">
                {c.title}
              </h2>
              <div className="mt-4">
                <FaqList items={c.items} openFirst={false} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaPanel
        eyebrow="Still have questions?"
        title="Ask a person, not a chatbot."
        subtitle="We reply within one business day, usually with your first plan already sketched out."
        primary={{ label: 'Contact Us', to: '/contact/' }}
        secondary={{ label: 'Book a Demo', to: LINKS.demo }}
      />
    </>
  );
}
