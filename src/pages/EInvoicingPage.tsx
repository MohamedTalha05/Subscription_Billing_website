/**
 * E-Invoicing product page, in English (/e-invoicing/) and German
 * (/de/e-rechnung/). The layout is shared; COPY holds the page text and the
 * content bundles (useEI) hold the product facts.
 */
import { Link } from 'react-router-dom';
import { ArrowRight, Check, FileCode2, FilePlus2, History, Plug, Send, ShieldCheck } from 'lucide-react';
import { ButtonLink, CtaPanel, Eyebrow, SectionHeader } from '../components/ui';
import {
  AccountingSplit,
  DeadlineStrip,
  EInvoicingPlanCards,
  FaqList,
  FormatCards,
  IntegrationGrid,
  InvoiceMock,
  PdfVsStructured,
  WorkflowSteps,
  useEI,
} from '../components/einvoicing';
import { localizedPath, useLang } from '../i18n';
import { LINKS } from '../config';

const CAPABILITY_ICONS = [FilePlus2, ShieldCheck, FileCode2, Send, Plug, History];

const COPY = {
  en: {
    eyebrow: 'E-Invoicing for Germany · XRechnung & ZUGFeRD',
    h1a: 'German e-invoicing, ',
    h1mark: 'ready for 2027',
    h1b: '. No new accounting software.',
    lead: 'Create, validate and generate compliant e-invoices, then hand them to Lexware Office, DATEV or sevdesk. Your accounting stays exactly as it is.',
    start: 'Start Free',
    demo: 'Book a Demo',
    note: 'Free for up to 5 e-invoices a month · then from €9 a month, excl. VAT',
    basics: 'The basics',
    whatIs: 'What is an e-invoice?',
    definition:
      'An e-invoice is an invoice issued, sent and received in a structured electronic format that software can process automatically, following the European standard EN 16931. In Germany the common formats are XRechnung and ZUGFeRD. A PDF made in Word or exported from a design tool is not an e-invoice.',
    whoLink: 'Who has to issue e-invoices, and when',
    howEyebrow: 'How it works',
    howTitle: 'Capture. Validate. Generate. Transfer.',
    getEyebrow: 'What you get',
    getTitle: 'The e-invoicing layer, and nothing more.',
    getLead: 'Focused on what e-invoicing requires, so your bookkeeping stays in your accounting software.',
    splitEyebrow: 'A clear division of work',
    splitTitle: 'Keep your accounting. Add e-invoicing.',
    splitLead: "E-Invoicing adds to your accounting software. It doesn't replace it.",
    formatsEyebrow: 'Formats & standards',
    formatsTitle: 'XRechnung, ZUGFeRD and EN 16931',
    formatsLead: 'Generate the format your recipient needs, from the same validated invoice data.',
    compareLink: 'Compare XRechnung and ZUGFeRD side by side',
    intEyebrow: 'Integrations',
    intTitle: 'Connect your accounting software.',
    intLead: 'Every integration shows its real status: available, in preview or coming soon.',
    madeFor: 'Made for',
    madeForTitle: 'German SMEs and service businesses',
    priceEyebrow: 'Pricing',
    priceTitle: 'Priced like an add-on, not a new accounting package.',
    priceLead: 'You already pay for accounting. With E-Invoicing you only pay for e-invoices: start free and cancel monthly.',
    compareAll: 'Compare all plans and costs per e-invoice',
    faqTitle: 'E-invoicing questions, answered plainly',
    ctaEyebrow: 'Ready for e-invoicing?',
    ctaTitle: 'Create and validate your first e-invoice today.',
    ctaSub: 'Free for up to 5 e-invoices a month. No new accounting software, no card required.',
  },
  de: {
    eyebrow: 'E-Rechnung für Deutschland · XRechnung & ZUGFeRD',
    h1a: 'Die E-Rechnung. ',
    h1mark: 'Bereit für 2027',
    h1b: ', ohne neue Buchhaltung.',
    lead: 'Erstellen, prüfen und erzeugen Sie konforme E-Rechnungen und übergeben Sie sie an Lexware Office, DATEV oder sevdesk. Ihre Buchhaltung bleibt, wie sie ist.',
    start: 'Kostenlos starten',
    demo: 'Demo buchen',
    note: 'Kostenlos für bis zu 5 E-Rechnungen im Monat · danach ab 9 € im Monat, zzgl. MwSt.',
    basics: 'Die Grundlagen',
    whatIs: 'Was ist eine E-Rechnung?',
    definition:
      'Eine E-Rechnung wird in einem strukturierten elektronischen Format ausgestellt, übermittelt und empfangen, das Software automatisch verarbeiten kann. Maßgeblich ist die europäische Norm EN 16931. In Deutschland sind XRechnung und ZUGFeRD die üblichen Formate. Eine PDF aus Word oder einem Grafikprogramm ist keine E-Rechnung.',
    whoLink: 'Wer muss wann E-Rechnungen ausstellen?',
    howEyebrow: "So funktioniert's",
    howTitle: 'Erfassen. Prüfen. Erzeugen. Übertragen.',
    getEyebrow: 'Funktionen',
    getTitle: 'Alles, was die E-Rechnung braucht.',
    getLead: 'Fokussiert auf Erstellen, Prüfen, Erzeugen und Übergeben. Die Buchhaltung bleibt in Ihrer Software.',
    splitEyebrow: 'Klare Aufgabenteilung',
    splitTitle: 'Buchhaltung behalten. E-Rechnung ergänzen.',
    splitLead: 'MYFUNDBOX E-Rechnung ergänzt Ihre Buchhaltungssoftware. Es ersetzt sie nicht.',
    formatsEyebrow: 'Formate & Normen',
    formatsTitle: 'XRechnung, ZUGFeRD und EN 16931',
    formatsLead: 'Erzeugen Sie das Format, das Ihr Empfänger braucht, aus denselben geprüften Rechnungsdaten.',
    compareLink: 'XRechnung und ZUGFeRD im direkten Vergleich',
    intEyebrow: 'Integrationen',
    intTitle: 'Ihre Buchhaltungssoftware anbinden.',
    intLead: 'Der Status jeder Integration wird ehrlich angezeigt: verfügbar, in der Vorschau oder demnächst.',
    madeFor: 'Gemacht für',
    madeForTitle: 'Den deutschen Mittelstand und Dienstleister',
    priceEyebrow: 'Preise',
    priceTitle: 'Ein Add-on-Preis statt eines neuen Buchhaltungspakets.',
    priceLead: 'Sie zahlen bereits für Ihre Buchhaltung. Mit MYFUNDBOX zahlen Sie nur für die E-Rechnung: kostenlos starten, monatlich kündbar.',
    compareAll: 'Alle Tarife und Kosten pro E-Rechnung vergleichen (Englisch)',
    faqTitle: 'Häufige Fragen zur E-Rechnung',
    ctaEyebrow: 'Bereit für die E-Rechnung?',
    ctaTitle: 'Erstellen und prüfen Sie heute Ihre erste E-Rechnung.',
    ctaSub: 'Kostenlos für bis zu 5 E-Rechnungen im Monat. Keine neue Buchhaltung, keine Kreditkarte nötig.',
  },
};

export default function EInvoicingPage() {
  const lang = useLang();
  const c = COPY[lang];
  const ei = useEI();

  return (
    <>
      <section className="container-x grid items-center gap-16 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-24 lg:pt-24">
        <div>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] leading-[1.06] sm:text-[3.5rem] lg:text-[3.75rem]">
            {c.h1a}
            <span className="marker">{c.h1mark}</span>
            {c.h1b}
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed sm:text-[1.1875rem]">{c.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={LINKS.trial}>{c.start}</ButtonLink>
            <ButtonLink to={LINKS.demo} variant="ghost">
              {c.demo}
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-sm text-muted">{c.note}</p>
        </div>
        <div className="pb-6">
          <InvoiceMock />
        </div>
      </section>

      <div className="container-x">
        <DeadlineStrip />
      </div>

      <section className="container-x py-20 sm:py-24" aria-labelledby="what-is">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <Eyebrow>{c.basics}</Eyebrow>
            <h2 id="what-is" className="font-display mt-4 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
              {c.whatIs}
            </h2>
            <p className="mt-5 text-lg leading-relaxed">{c.definition}</p>
            <Link to={localizedPath('/compliance/', lang)} className="link-mint mt-6 inline-flex items-center gap-1">
              {c.whoLink} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-4">
            <PdfVsStructured />
            <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {ei.WHY_E_INVOICING.map((w) => (
                <li key={w.title} className="bg-surface p-6">
                  <h3 className="font-semibold">{w.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{w.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.howEyebrow} title={c.howTitle} />
          <div className="mt-14">
            <WorkflowSteps />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.getEyebrow} title={c.getTitle} lead={c.getLead} />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {ei.CAPABILITIES.map((cap, i) => {
              const Icon = CAPABILITY_ICONS[i];
              return (
                <article key={cap.title} className="bg-surface p-7">
                  <span className="icon-tile">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{cap.title}</h3>
                  <p className="mt-3 leading-relaxed">{cap.desc}</p>
                </article>
              );
            })}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ei.DETAIL_LISTS.map((d) => (
              <article key={d.title} className="card p-7">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{d.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {d.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-fg/90">
                      <Check size={16} className="mt-1 shrink-0 text-mint" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.splitEyebrow} title={c.splitTitle} lead={c.splitLead} />
          <div className="mx-auto mt-14 max-w-5xl">
            <AccountingSplit />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.formatsEyebrow} title={c.formatsTitle} lead={c.formatsLead} />
          <div className="mt-14">
            <FormatCards />
          </div>
          <p className="mt-8 text-center">
            <Link to={`${localizedPath('/compliance/', lang)}#formats`} className="link-mint inline-flex items-center gap-1">
              {c.compareLink} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.intEyebrow} title={c.intTitle} lead={c.intLead} />
          <div className="mt-14">
            <IntegrationGrid />
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-16 text-center sm:py-20">
          <SectionHeader eyebrow={c.madeFor} title={c.madeForTitle} />
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2.5">
            {ei.INDUSTRIES.map((i) => (
              <li key={i} className="rounded-full border border-line px-4 py-2 text-body">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="pricing" className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.priceEyebrow} title={c.priceTitle} lead={c.priceLead} />
          <div className="mt-14">
            <EInvoicingPlanCards />
          </div>
          <p className="mt-8 text-center text-[0.9375rem] text-muted">
            {ei.EINVOICING_PRICING_NOTE}{' '}
            <Link to="/pricing/#e-invoicing" className="link-mint" hrefLang="en">
              {c.compareAll}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <div className="mx-auto max-w-4xl">
            <SectionHeader title={c.faqTitle} />
            <div className="mt-10">
              <FaqList items={ei.EINVOICING_FAQ} />
            </div>
            <p className="mt-10 text-sm leading-relaxed text-muted">{ei.EINVOICING_SCOPE_NOTE}</p>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <CtaPanel
          eyebrow={c.ctaEyebrow}
          title={c.ctaTitle}
          subtitle={c.ctaSub}
          primary={{ label: c.start, to: LINKS.trial }}
          secondary={{ label: c.demo, to: LINKS.demo }}
        />
      </div>
    </>
  );
}
