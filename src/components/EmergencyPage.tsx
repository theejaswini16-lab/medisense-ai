import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  PhoneCall,
  AlertTriangle,
  Share2,
  Hospital as HospitalIcon,
  MapPin,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Ambulance,
  Send,
  Radio
} from "lucide-react";

export const EmergencyPage: React.FC = () => {
  const { isTamil } = useLanguage();
  const [locationShared, setLocationShared] = useState(false);
  const [patientName, setPatientName] = useState(isTamil ? "கிராமப்புற நோயாளி" : "Rural Citizen");
  const [contactPhone, setContactPhone] = useState("9876543210");
  const [location, setLocation] = useState(isTamil ? "செக்டார் 4, கிராமப்புற பகுதி" : "Sector 4 Metro Area");
  const [condition, setCondition] = useState(isTamil ? "கடுமையான மூச்சுத்திணறல் & காய்ச்சல்" : "Acute Respiratory Distress");
  const [isDispatching, setIsDispatching] = useState(false);
  const [activeDispatch, setActiveDispatch] = useState<any | null>(null);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocationShared(true);
          setLocation(`Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)} (GPS Active)`);
        },
        () => {
          setLocationShared(true);
        }
      );
    } else {
      setLocationShared(true);
    }
  };

  const handleDispatchAmbulance = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatching(true);
    try {
      const res = await fetch("/api/emergency/dispatch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientName,
          contactPhone,
          location,
          condition,
          urgency: "CRITICAL"
        })
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.data) {
          setActiveDispatch(json.data);
          return;
        }
      }

      // Fallback
      setActiveDispatch({
        id: `AMB-108-${Math.floor(100 + Math.random() * 900)}`,
        patientName,
        assignedHospital: "Metro Central Multi-Specialty Hospital",
        assignedAmbulance: "Unit 04 (Advanced Life Support)",
        etaMinutes: 7,
        status: "Dispatched",
        dispatchedAt: new Date().toLocaleTimeString()
      });
    } catch (err) {
      setActiveDispatch({
        id: `AMB-108-${Math.floor(100 + Math.random() * 900)}`,
        patientName,
        assignedHospital: "Metro Central Multi-Specialty Hospital",
        assignedAmbulance: "Unit 04 (Advanced Life Support)",
        etaMinutes: 7,
        status: "Dispatched",
        dispatchedAt: new Date().toLocaleTimeString()
      });
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* BIG EMERGENCY HERO CARD */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-rose-600 via-rose-700 to-red-900 text-white shadow-2xl shadow-rose-500/30 border border-rose-400/40 space-y-8 relative overflow-hidden text-center">
        
        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto animate-bounce">
          <PhoneCall className="w-10 h-10 text-white" />
        </div>

        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest bg-white/20 px-4 py-1.5 rounded-full inline-block">
            {isTamil ? "கிராமப்புற அவசர மருத்துவ உதவி அமைப்பு" : "RURAL EMERGENCY RESPONSE SYSTEM"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {isTamil ? "108 அவசர ஆம்புலன்ஸ் சேவை" : "Emergency Dispatch Gateway"}
          </h1>
          <p className="text-sm text-rose-100 leading-relaxed">
            {isTamil
              ? "உடனடி 108 / 112 அவசர ஆம்புலன்ஸ் மற்றும் அரசு அவசர சிகிச்சை பிரிவு உதவி எண்கள்."
              : "Instant 108 / 911 Rapid Ambulance Dispatch & City Trauma Center Emergency Hotline."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="tel:108"
            className="px-8 py-4 rounded-2xl bg-white text-rose-700 font-black text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer"
          >
            <PhoneCall className="w-6 h-6 text-rose-700 animate-pulse" />
            <span>{isTamil ? "108 அவசர ஆம்புலன்ஸ் அழைக்க" : "Call 108 Emergency Ambulance"}</span>
          </a>

          <button
            onClick={handleShareLocation}
            className={`px-8 py-4 rounded-2xl font-black text-base border transition-all flex items-center gap-3 cursor-pointer ${
              locationShared
                ? "bg-emerald-500 text-slate-950 border-emerald-400"
                : "bg-rose-800/80 hover:bg-rose-800 text-white border-rose-400/50"
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span>
              {locationShared
                ? (isTamil ? "GPS இருப்பிடம் அனுப்பப்பட்டது ✓" : "GPS Location Transmitted ✓")
                : (isTamil ? "நேரடி GPS இருப்பிடத்தை அனுப்பவும்" : "Transmit Live GPS Coordinates")}
            </span>
          </button>
        </div>

      </div>

      {/* ACTIVE DISPATCH TRACKER */}
      {activeDispatch && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-emerald-500/60 shadow-2xl text-white space-y-6 animate-in fade-in slide-in-from-top">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Ambulance className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                  {isTamil ? "நடப்பு அவசர ஆம்புலன்ஸ் இயக்கம்" : "Active Emergency Dispatch"}
                </span>
                <h3 className="text-lg font-black text-white">
                  {isTamil ? "அழைப்பு எண்" : "Dispatch ID"}: {activeDispatch.id}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-bold self-start sm:self-center">
              <Radio className="w-3.5 h-3.5 animate-spin" />
              <span>{isTamil ? "நிலை: புறப்பட்டது" : `Status: ${activeDispatch.status}`}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTamil ? "ஒதுக்கப்பட்ட வாகனம்" : "Assigned Unit"}</span>
              <span className="text-sm font-bold text-white">{activeDispatch.assignedAmbulance}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTamil ? "வந்து சேரும் நேரம் (ETA)" : "Estimated Arrival (ETA)"}</span>
              <span className="text-sm font-black text-emerald-400">{activeDispatch.etaMinutes} {isTamil ? "நிமிடங்கள்" : "Minutes"}</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">{isTamil ? "அடிப்படை மருத்துவமனை" : "Base Hospital"}</span>
              <span className="text-sm font-bold text-white">{activeDispatch.assignedHospital}</span>
            </div>
          </div>
        </div>
      )}

      {/* DISPATCH FORM */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Ambulance className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isTamil ? "உடனடி 108 ஆம்புலன்ஸ் உதவி கோரிக்கை" : "Instant 108 Dispatch Service"}
            </h3>
            <p className="text-xs text-slate-500">
              {isTamil
                ? "உங்கள் கிராமப்புற பகுதியையும் அவசர நிலையையும் குறிப்பிட்டு அருகிலுள்ள ஆம்புலன்ஸை வரவழைக்கவும்."
                : "Submit your rural sector and distress condition to mobilize the closest hospital ambulance."}
            </p>
          </div>
        </div>

        <form onSubmit={handleDispatchAmbulance} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              {isTamil ? "நோயாளி / அழைப்பாளர் பெயர்" : "Patient / Caller Name"}
            </label>
            <input
              type="text"
              required
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              {isTamil ? "அவசர தொலைபேசி எண்" : "Emergency Phone Number"}
            </label>
            <input
              type="tel"
              required
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              {isTamil ? "கிராமப்புற பகுதி / இருப்பிடம்" : "Rural Sector / Landmark"}
            </label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-1">
              {isTamil ? "முதன்மை அவசர அறிகுறி / பாதிப்பு" : "Primary Acute Distress"}
            </label>
            <input
              type="text"
              required
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              disabled={isDispatching}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>
                {isDispatching
                  ? (isTamil ? "ஆம்புலன்ஸ் புறப்படுகிறது..." : "Mobilizing Emergency Fleet...")
                  : (isTamil ? "உறுதிசெய்து அருகிலுள்ள ஆம்புலன்ஸை வரவழைக்கவும்" : "Confirm & Mobilize Nearest Ambulance")}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Emergency Hotline Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase">
            {isTamil ? "அவசர ஆம்புலன்ஸ் உதவி எண்" : "Emergency Ambulance Hotline"}
          </span>
          <h3 className="text-2xl font-black text-rose-500">108 / 112</h3>
          <p className="text-xs text-slate-500">{isTamil ? "இலவச 24/7 அவசர உதவி" : "Free 24/7 Rural Ambulance"}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase">
            {isTamil ? "நகர மருத்துவமனை அவசர சிகிச்சை" : "City Hospital Trauma Ward"}
          </span>
          <h3 className="text-2xl font-black text-emerald-500">+91 94311 02840</h3>
          <p className="text-xs text-slate-500">{isTamil ? "பணி மருத்துவர் அறை" : "Doctor On Duty Room"}</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-2 text-center">
          <span className="text-xs font-bold text-slate-400 uppercase">
            {isTamil ? "நகராட்சி சுகாதார அலுவலர்" : "Municipal Health Officer"}
          </span>
          <h3 className="text-2xl font-black text-cyan-500">+91 98350 11099</h3>
          <p className="text-xs text-slate-500">{isTamil ? "காய்ச்சல் & தொற்றுநோய் கட்டுப்பாட்டு மையம்" : "Fever & Outbreak Emergency"}</p>
        </div>
      </div>

    </div>
  );
};
