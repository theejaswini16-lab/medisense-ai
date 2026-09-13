import React, { useState, useEffect } from "react";
import { MOCK_OUTBREAKS } from "../data/mockData";
import { OutbreakData } from "../types";
import {
  ShieldAlert,
  MapPin,
  Users,
  Activity,
  Droplets,
  AlertTriangle,
  Building,
  CheckCircle2,
  Calendar,
  RefreshCw
} from "lucide-react";

export const DiseaseSpreadMap: React.FC = () => {
  const [outbreaks, setOutbreaks] = useState<OutbreakData[]>(MOCK_OUTBREAKS);
  const [loading, setLoading] = useState(false);

  const fetchOutbreaks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/outbreaks");
      if (res.ok) {
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setOutbreaks(json.data);
          return;
        }
      }
    } catch (err) {
      console.warn("Using local outbreak fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutbreaks();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-4 h-4" /> District Surveillance Radar
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Rural Disease Outbreak Radar & Vector Maps
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time fever spike monitoring, water quality alerts, and municipal health responses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-2xl border border-slate-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            <span>{outbreaks.length} Active Rural Outbreak Spikes Detected</span>
          </div>
          <button
            onClick={fetchOutbreaks}
            disabled={loading}
            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all"
            title="Refresh radar"
          >
            <RefreshCw className={`w-4 h-4 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Interactive Outbreak Heatmap Screen Canvas */}
      <div className="h-80 rounded-3xl bg-slate-950 border border-cyan-500/30 relative overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#EF4444_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>

        {/* Floating Pulsing Outbreak Pins */}
        <div className="relative z-10 flex flex-wrap gap-4 items-center justify-around h-full">
          
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/60 text-white shadow-2xl space-y-1 animate-pulse">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span className="font-black text-xs">Central Metro Sector 4</span>
            </div>
            <p className="text-[11px] text-rose-400 font-bold">Malaria Vector Spike • 42 Cases</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/60 text-white shadow-2xl space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span className="font-black text-xs">Downtown Ward 2</span>
            </div>
            <p className="text-[11px] text-amber-400 font-bold">Dengue Mosquito Alert • 28 Cases</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/60 text-white shadow-2xl space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="font-black text-xs">East Industrial Borough</span>
            </div>
            <p className="text-[11px] text-cyan-300 font-bold">Gastroenteritis Risk</p>
          </div>

        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800 pt-3">
          <span>GPS Sensor Grid Active</span>
          <span>Last District Outbreak Sync: 10 mins ago</span>
        </div>
      </div>

      {/* Outbreak Details Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Active Sector Outbreaks & Interventions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outbreaks.map((outbreak) => (
            <div
              key={outbreak.id}
              className="p-6 rounded-[32px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-400 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> {outbreak.primaryDisease}
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                  {outbreak.riskLevel} Risk
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{outbreak.villageName}</h4>
                <p className="text-xs text-slate-400">{outbreak.activeCases} active cases reported by municipal health team</p>
              </div>

              <div className="space-y-1 pt-2 border-t border-white/10">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Water Quality Index & Vaccination</span>
                <p className="text-xs font-bold text-[#00C853]">WQI: {outbreak.waterQualityIndex} | Vax Rate: {outbreak.vaccinationRatePercent}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
