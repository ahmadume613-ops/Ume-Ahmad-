import React, { useState } from "react";
import { BookOpen, Star, Sparkles, CheckCircle2, ChevronDown, Award, Users, Globe, Video, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { COURSES, TESTIMONIALS, FAQS } from "../data";
import SyllabusSection from "./SyllabusSection";

interface HomePageProps {
  onPageChange: (page: string) => void;
  onBookTrial: () => void;
  language: string;
}

export default function HomePage({ onPageChange, onBookTrial, language }: HomePageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Translations helper
  const t = {
    heroTitle: {
      en: "Learn Holy Quran Online With Tajweed At Home",
      ar: "تعلم القرآن الكريم عبر الإنترنت بالتجويد في المنزل",
      ur: "گھر بیٹھے تجوید کے ساتھ قران پاک آن لائن سیکھیں",
      fr: "Apprendre le Saint Coran en Ligne avec le Tajweed",
      de: "Lernen Sie den Heiligen Koran Online mit Tajweed"
    },
    heroSubtitle: {
      en: "Private 1-on-1 standard online classes for kids & adults scheduled according to your local timezone. Taught by certified Arab & Pakistani tutors.",
      ar: "دروس خاصة فردية للأطفال والكبار مجدولة حسب منطقتك الزمنية. تحت إشراف معلمين معتمدين.",
      ur: "بچوں اور بڑوں کے لیے ون آن ون کلاسز، آپ کے پسندیدہ وقت کے مطابق۔ ماہر قاری اور قاریہ کی نگرانی میں۔",
      fr: "Cours particuliers 1-on-1 pour enfants et adultes selon votre fuseau horaire. Tuteurs arabes certifiés.",
      de: "Privater 1-zu-1-Koranunterricht für Kinder und Erwachsene, angepasst an Ihre Zeitzone."
    }
  };

  const getTranslation = (key: keyof typeof t) => {
    return t[key][language as keyof typeof t[typeof key]] || t[key].en;
  };

  const stats = [
    { icon: <Award className="w-5 h-5 text-emerald-700" />, count: "15+", label: "Years of Experience" },
    { icon: <Users className="w-5 h-5 text-emerald-700" />, count: "2,500+", label: "Active Students" },
    { icon: <Globe className="w-5 h-5 text-emerald-700" />, count: "25+", label: "Countries Served" },
    { icon: <BookOpen className="w-5 h-5 text-emerald-700" />, count: "120+", label: "Certified Tutors" },
    { icon: <Video className="w-5 h-5 text-emerald-700" />, count: "100k+", label: "Lessons Delivered" },
  ];

  return (
    <div className="space-y-24 pb-20" id="homepage-container">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 to-transparent pt-16 pb-20" id="hero-section">
        {/* Subtle background arabesque geometry pattern or elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-6" id="hero-left-column">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 fill-emerald-800 text-emerald-800" />
                3-Day Free Trial Class • No Card Required
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-950 font-sans leading-[1.1]">
                {getTranslation("heroTitle")}
              </h2>

              <p className="text-base sm:text-lg text-emerald-950/70 leading-relaxed font-sans max-w-2xl">
                {getTranslation("heroSubtitle")}
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-emerald-950/80">
                <div className="flex items-center gap-1.5 font-extrabold text-emerald-900 bg-emerald-100/60 px-3 py-1 rounded-full border border-emerald-950/5">
                  <Award className="w-4 h-4 text-emerald-800" />
                  <span>15+ Years of Experience</span>
                </div>
                <div className="flex items-center gap-1.5 font-bold">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                    ))}
                  </div>
                  <span>4.9 on Trustpilot</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-700" />
                  <span>Female Teachers Available</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4" id="hero-cta-buttons">
                <button
                  id="cta-hero-book-trial"
                  onClick={onBookTrial}
                  className="px-8 py-4 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/10 transition-all text-center flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  Book 3-Day Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  id="cta-hero-courses"
                  onClick={() => onPageChange("courses")}
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-emerald-950 font-bold rounded-xl border border-emerald-950/10 shadow-sm transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Explore Our Courses
                </button>
              </div>
            </div>

            {/* Right Graphics/Promo Column */}
            <div className="lg:col-span-5 flex justify-center relative" id="hero-right-column">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-emerald-900/10 rounded-2xl rotate-3 scale-102" />
                <img
                  src="/src/assets/images/hero_online_class_1782394008110.jpg"
                  alt="Child studying Quran online on laptop with parent"
                  className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3] border border-emerald-900/10"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating pill indicators */}
                <div className="absolute -bottom-6 -left-6 bg-white border border-emerald-950/10 rounded-2xl shadow-lg p-4 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-950">1-on-1 Zoom</p>
                    <p className="text-[10px] text-emerald-950/50">Highly Interactive</p>
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-emerald-900 text-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                    <Star className="w-5 h-5 fill-amber-300 stroke-amber-300" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">100% Satisfied</p>
                    <p className="text-[10px] text-emerald-200">Refund Guarantee</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Bento Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="statistics-section">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 bg-white border border-emerald-950/10 shadow-lg rounded-2xl p-6 sm:p-8" id="stats-inner-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 lg:border-r lg:last:border-r-0 border-emerald-950/5" id={`stat-col-${idx}`}>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-950 leading-none">{stat.count}</p>
                <p className="text-xs font-medium text-emerald-950/60 mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="featured-courses-section">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Our Programs
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-emerald-950 mt-3">Featured Online Quran Courses</h3>
          <p className="text-emerald-950/60 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
            Our structured, outcome-driven programs are tailored for absolute beginners, school kids, and busy adults who want to perfect their recitation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="featured-courses-grid">
          {COURSES.slice(0, 3).map((course, idx) => (
            <motion.div
              key={course.id}
              id={`featured-course-card-${course.id}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.35 }}
              className="bg-white rounded-2xl border border-emerald-950/10 shadow-md overflow-hidden hover:border-emerald-900/30 transition-all hover:shadow-lg flex flex-col h-full"
            >
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover border-b border-emerald-950/5" />
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-700 uppercase mb-2">
                    <span>{course.level}</span>
                    <span className="text-emerald-950/50">{course.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950 mb-2 leading-snug">{course.title}</h4>
                  <p className="text-sm text-emerald-950/70 font-sans leading-relaxed mb-4">{course.description}</p>
                </div>

                <div className="border-t border-emerald-950/5 pt-4 flex items-center justify-between">
                  <button
                    onClick={() => onPageChange("courses")}
                    className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 transition-colors"
                  >
                    View Curriculum
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onBookTrial}
                    className="px-4 py-2 rounded-lg bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-[11px] transition-all"
                  >
                    Enroll Free
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Syllabus Section (Inserted for absolute clarity) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="syllabus-integration-section">
        <SyllabusSection />
      </section>

      {/* 5. Why Choose Us */}
      <section className="bg-emerald-900 text-white py-20" id="why-choose-us-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-6" id="why-left-text">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest bg-emerald-800/80 px-3 py-1 rounded-full">
                Safety & Assurance
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">The Best 1-on-1 Learning Environment</h3>
              <p className="text-emerald-200/80 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
                Unlike local Islamic centers or crowded classrooms, Worldwide Quran Academy guarantees individual focused tutoring. Our classes are fully secure, recorded for quality, and supervised by senior supervisors.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4" id="why-features-grid">
                {[
                  { title: "Safe & Secure Videos", desc: "Private portals with supervisor monitoring" },
                  { title: "Customized Pace", desc: "No peer pressure, learn at student's speed" },
                  { title: "Flexible Makeup Classes", desc: "Reschedule anytime with 12 hours notice" },
                  { title: "Parent progress reports", desc: "Get detailed scorecards and logs monthly" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-emerald-200/60 font-sans mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Graphics */}
            <div className="lg:col-span-5 flex justify-center" id="why-right-graphics">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 max-w-sm w-full shadow-2xl backdrop-blur-md">
                <h4 className="text-lg font-bold text-center border-b border-white/10 pb-4">Our Teacher Accreditations</h4>
                
                {[
                  { label: "Ijazah Certified Huffaz", text: "Verified authority to teach Quranic recitation" },
                  { label: "English & Arabic Fluent", text: "Fluent communications with young students" },
                  { label: "Child Psychology Trained", text: "Specialized gentle teaching skills for kids" }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center font-bold text-emerald-300 flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-xs text-emerald-200/70 font-sans mt-0.5">{item.text}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 flex items-center justify-center gap-2 text-emerald-300 text-xs font-semibold">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  Authorized Online Quran Provider
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Parent Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="testimonials-section">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Verified Reviews
          </span>
          <h3 className="text-3xl sm:text-4xl font-bold text-emerald-950 mt-3">What Our Blessed Families Say</h3>
          <p className="text-emerald-950/60 text-sm mt-2">
            Masha'Allah, we have helped hundreds of families globally reconnect with the Holy Quran. Here is their honest feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="testimonials-cards-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} id={`testimonial-${t.id}`} className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="flex text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 stroke-amber-500" />
                  ))}
                </div>
                <p className="text-sm italic text-emerald-950/80 leading-relaxed font-sans font-medium">"{t.text}"</p>
              </div>

              <div className="border-t border-emerald-950/5 pt-4 mt-6 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-emerald-950">{t.name}</h5>
                  <p className="text-xs text-emerald-950/50">{t.location}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase bg-emerald-50 px-2.5 py-1 rounded-full">
                  {t.relation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQs Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6" id="faq-section">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h3 className="text-3xl font-bold text-emerald-950 mt-3">Frequently Asked Questions</h3>
          <p className="text-emerald-950/60 text-sm mt-2">
            Find quick answers to common questions about trials, tutors, classes, and schedules.
          </p>
        </div>

        <div className="space-y-4" id="faqs-list-wrapper">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className="bg-white border border-emerald-950/10 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex items-center justify-between w-full p-5 text-left text-emerald-950 font-bold hover:bg-slate-50/50 transition-colors"
                >
                  <span className="flex items-center gap-2.5 text-sm sm:text-base">
                    <HelpCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-emerald-700/60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-[#faf9f5]/50 border-t border-emerald-950/5"
                    >
                      <p className="p-5 text-sm text-emerald-950/70 leading-relaxed font-sans">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
