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
  FolderKanban,
  Briefcase,
  Cpu,
  Trophy,
  MessagesSquare,
  GraduationCap,
  Mail,
  Search as SearchIcon,
  CalendarClock,
  ArrowRight,
  Sparkles,
  // Wand2,
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
    icon: FolderKanban,
    href: "/projects",
    type: "route",
    color: "#818CF8",
    tint: "129,140,248",
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    href: "/experience",
    type: "route",
    color: "#FB923C",
    tint: "251,146,60",
  },
  {
    id: "tech-stack",
    label: "Tech Stack",
    icon: Cpu,
    href: "/skills",
    type: "route",
    color: "#22D3EE",
    tint: "34,211,238",
  },
  // {
  //   id: "role-mode",
  //   label: "Role Mode",
  //   icon: Wand2,
  //   href: "/role/rolebasedaccess",
  //   type: "route",
  //   color: "#8B5CF6",
  //   tint: "139,92,246",
  // },
  {
    id: "achievements",
    label: "Achievements",
    icon: Trophy,
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
  {
    id: "email",
    label: "Email",
    icon: Mail,
    href: "mailto:ratnakarsinghparihar9399@gmail.com",
    type: "external",
    color: "#10B981",
    tint: "16,185,129",
  },
  {
    id: "search",
    label: "Search",
    icon: SearchIcon,
    type: "action",
    color: "#94A3B8",
    tint: "148,163,184",
  },
  {
    id: "book-call",
    label: "Book a Call",
    icon: CalendarClock,
    type: "action",
    isProminent: true,
    color: "#F59E0B",
    tint: "245,158,11",
  },
];

/* =========================================================
   ROLE MODE SPOTLIGHT (Desktop only) — DISABLED
========================================================= */

/*
const RoleModeSpotlight = ({ show, onClose, onClick, reduceMotion }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{
          duration: reduceMotion ? 0.15 : 0.42,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute bottom-[calc(100%+18px)] right-0 z-[100] w-[330px] overflow-hidden rounded-[20px] border border-indigo-400/40 bg-background text-foreground shadow-[0_22px_65px_rgba(0,0,0,0.18),0_8px_30px_rgba(139,92,246,0.14)]"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-indigo-400/[0.09] blur-3xl" />
        <div className="absolute left-6 right-6 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-90" />

        <div className="relative p-[18px]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/[0.14] to-violet-500/[0.08] text-indigo-500">
                <Wand2 size={18} strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-[0.2em] text-indigo-500">
                  EXPLORE YOUR ROLE
                </div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">
                  NEW EXPERIENCE
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Role Mode spotlight"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-indigo-400/[0.09] hover:text-indigo-500"
            >
              <X size={16} strokeWidth={1.8} />
            </button>
          </div>

          <h3 className="mt-4 text-[18px] font-semibold leading-tight tracking-tight text-foreground">
            A portfolio tailored to your role
          </h3>

          <p className="mt-1.5 text-[11px] leading-[1.65] text-muted-foreground">
            Explore the skills, projects, experience, and resume most relevant
            to the position you&apos;re hiring for.
          </p>

          <Link
            to="/role/rolebasedaccess"
            onClick={onClick}
            className="group mt-4 flex w-full items-center justify-between rounded-xl border border-indigo-400/35 bg-indigo-400/[0.075] px-3.5 py-3 transition-all duration-300 hover:border-indigo-400/55 hover:bg-indigo-400/[0.12]"
          >
            <span className="text-[11px] font-semibold text-indigo-500">
              Explore Role Mode
            </span>
            <ArrowRight
              size={15}
              strokeWidth={1.8}
              className="text-indigo-500 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <div className="mt-3.5 flex items-center justify-between">
            <span className="text-[9px] text-muted-foreground">
              Tailored for recruiters.
            </span>
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          </div>
        </div>

        <span className="absolute bottom-[-6px] right-7 h-3 w-3 rotate-45 border-b border-r border-indigo-400/40 bg-background" />
      </motion.div>
    )}
  </AnimatePresence>
);
*/

/* =========================================================
   DOCK ITEM — macOS-style magnification + Y lift
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
  // showRoleSpotlight,
  onCloseStartupHint,
  onCloseEmailHint,
  // onCloseRoleHint,
}) => {
  const ref = useRef(null);
  const distance = useMotionValue(9999);

  /* ----- macOS magnification curve -----
     - Center (±0):    max magnification + max lift (22px)
     - Adjacent (±30): strong
     - Near (±60):     moderate
     - Far (±120+):    flat (base)
  */

  const width = useTransform(
    distance,
    [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180],
    [52, 52, 53, 56, 62, 68, 76, 68, 62, 56, 53, 52, 52],
  );

  const scale = useTransform(
    distance,
    [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180],
    [1, 1, 1.02, 1.05, 1.09, 1.13, 1.18, 1.13, 1.09, 1.05, 1.02, 1, 1],
  );

  // 🎯 Y-lift: icons rise toward the top as cursor approaches
  const y = useTransform(
    distance,
    [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180],
    [0, 0, -2, -6, -12, -17, -22, -17, -12, -6, -2, 0, 0],
  );

  const springConfig = {
    stiffness: 340,
    damping: 28,
    mass: 0.55,
  };

  const springWidth = useSpring(width, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springY = useSpring(y, springConfig);

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

  const isBookCall = item.id === "book-call";
  const isEmail = item.id === "email";
  // const isRoleMode = item.id === "role-mode";

  const showBookHint = isBookCall && showStartupHint;
  const shouldShowEmailHint = isEmail && showEmailHint;
  // const shouldShowRoleHint = isRoleMode && showRoleSpotlight;
  const showSpotlight = showBookHint || shouldShowEmailHint;
  // const showSpotlight =
  //   showBookHint || shouldShowEmailHint || shouldShowRoleHint;

  const baseClass = `
    relative flex h-[52px] items-center justify-center rounded-2xl border
    select-none will-change-transform
    transition-[background-color,border-color,box-shadow] duration-200
  `;

  const normalClass = `
    border-border/60 bg-background/70 text-muted-foreground backdrop-blur-xl
    hover:border-border hover:bg-background/90
  `;
  // const normalClass = isRoleMode
  //   ? `border-indigo-400/40 bg-gradient-to-br from-indigo-500/[0.06] via-violet-500/[0.04] to-transparent text-indigo-500 backdrop-blur-xl hover:border-indigo-400/60 hover:bg-indigo-500/[0.10]`
  //   : `border-border/60 bg-background/70 text-muted-foreground backdrop-blur-xl hover:border-border hover:bg-background/90`;

  const iconColor = item.color || "currentColor";

  const hoverTintStyle =
    isHovered && !isActive
      ? {
          backgroundColor: `rgba(${item.tint}, 0.045)`,
          borderColor: `rgba(${item.tint}, 0.30)`,
          boxShadow: `0 8px 22px rgba(${item.tint}, 0.08)`,
        }
      : undefined;

  // const roleGlowStyle = isRoleMode
  //   ? {
  //       boxShadow:
  //         isHovered || isActive
  //           ? `0 0 0 1px rgba(139,92,246,0.22), 0 10px 34px rgba(139,92,246,0.26)`
  //           : `0 0 0 1px rgba(139,92,246,0.10), 0 8px 24px rgba(139,92,246,0.14)`,
  //     }
  //   : {};

  const activeClass = isActive ? `border-primary/50 bg-primary/[0.06]` : "";
  // const activeClass = isActive
  //   ? isRoleMode
  //     ? `border-indigo-400/70 bg-indigo-500/[0.12] shadow-[0_0_0_1px_rgba(139,92,246,0.12),0_8px_30px_rgba(139,92,246,0.22)]`
  //     : `border-primary/50 bg-primary/[0.06]`
  //   : "";

  const iconElement = (
    <item.icon
      size={21}
      strokeWidth={1.9}
      style={{
        color: iconColor,
        filter:
          isHovered || isActive
            ? `drop-shadow(0 0 5px rgba(${item.tint}, 0.28))`
            : `drop-shadow(0 0 0 rgba(${item.tint}, 0))`,
      }}
    />
  );

  const content = (
    <motion.div
      ref={ref}
      style={{
        width: reduceMotion ? 52 : springWidth,
        scale: reduceMotion ? 1 : springScale,
        y: reduceMotion ? 0 : springY,
        transformOrigin: "bottom center",
        ...hoverTintStyle,
        // ...roleGlowStyle,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={item.type === "action" ? onClick : undefined}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      className={`${baseClass} ${normalClass} ${activeClass} ${
        item.type === "action" ? "cursor-pointer" : ""
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-1 rounded-[15px]"
        animate={{
          opacity:
            isHovered || isActive ? 0.9 : isBookCall || isEmail ? 0.5 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          boxShadow: `inset 0 0 0 1px rgba(${item.tint}, ${
            isHovered || isActive ? "0.18" : "0.10"
          })`,
        }}
      />

      {/* Active indicator dot */}
      <motion.span
        aria-hidden
        className="absolute -translate-x-1/2 rounded-full pointer-events-none bottom-1 left-1/2"
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.3,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          width: 4,
          height: 4,
          backgroundColor: item.color,
          boxShadow: isActive ? `0 0 8px rgba(${item.tint}, 0.75)` : "none",
        }}
      />

      {/* Role mode glow — DISABLED
      {isRoleMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{ opacity: reduceMotion ? 0.8 : [0.55, 0.9, 0.55] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          style={{
            background:
              "linear-gradient(135deg, rgba(99,102,241,0.14), rgba(139,92,246,0.06), transparent)",
            boxShadow: "inset 0 0 0 1px rgba(139,92,246,0.28)",
          }}
        />
      )}
      */}

      {isEmail && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{ opacity: reduceMotion ? 0.65 : [0.3, 0.55, 0.3] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ boxShadow: "inset 0 0 0 1px rgba(16,185,129,0.42)" }}
        />
      )}

      {isBookCall && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          animate={{ opacity: reduceMotion ? 0.65 : [0.3, 0.55, 0.3] }}
          transition={
            reduceMotion
              ? undefined
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
          style={{ boxShadow: "inset 0 0 0 1px rgba(245,158,11,0.42)" }}
        />
      )}

      <motion.div
        className="relative z-10 flex items-center justify-center will-change-transform"
        animate={
          reduceMotion
            ? undefined
            : isBookCall || isEmail
              ? { y: [0, -1, 0] }
              : undefined
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <motion.div
          animate={{
            opacity: isHovered || isActive ? 1 : 0.9,
          }}
          transition={{ duration: 0.18 }}
        >
          {/* Role mode icon wrapper — DISABLED
          {isRoleMode ? (
            <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10">
              {iconElement}
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
            </div>
          ) : (
            iconElement
          )}
          */}
          {iconElement}
        </motion.div>
      </motion.div>

      {/* =========================================================
          TOOLTIP — FIXED: x:"-50%" inside framer motion
          (previously -translate-x-1/2 was overwritten by scale)
      ========================================================= */}
      <AnimatePresence>
        {isHovered && !showSpotlight && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 8, scale: 0.92, x: "-50%" }}
            transition={{
              duration: 0.24,
              delay: 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: "bottom center" }}
            className="
              pointer-events-none absolute bottom-[calc(100%+16px)] left-1/2 z-[80]
              whitespace-nowrap rounded-lg border border-border/70 bg-background
              px-3 py-1.5 text-[11.5px] font-semibold text-foreground
              shadow-[0_8px_24px_-6px_rgba(0,0,0,0.25)]
            "
          >
            {/* {isRoleMode ? "Role Mode — Explore tailored profiles" : item.label} */}
            <span className="flex items-center gap-1.5">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: item.color,
                  boxShadow: `0 0 6px rgba(${item.tint}, 0.6)`,
                }}
              />
              {item.label}
            </span>
            {/* Arrow pointing down toward icon */}
            <span
              aria-hidden
              className="absolute bottom-[-5px] left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-border/70 bg-background"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  /* ---------- BOOK A CALL SPOTLIGHT ---------- */
  const bookSpotlight = (
    <AnimatePresence>
      {showBookHint && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-[calc(100%+18px)] right-0 z-[100] w-[330px] overflow-hidden rounded-[20px] border border-amber-400/40 bg-background text-foreground shadow-[0_22px_65px_rgba(0,0,0,0.18),0_8px_30px_rgba(245,158,11,0.10)]"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-amber-400/[0.07] blur-3xl" />
          <div className="absolute left-6 right-6 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-90" />

          <div className="relative p-[18px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/[0.08] text-amber-500">
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

              <button
                type="button"
                onClick={onCloseStartupHint}
                aria-label="Close Book a Call"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-amber-400/[0.09] hover:text-amber-500"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            <h3 className="mt-4 text-[18px] font-semibold leading-tight tracking-tight text-foreground">
              Have a project in mind?
            </h3>

            <p className="mt-1.5 text-[11px] leading-[1.65] text-muted-foreground">
              Let&apos;s discuss your idea, requirements, and how we can turn it
              into a scalable web or mobile product.
            </p>

            <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.045] px-3 py-2.5">
              <span className="relative flex w-2 h-2 shrink-0">
                <span className="absolute w-full h-full rounded-full animate-ping bg-emerald-400/45" />
                <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-medium text-emerald-500">
                Available for a quick chat
              </span>
            </div>

            <button
              type="button"
              onClick={onClick}
              className="group mt-3 flex w-full items-center justify-between rounded-xl border border-amber-400/35 bg-amber-400/[0.075] px-3.5 py-3 transition-all duration-300 hover:border-amber-400/55 hover:bg-amber-400/[0.12]"
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

          <span className="absolute bottom-[-6px] right-7 h-3 w-3 rotate-45 border-b border-r border-amber-400/40 bg-background" />
        </motion.div>
      )}
    </AnimatePresence>
  );

  /* ---------- EMAIL SPOTLIGHT ---------- */
  const emailSpotlight = (
    <AnimatePresence>
      {shouldShowEmailHint && (
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.97 }}
          transition={{
            duration: reduceMotion ? 0.15 : 0.42,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute bottom-[calc(100%+18px)] right-0 z-[100] w-[330px] overflow-hidden rounded-[20px] border border-emerald-400/40 bg-background text-foreground shadow-[0_22px_65px_rgba(0,0,0,0.18),0_8px_30px_rgba(16,185,129,0.10)]"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-emerald-400/[0.07] blur-3xl" />
          <div className="absolute left-6 right-6 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-90" />

          <div className="relative p-[18px]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-500">
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

              <button
                type="button"
                onClick={onCloseEmailHint}
                aria-label="Close Email"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-emerald-400/[0.09] hover:text-emerald-500"
              >
                <X size={16} strokeWidth={1.8} />
              </button>
            </div>

            <h3 className="mt-4 text-[18px] font-semibold leading-tight tracking-tight text-foreground">
              Have a question?
            </h3>

            <p className="mt-1.5 text-[11px] leading-[1.65] text-muted-foreground">
              Want to discuss an opportunity, collaboration, or just say hello?
              Drop me an email.
            </p>

            <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.045] px-3 py-2.5">
              <p className="truncate text-[10px] font-medium text-emerald-500">
                ratnakarsinghparihar9399@gmail.com
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href =
                  "mailto:ratnakarsinghparihar9399@gmail.com";
                onCloseEmailHint();
              }}
              className="group mt-3 flex w-full items-center justify-between rounded-xl border border-emerald-400/35 bg-emerald-400/[0.075] px-3.5 py-3 transition-all duration-300 hover:border-emerald-400/55 hover:bg-emerald-400/[0.12]"
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

          <span className="absolute bottom-[-6px] right-7 h-3 w-3 rotate-45 border-b border-r border-emerald-400/40 bg-background" />
        </motion.div>
      )}
    </AnimatePresence>
  );

  /*
  const roleSpotlight = (
    <RoleModeSpotlight
      show={shouldShowRoleHint}
      onClose={onCloseRoleHint}
      onClick={onClick}
      reduceMotion={reduceMotion}
    />
  );
  */

  return (
    <div className="relative">
      {/* {roleSpotlight} */}
      {bookSpotlight}
      {emailSpotlight}

      {item.type === "route" && (
        <Link
          to={item.href}
          aria-label={item.label}
          aria-current={isActive ? "page" : undefined}
          className="block"
          onClick={onClick}
        >
          {content}
        </Link>
      )}

      {item.type === "external" && (
        <a href={item.href} aria-label={item.label} className="block">
          {content}
        </a>
      )}

      {item.type === "action" && content}
    </div>
  );
};

/* =========================================================
   MAIN DOCK
========================================================= */

// const ROLE_SPOTLIGHT_SESSION_KEY = "role-mode-spotlight-dismissed";
// const SCROLL_TRIGGER_PX = 150;

/* Desktop timings */
const T_BOOK_SHOW = 1200;
const T_BOOK_VISIBLE = 1400;
// const T_ROLE_FIRST = 4200;
// const T_ROLE_VISIBLE = 4200;
const T_EMAIL_AFTER = 2000;
const T_EMAIL_VISIBLE = 5000;
// const T_ROLE_REPEAT_MIN = 38000;
// const T_ROLE_REPEAT_MAX = 50000;

const Dock = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(Infinity);

  const [hoveredItem, setHoveredItem] = useState(null);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [activeSpotlight, setActiveSpotlight] = useState(null);
  const [isDockHovered, setIsDockHovered] = useState(false);

  /* ---------- SCROLL — only controls MOBILE FAB ---------- */
  // const [showMobileFAB, setShowMobileFAB] = useState(false);

  /* ---------- DESKTOP DETECTION ---------- */
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return window.matchMedia("(min-width: 768px)").matches;
    } catch {
      return true;
    }
  });

  // const [roleDismissed, setRoleDismissed] = useState(() => {
  //   if (typeof window === "undefined") return false;
  //   try {
  //     return window.sessionStorage.getItem(ROLE_SPOTLIGHT_SESSION_KEY) === "1";
  //   } catch {
  //     return false;
  //   }
  // });

  const startupBookTimerRef = useRef(null);
  const startupBookHideTimerRef = useRef(null);
  const startupEmailTimerRef = useRef(null);
  const emailHideTimerRef = useRef(null);
  // const roleShowTimerRef = useRef(null);
  // const roleHideTimerRef = useRef(null);
  const transitionTimerRef = useRef(null);

  const activeSpotlightRef = useRef(null);
  // const roleDismissedRef = useRef(roleDismissed);
  const isDockHoveredRef = useRef(false);
  const isBookModalOpenRef = useRef(false);
  const isSearchModalOpenRef = useRef(false);
  const startupRanRef = useRef(false);

  useEffect(() => {
    activeSpotlightRef.current = activeSpotlight;
  }, [activeSpotlight]);

  // useEffect(() => {
  //   roleDismissedRef.current = roleDismissed;
  // }, [roleDismissed]);

  useEffect(() => {
    isDockHoveredRef.current = isDockHovered;
  }, [isDockHovered]);

  useEffect(() => {
    isBookModalOpenRef.current = isBookModalOpen;
  }, [isBookModalOpen]);

  useEffect(() => {
    isSearchModalOpenRef.current = isSearchModalOpen;
  }, [isSearchModalOpen]);

  /* ---------- DESKTOP MEDIA QUERY LISTENER ---------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => setIsDesktop(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    mq.addListener(handler);
    return () => mq.removeListener(handler);
  }, []);

  const clearTimer = (timerRef) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const clearStartupTimers = () => {
    clearTimer(startupBookTimerRef);
    clearTimer(startupBookHideTimerRef);
    clearTimer(startupEmailTimerRef);
    clearTimer(emailHideTimerRef);
    // clearTimer(roleShowTimerRef);
    // clearTimer(roleHideTimerRef);
  };

  /* =========================================================
     SCROLL LISTENER — ONLY FOR MOBILE FAB (DISABLED)
  ========================================================= */
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //
  //   const onScroll = () => {
  //     const y = window.scrollY || window.pageYOffset || 0;
  //     setShowMobileFAB(y > SCROLL_TRIGGER_PX);
  //   };
  //
  //   window.addEventListener("scroll", onScroll, { passive: true });
  //   onScroll();
  //
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  /* =========================================================
     STARTUP SPOTLIGHT SEQUENCE — DESKTOP ONLY (on mount)
  ========================================================= */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isDesktop) return;
    if (startupRanRef.current) return;

    startupRanRef.current = true;

    /* ----- BOOK A CALL ----- */
    const scheduleBook = (delay) => {
      startupBookTimerRef.current = window.setTimeout(() => {
        if (
          // roleDismissedRef.current ||
          isDockHoveredRef.current ||
          isBookModalOpenRef.current ||
          isSearchModalOpenRef.current
        ) {
          return;
        }
        setActiveSpotlight("book");
        startupBookHideTimerRef.current = window.setTimeout(() => {
          setActiveSpotlight((prev) => (prev === "book" ? null : prev));
        }, T_BOOK_VISIBLE);
      }, delay);
    };

    /* ----- ROLE MODE (DISABLED) ----- */
    // const scheduleRoleOnce = (delay) => {
    //   roleShowTimerRef.current = window.setTimeout(() => {
    //     if (
    //       roleDismissedRef.current ||
    //       isDockHoveredRef.current ||
    //       isBookModalOpenRef.current ||
    //       isSearchModalOpenRef.current ||
    //       activeSpotlightRef.current
    //     ) {
    //       return;
    //     }
    //     setActiveSpotlight("role");
    //     roleHideTimerRef.current = window.setTimeout(() => {
    //       setActiveSpotlight((prev) => (prev === "role" ? null : prev));
    //     }, T_ROLE_VISIBLE);
    //   }, delay);
    // };

    /* ----- EMAIL ----- */
    const scheduleEmail = (delay) => {
      startupEmailTimerRef.current = window.setTimeout(() => {
        if (
          // roleDismissedRef.current ||
          isDockHoveredRef.current ||
          isBookModalOpenRef.current ||
          isSearchModalOpenRef.current
        ) {
          scheduleEmail(3000);
          return;
        }
        if (activeSpotlightRef.current) {
          scheduleEmail(3000);
          return;
        }
        setActiveSpotlight("email");
        emailHideTimerRef.current = window.setTimeout(() => {
          setActiveSpotlight((prev) => (prev === "email" ? null : prev));
        }, T_EMAIL_VISIBLE);
      }, delay);
    };

    scheduleBook(T_BOOK_SHOW);
    // scheduleRoleOnce(T_ROLE_FIRST);
    scheduleEmail(T_BOOK_SHOW + T_BOOK_VISIBLE + T_EMAIL_AFTER);
    // scheduleEmail(T_ROLE_FIRST + T_ROLE_VISIBLE + T_EMAIL_AFTER);

    return () => clearStartupTimers();
  }, [isDesktop]);

  /* =========================================================
     RECURRING ROLE MODE SPOTLIGHT — DISABLED
  ========================================================= */
  // useEffect(() => {
  //   if (roleDismissed) return;
  //   if (typeof window === "undefined") return;
  //   if (!isDesktop) return;
  //
  //   let cancelled = false;
  //   let showTimer = null;
  //   let hideTimer = null;
  //
  //   const getRepeatDelay = () =>
  //     T_ROLE_REPEAT_MIN +
  //     Math.random() * (T_ROLE_REPEAT_MAX - T_ROLE_REPEAT_MIN);
  //
  //   const scheduleShow = (delay) => {
  //     window.clearTimeout(showTimer);
  //     showTimer = window.setTimeout(() => {
  //       if (cancelled) return;
  //
  //       if (
  //         roleDismissedRef.current ||
  //         isDockHoveredRef.current ||
  //         isBookModalOpenRef.current ||
  //         isSearchModalOpenRef.current ||
  //         activeSpotlightRef.current ||
  //         document.visibilityState !== "visible"
  //       ) {
  //         scheduleShow(4000);
  //         return;
  //       }
  //
  //       setActiveSpotlight("role");
  //       window.clearTimeout(hideTimer);
  //       hideTimer = window.setTimeout(() => {
  //         if (cancelled) return;
  //         setActiveSpotlight((prev) => (prev === "role" ? null : prev));
  //         scheduleShow(getRepeatDelay());
  //       }, T_ROLE_VISIBLE);
  //     }, delay);
  //   };
  //
  //   scheduleShow(getRepeatDelay());
  //
  //   return () => {
  //     cancelled = true;
  //     window.clearTimeout(showTimer);
  //     window.clearTimeout(hideTimer);
  //   };
  // }, [roleDismissed, isDesktop]);

  /* ---------- TAB VISIBILITY (ROLE MODE ONLY) — DISABLED ---------- */
  // useEffect(() => {
  //   const handleVisibility = () => {
  //     if (
  //       document.visibilityState === "hidden" &&
  //       activeSpotlightRef.current === "role"
  //     ) {
  //       setActiveSpotlight(null);
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleVisibility);
  //   return () =>
  //     document.removeEventListener("visibilitychange", handleVisibility);
  // }, []);

  /* ---------- HIDE ROLE SPOTLIGHT WHILE DOCK HOVERED — DISABLED ---------- */
  // useEffect(() => {
  //   if (isDockHovered && activeSpotlight === "role") {
  //     setActiveSpotlight(null);
  //   }
  // }, [isDockHovered, activeSpotlight]);

  /* ---------- ACTIVE ROUTE ---------- */
  const isItemActive = (item) => {
    if (item.type !== "route") return false;
    // if (item.id === "role-mode") {
    //   return (
    //     location.pathname === "/role" || location.pathname.startsWith("/role/")
    //   );
    // }
    if (item.href === "/") {
      return location.pathname === "/";
    }
    return (
      location.pathname === item.href ||
      location.pathname.startsWith(`${item.href}/`)
    );
  };

  /* ---------- CLOSE HINTS ---------- */
  const closeStartupHint = () => {
    setActiveSpotlight(null);
    clearTimer(startupBookTimerRef);
    clearTimer(startupBookHideTimerRef);
  };

  const closeEmailHint = () => {
    setActiveSpotlight(null);
    clearTimer(emailHideTimerRef);
  };

  // const closeRoleHint = () => {
  //   setActiveSpotlight(null);
  //   setRoleDismissed(true);
  //   try {
  //     window.sessionStorage.setItem(ROLE_SPOTLIGHT_SESSION_KEY, "1");
  //   } catch {}
  // };

  /* ---------- BOOK A CALL ---------- */
  const handleBookClick = () => {
    setActiveSpotlight(null);
    clearStartupTimers();
    clearTimer(transitionTimerRef);
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

  /* ---------- SEARCH ---------- */
  const handleSearchClick = () => {
    setActiveSpotlight(null);
    clearStartupTimers();
    setIsSearchModalOpen(true);
  };

  /* ---------- ROLE MODE CLICK (DISABLED) ---------- */
  // const handleRoleClick = () => {
  //   setActiveSpotlight(null);
  //   setRoleDismissed(true);
  //   try {
  //     window.sessionStorage.setItem(ROLE_SPOTLIGHT_SESSION_KEY, "1");
  //   } catch {}
  // };

  /* ---------- MOUSE ---------- */
  const handleMouseMove = (event) => {
    if (reduceMotion) return;
    mouseX.set(event.clientX);
  };

  const handleMouseLeave = () => {
    mouseX.set(Infinity);
    setHoveredItem(null);
    setIsDockHovered(false);
  };

  /* ---------- CLEANUP ---------- */
  useEffect(() => {
    return () => {
      clearStartupTimers();
      clearTimer(transitionTimerRef);
    };
  }, []);

  return (
    <>
      {/* =====================================================
          DESKTOP DOCK — ALWAYS VISIBLE
          pt-8 provides headroom for lifted icons + tooltip
      ===================================================== */}
      <div className="pointer-events-none fixed bottom-5 left-1/2 z-[60] hidden -translate-x-1/2 md:block">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          onMouseEnter={() => setIsDockHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
            pointer-events-auto
            flex items-end gap-1.5
            rounded-[22px]
            border border-border/60
            bg-background/75
            px-2 py-2
            shadow-[0_16px_50px_-12px_rgba(0,0,0,0.18),0_4px_16px_-4px_rgba(0,0,0,0.08)]
            dark:shadow-[0_16px_50px_-12px_rgba(0,0,0,0.5),0_4px_16px_-4px_rgba(0,0,0,0.3)]
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
                    : // : item.id === "role-mode"
                      //   ? handleRoleClick
                      undefined
              }
              reduceMotion={reduceMotion}
              showStartupHint={activeSpotlight === "book"}
              showEmailHint={activeSpotlight === "email"}
              // showRoleSpotlight={activeSpotlight === "role"}
              onCloseStartupHint={closeStartupHint}
              onCloseEmailHint={closeEmailHint}
              // onCloseRoleHint={closeRoleHint}
            />
          ))}
        </motion.div>
      </div>

      {/* =====================================================
          📱 MOBILE FAB — DISABLED
      ===================================================== */}
      {/*
      <AnimatePresence>
        {showMobileFAB && (
          <motion.div
            key="mobile-fab"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 20 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-5 z-[70] md:hidden"
            style={{
              bottom: "calc(env(safe-area-inset-bottom, 0px) + 96px)",
            }}
          >
            <Link
              to="/role/rolebasedaccess"
              onClick={handleRoleClick}
              aria-label="Role Mode — Explore tailored profiles"
              className="
                group relative flex h-14 w-14 items-center justify-center
                rounded-full
                bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500
                text-white
                shadow-[0_16px_40px_rgba(139,92,246,0.45),0_6px_16px_rgba(139,92,246,0.30)]
                transition-all duration-300
                hover:scale-105
                active:scale-95
              "
            >
              <span className="absolute inset-0 rounded-full pointer-events-none bg-indigo-500/40 animate-ping" />
              <span className="pointer-events-none absolute -inset-1.5 rounded-full border border-indigo-400/30" />
              <span className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-br from-white/20 to-transparent" />

              <Wand2
                size={24}
                strokeWidth={2}
                className="relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]"
              />

              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-background bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)]">
                <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              </span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
      */}

      {/* =====================================================
          BOOK CALL TRANSITION
      ===================================================== */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
            className="pointer-events-none fixed inset-0 z-[110] bg-background/30 backdrop-blur-[2px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/20 bg-amber-400/[0.035]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          MODALS
      ===================================================== */}
      <BookMyCallModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </>
  );
};

export default Dock;
