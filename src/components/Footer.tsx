/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';

const BRAND_GREEN = '#00e676';

export const Footer = () => (
  <footer className="bg-[#0a0c0b] py-16 border-t border-gray-800/60 text-gray-500 text-sm">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-5 gap-12">
      <div className="col-span-1">
        <div className="text-lg font-bold text-white flex items-center gap-2 mb-4">
          <span style={{ backgroundColor: BRAND_GREEN }} className="p-1 rounded text-black">B</span>
          BILLING<span className="text-gray-500">.eu</span>
        </div>
      </div>
      <div>
        <h5 className="font-bold text-white mb-4">Product</h5>
        <ul className="space-y-2">
          <li><Link to="/features" className="hover:text-white transition">Features</Link></li>
          <li><Link to="/pricing" className="hover:text-white transition">Pricing</Link></li>
          <li><Link to="/security" className="hover:text-white transition">Security & Compliance</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold text-white mb-4">Company</h5>
        <ul className="space-y-2">
          <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
          <li><Link to="#" className="hover:text-white transition">Book a Demo</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold text-white mb-4">Account</h5>
        <ul className="space-y-2">
          <li><Link to="#" className="hover:text-white transition">Sign In</Link></li>
          <li><Link to="#" className="hover:text-white transition">Start Free Trial</Link></li>
        </ul>
      </div>
      <div>
        <h5 className="font-bold text-white mb-4">Legal</h5>
        <ul className="space-y-2">
          <li><Link to="/impressum" className="hover:text-white transition">Impressum</Link></li>
          <li><Link to="/terms" className="hover:text-white transition">Terms & Conditions</Link></li>
          <li><Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-gray-800/60 text-center">
      &copy; 2026 Billing.eu. Made for recurring revenue, built for Europe.
    </div>
  </footer>
);
