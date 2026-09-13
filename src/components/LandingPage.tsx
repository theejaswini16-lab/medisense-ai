import React, { useState } from "react";
import {
  Sparkles,
  Activity,
  HeartPulse,
  BrainCircuit,
  Dna,
  ShieldCheck,
  Globe2,
  ChevronDown,
  Play,
  ArrowRight,
  Database,
  Volume2
} from "lucide-react";
import { ViewTab } from "../types";
import { DemoTourModal } from "./DemoTourModal";
import { useLanguage } from "../context/LanguageContext";

interface LandingPageProps {
  onStart: () => void;
  onNavigateTab: (tab: ViewTab) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onNavigateTab }) => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { isTamil, toggleTamil, language } = useLanguage();

  const faqs = isTamil
    ? [
        {
          q: "மெடிசென்ஸ் AI எவ்வாறு ஆரம்பத்திலேயே நோய்களைக் கணிக்கிறது?",
          a: "மெடிசென்ஸ் AI மனித உடலின் அறிகுறிகள், முக்கிய அளவீடுகள் (உடல் வெப்பநிலை, இரத்த அழுத்தம்) மற்றும் நகர்ப்புற நோய் பரவல் தரவுகளை ஜெமினி 3.6 நரம்பியல் மாதிரியுடன் ஒப்பிட்டு டெங்கு, மூச்சுக்குழாய் அழற்சி, டைபாய்டு, வைரஸ் காய்ச்சல் போன்றவற்றை ஆரம்ப நிலையிலேயே துல்லியமாகக் கணிக்கிறது."
        },
        {
          q: "நகர்ப்புற மருத்துவமனைகளில் இணையம் இல்லாதபோது (ஆஃப்லைன்) இது செயல்படுமா?",
          a: "ஆம்! மெடிசென்ஸ் AI உள்ளமைக்கப்பட்ட ஆஃப்லைன் சேமிப்பு முறையைக் கொண்டுள்ளது. இணைய வசதி இல்லாத போதும் சுகாதார ஊழியர்கள் அறிகுறிகளைப் பதிவு செய்யலாம். இணையம் மீண்டும் கிடைத்தவுடன் தானாக ஒத்திசைக்கப்படும்."
        },
        {
          q: "தமிழ் மொழியில் குரல் மூலம் அறிகுறிகளைப் பேச முடியுமா?",
          a: "நிச்சயமாக! உங்கள் சொந்த மொழியான தமிழிலேயே பேசி அறிகுறிகளைப் பதிவு செய்ய முடியும். மேலும் AI அறிக்கைகள் மற்றும் சுகாதாரக் குறிப்புகளை தமிழில் குரல் வழியே கேட்கவும் Web Speech API வசதி உள்ளது."
        },
        {
          q: "அருகிலுள்ள நகர்ப்புற ஆரம்ப சுகாதார நிலையங்களுடன் (UHCs) எவ்வாறு இணைக்கிறது?",
          a: "ஜிபிஎஸ் (GPS) தூரக் கணக்கீடு, அவசர 108 ஆம்புலன்ஸ் அழைப்பு, மருத்துவமனை படுக்கைகள் மற்றும் பணியிலுள்ள மருத்துவர்களின் விபரங்களை உடனுக்குடன் வழங்குகிறது."
        }
      ]
    : [
        {
          q: "How does MediSense AI perform early disease predictions?",
          a: "MediSense AI combines clinical symptom mapping, vital indicators (body temperature, blood pressure), and regional disease outbreak datasets using Gemini 3.6 neural reasoning models to detect early indicators of Dengue, Bronchitis, Typhoid, viral illnesses, and chronic conditions."
        },
        {
          q: "Is MediSense AI designed for offline use in urban clinics?",
          a: "Yes! MediSense AI includes a local offline caching engine allowing Urban Health Workers and clinic staff to record symptoms, generate preliminary triage scores, and sync reports as soon as connectivity is restored."
        },
        {
          q: "Does MediSense AI support Tamil and regional speech?",
          a: "Absolutely. MediSense AI supports Tamil with full Web Speech API voice input and text-to-speech audio playback, alongside Hindi, Bengali, Spanish, and English."
        },
        {
          q: "How does this platform connect patients with nearby Urban Health Centers (UHCs)?",
          a: "Our integrated hospital finder provides GPS-based distance calculations, live emergency ambulance contacts (108/112), bed availability, and real-time doctor on-duty statuses."
        }
      ];

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 lg:pt-16 overflow-hidden">
        
        {/* Glowing Background Radial Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#00C853]/20 via-[#00BCD4]/20 to-[#1E3A8A]/30 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Prominent Language Switch Banner / Indicator */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="text-base">🌐</span>
              <span>
                {isTamil
                  ? "🇮🇳 தமிழ் மொழி செயலில் உள்ளது (Tamil Mode Active) — அனைத்து தகவல்களும் தமிழில் கிடைக்கின்றன."
                  : "Prefer Tamil? தமிழ் மொழியில் பார்க்க விரும்புகிறீர்களா?"}
              </span>
            </div>
            <button
              onClick={toggleTamil}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 ${
                isTamil
                  ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 shadow-emerald-500/20 ring-2 ring-emerald-400"
                  : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
              }`}
            >
              <span>{isTamil ? "ஆங்கிலத்திற்கு மாறுக (English)" : "தமிழுக்கு மாறவும் (Switch to Tamil)"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#00C853]/30 text-[#00C853] text-xs font-bold tracking-wide shadow-lg backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-[#00C853] animate-spin" />
                <span>
                  {isTamil
                    ? "AI செயற்கை நுண்ணறிவு நகர்ப்புற சுகாதார புதுமை"
                    : "AI-Powered Urban Healthcare Innovation"}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                {isTamil ? (
                  <>
                    <span className="block text-emerald-400 mb-2">AI மூலம் நோய்களை</span>
                    ஆரம்பத்திலேயே கண்டறியுங்கள்
                  </>
                ) : (
                  <>
                    Detect Diseases Early with{" "}
                    <span className="bg-gradient-to-r from-[#00C853] via-[#00BCD4] to-[#1E3A8A] bg-clip-text text-transparent">
                      AI
                    </span>
                  </>
                )}
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
                {isTamil
                  ? "அறிவார்ந்த அறிகுறி பகுப்பாய்வு, உடனடி நோய் கணிப்பு, தமிழ் குரல் வழிகாட்டல் மற்றும் நகர்ப்புற மருத்துவ உதவி."
                  : "Empowering urban communities through intelligent symptom analysis, early disease prediction, and accessible healthcare."}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onStart}
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-black font-extrabold text-base shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-3"
                >
                  <span className="relative flex items-center gap-2">
                    {isTamil ? "சோதனையைத் தொடங்கவும்" : "Get Started"}{" "}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <button
                  onClick={() => setDemoModalOpen(true)}
                  className="px-8 py-4 rounded-2xl bg-[#1E3A8A]/30 backdrop-blur-xl text-white border border-[#1E3A8A]/50 font-bold text-base hover:bg-[#1E3A8A]/50 hover:scale-105 transition-all flex items-center gap-3 shadow-lg cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#00BCD4]/20 text-[#00BCD4] flex items-center justify-center">
                    <Play className="w-4 h-4 fill-[#00BCD4] translate-x-0.5" />
                  </div>
                  {isTamil ? "டெமோ பார்க்கவும்" : "Watch Demo"}
                </button>

                <button
                  onClick={() => onNavigateTab("ml_datasets")}
                  className="px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-xl text-cyan-300 border border-cyan-500/30 font-bold text-base hover:bg-white/10 hover:border-cyan-400 hover:scale-105 transition-all flex items-center gap-2.5 shadow-lg cursor-pointer"
                >
                  <Database className="w-5 h-5 text-cyan-400" />
                  {isTamil ? "ML மாதிரி தரவுகள்" : "ML Datasets"}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white">98.4%</span>
                  <p className="text-xs text-slate-400 font-medium">
                    {isTamil ? "AI துல்லிய விகிதம்" : "Diagnostic Accuracy"}
                  </p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#00C853]">50,000+</span>
                  <p className="text-xs text-slate-400 font-medium">
                    {isTamil ? "பரிசோதிக்கப்பட்டவர்கள்" : "Patients Screened"}
                  </p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#00BCD4]">120+</span>
                  <p className="text-xs text-slate-400 font-medium">
                    {isTamil ? "சுகாதார மையங்கள்" : "Urban Health Centers"}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Hero Graphic: Futuristic Hologram Assistant */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Main Hologram Container */}
              <div className="relative w-full max-w-md aspect-square rounded-[32px] bg-white/5 border border-white/10 p-6 shadow-2xl backdrop-blur-xl overflow-hidden group">
                
                {/* Cyber Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#00BCD4_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>

                {/* Pulsing Hologram AI Assistant Sphere */}
                <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                  
                  {/* Rotating Outer Ring */}
                  <div className="absolute w-64 h-64 rounded-full border-2 border-dashed border-cyan-500/40 animate-[spin_20s_linear_infinite]"></div>
                  <div className="absolute w-72 h-72 rounded-full border border-emerald-500/20 animate-[spin_30s_linear_infinite_reverse]"></div>

                  {/* Core Holographic Assistant Icon */}
                  <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-[#00C853] via-[#00BCD4] to-[#1E3A8A] p-[3px] shadow-2xl shadow-emerald-500/40 animate-pulse my-4">
                    <div className="w-full h-full bg-slate-950 rounded-[21px] flex items-center justify-center text-white">
                      <BrainCircuit className="w-14 h-14 text-[#00BCD4]" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {isTamil ? "மெடிசென்ஸ் AI ஹாலோகிராம்" : "MediSense Holographic AI"}
                  </h3>
                  <p className="text-xs text-cyan-300 font-mono mt-1">
                    {isTamil ? "செயலில் உள்ளது • 24/7 நேரடி கண்காணிப்பு" : "SYSTEM ACTIVE • 24/7 MONITORING"}
                  </p>

                  {/* Floating Medical Graphics */}
                  <div className="absolute top-6 left-6 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg animate-bounce">
                    <HeartPulse className="w-4 h-4 text-rose-500" />
                    <span>{isTamil ? "72 இதயத்துடிப்பு (BPM)" : "72 BPM Heartbeat"}</span>
                  </div>

                  <div className="absolute bottom-6 right-6 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-cyan-500/40 text-[11px] font-bold text-cyan-300 flex items-center gap-1.5 shadow-lg">
                    <Dna className="w-4 h-4 text-cyan-400 animate-spin" />
                    <span>{isTamil ? "நரம்பியல் பொருத்தம்" : "DNA Neural Match"}</span>
                  </div>

                  <div className="absolute bottom-6 left-6 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-emerald-500/40 text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 shadow-lg">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>{isTamil ? "98.6°F உடல் வெப்பநிலை" : "98.6°F Normal Temp"}</span>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* WHY EARLY DETECTION MATTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
            {isTamil ? "நகர்ப்புற சுகாதார தாக்கம்" : "Urban Health Impact"}
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isTamil
              ? "நகர்ப்புறங்களில் ஆரம்பத்திலேயே நோயைக் கண்டறிவது ஏன் முக்கியம்?"
              : "Why Early Detection Matters in Urban Areas"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {isTamil
              ? "வேலைப்பளு மற்றும் மருத்துவமனை கூட்ட நெரிசல் காரணமாக 60% மக்கள் சிகிச்சையை தாமதப்படுத்துகின்றனர். இதனைத் தவிர்க்க AI உடனுக்குடன் வழிகாட்டுகிறது."
              : "Over 60% of urban residents delay seeking timely medical care due to busy work schedules, crowded clinics, and diagnostic bottlenecks."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 hover:border-emerald-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold text-xl">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isTamil ? "நோய் தீவிரமாவதைத் தடுக்கிறது" : "Prevents Disease Escalation"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isTamil
                ? "டெங்கு அல்லது கடுமையான வைரஸ் காய்ச்சலை 24 மணி நேரத்திற்குள் கண்டறிந்து சிகிச்சை பெறுவது உயிராபத்தைத் தவிர்க்கிறது."
                : "Detecting vector-borne illnesses like Dengue or acute viral spikes within 24 hours prevents severe complications and hospital burden."}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 hover:border-cyan-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold text-xl">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isTamil ? "சுகாதார ஊழியர்களுக்கு வழிகாட்டுகிறது" : "Empowers Urban Health Staff"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isTamil
                ? "நகர்ப்புற ஆரம்ப சுகாதார நிலையப் பணியாளர்களுக்கு வேகமான AI மருத்துவ வழிகாட்டலை மொபைல் மற்றும் டேப்லெட்டுகளில் வழங்குகிறது."
                : "Equips local Urban Health Center personnel and clinic triage staff with fast AI diagnostic support on any connected device."}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 hover:border-blue-500 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold text-xl">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {isTamil ? "தொற்றுநோய் பரவலைக் கட்டுப்படுத்துகிறது" : "Mitigates Outbreak Spread"}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {isTamil
                ? "நகர்ப்புற வார்டுகளில் காய்ச்சல் பரவல் அதிகரிப்பதை முன்கூட்டியே எச்சரித்து மாநகராட்சி சுகாதார அதிகாரிகளுக்கு தகவல் அனுப்புகிறது."
                : "Aggregates ward and sector level symptom trends to alert municipal medical officers before localized infection clusters escalate."}
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">
            {isTamil ? "அதிநவீன தொழில்நுட்பம்" : "Next-Gen Capabilities"}
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isTamil
              ? "மருத்துவச் சிறப்புக்கான மேம்பட்ட AI வசதிகள்"
              : "Cutting-Edge Features Built for Healthcare Excellence"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C853] to-[#00BCD4] text-slate-950 flex items-center justify-center font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isTamil ? "ஊடாடும் உடல் வரைபடம்" : "Interactive Body Map"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTamil
                ? "தலை, மார்பு, வயிறு அல்லது கைகால்களைத் தொட்டு அறிகுறிகளை உடனடியாகத் தேர்வு செய்யலாம்."
                : "Visual anatomical model allowing patients to tap head, chest, or limbs to automatically select symptoms."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00BCD4] to-[#1E3A8A] text-white flex items-center justify-center font-bold">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isTamil ? "ஜெமினி AI நரம்பியல் கணிப்பு" : "Gemini 3.6 Neural Engine"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTamil
                ? "சாத்தியக்கூறு மதிப்பெண்கள், ICD மருத்துவ குறியீடுகள் மற்றும் முதலுதவி வழிகாட்டல்களை உருவாக்குகிறது."
                : "Generates structured clinical reports with probability scores, ICD codes, and first-aid steps."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00C853] to-blue-600 text-slate-950 flex items-center justify-center font-bold">
              <Volume2 className="w-5 h-5 text-slate-950" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isTamil ? "தமிழ் குரல் & ஒலி வாசிப்பு (TTS)" : "Voice & Tamil Speech (TTS)"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTamil
                ? "தமிழில் அறிகுறிகளைப் பேசலாம் மற்றும் அறிக்கைகளை AI குரலில் கேட்கலாம் (Web Speech API)."
                : "Real-time voice symptom recording and Web Speech text-to-speech reading in Tamil and English."}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-3 hover:scale-105 transition-transform">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-rose-500 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isTamil ? "நோய் பரவல் ரேடார் வரைபடம்" : "Disease Spread Outbreak Map"}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isTamil
                ? "நகர்ப்புற வார்டுகளில் தீவிர காய்ச்சல் பரவல் மற்றும் காற்றின் தரத்தை நிகழ்நேரத்தில் கண்காணிக்கிறது."
                : "Real-time heatmaps tracking active fever spikes, air quality indices, and urban ward outbreak alerts."}
            </p>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
            {isTamil ? "எளிய 4 படிகள்" : "Seamless Triage Workflow"}
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isTamil ? "மெடிசென்ஸ் AI எவ்வாறு செயல்படுகிறது?" : "How MediSense AI Works in 4 Simple Steps"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {(isTamil
            ? [
                { step: "01", title: "அறிகுறிகளைத் தேர்வு செய்க", desc: "உடல் பாகங்களைத் தொடவும் அல்லது குரல் மூலம் அறிகுறிகளைக் கூறவும்." },
                { step: "02", title: "அளவீடுகளை உள்ளிடவும்", desc: "வயது, உடல் வெப்பநிலை, இரத்த அழுத்தம் மற்றும் உங்கள் பகுதி." },
                { step: "03", title: "AI நரம்பியல் பகுப்பாய்வு", desc: "ஜெமினி மாதிரிகள் நோய்த்தொற்று தரவுகளுடன் ஒப்பிட்டு கணிக்கிறது." },
                { step: "04", title: "மருத்துவ அறிக்கை & வழிகாட்டல்", desc: "முதலுதவி குறிப்புகள் மற்றும் அருகிலுள்ள மருத்துவமனை வழிகாட்டுதலைப் பெறுங்கள்." },
              ]
            : [
                { step: "01", title: "Select Symptoms", desc: "Tap body parts or speak symptoms via AI voice assistant." },
                { step: "02", title: "Input Patient Vitals", desc: "Enter age, temperature, blood pressure, and urban sector." },
                { step: "03", title: "Run AI Neural Analysis", desc: "Gemini models evaluate risk scores & compare urban epidemiological data." },
                { step: "04", title: "Receive Action Report", desc: "Get first-aid instructions, prescriptions, and nearest hospital directions." },
              ]
          ).map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-3 relative overflow-hidden"
            >
              <span className="text-4xl font-black text-emerald-500/40">{item.step}</span>
              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">
            {isTamil ? "மருத்துவ ஊழியர்கள் கருத்து" : "Clinical Feedback"}
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isTamil ? "மருத்துவர்கள் மற்றும் ஊழியர்களின் நம்பிக்கை" : "Trusted by Urban Health Clinicians & Doctors"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
              {isTamil
                ? '"மெடிசென்ஸ் AI உதவியால் எங்கள் பகுதி சுகாதாரக் குழு சில மணிநேரங்களில் டெங்கு காய்ச்சல் பரவலைக் கண்டறிந்து உடனடியாக நடவடிக்கை எடுத்தது. தமிழ் ஆதரவு மக்களுக்கு மிகவும் பயனுள்ளதாக உள்ளது."'
                : '"MediSense AI allowed our urban health team to spot a Dengue fever cluster in Sector 4 within hours. The offline mode is a lifesaver during network maintenance."'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-500 font-bold flex items-center justify-center">
                AK
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isTamil ? "அனிதா குமாரி" : "Anita Kumari"}
                </h5>
                <p className="text-xs text-slate-400">
                  {isTamil ? "மூத்த நகர்ப்புற சுகாதார ஊழியர், வார்டு 4" : "Senior Urban Health Worker, Sector 4"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 italic">
              {isTamil
                ? '"அவசர சிகிச்சைப் பிரிவில் நோயாளிகளின் தீவிரத்தை முன்கூட்டியே AI வரிசைப்படுத்துவது மருத்துவர்களாகிய எங்களுக்கு மிக முக்கிய நேரத்தை மிச்சப்படுத்துகிறது."'
                : '"The AI triage reports sent directly to my doctor dashboard save critical minutes during emergency queue evaluation at our City Multi-Specialty Hospital."'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-500 font-bold flex items-center justify-center">
                DR
              </div>
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                  {isTamil ? "டாக்டர் ராஜேஷ் வர்மா, MD" : "Dr. Rajesh Verma, MD"}
                </h5>
                <p className="text-xs text-slate-400">
                  {isTamil ? "தலைமை மருத்துவ அலுவலர், அரசு பொது மருத்துவமனை" : "Chief Medical Officer, City General Hospital"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
            {isTamil ? "அடிக்கடி கேட்கப்படும் கேள்விகள்" : "Frequently Asked Questions"}
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            {isTamil ? "நீங்கள் தெரிந்து கொள்ள வேண்டியவை" : "Everything You Need to Know"}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-md"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-900 dark:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERACTIVE SYSTEM DEMO & TOUR MODAL */}
      <DemoTourModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onLaunchChecker={() => {
          setDemoModalOpen(false);
          onStart();
        }}
        onExploreML={() => {
          setDemoModalOpen(false);
          onNavigateTab("ml_datasets");
        }}
      />

    </div>
  );
};
