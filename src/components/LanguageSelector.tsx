import { LanguageMode } from "../types";

interface LanguageSelectorProps {
  currentLang: LanguageMode;
  onLangChange: (lang: LanguageMode) => void;
}

export default function LanguageSelector({ currentLang, onLangChange }: LanguageSelectorProps) {
  const options = [
    { code: "en", label: "English" },
    { code: "roman", label: "Roman Urdu" },
    { code: "ur", label: "اردو (Urdu)" }
  ];

  return (
    <div id="language-selector-container" className="flex items-center gap-1.5 bg-emerald-950/40 p-1 rounded-full border border-emerald-900/35">
      {options.map((opt) => (
        <button
          key={opt.code}
          id={`lang-btn-${opt.code}`}
          onClick={() => onLangChange(opt.code as LanguageMode)}
          className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
            currentLang === opt.code
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20"
              : "text-emerald-300/80 hover:text-white hover:bg-emerald-900/40"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
