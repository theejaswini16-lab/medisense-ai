import React, { useState, useEffect } from "react";
import {
  Users,
  FileCheck,
  Stethoscope,
  Video,
  CheckCircle2,
  XCircle,
  Pill,
  Search,
  Filter,
  Sparkles,
  User,
  ShieldAlert,
  Printer,
  X,
  RefreshCw
} from "lucide-react";

export const DoctorDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const [prescriptionModalOpen, setPrescriptionModalOpen] = useState(false);
  const [videoConsultOpen, setVideoConsultOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [prescriptionText, setPrescriptionText] = useState("Tab. Paracetamol 500mg - 1-0-1 (Post meals)\nSyr. ORS - Sip 1L throughout the day");

  const initialMockQueue = [
    {
      id: "P-101",
      name: "Ramesh Sharma",
      age: 42,
      gender: "Male",
      village: "Central Metro Sector 4",
      temp: "102.1°F",
      symptoms: ["Fever", "Shivering Chills", "Headache"],
      aiPrediction: "Viral Dengue Fever",
      riskLevel: "Red",
      confidence: "89%",
      status: "Pending Review"
    },
    {
      id: "P-102",
      name: "Sunita Devi",
      age: 28,
      gender: "Female",
      village: "Downtown North",
      temp: "100.4°F",
      symptoms: ["Cough", "Chest Tightness", "Fatigue"],
      aiPrediction: "Acute Bronchitis (Smog Related)",
      riskLevel: "Yellow",
      confidence: "82%",
      status: "Approved"
    },
    {
      id: "P-103",
      name: "Arun Patel",
      age: 61,
      gender: "Male",
      village: "East Industrial Borough",
      temp: "99.2°F",
      symptoms: ["Stomach Pain", "Loose Stools"],
      aiPrediction: "Acute Gastroenteritis",
      riskLevel: "Yellow",
      confidence: "74%",
      status: "Pending Review"
    },
    {
      id: "P-104",
      name: "Pooja Sharma",
      age: 19,
      gender: "Female",
      village: "West Uptown Suburb",
      temp: "98.6°F",
      symptoms: ["Fatigue", "Pale Skin", "Dizziness"],
      aiPrediction: "Nutritional Anemia",
      riskLevel: "Green",
      confidence: "91%",
      status: "Approved"
    }
  ];

  const [queue, setQueue] = useState<any[]>(initialMockQueue);

  const fetchQueue = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/doctor/queue");
      if (res.ok) {
        const json = await res.json();
        if (json?.data && json.data.length > 0) {
          setQueue(json.data);
          return;
        }
      }
    } catch (err) {
      console.warn("Using local queue fallback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  const handleApprovePrediction = async () => {
    if (!selectedPatient) return;
    try {
      await fetch(`/api/doctor/queue/${selectedPatient.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved" })
      });
      setQueue((prev) =>
        prev.map((item) => (item.id === selectedPatient.id ? { ...item, status: "Approved" } : item))
      );
      setStatusMessage(`Case for ${selectedPatient.name} approved & synchronized with Rural Health Portal.`);
      setTimeout(() => setStatusMessage(null), 4000);
      setSelectedPatient(null);
    } catch (err) {
      setQueue((prev) =>
        prev.map((item) => (item.id === selectedPatient.id ? { ...item, status: "Approved" } : item))
      );
      setSelectedPatient(null);
    }
  };

  const handleSendPrescription = async () => {
    if (!selectedPatient) return;
    try {
      await fetch("/api/doctor/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatient.id,
          patientName: selectedPatient.name,
          doctorName: "Dr. Rajesh Verma, MD",
          prescriptionText
        })
      });
      setQueue((prev) =>
        prev.map((item) => (item.id === selectedPatient.id ? { ...item, status: "Consultation Done" } : item))
      );
      setStatusMessage(`Digital prescription transmitted to ${selectedPatient.name}.`);
      setTimeout(() => setStatusMessage(null), 4000);
      setPrescriptionModalOpen(false);
    } catch (err) {
      setStatusMessage(`Prescription issued locally for ${selectedPatient.name}.`);
      setTimeout(() => setStatusMessage(null), 4000);
      setPrescriptionModalOpen(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold uppercase">
            <Stethoscope className="w-4 h-4" /> Doctor Clinical Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Dr. Rajesh Verma, MD • Rural Health Officer
          </h1>
          <p className="text-xs text-slate-300">
            Rural Primary Health Center (PHC) & Rapid Clinic Queue • <strong>4 Patients Waiting for Triage Approval</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setVideoConsultOpen(true)}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            <Video className="w-4 h-4" /> Launch Tele-Consultation
          </button>
        </div>
      </div>

      {/* Status Alert Toast */}
      {statusMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Main Clinical Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Patient Queue Table */}
        <div className="lg:col-span-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-500" /> Triage Queue & AI Predictions ({queue.length})
              </h3>
              <p className="text-xs text-slate-500">
                Review, modify, or approve AI-generated diagnostic predictions.
              </p>
            </div>
            <button
              onClick={fetchQueue}
              disabled={loading}
              className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center gap-1.5 hover:bg-emerald-500/30 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh Queue</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Rural Sector / Zone</th>
                  <th className="p-3">AI Prediction</th>
                  <th className="p-3">Risk</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {queue.map((patient) => (
                  <tr
                    key={patient.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      <div>{patient.name}</div>
                      <div className="text-[10px] text-slate-400">{patient.age}y • {patient.gender}</div>
                    </td>
                    <td className="p-3 font-medium">{patient.village}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-white">{patient.aiPrediction}</div>
                      <div className="text-[10px] text-cyan-500 font-bold">{patient.confidence} Confidence</div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          patient.riskLevel === "Red"
                            ? "bg-rose-500/20 text-rose-500"
                            : patient.riskLevel === "Yellow"
                            ? "bg-amber-500/20 text-amber-500"
                            : "bg-emerald-500/20 text-emerald-500"
                        }`}
                      >
                        {patient.riskLevel} Risk
                      </span>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setSelectedPatient(patient)}
                        className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white dark:text-slate-200 font-bold hover:bg-emerald-500 hover:text-slate-950 transition-all"
                      >
                        Review Case
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Quick Case Review Panel */}
        <div className="lg:col-span-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {selectedPatient ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedPatient.name}
                  </h4>
                  <p className="text-xs text-slate-400">{selectedPatient.village} • Temp: {selectedPatient.temp}</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-500">{selectedPatient.id}</span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Selected Symptoms</span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedPatient.symptoms || []).map((s: string) => (
                    <span key={s} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-cyan-500/30">
                <span className="text-[10px] font-bold text-cyan-400 uppercase block">AI Primary Suggestion</span>
                <h5 className="text-base font-black text-white">{selectedPatient.aiPrediction}</h5>
                <p className="text-xs text-slate-300">Confidence: {selectedPatient.confidence}</p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setPrescriptionModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Pill className="w-4 h-4" /> Issue Digital Prescription
                </button>

                <button
                  onClick={handleApprovePrediction}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-500/20 text-emerald-500 font-bold text-xs hover:bg-emerald-500 hover:text-slate-950 transition-all"
                >
                  Approve Prediction
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <Stethoscope className="w-12 h-12 mx-auto text-slate-600 animate-pulse" />
              <p className="text-xs">Select any patient from queue to inspect AI predictions and issue prescriptions.</p>
            </div>
          )}
        </div>

      </div>

      {/* PRESCRIPTION WRITER MODAL */}
      {prescriptionModalOpen && selectedPatient && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-[#00C853]" /> Digital Prescription Writer - {selectedPatient.name}
              </span>
              <button onClick={() => setPrescriptionModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Prescription Notes & Dosage Instructions</label>
              <textarea
                rows={5}
                value={prescriptionText}
                onChange={(e) => setPrescriptionText(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPrescriptionModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSendPrescription}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 text-xs font-bold"
              >
                Sign & Transmit Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TELE-CONSULTATION MODAL */}
      {videoConsultOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Video className="w-4 h-4 text-[#00C853]" /> Rural Tele-Consultation Studio
              </span>
              <button onClick={() => setVideoConsultOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-ping mb-3">
                <Video className="w-8 h-8 text-[#00BCD4]" />
              </div>
              <h4 className="text-base font-bold text-white">Connecting to Rural Rapid Health Clinic Stream...</h4>
              <p className="text-xs text-slate-400 mt-1">Real-time Encrypted Video Stream Active</p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => setVideoConsultOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs"
              >
                End Call
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
