export type UserRole = "guest" | "patient" | "doctor" | "admin";

export type ViewTab =
  | "landing"
  | "login"
  | "role_select"
  | "dashboard"
  | "symptom_checker"
  | "ai_analysis"
  | "result_report"
  | "medical_history"
  | "nearby_hospitals"
  | "health_tips"
  | "disease_map"
  | "doctor_queue"
  | "admin_analytics"
  | "emergency"
  | "profile"
  | "settings"
  | "ml_datasets";

export type RiskLevel = "Green" | "Yellow" | "Red";

export interface PatientVitals {
  name: string;
  age: number;
  gender: string;
  temperature: number; // °F
  bloodPressure: string; // e.g. "120/80"
  existingDiseases: string;
  villageRegion: string;
}

export interface DiseasePrediction {
  name: string;
  probabilityPercent: number;
  riskLevel: "High" | "Medium" | "Low";
  description: string;
  icdCode?: string;
  commonInRuralAreas?: boolean;
}

export interface MedicineSuggestion {
  name: string;
  dosage: string;
  timing: string;
  notes: string;
  overTheCounter: boolean;
}

export interface AnalysisReport {
  id: string;
  timestamp: string;
  patientInfo: PatientVitals;
  symptoms: string[];
  bodyParts: string[];
  possibleDiseases: DiseasePrediction[];
  overallRiskLevel: RiskLevel;
  severityScore: number; // 1-100
  healthScore: number; // 1-100
  summary: string;
  firstAid: string[];
  medicines: MedicineSuggestion[];
  specialistRecommendation: string;
  precautionaryAdvice: string[];
  ruralUrgencyMessage: string;
}

export interface Hospital {
  id: string;
  name: string;
  type: "Primary Health Center" | "District Hospital" | "Community Clinic" | "Mobile Medical Unit" | "Rural Health Center" | "City General Hospital" | "Metropolitan Medical Center";
  distanceKm: number;
  isOpenNow: boolean;
  phone: string;
  emergencyPhone: string;
  address: string;
  availableBeds: number;
  hasICU: boolean;
  doctorsOnDuty: number;
  rating: number;
  coordinates: { lat: number; lng: number };
}

export interface HealthTip {
  id: string;
  title: string;
  category: "Diabetes" | "Malaria" | "Dengue" | "Fever" | "Hypertension" | "Pregnancy" | "COVID" | "Nutrition";
  summary: string;
  content: string[];
  preventionSteps: string[];
  iconName: string;
  audioDuration?: string;
}

export interface OutbreakData {
  id: string;
  villageName: string;
  district: string;
  primaryDisease: string;
  activeCases: number;
  riskLevel: RiskLevel;
  trend: "rising" | "stable" | "declining";
  waterQualityIndex: number;
  vaccinationRatePercent: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export type LanguageCode = "en" | "hi" | "bn" | "es" | "sw" | "ta" | "te" | "fr";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}
