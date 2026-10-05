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
  Bug,
  Users,
  Smartphone,
  GitBranch,
  TestTube2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Binarylogix from "../../assets/companylogo/binarylogix.jpeg";
import SkyInfoGroup from "../../assets/companylogo/sky info group.png";
import Freelancers from "../../assets/companylogo/freelancer.jpg";

/* =========================================================
   CAREER TREE DATA
========================================================= */

const CAREER_TREE_MILESTONES = [
  {
    id: "career-1",
    stageNumber: 1,

    levelLabel: "Independent Projects & Product Building",
    role: "Independent Full Stack Developer",
    company: "Self-Directed Projects",
    location: "Remote",
    duration: "2024 – Present",
    status: "Continuous Learning & Building",

    current: false,

    accentColor: "#10B981",
    gradient: "from-emerald-500 to-teal-600",
    bgTint: "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30",
    glowShadow: "shadow-[0_0_25px_rgba(16,185,129,0.35)]",

    icon: Globe,
    logo: Freelancers,
    side: "left",

    description:
      "Building practical web and mobile applications through independent projects, focusing on real-world problem solving, full-stack development, API integration, responsive interfaces, and production deployment.",

    responsibilities: [
      "Analyzing requirements and planning application architecture",
      "Building full-stack applications using the MERN stack",
      "Developing responsive and mobile-friendly user interfaces",
      "Designing and integrating REST APIs",
      "Working with MongoDB for application data management",
      "Deploying projects using Vercel, Render, and GitHub workflows",
    ],

    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "REST APIs",
      "Vercel",
      "Render",
      "Git",
    ],

    type: "Independent Projects",
  },

  /* =======================================================
     SKY INFO GROUP
  ======================================================= */

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

    accentColor: "#06B6D4",
    gradient: "from-cyan-500 to-blue-600",
    bgTint: "bg-cyan-500/10 dark:bg-cyan-500/20 border-cyan-500/30",
    glowShadow: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",

    icon: Server,
    logo: SkyInfoGroup,
    side: "right",

    description:
      "Completed a 3-month software development internship focused on backend development, REST APIs, bug fixing, database integration, and improving application functionality within a collaborative development environment.",

    responsibilities: [
      "Worked on backend development using Node.js and Express.js",
      "Implemented and integrated RESTful API endpoints",
      "Worked with MongoDB for database integration and data handling",
      "Fixed backend bugs and resolved application-level issues",
      "Debugged API and server-side functionality",
      "Improved existing application features and functionality",
      "Collaborated with the development team using Git and GitHub",
    ],

    techStack: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "REST APIs",
      "Backend Development",
      "Bug Fixing",
      "Git",
      "GitHub",
    ],

    type: "Internship",
  },

  /* =======================================================
     BINARYLOGIX
  ======================================================= */

  {
    id: "career-3",
    stageNumber: 3,

    levelLabel: "Professional Internship",
    role: "Full Stack Developer Intern",
    company: "BinaryLogix Technologies LLP",
    location: "Bhopal, MP",
    duration: "Jun 2026 – Aug 2026",
    status: "Completed Internship",

    current: false,

    accentColor: "#6366F1",
    gradient: "from-indigo-500 via-purple-600 to-pink-600",
    bgTint: "bg-indigo-500/10 dark:bg-indigo-500/20 border-indigo-500/30",
    glowShadow: "shadow-[0_0_30px_rgba(99,102,241,0.4)]",

    icon: Building2,
    logo: Binarylogix,
    side: "left",

    description:
      "Completed a 3-month full-stack development internship involving application development, API integration, debugging, application testing, technical task evaluation, and collaborative quality verification with the development team.",

    responsibilities: [
      "Developed and integrated application features using React.js and Node.js",
      "Built and integrated REST APIs using Express.js",
      "Worked with MongoDB for application data management",
      "Tested web and mobile application features to identify bugs and functional issues",
      "Collaborated with the development team to verify fixes and improve application quality",
      "Debugged application issues and contributed to improving existing functionality",
      "Reviewed and tested technical tasks and assignments as part of the interview and evaluation process",
      "Worked with Git and GitHub as part of the development workflow",
    ],

    techStack: [
      "React.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "React Native",
      "REST APIs",
      "Application Testing",
      "Debugging",
      "Git",
      "GitHub",
    ],

    type: "Internship",
  },

  /* =======================================================
     FUTURE
  ======================================================= */

  {
    id: "career-4",
    stageNumber: 4,

    levelLabel: "Career Horizon",
    role: "Full Stack Engineer & System Design Enthusiast",
    company: "Future Goal",
    location: "Scalable Product Ecosystems",
    duration: "Future Horizon",
    status: "Long-Term Goal",

    current: false,

    accentColor: "#A855F7",
    gradient: "from-purple-500 via-pink-500 to-amber-500",
    bgTint: "bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/30",
    glowShadow: "shadow-[0_0_35px_rgba(168,85,247,0.45)]",

    icon: Sparkles,
    logo: null,
    side: "right",

    description:
      "Working toward becoming a strong full-stack engineer capable of designing scalable systems, building high-performance applications, and applying system design, cloud, and AI concepts to real-world products.",

    responsibilities: [
      "Designing scalable and maintainable software architectures",
      "Deepening knowledge of system design and distributed systems",
      "Strengthening backend engineering and Java development skills",
      "Building high-performance applications and APIs",
      "Exploring cloud technologies, DevOps, and AI integrations",
    ],

    techStack: [
      "System Design",
      "Java",
      "Distributed Systems",
      "Cloud",
      "DevOps",
      "AI APIs",
    ],

    type: "Future Goal",
  },
];

/* =========================================================
   CORE COMPETENCIES
========================================================= */

const CORE_COMPETENCIES = [
  {
    title: "Full Stack Development",
    desc: "End-to-end MERN application development",
    icon: Code2,
  },
  {
    title: "React.js & Frontend",
    desc: "Responsive and dynamic user interfaces",
    icon: Layers,
  },
  {
    title: "Node.js & Express APIs",
    desc: "REST API development and integration",
    icon: Server,
  },
  {
    title: "Database Systems",
    desc: "MongoDB data modeling and integration",
    icon: Cpu,
  },
  {
    title: "React Native",
    desc: "Cross-platform mobile application development",
    icon: Smartphone,
  },
  {
    title: "Testing & Debugging",
    desc: "Application testing and issue identification",
    icon: Bug,
  },
];

/* =========================================================
   CAREER HIGHLIGHTS
========================================================= */

const CAREER_ACHIEVEMENTS = [
  "Completed a 3-month MERN Stack internship at Sky Info Group",
  "Worked on backend development, REST APIs, and bug fixing at Sky Info Group",
  "Completed a 3-month Full Stack Developer internship at BinaryLogix Technologies LLP",
  "Contributed to application development, testing, debugging, and technical task evaluation",
  "Built practical web and cross-platform mobile applications through independent projects",
  "Solved 300+ algorithmic problems while strengthening DSA and problem-solving skills",
];

/* =========================================================
   EXPERIENCE COMPONENT
========================================================= */

const Experience = () => {
  const [activeNodeId, setActiveNodeId] = useState("career-3");
  const [viewMode, setViewMode] = useState("tree");

  return (
    <section
      id="experience"
      className="relative min-h-screen px-4 pt-20 pb-32 overflow-hidden transition-colors sm:px-6 sm:pt-24 sm:pb-36 lg:px-8 lg:pt-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <div
          className="
            absolute top-1/3 left-1/2
            -translate-x-1/2
            w-[600px] h-[600px]
            sm:w-[750px] sm:h-[750px]
            bg-gradient-to-tr
            from-purple-500/20
            via-cyan-500/20
            to-indigo-500/20
            rounded-full
            blur-[120px] sm:blur-[140px]
          "
        />

        <div className="absolute top-20 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/15 rounded-full blur-[100px] sm:blur-[120px]" />

        <div className="absolute bottom-20 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-indigo-500/15 rounded-full blur-[100px] sm:blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center sm:mb-14 lg:mb-16"
        >
          <div
            className="
              inline-flex items-center gap-2
              px-3 py-1.5 sm:px-3.5 sm:py-1.5
              rounded-full
              bg-purple-500/10 dark:bg-purple-500/20
              border border-purple-500/30
              text-purple-600 dark:text-purple-400
              text-[11px] sm:text-sm
              font-semibold tracking-wide
              mb-4
            "
          >
            <Compass className="w-4 h-4" />
            Career Growth Tree Pathway
          </div>

          <h1 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-6xl text-slate-900 dark:text-white">
            Professional{" "}
            <span className="text-transparent bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 bg-clip-text">
              Experience
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm leading-relaxed sm:text-base lg:text-lg text-slate-600 dark:text-slate-400">
            Growing through real-world experience, internships, independent
            projects, and continuous engineering learning.
          </p>

          {/* =================================================
              VIEW SWITCHER
          ================================================= */}

          <div className="inline-flex max-w-full p-1 border shadow-inner mt-7 rounded-2xl bg-slate-200/80 dark:bg-slate-900 border-slate-300/80 dark:border-slate-800">
            <button
              onClick={() => setViewMode("tree")}
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
                    ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-md"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }
              `}
            >
              <Layers className="w-4 h-4" />
              <span>Career Tree</span>
            </button>

            <button
              onClick={() => setViewMode("cards")}
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
                    ? "bg-white dark:bg-slate-800 text-purple-600 dark:text-purple-400 shadow-md"
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
            TREE VIEW
        =================================================== */}

        {viewMode === "tree" && (
          <div className="relative my-8 lg:my-12">
            {/* Future Crown */}
            <div className="flex flex-col items-center mb-8 sm:mb-10">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="
                  relative
                  flex items-center justify-center
                  w-12 h-12 sm:w-14 sm:h-14
                  p-0.5
                  rounded-2xl
                  bg-gradient-to-tr
                  from-purple-600
                  via-indigo-600
                  to-pink-500
                  shadow-xl shadow-purple-500/30
                "
              >
                <div
                  className="
                    flex items-center justify-center
                    w-full h-full
                    bg-slate-950
                    rounded-[14px]
                    text-purple-400
                  "
                >
                  <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <div
                  className="
                    absolute -top-2
                    px-2 py-0.5 sm:px-2.5
                    rounded-full
                    bg-purple-500
                    text-[8px] sm:text-[10px]
                    font-bold
                    text-white
                    uppercase
                    tracking-wider
                    whitespace-nowrap
                  "
                >
                  Future Horizon
                </div>
              </motion.div>
            </div>

            {/* =================================================
                TREE CONTAINER
            ================================================= */}

            <div className="relative">
              {/* Desktop Central Trunk */}
              <div
                className="
                  absolute
                  hidden lg:block
                  left-1/2
                  -translate-x-1/2
                  top-0 bottom-0
                  w-1.5
                  rounded-full
                  bg-gradient-to-b
                  from-purple-500
                  via-indigo-500
                  via-cyan-500
                  to-emerald-500
                  shadow-[0_0_12px_rgba(168,85,247,0.5)]
                  z-0
                "
              />

              {/* Mobile Vertical Line */}
              <div className="absolute top-0 bottom-0 w-1 rounded-full lg:hidden left-6 sm:left-8 bg-gradient-to-b from-purple-500 via-indigo-500 via-cyan-500 to-emerald-500 opacity-80" />

              {/* Animated Desktop Pulse */}
              <motion.div
                className="
                  absolute
                  hidden lg:block
                  left-1/2
                  -translate-x-1/2
                  w-3 h-16
                  rounded-full
                  bg-gradient-to-t
                  from-transparent
                  via-purple-400
                  to-white
                  shadow-[0_0_18px_#c084fc]
                  z-0
                  pointer-events-none
                "
                animate={{ top: ["100%", "0%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 4.5,
                  ease: "linear",
                }}
              />

              {/* =================================================
                  MILESTONES
              ================================================= */}

              <div className="relative z-10 py-5 space-y-10 sm:space-y-14 lg:py-6 lg:space-y-24">
                {[...CAREER_TREE_MILESTONES].reverse().map((milestone) => {
                  const isSelected = activeNodeId === milestone.id;

                  const isLeft = milestone.side === "left";

                  const IconComponent = milestone.icon;

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                        margin: "-50px",
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      className="relative flex items-center justify-center"
                    >
                      {/* =====================================
                            MOBILE NODE
                        ===================================== */}

                      <button
                        onClick={() => setActiveNodeId(milestone.id)}
                        className={`
                            absolute
                            left-0 sm:left-2
                            lg:left-1/2
                            lg:-translate-x-1/2
                            top-5 lg:top-auto
                            z-30
                            flex items-center justify-center
                            w-12 h-12
                            sm:w-14 sm:h-14
                            rounded-2xl
                            transition-all duration-300
                            outline-none
                            ${
                              isSelected
                                ? `bg-slate-900 text-white border-2 border-white scale-110 lg:scale-125 ${milestone.glowShadow}`
                                : "bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:scale-110"
                            }
                          `}
                      >
                        {milestone.logo ? (
                          <img
                            src={milestone.logo}
                            alt={`${milestone.company} logo`}
                            className="object-cover w-7 h-7 rounded-xl"
                          />
                        ) : (
                          <IconComponent
                            className="w-5 h-5"
                            style={{
                              color: milestone.accentColor,
                            }}
                          />
                        )}

                        <div
                          className="
                              absolute
                              -bottom-5
                              px-2 py-0.5
                              rounded-full
                              text-[9px]
                              font-bold
                              text-white
                              shadow-sm
                              whitespace-nowrap
                            "
                          style={{
                            backgroundColor: milestone.accentColor,
                          }}
                        >
                          Stage {milestone.stageNumber}
                        </div>
                      </button>

                      {/* =====================================
                            DESKTOP CARDS
                        ===================================== */}

                      <div className="absolute inset-0 items-center justify-between hidden pointer-events-none lg:flex">
                        {/* Left */}
                        <div
                          className={`
                              w-[45%]
                              ${
                                isLeft
                                  ? "pointer-events-auto"
                                  : "opacity-0 pointer-events-none"
                              }
                            `}
                        >
                          {isLeft && (
                            <CareerMilestoneCard
                              milestone={milestone}
                              isSelected={isSelected}
                              onSelect={() => setActiveNodeId(milestone.id)}
                            />
                          )}
                        </div>

                        {/* Connector */}
                        <div className="w-[10%] flex justify-center pointer-events-none">
                          <svg
                            className="w-full h-12 overflow-visible"
                            viewBox="0 0 100 48"
                            preserveAspectRatio="none"
                          >
                            <motion.path
                              d="M 0 24 C 40 24, 60 24, 100 24"
                              fill="none"
                              stroke={
                                isSelected ? milestone.accentColor : "#64748b"
                              }
                              strokeWidth={isSelected ? 3 : 1.5}
                              strokeDasharray={isSelected ? "none" : "4 4"}
                              className="transition-all duration-300"
                            />
                          </svg>
                        </div>

                        {/* Right */}
                        <div
                          className={`
                              w-[45%]
                              ${
                                !isLeft
                                  ? "pointer-events-auto"
                                  : "opacity-0 pointer-events-none"
                              }
                            `}
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

                      {/* =====================================
                            MOBILE CARD
                        ===================================== */}

                      <div
                        className="
                            w-full
                            pl-[4.5rem]
                            sm:pl-24
                            pr-1
                            pt-2
                            lg:hidden
                          "
                      >
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

            {/* =================================================
                TREE BASE
            ================================================= */}

            <div className="flex flex-col items-center pt-5 mt-10 sm:mt-12">
              <div className="h-2 mb-2 rounded-full w-14 sm:w-16 sm:h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-sm" />

              <div
                className="
                  px-3 py-1
                  text-[10px] sm:text-xs
                  font-semibold
                  border
                  rounded-full
                  bg-slate-200 dark:bg-slate-800
                  text-slate-600 dark:text-slate-400
                  border-slate-300/80 dark:border-slate-700
                "
              >
                🚀 Career Start • 2024
              </div>
            </div>
          </div>
        )}

        {/* ===================================================
            CARD VIEW
        =================================================== */}

        {viewMode === "cards" && (
          <div className="grid grid-cols-1 gap-5 my-8 sm:gap-6 lg:gap-8 md:grid-cols-2">
            {CAREER_TREE_MILESTONES.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                className="relative p-5 transition-all bg-white border shadow-xl sm:p-6 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-3xl hover:border-purple-500/50 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-4">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={`${item.company} logo`}
                      className="object-cover border shadow-sm w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border-slate-200 dark:border-slate-700 shrink-0"
                    />
                  ) : (
                    <div
                      className="p-3 text-white shadow-md rounded-2xl shrink-0"
                      style={{
                        backgroundColor: item.accentColor,
                      }}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] sm:text-xs font-bold tracking-wider text-purple-500 uppercase">
                        {item.type}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold leading-snug sm:text-xl text-slate-900 dark:text-white">
                      {item.role}
                    </h3>
                  </div>
                </div>

                <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {item.company}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.duration}
                  </span>

                  <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
                    <Pin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {item.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="
                          px-2.5 py-1
                          bg-slate-100
                          dark:bg-slate-800
                          text-slate-600
                          dark:text-slate-400
                          text-[11px]
                          rounded-md
                        "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Responsibilities */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="flex items-center gap-1 mb-3 text-xs font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                    <Briefcase className="w-3.5 h-3.5 text-purple-500" />
                    Key Responsibilities
                  </h4>

                  <ul className="space-y-2">
                    {item.responsibilities.slice(0, 5).map((resp, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400"
                      >
                        <ChevronRight
                          className="
                              w-3.5 h-3.5
                              text-purple-500
                              shrink-0
                              mt-0.5
                            "
                        />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ===================================================
            BOTTOM SECTION
        =================================================== */}

        <div className="grid grid-cols-1 gap-6 sm:gap-8 mt-14 sm:mt-20 lg:mt-24 md:grid-cols-2">
          {/* =================================================
              CORE COMPETENCIES
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="p-5 bg-white border shadow-xl sm:p-6 lg:p-8 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-500">
                <Code2 className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-bold sm:text-2xl text-slate-900 dark:text-white">
                  Core Engineering Capabilities
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Skills developed through projects and internships
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CORE_COMPETENCIES.map((comp, idx) => (
                <div
                  key={idx}
                  className="
                      p-3.5
                      rounded-2xl
                      bg-slate-50
                      dark:bg-slate-800/60
                      border
                      border-slate-200/60
                      dark:border-slate-700/50
                      flex items-start gap-3
                      hover:border-purple-500/40
                      transition-colors
                    "
                >
                  <div className="p-2 text-purple-500 rounded-xl bg-purple-500/10 shrink-0">
                    <comp.icon className="w-4 h-4" />
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-xs font-bold sm:text-sm text-slate-900 dark:text-white">
                      {comp.title}
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                      {comp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* =================================================
              CAREER HIGHLIGHTS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="flex flex-col justify-between p-5 text-white border shadow-2xl sm:p-6 lg:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl border-slate-800"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400">
                  <Award className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">
                    Career Highlights
                  </h3>

                  <p className="text-xs text-slate-400">
                    Experience, learning & engineering milestones
                  </p>
                </div>
              </div>

              <ul className="mb-6 space-y-3 text-xs sm:text-sm text-slate-300">
                {CAREER_ACHIEVEMENTS.map((achievement, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle
                      className="
                          w-4 h-4
                          text-purple-400
                          shrink-0
                          mt-0.5
                        "
                    />

                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="flex flex-col gap-3 pt-4 border-t border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-medium text-slate-400">
                Open to Full-Stack Opportunities
              </span>

              <a
                href="#contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-1.5
                  px-3 py-2
                  rounded-xl
                  bg-purple-500/10
                  hover:bg-purple-500/20
                  text-xs
                  font-bold
                  text-purple-400
                  hover:text-purple-300
                  transition-colors
                "
              >
                Hire / Collaborate
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   CAREER MILESTONE CARD
========================================================= */

function CareerMilestoneCard({ milestone, isSelected, onSelect }) {
  return (
    <motion.div
      onClick={onSelect}
      whileHover={{
        y: -4,
      }}
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
      {/* =====================================================
          TOP BADGES
      ===================================================== */}

      <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="
              px-2.5 py-1
              rounded-full
              text-[10px] sm:text-[11px]
              font-bold
              text-white
              shadow-sm
              tracking-wide
              uppercase
            "
            style={{
              backgroundColor: milestone.accentColor,
            }}
          >
            {milestone.type}
          </span>

          {milestone.status && (
            <span
              className="
                px-2.5 py-1
                rounded-full
                text-[10px]
                font-medium
                bg-slate-100
                dark:bg-slate-800
                text-slate-600
                dark:text-slate-400
              "
            >
              {milestone.status}
            </span>
          )}
        </div>

        <span
          className="
            flex items-center gap-1
            w-fit
            text-[10px] sm:text-xs
            font-semibold
            text-slate-500
            dark:text-slate-400
            bg-slate-100
            dark:bg-slate-800/80
            px-2.5 py-1
            rounded-full
          "
        >
          <Calendar className="w-3.5 h-3.5" />
          {milestone.duration}
        </span>
      </div>

      {/* =====================================================
          ROLE HEADER
      ===================================================== */}

      <div className="flex items-start gap-3 mb-2">
        {milestone.logo && (
          <img
            src={milestone.logo}
            alt={`${milestone.company} logo`}
            className="object-cover w-10 h-10 border shadow-xs sm:w-11 sm:h-11 rounded-xl border-slate-200 dark:border-slate-700 shrink-0"
          />
        )}

        <div className="min-w-0">
          <h3 className="text-base font-bold leading-snug sm:text-lg lg:text-xl text-slate-900 dark:text-white">
            {milestone.role}
          </h3>

          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            {milestone.company}
          </p>
        </div>
      </div>

      {/* Location */}

      <p className="flex items-center gap-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
        <Pin className="w-3.5 h-3.5 shrink-0" />
        {milestone.location}
      </p>

      {/* Description */}

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

      {/* =====================================================
          TECH STACK
      ===================================================== */}

      <div className="flex flex-wrap gap-1.5 mb-4">
        {milestone.techStack.map((tech, index) => (
          <span
            key={`${tech}-${index}`}
            className="
                px-2 py-1
                sm:px-2.5
                text-[10px] sm:text-[11px]
                font-medium
                rounded-md
                bg-slate-100
                dark:bg-slate-800
                text-slate-600
                dark:text-slate-400
                border
                border-slate-200/60
                dark:border-slate-700/50
              "
          >
            {tech}
          </span>
        ))}
      </div>

      {/* =====================================================
          EXPANDED CONTENT
      ===================================================== */}

      <AnimatePresence initial={false}>
        {isSelected && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="pt-4 space-y-3 overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80"
          >
            <h4
              className="
                flex items-center gap-1
                text-[10px] sm:text-xs
                font-bold
                tracking-wider
                uppercase
                text-slate-900
                dark:text-white
              "
            >
              <Briefcase className="w-3.5 h-3.5 text-purple-500" />
              Key Responsibilities
            </h4>

            <ul className="space-y-2">
              {milestone.responsibilities.map((responsibility, index) => (
                <li
                  key={index}
                  className="
                      flex items-start gap-1.5
                      text-[11px] sm:text-xs
                      leading-relaxed
                      text-slate-600
                      dark:text-slate-400
                    "
                >
                  <ChevronRight
                    className="
                        w-3.5 h-3.5
                        text-purple-500
                        shrink-0
                        mt-0.5
                      "
                  />

                  <span>{responsibility}</span>
                </li>
              ))}
            </ul>

            {/* Small metadata */}

            <div className="flex flex-wrap gap-2 pt-2 ">
              <span
                className="
                  inline-flex
                  items-center gap-1.5
                  px-2.5 py-1
                  rounded-lg
                  bg-purple-500/10
                  text-purple-600
                  dark:text-purple-400
                  text-[10px]
                  font-semibold
                "
              >
                <GitBranch className="w-3.5 h-3.5" />
                Professional Workflow
              </span>

              {milestone.type === "Internship" && (
                <span
                  className="
                    inline-flex
                    items-center gap-1.5
                    px-2.5 py-1
                    rounded-lg
                    bg-cyan-500/10
                    text-cyan-600
                    dark:text-cyan-400
                    text-[10px]
                    font-semibold
                  "
                >
                  <Users className="w-3.5 h-3.5" />
                  Team Collaboration
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Experience;
