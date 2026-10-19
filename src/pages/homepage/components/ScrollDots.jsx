// src/components/ScrollDots.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* =========================================================
   SECTIONS — ORDER = top to bottom
========================================================= */
const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "why-hire-me", label: "Why Hire Me" },
  { id: "reels", label: "Reels" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

/* Idle timeout before hiding (ms) */
const IDLE_HIDE_DELAY = 2000;

const ScrollDots = () => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const rafId = useRef(null);
  const idleTimer = useRef(null);
  const reduceMotion = useReducedMotion();

  /* =========================================================
     SCROLL SPY + PROGRESS + SHOW/HIDE
  ========================================================= */
  useEffect(() => {
    const update = () => {
      // Active section
      const refLine = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= refLine) current = id;
      }
      setActiveSection(current);

      // Progress 0–100
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(
        100,
        Math.max(0, (window.scrollY / Math.max(1, docHeight)) * 100),
      );
      setScrollProgress(progress);
    };

    const showAndScheduleHide = () => {
      setIsVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        // Don't hide while user is hovering a dot
        if (hoveredIndexRef.current === null) {
          setIsVisible(false);
        }
      }, IDLE_HIDE_DELAY);
    };

    const onScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        update();
        showAndScheduleHide();
        rafId.current = null;
      });
    };

    // Initial: hidden on load, no dots until user scrolls
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* Keep track of hover for idle-hide safety */
  const hoveredIndexRef = useRef(null);
  useEffect(() => {
    hoveredIndexRef.current = hoveredIndex;
    // If user starts hovering, cancel any pending hide
    if (hoveredIndex !== null) {
      setIsVisible(true);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    }
  }, [hoveredIndex]);

  /* =========================================================
     CLICK → smooth scroll (80px header offset)
  ========================================================= */
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          key="scroll-dots"
          aria-label="Section navigation"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{
            duration: reduceMotion ? 0 : 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseEnter={() => {
            // Cancel hide while hovering
            if (idleTimer.current) clearTimeout(idleTimer.current);
            setIsVisible(true);
          }}
          onMouseLeave={() => {
            // Restart idle timer on leave
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(
              () => setIsVisible(false),
              IDLE_HIDE_DELAY,
            );
          }}
          className="fixed z-40 flex-col items-center hidden -translate-y-1/2 right-3 md:right-5 top-1/2 md:flex"
        >
          {/* ============= DOTS ============= */}
          <div className="relative flex flex-col items-center gap-3 py-2">
            {SECTIONS.map((section, index) => {
              const isActive = activeSection === section.id;
              const isHovered = hoveredIndex === index;

              return (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  aria-label={`Go to ${section.label}`}
                  aria-current={isActive ? "true" : undefined}
                  className="relative flex items-center justify-center w-6 h-6 rounded-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                >
                  {/* Sliding ring — the smooth travel */}
                  {isActive && (
                    <motion.div
                      layoutId="scrollActiveRing"
                      className="absolute inset-0 rounded-full bg-indigo-500/10 ring-2 ring-indigo-500/70 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                        mass: 0.6,
                      }}
                    />
                  )}

                  {/* Dot */}
                  <motion.span
                    animate={{
                      scale: isActive ? 1 : isHovered ? 0.9 : 0.6,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 26,
                    }}
                    className={`
                      relative z-10 block w-2.5 h-2.5 rounded-full
                      transition-colors duration-300
                      ${
                        isActive
                          ? "bg-indigo-500"
                          : isHovered
                            ? "bg-indigo-400"
                            : "bg-slate-300 dark:bg-slate-700"
                      }
                    `}
                  />

                  {/* Tooltip */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ opacity: 0, x: 6, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 6, scale: 0.9 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="
                          absolute right-full mr-2
                          px-2 py-1 rounded-md
                          text-[10px] font-bold tracking-wide whitespace-nowrap
                          bg-slate-900 dark:bg-white
                          text-white dark:text-slate-900
                          shadow-lg pointer-events-none
                        "
                      >
                        {section.label}
                        <span className="absolute w-2 h-2 rotate-45 -translate-y-1/2 top-1/2 -right-1 bg-slate-900 dark:bg-white" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* ============= SCROLL % ============= */}
          <div className="mt-3 text-[9px] font-bold tabular-nums text-slate-400 dark:text-slate-600">
            {String(Math.round(scrollProgress)).padStart(2, "0")}%
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default ScrollDots;
