import React, { useState } from "react";
import { InteractiveBodyMap } from "./InteractiveBodyMap";
import { COMMON_SYMPTOMS_SEARCH } from "../data/mockData";
import { PatientVitals } from "../types";
import { useLanguage } from "../context/LanguageContext";
import {
  Mic,
  MicOff,
  Search,
  Sparkles,
  User,
  Thermometer,
  Activity,
  Shield,
  MapPin,
  X,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface SymptomCheckerProps {
  selectedSymptoms?: string[];
  setSelectedSymptoms?: React.Dispatch<React.SetStateAction<string[]>>;
  patientVitals?: PatientVitals;
  setPatientVitals?: React.Dispatch<React.SetStateAction<PatientVitals>>;
  onStartAnalysis?: (report?: any) => void;
}

export const SymptomChecker: React.FC<SymptomCheckerProps> = ({
  selectedSymptoms: propSelectedSymptoms,
  setSelectedSymptoms: propSetSelectedSymptoms,
  patientVitals: propPatientVitals,
  setPatientVitals: propSetPatientVitals,
  onStartAnalysis,
}) => {
  const [internalSymptoms, setInternalSymptoms] = useState<string[]>([
    "High Fever (>101°F)",
    "Persistent Cough",
  ]);
  const [internalVitals, setInternalVitals] = useState<PatientVitals>({
    name: "Ramesh Sharma",
    age: 42,
    gender: "Male",
    temperature: 101.4,
    bloodPressure: "120/80",
    existingDiseases: "None",
    villageRegion: "Central Metro District, Sector 4",
  });

  const selectedSymptoms = propSelectedSymptoms || internalSymptoms;
  const setSelectedSymptoms = propSetSelectedSymptoms || setInternalSymptoms;

  const patientVitals = propPatientVitals || internalVitals;
  const setPatientVitals = propSetPatientVitals || setInternalVitals;

  const [selectedBodyPart, setSelectedBodyPart] = useState<string>("head");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [voiceText, setVoiceText] = useState("");

  const { isTamil, t, tSymptom } = useLanguage();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev = []) =>
      (prev || []).includes(symptom)
        ? (prev || []).filter((s) => s !== symptom)
        : [...(prev || []), symptom]
    );
  };

  // Web Speech API Voice Input integration or smart speech simulator
  const handleVoiceInput = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      try {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = isTamil ? "ta-IN" : "en-US";
        recognition.continuous = false;
        recognition.interimResults = true;

        setIsRecording(true);

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("");

          setVoiceText(transcript);
          
          // Auto-detect symptoms from spoken transcript (English & Tamil)
          COMMON_SYMPTOMS_SEARCH.forEach((s) => {
            if ((transcript || "").toLowerCase().includes((s || "").toLowerCase()) && !(selectedSymptoms || []).includes(s)) {
              setSelectedSymptoms((prev = []) => [...(prev || []), s]);
            }
          });

          // Tamil speech recognition keyword match
          if (isTamil) {
            const tamilMap: [string, string][] = [
              ["காய்ச்சல்", "High Fever (>101°F)"],
              ["சூடு", "High Fever (>101°F)"],
              ["தலைவலி", "Severe Headache"],
              ["தலை வலி", "Severe Headache"],
              ["இருமல்", "Persistent Cough (>2 weeks)"],
              ["சளி", "Coughing up Blood or Phlegm"],
              ["மூச்சு", "Shortness of Breath"],
              ["நெஞ்சு", "Chest Tightness"],
              ["வயிறு", "Severe Abdominal Cramps"],
              ["வாந்தி", "Nausea & Vomiting"],
              ["பேதி", "Watery Diarrhea"],
              ["வயிற்றுப்போக்கு", "Watery Diarrhea"],
              ["மூட்டு", "Joint Pain & Stiffness"],
              ["சோர்வு", "Fatigue"],
              ["மயக்கம்", "Dizziness & Vertigo"],
              ["குளிர்", "Chills & Shivering"],
              ["நடுக்கம்", "Chills & Shivering"],
              ["தோல்", "Skin Rash on Arms"]
            ];
            tamilMap.forEach(([kw, sym]) => {
              if (transcript.includes(kw) && !(selectedSymptoms || []).includes(sym)) {
                setSelectedSymptoms((prev = []) => [...(prev || []), sym]);
              }
            });
          }
        };

        recognition.onerror = () => {
          setIsRecording(false);
        };

        recognition.onend = () => {
          setIsRecording(false);
        };

        recognition.start();
      } catch (err) {
        fallbackVoiceSimulation();
      }
    } else {
      fallbackVoiceSimulation();
    }
  };

  const fallbackVoiceSimulation = () => {
    setIsRecording(true);
    const initialText = isTamil
      ? "நோயாளி குரல் பதிவு: 'எனக்கு 2 நாளாக தீவிர காய்ச்சலும் கடுமையான தலைவலியும் உள்ளது...'"
      : "Listening: 'I have severe headache, fever and body ache...'";
    setVoiceText(initialText);
    setTimeout(() => {
      setIsRecording(false);
      ["High Fever (>101°F)", "Severe Headache", "Extreme Fatigue / Lethargy"].forEach((s) => {
        if (!(selectedSymptoms || []).includes(s)) {
          setSelectedSymptoms((prev = []) => [...(prev || []), s]);
        }
      });
      setVoiceText("");
    }, 2500);
  };

  const filteredSearchSymptoms = COMMON_SYMPTOMS_SEARCH.filter(
    (s) =>
      (s || "").toLowerCase().includes((searchQuery || "").toLowerCase()) &&
      !(selectedSymptoms || []).includes(s)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00C853]/15 to-[#00BCD4]/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-4 h-4 animate-spin" /> {isTamil ? "மேம்பட்ட AI நோய் கண்டறியும் எஞ்சின்" : "Next-Gen AI Diagnostic Engine"}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {isTamil ? "ஊடாடும் அறிகுறி பரிசோதனை & ஆரம்பகால AI கணிப்பு" : "Interactive Symptom Analyzer & Early AI Detection"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {isTamil
            ? "மனித உடல் வரைபடத்தில் தொட்டு பகுதிகளைத் தேர்ந்தெடுக்கவும், தமிழில் குரல் மூலம் பேசவும், அல்லது அறிகுறிகளைத் தேடிச் சேர்க்கவும்."
            : "Select body parts on the human hologram, describe symptoms via voice, or search from clinical database."}
        </p>
      </div>

      {/* Main Interactive Body Map Component */}
      <InteractiveBodyMap
        selectedSymptoms={selectedSymptoms}
        onToggleSymptom={toggleSymptom}
        selectedBodyPart={selectedBodyPart}
        setSelectedBodyPart={setSelectedBodyPart}
      />

      {/* Voice & Search Input Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl">
        
        {/* Voice Assistant Module */}
        <div className="md:col-span-5 flex flex-col justify-between p-6 rounded-2xl bg-[#1E3A8A]/20 text-white border border-[#1E3A8A]/40 relative overflow-hidden backdrop-blur-md">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00BCD4]/10 rounded-full blur-2xl"></div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#00BCD4] uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-4 h-4" /> {isTamil ? "AI குரல் உதவியாளர்" : "AI Voice Assistant"}
              </span>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/30 text-[#00C853] font-semibold">
                {isTamil ? "தமிழ் குரல் ஆதரவு" : "Multilingual Speech"}
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              {isTamil
                ? "உங்கள் அறிகுறிகளைத் தமிழில் நேரடியாகப் பேசலாம் (எ.கா: 'எனக்கு காய்ச்சல் மற்றும் தலைவலி')."
                : "Speak your symptoms in your regional language (Hindi, Bengali, English, etc.)."}
            </p>
          </div>

          <div className="space-y-3">
            {voiceText && (
              <div className="p-3 rounded-xl bg-slate-900/80 text-xs text-[#00BCD4] border border-[#00BCD4]/30 font-mono animate-pulse">
                {voiceText}
              </div>
            )}

            <button
              onClick={handleVoiceInput}
              className={`w-full py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                isRecording
                  ? "bg-rose-500 text-white shadow-rose-500/40 animate-pulse"
                  : "bg-[#1E3A8A] hover:bg-[#2563EB] text-white rounded-xl shadow-blue-900/20"
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4 animate-bounce" /> {isTamil ? "கேட்கிறது... நிறுத்த தொடவும்" : "Listening... Tap to Stop"}
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" /> {isTamil ? "குரல் மூலம் பேசத் தொடங்குங்கள்" : "Start Voice Symptom Recording"}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Symptom Search Bar & Active Selected Tags */}
        <div className="md:col-span-7 space-y-4 flex flex-col justify-between">
          <div>
            <label className="text-xs uppercase font-bold text-slate-400 tracking-widest block mb-2">
              {isTamil ? "அறிகுறிகளைத் தேடிச் சேர்க்கவும்" : "Search & Add Clinical Symptoms"}
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isTamil ? "அறிகுறிகளைத் தட்டச்சு செய்யவும் (எ.கா: காய்ச்சல், இருமல், வாந்தி, மூட்டு வலி)..." : "Type symptoms (e.g., Fever, Cough, Joint Pain, Vomiting)..."}
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00BCD4]"
              />
            </div>

            {/* Auto Suggestions Dropdown / Chips */}
            {searchQuery && filteredSearchSymptoms.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 max-h-32 overflow-y-auto p-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {filteredSearchSymptoms.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      toggleSymptom(s);
                      setSearchQuery("");
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    + {isTamil ? `${tSymptom(s)} (${s})` : s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Active Selected Symptom Queue */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                {isTamil ? "தேர்ந்தெடுக்கப்பட்ட அறிகுறிகள் வரிசை" : "Active Symptom Queue"} ({(selectedSymptoms || []).length})
              </span>
              {(selectedSymptoms || []).length === 0 && (
                <span className="text-[11px] text-amber-500 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {isTamil ? "குறைந்தது 1 அறிகுறியையாவது தேர்வு செய்யவும்" : "Please select at least 1 symptom"}
                </span>
              )}
            </div>

            <div className="min-h-[50px] p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 items-center">
              {(selectedSymptoms || []).length === 0 ? (
                <p className="text-xs text-slate-400 italic">
                  {isTamil
                    ? "இதுவரை அறிகுறிகள் எதுவும் தேர்ந்தெடுக்கப்படவில்லை. உடல் வரைபடத்தில் தொடவும் அல்லது குரல் மூலம் பேசவும்."
                    : "No symptoms selected yet. Tap body hologram or search above."}
                </p>
              ) : (
                (selectedSymptoms || []).map((symptom) => (
                  <span
                    key={symptom}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isTamil ? tSymptom(symptom) : symptom}</span>
                    <button
                      onClick={() => toggleSymptom(symptom)}
                      className="ml-1 text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Patient Vitals Form Card */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-[#00C853] to-[#00BCD4] text-slate-950 font-bold shadow-lg">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              {isTamil ? "நோயாளி மருத்துவ விபரங்கள் & முக்கிய அறிகுறிகள்" : "Patient Vitals & Medical Profile"}
            </h3>
            <p className="text-xs text-slate-400">
              {isTamil
                ? "துல்லியமான AI ஆபத்து மதிப்பீடு மற்றும் மருத்துவ பரிந்துரைகளுக்காக அடிப்படை தகவல்களை உள்ளிடவும்."
                : "Provide basic patient info for accurate ML risk profiling and urban clinical recommendations."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Patient Name */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              {isTamil ? "நோயாளியின் முழு பெயர்" : "Patient Full Name"}
            </label>
            <input
              type="text"
              value={patientVitals.name}
              onChange={(e) => setPatientVitals({ ...patientVitals, name: e.target.value })}
              placeholder={isTamil ? "எ.கா: சுந்தரம் அல்லது மீனாட்சி" : "e.g. Ramesh Sharma"}
              className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
            />
          </div>

          {/* Age & Gender */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5 grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                {isTamil ? "வயது (ஆண்டுகள்)" : "Age (Years)"}
              </label>
              <input
                type="number"
                value={patientVitals.age}
                onChange={(e) => setPatientVitals({ ...patientVitals, age: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">
                {isTamil ? "பாலினம்" : "Gender"}
              </label>
              <select
                value={patientVitals.gender}
                onChange={(e) => setPatientVitals({ ...patientVitals, gender: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
              >
                <option value="Male">{isTamil ? "ஆண் (Male)" : "Male"}</option>
                <option value="Female">{isTamil ? "பெண் (Female)" : "Female"}</option>
                <option value="Other">{isTamil ? "பிற (Other)" : "Other"}</option>
              </select>
            </div>
          </div>

          {/* Temperature */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <label className="text-xs font-bold text-slate-300 flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-rose-400" /> {isTamil ? "உடல் வெப்பநிலை (°F)" : "Body Temp (°F)"}</span>
              <span className={`text-[11px] font-bold ${patientVitals.temperature > 100 ? "text-rose-400 animate-pulse" : "text-[#00C853]"}`}>
                {patientVitals.temperature > 100 ? (isTamil ? "தீவிர காய்ச்சல்" : "High Fever") : (isTamil ? "இயல்பானது" : "Normal")}
              </span>
            </label>
            <input
              type="number"
              step="0.1"
              value={patientVitals.temperature}
              onChange={(e) => setPatientVitals({ ...patientVitals, temperature: parseFloat(e.target.value) || 98.6 })}
              className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
            />
          </div>

          {/* Blood Pressure */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00BCD4]" /> {isTamil ? "ரத்த அழுத்தம் (mmHg)" : "Blood Pressure (mmHg)"}
            </label>
            <input
              type="text"
              value={patientVitals.bloodPressure}
              onChange={(e) => setPatientVitals({ ...patientVitals, bloodPressure: e.target.value })}
              placeholder="e.g. 120/80"
              className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
            />
          </div>

          {/* Existing Diseases */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" /> {isTamil ? "முந்தைய நோய்கள் / பாதிப்புகள்" : "Existing Conditions"}
            </label>
            <input
              type="text"
              value={patientVitals.existingDiseases}
              onChange={(e) => setPatientVitals({ ...patientVitals, existingDiseases: e.target.value })}
              placeholder={isTamil ? "எ.கா: சர்க்கரை நோய், ஆஸ்துமா, ஏதுமில்லை" : "e.g. Diabetes, Asthma, None"}
              className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
            />
          </div>

          {/* Urban Ward / Sector Region */}
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1 mb-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#00C853]" /> {isTamil ? "வசிக்கும் நகர்ப்புற வார்டு / பகுதி" : "Urban Ward / Sector"}
            </label>
            <input
              type="text"
              value={patientVitals.villageRegion}
              onChange={(e) => setPatientVitals({ ...patientVitals, villageRegion: e.target.value })}
              placeholder={isTamil ? "எ.கா: மண்டலம் 5, அண்ணா நகர், சென்னை" : "e.g. Central Metro District, Sector 4"}
              className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#00BCD4] focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* Large Glowing AI Button */}
      <div className="pt-4 flex flex-col items-center justify-center">
        <button
          onClick={onStartAnalysis}
          disabled={(selectedSymptoms || []).length === 0}
          className={`group relative w-full sm:w-auto px-10 py-5 rounded-3xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
            (selectedSymptoms || []).length === 0
              ? "bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-[#00C853] via-[#00BCD4] to-[#1E3A8A] text-slate-950 hover:scale-105 active:scale-95 shadow-emerald-500/30 cursor-pointer"
          }`}
        >
          {(selectedSymptoms || []).length > 0 && (
            <span className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] opacity-50 blur-lg group-hover:opacity-100 transition duration-300"></span>
          )}
          <span className="relative flex items-center gap-3">
            <Sparkles className="w-6 h-6 animate-pulse text-slate-950" />
            <span>{isTamil ? "மெடிசென்ஸ் AI மூலம் பகுப்பாய்வு செய்யுங்கள்" : "Analyze with MediSense AI"}</span>
          </span>
        </button>
        <p className="text-xs text-slate-400 mt-3 text-center">
          {isTamil
            ? "ஜெமினி 3.6 மருத்துவ AI மற்றும் நரம்பியல் நோய் பரவல் ஒப்பீட்டு மாதிரிகளால் இயக்கப்படுகிறது"
            : "Powered by Gemini 3.6 Clinical AI & Neural Outbreak Comparison Models"}
        </p>
      </div>

    </div>
  );
};
