import { useState } from "react";
import { LanguageMode, AcademyConfig } from "../types";
import LanguageSelector from "./LanguageSelector";
import { Phone, Settings2, Sparkles } from "lucide-react";
import logoImg from "../assets/images/quran_academy_logo_1782168948648.jpg";

interface NavbarProps {
  lang: LanguageMode;
  onLangChange: (lang: LanguageMode) => void;
  activePage: string;
  onPageChange: (page: string) => void;
  config: AcademyConfig;
  onAdminOpen: () => void;
}

export default function Navbar({
  lang,
  onLangChange,
  activePage,
  onPageChange,
  config,
  onAdminOpen
}: NavbarProps) {

  // Pre-fill whatsapp message link helper using the requested direct URL
  const getWhatsappLink = () => {
    const num = config.whatsapp.replace(/\D/g, "");
    const textMsg = encodeURIComponent(
      `Assalamoalaikum, I am visiting Worldwide Quran Academy website and I want to book a free 3-Day trial class for myself/my children. Please guide me about schedules.`
    );
    return `https://wa.me/${num || "923345750157"}?text=${textMsg}`;
  };

  const menuItems = [
    { id: "home", label: { en: "Home", ur: "ہوم", roman: "Home" } },
    { id: "courses", label: { en: "Our Courses", ur: "کورسز", roman: "Our Courses" } },
    { id: "prices", label: { en: "Fee Structure", ur: "فیس پلان", roman: "Fee Structure" } },
    { id: "blog", label: { en: "Blog", ur: "مضامین", roman: "Blog" } },
    { id: "about", label: { en: "About Our Academy", ur: "ہمارے بارے میں", roman: "About Our Academy" } },
    { id: "contact", label: { en: "Contact", ur: "رابطہ کیجئے", roman: "Contact" } }
  ];

  const handleNavClick = (pageId: string) => {
    window.location.hash = `#${pageId}`;
    
    // Explicit scroll support for immediate clicking
    const targetSectionMap: Record<string, string> = {
      home: "home-section",
      courses: "courses-section",
      prices: "prices-section",
      about: "about-section",
      contact: "contact-section"
    };
    
    const sectionId = targetSectionMap[pageId];
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (pageId === "home") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isUr = lang === "ur";

  return (
    <header id="main-header" className="sticky top-0 bg-white/95 text-slate-800 z-40 border-b border-slate-150 shadow-sm backdrop-blur-md">
      {/* Top Row: Logo branding + Header actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 cursor-pointer select-none shrink-0" onClick={() => handleNavClick("home")}>
          <img 
            src={logoImg} 
            alt="Worldwide Quran Academy Logo Badge" 
            referrerPolicy="no-referrer"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-emerald-600/35 shadow-md transform hover:rotate-12 transition-transform duration-300 pointer-events-none"
          />
          <div>
            <h1 className="text-xs sm:text-sm md:text-base font-serif font-bold tracking-wide text-slate-900 flex items-center gap-1.5">
              <span className="text-emerald-800 tracking-tight">{config.name}</span>
              <span className="hidden sm:inline text-[9px] tracking-widest bg-emerald-650 text-white font-extrabold px-1.5 py-0.5 rounded-sm ml-1 animate-pulse">
                ONLINE
              </span>
            </h1>
            <div className="hidden sm:block text-[9px] text-slate-500 font-medium tracking-wide">
              Certified Teachers • Tajweed Rules • 1-on-1 Skype & Zoom
            </div>
          </div>
        </div>

        {/* Header Actions Row */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Prominent direct WhatsApp Header Connection */}
          <a 
            href={getWhatsappLink()} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-805 text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-xl hover:translate-y-[-1px] text-[10px] sm:text-xs font-bold border border-emerald-600/20 shadow-3xs transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
            <span className="hidden xs:inline">WhatsApp:</span>
            <span className="font-mono text-[9px] sm:text-xs">{config.phone.replace("+92", "0")}</span>
          </a>

          {/* Premium Language Switcher */}
          <LanguageSelector currentLang={lang} onLangChange={onLangChange} />

          {/* EDITOR CONTROLLER */}
          <button
            onClick={onAdminOpen}
            className="bg-slate-100 hover:bg-slate-250 text-slate-700 p-2 sm:p-2.5 rounded-xl text-xs font-bold transition-all shadow-3xs flex items-center gap-1.5 border border-slate-200/60 cursor-pointer"
            title="Click to update prices, taglines, or view student trial applications."
          >
            <Settings2 className="w-4 h-4 text-emerald-800" />
            <span className="hidden lg:inline">Editor</span>
          </button>
        </div>

      </div>

      {/* Persistent Visible Navigation Strip (No 3-dots/hamburger menu) */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-start md:justify-center overflow-x-auto py-2 gap-1 scrollbar-none no-scrollbar" style={{ WebkitOverflowScrolling: "touch" }}>
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-extrabold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? "bg-emerald-750 text-white shadow-3xs"
                      : "text-slate-650 hover:bg-slate-200/70 hover:text-slate-900"
                  }`}
                >
                  {item.label[lang]}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
