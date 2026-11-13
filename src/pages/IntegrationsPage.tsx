import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ButtonLink, CtaPanel, SectionHeader } from '../components/ui';
import { IntegrationCards, StatusLegend } from '../components/einvoicing';
import { ACCOUNTING, PAYMENT_GATEWAYS, PRODUCT_LINK } from '../content/integrations';
import { LINKS } from '../config';

function Group({
  id,
  eyebrow,
  title,
  lead,
  product,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  product: { label: string; to: string };
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line" aria-labelledby={`${id}-title`}>
      <div className="container-x py-20 sm:py-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 id={`${id}-title`} className="font-display mt-4 text-[2rem] leading-[1.12] sm:text-[2.5rem]">
              {title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed">{lead}</p>
          </div>
          <Link to={product.to} className="link-mint inline-flex shrink-0 items-center gap-1">
            {product.label} <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

export default function IntegrationsPage() {
  return (
    <>
      <section className="container-x pb-14 pt-16 sm:pt-24">
        <SectionHeader
          as="h1"
          eyebrow="Integrations"
          title="Connect the payment gateways and accounting software you already use."
          lead="Subscription Billing collects payments through your existing gateways. E-Invoicing hands compliant invoices to your accounting software. Each integration is labelled with its real status."
        />
        <div className="mx-auto mt-10 max-w-3xl text-center [&_dl]:justify-center">
          <StatusLegend />
        </div>
      </section>

      <Group
        id="payments"
        eyebrow="Payment gateways"
        title="Collect payments through your own merchant accounts."
        lead="Keep your existing gateway contracts. Subscription Billing reconciles gross, fees and net payouts from every gateway in one settlement ledger."
        product={{ label: 'Subscription Billing', to: '/subscription-billing/' }}
      >
        <IntegrationCards items={PAYMENT_GATEWAYS} />
      </Group>

      <Group
        id="accounting"
        eyebrow="Accounting software"
        title="Hand e-invoices to the accounting you already have."
        lead="E-Invoicing creates and validates the invoice; your accounting software keeps the bookkeeping, tax processes and reports, exactly as today."
        product={{ label: 'E-Invoicing', to: '/e-invoicing/' }}
      >
        <IntegrationCards items={ACCOUNTING} />
      </Group>

      <Group
        id="products"
        eyebrow="Between our products"
        title="Subscription Billing and E-Invoicing, connected."
        lead="The two products run side by side today. The automatic connection is on the roadmap."
        product={{ label: 'How renewals become e-invoices', to: '/' }}
      >
        <IntegrationCards items={[PRODUCT_LINK]} />
      </Group>

      <section className="border-t border-line">
        <div className="container-x py-16 sm:py-20">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div>
              <h2 className="font-display text-2xl sm:text-[1.75rem]">Is your software missing?</h2>
              <p className="mt-3 max-w-2xl leading-relaxed">
                Tell us which payment provider or accounting system you use. Requests decide which integrations we
                build next.
              </p>
            </div>
            <ButtonLink to={LINKS.integration} variant="ghost" size="md" className="shrink-0">
              Request an Integration
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaPanel
        eyebrow="Start with what you have"
        title="Keep your gateway and your accounting. Add the rest."
        subtitle="Both products start free, with no card required."
        primary={{ label: 'Start Free Trial', to: LINKS.trial }}
        secondary={{ label: 'Book a Demo', to: LINKS.demo }}
      />
    </>
  );
}
