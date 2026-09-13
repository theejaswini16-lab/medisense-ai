import React, { useState, useEffect } from "react";
import { MOCK_HISTORY_REPORTS } from "../data/mockData";
import { AnalysisReport, ViewTab } from "../types";
import {
  User,
  Clock,
  FileText,
  Download,
  Activity,
  Heart,
  Droplets,
  Thermometer,
  Calendar,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

interface ProfileHistoryProps {
  onSelectReport: (report: AnalysisReport) => void;
  onStartNewCheck: () => void;
}

export const ProfileHistory: React.FC<ProfileHistoryProps> = ({
  onSelectReport,
  onStartNewCheck,
}) => {
  const [reports, setReports] = useState<AnalysisReport[]>(MOCK_HISTORY_REPORTS);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reports");
      if (res.ok) {
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setReports(json.data);
        }
      }
    } catch (err) {
      console.warn("Could not fetch reports from server, using local fallback", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      
      {/* Patient Profile Card */}
      <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00C853] via-[#00BCD4] to-[#1E3A8A] p-[2px] shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                <User className="w-8 h-8 text-[#00C853]" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Ramesh Sharma</h2>
              <p className="text-xs text-slate-500">
                Patient ID: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">P-2026-9041</span> • Metro Sector 4
              </p>
            </div>
          </div>

          <button
            onClick={onStartNewCheck}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            Start New Symptom Analysis
          </button>
        </div>

        {/* Vitals Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Age / Gender</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">42 Yrs • Male</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Blood Group</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">O+ Positive</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Temperature</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">102.1°F</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Blood Pressure</span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">128/84 mmHg</span>
          </div>
        </div>
      </div>

      {/* Historical Prediction Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-500" /> Historical Diagnostic Predictions ({reports.length})
          </h3>
          <button
            onClick={fetchReports}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 text-slate-300 hover:text-white transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Reports</span>
          </button>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-lg space-y-4 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                      {report.possibleDiseases[0]?.name}
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        report.overallRiskLevel === "Red"
                          ? "bg-rose-500/20 text-rose-500"
                          : report.overallRiskLevel === "Yellow"
                          ? "bg-amber-500/20 text-amber-500"
                          : "bg-emerald-500/20 text-emerald-500"
                      }`}
                    >
                      {report.overallRiskLevel} Risk
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Report ID: <span className="font-mono font-bold">{report.id}</span> • Date: {report.timestamp}
                  </p>
                </div>

                <button
                  onClick={() => onSelectReport(report)}
                  className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-2 transition-all self-start sm:self-center"
                >
                  <FileText className="w-4 h-4 text-cyan-500" /> View Full Diagnostic PDF
                </button>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {report.possibleDiseases[0]?.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
