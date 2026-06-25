import React from "react";
import { Award, BookOpen, Star, ShieldCheck, Heart, Users, GraduationCap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20" id="aboutpage-container">
      
      {/* 1. Header Banner */}
      <section className="text-center space-y-5 max-w-3xl mx-auto flex flex-col items-center" id="about-header">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
          Who We Are
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-sans tracking-tight">
          A Global Online Quran Academy Designed with Integrity
        </h2>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100/60 border border-emerald-950/5 rounded-full text-emerald-900 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Award className="w-4.5 h-4.5 text-emerald-800" />
          <span>15+ Years of Academy & Teaching Experience</span>
        </div>
        <p className="text-emerald-950/60 leading-relaxed font-sans text-sm sm:text-base text-center">
          With **over 15+ Years of experience** in online teaching and academy management, Worldwide Quran Academy was founded to bridge the gap between skilled, accredited Quranic teachers and students across the globe who deserve private, premium, and structured 1-on-1 education.
        </p>
      </section>

      {/* 2. Brand Values Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-values-grid">
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-md p-8 space-y-4" id="value-mission">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950">Strict Teacher Vetting</h3>
          <p className="text-sm text-emerald-950/70 leading-relaxed font-sans">
            Every teacher undergoes a strict 4-step selection process, verifying their Ijazah certifications, English fluency, recitation rhythm, and teaching patience before being assigned to children.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-md p-8 space-y-4" id="value-vision">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950">Our Holy Mission</h3>
          <p className="text-sm text-emerald-950/70 leading-relaxed font-sans">
            To provide high-quality, authentic, and affordable online Quran education with correct Arabic makhraj and Tajweed guidelines directly to our brothers, sisters, and kids globally.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-md p-8 space-y-4" id="value-assurance">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950">Safety First Environment</h3>
          <p className="text-sm text-emerald-950/70 leading-relaxed font-sans">
            We prioritize secure classrooms. Senior moderators supervise randomized sessions, and parent reviews are logged weekly to ensure a pleasant, supportive environment for kids.
          </p>
        </div>
      </section>

      {/* 3. Deep explanation column */}
      <section className="bg-emerald-900 rounded-3xl text-white p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" id="about-deep-row">
        <div className="space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Our Quality Guarantee</h3>
          <p className="text-sm sm:text-base text-emerald-200/80 leading-relaxed font-sans">
            Worldwide Quran Academy works non-stop to ensure standard educational outcomes. If at any point you are not satisfied with your assigned Quran tutor, we will swap tutors instantly or provide a 100% money-back guarantee of the remaining unused monthly fee.
          </p>
          <ul className="space-y-3.5 text-sm">
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Certified Al-Azhar & Pakistani Tutors</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Flexible timing changes according to requests</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Dedicated progress tracking scorecard monthly</span>
            </li>
          </ul>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-white/5 rounded-2xl rotate-2 scale-102" />
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600"
            alt="Students Learning"
            className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3] border border-white/10"
          />
        </div>
      </section>

    </div>
  );
}
