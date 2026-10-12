import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Construction } from "lucide-react";

const ComingSoon = ({ title = "Coming Soon", description }) => (
  <div className="min-h-[60vh] flex items-center justify-center px-2 py-12">
    <div className="max-w-md text-center">
      <div className="flex justify-center mb-6">
        <div className="flex items-center justify-center text-indigo-500 border h-14 w-14 rounded-2xl border-indigo-400/30 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 dark:text-indigo-300">
          <Construction size={22} strokeWidth={1.9} />
        </div>
      </div>

      <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-300">
        <Sparkles size={11} /> Coming soon
      </div>

      <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {description ||
          "This page is part of the role-based portfolio dashboard and will be available soon."}
      </p>

      <div className="flex justify-center mt-6">
        <Link
          to="/role-dashboard"
          className="inline-flex items-center h-10 gap-2 px-4 text-sm font-semibold text-white transition  rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
        >
          <ArrowLeft size={15} /> Back to Overview
        </Link>
      </div>
    </div>
  </div>
);

export default ComingSoon;
