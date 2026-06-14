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
      desc: "",
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
      className={`min-h-screen py-16 md:py-24 px-5 sm:px-8 lg:px-12 transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800"
      }`}
    >
      <Header />

      <div className="relative max-w-6xl mx-auto">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full top-40 -left-20 w-72 h-72 mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
          <div className="absolute bg-purple-500 rounded-full bottom-20 -right-20 w-80 h-80 mix-blend-multiply filter blur-3xl opacity-5 animate-pulse"></div>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mb-20 text-center md:mb-28"
        >
          <div className="relative inline-block">
            <div className="absolute rounded-full opacity-20"></div>
            <h1
              className={`relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              <span className="block">Professional</span>
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Journey
              </span>
            </h1>
          </div>
          <div className="max-w-3xl px-4 mx-auto mt-6">
            <p
              className={`text-lg sm:text-xl md:text-2xl leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              From freelancing to professional full-stack development – building
              impactful applications and solving real-world problems.
            </p>
          </div>
        </motion.div>

        {/* Professional Timeline Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <div className="mb-16 text-center">
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold md:text-4xl lg:text-5xl"
            >
              Work{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Timeline
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className={`mt-4 text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              My professional growth path
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline line with gradient glow */}
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
            <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-1.5 h-full bg-gradient-to-b from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-sm"></div>

            {professionalExperiences.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`relative flex flex-col md:flex-row gap-10 mb-16 ${
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot with enhanced styling */}
                <div className="absolute z-20 flex items-center justify-center w-12 h-12 transform -translate-x-1/2 rounded-full shadow-lg left-6 md:left-1/2 bg-gradient-to-r from-blue-500 to-purple-500 shadow-blue-500/30">
                  {exp.current && (
                    <span className="absolute flex w-full h-full">
                      <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"></span>
                    </span>
                  )}
                  <div className="flex items-center justify-center w-10 h-10 text-sm font-bold text-gray-900 bg-white rounded-full shadow-inner dark:bg-gray-900 dark:text-white">
                    {exp.logoInitial}
                  </div>
                </div>

                {/* Card with improved design */}
                <div
                  className={`ml-16 md:ml-0 w-full md:w-5/12 ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}
                >
                  <div
                    className={`group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 ${
                      darkMode
                        ? "bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/40"
                        : "bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-blue-300/50"
                    } shadow-lg hover:shadow-2xl overflow-hidden`}
                  >
                    {/* Animated gradient border on hover */}
                    <div className="absolute inset-0 transition-opacity duration-700 opacity-0 pointer-events-none group-hover:opacity-100 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

                    {exp.current && (
                      <div className="absolute z-10 top-4 right-4">
                        <span className="relative px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                          <span className="absolute inset-0 bg-green-500 rounded-full opacity-50 animate-ping"></span>
                          <span className="relative">Current</span>
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-4 mb-5">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${exp.color} bg-opacity-10 shadow-md ${
                          darkMode ? "bg-gray-700/80" : "bg-gray-100"
                        }`}
                      >
                        {exp.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                          {exp.company}
                        </h3>
                        <p className="mt-1 text-base font-semibold text-blue-600 dark:text-blue-400">
                          {exp.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-5 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/50 px-2.5 py-1 rounded-full">
                        <Calendar className="w-3.5 h-3.5" /> {exp.duration}
                      </span>
                      <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-800/50 px-2.5 py-1 rounded-full">
                        <Pin className="w-3.5 h-3.5" /> {exp.location}
                      </span>
                    </div>

                    <p
                      className={`text-base mb-5 leading-relaxed border-l-3 border-blue-500 pl-4 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {exp.description}
                    </p>

                    <div className="mb-5">
                      <h4 className="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-2">
                        {exp.responsibilities.slice(0, 3).map((resp, i) => (
                          <li
                            key={i}
                            className="flex items-start text-sm group/resp"
                          >
                            <ChevronRight className="w-4 h-4 mt-0.5 mr-2 text-blue-500 flex-shrink-0 transition-transform group-hover/resp:translate-x-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                        {exp.responsibilities.length > 3 && (
                          <li className="mt-1 text-sm font-medium text-blue-500">
                            +{exp.responsibilities.length - 3} more
                            responsibilities
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200 dark:border-gray-700/50">
                      {exp.techStack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all hover:scale-105 ${
                            darkMode
                              ? "bg-gray-700/80 text-gray-300 hover:bg-gray-600"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.techStack.length > 4 && (
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-200 dark:bg-gray-700">
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

        {/* Career Journey Timeline - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-28 md:mb-36"
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Career{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Journey
              </span>
            </h2>
            <p
              className={`mt-4 text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              From freelancing to professional developer
            </p>
          </div>
          <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row md:gap-6">
            {careerJourney.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="relative flex flex-col items-center w-full text-center md:w-1/3 group">
                  <div
                    className={`relative w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 ${
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
                  <h3 className="text-xl font-bold">{step.step}</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {step.period}
                  </p>
                  <p
                    className={`text-sm mt-3 max-w-xs px-3 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    {step.description}
                  </p>
                </div>
                {idx < careerJourney.length - 1 && (
                  <ArrowRight className="hidden w-8 h-8 text-blue-400 transition-opacity opacity-40 md:block group-hover:opacity-70" />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack Used Professionally - Enhanced Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Tech Stack{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Professionally
              </span>
            </h2>
            <p
              className={`mt-4 text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Technologies I use daily in production
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {professionalTechStack.map((tech, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative rounded-xl p-5 text-center transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/60 border border-gray-700/50 hover:border-blue-500/50"
                    : "bg-white/80 border border-gray-200/80 hover:border-blue-300/50"
                } shadow-md hover:shadow-xl overflow-hidden`}
              >
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5"></div>
                <div className="relative z-10">
                  <div className="inline-block mb-3 text-4xl transition-transform group-hover:scale-110">
                    {tech.icon}
                  </div>
                  <div className="mb-3 text-base font-semibold">
                    {tech.name}
                  </div>
                  <div
                    className={`w-full h-1.5 rounded-full bg-gradient-to-r ${tech.color} transform origin-left transition-transform group-hover:scale-x-110`}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Responsibilities Cards - Enhanced Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-28 md:mb-36"
        >
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              Key{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Responsibilities
              </span>
            </h2>
            <p
              className={`mt-4 text-base md:text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Core competencies across my roles
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {keyResponsibilities.map((resp, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={`group relative rounded-xl p-6 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/60 border border-gray-700/50 hover:border-blue-500/40"
                    : "bg-white/80 border border-gray-200/80 hover:border-blue-300/40"
                } shadow-md hover:shadow-xl overflow-hidden`}
              >
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5"></div>
                <div className="relative flex items-start gap-3 mb-3">
                  <div className="p-2.5 text-white rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-md group-hover:scale-110 transition-transform">
                    {resp.icon}
                  </div>
                  <h3 className="text-lg font-bold leading-tight">
                    {resp.title}
                  </h3>
                </div>
                <p
                  className={`relative text-sm leading-relaxed mt-2 pl-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {resp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Achievements - Redesigned Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-28 md:mb-36"
        >
          <div
            className={`relative rounded-2xl p-8 md:p-10 transition-all duration-300 overflow-hidden ${
              darkMode
                ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50"
                : "bg-gradient-to-br from-blue-50/90 to-purple-50/90 border border-blue-100/80"
            } shadow-xl`}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 -mt-20 -mr-20 rounded-full bg-gradient-to-bl from-blue-500/10 to-purple-500/10 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 -mb-20 -ml-20 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-2xl"></div>

            <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row">
              <div>
                <h3 className="text-2xl font-bold text-transparent md:text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  Professional Achievements
                </h3>
                <p
                  className={`text-base mt-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Milestones I'm proud of
                </p>
              </div>
              <Award className="text-blue-500 w-14 h-14 opacity-80 drop-shadow-lg" />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
              {professionalAchievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 p-2 transition-all rounded-lg hover:bg-white/20 dark:hover:bg-white/5"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-base font-medium">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Final CTA - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-2xl p-10 md:p-14 lg:p-16 text-center overflow-hidden ${
            darkMode
              ? "bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-800/50 backdrop-blur-sm"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
          } shadow-2xl`}
        >
          {/* Animated background particles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 delay-1000 bg-purple-300 rounded-full filter blur-3xl animate-pulse"></div>
          </div>

          <div className="relative z-10">
            <h3 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to Build Something Amazing?
            </h3>
            <p
              className={`text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed ${
                darkMode ? "text-gray-200" : "text-blue-100"
              }`}
            >
              With hands-on experience in full-stack development and strong
              problem-solving skills, I'm equipped to tackle complex challenges
              and deliver efficient solutions.
            </p>
            <div className="flex flex-col justify-center gap-5 sm:flex-row md:gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative px-8 py-3.5 rounded-xl font-bold text-base md:text-lg transition-all overflow-hidden ${
                  darkMode
                    ? "bg-white text-blue-600 hover:bg-gray-100 shadow-lg"
                    : "bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Projects
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group px-8 py-3.5 rounded-xl font-bold text-base md:text-lg transition-all ${
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
