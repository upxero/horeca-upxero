import "@/App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageProvider";
import LocalizedRoutes from "./i18n/LocalizedRoutes";
import { useState } from "react";
import { useSEO } from "./hooks/useSEO";
import { Toaster } from "./components/ui/sonner";
import { CookieBanner } from "./components/CookieBanner";
import { ScrollToTop } from "./components/ScrollToTop";
import ScrollToTopOnMount from "./components/ScrollToTopOnMount";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PortfolioRestaurants from "./pages/PortfolioRestaurants";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import ThankYou from "./pages/ThankYou";
import NotFound from './pages/NotFound';

import { WhatsAppButton } from "./components/WhatsAppButton";
import { WhatsAppPopup } from "./components/WhatsAppPopup";

export function AppContent() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  useSEO();

  return (
    <>
          <ScrollToTopOnMount />

          <LocalizedRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route
              path="/restaurant-portfolio"
              element={<PortfolioRestaurants />}
            />
            <Route path="/bedankt" element={<ThankYou />} />
            <Route path="*" element={<main id="main-content" tabIndex={-1}><NotFound /></main>} />
          </LocalizedRoutes>

          <ScrollToTop />
          <WhatsAppButton onClick={() => setWhatsappOpen(true)} />

          {whatsappOpen && (
            <WhatsAppPopup onClose={() => setWhatsappOpen(false)} />
          )}
          <CookieBanner />
          <Toaster position="top-right" />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
