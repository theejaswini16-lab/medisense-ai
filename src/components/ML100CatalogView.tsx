import React, { useState, useMemo } from "react";
import { DATASETS_100, CatalogDataset } from "../data/ml100Datasets";
import {
  Database,
  Search,
  Download,
  Filter,
  Layers,
  Cpu,
  BrainCircuit,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FileCode
} from "lucide-react";

interface ML100CatalogViewProps {
  onSelectDatasetForInspection?: (datasetName: string) => void;
}

export const ML100CatalogView: React.FC<ML100CatalogViewProps> = ({
  onSelectDatasetForInspection
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedModality, setSelectedModality] = useState<string>("all");
  const [selectedDatasetModal, setSelectedDatasetModal] = useState<CatalogDataset | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const categories = [
    { id: "all", label: "All Specialities" },
    { id: "Dermatology", label: "Dermatology" },
    { id: "Radiology & Imaging", label: "Radiology & Imaging" },
    { id: "Tabular Diagnostics", label: "Tabular EHR" },
    { id: "Cardiology & ECG", label: "Cardiology & ECG" },
    { id: "Oncology & Pathology", label: "Oncology & Pathology" },
    { id: "Neurology & Brain", label: "Neurology & Brain" },
    { id: "Pulmonology", label: "Pulmonology" },
    { id: "Infectious Diseases", label: "Infectious Diseases" },
    { id: "Emergency & ICU", label: "Emergency & ICU" },
    { id: "Endocrinology", label: "Endocrinology" },
    { id: "Ophthalmology", label: "Ophthalmology" },
    { id: "Genomics & Bio", label: "Genomics & Bio" }
  ];

  const modalities = [
    { id: "all", label: "All Modalities" },
    { id: "Deep Learning (Vision)", label: "Deep Learning (Vision)" },
    { id: "Machine Learning (Tabular)", label: "Machine Learning (Tabular)" },
    { id: "Deep Learning (Signal/ECG)", label: "Signals & ECG" },
    { id: "Time-Series", label: "Time-Series" },
    { id: "Genomics / Graph", label: "Genomics / Graph" }
  ];

  const filteredDatasets = useMemo(() => {
    return DATASETS_100.filter((item) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        item.name.toLowerCase().includes(q) ||
        item.shortName.toLowerCase().includes(q) ||
        item.target.toLowerCase().includes(q) ||
        item.bestModel.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesModality =
        selectedModality === "all" || item.modality.includes(selectedModality);

      return matchesSearch && matchesCategory && matchesModality;
    });
  }, [searchQuery, selectedCategory, selectedModality]);

  const totalPages = Math.ceil(filteredDatasets.length / itemsPerPage);
  const pagedDatasets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDatasets.slice(start, start + itemsPerPage);
  }, [filteredDatasets, currentPage]);

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "ShortName", "Category", "Modality", "Samples", "Features", "Target", "BestModel", "Benchmark", "Source"];
    const rows = filteredDatasets.map((d) => [
      d.id,
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.shortName}"`,
      `"${d.category}"`,
      `"${d.modality}"`,
      `"${d.samples}"`,
      `"${d.features}"`,
      `"${d.target.replace(/"/g, '""')}"`,
      `"${d.bestModel}"`,
      `"${d.benchmark}"`,
      `"${d.source}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `medisense_100_ml_datasets_catalog.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredDatasets, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `medisense_100_ml_datasets_catalog.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              100 Machine Learning & Deep Learning Datasets Catalog
            </h2>
            <p className="text-xs text-slate-400">
              Verified clinical benchmark repositories across 12 medical disciplines with benchmark architectures and performance standards.
            </p>
          </div>

          {/* Export Catalog Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Download 100 Datasets as CSV"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Export CSV ({filteredDatasets.length})
            </button>
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Download 100 Datasets as JSON"
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" /> Export JSON
            </button>
          </div>
        </div>

        {/* Filters Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 border-t border-slate-800/80">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by dataset name, disease, algorithm (e.g. ResNet, Melanoma, Chest X-ray)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>

          {/* Speciality Category Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label} {c.id === "all" ? `(${DATASETS_100.length})` : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Modality Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedModality}
              onChange={(e) => {
                setSelectedModality(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-all"
            >
              {modalities.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Pills for Desktop */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-lg whitespace-nowrap transition-all font-medium ${
                selectedCategory === cat.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-400">
        <div>
          Showing <span className="font-bold text-white">{pagedDatasets.length}</span> of{" "}
          <span className="font-bold text-cyan-400">{filteredDatasets.length}</span> datasets{" "}
          {filteredDatasets.length < DATASETS_100.length && `(filtered from 100)`}
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="p-1 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-300"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="p-1 rounded-lg bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-300"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Datasets 100 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pagedDatasets.map((ds) => (
          <div
            key={ds.id}
            className="group bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-cyan-500/5 relative overflow-hidden"
          >
            {/* Top Bar with ID badge and Modality */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  #{String(ds.id).padStart(3, "0")}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-slate-300 truncate max-w-[160px]">
                  {ds.category}
                </span>
              </div>

              {/* Title & Short Name */}
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {ds.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400">
                  {ds.shortName}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                {ds.description}
              </p>

              {/* Target Disease */}
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                  Target Diagnostic Outcome:
                </span>
                <span className="text-xs font-semibold text-emerald-300 block line-clamp-1">
                  {ds.target}
                </span>
              </div>

              {/* Specs & Performance */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Samples</span>
                  <span className="font-mono font-bold text-slate-200">{ds.samples}</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Benchmark</span>
                  <span className="font-mono font-bold text-purple-300">{ds.benchmark}</span>
                </div>
              </div>

              <div className="text-[11px] space-y-0.5 pt-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Primary Model:</span>
                  <span className="font-mono text-cyan-300 font-semibold">{ds.bestModel}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Source:</span>
                  <span className="text-slate-300 truncate max-w-[160px]">{ds.source}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedDatasetModal(ds)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <Info className="w-3.5 h-3.5" /> Full Metadata
              </button>
              
              {onSelectDatasetForInspection && (
                <button
                  onClick={() => onSelectDatasetForInspection(ds.name)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" /> Explore
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-xs text-slate-400 font-mono">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 400, behavior: "smooth" });
            }}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 disabled:opacity-40 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Full Metadata Modal */}
      {selectedDatasetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    Dataset #{String(selectedDatasetModal.id).padStart(3, "0")}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 text-slate-300">
                    {selectedDatasetModal.category}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white">
                  {selectedDatasetModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedDatasetModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {selectedDatasetModal.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Modality</span>
                <span className="font-semibold text-white">{selectedDatasetModal.modality}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Samples</span>
                <span className="font-mono font-bold text-cyan-400">{selectedDatasetModal.samples}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Feature Dimensions</span>
                <span className="font-mono font-bold text-emerald-400">{selectedDatasetModal.features}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Best Architecture</span>
                <span className="font-semibold text-purple-300">{selectedDatasetModal.bestModel}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Benchmark Score</span>
                <span className="font-mono font-bold text-emerald-400">{selectedDatasetModal.benchmark}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Source Repository</span>
                <span className="font-medium text-slate-300 truncate block">{selectedDatasetModal.source}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1.5">
              <span className="font-bold text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Target Clinical Indication
              </span>
              <p className="text-slate-200">
                {selectedDatasetModal.target}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDatasetModal(null)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00C853] to-[#00BCD4] text-slate-950 font-black text-xs hover:scale-105 transition-all"
              >
                Close Metadata
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
