import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
} from "react-icons/si";
import { TbApi, TbBrandCss3, TbBrandVscode } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import {
  Monitor,
  Server,
  Database,
  PenTool,
  FolderOpen,
  Clock,
  GitBranch,
  Search,
  Brain,
  Lightbulb,
  Mail,
  ArrowRight,
  Code,
} from "lucide-react";

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
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillCategories = [
    { id: "all", name: "All Skills", icon: <Database size={16} /> },
    { id: "frontend", name: "Frontend", icon: <Monitor size={16} /> },
    { id: "backend", name: "Backend", icon: <Server size={16} /> },
    { id: "database", name: "Database", icon: <Database size={16} /> },
    { id: "tools", name: "Tools", icon: <PenTool size={16} /> },
  ];

  const skillSections = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: <Monitor size={24} />,
      gradient: "from-blue-500 via-cyan-400 to-teal-400",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      description:
        "I build clean, responsive, and interactive web interfaces using modern technologies focused on user experience and design consistency.",
      stats: { projects: "15+", experience: "Fresher | Open to Internship" },
      skills: [
        {
          name: "HTML5",
          level: 95,
          icon: <SiHtml5 />,
          color: "from-orange-500 to-red-500",
        },
        {
          name: "CSS3",
          level: 90,
          icon: <TbBrandCss3 />,
          color: "from-blue-500 to-indigo-500",
        },
        {
          name: "JavaScript",
          level: 88,
          icon: <SiJavascript />,
          color: "from-yellow-400 to-yellow-500",
        },
        {
          name: "React.js",
          level: 85,
          icon: <SiReact />,
          color: "from-cyan-400 to-blue-500",
        },
        {
          name: "React Native",
          level: 80,
          icon: <SiReact />,
          color: "from-cyan-500 to-blue-500",
        },
        {
          name: "Tailwind CSS",
          level: 92,
          icon: <SiTailwindcss />,
          color: "from-teal-400 to-emerald-500",
        },
      ],
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: <Server size={24} />,
      gradient: "from-green-500 via-emerald-400 to-teal-400",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30",
      border: "border-green-200 dark:border-green-800",
      description:
        "I create robust server-side applications, REST APIs, and handle authentication and data management using modern backend technologies.",
      stats: { projects: "10+", experience: "2Y Hands-on | MERN Stack" },
      skills: [
        {
          name: "Node.js",
          level: 82,
          icon: <SiNodedotjs />,
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "Express.js",
          level: 80,
          icon: <SiExpress />,
          color: "from-gray-500 to-gray-700",
        },
        {
          name: "Java",
          level: 70,
          icon: <FaJava />,
          color: "from-red-500 to-orange-500",
        },
        {
          name: "REST API",
          level: 85,
          icon: <TbApi />,
          color: "from-purple-500 to-pink-500",
        },
      ],
    },
    {
      id: "database",
      title: "Database & Cloud",
      icon: <Database size={24} />,
      gradient: "from-purple-500 via-pink-500 to-rose-400",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30",
      border: "border-purple-200 dark:border-purple-800",
      description:
        "I efficiently manage databases, cloud services, and deployment tools for scalable and reliable applications.",
      stats: { projects: "12+", experience: "2Y Hands-on | MERN Stack" },
      skills: [
        {
          name: "MongoDB",
          level: 78,
          icon: <SiMongodb />,
          color: "from-green-500 to-emerald-500",
        },
        {
          name: "MySQL",
          level: 75,
          icon: <SiMysql />,
          color: "from-blue-500 to-cyan-500",
        },
      ],
    },
    {
      id: "tools",
      title: "Tools & Workflow",
      icon: <PenTool size={24} />,
      gradient: "from-orange-500 via-amber-400 to-yellow-400",
      color: "text-orange-600 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-950/30",
      border: "border-orange-200 dark:border-orange-800",
      description:
        "I leverage modern development tools and practices for efficient, collaborative, and streamlined workflows.",
      stats: { projects: "20+", experience: "2Y Hands-on MERN" },
      skills: [
        {
          name: "VS Code",
          level: 90,
          icon: <TbBrandVscode />,
          color: "from-blue-500 to-indigo-500",
        },
        {
          name: "Git & GitHub",
          level: 88,
          icon: <SiGithub />,
          color: "from-gray-800 to-black dark:from-white dark:to-gray-300",
        },
        {
          name: "Postman",
          level: 85,
          icon: <SiPostman />,
          color: "from-orange-500 to-red-500",
        },
        {
          name: "Vercel",
          level: 82,
          icon: <SiVercel />,
          color: "from-black to-gray-800 dark:from-white dark:to-gray-300",
        },
        {
          name: "Render",
          level: 75,
          icon: <SiRender />,
          color: "from-indigo-500 to-purple-500",
        },
      ],
    },
  ];

  const filteredSkills =
    activeFilter === "all"
      ? skillSections
      : skillSections.filter((section) => section.id === activeFilter);

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-16 pb-16 overflow-hidden sm:pt-20 lg:pt-24 sm:pb-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse" />
          <div className="absolute delay-1000 rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-orange-500/10 blur-3xl animate-pulse" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl px-4 mx-auto text-center sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 space-x-2 border rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
            <span className="text-xs font-medium sm:text-sm text-slate-700 dark:text-slate-300">
              My Technical Expertise
            </span>
          </motion.div>

          <h1 className="mb-6 text-4xl font-black sm:text-5xl md:text-6xl text-slate-900 dark:text-white">
            Skills &{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              Technologies
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
            Skilled in 15+ technologies with 1+ years of practical development
            experience, gained through professional training, internships, and
            building real-world web and mobile applications.
          </p>

          {/* Stats Grid */}
          <div className="grid max-w-3xl grid-cols-2 gap-4 mx-auto mt-12 sm:grid-cols-4">
            {[
              {
                label: "Technologies",
                value: "15+",
                icon: <Code size={20} />,
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Projects Built",
                value: "8+",
                icon: <FolderOpen size={20} />,
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Experience",
                value: "1+ Yrs",
                icon: <Clock size={20} />,
                color: "from-orange-500 to-red-500",
              },
              {
                label: "GitHub Commits",
                value: "1000+",
                icon: <GitBranch size={20} />,
                color: "from-green-500 to-emerald-500",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-4 transition-shadow bg-white border shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg"
              >
                <div
                  className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 mb-3 text-white shadow-inner shadow-black/20`}
                >
                  {stat.icon}
                </div>
                <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-0 z-30 py-4 border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-slate-200 dark:border-slate-800">
        <div className="flex justify-center px-4 mx-auto max-w-7xl">
          <div className="flex pb-1 space-x-2 overflow-x-auto custom-scrollbar">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === cat.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-12">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {filteredSkills.map((section, idx) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`bg-white dark:bg-slate-900 border ${section.border} rounded-3xl overflow-hidden shadow-xl shadow-slate-200/20 dark:shadow-black/20 group`}
                >
                  <div className={`h-2 bg-gradient-to-r ${section.gradient}`} />
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-br ${section.gradient} text-white shadow-lg`}
                        >
                          {section.icon}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold sm:text-2xl text-slate-900 dark:text-white">
                            {section.title}
                          </h2>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {section.stats.experience}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${section.bg} ${section.color}`}
                      >
                        {section.skills.length} skills
                      </span>
                    </div>

                    <p className="mb-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {section.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      {section.skills.map((skill, i) => (
                        <div
                          key={i}
                          className="p-4 transition-colors border bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 rounded-2xl hover:border-accent/30 group/skill"
                        >
                          <div className="flex items-center mb-3 space-x-3">
                            <div
                              className={`text-2xl bg-gradient-to-br ${skill.color} bg-clip-text text-transparent transform group-hover/skill:scale-110 transition-transform`}
                            >
                              {skill.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold truncate text-slate-900 dark:text-white">
                                {skill.name}
                              </h4>
                            </div>
                            <span className="text-xs font-bold text-slate-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                              className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredSkills.length === 0 && (
            <div className="py-20 text-center">
              <Search className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                No skills found
              </h3>
              <p className="text-slate-500">
                Try selecting a different category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="px-4 mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl text-slate-900 dark:text-white">
              Current{" "}
              <span className="text-transparent bg-gradient-to-r from-accent to-blue-500 bg-clip-text">
                Learning Path
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
              Always expanding my knowledge base. Here's what I'm focusing on
              right now.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                name: "System Design",
                icon: <Server />,
                progress: 65,
                color: "from-cyan-500 to-blue-500",
                desc: "Scalable architecture & APIs",
              },
              {
                name: "DSA Practice",
                icon: <Brain />,
                progress: 70,
                color: "from-purple-500 to-indigo-500",
                desc: "Arrays, Trees, Graphs",
              },
              {
                name: "Problem Solving",
                icon: <Lightbulb />,
                progress: 75,
                color: "from-yellow-500 to-orange-500",
                desc: "Logic building & optimization",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 transition-all bg-white border shadow-sm dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl hover:shadow-lg"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 flex items-center justify-center mb-4 text-white shadow-inner shadow-black/20`}
                >
                  {item.icon}
                </div>
                <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="mb-4 text-sm text-slate-500">{item.desc}</p>
                <div className="flex justify-between mb-2 text-xs font-semibold">
                  <span className="text-slate-600 dark:text-slate-400">
                    Progress
                  </span>
                  <span className="text-accent">{item.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Skills;
