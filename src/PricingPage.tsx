/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';

const BRAND_GREEN = '#00e676';

const PricingPlan = ({ title, desc, price, features, highlighted }: { title: string, desc: string, price: string, features: string[], highlighted?: boolean }) => (
  <div className={`p-8 rounded-3xl border ${highlighted ? 'border-emerald-500/50 bg-[#0c0e0d]' : 'border-gray-800 bg-[#131615]'}`}>
    {highlighted && <div className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-widest">Most Popular</div>}
    <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm mb-6">{desc}</p>
    <div className="text-white text-4xl font-extrabold mb-8">{price}</div>
    <button style={{ backgroundColor: highlighted ? BRAND_GREEN : 'transparent', borderColor: highlighted ? BRAND_GREEN : '#374151' }} className={`w-full py-3 rounded-lg font-semibold ${highlighted ? 'text-black' : 'text-white border'}`}>
      {highlighted ? 'Start Free Trial' : 'Get Started Free'}
    </button>
    <ul className="space-y-4 mt-8">
      {features.map(f => (
        <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
          <Check size={16} className="text-emerald-500" />
          {f}
        </li>
      ))}
    </ul>
  </div>
);

const ComparisonTable = () => (
  <section className="py-24 max-w-7xl mx-auto px-6">
    <h2 className="text-4xl font-bold text-white text-center mb-16">Here's how we compare</h2>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-300">
        <thead>
          <tr className="border-b border-gray-800 text-gray-500">
            <th className="py-4">FEATURE</th>
            <th className="py-4">FREE</th>
            <th className="py-4">PROFESSIONAL</th>
            <th className="py-4">ADVANCED</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          <tr><td className="py-6 font-bold text-white">Subscribers</td><td></td><td></td><td></td></tr>
          <tr><td className="py-4">Active subscriptions</td><td>25</td><td>500</td><td>Unlimited</td></tr>
          <tr><td className="py-6 font-bold text-white">Security</td><td></td><td></td><td></td></tr>
          <tr><td className="py-4">2FA authentication</td><td>•</td><td>•</td><td>•</td></tr>
        </tbody>
      </table>
    </div>
  </section>
);

import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24 text-center">
        <h2 className="text-emerald-500 font-bold mb-4">PRICING</h2>
        <h1 className="text-6xl font-extrabold text-white mb-8">Clear plans for every stage, with simple, predictable pricing.</h1>
        <div className="flex justify-center gap-4 items-center">
          <span>Monthly</span>
          <div className="w-12 h-6 bg-gray-800 rounded-full p-1"><div className="w-4 h-4 bg-emerald-500 rounded-full"></div></div>
          <span>Annual <span className="text-emerald-400 text-xs">Save 19%</span></span>
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <PricingPlan title="Free" desc="For testing the waters." price="€0 / month" features={['Up to 25 subscriptions', 'Multiple gateways', 'Smart dunning']} />
        <PricingPlan highlighted title="Professional" desc="For SaaS scaling fast." price="€7.29 / month" features={['Up to 500 subscriptions', 'Multiple gateways', 'Smart dunning', 'Custom domain']} />
        <PricingPlan title="Advanced" desc="For platforms that outgrown limits." price="€15.39 / month" features={['Unlimited subscriptions', 'Multiple gateways', 'Smart dunning', 'Dedicated support']} />
      </section>
      
      <ComparisonTable />
      <Footer />
    </div>
  );
}
