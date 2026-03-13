import React, { useState, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Apply theme to document
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, mounted]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Modern Theme Toggle Component
export const ThemeToggle = ({
  className = "",
  variant = "default", // 'default', 'minimal', 'premium'
  size = "md", // 'sm', 'md', 'lg'
}) => {
  const { isDarkMode, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  // Size configurations
  const sizes = {
    sm: {
      button: "h-7 w-12",
      circle: "w-5 h-5",
      icon: 14,
      translate: "translate-x-6",
    },
    md: {
      button: "h-8 w-14",
      circle: "w-6 h-6",
      icon: 16,
      translate: "translate-x-7",
    },
    lg: {
      button: "h-10 w-18",
      circle: "w-8 h-8",
      icon: 20,
      translate: "translate-x-9",
    },
  };

  const currentSize = sizes[size];

  // Icon components
  const SunIcon = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  const MoonIcon = () => (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  // Default variant - Clean and modern
  if (variant === "default") {
    return (
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`relative inline-flex items-center ${currentSize.button} rounded-full transition-all duration-300 ${
          isDarkMode
            ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/30"
            : "bg-gradient-to-r from-amber-400 to-orange-400 shadow-lg shadow-amber-500/30"
        } ${className}`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Sliding circle */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`
            flex items-center justify-center
            ${currentSize.circle} rounded-full bg-white shadow-md
            ${isDarkMode ? "ml-auto mr-1" : "ml-1"}
          `}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isDarkMode ? "dark" : "light"}
              initial={{ rotate: -30, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 30, scale: 0 }}
              transition={{ duration: 0.2 }}
              className={isDarkMode ? "text-indigo-600" : "text-amber-500"}
            >
              {isDarkMode ? <MoonIcon /> : <SunIcon />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.button>
    );
  }

  // Minimal variant - Just a circle with icon
  if (variant === "minimal") {
    return (
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`relative flex items-center justify-center rounded-full transition-all duration-300 ${
          isDarkMode
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/50"
            : "bg-amber-400 text-white shadow-lg shadow-amber-500/50"
        } ${currentSize.circle} ${className}`}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isDarkMode ? "dark" : "light"}
            initial={{ rotate: -30, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            exit={{ rotate: 30, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
          </motion.div>
        </AnimatePresence>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: isDarkMode
              ? [
                  "0 0 0 0 rgba(79, 70, 229, 0.4)",
                  "0 0 0 8px rgba(79, 70, 229, 0)",
                ]
              : [
                  "0 0 0 0 rgba(251, 146, 60, 0.4)",
                  "0 0 0 8px rgba(251, 146, 60, 0)",
                ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.button>
    );
  }

  // Premium variant - Glass morphism
  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative group ${className}`}
    >
      {/* Main container with glass effect */}
      <div
        className={`
        relative flex items-center ${currentSize.button} rounded-full p-1
        backdrop-blur-sm transition-all duration-300
        ${
          isDarkMode
            ? "bg-indigo-950/80 border border-indigo-500/30 shadow-lg shadow-indigo-500/20"
            : "bg-amber-50/80 border border-amber-500/30 shadow-lg shadow-amber-500/20"
        }
      `}
      >
        {/* Background icons */}
        <span
          className={`absolute left-2 text-xs ${isDarkMode ? "text-indigo-300" : "text-amber-600"}`}
        >
          🌙
        </span>
        <span
          className={`absolute right-2 text-xs ${isDarkMode ? "text-indigo-300" : "text-amber-600"}`}
        >
          ☀️
        </span>

        {/* Sliding circle */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`
            relative z-10 flex items-center justify-center
            ${currentSize.circle} rounded-full shadow-lg
            ${
              isDarkMode
                ? "bg-gradient-to-br from-indigo-500 to-purple-500 ml-auto"
                : "bg-gradient-to-br from-amber-400 to-orange-400"
            }
          `}
        >
          <span className="text-white text-xs">{isDarkMode ? "🌙" : "☀️"}</span>
        </motion.div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        className={`
          absolute inset-0 rounded-full blur-md -z-10
          ${isDarkMode ? "bg-indigo-500" : "bg-amber-500"}
        `}
      />
    </motion.button>
  );
};

// Simple Theme Toggle - Original style but improved
export const SimpleThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        isDarkMode ? "bg-indigo-600" : "bg-amber-400"
      } ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Background text */}
      <span
        className={`absolute left-2 text-[10px] font-medium text-white ${isDarkMode ? "opacity-100" : "opacity-0"}`}
      >
        Dark
      </span>
      <span
        className={`absolute right-2 text-[10px] font-medium text-white ${isDarkMode ? "opacity-0" : "opacity-100"}`}
      >
        Light
      </span>

      {/* Sliding circle */}
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className={`flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-md ${
          isDarkMode ? "ml-7" : "ml-1"
        }`}
      >
        <span
          className={`text-xs ${isDarkMode ? "text-indigo-600" : "text-amber-500"}`}
        >
          {isDarkMode ? "🌙" : "☀️"}
        </span>
      </motion.span>
    </motion.button>
  );
};

// Theme Toggle with Label
export const ThemeToggleWithLabel = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-800 hover:bg-gray-700"
          : "bg-gray-100 hover:bg-gray-200"
      } ${className}`}
    >
      <div
        className={`relative w-10 h-5 rounded-full transition-colors ${
          isDarkMode ? "bg-indigo-600" : "bg-amber-400"
        }`}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow ${
            isDarkMode ? "right-0.5" : "left-0.5"
          }`}
        />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {isDarkMode ? "Dark Mode" : "Light Mode"}
      </span>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {isDarkMode ? "🌙" : "☀️"}
      </span>
    </motion.button>
  );
};

export default ThemeProvider;
