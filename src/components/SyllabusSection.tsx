import React, { useState } from "react";
import { BookOpen, Award, CheckCircle, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SyllabusLevel {
  step: string;
  title: string;
  description: string;
  duration: string;
  outcomes: string[];
}

const NOORANI_SYLLABUS: SyllabusLevel[] = [
  {
    step: "Level 1",
    title: "Arabic Alphabets & Phonetics",
    description: "Learn basic shapes of individual letters, correct mouth coordinates, and makhraj sound articulation.",
    duration: "1 - 2 Months",
    outcomes: ["Distinguish shapes of letters in starting/middle/ending positions", "Pronounce hard and soft letters correctly", "Master Arabic vowels (Fatha, Kasra, Damma)"]
  },
  {
    step: "Level 2",
    title: "Joining Letters & Vowel Extensions",
    description: "Master compounds, joints, stretching symbols, tanween (double vowel marks), and silent letters.",
    duration: "1 - 2 Months",
    outcomes: ["Read joined words fluently and smoothly", "Understand stretching length rules (Harakaat/Madd)", "Apply throat-sound stops properly"]
  },
  {
    step: "Level 3",
    title: "Basic Tajweed Regulations",
    description: "Introductory rules of recitation, including Sukoon, Shaddah, and rules of Noon/Meem Sakinah.",
    duration: "1 - 2 Months",
    outcomes: ["Apply vibration sound (Qalqalah) correctly", "Master basic nasal sounds (Ghunnah)", "Recite short Quranic verses without spelling aid"]
  }
];

const MADNI_SYLLABUS: SyllabusLevel[] = [
  {
    step: "Level 1",
    title: "Arabic Alphabets & Makharij",
    description: "Detailed study of individual Arabic letters with correct articulation and pronunciation rules.",
    duration: "1 - 2 Months",
    outcomes: ["Correct pronunciation of individual letters", "Distinguish thick and thin letter sounds", "Identify letters in starting, middle, and ending forms"]
  },
  {
    step: "Level 2",
    title: "Vowels, Joints, & Tanween",
    description: "Mastering joined letters, short vowels (Zabar, Zer, Pesh), and double vowels (Tanween).",
    duration: "1 - 2 Months",
    outcomes: ["Read joined Arabic words with confidence", "Apply short vowel sounds accurately", "Recognize and pronounce Tanween letters properly"]
  },
  {
    step: "Level 3",
    title: "Madd, Sukoon, & Shaddah",
    description: "In-depth practice of elongation signs, silent letters (Sukoon), and double-emphasized letters (Shaddah).",
    duration: "1 - 2 Months",
    outcomes: ["Practice elongation (Madd) according to standard duration rules", "Understand and apply the resting sound (Sukoon)", "Master the linking of letters using Shaddah"]
  }
];

const IQRA_SYLLABUS: SyllabusLevel[] = [
  {
    step: "Level 1",
    title: "Iqra Books 1 - 2: Phonics Foundation",
    description: "Phonetic approach to letter identification, simple vowel attachments, and sound blends.",
    duration: "1 - 1.5 Months",
    outcomes: ["Pronounce basic vowel endings cleanly", "Immediate word recognition without spelling letter-by-letter", "Form clear Arabic phonics base"]
  },
  {
    step: "Level 2",
    title: "Iqra Books 3 - 4: Madd & Tanween",
    description: "Transitioning to longer words, stretching markers, sukoon, and doubling letter sounds.",
    duration: "1 - 1.5 Months",
    outcomes: ["Apply elongation (Madd) variations cleanly", "Perfect pronunciation of sukoon and double vowel rules", "Gain pacing and steady breath control"]
  },
  {
    step: "Level 3",
    title: "Iqra Books 5 - 6: Shaddah & Waqf",
    description: "Advanced reading mechanics including the rules of stopping, and full verse pronunciation.",
    duration: "1 - 1.5 Months",
    outcomes: ["Proper connection of letters using Shaddah", "Understand stops (Waqf) and breathing transitions", "Fluency to recite full Quranic sentences"]
  }
];

const TAJWEED_SYLLABUS: SyllabusLevel[] = [
  {
    step: "Level 1",
    title: "Standard Tajweed Mastery",
    description: "Detailed study and practice of practical recitation laws, makharij points, and characteristics.",
    duration: "3 - 4 Months",
    outcomes: ["Full control over throat, tongue, and lip exit points", "Differentiate heavy letters (Tafkheem) vs light (Tarqeeq)", "Perfect elongation rules (Madd variations)"]
  },
  {
    step: "Level 2",
    title: "Fluency & Rhythmical Stops",
    description: "Focus on continuous reading, breath management, beautiful tones, and rules of stop/start signs.",
    duration: "3 - 4 Months",
    outcomes: ["Know when to stop (Waqf) or continue (Wasl) without breaking the sentence", "Recite in classical Arabic rhythms", "Recognize and correct minor and major mistakes dynamically"]
  }
];

export default function SyllabusSection() {
  const [activeTab, setActiveTab] = useState<"noorani" | "madni" | "iqra" | "tajweed">("noorani");
  
  const getSyllabus = () => {
    switch (activeTab) {
      case "madni": return MADNI_SYLLABUS;
      case "iqra": return IQRA_SYLLABUS;
      case "tajweed": return TAJWEED_SYLLABUS;
      default: return NOORANI_SYLLABUS;
    }
  };

  const syllabus = getSyllabus();

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-lg p-6 sm:p-8" id="syllabus-section-wrapper">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center border-b border-emerald-950/5 pb-6 mb-8 gap-6">
        <div className="max-w-xl">
          <h3 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-700" />
            Standard Academic Course Syllabus
          </h3>
          <p className="text-sm text-emerald-950/60 mt-1">
            We follow a structured progression system. Choose a syllabus below to see our level-by-level curriculum.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 md:grid-cols-4 bg-emerald-50 rounded-xl p-1 w-full xl:w-auto gap-1" id="syllabus-tab-controls">
          <button
            id="syllabus-tab-noorani"
            onClick={() => setActiveTab("noorani")}
            className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === "noorani"
                ? "bg-emerald-900 text-white shadow"
                : "text-emerald-950/60 hover:text-emerald-900"
            }`}
          >
            Noorani Qaida
          </button>
          <button
            id="syllabus-tab-madni"
            onClick={() => setActiveTab("madni")}
            className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === "madni"
                ? "bg-emerald-900 text-white shadow"
                : "text-emerald-950/60 hover:text-emerald-900"
            }`}
          >
            Madni Qaida
          </button>
          <button
            id="syllabus-tab-iqra"
            onClick={() => setActiveTab("iqra")}
            className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === "iqra"
                ? "bg-emerald-900 text-white shadow"
                : "text-emerald-950/60 hover:text-emerald-900"
            }`}
          >
            Iqra Book
          </button>
          <button
            id="syllabus-tab-tajweed"
            onClick={() => setActiveTab("tajweed")}
            className={`px-3 py-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
              activeTab === "tajweed"
                ? "bg-emerald-900 text-white shadow"
                : "text-emerald-950/60 hover:text-emerald-900"
            }`}
          >
            Quran Tajweed
          </button>
        </div>
      </div>

      {/* Syllabus levels cards list */}
      <div className="space-y-6" id="syllabus-cards-list">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {syllabus.map((lvl, index) => (
              <div
                key={lvl.step}
                id={`syllabus-step-card-${lvl.step.replace(/\s+/g, '-').toLowerCase()}`}
                className="flex flex-col lg:flex-row gap-6 p-6 rounded-xl border border-emerald-950/5 bg-slate-50/50 hover:bg-white hover:border-emerald-900/10 transition-all shadow-sm"
              >
                {/* Step badge column */}
                <div className="lg:w-1/4 flex-shrink-0" id="syllabus-lvl-badge-col">
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg text-xs uppercase tracking-wider mb-2">
                    {lvl.step}
                  </span>
                  <p className="text-xs font-semibold text-emerald-950/50 flex items-center gap-1.5 mt-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Est: {lvl.duration}
                  </p>
                </div>

                {/* Details column */}
                <div className="flex-grow space-y-3" id="syllabus-lvl-details-col">
                  <h4 className="text-lg font-bold text-emerald-950">{lvl.title}</h4>
                  <p className="text-sm text-emerald-950/70 leading-relaxed font-sans">{lvl.description}</p>
                  
                  {/* Outcomes checklist */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-950/40 block mb-2">Key Learning Outcomes:</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {lvl.outcomes.map((outcome, oIdx) => (
                        <li key={oIdx} className="flex items-start gap-2 text-emerald-950/80 font-sans">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Ribbon decoration */}
                <div className="hidden lg:flex items-center justify-end w-12 text-emerald-700/20" id="syllabus-lvl-decoration">
                  <Award className="w-7 h-7" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
