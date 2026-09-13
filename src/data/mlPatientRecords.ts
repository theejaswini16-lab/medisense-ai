export interface PatientMLRecord {
  id: string;
  age: number;
  gender: "M" | "F";
  temp_f: number;
  platelets: number;
  spo2: number;
  pulse_bpm: number;
  bp: string;
  symptoms: string[];
  predictedDisease: string;
  riskLevel: "Red" | "Yellow" | "Green";
  confidence: number;
  icdCode: string;
  primaryShapFeature: string;
  wardSector: string;
}

// Generate 100 diverse, realistic clinical patient machine learning records
export const PATIENT_100_RECORDS: PatientMLRecord[] = Array.from({ length: 100 }, (_, i) => {
  const num = i + 1;
  const padId = `MED-REC-${String(num).padStart(3, "0")}`;
  
  // Categorize into clinical archetypes
  const mod = num % 6;
  
  if (mod === 1) {
    // Dengue vector cases
    return {
      id: padId,
      age: 20 + ((num * 7) % 45),
      gender: num % 2 === 0 ? "M" : "F",
      temp_f: Number((102.2 + ((num % 5) * 0.3)).toFixed(1)),
      platelets: 45 + ((num * 3) % 65), // Low platelets
      spo2: 97 - (num % 3),
      pulse_bpm: 96 + (num % 18),
      bp: "112/74",
      symptoms: ["High Fever", "Retro-orbital Headache", "Joint Pain", "Petechial Rash"],
      predictedDisease: "Viral Dengue Hemorrhagic Fever",
      riskLevel: "Red",
      confidence: Number((93.5 + ((num % 10) * 0.5)).toFixed(1)),
      icdCode: "A90",
      primaryShapFeature: "Thrombocytopenia (Platelets <80k)",
      wardSector: `Urban Sector ${(num % 9) + 1}`
    };
  } else if (mod === 2) {
    // Malaria vector cases
    return {
      id: padId,
      age: 18 + ((num * 9) % 52),
      gender: num % 2 === 0 ? "F" : "M",
      temp_f: Number((103.1 + ((num % 4) * 0.2)).toFixed(1)),
      platelets: 140 + ((num * 5) % 80),
      spo2: 98 - (num % 2),
      pulse_bpm: 102 + (num % 14),
      bp: "118/76",
      symptoms: ["Shivering Chills", "High Grade Fever Spike", "Profuse Diaphoresis", "Fatigue"],
      predictedDisease: "Malaria (Plasmodium Vivax)",
      riskLevel: "Yellow",
      confidence: Number((91.2 + ((num % 10) * 0.6)).toFixed(1)),
      icdCode: "B51.9",
      primaryShapFeature: "Periodic Rigor & Sweating Cycle",
      wardSector: `Urban Sector ${(num % 9) + 1}`
    };
  } else if (mod === 3) {
    // Lobar Pneumonia / Respiratory Hypoxia
    return {
      id: padId,
      age: 45 + ((num * 5) % 38),
      gender: num % 2 === 0 ? "M" : "F",
      temp_f: Number((101.8 + ((num % 3) * 0.4)).toFixed(1)),
      platelets: 210 + (num % 50),
      spo2: 88 + (num % 5), // Hypoxic
      pulse_bpm: 110 + (num % 12),
      bp: "135/88",
      symptoms: ["Productive Sputum Cough", "Chest Tightness", "Dyspnea", "Fever"],
      predictedDisease: "Acute Bacterial Lobar Pneumonia",
      riskLevel: "Red",
      confidence: Number((94.1 + ((num % 8) * 0.5)).toFixed(1)),
      icdCode: "J18.9",
      primaryShapFeature: "SpO2 Desaturation <92%",
      wardSector: `Urban Sector ${(num % 9) + 1}`
    };
  } else if (mod === 4) {
    // Enteric Typhoid Fever
    return {
      id: padId,
      age: 16 + ((num * 11) % 40),
      gender: num % 2 === 0 ? "F" : "M",
      temp_f: Number((102.5 + ((num % 4) * 0.2)).toFixed(1)),
      platelets: 185 + (num % 40),
      spo2: 98,
      pulse_bpm: 82 + (num % 8), // Relative bradycardia
      bp: "115/72",
      symptoms: ["Step-Ladder High Fever", "Abdominal Pain", "Coated Tongue", "Loss of Appetite"],
      predictedDisease: "Enteric Typhoid (Salmonella Typhi)",
      riskLevel: "Yellow",
      confidence: Number((89.7 + ((num % 9) * 0.7)).toFixed(1)),
      icdCode: "A01.0",
      primaryShapFeature: "Relative Faget Sign Bradycardia",
      wardSector: `Urban Sector ${(num % 9) + 1}`
    };
  } else if (mod === 5) {
    // Acute Viral Bronchitis / Smog Rhinitis
    return {
      id: padId,
      age: 22 + ((num * 6) % 50),
      gender: num % 2 === 0 ? "M" : "F",
      temp_f: Number((99.6 + ((num % 3) * 0.3)).toFixed(1)),
      platelets: 240 + (num % 60),
      spo2: 96 + (num % 3),
      pulse_bpm: 78 + (num % 10),
      bp: "120/80",
      symptoms: ["Dry Hacking Cough", "Sore Throat", "Mild Nasal Congestion", "Fatigue"],
      predictedDisease: "Acute Urban Smog Bronchitis",
      riskLevel: "Green",
      confidence: Number((95.4 + ((num % 7) * 0.4)).toFixed(1)),
      icdCode: "J20.9",
      primaryShapFeature: "Normal SpO2 & Afebrile Margin",
      wardSector: `Urban Sector ${(num % 9) + 1}`
    };
  } else {
    // Acute Gastroenteritis / Waterborne
    return {
      id: padId,
      age: 14 + ((num * 8) % 48),
      gender: num % 2 === 0 ? "F" : "M",
      temp_f: Number((100.4 + ((num % 3) * 0.4)).toFixed(1)),
      platelets: 230 + (num % 45),
      spo2: 98,
      pulse_bpm: 98 + (num % 15),
      bp: "106/68",
      symptoms: ["Watery Diarrhea", "Abdominal Cramping", "Nausea & Vomiting", "Thirst"],
      predictedDisease: "Acute Waterborne Gastroenteritis",
      riskLevel: "Yellow",
      confidence: Number((92.8 + ((num % 8) * 0.6)).toFixed(1)),
      icdCode: "A09",
      primaryShapFeature: "Dehydration Biomarkers & Stool Freq",
      wardSector: `Urban Sector ${(num % 9) + 1}`
    };
  }
});
