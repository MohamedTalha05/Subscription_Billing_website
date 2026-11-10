import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App.tsx';
import FeaturesPage from './FeaturesPage.tsx';
import PricingPage from './PricingPage.tsx';
import SecurityPage from './SecurityPage.tsx';
import ContactPage from './ContactPage.tsx';
import ImpressumPage from './ImpressumPage.tsx';
import TermsPage from './TermsPage.tsx';
import PrivacyPage from './PrivacyPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/security" element={<SecurityPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
    </Routes>
  </BrowserRouter>
);
