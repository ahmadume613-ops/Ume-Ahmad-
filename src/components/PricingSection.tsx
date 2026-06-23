import { useState } from "react";
import { PricingPlan, LanguageMode } from "../types";
import { DollarSign, Check, Percent, Sparkles, HelpCircle } from "lucide-react";

interface PricingSectionProps {
  plans: PricingPlan[];
  lang: LanguageMode;
  onSelectPlan: (daysPerWeek: number) => void;
}

export default function PricingSection({ plans, lang, onSelectPlan }: PricingSectionProps) {
  // Calculator States
  const [numStudents, setNumStudents] = useState<number>(1);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(3); // Default to 3 days/week
  const [duration, setDuration] = useState<number>(30); // 30 mins or 45 mins

  // Base price computation logic for calculator
  const getBasePrice = (days: number) => {
    if (days === 1) return 18;
    if (days === 2) return 30;
    if (days === 3) return 45;
    if (days === 4) return 58;
    if (days === 5) return 70;
    return 45;
  };

  const calculateTotal = () => {
    let base = getBasePrice(daysPerWeek);
    
    // Supplement for longer duration (45 mins adds +$12 per student)
    if (duration === 45) {
      base += 12;
    }

    let subTotal = base * numStudents;

    // Family discount: 10% for 2 students, 15% for 3+ students
    let discount = 0;
    if (numStudents === 2) {
      discount = 0.10;
    } else if (numStudents >= 3) {
      discount = 0.15;
    }

    const discountedPrice = subTotal * (1 - discount);
    return {
      rawSub: subTotal,
      final: Math.round(discountedPrice),
      discountAmount: Math.round(subTotal * discount),
      discountPercent: Math.round(discount * 100)
    };
  };

  const calcResult = calculateTotal();

  const t = {
    secTitle: {
      en: "Affordable Monthly Packages",
      ur: "انتہائی مناسب ماہانہ فیس پیکجز",
      roman: "Saste Monthly Fees Packages"
    },
    secSubtitle: {
      en: "Select a package based on weekly classes. Choose 30-min trial sessions first. Payments are made securely in US Dollars ($).",
      ur: "ہفتے کی کلاسز کے حساب سے اپنی پسند کا پیکج منتخب کریں۔ پہلے 3 دن کی بالکل مفت کلاس لے کر معیار پرکھیں۔",
      roman: "Haftey ki classes k hisab se package select karain. Pehle 3-Day free trial lekar check karain."
    },
    billingCycle: {
      en: "/ month",
      ur: "/ ماہانہ",
      roman: "/ month"
    },
    classesText: {
      en: "classes monthly",
      ur: "کلاسز ماہانہ",
      roman: "classes monthly"
    },
    popularBadge: {
      en: "MOST POPULAR",
      ur: "سب سے مقبول",
      roman: "MOST POPULAR"
    },
    ctaBtn: {
      en: "Start Free Trial",
      ur: "مفت ٹرائل ابھی شروع کریں",
      roman: "Free Trial Start Karain"
    },
    calcTitle: {
      en: "Calculate Your Custom Fees Quote",
      ur: "فیس کا خود اندازہ لگائیں (کوٹیشن کیلکولیٹر)",
      roman: "Apni Fee Estimate Calculate Karain"
    },
    calcSubtitle: {
      en: "Get instant custom pricing based on class days, duration, and family discounts.",
      ur: "بچوں کی تعداد، وقت کے دورانیے، اور کلاس کے دنوں کے حساب سے فوری رعایت کے ساتھ فیس معلوم کریں۔",
      roman: "Bacho ki tadad, class days aur duration k mutabiq instant quote hasil karain."
    },
    lblStudents: {
      en: "Number of Students (Family Discount)",
      ur: "طلباء کی تعداد (خصوصی رعایت حاصل کریں)",
      roman: "Students ki Tadad (Family Discount)"
    },
    lblDays: {
      en: "Classes per Week",
      ur: "ہفتہ وار کلاسز کی تعداد",
      roman: "Classes Per Week"
    },
    lblDuration: {
      en: "Class Duration",
      ur: "کلاس کا دورانیہ",
      roman: "Class Duration (Waqt)"
    },
    calcResultLabel: {
      en: "Estimated Fee:",
      ur: "متوقع کل فیس:",
      roman: "Estimated Fees:"
    },
    calcDisBadge: {
      en: "Saved with Family Discount!",
      ur: "خاندانی رعایت بچت!",
      roman: "Saved with Family Discount!"
    }
  };

  const isUr = lang === "ur";

  return (
    <section id="pricing-section" className="py-16 bg-[#0d1117] border-b border-white/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h3 className="text-xs tracking-[0.3em] text-emerald-500 uppercase font-bold mb-3">Flexible Tariffs</h3>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-white tracking-wide">
            {t.secTitle[lang]}
          </h2>
          <p className="mt-4 text-white/60 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {t.secSubtitle[lang]}
          </p>
          <div className="w-24 h-0.5 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Dynamic Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 pt-3">
          {plans.map((plan) => {
            const planTitle = lang === "en" 
              ? `${plan.daysPerWeek} Days / Week` 
              : lang === "ur" 
                ? `ہفتے میں ${plan.daysPerWeek} دن` 
                : `${plan.daysPerWeek} Din / Haftey`;

            const planFeatures = lang === "en" 
              ? plan.featuresEn 
              : lang === "ur" 
                ? plan.featuresUr 
                : plan.featuresRoman;

            return (
              <div
                key={plan.id}
                id={`plan-card-${plan.id}`}
                className={`flex flex-col justify-between rounded-xl p-6 relative transition-all duration-300 ${
                  plan.isPopular
                    ? "bg-[#0d1117] text-white shadow-xl shadow-emerald-950/40 border-2 border-emerald-500/30 scale-105 z-10"
                    : "bg-[#0a0c10] text-[#e0e0e0] border border-white/5 hover:border-emerald-500/20 hover:shadow-lg"
                }`}
              >
                {plan.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-[#0a0c10] text-[9px] font-bold px-3 py-0.5 tracking-widest uppercase rounded">
                    {t.popularBadge[lang]}
                  </span>
                )}

                <div className="mb-6">
                  <h3 className={`text-lg font-serif font-medium ${plan.isPopular ? "text-emerald-400" : "text-white"} mb-1`}>
                    {planTitle}
                  </h3>
                  <p className={`text-xs ${plan.isPopular ? "text-white/50" : "text-white/40"} mb-4`}>
                    {plan.classesPerMonth} {t.classesText[lang]}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className={`text-4xl font-serif font-semibold ${plan.isPopular ? "text-white" : "text-white"}`}>
                      ${plan.priceUSD}
                    </span>
                    <span className={`text-xs ${plan.isPopular ? "text-white/40" : "text-white/30"} font-medium`}>
                      {t.billingCycle[lang]}
                    </span>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-3">
                    {planFeatures.map((feat, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs">
                        <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span className={plan.isPopular ? "text-white/80" : "text-white/70"}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  id={`select-plan-${plan.id}`}
                  onClick={() => onSelectPlan(plan.daysPerWeek)}
                  className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-all duration-300 shadow-sm cursor-pointer ${
                    plan.isPopular
                      ? "bg-emerald-600 text-white hover:bg-emerald-500 border border-emerald-500/20"
                      : "bg-[#161a22] text-white hover:bg-[#1d222e] border border-white/5"
                  }`}
                >
                  {t.ctaBtn[lang]}
                </button>
              </div>
            );
          })}
        </div>

        {/* Dynamic Interactive Pricing Calculator */}
        <div id="calculator-box" className="bg-[#0a0c10] text-[#e0e0e0] p-6 md:p-8 rounded-xl shadow-2xl border border-white/5 relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>

          <div className="mb-6 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-serif font-medium text-emerald-400">
                {t.calcTitle[lang]}
              </h3>
              <p className="text-white/60 mt-1.5 text-xs">
                {t.calcSubtitle[lang]}
              </p>
            </div>
            
            {/* Discount Alert */}
            {numStudents > 1 && (
              <span className="self-start inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1.5 rounded-lg font-semibold border border-emerald-500/20">
                <Percent className="w-3.5 h-3.5" />
                <span>{numStudents === 2 ? "10% Family Discount Applied!" : "15% Family Discount Applied!"}</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center" style={{ direction: isUr ? "rtl" : "ltr" }}>
            
            {/* Input Side 1 */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-white/50 mb-2 flex items-center gap-1">
                  <span>{t.lblStudents[lang]}</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setNumStudents(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        numStudents === num
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950/20"
                          : "bg-[#0d1117] border-white/5 text-white/70 hover:bg-[#11141a]/60 hover:text-white"
                      }`}
                    >
                      {num === 4 ? "4+" : num} {num === 1 ? (lang === "ur" ? "طالب علم" : "Student") : (lang === "ur" ? "طلباء" : "Students")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Side 2 */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-white/50 mb-2">
                  {t.lblDays[lang]}
                </label>
                <div className="flex gap-2">
                  {[2, 3, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDaysPerWeek(d)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        daysPerWeek === d
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950/20"
                          : "bg-[#0d1117] border-white/5 text-white/70 hover:bg-[#11141a]/60 hover:text-white"
                      }`}
                    >
                      {d} {lang === "ur" ? "دن" : "Days"}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-white/50 mb-2">
                  {t.lblDuration[lang]}
                </label>
                <div className="flex gap-2">
                  {[30, 45].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setDuration(dur)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        duration === dur
                          ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-950/20"
                          : "bg-[#0d1117] border-white/5 text-white/70 hover:bg-[#11141a]/60 hover:text-white"
                      }`}
                    >
                      {dur} {lang === "ur" ? "منٹ" : "Minutes"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Result Panel */}
            <div className="bg-[#0d1117] p-5 rounded-xl border border-white/5 text-center space-y-4 shadow-inner">
              <span className="text-[10px] text-emerald-400 font-bold tracking-widest block uppercase">
                {lang === "en" ? "Interactive Quote" : lang === "ur" ? "فوری تخمینہ" : "Instant Quote"}
              </span>

              <div className="space-y-1">
                <span className="text-xs font-medium text-white/50">
                  {t.calcResultLabel[lang]}
                </span>
                <div className="flex items-center justify-center text-5xl font-serif font-semibold text-white">
                  <span className="text-emerald-500 text-3xl font-medium">$</span>
                  {calcResult.final}
                </div>
                <span className="text-[10px] text-white/40 font-medium">
                  {t.billingCycle[lang]}
                </span>
              </div>

              {calcResult.discountAmount > 0 && (
                <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-500/20 text-[11px] text-white/80 space-y-1">
                  <div className="font-semibold text-emerald-400 flex items-center justify-center gap-1">
                    <Percent className="w-3 h-3" />
                    <span>{numStudents} Students Bundle Save!</span>
                  </div>
                  <div>
                    {lang === "en" ? "You saved" : lang === "ur" ? "آپ کی بچت ہوئی:" : "Aapki bachat hui"}: <strong className="text-white">${calcResult.discountAmount}</strong> ({calcResult.discountPercent}%)
                  </div>
                </div>
              )}

              <button
                type="button"
                id="calc-cta-btn"
                onClick={() => onSelectPlan(daysPerWeek)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg text-xs transition-all shadow-md mt-2 border border-white/10 cursor-pointer"
              >
                {t.ctaBtn[lang]}
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
