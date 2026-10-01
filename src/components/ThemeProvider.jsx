import React, { useState, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================
// Theme Context
// ============================================================

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

// ============================================================
// Theme Provider
// ============================================================

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    root.classList.toggle("dark", isDarkMode);
    root.classList.toggle("light", !isDarkMode);

    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    window.dispatchEvent(
      new CustomEvent("themeChange", {
        detail: {
          isDark: isDarkMode,
        },
      }),
    );
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ============================================================
// Sun Icon
// ============================================================

const SunIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />

    <path d="M12 2v2" />
    <path d="M12 20v2" />

    <path d="m4.93 4.93 1.4 1.4" />
    <path d="m17.67 17.67 1.4 1.4" />

    <path d="M2 12h2" />
    <path d="M20 12h2" />

    <path d="m6.33 17.67-1.4 1.4" />
    <path d="m19.07 4.93-1.4 1.4" />
  </svg>
);

// ============================================================
// Moon Icon
// ============================================================

const MoonIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.8 14.1A8.5 8.5 0 0 1 9.9 3.2a8.5 8.5 0 1 0 10.9 10.9Z" />
  </svg>
);

// ============================================================
// Theme Toggle
// Premium Circular Design
// ============================================================

export const ThemeToggle = ({
  className = "",
  variant = "default",
  size = "md",
}) => {
  const { isDarkMode, toggleTheme, mounted } = useTheme();

  // ----------------------------------------------------------
  // Responsive Sizes
  // ----------------------------------------------------------

  const sizeConfig = {
    sm: {
      button: "w-8 h-8",
      icon: 14,
      inner: "inset-[2px]",
    },

    md: {
      button: "w-9 h-9 sm:w-10 sm:h-10",
      icon: 16,
      inner: "inset-[2px]",
    },

    lg: {
      button: "w-10 h-10 sm:w-12 sm:h-12",
      icon: 18,
      inner: "inset-[2px]",
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  // ----------------------------------------------------------
  // Loading State
  // ----------------------------------------------------------

  if (!mounted) {
    return (
      <div
        className={`
          ${currentSize.button}
          rounded-full
          border
          border-border/50
          bg-background/70
          backdrop-blur-xl
          animate-pulse
          ${className}
        `}
      />
    );
  }

  // ==========================================================
  // MINIMAL
  // ==========================================================

  if (variant === "minimal") {
    return (
      <motion.button
        type="button"
        onClick={toggleTheme}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25,
        }}
        className={`
          relative
          flex
          items-center
          justify-center
          ${currentSize.button}
          rounded-full
          border
          overflow-visible
          cursor-pointer
          select-none
          transition-all
          duration-500
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-500/40
          ${
            isDarkMode
              ? `
                bg-slate-900
                border-white/10
                text-indigo-200
                shadow-lg
                shadow-indigo-950/30
              `
              : `
                bg-white
                border-black/5
                text-amber-500
                shadow-lg
                shadow-amber-200/30
              `
          }
          ${className}
        `}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Ambient glow */}
        <motion.span
          className={`
            absolute
            inset-0
            rounded-full
            blur-md
            pointer-events-none
            ${isDarkMode ? "bg-indigo-500/15" : "bg-amber-400/15"}
          `}
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Icon */}
        <AnimatePresence mode="wait">
          <motion.span
            key={isDarkMode ? "moon" : "sun"}
            initial={{
              opacity: 0,
              scale: 0.35,
              rotate: -90,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.35,
              rotate: 90,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            className="relative z-10 flex items-center justify-center"
          >
            {isDarkMode ? (
              <MoonIcon size={currentSize.icon} />
            ) : (
              <SunIcon size={currentSize.icon} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  // ==========================================================
  // PREMIUM
  // ==========================================================

  if (variant === "premium") {
    return (
      <motion.button
        type="button"
        onClick={toggleTheme}
        whileHover={{
          scale: 1.07,
        }}
        whileTap={{
          scale: 0.92,
        }}
        transition={{
          type: "spring",
          stiffness: 450,
          damping: 24,
        }}
        className={`
          group
          relative
          flex
          items-center
          justify-center
          ${currentSize.button}
          rounded-full
          border
          overflow-visible
          cursor-pointer
          select-none
          backdrop-blur-2xl
          transition-all
          duration-500
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-indigo-500/40
          ${
            isDarkMode
              ? `
                bg-slate-950/90
                border-indigo-400/20
                text-indigo-100
                shadow-[0_10px_35px_rgba(79,70,229,0.18)]
              `
              : `
                bg-white/95
                border-amber-300/50
                text-amber-500
                shadow-[0_10px_35px_rgba(245,158,11,0.14)]
              `
          }
          ${className}
        `}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* ================================================== */}
        {/* Outer Glow */}
        {/* ================================================== */}

        <motion.span
          className={`
            absolute
            inset-[-5px]
            rounded-full
            blur-xl
            pointer-events-none
            ${isDarkMode ? "bg-indigo-500/10" : "bg-amber-400/10"}
          `}
          animate={{
            scale: [0.96, 1.06, 0.96],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================== */}
        {/* Outer Ring */}
        {/* ================================================== */}

        <motion.span
          className={`
            absolute
            inset-[-2px]
            rounded-full
            border
            pointer-events-none
            transition-colors
            duration-500
            ${isDarkMode ? "border-indigo-400/10" : "border-amber-400/20"}
          `}
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.25,
          }}
        />

        {/* ================================================== */}
        {/* Inner Surface */}
        {/* ================================================== */}

        <motion.span
          className={`
            absolute
            ${currentSize.inner}
            rounded-full
            pointer-events-none
            ${
              isDarkMode
                ? `
                  bg-gradient-to-br
                  from-indigo-500/20
                  via-purple-500/10
                  to-slate-950
                `
                : `
                  bg-gradient-to-br
                  from-amber-50
                  via-white
                  to-orange-50
                `
            }
          `}
          animate={{
            rotate: isDarkMode ? 180 : 0,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* ================================================== */}
        {/* Glass Highlight */}
        {/* ================================================== */}

        <span
          className="
            absolute
            top-[3px]
            left-[5px]
            right-[5px]
            h-[35%]
            rounded-full
            bg-white/10
            blur-[1px]
            pointer-events-none
          "
        />

        {/* ================================================== */}
        {/* Icon */}
        {/* ================================================== */}

        <AnimatePresence mode="wait">
          <motion.span
            key={isDarkMode ? "moon" : "sun"}
            initial={{
              opacity: 0,
              scale: 0.3,
              rotate: -120,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.3,
              rotate: 120,
            }}
            transition={{
              type: "spring",
              stiffness: 520,
              damping: 24,
              mass: 0.5,
            }}
            className={`
              relative
              z-20
              flex
              items-center
              justify-center
              ${isDarkMode ? "text-indigo-200" : "text-amber-500"}
            `}
          >
            {isDarkMode ? (
              <MoonIcon size={currentSize.icon} />
            ) : (
              <SunIcon size={currentSize.icon} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  // ==========================================================
  // DEFAULT
  // ==========================================================

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{
        scale: 1.06,
      }}
      whileTap={{
        scale: 0.91,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className={`
        group
        relative
        flex
        items-center
        justify-center
        ${currentSize.button}
        rounded-full
        border
        overflow-visible
        cursor-pointer
        select-none
        transition-all
        duration-500
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-indigo-500/40
        ${
          isDarkMode
            ? `
              bg-slate-900
              border-indigo-400/20
              text-indigo-200
              shadow-md
              shadow-indigo-950/20
              hover:border-indigo-400/40
            `
            : `
              bg-white
              border-amber-200
              text-amber-500
              shadow-md
              shadow-amber-100/40
              hover:border-amber-300
            `
        }
        ${className}
      `}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* ================================================== */}
      {/* Soft Glow */}
      {/* ================================================== */}

      <motion.span
        className={`
          absolute
          inset-[-2px]
          rounded-full
          blur-lg
          pointer-events-none
          ${isDarkMode ? "bg-indigo-500/10" : "bg-amber-400/10"}
        `}
        animate={{
          opacity: [0.2, 0.45, 0.2],
          scale: [0.98, 1.04, 0.98],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ================================================== */}
      {/* Inner Circle */}
      {/* ================================================== */}

      <motion.span
        className={`
          absolute
          ${currentSize.inner}
          rounded-full
          pointer-events-none
          ${
            isDarkMode
              ? `
                bg-gradient-to-br
                from-indigo-500/20
                via-purple-500/10
                to-transparent
              `
              : `
                bg-gradient-to-br
                from-amber-50
                via-white
                to-orange-50
              `
          }
        `}
        animate={{
          rotate: isDarkMode ? 180 : 0,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      />

      {/* ================================================== */}
      {/* Icon */}
      {/* ================================================== */}

      <AnimatePresence mode="wait">
        <motion.span
          key={isDarkMode ? "moon" : "sun"}
          initial={{
            opacity: 0,
            scale: 0.2,
            rotate: -90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.2,
            rotate: 90,
          }}
          transition={{
            type: "spring",
            stiffness: 550,
            damping: 26,
            mass: 0.45,
          }}
          className={`
            relative
            z-20
            flex
            items-center
            justify-center
            ${isDarkMode ? "text-indigo-200" : "text-amber-500"}
          `}
        >
          {isDarkMode ? (
            <MoonIcon size={currentSize.icon} />
          ) : (
            <SunIcon size={currentSize.icon} />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

// ============================================================
// Simple Circular Toggle
// ============================================================

export const SimpleThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className={`
        relative
        flex
        items-center
        justify-center
        w-9
        h-9
        rounded-full
        border
        cursor-pointer
        transition-all
        duration-300
        focus:outline-none
        ${
          isDarkMode
            ? `
              bg-slate-900
              border-indigo-400/25
              text-indigo-200
            `
            : `
              bg-white
              border-amber-200
              text-amber-500
            `
        }
        ${className}
      `}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={isDarkMode ? "moon" : "sun"}
          initial={{
            opacity: 0,
            scale: 0,
            rotate: -90,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            rotate: 90,
          }}
          transition={{
            duration: 0.22,
          }}
        >
          {isDarkMode ? <MoonIcon size={16} /> : <SunIcon size={16} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

// ============================================================
// Theme Toggle With Label
// ============================================================

export const ThemeToggleWithLabel = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={`
        group
        flex
        items-center
        gap-2.5
        px-2.5
        py-2
        rounded-2xl
        border
        cursor-pointer
        transition-all
        duration-300
        ${
          isDarkMode
            ? `
              bg-slate-900/80
              border-indigo-400/15
              hover:border-indigo-400/30
            `
            : `
              bg-white/90
              border-amber-200
              hover:border-amber-300
            `
        }
        ${className}
      `}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Icon Circle */}
      <span
        className={`
          relative
          flex
          items-center
          justify-center
          w-8
          h-8
          rounded-full
          ${
            isDarkMode
              ? `
                bg-indigo-500/10
                text-indigo-300
              `
              : `
                bg-amber-50
                text-amber-500
              `
          }
        `}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={isDarkMode ? "moon" : "sun"}
            initial={{
              opacity: 0,
              scale: 0.4,
              rotate: -60,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.4,
              rotate: 60,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {isDarkMode ? <MoonIcon size={15} /> : <SunIcon size={15} />}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Label */}
      <span className="hidden text-sm font-medium sm:block text-foreground">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
    </motion.button>
  );
};

export default ThemeProvider;
