import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTextToSpeech } from "../hooks/useTextToSpeech";
import {
  Send,
  Bot,
  Sparkles,
  Minimize2,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
}

export const FloatingAIChatbot: React.FC = () => {
  const { isTamil } = useLanguage();
  const { speak, stop, isSpeaking } = useTextToSpeech();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [voiceInterimText, setVoiceInterimText] = useState("");
  const [autoSpeakReplies, setAutoSpeakReplies] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "வணக்கம்! நான் மெடிசென்ஸ் AI மருத்துவ உதவியாளர். உங்கள் உடல்நலம் அல்லது நோயறிகுறிகள் குறித்து நீங்கள் தமிழில் கேட்கலாம், நான் முழுமையாக தமிழிலேயே பதிலளிப்பேன்.",
      timestamp: "Just now"
    }
  ]);

  useEffect(() => {
    setMessages([
      {
        id: "1",
        sender: "bot",
        text: isTamil
          ? "வணக்கம்! நான் மெடிசென்ஸ் AI மருத்துவ உதவியாளர். உங்கள் உடல்நலம் அல்லது நோயறிகுறிகள் குறித்து நீங்கள் தமிழில் கேட்கலாம், நான் முழுமையாக தமிழிலேயே பதிலளிப்பேன்."
          : "Namaste! I am MediSense AI Health Assistant. How can I assist with your health or symptoms today?",
        timestamp: "Just now"
      }
    ]);
  }, [isTamil]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Speech Recognition integration for Tamil & English
  const handleToggleVoiceInput = () => {
    if (isVoiceRecording) {
      setIsVoiceRecording(false);
      setVoiceInterimText("");
      return;
    }

    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      try {
        const SpeechRecognition =
          (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = isTamil ? "ta-IN" : "en-US";
        recognition.continuous = false;
        recognition.interimResults = true;

        setIsVoiceRecording(true);
        setVoiceInterimText(isTamil ? "பேசுங்கள்... உங்கள் குரலைக் கேட்கிறது..." : "Listening to your voice...");

        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join("");

          setVoiceInterimText(transcript);
          setInputMessage(transcript);
        };

        recognition.onerror = () => {
          setIsVoiceRecording(false);
          setVoiceInterimText("");
        };

        recognition.onend = () => {
          setIsVoiceRecording(false);
          setVoiceInterimText("");
        };

        recognition.start();
      } catch (err) {
        fallbackChatVoiceSimulation();
      }
    } else {
      fallbackChatVoiceSimulation();
    }
  };

  const fallbackChatVoiceSimulation = () => {
    setIsVoiceRecording(true);
    const demoVoice = isTamil
      ? "எனக்கு 2 நாளாக காய்ச்சலும் கடும் தலைவலியும் இருக்கு, என்ன செய்ய வேண்டும்?"
      : "I have high fever and severe headache for 2 days, what should I do?";
    setVoiceInterimText(demoVoice);
    setTimeout(() => {
      setInputMessage(demoVoice);
      setIsVoiceRecording(false);
      setVoiceInterimText("");
    }, 2000);
  };

  const handleSpeakBotMessage = (msgId: string, text: string) => {
    if (speakingMessageId === msgId && isSpeaking) {
      stop();
      setSpeakingMessageId(null);
      return;
    }

    setSpeakingMessageId(msgId);
    speak(text, {
      lang: isTamil ? "ta-IN" : "en-US",
      onEnd: () => setSpeakingMessageId(null),
      onError: () => setSpeakingMessageId(null),
    });
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          language: isTamil ? "Tamil" : "English"
        })
      });

      const data = await res.json();
      const botReply = data.reply || (isTamil
        ? "மெடிசென்ஸ் AI உங்கள் கேள்வியைப் பரிசீலித்துள்ளது. காய்ச்சல் அல்லது உடல் சோர்வு இருந்தால் போதிய ஓய்வெடுத்து, அதிக அளவு நீர் மற்றும் ORS அருந்தவும். தீவிர அறிகுறிகள் தென்பட்டால் உடனடியாக அருகிலுள்ள அரசு கிராமப்புற ஆரம்ப சுகாதார நிலையத்தை அணுகவும்."
        : "MediSense AI is evaluating your input. Please consult a qualified doctor at your nearest Rural Health Center for severe symptoms.");

      const botMsgId = (Date.now() + 1).toString();
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);

      // If user enabled auto-speech or is in Tamil mode, automatically narrate response
      if (autoSpeakReplies) {
        setTimeout(() => {
          handleSpeakBotMessage(botMsgId, botReply);
        }, 300);
      }
    } catch (err) {
      const fallbackReply = isTamil
        ? "மெடிசென்ஸ் AI ஆஃப்லைன் வழிகாட்டி: காய்ச்சல் 101°F-க்கு மேல் தொடர்ந்தால், குளிர்ந்த நீர் ஒத்தடம் இடவும், ORS எலக்ட்ரோலைட் நீர் பருகவும். அருகிலுள்ள அரசு பொது மருத்துவமனையை உடனே அணுகவும்."
        : "For fever above 102°F or severe chills, please drink electrolyte fluids and visit City General Hospital immediately.";

      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative p-4 rounded-2xl bg-gradient-to-tr from-[#00C853] via-[#00BCD4] to-[#1E3A8A] text-slate-950 font-bold shadow-2xl shadow-emerald-500/30 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-slate-950" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 absolute -top-1 -right-1 border-2 border-slate-950 animate-ping"></span>
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-950 hidden sm:inline-block">
            {isTamil ? "AI தமிழ் மருத்துவ உதவி" : "Ask MediSense AI"}
          </span>
        </button>
      )}

      {/* Chatbot Window Drawer */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[540px] bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden relative text-white">
          
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#00C853] to-[#00BCD4] p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#00C853]" />
                </div>
              </div>
              <div>
                <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                  {isTamil ? "மெடிசென்ஸ் AI உதவியாளர்" : "MediSense AI Health Assistant"}
                </h4>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{isTamil ? "தமிழில் பதில் & குரல் வழி வாசிப்பு" : "Tamil Voice & Text-to-Speech"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Auto Speak Toggle */}
              <button
                onClick={() => setAutoSpeakReplies(!autoSpeakReplies)}
                className={`p-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  autoSpeakReplies
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                title={isTamil ? "தானியங்கி குரல் வாசிப்பு" : "Auto read aloud"}
              >
                <Radio className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isTamil ? "குரல்" : "Voice"}</span>
              </button>

              <button
                onClick={() => {
                  stop();
                  setIsOpen(false);
                }}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Voice Input Listening Live Feedback */}
          {isVoiceRecording && (
            <div className="bg-rose-500/20 border-b border-rose-500/30 px-3 py-2 text-xs flex items-center gap-2 text-rose-300 animate-pulse">
              <Mic className="w-4 h-4 animate-bounce text-rose-400" />
              <span className="font-semibold">{voiceInterimText || (isTamil ? "தமிழில் பேசுங்கள்..." : "Listening...")}</span>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => {
              const isPlayingThis = speakingMessageId === msg.id && isSpeaking;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "bot" && (
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] p-3 rounded-2xl relative group ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-medium rounded-br-none"
                        : "bg-slate-800/90 text-slate-200 border border-slate-700/60 rounded-bl-none shadow-md"
                    }`}
                  >
                    <p className="leading-relaxed text-[12px]">{msg.text}</p>
                    
                    <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-white/5">
                      <span className="text-[9px] opacity-60 font-mono">{msg.timestamp}</span>

                      {msg.sender === "bot" && (
                        <button
                          onClick={() => handleSpeakBotMessage(msg.id, msg.text)}
                          className={`px-2 py-0.5 rounded text-[10px] flex items-center gap-1 font-bold transition-all cursor-pointer ${
                            isPlayingThis
                              ? "bg-rose-500 text-white animate-pulse"
                              : "text-cyan-400 hover:bg-slate-700/80 bg-slate-900/60 border border-cyan-500/20"
                          }`}
                          title={isTamil ? "தமிழில் குரல் வழியே கேட்க" : "Listen in Tamil"}
                        >
                          {isPlayingThis ? (
                            <>
                              <VolumeX className="w-3 h-3" />
                              <span>{isTamil ? "நிறுத்து" : "Stop"}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3" />
                              <span>{isTamil ? "தமிழில் கேட்க" : "Listen"}</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold p-2.5 bg-slate-800/60 rounded-xl w-fit border border-cyan-500/20 animate-pulse">
                <Sparkles className="w-4 h-4 animate-spin text-[#00C853]" />
                <span>{isTamil ? "மெடிசென்ஸ் AI தமிழில் பதிலளிக்கிறது..." : "MediSense AI is replying..."}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts in Tamil */}
          <div className="px-3 py-2 bg-slate-950/60 border-t border-slate-800 flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => handleSendMessage(isTamil ? "காய்ச்சல் மற்றும் குளிர் நடுக்கத்திற்கு என்ன செய்ய வேண்டும்?" : "What should I do for high fever and chills?")}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-cyan-300 shrink-0 border border-cyan-500/20 cursor-pointer transition-colors"
            >
              {isTamil ? "காய்ச்சல் & குளிர் நடுக்கம்" : "High Fever Tips"}
            </button>
            <button
              onClick={() => handleSendMessage(isTamil ? "டெங்கு காய்ச்சலின் முக்கிய அறிகுறிகள் மற்றும் தடுப்பு முறை என்ன?" : "What are the key symptoms of Dengue and prevention?")}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-emerald-300 shrink-0 border border-emerald-500/20 cursor-pointer transition-colors"
            >
              {isTamil ? "டெங்கு நோய் அறிகுறிகள்" : "Dengue Warning"}
            </button>
            <button
              onClick={() => handleSendMessage(isTamil ? "அருகிலுள்ள கிராமப்புற ஆரம்ப சுகாதார நிலையம் (PHC) எங்கே உள்ளது?" : "Where is the nearest rural hospital?")}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 shrink-0 border border-amber-500/20 cursor-pointer transition-colors"
            >
              {isTamil ? "அருகிலுள்ள மருத்துவமனை" : "Nearest Hospital"}
            </button>
            <button
              onClick={() => handleSendMessage(isTamil ? "வயிற்றுப்போக்கு மற்றும் வாந்திக்கு அவசர முதலுதவி என்ன?" : "First aid for diarrhea and dehydration?")}
              className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-rose-300 shrink-0 border border-rose-500/20 cursor-pointer transition-colors"
            >
              {isTamil ? "வயிற்றுப்போக்கு முதலுதவி" : "Diarrhea First Aid"}
            </button>
          </div>

          {/* Input Box with Tamil Voice Recognition (Mic) */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <button
              onClick={handleToggleVoiceInput}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isVoiceRecording
                  ? "bg-rose-500 text-white animate-bounce shadow-lg shadow-rose-500/50"
                  : "bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700"
              }`}
              title={isTamil ? "குரல் மூலம் தமிழில் பேச தொடங்குங்கள் (Speech Recognition)" : "Speak via microphone"}
            >
              {isVoiceRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder={isTamil ? "தமிழில் கேளுங்கள் அல்லது மைக் தொடவும்..." : "Type or speak in Tamil..."}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-bold disabled:opacity-40 cursor-pointer hover:scale-105 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
