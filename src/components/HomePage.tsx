import { useState } from "react";
import { LanguageMode, AcademyConfig } from "../types";
import { initialTestimonials } from "../data";
import { 
  Star, Phone, MessageCircle, Shield, Plus, Minus, 
  ArrowRight, Users, Heart, BookOpen, Clock, Award, Sparkles, HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import childLearningImg from "../assets/images/quran_learning_hero_1782214664239.jpg";

interface HomePageProps {
  lang: LanguageMode;
  config: AcademyConfig;
  onNavigate: (page: string) => void;
}

export default function HomePage({ lang, config, onNavigate }: HomePageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Pre-fill whatsapp message link helper using the requested direct URL
  const getWhatsappLink = () => {
    const num = config.whatsapp.replace(/\D/g, "");
    const textMsg = encodeURIComponent(
      `Assalamoalaikum, I am visiting Worldwide Quran Academy website and I want to book a free 3-Day trial class for myself/my children. Please guide me about schedules.`
    );
    return `https://wa.me/${num || "923345750157"}?text=${textMsg}`;
  };

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

  const t = {
    heroBannerSubtitle: {
      en: "Learn Quran Online with Proper Tajweed Rules",
      ur: "گھر بیٹھے عالمی اساتذہ سے تجوید کے ساتھ قران پاک سیکھیں",
      roman: "Ghar Baithe Global Instructors Se Tajweed K Sath Quran Seekhein"
    },
    studentsBadge: {
      en: "8 Years of Quality Quran Teaching Excellence • serving UK, USA, Canada & Australia",
      ur: "8 سالہ تعلیمی خدمات • یو کے، یو ایس، کینیڈا، آسٹریلیا کے مطمئن طلباء",
      roman: "8 Years Teaching Excellence • USA, UK, Canada & Australia"
    },
    heroBtnLeft: {
      en: "Register Trial Class",
      ur: "ٹرائل کلاس رجسٹر کریں",
      roman: "Trial Class Register Karain"
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
        descRoman: "Har student ko akela parhaya jata hai ta ke teacher ki poori attention mil sake.",
        icon: Users
      },
      {
        id: 2,
        titleEn: "Male & Female Qualified Tutors",
        titleUr: "مرد اور خواتین اساتذہ علیحدہ علیحدہ",
        titleRoman: "Male & Female Certified Scholars",
        descEn: "We feature highly-qualified, background-verified male and female Islamic scholars expert in modern digital teaching pedagogy.",
        descUr: "ہماری اکیڈمی میں تجربہ کار اور نیک سیرت مرد اور خواتین اساتذہ علیحدہ علیحدہ تدریس کے لیے دستیاب ہیں۔",
        descRoman: "Humare paas certified male aur female scholars separate classes ke liye har waqt available hain.",
        icon: Award
      },
      {
        id: 3,
        titleEn: "Flexible Timing 24/7 Shift",
        titleUr: "24 گھنٹے لچکدار اوقات",
        titleRoman: "Flexible Timing Options",
        descEn: "Schedule lessons at your most convenient hour, matching any international timezone seamlessly without disrupting school.",
        descUr: "اپنے مصروف شیڈول کے مطابق اپنی پسند کا وقت اور دن مقرر کرکے کلاسز کا آغاز کریں۔",
        descRoman: "Apne busy routine ke mutabiq jab chahein aap class ka time set karwa sakte hain.",
        icon: Clock
      },
      {
        id: 4,
        titleEn: "Monthly Assessment Reports",
        titleUr: "ماہانہ رپورٹ اور امتحان",
        titleRoman: "Monthly Progress Reports",
        descEn: "Monitor your children's pronunciation refinement, active Surah memorization, and real-time attendance reports easily.",
        descUr: "ماہانہ بنیادوں پر طلباء کی کارکردگی اور حاضری کی تفصیلی رکارڈ اور رپورٹس والدین کو مہیا کی جاتی ہیں۔",
        descRoman: "Monthly basis par bache ki tajweed, attendance aur evaluation report share ki tabi hai.",
        icon: BookOpen
      }
    ],
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

  const isUr = lang === "ur";

  return (
    <div className="flex-1">
      
      {/* HERO SECTION */}
      <section id="hero-section" className="relative bg-gradient-to-br from-white via-emerald-50/15 to-amber-50/10 text-slate-800 overflow-hidden py-16 lg:py-24 border-b border-slate-100">
        <div className="absolute top-1/2 left-5 w-72 h-72 bg-gradient-to-br from-amber-400/[0.02] to-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className={`col-span-1 lg:col-span-7 space-y-6 ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold border border-emerald-200/60 shadow-3xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{t.studentsBadge[lang]}</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5.5xl font-serif font-extrabold text-slate-900 leading-tight">
              {lang === "en" ? (
                <>
                  Learn Holy Quran Online <br />
                  <span className="text-emerald-700 bg-gradient-to-r from-emerald-700 via-emerald-850 to-emerald-900 bg-clip-text text-transparent not-italic font-bold">
                    With True Tajweed Rules
                  </span>
                </>
              ) : t.heroBannerSubtitle[lang]}
            </h1>

            <p className="text-slate-650 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl font-sans font-medium">
              {lang === "en" ? config.taglineEn : lang === "ur" ? config.taglineUr : config.taglineRoman}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-3">
              <button
                type="button"
                onClick={() => onNavigate("contact")}
                className="w-full sm:w-auto bg-emerald-750 hover:bg-emerald-850 text-white font-extrabold py-3.5 px-8 rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:translate-y-[-1px] cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
                <span>{t.heroBtnLeft[lang]}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-emerald-800 font-extrabold py-3.5 px-8 rounded-2xl transition-all duration-200 text-xs tracking-wider uppercase border border-emerald-250 shadow-3xs flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4.5 h-4.5 text-emerald-750 fill-emerald-100" />
                <span>{t.heroBtnRight[lang]}</span>
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/60 max-w-lg">
              <div>
                <div className="text-xl md:text-2xl font-bold text-emerald-800">500+</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Passed Students</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-emerald-800">8+ Yrs</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Teaching Experience</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-emerald-800">1-on-1</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Live Classes</div>
              </div>
            </div>
          </div>

          {/* Right Custom Illustration Frame */}
          <div className="col-span-1 lg:col-span-5 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/10 to-amber-400/5 rounded-3xl blur-2xl transform rotate-3 scale-95 pointer-events-none"></div>
            <div className="relative border-4 border-white shadow-2xl rounded-2.5xl overflow-hidden bg-emerald-50 hover:scale-[1.01] transition-transform duration-300 aspect-[4/3] w-full max-w-md">
              <img 
                src={childLearningImg} 
                alt="Muslim child reading and learning Quran with teacher online" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 inset-x-4 text-white flex items-center gap-2.5">
                <div className="bg-emerald-600 p-2 rounded-full border border-white/20">
                  <Heart className="w-3.5 h-3.5 text-white fill-white animate-pulse" />
                </div>
                <p className="text-[11px] font-serif font-bold drop-shadow-md">
                  {lang === "en" ? "Structured with certified scholars for your kid's pure future." : "بچوں کے بہترین دینی مستقبل کا شاندار آغاز۔"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-choose-us" className="py-20 bg-white border-b border-slate-100 scroll-mt-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 shadow-3xs mb-3">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
              <span>{lang === "en" ? "Our Academic Excellence" : "ہمارا تدریسی معیار"}</span>
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-extrabold text-slate-900 tracking-tight">
              {t.whTitle[lang]}
            </h2>
            <p className="mt-4 text-slate-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              {t.whSubtitle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div 
                  key={card.id}
                  id={`why-card-${card.id}`}
                  className="bg-slate-50/55 rounded-2xl p-6.5 border border-slate-200/80 hover:border-emerald-600/30 hover:bg-white hover:shadow-xl transition-all duration-350 relative group"
                >
                  <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-amber-400 rounded-t-2xl transition-colors duration-300" />
                  
                  <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-xl w-fit border border-emerald-100 mb-5 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-300">
                    <IconComp className="w-5 h-5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 font-serif mb-2.5">
                    {lang === "en" ? card.titleEn : lang === "ur" ? card.titleUr : card.titleRoman}
                  </h3>
                  
                  <p className="text-slate-600 text-xs leading-relaxed font-sans font-medium">
                    {lang === "en" ? card.descEn : lang === "ur" ? card.descUr : card.descRoman}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials-section" className="py-20 bg-neutral-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 shadow-3xs mb-3">
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === "en" ? "Reviews & Feedback" : "والدین کی آراء"}</span>
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-extrabold text-slate-900 tracking-tight">
              {t.testiTitle[lang]}
            </h2>
            <p className="mt-4 text-slate-650 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t.testiSubtitle[lang]}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialTestimonials.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2.5xl p-6.5 border border-slate-200/85 shadow-sm relative hover:shadow-md transition-shadow"
              >
                {/* 5 Stars rating */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-650 text-xs sm:text-sm leading-relaxed mb-6 font-medium italic">
                  "{lang === "en" ? t.textEn : lang === "ur" ? t.textUr : t.textRoman}"
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{t.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold tracking-wider uppercase mt-0.5">{t.location}</p>
                  </div>
                  <span className="bg-emerald-50 text-emerald-800 text-[9px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-emerald-150">
                    {t.course.split(" ")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq-section" className="py-20 bg-white scroll-mt-20 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 mb-3 shadow-3xs">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === "en" ? "Got Questions?" : "سوالات و جوابات"}</span>
            </span>
            <h2 className="text-2xl md:text-3.5xl font-serif font-extrabold text-slate-900 tracking-tight">
              {t.faqSecTitle[lang]}
            </h2>
            <p className="mt-4 text-slate-650 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {t.faqSecSubtitle[lang]}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const faqQuestion = lang === "en" ? faq.q.en : lang === "ur" ? faq.q.ur : faq.q.roman;
              const faqAnswer = lang === "en" ? faq.a.en : lang === "ur" ? faq.a.ur : faq.a.roman;

              return (
                <div 
                  key={index} 
                  id={`faq-item-${index}`}
                  className="bg-slate-50/40 border border-slate-200/80 rounded-2xl shadow-3xs overflow-hidden transition-all duration-300 hover:border-emerald-650/20"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left gap-4 font-serif text-sm md:text-base font-bold text-slate-800 hover:text-emerald-800 transition-colors cursor-pointer"
                    style={{ direction: isUr ? "rtl" : "ltr" }}
                  >
                    <span className={isUr ? "text-right" : "text-left"}>{faqQuestion}</span>
                    <div className="p-1.5 bg-white text-slate-500 border border-slate-200 rounded-lg shrink-0">
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

      {/* CALL TO ACTION HELPLINE BAR */}
      <section id="direct-support-banner" className="py-16 bg-gradient-to-r from-emerald-850 to-emerald-950 text-white relative overflow-hidden">
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
              <MessageCircle className="w-4.5 h-4.5 text-emerald-950 fill-emerald-950" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
