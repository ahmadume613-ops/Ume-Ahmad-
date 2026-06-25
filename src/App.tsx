import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import CoursesPage from "./components/CoursesPage";
import PricesPage from "./components/PricesPage";
import BlogPage from "./components/BlogPage";
import AdminPage from "./components/AdminPage";
import TrialBookingForm from "./components/TrialBookingForm";
import { CurrencyCode } from "./types";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [language, setLanguage] = useState<string>("en");
  const [showTrialModal, setShowTrialModal] = useState<boolean>(false);
  const [classMode, setClassMode] = useState<"1on1" | "group">("1on1");

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Load customizer/saved states if any
  useEffect(() => {
    const savedPage = localStorage.getItem("last_active_page");
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    localStorage.setItem("last_active_page", page);
  };

  const handleSelectPlan = (planName: string) => {
    // Store selected plan name in storage
    localStorage.setItem("selected_trial_plan", planName);
    setShowTrialModal(true);
  };

  const renderActivePage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={handlePageChange} onBookTrial={() => setShowTrialModal(true)} language={language} />;
      case "courses":
        return <CoursesPage onBookTrial={() => setShowTrialModal(true)} />;
      case "prices":
        return <PricesPage currency={currency} onSelectPlan={handleSelectPlan} language={language} initialClassMode={classMode} onClassModeChange={setClassMode} onCurrencyChange={setCurrency} />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "blog":
        return <BlogPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage onPageChange={handlePageChange} onBookTrial={() => setShowTrialModal(true)} language={language} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#1c2e24] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950" id="applet-root">
      
      {/* Top Navigation bar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={handlePageChange}
        classMode={classMode}
        onClassModeChange={setClassMode}
        currency={currency}
        onCurrencyChange={setCurrency}
        language={language}
        onLanguageChange={setLanguage}
        onBookTrial={() => setShowTrialModal(true)}
      />

      {/* Main viewport with fluid transitions */}
      <main className="flex-grow" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer onPageChange={handlePageChange} language={language} />

      {/* Booking Overlay Modal */}
      <AnimatePresence>
        {showTrialModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="trial-modal-wrapper">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTrialModal(false)}
              className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm"
              id="trial-modal-backdrop"
            />

            {/* Modal Body container */}
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative w-full max-w-xl z-10"
                id="trial-modal-body"
              >
                {/* Close Button overlay */}
                <button
                  id="trial-modal-close-btn"
                  onClick={() => setShowTrialModal(false)}
                  className="absolute right-4 top-4 p-2 rounded-xl text-emerald-950/40 hover:text-emerald-950 hover:bg-emerald-50 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                <TrialBookingForm onSuccess={() => setShowTrialModal(false)} language={language} />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
