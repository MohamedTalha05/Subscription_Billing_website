/**
 * Central place for outbound links and contact details.
 *
 * Sign-in and trial links fall back to the contact page until the product app
 * URLs are known. Set VITE_SIGN_IN_URL / VITE_TRIAL_URL in `.env` to point them
 * at the real app.
 */
export const LINKS = {
  signIn: import.meta.env.VITE_SIGN_IN_URL || '/contact?intent=signin',
  trial: import.meta.env.VITE_TRIAL_URL || '/contact?intent=trial',
  demo: '/contact?intent=demo',
  sales: '/contact?intent=sales',
  earlyAccess: '/contact?intent=early-access',
} as const;

export const CONTACT = {
  publicEmail: 'hello@billing.eu',
  legalEmail: 'sales@myfundbox.com',
  company: 'MYFUNDBOX GmbH',
  address: 'Schiller40 Coworking Space, Porschestraße 2c, 38440 Wolfsburg, Germany',
} as const;

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/security', label: 'Security & Compliance' },
  { to: '/contact', label: 'Contact' },
] as const;
