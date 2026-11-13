import type { LucideIcon } from 'lucide-react';
import {
  Activity,
  Archive,
  Building2,
  CircleCheck,
  CreditCard,
  DatabaseBackup,
  Download,
  History,
  Info,
  KeyRound,
  Layers,
  Lock,
  Plug,
  Search,
  ShieldCheck,
  Timer,
  Trash2,
  UserCog,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BrowserFrame, CtaPanel, ProtectedEmail, SCREENS, SectionHeader } from '../components/ui';
import { LINKS } from '../config';

type Item = { icon: LucideIcon; title: string; desc: string };

function SectionIntro({ tag, title, desc, source }: { tag: string; title: string; desc: string; source?: string }) {
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
            <Icon size={19} aria-hidden="true" />
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

/** Controls shared by both products. Wording stays exact about what is live and what is part of the production design. */
const PROTECTION: Item[] = [
  { icon: Lock, title: 'Encryption', desc: 'Every connection to the platform, and to each payment gateway and accounting system it talks to, runs over TLS. Encryption at rest is part of the production hosting design.' },
  { icon: CreditCard, title: 'No raw card numbers stored', desc: 'Card details live with your payment gateway (Stripe, PayPal, GoCardless or Mollie). Subscription Billing stores only the token and the last four digits it needs to show you.' },
  { icon: Building2, title: 'Tenant isolation', desc: "Each organization's data is logically separated. One organization can never read another's data, whether you run one organization or fifty." },
  { icon: KeyRound, title: 'Authentication', desc: 'Managed authentication with secure session handling. Passwords are never stored in plain text.' },
  { icon: UserCog, title: 'Role-based access', desc: 'Owners, accountants and viewers only see and do what their role allows, so your tax advisor can work without full access.' },
  { icon: History, title: 'Audit logs', desc: 'Every invoice action and sign-in is recorded with the user, their role and a timestamp.' },
  { icon: Timer, title: 'Configurable data retention', desc: 'Retention can be set to match statutory archiving and deletion requirements.' },
  { icon: DatabaseBackup, title: 'Backup and recovery', desc: 'Backup and recovery procedures are part of the production operations concept.' },
];

const GDPR_PRINCIPLES = [
  'Data minimisation: we only collect what the service needs',
  'Purpose limitation: billing and invoice data is used to provide the service',
  'Transparency: clear privacy information and cookie choices',
  'Analytics only with consent',
  'Access, correction and deletion requests supported',
  'Data processing agreement (AVV) details on request',
];

export default function SecurityPage() {
  return (
    <>
      <section className="container-x py-16 sm:py-24">
        <SectionHeader
          as="h1"
          eyebrow="Security & Compliance"
          title="Compliant by default, not bolted on after your first audit."
          lead="Billing software holds some of the most regulated data a company has: card details, VAT IDs, invoices and personal data under GDPR. Here's specifically how Subscription Billing and E-Invoicing handle each of those."
        />
        <div className="card mx-auto mt-10 flex max-w-2xl gap-3.5 rounded-xl p-5 text-left">
          <Info size={18} className="mt-0.5 shrink-0 text-muted" aria-hidden="true" />
          <p className="text-[0.9375rem] leading-relaxed text-fg/85">
            This page describes the security and compliance tooling built into the products. It isn't a substitute for
            your own legal review, and we only list certifications we actually hold.
          </p>
        </div>
      </section>

      {/* GDPR */}
      <Split
        left={
          <SectionIntro
            tag="GDPR"
            title="Data rights, handled as a workflow, not a support ticket."
            desc="A customer's right to their own data isn't a once-a-year export. It's a working queue your team can act on."
            source="EU GDPR Regulation 2016/679, Art. 15 & Art. 17"
          />
        }
        right={
          <ItemCards
            items={[
              { icon: Download, title: 'Article 15: Portability', desc: "A customer's full profile, contract status and payment method metadata, compiled as a structured export on request." },
              { icon: Trash2, title: 'Article 17: Erasure', desc: 'Personal fields are scrubbed and replaced with an anonymized reference; invoice and tax records are kept, anonymized, for the retention period the law requires.' },
              { icon: Activity, title: 'Customer-initiated deletion requests', desc: "A customer can request deletion from their own account. It's held as pending, showing exactly what's still outstanding (an active subscription, an unpaid invoice), until your team reviews and approves it." },
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
            source="PSD2 Regulatory Technical Standards: Strong Customer Authentication"
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
            title="VAT, validated at the point of checkout, not reconciled at quarter end."
            desc="A wrong VAT rate is a finance team's problem for months. Checking it before the invoice exists removes the problem entirely."
          />
        }
        right={
          <ItemCards
            items={[
              { icon: Search, title: 'Real-time VIES validation', desc: "A customer's VAT ID is checked against the EU VIES registry as they check out, not after." },
              { icon: Layers, title: 'Region-aware tax rates', desc: "The correct rate applies automatically based on the customer's billing country, B2B reverse charge included." },
            ]}
          />
        }
      />

      {/* E-invoicing */}
      <Split
        left={
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionIntro
              tag="E-invoicing"
              title="Every e-invoice traceable from creation to transfer."
              desc="German e-invoicing requires structured, correct invoices. E-Invoicing checks them before they go out and keeps a record of everything that happened to them."
              source="EN 16931 · § 14 UStG · GoBD"
            />
            <Link to="/compliance/" className="link-mint mt-6 inline-flex items-center gap-1">
              E-invoicing mandate and deadlines <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        }
        right={
          <ItemCards
            items={[
              { icon: ShieldCheck, title: 'Validated before it is issued', desc: 'Required fields, structured data, VAT categories and totals are checked against EN 16931 and German rules before an XRechnung or ZUGFeRD file is generated.' },
              { icon: History, title: 'Time-stamped audit trail', desc: 'Creation, validation, generation and transfer are recorded for every invoice, ready for a tax audit or your tax advisor.' },
              { icon: Archive, title: 'Invoice archive', desc: 'Issued invoices and their audit trail stay viewable. Statutory retention under GoBD remains with your accounting system or tax advisor.' },
              { icon: Plug, title: 'Secure accounting connections', desc: 'Connections to accounting software use provider-supported authentication such as OAuth 2.0. Credentials stay on the server, never in the browser.' },
            ]}
          />
        }
      />

      {/* How we protect data */}
      <section className="border-t border-line">
        <div className="container-x py-20 sm:py-24">
          <SectionHeader
            eyebrow="How we protect your data"
            title="Least privilege, traceability and plain answers."
            lead="The controls that apply across Subscription Billing and E-Invoicing, written plainly, because a security page nobody can parse isn't reassuring."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROTECTION.map(({ icon: Icon, title, desc }) => (
              <article key={title} className="bg-surface p-7">
                <span className="icon-tile">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GDPR principles, certifications, vulnerabilities */}
      <section className="border-t border-line">
        <div className="container-x grid gap-6 py-20 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
          <article className="card p-8">
            <p className="eyebrow">GDPR</p>
            <h2 className="font-display mt-4 text-2xl sm:text-[1.75rem]">Data protection by design</h2>
            <p className="mt-3 leading-relaxed">We apply GDPR principles throughout the products and this website.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {GDPR_PRINCIPLES.map((p) => (
                <li key={p} className="flex items-start gap-3 text-fg/90">
                  <CircleCheck size={18} className="mt-0.5 shrink-0 text-mint" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <Link to="/privacy/" className="link-mint mt-7 inline-flex items-center gap-1">
              Read the privacy policy <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </article>
          <div className="space-y-6">
            <article className="card p-8">
              <h2 className="font-display text-xl">Certifications</h2>
              <p className="mt-3 leading-relaxed">
                We only list certifications we actually hold. For security questionnaires or details on our controls,
                contact us.
              </p>
            </article>
            <article id="report-vulnerability" className="card p-8">
              <h2 className="font-display text-xl">Report a vulnerability</h2>
              <p className="mt-3 leading-relaxed">Found a security issue? Email us and we’ll respond promptly.</p>
              <ProtectedEmail />
            </article>
          </div>
        </div>
      </section>

      <div className="border-t border-line">
        <CtaPanel
          eyebrow="Questions for a specific audit"
          title="Talk to us before your next compliance review, not after."
          subtitle="We'll walk through exactly what's covered for your use case."
          primary={{ label: 'Book a Demo', to: LINKS.demo }}
          secondary={{ label: 'Start Free Trial', to: LINKS.trial }}
        />
      </div>
    </>
  );
}
