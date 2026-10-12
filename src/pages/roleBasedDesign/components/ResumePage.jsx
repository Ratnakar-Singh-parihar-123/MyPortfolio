import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FileText,
  Download,
  ExternalLink,
  Printer,
  Layers,
  Code2,
  Server,
  Smartphone,
  Coffee,
  Check,
  FileWarning,
} from "lucide-react";
import { RESUMES } from "../../../data/resumes";

/* =========================================================
   Maps
========================================================= */
const ICONS = { Layers, Code2, Server, Smartphone, Coffee };

/* =========================================================
   Page
========================================================= */
const ResumePage = () => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(RESUMES[0]?.id);
  const [viewerKey, setViewerKey] = useState(0);

  const active = useMemo(
    () => RESUMES.find((r) => r.id === activeId) || RESUMES[0],
    [activeId],
  );

  if (!active) {
    return (
      <div className="p-12 text-center border border-dashed rounded-2xl border-slate-200 dark:border-slate-800">
        <FileWarning size={26} className="mx-auto text-slate-400" />
        <p className="mt-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          No resumes configured
        </p>
      </div>
    );
  }

  const Icon = ICONS[active.icon] || FileText;

  const handleSelect = (id) => {
    setActiveId(id);
    setViewerKey((k) => k + 1);
  };

  const handlePrint = () => {
    const w = window.open(active.file, "_blank");
    if (w) {
      w.addEventListener("load", () => {
        try {
          w.print();
        } catch {
          /* ignore */
        }
      });
    }
  };

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* ===================================================
          HEADER — clean, one line
      =================================================== */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
            Resume center
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            Role-based Resumes
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            Pick the version that fits your role — preview or download.
          </p>
        </div>

        <a
          href={active.file}
          download={active.fileName}
          className="inline-flex h-10 items-center gap-2 self-start rounded-xl bg-indigo-600 px-4 text-[12.5px] font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:scale-[0.98] sm:self-auto"
        >
          <Download size={14} />
          Download PDF
        </a>
      </div>

      {/* ===================================================
          ROLE TABS — clean pills
      =================================================== */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {RESUMES.map((r) => {
          const RIcon = ICONS[r.icon] || FileText;
          const isActive = r.id === active.id;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelect(r.id)}
              aria-pressed={isActive}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition ${
                isActive
                  ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:text-white"
              }`}
            >
              <RIcon size={14} />
              <span className="whitespace-nowrap">{r.title}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================
          MAIN GRID
      =================================================== */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        {/* ---------- PDF PREVIEW ---------- */}
        <motion.section
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-950/60"
        >
          {/* thin toolbar */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-900">
            <div className="flex items-center min-w-0 gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 text-indigo-600 rounded-lg bg-indigo-500/10 shrink-0 dark:text-indigo-300">
                <Icon size={15} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">
                  {active.title}
                </p>
                <p className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                  {active.fileName}
                </p>
              </div>
            </div>

            <div className="items-center hidden gap-1 sm:flex">
              <a
                href={active.file}
                target="_blank"
                rel="noopener noreferrer"
                title="Open in new tab"
                className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <ExternalLink size={14} />
              </a>
              <button
                type="button"
                onClick={handlePrint}
                title="Print"
                className="flex items-center justify-center w-8 h-8 transition rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Printer size={14} />
              </button>
            </div>
          </div>

          {/* iframe */}
          <div className="bg-slate-50 dark:bg-slate-900/40">
            <iframe
              key={viewerKey}
              src={`${active.file}#view=FitH`}
              title={active.title}
              className="w-full border-0 bg-white h-[70vh] min-h-[500px] dark:bg-slate-950 sm:h-[78vh]"
            />
          </div>
        </motion.section>

        {/* ---------- SIDEBAR ---------- */}
        <aside className="space-y-4">
          {/* About */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-950/60">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
              About this version
            </h2>

            <p className="mt-3 text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
              {active.description}
            </p>

            {/* highlights */}
            {active.highlights?.length > 0 && (
              <ul className="pt-4 mt-5 space-y-2.5 border-t border-slate-100 dark:border-slate-900">
                {active.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <Check size={10} strokeWidth={3} />
                    </span>
                    <span className="text-[12.5px] leading-relaxed text-slate-600 dark:text-slate-400">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* tech */}
            {active.tech?.length > 0 && (
              <div className="pt-4 mt-5 border-t border-slate-100 dark:border-slate-900">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
                  Tech stack
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {active.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-2 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-5 bg-white border shadow-sm rounded-2xl border-slate-200/80 dark:border-slate-800/80 dark:bg-slate-950/60">
            <h2 className="text-[13px] font-bold uppercase tracking-[0.1em] text-slate-400 dark:text-slate-500">
              Actions
            </h2>

            <div className="mt-4 space-y-2">
              <a
                href={active.file}
                download={active.fileName}
                className="flex items-center justify-center w-full h-10 gap-2 text-[12.5px] font-semibold text-white transition bg-indigo-600 rounded-xl hover:bg-indigo-700"
              >
                <Download size={14} />
                Download PDF
              </a>
              <a
                href={active.file}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-10 gap-2 text-[12.5px] font-semibold transition border rounded-xl border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900/60"
              >
                <ExternalLink size={14} />
                Open in new tab
              </a>
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center w-full h-10 gap-2 text-[12.5px] font-semibold transition border rounded-xl border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900/60"
              >
                <Printer size={14} />
                Print
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ===================================================
          MOBILE BOTTOM BAR
      =================================================== */}
      <div className="sticky bottom-0 z-10 flex items-center gap-2 py-3 border-t border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90 lg:hidden">
        <a
          href={active.file}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center flex-1 h-10 gap-1.5 text-[12px] font-semibold transition border rounded-xl border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
        >
          <ExternalLink size={13} />
          Open
        </a>
        <a
          href={active.file}
          download={active.fileName}
          className="flex items-center justify-center h-10 gap-1.5 text-[12px] font-semibold text-white transition bg-indigo-600 rounded-xl flex-[1.5] hover:bg-indigo-700"
        >
          <Download size={13} />
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default ResumePage;
