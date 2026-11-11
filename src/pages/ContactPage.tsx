import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check, CircleCheck } from 'lucide-react';
import { Avatar, CheckList, SCREENS, SectionHeader, usePageTitle } from '../components/ui';
import { CONTACT } from '../config';

const INTENTS: Record<string, { eyebrow: string; title: string; submit: string }> = {
  demo: { eyebrow: 'Book a demo', title: 'Book a demo, or just ask a question first.', submit: 'Request a Demo' },
  trial: { eyebrow: 'Start your free trial', title: "Tell us where you're billing today — we'll set up your trial.", submit: 'Start My Free Trial' },
  sales: { eyebrow: 'Talk to sales', title: 'Talk to sales about volume, migration or special pricing.', submit: 'Contact Sales' },
  signin: { eyebrow: 'Account access', title: 'Need help getting into your account?', submit: 'Send Request' },
  'early-access': { eyebrow: 'AI copilot early access', title: 'Get early access to the AI finance copilot.', submit: 'Join Early Access' },
};
const DEFAULT_INTENT = { eyebrow: 'Contact', title: 'Book a demo, or just ask a question first.', submit: 'Request a Demo' };

const VOLUMES = ['Pre-launch', '1–100', '100–1,000', '1,000–10,000', '10,000+'];

const inputClass =
  'w-full rounded-lg border border-line bg-canvas px-4 py-3.5 text-fg placeholder:text-faint transition focus:border-mint/60 focus:outline-none';

function Field({
  label,
  htmlFor,
  error,
  children,
  className = '',
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2.5 block font-semibold text-fg/90">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm text-[#f59e8b]">
          {error}
        </p>
      )}
    </div>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.publicEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the address is still selectable text */
    }
  };
  return (
    <div className="mt-6 flex items-center justify-between rounded-lg border border-line bg-canvas px-4 py-3.5">
      <span className="select-all font-mono text-fg">{CONTACT.publicEmail}</span>
      <button type="button" onClick={copy} className="inline-flex items-center gap-1 text-sm font-semibold text-mint hover:text-mint-hover">
        {copied ? (
          <>
            <Check size={14} /> Copied
          </>
        ) : (
          'Copy'
        )}
      </button>
    </div>
  );
}

type Errors = Partial<Record<'firstName' | 'lastName' | 'email' | 'company', string>>;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const get = (k: string) => String(data.get(k) ?? '').trim();
  if (!get('firstName')) errors.firstName = 'Please enter your first name.';
  if (!get('lastName')) errors.lastName = 'Please enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get('email'))) errors.email = 'Please enter a valid work email.';
  if (!get('company')) errors.company = 'Please enter your company.';
  return errors;
}

function ContactForm({ submitLabel }: { submitLabel: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate(new FormData(e.currentTarget));
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // TODO: connect to the CRM / email endpoint. Until then the request is not transmitted.
      setSent(true);
    }
  };

  if (sent) {
    return (
      <div className="card flex flex-col items-center p-10 text-center sm:p-14" role="status">
        <CircleCheck size={44} className="text-mint" />
        <h2 className="font-display mt-6 text-3xl">Thanks — we've got it.</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed">
          Someone from the team will reply within one business day, usually with your first plan already sketched out.
        </p>
      </div>
    );
  }

  const aria = (k: keyof Errors) =>
    errors[k] ? { 'aria-invalid': true as const, 'aria-describedby': `${k}-error` } : {};

  return (
    <form noValidate onSubmit={onSubmit} className="card space-y-7 p-7 sm:p-11">
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName" error={errors.firstName}>
          <input id="firstName" name="firstName" autoComplete="given-name" className={inputClass} {...aria('firstName')} />
        </Field>
        <Field label="Last name" htmlFor="lastName" error={errors.lastName}>
          <input id="lastName" name="lastName" autoComplete="family-name" className={inputClass} {...aria('lastName')} />
        </Field>
      </div>
      <Field label="Work email" htmlFor="email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" className={inputClass} {...aria('email')} />
      </Field>
      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Company" htmlFor="company" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" className={inputClass} {...aria('company')} />
        </Field>
        <Field label="Active subscriptions today" htmlFor="volume">
          <select id="volume" name="volume" className={`${inputClass} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2214%22%20height=%2214%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23a3b8b3%22%20stroke-width=%222.5%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}>
            {VOLUMES.map((v) => (
              <option key={v} className="bg-surface">
                {v}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="What are you hoping to solve?" htmlFor="message">
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="e.g. we're outgrowing manual dunning, or we need EU VAT handled automatically"
          className={`${inputClass} resize-y`}
        />
      </Field>
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-5">
        <button type="submit" className="btn btn-primary btn-md">
          {submitLabel}
        </button>
        <p className="text-sm text-muted">No spam — just a reply from a person.</p>
      </div>
    </form>
  );
}

export default function ContactPage() {
  usePageTitle('Contact');
  const [params] = useSearchParams();
  const intent = INTENTS[params.get('intent') ?? ''] ?? DEFAULT_INTENT;

  return (
    <>
      <section className="container-x pb-12 pt-16 sm:pt-24">
        <SectionHeader
          as="h1"
          align="left"
          eyebrow={intent.eyebrow}
          title={intent.title}
          lead="Tell us a little about your billing setup and someone from the team will get back to you — usually with your first plan already sketched out."
        />
      </section>

      <div className="container-x">
        <div className="border-t border-line" />
      </div>

      <section className="container-x grid items-start gap-8 py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <div className="order-2 space-y-5 lg:order-1">
          <article className="card p-8">
            <h2 className="font-display text-xl">Who you'll talk to</h2>
            <p className="mt-3 text-lg leading-relaxed">
              Not a routing queue — a demo request goes straight to someone who actually sets up accounts.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                { person: 'priya' as const, name: 'Priya N.', role: 'Onboarding' },
                { person: 'marco' as const, name: 'Marco E.', role: 'Solutions' },
              ].map((p) => (
                <li key={p.name} className="flex items-center gap-4">
                  <Avatar person={p.person} size={52} />
                  <span>
                    <span className="block text-lg font-semibold text-fg">{p.name}</span>
                    <span className="block text-muted">{p.role}</span>
                  </span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card p-8">
            <h2 className="font-display text-xl">What to expect</h2>
            <CheckList
              className="mt-5 text-lg"
              items={[
                'A reply within one business day',
                'A 20-minute call, not a one-hour deck',
                'Your first plan set up live, if you want it',
              ]}
            />
            <img
              src={SCREENS.dashboard}
              alt="Billing.eu dashboard preview"
              loading="lazy"
              className="mt-7 w-full rounded-lg border border-line bg-white"
            />
          </article>

          <article className="card p-8">
            <h2 className="font-display text-xl">Prefer email?</h2>
            <p className="mt-3 text-lg leading-relaxed">
              Reach the team directly — this address is shown as text, not a link, since mail links don't always work
              reliably from every page.
            </p>
            <CopyEmail />
          </article>
        </div>

        <div className="order-1 lg:sticky lg:top-28 lg:order-2">
          <ContactForm key={intent.submit} submitLabel={intent.submit} />
        </div>
      </section>
    </>
  );
}
