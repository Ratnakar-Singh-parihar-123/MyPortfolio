import React, { useState, createContext, useContext, useEffect } from 'react';
import Icon from './AppIcon';

// Theme Context
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Check system preference
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)')?.matches);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList?.add('dark');
      root.classList?.remove('light');
    } else {
      root.classList?.add('light');
      root.classList?.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Theme Toggle Component
export const ThemeToggle = ({ className = '' }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background ${
        isDarkMode ? 'bg-primary' : 'bg-muted'
      } ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span
        className={`inline-block w-4 h-4 rounded-full bg-background shadow transform transition-transform duration-200 ${
          isDarkMode ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
      <Icon
        name={isDarkMode ? "Moon" : "Sun"}
        size={12}
        className={`absolute transition-opacity duration-200 text-foreground ${
          isDarkMode ? 'left-1 opacity-100' : 'right-1 opacity-0'
        }`}
      />
      <Icon
        name={isDarkMode ? "Sun" : "Moon"}
        size={12}
        className={`absolute transition-opacity duration-200 text-foreground ${
          isDarkMode ? 'right-1 opacity-0' : 'left-1 opacity-100'
        }`}
      />
    </button>
  );
};

export default ThemeProvider;