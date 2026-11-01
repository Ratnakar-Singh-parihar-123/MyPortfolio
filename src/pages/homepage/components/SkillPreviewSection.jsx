import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  animate,
} from "framer-motion";
import {
  Sparkles,
  Layers,
  Zap,
  Cpu,
  Server,
  Code,
  Monitor,
  Settings,
  Brain,
  FileCode,
  Palette,
  Layout,
  Smartphone,
  Wind,
  Terminal,
  Database,
  Code2,
  GitBranch,
  Github,
  Send,
  Lightbulb,
  Network,
  ArrowRight,
  Binary,
  Workflow,
  Boxes,
  Gauge,
  AppWindow,
  Triangle,
  ChevronRight,
  TrendingUp,
  Activity,
} from "lucide-react";
import { ClockIcon } from "@heroicons/react/24/outline";

/* =========================================================
   ANIMATED STAT COUNTER
========================================================= */
const AnimatedStat = ({ value, format, delay = 0 }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const startedRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          if (reduceMotion) setDisplay(value);
          else
            animate(0, value, {
              duration: 1.4,
              delay,
              ease: [0.22, 1, 0.36, 1],
              onUpdate: (v) => setDisplay(Math.round(v)),
            });
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, delay, reduceMotion]);

  return <span ref={ref}>{format(display)}</span>;
};

/* =========================================================
   ANIMATED PERCENTAGE
========================================================= */
const AnimatedPercentage = ({ value, delay = 0 }) => {
  const [display, setDisplay] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, delay, reduceMotion]);

  return <>{display}</>;
};

/* =========================================================
   TIER HELPERS
========================================================= */
const getTier = (level) => {
  if (level >= 90)
    return {
      label: "Expert",
      cls: "text-emerald-500 bg-emerald-500/10 border-emerald-500/25",
    };
  if (level >= 80)
    return {
      label: "Advanced",
      cls: "text-cyan-500 bg-cyan-500/10 border-cyan-500/25",
    };
  if (level >= 70)
    return {
      label: "Strong",
      cls: "text-blue-500 bg-blue-500/10 border-blue-500/25",
    };
  return {
    label: "Learning",
    cls: "text-amber-500 bg-amber-500/10 border-amber-500/25",
  };
};

/* =========================================================
   MAIN COMPONENT
========================================================= */
const SkillPreviewSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const reduceMotion = useReducedMotion();

  const iconMap = {
    Monitor,
    Server,
    Settings,
    Brain,
    FileCode,
    Palette,
    Code,
    Layout,
    Smartphone,
    Wind,
    Terminal,
    Zap,
    Database,
    Code2,
    GitBranch,
    Github,
    Send,
    Network,
    ArrowRight,
    Binary,
    Workflow,
    Boxes,
    Gauge,
    AppWindow,
    Triangle,
    Lightbulb,
  };

  const skillCategories = [
    {
      title: "Frontend Development",
      shortTitle: "Frontend",
      subtitle: "Crafting pixel-perfect interfaces",
      icon: "Monitor",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-500",
      tint: "59,130,246",
      skills: [
        { name: "HTML", level: 95, icon: "FileCode", color: "text-orange-500" },
        { name: "CSS", level: 93, icon: "Palette", color: "text-blue-400" },
        {
          name: "JavaScript",
          level: 90,
          icon: "Code",
          color: "text-yellow-500",
        },
        { name: "React", level: 88, icon: "Layout", color: "text-cyan-500" },
        {
          name: "React Native",
          level: 88,
          icon: "Smartphone",
          color: "text-cyan-500",
        },
        {
          name: "Tailwind CSS",
          level: 92,
          icon: "Wind",
          color: "text-teal-500",
        },
      ],
    },
    {
      title: "Backend Development",
      shortTitle: "Backend",
      subtitle: "Scalable APIs and server logic",
      icon: "Server",
      gradientFrom: "from-emerald-500",
      gradientTo: "to-teal-500",
      tint: "16,185,129",
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: "Terminal",
          color: "text-emerald-600",
        },
        { name: "Express.js", level: 82, icon: "Zap", color: "text-gray-500" },
        {
          name: "MongoDB",
          level: 80,
          icon: "Database",
          color: "text-emerald-500",
        },
        { name: "MySQL", level: 78, icon: "Database", color: "text-blue-600" },
        { name: "Java", level: 75, icon: "Code2", color: "text-red-500" },
      ],
    },
    {
      title: "System Design",
      shortTitle: "System",
      subtitle: "Architecture that scales",
      icon: "Boxes",
      gradientFrom: "from-violet-500",
      gradientTo: "to-purple-500",
      tint: "139,92,246",
      skills: [
        {
          name: "High-Level Design",
          level: 76,
          icon: "Boxes",
          color: "text-violet-500",
        },
        {
          name: "Low-Level Design",
          level: 73,
          icon: "Binary",
          color: "text-violet-500",
        },
        {
          name: "Load Balancing",
          level: 72,
          icon: "Network",
          color: "text-indigo-500",
        },
        {
          name: "Caching Strategies",
          level: 82,
          icon: "Gauge",
          color: "text-amber-500",
        },
        {
          name: "Database Sharding",
          level: 70,
          icon: "Database",
          color: "text-emerald-500",
        },
        {
          name: "Microservices",
          level: 74,
          icon: "Workflow",
          color: "text-purple-500",
        },
        {
          name: "Message Queues",
          level: 68,
          icon: "Send",
          color: "text-pink-500",
        },
      ],
    },
    {
      title: "Dev Tools & Deployment",
      shortTitle: "Dev Tools",
      subtitle: "Version control to production",
      icon: "Settings",
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-500",
      tint: "249,115,22",
      skills: [
        { name: "Git", level: 92, icon: "GitBranch", color: "text-orange-600" },
        { name: "GitHub", level: 90, icon: "Github", color: "text-purple-600" },
        { name: "Postman", level: 85, icon: "Send", color: "text-orange-500" },
        {
          name: "Vercel",
          level: 80,
          icon: "Triangle",
          color: "text-black dark:text-white",
        },
        { name: "Render", level: 78, icon: "Server", color: "text-blue-600" },
        {
          name: "VS Code",
          level: 95,
          icon: "AppWindow",
          color: "text-blue-500",
        },
        {
          name: "Android Studio",
          level: 85,
          icon: "Boxes",
          color: "text-emerald-500",
        },
      ],
    },
    {
      title: "Core Competencies",
      shortTitle: "Core",
      subtitle: "Thinking beyond the syntax",
      icon: "Brain",
      gradientFrom: "from-pink-500",
      gradientTo: "to-rose-500",
      tint: "236,72,153",
      skills: [
        {
          name: "Problem Solving",
          level: 88,
          icon: "Lightbulb",
          color: "text-yellow-500",
        },
        {
          name: "REST APIs",
          level: 85,
          icon: "Network",
          color: "text-emerald-500",
        },
        {
          name: "API Design",
          level: 82,
          icon: "Code2",
          color: "text-purple-500",
        },
        {
          name: "Responsive Design",
          level: 90,
          icon: "Smartphone",
          color: "text-blue-500",
        },
        {
          name: "Performance Opt.",
          level: 85,
          icon: "Gauge",
          color: "text-orange-500",
        },
        {
          name: "DSA Fundamentals",
          level: 80,
          icon: "Binary",
          color: "text-pink-500",
        },
      ],
    },
  ];

  const overallStats = [
    {
      value: 1,
      format: (n) => `${n}+ Years`,
      label: "Learning & Industry",
      icon: ClockIcon,
      tint: "59,130,246",
    },
    {
      value: 10,
      format: (n) => `${n}+`,
      label: "Projects Completed",
      icon: Layers,
      tint: "16,185,129",
    },
    {
      value: 25,
      format: (n) => `${n}+`,
      label: "Technologies",
      icon: Cpu,
      tint: "139,92,246",
    },
    {
      value: 2,
      format: (n) => `${n}K+`,
      label: "Commits",
      icon: Code,
      tint: "249,115,22",
    },
  ];

  const currentCategory = skillCategories[activeCategory];
  const CurrentIcon = iconMap[currentCategory.icon] || Monitor;
  const avgLevel = (
    currentCategory.skills.reduce((a, s) => a + s.level, 0) /
    currentCategory.skills.length
  ).toFixed(1);

  return (
    <section className="relative overflow-hidden py-14 bg-background sm:py-20 lg:py-24">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full -top-40 -right-40 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] bg-primary/[0.08] blur-[120px] sm:blur-[140px]" />
        <div className="absolute rounded-full -bottom-40 -left-40 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] bg-purple-500/[0.08] blur-[120px] sm:blur-[140px]" />
      </div>

      <div className="relative z-10 px-5 mx-auto max-w-7xl sm:px-8 lg:px-12">
        {/* ============ HEADER ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-8 text-center sm:mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase border rounded-full bg-primary/[0.06] border-primary/20 text-primary backdrop-blur-sm sm:mb-6">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full bg-primary/60 animate-ping" />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
            Technical Expertise
          </div>

          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl sm:mb-5 text-foreground">
            Skills &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text">
                Proficiencies
              </span>
              <motion.span
                className="absolute left-0 right-0 h-1.5 bottom-0.5 sm:h-2 sm:bottom-1 bg-gradient-to-r from-primary/40 via-violet-500/40 to-fuchsia-500/40 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            </span>
          </h2>

          <p className="px-2 text-sm leading-relaxed sm:text-base md:text-lg text-muted-foreground">
            Full-lifecycle skill set — from pixel-perfect interfaces to
            distributed system architecture and everything in between.
          </p>
        </motion.div>

        {/* ============ STATS ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-2 mb-6 sm:gap-3 sm:mb-10 lg:grid-cols-4 lg:gap-4"
        >
          {overallStats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden border group rounded-xl sm:rounded-2xl border-border/60 bg-gradient-to-b from-card to-card/70 backdrop-blur-sm"
            >
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(300px circle at 50% 0%, rgba(${stat.tint}, 0.10), transparent 70%)`,
                }}
              />
              <div className="relative flex items-center gap-2 p-3 sm:gap-3 sm:p-4 lg:p-5">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 sm:w-10 sm:h-10 sm:rounded-xl"
                  style={{
                    background: `rgba(${stat.tint}, 0.10)`,
                    color: `rgb(${stat.tint})`,
                  }}
                >
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold tracking-tight sm:text-lg lg:text-xl text-foreground">
                    <AnimatedStat
                      value={stat.value}
                      format={stat.format}
                      delay={i * 0.1}
                    />
                  </div>
                  <div className="text-[9.5px] truncate text-muted-foreground sm:text-[11px] lg:text-xs">
                    {stat.label}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ============ CONSOLE ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="lg:grid lg:grid-cols-[300px_1fr] lg:gap-6"
        >
          {/* -------- MOBILE: Horizontal Scroll Pills (gap fixed) -------- */}
          <div className="relative mb-3 lg:hidden">
            <div className="flex gap-2 pb-1 overflow-x-auto snap-x snap-mandatory px-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {skillCategories.map((cat, index) => {
                const CatIcon = iconMap[cat.icon] || Monitor;
                const isActive = index === activeCategory;
                const catAvg = (
                  cat.skills.reduce((a, s) => a + s.level, 0) /
                  cat.skills.length
                ).toFixed(0);

                return (
                  <motion.button
                    key={cat.title}
                    onClick={() => setActiveCategory(index)}
                    whileTap={reduceMotion ? undefined : { scale: 0.96 }}
                    className={`
                      snap-start shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-xl border
                      transition-all duration-300
                      ${
                        isActive
                          ? "border-border bg-card shadow-sm"
                          : "border-border/50 bg-card/40"
                      }
                    `}
                    style={
                      isActive
                        ? { borderColor: `rgba(${cat.tint}, 0.4)` }
                        : undefined
                    }
                  >
                    <div
                      className="flex items-center justify-center rounded-lg w-7 h-7 shrink-0"
                      style={{
                        background: `rgba(${cat.tint}, ${isActive ? 0.18 : 0.08})`,
                        color: `rgb(${cat.tint})`,
                      }}
                    >
                      <CatIcon size={15} strokeWidth={2.2} />
                    </div>
                    <div className="text-left whitespace-nowrap">
                      <div
                        className={`text-[11.5px] font-semibold leading-tight ${
                          isActive ? "text-foreground" : "text-foreground/70"
                        }`}
                      >
                        {cat.shortTitle}
                      </div>
                      <div
                        className="text-[9.5px] leading-tight font-medium"
                        style={{ color: `rgb(${cat.tint})` }}
                      >
                        {catAvg}%
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
            <div className="absolute top-0 right-0 w-8 pointer-events-none bottom-1 bg-gradient-to-l from-background to-transparent" />
          </div>

          {/* -------- DESKTOP: Full Sidebar (gap fixed) -------- */}
          <div className="hidden lg:flex lg:flex-col lg:gap-2.5">
            {skillCategories.map((cat, index) => {
              const CatIcon = iconMap[cat.icon] || Monitor;
              const isActive = index === activeCategory;
              const catAvg = (
                cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length
              ).toFixed(0);

              return (
                <motion.button
                  key={cat.title}
                  onClick={() => setActiveCategory(index)}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                  className={`
                    group relative overflow-hidden rounded-xl border px-4 py-3.5 text-left
                    transition-all duration-300
                    ${
                      isActive
                        ? "border-border bg-card shadow-lg"
                        : "border-border/50 bg-card/40 hover:border-border hover:bg-card/70"
                    }
                  `}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-400"
                    style={{
                      background: `linear-gradient(135deg, rgba(${cat.tint}, 0.10), rgba(${cat.tint}, 0.02) 60%, transparent)`,
                      opacity: isActive ? 1 : 0,
                    }}
                  />
                  <motion.div
                    className="absolute top-3 bottom-3 left-1.5 w-[3px] rounded-full"
                    style={{ background: `rgb(${cat.tint})` }}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scaleY: isActive ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />

                  <div className="relative flex items-start gap-3">
                    <div
                      className={`flex items-center justify-center rounded-lg shrink-0 transition-all duration-300 ${
                        isActive ? "w-10 h-10" : "w-9 h-9"
                      }`}
                      style={{
                        background: isActive
                          ? `rgba(${cat.tint}, 0.15)`
                          : `rgba(${cat.tint}, 0.06)`,
                        color: `rgb(${cat.tint})`,
                      }}
                    >
                      <CatIcon size={isActive ? 20 : 18} strokeWidth={2} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`text-sm font-semibold truncate transition-colors ${
                            isActive ? "text-foreground" : "text-foreground/80"
                          }`}
                        >
                          {cat.title}
                        </div>
                        <ChevronRight
                          size={14}
                          className={`shrink-0 transition-all duration-300 ${
                            isActive
                              ? "translate-x-0 opacity-100"
                              : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                          }`}
                          style={{
                            color: isActive ? `rgb(${cat.tint})` : undefined,
                          }}
                        />
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10.5px] text-muted-foreground">
                          {cat.skills.length} skills
                        </span>
                        <span className="text-[9px] text-muted-foreground/40">
                          ·
                        </span>
                        <span
                          className="text-[10.5px] font-semibold"
                          style={{ color: `rgb(${cat.tint})` }}
                        >
                          {catAvg}%
                        </span>
                      </div>

                      <div className="flex items-end gap-[2px] h-4 mt-2">
                        {cat.skills.map((s, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 rounded-[1px] transition-opacity duration-300"
                            initial={false}
                            animate={{ opacity: isActive ? 0.9 : 0.35 }}
                            style={{
                              height: `${s.level}%`,
                              minHeight: 2,
                              background: `rgb(${cat.tint})`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* -------- PANEL -------- */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border/60 bg-gradient-to-br from-card via-card/95 to-card/85 shadow-xl lg:min-h-[540px]">
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: `radial-gradient(700px circle at 80% 20%, rgba(${currentCategory.tint}, 0.10), transparent 60%)`,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* HUD corner brackets */}
            <span
              className="absolute top-2.5 left-2.5 w-3.5 h-3.5 rounded-tl-sm border-t-2 border-l-2 pointer-events-none sm:top-3 sm:left-3 sm:w-4 sm:h-4"
              style={{ borderColor: `rgba(${currentCategory.tint}, 0.35)` }}
            />
            <span
              className="absolute top-2.5 right-2.5 w-3.5 h-3.5 rounded-tr-sm border-t-2 border-r-2 pointer-events-none sm:top-3 sm:right-3 sm:w-4 sm:h-4"
              style={{ borderColor: `rgba(${currentCategory.tint}, 0.35)` }}
            />
            <span
              className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 rounded-bl-sm border-b-2 border-l-2 pointer-events-none sm:bottom-3 sm:left-3 sm:w-4 sm:h-4"
              style={{ borderColor: `rgba(${currentCategory.tint}, 0.35)` }}
            />
            <span
              className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 rounded-br-sm border-b-2 border-r-2 pointer-events-none sm:bottom-3 sm:right-3 sm:w-4 sm:h-4"
              style={{ borderColor: `rgba(${currentCategory.tint}, 0.35)` }}
            />

            {/* Scan-line sweep */}
            {!reduceMotion && (
              <motion.div
                key={`scan-${activeCategory}`}
                className="absolute inset-0 overflow-hidden pointer-events-none"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute top-0 bottom-0 w-32 blur-2xl"
                  initial={{ x: "-30%" }}
                  animate={{ x: "130%" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  style={{
                    background: `linear-gradient(90deg, transparent, rgba(${currentCategory.tint}, 0.18), transparent)`,
                  }}
                />
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: reduceMotion ? 0.15 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex flex-col h-full p-4 sm:p-5 lg:p-7"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-border/60 sm:pb-5 sm:mb-5">
                  <div className="flex items-center gap-2.5 min-w-0 sm:gap-4">
                    <div
                      className="relative flex items-center justify-center w-11 h-11 rounded-xl shrink-0 sm:w-14 sm:h-14 sm:rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, rgba(${currentCategory.tint}, 0.18), rgba(${currentCategory.tint}, 0.04))`,
                        border: `1px solid rgba(${currentCategory.tint}, 0.28)`,
                        color: `rgb(${currentCategory.tint})`,
                      }}
                    >
                      <CurrentIcon
                        size={20}
                        strokeWidth={2}
                        className="sm:hidden"
                      />
                      <CurrentIcon
                        size={26}
                        strokeWidth={2}
                        className="hidden sm:block"
                      />
                      <motion.div
                        className="absolute w-2.5 h-2.5 rounded-full -top-1 -right-1 bg-emerald-500 ring-[2.5px] ring-card sm:w-3 sm:h-3 sm:ring-[3px]"
                        animate={
                          reduceMotion ? undefined : { scale: [1, 1.25, 1] }
                        }
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base font-bold tracking-tight truncate sm:text-lg lg:text-xl text-foreground">
                        {currentCategory.title}
                      </h3>
                      <p className="mt-0.5 text-[11px] leading-tight text-muted-foreground sm:text-xs lg:text-[13px]">
                        {currentCategory.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex-col items-end hidden sm:flex shrink-0">
                    <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <TrendingUp className="w-3 h-3" />
                      Avg
                    </div>
                    <div
                      className="mt-0.5 text-xl font-bold"
                      style={{ color: `rgb(${currentCategory.tint})` }}
                    >
                      {avgLevel}
                      <span className="text-sm opacity-60">%</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                  {currentCategory.skills.map((skill, skillIndex) => {
                    const SkillIcon = iconMap[skill.icon] || Code;
                    const tier = getTier(skill.level);
                    const isSkillHovered = hoveredSkill === skillIndex;

                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.32,
                          delay: reduceMotion ? 0 : 0.06 + skillIndex * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onMouseEnter={() => setHoveredSkill(skillIndex)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`
                          group/skill relative p-2.5 rounded-lg border transition-all duration-300 sm:p-3 sm:rounded-xl
                          ${
                            isSkillHovered
                              ? "border-border bg-card shadow-sm"
                              : "border-border/40 bg-card/30"
                          }
                        `}
                      >
                        <div className="flex items-center justify-between gap-1.5 mb-2 sm:gap-2 sm:mb-2.5">
                          <div className="flex items-center gap-1.5 min-w-0 sm:gap-2">
                            <SkillIcon
                              size={14}
                              className={`${skill.color} shrink-0 transition-transform duration-300 sm:hidden ${
                                isSkillHovered ? "scale-110" : ""
                              }`}
                              strokeWidth={2.2}
                            />
                            <SkillIcon
                              size={15}
                              className={`${skill.color} shrink-0 transition-transform duration-300 hidden sm:block ${
                                isSkillHovered ? "scale-110" : ""
                              }`}
                              strokeWidth={2.2}
                            />
                            <span className="text-[12px] font-medium truncate text-foreground sm:text-[12.5px]">
                              {skill.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0 sm:gap-1.5">
                            <span
                              className={`text-[7.5px] font-bold uppercase tracking-wider px-1 py-0.5 rounded border whitespace-nowrap sm:text-[8.5px] sm:px-1.5 ${tier.cls}`}
                            >
                              {tier.label}
                            </span>
                            <span
                              className="text-[11px] font-bold tabular-nums sm:text-xs"
                              style={{ color: `rgb(${currentCategory.tint})` }}
                            >
                              <AnimatedPercentage
                                value={skill.level}
                                delay={0.15 + skillIndex * 0.05}
                              />
                              <span className="opacity-60">%</span>
                            </span>
                          </div>
                        </div>

                        {/* Glow-needle bar */}
                        <div className="relative h-1 rounded-full bg-muted/40 sm:h-1.5">
                          <motion.div
                            className="absolute inset-y-0 left-0 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{
                              duration: 0.85,
                              delay: reduceMotion
                                ? 0
                                : 0.08 + skillIndex * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                              background: `linear-gradient(90deg, rgba(${currentCategory.tint}, 0.5), rgb(${currentCategory.tint}))`,
                            }}
                          />
                          <motion.div
                            className="absolute top-1/2 w-1.5 h-1.5 rounded-full -translate-y-1/2 pointer-events-none sm:w-2 sm:h-2"
                            initial={{ left: 0, opacity: 0 }}
                            animate={{
                              left: `calc(${skill.level}% - 4px)`,
                              opacity: 1,
                            }}
                            transition={{
                              duration: 0.85,
                              delay: reduceMotion
                                ? 0
                                : 0.08 + skillIndex * 0.05,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                              background: `rgb(${currentCategory.tint})`,
                              boxShadow: `0 0 6px rgba(${currentCategory.tint}, 0.85)`,
                            }}
                          />
                        </div>

                        {isSkillHovered && !reduceMotion && (
                          <motion.div
                            className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none sm:rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            <motion.div
                              className="absolute inset-0"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{
                                duration: 1.4,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                              style={{
                                background:
                                  "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)",
                              }}
                            />
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/40 sm:pt-5">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground sm:gap-2 sm:text-[11px]">
                    <Activity
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      style={{ color: `rgb(${currentCategory.tint})` }}
                    />
                    <span className="truncate">
                      {currentCategory.skills.length} technologies · avg{" "}
                      <span
                        className="font-semibold"
                        style={{ color: `rgb(${currentCategory.tint})` }}
                      >
                        {avgLevel}%
                      </span>
                    </span>
                  </div>
                  <motion.a
                    href="/skills"
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    className="inline-flex items-center gap-0.5 text-[11px] font-semibold shrink-0 text-primary hover:text-primary/80 sm:gap-1 sm:text-xs"
                  >
                    Explore
                    <ArrowRight size={11} className="sm:w-3 sm:h-3" />
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ============ BOTTOM CTA ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-10 lg:mt-12"
        >
          <div className="relative flex flex-col items-stretch gap-3 p-4 overflow-hidden border rounded-xl sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:rounded-2xl border-border/60 bg-gradient-to-r from-card via-card/95 to-card/85">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08),transparent_60%)]" />
            <div className="relative flex items-center gap-2.5 sm:gap-3">
              <div className="flex items-center justify-center rounded-lg w-9 h-9 bg-primary/10 text-primary shrink-0 sm:w-10 sm:h-10 sm:rounded-xl">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-foreground sm:text-sm">
                  Always learning, always shipping
                </div>
                <div className="text-[10.5px] text-muted-foreground sm:text-xs">
                  25+ technologies · 10+ projects · 1+ years of growth
                </div>
              </div>
            </div>
            <motion.a
              href="/contact"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              className="group relative inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[13px] font-semibold text-white transition-all bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 sm:px-5 sm:text-sm sm:rounded-xl w-full sm:w-auto"
            >
              Let&apos;s Work Together
              <ArrowRight
                size={13}
                className="transition-transform group-hover:translate-x-0.5 sm:w-3.5 sm:h-3.5"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillPreviewSection;
