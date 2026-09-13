import React, { useState, useMemo } from "react";
import { PATIENT_100_RECORDS, PatientMLRecord } from "../data/mlPatientRecords";
import {
  Search,
  Filter,
  Eye,
  FileSpreadsheet,
  Zap,
  ChevronLeft,
  ChevronRight,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sliders
} from "lucide-react";

interface ML100PatientTableViewProps {
  onLoadPatientIntoPlayground: (record: PatientMLRecord) => void;
}

export const ML100PatientTableView: React.FC<ML100PatientTableViewProps> = ({
  onLoadPatientIntoPlayground
}) => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const filteredRecords = useMemo(() => {
    return PATIENT_100_RECORDS.filter((rec) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        rec.id.toLowerCase().includes(q) ||
        rec.predictedDisease.toLowerCase().includes(q) ||
        rec.icdCode.toLowerCase().includes(q) ||
        rec.primaryShapFeature.toLowerCase().includes(q) ||
        rec.wardSector.toLowerCase().includes(q) ||
        rec.symptoms.some((s) => s.toLowerCase().includes(q));

      const matchesRisk =
        riskFilter === "all" || rec.riskLevel.toLowerCase() === riskFilter.toLowerCase();

      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);

  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);
  const pagedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredRecords.slice(start, start + rowsPerPage);
  }, [filteredRecords, page, rowsPerPage]);

  const handleExportCSV = () => {
    const headers = [
      "Record ID",
      "Age",
      "Gender",
      "Temp (°F)",
      "Platelets (k)",
      "SpO2 (%)",
      "Pulse (BPM)",
      "BP",
      "Symptoms",
      "Predicted Disease",
      "Risk Level",
      "Confidence (%)",
      "ICD-10",
      "Primary SHAP Feature",
      "Ward Sector"
    ];
    const rows = filteredRecords.map((r) => [
      r.id,
      r.age,
      r.gender,
      r.temp_f,
      r.platelets,
      r.spo2,
      r.pulse_bpm,
      `"${r.bp}"`,
      `"${r.symptoms.join("; ")}"`,
      `"${r.predictedDisease}"`,
      r.riskLevel,
      r.confidence,
      r.icdCode,
      `"${r.primaryShapFeature}"`,
      `"${r.wardSector}"`
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `medisense_100_patient_ml_records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-slate-800">
      {/* Table Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" /> 100 Patient Machine Learning Records
          </h3>
          <p className="text-xs text-slate-400">
            Inspecting {filteredRecords.length} of 100 verified patient records. Click any row to test live inference in the XGBoost playground.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 100 patient cases..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 w-44 sm:w-56"
            />
          </div>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={(e) => {
              setRiskFilter(e.target.value);
              setPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">All Triage (100)</option>
            <option value="Red">Red (Critical)</option>
            <option value="Yellow">Yellow (Prompt)</option>
            <option value="Green">Green (Mild)</option>
          </select>

          {/* Rows Per Page */}
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(1);
            }}
            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
            <option value={100}>100 / page</option>
          </select>

          {/* Export CSV */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            title="Download 100 Records as CSV"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Export CSV
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 shadow-inner">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
            <tr>
              <th className="p-3">Record ID</th>
              <th className="p-3">Patient Demographics</th>
              <th className="p-3">Clinical Vitals</th>
              <th className="p-3">Presenting Symptoms</th>
              <th className="p-3">Predicted Pathology</th>
              <th className="p-3">Triage Risk</th>
              <th className="p-3">Confidence & SHAP Factor</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 font-mono">
            {pagedData.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                <td className="p-3 text-cyan-400 font-bold whitespace-nowrap">
                  {row.id}
                  <span className="block text-[10px] text-slate-500 font-sans">{row.wardSector}</span>
                </td>
                <td className="p-3 font-sans text-slate-300 whitespace-nowrap">
                  {row.age} yrs • {row.gender === "M" ? "Male" : "Female"}
                </td>
                <td className="p-3 font-mono text-[11px] text-slate-300 whitespace-nowrap">
                  <span className={row.temp_f > 102 ? "text-amber-300 font-bold" : ""}>
                    {row.temp_f}°F
                  </span>{" "}
                  •{" "}
                  <span className={row.platelets < 100 ? "text-rose-400 font-bold" : ""}>
                    Plt: {row.platelets}k
                  </span>{" "}
                  •{" "}
                  <span className={row.spo2 < 93 ? "text-rose-400 font-bold" : ""}>
                    SpO2: {row.spo2}%
                  </span>
                </td>
                <td className="p-3 font-sans text-slate-300 max-w-xs">
                  <div className="flex flex-wrap gap-1">
                    {row.symptoms.slice(0, 3).map((sym, sIdx) => (
                      <span key={sIdx} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-slate-300">
                        {sym}
                      </span>
                    ))}
                    {row.symptoms.length > 3 && (
                      <span className="text-[10px] text-slate-500 font-mono">
                        +{row.symptoms.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 font-sans font-semibold text-white whitespace-nowrap">
                  {row.predictedDisease}
                  <span className="block text-[10px] font-mono text-cyan-400/80 font-normal">
                    ICD-10: {row.icdCode}
                  </span>
                </td>
                <td className="p-3 font-sans whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      row.riskLevel === "Red"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : row.riskLevel === "Yellow"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {row.riskLevel === "Red" ? "Critical (Red)" : row.riskLevel === "Yellow" ? "Prompt (Yellow)" : "Mild (Green)"}
                  </span>
                </td>
                <td className="p-3 font-sans whitespace-nowrap">
                  <span className="font-mono font-bold text-emerald-400">{row.confidence}%</span>
                  <span className="block text-[10px] text-slate-400 font-normal truncate max-w-[160px]" title={row.primaryShapFeature}>
                    {row.primaryShapFeature}
                  </span>
                </td>
                <td className="p-3 text-right whitespace-nowrap">
                  <button
                    onClick={() => onLoadPatientIntoPlayground(row)}
                    className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white text-[11px] font-bold transition-all flex items-center gap-1 ml-auto"
                    title="Load into Live ML Playground"
                  >
                    <Zap className="w-3 h-3 text-cyan-400" /> Test in ML
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 text-xs text-slate-400">
        <div>
          Showing {pagedData.length} of {filteredRecords.length} records (Total: {PATIENT_100_RECORDS.length})
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px]">
              Page {page} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-200"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
