import React, { useState, useEffect } from "react";
import {
  Code,
  Globe,
  GitBranch,
  Cpu,
  Layers,
  TrendingUp,
  Rocket,
  Database,
  Zap,
  Target,
  Code2,
  CheckCircle,
  ExternalLink,
  Calendar,
  FolderGit2,
  Terminal,
  Smartphone,
  Monitor,
  ArrowRight,
  BarChart3,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  Briefcase,
  Award,
  Building2,
  UserCheck,
  Server,
  Layout,
  GitMerge,
  Activity,
  Star,
  Pin,
} from "lucide-react";
import Header from "../../components/ui/Header";
import { motion } from "framer-motion";

const Experience = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    const handleThemeChange = (e) => {
      setDarkMode(e.detail.isDark);
    };
    window.addEventListener("themeChange", handleThemeChange);
    if (document.documentElement.classList.contains("dark")) {
      setDarkMode(true);
    }
    return () => window.removeEventListener("themeChange", handleThemeChange);
  }, []);

  // Real professional experience data
  const professionalExperiences = [
    {
      company: "BinaryLogix Technologies LLP",
      role: "Full Stack Developer",
      duration: "Feb 2026 – Present",
      location: "Bhopal, MP",
      type: "Full-time",
      current: true,
      description:
        "Building and maintaining full-stack web and mobile applications using MERN stack and React Native. Leading feature development and optimizing performance.",
      responsibilities: [
        "Full Stack Web Development with React.js & Node.js",
        "MongoDB Database Management & Schema Design",
        "RESTful API Development & Integration",
        "React Native Mobile App Development",
        "Performance Optimization & Code Splitting",
        "Deployment & Production Maintenance",
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
      icon: <Building2 className="w-5 h-5" />,
      logoInitial: "B",
      color: "from-purple-500 to-pink-500",
    },
    {
      company: "Sky Info Group",
      role: "MERN Stack Developer Intern",
      duration: "Nov 2025 – Jan 2026",
      location: "Bhopal, MP",
      type: "Internship",
      current: false,
      description:
        "Completed a 3-month intensive internship focused on MERN stack development, working on live projects and collaborating with the development team.",
      responsibilities: [
        "Developed responsive frontend interfaces using React.js",
        "Worked on REST APIs and backend integration",
        "Built reusable component libraries",
        "Collaborated with team using Git & GitHub",
        "Participated in bug fixing and feature development",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "REST APIs",
        "Git",
        "Tailwind CSS",
      ],
      icon: <Server className="w-5 h-5" />,
      logoInitial: "S",
      color: "from-blue-500 to-cyan-500",
    },
    {
      company: "Freelance Full Stack Developer",
      role: "Self-Employed",
      duration: "2024 – Present",
      location: "Remote",
      type: "Freelance",
      current: false,
      description:
        "Designing and delivering custom web applications for clients, handling end-to-end development from requirement analysis to deployment.",
      responsibilities: [
        "Client requirement analysis & project planning",
        "Custom web application development using MERN stack",
        "UI/UX implementation with responsive design",
        "Deployment & ongoing maintenance",
        "Direct client communication & feedback integration",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Express.js",
        "Tailwind CSS",
        "Vercel",
        "GitHub",
      ],
      icon: <Briefcase className="w-5 h-5" />,
      logoInitial: "F",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  // Career journey steps
  const careerJourney = [
    {
      step: "Freelancing",
      period: "2024 – Present",
      description:
        "Started independent client projects, building real-world applications",
      icon: <Briefcase className="w-5 h-5" />,
      status: "completed",
    },
    {
      step: "Sky Info Group",
      period: "Nov 2025 – Jan 2026",
      description:
        "MERN Stack Internship – gained professional team experience",
      icon: <Server className="w-5 h-5" />,
      status: "completed",
    },
    {
      step: "BinaryLogix Technologies",
      period: "Feb 2026 – Present",
      description: "Full Stack Developer – current professional role",
      icon: <Building2 className="w-5 h-5" />,
      status: "current",
    },
  ];

  // Tech stack professionally used
  const professionalTechStack = [
    { name: "React.js", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
    { name: "React Native", icon: "📱", color: "from-blue-500 to-indigo-500" },
    { name: "JavaScript", icon: "📜", color: "from-yellow-500 to-amber-500" },
    { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
    { name: "Express.js", icon: "⚡", color: "from-gray-500 to-slate-500" },
    { name: "MongoDB", icon: "🍃", color: "from-green-600 to-teal-600" },
    { name: "Git", icon: "🐙", color: "from-orange-500 to-red-500" },
    { name: "GitHub", icon: "🐱", color: "from-purple-500 to-pink-500" },
    { name: "REST APIs", icon: "🔌", color: "from-blue-400 to-purple-400" },
    { name: "Tailwind CSS", icon: "🌀", color: "from-sky-500 to-blue-500" },
  ];

  // Key responsibilities cards (overall)
  const keyResponsibilities = [
    {
      title: "Full Stack Web Development",
      icon: <Layout className="w-5 h-5" />,
      desc: "End-to-end MERN applications",
    },
    {
      title: "React.js Frontend",
      icon: <Code className="w-5 h-5" />,
      desc: "Modern, responsive UIs",
    },
    {
      title: "Node.js & Express Backend",
      icon: <Server className="w-5 h-5" />,
      desc: "Scalable REST APIs",
    },
    {
      title: "MongoDB Management",
      icon: <Database className="w-5 h-5" />,
      desc: "Schema design & optimization",
    },
    {
      title: "API Development",
      icon: <GitMerge className="w-5 h-5" />,
      desc: "Integration & documentation",
    },
    {
      title: "React Native Mobile",
      icon: <Smartphone className="w-5 h-5" />,
      desc: "Cross-platform apps",
    },
    {
      title: "Performance Optimization",
      icon: <Zap className="w-5 h-5" />,
      desc: "Lazy loading, code splitting",
    },
    {
      title: "Deployment & Maintenance",
      icon: <Rocket className="w-5 h-5" />,
      desc: "Production deployment",
    },
  ];

  // Professional achievements
  const professionalAchievements = [
    "Successfully completed MERN Stack Internship at Sky Info Group",
    "Working as Full Stack Developer at BinaryLogix Technologies",
    "React Native Application Development experience",
    "Delivered 3+ client projects as freelancer",
    "460+ DSA Problems Solved across LeetCode & GFG",
    "Built reusable component libraries for production",
  ];

  const skillCategories = [
    {
      category: "Frontend Mastery",
      skills: [
        { name: "React.js", level: 90, icon: "⚛️" },
        { name: "JavaScript ES6+", level: 95, icon: "📜" },
        { name: "HTML5/CSS3", level: 98, icon: "🎨" },
        { name: "Tailwind CSS", level: 92, icon: "🌀" },
        { name: "Responsive Design", level: 94, icon: "📱" },
        { name: "React Native", level: 85, icon: "📱" },
      ],
      icon: <Code className="w-4 h-4 md:h-5 md:w-5" />,
    },
    {
      category: "Backend & Databases",
      skills: [
        { name: "Node.js", level: 88, icon: "🟢" },
        { name: "Express.js", level: 89, icon: "⚡" },
        { name: "REST APIs", level: 92, icon: "🔌" },
        { name: "MongoDB", level: 86, icon: "🍃" },
        { name: "Authentication", level: 88, icon: "🔐" },
        { name: "Server Logic", level: 87, icon: "⚙️" },
      ],
      icon: <Database className="w-4 h-4 md:h-5 md:w-5" />,
    },
    {
      category: "Tools & Practices",
      skills: [
        { name: "Git & GitHub", level: 92, icon: "🐙" },
        { name: "Vercel", level: 88, icon: "▲" },
        { name: "VS Code", level: 96, icon: "💻" },
        { name: "Problem Solving", level: 89, icon: "🧩" },
        { name: "Debugging", level: 91, icon: "🐛" },
        { name: "Code Optimization", level: 87, icon: "🚀" },
      ],
      icon: <Zap className="w-4 h-4 md:h-5 md:w-5" />,
    },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  return (
    <section
      id="experience"
      className={`min-h-screen py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-12 transition-all duration-300 overflow-x-hidden ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800"
      }`}
    >
      <Header />

      <div className="relative max-w-6xl mx-auto">
        {/* Subtle background decoration - hidden on mobile for performance */}
        <div className="absolute inset-0 hidden overflow-hidden pointer-events-none sm:block">
          <div className="absolute rounded-full top-40 -left-20 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
          <div className="absolute bg-purple-500 rounded-full bottom-20 -right-20 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        </div>

        {/* Header Section - Responsive text sizes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-12 text-center sm:mb-16 md:mb-28"
        >
          <div className="relative inline-block">
            <h1
              className={`relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <span className="block">Professional</span>
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Journey
              </span>
            </h1>
          </div>
          <div className="max-w-3xl px-3 mx-auto mt-4 sm:mt-6">
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From freelancing to professional full-stack development – building
              impactful applications and solving real-world problems.
            </p>
          </div>
        </motion.div>

        {/* Professional Timeline Section - FULLY RESPONSIVE FIX */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-20 sm:mb-28 md:mb-36"
        >
          <div className="mb-10 text-center sm:mb-16">
            <motion.h2
              variants={fadeUp}
              className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl"
            >
              Work{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Timeline
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className={`mt-2 sm:mt-4 text-sm sm:text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              My professional growth path
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline line - responsive positioning */}
            <div className="absolute left-5 xs:left-6 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
            <div className="absolute left-5 xs:left-6 md:left-1/2 transform md:-translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm"></div>

            {professionalExperiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`relative flex flex-col md:flex-row gap-6 sm:gap-10 mb-12 sm:mb-16 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot - responsive position */}
                <div className="absolute z-20 flex items-center justify-center w-10 h-10 transform -translate-x-1/2 rounded-full shadow-lg xs:w-12 xs:h-12 left-5 xs:left-6 md:left-1/2 bg-gradient-to-r from-blue-500 to-purple-500 shadow-blue-500/30">
                  {exp.current && (
                    <span className="absolute flex w-full h-full">
                      <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                    </span>
                  )}
                  <div className="flex items-center justify-center w-8 h-8 text-xs font-bold text-gray-900 bg-white rounded-full shadow-inner xs:w-10 xs:h-10 xs:text-sm dark:bg-gray-900 dark:text-white">
                    {exp.logoInitial}
                  </div>
                </div>

                {/* Card - dynamic margin for different screen sizes */}
                <div
                  className={`ml-12 xs:ml-14 sm:ml-16 md:ml-0 w-full md:w-5/12 ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                >
                  <div
                    className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 transition-all duration-500 hover:-translate-y-2 ${
                      darkMode
                        ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/40"
                        : "bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-blue-300/50"
                    } shadow-lg hover:shadow-2xl overflow-hidden`}
                  >
                    {/* Animated gradient border on hover */}
                    <div className="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

                    {exp.current && (
                      <div className="absolute z-10 top-3 right-3 sm:top-4 sm:right-4">
                        <span className="relative px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                          <span className="absolute inset-0 bg-green-500 rounded-full opacity-50 animate-ping"></span>
                          <span className="relative">Current</span>
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-3 mb-3 sm:gap-4 sm:mb-5">
                      <div
                        className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-r ${exp.color} bg-opacity-10 shadow-md ${
                          darkMode ? "bg-gray-700/80" : "bg-gray-100"
                        }`}
                      >
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight break-words sm:text-xl md:text-2xl">
                          {exp.company}
                        </h3>
                        <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 break-words">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3 text-xs text-gray-500 sm:gap-4 sm:mb-5 sm:text-sm dark:text-gray-400">
                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
                        <span className="text-[11px] sm:text-xs">
                          {exp.duration}
                        </span>
                      </span>
                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full">
                        <Pin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />{" "}
                        <span className="text-[11px] sm:text-xs">
                          {exp.location}
                        </span>
                      </span>
                    </div>

                    <p
                      className={`text-sm sm:text-base mb-4 sm:mb-5 leading-relaxed border-l-2 sm:border-l-3 border-blue-500 pl-3 sm:pl-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {exp.description}
                    </p>

                    <div className="mb-4 sm:mb-5">
                      <h4 className="mb-2 sm:mb-3 text-[10px] sm:text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {exp.responsibilities.slice(0, 3).map((resp, i) => (
                          <li
                            key={i}
                            className="flex items-start text-xs sm:text-sm group/resp"
                          >
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 mr-1.5 sm:mr-2 text-blue-500 flex-shrink-0 transition-transform group-hover/resp:translate-x-0.5" />
                            <span className="break-words">{resp}</span>
                          </li>
                        ))}
                        {exp.responsibilities.length > 3 && (
                          <li className="mt-1 text-xs font-medium text-blue-500 sm:text-sm">
                            +{exp.responsibilities.length - 3} more
                            responsibilities
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-700/50">
                      {exp.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium transition-all hover:scale-105 ${
                            darkMode
                              ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.techStack.length > 4 && (
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium bg-gray-200 dark:bg-gray-700">
                          +{exp.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Journey Timeline - Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 sm:mb-28 md:mb-36"
        >
          <div className="mb-10 text-center sm:mb-16">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Career{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Journey
              </span>
            </h2>
            <p
              className={`mt-2 sm:mt-4 text-sm sm:text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              From freelancing to professional developer
            </p>
          </div>
          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4 lg:gap-6">
            {careerJourney.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="relative flex flex-col items-center w-full px-4 text-center md:w-1/3 group">
                  <div
                    className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-all duration-300 group-hover:scale-110 ${
                      step.status === "current"
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 shadow-md shadow-blue-500/20"
                    } text-white`}
                  >
                    {step.icon}
                    {step.status === "current" && (
                      <span className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-40"></span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold break-words sm:text-xl">
                    {step.step}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                    {step.period}
                  </p>
                  <p
                    className={`text-xs sm:text-sm mt-2 sm:mt-3 max-w-xs px-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {step.description}
                  </p>
                </div>
                {idx < careerJourney.length - 1 && (
                  <ArrowRight className="hidden w-6 h-6 text-blue-400 transition-opacity md:block lg:w-8 lg:h-8 opacity-40 group-hover:opacity-70" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Used Professionally - Responsive Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 sm:mb-28 md:mb-36"
        >
          <div className="mb-10 text-center sm:mb-16">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Tech Stack{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Professionally
              </span>
            </h2>
            <p
              className={`mt-2 sm:mt-4 text-sm sm:text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Technologies I use daily in production
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {professionalTechStack.map((tech, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.02 }}
                className={`group relative rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 text-center transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/60 border border-gray-700/50 hover:border-blue-500/50"
                    : "bg-white/80 border border-gray-200/80 hover:border-blue-300/50"
                } shadow-md hover:shadow-xl overflow-hidden`}
              >
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5"></div>
                <div className="relative z-10">
                  <div className="inline-block mb-2 text-3xl transition-transform sm:mb-3 sm:text-4xl group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <div className="mb-2 text-sm font-semibold break-words sm:mb-3 sm:text-base">
                    {tech.name}
                  </div>
                  <div
                    className={`w-full h-1 sm:h-1.5 rounded-full bg-gradient-to-r ${tech.color} transform origin-left transition-transform group-hover:scale-x-110`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Responsibilities Cards - Responsive Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20 sm:mb-28 md:mb-36"
        >
          <div className="mb-10 text-center sm:mb-16">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Key{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Responsibilities
              </span>
            </h2>
            <p
              className={`mt-2 sm:mt-4 text-sm sm:text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Core competencies across my roles
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyResponsibilities.map((resp, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`group relative rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/60 border border-gray-700/50 hover:border-blue-500/40"
                    : "bg-white/80 border border-gray-200/80 hover:border-blue-300/40"
                } shadow-md hover:shadow-xl overflow-hidden`}
              >
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5"></div>
                <div className="relative flex items-start gap-2 mb-2 sm:gap-3 sm:mb-3">
                  <div className="p-1.5 sm:p-2 md:p-2.5 text-white rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-md group-hover:scale-110 transition-transform">
                    {resp.icon}
                  </div>
                  <h3 className="text-base font-bold leading-tight break-words sm:text-lg">
                    {resp.title}
                  </h3>
                </div>
                <p
                  className={`relative text-xs sm:text-sm leading-relaxed mt-1 sm:mt-2 pl-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {resp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Achievements - Responsive Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 sm:mb-28 md:mb-36"
        >
          <div
            className={`relative rounded-xl sm:rounded-2xl p-5 sm:p-7 md:p-10 transition-all duration-300 overflow-hidden ${
              darkMode
                ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50"
                : "bg-gradient-to-br from-blue-50/90 to-purple-50/90 border border-blue-100/80"
            } shadow-xl`}
          >
            {/* Decorative elements - hidden on mobile */}
            <div className="absolute top-0 right-0 hidden w-32 h-32 -mt-16 -mr-16 rounded-full bg-gradient-to-bl from-blue-500/10 to-purple-500/10 blur-2xl sm:block"></div>
            <div className="absolute bottom-0 left-0 hidden w-32 h-32 -mb-16 -ml-16 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-2xl sm:block"></div>

            <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-transparent sm:text-2xl md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Professional Achievements
                </h3>
                <p
                  className={`text-sm sm:text-base mt-1 sm:mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Milestones I'm proud of
                </p>
              </div>
              <Award className="w-10 h-10 text-blue-500 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-80 drop-shadow-lg" />
            </div>
            <div className="grid grid-cols-1 gap-3 mt-6 sm:gap-4 sm:mt-8 md:grid-cols-2">
              {professionalAchievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-2 sm:gap-3 p-1.5 sm:p-2 transition-all rounded-lg hover:bg-white/20 dark:hover:bg-white/5"
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium break-words sm:text-base">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA - Fully Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 lg:p-16 text-center overflow-hidden ${
            darkMode
              ? "bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 backdrop-blur-sm"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          } shadow-2xl`}
        >
          {/* Animated background particles - simplified for mobile */}
          <div className="absolute inset-0 opacity-20 sm:opacity-30">
            <div className="absolute top-0 left-0 w-24 h-24 bg-white rounded-full sm:w-32 sm:h-32 filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 delay-1000 bg-purple-300 rounded-full w-28 h-28 sm:w-40 sm:h-40 filter blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10">
            <h3 className="px-2 mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl md:text-4xl lg:text-5xl">
              Ready to Build Something Amazing?
            </h3>
            <p
              className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-3 ${
                darkMode ? "text-gray-200" : "text-blue-100"
              }`}
            >
              With hands-on experience in full-stack development and strong
              problem-solving skills, I'm equipped to tackle complex challenges
              and deliver efficient solutions.
            </p>
            <div className="flex flex-col justify-center gap-3 px-4 sm:flex-row sm:gap-5 md:gap-6 sm:px-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all overflow-hidden ${
                  darkMode
                    ? "bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                    : "bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Projects
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-600 text-white shadow-lg"
                    : "bg-blue-700 hover:bg-blue-600 text-white shadow-lg"
                }`}
              >
                Contact Me
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
