/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const BRAND_GREEN = '#00e676';

const Header = () => (
  <header className="sticky top-0 bg-[#0a0c0b]/80 backdrop-blur-md border-b border-gray-800/60 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-white flex items-center gap-2">
        <span style={{ backgroundColor: BRAND_GREEN }} className="p-1.5 rounded-lg text-black">B</span>
        BILLING<span className="text-gray-500">.eu</span>
      </div>
      <nav className="hidden md:flex gap-8 text-sm text-gray-300">
        <Link to="/features" className="hover:text-white transition">Features</Link>
        <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
        <Link to="/security" className="hover:text-white transition">Security & Compliance</Link>
        <Link to="/contact" className="text-white transition">Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-sm text-white hover:text-gray-300 transition">Sign In</button>
        <button style={{ backgroundColor: BRAND_GREEN }} className="text-black text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition">Start Free Trial</button>
      </div>
    </div>
  </header>
);

import { Footer } from './components/Footer';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0c0b] text-gray-200">
      <Header />
      <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-emerald-500 font-bold mb-4">CONTACT</h2>
          <h1 className="text-6xl font-extrabold text-white mb-8 tracking-tighter">Book a demo, or just ask a question first.</h1>
          <p className="text-xl text-gray-400 mb-12">Tell us a little about your billing setup and someone from the team will get back to you — usually with your first plan already sketched out.</p>
          <div className="bg-[#131615] p-8 rounded-3xl border border-gray-800/50 mb-8">
            <h3 className="text-white font-semibold mb-4">What to expect</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> A reply within one business day</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> A 20-minute call, not a one-hour deck</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Your first plan set up live, if you want it</li>
            </ul>
          </div>
        </div>
        <form className="bg-[#131615] p-8 rounded-3xl border border-gray-800/50 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First name" className="bg-[#0a0c0b] p-3 rounded-lg border border-gray-800 w-full" />
            <input type="text" placeholder="Last name" className="bg-[#0a0c0b] p-3 rounded-lg border border-gray-800 w-full" />
          </div>
          <input type="email" placeholder="Work email" className="bg-[#0a0c0b] p-3 rounded-lg border border-gray-800 w-full" />
          <input type="text" placeholder="Company" className="bg-[#0a0c0b] p-3 rounded-lg border border-gray-800 w-full" />
          <textarea placeholder="What are you hoping to solve?" className="bg-[#0a0c0b] p-3 rounded-lg border border-gray-800 w-full h-32"></textarea>
          <button style={{ backgroundColor: BRAND_GREEN }} className="text-black font-semibold px-6 py-3 rounded-lg w-full hover:opacity-90">Request a Demo</button>
        </form>
      </section>
      <Footer />
    </div>
  );
}
