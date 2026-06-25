import { Course, PricingPlan } from "./types";

export const COURSES: Course[] = [
  {
    id: "noorani-qaida",
    title: "Noorani Qaida",
    description: "The fundamental classic course to master Arabic alphabets, correct pronunciation, makharij, and basic reading rules. Highly recommended for kids and adults starting from scratch.",
    duration: "3 - 6 Months",
    level: "Beginner",
    image: "/src/assets/images/noorani_qaida_page_1782394032005.jpg",
    features: [
      "Pronunciation of Arabic letters (Makharij)",
      "Recognition of shapes and joints",
      "Rules of stretching (Harakaat & Madd)",
      "Basic Tajweed rules (Tanween & Sukoon)",
      "Perfect foundation for Holy Quran reading"
    ]
  },
  {
    id: "madni-qaida",
    title: "Madni Qaida",
    description: "A comprehensive foundational guide for beginners to learn Quranic reading with Tajweed rules. Excellent step-by-step approach widely used globally.",
    duration: "3 - 6 Months",
    level: "Beginner",
    image: "/src/assets/images/madni_qaida_page_1782394054154.jpg",
    features: [
      "Letter identification and articulation",
      "Correct pronunciation of letters in joints",
      "Rules of movements (Harakat) and standing signs",
      "Ghunnah and Ikhfa foundation",
      "Excellent transition to fluent Quran recitation"
    ]
  },
  {
    id: "iqra-book",
    title: "Iqra Book",
    description: "A popular, rapid and highly structured system for learning to read the Holy Quran. Promotes quick learning for children and adults through phonetic steps.",
    duration: "2 - 4 Months",
    level: "Beginner",
    image: "/src/assets/images/iqra_book_cover_1782394076251.jpg",
    features: [
      "Rapid phonetic recognition system",
      "Quick mastery of vowels and spelling rules",
      "Phased progression from Book 1 to Book 6",
      "Immediate reading fluency development",
      "Proven educational track record worldwide"
    ]
  },
  {
    id: "quran-recitation",
    title: "Quran Recitation with Tajweed",
    description: "Learn to recite the Holy Quran fluently and beautiful in accordance with Tajweed rules. Gain confidence in reading with beautiful Arabic tone and rhythm.",
    duration: "12 - 18 Months",
    level: "Intermediate",
    image: "/src/assets/images/quran_recitation_session_1782394096329.jpg",
    features: [
      "Fluent reading of the Quran",
      "Practical application of Tajweed rules",
      "Correct pronunciation during recitation",
      "Rules of stopping (Waqf) and breathing",
      "Recitation style of Hafs an 'Asim"
    ]
  },
  {
    id: "quran-memorization",
    title: "Quran Memorization (Hifz)",
    description: "Systematic, customized, and easy-to-follow memorization plan designed by qualified Huffaz. Track progress, consolidate old portions, and memorize new surahs at your own pace.",
    duration: "Customized",
    level: "Advanced",
    image: "/src/assets/images/hifz_memorization_quran_1782394654867.jpg",
    features: [
      "Customized memorization schedule",
      "Scientific revision plans (Sabaq, Sabqi, Manzil)",
      "Correct Tajweed verification for memorized parts",
      "Weekly and monthly progress reports",
      "Sanad-certified Huffaz tutors"
    ]
  },
  {
    id: "tajweed-mastery",
    title: "Tajweed & Accent Mastery",
    description: "For students who can read but want to perfect their accent, sound exactly like native Arabic reciters, and master advanced Tajweed theories and rules.",
    duration: "6 - 9 Months",
    level: "Advanced",
    image: "/src/assets/images/tajweed_rules_guide_1782394674039.jpg",
    features: [
      "Advanced rules of Noon and Meem Sakinah",
      "Rules of Madd (stretching) variations",
      "Heavy and light letters (Tafkheem & Tarqeeq)",
      "Beautiful Arabic accent & tone development",
      "Ijaza preparation of basic Tajweed texts"
    ]
  },
  {
    id: "daily-duas-namaz",
    title: "Daily Islamic Duas & Namaz",
    description: "Learn step-by-step prayer (Salah) positions, correct recitation of Namaz, essential daily supplications (Duas) for children, and pristine Islamic etiquettes.",
    duration: "3 - 6 Months",
    level: "All Levels",
    image: "/src/assets/images/duas_namaz_guide_1782394697458.jpg",
    features: [
      "Method of Wudu (Ablution) & Salah (Prayer) positions",
      "Correct pronunciation of Namaz recitation",
      "Daily Sunnah supplications and 6 Kalimas",
      "Masnoon Duas for morning, evening, and daily actions",
      "Interactive step-by-step guides perfect for kids"
    ]
  },
  {
    id: "islamic-studies",
    title: "Islamic Studies",
    description: "A comprehensive course teaching basic Islamic beliefs, the five pillars of Islam, stories of Prophets, basic Aqeedah modules, and children's Islamic history.",
    duration: "6 - 12 Months",
    level: "All Levels",
    image: "/src/assets/images/islamic_studies_books_1782394716746.jpg",
    features: [
      "Learn Five Pillars and Six Articles of Faith",
      "Comprehensive basic Aqeedah (creed) modules",
      "Beautiful stories of the Prophets and Seerah",
      "Islamic history, values, manners, and daily etiquette",
      "Interactive and engaging Islamic educational materials"
    ]
  }
];

export const PRICING_PLANS_1ON1: PricingPlan[] = [
  {
    id: "weekend-plan",
    name: "1-on-1 Weekend",
    daysPerWeek: 2,
    classesPerMonth: 8,
    priceUSD: 39,
    priceGBP: 31,
    priceEUR: 36,
    priceCAD: 54,
    priceAUD: 59,
    priceAED: 143,
    priceSAR: 146,
    durationPerClass: "30 Mins",
    recommended: false,
    features: [
      "8 highly personalized 1-on-1 private classes/mo",
      "Saturday & Sunday schedule",
      "Professional certified Arabic/Pakistani tutor",
      "Flexible timing options tailored to your timezone",
      "Monthly progress scorecard & feedback",
      "Free makeup classes (max 1/mo)"
    ]
  },
  {
    id: "3-days-plan",
    name: "1-on-1 Standard",
    daysPerWeek: 3,
    classesPerMonth: 12,
    priceUSD: 49,
    priceGBP: 39,
    priceEUR: 45,
    priceCAD: 68,
    priceAUD: 74,
    priceAED: 180,
    priceSAR: 184,
    durationPerClass: "30 Mins",
    recommended: true,
    features: [
      "12 highly personalized 1-on-1 private classes/mo",
      "Choose any 3 days (Mon-Fri)",
      "Male/Female tutor of your choice",
      "Interactive digital portal access",
      "Tajweed and Islamic Studies dual mode",
      "Free makeup classes (max 2/mo)"
    ]
  },
  {
    id: "4-days-plan",
    name: "1-on-1 Premium",
    daysPerWeek: 4,
    classesPerMonth: 16,
    priceUSD: 59,
    priceGBP: 47,
    priceEUR: 54,
    priceCAD: 82,
    priceAUD: 89,
    priceAED: 217,
    priceSAR: 221,
    durationPerClass: "30 Mins",
    recommended: false,
    features: [
      "16 highly personalized 1-on-1 private classes/mo",
      "Choose any 4 days per week",
      "High-priority teacher scheduling",
      "Custom dashboard and parent logs",
      "Syllabus customization allowed",
      "Unlimited makeup classes with notice"
    ]
  },
  {
    id: "5-days-plan",
    name: "1-on-1 Intensive",
    daysPerWeek: 5,
    classesPerMonth: 20,
    priceUSD: 69,
    priceGBP: 55,
    priceEUR: 63,
    priceCAD: 96,
    priceAUD: 104,
    priceAED: 253,
    priceSAR: 259,
    durationPerClass: "30 Mins",
    recommended: false,
    features: [
      "20 highly personalized 1-on-1 private classes/mo",
      "Monday to Friday daily classes",
      "Fast-track syllabus completion",
      "Highly recommended for Hifz (Memorization)",
      "Daily progress reports via WhatsApp/Email",
      "Direct coordinator coordination"
    ]
  }
];

export const PRICING_PLANS_GROUP: PricingPlan[] = [
  {
    id: "group-weekend",
    name: "Group Weekend",
    daysPerWeek: 2,
    classesPerMonth: 8,
    priceUSD: 19,
    priceGBP: 15,
    priceEUR: 17,
    priceCAD: 26,
    priceAUD: 29,
    priceAED: 70,
    priceSAR: 71,
    durationPerClass: "45 Mins",
    recommended: false,
    features: [
      "8 interactive group classes per month",
      "Small groups (only 3-5 students max)",
      "Saturday & Sunday schedule",
      "Affordable budget-friendly option",
      "Peers motivation & collaborative learning",
      "Structured curriculum & Tajweed focus"
    ]
  },
  {
    id: "group-standard",
    name: "Group Standard",
    daysPerWeek: 3,
    classesPerMonth: 12,
    priceUSD: 25,
    priceGBP: 20,
    priceEUR: 23,
    priceCAD: 35,
    priceAUD: 38,
    priceAED: 92,
    priceSAR: 94,
    durationPerClass: "45 Mins",
    recommended: true,
    features: [
      "12 interactive group classes per month",
      "Small groups (only 3-5 students max)",
      "Choose any 3 days (Mon-Fri)",
      "Budget-friendly & highly social",
      "Tajweed and Islamic studies combo",
      "Perfect for young siblings or peers"
    ]
  },
  {
    id: "group-intensive",
    name: "Group Intensive",
    daysPerWeek: 5,
    classesPerMonth: 20,
    priceUSD: 35,
    priceGBP: 28,
    priceEUR: 32,
    priceCAD: 49,
    priceAUD: 53,
    priceAED: 128,
    priceSAR: 131,
    durationPerClass: "45 Mins",
    recommended: false,
    features: [
      "20 interactive group classes per month",
      "Small groups (only 3-5 students max)",
      "Monday to Friday daily sessions",
      "Rapid learning at half the price of 1-on-1",
      "Daily practice with qualified teacher",
      "Progress tracking & regular assessments"
    ]
  }
];

export const PRICING_PLANS = PRICING_PLANS_1ON1;

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Sarah Ahmed",
    location: "London, UK",
    relation: "Parent of 7yr old Zayd",
    rating: 5,
    text: "Masha'Allah, Worldwide Quran Academy has been amazing! The female tutor is so patient with my son. He has completed Noorani Qaida in just 4 months and is reading Quran beautifully now with Tajweed."
  },
  {
    id: "t2",
    name: "Dr. Bilal Mansoor",
    location: "New York, USA",
    relation: "Adult Student",
    rating: 5,
    text: "I was looking for a flexible program to improve my Tajweed accent, and this platform was perfect. The tutor is highly qualified, punctual, and knows the rules inside-out. The 1-on-1 setting is unbeatable."
  },
  {
    id: "t3",
    name: "Amina Yousaf",
    location: "Toronto, Canada",
    relation: "Parent of Fatima & Aisha",
    rating: 5,
    text: "Finding female tutors who can engage young girls was tough, but we hit the jackpot here. My daughters look forward to their classes. The curriculum combines Quran with Islamic manners, which I love!"
  }
];

export const FAQS = [
  {
    q: "Do you offer a free trial?",
    a: "Yes! We offer a 3-day 100% free trial with no credit card required. This allows you to evaluate our teacher, platform, and teaching style before subscribing to any plan."
  },
  {
    q: "Are the classes group-based or 1-on-1?",
    a: "All our classes are strictly 1-on-1 and private. The teacher's entire focus is on a single student for the whole duration, ensuring high engagement and rapid learning."
  },
  {
    q: "Can female students choose female Quran tutors?",
    a: "Absolutely. We have a dedicated team of highly qualified, certified, and experienced female Quran tutors for sisters and young girls."
  },
  {
    q: "Which countries do you serve?",
    a: "We are a global academy serving students across the globe, including the UK, USA, Canada, Australia, Europe, Gulf countries, and Singapore. We schedule classes according to your local timezone."
  },
  {
    q: "What software/platform is used for classes?",
    a: "We primarily conduct classes on Zoom, Skype, or Google Meet, depending on the student's preference. We use high-quality interactive PDF worksheets and screen sharing during the lessons."
  },
  {
    q: "What age groups do you teach?",
    a: "We teach kids starting from 4 years old up to senior adults. Our curriculum is tailored differently for young children (using engaging games/visuals) compared to structured methodologies for adults."
  }
];

export const DEFAULT_BLOGS = [
  {
    _id: "b1",
    title: "The Importance of Learning Tajweed rules",
    slug: { current: "importance-of-learning-tajweed-rules" },
    publishedAt: "2026-06-20T10:00:00.000Z",
    excerpt: "Discover why reciting the Holy Quran with correct Tajweed rules is essential for every Muslim, and how it preserves the divine meaning of Allah's words.",
    body: "Tajweed means 'to make better' or 'to beautify'. In the context of Quranic recitation, it is the science of pronouncing each Arabic letter correctly from its articulation point (Makhraj) while applying all its characteristics (Sifaat). Reciting the Quran with correct Tajweed is not just an aesthetic practice but a divine obligation.\n\n### Why Tajweed is Vital\nWhen Arabic letters are pronounced incorrectly, it can completely alter the meaning of the words. For example, confusing 'Qaf' with 'Kaf' or 'Haa' with 'haa' changes a divine statement to something entirely different, which can be sinful if done intentionally.\n\n### Practical Tips for Tajweed\n1. Start with the Noorani Qaida to learn individual letter sounds.\n2. Listen to master reciters like Sheikh Husary or Sheikh Al-Ghamdi.\n3. Recite slowly and do not rush.\n4. Practice under the direct guidance of a certified, qualified tutor who can point out subtle mistakes immediately.",
    author: "Ustadh Muhammad"
  },
  {
    _id: "b2",
    title: "5 Tips to Memorize the Quran Easily as a Child or Adult",
    slug: { current: "5-tips-to-memorize-quran-easily" },
    publishedAt: "2026-06-15T09:00:00.000Z",
    excerpt: "Memorizing the Holy Quran (Hifz) is a noble goal. Learn five practical, scientifically proven methods to make your memorization journey easy, structured, and long-lasting.",
    body: "Memorizing the Holy Quran is a dream of every devoted Muslim. While it requires dedication and consistency, the process can be made significantly smoother by applying structured methodologies. Here are five practical tips for kids and adults:\n\n### 1. Sincerity and Dua\nAlways start with the right intention (Niyyah)—seeking only Allah's pleasure. Daily supplications for ease (Rabbish rahli sadri) are essential.\n\n### 2. Consistency Over Quantity\nMemorizing 3 lines every single day is far superior to memorizing 2 pages once a week. Your brain develops muscle memory and adapts to the daily habit.\n\n### 3. The 3-Step Revision Rule\nAlways divide your Hifz schedule into three parts:\n- **Sabaq**: The new lesson of the day.\n- **Sabqi (Para Daur)**: The recently memorized portion of the last 15-20 days.\n- **Manzil**: The old portion memorized in previous months.\nNever skip revision, as memorized Quran escapes the heart faster than a camel from its rope.\n\n### 4. Same Printed Copy of the Quran\nAlways use the exact same layout or print (such as the 15-line Saudi Quran). Your eyes take a mental snapshot of the page, the start of lines, and placement of verses. Changing copies disrupts this visual memory.\n\n### 5. Recite in Daily Prayers\nReciting your newly memorized verses during Farz and Sunnah prayers is the ultimate tool to seal them permanently in your mind.",
    author: "Hafiz Bilal Ahmed"
  }
];
