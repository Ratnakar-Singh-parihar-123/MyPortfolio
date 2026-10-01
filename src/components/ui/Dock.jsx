import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

import {
  House,
  UserRound,
  Layers3,
  BriefcaseBusiness,
  Code2,
  Medal,
  MessagesSquare,
  GraduationCap,
  Mail,
  Search as SearchIcon,
  PhoneCall,
  ArrowRight,
  Sparkles,
  X,
  CalendarDays,
} from "lucide-react";

import BookMyCallModal from "./BookMyCallModal";
import SearchModal from "./SearchModal";

/* =========================================================
   NAVIGATION ITEMS
========================================================= */

const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: House,
    href: "/",
    type: "route",
    color: "#60A5FA",
    tint: "96,165,250",
  },
  {
    id: "about",
    label: "About",
    icon: UserRound,
    href: "/about",
    type: "route",
    color: "#A78BFA",
    tint: "167,139,250",
  },
  {
    id: "projects",
    label: "Projects",
    icon: Layers3,
    href: "/projects",
    type: "route",
    color: "#818CF8",
    tint: "129,140,248",
  },
  {
    id: "experience",
    label: "Experience",
    icon: BriefcaseBusiness,
    href: "/experience",
    type: "route",
    color: "#FB923C",
    tint: "251,146,60",
  },
  {
    id: "tech-stack",
    label: "Tech Stack",
    icon: Code2,
    href: "/skills",
    type: "route",
    color: "#22D3EE",
    tint: "34,211,238",
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: Medal,
    href: "/achievements",
    type: "route",
    color: "#FBBF24",
    tint: "251,191,36",
  },
  {
    id: "contact",
    label: "Contact",
    icon: MessagesSquare,
    href: "/contact",
    type: "route",
    color: "#FB7185",
    tint: "251,113,133",
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    href: "/education",
    type: "route",
    color: "#34D399",
    tint: "52,211,153",
  },

  /* =======================================================
     EMAIL
  ======================================================= */

  {
    id: "email",
    label: "Email",
    icon: Mail,
    href: "mailto:ratnakarsinghparihar9399@gmail.com",
    type: "external",
    color: "#10B981",
    tint: "16,185,129",
  },

  /* =======================================================
     SEARCH
  ======================================================= */

  {
    id: "search",
    label: "Search",
    icon: SearchIcon,
    type: "action",
    color: "#94A3B8",
    tint: "148,163,184",
  },

  /* =======================================================
     BOOK A CALL
  ======================================================= */

  {
    id: "book-call",
    label: "Book a Call",
    icon: PhoneCall,
    type: "action",
    isProminent: true,
    color: "#F59E0B",
    tint: "245,158,11",
  },
];

/* =========================================================
   DOCK ITEM
========================================================= */

const DockItem = ({
  mouseX,
  item,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  reduceMotion,
  showStartupHint,
  showEmailHint,
  onCloseStartupHint,
  onCloseEmailHint,
}) => {
  const ref = useRef(null);

  /* =======================================================
     MACOS STYLE MAGNIFICATION
  ======================================================= */

  const distance = useMotionValue(9999);

  const width = useTransform(
    distance,
    [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180],
    [52, 52, 53, 54, 56, 60, 68, 60, 56, 54, 53, 52, 52],
  );

  const scale = useTransform(
    distance,
    [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180],
    [1, 1, 1.005, 1.015, 1.035, 1.07, 1.12, 1.07, 1.035, 1.015, 1.005, 1, 1],
  );

  /*
   * Soft spring.
   *
   * This keeps the movement smooth instead of
   * making icons suddenly jump when the mouse moves.
   */

  const springWidth = useSpring(width, {
    stiffness: 300,
    damping: 26,
    mass: 0.55,
  });

  const springScale = useSpring(scale, {
    stiffness: 300,
    damping: 26,
    mass: 0.55,
  });

  /* =======================================================
     TRACK MOUSE
  ======================================================= */

  useEffect(() => {
    if (reduceMotion) return;

    const unsubscribe = mouseX.on("change", (latest) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();

      const center = rect.left + rect.width / 2;

      distance.set(latest - center);
    });

    return () => unsubscribe();
  }, [mouseX, distance, reduceMotion]);

  /* =======================================================
     SPECIAL STATES
  ======================================================= */

  const isBookCall = item.id === "book-call";
  const isEmail = item.id === "email";

  const showBookHint = isBookCall && showStartupHint;
  const shouldShowEmailHint = isEmail && showEmailHint;

  const showSpotlight = showBookHint || shouldShowEmailHint;

  /* =======================================================
     BASE DOCK ITEM
  ======================================================= */

  const baseClass = `
    relative
    flex
    h-[52px]
    items-center
    justify-center
    rounded-2xl
    border
    select-none
    will-change-transform
    transition-[background-color,border-color,box-shadow]
    duration-200
  `;

  /* =======================================================
     NEUTRAL DOCK BACKGROUND
     
     IMPORTANT:
     Bottom bar stays neutral.
     Only icons receive individual colors.
  ======================================================= */

  const normalClass = `
    border-border/60
    bg-background/70
    text-muted-foreground
    backdrop-blur-xl
    hover:border-border
    hover:bg-background/90
  `;

  /* =======================================================
     INDIVIDUAL ICON COLOR
  ======================================================= */

  const iconColor = item.color || "currentColor";

  /* =======================================================
     SUBTLE COLORED HOVER
     
     Background remains almost neutral.
     Color only appears softly around hovered item.
  ======================================================= */

  const hoverTintStyle =
    isHovered && !isActive
      ? {
          backgroundColor: `rgba(${item.tint}, 0.045)`,
          borderColor: `rgba(${item.tint}, 0.30)`,
          boxShadow: `0 8px 22px rgba(${item.tint}, 0.08)`,
        }
      : undefined;

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const activeClass = isActive
    ? `
      border-primary/50
      bg-primary/[0.06]
    `
    : "";

  /* =======================================================
     DOCK CONTENT
  ======================================================= */

  const content = (
    <motion.div
      ref={ref}
      style={{
        width: reduceMotion ? 52 : springWidth,
        scale: reduceMotion ? 1 : springScale,

        /*
         * Very important for Mac-like growth.
         *
         * Icons grow upward instead of moving
         * randomly around the dock.
         */
        transformOrigin: "bottom center",

        ...hoverTintStyle,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={item.type === "action" ? onClick : undefined}
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.94,
            }
      }
      className={`
        ${baseClass}
        ${normalClass}
        ${activeClass}
        ${item.type === "action" ? "cursor-pointer" : ""}
      `}
    >
      {/* =================================================
          SOFT INDIVIDUAL ICON GLOW
      ================================================= */}

      <motion.div
        className="
          pointer-events-none
          absolute
          inset-1
          rounded-[15px]
        "
        animate={{
          opacity:
            isHovered || isActive ? 0.9 : isBookCall || isEmail ? 0.5 : 0,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        style={{
          boxShadow: `inset 0 0 0 1px rgba(${item.tint}, ${
            isHovered || isActive ? "0.18" : "0.10"
          })`,
        }}
      />

      {/* =================================================
          EMAIL INNER ACCENT
      ================================================= */}

      {isEmail && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            opacity: reduceMotion ? 0.65 : [0.3, 0.55, 0.3],
          }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          style={{
            boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.42)",
          }}
        />
      )}

      {/* =================================================
          BOOK CALL INNER ACCENT
      ================================================= */}

      {isBookCall && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{
            opacity: reduceMotion ? 0.65 : [0.3, 0.55, 0.3],
          }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 2.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          style={{
            boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.42)",
          }}
        />
      )}

      {/* =================================================
          ICON
      ================================================= */}

      <motion.div
        className="relative z-10 flex items-center justify-center will-change-transform"
        animate={
          reduceMotion
            ? undefined
            : isBookCall || isEmail
              ? {
                  y: [0, -1, 0],
                }
              : undefined
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <motion.div
          animate={{
            opacity: isHovered || isActive ? 1 : 0.9,
          }}
          transition={{
            duration: 0.18,
          }}
        >
          <item.icon
            size={21}
            strokeWidth={1.9}
            style={{
              color: iconColor,

              /*
               * Very subtle colored shadow.
               * This makes each icon feel alive without
               * making the whole dock colorful.
               */
              filter:
                isHovered || isActive
                  ? `drop-shadow(0 0 5px rgba(${item.tint}, 0.28))`
                  : `drop-shadow(0 0 0 rgba(${item.tint}, 0))`,
            }}
          />
        </motion.div>
      </motion.div>

      {/* =================================================
          NORMAL TOOLTIP
      ================================================= */}

      <AnimatePresence>
        {isHovered && !showSpotlight && (
          <motion.div
            initial={{
              opacity: 0,
              y: 5,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 4,
              scale: 0.97,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              bottom-[calc(100%+12px)]
              left-1/2
              z-[80]
              -translate-x-1/2
              whitespace-nowrap
              rounded-xl
              border
              border-border/70
              bg-background
              px-3
              py-1.5
              text-[11px]
              font-medium
              text-foreground
              shadow-xl
            "
          >
            {item.label}

            <span
              className="
                absolute
                bottom-[-4px]
                left-1/2
                h-2
                w-2
                -translate-x-1/2
                rotate-45
                border-b
                border-r
                border-border/70
                bg-background
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  /* =========================================================
     BOOK A CALL SPOTLIGHT
  ========================================================= */

  const bookSpotlight = (
    <AnimatePresence>
      {showBookHint && (
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.97,
          }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            bottom-[calc(100%+18px)]
            right-0
            z-[100]
            w-[330px]
            overflow-hidden
            rounded-[20px]
            border
            border-amber-400/40
            bg-background
            text-foreground
            shadow-[0_22px_65px_rgba(0,0,0,0.18),0_8px_30px_rgba(245,158,11,0.10)]
          "
        >
          {/* SUBTLE AMBER LIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-44
              w-44
              rounded-full
              bg-amber-400/[0.07]
              blur-3xl
            "
          />

          {/* TOP ACCENT */}

          <div
            className="
              absolute
              left-6
              right-6
              top-0
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-amber-400
              to-transparent
              opacity-90
            "
          />

          <div className="relative p-[18px]">
            {/* HEADER */}

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-amber-400/30
                    bg-amber-400/[0.08]
                    text-amber-500
                  "
                >
                  <CalendarDays size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <div className="text-[9px] font-bold tracking-[0.2em] text-amber-500">
                    LET&apos;S CONNECT
                  </div>

                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    Quick conversation
                  </div>
                </div>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={onCloseStartupHint}
                aria-label="Close Book a Call"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-muted-foreground
                  transition-all
                  duration-200
                  hover:bg-amber-400/[0.09]
                  hover:text-amber-500
                "
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* TITLE */}

            <h3
              className="
                mt-4
                text-[18px]
                font-semibold
                leading-tight
                tracking-tight
                text-foreground
              "
            >
              Have a project in mind?
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-1.5
                text-[11px]
                leading-[1.65]
                text-muted-foreground
              "
            >
              Let&apos;s discuss your idea, requirements, and how we can turn it
              into a scalable web or mobile product.
            </p>

            {/* AVAILABILITY */}

            <div
              className="
                mt-4
                flex
                items-center
                gap-2.5
                rounded-xl
                border
                border-emerald-400/20
                bg-emerald-400/[0.045]
                px-3
                py-2.5
              "
            >
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute w-full h-full rounded-full animate-ping bg-emerald-400/45" />

                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] font-medium text-emerald-500">
                Available for a quick chat
              </span>
            </div>

            {/* CTA */}

            <button
              type="button"
              onClick={onClick}
              className="
                group
                mt-3
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-amber-400/35
                bg-amber-400/[0.075]
                px-3.5
                py-3
                transition-all
                duration-300
                hover:border-amber-400/55
                hover:bg-amber-400/[0.12]
              "
            >
              <span className="text-[11px] font-semibold text-amber-500">
                Click to open scheduler
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 text-amber-500 group-hover:translate-x-1"
              />
            </button>

            {/* FOOTER */}

            <div className="mt-3.5 flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground">
                Let&apos;s build something great.
              </span>

              <Sparkles
                size={13}
                strokeWidth={1.8}
                className="text-amber-400"
              />
            </div>
          </div>

          {/* POINTER */}

          <span
            className="
              absolute
              bottom-[-6px]
              right-7
              h-3
              w-3
              rotate-45
              border-b
              border-r
              border-amber-400/40
              bg-background
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* =========================================================
     EMAIL SPOTLIGHT
  ========================================================= */

  const emailSpotlight = (
    <AnimatePresence>
      {shouldShowEmailHint && (
        <motion.div
          initial={{
            opacity: 0,
            y: 14,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 10,
            scale: 0.97,
          }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            absolute
            bottom-[calc(100%+18px)]
            right-0
            z-[100]
            w-[330px]
            overflow-hidden
            rounded-[20px]
            border
            border-emerald-400/40
            bg-background
            text-foreground
            shadow-[0_22px_65px_rgba(0,0,0,0.18),0_8px_30px_rgba(16,185,129,0.10)]
          "
        >
          {/* SUBTLE GREEN LIGHT */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-44
              w-44
              rounded-full
              bg-emerald-400/[0.07]
              blur-3xl
            "
          />

          {/* TOP ACCENT */}

          <div
            className="
              absolute
              left-6
              right-6
              top-0
              h-[2px]
              rounded-full
              bg-gradient-to-r
              from-transparent
              via-emerald-400
              to-transparent
              opacity-90
            "
          />

          <div className="relative p-[18px]">
            {/* HEADER */}

            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-emerald-400/30
                    bg-emerald-400/[0.08]
                    text-emerald-500
                  "
                >
                  <Mail size={18} strokeWidth={1.8} />
                </div>

                <div>
                  <div className="text-[9px] font-bold tracking-[0.2em] text-emerald-500">
                    LET&apos;S TALK
                  </div>

                  <div className="mt-0.5 text-[10px] text-muted-foreground">
                    Direct communication
                  </div>
                </div>
              </div>

              {/* CLOSE */}

              <button
                type="button"
                onClick={onCloseEmailHint}
                aria-label="Close Email"
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  text-muted-foreground
                  transition-all
                  duration-200
                  hover:bg-emerald-400/[0.09]
                  hover:text-emerald-500
                "
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            {/* TITLE */}

            <h3
              className="
                mt-4
                text-[18px]
                font-semibold
                leading-tight
                tracking-tight
                text-foreground
              "
            >
              Have a question?
            </h3>

            {/* DESCRIPTION */}

            <p
              className="
                mt-1.5
                text-[11px]
                leading-[1.65]
                text-muted-foreground
              "
            >
              Want to discuss an opportunity, collaboration, or just say hello?
              Drop me an email.
            </p>

            {/* EMAIL ADDRESS */}

            <div
              className="
                mt-4
                rounded-xl
                border
                border-emerald-400/20
                bg-emerald-400/[0.045]
                px-3
                py-2.5
              "
            >
              <p
                className="
                  truncate
                  text-[10px]
                  font-medium
                  text-emerald-500
                "
              >
                ratnakarsinghparihar9399@gmail.com
              </p>
            </div>

            {/* CTA */}

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "mailto:ratnakarsinghparihar9399@gmail.com";

                onCloseEmailHint();
              }}
              className="
                group
                mt-3
                flex
                w-full
                items-center
                justify-between
                rounded-xl
                border
                border-emerald-400/35
                bg-emerald-400/[0.075]
                px-3.5
                py-3
                transition-all
                duration-300
                hover:border-emerald-400/55
                hover:bg-emerald-400/[0.12]
              "
            >
              <span className="text-[11px] font-semibold text-emerald-500">
                Send me an email
              </span>

              <ArrowRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 text-emerald-500 group-hover:translate-x-1"
              />
            </button>

            {/* FOOTER */}

            <div className="mt-3.5 flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground">
                Usually happy to connect.
              </span>

              <span className="relative flex w-2 h-2">
                <span className="absolute w-full h-full rounded-full animate-ping bg-emerald-400/45" />

                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
            </div>
          </div>

          {/* POINTER */}

          <span
            className="
              absolute
              bottom-[-6px]
              right-7
              h-3
              w-3
              rotate-45
              border-b
              border-r
              border-emerald-400/40
              bg-background
            "
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* =========================================================
     RETURN ITEM
  ========================================================= */

  return (
    <div className="relative">
      {bookSpotlight}

      {emailSpotlight}

      {/* ROUTE */}

      {item.type === "route" && (
        <Link to={item.href} aria-label={item.label} className="block">
          {content}
        </Link>
      )}

      {/* EXTERNAL */}

      {item.type === "external" && (
        <a href={item.href} aria-label={item.label} className="block">
          {content}
        </a>
      )}

      {/* ACTION */}

      {item.type === "action" && content}
    </div>
  );
};

/* =========================================================
   MAIN DOCK
========================================================= */

const Dock = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(Infinity);

  const [hoveredItem, setHoveredItem] = useState(null);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const [showStartupHint, setShowStartupHint] = useState(false);

  const [showEmailHint, setShowEmailHint] = useState(false);

  /* =======================================================
     TIMER REFS
  ======================================================= */

  const startupBookTimerRef = useRef(null);
  const startupEmailTimerRef = useRef(null);
  const emailHideTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  /* =======================================================
     TIMER HELPERS
  ======================================================= */

  const clearTimer = (timerRef) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const clearStartupTimers = () => {
    clearTimer(startupBookTimerRef);
    clearTimer(startupEmailTimerRef);
    clearTimer(emailHideTimerRef);
  };

  /* =========================================================
     STARTUP SPOTLIGHT SEQUENCE
  ========================================================= */

  useEffect(() => {
    if (typeof window === "undefined") return;

    setShowStartupHint(false);
    setShowEmailHint(false);

    /*
     * BOOK A CALL
     *
     * Appears after 1.2 seconds.
     */

    startupBookTimerRef.current = window.setTimeout(() => {
      setShowEmailHint(false);
      setShowStartupHint(true);
    }, 1200);

    /*
     * EMAIL
     *
     * Appears after Book a Call.
     *
     * Book Call:
     * 1.2s → 5.2s
     */

    startupEmailTimerRef.current = window.setTimeout(() => {
      setShowStartupHint(false);
      setShowEmailHint(true);

      /*
       * Email remains visible for 5.3 seconds.
       */

      emailHideTimerRef.current = window.setTimeout(() => {
        setShowEmailHint(false);
      }, 5300);
    }, 5200);

    return () => {
      clearStartupTimers();
      clearTimer(transitionTimerRef);
    };
  }, []);

  /* =========================================================
     ACTIVE ROUTE
  ========================================================= */

  const isItemActive = (item) => {
    if (item.type !== "route") return false;

    if (item.href === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === item.href ||
      location.pathname.startsWith(`${item.href}/`)
    );
  };

  /* =========================================================
     CLOSE BOOK HINT
  ========================================================= */

  const closeStartupHint = () => {
    setShowStartupHint(false);

    clearTimer(startupBookTimerRef);
  };

  /* =========================================================
     CLOSE EMAIL HINT
  ========================================================= */

  const closeEmailHint = () => {
    setShowEmailHint(false);

    clearTimer(emailHideTimerRef);
  };

  /* =========================================================
     BOOK A CALL
  ========================================================= */

  const handleBookClick = () => {
    /*
     * Hide spotlight.
     */

    setShowStartupHint(false);
    setShowEmailHint(false);

    /*
     * Stop startup timers.
     */

    clearStartupTimers();

    /*
     * Clear existing transition.
     */

    clearTimer(transitionTimerRef);

    /*
     * Start smooth transition.
     */

    setIsTransitioning(true);

    transitionTimerRef.current = window.setTimeout(
      () => {
        setIsTransitioning(false);
        setIsBookModalOpen(true);

        transitionTimerRef.current = null;
      },
      reduceMotion ? 0 : 420,
    );
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearchClick = () => {
    setShowStartupHint(false);
    setShowEmailHint(false);

    clearStartupTimers();

    setIsSearchModalOpen(true);
  };

  /* =========================================================
     MOUSE
  ========================================================= */

  const handleMouseMove = (event) => {
    if (reduceMotion) return;

    /*
     * Only X position controls magnification.
     */

    mouseX.set(event.clientX);
  };

  const handleMouseLeave = () => {
    /*
     * Returning to Infinity smoothly resets
     * every icon back to its original size.
     */

    mouseX.set(Infinity);

    setHoveredItem(null);
  };

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      clearStartupTimers();
      clearTimer(transitionTimerRef);
    };
  }, []);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          DESKTOP DOCK
      ===================================================== */}

      <div
        className="
          fixed
          bottom-5
          left-1/2
          z-[60]
          hidden
          -translate-x-1/2
          md:block
        "
      >
        <motion.div
          initial={
            reduceMotion
              ? undefined
              : {
                  opacity: 0,
                  y: 18,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
            flex
            items-end
            gap-1.5
            rounded-[22px]
            border
            border-border/60
            bg-background/75
            px-2
            py-2
            shadow-[0_12px_45px_rgba(0,0,0,0.10)]
            backdrop-blur-2xl
          "
        >
          {NAV_ITEMS.map((item) => (
            <DockItem
              key={item.id}
              mouseX={mouseX}
              item={item}
              isActive={isItemActive(item)}
              isHovered={hoveredItem === item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={
                item.id === "book-call"
                  ? handleBookClick
                  : item.id === "search"
                    ? handleSearchClick
                    : undefined
              }
              reduceMotion={reduceMotion}
              showStartupHint={showStartupHint}
              showEmailHint={showEmailHint}
              onCloseStartupHint={closeStartupHint}
              onCloseEmailHint={closeEmailHint}
            />
          ))}
        </motion.div>
      </div>

      {/* =====================================================
          BOOK CALL TRANSITION
      ===================================================== */}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
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
              duration: reduceMotion ? 0 : 0.22,
            }}
            className="
              pointer-events-none
              fixed
              inset-0
              z-[110]
              bg-background/30
              backdrop-blur-[2px]
            "
          >
            <motion.div
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
                scale: 1.08,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                absolute
                left-1/2
                top-1/2
                h-24
                w-24
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-amber-400/20
                bg-amber-400/[0.035]
              "
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          BOOK MY CALL MODAL
      ===================================================== */}

      <BookMyCallModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      {/* =====================================================
          SEARCH MODAL
      ===================================================== */}

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Dock;
