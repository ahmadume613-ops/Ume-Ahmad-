import React, { useState } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Language {
  code: string;
  name: string;
  flag: string;
}

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" }
];

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (code: string) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLang = LANGUAGES.find((l) => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" id="language-selector-wrapper">
      <button
        id="language-selector-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border border-emerald-950/10 rounded-full bg-white hover:bg-[#faf9f5] hover:border-emerald-950/20 transition-all text-emerald-950"
      >
        <Globe className="w-4 h-4 text-emerald-700" />
        <span className="mr-1">{selectedLang.flag}</span>
        <span>{selectedLang.name}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              id="language-selector-overlay"
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              id="language-selector-dropdown"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-emerald-950/10 shadow-lg z-50 overflow-hidden"
            >
              <div className="py-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    id={`lang-opt-${lang.code}`}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-left hover:bg-emerald-50 text-emerald-950 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {currentLanguage === lang.code && (
                      <Check className="w-4 h-4 text-emerald-700" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
