import React, { useEffect, useState } from "react";
import { color, motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    document.title = "Skills | Ratnakar Singh Parihar";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillCategories = [
    { id: "all", name: "All Skills", icon: "Layers" },
    { id: "frontend", name: "Frontend", icon: "Monitor" },
    { id: "backend", name: "Backend", icon: "Server" },
    { id: "database", name: "Database", icon: "Database" },
    { id: "tools", name: "Tools", icon: "Tool" },
  ];

  const skillSections = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: "Monitor",
      gradient: "from-blue-500 via-cyan-400 to-teal-400",
      color: "text-blue-600",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      description:
        "I build clean, responsive, and interactive web interfaces using modern technologies focused on user experience and design consistency.",
      stats: { projects: "15+", experience: "Fresher | Open to Internship" },
      skills: [
        {
          name: "HTML5",
          level: 95,
          icon: "FileCode",
          color: "from-orange-500 to-red-500",
        },
        {
          name: "CSS3",
          level: 90,
          icon: "Paintbrush",
          color: "from-blue-500 to-indigo-500",
        },
        {
          name: "JavaScript",
          level: 88,
          icon: "Code",
          color: "from-yellow-500 to-amber-500",
        },
        {
          name: "React.js",
          level: 85,
          icon: "Atom",
          color: "from-cyan-500 to-blue-500",
        },
        {
          name: "React Native Development",
          level: 80,
          icon: "Smartphone",
          color: "from-cyan-500 to-blue-500",
        },
        {
          name: "Tailwind CSS",
          level: 92,
          icon: "Wind",
          color: "from-teal-500 to-emerald-500",
        },
      ],
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: "Server",
      gradient: "from-green-500 via-emerald-400 to-teal-400",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      description:
        "I create robust server-side applications, REST APIs, and handle authentication and data management using modern backend technologies.",
      stats: { projects: "10+", experience: "2Y Hands-on | MERN Stack" },
      skills: [
        {
          name: "Node.js",
          level: 82,
          icon: "Node",
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "Express.js",
          level: 80,
          icon: "Lightning",
          color: "from-gray-600 to-gray-800",
        },
        {
          name: "Java",
          level: 70,
          icon: "Coffee",
          color: "from-red-500 to-orange-500",
        },
        {
          name: "REST API",
          level: 85,
          icon: "Api",
          color: "from-purple-500 to-pink-500",
        },
      ],
    },
    {
      id: "database",
      title: "Database & Cloud",
      icon: "Database",
      gradient: "from-purple-500 via-pink-500 to-rose-400",
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      description:
        "I efficiently manage databases, cloud services, and deployment tools for scalable and reliable applications.",
      stats: { projects: "12+", experience: "2Y Hands-on | MERN Stack" },
      skills: [
        {
          name: "MongoDB",
          level: 78,
          icon: "Leaf",
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "MySQL",
          level: 75,
          icon: "Table",
          color: "from-blue-500 to-cyan-500",
        },
      ],
    },
    {
      id: "tools",
      title: "Tools & Workflow",
      icon: "Tool",
      gradient: "from-orange-500 via-amber-400 to-yellow-400",
      color: "text-orange-600",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-200 dark:border-orange-800",
      description:
        "I leverage modern development tools and practices for efficient, collaborative, and streamlined workflows.",
      stats: { projects: "20+", experience: "2Y Hands-on MERN" },
      skills: [
        {
          name: "VS Code",
          level: 90,
          icon: "Code",
          color: "from-blue-500 to-indigo-500",
        },
        {
          name: "Git & GitHub",
          level: 88,
          icon: "Git",
          color: "from-orange-500 to-red-500",
        },
        {
          name: "Postman",
          level: 85,
          icon: "Postman",
          color: "from-orange-500 to-red-500",
        },
        {
          name: "Vercel",
          level: 82,
          icon: "Triangle",
          color: "from-black to-gray-800",
        },
        {
          name: "Render",
          level: 75,
          icon: "Cloud",
          color: "from-indigo-500 to-purple-500",
        },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Github",
      url: "https://github.com/Ratnakar-Singh-parihar-123",
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/in/ratnakarsinghparihar/",
    },
    {
      name: "Twitter",
      url: "https://x.com/RatnakarSi85551",
    },
    {
      name: "Email",
      url: "mailto:ratnakarsinghparihar9399@gmail.com",
    },
  ];

  const filteredSkills =
    activeFilter === "all"
      ? skillSections
      : skillSections.filter((section) => section.id === activeFilter);

  // Skill level indicator component
  const SkillLevel = ({ level, color }) => (
    <div className="relative w-16 h-16 sm:w-20 sm:h-20 group">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={windowWidth < 640 ? 32 : 40}
          cy={windowWidth < 640 ? 32 : 40}
          r={windowWidth < 640 ? 14 : 18}
          stroke="currentColor"
          strokeWidth={windowWidth < 640 ? "3" : "4"}
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx={windowWidth < 640 ? 32 : 40}
          cy={windowWidth < 640 ? 32 : 40}
          r={windowWidth < 640 ? 14 : 18}
          stroke="currentColor"
          strokeWidth={windowWidth < 640 ? "3" : "4"}
          fill="none"
          strokeDasharray={`${2 * Math.PI * (windowWidth < 640 ? 14 : 18)}`}
          strokeDashoffset={`${2 * Math.PI * (windowWidth < 640 ? 14 : 18) * (1 - level / 100)}`}
          className={`bg-gradient-to-r ${color} text-transparent`}
          style={{ stroke: `url(#gradient-${level})` }}
        />
      </svg>
      <defs>
        <linearGradient
          id={`gradient-${level}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {level}%
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Header */}
      <Header />

      {/* Hero Section with Parallax */}
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-4 sm:mb-6"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
              My Technical Expertise
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Technologies
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Skilled in 15+ technologies with 2+ years of hands-on experience,
            gained through building real-world projects and continuously
            expanding my development expertise.
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12 max-w-2xl mx-auto">
            {[
              {
                label: "Technologies Worked With",
                value: "15+",
                icon: "Code",
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Projects Built",
                value: "8+",
                icon: "FolderOpen",
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Hands-on Experience",
                value: "2+ Years",
                icon: "Clock",
                color: "from-orange-500 to-red-500",
              },
              {
                label: "GitHub Commits",
                value: "1000+",
                icon: "GitBranch",
                color: "from-green-500 to-emerald-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-center">
                  <div
                    className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 mb-2`}
                  >
                    <Icon
                      name={stat.icon}
                      size={windowWidth < 640 ? 16 : 18}
                      className="text-gray-700 dark:text-gray-300"
                    />
                  </div>
                  <p className="text-lg sm:text-xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Category Filter - Mobile Optimized */}
      <section className="py-4 sm:py-6 sticky top-14 sm:top-16 md:top-20 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between sm:justify-center">
            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1 custom-scrollbar flex-1 sm:flex-none">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category.id)}
                  className={`
                    relative flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 
                    rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap
                    transition-all duration-300
                    ${
                      activeFilter === category.id
                        ? "text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {activeFilter === category.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg sm:rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    <Icon
                      name={category.icon}
                      size={windowWidth < 640 ? 14 : 16}
                    />
                  </span>
                  <span className="relative z-10 hidden xs:inline">
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Mobile filter indicator */}
            <span className="sm:hidden text-xs text-gray-500 dark:text-gray-400 ml-2">
              {filteredSkills.length} sections
            </span>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {filteredSkills.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group relative"
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />

                <div
                  className={`relative bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl border ${section.border} shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  {/* Header Gradient */}
                  <div className={`h-2 bg-gradient-to-r ${section.gradient}`} />

                  <div className="p-4 sm:p-6 lg:p-8">
                    {/* Section Header */}
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div
                          className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${section.gradient} shadow-lg`}
                        >
                          <Icon
                            name={section.icon}
                            size={windowWidth < 640 ? 20 : 24}
                            className="text-white"
                          />
                          <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl animate-pulse opacity-0 group-hover:opacity-100" />
                        </div>
                        <div>
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                            {section.title}
                          </h2>
                          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            {section.stats.projects} projects •{" "}
                            {section.stats.experience}
                          </p>
                        </div>
                      </div>

                      {/* Skill Count Badge */}
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${section.bg} ${section.color}`}
                      >
                        {section.skills.length} skills
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Skills Grid with Progress */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      {section.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="group/skill relative"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg transform group-hover/skill:scale-105 transition-transform duration-300" />
                          <div className="relative bg-white dark:bg-gray-800 p-2 sm:p-3 rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                            <div className="flex items-center space-x-2 sm:space-x-3">
                              {/* Icon */}
                              <div
                                className={`p-1.5 sm:p-2 rounded-md bg-gradient-to-br ${skill.color} bg-opacity-10`}
                              >
                                <Icon
                                  name={skill.icon}
                                  size={windowWidth < 640 ? 12 : 14}
                                  className={`bg-gradient-to-br ${skill.color} bg-clip-text text-transparent`}
                                />
                              </div>

                              {/* Skill Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {skill.name}
                                  </p>
                                  <span className="text-[10px] sm:text-xs font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    {skill.level}%
                                  </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="relative w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    transition={{
                                      duration: 1,
                                      delay: 0.2 + i * 0.1,
                                    }}
                                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${skill.color} rounded-full`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Hover Tooltip */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[8px] rounded opacity-0 group-hover/skill:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-20">
                              Proficiency: {skill.level}%
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Last updated: 2024
                        </span>
                        <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">
                          View projects →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                <Icon name="Search" size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No skills found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting a different category
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Current Learning
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Path
              </span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Always learning and improving. Here's what I'm currently focusing
              on
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "React Native",
                icon: "Smartphone",
                progress: 60,
                color: "from-cyan-500 to-blue-500",
                description: "Cross-platform mobile apps",
              },
              {
                name: "DSA Practice",
                icon: "Brain",
                progress: 70,
                color: "from-purple-500 to-indigo-500",
                description: "Arrays, Trees, Graphs",
              },
              {
                name: "Problem Solving",
                icon: "Lightbulb",
                progress: 75,
                color: "from-yellow-500 to-orange-500",
                description: "Logic building & optimization",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl transform group-hover:scale-105 transition-transform duration-300" />
                <div className="relative bg-white dark:bg-gray-900 p-4 sm:p-5 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center space-x-3 mb-3">
                    <div
                      className={`p-2 rounded-lg bg-gradient-to-br ${item.color} bg-opacity-10`}
                    >
                      <Icon
                        name={item.icon}
                        size={windowWidth < 640 ? 16 : 18}
                        className={`bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                        {item.name}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">
                        Progress
                      </span>
                      <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {item.progress}%
                      </span>
                    </div>
                    <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className={`absolute top-0 left-0 h-full bg-gradient-to-r ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 text-white"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Ready to see these skills in action?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Explore my projects where I've implemented these technologies to
            build real-world, production-ready applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="/projects"
              className="group relative inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl w-full sm:w-auto justify-center"
            >
              <span>View My Projects</span>
              <Icon
                name="ArrowRight"
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="/contact"
              className="group relative inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30 w-full sm:w-auto justify-center"
            >
              <Icon name="Mail" size={18} />
              <span>Get In Touch</span>
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 sm:mt-12">
            {[
              { value: "8+", label: "Projects" },
              { value: "15+", label: "Technologies" },
              { value: "2+ years,Hands-on", label: "Experience" },
              { value: "24/7", label: "Available" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-xl sm:text-2xl font-black text-white">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 sm:py-10 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">
                  R
                </span>
              </div>
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} Ratnakar Singh Parihar
              </span>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 flex items-center space-x-1">
              <span>Crafted with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>using React & Tailwind CSS</span>
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target=""
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-gray-900 dark:text-gray-400 dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  <Icon name={social.name} size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        .custom-scrollbar::-webkit-scrollbar {
          height: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default Skills;
