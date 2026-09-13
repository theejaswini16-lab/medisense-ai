import React, { useState, useEffect } from "react";
import { ViewTab, UserRole, AnalysisReport, PatientVitals } from "./types";
import { MOCK_HISTORY_REPORTS } from "./data/mockData";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { RoleSelectionModal } from "./components/RoleSelectionModal";
import { SymptomChecker } from "./components/SymptomChecker";
import { AIAnalysisLoader } from "./components/AIAnalysisLoader";
import { ResultReport } from "./components/ResultReport";
import { PatientDashboard } from "./components/PatientDashboard";
import { DoctorDashboard } from "./components/DoctorDashboard";
import { AdminDashboard } from "./components/AdminDashboard";
import { NearbyHospitals } from "./components/NearbyHospitals";
import { HealthTips } from "./components/HealthTips";
import { DiseaseSpreadMap } from "./components/DiseaseSpreadMap";
import { ProfileHistory } from "./components/ProfileHistory";
import { EmergencyPage } from "./components/EmergencyPage";
import { FloatingAIChatbot } from "./components/FloatingAIChatbot";
import { MLDatasetHub } from "./components/MLDatasetHub";
import { DemoTourModal } from "./components/DemoTourModal";
import { Footer } from "./components/Footer";
import { WifiOff, Wifi } from "lucide-react";
import { useLanguage } from "./context/LanguageContext";

export function App() {
  const { language, setLanguage } = useLanguage();
  const [currentTab, setCurrentTab] = useState<ViewTab>("landing");
  const [userRole, setUserRole] = useState<UserRole>("patient");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);

  // Active AI Report state
  const [activeReport, setActiveReport] = useState<AnalysisReport | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    "High Fever (>101°F)",
    "Persistent Cough",
  ]);
  const [patientVitals, setPatientVitals] = useState<PatientVitals>({
    name: "Ramesh Sharma",
    age: 42,
    gender: "Male",
    temperature: 101.4,
    bloodPressure: "120/80",
    existingDiseases: "None",
    villageRegion: "Central Metro District, Sector 4",
  });

  // Monitor network status for Rural Offline Mode
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Sync dark mode class on document HTML root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === "doctor") setCurrentTab("doctor_dashboard");
    else if (role === "admin") setCurrentTab("admin_dashboard");
    else setCurrentTab("patient_dashboard");
  };

  const handleAnalysisComplete = (report?: AnalysisReport) => {
    if (report) setActiveReport(report);
    setCurrentTab("result_report");
  };

  const handleReportGenerated = (report: AnalysisReport) => {
    setActiveReport(report);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans relative overflow-x-hidden ${isDarkMode ? "bg-[#020617] text-slate-100 dark" : "bg-slate-50 text-slate-900"}`}>
      
      {/* Ambient Background Radial Blur Gradients from Professional Polish Theme */}
      <div className="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] bg-[#1E3A8A] opacity-20 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="fixed bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#00BCD4] opacity-10 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Rural Offline Sync Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-center text-xs font-black flex items-center justify-center gap-2 sticky top-0 z-50 shadow-lg">
          <WifiOff className="w-4 h-4 animate-bounce" />
          <span>Rural Offline Mode Active — Symptom data saved locally. Syncing when connectivity returns.</span>
        </div>
      )}

      {/* Main Glassmorphism Navbar */}
      <Navbar
        currentTab={currentTab}
        userRole={userRole}
        selectedLanguage={language}
        isDarkMode={isDarkMode}
        onNavigate={setCurrentTab}
        onSelectRole={setUserRole}
        onLanguageChange={(l) => setLanguage(l as any)}
        onToggleTheme={() => setIsDarkMode((prev) => !prev)}
      />

      {/* Main View Router */}
      <main className="min-h-[75vh]">
        
        {currentTab === "landing" && (
          <LandingPage
            onStart={() => setCurrentTab("symptom_checker")}
            onNavigateTab={setCurrentTab}
          />
        )}

        {currentTab === "login" && (
          <LoginPage
            onLoginSuccess={(role) => {
              setUserRole(role);
              setCurrentTab("role_selection");
            }}
          />
        )}

        {currentTab === "role_selection" && (
          <RoleSelectionModal onSelectRole={handleRoleSelect} />
        )}

        {currentTab === "patient_dashboard" && (
          <PatientDashboard
            onNavigateTab={setCurrentTab}
            recentReport={activeReport}
          />
        )}

        {currentTab === "doctor_dashboard" && <DoctorDashboard />}

        {currentTab === "admin_dashboard" && <AdminDashboard />}

        {currentTab === "symptom_checker" && (
          <SymptomChecker
            selectedSymptoms={selectedSymptoms}
            setSelectedSymptoms={setSelectedSymptoms}
            patientVitals={patientVitals}
            setPatientVitals={setPatientVitals}
            onStartAnalysis={(report) => {
              if (report) handleReportGenerated(report);
              setCurrentTab("ai_analysis");
            }}
          />
        )}

        {currentTab === "ai_analysis" && (
          <AIAnalysisLoader
            symptoms={selectedSymptoms}
            patientVitals={patientVitals}
            selectedLanguage={language}
            onComplete={handleAnalysisComplete}
          />
        )}

        {currentTab === "result_report" && (
          <ResultReport
            report={activeReport || MOCK_HISTORY_REPORTS[0]}
            onBackToChecker={() => setCurrentTab("symptom_checker")}
            onBookConsultation={() => setCurrentTab("doctor_dashboard")}
            onFindHospitals={() => setCurrentTab("nearby_hospitals")}
          />
        )}

        {currentTab === "medical_history" && (
          <ProfileHistory
            onSelectReport={(report) => {
              setActiveReport(report);
              setCurrentTab("result_report");
            }}
            onStartNewCheck={() => setCurrentTab("symptom_checker")}
          />
        )}

        {currentTab === "nearby_hospitals" && <NearbyHospitals />}

        {currentTab === "health_tips" && <HealthTips />}

        {currentTab === "disease_map" && <DiseaseSpreadMap />}

        {currentTab === "emergency" && <EmergencyPage />}

        {currentTab === "ml_datasets" && (
          <MLDatasetHub
            onLaunchSymptomChecker={() => setCurrentTab("symptom_checker")}
            onOpenDemoTour={() => setIsDemoModalOpen(true)}
          />
        )}

      </main>

      {/* Global Interactive System Demo Tour Modal */}
      <DemoTourModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onLaunchChecker={() => {
          setIsDemoModalOpen(false);
          setCurrentTab("symptom_checker");
        }}
        onExploreML={() => {
          setIsDemoModalOpen(false);
          setCurrentTab("ml_datasets");
        }}
      />

      {/* Floating AI Assistant Chatbot Widget */}
      <FloatingAIChatbot />

      {/* Footer */}
      <Footer onNavigateTab={setCurrentTab} />

    </div>
  );
}

export default App;
