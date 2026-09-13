import React from "react";
import { ViewTab } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { Activity, ShieldCheck, HeartPulse, Globe } from "lucide-react";

interface FooterProps {
  onNavigateTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab }) => {
  const { isTamil } = useLanguage();

  return (
    <footer className="bg-[#020617]/90 text-white border-t border-white/10 pt-12 pb-0 mt-16 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00C853] to-[#00BCD4] flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">MediSense <span className="text-[#00BCD4]">AI</span></span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isTamil
                ? "கிராமப்புற மக்களுக்கான செயற்கை நுண்ணறிவு (AI) அடிப்படையிலான ஆரம்பகால நோய் கண்டறியும் தளம். தமிழ் மற்றும் ஆங்கிலத்தில் அணுகக்கூடியது."
                : "AI-Powered Early Disease Detection System for Rural Areas using Symptom Input, Vitals, and Machine Learning."}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isTamil ? "தள வழிசெலுத்தல்" : "System Navigation"}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab("landing")} className="hover:text-[#00C853] transition-colors">
                  {isTamil ? "முகப்புப் பக்கம்" : "Landing Page"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("symptom_checker")} className="hover:text-[#00C853] transition-colors">
                  {isTamil ? "அறிகுறி பரிசோதனை (AI)" : "Interactive Symptom Checker"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("nearby_hospitals")} className="hover:text-[#00C853] transition-colors">
                  {isTamil ? "அருகிலுள்ள மருத்துவமனைகள்" : "Nearby Hospitals & PHCs"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("health_tips")} className="hover:text-[#00C853] transition-colors">
                  {isTamil ? "தடுப்பு சுகாதார வழிகாட்டல்" : "Preventive Health Guidelines"}
                </button>
              </li>
            </ul>
          </div>

          {/* Portals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              {isTamil ? "பயனர் பகுதிகள்" : "Role Workspaces"}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab("patient_dashboard")} className="hover:text-[#00BCD4] transition-colors">
                  {isTamil ? "👤 நோயாளி பகுதி" : "👤 Patient Dashboard"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("doctor_dashboard")} className="hover:text-[#00BCD4] transition-colors">
                  {isTamil ? "👨‍⚕️ மருத்துவர் வரிசை" : "👨‍⚕️ Doctor / Clinical Queue"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab("admin_dashboard")} className="hover:text-[#00BCD4] transition-colors">
                  {isTamil ? "🛠 நிர்வாகி நோய் கண்காணிப்பு" : "🛠 Admin Outbreak Surveillance"}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Compliance */}
          <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
              {isTamil ? "கிராமப்புற அவசர உதவி" : "Rural SOS Helpline"}
            </span>
            <p className="text-xs text-white font-black">
              {isTamil ? "108 அவசர ஆம்புலன்ஸ் அழைக்க" : "Call 108 Emergency Ambulance"}
            </p>
            <p className="text-[10px] text-slate-400">
              {isTamil
                ? "இலவச 24/7 அவசர மருத்துவ சேவை"
                : "Free 24/7 National Health Emergency Dispatch Service"}
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Micro-Bar from Professional Polish Theme */}
      <div className="border-t border-white/5 bg-white/5 py-3 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between text-[10px] text-slate-500 uppercase tracking-[0.2em] gap-3">
        <div className="flex gap-6">
          <span>{isTamil ? "அமர்வு" : "Session"}: <span className="text-slate-300">AE-88219</span></span>
          <span>{isTamil ? "இடம்" : "Loc"}: <span className="text-slate-300">Metro City, Rural Zone 04</span></span>
        </div>
        <div className="flex gap-6">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#00C853] rounded-full"></div> {isTamil ? "AI முடுக்கப்பட்டது" : "GPU Accelerated"}</span>
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#00C853] rounded-full"></div> {isTamil ? "பாதுகாப்பானது" : "HIPAA Compliant"}</span>
        </div>
      </div>
    </footer>
  );
};
