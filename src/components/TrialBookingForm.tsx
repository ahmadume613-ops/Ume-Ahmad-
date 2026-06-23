import React, { useState } from "react";
import { Course, LanguageMode, TrialBooking } from "../types";
import { timezoneOptions } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle, HelpCircle } from "lucide-react";

interface TrialBookingFormProps {
  courses: Course[];
  lang: LanguageMode;
  onBookingSuccess: () => void;
}

export default function TrialBookingForm({ courses, lang, onBookingSuccess }: TrialBookingFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    parentName: "",
    email: "",
    whatsapp: "",
    courseId: courses[0]?.id || "",
    timeZone: "EST (US Eastern Standard Time - New York)",
    preferredDays: [] as string[],
    preferredTimeSlot: "Evening",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const daysOfWeek = [
    { key: "Mon", en: "Monday", ur: "پیر", roman: "Monday" },
    { key: "Tue", en: "Tuesday", ur: "منگل", roman: "Tuesday" },
    { key: "Wed", en: "Wednesday", ur: "بدھ", roman: "Wednesday" },
    { key: "Thu", en: "Thursday", ur: "جمعرات", roman: "Thursday" },
    { key: "Fri", en: "Friday", ur: "جمعہ", roman: "Friday" },
    { key: "Sat", en: "Saturday", ur: "ہفتہ", roman: "Saturday" },
    { key: "Sun", en: "Sunday", ur: "اتوار", roman: "Sunday" }
  ];

  const timeSlots = [
    { value: "Morning", en: "Morning (Fajr/Zohr)", ur: "صبح کا وقت", roman: "Subah (Morning)" },
    { value: "Afternoon", en: "Afternoon (Asr)", ur: "دوپہر کا وقت", roman: "Dopehar (Afternoon)" },
    { value: "Evening", en: "Evening (Maghrib/Isha)", ur: "شام کا وقت", roman: "Shaam (Evening)" },
    { value: "Night", en: "Night (Late hours)", ur: "رات کا وقت", roman: "Raat (Night)" },
  ];

  const t = {
    formTitle: {
      en: "Register For 3-Day Free Trial",
      ur: "3 دن کی مفت ٹرائل کلاس ابھی بک کریں",
      roman: "3 Days Free Trial Register Karain"
    },
    formSubtitle: {
      en: "No Credit Card required. Experience our professional teaching style free for 3 days.",
      ur: "کسی کریڈٹ کارڈ کی ضرورت نہیں۔ ہمارے پڑھانے کا انداز بالکل مفت جانچیں۔",
      roman: "No Credit Card zaroorat. Hamara parhane ka quality level bilkul free test karain."
    },
    labelName: { en: "Student Full Name", ur: "طالبِ علم کا مکمل نام", roman: "Student Ka Naam" },
    labelAge: { en: "Student Age", ur: "عمر (سال)", roman: "Student Age" },
    labelParent: { en: "Parent Name (If student is minor)", ur: "سرپرست کا نام (اگر بچہ ہے)", roman: "Walid/Parent Naam" },
    labelEmail: { en: "Email Address", ur: "ای میل ایڈریس", roman: "Email Address" },
    labelWhatsapp: { en: "WhatsApp Number (With Country Code)", ur: "واٹس ایپ نمبر (ملکی کوڈ کے ساتھ)", roman: "WhatsApp Number" },
    labelCourse: { en: "Select Desired Course", ur: "کورس کا انتخاب کریں", roman: "Course Select Karain" },
    labelTimezone: { en: "Your Local Time Zone", ur: "اپنا ٹائم زون منتخب کریں", roman: "Apna Timezone Select Karain" },
    labelDays: { en: "Preferred Class Days", ur: "پسندیدہ دن", roman: "Class k pasandida din" },
    labelSlot: { en: "Preferred Time Slot", ur: "پسندیدہ وقت", roman: "Pasandida waqt (Slot)" },
    btnSubmit: { en: "Submit Trial Request", ur: "درخواست جمع کروائیں", roman: "Trial Request Submit Karain" },
    successTitle: { en: "JazakAllah! Registered Successfully", ur: "جزاک اللہ! کامیابی", roman: "JazakAllah! Booked" },
    successMsg: {
      en: "Your 3-Day free trial registration has been received successfully! Our academic coordinator will contact you on WhatsApp/Email very shortly.",
      ur: "آپ کا 3 دن کا مفت ٹرائل کامیابی کے ساتھ رجسٹر ہو چکا ہے۔ ہمارا نمائندہ بہت جلد آپ سے واٹس ایپ پر رابطہ کرے گا۔",
      roman: "Aap ka 3-Day free trial register ho chuka hai. Hamara coordinator boht jald aap se WhatsApp/Email par rabta karega."
    },
    successCta: { en: "Got It", ur: "ٹھیک ہے", roman: "Theek Hai" }
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => {
      const active = prev.preferredDays.includes(day)
        ? prev.preferredDays.filter(d => d !== day)
        : [...prev.preferredDays, day];
      return { ...prev, preferredDays: active };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.whatsapp || !formData.email) {
      alert("Please fill in the required fields (Name, WhatsApp, Email)");
      return;
    }

    setIsSubmitting(true);

    // Create unique trial booking object
    const newBooking: TrialBooking = {
      id: "booking_" + Date.now(),
      fullName: formData.fullName,
      age: formData.age,
      parentName: formData.parentName || undefined,
      email: formData.email,
      whatsapp: formData.whatsapp,
      courseId: formData.courseId,
      timeZone: formData.timeZone,
      preferredDays: formData.preferredDays.length > 0 ? formData.preferredDays : ["Flexible"],
      preferredTimeSlot: formData.preferredTimeSlot,
      status: "pending",
      createdAt: new Date().toLocaleString(),
    };

    // Save to localStorage
    setTimeout(() => {
      const existingBookingsRaw = localStorage.getItem("quran_academy_bookings");
      const existingBookings: TrialBooking[] = existingBookingsRaw ? JSON.parse(existingBookingsRaw) : [];
      existingBookings.unshift(newBooking);
      localStorage.setItem("quran_academy_bookings", JSON.stringify(existingBookings));

      setIsSubmitting(false);
      setShowSuccess(true);

      // Reset Form
      setFormData({
        fullName: "",
        age: "",
        parentName: "",
        email: "",
        whatsapp: "",
        courseId: courses[0]?.id || "",
        timeZone: "EST (US Eastern Standard Time - New York)",
        preferredDays: [],
        preferredTimeSlot: "Evening",
      });

      onBookingSuccess(); // Signal updates to parent/admin
    }, 900);
  };

  const isUr = lang === "ur";
  const alignClass = isUr ? "text-right" : "text-left";

  return (
    <div id="trial-booking-form-box" className="bg-white text-slate-800 rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200 relative overflow-hidden">
      {/* Decorative Golden Pattern Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.03] rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/[0.03] rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>

      <div className="mb-8 relative z-10 text-center">
        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs px-3.5 py-1.5 rounded-full font-bold border border-emerald-200/60 mb-4 shadow-3xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          {lang === "en" ? "FREE 3-DAY TRIAL CLASS" : lang === "ur" ? "3 دن بالکل مفت ٹرائل حاصل کریں" : "3-Day Free Trial"}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold tracking-wide text-slate-900">
          {t.formTitle[lang]}
        </h2>
        <p className="text-slate-600 mt-2.5 text-sm max-w-lg mx-auto leading-relaxed">
          {t.formSubtitle[lang]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-5 relative z-10 ${alignClass}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
        {/* Name Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.labelName[lang]}</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={lang === "ur" ? "طالب علم کا نام" : "Student Full Name"}
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.labelAge[lang]}</span>
            </label>
            <input
              type="number"
              placeholder={lang === "ur" ? "عمر" : "Age"}
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
            />
          </div>
        </div>

        {/* Parent / Email Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.labelParent[lang]}</span>
            </label>
            <input
              type="text"
              placeholder={lang === "ur" ? "والد یا والدہ کا نام" : "Parent's Name"}
              value={formData.parentName}
              onChange={e => setFormData({ ...formData, parentName: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all font-medium placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.labelEmail[lang]}</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="example@mail.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all font-mono font-medium placeholder-slate-400"
            />
          </div>
        </div>

        {/* Whatsapp Contact & Course */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.labelWhatsapp[lang]}</span> <span className="text-rose-500">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+1 (234) 567-8900"
              value={formData.whatsapp}
              onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all font-mono font-medium placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
              {t.labelCourse[lang]}
            </label>
            <select
              value={formData.courseId}
              onChange={e => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all cursor-pointer font-medium"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id} className="bg-white text-slate-800">
                  {lang === "en" ? course.titleEn : lang === "ur" ? course.titleUr : course.titleRoman}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timezone Section */}
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2">
            {t.labelTimezone[lang]}
          </label>
          <select
            value={formData.timeZone}
            onChange={e => setFormData({ ...formData, timeZone: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-700 focus:border-emerald-700 focus:bg-white transition-all cursor-pointer font-medium"
          >
            {timezoneOptions.map(tz => (
              <option key={tz} value={tz} className="bg-white text-slate-800">
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Schedule Days */}
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2.5">
            {t.labelDays[lang]}
          </label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(d => {
              const active = formData.preferredDays.includes(d.key);
              return (
                <button
                  key={d.key}
                  type="button"
                  onClick={() => handleDayToggle(d.key)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    active
                      ? "bg-emerald-750 border-emerald-600 text-white shadow-sm shadow-emerald-750/10"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {lang === "ur" ? d.ur : lang === "roman" ? d.roman : d.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preferred Time Slot */}
        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 tracking-wider mb-2.5">
            {t.labelSlot[lang]}
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            {timeSlots.map(slot => {
              const active = formData.preferredTimeSlot === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredTimeSlot: slot.value })}
                  className={`p-2.5 rounded-xl text-xs font-bold border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                    active
                      ? "bg-emerald-750 border-emerald-600 text-white shadow-sm shadow-emerald-750/10"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Clock className={`w-4 h-4 ${active ? "text-amber-300" : "text-emerald-750"}`} />
                  <span>{lang === "ur" ? slot.ur : lang === "roman" ? slot.roman : slot.en}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-emerald-700 hover:bg-emerald-850 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
            )}
            <span>{t.btnSubmit[lang]}</span>
          </button>
        </div>
      </form>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/98 z-30 flex items-center justify-center p-6 text-center"
          >
            <motion.div
               initial={{ scale: 0.95, y: 15 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.95, y: 15 }}
               className="max-w-md space-y-5"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-850 border border-emerald-250 shadow-sm animate-pulse">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-slate-900">
                {t.successTitle[lang]}
              </h3>
              <p className="text-slate-650 text-sm leading-relaxed font-semibold">
                {t.successMsg[lang]}
              </p>
              <div className="flex justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccess(false);
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-xl text-xs tracking-wider transition-all cursor-pointer shadow-sm uppercase"
                >
                  {t.successCta[lang]}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
