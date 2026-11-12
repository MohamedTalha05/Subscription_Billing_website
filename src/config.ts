/**
 * Central place for outbound links and contact details.
 *
 * Sign-in and trial (sign-up) links point at the product app. They can be
 * overridden per environment with VITE_SIGN_IN_URL / VITE_TRIAL_URL in `.env`.
 */
export const LINKS = {
  signIn: import.meta.env.VITE_SIGN_IN_URL || 'https://app.subscriptionbilling.eu/?app=1',
  trial: import.meta.env.VITE_TRIAL_URL || 'https://app.subscriptionbilling.eu/?app=1&signup=1',
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
