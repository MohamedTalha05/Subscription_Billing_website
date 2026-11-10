/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function TermsPage() {
  const sections = [
    { title: '1. Scope (Geltungsbereich)' },
    { title: '2. Definitions' },
    { title: '3. Registration and Account' },
    { title: '4. SaaS Service' },
    { title: '5. Pricing, Subscription and Fees' },
    { title: '6. Payment Processing' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-lg mb-12">
          <p className="text-amber-200/80 text-sm"><strong>Draft for legal review.</strong> This page is a professional draft prepared for a Germany-based subscription billing platform and is not yet a finished legal document.</p>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-2">Terms & Conditions</h1>
        <p className="text-gray-400 mb-12">Allgemeine Geschäftsbedingungen (AGB)</p>
        
        <div className="bg-[#131615] p-8 rounded-2xl border border-gray-800/50 mb-12">
          <h3 className="text-white font-bold mb-6">CONTENTS</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            {sections.map(s => <div key={s.title}>{s.title}</div>)}
          </div>
        </div>

        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">1. Scope (Geltungsbereich)</h2>
            <p className="text-gray-400 leading-relaxed">These Terms & Conditions ("AGB") govern the contractual relationship between MYFUNDBOX GmbH ("Provider", "we") and the organization that registers for and uses the Billing.eu platform ("Customer", "you"). The platform is offered to businesses for their own commercial subscription billing operations.</p>
            
            <h2 className="text-2xl font-bold text-white">2. Definitions</h2>
            <p className="text-gray-400 leading-relaxed"><strong>Provider</strong> — MYFUNDBOX GmbH, the operator of the Billing.eu platform.</p>
            <p className="text-gray-400 leading-relaxed"><strong>Customer</strong> — the business entity that has registered an account to use the platform.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
