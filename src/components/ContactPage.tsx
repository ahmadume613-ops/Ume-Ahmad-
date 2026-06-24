import { Course, LanguageMode, AcademyConfig } from "../types";
import TrialBookingForm from "./TrialBookingForm";
import { Mail, Phone, Clock, MessageSquare, Shield, Globe, MessageCircle, MapPin } from "lucide-react";

interface ContactPageProps {
  courses: Course[];
  lang: LanguageMode;
  config: AcademyConfig;
  onBookingSuccess: () => void;
}

export default function ContactPage({
  courses,
  lang,
  config,
  onBookingSuccess
}: ContactPageProps) {

  // Pre-fill whatsapp message link helper using the requested direct URL
  const getWhatsappLink = () => {
    const num = config.whatsapp.replace(/\D/g, "");
    const textMsg = encodeURIComponent(
      `Assalamoalaikum, I am visiting Worldwide Quran Academy website and I want to book a free 3-Day trial class for myself/my children. Please guide me about schedules.`
    );
    return `https://wa.me/${num || "923345750157"}?text=${textMsg}`;
  };

  const t = {
    title: {
      en: "Register & Connect With Us",
      ur: "مفت رجسٹریشن اور رابطہ فارم",
      roman: "Register & Connect With Us"
    },
    subtitle: {
      en: "Have questions or ready to book your free 3-Day trial lessons? Use our fast online form or reach out directly on WhatsApp/Skype.",
      ur: "کیا آپ اپنے بچوں کے لیے مفت 3 روزہ ٹرائل کلاسز شروع کرنا چاہتے ہیں؟ ابھی نیچے دیا گیا رجسٹریشن فارم پُر کریں یا واٹس ایپ پر رابطہ کریں۔",
      roman: "Kya aap free trial classes start krna chahte hain? Form fill karain ya direct WhatsApp pr rabta karain."
    },
    infoTitle: {
      en: "Direct Academic Coordinates",
      ur: "براہِ راست رابطے کے ذرائع",
      roman: "Helpline & Coordinators"
    },
    infoDesc: {
      en: "Our administrative desk handles admissions and schedules 24/7. Connect instantly with our coordinator.",
      ur: "ہماری انتظامیہ چوبیس گھنٹے داخلوں اور کلاسز کے شیڈول کی نگرانی کے لیے دستیاب ہے۔",
      roman: "Hamari administration desk 24 hours schedule setup aur class setup ke liye active rhti hai."
    }
  };

  return (
    <div className="flex-1 bg-slate-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-850 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider border border-emerald-250 mb-4 shadow-3xs">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
            <span>{lang === "en" ? "24/7 Instant Admission Desk" : "تعلیمی داخلہ ڈیسک"}</span>
          </span>
          <h1 className="text-3xl md:text-4.5xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.title[lang]}
          </h1>
          <p className="mt-4 text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-medium">
            {t.subtitle[lang]}
          </p>
        </div>

        {/* Form and Contact details side-by-side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Embed TrialBookingForm */}
          <div className="lg:col-span-7">
            <TrialBookingForm 
              courses={courses} 
              lang={lang} 
              onBookingSuccess={onBookingSuccess} 
            />
          </div>

          {/* Right Column: Contact info panel */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Coordinates Dashboard card */}
            <div className="bg-white p-7 rounded-2.5xl border border-slate-200/80 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.01] rounded-full blur-2xl pointer-events-none"></div>
              
              <h2 className="text-base md:text-lg font-serif font-bold text-slate-900 mb-2">
                {t.infoTitle[lang]}
              </h2>
              <p className="text-slate-500 text-xs leading-relaxed mb-6 font-medium">
                {t.infoDesc[lang]}
              </p>

              <div className="space-y-4">
                {/* Phone & Whatsapp */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 shadow-3xs">
                    <Phone className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">24/7 Phone helpline</h4>
                    <p className="text-sm font-bold text-slate-800 tracking-wide font-mono mt-0.5">{config.phone}</p>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 shadow-3xs">
                    <Mail className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Office Email</h4>
                    <p className="text-sm font-bold text-slate-800 tracking-wide mt-0.5">{config.email}</p>
                  </div>
                </div>

                {/* Live portals */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 shadow-3xs">
                    <Globe className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Digital Platforms</h4>
                    <p className="text-xs font-bold text-slate-800 mt-1">Zoom • Skype • WhatsApp Voice Call</p>
                  </div>
                </div>

                {/* Management Office location */}
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-100 shadow-3xs">
                    <MapPin className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Global Operations</h4>
                    <p className="text-xs font-bold text-slate-800 mt-1">Islamabad, Pakistan (Coordinating UK, USA, Canada, Australia Zones)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="bg-gradient-to-br from-emerald-750 to-emerald-950 text-white p-7 rounded-2.5xl shadow-md border border-emerald-700/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-emerald-900/15 pointer-events-none opacity-40"></div>
              <div className="absolute top-0 right-10 w-32 h-32 bg-amber-400/[0.04] rounded-full blur-2xl pointer-events-none"></div>

              <div className="space-y-4 relative z-10">
                <span className="bg-amber-400/20 text-amber-300 text-[9px] tracking-widest font-extrabold px-3 py-1 rounded-full uppercase border border-amber-300/30 inline-block">
                  WhatsApp Admission Desk
                </span>
                <h3 className="text-base font-serif font-bold leading-snug">
                  Prefer a Chat? Start Instantly on WhatsApp
                </h3>
                <p className="text-emerald-100 text-xs leading-relaxed font-medium">
                  Skip the form and chat with our online representative directly. We can arrange your trial schedules and pair you with a male or female teacher in under 5 minutes.
                </p>

                <a
                  href={getWhatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold py-3 px-6 rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm cursor-pointer w-full"
                >
                  <MessageCircle className="w-4.5 h-4.5 text-emerald-950 fill-emerald-950 animate-bounce" />
                  <span>Start Live WhatsApp Chat</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
