/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {Link} from 'react-router-dom';
import { ArrowRight, BarChart3, Star, Zap, PieChart, Users, CheckCircle } from 'lucide-react';

const BRAND_GREEN = '#00e676';

const Hero = () => (
  <section className="bg-[#0a0c0b] py-24">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h1 className="text-7xl font-extrabold text-white leading-tight mb-8 tracking-tighter">
        Recurring revenue infrastructure, <span style={{ color: BRAND_GREEN }}>built compliant</span> from the first invoice.
      </h1>
      <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
        Plans, pay links, dunning, payouts, and EU tax & GDPR tooling in one platform — so your SaaS can bill in fifteen currencies without hiring a compliance team to do it.
      </p>
      <div className="flex gap-4 justify-center">
        <button style={{ backgroundColor: BRAND_GREEN }} className="text-black px-8 py-3.5 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition">
          Start Free Trial <ArrowRight size={18} />
        </button>
        <button className="bg-gray-800 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-700 transition">Book a Demo</button>
      </div>
    </div>
  </section>
);

const Trust = () => (
  <section className="py-12 bg-[#0a0c0b]">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2 className="text-xl text-gray-400 mb-8">Customers have consistently rated Billing.eu 4.9/5</h2>
      <div className="flex justify-center gap-12 text-gray-500">
        {['Capterra', 'Trustpilot', 'G2'].map(s => (
          <div key={s} className="flex flex-col items-center gap-2">
            <div className="flex text-emerald-400"><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/><Star size={20} fill="currentColor"/></div>
            <span className="text-sm font-bold text-white">{s}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 bg-[#0c0e0d]">
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">One platform for the whole subscription lifecycle.</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: 'Plans & Pay Links', desc: 'Flat or tiered pricing, custom billing intervals, and shareable checkout links with your own branding.' },
          { title: 'Smart Dunning', desc: 'Automated retry cadence that adapts by payment method, with failed-payment alerts before customers churn.' },
          { title: 'Multi-Gateway Payments', desc: 'Stripe, PayPal, GoCardless and Mollie reconciled automatically.' },
          { title: 'EU VAT & VIES', desc: 'Validates VAT IDs against VIES in real time and applies the right tax rate by customer region.' },
          { title: 'GDPR Data Rights', desc: 'Portability exports and right-to-erasure, plus a customer-initiated deletion queue your team reviews.' },
          { title: 'Revenue Analytics', desc: 'ARR, forecast and collected revenue, subscription health, and a per-customer next-billing view.' },
        ].map((f, i) => (
          <div key={i} className="bg-[#131615] p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition">
            <h3 className="text-white font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AICopilot = () => (
  <section className="py-24 bg-[#0a0c0b]">
    <div className="max-w-5xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-white mb-6">An AI copilot for your revenue, built into Billing.eu.</h2>
      <p className="text-gray-400 mb-12 max-w-2xl mx-auto">We're building a finance assistant that reads your real subscription data.</p>
      <div className="grid md:grid-cols-3 gap-6">
        {['Churn prediction', 'Revenue leakage detection', 'Conversational finance assistant'].map(t => (
          <div key={t} className="bg-[#131615] p-6 rounded-2xl border border-gray-800/50">
            <Zap className="text-emerald-400 mb-4" />
            <h4 className="text-white font-semibold">{t}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Steps = () => (
  <section className="py-24 bg-[#0c0e0d]">
    <div className="max-w-5xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">Live in an afternoon.</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { step: '01 / CONNECT', title: 'Connect a gateway' },
          { step: '02 / CONFIGURE', title: 'Create plans & pay links' },
          { step: '03 / COLLECT', title: 'Get paid, automatically' },
        ].map(s => (
          <div key={s.step} className="border-t border-gray-800 pt-6">
            <div className="text-xs font-bold text-emerald-500 mb-2">{s.step}</div>
            <h4 className="text-white font-semibold">{s.title}</h4>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Metrics = () => (
  <section className="py-24 bg-[#0a0c0b]">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
      {[
        { val: '€284,600', label: 'Annual Recurring Revenue' },
        { val: '1,284', label: 'Transactions Tracked' },
        { val: '4', label: 'Payment Gateways' },
        { val: '6', label: 'Subscription Lifecycle States' },
      ].map(m => (
        <div key={m.label} className="bg-[#131615] p-8 rounded-2xl border border-gray-800/50">
          <div className="text-3xl font-bold text-white mb-2">{m.val}</div>
          <div className="text-sm text-gray-400">{m.label}</div>
        </div>
      ))}
    </div>
  </section>
);

const FinalCTA = () => (
  <section className="py-24 bg-[#0c0e0d]">
    <div className="max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-4xl font-bold text-white mb-8">Start billing in minutes, not a quarter-long migration.</h2>
      <button style={{ backgroundColor: BRAND_GREEN }} className="text-black px-8 py-3.5 rounded-lg font-semibold hover:opacity-90 transition">Start Free Trial</button>
    </div>
  </section>
);

import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <Hero />
      <Trust />
      <Features />
      <AICopilot />
      <Steps />
      <Metrics />
      <FinalCTA />
      <Footer />
    </div>
  );
}
