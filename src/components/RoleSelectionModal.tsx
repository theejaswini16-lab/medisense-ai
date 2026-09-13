import React from "react";
import { UserRole } from "../types";
import { User, Stethoscope, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface RoleSelectionModalProps {
  onSelectRole: (role: UserRole) => void;
}

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ onSelectRole }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 animate-pulse" /> Role Portal Selection
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Choose Your Workspace Experience
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Select your operational persona to enter tailored dashboards and clinical interfaces.
        </p>
      </div>

      {/* 3 Animated Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        
        {/* Patient Card */}
        <div
          onClick={() => onSelectRole("patient")}
          className="group cursor-pointer p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00C853] to-[#00BCD4] p-[2px] mb-6 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                <User className="w-8 h-8 text-[#00C853] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Portal 01</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">👤 Patient</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Check symptoms on interactive body model, receive instant AI reports, locate nearby hospitals & UHCs, and access health tips.
              </p>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-xs font-bold text-emerald-500 group-hover:text-emerald-400">
            <span>Enter Patient Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>

        {/* Doctor Card */}
        <div
          onClick={() => onSelectRole("doctor")}
          className="group cursor-pointer p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00BCD4] to-[#1E3A8A] p-[2px] mb-6 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                <Stethoscope className="w-8 h-8 text-[#00BCD4] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Portal 02</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">👨‍⚕️ Doctor / Specialist</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Review prioritized patient queue, verify AI predictions, issue digital prescriptions, launch video consults, and manage clinical cases.
              </p>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-xs font-bold text-cyan-500 group-hover:text-cyan-400">
            <span>Enter Clinical Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>

        {/* Admin Card */}
        <div
          onClick={() => onSelectRole("admin")}
          className="group cursor-pointer p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

          <div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#1E3A8A] to-emerald-500 p-[2px] mb-6 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                <ShieldCheck className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-blue-500 uppercase tracking-widest">Portal 03</span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">🛠 Admin & Outbreak Officer</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Monitor urban disease outbreaks, view ward statistics, manage hospital & doctor databases, and analyze system health metrics.
              </p>
            </div>
          </div>

          <div className="pt-8 flex items-center justify-between text-xs font-bold text-blue-500 group-hover:text-blue-400">
            <span>Enter Admin Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </div>
        </div>

      </div>

    </div>
  );
};
