import React from "react";
import { Mail, Phone, MapPin, ShieldCheck, Star, BookOpen } from "lucide-react";

interface FooterProps {
  onPageChange: (page: string) => void;
  language: string;
}

export default function Footer({ onPageChange, language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const headings = {
    about: { en: "About Academy", ar: "عن الأكاديمية", ur: "اکیڈمی کے بارے میں", fr: "À propos", de: "Über uns" },
    quick: { en: "Quick Navigation", ar: "روابط سريعة", ur: "روابط", fr: "Navigation", de: "Navigation" },
    courses: { en: "Our Courses", ar: "دوراتنا", ur: "ہمارے کورسز", fr: "Nos Cours", de: "Unsere Kurse" },
    contact: { en: "Get In Touch", ar: "اتصل بنا", ur: "رابطہ کریں", fr: "Contact", de: "Kontakt" }
  };

  const getHeading = (key: keyof typeof headings) => {
    return headings[key][language as keyof typeof headings[typeof key]] || headings[key].en;
  };

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-16 pb-8" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" id="footer-grid">
          
          {/* About Column */}
          <div className="space-y-4" id="footer-about-col">
            <div className="flex items-center">
              <img
                src="/src/assets/images/67802_1782393985463.jpg"
                alt="Worldwide Quran Academy Logo"
                className="w-10 h-10 object-contain rounded-xl mr-3 shadow-md border border-emerald-700/10"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-lg font-bold text-white tracking-tight">Worldwide Quran Academy</h2>
            </div>
            <p className="text-sm text-emerald-200/80 leading-relaxed font-sans">
              Learn the Holy Quran from the comfort of your home with certified, skilled, and gentle Arab & Pakistani tutors. We offer standard 1-on-1 online Tajweed classes for all age groups.
            </p>
            <div className="flex items-center gap-1.5 pt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white">4.9 on Trustpilot</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div id="footer-quick-links-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800 pb-2 mb-4">
              {getHeading("quick")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { id: "home", label: "Home" },
                { id: "courses", label: "Courses" },
                { id: "prices", label: "Pricing & Plans" },
                { id: "about", label: "About Us" },
                { id: "contact", label: "Contact Us" },
                { id: "blog", label: "Islamic Blog" }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onPageChange(link.id)}
                    className="text-emerald-200/80 hover:text-white transition-colors hover:translate-x-1 duration-150 transform inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Column */}
          <div id="footer-courses-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800 pb-2 mb-4">
              {getHeading("courses")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "Noorani Qaida", id: "courses" },
                { label: "Tajweed Rules Mastery", id: "courses" },
                { label: "Quran Recitation with Tajweed", id: "courses" },
                { label: "Holy Quran Memorization (Hifz)", id: "courses" },
                { label: "Islamic Studies & Duas", id: "courses" }
              ].map((c, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onPageChange(c.id)}
                    className="text-emerald-200/80 hover:text-white transition-colors hover:translate-x-1 duration-150 transform inline-block"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4" id="footer-contact-col">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white border-b border-emerald-800 pb-2 mb-4">
              {getHeading("contact")}
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-200/80">ahmadume613@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-200/80">+92 334 5750157 (WhatsApp)</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-emerald-200/80">Rawalpindi / Islamabad, Pakistan</span>
              </li>
            </ul>

            <div className="pt-3 border-t border-emerald-900 flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span className="text-xs">Safe & Secure 1-on-1 Video Portal</span>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="mt-16 pt-8 border-t border-emerald-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-300/60" id="footer-bottom-meta">
          <p>© {currentYear} Worldwide Quran Academy. All Rights Reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => onPageChange("admin")} className="hover:text-white transition-colors font-semibold underline">
              Admin Area
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
