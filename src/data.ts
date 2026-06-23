import { AcademyConfig, Course, PricingPlan } from "./types";

export const initialAcademyConfig: AcademyConfig = {
  name: "Worldwide Quran Academy",
  taglineEn: "Learn Quran Online with Proper Tajweed & Translation from Certified Instructors",
  taglineUr: "گھر بیٹھے تجربہ کار اساتذہ سے تجوید و ترجمہ کے ساتھ آن لائن قرآن پاک سیکھیں",
  taglineRoman: "Ghar baithe tajarbakor asateza se Tajweed o Tarjuma k sath online Quran Seekhain",
  email: "glowwithmeenu@gmail.com",
  whatsapp: "+923345750157",
  phone: "+92 334 5750157",
  facebookUrl: "https://facebook.com",
  youtubeUrl: "https://youtube.com",
  aboutEn: "Worldwide Quran Academy is a premier online Islamic educational platform. We provide highly structured 1-on-1 Quran and Islamic studies courses for kids, adults, male, and female students globally. Our certified male and female Islamic tutors deliver custom teaching schedules designed for your convenience and pace.",
  aboutUr: "ورلڈ وائیڈ قرآن اکیڈمی ایک بہترین آن لائن اسلامی تعلیمی ادارہ ہے۔ ہم دنیا بھر کے تمام بچوں، بڑوں، مرد اور خواتین طلباء کے لیے 1-on-1 ترتیب کے ساتھ آن لائن کلاسز فراہم کرتے ہیں۔ ہمارے تجربہ کار اور سند یافتہ اساتذہ آپ کی سہولت اور وقت کے مطابق بہترین تدریس فراہم کرتے ہیں۔",
  aboutRoman: "Worldwide Quran Academy aik behtareen online Islamic educational platform hai. Hum poori dunya ke bacho, baro, mard aur khwateen talaba ke liye 1-on-1 online classes faraham karte hain. Hamare certified male aur female scholars aap ki sahulat aur waqt ke mutabiq parhate hain."
};

export const initialCourses: Course[] = [
  {
    id: "qaida",
    titleEn: "Noorani Qaida Course",
    titleUr: "نورانی قاعدہ کورس",
    titleRoman: "Noorani Qaida Course",
    descriptionEn: "Highly recommended for kids and adult beginners. Learn alphabet letters, Arabic phonics, vowel signs, and basics of Tajweed to start reading the Holly Quran correctly.",
    descriptionUr: "بچوں اور بڑوں کے لیے سب سے بنیادی اور ضروری کورس۔ حروف تہجی، عربی مخارج، اور تجوید کے بنیادی اصول سیکھیں تاکہ آپ صحت کے ساتھ قرآن پڑھنا شروع کر سکیں ۔",
    descriptionRoman: "Bacho aur baro ke liye bunyadi aur zaroori course. Huroof-e-tahajji, Arabic makharij, aur tajweed ke bunyadi qawaneen seekhain ta ke aap theek se Quran shareef parhna shuru kr sakain.",
    featuresEn: ["Basic Arabic Alphabet Letters", "Pronunciation (Makharij)", "Joint Letter Recognition", "Basic Tajweed Rules"],
    featuresUr: ["بنیادی عربی حروفِ تہجی", "صحیح مخارج کی مشق", "حروف کے جوڑ اور حرکات", "بنیادی تجوید کے قواعد"],
    featuresRoman: ["Bunyadi Arabic Alphabet", "Sahi Makharij ki practice", "Huroof ke jorh aur Harkat", "Basic Tajweed ke rules"],
    iconName: "BookOpen",
    recommendedAge: "4+ Years"
  },
  {
    id: "tajweed",
    titleEn: "Quran Recitation with Tajweed",
    titleUr: "تجوید کے ساتھ قرآن ناظرہ",
    titleRoman: "Quran Recitation with Tajweed",
    descriptionEn: "Master reading the Quran with fluenty and professional pronunciation. Study key rules like Noon Sakinah, Meem Sakinah, Maddah, and proper pause signs.",
    descriptionUr: "روانی اور خوبصورت لہجے میں درست قواعد کے ساتھ قرآن پاک پڑھنا سیکھیں۔ نون ساکن، میم ساکن، مد اور وقف کے تمام قوانین کا تفصیلی مطالعہ کریں۔",
    descriptionRoman: "Rawani aur khubsurat lehje me sahi rules k sath Quran pak parhna seekhein. Noon Sakinah, Meem Sakinah, Madd aur Waqf ke rules details k sath seekhein.",
    featuresEn: ["Fluent Quran Reading", "Makharij Correction", "Tarteel Recitation Practice", "Rules of Stop & Pause"],
    featuresUr: ["قرآن پاک کی روانی سے تلاوت", "مخارج کی درستی", "ترتیل اور خوبصورت لہجے کی مشق", "وقف و مڈ کے اصول"],
    featuresRoman: ["Fluent Quran Recitation", "Makharij Corection", "Tarteel aur beautiful tone practice", "Waqf aur Madd ke rules"],
    iconName: "Mic",
    recommendedAge: "6+ Years"
  },
  {
    id: "hifz",
    titleEn: "Quran Memorization (Hifz)",
    titleUr: "حفظِ قرآن کریم",
    titleRoman: "Quran Memorization (Hifz)",
    descriptionEn: "Commit the holy Quran, daily Surahs, or selected portions to your memory. Our teachers make the process easy through effective scheduling and repetitive revision steps.",
    descriptionUr: "مکمل قرآن کریم یا چند منتخب سورتیں حفظ کیجئے۔ ہمارے اساتذہ روزانہ کا سبق سنانے، پچھلے اسباق کی دہرائی اور آسان شیڈولنگ سے حفظ کو انتہائی آسان بنادیتے ہیں۔",
    descriptionRoman: "Mukammal Quran-e-Pak ya chund muntakhib Surahs dil me mehfooz kijiye. Hamare teachers daily lesson revision aur easy schedules ke zariye Hifz ko asan banate hain.",
    featuresEn: ["Flexible Memorization Schedule", "Daily Lesson Revision", "Old Revision Preservation (Manzil)", "Special Quran Recitation Training"],
    featuresUr: ["آسان اور منظم شیڈول", "روزانہ کا نیا سبق", "پرانے سبق کی دہرائی (منزل)", "تلاوت اور خوبصورت آواز کی تربیت"],
    featuresRoman: ["Easy and organized schedule", "Daily new lesson", "Sabaqi & Manzil revision", "Beautiful recitation training"],
    iconName: "Heart",
    recommendedAge: "7+ Years"
  },
  {
    id: "translation",
    titleEn: "Translation & Tafseer",
    titleUr: "مترجم قرآن و تفسیر کورس",
    titleRoman: "Translation & Tafseer Course",
    descriptionEn: "Deepen your connection with Allah's words. Learn the literal word-for-word translation, syntax, contextual historical background, and Tafseer of Surahs.",
    descriptionUr: "اللہ رب العزت کے کلام کی گہرائی کو سمجھیں۔ لفظ بہ لفظ ترجمہ، زبان کا گرامر، شانِ نزول اور سورتوں کی تفصیلی تفسیر و تشریح سیکھیں۔",
    descriptionRoman: "Allah Taala ke kalam ki gehrayi ko samjhein. Word-by-word Translation, Arabic Grammar, Shan-e-Nuzool, aur Surahs ki Tafseer seekhein.",
    featuresEn: ["Word-by-Word English/Urdu Translation", "Arabic Grammar and Root Words", "Context of Revelation", "Practical Life Lessons"],
    featuresUr: ["لفظ بہ لفظ اردو و انگریزی ترجمہ", "عربی گرامر اور روٹ ورڈز", "شانِ نزول اور تاریخی پس منظر", "عملی زندگی کے اسباق"],
    featuresRoman: ["Word-by-Word Translation", "Arabic Grammar of Quran", "Reasons for Revelation", "Practical Islamic lifestyle lessons"],
    iconName: "Globe",
    recommendedAge: "12+ Years"
  },
  {
    id: "islamic",
    titleEn: "Islamic Education & Duas",
    titleUr: "بنیادی اسلامی تعلیمات و دعائیں",
    titleRoman: "Islamic Education & Duas",
    descriptionEn: "Essential Islamic knowledge for kids. Covers proper method of Wudu & Salah, 6 Kalimas, essential daily supplications (Masnoon Duas), and Islamic moral values.",
    descriptionUr: "بچوں کے لیے نہایت ضروری اسلامی فرائض و سنتیں۔ وضو اور نماز کا صحیح طریقہ، چھ کلمے، روزمرہ پڑھنے جانے والی مسنون دعائیں اور اسلامی اخلاقیات۔",
    descriptionRoman: "Bacho ke liye zaroori Islamic taleem. Wudu aur Namaz ka sahi tarika, 6 Kalmas, daily life Supplications (Duas) aur Deeni Akhlaqiat.",
    featuresEn: ["Namaz (Salah) and Wudu Method", "Masnoon Duas and 6 Kalimas", "Ahadith for Kids", "Character Building (Adab & Akhlaq)"],
    featuresUr: ["کلمے، وضو اور نماز سیکھیں", "روزمرہ کی مسنون دعائیں", "بچوں کے لیے منتخب احادیث", "اخلاق و آداب کی تربیت"],
    featuresRoman: ["Salah & Wudu step-by-step", "Daily Masnoon Duas & Kalmas", "Short Hadith studies", "Deeni Adab and Akhlaqiat"],
    iconName: "Users",
    recommendedAge: "5+ Years"
  },
  {
    id: "arabic",
    titleEn: "Arabic Language Course",
    titleUr: "عربی بول چال اور زبان",
    titleRoman: "Arabic Language Course",
    descriptionEn: "Learn classical Quranic Arabic syntax and everyday conversational skills. Achieve confidence in writing, speaking, and understanding the language.",
    descriptionUr: "قرآنی عربی گرامر اور روزمرہ بول چال کی مہارتیں سیکھیں۔ عربی لکھنے، بولنے اور کلامِ الٰہی کو براہِ راست سمجھنے کی صلاحیت حاصل کریں۔",
    descriptionRoman: "Quranic Arabic grammar aur daily life conversational Arabic seekhein. Writing, speaking aur understanding me confidence hasil kijiye.",
    featuresEn: ["Quranic Vocabulary Development", "Grammar Rules (Nahu & Sarf)", "Speaking Practice", "Writing Assignments"],
    featuresUr: ["قرآنی الفاظ کا ذخیرہ", "عربی قواعد (صرف و نحو)", "بول چال کی مشق", "لکھنے کی مشقیں"],
    featuresRoman: ["Quranic Vocabulary", "Sarf-o-Nahu Grammar rules", "Speaking exercises", "Writing exercises"],
    iconName: "Award",
    recommendedAge: "10+ Years"
  }
];

export const initialPricingPlans: PricingPlan[] = [
  {
    id: "plan-2d",
    daysPerWeek: 2,
    classesPerMonth: 8,
    priceUSD: 30,
    isPopular: false,
    featuresEn: [
      "2 Days a week (8 classes monthly)",
      "30 Minutes class duration",
      "1-on-1 personalized lessons",
      "Male/Female qualified tutors",
      "Free 3 days trial classes",
      "Flexible schedule & timing"
    ],
    featuresUr: [
      "ہفتے میں 2 دن (مہینے میں 8 کلاسز)",
      "ہر کلاس کا دورانیہ 30 منٹ",
      "انفرادی 1-on-1 کلاس",
      "اہل مرد اور خواتین اساتذہ",
      "3 دن کی بالکل مفت ٹرائل کلاس",
      "اپنی پسند کا ٹائم اور دن شیڈول کریں"
    ],
    featuresRoman: [
      "Haftey me 2 din (8 classes monthly)",
      "30 mins class duration",
      "1-on-1 personal classes",
      "Male & Female expert teachers",
      "3 Days free trial classes",
      "Flexible schedule aur timing"
    ]
  },
  {
    id: "plan-3d",
    daysPerWeek: 3,
    classesPerMonth: 12,
    priceUSD: 45,
    isPopular: true, // Most popular banner
    featuresEn: [
      "3 Days a week (12 classes monthly)",
      "30 Minutes class duration",
      "1-on-1 personalized lessons",
      "Male/Female qualified tutors",
      "Free 3 days trial classes",
      "Progress report card monthly",
      "Flexible reschedule backup class"
    ],
    featuresUr: [
      "ہفتے میں 3 دن (مہینے میں 12 کلاسز)",
      "ہر کلاس کا دورانیہ 30 منٹ",
      "انفرادی 1-on-1 کلاس",
      "اہل مرد اور خواتین اساتذہ",
      "3 دن کی بالکل مفت ٹرائل کلاس",
      "ماہانہ کارکردگی کی رپورٹ",
      "ایمرجنسی میں متبادل کلاس کی سہولت"
    ],
    featuresRoman: [
      "Haftey me 3 din (12 classes monthly)",
      "30 mins class duration",
      "1-on-1 personal classes",
      "Male & Female expert teachers",
      "3 Days free trial classes",
      "Monthly progress report",
      "Missed class backup option"
    ]
  },
  {
    id: "plan-5d",
    daysPerWeek: 5,
    classesPerMonth: 20,
    priceUSD: 70,
    isPopular: false,
    featuresEn: [
      "5 Days a week (20 classes monthly)",
      "30 Minutes class duration",
      "Perfect for fast learners & Hifz",
      "1-on-1 intensive attention",
      "Male/Female qualified tutors",
      "Free 3 days trial classes",
      "Quranic recitation evaluation"
    ],
    featuresUr: [
      "ہفتے میں 5 دن (مہینے میں 20 کلاسز)",
      "ہر کلاس کا دورانیہ 30 منٹ",
      "تیز رفتار سیکھنے اور حفظ کے لیے بہترین",
      "انفرادی 1-on-1 خصوصی توجہ",
      "اہل مرد اور خواتین اساتذہ",
      "3 دن کی بالکل مفت ٹرائل کلاس",
      "تلاوت اور مخارج کی تفصیلی جانچ"
    ],
    featuresRoman: [
      "Haftey me 5 din (20 classes monthly)",
      "30 mins class duration",
      "Fast learning aur Hifz ke liye best",
      "1-on-1 intensive guidance",
      "Male & Female expert teachers",
      "3 Days free trial classes",
      "Monthly special evaluations"
    ]
  },
  {
    id: "plan-weekend",
    daysPerWeek: 2, // Sat, Sun only
    classesPerMonth: 8,
    priceUSD: 35,
    isPopular: false,
    featuresEn: [
      "Weekend Only (Sat & Sun classes)",
      "30 Minutes class duration",
      "Perfect for busy students & jobs",
      "1-on-1 personalized lessons",
      "Male/Female qualified tutors",
      "Free 3 days trial classes",
      "Monthly Islamic moral session"
    ],
    featuresUr: [
      "صرف ویک اینڈ (ہفتہ اور اتوار کلاسز)",
      "ہر کلاس کا دورانیہ 30 منٹ",
      "کالج کے طلباء اور نوکری کرنے والوں کیلئے موزوں",
      "انفرادی 1-on-1 کلاس",
      "اہل مرد اور خواتین اساتذہ",
      "3 دن کی بالکل مفت ٹرائل کلاس",
      "ماہانہ اسلامی تربیتی سیشنز"
    ],
    featuresRoman: [
      "Weekend Only (Sat & Sun classes)",
      "30 mins class duration",
      "Busy students aur job holders ke liye best",
      "1-on-1 personal classes",
      "Male & Female expert teachers",
      "3 Days free trial classes",
      "Monthly deeni tarbiyat session"
    ]
  }
];

export const initialTestimonials = [
  {
    name: "Farhan Siddiqui",
    location: "London, UK",
    textEn: "MashaAllah, the Worldwide Quran Academy has been a blessing for my two kids. The female teacher is highly patient and has amazing Tajweed. Highly recommended!",
    textUr: "ماشاللہ! ورلڈ وائیڈ قرآن اکیڈمی میرے دو بچوں کے لیے بہت بڑی نعمت ثابت ہوئی ہے۔ ٹیچر بہت صابر ہیں اور ان کی تجوید لاجواب ہے۔ میں سب کو مشورہ دوں گا۔",
    textRoman: "Mashallah, Worldwide Quran Academy mere do bacho ke liye boht bari naimat bani hai. Female teacher boht sabar wali hain aur tajweed kamal hai. Me sab ko recommend kroga.",
    rating: 5,
    course: "Noorani Qaida Course"
  },
  {
    name: "Ayesha Malik",
    location: "Houston, USA",
    textEn: "My daughter finished her Noorani Qaida and has started Reading Quran with Tajweed under teacher's guidance. The flexible dollar packages made it direct and easy to manage.",
    textUr: "میری بیٹی نے اپنا قاعدہ مکمل کیا اور اب اکیڈمی کی نگرانی میں تجوید کے ساتھ ناظرہ شروع کیا ہے۔ ڈالر میں فیس ادا کرنے کا طریقہ بہت آسان اور شفاف ہے۔",
    textRoman: "Meri beti ne Qaida mukammal kr k tajweed ke sath online Quran shuru kiya hai. Dollar me fees payment method boht easy aur clear hai.",
    rating: 5,
    course: "Quran Recitation with Tajweed"
  },
  {
    name: "Kamran Khan",
    location: "Melbourne, Australia",
    textEn: "I decided to learn Translation and Tafseer of the Quran at the age of 45. The tutor is highly knowledgeable and explains the root words of Arabic beautifully.",
    textUr: "میں نے 45 سال کی عمر میں قرآن پاک کا ترجمہ اور تفسیر سیکھنے کا فیصلہ کیا۔ اساتذہ نہایت علم والے ہیں اور ہر لفظ کی گہرائی بہترین انداز میں سمجھاتے ہیں۔",
    textRoman: "Maine 45 saal ki age me translation aur tafseer seekhne ka faisla kiya. Tutors boht knowledgeable hain aur Arabic grammar aur roots boht pyare andaz me sikhate hain.",
    rating: 5,
    course: "Translation & Tafseer Course"
  }
];

export const timezoneOptions = [
  "UTC (Coordinated Universal Time)",
  "EST (US Eastern Standard Time - New York)",
  "CST (US Central Standard Time - Chicago)",
  "MST (US Mountain Standard Time - Denver)",
  "PST (US Pacific Standard Time - Los Angeles)",
  "GMT (Greenwich Mean Time - London)",
  "CET (Central European Time - Paris/Berlin)",
  "GST (Gulf Standard Time - Dubai)",
  "PKT (Pakistan Standard Time - Islamabad)",
  "AEST (Australian Eastern Standard Time - Sydney)"
];
