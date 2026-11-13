/**
 * E-Invoicing product content, ported from the MYFUNDBOX E-Invoicing site and
 * translated to English. Pages, structured data (JSON-LD) and llms.txt all read
 * from here, so a fact changed once changes everywhere.
 *
 * Compliance dates follow the source site, which marks each entry
 * "official review pending" and records when it was last reviewed. Keep that
 * status and date accurate whenever the timeline is edited.
 */
import { LINKS } from '../config';
import type { Faq } from './pricingFaq';

/* ---------- Plans ---------- */

export type EInvoicingPlan = {
  name: string;
  desc: string;
  price: number;
  included: number;
  overage?: number;
  popular?: boolean;
  cta: { label: string; to: string };
  features: string[];
};

export const EINVOICING_PLANS: EInvoicingPlan[] = [
  {
    name: 'Free',
    desc: 'For small businesses (Kleinunternehmer) and for testing before the mandate applies to you.',
    price: 0,
    included: 5,
    cta: { label: 'Start Free', to: LINKS.trial },
    features: [
      '5 e-invoices per month',
      'XRechnung & ZUGFeRD',
      'Check and view received e-invoices',
      'EN 16931 validation',
      '1 user',
    ],
  },
  {
    name: 'Starter',
    desc: 'For freelancers, sole traders and small teams.',
    price: 9,
    included: 30,
    overage: 0.35,
    cta: { label: 'Choose Starter', to: LINKS.trial },
    features: [
      '30 e-invoices per month',
      'Everything in Free',
      'Customer records & templates',
      '1 accounting connection',
      'Archive & audit trail',
      '2 users · email support',
    ],
  },
  {
    name: 'Business',
    desc: 'For SMEs, agencies and service providers that invoice every month.',
    price: 24,
    included: 200,
    overage: 0.15,
    popular: true,
    cta: { label: 'Choose Business', to: LINKS.trial },
    features: [
      '200 e-invoices per month',
      'Everything in Starter',
      'Lexware Office, DATEV & sevdesk',
      'Leitweg-ID for public-sector invoices (B2G)',
      'Credit notes & roles (e.g. tax advisor)',
      '5 users · priority support',
    ],
  },
];

export const EINVOICING_PRICING_NOTE =
  'All prices exclude VAT. Cancel monthly, no setup fee. Paying yearly gives you 2 months free.';

/* ---------- Mandate timeline ---------- */

export const MANDATE_REVIEWED = '2026-10-21';
export const ISSUING_DEADLINE_LARGE = '2027-01-01';
export const ISSUING_DEADLINE_ALL = '2028-01-01';
export const REVENUE_THRESHOLD = '€800,000';

export type MandateStep = {
  year: string;
  title: string;
  body: string;
  appliesTo: string;
  source: string;
};

export const MANDATE_TIMELINE: MandateStep[] = [
  {
    year: '2025',
    title: 'Receiving e-invoices',
    body: 'Every business in Germany that sells to other businesses must be able to receive structured e-invoices. Paper and PDF invoices may still be issued during the transition period.',
    appliesTo: 'All domestic B2B businesses',
    source: 'Wachstumschancengesetz, § 14 UStG',
  },
  {
    year: '2026',
    title: 'Transition period',
    body: 'Under the transition rules, businesses may still issue other invoice formats while they prepare their systems. Supplementary letters from the Federal Ministry of Finance (BMF) clarify the details.',
    appliesTo: 'All domestic B2B businesses',
    source: 'BMF letter on mandatory e-invoicing',
  },
  {
    year: '2027',
    title: 'Issuing: larger businesses',
    body: `Businesses whose previous-year revenue is above the threshold (currently ${REVENUE_THRESHOLD}) must issue structured e-invoices for domestic B2B sales from 1 January 2027.`,
    appliesTo: `Businesses above ${REVENUE_THRESHOLD} revenue`,
    source: '§ 27 (38) UStG (transition rules)',
  },
  {
    year: '2028',
    title: 'Issuing: all businesses',
    body: 'From 1 January 2028 the obligation to issue structured e-invoices for domestic B2B sales applies to all remaining businesses. Small businesses under § 19 UStG (Kleinunternehmer) stay exempt.',
    appliesTo: 'All domestic B2B businesses',
    source: '§ 27 (38) UStG (transition rules)',
  },
  {
    year: 'After 2028',
    title: 'EU developments (ViDA)',
    body: 'The EU package "VAT in the Digital Age" (ViDA) introduces digital reporting requirements. The national details are still being decided.',
    appliesTo: 'Businesses that trade within the EU',
    source: 'European Commission: VAT in the Digital Age',
  },
];

export const COMPLIANCE_DISCLAIMER =
  'This compliance information is general guidance and should be checked against the current official rules. It is not legal or tax advice.';

export const OFFICIAL_SOURCES = [
  { label: 'Federal Ministry of Finance (BMF): e-invoicing', href: 'https://www.bundesfinanzministerium.de' },
  { label: 'European Commission: VAT in the Digital Age (ViDA)', href: 'https://taxation-customs.ec.europa.eu' },
];

/* ---------- Who is affected ---------- */

export const WHO_IS_AFFECTED = [
  {
    who: `Businesses with more than ${REVENUE_THRESHOLD} revenue`,
    what: 'From 1 January 2027 you must issue domestic B2B invoices as structured e-invoices.',
  },
  {
    who: 'All other businesses',
    what: 'From 1 January 2028 the issuing obligation applies to all domestic B2B sales. You already need to be able to receive e-invoices today.',
  },
  {
    who: 'Small businesses (§ 19 UStG)',
    what: 'Exempt from issuing, but you must still be able to receive and read e-invoices. The free plan covers that.',
  },
  {
    who: 'Invoices to public authorities (B2G)',
    what: 'Public-sector buyers already require XRechnung with a Leitweg-ID. MYFUNDBOX E-Invoicing supports both.',
  },
];

/* ---------- Formats ---------- */

export const FORMATS = [
  {
    name: 'XRechnung',
    summary:
      'The German implementation of the European standard EN 16931. The invoice is a pure XML file, with no readable page unless a viewer displays it.',
    use: 'Invoices to public-sector buyers, and B2B exchange when both sides process XML.',
  },
  {
    name: 'ZUGFeRD',
    summary:
      'A hybrid format: a PDF for people with structured XML embedded inside it. Profiles from EN 16931 (Comfort) upwards meet the European standard.',
    use: 'B2B invoices when the recipient still wants a readable PDF.',
  },
  {
    name: 'EN 16931',
    summary:
      'The European semantic standard for electronic invoices. It defines which data an invoice contains and how it is structured, independent of the file syntax.',
    use: 'The foundation for XRechnung and for compliant ZUGFeRD profiles.',
  },
];

export const FORMAT_COMPARISON: { label: string; xrechnung: string; zugferd: string }[] = [
  { label: 'File type', xrechnung: 'XML only', zugferd: 'PDF with embedded XML' },
  { label: 'Readable by people', xrechnung: 'Only with a viewer', zugferd: 'Yes, as a normal PDF' },
  { label: 'Readable by software', xrechnung: 'Yes', zugferd: 'Yes, from the embedded XML' },
  { label: 'Meets EN 16931', xrechnung: 'Yes', zugferd: 'With the EN 16931 (Comfort) profile or higher' },
  { label: 'Typical use', xrechnung: 'Public sector (B2G) and XML-to-XML B2B', zugferd: 'B2B where the buyer wants a PDF' },
];

/* ---------- Product capabilities ---------- */

export const CAPABILITIES = [
  { title: 'Create', desc: 'Structured invoices with seller, buyer, line items, VAT, discounts, payment details and references.' },
  { title: 'Validate', desc: 'Checks against EN 16931 plus German rules, with a plain-language explanation of every error.' },
  { title: 'Generate', desc: 'XRechnung XML and ZUGFeRD PDF/XML from the same validated invoice data.' },
  { title: 'Exchange', desc: 'Deliver e-invoices to your customers, or hand them to the next system.' },
  { title: 'Connect', desc: 'Transfer documents to connected accounting software such as Lexware Office, DATEV or sevdesk.' },
  { title: 'Track', desc: 'Status, invoice history and a complete, time-stamped audit trail for every invoice.' },
];

export const DETAIL_LISTS = [
  {
    title: 'Fields captured',
    items: ['Customer and seller details', 'Invoice number and date', 'Due date', 'Line items, quantity and unit price', 'VAT and discounts', 'Payment information', 'References and Leitweg-ID'],
  },
  {
    title: 'Validation checks',
    items: ['Required fields (§ 14 UStG)', 'Structured data', 'VAT categories and rates', 'Invoice calculations', 'EN 16931 rules', 'German e-invoicing rules', 'Plain-language error explanations'],
  },
  {
    title: 'Records kept',
    items: ['Structured invoice data', 'Validation results', 'Audit trail', 'Invoice history', 'Document archive', 'Transfer status per connection'],
  },
];

export const WHY_E_INVOICING = [
  { title: 'A PDF is not an e-invoice', desc: 'A PDF is a picture of an invoice. E-invoicing requires structured data that software can read.' },
  { title: 'Structured data is required', desc: 'Every value, from VAT category to totals and references, belongs in a defined field.' },
  { title: 'The rules keep changing', desc: 'Obligations and transition periods are phased in and clarified in letters from the Federal Ministry of Finance.' },
  { title: 'Formats are complex', desc: 'XRechnung, ZUGFeRD and their profiles each have their own rules.' },
];

export const WORKFLOW = [
  { title: 'Capture', desc: 'Enter invoice and customer data once, then reuse customer records.' },
  { title: 'Validate', desc: 'Check the invoice against the e-invoicing rules and the required details under § 14 UStG.' },
  { title: 'Generate', desc: 'Produce XRechnung or ZUGFeRD from the same validated data.' },
  { title: 'Transfer', desc: 'Hand the invoice and its data to your accounting software and business systems.' },
];

/* ---------- Integrations ---------- */

export type IntegrationStatus = 'Available' | 'Preview' | 'Coming soon';

export const ACCOUNTING_INTEGRATIONS: { name: string; code: string; status: IntegrationStatus; desc: string }[] = [
  { name: 'Lexware Office', code: 'LX', status: 'Preview', desc: 'Transfer validated e-invoices and receipts to Lexware Office for bookkeeping.' },
  { name: 'DATEV', code: 'DA', status: 'Preview', desc: 'Hand invoice documents over to DATEV-based bookkeeping with your tax advisor.' },
  { name: 'sevdesk', code: 'SD', status: 'Preview', desc: 'Send e-invoices to sevdesk; your bookkeeping stays where it is.' },
  { name: 'Xero', code: 'XE', status: 'Coming soon', desc: 'Transfer invoices to Xero organisations.' },
  { name: 'QuickBooks', code: 'QB', status: 'Coming soon', desc: 'Transfer invoices to QuickBooks Online.' },
  { name: 'Zoho Books', code: 'ZB', status: 'Coming soon', desc: 'Transfer invoices to Zoho Books.' },
  { name: 'Subscription Billing', code: 'SB', status: 'Coming soon', desc: 'Issue an e-invoice automatically for every subscription renewal and membership charge.' },
];

export const STATUS_HELP: Record<IntegrationStatus, string> = {
  Available: 'In production, ready to use.',
  Preview: 'Running in demo or pilot mode.',
  'Coming soon': 'On the roadmap, not usable yet.',
};

export const INDUSTRIES = [
  'Agencies', 'Consultants', 'Freelancers', 'Gyms & studios', 'Education providers', 'Clubs & memberships',
  'Trades & services', 'Non-profits', 'Subscription businesses', 'Mittelstand',
];

/* ---------- FAQ ---------- */

export const EINVOICING_FAQ: Faq[] = [
  {
    q: 'What is e-invoicing in Germany?',
    a: 'E-invoicing means invoices are issued and received as structured electronic data under the European standard EN 16931, for example as XRechnung or ZUGFeRD. The recipient’s software can read and process them automatically.',
  },
  {
    q: 'Is a PDF invoice an e-invoice?',
    a: 'No. A plain PDF is a picture of an invoice for people. A structured e-invoice contains machine-readable data. ZUGFeRD combines both: a readable PDF with embedded XML.',
  },
  {
    q: 'What is XRechnung?',
    a: 'XRechnung is the German implementation of EN 16931. It is an XML format with no visual layout, used mainly for invoices to public authorities and for B2B exchange.',
  },
  {
    q: 'What is ZUGFeRD?',
    a: 'ZUGFeRD is a hybrid invoice format: a PDF with an embedded XML file. From the EN 16931 (Comfort) profile upwards it meets the European standard.',
  },
  {
    q: 'What is EN 16931?',
    a: 'EN 16931 is the European standard that defines the core data of an electronic invoice: who, what, when, how much and which tax. XRechnung and ZUGFeRD implement it.',
  },
  {
    q: 'When do I have to issue e-invoices?',
    a: `Businesses in Germany must already be able to receive e-invoices. Businesses with more than ${REVENUE_THRESHOLD} previous-year revenue must issue them for domestic B2B sales from 1 January 2027, and all other businesses from 1 January 2028. Check your own case with your tax advisor.`,
  },
  {
    q: 'Does the obligation apply to small businesses?',
    a: 'Small businesses under § 19 UStG (Kleinunternehmer) are exempt from issuing e-invoices but must be able to receive them. The free plan lets you check and view the e-invoices you receive.',
  },
  {
    q: 'How can I read e-invoices I receive?',
    a: 'Upload the XML file to MYFUNDBOX E-Invoicing. It is checked against EN 16931 and displayed in a readable form, including on the free plan.',
  },
  {
    q: 'Does it replace Lexware Office or DATEV?',
    a: 'No. MYFUNDBOX E-Invoicing is an e-invoicing layer, not accounting software. Your bookkeeping stays in Lexware Office, DATEV or sevdesk; MYFUNDBOX creates, validates and generates the e-invoice and can transfer it to a connected account.',
  },
  {
    q: 'Can I generate both XRechnung and ZUGFeRD?',
    a: 'Yes. After validation, MYFUNDBOX E-Invoicing generates XRechnung (XML) and ZUGFeRD (PDF with embedded XML, EN 16931 profile) from the same invoice data.',
  },
  {
    q: 'How does validation work?',
    a: 'Before generating, it checks required fields, structured data, VAT categories and rates, and invoice totals against EN 16931 and German rules. Errors are explained in plain language so you can fix them.',
  },
  {
    q: 'Are my invoices archived?',
    a: 'Yes. Issued invoices and their audit trail stay viewable. Statutory retention under GoBD remains the responsibility of your accounting system or tax advisor.',
  },
  {
    q: 'Does it send invoices to the tax office?',
    a: 'No. It creates, validates and generates e-invoices and transfers them to connected accounting systems or to your customer. Tax reporting continues through your accounting.',
  },
  {
    q: 'Do I need to upgrade my accounting software?',
    a: 'No. You add e-invoicing without switching to a bigger or different accounting package.',
  },
];

export const EINVOICING_SCOPE_NOTE =
  'MYFUNDBOX E-Invoicing prepares, validates and generates compliant e-invoices and can transfer them to connected accounting systems. Bookkeeping and tax processes after the transfer depend on your accounting provider and setup.';

/* ---------- Compliance page ---------- */

export const MANDATE_SUMMARY = [
  'Since 1 January 2025, every business in Germany that sells to other businesses must be able to receive structured e-invoices.',
  `From 1 January 2027, businesses with more than ${REVENUE_THRESHOLD} previous-year revenue must issue structured e-invoices for domestic B2B sales.`,
  'From 1 January 2028, the issuing obligation applies to all remaining businesses.',
  'Small businesses under § 19 UStG (Kleinunternehmer) are exempt from issuing but must still be able to receive e-invoices.',
  'A structured e-invoice follows the European standard EN 16931, for example XRechnung (XML) or ZUGFeRD (PDF with embedded XML). A plain PDF is not an e-invoice.',
];

export const PREPARE_BUSINESSES = [
  'Make sure you can receive and read structured e-invoices',
  'Check your master data: addresses, VAT ID, tax number, references',
  'Decide which formats you will issue (XRechnung, ZUGFeRD)',
  'Agree how invoices are created and checked before they go out',
  'Agree the handover to your accounting software and tax advisor',
  'Archive and log issued invoices in line with GoBD',
];

export const PREPARE_SOFTWARE = [
  'Map your invoice data model to the EN 16931 fields',
  'Offer XRechnung and ZUGFeRD output to your customers',
  'Show validation errors to the people who can fix them',
  'Track the status of every invoice after it is issued',
  'Offer a handover to your customers’ accounting systems',
  'Plan for rule changes without having to re-ship your product',
];

export const COMPLIANCE_FAQ: Faq[] = [
  {
    q: 'Do businesses in Germany already have to receive e-invoices?',
    a: 'Yes. Since 1 January 2025, every business in Germany that sells to other businesses must be able to receive structured e-invoices. Issuing them becomes mandatory in stages from 2027.',
  },
  EINVOICING_FAQ[5],
  EINVOICING_FAQ[6],
  EINVOICING_FAQ[1],
  {
    q: 'What is the difference between XRechnung and ZUGFeRD?',
    a: 'Both can implement the European standard EN 16931. XRechnung is pure XML and needs a viewer to be read by people; it is the usual format for public-sector invoices. ZUGFeRD embeds the same kind of XML in a PDF, so people can read it and software can process it.',
  },
  {
    q: 'What is a Leitweg-ID?',
    a: 'A Leitweg-ID is the routing identifier that German public authorities require on e-invoices sent to them (B2G), so the invoice reaches the right office. It is used together with XRechnung.',
  },
];

/* ---------- Pricing page ---------- */

export const EINVOICING_ENTERPRISE = {
  name: 'Enterprise',
  price: 'On request',
  desc: 'For high volumes, custom requirements and an SLA.',
  features: [
    'Custom volume',
    'Custom integrations',
    'A named contact',
    'Extended security options',
    'SLA and data processing agreement (AVV)',
  ],
};

/** Cost per e-invoice when the included volume is used in full. */
export const EINVOICING_UNIT_COST = EINVOICING_PLANS.map((p) => ({
  name: p.name,
  included: p.included,
  price: p.price,
  perInvoice: p.price === 0 ? null : p.price / p.included,
}));

export const POSTAGE_COMPARISON = 'For comparison, postage alone for a standard letter in Germany costs €0.95.';

export const EINVOICING_PRICING_FAQ: Faq[] = [
  {
    q: 'Do small businesses need a paid E-Invoicing plan?',
    a: 'Usually not. Small businesses under § 19 UStG only need to receive and read e-invoices, which the free E-Invoicing plan covers, along with issuing up to 5 e-invoices a month.',
  },
  {
    q: 'What happens if I need more e-invoices than my plan includes?',
    a: 'Extra e-invoices are charged per invoice: €0.35 each on Starter and €0.15 each on Business. For larger volumes, contact sales about Enterprise.',
  },
  {
    q: 'What does one e-invoice cost?',
    a: `About €0.30 on Starter (€9 for 30) and about €0.12 on Business (€24 for 200). ${POSTAGE_COMPARISON}`,
  },
  {
    q: 'Can I pay for E-Invoicing yearly?',
    a: 'Yes. Paying yearly gives you 2 months free. Monthly plans can be cancelled at the end of any month.',
  },
  {
    q: 'Do I need both Subscription Billing and E-Invoicing?',
    a: 'No. The two products are priced separately, so you only pay for the one you use.',
  },
];

/* ---------- Language bundle ---------- */

/** Everything the e-invoicing components and pages need in one language. The German bundle has the same shape. */
export type EIContent = {
  REVENUE_THRESHOLD: string;
  EINVOICING_PLANS: EInvoicingPlan[];
  EINVOICING_PRICING_NOTE: string;
  MANDATE_TIMELINE: MandateStep[];
  COMPLIANCE_DISCLAIMER: string;
  OFFICIAL_SOURCES: { label: string; href: string }[];
  WHO_IS_AFFECTED: { who: string; what: string }[];
  FORMATS: { name: string; summary: string; use: string }[];
  FORMAT_COMPARISON: { label: string; xrechnung: string; zugferd: string }[];
  CAPABILITIES: { title: string; desc: string }[];
  DETAIL_LISTS: { title: string; items: string[] }[];
  WHY_E_INVOICING: { title: string; desc: string }[];
  WORKFLOW: { title: string; desc: string }[];
  ACCOUNTING_INTEGRATIONS: { name: string; code: string; status: IntegrationStatus; desc: string }[];
  STATUS_LABEL: Record<IntegrationStatus, string>;
  STATUS_HELP: Record<IntegrationStatus, string>;
  INDUSTRIES: string[];
  EINVOICING_FAQ: Faq[];
  EINVOICING_SCOPE_NOTE: string;
  MANDATE_SUMMARY: string[];
  PREPARE_BUSINESSES: string[];
  PREPARE_SOFTWARE: string[];
  COMPLIANCE_FAQ: Faq[];
};

export const EN_CONTENT: EIContent = {
  REVENUE_THRESHOLD,
  EINVOICING_PLANS,
  EINVOICING_PRICING_NOTE,
  MANDATE_TIMELINE,
  COMPLIANCE_DISCLAIMER,
  OFFICIAL_SOURCES,
  WHO_IS_AFFECTED,
  FORMATS,
  FORMAT_COMPARISON,
  CAPABILITIES,
  DETAIL_LISTS,
  WHY_E_INVOICING,
  WORKFLOW,
  ACCOUNTING_INTEGRATIONS,
  STATUS_LABEL: { Available: 'Available', Preview: 'Preview', 'Coming soon': 'Coming soon' },
  STATUS_HELP,
  INDUSTRIES,
  EINVOICING_FAQ,
  EINVOICING_SCOPE_NOTE,
  MANDATE_SUMMARY,
  PREPARE_BUSINESSES,
  PREPARE_SOFTWARE,
  COMPLIANCE_FAQ,
};
