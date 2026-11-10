/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-12">
    <h3 className="text-white font-bold mb-6">{title}</h3>
    {children}
  </div>
);

const Field = ({ label, value }: { label: string, value: string }) => (
  <div className="mb-4">
    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</div>
    <div className="text-gray-300">{value}</div>
  </div>
);

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24 max-w-3xl mx-auto px-6">
        <div className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-lg mb-12">
          <p className="text-amber-200/80 text-sm"><strong>Draft for legal review.</strong> This page is a professional draft prepared for a Germany-based subscription billing platform and is not yet a finished legal document.</p>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-2">Impressum</h1>
        <p className="text-gray-400 mb-12">Legal Notice</p>
        
        <Section title="Anbieter (Service Provider)">
          <Field label="Company" value="MYFUNDBOX GmbH" />
          <Field label="Legal Form" value="GmbH (Gesellschaft mit beschränkter Haftung)" />
          <Field label="Registered Address" value="Schiller40 Coworking Space, Porschestraße 2c, 38440 Wolfsburg, Germany" />
        </Section>
        
        <Section title="Vertretungsberechtigte Person (Authorized Representative)">
          <Field label="Managing Directors" value="Yasneem Thimiri Afreen Kauser, Yasneem Thimiri" />
        </Section>
        
        <Section title="Register Information">
          <Field label="Register Court" value="District Court (Amtsgericht)" />
          <Field label="Commercial Register Number" value="HRB 207466" />
        </Section>
      </section>
      <Footer />
    </div>
  );
}
