import { useState, useEffect } from "react";
import { PricingPlan, LanguageMode } from "../types";
import { 
  Check, Percent, Sparkles, BookOpen, Mic, Award, 
  Globe, Smile, MessageCircle, ArrowRight, ShieldCheck, 
  Clock, Heart, Star, Crown, Layers, Calendar
} from "lucide-react";

interface PricingSectionProps {
  plans: PricingPlan[];
  lang: LanguageMode;
  onSelectPlan: (daysPerWeek: number) => void;
}

interface PlanItem {
  id: string;
  daysPerWeek: number;
  classesPerMonth?: number;
  priceUSD: number;
  badge: { en: string; ur: string; roman: string };
  isPopularPlan?: boolean;
  isWeekend?: boolean;
  isCustom?: boolean;
  features: {
    en: string[];
    ur: string[];
    roman: string[];
  };
}

interface CoursePricing {
  title: { en: string; ur: string; roman: string };
  subtitle: { en: string; ur: string; roman: string };
  isPopular?: boolean;
  icon: any;
  plans: PlanItem[];
}

export default function PricingSection({ plans, lang, onSelectPlan }: PricingSectionProps) {
  // Course selection tabs:
  const [activeTab, setActiveTab] = useState<string>("qaida");

  // Read saved config from localStorage to get live WhatsApp number if customized, else default to +923345750157
  const [activeWhatsapp, setActiveWhatsapp] = useState<string>("+92 334 5750157");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("quran_academy_config");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.phone) {
          setActiveWhatsapp(parsed.phone);
        } else if (parsed.whatsapp) {
          setActiveWhatsapp(parsed.whatsapp);
        }
      }
    } catch (e) {
      console.error("Failed to load active WhatsApp from localStorage", e);
    }
  }, []);

  const coursesPricingData: Record<string, CoursePricing> = {
    qaida: {
      title: {
        en: "Noorani Qaida & Quran Nazra",
        ur: "نورانی قاعدہ اور ناظرہ قرآن",
        roman: "Noorani Qaida & Quran Nazra"
      },
      subtitle: {
        en: "Highly recommended for kids and absolute beginners.",
        ur: "بچوں اور بنیادی سیکھنے والوں کے لیے سب سے بہترین کورس۔",
        roman: "Bacho aur shuruat krne walo k liye nihayat zaroori."
      },
      isPopular: true,
      icon: BookOpen,
      plans: [
        {
          id: "qaida-2",
          daysPerWeek: 2,
          classesPerMonth: 8,
          priceUSD: 30,
          badge: { en: "Starter Pack", ur: "مبتدی پیک", roman: "Starter Pack" },
          features: {
            en: ["2 Classes Per Week (8 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Basic Qaida Phonics Included"],
            ur: ["ہفتے میں 2 کلاسیں (8 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند مرد و خواتین اساتذہ", "بنیادی قاعدہ تجوید کے ساتھ"],
            roman: ["2 Classes Per Week (8 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Basic Qaida Phonics Included"]
          }
        },
        {
          id: "qaida-3",
          daysPerWeek: 3,
          classesPerMonth: 12,
          priceUSD: 40,
          badge: { en: "Most Popular", ur: "سب سے مقبول", roman: "Most Popular" },
          isPopularPlan: true,
          features: {
            en: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Monthly Progress Reports", "Noorani Qaida & Nazra Quran"],
            ur: ["ہفتے میں 3 کلاسیں (12 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند مرد و خواتین اساتذہ", "ماہانہ کارکردگی رپورٹ", "نورانی قاعدہ وہ ناظرہ تلاوت"],
            roman: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Monthly Progress Reports", "Noorani Qaida & Nazra Quran"]
          }
        },
        {
          id: "qaida-5",
          daysPerWeek: 5,
          classesPerMonth: 20,
          priceUSD: 60,
          badge: { en: "Intensive", ur: "تیز رفتار ترقی", roman: "Intensive" },
          features: {
            en: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Rapid Syllabus Progression", "Customized Revision Sheets"],
            ur: ["ہفتے میں 5 کلاسیں (20 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند مرد و خواتین اساتذہ", "تیز ترین نصابی ترقی", "خصوصی دہرائی کے طریقے"],
            roman: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Rapid Syllabus Progression", "Customized Revision Sheets"]
          }
        },
        {
          id: "qaida-weekend",
          daysPerWeek: 2,
          classesPerMonth: 8,
          priceUSD: 35,
          badge: { en: "Weekend Special", ur: "ہفتہ وار کلاسز", roman: "Weekend Special" },
          isWeekend: true,
          features: {
            en: ["Saturday & Sunday Only", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Flexible Weekend Timings", "Tajweed & Qaida Revision"],
            ur: ["صرف ہفتہ اور اتوار کلاسز", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند مرد و خواتین اساتذہ", "ہفتہ وار لچکدار اوقات", "تجوید و قاعدہ فہم"],
            roman: ["Saturday & Sunday Only", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Flexible Weekend Timings", "Tajweed & Qaida Revision"]
          }
        }
      ]
    },
    tajweed: {
      title: {
        en: "Quran Recitation with Tajweed",
        ur: "تجوید القرآن کورس",
        roman: "Quran with Tajweed"
      },
      subtitle: {
        en: "Perfect your recitation with precise Arabic accent & stop signs.",
        ur: "عربی مخارج، مد اور وقف کے قواعد کے ساتھ قرآن کی تلاوت درست کریں۔",
        roman: "Arabic Makharij, Madd aur Waqf rules k sath tilaawat darust krein."
      },
      icon: Mic,
      plans: [
        {
          id: "tajweed-2",
          daysPerWeek: 2,
          classesPerMonth: 8,
          priceUSD: 35,
          badge: { en: "Standard", ur: "معیاری پیک", roman: "Standard" },
          features: {
            en: ["2 Classes Per Week (8 Monthly)", "30 Mins Live Lessons", "1-on-1 Personal Care", "Certified Tutors", "Makharij & Accent Correction", "Rules of Noon/Meem Sakinah"],
            ur: ["ہفتے میں 2 کلاسیں (8 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند اساتذہ", "مخارج اور لہجے کی تصحیح", "نون اور میم ساکن کے قواعد"],
            roman: ["2 Classes Per Week (8 Monthly)", "30 Mins Live Lessons", "1-on-1 Personal Care", "Certified Tutors", "Makharij & Accent Correction", "Rules of Noon/Meem Sakinah"]
          }
        },
        {
          id: "tajweed-3",
          daysPerWeek: 3,
          classesPerMonth: 12,
          priceUSD: 50,
          badge: { en: "Best Progress", ur: "شاندار انتخاب", roman: "Best Progress" },
          isPopularPlan: true,
          features: {
            en: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Beautiful Recitation (Tarteel)", "Basic Islamic Morals Included"],
            ur: ["ہفتے میں 3 کلاسیں (12 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند مرد و خواتین اساتذہ", "حسنِ قرائت اور ترتیل کی مشق", "بنیادی اسلامی تعلیمات شامل"],
            roman: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Beautiful Recitation (Tarteel)", "Basic Islamic Morals Included"]
          }
        },
        {
          id: "tajweed-5",
          daysPerWeek: 5,
          classesPerMonth: 20,
          priceUSD: 70,
          badge: { en: "Fluency Pro", ur: "روانی پرو", roman: "Fluency Pro" },
          features: {
            en: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Full Tarteel & Fluency Practice", "Certification Pathway Assessment"],
            ur: ["ہفتے میں 5 کلاسیں (20 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 توجہ", "مستند مرد و خواتین اساتذہ", "روانی کے ساتھ مکمل مشق", "سرٹیفکیٹ کی تیاری کا ٹیسٹ"],
            roman: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Personalized Care", "Certified Male/Female Tutors", "Full Tarteel & Fluency Practice", "Certification Pathway Assessment"]
          }
        }
      ]
    },
    hifz: {
      title: {
        en: "Quran Memorization (Hifz)",
        ur: "حفظِ قرآن مجید",
        roman: "Quran Memorization (Hifz)"
      },
      subtitle: {
        en: "Commit the holy Quran to your heart with structured lessons.",
        ur: "ایک منظم منزل، سبق اور سبقہ کے جدول کے ساتھ قرآن حفظ کیجئے۔",
        roman: "Ek behtareen schedule ke zariye Quran dil me mehfooz krein."
      },
      icon: Award,
      plans: [
        {
          id: "hifz-3",
          daysPerWeek: 3,
          classesPerMonth: 12,
          priceUSD: 60,
          badge: { en: "Hifz Basic", ur: "بنیادی حفظ", roman: "Hifz Basic" },
          features: {
            en: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Specialized Huffaz", "Personalized Memorization Plan", "Surah Memorization Tracker", "Daily revision of Sabqi portion"],
            ur: ["ہفتے میں 3 کلاسیں (12 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 حافظ استاد", "خصوصی حفظ پلان", "سورتوں کا ٹریکر", "روزانہ سبقی حصے کی دہرائی"],
            roman: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Specialized Huffaz", "Personalized Memorization Plan", "Surah Memorization Tracker", "Daily revision of Sabqi portion"]
          }
        },
        {
          id: "hifz-5",
          daysPerWeek: 5,
          classesPerMonth: 20,
          priceUSD: 90,
          badge: { en: "Full Hifz Track", ur: "مکمل منزل ٹریک", roman: "Full Hifz Track" },
          isPopularPlan: true,
          features: {
            en: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Specialized Huffaz", "Rigorous revision schedule", "Sabaq, Sabqi & Manzil tracking", "Quran recitation voice training"],
            ur: ["ہفتے میں 5 کلاسیں (20 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی 1-on-1 حافظ استاد", "سخت دہرائی کا نظام", "سبق، سبقہ اور منزل کی مشق", "خوبصورت قرائت کی زبردست مشق"],
            roman: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Specialized Huffaz", "Rigorous revision schedule", "Sabaq, Sabqi & Manzil tracking", "Quran recitation voice training"]
          }
        }
      ]
    },
    translation: {
      title: {
        en: "Translation & Islamic Studies",
        ur: "قرآن ترجمہ و اسلامی تعلیمی کورس",
        roman: "Quran Translation & Islamic Studies"
      },
      subtitle: {
        en: "Learn word-by-word Arabic translation, tafseer, and deeni values.",
        ur: "عربی زبان کے گرامر، الفاظ کے معانی، آیات کی تفسیر اور اسلامی طرزِ زندگی سیکھیں۔",
        roman: "Arabic vocabulary, Translation, Tafseer aur Islamic rules seekhein."
      },
      icon: Globe,
      plans: [
        {
          id: "trans-2",
          daysPerWeek: 2,
          classesPerMonth: 8,
          priceUSD: 40,
          badge: { en: "Standard", ur: "معیاری", roman: "Standard" },
          features: {
            en: ["2 Classes Per Week (8 Monthly)", "30 Mins Live Lessons", "1-on-1 Islamic Scholars", "Word-for-Word translation", "Basic Quranic grammar", "Practical rules for life"],
            ur: ["ہفتے میں 2 کلاسیں (8 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی علمائے دین اساتذہ", "لفظ بہ لفظ آسان ترجمہ", "بنیادی قرآنی گرامر", "عملی زندگی کے قرآنی آداب"],
            roman: ["2 Classes Per Week (8 Monthly)", "30 Mins Live Lessons", "1-on-1 Islamic Scholars", "Word-for-Word translation", "Basic Quranic grammar", "Practical rules for life"]
          }
        },
        {
          id: "trans-3",
          daysPerWeek: 3,
          classesPerMonth: 12,
          priceUSD: 55,
          badge: { en: "Alim Student", ur: "ترجیحی انتخاب", roman: "Alim Student" },
          isPopularPlan: true,
          features: {
            en: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Scholar Tutors", "Historical details of revelation", "Intermediate Arabic syntax", "Tafseer of selected Surahs"],
            ur: ["ہفتے میں 3 کلاسیں (12 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی عالمِ دین استاد", "شانِ نزول اور تاریخی پس منظر", "درمیانی عربی گرامر کی کتب", "منتخب سورتوں کی تفسیر"],
            roman: ["3 Classes Per Week (12 Monthly)", "30 Mins Live Lessons", "1-on-1 Scholar Tutors", "Historical details of revelation", "Intermediate Arabic syntax", "Tafseer of selected Surahs"]
          }
        },
        {
          id: "trans-5",
          daysPerWeek: 5,
          classesPerMonth: 20,
          priceUSD: 75,
          badge: { en: "Comprehensive", ur: "جامع عالم کورس", roman: "Comprehensive" },
          features: {
            en: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Scholar Tutors", "Deep theological evaluation", "Seerah of Prophet (PBUH) in-depth", "Ahadith studies & Hadith selection"],
            ur: ["ہفتے میں 5 کلاسیں (20 ماہانہ)", "30 منٹ لائیو فیس ٹو فیس", "انفرادی عالمِ دین استاد", "عقائد، فقہ اور گہری فہم", "سیرتِ رسول کا تفصیلی نصاب", "منتخب احادیثِ مبارکہ کا دورہ"],
            roman: ["5 Classes Per Week (20 Monthly)", "30 Mins Live Lessons", "1-on-1 Scholar Tutors", "Deep theological evaluation", "Seerah of Prophet (PBUH) in-depth", "Ahadith studies & Hadith selection"]
          }
        }
      ]
    },
    kids: {
      title: {
        en: "Kids Islamic Studies Program",
        ur: "بچوں کا اسلامی تربیتی پروگرام",
        roman: "Kids Islamic Studies Program"
      },
      subtitle: {
        en: "A beautiful, interactive foundation course designed for young Muslims abroad.",
        ur: "بیرونِ ملک مقیم مسلمان بچوں کے لیے شاندار اسلامی عقائد اور آداب پر مشتمل نصاب۔",
        roman: "Bahar k mulko me rehne wale bacho k liye elegant islamic manners course."
      },
      icon: Smile,
      plans: [
        {
          id: "kids-flat",
          daysPerWeek: 2,
          classesPerMonth: 8,
          priceUSD: 35,
          badge: { en: "All-In-One Kids", ur: "بچوں کا مکمل پیکج", roman: "All-in-One Kids" },
          isPopularPlan: true,
          features: {
            en: [
              "Duas (Daily Musnoon Supplications)",
              "Kalmas (Six Kalimas with translation)",
              "Salah (Step-by-step Wudu & Prayer method)",
              "Islamic Manners & Social Etiquettes",
              "Seerah for Kids (Stories of Prophets)",
              "1-on-1 Highly patient friendly teachers",
              "Interactive games & quiz sheets"
            ],
            ur: [
              "مسنون دعائیں (روزمرہ سونے جاگنے کھانے کی دعائیں)",
              "کلمے (چھ کلمے ترتیل اور ترجمہ کے ساتھ)",
              "وضو اور نماز (نماز کی عملی مشق)",
              "اسلامی آداب اخلاقیات اور اخلاقِ حسنہ",
              "بچوں کے لیے سیرت نبویؐ اور انبیاء کے سچے قصے",
              "1-on-1 شفیق اور مہربان معلمین",
              "دلچسپ کوئز اور اسلامی کھیل"
            ],
            roman: [
              "Duas (Essential daily supplications)",
              "Kalmas (6 Kalimas with Translation)",
              "Salah (Perfect step-by-step Wudu & Prayer)",
              "Islamic Manners (Greetings, respect & habits)",
              "Seerah for Kids (Interacting histories & stories)",
              "1-on-1 Highly patient friendly scholars",
              "Interactive monthly quizzes"
            ]
          }
        }
      ]
    },
    custom: {
      title: {
        en: "Custom Packages & Family Discounts",
        ur: "خصوصی ڈسکاؤنٹ اور کسٹم پیکجز",
        roman: "Custom Packages & Family Discounts"
      },
      subtitle: {
        en: "We offer amazing sibling benefits to support households with multiple children.",
        ur: "ایک سے زائد بچوں والی فیملیز کے لیے ہمارا اکیڈمی کا خصوصی فیملی رعایتی نظام۔",
        roman: "Multiple kids k liye amazing sibling bundles available hain."
      },
      icon: Sparkles,
      plans: [
        {
          id: "custom-sibling",
          daysPerWeek: 0,
          priceUSD: 0,
          isCustom: true,
          badge: { en: "Best Sibling Package", ur: "خصوصی خاندانی پیکیج", roman: "Best Sibling Discount" },
          isPopularPlan: true,
          features: {
            en: [
              "Family Discount Available for everyone",
              "Multiple Siblings Discount (Up to 15% off!)",
              "Customized One-to-One Plans",
              "Choose your own classes days and duration",
              "Get a completely free coordinator consultation",
              "Contact on WhatsApp for Custom Pricing"
            ],
            ur: [
              "تمام طلباء کے لیے فیملی ڈسکاؤنٹ دستیاب ہے",
              "بہن بھائیوں کے لیے خصوصی رعایت (15 فیصد تک فیس معاف)",
              "مرضی کے مطابق ون آن ون شیڈول",
              "کلاس کے دن اور وقت کا مکمل اپنی مرضی کا اختیار",
              "کوارڈینیٹر سے بالکل مفت رہنمائی کریں",
              "خصوصی معقول فیس پیکج کسٹمائز کروانے کے لیے واٹس ایپ پر آئیں"
            ],
            roman: [
              "Family Discount Available for families",
              "Multiple Siblings Discount (Up to 15% off!)",
              "Customized One-to-One Plans",
              "Choose your own classes days and duration",
              "Direct coordinator consultation completely free",
              "Contact on WhatsApp for Custom Pricing"
            ]
          }
        }
      ]
    }
  };

  const getWhatsappLinkForPlan = (courseTitle: string, planTitle: string, price: number, isCustom?: boolean) => {
    let whatsappNum = activeWhatsapp.replace(/\D/g, "");
    if (!whatsappNum) whatsappNum = "923345750157";
    
    const pText = isCustom ? "custom fee quote" : `$${price}/month plan`;
    const textMsg = encodeURIComponent(
      `Assalamoalaikum Worldwide Quran Academy, I am visiting your website and I would like to book a free 3-Day trial class for:\n- Course: "${courseTitle}"\n- Plan: "${planTitle}" (${pText})\n\nPlease guide me about available schedules.`
    );
    return `https://wa.me/${whatsappNum}?text=${textMsg}`;
  };

  const handleSelectPlanAction = (days: number) => {
    const elem = document.getElementById("trial-booking-section");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
    // Triggers the selected days in App.tsx
    onSelectPlan(days);
  };

  const getActiveTabHeader = () => {
    const act = coursesPricingData[activeTab];
    if (!act) return { title: "", subtitle: "", isPopular: false };
    return {
      title: act.title[lang],
      subtitle: act.subtitle[lang],
      isPopular: act.isPopular
    };
  };

  const currentHeader = getActiveTabHeader();

  const headings = {
    premiumTitle: {
      en: "Select Your Premium Plan",
      ur: "اپنا بہترین پیکیج منتخب کریں",
      roman: "Apna Premium Plan Select Krein"
    },
    premiumDesc: {
      en: "Transparent, simple, and affordable monthly plans with no hidden charges. All packages include a 3-Day free trial to experience the quality.",
      ur: "بغیر کسی پوشیدہ چارجز کے انتہائی مناسب فیس شیڈول۔ تمام پیکجز میں مستقل کلاس شروع کرنے سے قبل 3 دن کی مفت لائیو ٹرائل کلاس شامل ہے۔",
      roman: "Bina kisi hidden charges k behtareen monthly plans. Har package me experience k liye 3-Day free trial classes shamil hain."
    },
    popularBadgeText: {
      en: "MOST POPULAR",
      ur: "طالب علموں کا ترجیح",
      roman: "MOST POPULAR"
    },
    trialBtnText: {
      en: "Book 3-Day Free Trial",
      ur: "3 دن کا مفت ٹرائل رجسٹریشن",
      roman: "Book 3-Day Free Trial"
    },
    whatsappText: {
      en: "Contact on WhatsApp",
      ur: "واٹس ایپ پر رابطہ",
      roman: "Contact on WhatsApp"
    },
    guaranteeText: {
      en: "★ All students receive one-to-one live classes and monthly progress reports.",
      ur: "★ تمام طلباء کو 1-on-1 براہِ راست انفرادی کلاسز دی جاتی ہیں اور ماہانہ کارکردگی کارڈز والدین کو ارسال کئے جاتے ہیں۔",
      roman: "★ All students receive one-to-one live classes and monthly progress reports."
    },
    billingText: {
      en: "month",
      ur: "ماہانہ",
      roman: "month"
    },
    weekendBadge: {
      en: "WEEKEND ONLY",
      ur: "صرف ہفتہ وار",
      roman: "WEEKEND ONLY"
    },
    customPriceText: {
      en: "Custom Plan",
      ur: "مرضی کا پیکیج",
      roman: "Custom Pricing"
    }
  };

  const activeCourseData = coursesPricingData[activeTab];

  return (
    <section 
      id="pricing-section" 
      className="py-20 bg-white border-b border-slate-100 scroll-mt-20 relative"
    >
      {/* Light subtle golden/emerald background highlights */}
      <div className="absolute top-1/4 left-0 w-2/3 h-96 bg-gradient-to-r from-emerald-500/[0.015] to-transparent pointer-events-none rounded-r-3xl" />
      <div className="absolute bottom-10 right-0 w-1/3 h-96 bg-gradient-to-l from-amber-400/[0.015] to-transparent pointer-events-none rounded-l-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Brand Emerald and Gold accoutrements */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 shadow-3xs mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400 animate-pulse" />
            <span>{lang === "en" ? "Affordable & Fair Packages" : lang === "ur" ? "مناسب فیس پیکجز" : "Fair Fees Packages"}</span>
          </span>
          <h2 className="text-3xl md:text-4.5xl font-serif font-extrabold text-slate-900 tracking-tight">
            {headings.premiumTitle[lang]}
          </h2>
          <p className="mt-4 text-slate-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
            {headings.premiumDesc[lang]}
          </p>
          
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-emerald-600 rounded-full" />
            <div className="w-4 h-4 rotate-45 border-2 border-emerald-600 bg-white shadow-3xs flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-amber-500" />
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-emerald-650 rounded-full" />
          </div>
        </div>

        {/* 1. SEAMLESS DYNAMIC TAB SWITCHER */}
        <div id="course-pricing-selector-tabs" className="mb-12">
          <div className="flex justify-center flex-wrap gap-2.5 max-w-5xl mx-auto p-2.5 bg-slate-50/80 border border-slate-200/80 rounded-2xl md:rounded-3xl shadow-3xs">
            {Object.entries(coursesPricingData).map(([key, course]) => {
              const IconComp = course.icon;
              const isActive = activeTab === key;
              const isQaida = key === "qaida";
              
              return (
                <button
                  key={key}
                  type="button"
                  id={`tab-pricing-${key}`}
                  onClick={() => setActiveTab(key)}
                  className={`relative flex items-center gap-2 px-4.5 py-3 rounded-xl md:rounded-2xl text-xs font-bold transition-all duration-300 transform select-none cursor-pointer ${
                    isActive 
                      ? "bg-emerald-700 text-white shadow-md border border-emerald-650 scale-102" 
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200/80 shadow-3xs"
                  }`}
                >
                  <IconComp className={`w-4 h-4 ${isActive ? "text-amber-300" : "text-emerald-700"}`} />
                  <span>{course.title[lang].split("&")[0].split("(")[0]}</span>
                  
                  {/* Highlighting Noorani Qaida & Nazra as popular internally */}
                  {isQaida && (
                    <span className={`absolute -top-2.5 -right-1 flex items-center gap-0.5 px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-full shadow-3xs border transition-all ${
                      isActive 
                        ? "bg-amber-400 text-emerald-950 border-amber-300 animate-bounce" 
                        : "bg-emerald-50 text-emerald-900 border-emerald-100"
                    }`}>
                      <Crown className="w-2 h-2 text-amber-600 fill-amber-500" />
                      {headings.popularBadgeText[lang].split(" ")[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Course Header Indicator */}
        <div className="text-center max-w-2xl mx-auto mb-10 pb-6 border-b border-slate-100">
          <div className="flex items-center justify-center gap-1.5 text-amber-600 mb-1">
            {currentHeader.isPopular && (
              <span className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest text-amber-850">
                <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>★ {headings.popularBadgeText[lang]} ★</span>
              </span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-slate-850">
            {activeCourseData.title[lang]}
          </h3>
          <p className="text-xs md:text-sm text-slate-550 mt-1.5 font-sans leading-relaxed">
            {activeCourseData.subtitle[lang]}
          </p>
        </div>

        {/* 2. DURATION & PLANS CARDS GRID */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(activeCourseData.plans.length, 4)} gap-8 max-w-6xl mx-auto justify-center items-stretch`}
        >
          {activeCourseData.plans.map((p) => {
            const hasPopularEffect = p.isPopularPlan;
            const weekText = lang === "en" 
              ? `${p.daysPerWeek} Classes per week` 
              : lang === "ur" 
                ? `ہفتے میں ${p.daysPerWeek} دن` 
                : `${p.daysPerWeek} Din / Haftey`;

            const cardFeatures = lang === "en" ? p.features.en : lang === "ur" ? p.features.ur : p.features.roman;

            return (
              <div
                key={p.id}
                id={`premium-price-card-${p.id}`}
                className={`flex flex-col justify-between bg-white rounded-2.5xl p-6.5 md:p-8 transition-all duration-300 relative border transform hover:scale-[1.02] ${
                  hasPopularEffect 
                    ? "border-2 border-emerald-600 shadow-xl shadow-emerald-50 pointer-events-auto" 
                    : "border-slate-200 shadow-md hover:border-emerald-600/30 hover:shadow-xl"
                }`}
              >
                {/* Popular Overlay Label */}
                {hasPopularEffect && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[9px] font-extrabold px-3.5 py-1.5 tracking-wider uppercase rounded-full shadow-sm border border-amber-300 flex items-center gap-1 select-none">
                    <Sparkles className="w-3 h-3 text-emerald-950 fill-emerald-950" />
                    <span>{headings.popularBadgeText[lang]}</span>
                  </span>
                )}

                {/* Weekend Tag overlay */}
                {p.isWeekend && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-50 text-emerald-800 text-[9px] font-extrabold px-3.5 py-1.5 tracking-wider uppercase rounded-full shadow-sm border border-emerald-150 flex items-center gap-1 select-none">
                    <Calendar className="w-3 h-3 text-emerald-700" />
                    <span>{headings.weekendBadge[lang]}</span>
                  </span>
                )}

                <div className="space-y-6">
                  
                  {/* Top Header Card */}
                  <div className="text-center pb-5 border-b border-slate-100">
                    <span className="px-3.5 py-1 bg-slate-50 border border-slate-200/60 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                      {p.badge[lang]}
                    </span>
                    
                    <h4 className="text-base font-bold text-slate-800 mt-3 font-serif uppercase tracking-tight">
                      {p.isCustom ? "Custom Sibling Package" : weekText}
                    </h4>

                    {/* Classes description */}
                    {!p.isCustom && (
                      <p className="text-[11px] text-zinc-400 font-sans tracking-wide mt-1">
                        {p.classesPerMonth} {lang === "en" ? "Classes / month" : lang === "ur" ? "کلاسز ماہانہ" : "Classes / month"} • 1-on-1 Live
                      </p>
                    )}
                  </div>

                  {/* Monthly Pricing Badge */}
                  <div className="text-center py-2">
                    {p.isCustom ? (
                      <div className="space-y-1">
                        <span className="text-3xl font-serif font-extrabold text-emerald-800 tracking-tight">
                          {headings.customPriceText[lang]}
                        </span>
                        <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                          Family Bundles
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-2xl font-bold font-mono text-emerald-700 align-super">$</span>
                        <span className="text-4.5xl sm:text-5.5xl font-serif font-bold tracking-tight text-slate-900 leading-none">
                          {p.priceUSD}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold lowercase tracking-wide">
                          /{headings.billingText[lang]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Course Features Bullets list */}
                  <div className="space-y-3 pt-2">
                    <ul className="space-y-2.5">
                      {cardFeatures.map((feat, fidx) => (
                        <li key={fidx} className="flex items-start gap-2.5 text-xs">
                          <div className="p-0.5 bg-emerald-50 text-emerald-700 rounded-full shrink-0 border border-emerald-100 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-emerald-800" />
                          </div>
                          <span className="text-slate-650 leading-tight">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Card Direct CTA Buttons (Book trial + WhatsApp support) */}
                <div className="pt-8 space-y-3">
                  
                  {/* Book Trial Primary Action */}
                  <button
                    type="button"
                    onClick={() => handleSelectPlanAction(p.daysPerWeek)}
                    className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold tracking-wider transition-all duration-250 cursor-pointer text-center text-white bg-emerald-700 hover:bg-emerald-800 hover:translate-y-[-1px] shadow-sm flex items-center justify-center gap-2 uppercase"
                  >
                    <span>{headings.trialBtnText[lang]}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </button>

                  {/* Send Direct WhatsApp Action with prefilled Plan Details */}
                  <a
                    href={getWhatsappLinkForPlan(
                      activeCourseData.title[lang], 
                      p.isCustom ? p.badge[lang] : weekText, 
                      p.priceUSD,
                      p.isCustom
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold transition-all duration-250 cursor-pointer text-center text-emerald-800 bg-white border border-emerald-200 hover:bg-emerald-50 flex items-center justify-center gap-2 shadow-3xs"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-650 fill-emerald-100 shrink-0" />
                    <span>{headings.whatsappText[lang]}</span>
                  </a>

                  {/* Required Premium Guarantee / Footnote on every card */}
                  <div className="pt-4 border-t border-slate-50 flex items-center justify-center text-center">
                    <p className="text-[10px] text-emerald-800 font-serif leading-tight max-w-xs hover:text-emerald-950 transition-colors">
                      {headings.guaranteeText[lang]}
                    </p>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
        
        {/* Absolute Footer Note under overall layout */}
        <div className="mt-14 p-5 max-w-4xl mx-auto rounded-xl bg-slate-50 border border-slate-200/70 text-center flex flex-col sm:flex-row items-center justify-center gap-3 shadow-3xs">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-full hidden sm:block border border-emerald-150 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-650 leading-relaxed font-sans">
            <strong className="font-bold text-slate-850">Academic Guarantee:</strong> Worldwide Quran Academy is completely dedicated to providing transparent online interfaces. Sibling pricing discounts apply automatically to families up to 15%. Direct coordinate matching is offered on Skype & Zoom around US, UK, Australia & Canada time zones.
          </p>
        </div>

      </div>
    </section>
  );
}
