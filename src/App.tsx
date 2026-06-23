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
import { motion, AnimatePresence } from "motion/react";
import { 
  Phone, Mail, Globe, MessageCircle, Star, Shield, 
  Sparkles, Award, ArrowRight, CheckCircle2, ChevronRight, 
  Settings2, Heart, Users, BookOpen, Clock, ChevronDown, Plus, Minus
} from "lucide-react";

import childLearningImg from "./assets/images/quran_learning_hero_1782214664239.jpg";
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

  // Interactive FAQ active index
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  // Pre-fill whatsapp message link helper using the requested direct URL
  const getWhatsappLink = () => {
    const num = config.whatsapp.replace(/\D/g, "");
    const textMsg = encodeURIComponent(
      `Assalamoalaikum, I am visiting Worldwide Quran Academy website and I want to book a free 3-Day trial class for myself/my children. Please guide me about schedules.`
    );
    // Ensure always correct redirection
    return `https://wa.me/${num || "923345750157"}?text=${textMsg}`;
  };

  // FAQs Database
  const faqs = [
    {
      q: {
        en: "Is the 3-day free trial really free? Do I need a credit card?",
        ur: "کیا 3 دن کی ٹرائل کلاس واقعی مفت ہے؟ کیا کارڈ کی ضرورت ہے؟",
        roman: "Kya 3 days trial sach me free hai? Credit card chahiye?"
      },
      a: {
        en: "Yes! The 3-day trial is 100% free. No credit card, deposit, or payment details are requested. You can experience class quality and only continue if you are fully satisfied.",
        ur: "جی ہاں! 3 دن کا ٹرائل سو فیصد مفت ہے۔ اس کے لیے کسی کارڈ، بینک اکاؤنٹ یا فیس کی ضرورت نہیں ہے۔ کلاس پسند آنے کی صورت میں ہی فیس ادا کریں۔",
        roman: "Haan ji! 3 Days trial bilkul free hai. Kisi credit card ya billing detail ki zaroorat nahi hai. Agar aap satisfies ho tou tab regular plan choose karain."
      }
    },
    {
      q: {
        en: "Are there female teachers available for girls and kids?",
        ur: "کیا بچیوں اور چھوٹے بچوں کے لیے خواتین اساتذہ موجود ہیں؟",
        roman: "Kya female teachers available hain bacho aur girls k liye?"
      },
      a: {
        en: "Absolutely. We have highly certified, gentle, and expert female Islamic scholars available 24/7. They are experienced in teaching children and female students in a comfortable environment.",
        ur: "جی بالکل! ہماری اکیڈمی میں بچیوں اور بچوں کی تعلیم و تربیت کے لیے انتہا درجہ شفیق، باحجاب اور تجربہ کار عالمہ و قاریہ اساتذہ علیحدہ سے دستیاب ہیں۔",
        roman: "Ji bilkul! Hamare paas female scholars certified special classes k liye parha rhi hain jo bacho aur khawateen ko nihayat sabar se parhati hain."
      }
    },
    {
      q: {
        en: "How are the classes conducted? What software is required?",
        ur: "کلاسز کیسے لی جاتی ہیں؟ اس کے لیے کون سے سافٹ ویئر کی ضرورت ہے؟",
        roman: "Classes kaise hoti hain? Kuch software download krna parega?"
      },
      a: {
        en: "The classes are conducted 1-on-1 in a live interactive room using Zoom or Skype. All you need is a stable internet connection and a tablet, laptop, or smartphone.",
        ur: "تمام کلاسز براہِ راست 1-on-1 لائیو ہوتی ہیں جن میں استاد اور طالب علم زوم (Zoom) یا اسکائپ (Skype) پر منسلک ہوتے ہیں۔ آپ کے پاس موبائل یا لیپ ٹاپ ہونا ضروری ہے۔",
        roman: "Klasser live 1-on-1 Zoom ya Skype ke zariye hoti hain. Aap tablet, phone ya laptop se join kr skte hain. Hamara coordinator settings krwa dega."
      }
    },
    {
      q: {
        en: "Can I choose my own timing and shift class days?",
        ur: "کیا میں کلاس کے دن اور اوقات اپنی مرضی کے مطابق طے کر سکتا ہوں؟",
        roman: "Kya timing apni marzi ki select kr skte hain?"
      },
      a: {
        en: "Yes! Worldwide Quran Academy operates 24/7. We support all international time zones (US, Canada, UK, Australia, etc.). You can freely select your preferred time slot and days of weekly lessons.",
        ur: "جی بالکل! ہمارے پاس کلاسز چوبیس گھنٹے دستیاب ہیں۔ آپ اپنے اسکول، کالج یا ملازمت کے اوقات کے مطابق کسی بھی وقت کا انتخاب کر سکتے ہیں۔",
        roman: "Ji haan! Hamari academy 24 hours open rhti hai. Aap US, UK, Australia k time zones k mutabiq comfortable timing customize karwa sakte hain."
      }
    },
    {
      q: {
        en: "What courses do you teach? Can absolute beginners join?",
        ur: "آپ کون سے کورسز پڑھاتے ہیں؟ کیا بالکل شروع سے سیکھنے والے شامل ہو سکتے ہیں؟",
        roman: "Aap kon se courses parhate hain? Beginners seekh skte hain?"
      },
      a: {
        en: "We teach from the absolute basic Noorani Qaida for beginners, up to advanced Quran Tajweed Recitation, Hifz (Memorization), Translation, Tafseer, and Daily Masnoon Duas. No prior Arabic knowledge is required.",
        ur: "جی ہاں! ہمارے پاس بالکل شروع سے سیکھنے والوں کیلئے 'نورانی قاعدہ'، ناظرہ قرآن مع تجوید، حفظ قرآن، ترجمہ و تفسیر اور بچوں کے لیے بنیادی اسلامی تعلیمات و دعائیں سکھائی جاتی ہیں۔",
        roman: "Hum basic Noorani Qaida se shuru krte hain ta ke beginners bache aur bare bhi easily seekh sakain. Is k sath Tajweed, Hifz, Tafseer aur Masnoon Duas bhi sikhayi jati hain."
      }
    }
  ];

  // Translations
  const t = {
    heroBannerSubtitle: {
      en: "Learn Quran Online with Proper Tajweed Rules",
      ur: "گھر بیٹھے عالمی اساتذہ سے تجوید کے ساتھ قران پاک سیکھیں",
      roman: "Ghar Baithe Global Instructors Se Tajweed K Sath Quran Seekhein"
    },
    studentsBadge: {
      en: "500+ Overseas Students Passed out from UK, US, Canada",
      ur: "یو کے، یو ایس، کینیڈا کے 500 سے زائد مطمئن غیر ملکی طلباء",
      roman: "500+ Qualified Overseas Students (UK, USA, Canada)"
    },
    heroBtnLeft: {
      en: "Book 3-Day Free Trial",
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
      en: "Our professional academic online portal is specifically structured for non-Arabic speakers, kids, and Muslim families living abroad.",
      ur: "ہم بیرونِ ملک مقیم مسلمان خاندانوں اور بچوں کے لیے آن لائن تعلیم کا سب سے آسان اور مستند طریقہ فراہم کرتے ہیں۔",
      roman: "Hum bahar ke mulko me rehne wale muslim bacho aur baro ke liye online deeni taleem ka subse asan zariya hain."
    },
    whCards: [
      {
        id: 1,
        titleEn: "1-on-1 Interactive Rooms",
        titleUr: "انفرادی 1-on-1 کلاسز",
        titleRoman: "1-on-1 Individual Classes",
        descEn: "Every student gets undivided, concentrated attention from a dedicated scholar. Learn at your own pace without any haste.",
        descUr: "ہر طالب علم کو انفرادی توجہ ملتی ہے جس سے وہ اپنی رفتار سے صحت اور آسانی کے ساتھ سیکھ سکتے ہیں۔",
        descRoman: "Har student ko akela parhaya jata hai ta ke teacher ki poori attention mil sake."
      },
      {
        id: 2,
        titleEn: "Male & Female Qualified Tutors",
        titleUr: "مرد اور خواتین اساتذہ علیحدہ علیحدہ",
        titleRoman: "Male & Female Certified Scholars",
        descEn: "We feature highly-qualified, background-verified male and female Islamic scholars expert in modern digital teaching pedagogy.",
        descUr: "ہماری اکیڈمی میں تجربہ کار اور نیک سیرت مرد اور خواتین اساتذہ علیحدہ علیحدہ تدریس کے لیے دستیاب ہیں۔",
        descRoman: "Humare paas certified male aur female scholars separate classes ke liye har waqt available hain."
      },
      {
        id: 3,
        titleEn: "Flexible Timing 24/7 Shift",
        titleUr: "24 گھنٹے لچکدار اوقات",
        titleRoman: "Flexible Timing Options",
        descEn: "Schedule lessons at your most convenient hour, matching any international timezone seamlessly without disrupting school.",
        descUr: "اپنے مصروف شیڈول کے مطابق اپنی پسند کا وقت اور دن مقرر کرکے کلاسز کا آغاز کریں۔",
        descRoman: "Apne busy routine ke mutabiq jab chahein aap class ka time set karwa sakte hain."
      },
      {
        id: 4,
        titleEn: "Monthly Assessment Reports",
        titleUr: "ماہانہ رپورٹ اور امتحان",
        titleRoman: "Monthly Progress Reports",
        descEn: "Monitor your children's pronunciation refinement, active Surah memorization, and real-time attendance reports easily.",
        descUr: "ماہانہ بنیادوں پر طلباء کی کارکردگی اور حاضری کی تفصیلی رکارڈ اور رپورٹس والدین کو مہیا کی جاتی ہیں۔",
        descRoman: "Monthly basis par bache ki tajweed, attendance aur evaluation report share ki tabi hai."
      }
    ],
    contactUnderForm: {
      en: "Click here to chat directly on WhatsApp",
      ur: "براہِ راست واٹس ایپ پر بات چیت کرنے کے لیے یہاں کلک کریں",
      roman: "Direct WhatsApp par baat krne ke liye click karain"
    },
    directPrompt: {
      en: "Have questions? We are 24/7 online for support. Call or write on WhatsApp:",
      ur: "کوئی سوال پوچھنا ہے؟ ہماری ٹیم چوبیس گھنٹے آپ کی رہنمائی کے لیے حاضر ہے۔",
      roman: "Koi sawal hai? Hamari team 24 hours guidance ke liye online hai."
    },
    aboutTitle: {
      en: "About Worldwide Quran Academy",
      ur: "ورلڈ وائیڈ قرآن اکیڈمی کا تعارف",
      roman: "Worldwide Quran Academy Ka Taaruf"
    },
    testiTitle: {
      en: "Trusted by Parents Worldwide",
      ur: "دنیا بھر کے مطمئن والدین کا اعتماد",
      roman: "Overseas Parents & Students Reviews"
    },
    testiSubtitle: {
      en: "See what Muslim families from UK, USA, Europe, and Australia say about our online classes.",
      ur: "جانئے کہ امریکہ، برطانیہ اور آسٹریلیا کے مطمئن والدین ہماری تدریسی معیار کے بارے میں کیا کہتے ہیں۔",
      roman: "Check karain USA, UK aur Australia se parents hamare bad parhane pr kya reviews dete hain."
    },
    faqSecTitle: {
      en: "Frequently Asked Questions",
      ur: "عام طور پر پوچھے جانے والے سوالات",
      roman: "Aam Tor Par Pooche Jane Wale Sawal"
    },
    faqSecSubtitle: {
      en: "Find quick answers to common queries about our 1-on-1 online classes, scheduling, and tutors.",
      ur: "کلاسز، فیس، اور اساتذہ کے بارے میں اکثر پوچھے جانے والے سوالات کے فوری جوابات یہاں حاصل کہیئے۔",
      roman: "Hamare online programs ke mutabiq typical questions ke answers hasil karain."
    }
  };

  const tagline = lang === "en" ? config.taglineEn : lang === "ur" ? config.taglineUr : config.taglineRoman;
  const isUr = lang === "ur";

  return (
    <div id="landing-page-root" className="min-h-screen bg-white flex flex-col font-sans text-slate-800 overflow-x-hidden">
      
      {/* 1. PREMIUM HEADER */}
      <header id="main-header" className="sticky top-0 bg-white/95 text-slate-800 z-40 border-b border-slate-100 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Worldwide Quran Academy Logo Badge" 
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full border border-emerald-600/30 shadow-md transform hover:rotate-12 transition-transform duration-300 pointer-events-none"
            />
            <div>
              <h1 className="text-base md:text-lg font-serif font-bold tracking-wide text-slate-900 flex items-center gap-1.5">
                <span className="text-emerald-800 tracking-tight">{config.name}</span>
                <span className="hidden md:inline text-[9px] tracking-widest bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-sm ml-1 animate-pulse">
                  ONLINE
                </span>
              </h1>
              <div className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide">
                Certified Teachers • Tajweed Rules • 1-on-1 Skype & Zoom
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            
            {/* Visibly prominent direct WhatsApp Header Connection */}
            <a 
              href={getWhatsappLink()} 
              target="_blank" 
              rel="noreferrer"
              className="hidden lg:flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-4.5 py-2 rounded-xl hover:translate-y-[-1px] text-xs font-bold border border-emerald-600/20 shadow-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>WhatsApp: {config.phone}</span>
            </a>

            {/* Premium Language Switcher */}
            <LanguageSelector currentLang={lang} onLangChange={(l) => setLang(l)} />

            {/* EDITOR CONTROLLER */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border border-slate-200/50 cursor-pointer"
              title="Click to update prices, taglines, or view student trial applications."
            >
              <Settings2 className="w-4 h-4 text-emerald-800" />
              <span className="hidden md:inline">Editor Mode</span>
            </button>

          </div>

        </div>
      </header>

      {/* 2. PREMIUM HERO SECTION WITH RICH CUSTOM VECTOR ILLUSTRATION */}
      <section id="hero-section" className="relative bg-gradient-to-br from-white via-emerald-50/15 to-amber-50/10 text-slate-800 overflow-hidden py-16 lg:py-24 border-b border-slate-100">
        
        {/* Subtle Background Geometrics */}
        <div className="absolute top-1/2 left-5 w-72 h-72 bg-gradient-to-br from-amber-400/[0.02] to-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Detail */}
          <div className={`col-span-1 lg:col-span-7 space-y-6 ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
            
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold border border-emerald-200/60 shadow-3xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{t.studentsBadge[lang]}</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-5.5xl xl:text-6xl font-serif font-extrabold text-slate-900 leading-tight">
              {lang === "en" ? (
                <>
                  Learn Holy Quran Online <br />
                  <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 via-emerald-850 to-emerald-900 bg-clip-text text-transparent not-italic font-bold">
                    With True Tajweed Rules
                  </span>
                </>
              ) : t.heroBannerSubtitle[lang]}
            </h1>

            <p className="text-slate-650 text-base md:text-lg max-w-2xl font-normal leading-relaxed">
              {tagline}
            </p>

            {/* Clean Checkmark Features list for Trust & Professionalism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-705 font-medium">
                <div className="p-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full shrink-0">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                </div>
                <span>One-to-One Interactive Live Classes</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-705 font-medium">
                <div className="p-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full shrink-0">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                </div>
                <span>Patient Male & Female Tutors available</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-705 font-medium">
                <div className="p-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full shrink-0">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                </div>
                <span>Super Flexible Timings for Busy Schedule</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-705 font-medium">
                <div className="p-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full shrink-0">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-600 text-white" />
                </div>
                <span>US, UK, Canada & Global Timezones fully met</span>
              </div>
            </div>

            {/* Hero Interactive CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-5">
              <button
                type="button"
                onClick={scrollToForm}
                className="bg-emerald-700 hover:bg-emerald-805 text-white font-extrabold py-4 px-8 rounded-xl hover:translate-y-[-1px] transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 border border-emerald-600/30 shadow-md shadow-emerald-700/10 cursor-pointer"
              >
                <span>{t.heroBtnLeft[lang]}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="border border-emerald-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 text-emerald-800 font-bold py-4 px-8 rounded-xl transition-all text-xs flex items-center justify-center gap-2.5 shadow-3xs"
              >
                <MessageCircle className="w-4.5 h-4.5 text-emerald-650" />
                <span>{t.heroBtnRight[lang]}</span>
              </a>
            </div>

          </div>

          {/* Right Visual Display: Premium generated illustration representing child learning Quran with tablet/laptop and Quran book */}
          <div className="col-span-1 lg:col-span-5 flex justify-center z-10 relative">
            <div className="relative group max-w-md lg:max-w-none w-full">
              {/* Outer Golden Aura Ring blur effects */}
              <div className="absolute inset-x-0 -inset-y-4 bg-gradient-to-r from-emerald-400/20 via-amber-300/15 to-teal-400/20 rounded-3xl filter blur-3xl opacity-60 pointer-events-none group-hover:scale-105 transition-transform duration-1000"></div>
              
              <div className="relative bg-white border border-slate-200 p-3.5 rounded-3xl shadow-xl transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl">
                <img 
                  src={childLearningImg} 
                  alt="A beautiful modern vector illustration of a child learning Quran online on tablet with a laptop and Holy Quran book beside them in elegant gold and emerald colors" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto aspect-video object-cover rounded-2xl shadow-sm border border-slate-100"
                />
                
                {/* Visual Accent Title Overlay */}
                <div className="mt-4 p-3 bg-neutral-50 rounded-xl border border-slate-1.5 flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-900 font-serif text-sm font-extrabold tracking-wide">
                      {config.name}
                    </h3>
                    <span className="text-emerald-700 text-[10px] tracking-wider font-extrabold uppercase mt-0.5 block">
                      ★ PREMIUM ISLAMIC DIGITAL ADVISORY ★
                    </span>
                  </div>
                  <div className="bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-850 rounded border border-amber-200 shadow-3xs">
                    EST. 2016
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE ACADEMIC ABOUT US SECTION */}
      <section id="about-section" className="py-20 bg-white border-b border-slate-100 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Col Left: Beautiful text */}
            <div className="col-span-1 lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-emerald-150">
                <Award className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
                {lang === "en" ? "Academic Statement" : "تعلیمی مشن"}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
                {t.aboutTitle[lang]}
              </h2>
              
              <div className="w-24 h-0.5 bg-emerald-600 rounded-full"></div>
              
              <p className="text-slate-650 text-sm md:text-base leading-relaxed" style={{ direction: isUr ? "rtl" : "ltr" }}>
                {lang === "en" ? config.aboutEn : lang === "ur" ? config.aboutUr : config.aboutRoman}
              </p>

              {/* Elegant bullet grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200/55 rounded-xl space-y-1 hover:bg-emerald-50/10 transition-colors duration-250">
                  <h4 className="text-xs font-serif font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Quran with Tajweed</span>
                  </h4>
                  <p className="text-[11px] text-slate-55 leading-relaxed">Pronunciation accuracy with qualified teachers globally.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/55 rounded-xl space-y-1 hover:bg-emerald-50/10 transition-colors duration-250">
                  <h4 className="text-xs font-serif font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-700" />
                    <span>Flexible Global Scheduling</span>
                  </h4>
                  <p className="text-[11px] text-slate-55 leading-relaxed">24/7 flexibility mapping UK, USA, Canada & Middle East schedules.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/55 rounded-xl space-y-1 hover:bg-emerald-50/10 transition-colors duration-250">
                  <h4 className="text-xs font-serif font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Separate Female Instructors</span>
                  </h4>
                  <p className="text-[11px] text-slate-55 leading-relaxed">Dedicated expert female tutors for ladies and children secure learning.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/55 rounded-xl space-y-1 hover:bg-emerald-50/10 transition-colors duration-250">
                  <h4 className="text-xs font-serif font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Progress Evaluation card</span>
                  </h4>
                  <p className="text-[11px] text-slate-55 leading-relaxed font-sans">Monthly performance reports shared periodically with respective parents.</p>
                </div>
              </div>

            </div>

            {/* Col Right: Highlights Board */}
            <div className="col-span-1 lg:col-span-5 bg-gradient-to-br from-[#fafbfc] to-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-400/[0.02] rounded-full blur-2xl pointer-events-none"></div>
              
              <h3 className="text-lg font-serif font-bold text-emerald-800 border-b border-slate-200/80 pb-4 mb-5">
                Our Core Education Values
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-xs shrink-0 border border-emerald-100">01</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">100% Student-Centric System</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Classes are fully tailored around student’s current proficiency level, focus, and pacing.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-xs shrink-0 border border-emerald-100">02</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Tajweed Phonics & Correction</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Our qualified huffaz pay extreme attention directly to letters origins (Makharij) and stop signs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-xs shrink-0 border border-emerald-100">03</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-sans">Structured Monthly Syllabus</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Step-by-step progress from basic Qaida, translation exercises, up to memorizing complete Surahs.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-xs shrink-0 border border-emerald-100">04</div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">Affordable Fee with Family Deals</h4>
                    <p className="text-[11px] text-zinc-500 mt-0.5 font-sans">Multiple students from the same household receive special sibling bundle discounts up to 15%.</p>
                  </div>
                </div>
              </div>

              {/* Slogan Banner */}
              <div className="mt-8 pt-5 border-t border-slate-200/80 text-center">
                <span className="text-[10px] tracking-widest font-extrabold uppercase text-slate-400 block mb-2 font-sans">Worldwide Certified Institution</span>
                <span className="text-sm font-serif font-semibold text-emerald-800 italic">"Spreading the illumination of Quran with purity & ease"</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. CORE VALUES / "WHY US" SECTION */}
      <section id="why-us-section" className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h3 className="text-xs tracking-[0.3em] text-emerald-700 uppercase font-bold mb-3">Academic Excellence</h3>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
              {t.whTitle[lang]}
            </h2>
            <p className="mt-4 text-slate-650 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t.whSubtitle[lang]}
            </p>
            
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-650 rounded-full"></div>
              <div className="w-3.5 h-3.5 rotate-45 border-2 border-amber-500 bg-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-500"></div>
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-650 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whCards.map(card => {
              const cardTitle = lang === "en" ? card.titleEn : lang === "ur" ? card.titleUr : card.titleRoman;
              const cardDesc = lang === "en" ? card.descEn : lang === "ur" ? card.descUr : card.descRoman;

              return (
                <div 
                  key={card.id}
                  className="p-6 md:p-8 bg-gradient-to-br from-[#fafbfc] to-white border border-slate-200/80 rounded-2xl hover:border-emerald-600/30 hover:shadow-xl hover:bg-white transition-all duration-300 text-center flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-800 border border-emerald-100/60 rounded-2xl flex items-center justify-center mx-auto shadow-3xs mb-5">
                      {card.id === 1 && <Users className="w-5 h-5 text-emerald-755" />}
                      {card.id === 2 && <Shield className="w-5 h-5 text-emerald-755" />}
                      {card.id === 3 && <Clock className="w-5 h-5 text-emerald-755" />}
                      {card.id === 4 && <Award className="w-5 h-5 text-emerald-755" />}
                    </div>

                    <h3 className="text-base font-serif font-bold text-slate-800 tracking-wide mb-3 min-h-12 flex items-center justify-center">
                      {cardTitle}
                    </h3>
                    <p className="text-[11px] text-slate-650 leading-relaxed max-w-xs mx-auto">
                      {cardDesc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. SYLLABUS LISTS (Already upgraded to beautiful Light theme!) */}
      <SyllabusSection 
        courses={courses} 
        lang={lang} 
        onSelectCourse={(id) => {
          scrollToForm();
        }} 
      />

      {/* 6. PRICING PLANS & DETAILS (Already upgraded to beautiful Light theme!) */}
      <PricingSection 
        plans={plans} 
        lang={lang} 
        onSelectPlan={(days) => {
          scrollToForm();
        }} 
      />

      {/* 7. BOOKING AREA FORM WITH DIRECT CALL HANDLERS */}
      <section id="trial-booking-section" className="py-20 bg-neutral-50/80 scroll-mt-20 border-t border-slate-200/60 relative">
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

            {/* Direct Contact Support Sidebar Right */}
            <div className="col-span-1 lg:col-span-5 space-y-6">
              
              <div className="p-6 md:p-8 bg-white rounded-2xl border border-slate-200/80 space-y-5 shadow-md">
                <span className="text-[10px] bg-emerald-50 text-emerald-800 font-extrabold px-3 py-1 rounded-full tracking-wider uppercase border border-emerald-150 inline-block">
                  INSTANT REGISTRATION
                </span>
                
                <h3 className="text-xl font-serif font-bold text-slate-900 tracking-wide">
                  {lang === "en" ? "Register Instantly on WhatsApp" : "براہِ راست واٹس ایپ پر رجسٹریشن"}
                </h3>

                <p className="text-xs text-slate-650 leading-relaxed">
                  {t.directPrompt[lang]}
                </p>

                {/* Direct Action Detail Badge */}
                <div className="p-5 bg-[#fafbfc] border border-slate-200/80 rounded-xl space-y-4 shadow-3xs">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                      <Phone className="w-5 h-5 text-emerald-800" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-extrabold tracking-wider uppercase">Direct Call / Voice Message</div>
                      <div className="text-base font-bold font-mono text-slate-800 tracking-wide">{config.phone}</div>
                    </div>
                  </div>

                  <a
                    href={getWhatsappLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-805 text-white font-extrabold transition-all text-xs flex items-center justify-center gap-2 shadow-sm uppercase tracking-wide cursor-pointer text-center"
                  >
                    <MessageCircle className="w-4.5 h-4.5 text-amber-300 fill-amber-300 animate-pulse" />
                    <span>{t.heroBtnRight[lang]}</span>
                  </a>
                  
                  <span className="text-[10px] text-center text-slate-500 block font-semibold leading-relaxed">
                    {t.contactUnderForm[lang]}
                  </span>
                </div>
              </div>

              {/* Secure Booking Trial Guidelines */}
              <div className="p-6 bg-amber-50/15 rounded-2xl space-y-4 border border-amber-250/50">
                <h4 className="text-xs font-serif font-bold text-amber-900 uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-700" />
                  <span>How does your trial system work?</span>
                </h4>
                <ol className="list-decimal list-inside text-xs text-slate-700 space-y-3.5 leading-relaxed pl-1">
                  <li><strong className="font-bold text-slate-800">Request:</strong> Submit the booking form or write directly on WhatsApp.</li>
                  <li><strong className="font-bold text-slate-800">Schedules:</strong> Our academic team coordinates to set the time.</li>
                  <li><strong className="font-bold text-slate-800">Join:</strong> We provide highly secured Skype or Zoom link for the lessons.</li>
                  <li><strong className="font-bold text-slate-800">Assess:</strong> Try our tutors 100% free for 3 days without making any commitments.</li>
                  <li><strong className="font-bold text-slate-800">Continue:</strong> Pay your monthly budget packages only if you are fully pleased.</li>
                </ol>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. PARENTS AND STUDENTS TESTIMONIAL REVIEWS GRID */}
      <section id="testimonials-section" className="py-20 bg-white scroll-mt-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-200 mb-3">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              {lang === "en" ? "Student Reviews" : "طلباء کی رائے"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
              {t.testiTitle[lang]}
            </h2>
            <p className="mt-4 text-slate-650 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              {t.testiSubtitle[lang]}
            </p>
            
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-650 rounded-full"></div>
              <div className="w-3.5 h-3.5 rotate-45 border-2 border-amber-500 bg-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-500"></div>
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-650 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialTestimonials.map((review, idx) => {
              const reviewText = lang === "en" ? review.textEn : lang === "ur" ? review.textUr : review.textRoman;
              return (
                <div 
                  key={idx}
                  id={`review-card-${idx}`}
                  className="bg-neutral-50/50 p-6 md:p-8 rounded-2xl border border-slate-200/80 hover:border-emerald-600/30 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-xs"
                >
                  <div className="space-y-4">
                    {/* Stars row */}
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    
                    <p className={`text-slate-700 italic text-xs md:text-sm leading-relaxed font-serif ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
                      "{reviewText}"
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{review.name}</h4>
                      <span className="text-[10px] text-emerald-805 font-bold tracking-tight uppercase">{review.location}</span>
                    </div>
                    
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-150 px-2.5 py-0.5 rounded text-[10px] font-extrabold font-sans">
                      {review.course}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. BRAND-NEW PREMIUM INTERACTIVE FAQ SECTION */}
      <section id="faq-section" className="py-20 bg-neutral-50/50 border-t border-slate-200/50 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-808 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-emerald-150 mb-3">
              <Shield className="w-3.5 h-3.5 text-emerald-700" />
              {lang === "en" ? "Got Questions?" : "سوالات و جوابات"}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
              {t.faqSecTitle[lang]}
            </h2>
            <p className="mt-4 text-slate-650 text-sm md:text-base max-w-2xl mx-auto">
              {t.faqSecSubtitle[lang]}
            </p>
            
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-650 rounded-full"></div>
              <div className="w-3.5 h-3.5 rotate-45 border-2 border-amber-500 bg-white shadow-sm flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-500"></div>
              </div>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-650 rounded-full"></div>
            </div>
          </div>

          {/* Interactive Accordion items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const faqQuestion = lang === "en" ? faq.q.en : lang === "ur" ? faq.q.ur : faq.q.roman;
              const faqAnswer = lang === "en" ? faq.a.en : lang === "ur" ? faq.a.ur : faq.a.roman;

              return (
                <div 
                  key={index} 
                  id={`faq-item-${index}`}
                  className="bg-white border border-slate-200/80 rounded-2xl shadow-3xs overflow-hidden transition-all duration-300 hover:border-emerald-650/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 font-serif text-sm md:text-base font-bold text-slate-800 hover:text-emerald-800 transition-colors cursor-pointer"
                    style={{ direction: isUr ? "rtl" : "ltr" }}
                  >
                    <span className={isUr ? "text-right" : "text-left"}>{faqQuestion}</span>
                    <div className="p-1.5 bg-slate-50 text-slate-500 border border-slate-200 rounded-lg shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-emerald-800" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-slate-700" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div 
                          className="px-6 pb-6 pt-1 text-xs md:text-sm text-slate-650 leading-relaxed border-t border-slate-100"
                          style={{ direction: isUr ? "rtl" : "ltr" }}
                        >
                          <p className={isUr ? "text-right" : "text-left"}>{faqAnswer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. PREMIUM CALL / WHATSAPP ACTION SECTION */}
      <section id="direct-support-banner" className="py-16 bg-gradient-to-r from-emerald-850 to-emerald-950 text-white relative overflow-hidden">
        {/* Subtle geometric traditional border overlay */}
        <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none opacity-40"></div>
        <div className="absolute top-0 right-10 w-64 h-64 bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
          <span className="bg-amber-400/20 text-amber-300 text-[10px] tracking-widest font-extrabold px-3 py-1 rounded-full uppercase border border-amber-300/30 inline-block font-sans">
            Worldwide Quran Academy Support 24/7
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white leading-tight">
            Take Your First Step Towards Proper Quranic Journey
          </h2>
          <p className="text-emerald-100 text-sm max-w-2xl mx-auto leading-relaxed">
            Get 1-on-1 expert classes in your local timezone. Register for trial in 2 minutes. Feel free to contact our coordinator directly on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <div className="bg-emerald-900/60 border border-white/10 px-5 py-3 rounded-2xl flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-300" />
              <div className="text-left font-sans">
                <div className="text-[9px] text-emerald-250 font-bold uppercase tracking-wider">Dial Helpline</div>
                <div className="text-sm font-black font-mono tracking-wider">{config.phone}</div>
              </div>
            </div>

            <a
              href={getWhatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold py-3.5 px-8 rounded-2xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:translate-y-[-1.5px] cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5 text-emerald-950 fill-emerald-950 animate-bounce" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 11. MAIN SLATE-900 FOOTER */}
      <footer id="main-footer" className="bg-slate-900 text-slate-350 pt-16 pb-8 border-t border-slate-800 mt-auto relative font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img 
                src={logoImg} 
                alt="Academy Footer Logo Badge" 
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full border border-emerald-500/35 shadow-sm pointer-events-none"
              />
              <span className="font-serif font-bold text-base tracking-wide text-white">{config.name}</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed min-h-[3rem]">
              {config.aboutEn}
            </p>
          </div>

          {/* Col 2: Quick Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-405 uppercase tracking-widest">Syllabus Overview</h4>
            <ul className="text-xs text-slate-400 space-y-2.5">
              {courses.map((c) => (
                <li key={c.id} className="flex items-center gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="hover:text-white transition-colors cursor-pointer">{lang === "en" ? c.titleEn : lang === "ur" ? c.titleUr : c.titleRoman}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Details showing requested phone visibly */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-405 uppercase tracking-widest">Connect With Us</h4>
            <ul className="text-xs text-slate-400 space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-550" />
                <span className="text-slate-350">{config.email}</span>
              </li>
              <li className="flex items-center gap-2.5 font-bold">
                <Phone className="w-4 h-4 text-emerald-555" />
                <span className="text-emerald-350">Call/WhatsApp: {config.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-emerald-550" />
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
              onClick={() => setIsAdminOpen(true)}
              className="text-emerald-400 hover:text-emerald-305 hover:bg-white/5 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/50"
            >
              ⚙ Customizer Login
            </button>
          </div>
        </div>
      </footer>

      {/* 12. CONTROL PANEL / CUSTOMIZER MODAL */}
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
