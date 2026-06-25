import React from "react";
import { HelpCircle, Star, ShieldCheck, RefreshCw, Sparkles, AlertCircle } from "lucide-react";
import PricingSection from "./PricingSection";
import { CurrencyCode } from "../types";

interface PricesPageProps {
  currency: CurrencyCode;
  onSelectPlan: (planName: string) => void;
  language: string;
  initialClassMode: "1on1" | "group";
  onClassModeChange: (mode: "1on1" | "group") => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

export default function PricesPage({
  currency,
  onSelectPlan,
  language,
  initialClassMode,
  onClassModeChange,
  onCurrencyChange
}: PricesPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16" id="pricespage-container">
      
      {/* Headings */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
          Pricing & Plans
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-sans tracking-tight">
          Affordable 1-on-1 & Group Classes
        </h2>
        <p className="text-emerald-950/60 text-sm leading-relaxed font-sans">
          Choose between highly personalized premium 1-on-1 private lessons or budget-friendly collaborative group classes. All structures include our standard 100% money-back guarantee, free trial days, and makeup classes.
        </p>
      </div>

      {/* Main interactive Pricing cards section */}
      <section id="prices-plans-wrapper">
        <PricingSection
          currency={currency}
          onSelectPlan={onSelectPlan}
          language={language}
          initialClassMode={initialClassMode}
          onClassModeChange={onClassModeChange}
          onCurrencyChange={onCurrencyChange}
        />
      </section>

      {/* Sibling & Family Discounts Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-950/10 p-6 sm:p-10" id="sibling-discount-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4" id="sibling-discount-text">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 rounded-full text-emerald-850 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 fill-emerald-800 text-emerald-800" />
              Special Offer
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-emerald-950">Sibling & Family Discounts Available</h3>
            <p className="text-sm text-emerald-950/70 font-sans leading-relaxed">
              We understand the cost of educating multiple children. Therefore, we offer a dedicated <strong>10% sibling discount</strong> for the second child, and a <strong>15% family discount</strong> for the third child enrolled from the same household!
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-end" id="sibling-discount-btn-col">
            <button
              onClick={() => onSelectPlan("Family Discount Plan")}
              className="px-6 py-3 bg-emerald-900 hover:bg-emerald-950 text-white font-bold rounded-xl shadow-md text-xs tracking-wide transition-all active:scale-97 cursor-pointer"
            >
              Ask for Family Quote
            </button>
          </div>
        </div>
      </section>

      {/* Refund and Class Policy terms */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm" id="policy-grid-section">
        <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-emerald-950">Free Makeup Classes</h4>
          <p className="text-xs text-emerald-950/60 leading-relaxed font-sans">
            If you miss a class due to travel, illness, or exams, just notify your assigned tutor 12 hours before the session. We will schedule a makeup class free of cost.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-emerald-950">Money-Back Guarantee</h4>
          <p className="text-xs text-emerald-950/60 leading-relaxed font-sans">
            Your trust is our asset. If you decide to stop classes at any point of the month, we will calculate the classes taken and refund the remaining amount instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-emerald-950/10 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-emerald-950">Secure Payment Gateways</h4>
          <p className="text-xs text-emerald-950/60 leading-relaxed font-sans">
            We handle invoicing securely via PayPal, Stripe, Bank Transfers (UK, Europe, US), or Credit Cards. We do NOT store your sensitive card details directly.
          </p>
        </div>
      </section>

    </div>
  );
}
