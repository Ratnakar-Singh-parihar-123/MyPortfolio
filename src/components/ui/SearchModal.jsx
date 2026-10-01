import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  Search,
  X,
  ArrowUp,
  ArrowDown,
  CornerDownLeft,
  ExternalLink,
  Linkedin,
  Github,
  Mail,
  Twitter,
  MessageCircle,
} from "lucide-react";

/* =========================================================
   SEARCH DATA
========================================================= */

const searchData = [
  /* =======================================================
     PAGES
  ======================================================= */

  {
    id: "home",
    title: "Home",
    description: "Explore my portfolio and latest work.",
    category: "Pages",
    path: "/",
    keywords: ["home", "main", "portfolio", "landing"],
  },

  {
    id: "about",
    title: "About",
    description: "Learn more about me, my background and development journey.",
    category: "Pages",
    path: "/about",
    keywords: ["about", "profile", "ratnakar", "developer", "background"],
  },

  {
    id: "projects",
    title: "Projects",
    description: "Explore my web, mobile and full-stack projects.",
    category: "Pages",
    path: "/projects",
    keywords: ["projects", "work", "portfolio", "apps", "applications"],
  },

  {
    id: "experience",
    title: "Experience",
    description: "View my internship and professional experience.",
    category: "Pages",
    path: "/experience",
    keywords: ["experience", "internship", "career", "work"],
  },

  {
    id: "skills",
    title: "Tech Stack",
    description: "Technologies, tools and development skills I work with.",
    category: "Pages",
    path: "/skills",
    keywords: [
      "skills",
      "tech",
      "stack",
      "technology",
      "technologies",
      "mern",
      "react",
      "java",
    ],
  },

  {
    id: "achievements",
    title: "Achievements",
    description: "Certifications, accomplishments and coding achievements.",
    category: "Pages",
    path: "/achievements",
    keywords: ["achievements", "certificates", "certifications", "coding"],
  },

  {
    id: "contact",
    title: "Contact",
    description: "Get in touch for opportunities and collaborations.",
    category: "Pages",
    path: "/contact",
    keywords: ["contact", "reach", "connect", "message"],
  },

  {
    id: "education",
    title: "Education",
    description: "My academic journey and educational background.",
    category: "Pages",
    path: "/education",
    keywords: ["education", "college", "school", "btech", "degree"],
  },

  /* =======================================================
     PROJECTS
  ======================================================= */

  {
    id: "vehicle-service",
    title: "Vehicle Service Booking Platform",
    description:
      "MERN-based vehicle service booking platform with real-time communication.",
    category: "Projects",
    path: "/projects",
    keywords: [
      "vehicle",
      "service",
      "booking",
      "mern",
      "socket",
      "socket.io",
      "project",
    ],
  },

  {
    id: "foodmitra",
    title: "FoodMitra",
    description:
      "Food delivery ecosystem with customer, rider and House Tiffin applications.",
    category: "Projects",
    path: "/projects",
    keywords: [
      "foodmitra",
      "food",
      "delivery",
      "rider",
      "customer",
      "tiffin",
      "mern",
      "react native",
      "project",
    ],
  },

  {
    id: "yammiverse",
    title: "YammiVerse",
    description:
      "Food and social-style platform built with modern web technologies.",
    category: "Projects",
    path: "/projects",
    keywords: ["yammiverse", "yammi", "food", "social", "mern", "project"],
  },

  {
    id: "jeevandaan",
    title: "Jeevandaan",
    description:
      "Blood and organ donation platform with OTP, maps and real-time features.",
    category: "Projects",
    path: "/projects",
    keywords: [
      "jeevandaan",
      "blood",
      "organ",
      "donation",
      "otp",
      "twilio",
      "socket.io",
      "mapbox",
      "project",
    ],
  },

  {
    id: "parkeasy",
    title: "ParkEasy",
    description:
      "React Native parking application for discovering and booking parking spaces.",
    category: "Projects",
    path: "/projects",
    keywords: [
      "parkeasy",
      "parking",
      "react native",
      "expo",
      "mobile",
      "project",
    ],
  },

  {
    id: "scalagate",
    title: "ScaleGate",
    description:
      "Java high-performance load balancer focused on system design and scalability.",
    category: "Projects",
    path: "/projects",
    keywords: [
      "scalagate",
      "load balancer",
      "java",
      "system design",
      "dsa",
      "multithreading",
      "networking",
      "backend",
      "project",
    ],
  },

  /* =======================================================
     SKILLS
  ======================================================= */

  {
    id: "react",
    title: "React",
    description: "Frontend development with React.js.",
    category: "Skills",
    path: "/skills",
    keywords: ["react", "frontend", "javascript", "ui"],
  },

  {
    id: "react-native",
    title: "React Native",
    description: "Cross-platform mobile application development.",
    category: "Skills",
    path: "/skills",
    keywords: ["react native", "mobile", "expo", "android", "ios"],
  },

  {
    id: "mern",
    title: "MERN Stack",
    description: "MongoDB, Express.js, React.js and Node.js.",
    category: "Skills",
    path: "/skills",
    keywords: ["mern", "mongodb", "express", "react", "node", "full stack"],
  },

  {
    id: "node",
    title: "Node.js",
    description: "Backend development and REST API development.",
    category: "Skills",
    path: "/skills",
    keywords: ["node", "nodejs", "backend", "express", "api"],
  },

  {
    id: "java",
    title: "Java",
    description: "Java programming, OOP, DSA and backend fundamentals.",
    category: "Skills",
    path: "/skills",
    keywords: ["java", "oop", "dsa", "backend"],
  },

  {
    id: "javascript",
    title: "JavaScript",
    description: "Modern JavaScript and ES6+ development.",
    category: "Skills",
    path: "/skills",
    keywords: ["javascript", "js", "es6", "frontend", "backend"],
  },

  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Problem solving and algorithmic fundamentals.",
    category: "Skills",
    path: "/skills",
    keywords: ["dsa", "algorithms", "data structures", "problem solving"],
  },

  {
    id: "system-design",
    title: "System Design",
    description: "Learning scalable architecture, HLD and LLD concepts.",
    category: "Skills",
    path: "/skills",
    keywords: [
      "system design",
      "hld",
      "lld",
      "architecture",
      "scalability",
      "distributed systems",
    ],
  },

  {
    id: "mongodb",
    title: "MongoDB",
    description: "NoSQL database development with MongoDB.",
    category: "Skills",
    path: "/skills",
    keywords: ["mongodb", "database", "nosql"],
  },

  {
    id: "mysql",
    title: "MySQL",
    description: "Relational database and SQL fundamentals.",
    category: "Skills",
    path: "/skills",
    keywords: ["mysql", "sql", "database", "relational"],
  },

  /* =======================================================
     CONTACT
  ======================================================= */

  {
    id: "email",
    title: "Email Me",
    description: "ratnakarsinghparihar9399@gmail.com",
    category: "Contact",
    type: "contact-email",
    keywords: ["email", "mail", "gmail", "contact"],
  },

  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Connect with me professionally on LinkedIn.",
    category: "Contact",
    externalUrl: "https://www.linkedin.com/in/ratnakarsinghparihar/",
    keywords: ["linkedin", "professional", "social"],
  },

  {
    id: "github",
    title: "GitHub",
    description: "Explore my source code and projects.",
    category: "Contact",
    externalUrl: "https://github.com/Ratnakar-Singh-parihar-123",
    keywords: ["github", "code", "repositories", "projects", "source"],
  },

  {
    id: "twitter",
    title: "Twitter / X",
    description: "Follow me on Twitter / X.",
    category: "Contact",
    externalUrl: "https://x.com/RatnakarSi85551",
    keywords: ["twitter", "x", "social"],
  },
];

/* =========================================================
   POPULAR SEARCHES
========================================================= */

// const POPULAR = ["React", "MERN", "Java", "DSA", "Projects"];

/* =========================================================
   SOCIAL ICONS
========================================================= */

const SOCIAL_ICONS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ratnakarsinghparihar/",
    icon: Linkedin,
    tint: "rgba(10, 102, 194, 0.10)",
    hover: "rgba(10, 102, 194, 0.16)",
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Ratnakar-Singh-parihar-123",
    icon: Github,
    tint: "rgba(100, 116, 139, 0.10)",
    hover: "rgba(100, 116, 139, 0.17)",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: MessageCircle,
    tint: "rgba(244, 63, 94, 0.09)",
    hover: "rgba(244, 63, 94, 0.15)",
  },
  {
    id: "mail",
    label: "Email",
    href: "mailto:ratnakarsinghparihar9399@gmail.com",
    icon: Mail,
    tint: "rgba(16, 185, 129, 0.09)",
    hover: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: "twitter",
    label: "Twitter / X",
    href: "https://twitter.com/",
    icon: Twitter,
    tint: "rgba(71, 85, 105, 0.09)",
    hover: "rgba(71, 85, 105, 0.15)",
  },
];

/* =========================================================
   KEYBOARD BADGE
========================================================= */

const Kbd = ({ children }) => {
  return (
    <span
      className="
        inline-flex
        min-w-[22px]
        items-center
        justify-center
        rounded-md
        bg-slate-100
        px-1.5
        py-1
        text-[10px]
        font-medium
        text-slate-500
        shadow-[inset_0_-1px_0_rgba(15,23,42,0.08)]
        dark:bg-white/[0.07]
        dark:text-slate-400
        dark:shadow-[inset_0_-1px_0_rgba(255,255,255,0.05)]
      "
    >
      {children}
    </span>
  );
};

/* =========================================================
   HIGHLIGHT SEARCH TEXT
========================================================= */

const Highlight = ({ text, query }) => {
  if (!query?.trim()) {
    return <>{text}</>;
  }

  const cleanQuery = query.trim();

  const parts = text.split(new RegExp(`(${escapeRegExp(cleanQuery)})`, "gi"));

  return (
    <>
      {parts.map((part, index) => {
        const matched = part.toLowerCase() === cleanQuery.toLowerCase();

        return matched ? (
          <mark
            key={index}
            className="
              rounded-[4px]
              bg-slate-200
              px-0.5
              text-slate-900
              dark:bg-white/[0.12]
              dark:text-white
            "
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        );
      })}
    </>
  );
};

/* =========================================================
   ESCAPE REGEX
========================================================= */

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* =========================================================
   SEARCH MODAL
========================================================= */

const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();

  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* =======================================================
     RESET WHEN OPENING
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    setQuery("");
    setSelectedIndex(0);

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => window.clearTimeout(timer);
  }, [isOpen]);

  /* =======================================================
     CMD / CTRL + K
  ======================================================= */

  useEffect(() => {
    const handleKeyboardShortcut = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();

        /*
         * IMPORTANT:
         * Since Dock controls this component,
         * Cmd/Ctrl + K needs to communicate with
         * the parent through the custom event.
         */

        window.dispatchEvent(new CustomEvent("openSearchModal"));
      }
    };

    window.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      window.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  /* =======================================================
     HEADER / OTHER COMPONENT SEARCH EVENT
  ======================================================= */

  useEffect(() => {
    const handleOpenSearch = () => {
      /*
       * We cannot directly change parent's state.
       *
       * Instead we support the event by calling a
       * callback event that Dock listens to.
       */

      window.dispatchEvent(new CustomEvent("searchModalRequest"));
    };

    window.addEventListener("openSearchModal", handleOpenSearch);

    return () => {
      window.removeEventListener("openSearchModal", handleOpenSearch);
    };
  }, []);

  /* =======================================================
     IMPORTANT BRIDGE
     
     Dock needs to listen to searchModalRequest.
     This component itself cannot update parent's state.
     
     To make Cmd/Ctrl+K work without changing Dock,
     we use the existing openSearchModal event only when
     this component is already controlled.
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const handleCloseShortcut = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleCloseShortcut);

    return () => {
      window.removeEventListener("keydown", handleCloseShortcut);
    };
  }, [isOpen, onClose]);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /* =======================================================
     SEARCH RESULTS
  ======================================================= */

  const filteredResults = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return [];
    }

    const scored = searchData
      .map((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const keywords = (item.keywords || []).map((keyword) =>
          keyword.toLowerCase(),
        );

        let score = 0;

        if (title === value) {
          score += 100;
        }

        if (title.startsWith(value)) {
          score += 70;
        }

        if (title.includes(value)) {
          score += 50;
        }

        if (description.includes(value)) {
          score += 20;
        }

        keywords.forEach((keyword) => {
          if (keyword === value) {
            score += 60;
          } else if (keyword.startsWith(value)) {
            score += 35;
          } else if (keyword.includes(value)) {
            score += 20;
          }
        });

        return {
          ...item,
          score,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 12);
  }, [query]);

  /* =======================================================
     RESET SELECTED INDEX
  ======================================================= */

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  /* =======================================================
     SCROLL SELECTED RESULT INTO VIEW
  ======================================================= */

  useEffect(() => {
    if (!query.trim()) return;

    const selectedElement = resultsRef.current?.querySelector(
      `[data-search-index="${selectedIndex}"]`,
    );

    selectedElement?.scrollIntoView({
      block: "nearest",
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [selectedIndex, query, reduceMotion]);

  /* =======================================================
     OPEN RESULT
  ======================================================= */

  const openResult = (item) => {
    if (!item) return;

    if (item.externalUrl) {
      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
      onClose?.();
      return;
    }

    if (item.type === "contact-email") {
      window.location.href = "mailto:ratnakarsinghparihar9399@gmail.com";

      onClose?.();
      return;
    }

    if (item.path) {
      navigate(item.path);
      onClose?.();
    }
  };

  /* =======================================================
     KEYBOARD NAVIGATION
  ======================================================= */

  useEffect(() => {
    if (!isOpen) return;

    const handleNavigation = (event) => {
      if (event.key === "ArrowDown") {
        if (!filteredResults.length) return;

        event.preventDefault();

        setSelectedIndex((current) =>
          current >= filteredResults.length - 1 ? 0 : current + 1,
        );
      }

      if (event.key === "ArrowUp") {
        if (!filteredResults.length) return;

        event.preventDefault();

        setSelectedIndex((current) =>
          current <= 0 ? filteredResults.length - 1 : current - 1,
        );
      }

      if (event.key === "Enter") {
        if (!filteredResults.length) return;

        event.preventDefault();

        openResult(filteredResults[selectedIndex]);
      }
    };

    window.addEventListener("keydown", handleNavigation);

    return () => {
      window.removeEventListener("keydown", handleNavigation);
    };
  }, [isOpen, filteredResults, selectedIndex]);

  /* =======================================================
     POPULAR SEARCH
  ======================================================= */

  // const handlePopularSearch = (value) => {
  //   setQuery(value);

  //   window.setTimeout(() => {
  //     inputRef.current?.focus();
  //   }, 20);
  // };

  /* =======================================================
     SOCIAL CLICK
  ======================================================= */

  const handleSocialClick = (item) => {
    if (item.href.startsWith("/")) {
      navigate(item.href);
      onClose?.();
      return;
    }

    if (item.href.startsWith("mailto:")) {
      window.location.href = item.href;
      onClose?.();
      return;
    }

    window.open(item.href, "_blank", "noopener,noreferrer");
    onClose?.();
  };

  /* =======================================================
     BACKDROP CLICK
  ======================================================= */

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeModal = () => {
    onClose?.();
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-modal"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: reduceMotion ? 0.12 : 0.22,
            ease: "easeOut",
          }}
          onMouseDown={handleBackdropClick}
          className="
            fixed
            inset-0
            z-[200]
            flex
            items-start
            justify-center
            overflow-y-auto
            bg-slate-950/[0.18]
            px-4
            pb-10
            pt-[12vh]
            backdrop-blur-[14px]
            dark:bg-black/[0.52]
            sm:px-6
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : -12,
              scale: reduceMotion ? 1 : 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: reduceMotion ? 0 : -8,
              scale: reduceMotion ? 1 : 0.98,
            }}
            transition={{
              duration: reduceMotion ? 0.14 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            onMouseDown={(event) => event.stopPropagation()}
            className="
              w-full
              max-w-[820px]
            "
          >
            {/* =================================================
                SEARCH + SOCIAL
            ================================================= */}

            <div className="flex flex-col w-full gap-3 sm:flex-row sm:items-center">
              {/* =================================================
                  SEARCH BAR
              ================================================= */}

              <div
                className="
                  group
                  relative
                  flex
                  h-[62px]
                  min-w-0
                  flex-1
                  items-center
                  overflow-hidden
                  rounded-full
                  bg-white/[0.97]
                  shadow-[0_18px_55px_rgba(15,23,42,0.13),0_2px_10px_rgba(15,23,42,0.06)]
                  backdrop-blur-2xl
                  dark:bg-[#151619]/[0.98]
                  dark:shadow-[0_22px_70px_rgba(0,0,0,0.38),0_2px_12px_rgba(0,0,0,0.24)]
                "
              >
                {/* SEARCH ICON */}

                <div
                  className="
                    ml-2
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-slate-100/90
                    text-slate-500
                    dark:bg-white/[0.065]
                    dark:text-slate-400
                  "
                >
                  <Search size={20} strokeWidth={2} />
                </div>

                {/* =================================================
                    INPUT
                    IMPORTANT:
                    NO BORDER
                    NO BLUE OUTLINE
                    NO FOCUS RING
                ================================================= */}

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  type="text"
                  placeholder="Search portfolio..."
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Search portfolio"
                  className="
                    spotlight-input
                    h-full
                    min-w-0
                    flex-1
                    bg-transparent
                    px-4
                    text-[15px]
                    font-medium
                    text-slate-900
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:ring-0
                    focus:border-transparent
                    active:outline-none
                    dark:text-white
                    dark:placeholder:text-slate-500
                  "
                  style={{
                    outline: "none",
                    boxShadow: "none",
                    border: "0",
                  }}
                />

                {/* CLEAR BUTTON */}

                <AnimatePresence>
                  {query && (
                    <motion.button
                      type="button"
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      aria-label="Clear search"
                      className="
                        mr-2
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-slate-400
                        transition-all
                        duration-200
                        hover:bg-slate-100
                        hover:text-slate-700
                        dark:hover:bg-white/[0.07]
                        dark:hover:text-white
                      "
                    >
                      <X size={17} />
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* DESKTOP SHORTCUT */}

                {!query && (
                  <div className="mr-4 hidden items-center gap-1.5 sm:flex">
                    <Kbd>⌘</Kbd>
                    <Kbd>K</Kbd>
                  </div>
                )}
              </div>

              {/* =================================================
                  SOCIAL ICONS
                  FULL CIRCLES
              ================================================= */}

              <div className="flex items-center justify-center gap-2 shrink-0 sm:justify-end">
                {SOCIAL_ICONS.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => handleSocialClick(item)}
                      aria-label={item.label}
                      title={item.label}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -2,
                              scale: 1.05,
                            }
                      }
                      whileTap={
                        reduceMotion
                          ? undefined
                          : {
                              scale: 0.93,
                            }
                      }
                      className="
                        flex
                        h-[46px]
                        w-[46px]
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-white/[0.96]
                        text-slate-500
                        shadow-[0_12px_32px_rgba(15,23,42,0.10)]
                        transition-colors
                        duration-200
                        hover:text-slate-900
                        dark:bg-[#151619]/[0.98]
                        dark:text-slate-400
                        dark:shadow-[0_14px_35px_rgba(0,0,0,0.28)]
                        dark:hover:text-white
                      "
                      style={{
                        backgroundColor: item.tint,
                      }}
                      onMouseEnter={(event) => {
                        event.currentTarget.style.backgroundColor = item.hover;
                      }}
                      onMouseLeave={(event) => {
                        event.currentTarget.style.backgroundColor = item.tint;
                      }}
                    >
                      <Icon size={18} strokeWidth={1.9} />
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* =================================================
                POPULAR SEARCHES
            ================================================= */}

            {/* <AnimatePresence initial={false}>
              {!query && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -5,
                  }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.2,
                  }}
                  className="flex flex-wrap items-center gap-2 px-1 mt-3 "
                >
                  <span className="mr-1 text-[10px] font-medium uppercase tracking-[0.12em] text-white/80 drop-shadow-sm">
                    Popular
                  </span>

                  {POPULAR.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handlePopularSearch(item)}
                      className="
                        rounded-full
                        bg-white/[0.78]
                        px-3
                        py-1.5
                        text-[10px]
                        font-medium
                        text-slate-600
                        shadow-[0_6px_20px_rgba(15,23,42,0.07)]
                        transition-all
                        duration-200
                        hover:-translate-y-[1px]
                        hover:bg-white
                        hover:text-slate-900
                        dark:bg-white/[0.08]
                        dark:text-slate-300
                        dark:hover:bg-white/[0.12]
                        dark:hover:text-white
                      "
                    >
                      {item}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence> */}

            {/* =================================================
                RESULTS
                ONLY EXPANDS WHEN USER TYPES
            ================================================= */}

            <AnimatePresence initial={false}>
              {query.trim() && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -8,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -5,
                  }}
                  transition={{
                    duration: reduceMotion ? 0.12 : 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <div
                    ref={resultsRef}
                    className="
                      mt-3
                      max-h-[min(58vh,520px)]
                      overflow-y-auto
                      overscroll-contain
                      rounded-[28px]
                      bg-white/[0.98]
                      p-2
                      shadow-[0_24px_80px_rgba(15,23,42,0.16),0_3px_14px_rgba(15,23,42,0.07)]
                      backdrop-blur-2xl
                      dark:bg-[#151619]/[0.98]
                      dark:shadow-[0_28px_90px_rgba(0,0,0,0.42),0_4px_18px_rgba(0,0,0,0.25)]
                    "
                    style={{
                      scrollbarWidth: "thin",
                    }}
                  >
                    {filteredResults.length > 0 ? (
                      <div className="space-y-1">
                        {filteredResults.map((item, index) => {
                          const isSelected = index === selectedIndex;

                          return (
                            <motion.button
                              key={item.id}
                              type="button"
                              data-search-index={index}
                              onMouseEnter={() => setSelectedIndex(index)}
                              onClick={() => openResult(item)}
                              initial={
                                reduceMotion
                                  ? undefined
                                  : {
                                      opacity: 0,
                                      y: 4,
                                    }
                              }
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              transition={{
                                duration: reduceMotion ? 0.1 : 0.18,
                                delay: reduceMotion
                                  ? 0
                                  : Math.min(index * 0.025, 0.15),
                              }}
                              className={`
                                group
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-[20px]
                                px-3
                                py-3
                                text-left
                                transition-all
                                duration-150
                                ${
                                  isSelected
                                    ? "bg-slate-100/90 dark:bg-white/[0.075]"
                                    : "bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.045]"
                                }
                              `}
                            >
                              {/* RESULT ICON */}

                              <div
                                className={`
                                  flex
                                  h-10
                                  w-10
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-[14px]
                                  transition-all
                                  duration-200
                                  ${
                                    isSelected
                                      ? "bg-white text-slate-800 shadow-sm dark:bg-white/[0.09] dark:text-white"
                                      : "bg-slate-100 text-slate-500 dark:bg-white/[0.055] dark:text-slate-400"
                                  }
                                `}
                              >
                                {item.type === "contact-email" ? (
                                  <Mail size={17} strokeWidth={1.9} />
                                ) : item.externalUrl ? (
                                  <ExternalLink size={16} strokeWidth={1.9} />
                                ) : (
                                  <Search size={16} strokeWidth={1.9} />
                                )}
                              </div>

                              {/* RESULT CONTENT */}

                              <div className="flex-1 min-w-0">
                                <div
                                  className={`
                                    truncate
                                    text-[13px]
                                    font-semibold
                                    ${
                                      isSelected
                                        ? "text-slate-950 dark:text-white"
                                        : "text-slate-800 dark:text-slate-200"
                                    }
                                  `}
                                >
                                  <Highlight text={item.title} query={query} />
                                </div>

                                <div className="mt-0.5 truncate text-[10px] leading-5 text-slate-500 dark:text-slate-500">
                                  <Highlight
                                    text={item.description}
                                    query={query}
                                  />
                                </div>
                              </div>

                              {/* CATEGORY */}

                              <span
                                className="
                                  hidden
                                  shrink-0
                                  rounded-full
                                  bg-slate-100
                                  px-2.5
                                  py-1
                                  text-[9px]
                                  font-medium
                                  text-slate-500
                                  sm:inline-flex
                                  dark:bg-white/[0.055]
                                  dark:text-slate-500
                                "
                              >
                                {item.category}
                              </span>

                              {/* ENTER ICON */}

                              <div
                                className={`
                                  flex
                                  h-7
                                  w-7
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  transition-all
                                  duration-150
                                  ${
                                    isSelected
                                      ? "bg-white text-slate-500 shadow-sm dark:bg-white/[0.08] dark:text-slate-300"
                                      : "text-slate-300 dark:text-slate-600"
                                  }
                                `}
                              >
                                {isSelected ? (
                                  <CornerDownLeft size={14} />
                                ) : (
                                  <ArrowRightIcon />
                                )}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    ) : (
                      /* =================================================
                         NO RESULTS
                      ================================================= */

                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        className="
                          flex
                          min-h-[150px]
                          flex-col
                          items-center
                          justify-center
                          px-6
                          py-10
                          text-center
                        "
                      >
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                            text-slate-400
                            dark:bg-white/[0.06]
                            dark:text-slate-500
                          "
                        >
                          <Search size={20} />
                        </div>

                        <p className="mt-3 text-[13px] font-semibold text-slate-700 dark:text-slate-300">
                          No results found
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          Try another keyword like React, Java or Projects.
                        </p>
                      </motion.div>
                    )}

                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    {filteredResults.length > 0 && (
                      <div
                        className="
                          mt-1
                          flex
                          items-center
                          justify-between
                          px-3
                          pb-1
                          pt-2
                          text-[9px]
                          text-slate-400
                          dark:text-slate-600
                        "
                      >
                        <div className="flex items-center gap-2">
                          <span className="items-center hidden gap-1 sm:flex">
                            <Kbd>
                              <ArrowUp size={10} />
                            </Kbd>

                            <Kbd>
                              <ArrowDown size={10} />
                            </Kbd>

                            <span className="ml-1">Navigate</span>
                          </span>

                          <span className="items-center hidden gap-1 sm:flex">
                            <Kbd>↵</Kbd>
                            <span>Open</span>
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={closeModal}
                          className="
                            flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-2
                            py-1
                            transition-colors
                            hover:bg-slate-100
                            hover:text-slate-600
                            dark:hover:bg-white/[0.06]
                            dark:hover:text-slate-300
                          "
                        >
                          <span>Close</span>
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* =================================================
              GLOBAL INPUT FOCUS FIX
          ================================================= */}

          <style>{`
            .spotlight-input,
            .spotlight-input:hover,
            .spotlight-input:active,
            .spotlight-input:focus,
            .spotlight-input:focus-visible {
              outline: none !important;
              box-shadow: none !important;
              border: 0 !important;
              border-color: transparent !important;
              ring: 0 !important;
            }

            .spotlight-input::-webkit-search-decoration,
            .spotlight-input::-webkit-search-cancel-button,
            .spotlight-input::-webkit-search-results-button,
            .spotlight-input::-webkit-search-results-decoration {
              display: none !important;
            }

            * {
              -webkit-tap-highlight-color: transparent;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* =========================================================
   SMALL ARROW
========================================================= */

const ArrowRightIcon = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
};

export default SearchModal;
