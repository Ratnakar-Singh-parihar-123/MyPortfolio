import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import resumefile from "../../../assets/resume/Ratnakar_Singh_Parihar.pdf";

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAction, setActiveAction] = useState(null);
  const fabRef = useRef(null);

  const quickActions = [
    {
      icon: "Download",
      href: resumefile,
      color: "from-emerald-500 to-teal-500",
      shadow: "shadow-emerald-500/20",
      ariaLabel: "Download resume",
      download: true,
    },
    {
      icon: "Github",
      href: "https://github.com/Ratnakar-Singh-parihar-123",
      color: "from-gray-700 to-gray-900",
      shadow: "shadow-gray-700/20",
      ariaLabel: "GitHub profile",
    },
    {
      icon: "Linkedin",
      href: "https://linkedin.com/in/ratnakar-singh-parihar",
      color: "from-blue-500 to-blue-700",
      shadow: "shadow-blue-500/20",
      ariaLabel: "LinkedIn profile",
    },
    {
      icon: "Twitter",
      href: "https://x.com/RatnakarSi85551",
      color: "from-sky-400 to-sky-600",
      shadow: "shadow-sky-400/20",
      ariaLabel: "Twitter profile",
    },
    {
      icon: "Instagram",
      href: "https://www.instagram.com/krishna_singh_pratihar/",
      color: "from-pink-500 to-rose-600",
      shadow: "shadow-pink-500/20",
      ariaLabel: "Instagram profile",
    },
    {
      icon: "MessageSquare",
      href: "https://wa.me/919399741051?text=Hi%20Ratnakar%2C%20I%20want%20to%20connect%20with%20you!",
      color: "from-green-500 to-emerald-600",
      shadow: "shadow-green-500/20",
      ariaLabel: "WhatsApp chat",
    },
    {
      icon: "Mail",
      href: "mailto:ratnakarsinghparihar9399@gmail.com",
      color: "from-red-500 to-orange-600",
      shadow: "shadow-red-500/20",
      ariaLabel: "Send email",
    },
  ];

  // Optimized scroll handler with smooth progress
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
    setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
    setIsVisible(scrollTop > 200);
  }, []);

  useEffect(() => {
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", scrollListener);
  }, [handleScroll]);

  // Close expanded menu on outside click or escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fabRef.current && !fabRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsExpanded(false);
    };
    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsExpanded(false);
  };

  const handleActionClick = (action) => {
    setIsExpanded(false);
    if (action.download) {
      const link = document.createElement("a");
      link.href = action.href;
      link.download = "Ratnakar_Singh_Parihar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (
      typeof action.href === "string" &&
      action.href.startsWith("http")
    ) {
      window.open(action.href, "_blank", "noopener noreferrer");
    } else {
      window.location.href = action.href;
    }
  };

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  // Circle progress ring config
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  // Elegant container variants for staggered menu
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 40, scale: 0.4, rotate: -10 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 },
    },
    exit: {
      opacity: 0,
      x: 40,
      scale: 0.4,
      rotate: 10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={fabRef}
          initial={{ opacity: 0, scale: 0.6, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 80 }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 22,
          }}
          className="fixed z-50 flex flex-col items-end bottom-6 right-6 md:bottom-8 md:right-8"
        >
          {/* Quick Action Menu */}
          <AnimatePresence mode="sync">
            {isExpanded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col mb-4 space-y-3"
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.12, x: -8 }}
                    whileTap={{ scale: 0.92 }}
                    onHoverStart={() => setActiveAction(index)}
                    onHoverEnd={() => setActiveAction(null)}
                    onClick={() => handleActionClick(action)}
                    className={`relative w-12 h-12 bg-gradient-to-br ${action.color} 
                      text-white rounded-2xl shadow-lg ${action.shadow} 
                      hover:shadow-xl transition-all duration-300 
                      flex items-center justify-center backdrop-blur-sm
                      border border-white/20 overflow-hidden group`}
                    aria-label={action.ariaLabel}
                  >
                    {/* Inner glow effect */}
                    <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-white/20 group-hover:opacity-100" />
                    <Icon
                      name={action.icon}
                      size={20}
                      className="relative z-10 transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Modern glass tooltip */}
                    <AnimatePresence>
                      {activeAction === index && (
                        <motion.div
                          initial={{ opacity: 0, x: -15, scale: 0.9 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -15, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-full mr-3 px-3 py-1.5 
                            text-xs font-medium text-white 
                            bg-gray-900/90 backdrop-blur-md rounded-full 
                            shadow-xl border border-white/20 whitespace-nowrap
                            font-sans tracking-wide"
                        >
                          {action.ariaLabel}
                          <div className="absolute right-0 w-2 h-2 rotate-45 translate-x-1/2 -translate-y-1/2 border-t border-r bg-gray-900/90 border-white/20 top-1/2" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main FAB with progress ring and floating animation */}
          <div className="relative">
            {/* Radial gradient background glow */}
            <div className="absolute inset-0 transition-opacity duration-500 scale-150 rounded-full opacity-50 bg-primary/20 blur-xl group-hover:opacity-100" />

            {/* Scroll Progress Ring with Gradient */}
            <svg
              className="absolute inset-0 -rotate-90 w-14 h-14 drop-shadow-md"
              viewBox="0 0 48 48"
            >
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="text-gray-200 dark:text-gray-800"
              />
              {/* Gradient Progress Circle */}
              <defs>
                <linearGradient
                  id="progressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
              <motion.circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.2 }}
              />
            </svg>

            {/* Main Button with floating animation and gradient */}
            <motion.button
              onClick={scrollProgress > 0.95 ? scrollToTop : toggleExpanded}
              className="relative flex items-center justify-center overflow-hidden text-white transition-all duration-300 rounded-full shadow-2xl w-14 h-14 bg-gradient-to-br from-primary via-primary to-indigo-600 hover:shadow-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 group"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                y: {
                  duration: 2.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
              aria-label={
                scrollProgress > 0.95 ? "Scroll to top" : "Quick actions menu"
              }
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

              <AnimatePresence mode="wait">
                {scrollProgress > 0.95 ? (
                  <motion.div
                    key="arrow-up"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ArrowUp" size={24} strokeWidth={1.8} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{
                      opacity: 1,
                      rotate: isExpanded ? 45 : 0,
                    }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{
                      duration: 0.25,
                      type: "spring",
                      stiffness: 400,
                    }}
                  >
                    <Icon
                      name={isExpanded ? "X" : "Menu"}
                      size={24}
                      strokeWidth={1.8}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Live pulse indicator when not expanded & page scrolled */}
            {!isExpanded && scrollProgress > 0.1 && scrollProgress < 0.95 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute w-3.5 h-3.5 bg-gradient-to-br from-red-500 to-rose-500 
                  border-2 border-white dark:border-gray-900 rounded-full -top-1 -right-1"
              >
                <span className="absolute inset-0 bg-red-500 rounded-full opacity-75 animate-ping" />
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
