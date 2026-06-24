import { useState, useEffect, FormEvent } from "react";
import { LanguageMode } from "../types";
import { Lock, FileText, Globe, Plus, Trash2, Key, Image, CheckCircle, LogOut, LayoutDashboard, Star } from "lucide-react";

interface AdminPageProps {
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

export default function AdminPage({ lang }: AdminPageProps) {
  // Authentication states
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // CMS states
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [titleEn, setTitleEn] = useState("");
  const [titleUr, setTitleUr] = useState("");
  const [category, setCategory] = useState("parents");
  const [imageUrl, setImageUrl] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [author, setAuthor] = useState("Academy Instructor");
  const [excerptEn, setExcerptEn] = useState("");
  const [excerptUr, setExcerptUr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentUr, setContentUr] = useState("");
  
  // UX states
  const [successMsg, setSuccessMsg] = useState("");

  // Default blog posts as backup/initial seed
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
    }
  ];

  useEffect(() => {
    // Load published posts from localStorage
    const savedPosts = localStorage.getItem("wqa_blog_posts");
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (e) {
        setPosts(defaultBlogPosts);
      }
    } else {
      setPosts(defaultBlogPosts);
      localStorage.setItem("wqa_blog_posts", JSON.stringify(defaultBlogPosts));
    }
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (password === "WQA2026!") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect access password! Please verify and try again.");
    }
  };

  const handlePublish = (e: FormEvent) => {
    e.preventDefault();
    
    if (!titleEn || !contentEn) {
      setErrorMsg("English Title and Content are required fields!");
      return;
    }

    // Build default values for Urdu if missing
    const finalTitleUr = titleUr || titleEn;
    const finalExcerptEn = excerptEn || contentEn.slice(0, 150) + "...";
    const finalExcerptUr = excerptUr || (contentUr ? contentUr.slice(0, 150) + "..." : finalExcerptEn);
    const finalContentUr = contentUr || contentEn;

    const newPost: BlogPost = {
      id: "post-" + Date.now(),
      category: { en: category, ur: category },
      title: { en: titleEn, ur: finalTitleUr },
      readTime,
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author,
      excerpt: { en: finalExcerptEn, ur: finalExcerptUr },
      content: { en: contentEn, ur: finalContentUr },
      imagePlaceholderColor: "from-emerald-600 via-teal-700 to-emerald-900",
      imageUrl: imageUrl || undefined
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("wqa_blog_posts", JSON.stringify(updatedPosts));

    // Reset Form Fields
    setTitleEn("");
    setTitleUr("");
    setImageUrl("");
    setExcerptEn("");
    setExcerptUr("");
    setContentEn("");
    setContentUr("");
    setSuccessMsg("Article published successfully! It is now live on the Informative Articles (/blog) page.");
    setErrorMsg("");

    // Hide success message after 5 seconds
    setTimeout(() => {
      setSuccessMsg("");
    }, 6000);
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm("Are you sure you want to delete this article? This action is permanent and cannot be undone.")) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      localStorage.setItem("wqa_blog_posts", JSON.stringify(updated));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex-1 min-h-[75vh] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8.5 rounded-3xl border border-slate-200/80 shadow-md">
          <div className="text-center">
            <span className="inline-flex items-center justify-center bg-emerald-50 text-emerald-800 p-4.5 rounded-full border border-emerald-150 mb-4 shadow-3xs">
              <Lock className="w-8 h-8 text-emerald-700 animate-pulse" />
            </span>
            <h2 className="text-2xl font-serif font-extrabold text-slate-900 tracking-tight">
              Academy Portal Security
            </h2>
            <p className="mt-2 text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Secure Blogging CMS Gateway
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            <div className="rounded-xl shadow-3xs">
              <label htmlFor="access-password" className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Enter Portal Password:
              </label>
              <div className="relative">
                <input
                  id="access-password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (Default: WQA2026!)"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 pl-10 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
                />
                <Key className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
              </div>
            </div>

            {errorMsg && (
              <div className="text-red-600 bg-red-50 border border-red-200 text-xs p-3 rounded-xl font-medium text-center">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer text-center text-white bg-emerald-700 hover:bg-emerald-800 shadow-sm uppercase"
            >
              Unlock Access
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Block */}
        <div className="bg-white p-6.5 rounded-2.5xl border border-slate-200/80 shadow-3xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="bg-emerald-50 text-emerald-850 p-3 rounded-xl border border-emerald-150">
              <LayoutDashboard className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-serif font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>Blogging CMS & Local Publishing</span>
                <span className="text-[10px] bg-emerald-650 text-white font-extrabold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">ADMIN LIVE</span>
              </h1>
              <p className="text-xs text-slate-550 font-medium mt-0.5">
                Worldwide Quran Academy Portal • Create articles that render instantly.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-emerald-800" />
            <span>Lock Portal</span>
          </button>
        </div>

        {/* Success / Error Banners */}
        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-start gap-3 shadow-3xs text-emerald-900">
            <CheckCircle className="w-5 h-5 text-emerald-650 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Publishing Successful</h4>
              <p className="text-xs font-medium mt-0.5">{successMsg}</p>
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-red-700 text-xs font-medium text-center shadow-3xs">
            {errorMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CMS Form Card */}
          <form onSubmit={handlePublish} className="lg:col-span-7 bg-white p-6.5 md:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100">
                <Plus className="w-4 h-4 text-emerald-700" />
              </span>
              <h2 className="text-base font-serif font-bold text-slate-900 uppercase tracking-tight">
                Create New Informative Article
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-semibold"
                >
                  <option value="parents">Parenting & Kids</option>
                  <option value="tajweed">Tajweed Guides</option>
                  <option value="hifz">Hifz Benefits</option>
                </select>
              </div>

              {/* Image URL input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Image URL (Paste direct image link)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 pl-10 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
                  />
                  <Image className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Title Translation Block */}
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">Title (English) *</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. 5 Benefits of Quran Recitation for Mental Calmness"
                  required
                  value={titleEn}
                  onChange={(e) => setTitleEn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Title (Urdu translation - Optional)</span>
                <input
                  type="text"
                  placeholder="مثال: بچوں کو گھر بیٹھے قرآن پاک سکھانے کے طریقے..."
                  value={titleUr}
                  onChange={(e) => setTitleUr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium text-right placeholder-slate-400"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Read Time & Author Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Read Time (e.g. "5 min read")
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                  Author Name
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-semibold"
                />
              </div>
            </div>

            {/* Brief Excerpts */}
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Brief Excerpt / Summary (English)</span>
                <textarea
                  rows={2}
                  placeholder="Provide a 1-2 sentence quick summary to display on the blog listing cards."
                  value={excerptEn}
                  onChange={(e) => setExcerptEn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Brief Excerpt / Summary (Urdu - Optional)</span>
                <textarea
                  rows={2}
                  placeholder="مضمون کا مختصر خلاصہ لکھیں..."
                  value={excerptUr}
                  onChange={(e) => setExcerptUr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400 resize-none text-right"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Content Textarea */}
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Full Article Body Content (English) *</span>
                <textarea
                  rows={6}
                  placeholder="Type or paste the full content of your article here. Supports paragraphs."
                  required
                  value={contentEn}
                  onChange={(e) => setContentEn(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
                />
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">Full Article Body Content (Urdu - Optional)</span>
                <textarea
                  rows={6}
                  placeholder="مضمون کا مکمل متن یہاں درج کریں..."
                  value={contentUr}
                  onChange={(e) => setContentUr(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4.5 text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400 text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer text-center text-white bg-emerald-700 hover:bg-emerald-800 shadow-md uppercase"
            >
              Publish Article Instantly
            </button>
          </form>

          {/* Sidebar published management list */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6.5 rounded-3xl border border-slate-200/80 shadow-md">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-5">
                <span className="p-1.5 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100">
                  <FileText className="w-4 h-4 text-emerald-700" />
                </span>
                <h2 className="text-base font-serif font-bold text-slate-900 uppercase tracking-tight">
                  Manage Published Articles ({posts.length})
                </h2>
              </div>

              {posts.length > 0 ? (
                <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
                  {posts.map((p) => (
                    <div 
                      key={p.id}
                      className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start justify-between gap-3 shadow-3xs transition-all hover:bg-slate-100"
                    >
                      <div className="space-y-1">
                        <span className="px-2 py-0.5 bg-white border border-slate-250 text-emerald-850 rounded-full text-[8px] font-extrabold uppercase tracking-wider">
                          {p.category.en === "parents" ? "Parenting" : p.category.en === "tajweed" ? "Tajweed" : "Hifz"}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1 pr-1 font-serif">
                          {lang === "en" ? p.title.en : p.title.ur}
                        </h4>
                        <div className="flex items-center gap-2 text-[9px] text-slate-400 font-bold uppercase">
                          <span>{p.date}</span>
                          <span>•</span>
                          <span>{p.readTime}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeletePost(p.id)}
                        className="text-red-550 hover:text-red-700 p-1.5 hover:bg-red-50 rounded-xl border border-transparent hover:border-red-100 transition-all cursor-pointer shrink-0"
                        title="Delete this article permanently"
                      >
                        <Trash2 className="w-4.5 h-4.5 text-red-600" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-slate-50/50 border border-dashed border-slate-200 rounded-2xl p-4">
                  <FileText className="w-8 h-8 text-slate-350 mx-auto mb-2" />
                  <p className="text-[11px] font-bold text-slate-450">No published articles available.</p>
                </div>
              )}
            </div>

            {/* CMS quick tip card */}
            <div className="bg-emerald-900 text-emerald-100 p-6 rounded-2.5xl shadow-md border border-emerald-800 space-y-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Blogging Portal Tips</h4>
              </div>
              <ul className="space-y-2 text-[11px] text-emerald-100/90 leading-relaxed font-semibold">
                <li>• Articles are stored on the browser locally via secure storage. No GitHub commit is required!</li>
                <li>• Adding articles instantly populates the Informative Articles (/blog) screen in both English and Urdu.</li>
                <li>• Providing Urdu translations is completely optional. If left blank, the portal will auto-use the English values for perfect responsiveness.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
