import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Home,
  User,
  BookOpen,
  FolderKanban,
  Briefcase,
  Cpu,
  Trophy,
  MessageSquare,
  GraduationCap,
  Mail,
  Search as SearchIcon,
  CalendarCheck,
} from "lucide-react";
import BookMyCallModal from "./BookMyCallModal";
import SearchModal from "./SearchModal";

const NAV_ITEMS = [
  {
    id: "home",
    path: "/",
    label: "Home",
    icon: Home,
    color: "#3B82F6",
    bgActive:
      "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30 shadow-xs",
    dot: "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]",
    type: "route",
  },
  {
    id: "about",
    path: "/about",
    label: "About",
    icon: User,
    color: "#64748B",
    bgActive:
      "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-400/30 shadow-xs",
    dot: "bg-slate-500 shadow-[0_0_8px_rgba(100,116,139,0.8)]",
    type: "route",
  },
  // {
  //   id: "skills",
  //   path: "/skills",
  //   label: "Skills",
  //   icon: BookOpen,
  //   color: "#A855F7",
  //   bgActive:
  //     "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30 shadow-xs",
  //   dot: "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
  //   type: "route",
  // },
  {
    id: "projects",
    path: "/projects",
    label: "Projects",
    icon: FolderKanban,
    color: "#EF4444",
    bgActive:
      "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 shadow-xs",
    dot: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]",
    type: "route",
  },
  {
    id: "experience",
    path: "/experience",
    label: "Experience",
    icon: Briefcase,
    color: "#F97316",
    bgActive:
      "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30 shadow-xs",
    dot: "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]",
    type: "route",
  },
  {
    id: "tech-stack",
    path: "/skills",
    label: "Tech Stack",
    icon: Cpu,
    color: "#06B6D4",
    bgActive:
      "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30 shadow-xs",
    dot: "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
    type: "route",
  },
  {
    id: "achievements",
    path: "/achievements",
    label: "Achievements",
    icon: Trophy,
    color: "#10B981",
    bgActive:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 shadow-xs",
    dot: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
    type: "route",
  },
  {
    id: "contact",
    path: "/contact",
    label: "Contact",
    icon: MessageSquare,
    color: "#EC4899",
    bgActive:
      "bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30 shadow-xs",
    dot: "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]",
    type: "route",
  },
  {
    id: "education",
    path: "/education",
    label: "Education",
    icon: GraduationCap,
    color: "#6366F1",
    bgActive:
      "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 shadow-xs",
    dot: "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
    type: "route",
  },
  {
    id: "email",
    path: "mailto:ratnakarsinghparihar9399@gmail.com",
    label: "Email",
    icon: Mail,
    color: "#22C55E",
    bgActive:
      "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30 shadow-xs",
    dot: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]",
    type: "external",
  },
  {
    id: "search",
    label: "Search",
    icon: SearchIcon,
    color: "#8B5CF6",
    bgActive:
      "bg-violet-500/15 text-violet-600 dark:text-violet-400 border-violet-500/30 shadow-xs",
    dot: "bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]",
    type: "action",
    action: "search",
  },
  {
    id: "book-call",
    label: "Book a Call",
    icon: CalendarCheck,
    color: "#F59E0B",
    bgActive:
      "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30 shadow-xs",
    dot: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
    type: "action",
    action: "bookCall",
    isProminent: true,
  },
];

function DockItem({
  mouseX,
  item,
  isActive,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - (bounds.x + bounds.width / 2);
  });

  const scaleSync = useTransform(
    distance,
    [-150, -75, 0, 75, 150],
    [1.0, 1.15, 1.35, 1.15, 1.0],
  );

  const translateYSync = useTransform(
    distance,
    [-150, -75, 0, 75, 150],
    [0, -3, -8, -3, 0],
  );

  const scale = useSpring(scaleSync, {
    mass: 0.1,
    stiffness: 350,
    damping: 25,
  });
  const translateY = useSpring(translateYSync, {
    mass: 0.1,
    stiffness: 350,
    damping: 25,
  });

  const Icon = item.icon;

  const content = (
    <div
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col items-center select-none group"
    >
      {/* Floating Label – appears above the dock */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className={`absolute -top-11 px-3 py-1 text-xs font-semibold rounded-lg pointer-events-none whitespace-nowrap z-50 shadow-xl border backdrop-blur-md ${
              isActive
                ? "bg-slate-950/95 dark:bg-slate-100/95 text-white dark:text-slate-900 border-slate-800/80 dark:border-slate-300/80"
                : "bg-slate-900/95 dark:bg-slate-800/95 text-slate-100 dark:text-slate-200 border-slate-700/70 dark:border-slate-700/70"
            }`}
          >
            {item.label}
            {/* Pointer arrow */}
            <div className="absolute w-2 h-2 rotate-45 -translate-x-1/2 border-b border-r -bottom-1 left-1/2 bg-slate-900/95 dark:bg-slate-800/95 border-slate-700/70 dark:border-slate-700/70" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dock Icon Tile */}
      <motion.div
        style={{ scale, y: translateY }}
        whileTap={{ scale: 0.92 }}
        onClick={onClick}
        className={`
          relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl sm:rounded-2xl cursor-pointer transition-colors duration-200
          ${
            isActive
              ? `${item.bgActive} border font-semibold shadow-xs`
              : isHovered
                ? "bg-slate-200/90 dark:bg-slate-700/80 border border-slate-300/80 dark:border-slate-600/70 shadow-xs"
                : item.isProminent
                  ? "bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/20"
                  : "bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/50 hover:bg-slate-200/80 dark:hover:bg-slate-700/60"
          }
        `}
      >
        <Icon
          size={19}
          strokeWidth={isActive || isHovered ? 2.4 : 2.0}
          style={{ color: item.color }}
          className={`transition-all duration-200 ${
            isActive || isHovered
              ? "brightness-125 drop-shadow-xs opacity-100"
              : "opacity-85 hover:opacity-100"
          }`}
        />

        {/* Minimal Active Dot Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeDockDot"
            className={`absolute -bottom-1 w-1.5 h-1.5 rounded-full ${item.dot}`}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          />
        )}
      </motion.div>
    </div>
  );

  if (item.type === "route") {
    return (
      <Link to={item.path} className="outline-none focus:outline-none shrink-0">
        {content}
      </Link>
    );
  }

  if (item.type === "external") {
    return (
      <a
        href={item.path}
        target="_blank"
        rel="noopener noreferrer"
        className="outline-none focus:outline-none shrink-0"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className="p-0 bg-transparent border-none outline-none cursor-pointer focus:outline-none shrink-0"
    >
      {content}
    </button>
  );
}

const Dock = () => {
  const location = useLocation();
  const mouseX = useMotionValue(Infinity);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleCustomSearchEvent = () => setIsSearchModalOpen(true);
    window.addEventListener("openSearchModal", handleCustomSearchEvent);
    return () =>
      window.removeEventListener("openSearchModal", handleCustomSearchEvent);
  }, []);

  const handleBookClick = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsBookModalOpen(true);
    }, 450);
  };

  return (
    <>
      {/* Floating macOS Icon Dock Container (Hidden on Mobile <768px) */}
      <div className="fixed z-50 hidden max-w-full px-2 -translate-x-1/2 pointer-events-none md:block bottom-4 sm:bottom-5 left-1/2 sm:px-4">
        <motion.div
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            setHoveredIndex(null);
          }}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              mouseX.set(e.touches[0].clientX);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              mouseX.set(e.touches[0].clientX);
            }
          }}
          onTouchEnd={() => {
            mouseX.set(Infinity);
            setHoveredIndex(null);
          }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          // 🔑 KEY CHANGE: overflow-visible and added top padding for label space
          className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 md:gap-2 px-2.5 sm:px-3.5 pt-4 pb-1.5 sm:pt-5 sm:pb-2.5 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] ring-1 ring-white/80 dark:ring-white/10 no-scrollbar overflow-visible select-none max-w-fit"
        >
          {NAV_ITEMS.map((item, index) => {
            const isActive =
              item.type === "route" &&
              (location.pathname === item.path ||
                (item.path !== "/" && location.pathname.startsWith(item.path)));

            const isHovered = hoveredIndex === index;

            const handleClick = () => {
              if (item.action === "search") setIsSearchModalOpen(true);
              if (item.action === "bookCall") handleBookClick();
            };

            return (
              <DockItem
                key={item.id}
                item={item}
                mouseX={mouseX}
                isActive={isActive}
                isHovered={isHovered}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={handleClick}
              />
            );
          })}
        </motion.div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 z-[160] backdrop-blur-md bg-slate-900/40 dark:bg-black/60 flex flex-col items-center justify-center text-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 mb-3 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin" />
            <p className="text-sm font-semibold tracking-wide text-white">
              Opening Calendar Scheduler...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
      {isBookModalOpen && (
        <BookMyCallModal
          isOpen={isBookModalOpen}
          onClose={() => setIsBookModalOpen(false)}
        />
      )}
    </>
  );
};

export default Dock;
