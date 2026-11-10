/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {Link} from 'react-router-dom';
import { ShieldCheck, Lock, FileText, Database } from 'lucide-react';

const BRAND_GREEN = '#00e676';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function SecurityPage() {
  const sections = [
    { title: 'GDPR: Data rights, handled', description: 'A customer\'s right to their own data isn\'t a once-a-year export. It\'s a working queue your team can act on.', items: [{ title: 'Article 15 - Portability', desc: 'Full profile and status export on request.' }, { title: 'Article 17 - Erasure', desc: 'Anonymized referencing; tax records kept.' }, { title: 'Customer-initiated deletion', desc: 'Pending queue with review and approval workflow.' }] },
    { title: 'PSD2: SCA Testing', description: 'Test Strong Customer Authentication flows before they touch a real customer.', items: [{ title: 'Simulate challenge', desc: 'Test SCA flows at checkout.' }, { title: 'Confirm outcomes', desc: 'Verify success/decline paths.' }] },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24 text-center">
        <h2 className="text-emerald-500 font-bold mb-4">SECURITY & COMPLIANCE</h2>
        <h1 className="text-6xl font-extrabold text-white mb-8 tracking-tighter">Compliant by default, not bolted on after your first audit.</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Billing software holds sensitive data. Billing.eu handles compliance built-in.</p>
      </section>
      
      {sections.map(s => <SecuritySection key={s.title} {...s} />)}
      
      <Footer />
    </div>
  );
}
