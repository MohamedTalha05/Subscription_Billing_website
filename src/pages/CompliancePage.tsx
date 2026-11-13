/**
 * E-invoicing mandate page, in English (/compliance/) and German
 * (/de/e-rechnungspflicht/). Shared layout; COPY holds the page text and the
 * content bundles (useEI) hold the facts, dates and sources.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Info } from 'lucide-react';
import { CtaPanel, Eyebrow, SectionHeader } from '../components/ui';
import {
  DeadlineStrip,
  FaqList,
  FormatCards,
  FormatComparisonTable,
  MandateTimeline,
  PdfVsStructured,
  PrepChecklist,
  formatDate,
  useEI,
} from '../components/einvoicing';
import { MANDATE_REVIEWED } from '../content/eInvoicing';
import { localizedPath, useLang } from '../i18n';
import { LINKS } from '../config';

const COPY = {
  en: {
    eyebrow: 'E-invoicing mandate',
    title: 'E-invoicing in Germany: who must do what, and when.',
    lead: 'What an e-invoice is, which formats and standards count, and what businesses and software providers need to prepare for the 2027 and 2028 deadlines.',
    lastReviewed: 'Last reviewed',
    inShort: 'In short',
    affectedEyebrow: 'Does it affect me?',
    affectedTitle: 'The obligation at a glance',
    basics: 'The basics',
    whatIs: 'What is an e-invoice?',
    whatIsP1: 'An e-invoice is issued, sent and received in a structured electronic format that allows automatic processing. In Europe the standard is EN 16931.',
    whatIsP2a: 'The key word is ',
    whatIsStrong: 'structured',
    whatIsP2b: ': every value has a fixed place, so the recipient’s software can read it without anyone typing it in.',
    formatsEyebrow: 'Formats & standards',
    formatsTitle: 'XRechnung, ZUGFeRD and EN 16931',
    versus: 'XRechnung vs ZUGFeRD',
    timelineEyebrow: 'Timeline',
    timelineTitle: 'Deadlines and transition rules',
    timelineLead: 'The obligations are introduced over several years. This timeline is maintained and updated when the official rules change.',
    prepEyebrow: 'Get ready',
    prepTitle: 'What to prepare',
    prepBusinesses: 'Businesses should',
    prepSoftware: 'SaaS and software providers should',
    beyondEyebrow: 'Beyond e-invoicing',
    beyondTitle: 'Other EU rules your billing has to follow',
    beyondLead: 'Subscription Billing covers the other regulations that touch recurring revenue in the EU.',
    beyondLink: 'Security & compliance in detail',
    rules: [
      { tag: 'GDPR', text: 'Article 15 portability exports and Article 17 erasure, with deletion requests your team reviews.' },
      { tag: 'PSD2', text: 'A Strong Customer Authentication sandbox to test checkout challenges before launch.' },
      { tag: 'EU VAT', text: 'VAT IDs checked against VIES in real time, with the right rate by customer country.' },
    ],
    faqTitle: 'Mandate questions, answered plainly',
    sources: 'Official sources',
    ctaEyebrow: 'Get ready now',
    ctaTitle: 'Start with your first validated e-invoice today.',
    ctaSub: 'Free for up to 5 e-invoices a month, with no change to your accounting software.',
    start: 'Start Free',
    see: 'See E-Invoicing',
  },
  de: {
    eyebrow: 'E-Rechnungspflicht',
    title: 'E-Rechnungspflicht in Deutschland: was wann für wen gilt.',
    lead: 'Was eine E-Rechnung ist, welche Formate und Normen zählen und was Unternehmen und Software-Anbieter für die Fristen 2027 und 2028 vorbereiten müssen.',
    lastReviewed: 'Zuletzt geprüft am',
    inShort: 'Kurz gesagt',
    affectedEyebrow: 'Betrifft mich das?',
    affectedTitle: 'Die Pflicht auf einen Blick',
    basics: 'Die Grundlagen',
    whatIs: 'Was ist eine E-Rechnung?',
    whatIsP1: 'Eine E-Rechnung wird in einem strukturierten elektronischen Format ausgestellt, übermittelt und empfangen, das eine automatische Verarbeitung ermöglicht. Maßgeblich in Europa ist die Norm EN 16931.',
    whatIsP2a: 'Entscheidend ist das Wort ',
    whatIsStrong: 'strukturiert',
    whatIsP2b: ': Jeder Wert hat einen festen Platz, sodass die Software des Empfängers ihn ohne manuelle Eingabe lesen kann.',
    formatsEyebrow: 'Formate & Normen',
    formatsTitle: 'XRechnung, ZUGFeRD und EN 16931',
    versus: 'XRechnung vs. ZUGFeRD',
    timelineEyebrow: 'Zeitplan',
    timelineTitle: 'Fristen und Übergangsregeln',
    timelineLead: 'Die Pflichten werden über mehrere Jahre eingeführt. Dieser Zeitplan wird gepflegt und aktualisiert, sobald sich offizielle Vorgaben ändern.',
    prepEyebrow: 'Vorbereitung',
    prepTitle: 'Was Sie vorbereiten sollten',
    prepBusinesses: 'Unternehmen sollten',
    prepSoftware: 'SaaS- und Software-Anbieter sollten',
    beyondEyebrow: 'Über die E-Rechnung hinaus',
    beyondTitle: 'Weitere EU-Regeln für Ihre Abrechnung',
    beyondLead: 'Subscription Billing deckt die weiteren Vorgaben ab, die wiederkehrende Umsätze in der EU betreffen.',
    beyondLink: 'Sicherheit & Compliance im Detail (Englisch)',
    rules: [
      { tag: 'DSGVO', text: 'Datenexporte nach Art. 15 und Löschung nach Art. 17, mit Löschanfragen, die Ihr Team prüft.' },
      { tag: 'PSD2', text: 'Eine Sandbox für die starke Kundenauthentifizierung, um Checkout-Abfragen vor dem Start zu testen.' },
      { tag: 'EU-USt', text: 'USt-IdNr. in Echtzeit gegen VIES geprüft, mit dem richtigen Steuersatz je Kundenland.' },
    ],
    faqTitle: 'Häufige Fragen zur E-Rechnungspflicht',
    sources: 'Offizielle Quellen',
    ctaEyebrow: 'Jetzt vorbereiten',
    ctaTitle: 'Starten Sie noch heute mit Ihrer ersten geprüften E-Rechnung.',
    ctaSub: 'Kostenlos für bis zu 5 E-Rechnungen im Monat, ohne Wechsel Ihrer Buchhaltungssoftware.',
    start: 'Kostenlos starten',
    see: 'Zur E-Rechnung',
  },
};

export default function CompliancePage() {
  const lang = useLang();
  const c = COPY[lang];
  const ei = useEI();

  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeader as="h1" eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
        <div className="card mx-auto mt-10 flex max-w-3xl gap-3.5 rounded-xl p-5 text-left">
          <Info size={18} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
          <p className="text-[0.9375rem] leading-relaxed text-fg/85">
            {ei.COMPLIANCE_DISCLAIMER} {c.lastReviewed}{' '}
            <time dateTime={MANDATE_REVIEWED}>{formatDate(MANDATE_REVIEWED, lang)}</time>.
          </p>
        </div>
      </section>

      {/* A short, quotable summary first: the answer most readers (and AI assistants) are looking for. */}
      <section className="container-x pb-16" aria-labelledby="in-short">
        <div className="mx-auto max-w-4xl rounded-2xl border border-mint/40 bg-highlight/30 p-7 sm:p-9">
          <h2 id="in-short" className="eyebrow">
            {c.inShort}
          </h2>
          <ul className="mt-5 space-y-3 text-lg leading-relaxed text-fg/90">
            {ei.MANDATE_SUMMARY.map((s) => (
              <li key={s} className="flex gap-3">
                <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mx-auto mt-6 max-w-4xl">
          <DeadlineStrip withLink={false} />
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="affected">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.affectedEyebrow} title={<span id="affected">{c.affectedTitle}</span>} />
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {ei.WHO_IS_AFFECTED.map((w) => (
              <article key={w.who} className="card p-7">
                <h3 className="font-display text-xl">{w.who}</h3>
                <p className="mt-3 text-lg leading-relaxed">{w.what}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="basics">
        <div className="container-x py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <Eyebrow>{c.basics}</Eyebrow>
              <h2 id="basics" className="font-display mt-4 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
                {c.whatIs}
              </h2>
              <p className="mt-5 text-lg leading-relaxed">{c.whatIsP1}</p>
              <p className="mt-4 text-lg leading-relaxed">
                {c.whatIsP2a}
                <strong className="text-fg">{c.whatIsStrong}</strong>
                {c.whatIsP2b}
              </p>
            </div>
            <PdfVsStructured />
          </div>
        </div>
      </section>

      <section id="formats" className="border-t border-line" aria-labelledby="formats-title">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.formatsEyebrow} title={<span id="formats-title">{c.formatsTitle}</span>} />
          <div className="mt-14">
            <FormatCards />
          </div>
          <h3 className="font-display mt-14 text-2xl">{c.versus}</h3>
          <div className="mt-6">
            <FormatComparisonTable />
          </div>
        </div>
      </section>

      <section id="timeline" className="border-t border-line" aria-labelledby="timeline-title">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader
            eyebrow={c.timelineEyebrow}
            title={<span id="timeline-title">{c.timelineTitle}</span>}
            lead={c.timelineLead}
          />
          <div className="mt-14">
            <MandateTimeline />
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="prepare">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.prepEyebrow} title={<span id="prepare">{c.prepTitle}</span>} />
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <PrepChecklist title={c.prepBusinesses} items={ei.PREPARE_BUSINESSES} />
            <PrepChecklist title={c.prepSoftware} items={ei.PREPARE_SOFTWARE} />
          </div>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="other-rules">
        <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>{c.beyondEyebrow}</Eyebrow>
            <h2 id="other-rules" className="font-display mt-4 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
              {c.beyondTitle}
            </h2>
            <p className="mt-5 text-lg leading-relaxed">{c.beyondLead}</p>
            <Link to="/security/" className="link-mint mt-6 inline-flex items-center gap-1">
              {c.beyondLink} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {c.rules.map((r) => (
              <li key={r.tag} className="card p-6">
                <p className="font-mono text-sm uppercase tracking-[0.16em] text-mint">{r.tag}</p>
                <p className="mt-3 leading-relaxed">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeader title={c.faqTitle} />
            <div className="mt-10">
              <FaqList items={ei.COMPLIANCE_FAQ} />
            </div>
            <div className="mt-12">
              <h2 className="eyebrow !text-body">{c.sources}</h2>
              <ul className="mt-4 space-y-2">
                {ei.OFFICIAL_SOURCES.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-mint inline-flex items-center gap-1.5">
                      {s.label} <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <CtaPanel
          eyebrow={c.ctaEyebrow}
          title={c.ctaTitle}
          subtitle={c.ctaSub}
          primary={{ label: c.start, to: LINKS.trial }}
          secondary={{ label: c.see, to: localizedPath('/e-invoicing/', lang) }}
        />
      </div>
    </>
  );
}
