import { LanguageMode, AcademyConfig, Course } from "../types";
import { Mail, Phone, Globe, ChevronRight } from "lucide-react";
import logoImg from "../assets/images/quran_academy_logo_1782168948648.jpg";

interface FooterProps {
  activePage: string;
  onPageChange: (page: string) => void;
  config: AcademyConfig;
  courses: Course[];
  lang: LanguageMode;
  onAdminOpen: () => void;
}

export default function Footer({
  activePage,
  onPageChange,
  config,
  courses,
  lang,
  onAdminOpen
}: FooterProps) {
  const handleNavClick = (pageId: string) => {
    window.location.hash = `#${pageId}`;
  };

  const menuItems = [
    { id: "home", label: { en: "Home Overview", ur: "ہوم پیج", roman: "Home Overview" } },
    { id: "courses", label: { en: "Our Courses", ur: "کورسز تفصیل", roman: "Our Courses" } },
    { id: "prices", label: { en: "Fee Structure", ur: "فیس پیکجز", roman: "Fee Structure" } },
    { id: "about", label: { en: "About Our Academy", ur: "ہمارے بارے میں", roman: "About Our Academy" } },
    { id: "blog", label: { en: "Informative Articles", ur: "بلاگ مضامین", roman: "Informative Articles" } },
    { id: "contact", label: { en: "Register / Contact", ur: "رابطہ و رجسٹریشن", roman: "Register & Contact" } }
  ];

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-350 pt-16 pb-8 border-t border-slate-800 mt-auto relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 cursor-pointer select-none" onClick={() => handleNavClick("home")}>
            <img 
              src={logoImg} 
              alt="Academy Footer Logo Badge" 
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full border border-emerald-500/35 shadow-sm pointer-events-none"
            />
            <span className="font-serif font-bold text-base tracking-wide text-white">{config.name}</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed min-h-[3rem]">
            {lang === "en" ? config.aboutEn : lang === "ur" ? config.aboutUr : config.aboutRoman}
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Quick Navigation</h4>
          <ul className="text-xs text-slate-400 space-y-2.5">
            {menuItems.map((item) => (
              <li key={item.id} className="flex items-center gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`hover:text-white transition-colors cursor-pointer font-semibold text-left ${
                    activePage === item.id ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  {item.label[lang]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contact Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Connect With Us</h4>
          <ul className="text-xs text-slate-400 space-y-3">
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500" />
              <span className="text-slate-350">{config.email}</span>
            </li>
            <li className="flex items-center gap-2.5 font-bold">
              <Phone className="w-4 h-4 text-emerald-500" />
              <span className="text-emerald-300">Call/WhatsApp: {config.phone}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>Online Live Class Portal Available 24/7</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
        <p className="text-xs text-center md:text-left">
          © {new Date().getFullYear()} {config.name}. All Rights Reserved. Online Islamic Academy 1-on-1 Classes.
        </p>
        <div className="flex gap-4 items-center flex-wrap justify-center">
          <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xs">
            Facebook
          </a>
          <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-xs">
            YouTube
          </a>
          <button 
            onClick={onAdminOpen}
            className="text-emerald-400 hover:text-emerald-300 hover:bg-white/5 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/50"
          >
            ⚙ Customizer Login
          </button>
        </div>
      </div>
    </footer>
  );
}
