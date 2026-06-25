export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  image: string;
  features: string[];
}

export type CurrencyCode = "USD" | "GBP" | "EUR" | "CAD" | "AUD" | "AED" | "SAR";

export interface PricingPlan {
  id: string;
  name: string;
  daysPerWeek: number;
  classesPerMonth: number;
  priceUSD: number;
  priceGBP: number;
  priceEUR: number;
  priceCAD: number;
  priceAUD: number;
  priceAED: number;
  priceSAR: number;
  durationPerClass: string;
  recommended: boolean;
  features: string[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: string;
  author: string;
}

export interface TrialBooking {
  studentName: string;
  parentName?: string;
  email: string;
  whatsapp: string;
  country: string;
  courseId: string;
  preferredTime: string;
  notes?: string;
}
