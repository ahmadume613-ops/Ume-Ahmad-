import { LanguageMode, AcademyConfig } from "../types";
import { Star, Shield, Award, Users, BookOpen, Clock, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import logoImg from "../assets/images/quran_academy_logo_1782168948648.jpg";

interface AboutPageProps {
  lang: LanguageMode;
  config: AcademyConfig;
}

export default function AboutPage({ lang, config }: AboutPageProps) {
  
  const t = {
    title: {
      en: "About Worldwide Quran Academy",
      ur: "ورلڈ وائیڈ قرآن اکیڈمی کا تعارف",
      roman: "Worldwide Quran Academy Ka Taaruf"
    },
    subtitle: {
      en: "Connecting overseas Muslim families and kids to qualified Islamic scholars since 2018, with standard 1-on-1 lessons.",
      ur: "2018 سے بیرونِ ملک مقیم مسلمان خاندانوں اور بچوں کو مستند علمائے دین سے منسلک کرنے والا ایک عالمی اور معتبر تعلیمی ادارہ۔",
      roman: "2018 se overseas Muslim families aur bacho ko qualified male & female tutors se connect karne wala trustable platform."
    },
    storyTitle: {
      en: "8 Years of Online Teaching Excellence",
      ur: "8 سالہ کامیاب تدریسی اور انتظامی تجربہ",
      roman: "8 Years of Online Quran Teaching Experience"
    },
    storyDesc1: {
      en: "Worldwide Quran Academy is a premier online Islamic educational platform. Over the past 8 years, our expert management team has successfully served more than 500+ students across the United Kingdom, USA, Canada, Australia, and European countries. Our focus remains centered on providing highly customized, comfortable, and structured classes for both children (from 4 years old) and adults.",
      ur: "ورلڈ وائیڈ قرآن اکیڈمی ایک بہترین آن لائن اسلامی تعلیمی ادارہ ہے۔ پچھلے 8 سالوں کے دوران، ہماری انتظامیہ نے یوکے، یو ایس، کینیڈا، آسٹریلیا اور یورپی ممالک میں 500 سے زائد طلباء کو تجوید کے ساتھ قرآنی تعلیمات فراہم کی ہیں۔ ہمارا مقصد ہر طالب علم کی انفرادی صلاحیت کے مطابق آسان اور پرسکون ماحول فراہم کرنا ہے۔",
      roman: "Worldwide Quran Academy aik certified online Islamic platform hai. Guzishta 8 saal me hamari management ne UK, USA, Canada, Australia aur Europe me 500+ overseas students ko parhaya hai. Hamara main focus bacho (age 4+) aur baro ko unki capability ke mutabiq asan aur friendly mahool dena hai."
    },
    storyDesc2: {
      en: "We believe in strict quality selection. We employ certified, highly-gentle, and background-verified Male and Female scholars. Separate female teachers are available for daughters and sisters to learn Quran, Tajweed, and advanced Islamic studies in complete comfort and privacy.",
      ur: "ہم اساتذہ کے انتخاب میں معیار پر کبھی سمجھوتہ نہیں کرتے۔ ہماری اکیڈمی میں تجربہ کار، شفیق اور عالمہ و قاریہ اساتذہ بچیوں اور مستورات کے لیے الگ سے دستیاب ہیں تاکہ وہ شرعی پردہ اور مکمل آرام دہ ماحول میں سیکھ سکیں۔",
      roman: "Hum teachers selection me quality pr compromise nahi karte. Hamare paas expert, patient aur certified Male & Female scholars separate classes ke liye available hain ta ke khawateen aur bache complete privacy me seekh sakain."
    }
  };

  const isUr = lang === "ur";
  const alignClass = isUr ? "text-right" : "text-left";

  const pillars = [
    {
      icon: Users,
      titleEn: "Kids & Adults Friendly",
      titleUr: "بچوں اور بڑوں کے لیے موزوں",
      titleRoman: "Kids & Adults Focused",
      descEn: "We teach from age 4 and up, with separate methods tailored for toddlers, hyper-active kids, and busy adult learners.",
      descUr: "ہم 4 سال کے بچوں سے لے کر بڑی عمر کے بڑوں تک کے لیے ان کی فہم کے مطابق علیحدہ تدریسی طریقے اپناتے ہیں۔",
      descRoman: "Hum 4 saal ke bacho se lekar baro tak unki mental capacity ke mutabiq special syllabus design karte hain."
    },
    {
      icon: Award,
      titleEn: "Certified Scholars Only",
      titleUr: "سند یافتہ مرد و خواتین اساتذہ",
      titleRoman: "Certified Alim & Qari",
      descEn: "Every tutor in our academy has completed Alim/Alimah degrees or Hifz certifications from verified Islamic institutions.",
      descUr: "ہماری اکیڈمی کے تمام اساتذہ باقاعدہ دینی جامعات سے فارغ التحصیل عالم و فاضل اور حافظِ قرآن ہیں۔",
      descRoman: "Hamare sab tutors verified Islamic universities se certified Alim/Alimah aur hifz holders hain."
    },
    {
      icon: Shield,
      titleEn: "8+ Years Expert Management",
      titleUr: "8 سالہ انتظامی تجربہ",
      titleRoman: "8+ Years Quality Check",
      descEn: "Our coordinators monitor attendance, reschedule missed sessions, and send progress cards monthly.",
      descUr: "ہماری ٹیم باقاعدگی سے حاضری چیک کرتی ہے، ضائع شدہ سبق کا نعم البدل بناتی ہے اور ماہانہ بنیاد پر رپورٹ پیش کرتی ہے۔",
      descRoman: "Hamari academic team classes ko strictly monitor karti hai, progress cards aur backup options organize karti hai."
    },
    {
      icon: Heart,
      titleEn: "Female Tutors Available",
      titleUr: "خواتین اساتذہ دستیاب ہیں",
      titleRoman: "Female Scholars Available",
      descEn: "Qualified Alimah tutors provide highly comfortable and secure 1-on-1 lessons for girls and female adult students.",
      descUr: "بچیوں اور خواتین کی آسانی اور آرام دہ تلاوت کے لیے سند یافتہ عالمہ اور قاریہ اساتذہ چوبیس گھنٹے دستیاب ہیں۔",
      descRoman: "Girls aur adult women ke liye certified Alimah tutors separate secure online classes ke liye 24/7 online hain."
    }
  ];

  return (
    <div className="flex-1 bg-white">
      
      {/* Editorial Page Header */}
      <div className="bg-gradient-to-b from-emerald-50/20 via-neutral-50/40 to-white py-16 text-center border-b border-slate-100 relative overflow-hidden">
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-emerald-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 mb-4 shadow-3xs">
            <Award className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === "en" ? "Trust, Quality & Integrity" : "اعتماد اور اخلاص"}</span>
          </span>
          
          <h1 className="text-3xl md:text-4.5xl font-serif font-extrabold text-slate-900 leading-tight">
            {t.title[lang]}
          </h1>
          
          <p className="mt-4 text-slate-650 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* Narrative Section: 8 Years story & Male/Female focus */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Visual Brand Story Badge */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-8 bg-slate-50 border border-slate-200/80 rounded-3xl max-w-sm text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.02] rounded-full blur-2xl pointer-events-none"></div>
                
                <img 
                  src={logoImg} 
                  alt="Worldwide Quran Academy Logo Badge Large" 
                  referrerPolicy="no-referrer"
                  className="w-24 h-24 rounded-full border-4 border-emerald-550/30 shadow-md mx-auto mb-6 hover:rotate-6 transition-transform duration-300 pointer-events-none"
                />
                
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  {config.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 font-bold tracking-wider uppercase">
                  Est. 2018 • Online live Academy
                </p>

                <div className="h-px bg-slate-200 my-5" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-bold">500+ Overseas Families Served</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-bold">Male & Female Tutors Available</span>
                  </div>
                  <div className="flex items-center gap-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs text-slate-700 font-bold">Skype & Zoom 1-on-1 Classes</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Details */}
            <div className={`lg:col-span-7 space-y-6 ${alignClass}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
              <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-200/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-300" />
                <span>Since 2018</span>
              </span>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                {t.storyTitle[lang]}
              </h2>

              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                {t.storyDesc1[lang]}
              </p>

              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                {t.storyDesc2[lang]}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                  <div className="text-2xl font-bold text-emerald-800">100%</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">1-on-1 Personalized attention</div>
                </div>
                <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100/50">
                  <div className="text-2xl font-bold text-emerald-800">24/7</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">All International Timezones</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pillars Section: Core Values */}
      <section className="py-20 bg-neutral-50/50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              {lang === "en" ? "Our Academic Pillars & Quality Checks" : "ہمارے بنیادی مقاصد اور تدریسی اصول"}
            </h2>
            <p className="mt-3 text-slate-600 text-xs sm:text-sm font-medium">
              {lang === "en"
                ? "We maintain extremely high pedagogical rules to ensure kids stay comfortable and look forward to their Quran lessons."
                : "ہم بچوں کی نفسیات اور آرام کو مدنظر رکھتے ہوئے ایسے اصول اپناتے ہیں جن سے طلباء شوق سے پڑھتے ہیں۔"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((pil, idx) => {
              const IconComp = pil.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white p-6.5 rounded-2.5xl border border-slate-200/80 shadow-3xs flex gap-5 hover:shadow-md transition-shadow"
                >
                  <div className="bg-emerald-50 text-emerald-850 p-4 rounded-xl h-fit border border-emerald-100 shadow-3xs shrink-0">
                    <IconComp className="w-5.5 h-5.5 text-emerald-700" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold font-serif text-slate-900">
                      {lang === "en" ? pil.titleEn : lang === "ur" ? pil.titleUr : pil.titleRoman}
                    </h3>
                    <p className="text-xs text-slate-655 leading-relaxed font-medium">
                      {lang === "en" ? pil.descEn : lang === "ur" ? pil.descUr : pil.descRoman}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
