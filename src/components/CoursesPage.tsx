import React from "react";
import { BookOpen, Star, Sparkles, Check, ChevronRight, Clock, Award } from "lucide-react";
import { COURSES } from "../data";

interface CoursesPageProps {
  onBookTrial: () => void;
}

export default function CoursesPage({ onBookTrial }: CoursesPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16" id="coursespage-container">
      
      {/* Header text */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
          Academic Catalog
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-sans tracking-tight">
          Explore Our Specialized Quranic Courses
        </h2>
        <p className="text-emerald-950/60 text-sm leading-relaxed font-sans">
          We offer private, structured, and customized 1-to-1 programs. All materials are provided digitally inside your student classroom portal.
        </p>
      </div>

      {/* Courses List */}
      <div className="space-y-12" id="courses-extended-list">
        {COURSES.map((course, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={course.id}
              id={`extended-course-row-${course.id}`}
              className={`flex flex-col lg:flex-row gap-12 items-center bg-white border border-emerald-950/10 rounded-2xl p-6 sm:p-10 shadow-md ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Image side */}
              <div className="w-full lg:w-1/2 relative" id={`extended-course-img-${course.id}`}>
                <div className="absolute inset-0 bg-emerald-950/10 rounded-xl rotate-1.5 scale-102" />
                <img
                  src={course.image}
                  alt={course.title}
                  className="relative rounded-xl shadow-md w-full object-cover aspect-[4/3] border border-emerald-950/5"
                />
              </div>

              {/* Text side */}
              <div className="w-full lg:w-1/2 space-y-5" id={`extended-course-text-${course.id}`}>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg text-xs uppercase tracking-wider">
                    {course.level}
                  </span>
                  <span className="text-xs font-semibold text-emerald-950/50 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-emerald-950 leading-tight">
                  {course.title}
                </h3>

                <p className="text-sm sm:text-base text-emerald-950/70 leading-relaxed font-sans">
                  {course.description}
                </p>

                {/* Features list */}
                <div className="space-y-2.5 pt-2" id="extended-course-bullets">
                  <span className="text-xs font-bold text-emerald-950/40 uppercase tracking-widest block">What you will learn:</span>
                  <ul className="space-y-2 text-sm text-emerald-950/80 font-sans">
                    {course.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trial CTA button */}
                <div className="pt-4 flex flex-wrap gap-4">
                  <button
                    onClick={onBookTrial}
                    className="px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-white font-bold text-xs transition-all shadow cursor-pointer active:scale-97"
                  >
                    Book 3-Day Free Trial
                  </button>
                  <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Completion Certificate Included</span>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>
      
    </div>
  );
}
