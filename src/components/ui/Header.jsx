import React, { useEffect, useRef, useState } from "react";
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
  Calendar,
  Search,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { ThemeToggle } from "../ThemeProvider";
import BookMyCallModal from "./BookMyCallModal";
import SearchModal from "./SearchModal";

import logoImg from "../../assets/logo/logo.jpeg";
import resumefile from "../../assets/resume/Ratnakar_Singh_Parihar.pdf";

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const NAV_LINKS = [
  {
    path: "/",
    label: "Home",
    icon: Home,
    color: "text-blue-500 dark:text-blue-400",
    bg: "bg-blue-500/10 dark:bg-blue-400/10",
  },
  {
    path: "/about",
    label: "About",
    icon: User,
    color: "text-slate-600 dark:text-slate-400",
    bg: "bg-slate-500/10 dark:bg-slate-400/10",
  },
  {
    path: "/skills",
    label: "Skills",
    icon: BookOpen,
    color: "text-purple-500 dark:text-purple-400",
    bg: "bg-purple-500/10 dark:bg-purple-400/10",
  },
  {
    path: "/projects",
    label: "Projects",
    icon: Video,
    color: "text-red-500 dark:text-red-400",
    bg: "bg-red-500/10 dark:bg-red-400/10",
  },
  {
    path: "/experience",
    label: "Experience",
    icon: Briefcase,
    color: "text-orange-500 dark:text-orange-400",
    bg: "bg-orange-500/10 dark:bg-orange-400/10",
  },
  {
    path: "/skills#tech-stack",
    label: "Tech Stack",
    icon: Cpu,
    color: "text-cyan-500 dark:text-cyan-400",
    bg: "bg-cyan-500/10 dark:bg-cyan-400/10",
  },
  {
    path: "/achievements",
    label: "Achievements",
    icon: Trophy,
    color: "text-emerald-500 dark:text-emerald-400",
    bg: "bg-emerald-500/10 dark:bg-emerald-400/10",
  },
  {
    path: "/contact",
    label: "Contact",
    icon: MessageSquare,
    color: "text-pink-500 dark:text-pink-400",
    bg: "bg-pink-500/10 dark:bg-pink-400/10",
  },
  {
    path: "/education",
    label: "Education",
    icon: GraduationCap,
    color: "text-indigo-500 dark:text-indigo-400",
    bg: "bg-indigo-500/10 dark:bg-indigo-400/10",
  },
  {
    path: "mailto:ratnakarsinghparihar9399@gmail.com",
    label: "Email",
    icon: Mail,
    color: "text-teal-500 dark:text-teal-400",
    bg: "bg-teal-500/10 dark:bg-teal-400/10",
    isExternal: true,
  },
];

/* =========================================================
   DRAWER ANIMATION
========================================================= */

const drawerVariants = {
  hidden: {
    x: "100%",
    opacity: 0.98,
  },

  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 34,
      mass: 0.8,
    },
  },

  exit: {
    x: "100%",
    opacity: 0.98,
    transition: {
      duration: 0.24,
      ease: "easeInOut",
    },
  },
};

/* =========================================================
   OVERLAY ANIMATION
========================================================= */

const overlayVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.22,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.18,
    },
  },
};

/* =========================================================
   MENU ANIMATION
========================================================= */

const menuContainerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.045,
      delayChildren: 0.08,
    },
  },
};

const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: 18,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.28,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   HEADER
========================================================= */

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  /*
   * SEARCH MODAL
   */
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  /*
   * HEADER VISIBILITY
   *
   * true  = visible
   * false = hidden
   */
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const location = useLocation();

  const bookTimeoutRef = useRef(null);

  /*
   * Previous scroll position.
   */
  const lastScrollY = useRef(0);

  /*
   * Prevent very small scroll movements from
   * constantly showing/hiding the header.
   */
  const scrollThreshold = 8;

  /* =========================================================
     CLOSE DRAWER WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setIsDrawerOpen(false);

    /*
     * Whenever route changes, make sure header
     * is visible again.
     */
    setIsHeaderVisible(true);

    lastScrollY.current = window.scrollY;
  }, [location.pathname]);

  /* =========================================================
     HEADER SHOW / HIDE ON SCROLL
  ========================================================= */

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      /*
       * Always show header when user is at the top.
       */
      if (currentScrollY <= 10) {
        setIsHeaderVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      /*
       * Calculate scroll difference.
       */
      const scrollDifference = currentScrollY - lastScrollY.current;

      /*
       * Ignore tiny movements.
       */
      if (Math.abs(scrollDifference) < scrollThreshold) {
        return;
      }

      /*
       * Scrolling DOWN
       *
       * Hide header.
       */
      if (scrollDifference > 0) {
        /*
         * Don't hide header if drawer/modal is open.
         */
        if (!isDrawerOpen && !isSearchModalOpen && !isBookModalOpen) {
          setIsHeaderVisible(false);
        }
      } else {
        /*
         * Scrolling UP
         *
         * Show header.
         */
        setIsHeaderVisible(true);
      }

      /*
       * Update previous position.
       */
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDrawerOpen, isSearchModalOpen, isBookModalOpen]);

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

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

  /* =========================================================
     CLEAN BOOK TIMEOUT
  ========================================================= */

  useEffect(() => {
    return () => {
      if (bookTimeoutRef.current) {
        clearTimeout(bookTimeoutRef.current);
      }
    };
  }, []);

  /* =========================================================
     SEARCH
     
     EXACTLY LIKE DOCK
  ========================================================= */

  const handleSearchClick = () => {
    /*
     * Close mobile drawer.
     */
    setIsDrawerOpen(false);

    /*
     * Keep header visible while modal is open.
     */
    setIsHeaderVisible(true);

    /*
     * Open SearchModal.
     */
    setIsSearchModalOpen(true);
  };

  /* =========================================================
     BOOK MY CALL
  ========================================================= */

  const handleBookClick = () => {
    setIsDrawerOpen(false);

    /*
     * Keep header visible.
     */
    setIsHeaderVisible(true);

    setIsTransitioning(true);

    if (bookTimeoutRef.current) {
      clearTimeout(bookTimeoutRef.current);
    }

    bookTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setIsBookModalOpen(true);
    }, 400);
  };

  /* =========================================================
     ACTIVE LINK
  ========================================================= */

  const isLinkActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    if (path.includes("#")) {
      const basePath = path.split("#")[0];

      return location.pathname === basePath;
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <>
      {/* =======================================================
          MAIN HEADER
      ======================================================== */}

      <motion.header
        initial={false}
        animate={{
          y: isHeaderVisible ? 0 : "-130%",
          opacity: isHeaderVisible ? 1 : 0,
        }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          top-0
          left-0
          right-0
          z-[100]

          px-3
          sm:px-6
          lg:px-8

          pt-3
          sm:pt-4

          pointer-events-none
        "
      >
        <div className="mx-auto max-w-7xl">
          <div
            className="
              pointer-events-auto

              flex
              items-center
              justify-between

              h-[58px]
              sm:h-[64px]

              px-2.5
              sm:px-3

              rounded-2xl
              sm:rounded-[20px]
            "
          >
            {/* =================================================
                BRAND
            ================================================== */}

            <Link
              to="/"
              className="
                flex
                items-center
                gap-2.5
                sm:gap-3

                min-w-0
                group

                focus:outline-none
              "
            >
              {/* Logo */}

              <div
                className="
                  relative
                  shrink-0

                  w-9
                  h-9
                  sm:w-10
                  sm:h-10

                  rounded-xl
                  overflow-hidden

                  border
                  border-slate-200/80
                  dark:border-slate-700/80

                  bg-white
                  dark:bg-slate-900

                  p-0.5

                  shadow-sm

                  transition-all
                  duration-300

                  group-hover:scale-[1.04]
                  group-hover:shadow-md
                "
              >
                <img
                  src={logoImg}
                  alt="Ratnakar Singh Parihar"
                  className="
                    object-cover
                    w-full
                    h-full
                    rounded-[9px]
                  "
                  onError={(e) => {
                    e.target.onerror = null;

                    e.target.parentElement.innerHTML =
                      '<div class="w-full h-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm rounded-lg">R</div>';
                  }}
                />

                <span
                  className="
                    absolute
                    right-0
                    bottom-0

                    w-2.5
                    h-2.5

                    rounded-full

                    bg-emerald-500

                    border-2
                    border-white
                    dark:border-slate-900
                  "
                />
              </div>

              {/* Name */}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="
                      max-w-[155px]
                      sm:max-w-none

                      truncate

                      text-[13px]
                      sm:text-[15px]

                      font-bold
                      leading-tight
                      tracking-tight

                      text-slate-900
                      dark:text-white

                      transition-colors
                      duration-200

                      group-hover:text-indigo-600
                      dark:group-hover:text-indigo-400
                    "
                  >
                    Ratnakar Singh Parihar
                  </span>

                  <span
                    className="
                      hidden
                      lg:inline-flex

                      items-center
                      gap-1

                      px-2
                      py-0.5

                      rounded-full

                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider

                      text-indigo-600
                      dark:text-indigo-400

                      bg-indigo-500/10

                      border
                      border-indigo-500/15
                    "
                  >
                    <Sparkles size={9} />
                    Developer
                  </span>
                </div>

                <span
                  className="
                    hidden
                    sm:block

                    mt-0.5

                    text-[10px]
                    sm:text-[11px]

                    font-medium

                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Full Stack Developer
                </span>
              </div>
            </Link>

            {/* =================================================
                DESKTOP ACTIONS
            ================================================== */}

            <div className="items-center hidden gap-2 md:flex">
              {/* SEARCH */}

              <button
                type="button"
                onClick={handleSearchClick}
                aria-label="Open search"
                className="
                  group

                  flex
                  items-center
                  gap-2

                  rounded-full

                  border
                  border-black/10
                  dark:border-white/10

                  bg-white/70
                  dark:bg-white/[0.06]

                  px-4
                  py-2

                  text-sm
                  font-medium

                  text-gray-700
                  dark:text-white/80

                  shadow-sm
                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-black/20
                  dark:hover:border-white/20

                  hover:bg-white
                  dark:hover:bg-white/[0.1]

                  hover:shadow-md

                  active:scale-[0.97]

                  focus:outline-none
                  focus-visible:ring-0
                "
              >
                <Search
                  size={16}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>Search</span>
              </button>

              {/* RESUME */}

              <a
                href={resumefile}
                download="Ratnakar_Singh_Parihar_Resume.pdf"
                className="
                  group

                  inline-flex
                  items-center
                  gap-2

                  h-9
                  px-3.5

                  rounded-xl

                  bg-slate-900
                  dark:bg-white

                  text-white
                  dark:text-slate-900

                  text-xs
                  font-semibold

                  shadow-sm

                  hover:shadow-md
                  hover:-translate-y-0.5

                  transition-all
                  duration-200
                "
              >
                <Download
                  size={14}
                  className="
                    transition-transform
                    duration-200

                    group-hover:-translate-y-0.5
                  "
                />

                <span>Resume</span>
              </a>

              {/* DIVIDER */}

              <div
                className="
                  w-px
                  h-7
                  mx-0.5

                  bg-slate-200
                  dark:bg-slate-800
                "
              />

              {/* THEME */}

              <ThemeToggle />
            </div>

            {/* =================================================
                MOBILE ACTIONS
            ================================================== */}

            <div
              className="
                flex
                md:hidden
                items-center
                gap-1.5
              "
            >
              {/* SEARCH */}

              <button
                type="button"
                onClick={handleSearchClick}
                aria-label="Open search"
                className="
                  group

                  flex
                  items-center
                  justify-center

                  w-10
                  h-10

                  rounded-full

                  border
                  border-black/10
                  dark:border-white/10

                  bg-white/70
                  dark:bg-white/[0.06]

                  text-gray-700
                  dark:text-white/80

                  shadow-sm
                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:bg-white
                  dark:hover:bg-white/[0.1]

                  hover:shadow-md

                  active:scale-95

                  focus:outline-none
                  focus-visible:ring-0
                "
              >
                <Search
                  size={17}
                  strokeWidth={2}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </button>

              {/* THEME */}

              <ThemeToggle />

              {/* MENU */}

              <button
                type="button"
                onClick={() => {
                  setIsHeaderVisible(true);
                  setIsDrawerOpen(true);
                }}
                className="flex items-center justify-center transition-all duration-200 border w-9 h-9 rounded-xl border-slate-200/80 dark:border-slate-700/80 bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95"
                aria-label="Open navigation menu"
              >
                <Menu size={19} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* =======================================================
          MOBILE DRAWER
      ======================================================== */}

      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[150] md:hidden">
            {/* BACKDROP */}

            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsDrawerOpen(false)}
              className="
                absolute
                inset-0

                bg-slate-950/45
                dark:bg-black/65

                backdrop-blur-[4px]
              "
            />

            {/* DRAWER */}

            <motion.aside
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
                absolute

                top-0
                right-0

                flex
                flex-col

                w-[88%]
                max-w-[390px]

                h-full

                overflow-hidden

                bg-white
                dark:bg-slate-950

                border-l
                border-slate-200
                dark:border-slate-800

                shadow-[-20px_0_60px_rgba(15,23,42,0.16)]
                dark:shadow-[-20px_0_60px_rgba(0,0,0,0.5)]
              "
            >
              {/* DRAWER TOP */}

              <div className="px-5 pt-6 pb-5 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center justify-between">
                  {/* PROFILE */}

                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div
                        className="
                          w-11
                          h-11

                          rounded-xl
                          overflow-hidden

                          border
                          border-slate-200
                          dark:border-slate-700

                          bg-white
                          dark:bg-slate-900

                          p-0.5
                        "
                      >
                        <img
                          src={logoImg}
                          alt="Ratnakar Singh Parihar"
                          className="
                            object-cover
                            w-full
                            h-full
                            rounded-[9px]
                          "
                        />
                      </div>

                      <span
                        className="
                          absolute
                          right-0
                          bottom-0

                          w-2.5
                          h-2.5

                          rounded-full

                          bg-emerald-500

                          border-2
                          border-white
                          dark:border-slate-950
                        "
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-sm font-bold truncate text-slate-900 dark:text-white">
                        Ratnakar Singh Parihar
                      </h2>

                      <p
                        className="
                          mt-0.5

                          text-[10px]
                          font-semibold

                          text-indigo-600
                          dark:text-indigo-400
                        "
                      >
                        Full Stack Developer
                      </p>
                    </div>
                  </div>

                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center justify-center transition-all duration-200 w-9 h-9 rounded-xl text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-900/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 active:scale-95"
                    aria-label="Close navigation menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* INTRO */}

                <div
                  className="
                    flex
                    items-center
                    gap-2

                    mt-4

                    px-3
                    py-2.5

                    rounded-xl

                    bg-indigo-500/[0.045]
                    dark:bg-indigo-400/[0.06]

                    border
                    border-indigo-500/[0.10]
                    dark:border-indigo-400/[0.12]
                  "
                >
                  <div className="flex items-center justify-center rounded-lg w-7 h-7 bg-indigo-500/10 dark:bg-indigo-400/10">
                    <Sparkles
                      size={13}
                      className="text-indigo-500 dark:text-indigo-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className="
                        text-[10px]
                        font-semibold

                        text-slate-800
                        dark:text-slate-200
                      "
                    >
                      Welcome to my portfolio
                    </p>

                    <p
                      className="
                        text-[9px]

                        text-slate-500
                        dark:text-slate-500
                      "
                    >
                      Explore my work & experience
                    </p>
                  </div>
                </div>
              </div>

              {/* NAVIGATION */}

              <div className="flex-1 px-4 py-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800 scrollbar-track-transparent">
                <div className="px-2 mb-3">
                  <p
                    className="
                      text-[10px]

                      font-bold
                      uppercase
                      tracking-[0.16em]

                      text-slate-400
                      dark:text-slate-500
                    "
                  >
                    Navigation
                  </p>
                </div>

                <motion.nav
                  variants={menuContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1"
                >
                  {NAV_LINKS.map((link) => {
                    const Icon = link.icon;

                    const active = isLinkActive(link.path);

                    /* EXTERNAL */

                    if (link.isExternal) {
                      return (
                        <motion.a
                          key={link.path}
                          variants={menuItemVariants}
                          href={link.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className="
                            group

                            flex
                            items-center

                            gap-3

                            w-full

                            px-3
                            py-2.5

                            rounded-xl

                            text-sm
                            font-medium

                            text-slate-700
                            dark:text-slate-300

                            hover:bg-slate-100/70
                            dark:hover:bg-slate-900/70

                            transition-all
                            duration-200
                          "
                        >
                          <span
                            className={`
                              flex
                              items-center
                              justify-center

                              w-9
                              h-9

                              rounded-xl

                              ${link.bg}

                              transition-transform
                              duration-200

                              group-hover:scale-105
                            `}
                          >
                            <Icon size={17} className={link.color} />
                          </span>

                          <span className="flex-1">{link.label}</span>

                          <ArrowUpRight
                            size={14}
                            className="transition-all duration-200 -translate-x-1 opacity-0 text-slate-400 group-hover:opacity-100 group-hover:translate-x-0"
                          />
                        </motion.a>
                      );
                    }

                    /* INTERNAL */

                    return (
                      <motion.div key={link.path} variants={menuItemVariants}>
                        <Link
                          to={link.path}
                          onClick={() => setIsDrawerOpen(false)}
                          className={`
                            group
                            relative

                            flex
                            items-center

                            gap-3

                            w-full

                            px-3
                            py-2.5

                            rounded-xl

                            text-sm

                            transition-all
                            duration-200

                            ${
                              active
                                ? `
                                  bg-indigo-500/[0.07]
                                  dark:bg-indigo-400/[0.08]

                                  text-indigo-700
                                  dark:text-indigo-300

                                  font-semibold
                                `
                                : `
                                  text-slate-700
                                  dark:text-slate-300

                                  font-medium

                                  hover:bg-slate-100/70
                                  dark:hover:bg-slate-900/70
                                `
                            }
                          `}
                        >
                          {active && (
                            <motion.span
                              layoutId="activeMenuIndicator"
                              className="absolute left-0 w-1 -translate-y-1/2 bg-indigo-500 rounded-r-full h-7 dark:bg-indigo-400 top-1/2"
                            />
                          )}

                          <span
                            className={`
                              flex
                              items-center
                              justify-center

                              w-9
                              h-9

                              rounded-xl

                              ${link.bg}

                              transition-all
                              duration-200

                              group-hover:scale-105
                            `}
                          >
                            <Icon size={17} className={link.color} />
                          </span>

                          <span className="flex-1">{link.label}</span>

                          {active && (
                            <span
                              className="
                                w-1.5
                                h-1.5

                                rounded-full

                                bg-indigo-500
                                dark:bg-indigo-400
                              "
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.nav>
              </div>

              {/* DRAWER FOOTER */}

              <div className="p-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
                {/* BOOK CALL */}

                <button
                  type="button"
                  onClick={handleBookClick}
                  className="
                    group
                    relative

                    flex
                    items-center
                    justify-center

                    w-full
                    h-11

                    gap-2

                    rounded-xl

                    overflow-hidden

                    text-sm
                    font-semibold
                    text-white

                    bg-gradient-to-r
                    from-blue-600
                    via-indigo-600
                    to-purple-600

                    shadow-lg
                    shadow-indigo-500/20

                    hover:shadow-indigo-500/30
                    hover:-translate-y-0.5

                    active:translate-y-0

                    transition-all
                    duration-200
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0

                      bg-white/10

                      translate-x-[-100%]

                      group-hover:translate-x-[100%]

                      transition-transform
                      duration-700
                    "
                  />

                  <Calendar size={16} />

                  <span>Book My Call</span>

                  <ArrowUpRight
                    size={14}
                    className="
                      transition-transform
                      duration-200

                      group-hover:translate-x-0.5
                      group-hover:-translate-y-0.5
                    "
                  />
                </button>

                {/* RESUME */}

                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  className="flex items-center justify-center w-full h-10 gap-2 mt-2 text-xs font-semibold transition-all duration-200 bg-white border dark:bg-slate-900 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <Download size={14} className="text-indigo-500" />

                  <span>Download Resume</span>
                </a>

                {/* COPYRIGHT */}

                <p
                  className="
                    mt-3

                    text-center

                    text-[9px]

                    text-slate-400
                    dark:text-slate-600
                  "
                >
                  © {new Date().getFullYear()} Ratnakar Singh Parihar
                </p>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* =======================================================
          BOOK CALL LOADING
      ======================================================== */}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="
              fixed
              inset-0

              z-[200]

              flex
              flex-col
              items-center
              justify-center

              text-center

              p-4

              bg-slate-950/45
              dark:bg-black/65

              backdrop-blur-md
            "
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
              duration: 0.2,
            }}
          >
            <div className="relative flex items-center justify-center mb-4 w-14 h-14">
              <div className="absolute inset-0 border-4 rounded-full border-indigo-500/20" />

              <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />

              <Calendar size={18} className="text-indigo-400" />
            </div>

            <p className="text-sm font-semibold tracking-wide text-white">
              Opening Calendar Scheduler...
            </p>

            <p className="mt-1 text-[11px] text-slate-300">Just a moment</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =======================================================
          BOOK MY CALL MODAL
      ======================================================== */}

      <BookMyCallModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* =======================================================
          SEARCH MODAL
      ======================================================== */}

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Header;
