/**
 * Integrations across both products. Statuses must stay honest: "Available"
 * only for connections customers can use in production today.
 */
import { ACCOUNTING_INTEGRATIONS, type IntegrationStatus } from './eInvoicing';

export type Integration = { name: string; code: string; status: IntegrationStatus; desc: string };

export const PAYMENT_GATEWAYS: Integration[] = [
  { name: 'Stripe', code: 'ST', status: 'Available', desc: 'Cards, wallets and SEPA through your existing Stripe account, with payouts reconciled per batch.' },
  { name: 'PayPal', code: 'PP', status: 'Available', desc: 'Recurring PayPal payments alongside your other gateways, in the same settlement ledger.' },
  { name: 'GoCardless', code: 'GC', status: 'Available', desc: 'SEPA direct debit for subscriptions, with dunning rules set for bank payments.' },
  { name: 'Mollie', code: 'MO', status: 'Available', desc: 'European payment methods through Mollie, tracked gross, fees and net per payout.' },
];

/** Accounting software that E-Invoicing hands invoices to. */
export const ACCOUNTING: Integration[] = ACCOUNTING_INTEGRATIONS.filter((i) => i.code !== 'SB');

/** The connection between the two products. */
export const PRODUCT_LINK: Integration = ACCOUNTING_INTEGRATIONS.find((i) => i.code === 'SB')!;
