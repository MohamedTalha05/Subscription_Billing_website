import type { LucideIcon } from 'lucide-react';
import { Activity, Building2, CreditCard, Download, Info, Layers, Lock, Search, Trash2 } from 'lucide-react';
import { BrowserFrame, CtaPanel, SCREENS, SectionHeader, usePageTitle } from '../components/ui';
import { LINKS } from '../config';

type Item = { icon: LucideIcon; title: string; desc: string };

function SectionIntro({
  tag,
  title,
  desc,
  source,
  small,
}: {
  tag: string;
  title: string;
  desc: string;
  source?: string;
  small?: boolean;
}) {
  return (
    <div className="lg:sticky lg:top-28 lg:self-start">
      <p className="eyebrow">{tag}</p>
      <h2 className="font-display mt-4 text-[1.75rem] leading-[1.15] sm:text-[2.25rem]">{title}</h2>
      <p className="mt-5 text-lg leading-relaxed">{desc}</p>
      {source && <p className="mt-4 border-l-2 border-line pl-3 font-mono text-xs leading-relaxed text-muted">{source}</p>}
    </div>
  );
}

function ItemCards({ items }: { items: Item[] }) {
  return (
    <div className="space-y-5">
      {items.map(({ icon: Icon, title, desc }) => (
        <article key={title} className="card flex items-start gap-4 p-5 sm:p-6">
          <span className="icon-tile">
            <Icon size={19} />
          </span>
          <div className="pt-0.5">
            <h3 className="text-[1.0625rem] font-semibold">{title}</h3>
            <p className="mt-1.5 text-[0.9375rem] leading-relaxed">{desc}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Split({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <section className="border-t border-line">
      <div className="container-x grid gap-10 py-20 sm:py-24 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
        {left}
        {right}
      </div>
    </section>
  );
}

const SCA_STEPS = [
  { title: 'Trigger a challenge', desc: 'Simulate a card requiring SCA at checkout.' },
  { title: 'Walk the flow', desc: 'Step through the authentication challenge your real customers would see.' },
  { title: 'Confirm the outcome', desc: 'Verify a successful or declined result reaches your subscription correctly.' },
  { title: 'Ship with confidence', desc: "Launch a checkout you've already watched handle SCA end to end." },
];

export default function SecurityPage() {
  usePageTitle('Security & Compliance');
  return (
    <>
      <section className="container-x py-16 sm:py-24">
        <SectionHeader
          as="h1"
          eyebrow="Security & Compliance"
          title="Compliant by default, not bolted on after your first audit."
          lead="Billing software ends up holding some of the most regulated data a SaaS company has — card details, VAT IDs, personal data under GDPR. Here's specifically how Billing.eu handles each of those, not a generic trust page."
        />
        <div className="card mx-auto mt-10 flex max-w-2xl gap-3.5 rounded-xl p-5 text-left">
          <Info size={18} className="mt-0.5 shrink-0 text-muted" />
          <p className="text-[0.9375rem] leading-relaxed text-fg/85">
            This page describes the compliance tooling built into the product today. It isn't a substitute for your own
            legal review, and we don't claim third-party certifications we haven't earned.
          </p>
        </div>
      </section>

      {/* GDPR */}
      <Split
        left={
          <SectionIntro
            tag="GDPR"
            title="Data rights, handled as a workflow — not a support ticket."
            desc="A customer's right to their own data isn't a once-a-year export. It's a working queue your team can act on."
            source="EU GDPR Regulation 2016/679, Art. 15 & Art. 17"
          />
        }
        right={
          <ItemCards
            items={[
              { icon: Download, title: 'Article 15 — Portability', desc: "A customer's full profile, contract status and payment method metadata, compiled as a structured export on request." },
              { icon: Trash2, title: 'Article 17 — Erasure', desc: 'Personal fields are scrubbed and replaced with an anonymized reference; invoice and tax records are kept, anonymized, for the retention period the law requires.' },
              { icon: Activity, title: 'Customer-initiated deletion requests', desc: "A customer can request deletion from their own account. It's held as pending — showing exactly what's still outstanding (an active subscription, an unpaid invoice) — until your team reviews and approves it." },
            ]}
          />
        }
      />
      <div className="container-x pb-20 sm:pb-24">
        <BrowserFrame src={SCREENS.gdpr} alt="GDPR consent and erasure log with pending deletion requests" />
      </div>

      {/* PSD2 */}
      <Split
        left={
          <SectionIntro
            tag="PSD2"
            title="Test Strong Customer Authentication before a real customer ever sees it."
            desc="SCA challenge flows are notoriously hard to test against a live gateway. A sandbox means your checkout is proven before launch, not during an incident."
            source="PSD2 Regulatory Technical Standards — Strong Customer Authentication"
          />
        }
        right={
          <ol className="grid gap-px self-start overflow-hidden rounded-2xl border border-line-soft bg-line-soft sm:grid-cols-2">
            {SCA_STEPS.map((s, i) => (
              <li key={s.title} className="bg-surface p-6">
                <p className="font-mono text-sm text-muted">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-3 leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        }
      />

      {/* Tax */}
      <Split
        left={
          <SectionIntro
            tag="Tax"
            title="VAT, validated at the point of checkout — not reconciled at quarter end."
            desc="A wrong VAT rate is a finance team's problem for months. Checking it before the invoice exists removes the problem entirely."
          />
        }
        right={
          <ItemCards
            items={[
              { icon: Search, title: 'Real-time VIES validation', desc: "A customer's VAT ID is checked against the EU VIES registry as they check out, not after." },
              { icon: Layers, title: 'Region-aware tax rates', desc: "The correct rate applies automatically based on the customer's billing country — B2B reverse charge included." },
            ]}
          />
        }
      />

      {/* Data handling */}
      <Split
        left={
          <SectionIntro
            small
            tag="Handling your data"
            title="What we do with what you give us."
            desc="Written plainly, because a security page nobody can parse isn't actually reassuring."
          />
        }
        right={
          <ItemCards
            items={[
              { icon: Lock, title: 'Encrypted in transit', desc: 'Every connection to the platform, and to each payment gateway it talks to, runs over TLS.' },
              { icon: CreditCard, title: 'No raw card numbers stored', desc: 'Card details live with your payment gateway (Stripe, PayPal, GoCardless or Mollie) — Billing.eu stores only the token and last four digits it needs to show you.' },
              { icon: Building2, title: 'Access is scoped per organization', desc: "One organization's API key can never read another's data — the account boundary is enforced the same way whether you run one organization or fifty." },
            ]}
          />
        }
      />

      <div className="border-t border-line">
        <CtaPanel
          eyebrow="Questions for a specific audit"
          title="Talk to us before your next compliance review, not after."
          subtitle="We'll walk through exactly what's covered for your use case."
          primary={{ label: 'Book a Demo', to: LINKS.demo }}
          secondary={{ label: 'Start Free Trial', to: LINKS.trial }}
          caption="Your questions go to a person who can actually answer them."
        />
      </div>
    </>
  );
}
