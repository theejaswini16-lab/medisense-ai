import React, { useState } from "react";
import { BODY_PARTS_DATA, BodyPartSymptomGroup } from "../data/mockData";
import { Sparkles, Check, Info, RefreshCw } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface InteractiveBodyMapProps {
  selectedSymptoms: string[];
  onToggleSymptom: (symptom: string) => void;
  selectedBodyPart: string | null;
  setSelectedBodyPart: (partId: string) => void;
}

export const InteractiveBodyMap: React.FC<InteractiveBodyMapProps> = ({
  selectedSymptoms = [],
  onToggleSymptom,
  selectedBodyPart,
  setSelectedBodyPart,
}) => {
  const [genderView, setGenderView] = useState<"male" | "female">("male");
  const { isTamil, t, tSymptom, tBodyPart } = useLanguage();

  const currentGroup = BODY_PARTS_DATA.find((b) => b.id === selectedBodyPart) || BODY_PARTS_DATA[0];

  return (
    <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 shadow-2xl">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#00C853] animate-pulse" />
            <h3 className="text-lg font-bold text-white">
              {isTamil ? "ஊடாடும் மனித உடல் அறிகுறி வரைபடம்" : "Interactive Human Body Symptom Locator"}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {isTamil
              ? "ஹாலோகிராமில் உடலின் எந்தப் பகுதியையும் தொட்டு அறிகுறிகளைப் பார்க்கலாம்."
              : "Tap any anatomical region on the hologram to view region-specific symptoms."}
          </p>
        </div>

        {/* Gender View Switcher */}
        <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setGenderView("male")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              genderView === "male"
                ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-black font-extrabold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {isTamil ? "ஆண் மாதிரி" : "Male Model"}
          </button>
          <button
            onClick={() => setGenderView("female")}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              genderView === "female"
                ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-black font-extrabold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {isTamil ? "பெண் மாதிரி" : "Female Model"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: SVG Hologram Silhouette with Interactive Hotspots */}
        <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[380px] bg-gradient-to-b from-slate-950/80 via-slate-900/90 to-slate-950/90 rounded-2xl p-4 border border-cyan-500/20 shadow-inner overflow-hidden">
          
          {/* Cybernetic Grid & Glow Effects */}
          <div className="absolute inset-0 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:16px_16px] opacity-15 pointer-events-none"></div>
          <div className="absolute w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl -top-10 -left-10 pointer-events-none"></div>
          <div className="absolute w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl -bottom-10 -right-10 pointer-events-none"></div>

          {/* Quick anatomical region select buttons for easy touch/click fallback */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-3 z-10 max-w-md">
            {BODY_PARTS_DATA.map((part) => {
              const isSelected = selectedBodyPart === part.id;
              return (
                <button
                  key={part.id}
                  onClick={() => setSelectedBodyPart(part.id)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                    isSelected
                      ? "bg-[#00C853] text-slate-950 font-bold shadow-md shadow-emerald-500/30 scale-105"
                      : "bg-slate-800/80 text-slate-300 border border-slate-700/60 hover:border-cyan-500 hover:text-white"
                  }`}
                >
                  {tBodyPart(part.id)}
                </button>
              );
            })}
          </div>

          {/* Visual Human Body Diagram with SVG Hotspots */}
          <div className="relative w-64 h-80 flex items-center justify-center my-2">
            
            {/* Holographic Body SVG Vector Graphic */}
            <svg
              viewBox="0 0 200 400"
              className="w-full h-full drop-shadow-[0_0_15px_rgba(0,200,83,0.3)] transition-all duration-300"
            >
              <defs>
                <linearGradient id="bodyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00C853" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00BCD4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.8" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Head / Brain Hotspot */}
              <g
                onClick={() => setSelectedBodyPart("head")}
                className="cursor-pointer group"
              >
                <ellipse
                  cx="100"
                  cy="45"
                  rx="26"
                  ry="32"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "head"
                      ? "fill-[#00C853]/40 stroke-[#00C853] stroke-2 filter-[url(#glow)]"
                      : "fill-cyan-950/40 stroke-cyan-500/40 hover:stroke-[#00BCD4] hover:fill-cyan-500/20"
                  }`}
                />
                <circle cx="100" cy="45" r="4" className="fill-[#00C853] animate-ping" />
                <text x="100" y="49" textAnchor="middle" className="text-[9px] fill-white font-bold pointer-events-none">Head</text>
              </g>

              {/* Neck & Throat */}
              <g
                onClick={() => setSelectedBodyPart("throat")}
                className="cursor-pointer group"
              >
                <rect
                  x="88"
                  y="78"
                  width="24"
                  height="22"
                  rx="6"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "throat"
                      ? "fill-[#00C853]/40 stroke-[#00C853] stroke-2"
                      : "fill-cyan-950/40 stroke-cyan-500/40 hover:stroke-[#00BCD4]"
                  }`}
                />
                <text x="100" y="92" textAnchor="middle" className="text-[8px] fill-cyan-300 font-bold pointer-events-none">Throat</text>
              </g>

              {/* Chest / Heart / Lungs */}
              <g
                onClick={() => setSelectedBodyPart("chest")}
                className="cursor-pointer group"
              >
                <path
                  d="M 68 102 L 132 102 L 126 170 L 74 170 Z"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "chest"
                      ? "fill-[#00BCD4]/40 stroke-[#00BCD4] stroke-2 filter-[url(#glow)]"
                      : "fill-cyan-950/40 stroke-cyan-500/40 hover:stroke-[#00BCD4]"
                  }`}
                />
                <circle cx="100" cy="135" r="5" className="fill-cyan-400 animate-pulse" />
                <text x="100" y="139" textAnchor="middle" className="text-[10px] fill-white font-bold pointer-events-none">Chest</text>
              </g>

              {/* Stomach & Abdomen */}
              <g
                onClick={() => setSelectedBodyPart("abdomen")}
                className="cursor-pointer group"
              >
                <path
                  d="M 74 172 L 126 172 L 120 230 L 80 230 Z"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "abdomen"
                      ? "fill-[#00C853]/40 stroke-[#00C853] stroke-2 filter-[url(#glow)]"
                      : "fill-cyan-950/40 stroke-cyan-500/40 hover:stroke-[#00C853]"
                  }`}
                />
                <circle cx="100" cy="200" r="4" className="fill-[#00C853]" />
                <text x="100" y="204" textAnchor="middle" className="text-[10px] fill-white font-bold pointer-events-none">Stomach</text>
              </g>

              {/* Left & Right Arms / Hands */}
              <g
                onClick={() => setSelectedBodyPart("hands")}
                className="cursor-pointer group"
              >
                {/* Left Arm */}
                <path
                  d="M 65 105 L 42 180 L 32 230 L 45 230 L 58 185 L 72 120 Z"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "hands"
                      ? "fill-[#00BCD4]/40 stroke-[#00BCD4] stroke-2"
                      : "fill-cyan-950/30 stroke-cyan-500/30 hover:stroke-[#00BCD4]"
                  }`}
                />
                {/* Right Arm */}
                <path
                  d="M 135 105 L 158 180 L 168 230 L 155 230 L 142 185 L 128 120 Z"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "hands"
                      ? "fill-[#00BCD4]/40 stroke-[#00BCD4] stroke-2"
                      : "fill-cyan-950/30 stroke-cyan-500/30 hover:stroke-[#00BCD4]"
                  }`}
                />
                <text x="38" y="170" textAnchor="middle" className="text-[8px] fill-cyan-300 font-bold pointer-events-none">Hand</text>
                <text x="162" y="170" textAnchor="middle" className="text-[8px] fill-cyan-300 font-bold pointer-events-none">Hand</text>
              </g>

              {/* Legs & Feet */}
              <g
                onClick={() => setSelectedBodyPart("legs")}
                className="cursor-pointer group"
              >
                {/* Left Leg */}
                <path
                  d="M 80 232 L 95 232 L 92 360 L 75 360 Z"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "legs"
                      ? "fill-[#00C853]/40 stroke-[#00C853] stroke-2"
                      : "fill-cyan-950/30 stroke-cyan-500/30 hover:stroke-[#00C853]"
                  }`}
                />
                {/* Right Leg */}
                <path
                  d="M 105 232 L 120 232 L 125 360 L 108 360 Z"
                  className={`transition-all duration-300 ${
                    selectedBodyPart === "legs"
                      ? "fill-[#00C853]/40 stroke-[#00C853] stroke-2"
                      : "fill-cyan-950/30 stroke-cyan-500/30 hover:stroke-[#00C853]"
                  }`}
                />
                <text x="85" y="300" textAnchor="middle" className="text-[8px] fill-emerald-300 font-bold pointer-events-none">Leg</text>
                <text x="115" y="300" textAnchor="middle" className="text-[8px] fill-emerald-300 font-bold pointer-events-none">Leg</text>
              </g>
            </svg>

            {/* Pulse Indicator overlay */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-900/90 border border-cyan-500/30 text-[10px] text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping"></span>
              {isTamil ? "தேர்ந்தெடுக்கப்பட்ட பகுதி: " : "Active Target: "}
              <span className="font-bold text-white">{tBodyPart(currentGroup.id)}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Region Specific Symptom Auto-Pills */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-gradient-to-tr from-[#00C853]/20 to-[#00BCD4]/20 text-[#00C853]">
                  <Sparkles className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {tBodyPart(currentGroup?.id)} {isTamil ? "அறிகுறிகள்" : "Symptoms"}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {isTamil
                      ? "AI பரிசோதனை வரிசையில் சேர்க்க உங்கள் அறிகுறிகளைத் தொடவும்."
                      : "Click to add relevant symptoms to your AI analysis queue."}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {(currentGroup?.symptoms || []).length} {isTamil ? "அறிகுறிகள்" : "Symptoms"}
              </span>
            </div>

            {/* Symptom Chips List */}
            <div className="flex flex-wrap gap-2.5 mt-4 max-h-[260px] overflow-y-auto pr-2 custom-scrollbar">
              {(currentGroup?.symptoms || []).map((symptom) => {
                const isSelected = (selectedSymptoms || []).includes(symptom);
                const translatedSymptom = tSymptom(symptom);
                return (
                  <button
                    key={symptom}
                    onClick={() => onToggleSymptom(symptom)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-medium transition-all duration-200 border ${
                      isSelected
                        ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-bold border-transparent shadow-lg shadow-emerald-500/20 scale-[1.02]"
                        : "bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 hover:border-emerald-500 hover:text-emerald-500"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-colors ${
                        isSelected
                          ? "bg-slate-950 text-[#00C853]"
                          : "border border-slate-400 dark:border-slate-600"
                      }`}
                    >
                      {isSelected ? <Check className="w-3 h-3 stroke-[3]" /> : null}
                    </div>
                    <span className="text-left leading-tight">
                      {isTamil ? (
                        <>
                          <span className="font-semibold block text-xs">{translatedSymptom}</span>
                          <span className="text-[10px] opacity-75 block">{symptom}</span>
                        </>
                      ) : (
                        <span>{symptom}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Count Footer */}
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Info className="w-4 h-4 text-cyan-500" />
              <span>
                {isTamil ? "தேர்ந்தெடுக்கப்பட்டது: " : "Total Selected: "}
                <strong className="text-emerald-500 font-bold">{selectedSymptoms.length}</strong> {isTamil ? "அறிகுறிகள்" : "symptoms"}
              </span>
            </div>
            {selectedSymptoms.length > 0 && (
              <button
                onClick={() => {
                  selectedSymptoms.forEach((s) => onToggleSymptom(s));
                }}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> {isTamil ? "அனைத்தையும் நீக்கு" : "Clear All"}
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
