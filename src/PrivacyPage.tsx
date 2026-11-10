/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function PrivacyPage() {
  const contents = [
    '1. Controller (Verantwortlicher)', '2. Scope',
    '3. Personal Data We Process', '4. Technical Data',
    '5. Purposes of Processing', '6. GDPR Legal Bases',
    '7. Legitimate Interests', '8. Cookies and Tracking',
    '9. Payment Providers', '10. Other Service Providers',
    '11. Data Processing Agreements', '12. International Data Transfers',
    '13. Data Retention', '14. Data Security',
    '15. Data Subject Rights', '16. Supervisory Authority',
    '17. Automated Decision-Making', '18. Children\'s Data',
    '19. Marketing Communications', '20. Changes to this Privacy Policy',
  ];

  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-lg mb-12">
          <p className="text-amber-200/80 text-sm"><strong>Draft for legal review.</strong> This page is a professional draft prepared for a Germany-based subscription billing platform and is not yet a finished legal document.</p>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-2">Datenschutzerklärung</h1>
        <p className="text-gray-400 mb-12">Privacy Policy</p>
        
        <div className="bg-[#131615] p-8 rounded-2xl border border-gray-800/50 mb-12">
          <h3 className="text-white font-bold mb-6">CONTENTS</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
            {contents.map(c => <div key={c}>{c}</div>)}
          </div>
        </div>

        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white">1. Controller (Verantwortlicher)</h2>
            <p className="text-gray-400 leading-relaxed">The controller responsible for the processing of personal data described in this Privacy Policy, within the meaning of Art. 4(7) GDPR, is: MYFUNDBOX GmbH.</p>
            
            <h2 className="text-2xl font-bold text-white">2. Scope</h2>
            <p className="text-gray-400 leading-relaxed">This Privacy Policy explains how personal data is processed in connection with the Billing.eu platform, for: Visitors to our marketing website; Authorized users and account holders; Business customers and their authorized contacts.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
