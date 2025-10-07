import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import resumefile from "../../../assets/resume/Ratnakar_Singh_Parihar.pdf";

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const quickActions = [
    {
      icon: "MessageCircle",
      label: "Contact",
      href: "/contact",
      color: "bg-primary hover:bg-primary/90",
    },
    {
      icon: "Download",
      label: "Resume",
      href: resumefile,
      color: "bg-success hover:bg-success/90",
    },
    {
      icon: "Github",
      label: "GitHub",
      href: "https://github.com/Ratnakar-Singh-parihar-123",
      color: "bg-gray-800 hover:bg-gray-700",
    },
    {
      icon: "Linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/alexchen-dev",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      icon: "MessageSquare",
      label: "WhatsApp",
      href: "https://wa.me/919399741051?text=Hi%20Ratnakar%2C%20I%20want%20to%20connect%20with%20you!",
      color: "bg-green-500 hover:bg-green-600",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;

      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
          {/* Quick Action Buttons */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.2, staggerChildren: 0.05 }}
                className="flex flex-col space-y-2"
              >
                {quickActions?.map((action, index) => (
                  <motion.a
                    key={action?.label}
                    href={action?.href}
                    target={
                      action.href.startsWith("http") ? "_blank" : "_self"
                    }
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    className={`flex items-center space-x-3 ${action?.color} text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 group min-w-max`}
                    onClick={() => setIsExpanded(false)}
                  >
                    <Icon name={action?.icon} size={18} />
                    <span className="text-sm font-medium pr-1">
                      {action?.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Floating Button */}
          <div className="relative">
            {/* Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-14 h-14 -rotate-90"
              viewBox="0 0 56 56"
            >
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-border"
              />
              <circle
                cx="28"
                cy="28"
                r="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${
                  2 * Math.PI * 26 * (1 - scrollProgress)
                }`}
                className="text-primary transition-all duration-300"
                strokeLinecap="round"
              />
            </svg>

            {/* Main Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              onClick={scrollProgress > 0.9 ? scrollToTop : toggleExpanded}
              className="relative w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
              aria-label={
                scrollProgress > 0.9 ? "Scroll to top" : "Quick actions menu"
              }
            >
              <AnimatePresence mode="wait">
                {scrollProgress > 0.9 ? (
                  <motion.div
                    key="arrow-up"
                    initial={{ opacity: 0, rotate: 180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="ArrowUp" size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{
                      opacity: 1,
                      rotate: isExpanded ? 45 : 0,
                    }}
                    exit={{ opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon name="Plus" size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {!isExpanded && scrollProgress <= 0.9 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2, delay: 1 }}
                  className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg pointer-events-none"
                >
                  Quick Actions
                  <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-foreground"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;