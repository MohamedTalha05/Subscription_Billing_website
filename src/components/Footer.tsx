import { Logo } from './Logo';
import { SmartLink } from './ui';
import { LINKS } from '../config';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', to: '/features' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Security & Compliance', to: '/security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Book a Demo', to: LINKS.demo },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', to: LINKS.signIn },
      { label: 'Start Free Trial', to: LINKS.trial },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Impressum', to: '/impressum' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Privacy Policy', to: '/privacy' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-5 max-w-[18rem] text-[0.9375rem] leading-relaxed text-body">
            Subscription billing, dunning, payouts and EU compliance tooling for SaaS companies that sell
            internationally.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <SmartLink to={l.to} className="text-[0.9375rem] text-body transition hover:text-fg">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-x">
        <div className="flex flex-col gap-3 border-t border-line py-8 text-sm text-muted sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Billing.eu</span>
          <span>Made for recurring revenue, built for Europe.</span>
        </div>
      </div>
    </footer>
  );
}
