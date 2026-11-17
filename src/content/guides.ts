/**
 * Guide articles, ported from the MYFUNDBOX E-Invoicing site. The two
 * API-focused articles were left out because the E-Invoicing API isn't
 * planned; the SaaS article was rewritten without API steps.
 *
 * Each guide becomes a prerendered page at /resources/<slug>/ with Article
 * structured data. Update `reviewed` whenever a guide is checked against the
 * current rules.
 */
export type GuideSection = { heading: string; paragraphs: string[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  reviewed: string;
  readMinutes: number;
  /** Shows the "not legal or tax advice" note and a link to the compliance timeline. */
  compliance?: boolean;
  sections: GuideSection[];
  related: string[];
};

export const GUIDES: Guide[] = [
  {
    slug: 'german-e-invoicing-what-businesses-need-to-know',
    title: 'German E-Invoicing: What Businesses Need to Know',
    description: 'What counts as an e-invoice, who is affected and how to prepare without changing your accounting software.',
    category: 'German e-invoicing',
    published: '2026-10-21',
    reviewed: '2026-10-21',
    readMinutes: 6,
    compliance: true,
    sections: [
      {
        heading: 'What changes',
        paragraphs: [
          'Germany is moving domestic B2B invoicing from paper and PDF to structured electronic invoices. Instead of a document that a person reads, the invoice becomes data that software can process.',
          'The rules are phased in: receiving comes first, then issuing obligations follow by business size. Check the compliance timeline for the current dates and their review status.',
        ],
      },
      {
        heading: 'What counts as an e-invoice',
        paragraphs: [
          'An e-invoice follows the European standard EN 16931. In Germany the common formats are XRechnung (pure XML) and ZUGFeRD (PDF with embedded XML). A PDF created from Word or exported from a design tool is not an e-invoice.',
        ],
      },
      {
        heading: 'How to prepare',
        paragraphs: [
          'Check that your invoice data is complete: seller and buyer details, VAT IDs, line items, VAT categories and payment information. Then decide how invoices will be created: in a dedicated e-invoicing workspace, or through the billing system or SaaS platform you already use.',
          'You do not need to switch accounting software. E-invoicing can sit in front of the accounting system you already use.',
        ],
      },
    ],
    related: ['xrechnung-vs-zugferd', 'prepare-your-saas-for-german-e-invoicing', 'german-e-invoicing-updates-2027'],
  },
  {
    slug: 'xrechnung-vs-zugferd',
    title: 'XRechnung vs ZUGFeRD',
    description: 'Two formats, one standard. When to use pure XML and when a hybrid PDF makes more sense.',
    category: 'XRechnung',
    published: '2026-10-21',
    reviewed: '2026-10-21',
    readMinutes: 5,
    sections: [
      {
        heading: 'Same foundation',
        paragraphs: ['Both formats can implement EN 16931. The difference is how the data is packaged, not what data is required.'],
      },
      {
        heading: 'XRechnung',
        paragraphs: [
          'XRechnung is XML only. It is precise and easy for software to process, and is widely used for public-sector invoicing. People need a viewer to read it.',
        ],
      },
      {
        heading: 'ZUGFeRD',
        paragraphs: [
          'ZUGFeRD embeds the XML in a PDF, so the recipient can read the invoice and their software can process it. Choose an EN 16931-compliant profile (Comfort or higher) for structured B2B invoicing.',
        ],
      },
      {
        heading: 'Which to choose',
        paragraphs: [
          'Many businesses support both and let the recipient decide. E-Invoicing by MYFUNDBOX generates either format from the same validated invoice data.',
        ],
      },
    ],
    related: ['german-e-invoicing-what-businesses-need-to-know', 'pdf-invoice-vs-structured-e-invoice', 'how-e-invoicing-works-with-accounting-software'],
  },
  {
    slug: 'prepare-your-saas-for-german-e-invoicing',
    title: 'How to Prepare Your SaaS for German E-Invoicing',
    description: 'Your customers will ask for compliant invoices. Here is how to add them without building the compliance stack yourself.',
    category: 'SaaS billing',
    published: '2026-10-21',
    reviewed: '2026-10-21',
    readMinutes: 6,
    sections: [
      {
        heading: 'Why SaaS is affected',
        paragraphs: [
          'If your platform issues invoices, whether for your own subscriptions or on behalf of your customers for memberships, bookings or plans, those invoices need to be structured e-invoices once the issuing obligations apply.',
        ],
      },
      {
        heading: 'Build or use a dedicated tool',
        paragraphs: [
          'Building it yourself means maintaining EN 16931 rules, XRechnung and ZUGFeRD generators and accounting connectors as the standards evolve. A dedicated e-invoicing tool keeps that work outside your core product.',
        ],
      },
      {
        heading: 'A practical rollout',
        paragraphs: [
          'Map your invoice data to the EN 16931 fields, test invoices before you go live, show validation errors to the people who can fix them, track the status of every invoice after it is issued, and agree which format each customer needs.',
        ],
      },
    ],
    related: ['german-e-invoicing-what-businesses-need-to-know', 'xrechnung-vs-zugferd', 'how-e-invoicing-works-with-accounting-software'],
  },
  {
    slug: 'pdf-invoice-vs-structured-e-invoice',
    title: 'PDF Invoice vs Structured E-Invoice',
    description: 'Why a PDF is not enough, and what "structured" really means.',
    category: 'EN 16931',
    published: '2026-10-21',
    reviewed: '2026-11-17',
    readMinutes: 4,
    compliance: true,
    sections: [
      {
        heading: 'A PDF is a picture',
        paragraphs: [
          'A PDF shows an invoice to a person. Software has to guess what each number means, which is why manual entry and OCR are still common.',
          'That is true even for a PDF exported straight from a billing tool rather than scanned. An amount at the bottom of the page might be the net total, the gross total or the amount still due. A person can tell from the label next to it; software has to infer it, and every inference is a chance for an error that someone then corrects by hand.',
        ],
      },
      {
        heading: 'Structured means defined fields',
        paragraphs: [
          "A structured e-invoice carries each value in a defined field: invoice number, VAT category, net amount, due date. The recipient's software reads it without interpretation.",
          'Those fields follow the European standard EN 16931, which defines the core content of an electronic invoice and the business rules it must pass: totals have to add up, every line needs a VAT category, and a reverse-charge invoice has to carry the right VAT IDs. Because sender and recipient use the same definitions, an invoice can be checked automatically before it is sent and booked automatically when it arrives.',
        ],
      },
      {
        heading: 'What German law counts as an e-invoice',
        paragraphs: [
          'Since 1 January 2025, German VAT law defines an e-invoice as an invoice that is issued, transmitted and received in a structured electronic format that allows electronic processing and follows EN 16931. A PDF sent by email does not meet that definition. Like paper, it counts as an "other invoice", which is only allowed for domestic B2B sales during the transition periods.',
          'Formats that meet the definition include XRechnung and ZUGFeRD (from version 2.0.1) in its EN 16931-compliant profiles. The ZUGFeRD MINIMUM and BASIC WL profiles do not carry enough invoice data and do not count as e-invoices.',
        ],
      },
      {
        heading: 'Where ZUGFeRD fits',
        paragraphs: [
          'ZUGFeRD is a hybrid: a PDF/A-3 file that a person can read, with the structured XML embedded inside it. It looks like the PDFs your customers already receive, which makes it a gentle first step.',
          'But it is the embedded XML that counts. If the visible PDF and the XML ever disagree, the XML takes precedence, so it has to be generated from correct, validated data rather than attached as an afterthought.',
        ],
      },
      {
        heading: 'Why it matters beyond compliance',
        paragraphs: [
          'For the recipient, structured data removes retyping and OCR corrections: invoices can be matched to orders and booked without manual entry. For the sender, invoices that pass validation before they go out are rejected less often, which means fewer corrections and faster payment.',
          'The structured file is also the original invoice for record-keeping. Archive the XML, or the ZUGFeRD file with its embedded XML, not a printout or an image of it.',
        ],
      },
      {
        heading: 'How to tell what you send today',
        paragraphs: [
          'If your invoices come from a word processor, a spreadsheet or a plain PDF export, they are not e-invoices yet. To change that, use software that produces XRechnung or ZUGFeRD and validates each invoice against EN 16931 before it is sent.',
          'E-Invoicing by MYFUNDBOX does both from one set of invoice data, and explains every validation error in plain language so you can fix it before your customer sees it.',
        ],
      },
    ],
    related: ['german-e-invoicing-what-businesses-need-to-know', 'xrechnung-vs-zugferd', 'german-e-invoicing-updates-2027'],
  },
  {
    slug: 'how-e-invoicing-works-with-accounting-software',
    title: 'How E-Invoicing Works With Accounting Software',
    description: 'Keep your accounting software. Add e-invoicing. Here is how the two fit together.',
    category: 'Accounting integrations',
    published: '2026-10-21',
    reviewed: '2026-11-17',
    readMinutes: 5,
    sections: [
      {
        heading: 'Two jobs, two systems',
        paragraphs: [
          'E-invoicing creates, validates, generates and exchanges invoices. Accounting software books them, runs tax workflows and produces reports.',
          'The two overlap less than it seems. Producing a compliant e-invoice depends on strict data rules and validation; booking it depends on a chart of accounts, VAT reporting and year-end processes. Most accounting tools were built for the second job, which is why many businesses add a dedicated e-invoicing step instead of replacing software their accountant already knows.',
        ],
      },
      {
        heading: 'The flow, step by step',
        paragraphs: [
          'Create: the invoice is entered once, with seller and buyer details, line items, VAT, discounts, payment terms and references such as a purchase order number or a Leitweg-ID for public-sector customers.',
          'Validate: before anything is sent, the invoice is checked against EN 16931, German e-invoicing rules and the required invoice details under § 14 UStG. Errors are flagged while they are still cheap to fix.',
          'Generate and deliver: the validated data becomes an XRechnung XML file or a ZUGFeRD PDF with embedded XML, and goes to your customer.',
          'Transfer: the invoice and its structured data are handed to your accounting software, where bookkeeping takes over.',
        ],
      },
      {
        heading: 'Where the handover happens',
        paragraphs: [
          'After generation, the invoice and its data are transferred to the connected accounting system, such as Lexware Office, DATEV or sevdesk. From there, bookkeeping and tax processes run as they do today, depending on your provider and setup.',
          'Because the accounting system receives structured data rather than a PDF, the invoice number, amounts, VAT categories and customer details arrive in fields, not in a document someone has to read and retype. Each booking can be traced back to the validated original.',
        ],
      },
      {
        heading: 'What stays where it is',
        paragraphs: [
          'E-invoicing does not replace your accounting software, and it does not file anything with the tax office. Bookings, VAT returns and annual financial statements stay in your accounting system and are prepared the way they are today. If a tax advisor does your books, they keep working in the system they already use.',
        ],
      },
      {
        heading: 'Before you connect the two',
        paragraphs: [
          'A few questions settle most setups: which accounting system and plan you use; who books your invoices, you or your tax advisor; whether any customers are public bodies that require XRechnung with a Leitweg-ID; and which system should hold the archived original of each invoice.',
          'The current connection status for Lexware Office, DATEV and sevdesk is listed on the integrations page. If your system is not there yet, you can request it from the contact page.',
        ],
      },
    ],
    related: ['german-e-invoicing-what-businesses-need-to-know', 'xrechnung-vs-zugferd', 'prepare-your-saas-for-german-e-invoicing'],
  },
  {
    slug: 'german-e-invoicing-updates-2027',
    title: 'German E-Invoicing Updates for 2027',
    description: 'What is expected in 2027, what is still open and where to check the latest official guidance.',
    category: 'Compliance updates',
    published: '2026-10-21',
    reviewed: '2026-10-21',
    readMinutes: 5,
    compliance: true,
    sections: [
      {
        heading: 'What is expected',
        paragraphs: [
          'Based on the currently published rules, 2027 is when issuing obligations are expected to begin for businesses above the turnover threshold (currently €800,000), with all remaining businesses following in 2028.',
        ],
      },
      {
        heading: 'What may change',
        paragraphs: [
          'Industry groups have asked for adjustments, and the Federal Ministry of Finance continues to publish supplementary guidance. Treat any date as subject to change until it is confirmed in the current official text.',
        ],
      },
      {
        heading: 'Stay current',
        paragraphs: [
          'This article and the compliance timeline are reviewed and updated when official guidance changes. Always check the Federal Ministry of Finance (BMF) for the authoritative version.',
        ],
      },
    ],
    related: ['german-e-invoicing-what-businesses-need-to-know', 'pdf-invoice-vs-structured-e-invoice', 'xrechnung-vs-zugferd'],
  },
];

export const guideBySlug = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidePath = (slug: string) => `/resources/${slug}/`;
