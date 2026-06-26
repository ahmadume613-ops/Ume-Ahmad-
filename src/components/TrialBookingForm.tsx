import React, { useState } from "react";
import { BookOpen, User, Mail, Calendar, MapPin, MessageSquare, Check, PhoneCall, Video, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { COURSES } from "../data";

interface TrialBookingFormProps {
  onSuccess: () => void;
  language: string;
}

export default function TrialBookingForm({ onSuccess, language }: TrialBookingFormProps) {
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    email: "",
    whatsapp: "",
    country: "",
    courseId: COURSES[0].id,
    preferredTime: "Evening",
    preferredPlatform: "Zoom",
    studentsCount: "1 Student",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/book-trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      let serverData;
      if (response.ok) {
        serverData = await response.json();
      }

      // Also update local storage so local cached lists are in sync
      const existingStr = localStorage.getItem("trial_bookings") || "[]";
      const existing = JSON.parse(existingStr);
      const newBooking = serverData?.data || {
        ...formData,
        id: "b_" + Date.now(),
        dateCreated: new Date().toISOString()
      };
      existing.unshift(newBooking);
      localStorage.setItem("trial_bookings", JSON.stringify(existing));

      setSuccess(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      // Fallback to local storage in case of any network/server glitches
      const existingStr = localStorage.getItem("trial_bookings") || "[]";
      const existing = JSON.parse(existingStr);
      const newBooking = {
        ...formData,
        id: "b_" + Date.now(),
        dateCreated: new Date().toISOString()
      };
      existing.unshift(newBooking);
      localStorage.setItem("trial_bookings", JSON.stringify(existing));
      setSuccess(true);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        onSuccess();
      }, 2500);
    }
  };

  const countries = [
    "United Kingdom", "United States", "Canada", "Australia", 
    "Germany", "France", "Singapore", "Saudi Arabia", "UAE", "Other"
  ];

  return (
    <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xl overflow-hidden p-6 sm:p-8" id="trial-booking-form-card">
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="booking-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6 text-center">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
                Start Learning
              </span>
              <h3 className="text-2xl font-bold text-emerald-950">Book Your 3-Day Free Trial</h3>
              <p className="text-sm text-emerald-950/60 mt-1">
                No credit card required. Cancel anytime. Private 1-to-1 interactive classes on your preferred platform.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" id="trial-class-inner-form">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  Student Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter student's name"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                />
              </div>

              {/* Parent Name (Optional, for kids) */}
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                  Parent/Guardian Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  placeholder="Enter parent's name"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                />
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-700" />
                  WhatsApp Number (with Country Code)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+44 7911 123456"
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Country */}
                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-white text-emerald-950"
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Preferred Timing */}
                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                    Preferred Timing
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-white text-emerald-950"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Weekend">Weekend Only</option>
                  </select>
                </div>
              </div>

              {/* Course Selection */}
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  Select Course
                </label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-white text-emerald-950"
                >
                  {COURSES.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Preferred Learning Platform */}
                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                    <Video className="w-3.5 h-3.5 text-emerald-700" />
                    Preferred Learning Platform
                  </label>
                  <select
                    id="booking-platform-select"
                    value={formData.preferredPlatform}
                    onChange={(e) => setFormData({ ...formData, preferredPlatform: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-white text-emerald-950"
                  >
                    <option value="Zoom">Zoom</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="Google Meet">Google Meet</option>
                    <option value="WhatsApp Class">WhatsApp Class</option>
                  </select>
                </div>

                {/* Number of Students / Siblings */}
                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-700" />
                    Number of Students / Siblings
                  </label>
                  <select
                    id="booking-students-select"
                    value={formData.studentsCount}
                    onChange={(e) => setFormData({ ...formData, studentsCount: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-white text-emerald-950"
                  >
                    <option value="1 Student">1 Student</option>
                    <option value="2 Students">2 Students</option>
                    <option value="3 Students">3 Students</option>
                    <option value="4+ Students">4+ Students</option>
                  </select>
                </div>
              </div>

              {/* Extra notes */}
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  Notes / Special Requirements (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Kid is 6 years old, prefer female teacher, Arabic speaker etc."
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                />
              </div>

              <button
                type="submit"
                id="submit-booking-btn"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Book Free Trial Class"
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="booking-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-800 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-950">Registration Received!</h3>
            <p className="text-sm text-emerald-950/60 mt-2 max-w-sm">
              We have successfully registered your 3-Day Free Trial! An academy coordinator will reach out to you on <strong>WhatsApp/Email</strong> within 1-2 hours to arrange class schedules.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
