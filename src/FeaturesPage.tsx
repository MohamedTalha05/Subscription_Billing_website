/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Star, Zap, PieChart, Users, CheckCircle, Settings, ShieldCheck, CreditCard, RefreshCw } from 'lucide-react';

const BRAND_GREEN = '#00e676';

const Header = () => (
  <header className="sticky top-0 bg-[#0a0c0b]/80 backdrop-blur-md border-b border-gray-800/60 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-white flex items-center gap-2">
        <span style={{ backgroundColor: BRAND_GREEN }} className="p-1.5 rounded-lg text-black">B</span>
        BILLING<span className="text-gray-500">.eu</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm text-gray-300">
        <Link to="/features" className="text-white transition">Features</Link>
        <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
        <a href="#" className="hover:text-white transition">Security & Compliance</a>
        <a href="#" className="hover:text-white transition">Contact</a>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-sm text-white hover:text-gray-300 transition">Sign In</button>
        <button style={{ backgroundColor: BRAND_GREEN }} className="text-black text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition">Start Free Trial</button>
      </div>
    </div>
  </header>
);

const FeatureSection = ({ id, title, description, icon: Icon, items }: { id: string, title: string, description: string, icon: any, items: { title: string, desc: string }[] }) => (
  <section className="py-24 border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
      <div>
        <div className="text-sm font-bold text-emerald-500 mb-4">{id}</div>
        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">{title}</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">{description}</p>
        <div className="bg-[#131615] rounded-2xl p-4 border border-gray-800/50">
          <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center text-gray-600">Dashboard Preview</div>
        </div>
      </div>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-[#131615] p-6 rounded-xl border border-gray-800/50">
            <h4 className="text-white font-semibold mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

import { Footer } from './components/Footer';

export default function FeaturesPage() {
  const features = [
    { id: '01', title: 'Billing & subscriptions', description: 'Flat or tiered pricing, custom billing intervals, and a branded checkout your customers actually recognize as yours.', icon: CreditCard, items: [{ title: 'Flat & tiered plans', desc: 'Build simple flat-rate plans or usage tiers, each with its own billing interval.' }, { title: 'Shareable Pay Links', desc: 'Send a single link for a one-off charge or a recurring subscription.' }, { title: 'Branded checkout', desc: 'Your logo, merchant name, receipt prefix on every invoice.' }] },
    { id: '02', title: 'Dunning & recovery', description: 'Failed payments don\'t have to mean lost customers. Retry logic adapts to how the customer actually pays.', icon: RefreshCw, items: [{ title: 'Automated retry cadence', desc: 'Failed charges retry on a schedule instead of silently lapsing.' }, { title: 'Payment-method-aware rules', desc: 'Filter and schedule retries differently for card, SEPA, or wallet payments.' }, { title: 'Failed-subscription alerts', desc: 'Surfaces failed subscriptions before they pile up in a report nobody reads.' }] },
    { id: '03', title: 'Payments & payouts', description: 'Four gateways, one settlement ledger — so finance reconciles against one source of truth instead of four exports.', icon: CreditCard, items: [{ title: 'Stripe, PayPal, GoCardless, Mollie', desc: 'Connect the gateways you already use — nothing to migrate.' }, { title: 'Settlement ledger', desc: 'Gross, fees, and net payouts tracked per batch, per gateway.' }, { title: 'Refunds & disputes', desc: 'Issue a full or partial refund and track disputes from the same payout record.' }] },
    { id: '04', title: 'Analytics & forecasting', description: 'The numbers a finance lead actually asks for, already assembled: ARR, forecast, collected revenue, and subscription health.', icon: PieChart, items: [{ title: 'Revenue timeline', desc: 'Funds collected by period, broken down by payment method share.' }, { title: 'Subscription health', desc: 'Active, trialing, paused, inactive and not-started — at a glance, not a query.' }, { title: 'Per-customer forecast', desc: 'Next billing date and projected amount, for every customer, one month out.' }] },
    { id: '05', title: 'Privacy, tax & platform tools', description: 'The parts most billing platforms treat as an integration you build yourself.', icon: ShieldCheck, items: [{ title: 'GDPR Data rights', desc: 'Article 15 portability exports, Article 17 erasure, and a customer-initiated deletion request your team reviews before anything\'s anonymized.' }, { title: 'PSD2 SCA sandbox', desc: 'Test Strong Customer Authentication challenge flows before they touch a real customer.' }, { title: 'Multi-org Super Admin', desc: 'One console across every organization you run, with real impersonation for support — not a separate mock view.' }, { title: 'Webhook & API tools', desc: 'Dispatch and inspect webhook events, manage API keys, built for your developers, not against them.' }] },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-emerald-500 font-bold mb-4">FEATURES</div>
          <h1 className="text-6xl font-extrabold text-white leading-tight mb-8 tracking-tighter">Every part of the subscription lifecycle, in one ledger.</h1>
          <p className="text-xl text-gray-400">From the first pay link to the last payout, here's exactly what Billing.eu runs for you — grounded in what the product actually does, not a roadmap slide.</p>
        </div>
      </section>
      
      {features.map(f => <FeatureSection key={f.id} {...f} />)}
      
      <section className="py-24 bg-[#0c0e0d]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-emerald-500 font-bold mb-4">SEE IT ON YOUR OWN PLANS</div>
          <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Bring your pricing. We'll show you the rest.</h2>
          <p className="text-gray-400 mb-8">Start free, or book 20 minutes with someone who'll set up your first plan live on the call.</p>
          <div className="flex gap-4 justify-center">
            <button style={{ backgroundColor: BRAND_GREEN }} className="text-black px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition">Start Free Trial</button>
            <button className="bg-gray-800 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-700 transition">Book a Demo</button>
          </div>
          <div className="mt-8 text-sm text-gray-500">A real person sets up the call — never a bot.</div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
