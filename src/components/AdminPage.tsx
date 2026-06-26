import React, { useState, useEffect } from "react";
import { Users, Mail, BookOpen, Settings, Check, Trash2, Calendar, Phone, MapPin, Sparkles, Filter, ChevronRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { COURSES } from "../data";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"bookings" | "messages" | "blogs">("bookings");
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);

  // Simulation Blog State
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    body: "",
    author: "Academy Administrator"
  });
  const [blogSuccess, setBlogSuccess] = useState(false);

  useEffect(() => {
    // Check if authenticated in session
    const authState = sessionStorage.getItem("admin_authenticated");
    if (authState === "true") {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = async (adminPass?: string) => {
    const pass = adminPass || sessionStorage.getItem("admin_password") || "";
    try {
      const res = await fetch("/api/submissions", {
        headers: {
          "x-admin-password": pass
        }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data.bookings || []);
        setMessages(data.messages || []);
        
        // Also save to localStorage as backup/cache
        localStorage.setItem("trial_bookings", JSON.stringify(data.bookings || []));
        localStorage.setItem("contact_messages", JSON.stringify(data.messages || []));
        return;
      }
    } catch (err) {
      console.error("Failed to load submissions from server, falling back to local storage:", err);
    }

    // Fallback
    const bookingsStr = localStorage.getItem("trial_bookings") || "[]";
    setBookings(JSON.parse(bookingsStr));

    const messagesStr = localStorage.getItem("contact_messages") || "[]";
    setMessages(JSON.parse(messagesStr));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_authenticated", "true");
        sessionStorage.setItem("admin_password", password);
        setAuthError("");
        loadData(password);
      } else {
        const data = await res.json();
        setAuthError(data.error || "Incorrect admin credentials.");
      }
    } catch (err) {
      setAuthError("Failed to authenticate with server.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
    sessionStorage.removeItem("admin_password");
  };

  // Delete booking
  const handleDeleteBooking = async (id: string) => {
    const pass = sessionStorage.getItem("admin_password") || "";
    try {
      await fetch("/api/submissions/delete-booking", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-password": pass
        },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to delete booking on server:", err);
    }
    
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem("trial_bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  // Change booking status
  const handleToggleStatus = async (id: string) => {
    const booking = bookings.find((b) => b.id === id);
    if (!booking) return;
    
    const nextStatus = booking.status === "Enrolled" ? "Pending" : booking.status === "Contacted" ? "Enrolled" : "Contacted";
    const pass = sessionStorage.getItem("admin_password") || "";
    
    try {
      await fetch("/api/submissions/update-booking-status", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-password": pass
        },
        body: JSON.stringify({ id, status: nextStatus }),
      });
    } catch (err) {
      console.error("Failed to update status on server:", err);
    }

    const updated = bookings.map((b) => {
      if (b.id === id) {
        return { ...b, status: nextStatus };
      }
      return b;
    });
    localStorage.setItem("trial_bookings", JSON.stringify(updated));
    setBookings(updated);
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    const pass = sessionStorage.getItem("admin_password") || "";
    try {
      await fetch("/api/submissions/delete-message", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-admin-password": pass
        },
        body: JSON.stringify({ id }),
      });
    } catch (err) {
      console.error("Failed to delete message on server:", err);
    }

    const updated = messages.filter((m) => m.id !== id);
    localStorage.setItem("contact_messages", JSON.stringify(updated));
    setMessages(updated);
  };

  // Handle Mock Blog Submission
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogPost = {
      _id: "mock_" + Date.now(),
      title: newBlog.title,
      slug: { current: newBlog.title.toLowerCase().replace(/\s+/g, "-") },
      publishedAt: new Date().toISOString(),
      excerpt: newBlog.excerpt,
      body: newBlog.body,
      author: newBlog.author
    };

    // Add to default local blogs
    const currentBlogsStr = localStorage.getItem("trial_blogs") || "[]";
    const currentBlogs = JSON.parse(currentBlogsStr);
    currentBlogs.unshift(blogPost);
    localStorage.setItem("trial_blogs", JSON.stringify(currentBlogs));

    // Force append to Sanity-mock dataset locally
    setBlogSuccess(true);
    setNewBlog({ title: "", excerpt: "", body: "", author: "Academy Administrator" });

    setTimeout(() => {
      setBlogSuccess(false);
    }, 4000);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-24 px-4" id="admin-login-wrapper">
        <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-950">Academy Admin Area</h3>
            <p className="text-xs text-emerald-950/50">
              Please enter the secure academy admin password configured for your workspace to authenticate.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="admin-login-form">
            <div>
              <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-600 font-semibold">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer active:scale-98"
            >
              Authenticate & Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10" id="admin-dashboard-container">
      {/* Header and Logout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-950/5 pb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-emerald-950 flex items-center gap-2">
            <Settings className="w-6 h-6 text-emerald-700 animate-spin-slow" />
            Academy Lead Control Panel
          </h2>
          <p className="text-xs text-emerald-950/50 font-sans mt-1">
            Analyze, track, and update live 3-day free trial signups and parent queries.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-emerald-950/10 hover:bg-red-50 hover:text-red-700 text-emerald-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
        >
          Sign Out Admin
        </button>
      </div>

      {/* Stats Bento boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="admin-stats-bento">
        <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase text-emerald-950/50">Active Registrations</p>
            <p className="text-3xl font-extrabold text-emerald-950 mt-1">{bookings.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase text-emerald-950/50">Support Messages</p>
            <p className="text-3xl font-extrabold text-emerald-950 mt-1">{messages.length}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-emerald-950/10 p-6 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold uppercase text-emerald-950/50">Latest Conversion Rate</p>
            <p className="text-3xl font-extrabold text-emerald-950 mt-1">
              {bookings.length > 0 ? Math.round((bookings.filter(b => b.status === "Enrolled").length / bookings.length) * 100) : 0}%
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Sparkles className="w-6 h-6 fill-emerald-100" />
          </div>
        </div>
      </div>

      {/* Tab controls */}
      <div className="flex border-b border-emerald-950/5 gap-2" id="admin-tabs">
        {[
          { id: "bookings", label: "Trial Bookings Lead", icon: <Users className="w-4 h-4" /> },
          { id: "messages", label: "Contact Emails", icon: <Mail className="w-4 h-4" /> },
          { id: "blogs", label: "Post Mock Blog", icon: <BookOpen className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-emerald-800 text-emerald-900 font-semibold"
                : "border-transparent text-emerald-950/60 hover:text-emerald-900"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tabs Content */}
      <div className="bg-white rounded-2xl border border-emerald-950/10 shadow-lg p-6 sm:p-8" id="admin-main-panel">
        <AnimatePresence mode="wait">
          {activeTab === "bookings" && (
            <motion.div
              key="bookings-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-emerald-950">Active Trial Signups</h3>
                <span className="text-xs font-semibold text-emerald-950/50">Total leads: {bookings.length}</span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 text-emerald-950/40">
                  <p className="text-sm">No trials booked yet. Try booking one from the home page first!</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-xl border border-emerald-950/5" id="bookings-table-wrapper">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-emerald-950/5 text-emerald-950/60 text-xs font-bold uppercase tracking-wider">
                        <th className="p-4">Student Info</th>
                        <th className="p-4">WhatsApp/Email</th>
                        <th className="p-4">Course & Timing</th>
                        <th className="p-4">Date Sub</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-950/5">
                      {bookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-emerald-950">{b.studentName}</div>
                            {b.parentName && <div className="text-xs text-emerald-950/50">Parent: {b.parentName}</div>}
                            <div className="text-xs text-emerald-800 font-semibold mt-0.5">{b.country}</div>
                          </td>
                          <td className="p-4 font-sans text-xs">
                            <div className="flex items-center gap-1.5">
                              <Phone className="w-3 h-3 text-emerald-600" />
                              <a href={`https://wa.me/${b.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-emerald-800">
                                {b.whatsapp}
                              </a>
                            </div>
                            <div className="text-emerald-950/50 mt-1">{b.email}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-semibold text-xs text-emerald-950 bg-emerald-50 px-2 py-0.5 rounded inline-block uppercase">
                              {COURSES.find(c => c.id === b.courseId)?.title || b.courseId}
                            </div>
                            <div className="text-xs text-emerald-950/50 mt-1">Preferred: {b.preferredTime}</div>
                            {b.preferredPlatform && (
                              <div className="text-xs font-bold text-emerald-800 mt-1 flex items-center gap-1">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                                Platform: {b.preferredPlatform}
                              </div>
                            )}
                            {b.studentsCount && (
                              <div className="text-xs font-bold text-emerald-950/70 mt-1">
                                Students: <span className="bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded">{b.studentsCount}</span>
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-xs text-emerald-950/50 font-sans">
                            {formatDate(b.dateCreated)}
                          </td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              b.status === "Enrolled"
                                ? "bg-emerald-100 text-emerald-800"
                                : b.status === "Contacted"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {b.status || "Pending"}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleToggleStatus(b.id)}
                                title="Change Status"
                                className="p-1.5 rounded-lg border border-emerald-950/10 hover:border-emerald-800 text-emerald-700 hover:bg-emerald-50 transition-colors"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteBooking(b.id)}
                                title="Delete Lead"
                                className="p-1.5 rounded-lg border border-red-950/10 text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "messages" && (
            <motion.div
              key="messages-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-emerald-950">Incoming Contact Requests</h3>

              {messages.length === 0 ? (
                <div className="text-center py-12 text-emerald-950/40">
                  <p className="text-sm">No general support emails sent yet. Try submitting the contact form!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6" id="messages-list">
                  {messages.map((m) => (
                    <div key={m.id} className="p-5 rounded-xl border border-emerald-950/5 bg-slate-50/50 hover:bg-white transition-all shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-emerald-950">{m.name}</h4>
                          <p className="text-xs text-emerald-950/50">{m.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-emerald-950/40 font-sans">{formatDate(m.dateCreated)}</span>
                          <button
                            onClick={() => handleDeleteMessage(m.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors border border-transparent hover:border-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="border-t border-emerald-950/5 pt-3 space-y-1">
                        <p className="text-xs font-bold text-emerald-800">Subject: {m.subject}</p>
                        {m.preferredPlatform && (
                          <div className="text-xs text-emerald-700 font-semibold mb-1">
                            Platform Preference: <span className="font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{m.preferredPlatform}</span>
                          </div>
                        )}
                        {m.studentsCount && (
                          <div className="text-xs text-emerald-700 font-semibold mb-1">
                            Students Count: <span className="font-bold bg-emerald-50 px-1.5 py-0.5 rounded">{m.studentsCount}</span>
                          </div>
                        )}
                        <p className="text-sm text-emerald-950/70 font-sans whitespace-pre-line leading-relaxed">{m.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "blogs" && (
            <motion.div
              key="blogs-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-emerald-950">Simulate Sanity Blog Post Addition</h3>
              <p className="text-xs text-emerald-950/50">
                Instantly inject a mock blog post into your locally loaded dataset to test visual formatting and slug navigation.
              </p>

              <form onSubmit={handleBlogSubmit} className="space-y-4 max-w-2xl" id="admin-mock-blog-form">
                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                    Post Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    placeholder="e.g. 5 Quran verses for patience during hardship"
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                    Short Excerpt
                  </label>
                  <input
                    type="text"
                    required
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    placeholder="Short summary preview shown on the list page..."
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                    Blog Post Body (Support Markdown: ### Headings etc.)
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newBlog.body}
                    onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
                    placeholder="Write details of your blog article here..."
                    className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-950/80 uppercase mb-1.5">
                      Author Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newBlog.author}
                      onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-emerald-950/10 focus:ring-2 focus:ring-emerald-800/20 focus:border-emerald-800 outline-none transition-all text-sm bg-slate-50/50 text-emerald-950"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Publish Mock Blog Post
                </button>

                <AnimatePresence>
                  {blogSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      Mock Blog published successfully! Navigate to the 'Islamic Blog' page to view it live in the list and read its content.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
