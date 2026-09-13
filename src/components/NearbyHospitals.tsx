import React, { useState, useEffect } from "react";
import { Hospital as HospitalType } from "../types";
import { MOCK_HOSPITALS } from "../data/mockData";
import { useLanguage } from "../context/LanguageContext";
import {
  Hospital as HospitalIcon,
  MapPin,
  PhoneCall,
  Navigation,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  Search,
  Bed,
  UserCheck,
  RefreshCw
} from "lucide-react";

export const NearbyHospitals: React.FC = () => {
  const { isTamil } = useLanguage();
  const [hospitals, setHospitals] = useState<HospitalType[]>(MOCK_HOSPITALS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [loading, setLoading] = useState(false);

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append("search", searchQuery.trim());
      if (selectedType !== "All") params.append("type", selectedType);

      const res = await fetch(`/api/hospitals?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setHospitals(json.data);
          return;
        }
      }
    } catch (err) {
      console.warn("Using local hospital fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHospitals();
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedType]);

  const filteredHospitals = hospitals.filter((h) => {
    const query = (searchQuery || "").toLowerCase();
    const matchesSearch =
      (h.name || "").toLowerCase().includes(query) ||
      (h.address || "").toLowerCase().includes(query);
    const matchesType = selectedType === "All" || h.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-2">
            <HospitalIcon className="w-4 h-4" /> {isTamil ? "GPS மருத்துவமனை கண்டறிதல்" : "GPS Hospital Locator"}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {isTamil ? "அருகிலுள்ள நகர்ப்புற மருத்துவமனைகள் & சிறப்பு மையங்கள்" : "Nearby Urban Hospitals & Multi-Specialty Centers"}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isTamil ? "நேரடி படுக்கை இருப்பு, அவசர உதவி எண்கள் மற்றும் GPS வழிகாட்டி." : "Real-time bed availability, emergency contacts, and GPS directions for urban medical facilities."}
          </p>
        </div>

        {/* SOS Button */}
        <a
          href="tel:108"
          className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/30 animate-pulse cursor-pointer shrink-0"
        >
          <PhoneCall className="w-4 h-4" /> {isTamil ? "108 அவசர ஆம்புலன்ஸ் அழைப்பு" : "Call 108 Emergency Ambulance"}
        </a>
      </div>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="md:col-span-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isTamil ? "மண்டலம், வார்டு அல்லது மருத்துவமனை பெயர் தேடவும்..." : "Search hospitals by sector, zone, or medical center name..."}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="md:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">{isTamil ? "அனைத்து மருத்துவ வசதிகள்" : "All Facility Types"}</option>
            <option value="Urban Health Center">{isTamil ? "நகர்ப்புற சுகாதார மையம் (UHC)" : "Urban Health Center (UHC)"}</option>
            <option value="City General Hospital">{isTamil ? "நகர பொது மருத்துவமனை" : "City General Hospital"}</option>
            <option value="District Hospital">{isTamil ? "மாவட்ட மருத்துவமனை" : "District Hospital"}</option>
            <option value="Mobile Medical Unit">{isTamil ? "நடமாடும் மருத்துவ ஊர்தி" : "Mobile Medical Unit"}</option>
          </select>
        </div>
      </div>

      {/* Interactive Map Visualizer Canvas */}
      <div className="h-64 rounded-3xl bg-slate-950 border border-cyan-500/30 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:24px_24px] opacity-20"></div>
        <div className="relative z-10 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
            <MapPin className="w-6 h-6 text-[#00C853]" />
          </div>
          <h3 className="text-lg font-black text-white">
            {isTamil ? "நேரடி நகர்ப்புற மருத்துவமனை GPS வரைபடம்" : "Interactive Urban Health GPS Map"}
          </h3>
          <p className="text-xs text-slate-300 max-w-md">
            {isTamil
              ? "நகர வட்டாரத்திற்குள் உள்ள சான்றளிக்கப்பட்ட பன்னோக்கு மருத்துவமனைகள் மற்றும் சுகாதார மையங்கள்."
              : "Showing nearby verified Multi-Specialty Hospitals and Urban Health Centers within metro radius."}
          </p>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHospitals.map((hospital) => (
          <div
            key={hospital.id}
            className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-xl space-y-4 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-500 font-bold uppercase tracking-wider block mb-1">
                  {hospital.type}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {hospital.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {hospital.address}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-lg font-black text-emerald-500">{hospital.distanceKm} km</span>
                <span className="text-[10px] text-slate-400 block">{isTamil ? "தற்போதைய இடத்திலிருந்து" : "From Current Location"}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "காலி படுக்கைகள்" : "Available Beds"}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                  <Bed className="w-3.5 h-3.5 text-cyan-500" /> {hospital.availableBeds}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "மருத்துவர்கள் பணி" : "Doctors Duty"}</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-500" /> {hospital.doctorsOnDuty}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "தீவிர சிகிச்சை (ICU)" : "ICU Ward"}</span>
                <span className={`text-xs font-bold ${hospital.hasICU ? "text-emerald-500" : "text-slate-400"}`}>
                  {isTamil ? (hospital.hasICU ? "உள்ளது" : "இல்லை") : (hospital.hasICU ? "Available" : "No ICU")}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`tel:${hospital.emergencyPhone}`}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-2"
              >
                <PhoneCall className="w-3.5 h-3.5 text-rose-500" /> {hospital.phone}
              </a>

              <a
                href={`https://maps.google.com/?q=${hospital.coordinates.lat},${hospital.coordinates.lng}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20 hover:scale-105 transition-all"
              >
                <Navigation className="w-3.5 h-3.5" /> {isTamil ? "GPS வழிசெலுத்தல்" : "Get GPS Route"}
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
