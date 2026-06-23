import React, { useState, useEffect } from "react";
import { AcademyConfig, Course, PricingPlan, TrialBooking } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { 
  Settings, Save, BookOpen, DollarSign, Users, Check, Trash2, 
  Sparkles, ShieldCheck, X, Eye, Phone, RefreshCw, Layers 
} from "lucide-react";

interface CustomizerSettingsProps {
  currentConfig: AcademyConfig;
  courses: Course[];
  plans: PricingPlan[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (newConfig: AcademyConfig) => void;
  onUpdateCourses: (newCourses: Course[]) => void;
  onUpdatePlans: (newPlans: PricingPlan[]) => void;
  bookingTrigger: number; // Trigger reload of bookings list whenever booking is made
}

export default function CustomizerSettings({
  currentConfig,
  courses,
  plans,
  isOpen,
  onClose,
  onUpdateConfig,
  onUpdateCourses,
  onUpdatePlans,
  bookingTrigger
}: CustomizerSettingsProps) {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  // Edit forms states
  const [configForm, setConfigForm] = useState<AcademyConfig>({ ...currentConfig });
  const [plansForm, setPlansForm] = useState<PricingPlan[]>(JSON.parse(JSON.stringify(plans)));
  const [coursesForm, setCoursesForm] = useState<Course[]>(JSON.parse(JSON.stringify(courses)));
  const [bookings, setBookings] = useState<TrialBooking[]>([]);

  // Active Tab: details | courses | pricing | bookings
  const [activeTab, setActiveTab] = useState<"details" | "courses" | "pricing" | "bookings">("details");

  // Notifications
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Sync state if props change (especially on mount)
  useEffect(() => {
    setConfigForm({ ...currentConfig });
  }, [currentConfig]);

  useEffect(() => {
    setPlansForm(JSON.parse(JSON.stringify(plans)));
  }, [plans]);

  useEffect(() => {
    setCoursesForm(JSON.parse(JSON.stringify(courses)));
  }, [courses]);

  // Load bookings from localStorage
  const loadBookings = () => {
    const raw = localStorage.getItem("quran_academy_bookings");
    if (raw) {
      setBookings(JSON.parse(raw));
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [bookingTrigger, isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "" || password.toLowerCase() === "admin" || password === "12345") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Wrong password! Hint: Use 'admin' or just click the Quick Access button below.");
    }
  };

  const handleQuickAccess = () => {
    setIsAuthenticated(true);
    setAuthError("");
  };

  const handleSaveConfig = () => {
    onUpdateConfig(configForm);
    localStorage.setItem("quran_academy_config", JSON.stringify(configForm));
    triggerSuccessToast();
  };

  const handleSavePlans = () => {
    onUpdatePlans(plansForm);
    localStorage.setItem("quran_academy_plans", JSON.stringify(plansForm));
    triggerSuccessToast();
  };

  const handleSaveCourses = () => {
    onUpdateCourses(coursesForm);
    localStorage.setItem("quran_academy_courses", JSON.stringify(coursesForm));
    triggerSuccessToast();
  };

  const triggerSuccessToast = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  // Pricing helper to change specfic plan details
  const updatePlanPrice = (planId: string, newPrice: number) => {
    setPlansForm(prev => prev.map(p => p.id === planId ? { ...p, priceUSD: newPrice } : p));
  };

  // Course Helpers
  const updateCourseValue = (id: string, field: keyof Course, value: string) => {
    setCoursesForm(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  // Booking actions
  const changeBookingStatus = (id: string, newStatus: "approved" | "completed") => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    localStorage.setItem("quran_academy_bookings", JSON.stringify(updated));
    triggerSuccessToast();
  };

  const deleteBooking = (id: string) => {
    if (window.confirm("Are you sure you want to delete this trial registration?")) {
      const updated = bookings.filter(b => b.id !== id);
      setBookings(updated);
      localStorage.setItem("quran_academy_bookings", JSON.stringify(updated));
      triggerSuccessToast();
    }
  };

  const clearAllBookings = () => {
    if (window.confirm("Are you sure you want to clear ALL trial registrations? This cannot be undone.")) {
      localStorage.removeItem("quran_academy_bookings");
      setBookings([]);
      triggerSuccessToast();
    }
  };

  if (!isOpen) return null;

  return (
    <div id="admin-customizer-root" className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Settings Modal */}
      <div className="bg-emerald-950/98 text-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col border border-emerald-800 shadow-2xl relative overflow-hidden">
        
        {/* Toast Notification */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-1/2 -translate-x-1/2 top-4 bg-amber-500 text-emerald-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>Settings updated & saved successfully in this browser!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="bg-emerald-900 px-6 py-4 flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400 rotate-45" />
            <div>
              <span className="text-[10px] tracking-widest text-amber-400 font-extrabold uppercase outline-none">ADMIN PORTAL</span>
              <h2 className="text-base font-bold text-white">Academy Customizer & Trial Submissions</h2>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 px-2.5 rounded-lg bg-emerald-950 hover:bg-rose-950 font-bold text-white transition-all text-xs"
          >
            ✕
          </button>
        </div>

        {/* Auth Barrier if not validated */}
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-900 rounded-full flex items-center justify-center text-amber-400 border border-emerald-800">
              <ShieldCheck className="w-8 h-8" />
            </div>
            
            <div>
              <h3 className="text-xl font-bold">Admin Academy Owner Verification</h3>
              <p className="text-emerald-200/80 text-xs mt-1.5 leading-relaxed">
                Aap is portal sa fees, courses or dynamic information b khud change kar sakte hain. Submissions b dkh skty hain. Click quick access code to test!
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-2">
              <input
                type="password"
                placeholder="Enter password (e.g. admin)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-emerald-900 text-white placeholder-emerald-400/70 py-2.5 px-4 rounded-xl text-center text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
              />
              {authError && (
                <p className="text-rose-300 text-xs text-left px-1 mt-1 font-medium">{authError}</p>
              )}
              
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold py-2.5 rounded-xl text-xs tracking-wider transition-all"
              >
                Go to Editor
              </button>
            </form>

            <span className="text-xs text-emerald-400/50">OR</span>

            <button
              onClick={handleQuickAccess}
              className="px-6 py-2 border border-emerald-700 hover:border-emerald-500 rounded-lg text-emerald-300 hover:text-white transition-all text-xs font-semibold"
            >
              ⚡ Fast Demo Access (No Code Required)
            </button>
          </div>
        ) : (
          /* Editor Layout */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 bg-emerald-950 border-r border-emerald-900 flex flex-row md:flex-col p-2.5 gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "details" ? "bg-amber-500 text-emerald-950 font-semibold" : "text-emerald-300 hover:bg-emerald-900/60"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Academy Info</span>
              </button>

              <button
                onClick={() => setActiveTab("courses")}
                className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "courses" ? "bg-amber-500 text-emerald-950 font-semibold" : "text-emerald-300 hover:bg-emerald-900/60"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Manage Syllabus</span>
              </button>

              <button
                onClick={() => setActiveTab("pricing")}
                className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === "pricing" ? "bg-amber-500 text-emerald-950 font-semibold" : "text-emerald-300 hover:bg-emerald-900/60"
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>Tweak Fees ($)</span>
              </button>

              <button
                onClick={() => setActiveTab("bookings")}
                className={`flex-1 md:flex-initial flex items-center justify-center md:justify-start gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all relative ${
                  activeTab === "bookings" ? "bg-amber-500 text-emerald-950 font-semibold" : "text-emerald-300 hover:bg-emerald-900/60"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Show Bookings</span>
                {bookings.filter(b => b.status === "pending").length > 0 && (
                  <span className="absolute right-2 top-2 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    {bookings.filter(b => b.status === "pending").length}
                  </span>
                )}
              </button>
            </div>

            {/* Scrollable Main Content Pane */}
            <div className="flex-1 p-6 overflow-y-auto bg-emerald-950/20">
              
              {/* TAB 1: ACADEMY DETAILS */}
              {activeTab === "details" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-emerald-900">
                    <h3 className="text-lg font-bold text-amber-300 font-sans">1. Core Academy Branding</h3>
                    <p className="text-emerald-300/80 text-xs mt-1">Changes are loaded immediately on the landing page!</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-emerald-300 font-semibold mb-1">Academy Name / Brand Title</label>
                      <input
                        type="text"
                        value={configForm.name}
                        onChange={e => setConfigForm({ ...configForm, name: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-emerald-300 font-semibold mb-1">Academy Owner Email</label>
                      <input
                        type="email"
                        value={configForm.email}
                        onChange={e => setConfigForm({ ...configForm, email: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-emerald-300 font-semibold mb-1">WhatsApp URL / Number (with prompt context)</label>
                      <input
                        type="text"
                        value={configForm.whatsapp}
                        onChange={e => setConfigForm({ ...configForm, whatsapp: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-emerald-300 font-semibold mb-1">Display Call Number</label>
                      <input
                        type="text"
                        value={configForm.phone}
                        onChange={e => setConfigForm({ ...configForm, phone: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <h4 className="text-xs font-bold text-emerald-200">Main Banner Slogan / Slogans (Multilingual)</h4>
                    
                    <div>
                      <label className="block text-[11px] text-emerald-300 mb-1">English Slogan</label>
                      <textarea
                        value={configForm.taglineEn}
                        rows={2}
                        onChange={e => setConfigForm({ ...configForm, taglineEn: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-emerald-300 mb-1">Roman Urdu Slogan</label>
                      <textarea
                        value={configForm.taglineRoman}
                        rows={2}
                        onChange={e => setConfigForm({ ...configForm, taglineRoman: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-emerald-300 mb-1">Urdu (Nastaliq) Slogan</label>
                      <textarea
                        value={configForm.taglineUr}
                        rows={2}
                        style={{ direction: "rtl" }}
                        onChange={e => setConfigForm({ ...configForm, taglineUr: e.target.value })}
                        className="w-full bg-emerald-900/60 border border-emerald-800/85 rounded-lg p-2 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-emerald-900">
                    <button
                      type="button"
                      onClick={handleSaveConfig}
                      className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Branding Changes</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: MANAGE SYLLABUS / COURSES */}
              {activeTab === "courses" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-emerald-900">
                    <h3 className="text-lg font-bold text-amber-300 font-sans">2. Configure Syllabus & Lessons</h3>
                    <p className="text-emerald-300/80 text-xs mt-1">Modify course descriptions to keep your catalog updated.</p>
                  </div>

                  <div className="space-y-6">
                    {coursesForm.map((co, idx) => (
                      <div key={co.id} className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-800/65 space-y-3">
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-emerald-800">
                          <span className="text-xs bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded">
                            {co.id.toUpperCase()} MODULE
                          </span>
                          <span className="text-xs text-emerald-300">
                            Index: {idx + 1}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] text-emerald-300 mb-1">Course Title (EN)</label>
                            <input
                              type="text"
                              value={co.titleEn}
                              onChange={e => updateCourseValue(co.id, "titleEn", e.target.value)}
                              className="w-full bg-emerald-950/80 border border-emerald-800 rounded p-1.5 text-xs focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-emerald-300 mb-1">Course Title (Roman Urdu)</label>
                            <input
                              type="text"
                              value={co.titleRoman}
                              onChange={e => updateCourseValue(co.id, "titleRoman", e.target.value)}
                              className="w-full bg-emerald-950/80 border border-emerald-800 rounded p-1.5 text-xs focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-emerald-300 mb-1">Recommended Age Level</label>
                          <input
                            type="text"
                            value={co.recommendedAge}
                            onChange={e => updateCourseValue(co.id, "recommendedAge", e.target.value)}
                            className="bg-emerald-950/80 border border-emerald-800 rounded p-1.5 text-xs focus:outline-none w-1/3"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-emerald-300 mb-1">Description (EN)</label>
                          <textarea
                            value={co.descriptionEn}
                            rows={2}
                            onChange={e => updateCourseValue(co.id, "descriptionEn", e.target.value)}
                            className="w-full bg-emerald-950/80 border border-emerald-800 rounded p-1.5 text-xs focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-emerald-300 mb-1">Description (Urdu Nastaliq)</label>
                          <textarea
                            value={co.descriptionUr}
                            rows={2}
                            style={{ direction: "rtl" }}
                            onChange={e => updateCourseValue(co.id, "descriptionUr", e.target.value)}
                            className="w-full bg-emerald-950/80 border border-emerald-800 rounded p-1.5 text-xs focus:outline-none"
                          />
                        </div>

                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-emerald-900">
                    <button
                      type="button"
                      onClick={handleSaveCourses}
                      className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Syllabus Changes</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: TWEAK FEES IN USD */}
              {activeTab === "pricing" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-emerald-900">
                    <h3 className="text-lg font-bold text-amber-300 font-sans">3. Edit Packages Pricing ($ USD)</h3>
                    <p className="text-emerald-300/80 text-xs mt-1">Configure plan charges which reflect automatically both in the cards and the estimate Calculator.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {plansForm.map((pl) => (
                      <div key={pl.id} className="p-4 bg-emerald-900/40 rounded-xl border border-emerald-800/65 space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-emerald-200 uppercase bg-emerald-800 px-2 py-0.5 rounded inline-block mb-2">
                            {pl.daysPerWeek} classes per week
                          </span>
                          <h4 className="text-sm font-bold text-white mb-2">{pl.daysPerWeek} Days Plan</h4>
                          <p className="text-emerald-300/80 text-xs leading-relaxed mb-4">
                            Monthly aggregate is {pl.classesPerMonth} classes.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-amber-300">Plan Base Price (USD):</span>
                          <div className="flex items-center bg-emerald-950 rounded border border-emerald-800 px-2 w-32">
                            <span className="text-xs text-emerald-400">$</span>
                            <input
                              type="number"
                              value={pl.priceUSD}
                              onChange={e => updatePlanPrice(pl.id, parseInt(e.target.value) || 0)}
                              className="w-full bg-transparent py-1.5 px-2 text-xs font-bold text-white focus:outline-none"
                            />
                          </div>
                          <span className="text-xs text-emerald-400">/ mo</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-emerald-900">
                    <button
                      type="button"
                      onClick={handleSavePlans}
                      className="bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Tariffs & Pricing</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 4: VIEW REGISTERED TRIAL BOOKINGS */}
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  <div className="pb-4 border-b border-emerald-900 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-amber-300 font-sans">4. Active Trial Registration Logs</h3>
                      <p className="text-emerald-300/80 text-xs mt-1">Here is the real list of subscribers who completed their booking on this browser.</p>
                    </div>

                    {bookings.length > 0 && (
                      <button
                        type="button"
                        onClick={clearAllBookings}
                        className="bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 py-1.5 px-3 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All Logs</span>
                      </button>
                    )}
                  </div>

                  {bookings.length === 0 ? (
                    <div className="border border-dashed border-emerald-800 rounded-2xl p-12 text-center text-emerald-400 space-y-3">
                      <Users className="w-12 h-12 mx-auto opacity-30 text-amber-400" />
                      <h4 className="font-bold text-sm">No trials registered yet</h4>
                      <p className="text-xs text-emerald-300/80 max-w-sm mx-auto">
                        Aap is applet me trial form fill karian to detail dhar asani sa record ho k show hogi, jis sa bad me contact kr ke scheduling set kr skty hain.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-xl border border-emerald-800">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-emerald-900 text-emerald-200 uppercase tracking-wider text-[10px]">
                            <th className="p-3">Student / Age</th>
                            <th className="p-3">Course / Timezone</th>
                            <th className="p-3">Preferences</th>
                            <th className="p-3">WhatsApp & Email</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-900/60 bg-emerald-950/40">
                          {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-emerald-900/10 transition-colors">
                              <td className="p-3">
                                <div className="font-bold text-white">{b.fullName}</div>
                                {b.parentName && <div className="text-[10px] text-emerald-300">P: {b.parentName}</div>}
                                <div className="text-[10px] text-emerald-400/80">Age: {b.age || "N/A"}</div>
                              </td>
                              <td className="p-3 max-w-[180px] truncate">
                                <div className="font-semibold text-amber-300">{b.courseId.toUpperCase()}</div>
                                <div className="text-[10px] text-emerald-300/80 truncate" title={b.timeZone}>{b.timeZone}</div>
                                <div className="text-[9px] text-emerald-500">{b.createdAt}</div>
                              </td>
                              <td className="p-3">
                                <div className="text-white">Slot: {b.preferredTimeSlot}</div>
                                <div className="text-[10px] text-emerald-300 truncate">
                                  Days: {Array.isArray(b.preferredDays) ? b.preferredDays.join(", ") : b.preferredDays}
                                </div>
                              </td>
                              <td className="p-3">
                                <a 
                                  href={`https://wa.me/${b.whatsapp.replace(/\D/g, "")}`} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-emerald-300 hover:text-amber-400 underline font-semibold flex items-center gap-1.5"
                                >
                                  <Phone className="w-3 h-3 shrink-0" />
                                  <span>{b.whatsapp}</span>
                                </a>
                                <div className="text-[10px] text-emerald-400">{b.email}</div>
                              </td>
                              <td className="p-3">
                                <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                                  b.status === "pending" 
                                    ? "bg-amber-400/15 text-amber-300 border border-amber-500/20" 
                                    : "bg-emerald-400/15 text-emerald-300 border border-emerald-500/20"
                                }`}>
                                  {b.status}
                                </span>
                              </td>
                              <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                {b.status === "pending" && (
                                  <button
                                    onClick={() => changeBookingStatus(b.id, "approved")}
                                    className="p-1 px-2 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[10px]"
                                    title="Approve trial reservation"
                                  >
                                    Approve
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteBooking(b.id)}
                                  className="p-1 px-1.5 rounded bg-rose-950/80 hover:bg-rose-900 hover:text-white text-rose-300 font-bold text-[10px]"
                                  title="Delete log"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
