import React, { useState } from "react";
import { MOCK_HEALTH_TIPS } from "../data/mockData";
import { useLanguage } from "../context/LanguageContext";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import {
  Volume2,
  VolumeX,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  Square,
  Activity,
  HeartPulse,
  Droplets,
  Bug,
  Baby,
  Apple
} from "lucide-react";

const TAMIL_HEALTH_TIPS: Record<string, { title: string; summary: string; steps: string[] }> = {
  t1: {
    title: "டெங்கு & கொசுக்களால் பரவும் நோய்களைத் தடுக்கும் முறைகள்",
    summary: "ஏசி தட்டுகள், பூந்தொட்டிகள் மற்றும் மேல்நிலைத் தொட்டிகளில் கொசுக்கள் உற்பத்தியாவதைத் தடுக்கும் எளிய வழிகள்.",
    steps: [
      "பால்கனி மற்றும் மொட்டை மாடியில் தேங்கும் நீரை வாரம் ஒருமுறை அகற்றுங்கள்.",
      "காய்ச்சலுடன் மூட்டுவலி ஏற்பட்டால் தாமதிக்காமல் உடனே இரத்தப் பரிசோதனை செய்யுங்கள்."
    ]
  },
  t2: {
    title: "பாதுகாப்பான குடிநீர் & உணவுக் கட்டுப்பாடு",
    summary: "டைபாய்டு மற்றும் வயிற்றுப்போக்கு நோய்களைத் தவிர்க்க காய்ச்சி வடிகட்டிய நீரைக் குடிக்கவும்.",
    steps: [
      "உணவருந்துவதற்கு முன் கைகளை சோப்பினால் நன்றாகக் கழுவவும்.",
      "வயிற்றுப்போக்கு ஏற்பட்டால் உடனே ORS உப்பு-சர்க்கரைக் கரைசலைப் பருகவும்."
    ]
  },
  t3: {
    title: "உயர் இரத்த அழுத்தம் & மன அழுத்த மேலாண்மை",
    summary: "அன்றாட வேலைப்பளு மற்றும் மன அழுத்தத்தைக் குறைத்து இதய ஆரோக்கியத்தைப் பேணுங்கள்.",
    steps: [
      "உணவில் உப்பின் அளவைக் குறைத்து, தினசரி 30 நிமிடம் உடற்பயிற்சி செய்யுங்கள்.",
      "மருத்துவரின் ஆலோசனையின்றி இரத்த அழுத்த மருந்துகளை நிறுத்தக் கூடாது."
    ]
  },
  t4: {
    title: "கர்ப்பிணிப் பெண்கள் நலம் & சத்துணவு முறை",
    summary: "இரத்த சோகை மற்றும் சத்துக் குறைபாட்டைத் தவிர்க்க இரும்புச்சத்து மாத்திரைகள் மற்றும் ஆரோக்கிய உணவு.",
    steps: [
      "அருகிலுள்ள நகர்ப்புற தாய்-சேய் நல மையத்தில் உங்கள் பெயரைப் பதிவு செய்யுங்கள்.",
      "மருத்துவரின் கண்காணிப்பில் பிரசவத்தை முன்கூட்டியே திட்டமிடுங்கள்."
    ]
  },
  t5: {
    title: "நீரிழிவு நோய் ஆரம்பக் கணிப்பு & கட்டுப்பாட்டு முறைகள்",
    summary: "அடிக்கடி சிறுநீர் கழித்தல், அதீத சோர்வு மற்றும் ஆறாத காயங்களை அலட்சியம் செய்யாதீர்கள்.",
    steps: [
      "ஆண்டுதோறும் இரத்த சர்க்கரை அளவை (HbA1c) பரிசோதனை செய்யுங்கள்.",
      "தினசரி குறைந்தது 8000 அடிகள் நடைப்பயிற்சி மேற்கொண்டு சுறுசுறுப்பாக இருங்கள்."
    ]
  },
  t6: {
    title: "மகளிர் இரத்த சோகை தடுப்பு & வைட்டமின் ஊட்டச்சத்து",
    summary: "முருங்கைக்கீரை, பேரீச்சம்பழம், பருப்பு வகைகள் மூலம் ஹீமோகுளோபின் அளவை அதிகரிக்கவும்.",
    steps: [
      "இரும்புச்சத்து நிறைந்த கீரைகள் மற்றும் தானியங்களை உணவில் தவறாமல் சேர்க்கவும்.",
      "தலைசுற்றல், அதீத சோர்வு இருந்தால் உடனே ஹீமோகுளோபின் அளவை சோதிக்கவும்."
    ]
  }
};

export const HealthTips: React.FC = () => {
  const { isTamil } = useLanguage();
  const { speak, stop, pause, resume, isSpeaking, isPaused } = useTextToSpeech();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const categories = [
    { key: "All", labelEn: "All", labelTa: "அனைத்தும்" },
    { key: "Malaria", labelEn: "Malaria", labelTa: "மலேரியா" },
    { key: "Dengue", labelEn: "Dengue", labelTa: "டெங்கு" },
    { key: "Fever", labelEn: "Fever", labelTa: "காய்ச்சல்" },
    { key: "Hypertension", labelEn: "Hypertension", labelTa: "இரத்த அழுத்தம்" },
    { key: "Pregnancy", labelEn: "Pregnancy", labelTa: "கர்ப்பகால நலம்" },
    { key: "Diabetes", labelEn: "Diabetes", labelTa: "நீரிழிவு" },
    { key: "Nutrition", labelEn: "Nutrition", labelTa: "சத்துணவு" }
  ];

  const filteredTips = activeCategory === "All"
    ? MOCK_HEALTH_TIPS
    : MOCK_HEALTH_TIPS.filter((t) => t.category === activeCategory);

  const handleAudioNarration = (tipId: string, title: string, summary: string, steps: string[]) => {
    if (playingAudioId === tipId && isSpeaking) {
      stop();
      setPlayingAudioId(null);
      return;
    }

    const narrationText = isTamil
      ? `சுகாதார வழிகாட்டல்: ${title}. விளக்கம்: ${summary}. முக்கிய தடுப்பு நடவடிக்கைகள்: ${steps.join(". ")}. நலமே நமது முதல் செல்வம்.`
      : `Health Advisory: ${title}. Overview: ${summary}. Recommended prevention steps: ${steps.join(". ")}.`;

    setPlayingAudioId(tipId);
    speak(narrationText, {
      lang: isTamil ? "ta-IN" : "en-US",
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null),
    });
  };

  const handleReadTopTips = () => {
    if (isSpeaking && playingAudioId === "top_overview") {
      stop();
      setPlayingAudioId(null);
      return;
    }

    const textToRead = isTamil
      ? "வணக்கம்! நகர்ப்புற சுகாதார முன்னெச்சரிக்கை வழிகாட்டி. மழைக்காலங்களில் காய்ச்சி வடிகட்டிய நீரைக் குடிக்கவும். தேங்கிய நீரை அகற்றி டெங்கு கொசுக்கள் உற்பத்தியாவதைத் தடுக்கவும். இரத்த அழுத்தம் மற்றும் சர்க்கரை அளவை பரிசோதித்து நலம் காப்போம்."
      : "Welcome to MediSense Urban Health Guidelines. Drink boiled and purified water during monsoons. Prevent mosquito breeding in stagnant water. Monitor blood pressure and blood sugar regularly.";

    setPlayingAudioId("top_overview");
    speak(textToRead, {
      lang: isTamil ? "ta-IN" : "en-US",
      onEnd: () => setPlayingAudioId(null),
      onError: () => setPlayingAudioId(null),
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 animate-pulse" />
          {isTamil ? "தடுப்பு சுகாதார நூலகம்" : "Preventive Healthcare Library"}
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          {isTamil ? "நகர்ப்புற சுகாதாரக் குறிப்புகள் & நோய் தடுப்பு" : "Urban Health Tips & Disease Prevention"}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {isTamil
            ? "Web Speech API மூலம் தமிழில் குரல் வழிகாட்டலைக் கேளுங்கள் அல்லது நோய்த்தடுப்பு வழிகாட்டுதல்களைப் படியுங்கள்."
            : "Listen to Web Speech API audio narrations in your regional language or read preventive health guidelines."}
        </p>

        {/* Global Overview Audio Button */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleReadTopTips}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg cursor-pointer ${
              playingAudioId === "top_overview" && isSpeaking
                ? "bg-rose-500 text-white animate-pulse shadow-rose-500/30"
                : "bg-gradient-to-r from-[#00C853] via-[#00BCD4] to-[#1E3A8A] text-slate-950 hover:scale-105 shadow-emerald-500/20"
            }`}
          >
            {playingAudioId === "top_overview" && isSpeaking ? (
              <>
                <Square className="w-4 h-4 fill-white" />
                <span>{isTamil ? "குரல் வழிகாட்டலை நிறுத்து" : "Stop Overview Audio"}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>
                  {isTamil
                    ? "பொது சுகாதார சுருக்கத்தை தமிழில் கேளுங்கள் (Audio)"
                    : "Listen to Health Overview in English (Audio)"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat.key
                ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 shadow-lg shadow-emerald-500/20 scale-105"
                : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500"
            }`}
          >
            {isTamil ? cat.labelTa : cat.labelEn}
          </button>
        ))}
      </div>

      {/* Tip Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTips.map((tip) => {
          const isPlaying = playingAudioId === tip.id && isSpeaking;
          const tamilData = TAMIL_HEALTH_TIPS[tip.id];
          const displayTitle = isTamil && tamilData ? tamilData.title : tip.title;
          const displaySummary = isTamil && tamilData ? tamilData.summary : tip.summary;
          const displaySteps = isTamil && tamilData ? tamilData.steps : tip.preventionSteps;

          return (
            <div
              key={tip.id}
              className={`p-6 rounded-3xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border transition-all flex flex-col justify-between space-y-4 ${
                isPlaying
                  ? "border-[#00BCD4] shadow-2xl ring-2 ring-cyan-400/40"
                  : "border-slate-200 dark:border-slate-800 shadow-xl hover:border-emerald-500"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-bold uppercase tracking-wider">
                    {tip.category}
                  </span>
                  
                  {/* Audio Narrator Button */}
                  <button
                    onClick={() => handleAudioNarration(tip.id, displayTitle, displaySummary, displaySteps)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isPlaying
                        ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-cyan-500 border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-white" />
                        <span>{isTamil ? "நிறுத்துக" : "Stop"}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3.5 h-3.5 text-cyan-500" />
                        <span>
                          {isTamil ? "தமிழில் கேட்க" : "Listen"} ({tip.audioDuration})
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {/* Animated Equalizer Wave when playing this tip */}
                {isPlaying && (
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-semibold">
                    <span className="w-1.5 h-3.5 bg-cyan-500 animate-[pulse_0.4s_infinite]"></span>
                    <span className="w-1.5 h-5 bg-emerald-500 animate-[pulse_0.6s_infinite]"></span>
                    <span className="w-1.5 h-2.5 bg-blue-500 animate-[pulse_0.5s_infinite]"></span>
                    <span className="ml-1 text-[11px]">
                      {isTamil ? "குரல் வழி வாசிக்கப்படுகிறது (ta-IN)..." : "Reading aloud..."}
                    </span>
                  </div>
                )}

                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {displayTitle}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {displaySummary}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">
                    {isTamil ? "முக்கிய தடுப்பு நடவடிக்கைகள்" : "Key Action Steps"}
                  </span>
                  {displaySteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
