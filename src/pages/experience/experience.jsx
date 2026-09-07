import React, { useState } from "react";
import {
  Briefcase,
  Calendar,
  Pin,
  Building2,
  Server,
  Code2,
  ChevronRight,
  Sparkles,
  Award,
  CheckCircle,
  Cpu,
  Layers,
  ArrowUpRight,
  Rocket,
  Zap,
  Globe,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Binarylogix from "../../assets/companylogo/binarylogix.jpeg";
import SkyInfoGroup from "../../assets/companylogo/sky info group.png";
import Freelancers from "../../assets/companylogo/freelancer.jpg";

const CAREER_TREE_MILESTONES = [
  {
    id: "career-1",
    stageNumber: 1,
    levelLabel: "Client Products & Freelancing",
    role: "Freelance Full Stack Developer",
    company: "Self-Employed / Independent",
    location: "Remote / Client Projects",
    duration: "2024 – Present",
    status: "Active Projects",
    current: false,
    accentColor: "#10B981", // Emerald
    gradient: "from-emerald-500 to-teal-600",
    bgTint: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    glowShadow: "shadow-[0_0_25px_rgba(16,185,129,0.35)]",
    icon: Globe,
    logo: Freelancers,
    side: "left",
    description:
      "Architecting and delivering custom full-stack web applications for clients, handling end-to-end development from requirements to production deployment.",
    responsibilities: [
      "Client requirement analysis & architecture planning",
      "Custom full-stack web application development with MERN",
      "Responsive UI/UX design and mobile-friendly optimization",
      "Vercel & GitHub automated deployment pipelines",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Vercel", "Git"],
    type: "Freelance",
  },
  {
    id: "career-2",
    stageNumber: 2,
    levelLabel: "Industry Internship",
    role: "MERN Stack Developer Intern",
    company: "Sky Info Group",
    location: "Bhopal, MP",
    duration: "Nov 2025 – Jan 2026",
    status: "Completed Internship",
    current: false,
    accentColor: "#06B6D4", // Cyan
    gradient: "from-cyan-500 to-blue-600",
    bgTint: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30",
    glowShadow: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
    icon: Server,
    logo: SkyInfoGroup,
    side: "right",
    description:
      "3-month intensive engineering internship focused on production MERN stack applications, API development, and cross-functional team collaboration.",
    responsibilities: [
      "Developed responsive frontend modules using React.js",
      "Implemented RESTful API endpoints & database integration",
      "Created reusable component design system primitives",
      "Collaborated via Git & GitHub sprint workflows",
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git", "Tailwind CSS"],
    type: "Internship",
  },
  {
    id: "career-3",
    stageNumber: 3,
    levelLabel: "Full-Time Engineering Role",
    role: "Full Stack Developer",
    company: "BinaryLogix Technologies LLP",
    location: "Bhopal, MP",
    duration: "Jun 2026 – Present",
    status: "Active Full-time Role",
    current: true,
    accentColor: "#6366F1", // Indigo
    gradient: "from-indigo-500 via-purple-600 to-pink-600",
    bgTint: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30",
    glowShadow: "shadow-[0_0_30px_rgba(99,102,241,0.4)]",
    icon: Building2,
    logo: Binarylogix,
    side: "left",
    description:
      "Engineering scalable web and cross-platform mobile applications using MERN stack and React Native. Leading feature development, API integration, and system optimization.",
    responsibilities: [
      "Full Stack Web Development with React.js & Node.js",
      "MongoDB database modeling, indexing, and schema design",
      "React Native cross-platform mobile application development",
      "Production deployment, performance optimization & code splitting",
    ],
    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "React Native",
      "Tailwind CSS",
      "Git",
    ],
    type: "Full-time",
  },
  {
    id: "career-4",
    stageNumber: 4,
    levelLabel: "Career Horizon & Leadership",
    role: "Lead Full Stack Architect & Tech Innovator",
    company: "Scalable Global Products",
    location: "Enterprise Ecosystems",
    duration: "Future Horizon",
    status: "Continuous Growth",
    current: false,
    accentColor: "#A855F7", // Purple
    gradient: "from-purple-500 via-pink-500 to-amber-500",
    bgTint: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
    glowShadow: "shadow-[0_0_35px_rgba(168,85,247,0.45)]",
    icon: Sparkles,
    logo: null,
    side: "right",
    description:
      "Expanding career impact into high-throughput cloud architectures, micro-services, micro-frontends, AI integration, and technical product leadership.",
    responsibilities: [
      "Designing distributed enterprise software architectures",
      "Optimizing cloud infrastructures and micro-services APIs",
      "Integrating AI & machine learning tools into modern web suites",
    ],
    techStack: ["Cloud Architecture", "Next.js", "Microservices", "AI APIs", "DevOps"],
    type: "Future Goal",
  },
];

const CORE_COMPETENCIES = [
  { title: "Full Stack Development", desc: "End-to-end MERN web products", icon: Code2 },
  { title: "React.js & Frontend", desc: "Modern dynamic UI architectures", icon: Layers },
  { title: "Node.js & Express APIs", desc: "Scalable REST API engineering", icon: Server },
  { title: "Database Systems", desc: "MongoDB schema design & queries", icon: Cpu },
  { title: "React Native Mobile", desc: "Cross-platform mobile apps", icon: Zap },
  { title: "Production Deployment", desc: "Vercel, Git & CI/CD pipelines", icon: Rocket },
];

const CAREER_ACHIEVEMENTS = [
  "Working as Full Stack Developer at BinaryLogix Technologies LLP",
  "Completed 3-Month Intensive MERN Internship at Sky Info Group",
  "Delivered multiple client web products as an independent freelancer",
  "Hands-on experience developing cross-platform React Native apps",
  "Solved 300+ Algorithmic Problems across LeetCode & GeeksforGeeks",
  "Architected reusable design system primitives for production applications",
];

const Experience = () => {
  const [activeNodeId, setActiveNodeId] = useState("career-3");
  const [viewMode, setViewMode] = useState("tree"); // 'tree' or 'cards'

  return (
    <section
      id="experience"
      className="relative min-h-screen pt-20 sm:pt-24 lg:pt-28 pb-36 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors overflow-hidden"
    >
      {/* Background Micro Glow Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-gradient-to-tr from-purple-500/20 via-cyan-500/20 to-indigo-500/20 rounded-full blur-[140px]" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/30 text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Compass className="w-4 h-4 animate-spin-slow" />
            Career Growth Tree Pathway
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-slate-900 dark:text-white">
            Professional <span className="text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 bg-clip-text">Experience</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Growing through real-world experience. Trace my progression from independent freelancing to full-stack engineering at BinaryLogix Technologies.
          </p>

          {/* Mode Switcher */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800 shadow-inner">
            <button
              onClick={() => setViewMode("tree")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                viewMode === "tree"
                  ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              Career Tree View
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                viewMode === "cards"
                  ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-md"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Cpu className="w-4 h-4" />
              Classic Card Grid
            </button>
          </div>
        </motion.div>

        {/* VIEW 1: CAREER TREE VIEW */}
        {viewMode === "tree" && (
          <div className="relative my-8 lg:my-12">
            {/* Tree Top Crown / Rocket Indicator */}
            <div className="flex flex-col items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 p-0.5 shadow-xl shadow-purple-500/30 flex items-center justify-center relative"
              >
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-purple-400">
                  <Rocket className="w-7 h-7 animate-bounce" />
                </div>
                <div className="absolute -top-2 px-2.5 py-0.5 rounded-full bg-purple-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                  Future Horizon
                </div>
              </motion.div>
            </div>

            {/* Central Trunk Stem Line (Upward Growth Path) */}
            <div className="relative">
              {/* Vertical Trunk Line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1.5 rounded-full bg-gradient-to-b from-purple-500 via-indigo-500 via-cyan-500 to-emerald-500 shadow-[0_0_12px_rgba(168,85,247,0.5)] z-0" />

              {/* Animated Light Pulse travelling UP the career trunk */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-16 rounded-full bg-gradient-to-t from-transparent via-purple-400 to-white shadow-[0_0_18px_#c084fc] z-0 pointer-events-none"
                animate={{ top: ["100%", "0%"] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
              />

              {/* Milestones Container */}
              <div className="space-y-16 lg:space-y-24 relative z-10 py-6">
                {[...CAREER_TREE_MILESTONES].reverse().map((milestone) => {
                  const isSelected = activeNodeId === milestone.id;
                  const isLeft = milestone.side === "left";
                  const IconComponent = milestone.icon;

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="relative flex items-center justify-center group"
                    >
                      {/* Central Trunk Node Button */}
                      <button
                        onClick={() => setActiveNodeId(milestone.id)}
                        className={`relative z-20 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 outline-none ${
                          isSelected
                            ? `bg-slate-900 text-white border-2 border-white scale-125 ${milestone.glowShadow}`
                            : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:scale-110"
                        }`}
                      >
                        {milestone.logo ? (
                          <img
                            src={milestone.logo}
                            alt={milestone.company}
                            className="w-7 h-7 object-cover rounded-xl"
                          />
                        ) : (
                          <IconComponent
                            className="w-5 h-5"
                            style={{ color: milestone.accentColor }}
                          />
                        )}
                        {/* Node Stage Pill */}
                        <div
                          className="absolute -bottom-6 px-2 py-0.5 rounded-full text-[10px] font-bold text-white shadow-sm whitespace-nowrap"
                          style={{ backgroundColor: milestone.accentColor }}
                        >
                          Stage {milestone.stageNumber}
                        </div>
                      </button>

                      {/* Desktop Layout Branch & Card */}
                      <div className="hidden lg:flex absolute inset-0 items-center justify-between pointer-events-none">
                        {/* Left Card */}
                        <div
                          className={`w-[45%] ${
                            isLeft ? "pointer-events-auto" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {isLeft && (
                            <CareerMilestoneCard
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
                              d="M 0 24 C 40 24, 60 24, 100 24"
                              fill="none"
                              stroke={isSelected ? milestone.accentColor : "#64748b"}
                              strokeWidth={isSelected ? 3 : 1.5}
                              strokeDasharray={isSelected ? "none" : "4 4"}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>

                        {/* Right Card */}
                        <div
                          className={`w-[45%] ${
                            !isLeft ? "pointer-events-auto" : "opacity-0 pointer-events-none"
                          }`}
                        >
                          {!isLeft && (
                            <CareerMilestoneCard
                              milestone={milestone}
                              isSelected={isSelected}
                              onSelect={() => setActiveNodeId(milestone.id)}
                            />
                          )}
                        </div>
                      </div>

                      {/* Mobile / Tablet Card */}
                      <div className="lg:hidden w-full pl-16 sm:pl-20 mt-4 pr-2">
                        <CareerMilestoneCard
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
                🚀 Career Start (2024)
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CLASSIC CARD GRID VIEW */}
        {viewMode === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {CAREER_TREE_MILESTONES.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.company}
                      className="w-12 h-12 object-cover rounded-2xl border shadow-sm"
                    />
                  ) : (
                    <div
                      className="p-3 rounded-2xl text-white shadow-md"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-500">
                        {item.type}
                      </span>
                      {item.current && (
                        <span className="px-2 py-0.5 text-[10px] font-bold text-white bg-green-500 rounded-full">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  {item.company}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" /> {item.duration}
                  </span>
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <Pin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* BOTTOM SECTION: CORE COMPETENCIES & ACHIEVEMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 sm:mt-24">
          {/* Core Competencies Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
                <Code2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Core Engineering Capabilities
                </h3>
                <p className="text-xs text-slate-500">Technical expertise built across professional roles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CORE_COMPETENCIES.map((comp, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 flex items-start gap-3 hover:border-purple-500/40 transition-colors"
                >
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                    <comp.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {comp.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                      {comp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Career Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl shadow-2xl border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">Career Highlights</h3>
                  <p className="text-xs text-slate-400">Professional milestones & achievements</p>
                </div>
              </div>

              <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-300">
                {CAREER_ACHIEVEMENTS.map((ach, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-medium">Open to Full-Stack Opportunities</span>
              <a
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Hire / Collaborate <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Sub-Component for Career Milestone Card
function CareerMilestoneCard({ milestone, isSelected, onSelect }) {
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
      {/* Top Badges */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-xs tracking-wide uppercase"
            style={{ backgroundColor: milestone.accentColor }}
          >
            {milestone.type}
          </span>
          {milestone.current && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white bg-green-500 shadow-sm animate-pulse">
              CURRENT ROLE
            </span>
          )}
        </div>
        <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          {milestone.duration}
        </span>
      </div>

      {/* Role & Company Header */}
      <div className="flex items-start gap-3 mb-2">
        {milestone.logo && (
          <img
            src={milestone.logo}
            alt={milestone.company}
            className="w-10 h-10 object-cover rounded-xl border border-slate-200 dark:border-slate-700 shrink-0 shadow-xs"
          />
        )}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {milestone.role}
          </h3>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {milestone.company}
          </p>
        </div>
      </div>

      {/* Location */}
      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
        <Pin className="w-3.5 h-3.5 shrink-0" />
        {milestone.location}
      </p>

      {/* Short Description */}
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3 leading-relaxed">
        {milestone.description}
      </p>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {milestone.techStack.map((tech, i) => (
          <span
            key={i}
            className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/60 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {tech}
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
              <Briefcase className="w-3.5 h-3.5 text-purple-500" /> Core Responsibilities & Impact:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              {milestone.responsibilities.map((resp, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-purple-500 shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Experience;
