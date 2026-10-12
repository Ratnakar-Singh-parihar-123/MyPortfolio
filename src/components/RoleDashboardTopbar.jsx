import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  ChevronDown,
  Share2,
  Check,
  LayoutDashboard,
  Sparkles,
  Link2,
  CheckCircle2,
} from "lucide-react";

import { ThemeToggle } from "../components/ThemeProvider";
import { ROLES } from "../data/roleDashboard";

const RoleDashboardTopbar = ({ onMenuClick }) => {
  const [isRoleOpen, setIsRoleOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const roleRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeRole = ROLES.find((r) => pathname.startsWith(r.route)) || null;

  /* Close on outside click */
  useEffect(() => {
    if (!isRoleOpen) return;
    const handler = (e) => {
      if (roleRef.current && !roleRef.current.contains(e.target)) {
        setIsRoleOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isRoleOpen]);

  /* Close on escape */
  useEffect(() => {
    if (!isRoleOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIsRoleOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isRoleOpen]);

  /* Close on route change */
  useEffect(() => {
    setIsRoleOpen(false);
  }, [pathname]);

  const handleRoleSelect = (role) => {
    setIsRoleOpen(false);
    navigate(role.route);
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.origin + "/role-dashboard"
        : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Role-Based Portfolio", url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user cancelled — no-op */
    }
  };

  return (
    <header
      className="
        sticky top-0 z-30
        border-b border-slate-200/70 dark:border-slate-800/70
        bg-white/80 dark:bg-slate-950/75
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-white/65
        dark:supports-[backdrop-filter]:bg-slate-950/60
      "
    >
      <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-5 py-5 sm:gap-4 sm:px-7 sm:py-6 lg:px-9">
        {/* ===================== MOBILE MENU ===================== */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open dashboard menu"
          className="flex items-center justify-center transition-all duration-200 border h-9 w-9 rounded-xl border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-white dark:hover:border-slate-700 dark:hover:bg-slate-900 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 lg:hidden"
        >
          <Menu size={18} />
        </button>

        {/* ===================== BREADCRUMB (Desktop) ===================== */}
        <nav
          aria-label="Breadcrumb"
          className="hidden min-w-0 items-center gap-2 text-[12px] sm:flex"
        >
          <Link
            to="/role-dashboard"
            className="
              flex items-center gap-1.5
              text-slate-500 transition-colors
              hover:text-slate-900
              dark:text-slate-500 dark:hover:text-white
            "
          >
            <LayoutDashboard size={13} className="shrink-0" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="font-semibold truncate text-slate-900 dark:text-white">
            Overview
          </span>
        </nav>

        {/* ===================== MOBILE TITLE ===================== */}
        <div className="flex items-center flex-1 min-w-0 gap-2 sm:hidden">
          <span className="text-[13px] font-semibold text-slate-900 dark:text-white">
            Dashboard
          </span>
          {activeRole && (
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                activeRole.accent?.border || "border-slate-200"
              } ${activeRole.accent?.bg || "bg-slate-50"} ${
                activeRole.accent?.text || "text-slate-600"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${
                  activeRole.accent?.dot || "bg-slate-400"
                }`}
              />
              {activeRole.shortTitle}
            </span>
          )}
        </div>

        {/* ===================== RIGHT ACTIONS ===================== */}
        <div className="flex items-center gap-2 ml-auto">
          {/* ---------- ROLE SELECTOR ---------- */}
          <div ref={roleRef} className="relative">
            <button
              type="button"
              onClick={() => setIsRoleOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={isRoleOpen}
              className="
                group flex h-9 items-center gap-2 rounded-xl
                border border-slate-200/80 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                pl-2.5 pr-2
                text-[12px] font-medium
                text-slate-700 dark:text-slate-300
                transition-all duration-200
                hover:border-slate-300 hover:bg-white hover:shadow-sm
                dark:hover:border-slate-700 dark:hover:bg-slate-900
                focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
                max-w-[150px] sm:max-w-[220px]
                active:scale-[0.98]
              "
            >
              {activeRole ? (
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                    activeRole.accent?.bg || "bg-slate-100"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activeRole.accent?.dot || "bg-slate-400"
                    }`}
                  />
                </span>
              ) : (
                <span className="flex items-center justify-center w-5 h-5 rounded-md shrink-0 bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  <Sparkles size={11} />
                </span>
              )}

              <span className="truncate">
                {activeRole ? activeRole.shortTitle : "Switch role"}
              </span>

              <ChevronDown
                size={14}
                className={`
                  shrink-0 text-slate-400 dark:text-slate-500
                  transition-transform duration-300
                  ${isRoleOpen ? "rotate-180" : "group-hover:translate-y-0.5"}
                `}
              />
            </button>

            {/* ---------- DROPDOWN ---------- */}
            <AnimatePresence>
              {isRoleOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{
                    duration: 0.18,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  role="listbox"
                  className="absolute right-0 z-50 mt-2 overflow-hidden border shadow-2xl w-72 rounded-2xl border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-black/10 dark:shadow-black/40"
                >
                  {/* Header */}
                  <div className="border-b border-slate-100 dark:border-slate-900 px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 text-indigo-500 rounded-lg bg-indigo-500/10">
                        <Sparkles size={12} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                          Choose a role profile
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {ROLES.length} tailored profiles available
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Options */}
                  <div className="max-h-[60vh] overflow-y-auto p-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {ROLES.map((role) => {
                      const selected = activeRole?.id === role.id;
                      return (
                        <button
                          key={role.id}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => handleRoleSelect(role)}
                          className={`
                            group/opt relative flex w-full items-center gap-2.5
                            rounded-xl px-2.5 py-2.5 text-left text-[12px]
                            transition-all duration-200
                            ${
                              selected
                                ? "bg-indigo-500/[0.08] text-indigo-700 dark:bg-indigo-400/[0.10] dark:text-indigo-300"
                                : "text-slate-700 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:bg-slate-900/70"
                            }
                            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
                          `}
                        >
                          {/* Left accent */}
                          {selected && (
                            <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500 dark:bg-indigo-400" />
                          )}

                          {/* Icon tile */}
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-transform duration-200 group-hover/opt:scale-105 ${
                              role.accent?.border || "border-slate-200"
                            } ${role.accent?.bg || "bg-slate-50"} ${
                              role.accent?.text || "text-slate-600"
                            }`}
                          >
                            <span
                              className={`h-2 w-2 rounded-full ${
                                role.accent?.dot || "bg-slate-400"
                              }`}
                            />
                          </span>

                          {/* Text */}
                          <span className="flex flex-col flex-1 min-w-0">
                            <span
                              className={`truncate text-[12px] leading-tight ${
                                selected ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {role.title}
                            </span>
                            {role.description && (
                              <span className="mt-0.5 truncate text-[10px] font-normal text-slate-500 dark:text-slate-500">
                                {role.description}
                              </span>
                            )}
                          </span>

                          {/* Checkmark */}
                          {selected && (
                            <span className="flex items-center justify-center w-4 h-4 text-white bg-indigo-500 rounded-full shrink-0">
                              <Check size={11} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ---------- THEME TOGGLE ---------- */}
          <ThemeToggle />

          {/* ---------- SHARE ---------- */}
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share dashboard link"
            className="
              group relative hidden h-9 items-center gap-2 overflow-hidden
              rounded-xl border border-slate-200/80 dark:border-slate-800
              bg-white/70 dark:bg-slate-900/60
              px-3
              text-[12px] font-medium
              text-slate-700 dark:text-slate-300
              transition-all duration-200
              hover:border-slate-300 hover:bg-white hover:shadow-sm
              dark:hover:border-slate-700 dark:hover:bg-slate-900
              focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
              active:scale-[0.98]
              sm:inline-flex
            "
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2 size={14} />
                  <span>Copied!</span>
                </motion.span>
              ) : (
                <motion.span
                  key="share"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex items-center gap-2"
                >
                  <Link2
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-12"
                  />
                  <span>Share</span>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
};

export default RoleDashboardTopbar;
