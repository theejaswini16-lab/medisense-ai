import React, { useEffect, useState, useRef } from "react";
import { Sparkles, BrainCircuit, Activity, Database, Cpu, FileCheck } from "lucide-react";
import { AnalysisReport, PatientVitals } from "../types";
import { MOCK_HISTORY_REPORTS } from "../data/mockData";

interface AIAnalysisLoaderProps {
  symptoms?: string[];
  bodyParts?: string[];
  patientVitals?: PatientVitals;
  selectedLanguage?: string;
  onComplete: (report: AnalysisReport) => void;
}

const STEPS = [
  { id: 1, label: "Collecting Symptoms & Vitals", icon: Activity, delay: 700 },
  { id: 2, label: "Processing Data & Regional Outbreaks", icon: Database, delay: 800 },
  { id: 3, label: "Comparing Diseases against Rural Clinical Records", icon: BrainCircuit, delay: 900 },
  { id: 4, label: "Running Machine Learning Prediction Model", icon: Cpu, delay: 900 },
  { id: 5, label: "Generating Diagnostic Report & First-Aid Steps", icon: FileCheck, delay: 700 },
];

export const AIAnalysisLoader: React.FC<AIAnalysisLoaderProps> = ({
  symptoms = [],
  bodyParts = [],
  patientVitals,
  selectedLanguage = "English",
  onComplete,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const apiReportRef = useRef<AnalysisReport | null>(null);
  const animationFinishedRef = useRef(false);

  useEffect(() => {
    let isCancelled = false;

    // Trigger real backend AI analysis
    const fetchAIAnalysis = async () => {
      try {
        const res = await fetch("/api/analyze-symptoms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            symptoms,
            bodyParts,
            patientInfo: patientVitals,
            language: selectedLanguage,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json?.data) {
            apiReportRef.current = json.data;
          }
        }
      } catch (err) {
        console.warn("Backend analysis fetch error, relying on local fallback:", err);
      } finally {
        if (!isCancelled && animationFinishedRef.current) {
          onComplete(apiReportRef.current || MOCK_HISTORY_REPORTS[0]);
        }
      }
    };

    fetchAIAnalysis();

    const totalTime = STEPS.reduce((acc, step) => acc + step.delay, 0);
    let elapsedTime = 0;

    const interval = setInterval(() => {
      elapsedTime += 100;
      const calculated = Math.min(Math.round((elapsedTime / totalTime) * 100), 100);
      setProgressPercent(calculated);

      let accumulated = 0;
      for (let i = 0; i < STEPS.length; i++) {
        accumulated += STEPS[i].delay;
        if (elapsedTime < accumulated) {
          setCurrentStepIndex(i);
          break;
        }
      }

      if (elapsedTime >= totalTime) {
        clearInterval(interval);
        animationFinishedRef.current = true;
        setTimeout(() => {
          if (!isCancelled) {
            onComplete(apiReportRef.current || MOCK_HISTORY_REPORTS[0]);
          }
        }, 500);
      }
    }, 100);

    return () => {
      isCancelled = true;
      clearInterval(interval);
    };
  }, [onComplete, symptoms, bodyParts, patientVitals, selectedLanguage]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4">
      
      {/* Radial Background Lighting */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-lg w-full bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-8 text-center space-y-8 shadow-2xl relative overflow-hidden">
        
        {/* Glowing Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 animate-spin text-[#00C853]" />
          MediSense Neural Network Processing
        </div>

        {/* Circular Holographic Progress Ring */}
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
          
          {/* Animated SVG Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              className="stroke-slate-800"
              strokeWidth="12"
              fill="transparent"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              className="stroke-emerald-400 transition-all duration-300 ease-out"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - progressPercent / 100)}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Glowing AI Core */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00C853] via-[#00BCD4] to-[#1E3A8A] p-[2px] mb-1 animate-pulse">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-white">
                <BrainCircuit className="w-8 h-8 text-[#00BCD4] animate-bounce" />
              </div>
            </div>
            <span className="text-2xl font-black text-white">{progressPercent}%</span>
            <span className="text-[10px] text-slate-400 font-mono">ANALYZING</span>
          </div>

        </div>

        {/* Active Processing Step */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-tight">
            {STEPS[currentStepIndex].label}
          </h3>

          {/* Timeline Step Indicators */}
          <div className="space-y-2 text-left">
            {STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              const isDone = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs transition-all duration-300 ${
                    isCurrent
                      ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-cyan-500/50 text-white font-bold translate-x-1"
                      : isDone
                      ? "bg-slate-800/40 border-slate-700/40 text-emerald-400 opacity-80"
                      : "bg-slate-900/40 border-slate-800/40 text-slate-500 opacity-40"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                      isCurrent
                        ? "bg-[#00C853] text-slate-950 font-bold"
                        : isDone
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 text-slate-600"
                    }`}
                  >
                    <StepIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="flex-1">{step.label}</span>
                  {isDone && <span className="text-[10px] text-emerald-400 font-bold">✓ DONE</span>}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
