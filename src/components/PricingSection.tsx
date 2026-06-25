import React, { useState, useEffect } from "react";
import { Check, Star, Zap, User, Users, Calculator, Info, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { PRICING_PLANS_1ON1, PRICING_PLANS_GROUP } from "../data";
import { PricingPlan, CurrencyCode } from "../types";

interface PricingSectionProps {
  currency: CurrencyCode;
  onSelectPlan: (planName: string) => void;
  language: string;
  initialClassMode?: "1on1" | "group";
  onClassModeChange?: (mode: "1on1" | "group") => void;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

export default function PricingSection({
  currency,
  onSelectPlan,
  language,
  initialClassMode = "1on1",
  onClassModeChange,
  onCurrencyChange
}: PricingSectionProps) {
  const [localClassMode, setLocalClassMode] = useState<"1on1" | "group">("1on1");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "quarterly">("monthly");
  
  // Local state for calculator frequency selector (defaults to 3 days/week)
  const [calcDaysPerWeek, setCalcDaysPerWeek] = useState<number>(3);

  // Sync state between props and local if parent passes them
  const classMode = onClassModeChange ? initialClassMode : localClassMode;
  const setClassMode = onClassModeChange ? onClassModeChange : setLocalClassMode;

  const plans = classMode === "1on1" ? PRICING_PLANS_1ON1 : PRICING_PLANS_GROUP;

  // Make sure calcDaysPerWeek is valid for group mode (Group only has 2, 3, 5)
  useEffect(() => {
    if (classMode === "group" && calcDaysPerWeek === 4) {
      setCalcDaysPerWeek(5);
    }
  }, [classMode, calcDaysPerWeek]);

  const countries = [
    { code: "USD" as const, symbol: "$", name: "United States (USD - $)" },
    { code: "GBP" as const, symbol: "£", name: "United Kingdom (GBP - £)" },
    { code: "EUR" as const, symbol: "€", name: "Europe (EUR - €)" },
    { code: "CAD" as const, symbol: "C$", name: "Canada (CAD - C$)" },
    { code: "AUD" as const, symbol: "A$", name: "Australia (AUD - A$)" },
    { code: "AED" as const, symbol: "AED ", name: "United Arab Emirates (AED - د.إ)" },
    { code: "SAR" as const, symbol: "SAR ", name: "Saudi Arabia (SAR - ر.س)" }
  ];

  const getCurrencySymbol = (curr: CurrencyCode = currency) => {
    switch (curr) {
      case "GBP": return "£";
      case "EUR": return "€";
      case "CAD": return "C$";
      case "AUD": return "A$";
      case "AED": return "AED ";
      case "SAR": return "SAR ";
      default: return "$";
    }
  };

  const getPrice = (plan: PricingPlan, curr: CurrencyCode = currency) => {
    let basePrice = 0;
    if (curr === "GBP") basePrice = plan.priceGBP;
    else if (curr === "EUR") basePrice = plan.priceEUR;
    else if (curr === "CAD") basePrice = plan.priceCAD;
    else if (curr === "AUD") basePrice = plan.priceAUD;
    else if (curr === "AED") basePrice = plan.priceAED;
    else if (curr === "SAR") basePrice = plan.priceSAR;
    else basePrice = plan.priceUSD;

    if (billingCycle === "quarterly") {
      // 10% Discount for quarterly prepay
      return Math.round(basePrice * 0.9);
    }
    return basePrice;
  };

  // Find matching plan for the calculator
  const selectedPlanForCalc = plans.find(p => p.daysPerWeek === calcDaysPerWeek) || plans[0];
  const calculatedPrice = getPrice(selectedPlanForCalc);
  const calculatedSymbol = getCurrencySymbol();
  const classesCount = selectedPlanForCalc.classesPerMonth;
  const pricePerClass = (calculatedPrice / classesCount).toFixed(2);

  return (
    <div className="py-6 space-y-16" id="pricing-section-container">
      
      {/* 1-on-1 vs Group Class Switcher Tabs */}
      <div className="flex flex-col items-center space-y-4" id="class-mode-selector-wrapper">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
          Step 1: Choose Learning Mode
        </span>
        <div className="bg-emerald-950/5 p-1.5 rounded-2xl border border-emerald-950/10 inline-flex shadow-inner">
          <button
            id="mode-toggle-1on1"
            onClick={() => setClassMode("1on1")}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              classMode === "1on1"
                ? "bg-emerald-900 text-white shadow-md scale-102"
                : "text-emerald-950/70 hover:text-emerald-900"
            }`}
          >
            <User className="w-4 h-4" />
            1-on-1 Live Private Classes
          </button>
          <button
            id="mode-toggle-group"
            onClick={() => setClassMode("group")}
            className={`px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer ${
              classMode === "group"
                ? "bg-emerald-900 text-white shadow-md scale-102"
                : "text-emerald-950/70 hover:text-emerald-900"
            }`}
          >
            <Users className="w-4 h-4" />
            Group Classes (Budget-Friendly)
          </button>
        </div>
      </div>

      {/* LIVE INTERACTIVE FEE CALCULATOR */}
      <section className="max-w-4xl mx-auto" id="live-calculator-widget">
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-emerald-800 relative overflow-hidden">
          
          {/* Visual Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-750/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-800/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-5">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">Worldwide Tuition Fee Calculator</h3>
              <p className="text-xs text-emerald-200/70 font-sans">Customize your plan, choose currency, and view final tuition in real-time</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Inputs Column */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between" id="calc-inputs">
              
              {/* Currency Dropdown selector */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider">
                  Select Your Country / Currency
                </label>
                <select
                  id="calc-currency-select"
                  value={currency}
                  onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value as CurrencyCode)}
                  className="w-full bg-emerald-950/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all cursor-pointer font-sans"
                >
                  {countries.map((item) => (
                    <option key={item.code} value={item.code} className="bg-emerald-950 text-white">
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Days per week selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-emerald-200 uppercase tracking-wider flex items-center justify-between">
                  <span>How many Classes per Week?</span>
                  <span className="text-[10px] lowercase text-emerald-350 italic">
                    {selectedPlanForCalc.classesPerMonth} total classes / month
                  </span>
                </label>
                
                <div className="grid grid-cols-4 gap-2" id="calc-frequency-grid">
                  {[2, 3, 4, 5].map((days) => {
                    // Disable 4 days in group mode
                    const isGroupMode = classMode === "group";
                    const isUnsupported = isGroupMode && days === 4;

                    return (
                      <button
                        key={days}
                        type="button"
                        id={`calc-days-${days}`}
                        disabled={isUnsupported}
                        onClick={() => setCalcDaysPerWeek(days)}
                        className={`py-3.5 rounded-xl font-extrabold text-sm transition-all flex flex-col items-center justify-center relative cursor-pointer ${
                          isUnsupported
                            ? "opacity-30 bg-emerald-950/20 text-white/40 cursor-not-allowed"
                            : calcDaysPerWeek === days
                            ? "bg-emerald-450 bg-emerald-500 text-white shadow-lg scale-102 border border-emerald-300/20"
                            : "bg-emerald-950/30 border border-white/5 hover:border-white/10 text-emerald-100"
                        }`}
                      >
                        <span className="text-lg">{days}</span>
                        <span className="text-[9px] uppercase tracking-wider opacity-80">Days</span>
                      </button>
                    );
                  })}
                </div>

                {classMode === "group" && (
                  <p className="text-[10px] text-emerald-300 flex items-center gap-1.5 font-sans">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                    Group classes run on 2, 3, or 5 days frequencies for optimized collaborative peers dynamic.
                  </p>
                )}
              </div>

              {/* Quick Perks Indicator */}
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-2.5 text-xs text-emerald-200/95 font-sans">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Free 3-Day Trial lessons included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Pragmatic custom Tajweed curriculum</span>
                </div>
              </div>

            </div>

            {/* Right Output Column (The visual calculated receipt) */}
            <div className="lg:col-span-5" id="calc-receipt-column">
              <div className="bg-white text-emerald-950 rounded-2xl p-6 border border-emerald-150 h-full flex flex-col justify-between shadow-lg relative">
                
                {selectedPlanForCalc.recommended && (
                  <span className="absolute -top-3 right-4 bg-amber-500 text-white text-[9px] font-extrabold uppercase py-1 px-3 rounded-full shadow tracking-wider flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Best Value
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">
                      Your Customized Plan
                    </span>
                    <h4 className="text-lg font-extrabold text-emerald-950 leading-tight">
                      {selectedPlanForCalc.name}
                    </h4>
                  </div>

                  <div className="border-t border-b border-emerald-950/10 py-3.5 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-emerald-950/60 font-sans">
                      <span>Monthly Sessions:</span>
                      <span className="font-semibold text-emerald-950">{classesCount} Classes / month</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-950/60 font-sans">
                      <span>Class Duration:</span>
                      <span className="font-semibold text-emerald-950">{selectedPlanForCalc.durationPerClass} / session</span>
                    </div>
                    <div className="flex justify-between items-center text-emerald-950/60 font-sans">
                      <span>Class Structure:</span>
                      <span className="font-semibold text-emerald-850">
                        {classMode === "1on1" ? "1-on-1 Premium Private" : "Small Group (3-5 peers)"}
                      </span>
                    </div>
                  </div>

                  {/* Pricing Result Block */}
                  <div className="text-center py-2">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-xl font-bold text-emerald-950/60 self-start mt-2">{calculatedSymbol}</span>
                      <span className="text-5xl font-black text-emerald-950 tracking-tight">{calculatedPrice}</span>
                      <span className="text-sm text-emerald-950/50 self-end mb-1">/mo</span>
                    </div>
                    <p className="text-[11px] text-emerald-700/80 font-bold mt-1.5 font-sans">
                      ≈ {calculatedSymbol}{pricePerClass} per active class
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  {/* Local mini Billing Toggle */}
                  <div className="flex justify-center items-center gap-2 bg-emerald-50 rounded-xl p-1.5 border border-emerald-950/5">
                    <button
                      id="calc-billing-monthly"
                      type="button"
                      onClick={() => setBillingCycle("monthly")}
                      className={`flex-1 text-[10px] py-1.5 font-extrabold rounded-lg transition-all cursor-pointer ${
                        billingCycle === "monthly" ? "bg-white text-emerald-950 shadow-sm" : "text-emerald-950/50"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      id="calc-billing-quarterly"
                      type="button"
                      onClick={() => setBillingCycle("quarterly")}
                      className={`flex-1 text-[10px] py-1.5 font-extrabold rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                        billingCycle === "quarterly" ? "bg-emerald-900 text-white shadow-sm" : "text-emerald-950/50"
                      }`}
                    >
                      Quarterly <span className="bg-amber-400 text-[#1a2e22] px-1 py-0.2 rounded text-[8px] font-black scale-95">-10%</span>
                    </button>
                  </div>

                  {/* Selection Button */}
                  <button
                    id="calc-cta-submit"
                    type="button"
                    onClick={() => onSelectPlan(selectedPlanForCalc.name)}
                    className="w-full py-3.5 bg-emerald-900 hover:bg-emerald-950 text-[#fcfbf7] font-black rounded-xl text-xs tracking-wider uppercase transition-all shadow-md active:scale-97 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-[#fcfbf7]" />
                    Book 3-Day Free Trial
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Grid of plans cards title */}
      <div className="text-center space-y-2 pt-4" id="standard-plans-heading-wrapper">
        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block">
          Step 2: Browse Complete Packages
        </span>
        <h4 className="text-xl font-bold text-emerald-950">
          All Available {classMode === "1on1" ? "1-on-1 Premium Private" : "Small Group Budget-Friendly"} Plans
        </h4>
        <p className="text-xs text-emerald-950/50 max-w-lg mx-auto font-sans">
          Select or compare our structured options below. You can always change or switch packages at any point during your studies.
        </p>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center items-center gap-4 pt-6" id="billing-cycle-toggle-wrapper">
          <span className={`text-xs font-bold transition-colors ${billingCycle === "monthly" ? "text-emerald-950" : "text-emerald-950/50"}`}>
            Monthly Cycle
          </span>
          <button
            id="billing-cycle-toggle-trigger"
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "quarterly" : "monthly")}
            className="relative w-12 h-7 bg-emerald-900 rounded-full p-1 transition-all outline-none"
          >
            <motion.div
              layout
              className="w-5 h-5 bg-[#fcfbf7] rounded-full shadow-md"
              animate={{ x: billingCycle === "monthly" ? 0 : 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-xs font-bold transition-colors flex items-center gap-1.5 ${billingCycle === "quarterly" ? "text-emerald-950" : "text-emerald-950/50"}`}>
            Quarterly Prepay
            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] font-black uppercase rounded-full">
              Save 10%
            </span>
          </span>
        </div>
      </div>

      {/* Grid of plans */}
      <div 
        className={`grid grid-cols-1 md:grid-cols-2 ${
          plans.length === 3 ? "lg:grid-cols-3 max-w-5xl" : "lg:grid-cols-4 max-w-7xl"
        } gap-8 mx-auto`} 
        id="pricing-plans-grid"
      >
        {plans.map((plan, index) => {
          const price = getPrice(plan);
          const symbol = getCurrencySymbol();

          return (
            <motion.div
              key={plan.id}
              id={`plan-card-${plan.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`relative bg-white rounded-2xl border transition-all flex flex-col h-full ${
                plan.recommended
                  ? "border-emerald-800 shadow-xl ring-2 ring-emerald-800/10 scale-102 z-10"
                  : "border-emerald-950/10 shadow-md hover:border-emerald-900/30"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-800 text-white text-[10px] font-bold tracking-widest uppercase py-1 px-4 rounded-full shadow flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="p-6 pb-0 border-b border-emerald-950/5 text-center flex-shrink-0">
                <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-950/50 mb-1">{plan.name}</h4>
                <div className="flex items-center justify-center gap-1 my-3">
                  <span className="text-2xl font-bold text-emerald-950/70 self-start mt-1">{symbol}</span>
                  <span className="text-5xl font-extrabold tracking-tight text-emerald-950">{price}</span>
                  <span className="text-sm text-emerald-950/50 self-end mb-1">/mo</span>
                </div>
                <p className="text-xs text-emerald-800 font-semibold mb-4 bg-emerald-50 rounded-full py-1 inline-block px-4">
                  {plan.daysPerWeek} Classes per week ({plan.classesPerMonth} total)
                </p>
              </div>

              {/* Features list */}
              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-sm text-emerald-950/80">
                      <Check className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA button */}
              <div className="p-6 pt-0 mt-auto flex-shrink-0">
                <button
                  id={`select-plan-${plan.id}`}
                  onClick={() => onSelectPlan(plan.name)}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-97 ${
                    plan.recommended
                      ? "bg-emerald-900 text-white hover:bg-emerald-950 shadow-md shadow-emerald-950/10"
                      : "bg-emerald-50 hover:bg-emerald-100/80 text-emerald-950 border border-emerald-950/10"
                  }`}
                >
                  <Zap className={`w-4 h-4 ${plan.recommended ? "fill-white" : ""}`} />
                  Select & Book Trial
                </button>
                <p className="text-[10px] text-center text-emerald-950/40 mt-3 font-sans">
                  * 3-Day trial is free. No auto-charge.
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
