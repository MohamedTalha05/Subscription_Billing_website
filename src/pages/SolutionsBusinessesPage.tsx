/**
 * Solutions page for SMEs and service businesses, in English
 * (/solutions/businesses/) and German (/de/e-rechnung-fuer-kmu/).
 */
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileCode2,
  FileMinus2,
  FilePlus2,
  History,
  ListChecks,
  Plug,
  Rocket,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { ButtonLink, CtaPanel, Eyebrow, SectionHeader } from '../components/ui';
import { DeadlineStrip, EInvoicingPlanCards, InvoiceMock, useEI } from '../components/einvoicing';
import { localizedPath, useLang } from '../i18n';
import { LINKS } from '../config';

const ICONS = [FilePlus2, Users, ShieldCheck, FileCode2, Plug, ListChecks, History, FileMinus2, Rocket];

const COPY = {
  en: {
    eyebrow: 'For SMEs & service businesses',
    title: 'Your simple e-invoicing workspace.',
    lead: 'Issue compliant e-invoices without buying a bigger accounting package. Keep the software you and your tax advisor already use.',
    start: 'Start Free',
    demo: 'Book a Demo',
    steps: 'Capture · Check · Generate · Transfer · Track',
    tasksEyebrow: 'All in one place',
    tasksTitle: 'What you get done with E-Invoicing',
    tasks: [
      { title: 'Create e-invoices', desc: 'A guided form for every required detail under § 14 UStG, with no XML knowledge needed.' },
      { title: 'Manage customers', desc: 'Enter customer details, VAT IDs and Leitweg-IDs once and reuse them.' },
      { title: 'Check invoices', desc: 'Find missing details and calculation errors before an invoice goes out.' },
      { title: 'Generate XRechnung & ZUGFeRD', desc: 'Pick the format your customer needs, from the same invoice.' },
      { title: 'Connect your accounting', desc: 'Hand documents to Lexware Office, DATEV or sevdesk, with the integration status always visible.' },
      { title: 'Track status', desc: 'See what has been checked, generated, delivered and transferred.' },
      { title: 'Keep an audit trail', desc: 'A complete, time-stamped history of every change, for tax audits and your tax advisor.' },
      { title: 'Issue credit notes', desc: 'Structured credit notes that reference the original invoice.' },
      { title: 'Start small', desc: 'Begin with a few invoices now and grow when the obligation applies to you.' },
    ],
    affectedEyebrow: 'Does it affect me?',
    affectedTitle: 'The obligation at a glance',
    affectedLink: 'Deadlines, formats and sources in detail',
    madeFor: 'Made for',
    madeForTitle: 'The German Mittelstand and service businesses',
    subsA: 'Running memberships or subscriptions, like a gym, club or course provider? ',
    subsB: ' collects the recurring payments too.',
    priceEyebrow: 'Pricing',
    priceTitle: 'Start free. Pay only for e-invoices.',
    priceLead: 'No new accounting package, no setup fee, cancel monthly.',
    compareAll: 'Compare all plans',
    ctaEyebrow: 'Ready for German e-invoicing?',
    ctaTitle: 'Your first e-invoice in minutes, free.',
    ctaSub: 'Keep your accounting software. Add e-invoicing.',
    seePricing: 'See Pricing',
  },
  de: {
    eyebrow: 'Für KMU & Dienstleister',
    title: 'Ihr einfacher E-Rechnungs-Arbeitsplatz.',
    lead: 'Konforme E-Rechnungen ausstellen, ohne teure Buchhaltungssoftware dazuzukaufen. Behalten Sie die Programme, die Sie und Ihr Steuerberater bereits nutzen.',
    start: 'Kostenlos starten',
    demo: 'Demo buchen',
    steps: 'Erfassen · Prüfen · Erzeugen · Übertragen · Nachverfolgen',
    tasksEyebrow: 'Alles an einem Ort',
    tasksTitle: 'Was Sie mit MYFUNDBOX erledigen',
    tasks: [
      { title: 'E-Rechnungen erstellen', desc: 'Ein geführtes Formular für alle Pflichtangaben nach § 14 UStG, ganz ohne XML-Kenntnisse.' },
      { title: 'Kunden verwalten', desc: 'Kundendaten, USt-IdNr. und Leitweg-IDs einmal erfassen und wiederverwenden.' },
      { title: 'Rechnungen prüfen', desc: 'Fehlende Angaben und Rechenfehler finden, bevor eine Rechnung rausgeht.' },
      { title: 'XRechnung & ZUGFeRD erzeugen', desc: 'Aus derselben Rechnung das Format wählen, das Ihr Kunde braucht.' },
      { title: 'Buchhaltung anbinden', desc: 'Belege an Lexware Office, DATEV oder sevdesk übergeben, mit sichtbarem Integrationsstatus.' },
      { title: 'Status verfolgen', desc: 'Sehen, was geprüft, erzeugt, zugestellt und übertragen wurde.' },
      { title: 'Prüfprotokoll führen', desc: 'Ein lückenloser, zeitgestempelter Verlauf jeder Änderung, für Betriebsprüfung und Steuerberater.' },
      { title: 'Gutschriften ausstellen', desc: 'Strukturierte Gutschriften mit Bezug auf die Originalrechnung.' },
      { title: 'Schritt für Schritt bereit', desc: 'Jetzt mit wenigen Rechnungen starten und wachsen, wenn die Pflicht für Sie gilt.' },
    ],
    affectedEyebrow: 'Betrifft mich das?',
    affectedTitle: 'Die Pflicht auf einen Blick',
    affectedLink: 'Fristen, Formate und Quellen im Detail',
    madeFor: 'Gemacht für',
    madeForTitle: 'Den deutschen Mittelstand und Dienstleister',
    subsA: 'Sie verkaufen Mitgliedschaften oder Abos, etwa als Fitnessstudio, Verein oder Kursanbieter? ',
    subsB: ' übernimmt auch die wiederkehrenden Zahlungen.',
    priceEyebrow: 'Preise',
    priceTitle: 'Kostenlos starten. Nur für E-Rechnungen zahlen.',
    priceLead: 'Keine neue Buchhaltung, keine Einrichtungsgebühr, monatlich kündbar.',
    compareAll: 'Alle Tarife vergleichen (Englisch)',
    ctaEyebrow: 'Bereit für die deutsche E-Rechnung?',
    ctaTitle: 'Ihre erste E-Rechnung in wenigen Minuten, kostenlos.',
    ctaSub: 'Buchhaltung behalten. E-Rechnung ergänzen.',
    seePricing: 'Preise ansehen',
  },
};

export default function SolutionsBusinessesPage() {
  const lang = useLang();
  const c = COPY[lang];
  const ei = useEI();

  return (
    <>
      <section className="container-x grid items-center gap-16 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pt-24">
        <div>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="font-display mt-5 text-[2.5rem] leading-[1.06] sm:text-[3.25rem] lg:text-[3.5rem]">{c.title}</h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed sm:text-[1.1875rem]">{c.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={LINKS.trial}>{c.start}</ButtonLink>
            <ButtonLink to={LINKS.demo} variant="ghost">
              {c.demo}
            </ButtonLink>
          </div>
          <p className="mt-6 font-mono text-sm text-muted">{c.steps}</p>
        </div>
        <div className="pb-6">
          <InvoiceMock />
        </div>
      </section>

      <div className="container-x">
        <DeadlineStrip />
      </div>

      <section className="container-x py-20 sm:py-24" aria-labelledby="tasks">
        <SectionHeader eyebrow={c.tasksEyebrow} title={<span id="tasks">{c.tasksTitle}</span>} />
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {c.tasks.map(({ title, desc }, i) => {
            const Icon = ICONS[i];
            return (
              <article key={title} className="bg-surface p-7">
                <span className="icon-tile">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2.5 leading-relaxed">{desc}</p>
              </article>
            );
          })}
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
          <p className="mt-8 text-center">
            <Link to={localizedPath('/compliance/', lang)} className="link-mint inline-flex items-center gap-1">
              {c.affectedLink} <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </p>
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
          <p className="mx-auto mt-10 max-w-2xl leading-relaxed">
            {c.subsA}
            <Link to="/subscription-billing/" className="link-mint">
              Subscription Billing
            </Link>
            {c.subsB}
          </p>
        </div>
      </section>

      <section className="border-t border-line" aria-labelledby="plans">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader eyebrow={c.priceEyebrow} title={<span id="plans">{c.priceTitle}</span>} lead={c.priceLead} />
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

      <CtaPanel
        eyebrow={c.ctaEyebrow}
        title={c.ctaTitle}
        subtitle={c.ctaSub}
        primary={{ label: c.start, to: LINKS.trial }}
        secondary={{ label: c.seePricing, to: lang === 'de' ? '/de/e-rechnung/#pricing' : '/pricing/#e-invoicing' }}
      />
    </>
  );
}
