import React, { useState } from "react";
import { ViewTab, AnalysisReport } from "../types";
import {
  LayoutDashboard,
  Activity,
  FileText,
  Hospital,
  Globe,
  Settings as SettingsIcon,
  Bell,
  Heart,
  Calendar,
  Sparkles,
  Pill,
  Sun,
  Shield,
  Clock,
  CheckCircle2,
  PhoneCall,
  MapPin,
  TrendingUp,
  Droplets
} from "lucide-react";
import { MOCK_HISTORY_REPORTS } from "../data/mockData";

interface PatientDashboardProps {
  onNavigateTab: (tab: ViewTab) => void;
  recentReport?: AnalysisReport | null;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onNavigateTab,
  recentReport
}) => {
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>("dashboard");
  const [medicineTaken, setMedicineTaken] = useState(false);

  const displayReport = recentReport || MOCK_HISTORY_REPORTS[0];

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, tab: "dashboard" as ViewTab },
    { id: "checker", label: "Symptom Checker", icon: Activity, tab: "symptom_checker" as ViewTab },
    { id: "history", label: "Medical History", icon: Clock, tab: "medical_history" as ViewTab },
    { id: "reports", label: "Reports", icon: FileText, tab: "result_report" as ViewTab },
    { id: "hospitals", label: "Nearby Hospitals", icon: Hospital, tab: "nearby_hospitals" as ViewTab },
    { id: "tips", label: "Health Tips", icon: Globe, tab: "health_tips" as ViewTab },
    { id: "outbreak", label: "Disease Map", icon: Shield, tab: "disease_map" as ViewTab },
    { id: "settings", label: "Settings", icon: SettingsIcon, tab: "settings" as ViewTab },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Dashboard Sidebar */}
        <div className="lg:col-span-3 space-y-3">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Patient Navigation
            </div>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSidebarTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarTab(item.id);
                    onNavigateTab(item.tab);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 shadow-md shadow-emerald-500/20"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Emergency Quick Action Card in Sidebar */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider">Emergency SOS</span>
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <p className="text-xs text-rose-100">
              Instant 108 ambulance dispatch and urban emergency health contacts.
            </p>
            <button
              onClick={() => onNavigateTab("emergency")}
              className="w-full py-2.5 px-3 rounded-xl bg-white text-rose-700 font-black text-xs flex items-center justify-center gap-2 shadow-md hover:bg-rose-50 transition-all"
            >
              <PhoneCall className="w-4 h-4" /> Trigger Ambulance Call
            </button>
          </div>
        </div>

        {/* Right Main Dashboard Panel */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Welcome Banner */}
          <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white border border-cyan-500/30 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Patient Health Portal Active
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Welcome, Ramesh Sharma 👋
              </h2>
              <p className="text-xs text-slate-300 max-w-lg">
                Central Metro District, Sector 4 • Last AI Health Check: <strong>3 days ago</strong>
              </p>
            </div>

            <button
              onClick={() => onNavigateTab("symptom_checker")}
              className="relative z-10 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all shrink-0"
            >
              Start New Symptom Check
            </button>
          </div>

          {/* 4 Primary Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Health Score */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Health Score</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <Heart className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">88</span>
                <span className="text-xs font-bold text-emerald-500 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5" /> +4%
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Good immunity & normal vitals status.</p>
            </div>

            {/* Card 2: Recent Prediction */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Recent AI Prediction</span>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500">
                  <Activity className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  {(displayReport?.possibleDiseases || [])[0]?.name || "Malaria Risk"}
                </h4>
                <span className="text-xs font-bold text-rose-500">High Risk • 89% Match</span>
              </div>
              <p className="text-[11px] text-slate-500">Report ID: {displayReport?.id || "N/A"}</p>
            </div>

            {/* Card 3: Upcoming Appointment */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Upcoming Appointment</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Tomorrow, 10:30 AM</h4>
                <p className="text-xs text-slate-500">Urban Health Center (UHC Sector 4)</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 font-bold">Confirmed</span>
            </div>

            {/* Card 4: Today's Health Tip */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase">Today's Health Tip</span>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Sun className="w-5 h-5" />
                </div>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                Empty stagnant water from AC trays and pots to prevent urban dengue breeding.
              </h4>
              <button
                onClick={() => onNavigateTab("health_tips")}
                className="text-[11px] font-bold text-cyan-500 hover:underline"
              >
                Read 8 More Tips →
              </button>
            </div>

          </div>

          {/* Interactive Widgets Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Medicine Reminder Widget */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
                  <Pill className="w-4 h-4 text-cyan-500" /> Daily Medicine Reminder
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 font-bold">Next: 2:00 PM</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Paracetamol 650mg</h5>
                  <p className="text-[11px] text-slate-500">1 Tablet after lunch for fever control</p>
                </div>
                <button
                  onClick={() => setMedicineTaken((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                    medicineTaken
                      ? "bg-emerald-500 text-slate-950"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {medicineTaken ? "Taken ✓" : "Mark Taken"}
                </button>
              </div>
            </div>

            {/* Urban Environmental Air & Mosquito Risk Widget */}
            <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-emerald-500" /> Urban Air Quality & Mosquito Alert
                </span>
                <span className="text-[10px] text-emerald-500 font-bold">Live Sensor Feed</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Humidity Level</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">84% High</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Mosquito Risk Index</span>
                  <span className="text-base font-black text-rose-500">High Alert</span>
                </div>
              </div>
            </div>

          </div>

          {/* Recent Report Summary Preview */}
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Latest AI Diagnostic Report Summary
              </h3>
              <button
                onClick={() => onNavigateTab("result_report")}
                className="text-xs font-bold text-emerald-500 hover:underline"
              >
                View Full Diagnostic PDF →
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Primary Diagnosis:</span>
                <span className="font-bold text-slate-900 dark:text-white">{(displayReport?.possibleDiseases || [])[0]?.name || "General Health Assessment"}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Urgency Message:</span>
                <span className="font-bold text-emerald-500">{displayReport?.ruralUrgencyMessage || "No immediate critical alert."}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
