import React from "react";
import { BookOpen, Landmark, Heart, Phone, MapPin, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import LanguageSelector from "./LanguageSelector";
import { CurrencyCode } from "../types";

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  classMode: "1on1" | "group";
  onClassModeChange: (mode: "1on1" | "group") => void;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onBookTrial: () => void;
}

export default function Navbar({
  currentPage,
  onPageChange,
  classMode,
  onClassModeChange,
  currency,
  onCurrencyChange,
  language,
  onLanguageChange,
  onBookTrial,
}: NavbarProps) {

  const navItems = [
    { id: "home", label: { en: "Home", ar: "الرئيسية", ur: "صفحہ اول" } },
    { id: "1on1", label: { en: "1-on-1 Classes", ar: "حصص 1-على-1", ur: "1-on-1 کلاسز" } },
    { id: "group", label: { en: "Group Classes", ar: "حصص جماعية", ur: "گروپ کلاسز" } },
    { id: "courses", label: { en: "Courses", ar: "الدورات", ur: "کورسز" } },
    { id: "prices", label: { en: "Fee Structure", ar: "الرسوم", ur: "فیس اسٹرکچر" } },
    { id: "blog", label: { en: "Blogs", ar: "المدونات", ur: "بلاگز" } },
    { id: "contact", label: { en: "Contact", ar: "اتصل بنا", ur: "رابطہ" } },
  ];

  const getLabel = (item: typeof navItems[0]) => {
    return item.label[language as keyof typeof item.label] || item.label.en;
  };

  const currencies: { code: CurrencyCode; label: string }[] = [
    { code: "USD", label: "$ USD" },
    { code: "GBP", label: "£ GBP" },
    { code: "EUR", label: "€ EUR" },
    { code: "CAD", label: "C$ CAD" },
    { code: "AUD", label: "A$ AUD" },
    { code: "AED", label: "د.إ AED" },
    { code: "SAR", label: "ر.س SAR" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#fcfbf7]/90 backdrop-blur-md border-b border-emerald-950/5 shadow-sm" id="main-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => onPageChange("home")} id="nav-logo-group">
            <img
              src="/src/assets/images/67802_1782393985463.jpg"
              alt="Worldwide Quran Academy Logo"
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-xl shadow-sm border border-emerald-700/10 mr-2 sm:mr-3"
              referrerPolicy="no-referrer"
            />
            <div>
              <h1 className="text-sm sm:text-base md:text-lg font-black text-emerald-950 tracking-tight leading-none font-sans flex items-center gap-1.5">
                Worldwide Quran Academy
              </h1>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-emerald-750 uppercase font-bold">Online Tajweed & Hifz</span>
            </div>
          </div>

          {/* Desktop Navigation Link row */}
          <div className="hidden lg:flex items-center gap-5" id="nav-desktop-links">
            {navItems.map((item) => {
              const isActive =
                item.id === "1on1"
                  ? currentPage === "prices" && classMode === "1on1"
                  : item.id === "group"
                  ? currentPage === "prices" && classMode === "group"
                  : currentPage === item.id;

              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    if (item.id === "1on1") {
                      onClassModeChange("1on1");
                      onPageChange("prices");
                    } else if (item.id === "group") {
                      onClassModeChange("group");
                      onPageChange("prices");
                    } else {
                      onPageChange(item.id);
                    }
                  }}
                  className={`text-xs xl:text-sm font-bold transition-all relative py-2 px-1 cursor-pointer ${
                    isActive
                      ? "text-emerald-800"
                      : "text-emerald-950/70 hover:text-emerald-900"
                  }`}
                >
                  {getLabel(item)}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls: Select dropdowns & Trial booking Button */}
          <div className="flex items-center gap-2 sm:gap-3" id="nav-controls-wrapper">
            
            {/* Currency Selector (Dropdown for all viewports - clean & comprehensive) */}
            <div className="relative inline-block" id="currency-dropdown-container">
              <select
                id="currency-nav-select"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="bg-white border border-emerald-950/10 rounded-full px-2 sm:px-3 py-1.5 text-[11px] font-bold text-emerald-950 focus:outline-none focus:ring-1 focus:ring-emerald-700 cursor-pointer shadow-sm font-sans"
              >
                {currencies.map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Selector */}
            <LanguageSelector currentLanguage={language} onLanguageChange={onLanguageChange} />

            {/* Trial Class Button */}
            <button
              id="cta-book-trial-nav"
              onClick={onBookTrial}
              className="px-3.5 sm:px-4.5 py-2 rounded-full text-[10px] sm:text-xs font-black bg-emerald-900 text-[#fcfbf7] hover:bg-emerald-950 transition-all shadow hover:shadow-emerald-900/10 active:scale-95 cursor-pointer"
            >
              {language === "ar" ? "احجز تجربة مجانية" : language === "ur" ? "مفت کلاس بک کریں" : "Book Free Trial"}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Horizontal Scrollable Navigation Row - Direct Visibility, No hamburger drawer */}
      <div 
        className="lg:hidden border-t border-emerald-950/5 bg-[#fcfbf7]/95 backdrop-blur-md overflow-x-auto scrollbar-none flex items-center gap-1.5 px-4 py-2.5 whitespace-nowrap" 
        id="mobile-scrollable-links-container"
      >
        {navItems.map((item) => {
          const isActive =
            item.id === "1on1"
              ? currentPage === "prices" && classMode === "1on1"
              : item.id === "group"
              ? currentPage === "prices" && classMode === "group"
              : currentPage === item.id;

          return (
            <button
              key={item.id}
              id={`nav-chip-mob-${item.id}`}
              onClick={() => {
                if (item.id === "1on1") {
                  onClassModeChange("1on1");
                  onPageChange("prices");
                } else if (item.id === "group") {
                  onClassModeChange("group");
                  onPageChange("prices");
                } else {
                  onPageChange(item.id);
                }
              }}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all flex-shrink-0 cursor-pointer ${
                isActive
                  ? "bg-emerald-900 text-white shadow"
                  : "bg-emerald-950/5 text-emerald-950/70 hover:bg-emerald-950/10 hover:text-emerald-950"
              }`}
            >
              {getLabel(item)}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
