import React, { createContext, useContext, useState, useEffect } from "react";
import { LanguageCode } from "../types";
import {
  TAMIL_TRANSLATIONS,
  TAMIL_SYMPTOMS_MAP,
  TAMIL_BODY_PARTS,
  TAMIL_DISEASES_MAP
} from "../data/tamilDictionary";
import { TRANSLATIONS as MOCK_TRANSLATIONS } from "../data/mockData";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  toggleTamil: () => void;
  isTamil: boolean;
  t: (key: string, fallback?: string) => string;
  tSymptom: (symptom: string) => string;
  tBodyPart: (partIdOrName: string) => string;
  tDisease: (disease: string) => { name: string; desc?: string; toString: () => string };
  tRisk: (risk: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem("medisense_user_lang");
    if (saved && ["en", "ta", "hi", "bn"].includes(saved)) {
      return saved as LanguageCode;
    }
    return "en";
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("medisense_user_lang", lang);
    } catch (e) {
      // localStorage fallback
    }
  };

  const toggleTamil = () => {
    const nextLang = language === "ta" ? "en" : "ta";
    setLanguage(nextLang);
  };

  const isTamil = language === "ta";

  // General text translation helper
  const t = (key: string, fallback?: string): string => {
    if (language === "ta") {
      if (TAMIL_TRANSLATIONS[key]) {
        return TAMIL_TRANSLATIONS[key];
      }
    }
    // Fallback to mock translations if key exists
    const langDict = MOCK_TRANSLATIONS[language] || MOCK_TRANSLATIONS["en"];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    return fallback || key;
  };

  // Localize clinical symptoms
  const tSymptom = (symptom: string): string => {
    if (!symptom) return "";
    if (language === "ta") {
      const match = TAMIL_SYMPTOMS_MAP[symptom];
      if (match) return match;
      // Partial match search
      for (const [enKey, taVal] of Object.entries(TAMIL_SYMPTOMS_MAP)) {
        if (symptom.toLowerCase().includes(enKey.toLowerCase()) || enKey.toLowerCase().includes(symptom.toLowerCase())) {
          return taVal;
        }
      }
    }
    return symptom;
  };

  // Localize body parts
  const tBodyPart = (partIdOrName: string): string => {
    if (!partIdOrName) return "";
    if (language === "ta") {
      const lower = partIdOrName.toLowerCase();
      for (const [key, val] of Object.entries(TAMIL_BODY_PARTS)) {
        if (lower.includes(key) || key.includes(lower)) {
          return val.name;
        }
      }
    }
    return partIdOrName;
  };

  // Localize disease names and descriptions
  const tDisease = (disease: string): { name: string; desc?: string; toString: () => string } => {
    if (!disease) return { name: "", toString: () => "" };
    if (language === "ta") {
      for (const [enName, data] of Object.entries(TAMIL_DISEASES_MAP)) {
        if (disease.toLowerCase().includes(enName.toLowerCase()) || enName.toLowerCase().includes(disease.toLowerCase())) {
          return { ...data, toString: () => data.name };
        }
      }
    }
    return { name: disease, toString: () => disease };
  };

  // Localize triage risk
  const tRisk = (risk: string): string => {
    if (!risk) return "";
    if (language === "ta") {
      const r = risk.toLowerCase();
      if (r.includes("red") || r.includes("critical") || r.includes("high")) {
        return "சிவப்பு (அவசரம்)";
      }
      if (r.includes("yellow") || r.includes("moderate") || r.includes("medium")) {
        return "மஞ்சள் (கவனம்)";
      }
      if (r.includes("green") || r.includes("mild") || r.includes("low")) {
        return "பச்சை (மிதம்)";
      }
    }
    return risk;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleTamil,
        isTamil,
        t,
        tSymptom,
        tBodyPart,
        tDisease,
        tRisk
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    const defaultDisease = (d: string) => ({ name: d, toString: () => d });
    return {
      language: "en",
      setLanguage: () => {},
      toggleTamil: () => {},
      isTamil: false,
      t: (key: string, fallback?: string) => fallback || key,
      tSymptom: (s: string) => s,
      tBodyPart: (p: string) => p,
      tDisease: defaultDisease,
      tRisk: (r: string) => r,
    };
  }
  return context;
};
