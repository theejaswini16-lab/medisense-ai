import React, { useState, useEffect } from "react";
import {
  Users,
  Stethoscope,
  Activity,
  Hospital,
  FileText,
  BarChart3,
  Database,
  Settings as SettingsIcon,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Building,
  RefreshCw,
  Server
} from "lucide-react";
import { MOCK_OUTBREAKS, MOCK_HOSPITALS, MOCK_HISTORY_REPORTS } from "../data/mockData";

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"analytics" | "database" | "settings">("analytics");
  const [loading, setLoading] = useState(false);
  const [dbTable, setDbTable] = useState<"reports" | "hospitals" | "outbreaks">("reports");
  const [reportsData, setReportsData] = useState<any[]>(MOCK_HISTORY_REPORTS);
  const [hospitalsData, setHospitalsData] = useState<any[]>(MOCK_HOSPITALS);
  const [outbreaksData, setOutbreaksData] = useState<any[]>(MOCK_OUTBREAKS);

  const [stats, setStats] = useState({
    screeningsCount: 54200,
    activeOutbreaks: 3,
    totalBedsAvailable: 864,
    doctorsOnDuty: 148,
    pendingTriageReviews: 2,
    topDiseases: [
      { name: "Malaria", count: 420 },
      { name: "Dengue Fever", count: 310 },
      { name: "Bronchitis", count: 240 },
      { name: "Typhoid", count: 180 },
      { name: "Anemia", count: 150 },
    ]
  });

  const fetchStatsAndData = async () => {
    setLoading(true);
    try {
      const [statsRes, repRes, hospRes, outRes] = await Promise.all([
        fetch("/api/stats").catch(() => null),
        fetch("/api/reports").catch(() => null),
        fetch("/api/hospitals").catch(() => null),
        fetch("/api/outbreaks").catch(() => null)
      ]);

      if (statsRes && statsRes.ok) {
        const json = await statsRes.json();
        if (json?.data) setStats((prev) => ({ ...prev, ...json.data }));
      }
      if (repRes && repRes.ok) {
        const json = await repRes.json();
        if (json?.data) setReportsData(json.data);
      }
      if (hospRes && hospRes.ok) {
        const json = await hospRes.json();
        if (json?.data) setHospitalsData(json.data);
      }
      if (outRes && outRes.ok) {
        const json = await outRes.json();
        if (json?.data) setOutbreaksData(json.data);
      }
    } catch (err) {
      console.warn("Using local stats fallback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsAndData();
  }, []);

  const topDiseasesData = stats.topDiseases.map((d) => ({
    ...d,
    percent: Math.min(Math.round((d.count / (stats.topDiseases[0]?.count || 500)) * 100), 100)
  }));

  const symptomCheckTrend = [120, 150, 180, 240, 310, 290, 380, 450, 520, 610, 580, 720];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Admin Header */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4" /> District Health Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            District Medical Command Center
          </h1>
          <p className="text-xs text-slate-300">
            Real-time disease outbreak monitoring, hospital bed allocation, and AI model performance analytics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-2xl border border-slate-700">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "analytics"
                  ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Analytics & Outbreaks
            </button>
            <button
              onClick={() => setActiveTab("database")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === "database"
                  ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Manage Database
            </button>
          </div>

          <button
            onClick={fetchStatsAndData}
            disabled={loading}
            className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all"
            title="Refresh Server Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          </button>
        </div>
      </div>

      {/* 8 Metric Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { label: "Users", val: "12,450", icon: Users, color: "text-emerald-500" },
          { label: "Doctors", val: String(stats.doctorsOnDuty), icon: Stethoscope, color: "text-cyan-500" },
          { label: "Screenings", val: stats.screeningsCount.toLocaleString(), icon: Activity, color: "text-blue-500" },
          { label: "Total Beds", val: String(stats.totalBedsAvailable), icon: Hospital, color: "text-purple-500" },
          { label: "Reports", val: String(reportsData.length), icon: FileText, color: "text-amber-500" },
          { label: "Outbreaks", val: `${stats.activeOutbreaks} Active`, icon: BarChart3, color: "text-rose-500" },
          { label: "Database", val: "REST Synced", icon: Database, color: "text-emerald-400" },
          { label: "System", val: "Online 99.9%", icon: Server, color: "text-teal-400" },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="text-base font-black text-slate-900 dark:text-white">{item.val}</span>
            </div>
          );
        })}
      </div>

      {activeTab === "database" ? (
        /* LIVE DATABASE VIEWER */
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-500" /> MediSense In-Memory REST Data Store
              </h3>
              <p className="text-xs text-slate-500">Live inspection of synchronized backend API tables.</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setDbTable("reports")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  dbTable === "reports" ? "bg-cyan-500 text-slate-950" : "text-slate-400"
                }`}
              >
                Reports ({reportsData.length})
              </button>
              <button
                onClick={() => setDbTable("hospitals")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  dbTable === "hospitals" ? "bg-cyan-500 text-slate-950" : "text-slate-400"
                }`}
              >
                Hospitals ({hospitalsData.length})
              </button>
              <button
                onClick={() => setDbTable("outbreaks")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                  dbTable === "outbreaks" ? "bg-cyan-500 text-slate-950" : "text-slate-400"
                }`}
              >
                Outbreaks ({outbreaksData.length})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {dbTable === "reports" && (
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">ID</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Primary Diagnosis</th>
                    <th className="p-3">Risk</th>
                    <th className="p-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  {reportsData.map((r) => (
                    <tr key={r.id} className="hover:bg-white/5">
                      <td className="p-3 text-cyan-400 font-bold">{r.id}</td>
                      <td className="p-3 font-sans font-medium">{r.patientInfo?.name} ({r.patientInfo?.age}y)</td>
                      <td className="p-3 font-sans font-bold text-white">{r.possibleDiseases[0]?.name}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-bold ${
                          r.overallRiskLevel === "Red" ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
                        }`}>{r.overallRiskLevel}</span>
                      </td>
                      <td className="p-3 text-slate-400 text-[10px]">{r.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {dbTable === "hospitals" && (
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Hospital Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Available Beds</th>
                    <th className="p-3">Doctors On Duty</th>
                    <th className="p-3">Emergency Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  {hospitalsData.map((h) => (
                    <tr key={h.id} className="hover:bg-white/5">
                      <td className="p-3 font-sans font-bold text-white">{h.name}</td>
                      <td className="p-3 font-sans text-slate-400">{h.type}</td>
                      <td className="p-3 font-bold text-emerald-400">{h.availableBeds}</td>
                      <td className="p-3">{h.doctorsOnDuty}</td>
                      <td className="p-3 text-cyan-400">{h.contactPhone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {dbTable === "outbreaks" && (
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Sector / Zone</th>
                    <th className="p-3">Disease Vector</th>
                    <th className="p-3">Active Cases</th>
                    <th className="p-3">Water Quality Index</th>
                    <th className="p-3">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
                  {outbreaksData.map((o) => (
                    <tr key={o.id} className="hover:bg-white/5">
                      <td className="p-3 font-sans font-bold text-white">{o.villageName}</td>
                      <td className="p-3 font-sans text-rose-400 font-bold">{o.primaryDisease}</td>
                      <td className="p-3 font-bold text-amber-400">{o.activeCases}</td>
                      <td className="p-3 text-emerald-400 font-bold">{o.waterQualityIndex}</td>
                      <td className="p-3"><span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 font-sans font-bold">{o.riskLevel}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Bar Chart: Top Diseases in Rural Sectors */}
        <div className="lg:col-span-7 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-500" /> Bar Chart: Top Diseases Screened
              </h3>
              <p className="text-xs text-slate-500">Most frequent clinical predictions across rural sectors.</p>
            </div>
            <span className="text-xs font-bold text-emerald-500">2026 Outbreak Data</span>
          </div>

          <div className="space-y-4">
            {topDiseasesData.map((disease) => (
              <div key={disease.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{disease.name}</span>
                  <span className="text-slate-500 font-bold">{disease.count} Cases</span>
                </div>
                <div className="w-full h-3.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00C853] to-[#00BCD4] rounded-full transition-all duration-1000"
                    style={{ width: `${disease.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pie Chart & Risk Severity Breakdown */}
        <div className="lg:col-span-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Pie Chart: Risk Severity Breakdown
            </h3>
            <span className="text-xs font-bold text-cyan-500">Live Triage Ratio</span>
          </div>

          {/* SVG Pie Chart */}
          <div className="flex items-center justify-center relative py-4">
            <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
              {/* Green Segment (60%) */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#00C853"
                strokeWidth="16"
                strokeDasharray="131 220"
                strokeDashoffset="0"
                fill="none"
              />
              {/* Yellow Segment (25%) */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#F59E0B"
                strokeWidth="16"
                strokeDasharray="55 220"
                strokeDashoffset="-131"
                fill="none"
              />
              {/* Red Segment (15%) */}
              <circle
                cx="50"
                cy="50"
                r="35"
                stroke="#EF4444"
                strokeWidth="16"
                strokeDasharray="33 220"
                strokeDashoffset="-186"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black text-slate-900 dark:text-white">54.2K</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Screenings</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <span className="font-bold text-emerald-500 block">60% Low</span>
              <span className="text-[10px] text-slate-400">32,500</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="font-bold text-amber-500 block">25% Medium</span>
              <span className="text-[10px] text-slate-400">13,550</span>
            </div>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
              <span className="font-bold text-rose-500 block">15% High</span>
              <span className="text-[10px] text-slate-400">8,150</span>
            </div>
          </div>
        </div>

      </div>

      {/* Line Graph: Monthly Symptom Screenings Trend */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-500" /> Line Graph: Monthly Symptom Checks Growth
            </h3>
            <p className="text-xs text-slate-500">Increasing adoption across 120+ rural health centers.</p>
          </div>
          <span className="text-xs font-bold text-cyan-400">+340% YoY</span>
        </div>

        {/* SVG Line Graph */}
        <div className="w-full h-48 flex items-end justify-between gap-2 pt-6">
          {symptomCheckTrend.map((val, i) => {
            const heightPercent = Math.round((val / 720) * 100);
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[9px] font-bold text-slate-400">{val}</span>
                <div
                  className="w-full bg-gradient-to-t from-[#1E3A8A] via-[#00BCD4] to-[#00C853] rounded-t-lg transition-all duration-500"
                  style={{ height: `${heightPercent}%` }}
                ></div>
                <span className="text-[9px] text-slate-500 font-bold">M{i + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
      </>
      )}

    </div>
  );
};
