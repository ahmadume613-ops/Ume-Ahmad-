import React, { useState } from "react";
import { Mail, Phone, MapPin, Check, Send, AlertCircle, PhoneCall, Video, Users } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    preferredPlatform: "Zoom",
    studentsCount: "1 Student",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const existingStr = localStorage.getItem("contact_messages") || "[]";
      const existing = JSON.parse(existingStr);
      
      const newMessage = {
        ...formData,
        id: "msg_" + Date.now(),
        dateCreated: new Date().toISOString()
      };

      existing.unshift(newMessage);
      localStorage.setItem("contact_messages", JSON.stringify(existing));

      setIsSubmitting(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", preferredPlatform: "Zoom", studentsCount: "1 Student", message: "" });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" id="contactpage-container">
      <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
          Get in Touch
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-sans tracking-tight">
          How Can We Help You?
        </h2>
        <p className="text-emerald-950/60 text-sm leading-relaxed font-sans">
          Have questions about pricing, curriculum, or scheduling? Drop us a line, and our coordination team will reply within 1-2 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-content-grid">
        {/* Left Information Cards */}
        <div className="lg:col-span-5 space-y-6" id="contact-info-cards">
          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-md space-y-4" id="card-email">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-emerald-950">Email Support</h4>
              <p className="text-xs text-emerald-950/50">For general queries & billing support</p>
              <p className="text-sm font-semibold text-emerald-800 mt-2">ahmadume613@gmail.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-md space-y-4" id="card-phone">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-emerald-950">Direct WhatsApp</h4>
              <p className="text-xs text-emerald-950/50">For immediate coordinator assistance</p>
              <p className="text-sm font-semibold text-emerald-800 mt-2">+92 334 5750157 (WhatsApp Support)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-md space-y-4" id="card-address">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-emerald-950">Academy Address</h4>
              <p className="text-xs text-emerald-950/50">Our primary operational location</p>
              <p className="text-sm font-semibold text-emerald-950/80 leading-relaxed font-sans mt-2">
                Rawalpindi / Islamabad, Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-emerald-950/10 shadow-lg p-6 sm:p-8" id="contact-form-wrapper">
          <h3 className="text-xl font-bold text-emerald-950 mb-2">Send Message Directly</h3>
          <p className="text-xs text-emerald-950/50 mb-6 font-sans">
            Your messages are recorded securely and checked regularly by our academy coordinator.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" id="contact-inner-form">
            <div>
              <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                Subject
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-emerald-700" />
                  Preferred Platform
                </label>
                <select
                  id="contact-platform-select"
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

              <div>
                <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  Number of Students / Siblings
                </label>
                <select
                  id="contact-students-select"
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

            <div>
              <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                Message Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Explain details of your question here..."
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  Your message has been sent successfully! Our coordinator will contact you shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}
