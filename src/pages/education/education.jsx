import React, { useState } from "react";
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
    accentColor: "#10B981", // Emerald
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
    subjects: ["Mathematics", "General Science", "Social Science", "English", "Hindi"],
    type: "school",
    image: SchooleImg,
    skillsLearned: ["Analytical Thinking", "Mathematics", "Science Fundamentals"],
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
    accentColor: "#06B6D4", // Cyan
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
    accentColor: "#6366F1", // Indigo
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
    skillsLearned: ["Full Stack Development", "MERN Stack", "System Design", "OOP & DSA"],
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
    accentColor: "#A855F7", // Purple
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
    subjects: ["Cloud Architecture", "Next.js & Micro-Frontends", "AI Integrations", "DevOps"],
    type: "future",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    skillsLearned: ["Cloud DevOps", "Scalable Systems", "AI Product Engineering"],
  },
];

const SKILL_TREE_PROGRESS = [
  { skill: "Data Structures & Algorithms", level: 92, category: "Core CS" },
  { skill: "Full Stack (React, Node, Mongo)", level: 95, category: "Development" },
  { skill: "Problem Solving & Logic", level: 94, category: "Analytical" },
  { skill: "Database Architecture", level: 88, category: "Engineering" },
  { skill: "System Design & APIs", level: 86, category: "Architecture" },
];

const Education = () => {
  const [activeNodeId, setActiveNodeId] = useState("milestone-3");
  const [viewMode, setViewMode] = useState("tree"); // 'tree' or 'cards'

  const activeMilestone =
    TREE_MILESTONES.find((m) => m.id === activeNodeId) || TREE_MILESTONES[2];

  return (
    <section
      id="education"
      className="relative min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-36 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-hidden"
    >
      {/* Background Micro Particle Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Compass className="w-4 h-4 animate-spin-slow" />
            Interactive Tree Growth Pathway
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
            Academic <span className="text-transparent bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 bg-clip-text">Journey</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Growing through learning, one milestone at a time. Explore my academic evolution from foundational schooling to engineering and future horizon goals.
          </p>

          {/* Mode Switcher */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setViewMode("tree")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                viewMode === "tree"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              Interactive Tree View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                viewMode === "cards"
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              Classic Card Grid
            </button>
          </div>
        </motion.div>

        {/* VIEW 1: INTERACTIVE TREE VIEW */}
        {viewMode === "tree" && (
          <div className="relative my-8 lg:my-12">
            {/* Tree Top Crown Indicator */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-xl shadow-purple-500/30 flex items-center justify-center relative"
              >
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-purple-400">
                  <Sparkles className="w-7 h-7 animate-pulse" />
                </div>
                <div className="absolute -top-2 px-2.5 py-0.5 rounded-full bg-purple-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                  Crown / Horizon
                </div>
              </motion.div>
            </div>

            {/* Central Tree Stem Line (Upward Growth Trunk) */}
            <div className="relative">
              {/* Vertical Trunk Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 rounded-full bg-gradient-to-b from-purple-500 via-indigo-500 via-cyan-500 to-emerald-500 shadow-[0_0_12px_rgba(99,102,241,0.5)] z-0" />

              {/* Animated Light Pulse travelling UP the trunk */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-16 rounded-full bg-gradient-to-t from-transparent via-cyan-400 to-white shadow-[0_0_18px_#38bdf8] z-0 pointer-events-none"
                animate={{ top: ["100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              />

              {/* Milestones Tree Nodes Container */}
              <div className="space-y-16 lg:space-y-24 relative z-10 py-6">
                {/* Render Milestones in reverse chronological order (Bottom = 10th, Top = Future) */}
                {[...TREE_MILESTONES].reverse().map((milestone) => {
                  const isSelected = activeNodeId === milestone.id;
                  const IconComponent = milestone.icon;
                  const isLeft = milestone.side === "left";

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative flex items-center justify-center group"
                    >
                      {/* Central Trunk Ring Junction Node */}
                      <button
                        onClick={() => setActiveNodeId(milestone.id)}
                        className={`relative z-20 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 outline-none ${
                          isSelected
                            ? `bg-slate-900 text-white border-2 border-white scale-125 ${milestone.glowShadow}`
                            : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:scale-110"
                        }`}
                      >
                        <IconComponent
                          className={`w-5 h-5 transition-transform duration-300 ${
                            isSelected ? "scale-110" : ""
                          }`}
                          style={{ color: isSelected ? milestone.accentColor : undefined }}
                        />
                        {/* Node Stage Ring Badge */}
                        <div
                          className="absolute -bottom-6 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm whitespace-nowrap"
                          style={{ backgroundColor: milestone.accentColor }}
                        >
                          Stage {milestone.stageNumber}
                        </div>
                      </button>

                      {/* Desktop Branch & Floating Card */}
                      <div className="hidden lg:flex absolute inset-0 items-center justify-between pointer-events-none">
                        {/* Left Card Slot */}
                        <div className={`w-[45%] ${isLeft ? "pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                          {isLeft && (
                            <TreeMilestoneCard
                              milestone={milestone}
                              isSelected={isSelected}
                              onSelect={() => setActiveNodeId(milestone.id)}
                            />
                          )}
                        </div>

                        {/* Curved SVG Branch Connector */}
                        <div className="w-[10%] flex justify-center pointer-events-none">
                          <svg className="w-full h-12 overflow-visible">
                            <motion.path
                              d={
                                isLeft
                                  ? "M 0 24 C 40 24, 60 24, 100 24"
                                  : "M 0 24 C 40 24, 60 24, 100 24"
                              }
                              fill="none"
                              stroke={isSelected ? milestone.accentColor : "#64748b"}
                              strokeWidth={isSelected ? 3 : 1.5}
                              strokeDasharray={isSelected ? "none" : "4 4"}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>

                        {/* Right Card Slot */}
                        <div className={`w-[45%] ${!isLeft ? "pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                          {!isLeft && (
                            <TreeMilestoneCard
                              milestone={milestone}
                              isSelected={isSelected}
                              onSelect={() => setActiveNodeId(milestone.id)}
                            />
                          )}
                        </div>
                      </div>

                      {/* Mobile / Tablet Responsive Tree Card */}
                      <div className="lg:hidden w-full pl-16 sm:pl-20 mt-4 pr-2">
                        <TreeMilestoneCard
                          milestone={milestone}
                          isSelected={isSelected}
                          onSelect={() => setActiveNodeId(milestone.id)}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Tree Base Root Indicator */}
            <div className="flex flex-col items-center mt-12 pt-6">
              <div className="w-16 h-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-sm mb-2" />
              <div className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 border border-slate-300/80 dark:border-slate-700">
                🌱 Root Stage (2019)
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CLASSIC CARD GRID VIEW */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {TREE_MILESTONES.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-3 rounded-2xl text-white shadow-md"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">
                      {item.levelLabel}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.degree}
                    </h3>
                  </div>
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
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
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
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

        {/* BOTTOM SECTION: SKILLS PROFICIENCY & HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 sm:mt-24">
          {/* Skill Proficiency Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500">
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Academic Skill Growth
                </h3>
                <p className="text-xs text-slate-500">Skills cultivated through degree & coursework</p>
              </div>
            </div>

            <div className="space-y-4">
              {SKILL_TREE_PROGRESS.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1.5 text-xs sm:text-sm font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{item.skill}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{item.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
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

          {/* Highlights & Aspirations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Academic Highlights</h3>
                  <p className="text-xs text-slate-400">IES University & School Achievements</p>
                </div>
              </div>

              <ul className="space-y-3.5 mb-6 text-sm text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>B.Tech CSE Graduate (Class of 2026)</strong> — Comprehensive training in Computer Science fundamentals and software engineering.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Full-Stack Mastery</strong> — Practical hands-on development using React.js, Node.js, Express, and MongoDB.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Science & Math Foundation</strong> — PCM stream HSSC with strong problem-solving proficiency.
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Ready for Full-Stack Opportunities</span>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
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

// Sub-Component for Tree Milestone Card
function TreeMilestoneCard({ milestone, isSelected, onSelect }) {
  const IconComponent = milestone.icon;

  return (
    <motion.div
      onClick={onSelect}
      whileHover={{ y: -4 }}
      className={`relative cursor-pointer rounded-3xl p-5 sm:p-6 transition-all duration-300 border backdrop-blur-xl ${
        isSelected
          ? `bg-white/95 dark:bg-slate-900/95 border-2 shadow-2xl ${milestone.bgTint}`
          : "bg-white/80 dark:bg-slate-900/70 border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 shadow-md opacity-90 hover:opacity-100"
      }`}
    >
      {/* Header Stage Badge & Duration */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-xs tracking-wide uppercase"
          style={{ backgroundColor: milestone.accentColor }}
        >
          {milestone.levelLabel}
        </span>
        <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          {milestone.duration}
        </span>
      </div>

      {/* Degree & Institution */}
      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-1">
        {milestone.degree}
      </h3>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
        <Building2 className="w-4 h-4 shrink-0 text-slate-400" />
        {milestone.institution}
      </p>

      {/* Location */}
      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
        <MapPin className="w-3.5 h-3.5 shrink-0" />
        {milestone.location}
      </p>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
        {milestone.description}
      </p>

      {/* Course Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {milestone.subjects.map((sub, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50"
          >
            {sub}
          </span>
        ))}
      </div>

      {/* Selected Card Expanded Content */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-2 overflow-hidden"
          >
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-500" /> Key Milestones & Achievements:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {milestone.achievements.map((ach, i) => (
                <li key={i} className="flex items-start gap-1.5">
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
