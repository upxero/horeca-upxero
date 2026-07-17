import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from './components/ui/sonner';
import { CookieBanner } from './components/CookieBanner';
import { ScrollToTop } from './components/ScrollToTop';
import ScrollToTopOnMount from './components/ScrollToTopOnMount';

import Maintenance from './pages/Maintenance';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import PortfolioRestaurants from './pages/PortfolioRestaurants';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsConditions from './pages/TermsConditions';
import CookiePolicy from './pages/CookiePolicy';
import ThankYou from './pages/ThankYou';

import { WhatsAppButton } from './components/WhatsAppButton';
import { WhatsAppPopup } from './components/WhatsAppPopup';
import { FloatingSupportHint } from "./components/FloatingSupportHint";

function App() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTopOnMount />

        <Routes>
          <Route path="/" element={<Maintenance />} />
          <Route path="/services" element={<Maintenance />} />
          <Route path="/pricing" element={<Maintenance />} />
          <Route path="/about" element={<Maintenance />} />
          <Route path="/contact" element={<Maintenance />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/restaurant-portfolio" element={<Maintenance />} />
          <Route path="/bedankt" element={<ThankYou />} />
        </Routes>

        <ScrollToTop />
        <ScrollToTop />

        {/*
        <FloatingSupportHint />

        <WhatsAppButton onClick={() => setWhatsappOpen(true)} />

        {whatsappOpen && (
          <WhatsAppPopup onClose={() => setWhatsappOpen(false)} />
        )}
        */}
      </BrowserRouter>

      <CookieBanner />
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
