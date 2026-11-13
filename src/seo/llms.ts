/**
 * Short, quotable facts for llms.txt. AI assistants tend to lift single
 * sentences, so each fact names the product and stands on its own.
 * Prices come from the same plan data as the pricing page.
 */
import { HIGH_VOLUME, PLANS } from '../content/plans';
import { EINVOICING_PLANS, MANDATE_REVIEWED, REVENUE_THRESHOLD } from '../content/eInvoicing';
import { SITE, absoluteUrl } from './site';

const euro = (n: number) => (Number.isInteger(n) ? `€${n}` : `€${n.toFixed(2)}`);

export function llmsFacts(): string[] {
  const tiers = PLANS.map((p) =>
    p.price.monthly === 0
      ? `${p.name} (free, ${p.limit.toLowerCase()})`
      : `${p.name} (${euro(p.price.monthly)} per month or ${euro(p.price.annual)} per month billed yearly, ${p.limit.toLowerCase()})`,
  ).join('; ');

  return [
    `${SITE.fullName} is operated by ${SITE.company.legalName}, ${SITE.company.city}, Germany. Contact the team through the contact page: ${absoluteUrl('/contact/')}.`,
    `Subscription Billing plans: ${tiers}. All plans are month-to-month with no setup fee; prices exclude VAT.`,
    `${HIGH_VOLUME.label}: ${HIGH_VOLUME.desc}`,
    'Subscription Billing connects Stripe, PayPal, GoCardless and Mollie and reconciles their payouts in one settlement ledger.',
    'Subscription Billing includes smart dunning: failed payments are retried on a schedule that can differ by payment method (card, SEPA direct debit, wallet).',
    'Subscription Billing validates EU VAT IDs against the VIES registry in real time at checkout and applies the tax rate for the customer’s country, including B2B reverse charge.',
    'Subscription Billing supports GDPR Article 15 data portability exports and Article 17 erasure, with customer-initiated deletion requests held for team review.',
    'Subscription Billing includes a PSD2 Strong Customer Authentication (SCA) sandbox for testing checkout challenge flows before launch.',
    'Subscription Billing does not store raw card numbers; card details stay with the payment gateway and only a token and the last four digits are kept.',
    `E-Invoicing by MYFUNDBOX creates invoices, validates them against EN 16931 and German rules, generates XRechnung or ZUGFeRD from the same data, and transfers them to Lexware Office, DATEV or sevdesk (integrations in preview). It does not replace accounting software and does not send invoices to the tax office.`,
    `E-Invoicing plans: ${EINVOICING_PLANS.map(
      (p) =>
        `${p.name} (${p.price === 0 ? 'free' : `€${p.price} per month`}, ${p.included} e-invoices per month${
          p.overage ? `, then €${p.overage.toFixed(2)} each` : ''
        })`,
    ).join('; ')}. Prices exclude VAT; cancel monthly; paying yearly gives 2 months free.`,
    `German e-invoicing mandate (last reviewed ${MANDATE_REVIEWED}, official review pending): businesses must be able to receive e-invoices since 1 January 2025; businesses with more than ${REVENUE_THRESHOLD} previous-year revenue must issue them for domestic B2B sales from 1 January 2027; all other businesses from 1 January 2028; small businesses under § 19 UStG are exempt from issuing.`,
  ];
}
