import React, { useState, useEffect, useCallback, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Download,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ArrowUp,
  Menu,
  X,
} from "lucide-react";

import resumefile from "../../../assets/resume/Ratnakar_Singh_Parihar.pdf";

/* =========================================================
   WHATSAPP ICON
   Proper WhatsApp-style logo
========================================================= */

const WhatsAppIcon = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* WhatsApp bubble */}
      <path
        d="M16 2.5C8.544 2.5 2.5 8.544 2.5 16C2.5 18.397 3.127 20.647 4.225 22.617L2.65 28.9L9.13 27.37C11.116 28.43 13.44 29 16 29C23.456 29 29.5 22.956 29.5 15.5C29.5 8.544 23.456 2.5 16 2.5Z"
        fill="white"
      />

      {/* Phone */}
      <path
        d="M21.55 18.72C21.22 18.56 19.6 17.76 19.3 17.65C19 17.54 18.78 17.48 18.55 17.81C18.33 18.14 17.7 18.92 17.51 19.14C17.32 19.36 17.13 19.39 16.8 19.22C16.47 19.06 15.42 18.72 14.18 17.61C13.21 16.75 12.55 15.69 12.36 15.36C12.17 15.03 12.34 14.85 12.5 14.69C12.65 14.54 12.83 14.31 13 14.12C13.17 13.93 13.23 13.8 13.34 13.58C13.45 13.36 13.4 13.17 13.31 13.01C13.23 12.84 12.58 11.22 12.31 10.56C12.04 9.91 11.76 10.02 11.55 10.01C11.36 10 11.14 9.99 10.92 9.99C10.7 9.99 10.34 10.07 10.04 10.4C9.74 10.73 8.9 11.52 8.9 13.14C8.9 14.76 10.07 16.32 10.23 16.54C10.4 16.76 12.54 20.05 15.81 21.46C16.59 21.8 17.2 22.01 17.68 22.17C18.47 22.42 19.19 22.39 19.76 22.3C20.4 22.2 21.73 21.51 22 20.75C22.28 19.99 22.28 19.34 22.19 19.2C22.1 19.07 21.88 18.99 21.55 18.72Z"
        fill="currentColor"
      />
    </svg>
  );
};

/* =========================================================
   FLOATING ACTION BUTTON
========================================================= */

const FloatingActionButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeAction, setActiveAction] = useState(null);

  const fabRef = useRef(null);

  /* =======================================================
     QUICK ACTIONS
  ======================================================= */

  const quickActions = [
    {
      name: "Resume",
      icon: Download,
      href: resumefile,
      color: "from-emerald-500 to-teal-500",
      shadow: "hover:shadow-emerald-500/40",
      ariaLabel: "Download Resume",
      download: true,
    },

    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Ratnakar-Singh-parihar-123",
      color: "from-[#24292e] to-[#0d1117]",
      shadow: "hover:shadow-gray-500/40",
      ariaLabel: "Open GitHub",
    },

    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ratnakarsinghparihar-a87528260/",
      color: "from-[#0A66C2] to-[#004182]",
      shadow: "hover:shadow-blue-500/40",
      ariaLabel: "Open LinkedIn",
    },

    {
      name: "X",
      icon: X,
      href: "https://x.com/RatnakarSi85551",
      color: "from-black to-zinc-800",
      shadow: "hover:shadow-zinc-500/40",
      ariaLabel: "Open X",
    },

    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/krishna_singh_pratihar/",
      color: "from-[#833AB4] via-[#E1306C] to-[#F77737]",
      shadow: "hover:shadow-pink-500/40",
      ariaLabel: "Open Instagram",
    },

    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      href: "https://wa.me/919399741051?text=Hi%20Ratnakar%2C%20I%20want%20to%20connect%20with%20you!",
      color: "from-[#25D366] to-[#128C7E]",
      shadow: "hover:shadow-[#25D366]/50",
      ariaLabel: "Chat on WhatsApp",
      whatsapp: true,
    },

    {
      name: "Email",
      icon: Mail,
      href: "mailto:ratnakarsinghparihar9399@gmail.com",
      color: "from-[#EA4335] to-[#C5221F]",
      shadow: "hover:shadow-red-500/40",
      ariaLabel: "Send Email",
    },
  ];

  /* =======================================================
     SCROLL HANDLER
  ======================================================= */

  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      documentHeight > 0
        ? Math.min(Math.max(scrollTop / documentHeight, 0), 1)
        : 0;

    setScrollProgress(progress);
    setIsVisible(scrollTop > 180);

    /*
      Automatically close menu when scrolling
      for a cleaner mobile/desktop experience.
    */
    if (scrollTop < 180) {
      setIsExpanded(false);
    }
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

    window.addEventListener("scroll", scrollListener, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScroll]);

  /* =======================================================
     CLOSE MENU
  ======================================================= */

  useEffect(() => {
    if (!isExpanded) return;

    const handleClickOutside = (event) => {
      if (fabRef.current && !fabRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEscape);
    };
  }, [isExpanded]);

  /* =======================================================
     ACTION HANDLER
  ======================================================= */

  const handleActionClick = (action) => {
    setIsExpanded(false);
    setActiveAction(null);

    /* Resume download */
    if (action.download) {
      const link = document.createElement("a");

      link.href = action.href;
      link.download = "Ratnakar_Singh_Parihar_Resume.pdf";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return;
    }

    /* External links */
    if (typeof action.href === "string" && action.href.startsWith("http")) {
      window.open(action.href, "_blank", "noopener,noreferrer");

      return;
    }

    /* mailto */
    window.location.href = action.href;
  };

  /* =======================================================
     SCROLL TO TOP
  ======================================================= */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsExpanded(false);
  };

  /* =======================================================
     PROGRESS RING
  ======================================================= */

  const radius = 25;

  const circumference = 2 * Math.PI * radius;

  const strokeDashoffset = circumference * (1 - scrollProgress);

  /* =======================================================
     ACTION MENU ANIMATION
  ======================================================= */

  const containerVariants = {
    hidden: {
      opacity: 0,
      pointerEvents: "none",
    },

    visible: {
      opacity: 1,
      pointerEvents: "auto",

      transition: {
        staggerChildren: 0.055,
        delayChildren: 0.04,
      },
    },

    exit: {
      opacity: 0,

      transition: {
        staggerChildren: 0.025,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 18,
      scale: 0.78,
    },

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,

      transition: {
        type: "spring",
        stiffness: 420,
        damping: 24,
        mass: 0.7,
      },
    },

    exit: {
      opacity: 0,
      x: 16,
      scale: 0.78,

      transition: {
        duration: 0.12,
        ease: "easeOut",
      },
    },
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={fabRef}
          initial={{
            opacity: 0,
            scale: 0.75,
            y: 45,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            y: 45,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
          className="
            fixed
            z-[9999]
            right-4
            bottom-4
            sm:right-6
            sm:bottom-6
            md:right-8
            md:bottom-8
          "
        >
          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <AnimatePresence mode="sync">
            {isExpanded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="
                  mb-4
                  flex
                  flex-col
                  items-end
                  gap-2.5
                  sm:gap-3
                "
              >
                {quickActions.map((action, index) => {
                  const ActionIcon = action.icon;

                  const isWhatsApp = action.whatsapp;

                  return (
                    <motion.div
                      key={action.name}
                      variants={itemVariants}
                      className="relative flex items-center "
                      onMouseEnter={() => setActiveAction(index)}
                      onMouseLeave={() => setActiveAction(null)}
                    >
                      {/* ==================================
                            TOOLTIP
                        ================================== */}

                      <AnimatePresence>
                        {activeAction === index && (
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: 8,
                              scale: 0.92,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              x: 8,
                              scale: 0.92,
                            }}
                            transition={{
                              duration: 0.16,
                            }}
                            className="
                                pointer-events-none
                                absolute
                                right-full
                                mr-3
                                hidden
                                whitespace-nowrap
                                rounded-lg
                                border
                                border-black/10
                                bg-white/95
                                px-3
                                py-1.5
                                text-xs
                                font-semibold
                                text-gray-800
                                shadow-lg
                                backdrop-blur-xl
                                dark:border-white/10
                                dark:bg-zinc-900/95
                                dark:text-white
                                sm:block
                              "
                          >
                            {action.name}

                            <span className="absolute right-0 w-2 h-2 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white border-t border-r top-1/2 border-black/10 dark:border-white/10 dark:bg-zinc-900" />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* ==================================
                            ACTION BUTTON
                        ================================== */}

                      <motion.button
                        type="button"
                        onClick={() => handleActionClick(action)}
                        whileHover={{
                          scale: 1.1,
                          x: -4,
                        }}
                        whileTap={{
                          scale: 0.91,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 22,
                        }}
                        className={`
                            group
                            relative
                            flex
                            h-11
                            w-11
                            sm:h-12
                            sm:w-12
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-full
                            bg-gradient-to-br
                            ${action.color}
                            ${action.shadow}
                            text-white
                            shadow-lg
                            ring-1
                            ring-white/20
                            transition-shadow
                            duration-300
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-indigo-500
                            focus-visible:ring-offset-2
                            dark:ring-white/10
                            dark:focus-visible:ring-offset-zinc-950
                          `}
                        aria-label={action.ariaLabel}
                      >
                        {/* =================================
                              SOFT INNER GLOW
                          ================================= */}

                        <span className="absolute inset-0 transition-colors duration-300 rounded-full pointer-events-none bg-white/0 group-hover:bg-white/10" />

                        {/* =================================
                              WHATSAPP GLOW
                          ================================= */}

                        {isWhatsApp && (
                          <>
                            <motion.span
                              className="absolute inset-0 rounded-full pointer-events-none bg-white/10"
                              animate={{
                                opacity: [0.15, 0.35, 0.15],
                              }}
                              transition={{
                                duration: 2.2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />

                            <span
                              className="
                                  pointer-events-none
                                  absolute
                                  -inset-1
                                  rounded-full
                                  border
                                  border-[#25D366]/40
                                "
                            />
                          </>
                        )}

                        {/* =================================
                              ICON
                          ================================= */}

                        <ActionIcon
                          size={isWhatsApp ? 25 : 20}
                          strokeWidth={isWhatsApp ? undefined : 2.1}
                          className={`
                              relative
                              z-10
                              ${isWhatsApp ? "drop-shadow-sm" : ""}
                            `}
                        />

                        {/* =================================
                              SHINE
                          ================================= */}

                        <span
                          className="
                              pointer-events-none
                              absolute
                              inset-y-0
                              -left-full
                              w-1/2
                              skew-x-[-20deg]
                              bg-gradient-to-r
                              from-transparent
                              via-white/25
                              to-transparent
                              transition-all
                              duration-700
                              group-hover:left-[120%]
                            "
                        />
                      </motion.button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              MAIN FAB
          ================================================= */}

          <div className="relative">
            {/* ==============================================
                OUTER GLOW
            ============================================== */}

            <motion.div
              animate={{
                scale: isExpanded ? 1.18 : 1,
                opacity: isExpanded ? 0.7 : 0.35,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full pointer-events-none bg-indigo-500/30 blur-2xl"
            />

            {/* ==============================================
                PROGRESS RING
            ============================================== */}

            <svg
              className="
                pointer-events-none
                absolute
                -inset-[3px]
                h-[62px]
                w-[62px]
                -rotate-90
              "
              viewBox="0 0 56 56"
            >
              <defs>
                <linearGradient
                  id="fabProgressGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#6366f1" />

                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>

              {/* Background ring */}

              <circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="text-gray-200 dark:text-zinc-700"
              />

              {/* Progress */}

              <motion.circle
                cx="28"
                cy="28"
                r={radius}
                fill="none"
                stroke="url(#fabProgressGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{
                  strokeDashoffset: strokeDashoffset,
                }}
                transition={{
                  duration: 0.18,
                  ease: "linear",
                }}
              />
            </svg>

            {/* ==============================================
                MAIN BUTTON
            ============================================== */}

            <motion.button
              type="button"
              onClick={() =>
                scrollProgress > 0.95
                  ? scrollToTop()
                  : setIsExpanded((prev) => !prev)
              }
              whileHover={{
                scale: 1.07,
              }}
              whileTap={{
                scale: 0.92,
              }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                scale: {
                  type: "spring",
                  stiffness: 400,
                  damping: 22,
                },
              }}
              className="relative flex items-center justify-center overflow-hidden text-white transition-shadow duration-300 rounded-full shadow-2xl group h-14 w-14 bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-700 shadow-indigo-500/30 ring-1 ring-white/20 hover:shadow-indigo-500/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:ring-white/10 dark:focus-visible:ring-offset-zinc-950"
              aria-label={
                scrollProgress > 0.95
                  ? "Scroll to top"
                  : isExpanded
                    ? "Close quick actions"
                    : "Open quick actions"
              }
            >
              {/* =========================================
                  INNER GRADIENT
              ========================================= */}

              <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/15 to-transparent" />

              {/* =========================================
                  HOVER GLOW
              ========================================= */}

              <span className="absolute inset-0 transition-colors duration-300 rounded-full pointer-events-none bg-white/0 group-hover:bg-white/10" />

              {/* =========================================
                  ICON
              ========================================= */}

              <AnimatePresence mode="wait">
                {scrollProgress > 0.95 ? (
                  <motion.div
                    key="arrow"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    transition={{
                      duration: 0.18,
                    }}
                    className="relative z-10"
                  >
                    <ArrowUp size={24} strokeWidth={2.2} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      rotate: -45,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: isExpanded ? 90 : 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                      rotate: 45,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 22,
                    }}
                    className="relative z-10"
                  >
                    {isExpanded ? (
                      <X size={24} strokeWidth={2.2} />
                    ) : (
                      <Menu size={24} strokeWidth={2.2} />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* =========================================
                  BUTTON SHINE
              ========================================= */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-y-0
                  -left-full
                  w-1/3
                  skew-x-[-20deg]
                  bg-gradient-to-r
                  from-transparent
                  via-white/20
                  to-transparent
                  transition-all
                  duration-700
                  group-hover:left-[130%]
                "
              />
            </motion.button>

            {/* =================================================
                ACTIVE INDICATOR
            ================================================= */}

            {!isExpanded && scrollProgress > 0.08 && scrollProgress < 0.95 && (
              <motion.span
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
                }}
                className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-3.5
                    w-3.5
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-white
                    bg-emerald-500
                    dark:border-zinc-950
                  "
              >
                <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 animate-ping" />
              </motion.span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActionButton;
