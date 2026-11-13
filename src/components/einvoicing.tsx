/**
 * Building blocks for the E-Invoicing product and compliance pages, in English
 * and German. Content comes from the language bundles in
 * src/content/eInvoicing.ts (English) and src/content/eInvoicing.de.ts (German);
 * the language follows the page address (see src/i18n.ts).
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarClock, Check, CircleCheck, Plus } from 'lucide-react';
import type { Faq } from '../content/pricingFaq';
import { ButtonLink } from './ui';
import {
  EN_CONTENT,
  ISSUING_DEADLINE_LARGE,
  MANDATE_REVIEWED,
  type EIContent,
  type IntegrationStatus,
} from '../content/eInvoicing';
import { DE_CONTENT } from '../content/eInvoicing.de';
import { localizedPath, useLang, type Lang } from '../i18n';

/** The e-invoicing content bundle for the current page language. */
export function useEI(): EIContent {
  return useLang() === 'de' ? DE_CONTENT : EN_CONTENT;
}

/* ---------- Formatting (fixed, not the visitor's locale, so prerendered HTML stays stable) ---------- */

const MONTHS: Record<Lang, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
};

/** "2026-10-21" → "21 October 2026" / "21. Oktober 2026". */
export function formatDate(iso: string, lang: Lang = 'en'): string {
  const [y, m, d] = iso.split('-').map(Number);
  return lang === 'de' ? `${d}. ${MONTHS.de[m - 1]} ${y}` : `${d} ${MONTHS.en[m - 1]} ${y}`;
}

/** €9 / €0.35 in English, 9 € / 0,35 € in German. */
export function euro(n: number, lang: Lang = 'en'): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return lang === 'de' ? `${s.replace('.', ',')} €` : `€${s}`;
}

/* ---------- Interface labels ---------- */

const L = {
  en: {
    deadline: (date: React.ReactNode, threshold: string) => (
      <>
        From {date}, businesses in Germany with more than {threshold} previous-year revenue must issue structured
        e-invoices for domestic B2B sales.
      </>
    ),
    daysLeft: (n: number) => `${n} ${n === 1 ? 'day' : 'days'} left.`,
    fullTimeline: 'See the full timeline',
    deadlineLabel: 'E-invoicing deadline',
    mockTitle: 'E-invoices · this month',
    sample: 'Sample data',
    cols: ['Invoice', 'Customer', 'Format', 'Status'],
    statuses: { Transferred: 'Transferred', Delivered: 'Delivered', 'Needs fix': 'Needs fix', Ready: 'Ready' } as Record<string, string>,
    auditTitle: 'Audit trail · RE-2027-0142',
    audit: ['Created', 'Validated (EN 16931)', 'XRechnung generated', 'Transferred to Lexware'],
    mockCaption:
      'Example of the e-invoicing workspace: a list of invoices with their format and status, and the audit trail of one invoice from creation to transfer to Lexware Office.',
    splitDoes: 'E-Invoicing does',
    splitDoesItems: ['Capture', 'Validate', 'Generate', 'Exchange', 'Connect', 'Track'],
    splitKeeps: 'Your accounting software keeps',
    splitKeepsItems: ['Bookkeeping', 'Ledgers', 'Tax processes', 'Reports'],
    splitNote: 'Stays where it is: Lexware Office, DATEV, sevdesk or your own system.',
    trademarks: 'Product names and trademarks belong to their owners. Listing them does not imply a partnership or endorsement.',
    popular: 'Most popular',
    freeForever: 'Free forever',
    perMonth: 'per month, cancel monthly',
    included: (n: number) => `${n} e-invoices included`,
    then: (p: string) => `, then ${p} each`,
    appliesTo: 'Applies to',
    source: 'Source',
    reviewed: (d: React.ReactNode) => <>Official review pending · Last reviewed {d}.</>,
    typicalUse: 'Typical use: ',
    comparisonCaption: 'XRechnung compared with ZUGFeRD',
    pdfTag: 'Not a structured e-invoice',
    pdfTitle: 'PDF invoice',
    pdfText: 'A document for people. Software has to guess what each number means, which is why typing invoices in by hand and OCR are still common.',
    structuredTag: 'Processed automatically',
    structuredTitle: 'Structured e-invoice',
    structuredText:
      'Machine-readable data under EN 16931, such as XRechnung (XML) or ZUGFeRD (PDF with XML). Each value, from invoice number to VAT category, sits in a defined field.',
  },
  de: {
    deadline: (date: React.ReactNode, threshold: string) => (
      <>
        Ab dem {date} müssen Unternehmen in Deutschland mit mehr als {threshold} Vorjahresumsatz für inländische
        B2B-Umsätze strukturierte E-Rechnungen ausstellen.
      </>
    ),
    daysLeft: (n: number) => `Noch ${n} ${n === 1 ? 'Tag' : 'Tage'}.`,
    fullTimeline: 'Zum vollständigen Zeitplan',
    deadlineLabel: 'Frist der E-Rechnungspflicht',
    mockTitle: 'E-Rechnungen · dieser Monat',
    sample: 'Beispieldaten',
    cols: ['Rechnung', 'Kunde', 'Format', 'Status'],
    statuses: { Transferred: 'Übertragen', Delivered: 'Zugestellt', 'Needs fix': 'Korrektur nötig', Ready: 'Bereit' } as Record<string, string>,
    auditTitle: 'Prüfpfad · RE-2027-0142',
    audit: ['Erstellt', 'Geprüft (EN 16931)', 'XRechnung erzeugt', 'An Lexware übertragen'],
    mockCaption:
      'Beispiel des E-Rechnungs-Arbeitsplatzes: eine Liste von Rechnungen mit Format und Status sowie der Prüfpfad einer Rechnung von der Erstellung bis zur Übertragung an Lexware Office.',
    splitDoes: 'E-Rechnung übernimmt',
    splitDoesItems: ['Erfassen', 'Prüfen', 'Erzeugen', 'Austauschen', 'Anbinden', 'Nachverfolgen'],
    splitKeeps: 'Ihre Buchhaltungssoftware behält',
    splitKeepsItems: ['Buchhaltung', 'Buchführung', 'Steuerprozesse', 'Auswertungen'],
    splitNote: 'Bleibt, wo sie ist: Lexware Office, DATEV, sevdesk oder Ihre eigene Lösung.',
    trademarks: 'Produktnamen und Marken gehören ihren jeweiligen Inhabern. Die Auflistung bedeutet keine Partnerschaft oder Empfehlung.',
    popular: 'Beliebteste Wahl',
    freeForever: 'Dauerhaft kostenlos',
    perMonth: 'pro Monat, monatlich kündbar',
    included: (n: number) => `${n} E-Rechnungen inklusive`,
    then: (p: string) => `, danach je ${p}`,
    appliesTo: 'Betrifft',
    source: 'Quelle',
    reviewed: (d: React.ReactNode) => <>Offizielle Prüfung ausstehend · Zuletzt geprüft am {d}.</>,
    typicalUse: 'Typischer Einsatz: ',
    comparisonCaption: 'XRechnung und ZUGFeRD im Vergleich',
    pdfTag: 'Keine strukturierte E-Rechnung',
    pdfTitle: 'PDF-Rechnung',
    pdfText: 'Ein Dokument für Menschen. Software muss raten, was jede Zahl bedeutet. Deshalb sind Abtippen und OCR noch verbreitet.',
    structuredTag: 'Automatisch verarbeitet',
    structuredTitle: 'Strukturierte E-Rechnung',
    structuredText:
      'Maschinenlesbare Daten nach EN 16931, z. B. XRechnung (XML) oder ZUGFeRD (PDF mit XML). Jeder Wert, von der Rechnungsnummer bis zur USt-Kategorie, steht in einem definierten Feld.',
  },
};

const useLabels = () => L[useLang()];

/* ---------- Deadline ---------- */

/**
 * The day count depends on today's date, so it is filled in after the page
 * loads; the prerendered HTML carries the fixed date, which is what crawlers
 * should quote anyway.
 */
function useDaysUntil(iso: string): number | null {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const [y, m, d] = iso.split('-').map(Number);
    setDays(Math.ceil((Date.UTC(y, m - 1, d) - Date.now()) / 86_400_000));
  }, [iso]);
  return days;
}

export function DeadlineStrip({ withLink = true }: { withLink?: boolean }) {
  const lang = useLang();
  const t = L[lang];
  const { REVENUE_THRESHOLD } = useEI();
  const days = useDaysUntil(ISSUING_DEADLINE_LARGE);
  const date = (
    <time dateTime={ISSUING_DEADLINE_LARGE} className="font-semibold text-fg">
      {formatDate(ISSUING_DEADLINE_LARGE, lang)}
    </time>
  );
  return (
    <aside
      aria-label={t.deadlineLabel}
      className="flex flex-col gap-4 rounded-2xl border border-amber/60 bg-amber-bg px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-4">
        <CalendarClock size={22} className="mt-0.5 shrink-0 text-amber" aria-hidden="true" />
        <p className="leading-relaxed text-fg/90">
          {t.deadline(date, REVENUE_THRESHOLD)}
          {days !== null && days > 0 && <span className="ml-1 font-mono text-sm text-amber">{t.daysLeft(days)}</span>}
        </p>
      </div>
      {withLink && (
        <Link
          to={localizedPath('/compliance/', lang)}
          className="inline-flex shrink-0 items-center gap-1 font-semibold text-amber hover:text-fg"
        >
          {t.fullTimeline} <ArrowRight size={16} aria-hidden="true" />
        </Link>
      )}
    </aside>
  );
}

/* ---------- Sample product view ---------- */

const SAMPLE_INVOICES = [
  { no: 'RE-2027-0142', customer: 'Muster Agentur GmbH', format: 'XRechnung', status: 'Transferred' },
  { no: 'RE-2027-0141', customer: 'Beispiel Fitness e.V.', format: 'ZUGFeRD', status: 'Delivered' },
  { no: 'RE-2027-0140', customer: 'Nordlicht Beratung', format: 'XRechnung', status: 'Needs fix' },
  { no: 'RE-2027-0139', customer: 'Kontor Software AG', format: 'ZUGFeRD', status: 'Ready' },
];

const STATUS_STYLE: Record<string, string> = {
  Transferred: 'bg-mint/15 text-mint',
  Delivered: 'bg-[#7aa7ff]/15 text-[#9dbdff]',
  'Needs fix': 'bg-amber/15 text-amber',
  Ready: 'bg-white/10 text-fg/80',
};

/** Illustration of the e-invoicing workspace with clearly labelled sample data. */
export function InvoiceMock() {
  const t = useLabels();
  const times = ['09:12', '09:12', '09:13', '09:13'];
  return (
    <figure className="relative" data-nosnippet>
      <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <span className="font-mono text-xs text-muted">{t.mockTitle}</span>
          <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
            {t.sample}
          </span>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
              <th scope="col" className="px-5 py-2.5 font-medium">{t.cols[0]}</th>
              <th scope="col" className="hidden px-2 py-2.5 font-medium sm:table-cell">{t.cols[1]}</th>
              <th scope="col" className="px-2 py-2.5 font-medium">{t.cols[2]}</th>
              <th scope="col" className="px-5 py-2.5 text-right font-medium">{t.cols[3]}</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_INVOICES.map((r) => (
              <tr key={r.no} className="border-t border-line-soft">
                <td className="px-5 py-3 font-mono text-fg">{r.no}</td>
                <td className="hidden px-2 py-3 text-body sm:table-cell">{r.customer}</td>
                <td className="px-2 py-3 text-body">{r.format}</td>
                <td className="px-5 py-3 text-right">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[r.status]}`}>
                    {t.statuses[r.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute -bottom-8 right-3 w-64 rounded-xl border border-line bg-[#0f211d] p-4 shadow-2xl sm:-right-4">
        <p className="font-mono text-xs text-muted">{t.auditTitle}</p>
        <ol className="mt-3 space-y-1.5 text-sm">
          {t.audit.map((step, i) => (
            <li key={step} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-fg/90">
                <Check size={14} className="text-mint" aria-hidden="true" />
                {step}
              </span>
              <span className="font-mono text-xs text-muted">{times[i]}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="sr-only">{t.mockCaption}</figcaption>
    </figure>
  );
}

/* ---------- Workflow ---------- */

export function WorkflowSteps() {
  const { WORKFLOW } = useEI();
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {WORKFLOW.map((s, i) => (
        <li key={s.title} className="bg-surface p-7">
          <p className="font-mono text-sm text-mint">{String(i + 1).padStart(2, '0')}</p>
          <h3 className="font-display mt-4 text-[1.375rem]">{s.title}</h3>
          <p className="mt-3 leading-relaxed">{s.desc}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Accounting split ---------- */

export function AccountingSplit() {
  const t = useLabels();
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
      <div className="rounded-2xl border border-mint/50 bg-highlight/40 p-7">
        <p className="eyebrow">{t.splitDoes}</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-fg">
          {t.splitDoesItems.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <Check size={16} className="text-mint" aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center text-mint" aria-hidden="true">
        <ArrowRight size={28} className="rotate-90 md:rotate-0" />
      </div>
      <div className="card p-7">
        <p className="eyebrow !text-body">{t.splitKeeps}</p>
        <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-fg">
          {t.splitKeepsItems.map((x) => (
            <li key={x} className="flex items-center gap-2">
              <Check size={16} className="text-muted" aria-hidden="true" />
              {x}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">{t.splitNote}</p>
      </div>
    </div>
  );
}

/* ---------- Integrations ---------- */

const STATUS_PILL: Record<IntegrationStatus, string> = {
  Available: 'bg-mint/15 text-mint',
  Preview: 'bg-[#7aa7ff]/15 text-[#9dbdff]',
  'Coming soon': 'bg-white/10 text-body',
};

export function StatusPill({ status }: { status: IntegrationStatus }) {
  const { STATUS_LABEL } = useEI();
  return (
    <span className={`rounded-full px-2.5 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-wider ${STATUS_PILL[status]}`}>
      {STATUS_LABEL[status]}
    </span>
  );
}

type IntegrationItem = { name: string; code: string; status: IntegrationStatus; desc: string };

/** Integration cards. The connection between our two products gets a full, highlighted row. */
export function IntegrationCards({ items }: { items: IntegrationItem[] }) {
  return (
    // Four items fill a four-column row; anything else uses three columns.
    <ul className={`grid gap-4 sm:grid-cols-2 ${items.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map((i) => (
        <li
          key={i.name}
          className={
            i.code === 'SB'
              ? 'flex flex-col rounded-2xl border border-mint/40 bg-highlight/30 p-6 sm:col-span-2 lg:col-span-3'
              : 'card flex flex-col p-6'
          }
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 font-mono text-sm font-semibold text-fg" aria-hidden="true">
              {i.code}
            </span>
            <StatusPill status={i.status} />
          </div>
          <h3 className="mt-5 text-lg font-semibold">{i.name}</h3>
          <p className="mt-2 text-[0.9375rem] leading-relaxed">{i.desc}</p>
        </li>
      ))}
    </ul>
  );
}

export function StatusLegend() {
  const { STATUS_HELP } = useEI();
  const t = useLabels();
  return (
    <>
      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
        {(Object.keys(STATUS_HELP) as IntegrationStatus[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <dt><StatusPill status={s} /></dt>
            <dd>{STATUS_HELP[s]}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm text-muted">{t.trademarks}</p>
    </>
  );
}

/** Accounting integrations for E-Invoicing, including the planned link to Subscription Billing. */
export function IntegrationGrid() {
  const { ACCOUNTING_INTEGRATIONS } = useEI();
  return (
    <>
      <IntegrationCards items={ACCOUNTING_INTEGRATIONS} />
      <StatusLegend />
    </>
  );
}

/* ---------- E-Invoicing plans ---------- */

export function EInvoicingPlanCards() {
  const lang = useLang();
  const t = L[lang];
  const { EINVOICING_PLANS } = useEI();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {EINVOICING_PLANS.map((p) => (
        <article
          key={p.name}
          className={`relative flex flex-col rounded-2xl p-8 ${
            p.popular
              ? 'border border-amber/80 bg-surface shadow-[0_0_0_1px_var(--color-amber),0_30px_60px_-30px_rgba(217,168,87,0.35)]'
              : 'card'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold">{p.name}</h3>
            {p.popular && (
              <span className="rounded-full bg-amber px-2.5 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-[#2a1d05]">
                {t.popular}
              </span>
            )}
          </div>
          <p className="mt-2 min-h-[3.25rem] text-[0.9375rem] leading-relaxed">{p.desc}</p>
          <p className="font-display mt-6 text-5xl tabular-nums text-fg">{euro(p.price, lang)}</p>
          <p className="mt-2 text-sm text-muted">
            {p.price === 0 ? t.freeForever : t.perMonth} · {t.included(p.included)}
            {p.overage ? t.then(euro(p.overage, lang)) : ''}
          </p>
          <ButtonLink to={p.cta.to} variant={p.popular ? 'primary' : 'ghost'} size="md" className="mt-7 w-full">
            {p.cta.label}
          </ButtonLink>
          <ul className="mt-8 space-y-3.5 border-t border-line pt-7 text-[0.9375rem]">
            {p.features.map((f) => (
              <li key={f} className="flex items-start gap-3 text-fg/90">
                <Check size={17} className="mt-[3px] shrink-0 text-mint" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

/* ---------- Mandate timeline ---------- */

export function MandateTimeline() {
  const lang = useLang();
  const t = L[lang];
  const { MANDATE_TIMELINE, COMPLIANCE_DISCLAIMER } = useEI();
  return (
    <>
      <ol className="relative grid gap-4 lg:grid-cols-5">
        {MANDATE_TIMELINE.map((s) => (
          <li key={s.year} className="card flex flex-col p-6">
            <p className="font-display text-3xl text-mint">{s.year}</p>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed">{s.body}</p>
            <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{t.appliesTo}</dt>
                <dd className="mt-0.5 text-fg/90">{s.appliesTo}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">{t.source}</dt>
                <dd className="mt-0.5 text-fg/90">{s.source}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-sm text-muted">
        {t.reviewed(<time dateTime={MANDATE_REVIEWED}>{formatDate(MANDATE_REVIEWED, lang)}</time>)} {COMPLIANCE_DISCLAIMER}
      </p>
    </>
  );
}

/* ---------- Formats ---------- */

export function FormatCards() {
  const t = useLabels();
  const { FORMATS } = useEI();
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {FORMATS.map((f) => (
        <article key={f.name} className="card flex flex-col p-7">
          <h3 className="font-display text-2xl">{f.name}</h3>
          <p className="mt-3 flex-1 leading-relaxed">{f.summary}</p>
          <p className="mt-5 border-t border-line pt-4 text-sm">
            <span className="font-semibold text-fg">{t.typicalUse}</span>
            {f.use}
          </p>
        </article>
      ))}
    </div>
  );
}

export function FormatComparisonTable() {
  const t = useLabels();
  const { FORMAT_COMPARISON } = useEI();
  return (
    <div className="overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <caption className="sr-only">{t.comparisonCaption}</caption>
        <thead>
          <tr className="bg-surface font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <th scope="col" className="px-5 py-4 font-medium"></th>
            <th scope="col" className="px-5 py-4 font-medium">XRechnung</th>
            <th scope="col" className="px-5 py-4 font-medium">ZUGFeRD</th>
          </tr>
        </thead>
        <tbody>
          {FORMAT_COMPARISON.map((r) => (
            <tr key={r.label} className="border-t border-line-soft">
              <th scope="row" className="px-5 py-4 font-semibold text-fg">{r.label}</th>
              <td className="px-5 py-4">{r.xrechnung}</td>
              <td className="px-5 py-4">{r.zugferd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- PDF vs structured ---------- */

export function PdfVsStructured() {
  const t = useLabels();
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <article className="card p-7">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber">{t.pdfTag}</p>
        <h3 className="font-display mt-3 text-2xl">{t.pdfTitle}</h3>
        <p className="mt-3 leading-relaxed">{t.pdfText}</p>
      </article>
      <article className="rounded-2xl border border-mint/50 bg-highlight/40 p-7">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-mint">{t.structuredTag}</p>
        <h3 className="font-display mt-3 text-2xl">{t.structuredTitle}</h3>
        <p className="mt-3 leading-relaxed">{t.structuredText}</p>
      </article>
    </div>
  );
}

/* ---------- FAQ ---------- */

/** Native <details> keeps every answer in the HTML for search engines and AI assistants. */
export function FaqList({ items, openFirst = true }: { items: Faq[]; openFirst?: boolean }) {
  return (
    <div>
      {items.map((f, i) => (
        <details key={f.q} open={openFirst && i === 0} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold text-fg">{f.q}</h3>
            <Plus size={18} className="shrink-0 text-muted transition group-open:rotate-45" aria-hidden="true" />
          </summary>
          <p className="-mt-1 pb-7 text-lg leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Checklist ---------- */

export function PrepChecklist({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="card p-7">
      <h3 className="font-display text-xl">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-fg/90">
            <CircleCheck size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
