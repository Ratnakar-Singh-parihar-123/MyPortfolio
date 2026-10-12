import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Users,
  FolderKanban,
  Cpu,
  FileText,
  GraduationCap,
  Mail,
  Layers,
  Smartphone,
  Server,
  Coffee,
  Code2,
  Compass,
  Home,
  Github,
  ExternalLink,
  LayoutGrid,
  X,
  Download,
  Clock,
  Zap,
  Star,
  Check,
  Globe,
  Building2,
  Users2,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Battery,
  Signal,
  Copy,
  CheckCircle2,
  Trophy,
  Lock,
  TrendingUp,
  Activity,
  Target,
  Award,
  BadgeCheck,
  MapPin,
  BarChart3,
} from "lucide-react";
import { ROLES } from "../../../data/roleDashboard";
import { allProjects } from "../../../data/projects";

// ⬇️ Profile image import — apna path adjust karo
import profileImg from "../../../assets/heroImg/hero.jpeg";

const ROLE_ICONS = { Layers, Smartphone, Server, Coffee, Code2 };

/* ---------- derived data ---------- */
const FEATURED_PROJECTS = (allProjects || []).filter(
  (p) => p?.featured === true,
);

const normalizeTag = (t) =>
  String(t || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const projectMatchesRole = (role, project) => {
  if (!role?.tech?.length || !project?.technologies?.length) return false;
  const tags = new Set(role.tech.map(normalizeTag));
  return project.technologies.some((t) => tags.has(normalizeTag(t)));
};

const ROLE_PROJECT_COUNTS = ROLES.reduce((acc, r) => {
  acc[r.id] = FEATURED_PROJECTS.filter((p) => projectMatchesRole(r, p)).length;
  return acc;
}, {});

const totalTechTags = new Set(ROLES.flatMap((r) => r.tech || [])).size;

const STATS = [
  {
    label: "Role Profiles",
    value: ROLES.length,
    icon: Users,
    hint: "Tailored paths",
  },
  {
    label: "Featured Projects",
    value: FEATURED_PROJECTS.length,
    icon: FolderKanban,
    hint: "Handpicked work",
  },
  {
    label: "Tech Tags",
    value: totalTechTags,
    icon: Cpu,
    hint: "Across all roles",
  },
  {
    label: "Resume Variants",
    value: ROLES.length,
    icon: FileText,
    hint: "One per role",
  },
];

const TONES = {
  indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-300",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
};

const QUICK_ACTIONS = [
  {
    label: "Explore All Roles",
    icon: Users,
    path: "/role-dashboard/roles",
    ready: false,
    tone: "indigo",
  },
  {
    label: "Featured Projects",
    icon: FolderKanban,
    path: "/projects",
    ready: true,
    tone: "violet",
  },
  {
    label: "Resume Center",
    icon: FileText,
    path: "/role-dashboard/resume",
    ready: false,
    tone: "sky",
  },
  {
    label: "Contact Me",
    icon: Mail,
    path: "/contact",
    ready: true,
    tone: "emerald",
  },
  {
    label: "Main Portfolio",
    icon: Home,
    path: "/",
    ready: true,
    tone: "amber",
  },
];

const JOURNEY_STEPS = [
  "Select the role most relevant to your hiring need.",
  "Review matching skills, projects, and experience.",
  "Open the role-specific resume.",
  "Reach out through the contact page.",
];

const STATUS_STYLES = {
  Live: "border-emerald-500/30 bg-emerald-500/95 text-white",
  "Production Ready": "border-emerald-500/30 bg-emerald-500/95 text-white",
  "In Development": "border-amber-500/40 bg-amber-500/95 text-white",
  Planned: "border-slate-400/40 bg-slate-600/90 text-white",
};

const TYPE_LABELS = {
  fullstack: "Full-Stack",
  react: "React",
  htmlcss: "HTML / CSS",
  mobile: "Mobile",
  "system-design": "System Design",
};

const prettyUrl = (url) => {
  if (!url) return "preview";
  try {
    const u = new URL(url);
    return u.host + (u.pathname !== "/" ? u.pathname : "");
  } catch {
    return String(url);
  }
};

/* =========================================================
   MINI CHARTS (SVG-based, no library)
========================================================= */

const SparkLine = ({ data = [], color = "#6366f1", height = 40 }) => {
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const width = 100;
  const step = width / (data.length - 1);
  const points = data
    .map(
      (v, i) =>
        `${i * step},${height - ((v - min) / range) * (height - 6) - 3}`,
    )
    .join(" ");

  const gradId = `spark-${color.replace("#", "")}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full"
      style={{ height }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,${height} ${points} ${width},${height}`}
        fill={`url(#${gradId})`}
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const MiniBars = ({ data = [], color = "#6366f1" }) => {
  const max = Math.max(...data, 1);
  return (
    <div className="flex items-end gap-[3px] h-8">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 transition-all duration-300 rounded-sm"
          style={{
            height: `${Math.max((v / max) * 100, 12)}%`,
            backgroundColor: color,
            opacity: i === data.length - 1 ? 1 : 0.45 + (i / data.length) * 0.4,
          }}
        />
      ))}
    </div>
  );
};

const Donut = ({ value = 0, size = 52, stroke = 6, color = "#6366f1" }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-slate-200 dark:text-slate-800"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[11px] font-bold text-slate-900 dark:text-white">
          {value}%
        </span>
      </div>
    </div>
  );
};

/* =========================================================
   PHONE FRAME (Android-style mockup)
========================================================= */
const PhoneFrame = ({ children, time = "9:41", size = "default" }) => {
  const sizes = {
    small: "max-w-[180px]",
    default: "max-w-[210px]",
    large: "max-w-[240px] sm:max-w-[260px]",
  };
  const bezel = {
    small: "rounded-[1.9rem] border-[5px]",
    default: "rounded-[2.4rem] border-[6px]",
    large: "rounded-[2.6rem] border-[7px]",
  };
  const screenRadius = {
    small: "rounded-[1.5rem]",
    default: "rounded-[1.9rem]",
    large: "rounded-[2.1rem]",
  };
  return (
    <div className={`relative mx-auto w-full ${sizes[size] || sizes.default}`}>
      <div
        className={`relative aspect-[9/19] overflow-hidden ${bezel[size] || bezel.default} border-slate-900 bg-slate-900 shadow-2xl shadow-slate-900/40 ring-1 ring-slate-900/40 dark:border-slate-800 dark:bg-slate-800 dark:ring-slate-700/60`}
      >
        <div
          className={`relative h-full w-full overflow-hidden ${screenRadius[size] || screenRadius.default} bg-slate-950`}
        >
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-2 text-white bg-gradient-to-b from-black/60 to-transparent">
            <span className="text-[9px] font-semibold tracking-wide">
              {time}
            </span>
            <div className="flex items-center gap-1">
              <Signal size={9} />
              <Wifi size={9} />
              <Battery size={10} />
            </div>
          </div>
          <div className="absolute left-1/2 top-1.5 z-30 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-900 dark:bg-slate-800" />
          {children}
          <div className="pointer-events-none absolute bottom-1.5 left-1/2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   BROWSER FRAME (macOS-style)
========================================================= */
const BrowserFrame = ({ children, url }) => (
  <div className="relative w-full overflow-hidden border shadow-2xl rounded-xl border-slate-300/80 bg-slate-100 shadow-slate-900/20 dark:border-slate-700/70 dark:bg-slate-800">
    <div className="flex items-center gap-2 border-b border-slate-200/80 bg-gradient-to-b from-slate-100 to-slate-50 px-3 py-2.5 dark:border-slate-700/70 dark:from-slate-800 dark:to-slate-900">
      <div className="flex shrink-0 gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-white/80 px-2.5 py-1 ring-1 ring-slate-200/80 dark:bg-slate-900/70 dark:ring-slate-700/70">
        <Lock
          size={9}
          className="shrink-0 text-slate-400 dark:text-slate-500"
        />
        <span className="truncate text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
          {prettyUrl(url)}
        </span>
      </div>
      <div className="hidden gap-1 ml-1 shrink-0 sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 dark:bg-slate-600" />
      </div>
    </div>
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white dark:bg-slate-900">
      {children}
    </div>
  </div>
);

/* =========================================================
   MAIN COMPONENT
========================================================= */
const DashboardOverview = () => {
  const reduceMotion = useReducedMotion();
  const [activeRole, setActiveRole] = useState("all");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    if (activeRole === "all") return FEATURED_PROJECTS;
    const role = ROLES.find((r) => r.id === activeRole);
    return role
      ? FEATURED_PROJECTS.filter((p) => projectMatchesRole(role, p))
      : FEATURED_PROJECTS;
  }, [activeRole]);

  const webFiltered = useMemo(
    () => filtered.filter((p) => p.projectType !== "mobile"),
    [filtered],
  );
  const mobileFiltered = useMemo(
    () => filtered.filter((p) => p.projectType === "mobile"),
    [filtered],
  );

  const activeRoleObj = ROLES.find((r) => r.id === activeRole);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6 sm:space-y-7"
      >
        {/* ================= HERO ================= */}
        <motion.section
          variants={item}
          className="relative overflow-hidden bg-white border shadow-sm rounded-3xl border-slate-200/70 dark:border-slate-800/70 dark:bg-slate-950"
        >
          {/* ============== BACKGROUND LAYERS ============== */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-violet-50/60 dark:from-indigo-950/40 dark:via-slate-950 dark:to-violet-950/25" />

          <div className="absolute rounded-full pointer-events-none -right-20 -top-24 h-80 w-80 bg-indigo-500/15 blur-3xl dark:bg-indigo-500/10" />
          <div className="absolute rounded-full pointer-events-none -bottom-28 -left-20 h-80 w-80 bg-violet-500/15 blur-3xl dark:bg-violet-500/10" />

          {/* dot grid */}
          <div
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgb(100 116 139) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* ============== CONTENT ============== */}
          <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:py-16">
            {/* ===================== LEFT: TEXT ===================== */}
            <div className="flex flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-indigo-400/30 bg-white/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600 backdrop-blur dark:bg-indigo-500/10 dark:text-indigo-300">
                <Sparkles size={11} /> Role-based dashboard
              </span>

              <h1 className="mt-5 max-w-2xl text-3xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] dark:text-white">
                Your Role-{" "}
                <span className="text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text dark:from-indigo-400 dark:via-violet-400 dark:to-fuchsia-400">
                  Based Portfolio
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px] dark:text-slate-400">
                Explore a tailored profile built around the position you&apos;re
                hiring for — with the most relevant skills, projects,
                experience, and resume.
              </p>

              <div className="flex flex-col gap-3 mt-7 sm:flex-row">
                <Link
                  to="/role-dashboard/roles"
                  className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-[13px] font-semibold text-white shadow-sm shadow-slate-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/15 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:bg-white dark:text-slate-900 dark:shadow-white/5"
                >
                  Explore Role Profiles
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  to="/"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-5 text-[13px] font-semibold text-slate-700 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700"
                >
                  View Main Portfolio
                </Link>
              </div>

              {/* ============== STATS ============== */}
              <div className="grid grid-cols-2 gap-4 pt-6 mt-10 border-t border-slate-200/70 sm:grid-cols-4 dark:border-slate-800/70">
                {STATS.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={s.label}
                      title={s.hint}
                      className="flex items-center gap-3"
                    >
                      <span className="flex items-center justify-center w-10 h-10 text-indigo-600 shrink-0 rounded-xl bg-indigo-500/10 dark:text-indigo-300">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0">
                        <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                          {s.value}
                        </div>
                        <div className="truncate text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===================== RIGHT: PROFILE + ANALYTICS ===================== */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[380px]">
                {/* ---- Floating card: Activity (top-left) ---- */}
                <motion.div
                  initial={
                    reduceMotion ? false : { opacity: 0, x: -20, y: -10 }
                  }
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute z-20 hidden -left-4 sm:-left-8 top-4 sm:block"
                >
                  {/* <motion.div
                    animate={reduceMotion ? {} : { y: [0, -6, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="p-3 border shadow-xl rounded-2xl border-slate-200/80 bg-white/95 shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Activity size={12} />
                      </span>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          Activity
                        </div>
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                          +24% this week
                        </div>
                      </div>
                    </div>
                    <div className="w-[100px]">
                      <SparkLine
                        data={[8, 12, 9, 15, 11, 18, 14, 22, 20, 26]}
                        color="#10b981"
                        height={28}
                      />
                    </div>
                  </motion.div> */}
                </motion.div>
                {/* ---- Floating card: Skills donut (top-right) ---- */}
                {/* <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: 20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute z-20 -right-4 sm:-right-6 top-12"
                >
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                    className="p-3 border shadow-xl rounded-2xl border-slate-200/80 bg-white/95 shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"
                  >
                    <div className="flex items-center gap-2.5">
                      <Donut value={92} color="#8b5cf6" size={44} stroke={5} />
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          Skills Match
                        </div>
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                          Excellent
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div> */}
                {/* ---- Main Profile Card ---- */}
                <motion.div
                  initial={
                    reduceMotion ? false : { opacity: 0, y: 30, scale: 0.95 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative z-10 mx-auto w-full max-w-[300px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800/80 dark:bg-slate-950"
                >
                  {/* Cover gradient */}
                  <div className="relative h-24 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "12px 12px",
                      }}
                    />
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-green-700 backdrop-blur-md border border-white/30 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                      <BadgeCheck size={10} /> Verified
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="relative flex justify-center -mt-10">
                    <div className="relative">
                      <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 blur-md opacity-60" />
                      <span className="relative block w-24 h-24 overflow-hidden rounded-full shadow-lg ring-4 ring-white dark:ring-slate-950">
                        <img
                          src={profileImg}
                          alt="Ratnakar Singh Parihar"
                          className="object-cover w-full h-auto"
                        />
                      </span>
                      <span className="absolute bottom-1.5 right-1.5 flex h-4 w-4">
                        <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-400 animate-ping" />
                        <span className="relative inline-flex w-4 h-4 border-2 border-white rounded-full bg-emerald-500 dark:border-slate-950" />
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="px-5 pt-3 pb-5 text-center">
                    <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">
                      Ratnakar Singh Parihar
                    </h3>
                    <p className="mt-0.5 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                      Full-Stack Developer
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                      <MapPin size={10} />
                      <span>Bengaluru, Karnataka, India</span>
                    </div>

                    {/* Divider */}
                    <div className="h-px my-4 bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-800" />

                    {/* Mini metrics */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-[15px] font-bold text-slate-900 dark:text-white">
                          {FEATURED_PROJECTS.length}
                        </div>
                        <div className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                          Projects
                        </div>
                      </div>
                      <div className="text-center border-x border-slate-200/70 dark:border-slate-800/70">
                        <div className="text-[15px] font-bold text-slate-900 dark:text-white">
                          {totalTechTags}+
                        </div>
                        <div className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                          Skills
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-[15px] font-bold text-slate-900 dark:text-white">
                          {ROLES.length}
                        </div>
                        <div className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                          Roles
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                {/* ---- Floating card: Weekly bars (bottom-left) ---- */}
                {/* <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute z-20 -left-4 sm:-left-10 bottom-8"
                >
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, 6, 0] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    className="p-3 border shadow-xl rounded-2xl border-slate-200/80 bg-white/95 shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center w-6 h-6 text-indigo-600 rounded-lg bg-indigo-500/10 dark:text-indigo-400">
                        <BarChart3 size={12} />
                      </span>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          Weekly
                        </div>
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                          Consistent
                        </div>
                      </div>
                    </div>
                    <div className="w-[100px]">
                      <MiniBars data={[3, 5, 4, 7, 6, 8, 7]} color="#6366f1" />
                    </div>
                  </motion.div>
                </motion.div> */}
                {/* ---- Floating card: Rating (bottom-right) ----
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, x: 20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute z-20 hidden -right-4 sm:-right-8 bottom-16 sm:block"
                >
                  <motion.div
                    animate={reduceMotion ? {} : { y: [0, -5, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.6,
                    }}
                    className="p-3 border shadow-xl rounded-2xl border-slate-200/80 bg-white/95 shadow-slate-900/5 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/90"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                        <Award size={12} />
                      </span>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          Rating
                        </div>
                        <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                          4.9 / 5.0
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div> */}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ================= ROLE CARDS ================= */}
        <motion.section variants={item} aria-labelledby="role-profiles-heading">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div>
              <h2
                id="role-profiles-heading"
                className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                Role profiles
              </h2>
              <p className="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">
                Choose the role closest to your hiring need.
              </p>
            </div>
            <span className="hidden text-[11px] font-medium text-slate-400 sm:inline dark:text-slate-500">
              {ROLES.length} available
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {ROLES.map((role, idx) => {
              const Icon = ROLE_ICONS[role.icon] || Layers;
              const projectCount = ROLE_PROJECT_COUNTS[role.id] || 0;
              return (
                <motion.div
                  key={role.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: reduceMotion ? 0 : idx * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    to={role.route}
                    className="relative flex flex-col h-full p-5 overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200/70 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40 dark:border-slate-800/70 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:shadow-black/20"
                  >
                    <div
                      className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${role.accent?.bg || "bg-indigo-500/10"}`}
                    />

                    <div className="relative flex items-start justify-between">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${role.accent?.border || "border-slate-200"} ${role.accent?.bg || "bg-slate-50"} ${role.accent?.text || "text-slate-600"}`}
                      >
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-slate-700"
                      />
                    </div>

                    <h3 className="relative mt-4 text-[14.5px] font-semibold text-slate-900 dark:text-white">
                      {role.title}
                    </h3>
                    <p className="relative mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
                      {role.description}
                    </p>

                    <div className="relative mt-4 flex flex-wrap gap-1.5">
                      {role.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-slate-200/80 bg-slate-50/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
                        >
                          {t}
                        </span>
                      ))}
                      {role.tech.length > 4 && (
                        <span className="rounded-md border border-slate-200/80 bg-slate-50/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-500">
                          +{role.tech.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="relative flex items-center justify-between pt-3 mt-auto border-t border-slate-100 dark:border-slate-900">
                      <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-indigo-600 dark:text-indigo-300">
                        Explore profile{" "}
                        <ArrowRight
                          size={13}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </span>
                      <span className="text-[10.5px] font-medium text-slate-400 dark:text-slate-500">
                        {projectCount}{" "}
                        {projectCount === 1 ? "project" : "projects"}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ================= QUICK ACTIONS + JOURNEY ================= */}
        <motion.section
          variants={item}
          className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3"
        >
          <div className="p-5 bg-white border rounded-2xl border-slate-200/70 lg:col-span-2 dark:border-slate-800/70 dark:bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 text-indigo-600 rounded-lg bg-indigo-500/10 dark:text-indigo-300">
                <Compass size={15} />
              </span>
              <div>
                <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white">
                  Quick actions
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-500">
                  Jump straight to what you need.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {QUICK_ACTIONS.map((a) => {
                const Icon = a.icon;
                const tone = TONES[a.tone] || TONES.indigo;
                const inner = (
                  <>
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}
                    >
                      <Icon size={16} strokeWidth={1.9} />
                    </span>
                    <span className="min-w-0 flex-1 text-left text-[12.5px] font-semibold text-slate-700 dark:text-slate-200">
                      {a.label}
                    </span>
                    {a.ready ? (
                      <ArrowRight
                        size={14}
                        className="shrink-0 text-slate-300 transition-transform group-hover/act:translate-x-0.5 dark:text-slate-600"
                      />
                    ) : (
                      <span className="shrink-0 rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-800/80 dark:text-slate-500">
                        Soon
                      </span>
                    )}
                  </>
                );
                const base =
                  "group/act flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40";
                const active =
                  "border-slate-200/80 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800/80 dark:bg-slate-900/40 dark:hover:border-slate-700";
                const disabled =
                  "border-slate-200/50 bg-slate-50/40 opacity-70 cursor-not-allowed dark:border-slate-800/50 dark:bg-slate-900/20";
                return a.ready ? (
                  <Link
                    key={a.label}
                    to={a.path}
                    className={`${base} ${active}`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div
                    key={a.label}
                    aria-disabled="true"
                    title="Coming soon"
                    className={`${base} ${disabled}`}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 bg-white border rounded-2xl border-slate-200/70 dark:border-slate-800/70 dark:bg-slate-950/60">
            <div className="flex items-center gap-2.5">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300">
                <GraduationCap size={15} />
              </span>
              <div>
                <h2 className="text-[14px] font-semibold text-slate-900 dark:text-white">
                  Suggested journey
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-500">
                  A quick path through the dashboard.
                </p>
              </div>
            </div>

            <ol className="relative mt-5 space-y-4">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-indigo-500/40 via-violet-500/30 to-transparent"
              />
              {JOURNEY_STEPS.map((step, i) => (
                <li key={i} className="relative flex gap-3">
                  <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-indigo-500/20 bg-white text-[10px] font-bold text-indigo-600 shadow-sm dark:border-indigo-400/20 dark:bg-slate-950 dark:text-indigo-300">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[12px] leading-relaxed text-slate-600 dark:text-slate-400">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        {/* ================= FEATURED WORK ================= */}
        <motion.section variants={item} aria-labelledby="featured-work-heading">
          <div className="flex items-end justify-between gap-4 mb-4">
            <div className="min-w-0">
              <h2
                id="featured-work-heading"
                className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                Featured work
              </h2>
              <p className="mt-0.5 text-[12px] text-slate-500 dark:text-slate-400">
                {activeRole === "all"
                  ? "A few projects that reflect my range."
                  : `Projects matching the ${activeRoleObj?.title || "selected"} role.`}
              </p>
            </div>
            <Link
              to="/projects"
              className="group inline-flex shrink-0 items-center gap-1.5 text-[12px] font-semibold text-indigo-600 transition hover:opacity-80 dark:text-indigo-300"
            >
              View all{" "}
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* role chips */}
          <div className="mb-5 flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActiveRole("all")}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
                activeRole === "all"
                  ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <LayoutGrid size={13} /> All
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  activeRole === "all"
                    ? "bg-indigo-500/20 text-indigo-700 dark:text-indigo-200"
                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {FEATURED_PROJECTS.length}
              </span>
            </button>
            {ROLES.map((role) => {
              const Icon = ROLE_ICONS[role.icon] || Layers;
              const count = ROLE_PROJECT_COUNTS[role.id] || 0;
              const isActive = activeRole === role.id;
              const isEmpty = count === 0;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setActiveRole(role.id)}
                  disabled={isEmpty}
                  title={
                    isEmpty
                      ? "No featured projects for this role yet"
                      : role.title
                  }
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300"
                      : isEmpty
                        ? "border-slate-200/60 bg-slate-50/50 text-slate-400 cursor-not-allowed dark:border-slate-800/60 dark:bg-slate-900/20 dark:text-slate-600"
                        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  <Icon size={13} />
                  <span className="whitespace-nowrap">{role.title}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-indigo-500/20 text-indigo-700 dark:text-indigo-200"
                        : isEmpty
                          ? "bg-slate-100/70 text-slate-400 dark:bg-slate-800/60 dark:text-slate-600"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* WEB PROJECTS */}
          {webFiltered.length > 0 && (
            <div className="mb-8">
              {mobileFiltered.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <Layers
                    size={13}
                    className="text-indigo-500 dark:text-indigo-300"
                  />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Web Projects · {webFiltered.length}
                  </h3>
                </div>
              )}
              <motion.div
                layout
                className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {webFiltered.map((p) => (
                    <WebCard
                      key={p.id}
                      project={p}
                      reduceMotion={reduceMotion}
                      onSelect={() => setSelected(p)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {/* MOBILE APPS */}
          {mobileFiltered.length > 0 && (
            <div>
              {webFiltered.length > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone
                    size={13}
                    className="text-violet-500 dark:text-violet-300"
                  />
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                    Mobile Apps · {mobileFiltered.length}
                  </h3>
                </div>
              )}
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {mobileFiltered.map((p) => (
                    <MobileCard
                      key={p.id}
                      project={p}
                      reduceMotion={reduceMotion}
                      onSelect={() => setSelected(p)}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="p-10 text-center border border-dashed rounded-2xl border-slate-200 dark:border-slate-800">
              <FolderKanban
                size={22}
                className="mx-auto text-slate-300 dark:text-slate-700"
              />
              <p className="mt-3 text-[12px] text-slate-500 dark:text-slate-500">
                No featured projects match this role yet.
              </p>
              <button
                type="button"
                onClick={() => setActiveRole("all")}
                className="mt-3 text-[12px] font-semibold text-indigo-600 hover:opacity-80 dark:text-indigo-300"
              >
                Show all projects
              </button>
            </div>
          )}
        </motion.section>
      </motion.div>

      {/* ================= PROJECT MODAL ================= */}
      <AnimatePresence>
        {selected && (
          <ProjectModal
            key={selected.id}
            project={selected}
            onClose={() => setSelected(null)}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </>
  );
};

/* =========================================================
   WEB CARD
========================================================= */
const WebCard = ({ project: p, reduceMotion, onSelect }) => {
  const statusClass =
    STATUS_STYLES[p.status] || "border-slate-500/30 bg-slate-600/85 text-white";
  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={{
        duration: reduceMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative flex flex-col overflow-hidden transition-all duration-300 bg-white border group rounded-2xl border-slate-200/70 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800/70 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:shadow-black/20"
    >
      <button
        type="button"
        onClick={onSelect}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100 text-left dark:bg-slate-900"
      >
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-slate-300 dark:text-slate-700">
            <FolderKanban size={28} />
          </div>
        )}
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none bg-gradient-to-b from-black/45 to-transparent" />
        {p.category && (
          <span className="absolute left-2.5 top-2.5 max-w-[68%] truncate rounded-md border border-white/15 bg-black/45 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
            {p.category}
          </span>
        )}
        {p.status && (
          <span
            className={`absolute right-2.5 top-2.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm ${statusClass}`}
          >
            {p.status}
          </span>
        )}
        {p.projectType && (
          <span className="absolute bottom-2.5 left-2.5 rounded-md border border-white/15 bg-black/45 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
            {TYPE_LABELS[p.projectType] || p.projectType}
          </span>
        )}
      </button>

      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-[14px] font-semibold leading-snug text-slate-900 dark:text-white">
          {p.title}
        </h3>
        {p.description && (
          <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-slate-500 dark:text-slate-400">
            {p.description}
          </p>
        )}
        {Array.isArray(p.technologies) && p.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.technologies.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-md border border-slate-200/80 bg-slate-50/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400"
              >
                {t}
              </span>
            ))}
            {p.technologies.length > 4 && (
              <span className="rounded-md border border-slate-200/80 bg-slate-50/80 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-500">
                +{p.technologies.length - 4}
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between gap-2 pt-3 mt-auto border-t border-slate-100 dark:border-slate-900">
          <button
            type="button"
            onClick={onSelect}
            className="group/link inline-flex items-center gap-1.5 text-[12px] font-semibold text-indigo-600 hover:opacity-80 dark:text-indigo-300"
          >
            View details{" "}
            <ArrowRight
              size={13}
              className="transition-transform group-hover/link:translate-x-0.5"
            />
          </button>
          <div className="flex items-center gap-1">
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} GitHub`}
                className="flex items-center justify-center transition rounded-lg h-7 w-7 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <Github size={13} />
              </a>
            )}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.title} live`}
                className="flex items-center justify-center transition rounded-lg h-7 w-7 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* =========================================================
   MOBILE CARD (phone mockup)
========================================================= */
const MobileCard = ({ project: p, reduceMotion, onSelect }) => (
  <motion.div
    layout
    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
    transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center"
  >
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open ${p.title}`}
      className="w-full transition-transform duration-300 group rounded-3xl hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40"
    >
      <PhoneFrame>
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-slate-900 text-slate-700">
            <Smartphone size={32} />
          </div>
        )}
        {p.status && (
          <span
            className={`absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[9.5px] font-semibold backdrop-blur-sm ${
              STATUS_STYLES[p.status] ||
              "border-slate-500/30 bg-slate-600/85 text-white"
            }`}
          >
            {p.status}
          </span>
        )}
      </PhoneFrame>
    </button>

    <div className="mt-3 w-full max-w-[210px] text-center">
      <h3 className="truncate text-[13px] font-semibold text-slate-900 dark:text-white">
        {p.title}
      </h3>
      <div className="mt-0.5 flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500 dark:text-slate-400">
        <Smartphone size={10} />
        <span>{p.platforms?.join(" · ") || "Mobile"}</span>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:opacity-80 dark:text-indigo-300"
      >
        View app <ArrowRight size={11} />
      </button>
    </div>
  </motion.div>
);

/* =========================================================
   PROJECT MODAL
========================================================= */
const ProjectModal = ({ project, onClose, reduceMotion }) => {
  const gallery = useMemo(() => {
    const g =
      Array.isArray(project.gallery) && project.gallery.length
        ? project.gallery
        : project.image
          ? [project.image]
          : [];
    return Array.from(new Set(g.filter(Boolean)));
  }, [project]);

  const [activeImage, setActiveImage] = useState(0);
  const [copiedKey, setCopiedKey] = useState(null);
  const isMobile = project.projectType === "mobile";

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setActiveImage((i) => Math.min(i + 1, gallery.length - 1));
      if (e.key === "ArrowLeft") setActiveImage((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, gallery.length]);

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {}
  };

  const statusClass =
    STATUS_STYLES[project.status] ||
    "border-slate-500/30 bg-slate-600/85 text-white";
  const hasCredentials =
    project.demoCredentials &&
    (project.demoCredentials.mobile || project.demoCredentials.otp);
  const hasFooterActions =
    project.liveUrl ||
    project.githubUrl ||
    project.apkUrl ||
    (project.apkStatus && !project.apkUrl);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4 md:p-6"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        aria-hidden="true"
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: 30, scale: 0.98 }}
        transition={{
          duration: reduceMotion ? 0 : 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        role="dialog"
        aria-modal="true"
        className="relative flex h-[95dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl dark:bg-slate-950 sm:h-auto sm:max-h-[92dvh] sm:rounded-2xl"
      >
        {/* ============== STICKY HEADER ============== */}
        <div className="relative z-30 flex shrink-0 items-start justify-between gap-3 border-b border-slate-200/70 bg-white/90 px-4 py-3.5 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90 sm:items-center sm:gap-4 sm:px-6 sm:py-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {project.status && (
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${statusClass}`}
                >
                  {project.status}
                </span>
              )}
              {project.projectType && (
                <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                  {TYPE_LABELS[project.projectType] || project.projectType}
                </span>
              )}
              {project.featured && (
                <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  <Star size={9} fill="currentColor" /> Featured
                </span>
              )}
            </div>
            <h2 className="mt-2 text-base font-bold tracking-tight truncate text-slate-900 sm:text-xl dark:text-white">
              {project.title}
            </h2>
            {project.category && (
              <p className="mt-0.5 truncate text-[11.5px] text-slate-500 dark:text-slate-400 sm:text-[12px]">
                {project.category}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex items-center justify-center transition border h-9 w-9 shrink-0 rounded-xl border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* ============== SCROLLABLE BODY ============== */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 gap-5 p-4 sm:gap-6 sm:p-6 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
            {/* LEFT: GALLERY */}
            <div className="space-y-4">
              {gallery.length > 0 ? (
                <>
                  <div className="p-3 border rounded-2xl border-slate-200/70 bg-gradient-to-br from-slate-50 to-slate-100/60 dark:border-slate-800/70 dark:from-slate-900/40 dark:to-slate-950/40 sm:p-6">
                    {isMobile ? (
                      <PhoneFrame size="large">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeImage}
                            src={gallery[activeImage]}
                            alt={`${project.title} screenshot ${activeImage + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25 }}
                            className="object-cover w-full h-full"
                          />
                        </AnimatePresence>
                      </PhoneFrame>
                    ) : (
                      <BrowserFrame url={project.liveUrl}>
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={activeImage}
                            src={gallery[activeImage]}
                            alt={`${project.title} screenshot ${activeImage + 1}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: reduceMotion ? 0 : 0.25 }}
                            className="object-cover object-top w-full h-full"
                          />
                        </AnimatePresence>
                      </BrowserFrame>
                    )}
                  </div>

                  {gallery.length > 1 && (
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImage((i) => Math.max(i - 1, 0))
                        }
                        disabled={activeImage === 0}
                        aria-label="Previous"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[11.5px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700"
                      >
                        <ChevronLeft size={13} /> Prev
                      </button>
                      <span className="text-[11px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                        {activeImage + 1} / {gallery.length}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveImage((i) =>
                            Math.min(i + 1, gallery.length - 1),
                          )
                        }
                        disabled={activeImage === gallery.length - 1}
                        aria-label="Next"
                        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-[11.5px] font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700"
                      >
                        Next <ChevronRight size={13} />
                      </button>
                    </div>
                  )}

                  {gallery.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                      {gallery.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveImage(i)}
                          className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition ${
                            i === activeImage
                              ? "border-indigo-500 shadow-sm shadow-indigo-500/20"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`thumb ${i + 1}`}
                            loading="lazy"
                            className={
                              isMobile
                                ? "h-20 w-12 object-cover"
                                : "h-14 w-24 object-cover object-top"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-900/40">
                  <FolderKanban size={28} />
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {project.complexity && (
                  <InfoPill
                    icon={Zap}
                    label="Complexity"
                    value={project.complexity}
                  />
                )}
                {project.duration && (
                  <InfoPill
                    icon={Clock}
                    label="Duration"
                    value={project.duration}
                  />
                )}
                {typeof project.rating === "number" && project.rating > 0 && (
                  <InfoPill
                    icon={Star}
                    label="Rating"
                    value={project.rating.toFixed(1)}
                  />
                )}
                {project.industry && (
                  <InfoPill
                    icon={Building2}
                    label="Industry"
                    value={project.industry}
                  />
                )}
                {project.teamSize && (
                  <InfoPill
                    icon={Users2}
                    label="Team"
                    value={project.teamSize}
                  />
                )}
                {project.platforms?.length > 0 && (
                  <InfoPill
                    icon={Smartphone}
                    label="Platform"
                    value={project.platforms.join(", ")}
                  />
                )}
              </div>
            </div>

            {/* RIGHT: DETAILS */}
            <div className="space-y-5">
              {(project.description || project.fullDescription) && (
                <section>
                  <SectionTitle>About</SectionTitle>
                  <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.fullDescription || project.description}
                  </p>
                </section>
              )}

              {Array.isArray(project.technologies) &&
                project.technologies.length > 0 && (
                  <section>
                    <SectionTitle>Technologies</SectionTitle>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-2 py-1 text-[11px] font-medium text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </section>
                )}

              {Array.isArray(project.features) &&
                project.features.length > 0 && (
                  <section>
                    <SectionTitle>Key Features</SectionTitle>
                    <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {project.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            <Check size={10} strokeWidth={3} />
                          </span>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

              {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                <section>
                  <SectionTitle>Metrics</SectionTitle>
                  <div className="grid grid-cols-2 gap-2 mt-2 sm:grid-cols-3">
                    {project.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 border rounded-xl border-slate-200/70 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/40"
                      >
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
                          <Trophy size={10} /> {m.label}
                        </div>
                        <div className="mt-1 text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {hasCredentials && (
                <section>
                  <SectionTitle>Demo Access</SectionTitle>
                  <div className="mt-2 space-y-2">
                    {project.demoCredentials.mobile && (
                      <CredentialRow
                        icon={Smartphone}
                        label={project.demoCredentials.type || "Mobile"}
                        value={project.demoCredentials.mobile}
                        onCopy={() =>
                          copy(project.demoCredentials.mobile, "mobile")
                        }
                        copied={copiedKey === "mobile"}
                      />
                    )}
                    {project.demoCredentials.otp && (
                      <CredentialRow
                        icon={CheckCircle2}
                        label="OTP"
                        value={project.demoCredentials.otp}
                        onCopy={() => copy(project.demoCredentials.otp, "otp")}
                        copied={copiedKey === "otp"}
                      />
                    )}
                  </div>
                </section>
              )}

              {project.backendUrl && (
                <section>
                  <SectionTitle>Backend</SectionTitle>
                  <a
                    href={project.backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-3 py-2 text-[12px] text-slate-700 transition hover:border-slate-300 dark:border-slate-800/70 dark:bg-slate-900/40 dark:text-slate-300 dark:hover:border-slate-700"
                  >
                    <span className="flex items-center min-w-0 gap-2">
                      <Globe size={13} className="text-indigo-500 shrink-0" />
                      <span className="truncate">{project.backendUrl}</span>
                    </span>
                    <ExternalLink
                      size={12}
                      className="shrink-0 text-slate-400"
                    />
                  </a>
                </section>
              )}

              {(project.developmentNote || project.deploymentNote) && (
                <section className="space-y-2">
                  {project.developmentNote && (
                    <NoteBox tone="amber" title="Development note">
                      {project.developmentNote}
                    </NoteBox>
                  )}
                  {project.deploymentNote && (
                    <NoteBox tone="sky" title="Deployment note">
                      {project.deploymentNote}
                    </NoteBox>
                  )}
                </section>
              )}
            </div>
          </div>
        </div>

        {/* ============== STICKY FOOTER ============== */}
        {hasFooterActions && (
          <div className="relative z-30 flex flex-wrap items-center gap-2 px-4 py-3 border-t shrink-0 border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90 sm:px-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-slate-900 px-4 text-[12px] font-semibold text-white transition hover:opacity-90 dark:bg-white dark:text-slate-900"
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
            {project.apkUrl && (
              <a
                href={project.apkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-[12px] font-semibold text-white transition hover:bg-emerald-700"
              >
                <Download size={13} /> Download APK
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[12px] font-semibold text-slate-700 transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-slate-700"
              >
                <Github size={13} /> Source Code
              </a>
            )}
            {project.apkStatus && !project.apkUrl && (
              <span className="inline-flex h-9 items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 text-[11px] font-semibold text-amber-700 dark:text-amber-300">
                APK · {project.apkStatus}
              </span>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

/* ---------- small pieces ---------- */
const SectionTitle = ({ children }) => (
  <h4 className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
    {children}
  </h4>
);

const InfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 rounded-xl border border-slate-200/70 bg-slate-50/60 px-2.5 py-2 dark:border-slate-800/70 dark:bg-slate-900/40">
    <span className="flex items-center justify-center text-indigo-600 rounded-lg h-7 w-7 shrink-0 bg-indigo-500/10 dark:text-indigo-300">
      <Icon size={12} />
    </span>
    <div className="min-w-0">
      <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
        {label}
      </div>
      <div className="truncate text-[11.5px] font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
  </div>
);

const CredentialRow = ({ icon: Icon, label, value, onCopy, copied }) => (
  <div className="flex items-center gap-2 px-3 py-2 border rounded-xl border-slate-200/70 bg-slate-50/60 dark:border-slate-800/70 dark:bg-slate-900/40">
    <span className="flex items-center justify-center text-indigo-600 rounded-lg h-7 w-7 shrink-0 bg-indigo-500/10 dark:text-indigo-300">
      <Icon size={13} />
    </span>
    <div className="flex-1 min-w-0">
      <div className="text-[9.5px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-500">
        {label}
      </div>
      <div className="truncate font-mono text-[12px] font-semibold text-slate-800 dark:text-slate-200">
        {value}
      </div>
    </div>
    <button
      type="button"
      onClick={onCopy}
      className="flex items-center justify-center transition rounded-lg h-7 w-7 shrink-0 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      aria-label={`Copy ${label}`}
    >
      {copied ? (
        <CheckCircle2 size={13} className="text-emerald-500" />
      ) : (
        <Copy size={13} />
      )}
    </button>
  </div>
);

const NoteBox = ({ tone = "sky", title, children }) => {
  const tones = {
    sky: "border-sky-500/25 bg-sky-500/5 text-sky-900 dark:text-sky-200",
    amber:
      "border-amber-500/25 bg-amber-500/5 text-amber-900 dark:text-amber-200",
  };
  return (
    <div
      className={`rounded-xl border px-3 py-2.5 ${tones[tone] || tones.sky}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">
        {title}
      </div>
      <p className="mt-1 whitespace-pre-line text-[12px] leading-relaxed opacity-90">
        {children}
      </p>
    </div>
  );
};

export default DashboardOverview;
