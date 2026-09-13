import {
  Hospital,
  HealthTip,
  OutbreakData,
  LanguageOption,
  AnalysisReport
} from "../types";

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🌐" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", flag: "🇰🇪" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
];

export interface BodyPartSymptomGroup {
  id: string;
  name: string;
  icon: string;
  symptoms: string[];
}

export const BODY_PARTS_DATA: BodyPartSymptomGroup[] = [
  {
    id: "head",
    name: "Head & Brain",
    icon: "Brain",
    symptoms: [
      "Severe Headache",
      "High Fever (>101°F)",
      "Dizziness & Vertigo",
      "Confusion / Memory Loss",
      "Blurred Vision",
      "Light Sensitivity (Photophobia)",
      "Facial Numbness",
      "Chills & Shivering"
    ],
  },
  {
    id: "throat",
    name: "Neck & Throat",
    icon: "Activity",
    symptoms: [
      "Sore Throat",
      "Swollen Neck Glands",
      "Difficulty Swallowing",
      "Stiff Neck",
      "Dry Cough",
      "Voice Hoarseness",
      "Thyroid Tenderness"
    ],
  },
  {
    id: "chest",
    name: "Chest & Lungs",
    icon: "HeartPulse",
    symptoms: [
      "Persistent Cough (>2 weeks)",
      "Shortness of Breath",
      "Chest Tightness",
      "Wheezing",
      "Rapid Heartbeat (Palpitations)",
      "Coughing up Blood or Phlegm",
      "Night Sweats"
    ],
  },
  {
    id: "abdomen",
    name: "Stomach & Abdomen",
    icon: "ShieldAlert",
    symptoms: [
      "Severe Abdominal Cramps",
      "Watery Diarrhea",
      "Nausea & Vomiting",
      "Bloating & Gas",
      "Loss of Appetite",
      "Acidity / Heartburn",
      "Blood in Stool"
    ],
  },
  {
    id: "hands",
    name: "Arms & Joint Hands",
    icon: "Hand",
    symptoms: [
      "Joint Pain & Stiffness",
      "Muscle Weakness",
      "Hand Tremors",
      "Numbness or Tingling",
      "Swollen Knuckles",
      "Skin Rash on Arms"
    ],
  },
  {
    id: "legs",
    name: "Legs & Feet",
    icon: "Footprints",
    symptoms: [
      "Ankle / Leg Swelling",
      "Calf Pain / Cramps",
      "Severe Knee Pain",
      "Cold Feet",
      "Unexplained Ulcers or Wounds",
      "Restless Legs"
    ],
  },
  {
    id: "skin",
    name: "Skin & General Body",
    icon: "Sparkles",
    symptoms: [
      "Yellowing of Skin / Eyes (Jaundice)",
      "Red Skin Rashes or Spots",
      "Extreme Fatigue / Lethargy",
      "Unexplained Weight Loss",
      "Profuse Excessive Sweating",
      "Itching & Hives"
    ],
  },
  {
    id: "back",
    name: "Back & Spine",
    icon: "Bone",
    symptoms: [
      "Lower Back Pain",
      "Kidney Flank Pain",
      "Spinal Stiffness",
      "Shooting Leg Pain (Sciatica)",
      "Postural Fatigue"
    ],
  }
];

export const COMMON_SYMPTOMS_SEARCH = [
  "High Fever", "Persistent Cough", "Shivering Chills", "Shortness of Breath",
  "Severe Headache", "Watery Diarrhea", "Vomiting", "Joint Pain", "Chest Pain",
  "Extreme Fatigue", "Yellow Skin (Jaundice)", "Loss of Appetite", "Sore Throat",
  "Skin Rash", "Abdominal Cramps", "Burning Urination", "Dizziness", "Excessive Thirst"
];

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: "h1",
    name: "Metro Central Multi-Specialty Hospital & Trauma Center",
    type: "District Hospital",
    distanceKm: 1.8,
    isOpenNow: true,
    phone: "+91 98765 43210",
    emergencyPhone: "108 / 112",
    address: "Avenue 4, Central Business District, Metro City",
    availableBeds: 85,
    hasICU: true,
    doctorsOnDuty: 14,
    rating: 4.8,
    coordinates: { lat: 23.456, lng: 85.321 }
  },
  {
    id: "h2",
    name: "Rural Health Center (PHC - Sector 4)",
    type: "Rural Health Center",
    distanceKm: 2.2,
    isOpenNow: true,
    phone: "+91 98765 43211",
    emergencyPhone: "108",
    address: "Municipal Complex, Sector 4, Metro City",
    availableBeds: 28,
    hasICU: true,
    doctorsOnDuty: 6,
    rating: 4.6,
    coordinates: { lat: 23.472, lng: 85.340 }
  },
  {
    id: "h3",
    name: "City Medical College & Super-Specialty Hospital",
    type: "City General Hospital",
    distanceKm: 5.5,
    isOpenNow: true,
    phone: "+91 98765 43212",
    emergencyPhone: "108 / 112",
    address: "Healthcare Boulevard, North Ring Road",
    availableBeds: 240,
    hasICU: true,
    doctorsOnDuty: 36,
    rating: 4.9,
    coordinates: { lat: 23.510, lng: 85.390 }
  },
  {
    id: "h4",
    name: "Downtown Rapid Response Mobile Clinic (MMU 02)",
    type: "Mobile Medical Unit",
    distanceKm: 0.5,
    isOpenNow: true,
    phone: "+91 98765 43213",
    emergencyPhone: "108",
    address: "Stationed at West Metro Transit Hub",
    availableBeds: 4,
    hasICU: false,
    doctorsOnDuty: 3,
    rating: 4.7,
    coordinates: { lat: 23.450, lng: 85.318 }
  }
];

export const MOCK_HEALTH_TIPS: HealthTip[] = [
  {
    id: "t1",
    title: "Preventing Dengue & Vector-Borne Risks in Rural High-Rises",
    category: "Dengue",
    summary: "Essential steps to eliminate mosquito breeding grounds in AC trays, flower pots, and overhead tanks.",
    content: [
      "Empty stagnant water from air conditioner trays, potted plant saucers, and terrace drains weekly.",
      "Install fine insect mesh on apartment windows and balcony doors.",
      "Apply approved insect repellent when visiting public parks or outdoor transit stops."
    ],
    preventionSteps: [
      "Keep balcony and rooftop water containers tightly sealed.",
      "Seek blood testing immediately if high fever occurs with joint aches."
    ],
    iconName: "Bug",
    audioDuration: "1:45"
  },
  {
    id: "t2",
    title: "Safe Drinking Water Sanitation & Rural Food Safety",
    category: "Fever",
    summary: "Prevent waterborne typhoid and gastroenteritis using proper filtration and food hygiene.",
    content: [
      "Ensure regular RO / UV water purifier filter replacement and boil drinking water during monsoons.",
      "Avoid raw salads and unsealed street drinks during seasonal infectious disease spikes.",
      "Carry a reusable stainless steel water flask to prevent reliance on unverified water sources."
    ],
    preventionSteps: [
      "Always wash hands with soap before eating and after using public transit.",
      "Administer ORS electrolytes immediately at the first sign of loose stools."
    ],
    iconName: "Droplets",
    audioDuration: "2:10"
  },
  {
    id: "t3",
    title: "Managing High Blood Pressure & Rural Work Stress",
    category: "Hypertension",
    summary: "Targeted lifestyle adjustments and stress control practices for rural professionals and residents.",
    content: [
      "Reduce processed food intake, sodium, and fast food consumption to under 2,000mg sodium daily.",
      "Incorporate 30 minutes of aerobic exercise, brisk walking, or yoga before morning screen time.",
      "Practice deep breathing exercises during work commute breaks to lower resting cortisol."
    ],
    preventionSteps: [
      "Check blood pressure monthly using a digital home monitor or at an Rural Health Center.",
      "Never stop prescribed BP medication without clinical consultation."
    ],
    iconName: "HeartPulse",
    audioDuration: "1:30"
  },
  {
    id: "t4",
    title: "Maternal Health & Nutrition for Rural Working Mothers",
    category: "Pregnancy",
    summary: "Key iron-folic acid guidelines, ergonomic desk posture, and regular prenatal scan timelines.",
    content: [
      "Take daily prenatal Iron and Folic Acid (IFA) tablets as prescribed by your obstetrician.",
      "Maintain hydration and ergonomic back support during desk work and office transit.",
      "Schedule trimester ultrasound screenings and routine blood glucose checks."
    ],
    preventionSteps: [
      "Register pregnancy early with your local rural maternity hospital or clinic.",
      "Plan institutional delivery with a certified hospital team."
    ],
    iconName: "Baby",
    audioDuration: "2:40"
  },
  {
    id: "t5",
    title: "Early Diabetes Detection in Sedentary Rural Lifestyles",
    category: "Diabetes",
    summary: "Recognizing frequent urination, unexplained fatigue, and slow wound healing.",
    content: [
      "Sedentary desk routines and high-glycemic diets can silently accelerate insulin resistance.",
      "Substitute refined flour and sugary beverages with whole grains, legumes, and fiber-rich greens.",
      "Take short 5-minute walking breaks every 60 minutes of seated desk work."
    ],
    preventionSteps: [
      "Get fasting blood glucose and HbA1c screening done annually.",
      "Stay active with daily step counts above 8,000 steps."
    ],
    iconName: "Activity",
    audioDuration: "2:05"
  },
  {
    id: "t6",
    title: "Combatting Anemia & Micronutrient Gaps in Rural Women",
    category: "Nutrition",
    summary: "Dietary optimization and vitamin B12 / iron boosters to improve daily energy and hemoglobin.",
    content: [
      "Anemia causes chronic fatigue, brain fog, pale conjunctiva, and rapid heart rates upon climbing stairs.",
      "Incorporate leafy greens, lentils, citrus fruits, pumpkin seeds, and fortified cereals.",
      "Avoid consuming tea or coffee with iron-rich meals to maximize mineral bioavailability."
    ],
    preventionSteps: [
      "Check complete blood count (CBC) and ferritin levels annually.",
      "Consult a physician for therapeutic iron and B12 supplementation if levels are low."
    ],
    iconName: "Apple",
    audioDuration: "1:50"
  }
];

export const MOCK_OUTBREAKS: OutbreakData[] = [
  {
    id: "o1",
    villageName: "Central Metro District",
    district: "Sector 4 Metro Zone",
    primaryDisease: "Viral Dengue Fever",
    activeCases: 28,
    riskLevel: "Red",
    trend: "rising",
    waterQualityIndex: 72,
    vaccinationRatePercent: 94
  },
  {
    id: "o2",
    villageName: "Downtown North",
    district: "Metro Tech Corridor",
    primaryDisease: "Seasonal Influenza / Viral Fever",
    activeCases: 19,
    riskLevel: "Yellow",
    trend: "stable",
    waterQualityIndex: 82,
    vaccinationRatePercent: 96
  },
  {
    id: "o3",
    villageName: "East Industrial Borough",
    district: "Riverside Rural Zone",
    primaryDisease: "Acute Gastroenteritis",
    activeCases: 22,
    riskLevel: "Red",
    trend: "rising",
    waterQualityIndex: 58,
    vaccinationRatePercent: 86
  },
  {
    id: "o4",
    villageName: "West Uptown Suburb",
    district: "Outer Ring Metro",
    primaryDisease: "Allergic Bronchitis (Smog Related)",
    activeCases: 9,
    riskLevel: "Green",
    trend: "declining",
    waterQualityIndex: 93,
    vaccinationRatePercent: 98
  }
];

export const MOCK_HISTORY_REPORTS: AnalysisReport[] = [
  {
    id: "REP-9821",
    timestamp: "2026-07-28 10:30 AM",
    patientInfo: {
      name: "Ramesh Sharma",
      age: 42,
      gender: "Male",
      temperature: 102.1,
      bloodPressure: "130/85",
      existingDiseases: "None",
      villageRegion: "Central Metro Sector 4"
    },
    symptoms: ["High Fever (>101°F)", "Chills & Shivering", "Severe Headache"],
    bodyParts: ["Head & Brain", "Skin & General Body"],
    possibleDiseases: [
      {
        name: "Viral Dengue Fever",
        probabilityPercent: 89,
        riskLevel: "High",
        description: "Classic high fever with severe headache, retro-orbital pressure, and fatigue typical in rural monsoon outbreaks.",
        icdCode: "A90",
        commonInRuralAreas: true
      }
    ],
    overallRiskLevel: "Red",
    severityScore: 82,
    healthScore: 64,
    summary: "Patient Ramesh Sharma presented with sudden high fever spike (102.1°F) and retro-orbital discomfort. High correlation with Dengue / Acute Viral illness.",
    firstAid: [
      "Keep patient well hydrated with electrolyte water and safe fluids.",
      "Apply cool damp compress on forehead to moderate body temperature.",
      "Schedule CBC platelet count and NS1 antigen test at a Rural Health Center."
    ],
    medicines: [
      {
        name: "Paracetamol 650mg",
        dosage: "1 tablet every 6 hours as needed",
        timing: "After Food",
        notes: "Avoid NSAIDs like Aspirin/Ibuprofen without clinical advice.",
        overTheCounter: true
      }
    ],
    specialistRecommendation: "Rural Primary Health Center (PHC) Physician & Infectious Disease Consultant",
    precautionaryAdvice: [
      "Use indoor mosquito repellent and wear protective light clothing.",
      "Monitor for warning signs including persistent vomiting or severe abdominal tenderness."
    ],
    ruralUrgencyMessage: "URGENT: Visit nearest Rural Primary Health Center (PHC) or City Emergency Ward for rapid blood tests."
  }
];

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    heroTitle: "Detect Diseases Early with AI",
    heroSub: "Empowering rural communities through intelligent symptom analysis, early disease prediction, and accessible healthcare.",
    getStarted: "Get Started",
    watchDemo: "Watch Demo",
    symptomChecker: "Symptom Checker",
    dashboard: "Dashboard",
    nearbyHospitals: "Nearby Hospitals",
    healthTips: "Health Tips",
    emergency: "Emergency SOS",
    analyzeWithAI: "Analyze with AI",
    detectEarly: "Early AI Diagnosis",
    healthScore: "Health Score",
    riskLevel: "Risk Level",
    doctorConsult: "Book Doctor Consultation",
    downloadPDF: "Download PDF Report",
    diseaseMap: "Disease Spread Map"
  },
  hi: {
    heroTitle: "एआई के साथ बीमारियों का समय पर पता लगाएं",
    heroSub: "बुद्धिमान लक्षण विश्लेषण और सुलभ स्वास्थ्य सेवा के माध्यम से शहरी समुदायों को सशक्त बनाना।",
    getStarted: "शुरू करें",
    watchDemo: "डेमो देखें",
    symptomChecker: "लक्षण जांचकर्ता",
    dashboard: "डैशबोर्ड",
    nearbyHospitals: "निकटतम अस्पताल",
    healthTips: "स्वास्थ्य सुझाव",
    emergency: "आपत्कालीन सेवा",
    analyzeWithAI: "एआई से जांचें",
    detectEarly: "शुरुआती एआई निदान",
    healthScore: "स्वास्थ्य स्कोर",
    riskLevel: "जोखिम स्तर",
    doctorConsult: "डॉक्टर से परामर्श लें",
    downloadPDF: "रिपोर्ट डाउनलोड करें",
    diseaseMap: "बीमारी प्रसार मानचित्र"
  },
  bn: {
    heroTitle: "এআই দিয়ে আগেই রোগ চিহ্নিত করুন",
    heroSub: "বুদ্ধিমান লক্ষণ বিশ্লেষণ এবং সহজলভ্য স্বাস্থ্যসেবার মাধ্যমে নগর সম্প্রদায়কে ক্ষমতায়ন।",
    getStarted: "শুরু করুন",
    watchDemo: "ডেমো দেখুন",
    symptomChecker: "লক্ষণ পরীক্ষক",
    dashboard: "ড্যাশবোর্ড",
    nearbyHospitals: "কাছাকাছি হাসপাতাল",
    healthTips: "স্বাস্থ্য টিপস",
    emergency: "জরুরী সেবা",
    analyzeWithAI: "এআই দিয়ে বিশ্লেষণ করুন",
    detectEarly: "প্রাথমিক এআই ডায়াগনসিস",
    healthScore: "স্বাস্থ্য স্কোর",
    riskLevel: "ঝুঁকির মাত্রা",
    doctorConsult: "ডাক্তারের পরামর্শ নিন",
    downloadPDF: "রিপোর্ট डाउनलोड করুন",
    diseaseMap: "রোগের বিস্তার মানচিত্র"
  },
  ta: {
    heroTitle: "AI மூலம் நோய்களை ஆரம்பத்திலேயே கண்டறியுங்கள்",
    heroSub: "புத்திசாலித்தனமான அறிகுறி பகுப்பாய்வு மற்றும் கிராமப்புற சமூகங்களுக்கான உடனடி மருத்துவ உதவி.",
    getStarted: "தொடங்கவும்",
    watchDemo: "டெமோ பார்க்கவும்",
    symptomChecker: "அறிகுறி பரிசோதனை",
    dashboard: "கட்டுப்பாட்டு அறை",
    nearbyHospitals: "அருகிலுள்ள மருத்துவமனைகள்",
    healthTips: "சுகாதார ஆலோசனைகள்",
    emergency: "அவசர உதவி SOS",
    analyzeWithAI: "AI மூலம் பகுப்பாய்வு செய்",
    detectEarly: "ஆரம்பகால AI நோய் கணிப்பு",
    healthScore: "உடல்நல மதிப்பெண்",
    riskLevel: "அபாய நிலை",
    doctorConsult: "மருத்துவரிடம் ஆலோசனை பெறுங்கள்",
    downloadPDF: "அறிக்கையைப் பதிவிறக்கு",
    diseaseMap: "நோய் பரவல் வரைபடம்"
  }
};
