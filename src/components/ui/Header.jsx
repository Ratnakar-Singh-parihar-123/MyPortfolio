import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Download, 
  Home, 
  User, 
  BookOpen, 
  Video,
  Briefcase, 
  Cpu,
  Trophy,
  MessageSquare,
  GraduationCap, 
  Mail,
  CalendarDays,
  Sparkles,
  Search
} from "lucide-react";
import { ThemeToggle } from "../ThemeProvider";
import BookMyCallModal from "./BookMyCallModal";
import logoImg from "../../assets/logo/logo.jpeg";
import resumefile from "../../assets/resume/Ratnakar_Singh_Parihar.pdf";

const NAV_LINKS = [
  { path: "/", label: "Home", icon: Home, color: "text-blue-500 dark:text-blue-400" },
  { path: "/about", label: "About", icon: User, color: "text-slate-600 dark:text-slate-400" },
  { path: "/skills", label: "Skills", icon: BookOpen, color: "text-purple-500 dark:text-purple-400" },
  { path: "/projects", label: "Projects", icon: Video, color: "text-red-500 dark:text-red-400" },
  { path: "/experience", label: "Experience", icon: Briefcase, color: "text-orange-500 dark:text-orange-400" },
  { path: "/skills#tech-stack", label: "Tech Stack", icon: Cpu, color: "text-cyan-500 dark:text-cyan-400" },
  { path: "/achievements", label: "Achievements", icon: Trophy, color: "text-emerald-500 dark:text-emerald-400" },
  { path: "/contact", label: "Contact", icon: MessageSquare, color: "text-pink-500 dark:text-pink-400" },
  { path: "/education", label: "Education", icon: GraduationCap, color: "text-indigo-500 dark:text-indigo-400" },
  { path: "mailto:ratnakarsinghparihar9399@gmail.com", label: "Email", icon: Mail, color: "text-teal-500 dark:text-teal-400", isExternal: true },
];

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const handleBookClick = () => {
    setIsDrawerOpen(false);
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsBookModalOpen(true);
    }, 450);
  };

  const handleOpenSearch = () => {
    setIsDrawerOpen(false);
    const event = new CustomEvent("openSearchModal");
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 transition-all duration-300 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* LEFT SIDE: Personal Brand (Logo + Name + SDE Badge) */}
          <Link 
            to="/" 
            className="pointer-events-auto flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-md group-hover:scale-105 transition-transform bg-white dark:bg-slate-900 p-0.5">
              <img 
                src={logoImg} 
                alt="Ratnakar Singh Parihar" 
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm rounded-lg">R</div>';
                }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Ratnakar Singh Parihar
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  Full Stack Engineer
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                SDE
              </span>
            </div>
          </Link>

          {/* RIGHT SIDE (Desktop): Search + Resume + Theme Toggle */}
          <div className="pointer-events-auto hidden md:flex items-center gap-2.5">
            {/* Command Palette Search Button */}
            <button
              onClick={handleOpenSearch}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-200/80 dark:border-slate-700/80 transition-all shadow-xs"
              aria-label="Open search command palette"
            >
              <Search size={14} className="text-indigo-500" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Resume Button */}
            <a
              href={resumefile}
              download="Ratnakar_Singh_Parihar_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/90 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200/80 dark:border-slate-700/80 transition-all shadow-sm hover:shadow"
            >
              <Download size={14} className="text-indigo-500" />
              <span>Resume</span>
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* RIGHT SIDE (Mobile): Search + Theme Toggle + Hamburger Menu */}
          <div className="pointer-events-auto flex md:hidden items-center gap-2">
            <button
              onClick={handleOpenSearch}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <ThemeToggle />

            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              className="p-2 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shadow-sm"
              aria-label="Toggle navigation drawer"
            >
              {isDrawerOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE SIDE NAVIGATION DRAWER */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="absolute inset-0 bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm"
            />

            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-full max-w-xs h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-6 z-10 overflow-y-auto"
            >
              {/* Drawer Header */}
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <img 
                      src={logoImg} 
                      alt="Profile" 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 dark:border-slate-700" 
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Ratnakar Singh
                      </h3>
                      <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                        SDE • Full Stack
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1.5">
                  {NAV_LINKS.map((link) => {
                    const isActive = location.pathname === link.path || (link.path !== "/" && location.pathname.startsWith(link.path));
                    const Icon = link.icon;

                    if (link.isExternal) {
                      return (
                        <a
                          key={link.path}
                          href={link.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"
                        >
                          <Icon size={18} className={`${link.color} opacity-80 group-hover:opacity-100`} />
                          <span>{link.label}</span>
                        </a>
                      );
                    }

                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`
                          flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                          ${isActive 
                            ? "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold border-l-4 border-indigo-500" 
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60"}
                        `}
                      >
                        <Icon size={18} className={isActive ? link.color : `${link.color} opacity-80 group-hover:opacity-100`} />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3 mt-6">
                {/* Book Call CTA */}
                <button
                  onClick={handleBookClick}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-md shadow-indigo-500/20"
                >
                  <Calendar size={16} />
                  <span>Book My Call</span>
                </button>

                {/* Resume Download */}
                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Download size={14} className="text-indigo-500" />
                  <span>Download Resume</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Book Call Loading Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            className="fixed inset-0 z-[160] backdrop-blur-md bg-slate-900/40 dark:bg-black/60 flex flex-col items-center justify-center text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin mb-3" />
            <p className="text-sm font-semibold text-white tracking-wide">Opening Calendar Scheduler...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      {isBookModalOpen && <BookMyCallModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />}
    </>
  );
};

export default Header;
