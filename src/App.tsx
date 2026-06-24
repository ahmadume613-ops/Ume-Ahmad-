import { useState, useEffect } from "react";
import { 
  initialAcademyConfig, 
  initialCourses, 
  initialPricingPlans 
} from "./data";
import { AcademyConfig, Course, PricingPlan, LanguageMode } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import CoursesPage from "./components/CoursesPage";
import PricesPage from "./components/PricesPage";
import AboutPage from "./components/AboutPage";
import BlogPage from "./components/BlogPage";
import ContactPage from "./components/ContactPage";
import AdminPage from "./components/AdminPage";
import CustomizerSettings from "./components/CustomizerSettings";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Multilingual State: en | ur | roman
  const [lang, setLang] = useState<LanguageMode>("en");

  // State-based Page Routing: home | courses | prices | about | blog | contact
  const [activePage, setActivePage] = useState<string>("home");

  // Load configuration with fallback to initial data
  const [config, setConfig] = useState<AcademyConfig>(initialAcademyConfig);
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [plans, setPlans] = useState<PricingPlan[]>(initialPricingPlans);

  // Administrative dialog toggle state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [bookingTrigger, setBookingTrigger] = useState<number>(0);

  // Load customizer state from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem("quran_academy_config");
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        let migrated = false;
        
        // Cleanse and migrate any old template mock numbers/phones and old emails
        if (!parsed.whatsapp || parsed.whatsapp.includes("3001234567") || parsed.whatsapp === "+923001234567" || parsed.whatsapp === "923001234567") {
          parsed.whatsapp = "+923345750157";
          migrated = true;
        }
        if (!parsed.phone || parsed.phone.includes("300 1234567") || parsed.phone === "+92 300 1234567" || parsed.phone === "923001234567") {
          parsed.phone = "+92 334 5750157";
          migrated = true;
        }
        if (!parsed.email || parsed.email !== "ahmadume613@gmail.com") {
          parsed.email = "ahmadume613@gmail.com";
          migrated = true;
        }
        
        setConfig(parsed);
        
        if (migrated) {
          localStorage.setItem("quran_academy_config", JSON.stringify(parsed));
        }
      } catch (e) {
        console.error("Failed to parse saved config", e);
      }
    }

    const savedCourses = localStorage.getItem("quran_academy_courses");
    if (savedCourses) {
      try {
        setCourses(JSON.parse(savedCourses));
      } catch (e) {
        console.error("Failed to parse saved courses", e);
      }
    }

    const savedPlans = localStorage.getItem("quran_academy_plans");
    if (savedPlans) {
      try {
        setPlans(JSON.parse(savedPlans));
      } catch (e) {
        console.error("Failed to parse saved plans", e);
      }
    }
  }, []);

  // Deep-linking hash routing and section smooth scrolling
  useEffect(() => {
    const handleRoute = () => {
      const hash = window.location.hash.replace("#", "").replace("/", "");
      const path = window.location.pathname.replace("/", "");
      
      const targetRoute = path || hash || "home";
      
      if (targetRoute === "admin") {
        setActivePage("admin");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetRoute === "blog" || targetRoute === "articles") {
        setActivePage("blog");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const validSections = ["home", "courses", "prices", "about", "contact"];
        const matchedSection = validSections.includes(targetRoute) ? targetRoute : "home";
        
        setActivePage(matchedSection);
        
        // Wait for elements to mount, then scroll
        setTimeout(() => {
          const sectionId = matchedSection === "prices" ? "prices-section" : matchedSection === "about" ? "about-section" : matchedSection === "contact" ? "contact-section" : matchedSection === "courses" ? "courses-section" : "home-section";
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          } else if (matchedSection === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 200);
      }
    };

    handleRoute();
    window.addEventListener("hashchange", handleRoute);
    return () => {
      window.removeEventListener("hashchange", handleRoute);
    };
  }, []);

  const handleUpdateConfig = (newConfig: AcademyConfig) => {
    setConfig(newConfig);
  };

  const handleUpdateCourses = (newCourses: Course[]) => {
    setCourses(newCourses);
  };

  const handleUpdatePlans = (newPlans: PricingPlan[]) => {
    setPlans(newPlans);
  };

  const handleBookingAdded = () => {
    setBookingTrigger(prev => prev + 1);
  };

  const handleSelectCourseFromSyllabus = (courseId: string) => {
    // When a student selects a course on the Courses page, we navigate to the registration form and highlight that page
    setActivePage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPlanFromPricing = (daysPerWeek: number) => {
    // Navigate to Contact Page
    setActivePage("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="landing-page-root" className="min-h-screen bg-white flex flex-col font-sans text-slate-850 overflow-x-hidden">
      
      {/* 1. Universal Navigation Header */}
      <Navbar
        lang={lang}
        onLangChange={setLang}
        activePage={activePage}
        onPageChange={setActivePage}
        config={config}
        onAdminOpen={() => setIsAdminOpen(true)}
      />

      {/* 2. Page View Transition Container */}
      <main className="flex-1 flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeInOut" }}
            className="flex-1 flex flex-col"
          >
            {["home", "courses", "prices", "about", "contact"].includes(activePage) && (
              <div className="flex flex-col">
                <div id="home-section">
                  <HomePage 
                    lang={lang} 
                    config={config} 
                    onNavigate={(page) => { window.location.hash = `#${page}`; }} 
                  />
                </div>
                <div id="courses-section" className="scroll-mt-20">
                  <CoursesPage 
                    courses={courses} 
                    lang={lang} 
                    onSelectCourse={handleSelectCourseFromSyllabus} 
                  />
                </div>
                <div id="prices-section" className="scroll-mt-20">
                  <PricesPage 
                    plans={plans} 
                    lang={lang} 
                    onSelectPlan={handleSelectPlanFromPricing} 
                  />
                </div>
                <div id="about-section" className="scroll-mt-20">
                  <AboutPage 
                    lang={lang} 
                    config={config} 
                  />
                </div>
                <div id="contact-section" className="scroll-mt-20">
                  <ContactPage 
                    courses={courses} 
                    lang={lang} 
                    config={config} 
                    onBookingSuccess={handleBookingAdded} 
                  />
                </div>
              </div>
            )}
            {activePage === "blog" && (
              <BlogPage 
                lang={lang} 
              />
            )}
            {activePage === "admin" && (
              <AdminPage 
                lang={lang} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Universal Dark Footer */}
      <Footer
        activePage={activePage}
        onPageChange={setActivePage}
        config={config}
        courses={courses}
        lang={lang}
        onAdminOpen={() => setIsAdminOpen(true)}
      />

      {/* 4. Academy Control Panel / Customizer Settings modal */}
      <CustomizerSettings
        currentConfig={config}
        courses={courses}
        plans={plans}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onUpdateConfig={handleUpdateConfig}
        onUpdateCourses={handleUpdateCourses}
        onUpdatePlans={handleUpdatePlans}
        bookingTrigger={bookingTrigger}
      />

    </div>
  );
}
