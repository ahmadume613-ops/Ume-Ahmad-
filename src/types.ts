export interface AcademyConfig {
  name: string;
  taglineEn: string;
  taglineUr: string;
  taglineRoman: string;
  email: string;
  whatsapp: string;
  phone: string;
  facebookUrl: string;
  youtubeUrl: string;
  aboutEn: string;
  aboutUr: string;
  aboutRoman: string;
}

export interface Course {
  id: string;
  titleEn: string;
  titleUr: string;
  titleRoman: string;
  descriptionEn: string;
  descriptionUr: string;
  descriptionRoman: string;
  featuresEn: string[];
  featuresUr: string[];
  featuresRoman: string[];
  iconName: string; // Dynamic Lucide Icon
  recommendedAge: string;
}

export interface PricingPlan {
  id: string;
  daysPerWeek: number; // e.g. 2 days, 3 days, 5 days
  classesPerMonth: number; // e.g. 8, 12, 20
  priceUSD: number;
  isPopular: boolean;
  featuresEn: string[];
  featuresUr: string[];
  featuresRoman: string[];
}

export interface TrialBooking {
  id: string;
  fullName: string;
  age: string;
  parentName?: string;
  email: string;
  whatsapp: string;
  courseId: string;
  timeZone: string;
  preferredDays: string[];
  preferredTimeSlot: string;
  status: "pending" | "approved" | "completed";
  createdAt: string;
}

export type LanguageMode = "en" | "ur" | "roman";
