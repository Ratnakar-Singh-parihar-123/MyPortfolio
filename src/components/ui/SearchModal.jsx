import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search as SearchIcon, 
  X, 
  Layout, 
  FolderOpen, 
  Smartphone, 
  Code2, 
  Award, 
  GraduationCap, 
  Mail, 
  FileText,
  ArrowRight,
  Sparkles,
  Command,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  Clock,
  Briefcase,
  User,
  Home
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Authoritative Search Data
export const searchData = [
  // Core Pages
  { id: "home-1", title: "Home", path: "/", category: "Page", description: "Welcome to my portfolio — Ratnakar Singh Parihar", keywords: ["home", "welcome", "portfolio", "main", "start"], icon: Home },
  { id: "about-1", title: "About Me", path: "/about", category: "Page", description: "Full-Stack Engineer journey, background, and technical philosophy", keywords: ["about", "bio", "journey", "background", "story"], icon: User },
  { id: "skills-1", title: "Skills & Technologies", path: "/skills", category: "Page", description: "MERN Stack, React Native, Java, REST APIs, Databases & Dev Tools", keywords: ["skills", "technologies", "react", "node", "mongodb", "express", "java", "native"], icon: Code2 },
  { id: "projects-1", title: "All Projects", path: "/projects", category: "Page", description: "Web applications, MERN stack platforms, and iOS/Android mobile apps", keywords: ["projects", "portfolio", "work", "showcase", "apps"], icon: FolderOpen },
  { id: "experience-1", title: "Professional Experience", path: "/experience", category: "Page", description: "BinaryLogix, Sky Info Group internship, and Freelance engineering", keywords: ["experience", "internship", "work", "binarylogix", "job", "career"], icon: Briefcase },
  { id: "education-1", title: "Academic Background", path: "/education", category: "Page", description: "B.Tech Computer Science Engineering (2022-2026) & Schooling", keywords: ["education", "academic", "qualification", "btech", "degree", "school"], icon: GraduationCap },
  { id: "achievements-1", title: "Verified Achievements", path: "/achievements", category: "Page", description: "300+ DSA Problems Solved, HackerRank Certifications & Coding Challenges", keywords: ["achievements", "awards", "certifications", "hackerrank", "dsa", "leetcode"], icon: Award },
  { id: "contact-1", title: "Contact & Collaboration", path: "/contact", category: "Page", description: "Get in touch for engineering roles, project inquiries, or discovery calls", keywords: ["contact", "email", "message", "hire", "reach", "connect"], icon: Mail },

  // Key Projects
  { id: "project-vsbp", title: "Vehicle Service Booking Platform", path: "/projects", category: "Project", description: "Full-stack MERN platform for vehicle service booking with real-time tracking", keywords: ["vehicle", "service", "booking", "mern", "fullstack"], icon: FolderOpen },
  { id: "project-yammiverse", title: "YammiVerse", path: "/projects", category: "Project", description: "Recipe sharing platform built for food enthusiasts to discover and share recipes", keywords: ["recipe", "food", "cooking", "yammiverse"], icon: FolderOpen },
  { id: "project-jeevandaan", title: "Jeevandaan Care Platform", path: "/projects", category: "Project", description: "Healthcare platform for blood and organ donation matching", keywords: ["blood", "organ", "donation", "healthcare", "jeevandaan"], icon: FolderOpen },
  { id: "app-parkeasy", title: "ParkEasy Mobile App", path: "/projects", category: "Mobile App", description: "Smart parking management app with real-time slot booking built in React Native", keywords: ["parking", "parkeasy", "react native", "mobile", "ios", "android"], icon: Smartphone },
  { id: "app-foodiehub", title: "FoodieHub Mobile App", path: "/projects", category: "Mobile App", description: "Cross-platform food delivery app for iOS and Android", keywords: ["food", "delivery", "mobile", "foodiehub"], icon: Smartphone },

  // Specific Skills
  { id: "skill-react", title: "React.js & React Native", path: "/skills", category: "Skill", description: "Frontend web & mobile app development with hooks, state & navigation", keywords: ["react", "native", "frontend", "hooks", "components"], icon: Code2 },
  { id: "skill-node", title: "Node.js & Express.js", path: "/skills", category: "Skill", description: "Backend REST APIs, authentication middleware, and server architecture", keywords: ["node", "express", "backend", "api", "rest"], icon: Code2 },
  { id: "skill-mongodb", title: "MongoDB & Databases", path: "/skills", category: "Skill", description: "Document schemas, Mongoose models, aggregation pipelines & MySQL", keywords: ["mongodb", "mysql", "database", "mongoose"], icon: Code2 },
  { id: "skill-java", title: "Java & Algorithms", path: "/skills", category: "Skill", description: "Object-oriented programming, data structures, and algorithmic logic", keywords: ["java", "dsa", "algorithms", "data structures"], icon: Code2 },

  // Contact Items
  { id: "contact-email", title: "Direct Email", path: "/contact", category: "Contact", description: "ratnakarsinghparihar07@gmail.com", keywords: ["email", "mail", "contact"], isContact: true, icon: Mail },
  { id: "contact-linkedin", title: "LinkedIn Profile", path: "/contact", category: "Contact", description: "linkedin.com/in/ratnakar-singh-parihar", keywords: ["linkedin", "professional"], externalUrl: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/", icon: Mail },
  { id: "contact-github", title: "GitHub Repositories", path: "/contact", category: "Contact", description: "github.com/Ratnakar-Singh-parihar-123", keywords: ["github", "code", "repos"], externalUrl: "https://github.com/Ratnakar-Singh-parihar-123", icon: Mail },
];

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const navigate = useNavigate();

  // Quick navigation suggestions when query is empty
  const quickNav = useMemo(() => [
    { title: "Home", path: "/", icon: Home, badge: "Main" },
    { title: "About Me", path: "/about", icon: User, badge: "Story" },
    { title: "Skills", path: "/skills", icon: Code2, badge: "Tech" },
    { title: "Experience", path: "/experience", icon: Briefcase, badge: "Career" },
    { title: "Projects", path: "/projects", icon: FolderOpen, badge: "Work" },
    { title: "Education", path: "/education", icon: GraduationCap, badge: "Academic" },
    { title: "Achievements", path: "/achievements", icon: Award, badge: "300+ DSA" },
    { title: "Contact", path: "/contact", icon: Mail, badge: "Connect" },
  ], []);

  // Lock scroll & focus input on open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = "";
      setSearchQuery("");
      setSearchResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Global Cmd+K / Ctrl+K keyboard shortcut listener
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // If search trigger is called from anywhere
          const event = new CustomEvent("openSearchModal");
          window.dispatchEvent(event);
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isOpen, onClose]);

  // Perform filtering
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSelectedIndex(0);
      return;
    }
    const lowerQuery = query.toLowerCase().trim();
    const results = searchData.filter((item) => {
      if (item.title.toLowerCase().includes(lowerQuery)) return true;
      if (item.description.toLowerCase().includes(lowerQuery)) return true;
      if (item.category.toLowerCase().includes(lowerQuery)) return true;
      if (item.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))) return true;
      return false;
    });

    // Rank title matches first
    const sortedResults = results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(lowerQuery);
      const bTitleMatch = b.title.toLowerCase().includes(lowerQuery);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    setSearchResults(sortedResults);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => handleSearch(searchQuery), 120);
    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  const handleResultClick = useCallback((result) => {
    if (result.externalUrl) {
      window.open(result.externalUrl, "_blank");
    } else {
      navigate(result.path);
      if (result.isContact) {
        setTimeout(() => {
          const element = document.getElementById(result.id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    onClose();
  }, [navigate, onClose]);

  // Keyboard navigation inside modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      const activeList = searchQuery.trim() ? searchResults : quickNav;
      const maxIndex = activeList.length - 1;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
          break;

        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
          break;

        case "Enter":
          e.preventDefault();
          if (activeList.length > 0 && activeList[selectedIndex]) {
            handleResultClick(activeList[selectedIndex]);
          }
          break;

        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchQuery, searchResults, quickNav, selectedIndex, handleResultClick, onClose]);

  // Auto scroll active item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector('[data-selected="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Group search results by category
  const groupedResults = useMemo(() => {
    const groups = {};
    searchResults.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [searchResults]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center pt-4 sm:pt-0 px-3 sm:px-4">
        {/* Full-screen Backdrop with Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-md"
        />

        {/* macOS Command Palette Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -16 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-indigo-500/10 border border-slate-200/80 dark:border-slate-800/80 flex flex-col overflow-hidden z-10 max-h-[88vh] sm:max-h-[80vh]"
        >
          {/* Top Search Input Bar */}
          <div className="relative flex items-center px-4 sm:px-6 py-4 border-b border-slate-200/80 dark:border-slate-800/80">
            <SearchIcon className="text-indigo-500 dark:text-indigo-400 mr-3 flex-shrink-0" size={22} strokeWidth={2.5} />
            
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search projects, skills, pages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white text-base sm:text-lg placeholder-slate-400 dark:placeholder-slate-500 font-medium"
            />

            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mr-1"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-400 text-[11px] font-mono border border-slate-200 dark:border-slate-700/60 mr-2">
                <span>Esc</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div 
            ref={resultsContainerRef} 
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 no-scrollbar min-h-[220px]"
          >
            {/* Case 1: Empty Query — Quick Navigation Palette */}
            {!searchQuery.trim() && (
              <div>
                <div className="flex items-center justify-between px-3 py-1.5 mb-2">
                  <span className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1.5">
                    <Sparkles size={14} className="text-indigo-500" />
                    Quick Navigation
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Press ↵ to select</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {quickNav.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    const IconComp = item.icon;

                    return (
                      <div
                        key={item.path}
                        data-selected={isSelected}
                        onClick={() => handleResultClick(item)}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`
                          flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-150 border
                          ${isSelected 
                            ? "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/40 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                            : "border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? "bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                            <IconComp size={16} />
                          </div>
                          <span className="text-sm font-semibold">{item.title}</span>
                        </div>

                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {item.badge}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Popular Topics Row */}
                <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60 px-2">
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2">
                    Popular topics:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["React Native", "MERN Stack", "300+ DSA", "Vehicle Service App", "YammiVerse", "HackerRank"].map((query) => (
                      <button
                        key={query}
                        onClick={() => setSearchQuery(query)}
                        className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                      >
                        {query}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Case 2: Query Typed & Results Found */}
            {searchQuery.trim() && searchResults.length > 0 && (
              <div className="space-y-4">
                {Object.entries(groupedResults).map(([category, items]) => (
                  <div key={category} className="space-y-1">
                    <div className="px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase flex items-center justify-between">
                      <span>{category}s</span>
                      <span>{items.length}</span>
                    </div>

                    {items.map((item) => {
                      const globalIdx = searchResults.findIndex((r) => r.id === item.id);
                      const isSelected = selectedIndex === globalIdx;
                      const IconComp = item.icon || FileText;

                      return (
                        <div
                          key={item.id}
                          data-selected={isSelected}
                          onClick={() => handleResultClick(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={`
                            flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-150 border group
                            ${isSelected 
                              ? "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/40 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                              : "border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"}
                          `}
                        >
                          <div className="flex items-center gap-3.5 min-w-0 flex-1">
                            <div className={`p-2.5 rounded-xl shrink-0 transition-transform ${isSelected ? "bg-indigo-500 text-white scale-105" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}>
                              <IconComp size={18} />
                            </div>

                            <div className="min-w-0 flex-1 pr-2">
                              <div className="flex items-center gap-2">
                                <h4 className={`text-sm font-semibold truncate ${isSelected ? "text-indigo-600 dark:text-indigo-300" : "text-slate-900 dark:text-white"}`}>
                                  {item.title}
                                </h4>
                                <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium shrink-0">
                                  {item.category}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <ArrowRight 
                            size={16} 
                            className={`shrink-0 transition-transform ${isSelected ? "text-indigo-500 translate-x-1" : "text-slate-400 opacity-0 group-hover:opacity-100"}`} 
                          />
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {/* Case 3: Query Typed & No Results Found */}
            {searchQuery.trim() && searchResults.length === 0 && (
              <div className="py-12 px-4 text-center">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto mb-4">
                  <SearchIcon size={28} />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  No matching results found
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                  We couldn't find anything matching "<span className="font-semibold text-indigo-500">{searchQuery}</span>". Try searching for "React", "Projects", "MERN", or "Skills".
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["All Projects", "Skills", "Experience", "Contact"].map((btnText) => (
                    <button
                      key={btnText}
                      onClick={() => setSearchQuery(btnText)}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-600 transition-colors"
                    >
                      {btnText}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Command Palette Footer Bar */}
          <div className="px-4 sm:px-6 py-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono shadow-xs">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono shadow-xs">↓</kbd>
                <span>Navigate</span>
              </span>

              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono shadow-xs">↵</kbd>
                <span>Select</span>
              </span>

              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono shadow-xs">Esc</kbd>
                <span>Close</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
              <Command size={12} />
              <span>K to toggle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
