import { useState, useEffect, useCallback, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Helper to strip markdown, special characters and clean up text for speech synthesis
export function cleanTextForSpeech(text: string): string {
  if (!text) return "";
  return text
    .replace(/[*_#`~[\]()<>]/g, " ") // remove markdown characters
    .replace(/https?:\/\/\S+/g, "") // remove URLs
    .replace(/SOS\s+108/gi, "அவசர எண் நூற்று எட்டு") // Tamil friendly emergency text
    .replace(/108/g, "108")
    .replace(/\s+/g, " ")
    .trim();
}

export function useTextToSpeech() {
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setSupported(true);

      const updateVoices = () => {
        try {
          const availableVoices = window.speechSynthesis.getVoices();
          setVoices(availableVoices);
        } catch (e) {
          console.warn("Could not retrieve voices:", e);
        }
      };

      updateVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = updateVoices;
      }

      // Cleanup when unmounting
      return () => {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {
          // ignore
        }
      };
    } else {
      setSupported(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        console.warn("Speech synthesis cancel error:", e);
      }
      setIsSpeaking(false);
      setIsPaused(false);
    }
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && isSpeaking) {
      try {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } catch (e) {
        console.warn("Speech synthesis pause error:", e);
      }
    }
  }, [isSpeaking]);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && isPaused) {
      try {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } catch (e) {
        console.warn("Speech synthesis resume error:", e);
      }
    }
  }, [isPaused]);

  const speak = useCallback(
    (rawText: string, options?: SpeechOptions) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        console.warn("Web Speech API is not supported in this browser.");
        return;
      }

      const text = cleanTextForSpeech(rawText);
      if (!text) return;

      // Cancel previous playback
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }

      // Determine target language code
      const targetLang = options?.lang || (language === "ta" ? "ta-IN" : language === "hi" ? "hi-IN" : "en-US");

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = targetLang;
      utterance.rate = options?.rate ?? (targetLang.startsWith("ta") ? 0.95 : 1.0); // slightly slower rate for crisp Tamil phonemes
      utterance.pitch = options?.pitch ?? 1.0;

      // Select matching voice
      const allVoices = window.speechSynthesis.getVoices();
      if (allVoices && allVoices.length > 0) {
        // Look for matching language voice (e.g. ta-IN or containing "ta")
        let matchedVoice = allVoices.find(
          (v) => v.lang.toLowerCase() === targetLang.toLowerCase() || v.lang.toLowerCase().startsWith(targetLang.slice(0, 2).toLowerCase())
        );

        // Specific search for Tamil voice names
        if (targetLang.startsWith("ta")) {
          const tamilVoice = allVoices.find(
            (v) =>
              v.name.toLowerCase().includes("tamil") ||
              v.lang.toLowerCase().includes("ta-in") ||
              v.lang.toLowerCase().includes("ta_in")
          );
          if (tamilVoice) {
            matchedVoice = tamilVoice;
          }
        }

        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        currentUtteranceRef.current = null;
        if (options?.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        console.warn("Speech synthesis utterance error:", e);
        setIsSpeaking(false);
        setIsPaused(false);
        currentUtteranceRef.current = null;
        if (options?.onError) options.onError(e);
      };

      currentUtteranceRef.current = utterance;
      try {
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error("speechSynthesis.speak failed:", err);
        setIsSpeaking(false);
      }
    },
    [language]
  );

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    supported,
    voices,
  };
}
