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
    { value: "Morning", en: "Morning (Fajr/Zohr time)", ur: "صبح کا وقت", roman: "Subah (Morning)" },
    { value: "Afternoon", en: "Afternoon (Asr time)", ur: "دوپہر کا وقت", roman: "Dopehar (Afternoon)" },
    { value: "Evening", en: "Evening (Maghrib/Isha time)", ur: "شام کا وقت", roman: "Shaam (Evening)" },
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
    successTitle: { en: "JazakAllah! Success", ur: "جزاک اللہ! کامیابی", roman: "JazakAllah! Booked" },
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
    <div id="trial-booking-form-box" className="bg-[#0a0c10] text-[#e0e0e0] rounded-xl shadow-2xl p-6 md:p-8 border border-white/5 relative overflow-hidden">
      {/* Decorative Golden Pattern Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>

      <div className="mb-6 relative z-10 text-center">
        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full font-semibold border border-emerald-500/20 mb-3 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          {lang === "en" ? "FREE 3-DAY TRIAL" : lang === "ur" ? "3 دن بالکل مفت ٹرائل حاصل کریں" : "3 Days Free Trial"}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-semibold tracking-wide text-white">
          {t.formTitle[lang]}
        </h2>
        <p className="text-white/60 mt-2 text-sm max-w-lg mx-auto leading-relaxed">
          {t.formSubtitle[lang]}
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`space-y-4 relative z-10 ${alignClass}`} style={{ direction: isUr ? "rtl" : "ltr" }}>
        {/* Name Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/55 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              {t.labelName[lang]} <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder={lang === "ur" ? "طالب علم کا نام" : "Student Name"}
              value={formData.fullName}
              onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-serif"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/55 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              {t.labelAge[lang]}
            </label>
            <input
              type="number"
              placeholder={lang === "ur" ? "عمر" : "Age"}
              value={formData.age}
              onChange={e => setFormData({ ...formData, age: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Parent / Email Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/55 mb-1.5 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              {t.labelParent[lang]}
            </label>
            <input
              type="text"
              placeholder={lang === "ur" ? "والد یا والدہ کا نام" : "Parent's Full Name"}
              value={formData.parentName}
              onChange={e => setFormData({ ...formData, parentName: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/55 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              {t.labelEmail[lang]} <span className="text-rose-400">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="example@mail.com"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
          </div>
        </div>

        {/* Whatsapp Contact & Course */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-white/55 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              {t.labelWhatsapp[lang]} <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+1 (234) 567-8900"
              value={formData.whatsapp}
              onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/55 mb-1.5">
              {t.labelCourse[lang]}
            </label>
            <select
              value={formData.courseId}
              onChange={e => setFormData({ ...formData, courseId: e.target.value })}
              className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
            >
              {courses.map(course => (
                <option key={course.id} value={course.id} className="bg-[#0a0c10] text-[#e0e0e0]">
                  {lang === "en" ? course.titleEn : lang === "ur" ? course.titleUr : course.titleRoman}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timezone Section */}
        <div>
          <label className="block text-xs font-semibold text-white/55 mb-1.5">
            {t.labelTimezone[lang]}
          </label>
          <select
            value={formData.timeZone}
            onChange={e => setFormData({ ...formData, timeZone: e.target.value })}
            className="w-full bg-[#0d1117] border border-white/5 rounded-lg py-2.5 px-3 text-white text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all cursor-pointer"
          >
            {timezoneOptions.map(tz => (
              <option key={tz} value={tz} className="bg-[#0a0c10] text-[#e0e0e0]">
                {tz}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Schedule Days */}
        <div>
          <label className="block text-xs font-semibold text-white/55 mb-2">
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    active
                      ? "bg-emerald-600 border-emerald-500 text-white font-semibold shadow-md shadow-emerald-950/20"
                      : "bg-[#0d1117] border-white/5 text-white/75 hover:bg-[#11141a]/60 hover:text-white"
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
          <label className="block text-xs font-semibold text-white/55 mb-2">
            {t.labelSlot[lang]}
          </label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {timeSlots.map(slot => {
              const active = formData.preferredTimeSlot === slot.value;
              return (
                <button
                  key={slot.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, preferredTimeSlot: slot.value })}
                  className={`p-2.5 rounded-lg text-xs font-medium border text-center transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    active
                      ? "bg-emerald-600 border-emerald-500 text-white font-semibold shadow-md shadow-emerald-950/20"
                      : "bg-[#0d1117] border-white/5 text-white/75 hover:bg-[#11141a]/60 hover:text-white"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
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
            className={`w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg border border-white/10 hover:translate-y-[-1px] transition-all text-sm flex items-center justify-center gap-2 cursor-pointer ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Sparkles className="w-4 h-4 text-white" />
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
            className="absolute inset-0 bg-[#0a0c10]/95 backdrop-blur-sm z-30 flex items-center justify-center p-6 text-center"
          >
            <motion.div
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               exit={{ scale: 0.9, y: 20 }}
               className="max-w-md space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-950/60 rounded-full flex items-center justify-center mx-auto text-emerald-400 border border-emerald-500/20 shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-serif font-medium text-emerald-400">
                {t.successTitle[lang]}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t.successMsg[lang]}
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSuccess(false);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-2.5 rounded-lg text-xs tracking-wide transition-all cursor-pointer border border-white/5"
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
