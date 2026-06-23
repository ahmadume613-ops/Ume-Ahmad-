import { Course, LanguageMode } from "../types";
import * as Icons from "lucide-react";

interface SyllabusSectionProps {
  courses: Course[];
  lang: LanguageMode;
  onSelectCourse: (courseId: string) => void;
}

export default function SyllabusSection({ courses, lang, onSelectCourse }: SyllabusSectionProps) {
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
    headerTitle: {
      en: "Our Premium Reading Programs",
      ur: "ہمارے آن لائن قرآنی کورسز",
      roman: "Hamare Premium Online Courses"
    },
    headerSubtitle: {
      en: "Highly-engaging 1-on-1 virtual courses structured professionally for all ages and skill levels.",
      ur: "تمام عمر کے طلباء کے لیے تجوید و تجوید کے بہترین اصولوں کے ساتھ ترتیب دیے گئے تدریسی دورانیے",
      roman: "Har umer ke bacho aur baro ke liye expertly organize kiye gaye premium 1-on-1 programs."
    },
    ageBadge: {
      en: "Age:",
      ur: "عمر:",
      roman: "Age:"
    },
    enrollBtn: {
      en: "Book Free Trial",
      ur: "مفت ٹرائل حاصل کریں",
      roman: "Free Trial Book Karain"
    }
  };

  const isUr = lang === "ur";

  return (
    <section id="syllabus-section" className="py-20 bg-neutral-50 scroll-mt-20 border-b border-slate-100 relative overflow-hidden">
      {/* Decorative Traditional Border Detail */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-600 to-amber-500"></div>
      
      {/* Background Subtle Islamic Geometric Accent */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-emerald-200/60 mb-3">
            <Icons.Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            {lang === "en" ? "Structured Syllabus" : lang === "ur" ? "باقاعدہ سلیبس" : "Class Syllabus"}
          </span>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
            {t.headerTitle[lang]}
          </h2>
          
          <p className="mt-4 text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.headerSubtitle[lang]}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const title = lang === "en" ? course.titleEn : lang === "ur" ? course.titleUr : course.titleRoman;
            const desc = lang === "en" ? course.descriptionEn : lang === "ur" ? course.descriptionUr : course.descriptionRoman;
            const features = lang === "en" ? course.featuresEn : lang === "ur" ? course.featuresUr : course.featuresRoman;

            return (
              <div 
                key={course.id}
                id={`course-card-${course.id}`}
                className="group bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 hover:border-emerald-600/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative shadow-sm"
              >
                {/* Thin golden accent on top hover */}
                <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-amber-400 rounded-t-2xl transition-colors duration-300"></div>

                <div>
                  {/* Icon & Recommended Age */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-800 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white shadow-sm border border-emerald-100/50">
                      {renderIcon(course.iconName)}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-800 px-3 py-1 rounded-full border border-amber-200/50 shadow-xs">
                      {t.ageBadge[lang]} {course.recommendedAge}
                    </span>
                  </div>

                  <h3 className={`text-xl font-serif font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors ${isUr ? "text-right" : "text-left"}`}>
                    {title}
                  </h3>

                  <p className={`text-slate-650 text-xs leading-relaxed mb-6 min-h-[3.5rem] ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
                    {desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2.5 mb-8" style={{ direction: isUr ? "rtl" : "ltr" }}>
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                        <Icons.CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA with a stunning modern design */}
                <button
                  type="button"
                  id={`course-cta-${course.id}`}
                  onClick={() => onSelectCourse(course.id)}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-700 text-white hover:bg-emerald-850 hover:shadow-md transition-all duration-200 text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{t.enrollBtn[lang]}</span>
                  <Icons.ArrowRight className={`w-4 h-4 transition-transform duration-250 ${isUr ? "rotate-180" : "group-hover:translate-x-1"}`} />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
