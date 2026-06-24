import { useState, useEffect } from "react";
import { LanguageMode } from "../types";
import { Search, BookOpen, Clock, Calendar, ArrowRight, User, X, Sparkles, Loader2 } from "lucide-react";
import { fetchSanityBlogPosts, isSanityConfigured } from "../sanityClient";

interface BlogPageProps {
  lang: LanguageMode;
}

interface BlogPost {
  id: string;
  title: { en: string; ur: string };
  category: { en: string; ur: string };
  readTime: string;
  date: string;
  author: string;
  excerpt: { en: string; ur: string };
  content: { en: string; ur: string };
  imagePlaceholderColor: string;
  imageUrl?: string;
}

export default function BlogPage({ lang }: BlogPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  const categories = [
    { id: "all", label: { en: "All Articles", ur: "تمام مضامین" } },
    { id: "parents", label: { en: "Parenting & Kids", ur: "بچوں کی تربیت" } },
    { id: "tajweed", label: { en: "Tajweed Guides", ur: "تجوید کے قواعد" } },
    { id: "hifz", label: { en: "Hifz Benefits", ur: "حفظ کے فائدے" } }
  ];

  const defaultBlogPosts: BlogPost[] = [
    {
      id: "post-1",
      category: { en: "parents", ur: "parents" },
      title: {
        en: "How to Teach Noorani Qaida to Kids Online at Home",
        ur: "بچوں کو گھر بیٹھے آن لائن نورانی قاعدہ سکھانے کا آسان طریقہ"
      },
      readTime: "5 min read",
      date: "June 20, 2026",
      author: "Mufti Muhammad Bilal",
      excerpt: {
        en: "Discover 5 practical strategies used by our certified male and female scholars to keep kids engaged, focused, and motivated during virtual Noorani Qaida lessons.",
        ur: "جانئے وہ 5 بہترین طریقے جن کے ذریعے ہمارے شفیق اساتذہ چھوٹے بچوں کو زوم اور اسکائپ پر دلچسپی کے ساتھ بنیادی قاعدہ اور مخارج سکھاتے ہیں۔"
      },
      content: {
        en: "Teaching Noorani Qaida to young children is the foundational step of their Quranic journey. When doing it online, parents can support kids through simple daily habits:\n\n1. Establish a Quiet Learning Corner: Choose a quiet room away from sibling noise and toys so your child can hear the teacher's pronunciation perfectly.\n2. Keep Sessions Short and Sweet: A 30-minute 1-on-1 class is the absolute sweet spot for kids under 8. It maximizes attention spans without causing fatigue.\n3. Reward and Appreciate: Always praise your kid when they correctly pronounce difficult Arabic letters like Qaf (ق), Ha (ح), or 'Ain (ع).\n4. Review on Off-Days: Spend just 10 minutes repeating yesterday's lesson. This builds solid memory foundations before the next session.\n5. Partner with the Tutor: Ensure communication is active. Our academy provides progress report cards so parents are always aware.",
        ur: "چھوٹے بچوں کو نورانی قاعدہ سکھانا ان کے اسلامی تعلیمی سفر کا پہلا اور بنیادی قدم ہے۔ آن لائن کلاسز کے دوران والدین ان آسان طریقوں سے بچوں کی مدد کر سکتے ہیں:\n\n1۔ پرسکون جگہ کا انتخاب: پڑھائی کے لیے گھر میں ایک ایسی جگہ مختص کریں جہاں شور نہ ہو تاکہ بچہ استاد کی آواز اور مخارج کو واضح طور پر سن سکے۔\n2۔ وقت کی پابندی اور مختصر دورانیہ: چھوٹے بچوں کے لیے 30 منٹ کی 1-on-1 کلاس بہترین ہوتی ہے۔ اس سے بچہ تھکتا نہیں اور توجہ برقرار رہتی ہے۔\n3۔ حوصلہ افزائی کیجیئے: جب بچہ مشکل حروف جیسے (ق)، (ح) یا (ع) کو صحیح مخرج سے پڑھے تو اس کی تعریف کریں۔\n4۔ پچھلے سبق کی دہرائی: غیر حاضری یا چھٹی کے دن صرف 10 منٹ نکال کر پرانے سبق کی دہرائی کروائیں۔ یہ یادداشت کو مضبوط کرتا ہے۔\n5۔ اساتذہ کے ساتھ رابطہ: اکیڈمی باقاعدگی سے والدین کو کارکردگی رپورٹ فراہم کرتی ہے، اس کو ضرور چیک کریں۔"
      },
      imagePlaceholderColor: "from-emerald-600 to-teal-800"
    },
    {
      id: "post-2",
      category: { en: "tajweed", ur: "tajweed" },
      title: {
        en: "Understanding the Core Rules of Tajweed: A Beginner's Guide",
        ur: "علمِ تجوید کے بنیادی قواعد: نو آموز طلباء کے لیے ایک رہنما گائیڈ"
      },
      readTime: "8 min read",
      date: "June 15, 2026",
      author: "Qari Ahmed Raza",
      excerpt: {
        en: "What is Tajweed? Why is it mandatory to recite the Quran with proper pronunciation? Learn about the standard rules of Madd, Noon Sakinah, and Meem Sakinah.",
        ur: "تجوید کیا ہے؟ قران کریم کو تجوید کے ساتھ پڑھنا کیوں ضروری ہے؟ نون ساکن، میم ساکن اور حروفِ مد کے بنیادی اصول آسان الفاظ میں سیکھیں۔"
      },
      content: {
        en: "The word 'Tajweed' literally means to beautify, refine, or deliver excellence. In Islamic terminology, it refers to reciting every Arabic letter of the holy Quran from its exact point of articulation (makhraj) with its proper characteristics.\n\nWhy is Tajweed Mandatory?\nArabic is a rich and sensitive language. A minor change in pronunciation can completely alter the meaning of a word. For example, 'Qalb' (قلب) with a Qaf means 'Heart', whereas 'Kalb' (كلب) with a Kaf means 'Dog'. Reciting correctly is an obligation for every Muslim.\n\nKey Beginner Rules:\n1. Makhraj (Points of Articulation): Knowing where sounds originate—the throat, tongue, lips, or nose.\n2. Rules of Noon Sakinah & Tanween: Explains when to hide the sound (Ikhfa), merge the letters (Idgham), read clearly (Izhar), or change sound to Meem (Iqlab).\n3. Rules of Madd: Stretching certain vowel sounds to give weight and traditional beauty to recitation.\n4. Rules of Waqf (Stopping): Learning when to pause and how to stop correctly at the end of verses.",
        ur: "تجوید کا لفظی مطلب ہے 'خوبصورت بنانا' یا 'بہترین طریقے سے ادا کرنا'۔ اسلامی اصطلاح میں، قرآنِ مجید کے ہر حرف کو اس کے مخصوص مخرج سے تمام صفات کے ساتھ ادا کرنے کو علمِ تجوید کہتے ہیں۔\n\nتجوید کی ضرورت اور اہمیت:\nعربی زبان میں مخارج کی تھوڑی سی تبدیلی سے معنی یکسر بدل جاتے ہیں۔ مثال کے طور پر 'قلب' (ق کے ساتھ) کا مطلب 'دل' ہے، جبکہ 'کلب' (ک کے ساتھ) کا مطلب 'کتا' ہے۔ اس لیے درست قواعد کے ساتھ تلاوت کرنا ہر مسلمان پر لازم ہے۔\n\nبنیادی اصول:\n1۔ مخارج کا علم: یہ جاننا کہ کون سا حرف حلق، زبان، ہونٹوں یا ناک سے ادا ہوتا ہے۔\n2۔ نون ساکن اور تنوین کے قواعد: اس میں اخفاء (آواز چھپانا)، ادغام (حروف ملانا)، اظہار (واضح پڑھنا) اور اقلاب (میم سے بدلنا) شامل ہیں۔\n3۔ وقف کے اصول: تلاوت کے دوران کہاں سانس روکنا ہے اور کس طرح آیت کا اختتام کرنا ہے۔"
      },
      imagePlaceholderColor: "from-emerald-700 to-emerald-950"
    },
    {
      id: "post-3",
      category: { en: "hifz", ur: "hifz" },
      title: {
        en: "Spiritual and Cognitive Benefits of Memorizing the Quran (Hifz)",
        ur: "حفظِ قرآن مجید کے روحانی، دماغی اور سائنسی فوائد"
      },
      readTime: "6 min read",
      date: "June 08, 2026",
      author: "Ustadh Muhammad Bilal",
      excerpt: {
        en: "Scientific research proves that Quranic memorization improves focus, strengthens IQ, refines language acquisition, and brings immense spiritual tranquility.",
        ur: "جدید سائنسی تحقیق ثابت کرتی ہے کہ قرآن کریم کو حفظ کرنے سے بچوں کا آئی کیو لیول (IQ)، حافظہ اور زبان دانی کی صلاحیتیں حیرت انگیز طور پر بڑھتی ہیں۔"
      },
      content: {
        en: "Commiting the holy Quran to memory is a miracle that thousands of kids and adults experience daily. Beyond the immense reward in the hereafter, Hifz offers powerful real-world cognitive benefits:\n\n1. Strengthens Memory and Neuroplasticity: The repetitive audio listening, reading, and reciting exercises create new neural pathways. It behaves as a complete brain workout, boosting academic performance in mathematics and science.\n2. Refines Language and Pronunciation: Standard Tajweed trains vocal muscles and refines phonetics. Children who do Hifz often achieve superior reading speeds and secure native-like pronunciations in multiple languages.\n3. Calms Mental Stress: Scientific audio tests prove that reciting the Quran reduces cortisol levels, bringing high focus and emotional stability.\n4. Teaches Self-Discipline: Hifz requires routine (Sabq, Sabaqi, Manzil). This instills lifelong time-management, focus, and determination in young minds.",
        ur: "قرآن مجید کو اپنے دل میں محفوظ کرنا ایک بہت بڑا اعزاز اور معجزہ ہے۔ آخرت کے عظیم انعامات کے ساتھ ساتھ، حفظِ قرآن کے دنیاوی دماغی فوائد بھی بے شمار ہیں:\n\n1۔ یادداشت اور آئی کیو میں اضافہ: تلاوت اور دہرائی کی کثرت سے دماغی خلیات مضبوط ہوتے ہیں، جس سے بچوں کا آئی کیو لیول بڑھتا ہے اور وہ ریاضی و سائنس جیسے مضامین میں نمایاں کارکردگی دکھاتے ہیں۔\n2۔ زبان و گفتگو کی روانی: تجوید کے اصولوں کی وجہ سے بچوں کا تلفظ بہت صاف اور خوبصورت ہوجاتا ہے۔\n3۔ ذہنی سکون اور تناؤ میں کمی: قرآن پاک کی روزانہ تلاوت اور تکرار سے ذہنی دباؤ اور بے چینی ختم ہوتی ہے اور دل کو سکون ملتا ہے۔\n4۔ نظم و ضبط کی تربیت: روزانہ سبق سنانا اور منزل کی دہرائی بچوں میں وقت کی پابندی اور ذمہ داری کا احساس پیدا کرتی ہے۔"
      },
      imagePlaceholderColor: "from-amber-600 via-emerald-800 to-slate-900"
    }
  ];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      if (isSanityConfigured) {
        try {
          const sanityPosts = await fetchSanityBlogPosts();
          if (sanityPosts && sanityPosts.length > 0) {
            setBlogPosts(sanityPosts);
            setIsLoading(false);
            return;
          }
        } catch (err) {
          console.error("Sanity fetch failed, falling back to local posts", err);
        }
      }

      // Fallback
      const saved = localStorage.getItem("wqa_blog_posts");
      if (saved) {
        try {
          setBlogPosts(JSON.parse(saved));
        } catch (e) {
          setBlogPosts(defaultBlogPosts);
        }
      } else {
        setBlogPosts(defaultBlogPosts);
        localStorage.setItem("wqa_blog_posts", JSON.stringify(defaultBlogPosts));
      }
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const postTitle = lang === "en" ? post.title.en : post.title.ur;
    const postExcerpt = lang === "en" ? post.excerpt.en : post.excerpt.ur;
    const matchesSearch = 
      postTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
      postExcerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || post.category[lang] === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const isUr = lang === "ur";

  return (
    <div className="flex-1 bg-neutral-50/40 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 mb-4 shadow-3xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{lang === "en" ? "Quran Academy Blog & Resources" : "علمی مضامین اور وسائل"}</span>
          </span>
          <h1 className="text-3xl md:text-4.5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
            {lang === "en" ? "Informative Islamic Blog" : "رہنمائی اور معلوماتی مضامین"}
          </h1>
          <p className="mt-4 text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {lang === "en" 
              ? "Read certified articles by our senior tutors on Quranic rules, online parenting tips, Tajweed basics, and children's Islamic character building."
              : "تجوید، حفظ، بچوں کی تربیت اور قرآنی تعلیمات کے حوالے سے ہمارے مستند اساتذہ کے معلوماتی بلاگ یہاں پڑھیں۔"}
          </p>
        </div>

        {/* Search & Category filter row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-12 bg-white p-4.5 rounded-2.5xl border border-slate-200/80 shadow-3xs">
          
          {/* Categories Tab list */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-emerald-700 text-white shadow-md shadow-emerald-900/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {lang === "en" ? cat.label.en : cat.label.ur}
              </button>
            ))}
          </div>

          {/* Search Input bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder={lang === "ur" ? "مضمون تلاش کریں..." : "Search articles..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4.5 pl-10 text-slate-800 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
            />
            <Search className="absolute left-3.5 top-2.5 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
          </div>

        </div>

        {/* Blog post Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-200/60 shadow-3xs">
            <Loader2 className="w-10 h-10 text-emerald-700 animate-spin mb-4" />
            <p className="text-slate-600 font-medium text-sm animate-pulse font-serif">
              {lang === "en" ? "Fetching latest articles from Sanity CMS..." : "سرور سے مضامین لوڈ کیے جا رہے ہیں..."}
            </p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const pTitle = lang === "en" ? post.title.en : post.title.ur;
              const pExcerpt = lang === "en" ? post.excerpt.en : post.excerpt.ur;
              return (
                <article 
                  key={post.id}
                  className="bg-white rounded-2.5xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image placeholder with abstract beautiful gradient and icon overlay */}
                    <div className="h-48 relative flex items-center justify-center overflow-hidden">
                      {post.imageUrl ? (
                        <>
                          <img 
                            src={post.imageUrl} 
                            alt={pTitle} 
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover" 
                          />
                          <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
                        </>
                      ) : (
                        <>
                          <div className={`absolute inset-0 bg-gradient-to-br ${post.imagePlaceholderColor}`} />
                          <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
                        </>
                      )}
                      <BookOpen className="absolute right-4 top-4 w-10 h-10 text-white/10 z-10" />
                      <h3 className="font-serif font-bold text-sm md:text-base leading-snug drop-shadow-md z-10 px-6 text-center text-white">
                        {pTitle}
                      </h3>
                    </div>

                    {/* Meta info block */}
                    <div className="p-6.5 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{post.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>

                      <p className={`text-slate-650 text-xs leading-relaxed font-medium ${isUr ? "text-right" : "text-left"}`}>
                        {pExcerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read button block */}
                  <div className="px-6.5 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.author.split(" ")[0]}</span>
                    </div>

                    <button
                      onClick={() => setActivePost(post)}
                      className="text-emerald-750 hover:text-emerald-850 font-extrabold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === "en" ? "Read Article" : "مضمون پڑھیں"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-slate-200/80 rounded-2.5xl max-w-lg mx-auto p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-serif font-bold text-slate-800 text-base">No Articles Found</h3>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              We couldn't find any articles matching your filters. Try selecting a different category or search term.
            </p>
          </div>
        )}

      </div>

      {/* Full Article Drawer / Reading Overlay modal */}
      {activePost && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full flex flex-col animate-slideLeft overflow-hidden">
            
            {/* Drawer Header */}
            <div className="p-5.5 border-b border-slate-150 flex items-center justify-between bg-slate-50">
              <span className="bg-emerald-50 text-emerald-805 text-[10px] tracking-wider font-extrabold px-3 py-1 rounded-full uppercase border border-emerald-150">
                {activePost.category[lang] === "parents" ? "Parenting" : activePost.category[lang] === "tajweed" ? "Tajweed" : "Quran Memorization"}
              </span>

              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 hover:bg-slate-200/70 rounded-lg text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="p-6 md:p-9 overflow-y-auto space-y-6 flex-1">
              
              <div className="space-y-3">
                <div className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-wider">
                  <span>{activePost.date}</span>
                  <span>•</span>
                  <span>{activePost.readTime}</span>
                  <span>•</span>
                  <span>By {activePost.author}</span>
                </div>
                <h2 className="text-xl md:text-2.5xl font-serif font-bold text-slate-900 leading-snug">
                  {lang === "en" ? activePost.title.en : activePost.title.ur}
                </h2>
              </div>

              {/* Banner gradient background */}
              <div className={`h-1 bg-gradient-to-r ${activePost.imagePlaceholderColor} rounded-full`} />

              {/* Main Content Paragraph elements */}
              <div 
                className={`text-slate-700 text-xs sm:text-sm leading-relaxed font-sans font-medium whitespace-pre-line space-y-4 ${isUr ? "text-right" : "text-left"}`}
                style={{ direction: isUr ? "rtl" : "ltr" }}
              >
                {lang === "en" ? activePost.content.en : activePost.content.ur}
              </div>

            </div>

            {/* Drawer Footer CTA */}
            <div className="p-5.5 border-t border-slate-150 bg-slate-50 flex items-center justify-between flex-wrap gap-4">
              <div className="text-left">
                <div className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Have questions about lessons?</div>
                <div className="text-[11px] text-slate-700 font-bold">Worldwide Quran Academy Support</div>
              </div>
              <button
                onClick={() => {
                  setActivePost(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider cursor-pointer"
              >
                Ask on WhatsApp
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
