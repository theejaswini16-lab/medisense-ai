import React, { useState } from "react";
import {
  Activity,
  Globe,
  Sun,
  Moon,
  Shield,
  Wifi,
  WifiOff,
  User,
  PhoneCall,
  Menu,
  X,
  Stethoscope,
  LayoutDashboard,
  BrainCircuit,
  Database
} from "lucide-react";
import { UserRole, ViewTab, LanguageCode } from "../types";
import { LANGUAGES, TRANSLATIONS } from "../data/mockData";
import { useLanguage } from "../context/LanguageContext";

interface NavbarProps {
  currentTab: ViewTab;
  onNavigate?: (tab: ViewTab) => void;
  setCurrentTab?: (tab: ViewTab) => void;
  userRole: UserRole;
  onSelectRole?: (role: UserRole) => void;
  setUserRole?: (role: UserRole) => void;
  selectedLanguage?: string;
  currentLang?: LanguageCode;
  onLanguageChange?: (lang: string) => void;
  setCurrentLang?: (lang: LanguageCode) => void;
  isDarkMode: boolean;
  onToggleTheme?: () => void;
  setIsDarkMode?: (val: boolean | ((prev: boolean) => boolean)) => void;
  isOffline?: boolean;
  setIsOffline?: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  setCurrentTab,
  userRole,
  onSelectRole,
  setUserRole,
  selectedLanguage,
  currentLang,
  onLanguageChange,
  setCurrentLang,
  isDarkMode,
  onToggleTheme,
  setIsDarkMode,
  isOffline = false,
  setIsOffline,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage, isTamil, toggleTamil } = useLanguage();

  const activeLang = (language || selectedLanguage || currentLang || "en") as LanguageCode;
  const handleNavigate = (tab: ViewTab) => {
    if (onNavigate) onNavigate(tab);
    if (setCurrentTab) setCurrentTab(tab);
  };

  const handleRoleSelect = (role: UserRole) => {
    if (onSelectRole) onSelectRole(role);
    if (setUserRole) setUserRole(role);
  };

  const handleLangChange = (lang: string) => {
    setLanguage(lang as LanguageCode);
    if (onLanguageChange) onLanguageChange(lang);
    if (setCurrentLang) setCurrentLang(lang as LanguageCode);
  };

  const handleThemeToggle = () => {
    if (onToggleTheme) onToggleTheme();
    else if (setIsDarkMode) setIsDarkMode((prev) => !prev);
  };

  const t = TRANSLATIONS[activeLang] || TRANSLATIONS["en"];

  const navLinks: { label: string; tab: ViewTab; icon: React.ReactNode }[] = [
    { label: isTamil ? "முகப்பு" : "Home", tab: "landing", icon: <BrainCircuit className="w-4 h-4" /> },
    { label: isTamil ? "அறிகுறி பரிசோதனை" : (t.symptomChecker || "Symptom Checker"), tab: "symptom_checker", icon: <Activity className="w-4 h-4" /> },
    { label: isTamil ? "ML தரவுகள்" : "ML & Datasets", tab: "ml_datasets", icon: <Database className="w-4 h-4" /> },
    { label: isTamil ? "கட்டுப்பாட்டு அறை" : (t.dashboard || "Dashboard"), tab: "dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: isTamil ? "மருத்துவமனைகள்" : (t.nearbyHospitals || "Hospitals"), tab: "nearby_hospitals", icon: <Stethoscope className="w-4 h-4" /> },
    { label: isTamil ? "நோய் வரைபடம்" : (t.diseaseMap || "Outbreak Map"), tab: "disease_map", icon: <Shield className="w-4 h-4" /> },
    { label: isTamil ? "சுகாதாரக் குறிப்புகள்" : (t.healthTips || "Health Tips"), tab: "health_tips", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 transition-colors duration-300">
      
      {/* Brand & Badge */}
      <div
        onClick={() => handleNavigate("landing")}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#00C853] to-[#00BCD4] rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
          <Activity className="w-5 h-5 text-white animate-pulse" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
          MediSense <span className="text-[#00BCD4] font-black">AI</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
        {navLinks.map((link) => {
          const isActive = currentTab === link.tab;
          return (
            <button
              key={link.tab}
              onClick={() => handleNavigate(link.tab)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Controls & AI Status */}
      <div className="hidden md:flex items-center gap-4">
        
        {/* AI Online Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1 bg-[#00C853]/10 border border-[#00C853]/30 rounded-full">
          <div className="w-2 h-2 bg-[#00C853] rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-[#00C853] uppercase tracking-wider">AI Online</span>
        </div>

        {/* Offline Toggle */}
        {setIsOffline && (
          <button
            onClick={() => setIsOffline((prev) => !prev)}
            title={isOffline ? "Offline Local Cache Mode Active" : "Online Connectivity Active"}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              isOffline
                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                : "bg-[#00BCD4]/10 text-[#00BCD4] border-[#00BCD4]/30"
            }`}
          >
            {isOffline ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
            <span>{isOffline ? "Offline" : "Online"}</span>
          </button>
        )}

        {/* Quick Tamil Toggle Button for Urban Accessibility */}
        <button
          onClick={() => {
            const next = isTamil ? "en" : "ta";
            handleLangChange(next);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
            isTamil
              ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black shadow-emerald-500/20 ring-2 ring-emerald-400"
              : "bg-white/5 border border-white/10 hover:border-[#00C853] text-slate-200 hover:text-white"
          }`}
          title="Switch between Tamil and English"
        >
          <span className="text-sm">🇮🇳</span>
          <span>{isTamil ? "தமிழ் ✓" : "தமிழ்"}</span>
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setLangMenuOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 text-slate-200 border border-white/10 hover:border-[#00BCD4] transition-all"
          >
            <Globe className="w-3.5 h-3.5 text-[#00BCD4]" />
            <span>{LANGUAGES.find((l) => l.code === activeLang)?.nativeName || "English"}</span>
          </button>

          {langMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 py-2 z-50">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Regional Language
              </div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLangChange(lang.code);
                    setLangMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-white/5 transition-colors ${
                    activeLang === lang.code ? "font-bold text-[#00C853]" : "text-slate-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.nativeName}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-xl bg-white/5 text-slate-200 border border-white/10 hover:border-[#00C853] transition-all"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
        </button>

        {/* Emergency SOS Quick Button */}
        <button
          onClick={() => handleNavigate("emergency")}
          className="px-4 py-1.5 bg-[#1E3A8A] hover:bg-[#2563EB] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-blue-900/20"
        >
          <PhoneCall className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>SOS 108</span>
        </button>

        {/* User Role Avatar */}
        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <button
            onClick={() => handleNavigate("role_select")}
            className="w-9 h-9 rounded-full bg-slate-800 border border-white/20 flex items-center justify-center text-xs font-bold text-white hover:border-[#00BCD4] transition-all"
            title={`Current Role: ${userRole}. Click to switch role.`}
          >
            {userRole === "doctor" ? "DR" : userRole === "admin" ? "AD" : "JD"}
          </button>
        </div>

      </div>

      {/* Mobile Menu Button */}
      <div className="flex md:hidden items-center gap-2">
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-xl bg-white/5 text-slate-200 border border-white/10"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="p-2.5 rounded-xl bg-white/5 text-slate-200 border border-white/10"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#020617]/95 border-b border-white/10 px-4 pt-2 pb-6 space-y-3 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                onClick={() => {
                  handleNavigate(link.tab);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                  currentTab === link.tab
                    ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-black font-extrabold"
                    : "bg-white/5 text-slate-300 border border-white/10"
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => handleLangChange(activeLang === "ta" ? "en" : "ta")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeLang === "ta"
                  ? "bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black shadow-md shadow-emerald-500/20"
                  : "bg-white/5 border border-white/10 text-slate-200"
              }`}
            >
              <span>🇮🇳</span>
              <span>{activeLang === "ta" ? "தமிழ் மொழி இயக்கம் (Tamil Active)" : "தமிழுக்கு மாறவும் (Switch to Tamil)"}</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <button
              onClick={() => {
                handleNavigate("emergency");
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-xs text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-rose-400" /> Emergency SOS 108
            </button>
            <button
              onClick={() => {
                handleNavigate("role_select");
                setMobileMenuOpen(false);
              }}
              className="ml-2 px-4 py-2.5 rounded-xl bg-[#00BCD4]/20 text-[#00BCD4] border border-[#00BCD4]/30 font-bold text-xs"
            >
              Switch Role ({userRole})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
