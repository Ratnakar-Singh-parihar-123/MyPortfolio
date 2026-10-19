import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowUpRight,
  School,
  Building2,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SchooleImg from "../../assets/schoolImg/schoolImg.webp";

/* =========================================================
   TREE MILESTONES DATA
========================================================= */

const TREE_MILESTONES = [
  {
    id: "milestone-1",
    stageNumber: 1,
    levelLabel: "Foundational Education",
    degree: "10th Standard (HSC)",
    institution: "Saraswati Higher Secondary School",
    location: "Nagod, Satna, Madhya Pradesh",
    duration: "2019 - 2020",
    status: "Completed (Distinction)",
    accentColor: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    bgTint: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    glowShadow: "shadow-[0_0_25px_rgba(16,185,129,0.35)]",
    icon: School,
    side: "left",
    description:
      "Completed secondary education with strong analytical foundations in science, mathematics, and logical reasoning.",
    achievements: [
      "Secondary school completion with academic excellence",
      "Strong foundation in core Mathematics & General Science",
      "Active participation in school science competitions",
    ],
    subjects: [
      "Mathematics",
      "General Science",
      "Social Science",
      "English",
      "Hindi",
    ],
    type: "school",
    image: SchooleImg,
    skillsLearned: [
      "Analytical Thinking",
      "Mathematics",
      "Science Fundamentals",
    ],
  },
  {
    id: "milestone-2",
    stageNumber: 2,
    levelLabel: "Higher Secondary (HSSC)",
    degree: "12th Standard - PCM Stream",
    institution: "Saraswati Higher Secondary School",
    location: "Nagod, Satna, Madhya Pradesh",
    duration: "2021 - 2022",
    status: "Completed (PCM Science)",
    accentColor: "#06B6D4",
    gradient: "from-cyan-500 to-blue-600",
    bgTint: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30",
    glowShadow: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
    icon: Award,
    side: "right",
    description:
      "Specialized in Physics, Chemistry, and Mathematics (PCM), developing advanced problem-solving techniques and scientific analysis skills.",
    achievements: [
      "Completed HSSC in Science Stream (PCM)",
      "High proficiency in Calculus and Applied Physics",
      "Selected for regional science project presentation",
    ],
    subjects: ["Physics", "Chemistry", "Mathematics", "English"],
    type: "school",
    image: SchooleImg,
    skillsLearned: ["Calculus & Logic", "Problem Solving", "Physics Concepts"],
  },
  {
    id: "milestone-3",
    stageNumber: 3,
    levelLabel: "Undergraduate Degree",
    degree: "B.Tech in Computer Science & Engineering",
    institution: "IES University Bhopal",
    location: "Bhopal, Madhya Pradesh",
    duration: "2022 - 2026",
    status: "Graduate Class of 2026",
    accentColor: "#6366F1",
    gradient: "from-indigo-500 via-blue-600 to-purple-600",
    bgTint: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30",
    glowShadow: "shadow-[0_0_30px_rgba(99,102,241,0.4)]",
    icon: GraduationCap,
    side: "left",
    description:
      "Bachelor of Technology in Computer Science & Engineering with intensive focus on software engineering, data structures, algorithms, and full-stack MERN development.",
    achievements: [
      "Engineered multiple production-grade MERN web applications",
      "Proficient in Data Structures, Algorithms & Database Systems",
      "Active participant in technical hackathons and coding events",
    ],
    subjects: [
      "Data Structures & Algorithms",
      "Database Management (DBMS)",
      "Web Technologies",
      "Operating Systems",
      "Software Engineering",
    ],
    type: "college",
    image:
      "https://content.jdmagicbox.com/comp/bhopal/65/0755p755std2700465/catalogue/ies-university-bhopal-kalkheda-bhopal-institutes-9h4364j1aw.jpg?w=1920&q=75",
    skillsLearned: [
      "Full Stack Development",
      "MERN Stack",
      "System Design",
      "OOP & DSA",
    ],
  },
  {
    id: "milestone-4",
    stageNumber: 4,
    levelLabel: "Future Horizon & Mastery",
    degree: "Full Stack Engineering & Tech Innovation",
    institution: "Continuous Industry Innovation",
    location: "Global Software Systems",
    duration: "2026 & Beyond",
    status: "Active Career Expansion",
    accentColor: "#A855F7",
    gradient: "from-purple-500 to-pink-600",
    bgTint: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
    glowShadow: "shadow-[0_0_35px_rgba(168,85,247,0.45)]",
    icon: Sparkles,
    side: "right",
    description:
      "Expanding software architecture mastery into scalable cloud systems, advanced frontend micro-interactions, AI-driven applications, and high-performance Web APIs.",
    achievements: [
      "Architecting enterprise-grade full-stack products",
      "Mastering modern cloud deployment & performance optimization",
      "Contributing to open-source and cutting-edge web ecosystems",
    ],
    subjects: [
      "Cloud Architecture",
      "Next.js & Micro-Frontends",
      "AI Integrations",
      "DevOps",
    ],
    type: "future",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    skillsLearned: [
      "Cloud DevOps",
      "Scalable Systems",
      "AI Product Engineering",
    ],
  },
];

/* =========================================================
   SKILL TREE PROGRESS
========================================================= */

const SKILL_TREE_PROGRESS = [
  { skill: "Data Structures & Algorithms", level: 92, category: "Core CS" },
  {
    skill: "Full Stack (React, Node, Mongo)",
    level: 95,
    category: "Development",
  },
  { skill: "Problem Solving & Logic", level: 94, category: "Analytical" },
  { skill: "Database Architecture", level: 88, category: "Engineering" },
  { skill: "System Design & APIs", level: 86, category: "Architecture" },
];

/* =========================================================
   EDUCATION COMPONENT
========================================================= */

const Education = () => {
  const [activeNodeId, setActiveNodeId] = useState("milestone-3");

  /* Smart default: mobile → cards, desktop → tree */
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window === "undefined") return "tree";
    return window.innerWidth < 768 ? "cards" : "tree";
  });

  const [userToggled, setUserToggled] = useState(false);

  useEffect(() => {
    if (userToggled) return;
    if (typeof window === "undefined") return;

    const onResize = () => {
      setViewMode(window.innerWidth < 768 ? "cards" : "tree");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [userToggled]);

  const handleSetView = (mode) => {
    setUserToggled(true);
    setViewMode(mode);
  };

  return (
    <section
      id="education"
      className="relative min-h-screen px-4 pt-20 overflow-hidden transition-colors pb-36 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Compass className="w-4 h-4 animate-spin-slow" />
            Interactive Tree Growth Pathway
          </div>

          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
            Academic{" "}
            <span className="text-transparent bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 bg-clip-text">
              Journey
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base leading-relaxed sm:text-lg text-slate-600 dark:text-slate-400">
            Growing through learning, one milestone at a time. Explore my
            academic evolution from foundational schooling to engineering and
            future horizon goals.
          </p>

          {/* MODE SWITCHER */}
          <div className="inline-flex max-w-full p-1 mt-8 border shadow-inner rounded-2xl bg-slate-200/80 dark:bg-slate-900 border-slate-300/80 dark:border-slate-800">
            <button
              onClick={() => handleSetView("tree")}
              className={`
                flex items-center justify-center gap-2
                px-3 py-2 sm:px-4
                rounded-xl
                text-[11px] sm:text-sm
                font-semibold
                whitespace-nowrap
                transition-all duration-200
                ${
                  viewMode === "tree"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <Layers className="w-4 h-4" />
              <span>Tree View</span>
            </button>

            <button
              onClick={() => handleSetView("cards")}
              className={`
                flex items-center justify-center gap-2
                px-3 py-2 sm:px-4
                rounded-xl
                text-[11px] sm:text-sm
                font-semibold
                whitespace-nowrap
                transition-all duration-200
                ${
                  viewMode === "cards"
                    ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <Cpu className="w-4 h-4" />
              <span>Card Grid</span>
            </button>
          </div>
        </motion.div>

        {/* ===================================================
            TREE VIEW — Clean vertical timeline
        =================================================== */}
        {viewMode === "tree" && (
          <div className="relative max-w-3xl mx-auto my-8 lg:my-12">
            {/* TOP CROWN — Future Horizon */}
            <div className="flex flex-col items-center mb-8 sm:mb-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative flex items-center justify-center shadow-xl w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 shadow-purple-500/30"
              >
                <GraduationCap className="w-5 h-5 text-white sm:w-6 sm:h-6" />
              </motion.div>
              <div className="mt-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 text-[9px] sm:text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Crown / Horizon
              </div>
            </div>

            {/* RAIL + MILESTONES */}
            <div className="relative">
              {/* Vertical gradient rail */}
              <div
                className="absolute left-6 sm:left-8 top-0 bottom-0 w-[2px] rounded-full bg-gradient-to-b from-purple-500 via-indigo-500 via-cyan-500 to-emerald-500 opacity-60"
                aria-hidden
              />

              {/* Animated upward pulse */}
              <motion.div
                aria-hidden
                className="absolute left-6 sm:left-8 -translate-x-1/2 w-1 h-16 rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-white blur-[1px] pointer-events-none"
                animate={{ top: ["100%", "0%"], opacity: [0, 0.9, 0.9, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  times: [0, 0.1, 0.9, 1],
                }}
              />

              {/* Milestones (reverse = newest at top, oldest at bottom) */}
              <div className="space-y-6 sm:space-y-9">
                {[...TREE_MILESTONES].reverse().map((milestone, idx) => {
                  const isSelected = activeNodeId === milestone.id;
                  const IconComponent = milestone.icon;

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.05,
                        ease: "easeOut",
                      }}
                      className="relative pl-16 sm:pl-24"
                    >
                      {/* NODE */}
                      <button
                        onClick={() => setActiveNodeId(milestone.id)}
                        className={`
                          absolute left-0 top-2
                          flex items-center justify-center
                          w-12 h-12 sm:w-16 sm:h-16
                          rounded-2xl
                          bg-white dark:bg-slate-900
                          border-2
                          overflow-hidden
                          transition-all duration-300
                          outline-none
                          ${
                            isSelected
                              ? `scale-105 ${milestone.glowShadow}`
                              : "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 hover:-translate-y-0.5"
                          }
                        `}
                        style={{
                          borderColor: isSelected
                            ? milestone.accentColor
                            : undefined,
                        }}
                        aria-label={`Select ${milestone.institution}`}
                      >
                        {/* Institution image */}
                        {milestone.image ? (
                          <img
                            src={milestone.image}
                            alt={milestone.institution}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <IconComponent
                            className="w-5 h-5 sm:w-7 sm:h-7"
                            style={{ color: milestone.accentColor }}
                          />
                        )}

                        {/* Stage badge */}
                        <span
                          className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 min-w-[18px] h-[18px] sm:min-w-[22px] sm:h-[22px] px-1 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shadow-md border-2 border-white dark:border-slate-900 z-10"
                          style={{
                            backgroundColor: milestone.accentColor,
                          }}
                        >
                          {milestone.stageNumber}
                        </span>
                      </button>

                      {/* CARD */}
                      <TreeMilestoneCard
                        milestone={milestone}
                        isSelected={isSelected}
                        onSelect={() => setActiveNodeId(milestone.id)}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* BASE — Root Stage */}
            <div className="flex flex-col items-center pt-8 sm:pt-10">
              <div className="h-2 mb-2 rounded-full w-14 sm:w-16 sm:h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-sm" />
              <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700">
                🌱 Root Stage • 2019
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            CARD VIEW
        =================================================== */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 gap-6 my-8 sm:gap-8 md:grid-cols-2">
            {TREE_MILESTONES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                className="p-6 transition-all bg-white border shadow-xl dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-3xl hover:border-indigo-500/50 hover:-translate-y-1 group"
              >
                <div className="flex items-start gap-3 mb-4">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.institution}
                      className="object-cover border shadow-sm w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-slate-200 dark:border-slate-700 shrink-0"
                    />
                  ) : (
                    <div
                      className="p-3 text-white shadow-md rounded-2xl shrink-0"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-500">
                      {item.levelLabel}
                    </span>
                    <h3 className="text-lg font-bold leading-snug sm:text-xl text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                  </div>
                </div>

                <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {item.institution}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" /> {item.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {item.subjects.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ===================================================
            BOTTOM SECTION — SKILLS + HIGHLIGHTS
        =================================================== */}
        <div className="grid grid-cols-1 gap-8 mt-16 sm:mt-24 md:grid-cols-2">
          {/* SKILL PROFICIENCY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 bg-white border shadow-xl dark:bg-slate-900 border-slate-200 dark:border-slate-800 sm:p-8 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold sm:text-2xl text-slate-900 dark:text-white">
                  Academic Skill Growth
                </h3>
                <p className="text-xs text-slate-500">
                  Skills cultivated through degree & coursework
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {SKILL_TREE_PROGRESS.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1.5 text-xs sm:text-sm font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">
                      {item.skill}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {item.level}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* HIGHLIGHTS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between p-6 text-white border shadow-2xl sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl border-slate-800"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">
                    Academic Highlights
                  </h3>
                  <p className="text-xs text-slate-400">
                    IES University & School Achievements
                  </p>
                </div>
              </div>

              <ul className="mb-6 space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>B.Tech CSE Graduate (Class of 2026)</strong> —
                    Comprehensive training in Computer Science fundamentals and
                    software engineering.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Full-Stack Mastery</strong> — Practical hands-on
                    development using React.js, Node.js, Express, and MongoDB.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Science & Math Foundation</strong> — PCM stream HSSC
                    with strong problem-solving proficiency.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-medium text-slate-400">
                Ready for Full-Stack Opportunities
              </span>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Let's Connect <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   TREE MILESTONE CARD (same card design — user liked it)
========================================================= */

function TreeMilestoneCard({ milestone, isSelected, onSelect }) {
  const IconComponent = milestone.icon;

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -4 }}
      className={`
        relative
        cursor-pointer
        rounded-3xl
        p-4 sm:p-5 lg:p-6
        transition-all duration-300
        border
        backdrop-blur-xl
        ${
          isSelected
            ? `bg-white/95 dark:bg-slate-900/95 border-2 shadow-2xl ${milestone.bgTint}`
            : "bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-md opacity-95"
        }
      `}
    >
      {/* HEADER BADGES */}
      <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between">
        <span
          className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-white shadow-sm tracking-wide uppercase w-fit"
          style={{ backgroundColor: milestone.accentColor }}
        >
          {milestone.levelLabel}
        </span>

        <span className="flex items-center gap-1 w-fit text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          {milestone.duration}
        </span>
      </div>

      {/* DEGREE + INSTITUTION */}
      <h3 className="mb-1 text-base font-bold leading-snug sm:text-lg lg:text-xl text-slate-900 dark:text-white">
        {milestone.degree}
      </h3>
      <p className="flex items-center gap-1.5 mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
        <Building2 className="w-4 h-4 shrink-0 text-slate-400" />
        {milestone.institution}
      </p>

      {/* LOCATION */}
      <p className="flex items-center gap-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        {milestone.location}
      </p>

      {/* DESCRIPTION */}
      <p
        className={`
          mb-4
          text-xs sm:text-sm
          leading-relaxed
          text-slate-600
          dark:text-slate-400
          ${isSelected ? "" : "line-clamp-3"}
        `}
      >
        {milestone.description}
      </p>

      {/* SUBJECTS */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {milestone.subjects.map((sub, i) => (
          <span
            key={i}
            className="px-2 py-1 sm:px-2.5 text-[10px] sm:text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50"
          >
            {sub}
          </span>
        ))}
      </div>

      {/* EXPANDED ACHIEVEMENTS */}
      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4 space-y-2 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80"
          >
            <h4 className="flex items-center gap-1 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-white">
              <Trophy className="w-3.5 h-3.5 text-yellow-500" />
              Key Milestones & Achievements
            </h4>
            <ul className="space-y-1.5">
              {milestone.achievements.map((ach, i) => (
                <li
                  key={i}
                  className="flex items-start gap-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-600 dark:text-slate-400"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Education;
