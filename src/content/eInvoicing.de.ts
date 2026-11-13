/**
 * German e-invoicing content. Taken from the German pages of the MYFUNDBOX
 * E-Invoicing site, with API references removed and the same facts, dates and
 * prices as the English bundle in ./eInvoicing.ts. Keep both in step.
 */
import { LINKS } from '../config';
import type { EIContent } from './eInvoicing';
import type { Faq } from './pricingFaq';

const SCHWELLE = '800.000 €';

const FAQ: Faq[] = [
  {
    q: 'Was ist die E-Rechnung in Deutschland?',
    a: 'Bei der E-Rechnung werden Rechnungen als strukturierte elektronische Daten nach der europäischen Norm EN 16931 ausgestellt und empfangen, zum Beispiel als XRechnung oder ZUGFeRD. Die Software des Empfängers kann sie automatisch lesen und verarbeiten.',
  },
  {
    q: 'Ist eine PDF-Rechnung eine E-Rechnung?',
    a: 'Nein. Eine reine PDF ist ein Bild einer Rechnung für Menschen. Eine strukturierte E-Rechnung enthält maschinenlesbare Daten. ZUGFeRD verbindet beides: ein lesbares PDF mit eingebettetem XML.',
  },
  {
    q: 'Was ist XRechnung?',
    a: 'XRechnung ist die deutsche Umsetzung der EN 16931. Es ist ein XML-Format ohne visuelles Layout und wird vor allem für Rechnungen an Behörden und im B2B-Austausch genutzt.',
  },
  {
    q: 'Was ist ZUGFeRD?',
    a: 'ZUGFeRD ist ein hybrides Rechnungsformat: ein PDF mit eingebetteter XML-Datei. Ab dem Profil EN 16931 (Comfort) erfüllt es die europäische Norm.',
  },
  {
    q: 'Was ist die EN 16931?',
    a: 'Die EN 16931 ist die europäische Norm, die die Kerndaten einer elektronischen Rechnung festlegt: wer, was, wann, wie viel und welche Steuer. XRechnung und ZUGFeRD setzen sie um.',
  },
  {
    q: 'Ab wann muss ich E-Rechnungen ausstellen?',
    a: `Empfangen müssen inländische B2B-Unternehmen bereits heute. Unternehmen mit mehr als ${SCHWELLE} Vorjahresumsatz müssen ab dem 1. Januar 2027 für inländische B2B-Umsätze E-Rechnungen ausstellen, alle übrigen ab dem 1. Januar 2028. Bitte prüfen Sie Ihren Fall mit Ihrem Steuerberater.`,
  },
  {
    q: 'Gilt die Pflicht auch für Kleinunternehmer?',
    a: 'Kleinunternehmer nach § 19 UStG sind von der Pflicht zur Ausstellung ausgenommen, müssen aber E-Rechnungen empfangen können. Mit dem kostenlosen Tarif können Sie empfangene E-Rechnungen prüfen und anzeigen.',
  },
  {
    q: 'Wie kann ich empfangene E-Rechnungen lesen?',
    a: 'Laden Sie die XML-Datei in MYFUNDBOX E-Rechnung hoch. Sie wird gegen die EN 16931 geprüft und lesbar dargestellt, auch im kostenlosen Tarif.',
  },
  {
    q: 'Ersetzt MYFUNDBOX Lexware Office oder DATEV?',
    a: 'Nein. MYFUNDBOX E-Rechnung ist eine E-Rechnungs-Schicht, keine Buchhaltungssoftware. Ihre Buchhaltung bleibt in Lexware Office, DATEV oder sevdesk; MYFUNDBOX erstellt, prüft und erzeugt die E-Rechnung und kann sie an ein verbundenes Konto übertragen.',
  },
  {
    q: 'Kann ich XRechnung und ZUGFeRD erzeugen?',
    a: 'Ja. Nach der Prüfung erzeugt MYFUNDBOX E-Rechnung XRechnung (XML) und ZUGFeRD (PDF mit eingebettetem XML, Profil EN 16931) aus denselben Rechnungsdaten.',
  },
  {
    q: 'Wie funktioniert die Prüfung?',
    a: 'Vor dem Erzeugen prüft MYFUNDBOX Pflichtangaben, strukturierte Daten, USt-Kategorien und -Sätze sowie die Rechnungsbeträge gegen die EN 16931 und deutsche Regeln. Fehler werden verständlich erklärt, damit Sie sie beheben können.',
  },
  {
    q: 'Werden meine Rechnungen archiviert?',
    a: 'Ja. Ausgestellte Rechnungen und ihr Prüfprotokoll bleiben einsehbar. Die gesetzliche Aufbewahrung nach GoBD verantwortet weiterhin Ihr Buchhaltungssystem bzw. Ihr Steuerberater.',
  },
  {
    q: 'Übermittelt MYFUNDBOX Rechnungen direkt an das Finanzamt?',
    a: 'Nein. MYFUNDBOX erstellt, prüft und erzeugt E-Rechnungen und überträgt sie an verbundene Buchhaltungssysteme oder an Ihren Kunden. Steuermeldungen laufen weiter über Ihre Buchhaltung.',
  },
  {
    q: 'Muss ich meine Buchhaltungssoftware upgraden?',
    a: 'Nein. Sie ergänzen die E-Rechnung, ohne in ein größeres oder anderes Buchhaltungspaket wechseln zu müssen.',
  },
];

export const DE_CONTENT: EIContent = {
  REVENUE_THRESHOLD: SCHWELLE,

  EINVOICING_PLANS: [
    {
      name: 'Free',
      desc: 'Für Kleinunternehmer und zum Testen, bevor die Pflicht für Sie gilt.',
      price: 0,
      included: 5,
      cta: { label: 'Kostenlos starten', to: LINKS.trial },
      features: ['5 E-Rechnungen pro Monat', 'XRechnung & ZUGFeRD', 'Empfangene E-Rechnungen prüfen & anzeigen', 'EN 16931-Validierung', '1 Nutzer'],
    },
    {
      name: 'Starter',
      desc: 'Für Freelancer, Selbstständige und kleine Teams.',
      price: 9,
      included: 30,
      overage: 0.35,
      cta: { label: 'Starter wählen', to: LINKS.trial },
      features: ['30 E-Rechnungen pro Monat', 'Alles aus Free', 'Kunden-Stammdaten & Vorlagen', '1 Buchhaltungs-Anbindung', 'Archiv & Prüfprotokoll', '2 Nutzer · E-Mail-Support'],
    },
    {
      name: 'Business',
      desc: 'Für KMU, Agenturen und Dienstleister mit laufender Rechnungsstellung.',
      price: 24,
      included: 200,
      overage: 0.15,
      popular: true,
      cta: { label: 'Business wählen', to: LINKS.trial },
      features: [
        '200 E-Rechnungen pro Monat',
        'Alles aus Starter',
        'Lexware Office, DATEV & sevdesk',
        'Leitweg-ID für Behörden (B2G)',
        'Gutschriften & Rollen (z. B. Steuerberater)',
        '5 Nutzer · Priorisierter Support',
      ],
    },
  ],
  EINVOICING_PRICING_NOTE:
    'Alle Preise zzgl. gesetzlicher MwSt. Monatlich kündbar, keine Einrichtungsgebühr. Bei jährlicher Zahlung sind 2 Monate geschenkt.',

  MANDATE_TIMELINE: [
    {
      year: '2025',
      title: 'E-Rechnungen empfangen',
      body: 'Alle inländischen Unternehmen im B2B-Bereich müssen strukturierte E-Rechnungen empfangen können. Papier- oder PDF-Rechnungen dürfen in der Übergangszeit weiterhin ausgestellt werden.',
      appliesTo: 'Alle inländischen B2B-Unternehmen',
      source: 'Wachstumschancengesetz, § 14 UStG',
    },
    {
      year: '2026',
      title: 'Übergangsphase',
      body: 'Unternehmen dürfen unter den Übergangsregeln weiterhin andere Rechnungsformate ausstellen und ihre Systeme vorbereiten. Ergänzende BMF-Schreiben konkretisieren die Details.',
      appliesTo: 'Alle inländischen B2B-Unternehmen',
      source: 'BMF-Schreiben zur obligatorischen E-Rechnung',
    },
    {
      year: '2027',
      title: 'Ausstellen: größere Unternehmen',
      body: `Unternehmen mit einem Vorjahresumsatz über der Schwelle (derzeit ${SCHWELLE}) müssen ab dem 1. Januar 2027 für inländische B2B-Umsätze strukturierte E-Rechnungen ausstellen.`,
      appliesTo: `Unternehmen über ${SCHWELLE} Umsatz`,
      source: '§ 27 Abs. 38 UStG (Übergangsregeln)',
    },
    {
      year: '2028',
      title: 'Ausstellen: alle Unternehmen',
      body: 'Ab dem 1. Januar 2028 gilt die Pflicht zur Ausstellung strukturierter E-Rechnungen im inländischen B2B-Bereich für alle übrigen Unternehmen. Kleinunternehmer (§ 19 UStG) bleiben ausgenommen.',
      appliesTo: 'Alle inländischen B2B-Unternehmen',
      source: '§ 27 Abs. 38 UStG (Übergangsregeln)',
    },
    {
      year: 'Nach 2028',
      title: 'EU-Entwicklungen (ViDA)',
      body: 'Das EU-Paket „VAT in the Digital Age“ (ViDA) sieht digitale Meldepflichten vor. Die nationalen Details werden noch festgelegt.',
      appliesTo: 'Unternehmen mit EU-Geschäft',
      source: 'Europäische Kommission: VAT in the Digital Age',
    },
  ],

  COMPLIANCE_DISCLAIMER:
    'Die Compliance-Informationen dienen der allgemeinen Orientierung und sollten mit den aktuellen offiziellen Vorgaben abgeglichen werden. Sie sind keine Rechts- oder Steuerberatung.',

  OFFICIAL_SOURCES: [
    { label: 'Bundesministerium der Finanzen (BMF): E-Rechnung', href: 'https://www.bundesfinanzministerium.de' },
    { label: 'Europäische Kommission: VAT in the Digital Age (ViDA)', href: 'https://taxation-customs.ec.europa.eu' },
  ],

  WHO_IS_AFFECTED: [
    { who: `Unternehmen über ${SCHWELLE} Umsatz`, what: 'Ab dem 1. Januar 2027 müssen Sie inländische B2B-Rechnungen als strukturierte E-Rechnung ausstellen.' },
    { who: 'Alle übrigen Unternehmen', what: 'Ab dem 1. Januar 2028 gilt die Ausstellungspflicht für alle inländischen B2B-Umsätze. Empfangen müssen Sie schon heute können.' },
    { who: 'Kleinunternehmer (§ 19 UStG)', what: 'Von der Ausstellungspflicht ausgenommen, müssen aber E-Rechnungen empfangen und lesen können. Dafür reicht der kostenlose Tarif.' },
    { who: 'Rechnungen an Behörden (B2G)', what: 'Öffentliche Auftraggeber verlangen bereits XRechnung mit Leitweg-ID. MYFUNDBOX E-Rechnung unterstützt beides.' },
  ],

  FORMATS: [
    {
      name: 'XRechnung',
      summary: 'Die deutsche Umsetzung der europäischen Norm EN 16931. Die Rechnung ist eine reine XML-Datei, ohne lesbare Seite, solange kein Viewer sie darstellt.',
      use: 'Rechnungen an öffentliche Auftraggeber und B2B-Austausch, wenn beide Seiten XML verarbeiten.',
    },
    {
      name: 'ZUGFeRD',
      summary: 'Ein hybrides Format: ein PDF für Menschen mit eingebettetem, strukturiertem XML. Profile ab EN 16931 (Comfort) erfüllen die europäische Norm.',
      use: 'B2B-Rechnungen, wenn Empfänger weiterhin ein lesbares PDF möchten.',
    },
    {
      name: 'EN 16931',
      summary: 'Die europäische semantische Norm für elektronische Rechnungen. Sie legt fest, welche Daten eine Rechnung enthält und wie sie strukturiert sind, unabhängig von der Syntax.',
      use: 'Die Grundlage für XRechnung und konforme ZUGFeRD-Profile.',
    },
  ],

  FORMAT_COMPARISON: [
    { label: 'Dateityp', xrechnung: 'Nur XML', zugferd: 'PDF mit eingebettetem XML' },
    { label: 'Für Menschen lesbar', xrechnung: 'Nur mit Viewer', zugferd: 'Ja, als normales PDF' },
    { label: 'Maschinenlesbar', xrechnung: 'Ja', zugferd: 'Ja, über das eingebettete XML' },
    { label: 'Erfüllt EN 16931', xrechnung: 'Ja', zugferd: 'Ab Profil EN 16931 (Comfort)' },
    { label: 'Typischer Einsatz', xrechnung: 'Behörden (B2G) und XML-zu-XML im B2B', zugferd: 'B2B, wenn der Empfänger ein PDF möchte' },
  ],

  CAPABILITIES: [
    { title: 'Erstellen', desc: 'Strukturierte Rechnungen mit Verkäufer, Käufer, Positionen, USt, Rabatten, Zahlungsdaten und Referenzen.' },
    { title: 'Prüfen', desc: 'Prüfung nach EN 16931 und deutschen Regeln, mit einer verständlichen Erklärung zu jedem Fehler.' },
    { title: 'Erzeugen', desc: 'XRechnung-XML und ZUGFeRD-PDF/XML aus denselben geprüften Rechnungsdaten.' },
    { title: 'Austauschen', desc: 'E-Rechnungen an Ihre Kunden zustellen oder an das nächste System übergeben.' },
    { title: 'Anbinden', desc: 'Belege an angebundene Buchhaltungssoftware wie Lexware Office, DATEV oder sevdesk übertragen.' },
    { title: 'Nachverfolgen', desc: 'Status, Rechnungsverlauf und ein lückenloser, zeitgestempelter Prüfpfad für jede Rechnung.' },
  ],

  DETAIL_LISTS: [
    {
      title: 'Erfasste Angaben',
      items: ['Kunden- und Verkäuferdaten', 'Rechnungsnummer und -datum', 'Fälligkeitsdatum', 'Positionen, Menge und Einzelpreis', 'USt und Rabatte', 'Zahlungsinformationen', 'Referenzen und Leitweg-ID'],
    },
    {
      title: 'Prüfungen',
      items: ['Pflichtangaben (§ 14 UStG)', 'Strukturierte Daten', 'USt-Kategorien und -Sätze', 'Rechnungsbeträge', 'Regeln der EN 16931', 'Deutsche E-Rechnungsregeln', 'Verständliche Fehlererklärungen'],
    },
    {
      title: 'Nachweise',
      items: ['Strukturierte Rechnungsdaten', 'Prüfergebnisse', 'Prüfprotokoll', 'Rechnungsverlauf', 'Dokumentenarchiv', 'Übertragungsstatus je Anbindung'],
    },
  ],

  WHY_E_INVOICING: [
    { title: 'Eine PDF ist keine E-Rechnung', desc: 'Eine PDF ist ein Bild einer Rechnung. Die E-Rechnung verlangt maschinenlesbare, strukturierte Daten.' },
    { title: 'Strukturierte Daten sind Pflicht', desc: 'Jeder Wert, von der USt-Kategorie über Summen bis zu Referenzen, gehört in ein definiertes Feld.' },
    { title: 'Die Vorgaben ändern sich', desc: 'Regeln und Übergangsfristen werden schrittweise eingeführt und per BMF-Schreiben konkretisiert.' },
    { title: 'Formate sind komplex', desc: 'XRechnung, ZUGFeRD und ihre Profile haben jeweils eigene Regeln.' },
  ],

  WORKFLOW: [
    { title: 'Erfassen', desc: 'Rechnungs- und Kundendaten einmal eingeben und Kundendaten wiederverwenden.' },
    { title: 'Prüfen', desc: 'Die Rechnung gegen die Regeln der E-Rechnung und die Pflichtangaben nach § 14 UStG prüfen.' },
    { title: 'Erzeugen', desc: 'XRechnung oder ZUGFeRD aus denselben geprüften Daten erzeugen.' },
    { title: 'Übertragen', desc: 'Rechnungsdaten und Belege an Ihre Buchhaltungssoftware und Geschäftssysteme übergeben.' },
  ],

  ACCOUNTING_INTEGRATIONS: [
    { name: 'Lexware Office', code: 'LX', status: 'Preview', desc: 'Geprüfte E-Rechnungen und Belege zur Buchhaltung an Lexware Office übertragen.' },
    { name: 'DATEV', code: 'DA', status: 'Preview', desc: 'Rechnungsbelege für DATEV-basierte Buchhaltung mit Ihrem Steuerberater übergeben.' },
    { name: 'sevdesk', code: 'SD', status: 'Preview', desc: 'E-Rechnungen an sevdesk senden. Die Buchhaltung bleibt, wo sie ist.' },
    { name: 'Xero', code: 'XE', status: 'Coming soon', desc: 'Rechnungen an Xero-Organisationen übertragen.' },
    { name: 'QuickBooks', code: 'QB', status: 'Coming soon', desc: 'Rechnungen an QuickBooks Online übertragen.' },
    { name: 'Zoho Books', code: 'ZB', status: 'Coming soon', desc: 'Rechnungen an Zoho Books übertragen.' },
    { name: 'Subscription Billing', code: 'SB', status: 'Coming soon', desc: 'Für jede Abo-Verlängerung und jeden Mitgliedsbeitrag automatisch eine E-Rechnung ausstellen.' },
  ],

  STATUS_LABEL: { Available: 'Verfügbar', Preview: 'Vorschau', 'Coming soon': 'Demnächst' },
  STATUS_HELP: {
    Available: 'Produktive Anbindung, sofort nutzbar.',
    Preview: 'Anbindung im Demo- oder Pilotbetrieb.',
    'Coming soon': 'Auf der Roadmap, noch nicht nutzbar.',
  },

  INDUSTRIES: ['Agenturen', 'Berater', 'Freie Berufe', 'Fitnessstudios', 'Bildungsanbieter', 'Vereine & Mitgliedschaften', 'Handwerk & Dienstleister', 'Gemeinnützige Organisationen', 'Abo-Geschäfte', 'Mittelstand'],

  EINVOICING_FAQ: FAQ,

  EINVOICING_SCOPE_NOTE:
    'MYFUNDBOX E-Rechnung bereitet konforme E-Rechnungen vor, prüft und erzeugt sie und kann sie an verbundene Buchhaltungssysteme übertragen. Buchhaltungs- und Steuerprozesse nach der Übertragung hängen von Ihrem Buchhaltungsanbieter und Ihrer Einrichtung ab.',

  MANDATE_SUMMARY: [
    'Seit dem 1. Januar 2025 müssen alle Unternehmen in Deutschland, die an andere Unternehmen verkaufen, strukturierte E-Rechnungen empfangen können.',
    `Ab dem 1. Januar 2027 müssen Unternehmen mit mehr als ${SCHWELLE} Vorjahresumsatz für inländische B2B-Umsätze strukturierte E-Rechnungen ausstellen.`,
    'Ab dem 1. Januar 2028 gilt die Ausstellungspflicht für alle übrigen Unternehmen.',
    'Kleinunternehmer nach § 19 UStG sind von der Ausstellungspflicht ausgenommen, müssen E-Rechnungen aber empfangen können.',
    'Eine strukturierte E-Rechnung folgt der europäischen Norm EN 16931, zum Beispiel als XRechnung (XML) oder ZUGFeRD (PDF mit eingebettetem XML). Eine einfache PDF ist keine E-Rechnung.',
  ],

  PREPARE_BUSINESSES: [
    'Sicherstellen, dass Sie strukturierte E-Rechnungen empfangen und lesen können',
    'Stammdaten prüfen: Adressen, USt-IdNr., Steuernummer, Referenzen',
    'Festlegen, welche Formate Sie ausstellen (XRechnung, ZUGFeRD)',
    'Klären, wie Rechnungen erstellt und geprüft werden',
    'Übergabe an Buchhaltung und Steuerberater abstimmen',
    'Ausgestellte Rechnungen GoBD-gerecht archivieren und protokollieren',
  ],

  PREPARE_SOFTWARE: [
    'Ihr Rechnungsdatenmodell auf die Felder der EN 16931 abbilden',
    'XRechnung- und ZUGFeRD-Ausgabe für Ihre Kunden anbieten',
    'Validierungsfehler den Nutzern zeigen, die sie beheben können',
    'Den Status jeder Rechnung nach dem Ausstellen verfolgen',
    'Übergabe an die Buchhaltungssysteme Ihrer Kunden anbieten',
    'Für künftige Regeländerungen planen, ohne Ihr Produkt neu auszuliefern',
  ],

  COMPLIANCE_FAQ: [
    {
      q: 'Müssen Unternehmen in Deutschland schon heute E-Rechnungen empfangen?',
      a: 'Ja. Seit dem 1. Januar 2025 müssen alle Unternehmen in Deutschland, die an andere Unternehmen verkaufen, strukturierte E-Rechnungen empfangen können. Das Ausstellen wird ab 2027 schrittweise Pflicht.',
    },
    FAQ[5],
    FAQ[6],
    FAQ[1],
    {
      q: 'Was ist der Unterschied zwischen XRechnung und ZUGFeRD?',
      a: 'Beide können die europäische Norm EN 16931 umsetzen. XRechnung ist reines XML und braucht einen Viewer, damit Menschen sie lesen können; sie ist das übliche Format für Rechnungen an Behörden. ZUGFeRD bettet dieselbe Art von XML in ein PDF ein, sodass Menschen es lesen und Software es verarbeiten kann.',
    },
    {
      q: 'Was ist eine Leitweg-ID?',
      a: 'Die Leitweg-ID ist die Kennung, die deutsche öffentliche Auftraggeber auf E-Rechnungen an sie (B2G) verlangen, damit die Rechnung die richtige Stelle erreicht. Sie wird zusammen mit XRechnung verwendet.',
    },
  ],
};
