import { Course, LanguageMode } from "../types";
import * as Icons from "lucide-react";

interface CoursesPageProps {
  courses: Course[];
  lang: LanguageMode;
  onSelectCourse: (courseId: string) => void;
}

export default function CoursesPage({ courses, lang, onSelectCourse }: CoursesPageProps) {
  
  // Direct dynamic icon helper with premium styled container
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComp = (Icons as any)[iconName];
    if (IconComp) {
      return <IconComp className="w-5 h-5 text-emerald-700" />;
    }
    return <Icons.BookOpen className="w-5 h-5 text-emerald-700" />;
  };

  const t = {
    pageTitle: {
      en: "Our Premium Online Courses",
      ur: "ہمارے آن لائن قرآنی کورسز",
      roman: "Our Online Quran Programs"
    },
    pageSubtitle: {
      en: "Highly-engaging 1-on-1 online courses structured professionally for children, kids, adults, male and female students.",
      ur: "تمام عمر کے طلباء کے لیے تجوید و تجوید کے بہترین اصولوں کے ساتھ ترتیب دیے گئے تدریسی دورانیے",
      roman: "Bacho aur baro ke liye expertly organize kiye gaye premium 1-on-1 programs with proper Tajweed."
    },
    ageBadge: {
      en: "Age:",
      ur: "عمر:",
      roman: "Age:"
    },
    enrollBtn: {
      en: "Enroll & Book Free Trial",
      ur: "رجسٹریشن اور مفت ٹرائل",
      roman: "Enroll & Book Free Trial"
    },
    benefitsTitle: {
      en: "What Makes Our Syllabus Special?",
      ur: "ہمارے سلیبس کی خاص باتیں",
      roman: "Syllabus Ki Khas Qubliat"
    }
  };

  const isUr = lang === "ur";

  return (
    <div className="flex-1 bg-slate-50/50 py-16">
      
      {/* Decorative Traditional Border Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 mb-4 shadow-3xs">
            <Icons.Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{lang === "en" ? "Structured Academic Syllabus" : "باقاعدہ تعلیمی نصاب"}</span>
          </span>
          
          <h1 className="text-3xl md:text-4.5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.pageTitle[lang]}
          </h1>
          
          <p className="mt-4 text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.pageSubtitle[lang]}
          </p>
          
          {/* Elegant gold Divider with Islamic star center */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-emerald-600 rounded-full"></div>
            <div className="w-3 h-3 rotate-45 border-2 border-amber-500 bg-white shadow-sm flex items-center justify-center">
              <div className="w-1 h-1 bg-amber-500"></div>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-emerald-600 rounded-full"></div>
          </div>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {courses.map((course) => {
            const title = lang === "en" ? course.titleEn : lang === "ur" ? course.titleUr : course.titleRoman;
            const desc = lang === "en" ? course.descriptionEn : lang === "ur" ? course.descriptionUr : course.descriptionRoman;
            const features = lang === "en" ? course.featuresEn : lang === "ur" ? course.featuresUr : course.featuresRoman;

            return (
              <div 
                key={course.id}
                id={`course-card-${course.id}`}
                className="group bg-white rounded-2.5xl p-6.5 md:p-8 border border-slate-200 hover:border-emerald-600/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative shadow-sm"
              >
                {/* Thin golden accent on top hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-amber-400 rounded-t-2.5xl transition-colors duration-300"></div>

                <div>
                  {/* Icon & Recommended Age */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-800 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm border border-emerald-100/50">
                      {renderIcon(course.iconName)}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-800 px-3.5 py-1 rounded-full border border-amber-200/50 shadow-3xs">
                      {t.ageBadge[lang]} {course.recommendedAge}
                    </span>
                  </div>

                  <h3 className={`text-lg md:text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors ${isUr ? "text-right" : "text-left"}`}>
                    {title}
                  </h3>

                  <p className={`text-slate-650 text-xs leading-relaxed mb-6 min-h-[4.5rem] font-medium ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
                    {desc}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="border-t border-slate-100 pt-4 mb-6">
                    <ul className="space-y-2.5" style={{ direction: isUr ? "rtl" : "ltr" }}>
                      {features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                          <Icons.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA with a stunning modern design */}
                <button
                  type="button"
                  id={`course-cta-${course.id}`}
                  onClick={() => onSelectCourse(course.id)}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 hover:shadow-md transition-all duration-200 text-xs font-bold flex items-center justify-center gap-2 shadow-3xs cursor-pointer"
                >
                  <span>{t.enrollBtn[lang]}</span>
                  <Icons.ArrowRight className={`w-4 h-4 transition-transform duration-250 ${isUr ? "rotate-180" : "group-hover:translate-x-1"}`} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Extra Section: Professional Structure Details */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white rounded-3xl p-8 md:p-12 border border-emerald-700/30 relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-emerald-900/10 pointer-events-none opacity-40"></div>
          <div className="absolute top-0 right-10 w-64 h-64 bg-amber-400/[0.04] rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide">
                {lang === "en" ? "Need a Personalized Course Customization?" : "اپنے مطابق کورس ترتیب دیں"}
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed font-sans max-w-2xl">
                {lang === "en" 
                  ? "We understand that every student learns at a different pace. Our male and female certified scholars can customize course structures, add special Surah memorization, daily Masnoon duas training, and match class frequency exactly to your children's stamina and school timings."
                  : "ہم سمجھتے ہیں کہ ہر بچہ اپنی رفتار سے سیکھتا ہے۔ ہمارے اساتذہ آپ کے بچوں کی تعلیمی اور اسکول کے اوقات کے مطابق نصاب اور روزمرہ کی دعاؤں کو لچکدار بنا سکتے ہیں۔"}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 bg-emerald-900/40 px-3.5 py-1.5 rounded-lg border border-white/10 text-xs">
                  <Icons.CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Kids & Adults Friendly</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/40 px-3.5 py-1.5 rounded-lg border border-white/10 text-xs">
                  <Icons.CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Certified Alim / Hafiz</span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-900/40 px-3.5 py-1.5 rounded-lg border border-white/10 text-xs">
                  <Icons.CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Male & Female Scholars</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onSelectCourse("qaida")}
                className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold py-3.5 px-8 rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Icons.Sparkles className="w-4.5 h-4.5 text-emerald-950 fill-emerald-950 animate-bounce" />
                <span>Book 3-Day Free Trial</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
