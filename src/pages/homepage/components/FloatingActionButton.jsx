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
      icon: "MessageCircle",
      href: "/contact",
      color: "bg-primary",
      hoverColor: "hover:bg-primary/90",
      ariaLabel: "Contact page",
    },
    {
      icon: "Download",
      href: resumefile,
      color: "bg-success",
      hoverColor: "hover:bg-success/90",
      ariaLabel: "Download resume",
      download: true,
    },
    {
      icon: "Github",
      href: "https://github.com/Ratnakar-Singh-parihar-123",
      color: "bg-gray-800",
      hoverColor: "hover:bg-gray-700",
      ariaLabel: "GitHub profile",
    },
    {
      icon: "Linkedin",
      href: "https://linkedin.com/in/ratnakar-singh-parihar",
      color: "bg-blue-600",
      hoverColor: "hover:bg-blue-700",
      ariaLabel: "LinkedIn profile",
    },
    {
      icon: "MessageSquare",
      href: "https://wa.me/919399741051?text=Hi%20Ratnakar%2C%20I%20want%20to%20connect%20with%20you!",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      ariaLabel: "WhatsApp chat",
    },
  ];

  // Optimized scroll handler
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;

    setScrollProgress(Math.min(Math.max(scrollPercent, 0), 1));
    setIsVisible(scrollTop > 300);
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

  // Close expanded menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (fabRef.current && !fabRef.current.contains(e.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsExpanded(false);
  };

  const handleActionClick = (action) => {
    setIsExpanded(false);

    if (action.download) {
      // Handle resume download
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
      // Open external links in new tab
      window.open(action.href, "_blank", "noopener noreferrer");
    } else {
      // Internal navigation
      window.location.href = action.href;
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Calculate circle properties
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.5,
      transition: { duration: 0.15 },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={fabRef}
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{
            duration: 0.4,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          {/* Quick Action Icons */}
          <AnimatePresence mode="sync">
            {isExpanded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col space-y-3 mb-3"
              >
                {quickActions.map((action, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onHoverStart={() => setActiveAction(index)}
                    onHoverEnd={() => setActiveAction(null)}
                    onClick={() => handleActionClick(action)}
                    className={`relative w-12 h-12 ${action.color} ${action.hoverColor} 
                      text-white rounded-full shadow-lg hover:shadow-xl 
                      transition-all duration-200 flex items-center justify-center
                      ${activeAction === index ? "shadow-xl scale-110" : ""}`}
                    aria-label={action.ariaLabel}
                  >
                    <Icon
                      name={action.icon}
                      size={20}
                      className={`transition-transform duration-200 
                        ${activeAction === index ? "scale-110" : ""}`}
                    />

                    {/* Simple tooltip on hover */}
                    <AnimatePresence>
                      {activeAction === index && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-full mr-3 px-2 py-1 
                            bg-gray-900 text-white text-xs rounded whitespace-nowrap"
                        >
                          {action.ariaLabel}
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2 
                            translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <div className="relative">
            {/* Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-14 h-14 -rotate-90"
              viewBox="0 0 48 48"
            >
              {/* Background circle */}
              <circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-gray-200 dark:text-gray-700"
              />

              {/* Progress circle */}
              <motion.circle
                cx="24"
                cy="24"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="text-primary"
                strokeLinecap="round"
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.3 }}
              />
            </svg>

            {/* Main Button */}
            <motion.button
              onClick={scrollProgress > 0.95 ? scrollToTop : toggleExpanded}
              className="relative w-14 h-14 bg-primary hover:bg-primary/90 
                text-white rounded-full shadow-lg hover:shadow-xl 
                transition-all duration-200 flex items-center justify-center 
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={
                scrollProgress > 0.95 ? "Scroll to top" : "Quick actions menu"
              }
            >
              <AnimatePresence mode="wait">
                {scrollProgress > 0.95 ? (
                  <motion.div
                    key="arrow-up"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ArrowUp" size={22} />
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
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name={isExpanded ? "X" : "Menu"} size={22} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Small indicator dot */}
            {!isExpanded && scrollProgress > 0 && scrollProgress < 0.95 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 
                  bg-red-500 rounded-full border-2 border-white"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
