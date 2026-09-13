import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { AnalysisReport } from "../types";
import { useLanguage } from "../context/LanguageContext";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Stethoscope,
  MapPin,
  Pill,
  HeartPulse,
  Printer,
  ShieldCheck,
  Activity,
  ArrowLeft,
  Calendar,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  Sparkles
} from "lucide-react";

interface ResultReportProps {
  report: AnalysisReport;
  onBackToChecker: () => void;
  onBookConsultation: () => void;
  onFindHospitals: () => void;
}

export const ResultReport: React.FC<ResultReportProps> = ({
  report,
  onBackToChecker,
  onBookConsultation,
  onFindHospitals,
}) => {
  const { isTamil, t, tDisease, tRisk } = useLanguage();
  const { speak, stop, pause, resume, isSpeaking, isPaused, supported } = useTextToSpeech();
  const [speechSection, setSpeechSection] = useState<string | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00C853", "#00BCD4", "#1E3A8A"]
      });
    } catch (e) {
      // ignore
    }

    return () => {
      stop();
    };
  }, [stop]);

  const overallRiskLevel = report?.overallRiskLevel || "Green";

  const riskBadgeColor =
    overallRiskLevel === "Red"
      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
      : overallRiskLevel === "Yellow"
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30";

  const primaryDisease = (report?.possibleDiseases || [])[0] || {
    name: "General Viral Illness",
    probabilityPercent: 75,
    riskLevel: "Low",
    description: "Systemic response to physical stress or seasonal viral strains."
  };

  const localizedDisease = tDisease(primaryDisease.name);
  const localizedDiseaseName = isTamil ? localizedDisease.name : primaryDisease.name;

  const handlePrintDownload = () => {
    window.print();
  };

  // Build spoken text for complete diagnosis in Tamil or English
  const handleReadFullReport = () => {
    if (isSpeaking) {
      stop();
      setSpeechSection(null);
      return;
    }

    setSpeechSection("full");

    let speechText = "";
    if (isTamil) {
      const riskDescription =
        overallRiskLevel === "Red"
          ? "அதி தீவிர சிவப்பு நிலை. உடனடியாக அவசர சிகிச்சைப் பிரிவை அணுகவும்."
          : overallRiskLevel === "Yellow"
          ? "கவனிக்கத்தக்க மஞ்சள் நிலை. மருத்துவரை ஆலோசிக்கவும்."
          : "மிதமான பச்சை நிலை. அச்சப்படத் தேவையில்லை.";

      const firstAidItems = (report.firstAid || []).slice(0, 3).join(". ");
      const medicineItems = (report.medicines || [])
        .slice(0, 2)
        .map((m) => `${m.name}, அளவு ${m.dosage}`)
        .join(". ");

      speechText = `மெடிசென்ஸ் AI மருத்துவ பரிசோதனை அறிக்கை. நோயாளிக்கு கணிக்கப்பட்ட முதன்மை நோய்: ${localizedDiseaseName}. சாத்தியக்கூறு ${primaryDisease.probabilityPercent} சதவீதம். உடல்நல மதிப்பெண்: ${report.healthScore} சதவீதம். ஒட்டுமொத்த அபாய நிலை: ${tRisk(overallRiskLevel)}. ${riskDescription} அவசர ஆலோசனை: ${report.ruralUrgencyMessage || "அருகிலுள்ள நகர்ப்புற மருத்துவ மையத்தை அணுகவும்."} உடனடி முதலுதவி நடவடிக்கைகள்: ${firstAidItems}. பரிந்துரைக்கப்படும் மருந்துகள்: ${medicineItems}. இது AI ஆரம்ப வழிகாட்டல் மட்டுமே. உடனடி உதவிக்கு 108 என்ற எண்ணை அழைக்கவும்.`;
    } else {
      const firstAidItems = (report.firstAid || []).slice(0, 3).join(". ");
      speechText = `MediSense AI Diagnostic Report. Primary predicted condition is ${primaryDisease.name}, with ${primaryDisease.probabilityPercent} percent probability confidence. Overall health score is ${report.healthScore} percent. Risk level is ${overallRiskLevel}. Urgency guidance: ${report.ruralUrgencyMessage || "Consult a doctor at your nearest Urban Health Center."} Immediate first aid measures: ${firstAidItems}. For medical emergency, call 108.`;
    }

    speak(speechText, {
      lang: isTamil ? "ta-IN" : "en-US",
      onEnd: () => setSpeechSection(null),
      onError: () => setSpeechSection(null),
    });
  };

  // Read only first aid steps
  const handleReadFirstAid = () => {
    if (isSpeaking && speechSection === "firstAid") {
      stop();
      setSpeechSection(null);
      return;
    }

    setSpeechSection("firstAid");
    const steps = (report.firstAid || []).join(". ");
    const speechText = isTamil
      ? `உடனடி முதலுதவி நடவடிக்கைகள்: ${steps}. தயவுசெய்து இவற்றை முறையாகப் பின்பற்றவும்.`
      : `Immediate first aid and precautions: ${steps}.`;

    speak(speechText, {
      lang: isTamil ? "ta-IN" : "en-US",
      onEnd: () => setSpeechSection(null),
      onError: () => setSpeechSection(null),
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 print:p-0 print:m-0">
      
      {/* Top Actions & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <button
          onClick={onBackToChecker}
          className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> {isTamil ? "மீண்டும் அறிகுறிகளை சோதிக்கவும்" : "Check Symptoms Again"}
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:border-cyan-500 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-cyan-500" /> {isTamil ? "அச்சிடு / சேமி" : "Print / Save"}
          </button>
          <button
            onClick={handlePrintDownload}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> {isTamil ? "அதிகாரப்பூர்வ அறிக்கை பதிவிறக்கம் (PDF)" : "Download Official PDF Report"}
          </button>
        </div>
      </div>

      {/* WEB SPEECH API TTS VOICE ASSISTANT BAR */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-2 border-[#00BCD4]/40 shadow-2xl text-white print:hidden relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-[#00BCD4]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
              isSpeaking
                ? "bg-gradient-to-tr from-rose-500 to-amber-500 animate-pulse text-white"
                : "bg-gradient-to-tr from-[#00C853] to-[#00BCD4] text-slate-950"
            }`}>
              {isSpeaking ? <Volume2 className="w-6 h-6 animate-bounce" /> : <Volume2 className="w-6 h-6" />}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  <span>{isTamil ? "AI குரல் வழி அறிக்கை வாசிப்பு" : "AI Voice Diagnostic Reader"}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Web Speech API • {isTamil ? "தமிழ் (ta-IN)" : "English (en-US)"}
                  </span>
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {isSpeaking
                  ? isPaused
                    ? (isTamil ? "வாசிப்பு இடைநிறுத்தப்பட்டுள்ளது (Paused)" : "Speech paused")
                    : (isTamil ? "AI உதவியாளர் உங்கள் அறிக்கையை தமிழில் வாசிக்கிறார்..." : "AI Assistant is reading your diagnostic report...")
                  : isTamil
                  ? "முழு நோய் கணிப்பு, முதலுதவி நடவடிக்கைகள் மற்றும் அவசர வழிகாட்டலை தமிழில் கேளுங்கள்."
                  : "Listen to predicted condition, triage risk, emergency advice, and first-aid instructions."}
              </p>
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {isSpeaking && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-white/10 mr-1">
                <span className="w-1.5 h-4 bg-emerald-400 animate-[pulse_0.6s_ease-in-out_infinite]"></span>
                <span className="w-1.5 h-6 bg-cyan-400 animate-[pulse_0.4s_ease-in-out_infinite]"></span>
                <span className="w-1.5 h-3 bg-blue-400 animate-[pulse_0.8s_ease-in-out_infinite]"></span>
                <span className="w-1.5 h-5 bg-emerald-400 animate-[pulse_0.5s_ease-in-out_infinite]"></span>
                <span className="text-[10px] text-emerald-400 font-bold ml-1">
                  {isTamil ? "ஒலி வடிவில் கேட்கிறது" : "Playing"}
                </span>
              </div>
            )}

            <button
              onClick={handleReadFullReport}
              className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
                isSpeaking && speechSection === "full"
                  ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30"
                  : "bg-gradient-to-r from-[#00C853] via-[#00BCD4] to-cyan-500 text-slate-950 hover:scale-105 shadow-cyan-500/30"
              }`}
            >
              {isSpeaking && speechSection === "full" ? (
                <>
                  <Square className="w-4 h-4 fill-white" />
                  <span>{isTamil ? "நிறுத்து (Stop)" : "Stop Reading"}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-slate-950" />
                  <span>{isTamil ? "முழு அறிக்கையைக் கேளுங்கள்" : "Listen to Full Report"}</span>
                </>
              )}
            </button>

            {isSpeaking && (
              <button
                onClick={() => (isPaused ? resume() : pause())}
                className="px-3 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                <span>{isPaused ? (isTamil ? "தொடர்க" : "Resume") : (isTamil ? "இடைநிறுத்து" : "Pause")}</span>
              </button>
            )}

            <button
              onClick={handleReadFirstAid}
              className={`px-3.5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all border cursor-pointer ${
                isSpeaking && speechSection === "firstAid"
                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                  : "bg-white/5 hover:bg-white/10 text-slate-200 border-white/10"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              <span>{isTamil ? "முதலுதவி மட்டும் கேளுங்கள்" : "Listen First-Aid"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Report Document Card */}
      <div className="bg-white dark:bg-slate-900 border border-emerald-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden print:shadow-none print:border-none">
        
        {/* Holographic Watermark Badge */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none print:hidden">
          <Activity className="w-96 h-96 text-emerald-500" />
        </div>

        {/* Report Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00C853] via-[#00BCD4] to-[#1E3A8A] p-[2px] shadow-lg">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-white">
                <ShieldCheck className="w-8 h-8 text-[#00C853]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">
                  {isTamil ? "மெடிசென்ஸ் AI மருத்துவ பரிசோதனை அறிக்கை" : "MediSense AI Diagnostic Report"}
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
                  {isTamil ? "சான்றளிக்கப்பட்ட மருத்துவ AI" : "VERIFIED CLINICAL AI"}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {isTamil ? "அறிக்கை எண்" : "Report ID"}: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{report?.id || "N/A"}</span> • {isTamil ? "உருவாக்கப்பட்ட நாள்: இன்று" : `Generated on ${report?.timestamp || "Today"}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-2xl border ${riskBadgeColor} font-black text-sm flex items-center gap-2`}>
              <AlertTriangle className="w-4 h-4" />
              <span>{isTamil ? `ஆபத்து நிலை: ${tRisk(overallRiskLevel)}` : `Overall Risk Level: ${overallRiskLevel}`}</span>
            </div>
          </div>
        </div>

        {/* Patient Vitals Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "நோயாளி பெயர்" : "Patient Name"}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{report?.patientInfo?.name || (isTamil ? "நகர்ப்புற நோயாளி" : "Urban Patient")}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "வயது / பாலினம்" : "Age / Gender"}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{report?.patientInfo?.age || 30} {isTamil ? "வயது" : "Yrs"} • {report?.patientInfo?.gender || "Unknown"}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "வெப்பநிலை / ரத்த அழுத்தம்" : "Temperature / BP"}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{report?.patientInfo?.temperature || 98.6}°F • {report?.patientInfo?.bloodPressure || "120/80"}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">{isTamil ? "நகர்ப்புற வார்டு" : "City Sector"}</span>
            <span className="text-xs font-bold text-slate-900 dark:text-white">{report?.patientInfo?.villageRegion || "Central Metro Sector"}</span>
          </div>
        </div>

        {/* Primary Diagnosis & Circular Confidence Meter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl text-white border border-cyan-500/30 shadow-xl">
          
          <div className="md:col-span-8 space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" /> {isTamil ? "முதன்மை AI நோய் கணிப்பு" : "Primary AI Diagnosis Prediction"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isTamil ? `${localizedDiseaseName} (${primaryDisease.name})` : primaryDisease.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {localizedDisease.desc || primaryDisease.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-xl bg-slate-800 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                ICD-10: {primaryDisease.icdCode || "A90"}
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-800 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                {isTamil ? "துல்லிய சாத்தியக்கூறு" : "Probability Confidence"}: {primaryDisease.probabilityPercent}%
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-800 text-amber-300 text-xs font-bold border border-amber-500/30">
                {isTamil ? "கண்காணிப்பு வார்டு" : "Ward Zone"}: {report.patientInfo?.villageRegion || "Sector 4"}
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#00BCD4] transition-all duration-1000 ease-out"
                  strokeDasharray={`${primaryDisease.probabilityPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white">{primaryDisease.probabilityPercent}%</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">
                  {isTamil ? "துல்லியம்" : "Confidence"}
                </span>
              </div>
            </div>
            <span className="text-xs text-slate-300 font-bold mt-2 text-center">
              {isTamil ? "AI நரம்பியல் ஒப்பீடு" : "Neural Network Certainty"}
            </span>
          </div>

        </div>

        {/* Possible Differential Diagnoses Grid */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            {isTamil ? "பிற சாத்தியமான நோய்கள் & ஒப்பீட்டு வாய்ப்பு" : "Differential Diagnoses & Comparison"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(report.possibleDiseases || []).map((d, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {isTamil ? `${tDisease(d.name).name || d.name}` : d.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#00BCD4]">
                    {d.probabilityPercent}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00BCD4] h-full rounded-full transition-all duration-500"
                    style={{ width: `${d.probabilityPercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {tDisease(d.name).desc || d.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Health Recovery Capacity Score */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isTamil ? "உடல் மீட்பு & நோய் எதிர்ப்பு குறியீடு" : "Estimated Recovery Capacity"}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-emerald-500">{report.healthScore}%</span>
              <span className="text-xs text-slate-500 font-semibold">
                {isTamil ? "(இயல்பான உடல் மீட்டெடுப்பு திறன்)" : "(Favorable Recovery Index)"}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg">
              {isTamil
                ? "வயது மற்றும் உடல் அளவீடுகளின் அடிப்படையில் கணக்கிடப்பட்ட விரைவான மீட்பு திறன்."
                : "Estimated recovery capacity based on vitals, age, and early symptom intervention."}
            </p>
          </div>

          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400">{isTamil ? "மீட்பு வேகம்" : "Recovery Speed"}</span>
              <span className="text-emerald-500">{report.healthScore}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-1000"
                style={{ width: `${report.healthScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Immediate First Aid Steps */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              {isTamil ? "உடனடி முதலுதவி & அவசர முன்னெச்சரிக்கைகள்" : "Immediate First Aid & Emergency Measures"}
            </h3>
            <button
              onClick={handleReadFirstAid}
              className="text-xs text-cyan-500 hover:text-cyan-400 font-bold flex items-center gap-1.5 print:hidden cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isTamil ? "முதலுதவி வழிகாட்டுதலைக் கேட்க" : "Listen First-Aid Audio"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(report.firstAid || []).map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Over-The-Counter Medicine Precautions */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-cyan-500" />
            {isTamil ? "பரிந்துரைக்கப்படும் முதலுதவி மருந்துகள்" : "Over-The-Counter First Aid Medications"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(report.medicines || []).map((med, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {med.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold">
                    {med.overTheCounter ? (isTamil ? "நேரடி மருந்து (OTC)" : "OTC First-Aid") : (isTamil ? "மருத்துவர் சீட்டு தேவை" : "Prescription Needed")}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  <strong>{isTamil ? "அளவு" : "Dosage"}:</strong> {med.dosage} ({med.timing})
                </p>
                <p className="text-[11px] text-slate-400 italic">{med.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Specialist Recommendation & Emergency Guidance */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                {isTamil ? "பரிந்துரைக்கப்படும் சிறப்பு மருத்துவர்" : "Recommended Medical Specialist"}
              </span>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {report.specialistRecommendation}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {report.ruralUrgencyMessage}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 print:hidden">
              <button
                onClick={onFindHospitals}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-cyan-400" />
                {isTamil ? "அருகிலுள்ள மருத்துவமனை / UHC" : "Locate Hospital / UHC"}
              </button>
              <button
                onClick={onBookConsultation}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                {isTamil ? "மருத்துவர் சந்திப்பு முன்பதிவு" : "Book Consultation"}
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
