/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import SubscriptionBillingPage from './pages/SubscriptionBillingPage';
import EInvoicingPage from './pages/EInvoicingPage';
import CompliancePage from './pages/CompliancePage';
import PricingPage from './pages/PricingPage';
import IntegrationsPage from './pages/IntegrationsPage';
import SolutionsSaasPage from './pages/SolutionsSaasPage';
import SolutionsBusinessesPage from './pages/SolutionsBusinessesPage';
import FaqPage from './pages/FaqPage';
import ResourcesPage from './pages/ResourcesPage';
import GuidePage from './pages/GuidePage';
import AboutPage from './pages/AboutPage';
import CookiesPage from './pages/CookiesPage';
import SecurityPage from './pages/SecurityPage';
import ContactPage from './pages/ContactPage';
import ImpressumPage from './pages/ImpressumPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import NotFoundPage from './pages/NotFoundPage';
import { REDIRECTS } from './seo/routes';

/**
 * Every path here needs a matching entry in src/seo/routes.ts, which gives it
 * a title, description and structured data and puts it in the prerender list
 * and sitemap.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="subscription-billing" element={<SubscriptionBillingPage />} />
        <Route path="e-invoicing" element={<EInvoicingPage />} />
        <Route path="compliance" element={<CompliancePage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="solutions/saas" element={<SolutionsSaasPage />} />
        <Route path="solutions/businesses" element={<SolutionsBusinessesPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="resources/:slug" element={<GuidePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="cookies" element={<CookiesPage />} />
        {/* German versions; the language comes from the /de/ prefix (see src/i18n.ts). */}
        <Route path="de/e-rechnung" element={<EInvoicingPage />} />
        <Route path="de/e-rechnungspflicht" element={<CompliancePage />} />
        <Route path="de/e-rechnung-fuer-kmu" element={<SolutionsBusinessesPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="impressum" element={<ImpressumPage />} />
        <Route path="terms" element={<TermsPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        {Object.entries(REDIRECTS).map(([from, to]) => (
          <Route key={from} path={from.replace(/^\/|\/$/g, '')} element={<Navigate to={to} replace />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
