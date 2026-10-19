// src/components/BookMyCallModal.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  X,
  Clock,
  Video,
  Code2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Globe,
  Loader2,
  AlertCircle,
  ExternalLink,
  Zap,
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  Star,
} from "lucide-react";
import { InlineWidget } from "react-calendly";
import ProfileImg from "../../assets/heroImg/hero.jpeg";

/* =========================================================
   CONFIG
   ========================================================= */

const CALENDLY_LINKS = {
  discovery: "https://calendly.com/ratnakarsinghparihar9399/15min",
  consultation: "https://calendly.com/ratnakarsinghparihar9399/30min",
};

const MEETING_TYPES = {
  discovery: {
    id: "discovery",
    label: "Discovery Call",
    duration: 15,
    icon: Video,
    description: "Intro call — quick project or hiring discussion.",
    bullets: ["Introductions", "Requirements", "Next steps"],
    gradient: "from-indigo-500 to-blue-500",
    ring: "ring-indigo-500/25",
    accentText: "text-indigo-600 dark:text-indigo-400",
    accentBorder: "border-l-indigo-500",
    popular: false,
  },
  consultation: {
    id: "consultation",
    label: "Technical Consultation",
    duration: 30,
    icon: Code2,
    description: "Deep-dive into architecture, code, or tech stack.",
    bullets: ["Tech review", "Architecture", "Problem solving"],
    gradient: "from-purple-500 to-fuchsia-500",
    ring: "ring-purple-500/25",
    accentText: "text-purple-600 dark:text-purple-400",
    accentBorder: "border-l-purple-500",
    popular: true,
  },
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

const BookMyCallModal = ({ isOpen, onClose }) => {
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState("intro");
  const [meetingType, setMeetingType] = useState(null);
  const [isEmbedLoading, setIsEmbedLoading] = useState(true);
  const [embedError, setEmbedError] = useState(null);
  const [loadingText, setLoadingText] = useState("Connecting…");
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  const userTimezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    [],
  );

  /* ---------- Mobile detection ---------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- Reset + sequential reveal ---------- */
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    setMeetingType(null);
    setIsEmbedLoading(true);
    setEmbedError(null);
    setLoadingText("Connecting…");

    if (isMobile) {
      setPhase("booking");
      return;
    }

    setPhase("intro");
    const timer = setTimeout(() => setPhase("booking"), 1000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  /* ---------- Cycle loading text ---------- */
  useEffect(() => {
    if (!isEmbedLoading || !meetingType) return;
    const messages = [
      "Connecting…",
      "Buffering availability…",
      "Waiting for slots…",
    ];
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % messages.length;
      setLoadingText(messages[i]);
    }, 1400);
    return () => clearInterval(id);
  }, [isEmbedLoading, meetingType]);

  /* ---------- Safety timeout ---------- */
  useEffect(() => {
    if (!meetingType || !isEmbedLoading) return;
    const t = setTimeout(() => setIsEmbedLoading(false), 6000);
    return () => clearTimeout(t);
  }, [meetingType, isEmbedLoading]);

  /* ---------- Escape ---------- */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* ---------- Handlers ---------- */
  const handleSelect = (type) => {
    setMeetingType(type);
    setIsEmbedLoading(true);
    setEmbedError(null);
    setLoadingText("Connecting…");
  };

  const handleBack = () => {
    setMeetingType(null);
    setIsEmbedLoading(true);
    setEmbedError(null);
  };

  /* ---------- Derived ---------- */
  const activeMeeting = meetingType ? MEETING_TYPES[meetingType] : null;
  const calendlyUrl = meetingType ? CALENDLY_LINKS[meetingType] : null;

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Book a call"
        >
          {/* Backdrop with subtle radial glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]"
            />
          </motion.div>

          {/* ============ MODAL SHELL ============ */}
          <motion.div
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              maxWidth: isMobile ? "100%" : phase === "booking" ? 860 : 340,
            }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 14 }
            }
            transition={{
              opacity: { duration: 0.25 },
              scale: { type: "spring", stiffness: 320, damping: 32 },
              y: { type: "spring", stiffness: 320, damping: 32 },
              maxWidth: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative flex w-full overflow-hidden
              rounded-2xl border border-slate-200/80 bg-white
              shadow-[0_24px_80px_-24px_rgba(0,0,0,0.6)]
              dark:border-slate-800 dark:bg-slate-900
              flex-col md:flex-row
              h-[88vh] md:h-auto
              max-h-[88vh] md:max-h-[620px]
              min-h-[520px] md:min-h-[580px]
            "
          >
            {/* ==================================================
                PROFILE PANEL (desktop only)
            ================================================== */}
            <aside
              className="
                relative hidden shrink-0 overflow-hidden md:flex md:w-[320px]
                border-r border-slate-200/80
                bg-gradient-to-b from-slate-50 via-white to-slate-50/70
                dark:border-slate-800
                dark:from-slate-950 dark:via-slate-950 dark:to-slate-900
              "
            >
              {/* Ambient glows */}
              <div
                aria-hidden
                className="absolute w-48 h-48 rounded-full pointer-events-none -right-20 -top-20 bg-indigo-500/10 blur-3xl dark:bg-indigo-500/15"
              />
              <div
                aria-hidden
                className="absolute w-48 h-48 rounded-full pointer-events-none -bottom-24 -left-16 bg-purple-500/8 blur-3xl dark:bg-purple-500/12"
              />

              <AnimatePresence mode="wait">
                {phase === "intro" ? (
                  <IntroProfile key="intro" reduceMotion={reduceMotion} />
                ) : (
                  <SidebarProfile
                    key="sidebar"
                    activeMeeting={activeMeeting}
                    userTimezone={userTimezone}
                    reduceMotion={reduceMotion}
                  />
                )}
              </AnimatePresence>
            </aside>

            {/* ==================================================
                MOBILE HEADER
            ================================================== */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 py-2.5 dark:border-slate-800 dark:bg-slate-950 md:hidden">
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="relative h-9 w-9 shrink-0 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                  <img
                    src={ProfileImg}
                    alt="Ratnakar Singh Parihar"
                    className="object-cover w-full h-full rounded-md"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold leading-tight truncate text-slate-900 dark:text-white">
                    Ratnakar Singh Parihar
                  </h4>
                  <p className="mt-0.5 truncate text-[10.5px] font-semibold text-indigo-500">
                    {activeMeeting
                      ? `${activeMeeting.label} · ${activeMeeting.duration}m`
                      : "Book a Call"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg shrink-0 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ==================================================
                BOOKING PANEL
            ================================================== */}
            <AnimatePresence>
              {(isMobile || phase === "booking") && (
                <motion.div
                  initial={isMobile ? false : { opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={isMobile ? undefined : { opacity: 0, x: 40 }}
                  transition={{
                    duration: 0.38,
                    delay: isMobile ? 0 : 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col flex-1 min-w-0 min-h-0 overflow-hidden"
                >
                  {/* Top bar with subtle step dots */}
                  <div className="flex items-center justify-between px-4 py-3 border-b shrink-0 border-slate-200/80 dark:border-slate-800/80">
                    <div className="flex items-center min-w-0 gap-2">
                      {meetingType ? (
                        <>
                          <button
                            onClick={handleBack}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600 transition-all hover:bg-slate-200 hover:-translate-x-0.5 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                            aria-label="Back"
                          >
                            <ArrowLeft className="h-3.5 w-3.5" />
                          </button>
                          <div className="min-w-0">
                            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                              Booking
                            </p>
                            <p className="truncate text-[13px] font-bold text-slate-900 dark:text-white">
                              {activeMeeting.label}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center text-indigo-500 rounded-md h-7 w-7 bg-indigo-500/10 dark:bg-indigo-500/20">
                            <Sparkles className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-500">
                              Book a call
                            </p>
                            <p className="text-[13px] font-semibold text-slate-500 dark:text-slate-400">
                              Pick a meeting type
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Step dots — decorative progress */}
                      <div className="items-center hidden gap-1 sm:flex">
                        <span
                          className={`h-1 w-3 rounded-full transition-all ${
                            !meetingType
                              ? "bg-indigo-500"
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        />
                        <span
                          className={`h-1 w-3 rounded-full transition-all ${
                            meetingType
                              ? "bg-indigo-500"
                              : "bg-slate-200 dark:bg-slate-700"
                          }`}
                        />
                      </div>

                      <button
                        onClick={onClose}
                        className="items-center justify-center hidden transition-colors rounded-md h-7 w-7 text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white md:flex"
                        aria-label="Close"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 min-h-0 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {/* ---- MEETING SELECTION ---- */}
                      {!meetingType && (
                        <motion.div
                          key="selection"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.22 }}
                          className="absolute inset-0 px-5 py-6 overflow-y-auto"
                        >
                          <div className="max-w-md mx-auto space-y-4">
                            {/* Header */}
                            <div>
                              <h2 className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">
                                Choose your meeting
                              </h2>
                              <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500 dark:text-slate-400">
                                Real-time availability · auto timezone · Google
                                Meet link
                              </p>
                            </div>

                            {/* Meeting cards */}
                            <div className="space-y-2.5">
                              {Object.values(MEETING_TYPES).map((m, idx) => {
                                const Icon = m.icon;
                                return (
                                  <motion.button
                                    key={m.id}
                                    type="button"
                                    onClick={() => handleSelect(m.id)}
                                    initial={
                                      reduceMotion
                                        ? false
                                        : { opacity: 0, y: 10 }
                                    }
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                      delay: reduceMotion ? 0 : idx * 0.06,
                                      duration: 0.28,
                                      ease: "easeOut",
                                    }}
                                    className={`
                                      group relative flex w-full items-start gap-3
                                      rounded-xl border border-slate-200 bg-white
                                      border-l-[3px] ${m.accentBorder}
                                      p-3.5 text-left transition-all duration-200
                                      hover:-translate-y-0.5 hover:border-indigo-500/40
                                      hover:shadow-lg hover:shadow-indigo-500/10
                                      focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60
                                      dark:border-slate-700/80 dark:bg-slate-800/40
                                      dark:hover:border-indigo-500/50
                                    `}
                                  >
                                    {/* Popular badge */}
                                    {m.popular && (
                                      <span className="absolute -top-2 right-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 px-2 py-0.5 text-[9px] font-bold text-white shadow-sm">
                                        <Star className="w-2 h-2 fill-white" />
                                        Popular
                                      </span>
                                    )}

                                    <div
                                      className={`
                                        flex h-11 w-11 shrink-0 items-center justify-center
                                        rounded-xl bg-gradient-to-br ${m.gradient}
                                        text-white shadow-sm ring-1 ${m.ring}
                                        transition-transform duration-300
                                        group-hover:scale-105 group-hover:rotate-3
                                      `}
                                    >
                                      <Icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <h4 className="truncate text-[13.5px] font-bold text-slate-900 dark:text-white">
                                          {m.label}
                                        </h4>
                                        <span
                                          className={`
                                            shrink-0 rounded-full bg-gradient-to-r ${m.gradient}/10
                                            px-2 py-0.5 text-[10px] font-bold
                                            ${m.accentText} ring-1 ${m.ring}
                                          `}
                                        >
                                          {m.duration} min
                                        </span>
                                      </div>
                                      <p className="mt-0.5 truncate text-[11.5px] text-slate-500 dark:text-slate-400">
                                        {m.description}
                                      </p>
                                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                        {m.bullets.map((b) => (
                                          <span
                                            key={b}
                                            className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[9.5px] font-semibold text-slate-600 dark:bg-slate-700/60 dark:text-slate-300"
                                          >
                                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                                            {b}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-indigo-500" />
                                  </motion.button>
                                );
                              })}
                            </div>

                            {/* Trust hint */}
                            <motion.div
                              initial={reduceMotion ? false : { opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.3, duration: 0.35 }}
                              className="flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-800/40"
                            >
                              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-500" />
                              <p className="text-[10.5px] leading-snug text-slate-500 dark:text-slate-400">
                                You&apos;ll be asked for your name, email, and a
                                few details before your booking is confirmed.
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}

                      {/* ---- CALENDLY EMBED ---- */}
                      {meetingType && (
                        <motion.div
                          key="embed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.22 }}
                          className="absolute inset-0"
                        >
                          {/* Loading */}
                          {isEmbedLoading && !embedError && (
                            <div
                              aria-live="polite"
                              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white dark:bg-slate-900"
                            >
                              <div className="relative flex items-center justify-center w-16 h-16">
                                {/* Glow */}
                                <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl" />
                                {/* Outer pulse ring */}
                                <motion.div
                                  className="absolute border rounded-full h-14 w-14 border-indigo-500/20"
                                  animate={
                                    reduceMotion
                                      ? {}
                                      : {
                                          scale: [1, 1.12, 1],
                                          opacity: [0.6, 0.2, 0.6],
                                        }
                                  }
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                                {/* Spinning arc */}
                                <div className="absolute w-10 h-10 border-2 border-transparent rounded-full animate-spin border-t-indigo-500 border-r-indigo-500/40" />
                                {/* Center sparkle */}
                                <Sparkles className="absolute h-3.5 w-3.5 text-indigo-500" />
                              </div>

                              <AnimatePresence mode="wait">
                                <motion.p
                                  key={loadingText}
                                  initial={{ opacity: 0, y: 4 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -4 }}
                                  transition={{ duration: 0.25 }}
                                  className="mt-4 text-[13px] font-semibold text-slate-800 dark:text-slate-100"
                                >
                                  {loadingText}
                                </motion.p>
                              </AnimatePresence>

                              <p className="mt-0.5 text-[10.5px] text-slate-400 dark:text-slate-500">
                                This may take a few seconds
                              </p>
                            </div>
                          )}

                          {/* Error */}
                          {embedError && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-5 text-center bg-white dark:bg-slate-900">
                              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 ring-1 ring-red-500/20">
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              </div>
                              <p className="mt-3 text-[13px] font-bold text-slate-900 dark:text-white">
                                Calendar couldn&apos;t load
                              </p>
                              <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                                Connection issue. Try again or open in a new
                                tab.
                              </p>
                              <div className="flex flex-col gap-2 mt-4 sm:flex-row">
                                <button
                                  onClick={() => handleSelect(meetingType)}
                                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-3.5 py-1.5 text-[11.5px] font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
                                >
                                  <Loader2 className="w-3 h-3" />
                                  Try Again
                                </button>
                                {calendlyUrl && (
                                  <a
                                    href={calendlyUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-[11.5px] font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Open in New Tab
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Calendly iframe */}
                          {calendlyUrl && (
                            <div className="absolute inset-0">
                              <InlineWidget
                                url={calendlyUrl}
                                styles={{
                                  height: "100%",
                                  width: "100%",
                                  minWidth: "280px",
                                  minHeight: "520px",
                                }}
                                pageSettings={{
                                  backgroundColor: "ffffff",
                                  hideEventTypeDetails: false,
                                  hideLandingPageDetails: false,
                                  hideGdprBanner: true,
                                  primaryColor: "6366f1",
                                  textColor: "1e293b",
                                }}
                                prefill={{ timezone: userTimezone }}
                                onLoad={() => {
                                  setIsEmbedLoading(false);
                                  setEmbedError(null);
                                }}
                                onError={() => {
                                  setIsEmbedLoading(false);
                                  setEmbedError("Calendly failed to load.");
                                }}
                              />
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* =========================================================
   INTRO PROFILE
   ========================================================= */

const IntroProfile = ({ reduceMotion }) => {
  const anim = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.3, ease: "easeOut" },
      };

  return (
    <motion.div
      {...anim}
      className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 py-8 text-center"
    >
      <motion.div
        initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.04, duration: 0.32 }}
        className="relative"
      >
        <div className="h-16 w-16 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/30">
          <img
            src={ProfileImg}
            alt="Ratnakar Singh Parihar"
            className="h-full w-full rounded-[10px] object-cover"
          />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
          <span className="relative inline-flex w-3 h-3 border-2 border-white rounded-full bg-emerald-500 dark:border-slate-900" />
        </div>
      </motion.div>

      <h3 className="mt-4 text-[15px] font-bold leading-tight text-slate-900 dark:text-white">
        Ratnakar Singh Parihar
      </h3>
      <p className="mt-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
        Full Stack Developer
      </p>

      <div className="w-10 h-px my-4 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />

      <div className="flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.05] px-2.5 py-1 dark:border-indigo-400/20 dark:bg-indigo-500/[0.08]">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
        <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
          Opening calendar…
        </span>
      </div>
    </motion.div>
  );
};

/* =========================================================
   SIDEBAR PROFILE
   ========================================================= */

const SidebarProfile = ({ activeMeeting, userTimezone, reduceMotion }) => {
  const anim = reduceMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.28 },
      };

  return (
    <motion.div
      {...anim}
      className="relative z-10 flex flex-col justify-between w-full h-full px-5 py-5"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <div className="h-11 w-11 overflow-hidden rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-sm">
              <img
                src={ProfileImg}
                alt="Ratnakar Singh Parihar"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
              <span className="relative inline-flex w-2 h-2 border-2 border-white rounded-full bg-emerald-500 dark:border-slate-900" />
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[13px] font-bold leading-tight text-slate-900 dark:text-white">
              Ratnakar Singh Parihar
            </h3>
            <p className="mt-0.5 text-[10.5px] font-semibold text-indigo-600 dark:text-indigo-400">
              Full Stack Developer
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

        {/* Meta rows */}
        <div className="space-y-2 text-[11px] font-medium text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 text-indigo-500 rounded-md shrink-0 bg-indigo-500/10 dark:bg-indigo-500/20">
              <Clock className="w-3 h-3" />
            </div>
            <span className="truncate">
              {activeMeeting
                ? `${activeMeeting.duration} min session`
                : "Choose duration"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 text-purple-500 rounded-md shrink-0 bg-purple-500/10 dark:bg-purple-500/20">
              <Video className="w-3 h-3" />
            </div>
            <span>Google Meet</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-md shrink-0 bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
              <Globe className="w-3 h-3" />
            </div>
            <span className="truncate" title={userTimezone}>
              {userTimezone}
            </span>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

        {/* You'll provide */}
        <div className="rounded-lg border border-slate-200/70 bg-white/60 p-2.5 dark:border-slate-800/70 dark:bg-slate-800/40">
          <p className="mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
            You&apos;ll provide
          </p>
          <ul className="space-y-1 text-[10.5px] text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
              Your name & email
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
              Company & role
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-emerald-500" />
              What you&apos;d like to discuss
            </li>
          </ul>
        </div>

        {/* Response hint */}
        <div className="flex items-start gap-1.5 rounded-md bg-indigo-500/[0.05] px-2 py-1.5 dark:bg-indigo-500/[0.08]">
          <Zap className="mt-0.5 h-2.5 w-2.5 shrink-0 text-indigo-500" />
          <p className="text-[10px] leading-snug text-slate-600 dark:text-slate-400">
            Replies{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              within 2h
            </span>{" "}
            on weekdays
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="space-y-1.5 border-t border-slate-200/70 pt-3 dark:border-slate-800/70">
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Available for work
        </div>
        <p className="text-[9.5px] italic text-slate-400 dark:text-slate-600">
          — Ratnakar
        </p>
      </div>
    </motion.div>
  );
};

export default BookMyCallModal;
