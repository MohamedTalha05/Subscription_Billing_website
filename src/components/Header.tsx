/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';

const BRAND_GREEN = '#00e676';

export const Header = () => (
  <header className="sticky top-0 bg-[#0a0c0b]/80 backdrop-blur-md border-b border-gray-800/60 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
        <span style={{ backgroundColor: BRAND_GREEN }} className="p-1.5 rounded-lg text-black">B</span>
        BILLING<span className="text-gray-500">.eu</span>
      </Link>
      <nav className="hidden md:flex gap-8 text-sm text-gray-300">
        <Link to="/features" className="hover:text-white transition">Features</Link>
        <Link to="/pricing" className="hover:text-white transition">Pricing</Link>
        <Link to="/security" className="hover:text-white transition">Security & Compliance</Link>
        <Link to="/contact" className="hover:text-white transition">Contact</Link>
      </nav>
      <div className="flex items-center gap-4">
        <button className="text-sm text-white hover:text-gray-300 transition">Sign In</button>
        <button style={{ backgroundColor: BRAND_GREEN }} className="text-black text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition">Start Free Trial</button>
      </div>
    </div>
  </header>
);
