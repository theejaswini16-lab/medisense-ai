import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Cpu,
  BrainCircuit,
  MapPin,
  Hospital,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Database
} from "lucide-react";

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchChecker: () => void;
  onExploreML?: () => void;
}

type DemoScenario = "vector_fever" | "dermatology_deeplearning" | "respiratory_cxr";

interface TourStage {
  id: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  narration: string;
}

const STAGES_EN: TourStage[] = [
  {
    id: 1,
    title: "1. Multi-Modal Anatomical Intake",
    subtitle: "Interactive 3D Body Symptom Mapping",
    durationSeconds: 7,
    narration:
      "Patient inputs symptoms using MediSense's anatomical body map. High-fever, chills, and skin manifestations are mapped to organ systems with real-time severity scoring."
  },
  {
    id: 2,
    title: "2. Deep Learning & ML Neural Inference",
    subtitle: "ResNet-50 CNN & XGBoost Decision Forest",
    durationSeconds: 8,
    narration:
      "Clinical inputs are evaluated simultaneously through gradient-boosted decision trees and deep convolutional neural networks. Saliency maps and SHAP feature importance calculate confidence scores."
  },
  {
    id: 3,
    title: "3. Clinical Triage & Differential Diagnosis",
    subtitle: "Stratified Risk Level & Immediate Protocols",
    durationSeconds: 7,
    narration:
      "The system generates a verified differential diagnosis with ICD-10 codings, recommended emergency first-aid protocols, and tailored medication advisories."
  },
  {
    id: 4,
    title: "4. Rural GIS Hospital Dispatch & Tele-Queue",
    subtitle: "Real-Time Bed Availability & Ambulance SOS",
    durationSeconds: 7,
    narration:
      "Patient is automatically routed to the nearest Rural Health Center with verified ICU beds, with immediate options for digital doctor consultation or 108 emergency ambulance dispatch."
  }
];

const STAGES_TA: TourStage[] = [
  {
    id: 1,
    title: "1. உடற்கூறியல் அறிகுறி பதிவு",
    subtitle: "முப்பரிமாண 3D உடல் வரைபடம் மூலம் உள்ளீடு",
    durationSeconds: 7,
    narration:
      "நோயாளி தனது அறிகுறிகளை மெடிசென்ஸ் ஊடாடும் உடல் வரைபடம் மூலம் பதிவு செய்கிறார். காய்ச்சல், குளிர், தோல் மாற்றங்கள் உறுப்புகளுடன் இணைக்கப்படுகின்றன."
  },
  {
    id: 2,
    title: "2. ஆழ்ந்த கற்றல் & ML நியூரல் பகுப்பாய்வு",
    subtitle: "ResNet-50 CNN & XGBoost முடிவு கட்டமைப்பு",
    durationSeconds: 8,
    narration:
      "மருத்துவத் தரவுகள் மெஷின் லேர்னிங் மற்றும் நியூரல் நெட்வொர்க் வழிமுறைகள் மூலம் ஒரே நேரத்தில் ஆராயப்பட்டு கணிப்புகள் வழங்கப்படுகின்றன."
  },
  {
    id: 3,
    title: "3. நோய் வகைப்படுத்தல் & அறிக்கை தயாரிப்பு",
    subtitle: "ஆபத்து நிலை & உடனடி முதலுதவி வழிகாட்டுதல்",
    durationSeconds: 7,
    narration:
      "ICD-10 குறியீடுகளுடன் துல்லியமான நோய் கணிப்பு அறிக்கை, உடனடி முதலுதவி மற்றும் மருந்து பரிந்துரைகள் உருவாக்கப்படுகின்றன."
  },
  {
    id: 4,
    title: "4. கிராமப்புற மருத்துவமனை வழிகாட்டல் & அவசர உதவி",
    subtitle: "படுக்கை இருப்பு & 108 ஆம்புலன்ஸ் சேவை",
    durationSeconds: 7,
    narration:
      "நோயாளி அருகிலுள்ள கிராமப்புற மருத்துவமனைக்கு வழிநடத்தப்படுகிறார். மருத்துவர் ஆலோசனை அல்லது 108 ஆம்புலன்ஸ் வசதி உடனடியாக கிடைக்கிறது."
  }
];

export const DemoTourModal: React.FC<DemoTourModalProps> = ({
  isOpen,
  onClose,
  onLaunchChecker,
  onExploreML
}) => {
  const { isTamil } = useLanguage();
  const STAGES = isTamil ? STAGES_TA : STAGES_EN;

  const [activeScenario, setActiveScenario] = useState<DemoScenario>("vector_fever");
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [audioNarrationEnabled, setAudioNarrationEnabled] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const safeStageIdx = Math.max(0, Math.min(currentStageIdx, STAGES.length - 1));
  const stage = STAGES[safeStageIdx] || STAGES[0];

  // Speech narration helper
  useEffect(() => {
    if (!isOpen) {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (audioNarrationEnabled && "speechSynthesis" in window && stage?.narration) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(stage.narration);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;
      if (isTamil) {
        utterance.lang = "ta-IN";
      }
      window.speechSynthesis.speak(utterance);
    }
  }, [safeStageIdx, audioNarrationEnabled, isOpen, playbackSpeed, stage, isTamil]);

  // Stage timer loop
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const duration = stage?.durationSeconds || 7;
    const intervalMs = 100;
    const totalMs = (duration * 1000) / (playbackSpeed || 1);
    const increment = (intervalMs / totalMs) * 100;

    timerRef.current = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          // Advance to next stage safely
          if (currentStageIdx < STAGES.length - 1) {
            setCurrentStageIdx((curr) => Math.min(curr + 1, STAGES.length - 1));
            return 0;
          } else {
            // Reached end of stages
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, isPlaying, currentStageIdx, playbackSpeed, stage?.durationSeconds]);

  if (!isOpen) return null;

  const handleStageSelect = (idx: number) => {
    const clamped = Math.max(0, Math.min(idx, STAGES.length - 1));
    setCurrentStageIdx(clamped);
    setProgressPercent(0);
  };

  const handleTogglePlay = () => {
    if (progressPercent >= 100 && currentStageIdx >= STAGES.length - 1) {
      setCurrentStageIdx(0);
      setProgressPercent(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevStage = () => {
    if (currentStageIdx > 0) {
      setCurrentStageIdx((curr) => Math.max(0, curr - 1));
      setProgressPercent(0);
    }
  };

  const handleNextStage = () => {
    if (currentStageIdx < STAGES.length - 1) {
      setCurrentStageIdx((curr) => Math.min(curr + 1, STAGES.length - 1));
      setProgressPercent(0);
    } else {
      setIsPlaying(false);
      setProgressPercent(100);
    }
  };

  const handleReset = () => {
    setCurrentStageIdx(0);
    setProgressPercent(0);
    setIsPlaying(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-4xl w-full bg-slate-900 border border-cyan-500/30 rounded-3xl p-5 sm:p-7 relative shadow-2xl space-y-5 text-white my-auto max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00C853] to-[#00BCD4] p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Play className="w-5 h-5 fill-cyan-400 text-cyan-400 translate-x-0.5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                  {isTamil ? "மெடிசென்ஸ் AI ஊடாடும் மாதிரி வழிகாட்டி" : "MediSense AI Interactive Demonstration"}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {isTamil ? "நேரடி மாதிரி" : "Live Guided Tour"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {isTamil
                  ? "அறிகுறி வரைபடம், ஆழ்ந்த கற்றல் AI பகுப்பாய்வு மற்றும் மருத்துவமனை வழிகாட்டுதலின் நேரடி மாதிரி."
                  : "End-to-end simulation of symptom mapping, deep learning neural inference, and hospital dispatch."}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              if ("speechSynthesis" in window) window.speechSynthesis.cancel();
              onClose();
            }}
            className="self-end sm:self-center p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 px-2">Select Scenario:</span>
          <button
            onClick={() => {
              setActiveScenario("vector_fever");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeScenario === "vector_fever"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Rural Dengue & Fever Outbreak
          </button>
          
          <button
            onClick={() => {
              setActiveScenario("dermatology_deeplearning");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeScenario === "dermatology_deeplearning"
                ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" /> Dermatology (Dermo) Skin Lesion CNN
          </button>

          <button
            onClick={() => {
              setActiveScenario("respiratory_cxr");
              handleReset();
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeScenario === "respiratory_cxr"
                ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-slate-950 shadow-md"
                : "text-slate-300 hover:text-white"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" /> Chest X-ray Pneumonia Vision
          </button>
        </div>

        {/* Main Simulation Screen */}
        <div className="relative aspect-video max-h-[380px] w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 sm:p-6 overflow-hidden flex flex-col justify-between shadow-inner">
          
          {/* Top Stage Bar Inside Player */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                {stage.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">
                Step {currentStageIdx + 1} of {STAGES.length}
              </span>
            </div>
          </div>

          {/* Interactive Visual Stage Content */}
          <div className="my-auto py-2 z-10">
            {/* STAGE 1: Intake & Body Mapping */}
            {currentStageIdx === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-5 flex items-center justify-center">
                  <div className="relative w-36 h-48 rounded-2xl bg-white/5 border border-cyan-500/30 p-2 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center mb-2">
                      <Stethoscope className="w-6 h-6 text-cyan-400 animate-pulse" />
                    </div>
                    {/* Pulsing body hotspots */}
                    <div className="w-28 h-28 relative flex items-center justify-center">
                      <div className="absolute top-2 w-3 h-3 rounded-full bg-rose-500 animate-ping"></div>
                      <div className="absolute top-8 left-6 w-3 h-3 rounded-full bg-amber-500 animate-ping"></div>
                      <div className="absolute bottom-6 right-7 w-3 h-3 rounded-full bg-emerald-500 animate-ping"></div>
                      <span className="text-[10px] text-slate-300 font-mono text-center">
                        {activeScenario === "dermatology_deeplearning"
                          ? "Dermatological Lesion Hotspot (Trunk/Back)"
                          : activeScenario === "respiratory_cxr"
                          ? "Thoracic Bilateral Field Scan"
                          : "3 Active Systemic Hotspots"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-2 text-left">
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" /> Patient Symptom Vector Captured
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeScenario === "dermatology_deeplearning" ? (
                      <>
                        <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                          Asymmetric Pigment Macule
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                          Diameter &gt;6mm
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold">
                          Irregular Border Color Variegation
                        </span>
                      </>
                    ) : activeScenario === "respiratory_cxr" ? (
                      <>
                        <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                          Productive Cough (&gt;7 days)
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                          Chest Tightness & Dyspnea
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold">
                          SpO2: 92% (Low Oxygen)
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="px-2 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
                          High Fever (103.2°F)
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                          Severe Retro-orbital Headache
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                          Extreme Arthralgia (Joint Pain)
                        </span>
                      </>
                    )}
                  </div>
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 text-xs text-slate-300">
                    <span className="text-cyan-400 font-bold">Demographics: </span> Ramesh S. (42y), Central Metro Sector 4.
                    <br />
                    <span className="text-emerald-400 font-bold">Vitals: </span> BP 118/78 mmHg | Heart Rate: 98 bpm | Alert Acuity Level 2.
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 2: Deep Learning & ML Neural Inference */}
            {currentStageIdx === 1 && (
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400 animate-spin" /> Neural Network Layer Activations
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">Inference: 18.4ms</span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-cyan-500/20">
                    <span className="text-[10px] text-slate-400 block">Feature Extraction</span>
                    <span className="font-bold text-cyan-300">132 Clinical Vectors</span>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-cyan-400 h-full w-[95%] animate-pulse"></div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-purple-500/20">
                    <span className="text-[10px] text-slate-400 block">
                      {activeScenario === "dermatology_deeplearning" ? "ResNet-50 CNN" : "XGBoost Ensemble"}
                    </span>
                    <span className="font-bold text-purple-300">
                      {activeScenario === "dermatology_deeplearning" ? "Grad-CAM Saliency" : "450 Decision Trees"}
                    </span>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-purple-400 h-full w-[98%] animate-pulse"></div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-emerald-500/20">
                    <span className="text-[10px] text-slate-400 block">Confidence Metric</span>
                    <span className="font-bold text-emerald-300">96.8% Certainty</span>
                    <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[96%] animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Saliency / SHAP preview */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">
                      {activeScenario === "dermatology_deeplearning"
                        ? "Top Visual Attention: Pigment Asymmetry + Border Notching"
                        : "SHAP Key Predictor: Platelet Count + High Grade Fever"}
                    </span>
                    <span className="text-emerald-400 font-bold">+0.42 SHAP Impact</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
                    <div className="bg-rose-500 h-full w-[45%]"></div>
                    <div className="bg-amber-500 h-full w-[35%]"></div>
                    <div className="bg-cyan-500 h-full w-[20%]"></div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 3: Clinical Triage & Differential Diagnosis */}
            {currentStageIdx === 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-left">
                <div className="sm:col-span-4 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex flex-col justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 text-[10px] font-extrabold uppercase">
                      Urgent Triage
                    </span>
                    <h5 className="text-lg font-black text-rose-400 mt-1">RED LEVEL</h5>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Immediate in-person clinical assessment recommended.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-rose-300/80 mt-2">
                    ICD-10: {activeScenario === "dermatology_deeplearning" ? "C43.9 (Malignant Melanoma)" : "A90 (Dengue Fever)"}
                  </div>
                </div>

                <div className="sm:col-span-8 space-y-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white">
                        {activeScenario === "dermatology_deeplearning"
                          ? "Atypical Pigmented Lesion / Suspected Melanoma"
                          : activeScenario === "respiratory_cxr"
                          ? "Acute Lobar Bacterial Pneumonia"
                          : "Dengue Hemorrhagic Fever Vector Syndrome"}
                      </span>
                      <span className="text-xs font-extrabold text-cyan-400">96.4% Match</span>
                    </div>
                    <p className="text-xs text-slate-300">
                      {activeScenario === "dermatology_deeplearning"
                        ? "Convolutional deep features show high irregular pigment variance and eccentrically distributed peripheral globules."
                        : "High fever correlated with retro-orbital headache and joint pain matches vector outbreak spikes in Metro Sector 4."}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-emerald-400 font-bold block">First-Aid Guidance</span>
                      <span className="text-slate-300 text-[11px]">Oral rehydration, avoid NSAIDs/Aspirin, rest.</span>
                    </div>
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <span className="text-cyan-400 font-bold block">Specialist Consult</span>
                      <span className="text-slate-300 text-[11px]">Infectious Disease / Dermatologist referral ready.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STAGE 4: Rural GIS Hospital Dispatch & Tele-Queue */}
            {currentStageIdx === 3 && (
              <div className="space-y-3 text-left">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                      <Hospital className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Metro Central Multi-Specialty Hospital</h5>
                      <p className="text-xs text-slate-400">0.8 km away • Sector 4 Medical Hub</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                      28 ICU Beds Available
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-bold">
                      6 Doctors On Duty
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-bold flex items-center gap-1.5 text-white">
                        <MapPin className="w-3.5 h-3.5 text-rose-400" /> Outbreak Vector Warning
                      </span>
                      <span className="text-rose-400 font-bold">High Density</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Sector 4 water sanitation index: 48/100. Preventive municipal fogging unit auto-notified.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-slate-300">
                      <span className="font-bold flex items-center gap-1.5 text-white">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Emergency SOS Ready
                      </span>
                      <span className="text-emerald-400 font-bold">Avg ETA: 6 mins</span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Direct one-click connection to 108 Rural Emergency Ambulance and live doctor video triage queue.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Subtitle / Narration Box inside Player */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 text-left z-10 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <span className="font-bold text-white">{stage.subtitle}: </span>
              {stage.narration}
            </p>
          </div>

          {/* Background decorative grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>
        </div>

        {/* Timeline Progress Scrubber with Stage Steps */}
        <div className="space-y-2">
          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden relative cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-[#00C853] to-[#00BCD4] transition-all duration-100 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Stage Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => handleStageSelect(idx)}
                className={`p-2 rounded-xl text-left border transition-all ${
                  currentStageIdx === idx
                    ? "bg-cyan-500/10 border-cyan-500/50 text-white shadow-md shadow-cyan-500/10"
                    : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10"
                }`}
              >
                <span className="text-[10px] font-mono block opacity-70">0{st.id}</span>
                <span className="text-xs font-bold truncate block">{st.title.split(". ")[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Playback Controls & Action CTAs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-800">
          
          {/* Left Player Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevStage}
              disabled={currentStageIdx === 0}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 transition-all text-slate-300"
              title="Previous Stage"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-extrabold text-xs shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-slate-950" /> {isTamil ? "நிறுத்து" : "Pause Tour"}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" /> {isTamil ? "தொடங்கு" : "Play Tour"}
                </>
              )}
            </button>

            <button
              onClick={handleNextStage}
              disabled={currentStageIdx === STAGES.length - 1}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 transition-all text-slate-300"
              title={isTamil ? "அடுத்த நிலை" : "Next Stage"}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-all text-slate-300"
              title={isTamil ? "ஆரம்பத்திலிருந்து மீண்டும் இயக்கு" : "Replay from start"}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Audio Voice Narration Toggle */}
            <button
              onClick={() => setAudioNarrationEnabled(!audioNarrationEnabled)}
              className={`p-2.5 rounded-xl border transition-all ${
                audioNarrationEnabled
                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300"
                  : "bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200"
              }`}
              title={audioNarrationEnabled ? (isTamil ? "குரல் விளக்கத்தை முடக்கு" : "Mute Voice Narration") : (isTamil ? "குரல் விளக்கத்தை இயக்கு" : "Enable Voice Narration")}
            >
              {audioNarrationEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Playback speed selector */}
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
              className="bg-slate-800 border border-slate-700 text-slate-300 text-xs rounded-xl px-2.5 py-2 font-mono"
            >
              <option value={1}>1.0x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2.0x</option>
            </select>
          </div>

          {/* Right Action CTA Buttons */}
          <div className="flex items-center gap-3">
            {onExploreML && (
              <button
                onClick={() => {
                  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                  onClose();
                  onExploreML();
                }}
                className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white font-bold text-xs hover:bg-white/10 flex items-center gap-2 transition-all"
              >
                <Database className="w-3.5 h-3.5 text-cyan-400" /> {isTamil ? "ML & Deep Learning தரவுகள்" : "View ML & Deep Learning Datasets"}
              </button>
            )}

            <button
              onClick={() => {
                if ("speechSynthesis" in window) window.speechSynthesis.cancel();
                onClose();
                onLaunchChecker();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {isTamil ? "நேரடி அமைப்பை சோதிக்கவும்" : "Try Live System Now"} <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
