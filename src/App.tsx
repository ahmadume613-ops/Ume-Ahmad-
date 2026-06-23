import { useState, useEffect } from "react";
import { 
  initialAcademyConfig, 
  initialCourses, 
  initialPricingPlans, 
  initialTestimonials 
} from "./data";
import { AcademyConfig, Course, PricingPlan, LanguageMode } from "./types";
import LanguageSelector from "./components/LanguageSelector";
import TrialBookingForm from "./components/TrialBookingForm";
import SyllabusSection from "./components/SyllabusSection";
import PricingSection from "./components/PricingSection";
import CustomizerSettings from "./components/CustomizerSettings";
import { motion } from "motion/react";
import { 
  Phone, Mail, Globe, MessageCircle, Star, Shield, 
  Sparkles, Award, ArrowRight, CheckCircle2, ChevronRight, 
  Settings2, Heart, UsersRound, BookOpen, Clock, Users 
} from "lucide-react";

import heroBg from "./assets/images/quran_academy_hero_1782168921596.jpg";
import logoImg from "./assets/images/quran_academy_logo_1782168948648.jpg";

export default function App() {
  // Multilingual State: en | ur | roman
  const [lang, setLang] = useState<LanguageMode>("en");

  // Load configuration with fallback to initial data
  const [config, setConfig] = useState<AcademyConfig>(initialAcademyConfig);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [plans, setPlans] = useState<PricingPlan[]>(initialPricingPlans);

  // Administrative dialog toggle state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [bookingTrigger, setBookingTrigger] = useState<number>(0);

  // Load customizer state from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("quran_academy_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        let migrated = false;
        
        // Cleanse and migrate any old template mock numbers/phones
        if (!parsed.whatsapp || parsed.whatsapp.includes("3001234567") || parsed.whatsapp === "+923001234567" || parsed.whatsapp === "923001234567") {
          parsed.whatsapp = "+923345750157";
          migrated = true;
        }
        if (!parsed.phone || parsed.phone.includes("300 1234567") || parsed.phone === "+92 300 1234567" || parsed.phone === "923001234567") {
          parsed.phone = "+92 334 5750157";
          migrated = true;
        }
        
        setConfig(parsed);
        
        if (migrated) {
          localStorage.setItem("quran_academy_config", JSON.stringify(parsed));
        }
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }

    const savedCourses = localStorage.getItem("quran_academy_courses");
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error("Failed to parse saved courses", e);
      }
    }

    const savedPlans = localStorage.getItem("quran_academy_plans");
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error("Failed to parse saved plans", e);
      }
    }
  }, []);

  const handleUpdateConfig = (newConfig: AcademyConfig) => {
    setConfig(newConfig);
  };

  const handleUpdateCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
  };

  const handleUpdatePlans = (newPlans: PricingPlan[]) => {
    setPlans(newPlans);
  };

  const handleBookingAdded = () => {
    setBookingTrigger(prev => prev + 1);
  };

  const scrollToForm = () => {
    const elem = document.getElementById("trial-booking-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pre-fill whatsapp message link helper
  const getWhatsappLink = () => {
    const num = config.whatsapp.replace(/\D/g, "");
    const textMsg = encodeURIComponent(
      `Assalamoalaikum, I am visiting Worldwide Quran Academy website and I want to book a free 3-Day trial class for myself/my children. Please guide me about schedules.`
    );
    return `https://wa.me/${num || "923345750157"}?text=${textMsg}`;
  };

  // Translations
  const t = {
    heroHeading: {
      en: "Learn Quran Online with Proper Tajweed Rules",
      ur: "گھر بیٹھے عالمی اساتذہ سے تجوید کے ساتھ قران پاک سیکھیں",
      roman: "Ghar Baithe Global Instructors Se Tajweed K Sath Quran Seekhein"
    },
    studentsBadge: {
      en: "500+ Overseas Students Passed out from UK, US, Canada",
      ur: "یو کے، یو ایس، کینیڈا کے 500 سے زائد مطمئن غیر ملکی طلباء",
      roman: "500+ Overseas Students (UK, USA, Canada)"
    },
    heroBtnLeft: {
      en: "Book 3-Day Trial",
      ur: "3 دن کا مفت ٹرائل حاصل کریں",
      roman: "3-Day Free Trial Book Karain"
    },
    heroBtnRight: {
      en: "Contact on WhatsApp",
      ur: "واٹس ایپ پر رابطہ کریں",
      roman: "WhatsApp Par Rabta Karain"
    },
    whTitle: {
      en: "Why Choose Worldwide Quran Academy?",
      ur: "ورلڈ وائیڈ قرآن اکیڈمی ہی کیوں؟",
      roman: "Worldwide Quran Academy Hi Kyun?"
    },
    whSubtitle: {
      en: "We offer the most flexible, reliable online educational system designed specifically for non-Arabic speakers and families living abroad.",
      ur: "ہم بیرونِ ملک مقیم مسلمان خاندانوں اور بچوں کے لیے آن لائن تعلیم کا سب سے آسان اور مستند طریقہ فراہم کرتے ہیں۔",
      roman: "Hum bahar ke mulko me rehne wale muslims bacho aur baro ke liye online deeni taleem ka subse asan zariya hain."
    },
    whCards: [
      {
        id: 1,
        titleEn: "1-on-1 Interactive Classes",
        titleUr: "انفرادی 1-on-1 کلاسز",
        titleRoman: "1-on-1 Individual Classes",
        descEn: "Every student gets undivided attention from a dedicated teacher. No group class rush.",
        descUr: "ہر طالب علم کو انفرادی توجہ ملتی ہے جس سے وہ اپنی رفتار سے صحت اور آسانی کے ساتھ سیکھ سکتے ہیں۔",
        descRoman: "Har student ko akela parhaya jata hai ta ke teacher ki poori attention mil sake."
      },
      {
        id: 2,
        titleEn: "Male & Female Tutors",
        titleUr: "مرد اور خواتین اساتذہ علیحدہ علیحدہ",
        titleRoman: "Male & Female Qualified Teachers",
        descEn: "We have separate highly-qualified male and female Islamic scholars expert in digital teaching.",
        descUr: "ہماری اکیڈمی میں تجربہ کار اور نیک سیرت مرد اور خواتین اساتذہ علیحدہ علیحدہ تدریس کے لیے دستیاب ہیں۔",
        descRoman: "Humare paas certified male aur female scholars separate classes ke liye har waqt available hain."
      },
      {
        id: 3,
        titleEn: "Flexible Timing Around Clock",
        titleUr: "24 گھنٹے لچکدار اوقات",
        titleRoman: "Flexible Timing Options",
        descEn: "Schedule lessons at your most convenient hour in any international time zone.",
        descUr: "اپنے مصروف شیڈول کے مطابق اپنی پسند کا وقت اور دن مقرر کرکے کلاسز کا آغاز کریں۔",
        descRoman: "Apne busy routine ke mutabiq jab chahein aap class ka time set karwa sakte hain."
      },
      {
        id: 4,
        titleEn: "Monthly Assessment & Reports",
        titleUr: "ماہانہ رپورٹ اور امتحان",
        titleRoman: "Monthly Performance Reports",
        descEn: "Track your or your children's memorization, tajweed improvement, and class attendance.",
        descUr: "ماہانہ بنیادوں پر طلباء کی کارکردگی اور حاضری کی تفصیلی رکارڈ اور رپورٹس والدین کو مہیا کی جاتی ہیں۔",
        descRoman: "Monthly basis par bache ki tajweed, attendance aur evaluation report share ki jati hai."
      }
    ],
    contactUnderForm: {
      en: "Click here to chat direct on WhatsApp",
      ur: "براہِ راست واٹس ایپ پر بات چیت کرنے کے لیے یہاں کلک کریں",
      roman: "Direct WhatsApp par baat krne ke liye click karain"
    },
    directPrompt: {
      en: "Have questions? We are 24/7 online for support. Call or write on WhatsApp:",
      ur: "کوئی سوال پوچھنا ہے؟ ہماری ٹیم چوبیس گھنٹے آپ کی رہنمائی کے لیے حاضر ہے۔",
      roman: "Koi sawal hai? Hamari team 24 hours guidance ke liye online hai."
    },
    aboutTitle: {
      en: "About Our Academy",
      ur: "ہماری اکیڈمی کا تعارف",
      roman: "Academy Ka Taaruf"
    },
    testiTitle: {
      en: "Reviews From Overseas Parents",
      ur: "بیرونِ ملک مقیم والدین کی آراء",
      roman: "Overseas Parents & Students Reviews"
    },
    testiSubtitle: {
      en: "See what families from USA, UK, and Australia say about our online Quran classes.",
      ur: "جانئے کہ امریکہ، برطانیہ اور آسٹریلیا کے مطمئن والدین ہماری تدریسی معیار کے بارے میں کیا کہتے ہیں۔",
      roman: "Check karain USA, UK aur Australia se parents hamare bad parhane pr kya reviews dete hain."
    }
  };

  const tagline = lang === "en" ? config.taglineEn : lang === "ur" ? config.taglineUr : config.taglineRoman;
  const isUr = lang === "ur";

  return (
    <div id="landing-page-root" className={`min-h-screen bg-[#0a0c10] flex flex-col font-sans text-[#e0e0e0] overflow-x-hidden`}>
      
      {/* 1. TOP NAV / HEADER */}
      <header id="main-header" className="sticky top-0 bg-[#0d1117] text-white z-40 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5">
            <img 
              src={logoImg} 
              alt="Worldwide Quran Academy Logo" 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full border border-emerald-500/40 shadow-md transform hover:rotate-12 transition-transform duration-300"
            />
            <div>
              <h1 className="text-sm md:text-base font-serif tracking-wide text-white flex items-center gap-1">
                <span className="uppercase text-emerald-400 font-semibold tracking-wide">{config.name}</span>
                <span className="hidden sm:inline text-[8px] tracking-widest bg-emerald-650 text-white font-bold px-1.5 py-0.5 rounded ml-1 animate-pulse">
                  LIVE
                </span>
              </h1>
              <div className="hidden sm:block text-[9px] text-white/50 tracking-wider">
                Tajweed • Translation • 1-on-1 Classes
              </div>
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-3">
            
            {/* Contact Details (Hidden on tiny screens) */}
            <a 
              href={getWhatsappLink()} 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded hover:translate-y-[-1px] text-xs font-semibold border border-white/10 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp: {config.phone}</span>
            </a>

            {/* Language Selector Selector Toggle */}
            <LanguageSelector currentLang={lang} onLangChange={(l) => setLang(l)} />

            {/* EDIT MODE CONTROL KEY */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="bg-white/5 hover:bg-white/10 text-white/80 p-2 rounded text-xs font-bold transition-all shadow-md flex items-center gap-1 border border-white/10"
              title="Click to change pricing, names, or view bookings!"
            >
              <Settings2 className="w-4 h-4" />
              <span className="hidden md:inline">Editor Mode</span>
            </button>

          </div>

        </div>
      </header>

      {/* 2. DYNAMIC HERO COMPONENT WITH BACK IMAGE SEAMLESS GRID */}
      <section id="hero-section" className="relative bg-[#0a0c10] text-white overflow-hidden py-16 md:py-24 shrink-0">
        
        {/* Absolute Background Graphics */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Islamic Banner" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-10 pointer-events-none scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0c10]/40 via-[#0a0c10]/85 to-[#0a0c10]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text Left */}
          <div className={`col-span-1 lg:col-span-7 space-y-6 ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
            
            <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-bold border border-emerald-500/20">
              <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
              <span>{t.studentsBadge[lang]}</span>
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight italic">
              Master the Holy Quran<br/>
              <span className="text-emerald-500 not-italic block mt-1 font-semibold">From Anywhere.</span>
            </h1>

            <p className="text-white/60 text-sm md:text-lg max-w-2xl font-normal leading-relaxed">
              {tagline}
            </p>

            {/* Feature small list */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-white/80">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>Basic Qaida & Rules</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-white/80">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>Female Teachers available</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-white/80">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>Monthly Evaluation reports</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs md:text-sm text-white/80">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                <span>1-on-1 Customized Zoom link</span>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <button
                type="button"
                onClick={scrollToForm}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-8 rounded hover:translate-y-[-1px] transition-all text-xs tracking-wide flex items-center justify-center gap-2 border border-white/10"
              >
                <span>{t.heroBtnLeft[lang]}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 hover:bg-white/5 text-white font-semibold py-3.5 px-8 rounded transition-all text-xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4.5 h-4.5 text-emerald-400" />
                <span>{t.heroBtnRight[lang]}</span>
              </a>
            </div>

          </div>

          {/* Hero Visual Right Display Circular Logo widget */}
          <div className="col-span-1 lg:col-span-5 flex justify-center z-10 relative">
            <div className="relative group max-w-sm">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-x-0 -inset-y-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/20 rounded-full filter blur-2xl opacity-40 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-[#0d1117] border border-white/10 p-6 rounded-full shadow-2xl flex flex-col items-center justify-center text-center">
                <img 
                  src={logoImg} 
                  alt="Quran Academy Circular badge" 
                  referrerPolicy="no-referrer"
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-emerald-500/30 shadow-xl mb-4 group-hover:scale-105 transition-transform duration-500"
                />
                
                <h3 className="text-white font-serif text-sm md:text-base font-semibold tracking-wide">
                  {config.name}
                </h3>
                <span className="text-emerald-400 text-[10px] tracking-widest font-bold mt-1">
                  ★ QUALITY ISLAMIC EDUCATION ★
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE VALUES / "WHY US" SECTION */}
      <section id="why-us-section" className="py-16 bg-[#0d1117] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h3 className="text-xs tracking-[0.3em] text-emerald-500 uppercase font-bold mb-3">Our Dedication</h3>
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-wide">
              {t.whTitle[lang]}
            </h2>
            <p className="mt-4 text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              {t.whSubtitle[lang]}
            </p>
            <div className="w-24 h-0.5 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whCards.map(card => {
              const cardTitle = lang === "en" ? card.titleEn : lang === "ur" ? card.titleUr : card.titleRoman;
              const cardDesc = lang === "en" ? card.descEn : lang === "ur" ? card.descUr : card.descRoman;

              return (
                <div 
                  key={card.id}
                  className="p-6 bg-[#0a0c10] border border-white/5 rounded-xl hover:border-emerald-500/30 hover:bg-[#11141a]/60 transition-all duration-300 text-center space-y-3.5 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 rounded-xl flex items-center justify-center mx-auto shadow-md mb-4">
                      {card.id === 1 && <Users className="w-5 h-5" />}
                      {card.id === 2 && <Shield className="w-5 h-5" />}
                      {card.id === 3 && <Clock className="w-5 h-5" />}
                      {card.id === 4 && <Award className="w-5 h-5" />}
                    </div>

                    <h3 className="text-sm font-serif font-medium text-white tracking-wide mb-2">
                      {cardTitle}
                    </h3>
                    <p className="text-[11px] text-white/50 leading-relaxed max-w-xs mx-auto">
                      {cardDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. SYLLABUS LISTS */}
      <SyllabusSection 
        courses={courses} 
        lang={lang} 
        onSelectCourse={(id) => {
          scrollToForm();
        }} 
      />

      {/* 5. PRICING PLANS & DYNAMIC STATS CALCULATOR */}
      <PricingSection 
        plans={plans} 
        lang={lang} 
        onSelectPlan={(days) => {
          scrollToForm();
        }} 
      />

      {/* 6. BOOKING FORM AREA WITH DIRECT WHATSAPP SIDEBAR */}
      <section id="trial-booking-section" className="py-20 bg-[#0d141e]/40 scroll-mt-20 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Booking Form Left */}
            <div className="col-span-1 lg:col-span-7">
              <TrialBookingForm 
                courses={courses} 
                lang={lang} 
                onBookingSuccess={handleBookingAdded} 
              />
            </div>

            {/* Direct Contact / Support Sidebar Right */}
            <div className="col-span-1 lg:col-span-5 space-y-6">
              
              <div className="p-6 bg-[#0a0c10] rounded-xl border border-white/5 space-y-4 shadow-xl">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-semibold px-2.5 py-1 rounded tracking-wider uppercase border border-emerald-500/20 inline-block">
                  DIRECT CONTACT
                </span>
                
                <h3 className="text-lg font-serif font-medium text-white tracking-wide">
                  {lang === "en" ? "Register Instantly on WhatsApp" : "براہِ راست واٹس ایپ پر رجسٹریشن"}
                </h3>

                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  {t.directPrompt[lang]}
                </p>

                {/* Direct Action Badge */}
                <div className="p-4 bg-[#0d1117] border border-white/5 rounded-lg space-y-3.5">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <Phone className="w-5 h-5 text-emerald-450" />
                    </div>
                    <div>
                      <div className="text-[10px] text-white/40 font-medium tracking-wide uppercase">Call / Voice Message</div>
                      <div className="text-sm font-bold font-mono text-white tracking-wider">{config.phone}</div>
                    </div>
                  </div>

                  <a
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-all text-xs flex items-center justify-center gap-2 shadow-md hover:shadow-emerald-950/20 text-center cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-white" />
                    <span>{t.heroBtnRight[lang]}</span>
                  </a>
                  <span className="text-[10px] text-center text-white/45 block font-sans">
                    {t.contactUnderForm[lang]}
                  </span>
                </div>
              </div>

              {/* Secure / Guidelines Note */}
              <div className="p-5 bg-[#0a0c10] rounded-xl space-y-3 border border-white/5">
                <h4 className="text-xs font-serif font-medium text-white flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>How does the trial work?</span>
                </h4>
                <ol className="list-decimal list-inside text-[11px] text-white/60 space-y-2 leading-relaxed pl-1 font-sans">
                  <li>You submit the online booking request or send us WhatsApp msg.</li>
                  <li>Our academic team connects with you within 4-6 hours to confirm time slot.</li>
                  <li>We provide Skype or Zoom link to join your first session.</li>
                  <li>Test our certified male or female tutor free for 3 days without paying anything.</li>
                  <li>Choose your tariff and make weekly/monthly payments only if you are fully satisfied!</li>
                </ol>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 7. PARENTS AND STUDENTS REVIEW GRID */}
      <section id="testimonials-section" className="py-20 bg-[#0a0c10] scroll-mt-20 border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-white tracking-wide">
              {t.testiTitle[lang]}
            </h2>
            <p className="mt-4 text-white/60 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              {t.testiSubtitle[lang]}
            </p>
            <div className="w-12 h-[2px] bg-emerald-500 mx-auto mt-5"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialTestimonials.map((review, idx) => {
              const reviewText = lang === "en" ? review.textEn : lang === "ur" ? review.textUr : review.textRoman;
              return (
                <div 
                  key={idx}
                  className="bg-[#0d1117] p-6 rounded-lg border border-white/5 hover:border-emerald-500/20 transition-all flex flex-col justify-between shadow-lg"
                >
                  <p className="text-white/80 italic text-xs leading-relaxed font-serif" style={{ direction: isUr ? "rtl" : "ltr" }}>
                    "{reviewText}"
                  </p>
                  
                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-medium text-white">{review.name}</h4>
                      <span className="text-[10px] text-emerald-400/80 font-sans">{review.location}</span>
                    </div>
                    <div className="bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-0.5 rounded text-[10px] flex items-center gap-1 border border-emerald-500/20">
                      <span>{review.rating || 5}</span>
                      <Star className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. MAIN FOOTER */}
      <footer id="main-footer" className="bg-[#050608] text-[#e0e0e0] pt-16 pb-8 border-t border-white/5 mt-auto relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src={logoImg} 
                alt="Academy Footer logo" 
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-full border border-emerald-500/30 shadow-sm"
              />
              <span className="font-serif font-medium text-sm tracking-wide text-white">{config.name}</span>
            </div>
            <p className="text-white/50 text-xs min-h-12 leading-relaxed font-sans">
              {config.aboutEn}
            </p>
          </div>

          {/* Col 2: Quick Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 tracking-wider">Syllabus Overview</h4>
            <ul className="text-xs text-white/60 space-y-2">
              {courses.map((c) => (
                <li key={c.id} className="flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-emerald-500" />
                  <span className="hover:text-white transition-colors">{lang === "en" ? c.titleEn : lang === "ur" ? c.titleUr : c.titleRoman}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-emerald-400 tracking-wider">Connect With Us</h4>
            <ul className="text-xs text-white/60 space-y-2 font-sans">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>{config.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>Call/WhatsApp: {config.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>Online Class Portal 24/7</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/45 text-xs text-center md:text-left font-sans">
            © {new Date().getFullYear()} {config.name}. All Rights Reserved. Online Islamic Academy 1-on-1.
          </p>
          <div className="flex gap-4 items-center">
            <a href={config.facebookUrl} target="_blank" rel="noreferrer" className="text-white/45 hover:text-white transition-colors text-xs font-sans">
              Facebook
            </a>
            <a href={config.youtubeUrl} target="_blank" rel="noreferrer" className="text-white/45 hover:text-white transition-colors text-xs font-sans">
              YouTube
            </a>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="text-emerald-450 hover:text-emerald-400 hover:bg-white/10 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer bg-white/5 px-2.5 py-1.5 rounded border border-white/5"
            >
              ⚙ Customizer Login
            </button>
          </div>
        </div>
      </footer>

      {/* 9. CONTROL PANEL / CUSTOMIZER MODAL */}
      <CustomizerSettings
        currentConfig={config}
        courses={courses}
        plans={plans}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onUpdateConfig={handleUpdateConfig}
        onUpdateCourses={handleUpdateCourses}
        onUpdatePlans={handleUpdatePlans}
        bookingTrigger={bookingTrigger}
      />

    </div>
  );
}
