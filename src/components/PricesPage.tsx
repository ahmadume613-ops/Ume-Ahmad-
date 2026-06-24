import { PricingPlan, LanguageMode } from "../types";
import PricingSection from "./PricingSection";
import { ShieldCheck, Percent, HelpCircle, ArrowRight, Star, Heart } from "lucide-react";

interface PricesPageProps {
  plans: PricingPlan[];
  lang: LanguageMode;
  onSelectPlan: (daysPerWeek: number) => void;
}

export default function PricesPage({ plans, lang, onSelectPlan }: PricesPageProps) {
  
  const t = {
    title: {
      en: "Simple, Transparent & Flexible Fees",
      ur: "انتہائی مناسب اور لچکدار فیس پلان",
      roman: "Simple Aur Flexible Fee Structure"
    },
    subtitle: {
      en: "Affordable monthly packages for international students from USA, Canada, UK, and Australia. Multiple siblings get an automatic 10% discount!",
      ur: "بیرونِ ملک مقیم طلباء کے لیے خصوصی رعایتی پیکجز۔ ایک سے زائد بچوں کی رجسٹریشن پر خصوصی 10 فیصد ڈسکاؤنٹ حاصل کریں۔",
      roman: "Overseas students ke liye affordable rates. Sibling (bhai behen) ki registration pr automatic 10% discount diya jaega."
    },
    paymentMethodsTitle: {
      en: "Multiple Secure Payment Gateways Supported",
      ur: "محفوظ ادائیگی کے طریقے",
      roman: "Secure Payment Methods"
    },
    guaranteeTitle: {
      en: "100% Satisfaction Guarantee",
      ur: "کلاسز کی سو فیصد ضمانت",
      roman: "100% Satisfaction Guarantee"
    },
    guaranteeDesc: {
      en: "We offer a 3-Day free trial. If you are not completely satisfied with your tutor, you can request a change of tutor or cancel your registration immediately.",
      ur: "اگر آپ کلاس یا اپنے تفویض کردہ استاد سے مطمئن نہیں ہیں تو آپ کسی بھی وقت تبدیل یا کینسل کروا سکتے ہیں۔",
      roman: "Agar aap apne tutor se satisfies nahi hain tou aap kisi bhi waqt teacher change krwa sakte hain."
    }
  };

  const isUr = lang === "ur";

  return (
    <div className="flex-1 bg-white">
      
      {/* Page Header */}
      <div className="bg-gradient-to-b from-emerald-50/20 via-neutral-50/40 to-white py-16 text-center border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 mb-4 shadow-3xs">
            <Percent className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === "en" ? "Sibling Discounts Available" : "ڈسکاؤنٹ آفرز"}</span>
          </span>
          
          <h1 className="text-3xl md:text-4.5xl font-serif font-extrabold text-slate-900 leading-tight">
            {t.title[lang]}
          </h1>
          
          <p className="mt-4 text-slate-650 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.subtitle[lang]}
          </p>
          
          {/* Sibling Badge banner */}
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 rounded-2xl p-4 text-left max-w-md shadow-3xs mx-auto">
            <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl">
              <Star className="w-5 h-5 text-amber-600 fill-amber-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                {lang === "en" ? "Special Family Package Offer" : "خصوصی فیملی ڈسکاؤنٹ"}
              </h4>
              <p className="text-[10.5px] text-slate-600 mt-0.5 font-medium leading-normal">
                {lang === "en" 
                  ? "Registering 2 or more children? Get an instant 10% flat discount on the secondary packages. Ask your coordinator."
                  : "دو یا زائد بچوں کے داخلے پر دوسرے پیکیج پر فلیٹ 10 فیصد ڈسکاؤنٹ پائیں۔ معلومات واٹس ایپ پر حاصل کریں۔"}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Embed the beautiful, dynamic core pricing module */}
      <div className="py-2">
        <PricingSection plans={plans} lang={lang} onSelectPlan={onSelectPlan} />
      </div>

      {/* Trust & Guarantee Badges Section */}
      <section className="py-16 bg-neutral-50/50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Guarantee details */}
            <div className="bg-white p-6.5 md:p-8 rounded-2.5xl border border-slate-200/80 shadow-sm flex gap-4.5">
              <div className="bg-emerald-50 text-emerald-800 p-3.5 rounded-xl h-fit border border-emerald-100 shadow-3xs shrink-0">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold font-serif text-slate-900">
                  {t.guaranteeTitle[lang]}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {t.guaranteeDesc[lang]}
                </p>
                <div className="flex gap-2 items-center text-[10px] text-emerald-800 font-bold tracking-wider uppercase pt-1">
                  <span>3-Day Free Trial</span>
                  <span>•</span>
                  <span>No upfront payment required</span>
                </div>
              </div>
            </div>

            {/* Billing support */}
            <div className="bg-white p-6.5 md:p-8 rounded-2.5xl border border-slate-200/80 shadow-sm flex gap-4.5">
              <div className="bg-amber-50 text-amber-800 p-3.5 rounded-xl h-fit border border-amber-100 shadow-3xs shrink-0">
                <HelpCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold font-serif text-slate-900">
                  {lang === "en" ? "How Do I Pay The Monthly Fees?" : "فیس کی ادائیگی کا طریقہ"}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  {lang === "en" 
                    ? "After your 3-day trial is finished and you are 100% satisfied with the teacher, our administrator will share a secure invoice link. You can easily pay with Visa, MasterCard, PayPal, Stripe, or direct bank transfer."
                    : "ٹرائل کلاسز ختم ہونے کے بعد، فیس کی ادائیگی کے لیے ہماری انتظامیہ آپ کو محفوظ آن لائن لنک بھیجے گی جس کے ذریعے آپ آسانی سے کریڈٹ کارڈ یا پے پال سے ادائیگی کر سکتے ہیں۔"}
                </p>
                <div className="flex gap-1.5 items-center pt-2">
                  <span className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-extrabold tracking-widest uppercase">VISA</span>
                  <span className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-extrabold tracking-widest uppercase">MASTERCARD</span>
                  <span className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-extrabold tracking-widest uppercase">PAYPAL</span>
                  <span className="text-[9px] bg-slate-100 px-2 py-1 rounded text-slate-500 font-extrabold tracking-widest uppercase">STRIPE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
