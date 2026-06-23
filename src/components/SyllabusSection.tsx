import { Course, LanguageMode } from "../types";
import * as Icons from "lucide-react";

interface SyllabusSectionProps {
  courses: Course[];
  lang: LanguageMode;
  onSelectCourse: (courseId: string) => void;
}

export default function SyllabusSection({ courses, lang, onSelectCourse }: SyllabusSectionProps) {
  // Direct dynamic icon helper
  const renderIcon = (iconName: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const IconComp = (Icons as any)[iconName];
    if (IconComp) {
      return <IconComp className="w-6 h-6 text-emerald-400" />;
    }
    return <Icons.BookOpen className="w-6 h-6 text-emerald-400" />;
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
    <section id="syllabus-section" className="py-16 bg-[#0a0c10] shrink-0 scroll-mt-20 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-xs tracking-[0.3em] text-emerald-500 uppercase font-bold mb-3">Our Expertise</h3>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-wide">
            {t.headerTitle[lang]}
          </h2>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.headerSubtitle[lang]}
          </p>
          <div className="w-24 h-0.5 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
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
                className="group bg-[#0d1117] rounded-xl p-6 border border-white/5 hover:border-emerald-500/30 hover:bg-[#11141a]/60 hover:shadow-2xl hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="p-3 bg-[#0a0c10] border border-white/10 text-emerald-400 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                      {renderIcon(course.iconName)}
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-950/60 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                      {t.ageBadge[lang]} {course.recommendedAge}
                    </span>
                  </div>

                  <h3 className={`text-lg font-serif font-medium text-white mb-3 group-hover:text-emerald-400 transition-colors ${isUr ? "text-right" : "text-left"}`}>
                    {title}
                  </h3>

                  <p className={`text-white/60 text-xs inline-block leading-relaxed mb-5 min-h-[3.5rem] ${isUr ? "text-right" : "text-left"}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
                    {desc}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 mb-6" style={{ direction: isUr ? "rtl" : "ltr" }}>
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-white/80">
                        <Icons.CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  id={`course-cta-${course.id}`}
                  onClick={() => onSelectCourse(course.id)}
                  className="w-full mt-2 py-2.5 px-4 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 hover:-translate-y-[1px] transition-all duration-300 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>{t.enrollBtn[lang]}</span>
                  <Icons.ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
