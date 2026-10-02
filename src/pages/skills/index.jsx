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
  SiFirebase,
  SiSocketdotio,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  Monitor,
  Server,
  Database,
  Wrench,
  FolderOpen,
  Clock3,
  GitBranch,
  Search,
  Brain,
  Lightbulb,
  ArrowUpRight,
  Layers3,
  Smartphone,
  ShieldCheck,
  Cloud,
  Code2,
} from "lucide-react";

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    document.title = "Skills | Ratnakar Singh Parihar";
    window.scrollTo(0, 0);
  }, []);

  const skillCategories = [
    {
      id: "all",
      name: "All",
      icon: <Layers3 size={15} />,
    },
    {
      id: "frontend",
      name: "Frontend",
      icon: <Monitor size={15} />,
    },
    {
      id: "backend",
      name: "Backend",
      icon: <Server size={15} />,
    },
    {
      id: "database",
      name: "Database",
      icon: <Database size={15} />,
    },
    {
      id: "tools",
      name: "Tools",
      icon: <Wrench size={15} />,
    },
  ];

  const skillSections = [
    {
      id: "frontend",
      title: "Frontend & Mobile",
      subtitle: "Interfaces & experiences",
      icon: <Monitor size={22} />,
      gradient: "from-blue-500 to-cyan-500",
      softBg: "bg-blue-500/10",
      color: "text-blue-600 dark:text-blue-400",

      description:
        "Building responsive web interfaces and cross-platform mobile applications with a focus on clean UI, reusable components, and smooth user experiences.",

      skills: [
        {
          name: "HTML5",
          icon: <SiHtml5 />,
          desc: "Semantic markup",
        },
        {
          name: "CSS3",
          icon: <span className="text-sm font-bold">CSS</span>,
          desc: "Responsive styling",
        },
        {
          name: "JavaScript",
          icon: <SiJavascript />,
          desc: "ES6+ development",
        },
        {
          name: "React.js",
          icon: <SiReact />,
          desc: "Component architecture",
        },
        {
          name: "React Native",
          icon: <SiReact />,
          desc: "Cross-platform apps",
        },
        {
          name: "Tailwind CSS",
          icon: <SiTailwindcss />,
          desc: "Utility-first UI",
        },
      ],
    },

    {
      id: "backend",
      title: "Backend & APIs",
      subtitle: "Server-side engineering",
      icon: <Server size={22} />,
      gradient: "from-emerald-500 to-teal-500",
      softBg: "bg-emerald-500/10",
      color: "text-emerald-600 dark:text-emerald-400",

      description:
        "Developing REST APIs and backend services with authentication, real-time communication, validation, and structured application logic.",

      skills: [
        {
          name: "Node.js",
          icon: <SiNodedotjs />,
          desc: "Runtime & services",
        },
        {
          name: "Express.js",
          icon: <SiExpress />,
          desc: "REST API development",
        },
        {
          name: "Java",
          icon: <FaJava />,
          desc: "OOP & DSA",
        },
        {
          name: "REST APIs",
          icon: <Code2 />,
          desc: "API architecture",
        },
        {
          name: "Socket.IO",
          icon: <SiSocketdotio />,
          desc: "Real-time systems",
        },
        {
          name: "JWT",
          icon: <ShieldCheck />,
          desc: "Authentication",
        },
      ],
    },

    {
      id: "database",
      title: "Database & Cloud",
      subtitle: "Data & deployment",
      icon: <Database size={22} />,
      gradient: "from-purple-500 to-pink-500",
      softBg: "bg-purple-500/10",
      color: "text-purple-600 dark:text-purple-400",

      description:
        "Working with relational and NoSQL databases while deploying applications and managing cloud-based development workflows.",

      skills: [
        {
          name: "MongoDB",
          icon: <SiMongodb />,
          desc: "NoSQL database",
        },
        {
          name: "MySQL",
          icon: <SiMysql />,
          desc: "Relational database",
        },
        {
          name: "Firebase",
          icon: <SiFirebase />,
          desc: "Backend services",
        },
        {
          name: "Vercel",
          icon: <SiVercel />,
          desc: "Frontend deployment",
        },
        {
          name: "Render",
          icon: <SiRender />,
          desc: "Backend deployment",
        },
      ],
    },

    {
      id: "tools",
      title: "Tools & Workflow",
      subtitle: "Development ecosystem",
      icon: <Wrench size={22} />,
      gradient: "from-orange-500 to-amber-500",
      softBg: "bg-orange-500/10",
      color: "text-orange-600 dark:text-orange-400",

      description:
        "Using modern development tools for version control, API testing, debugging, deployment, and efficient day-to-day development.",

      skills: [
        {
          name: "Git",
          icon: <SiGit />,
          desc: "Version control",
        },
        {
          name: "GitHub",
          icon: <SiGithub />,
          desc: "Code collaboration",
        },
        {
          name: "Postman",
          icon: <SiPostman />,
          desc: "API testing",
        },
        {
          name: "VS Code",
          icon: <span className="text-sm font-bold">VS</span>,
          desc: "Development environment",
        },
        {
          name: "Vercel",
          icon: <SiVercel />,
          desc: "Deployment",
        },
        {
          name: "Render",
          icon: <SiRender />,
          desc: "Backend hosting",
        },
      ],
    },
  ];

  const filteredSkills =
    activeFilter === "all"
      ? skillSections
      : skillSections.filter((section) => section.id === activeFilter);

  const stats = [
    {
      value: "15+",
      label: "Technologies",
      icon: <Code2 size={19} />,
    },
    {
      value: "10+",
      label: "Projects Built",
      icon: <FolderOpen size={19} />,
    },
    {
      value: "300+",
      label: "DSA Problems",
      icon: <Brain size={19} />,
    },
    {
      value: "1+ Yrs",
      label: "Learning & Building",
      icon: <Clock3 size={19} />,
    },
  ];

  const learningPath = [
    {
      title: "System Design",
      description:
        "Scalable architecture, APIs, caching, load balancing & distributed systems.",
      icon: <Server size={22} />,
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "DSA & Problem Solving",
      description:
        "Strengthening algorithms, data structures, optimization and logical thinking.",
      icon: <Brain size={22} />,
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      title: "Backend Engineering",
      description:
        "Improving API design, concurrency, performance, reliability and clean architecture.",
      icon: <Lightbulb size={22} />,
      gradient: "from-orange-500 to-amber-500",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-background">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative pt-20 pb-16 overflow-hidden sm:pt-24 lg:pt-28">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full w-96 h-96 -top-48 -right-48 bg-blue-500/10 blur-3xl" />
          <div className="absolute rounded-full w-96 h-96 -bottom-48 -left-48 bg-purple-500/10 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-wide border rounded-full sm:text-sm bg-primary/5 border-primary/10 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Technical Expertise
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-foreground">
              Skills &
              <span className="text-transparent bg-gradient-to-r from-pink-600 via-blue-600 to-blue-600 bg-clip-text">
                {" "}
                Technologies
              </span>
            </h1>

            <p className="max-w-2xl mx-auto mt-6 text-sm leading-relaxed sm:text-base md:text-lg text-muted-foreground">
              A practical technology stack built through internships, real-world
              projects, continuous learning, and hands-on development.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid max-w-4xl grid-cols-2 gap-3 mx-auto mt-12 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15 + index * 0.08,
                }}
                className="p-4 text-center transition-all border rounded-2xl bg-card/70 border-border/70 backdrop-blur-sm hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-center w-10 h-10 mx-auto mb-3 rounded-xl bg-primary/10 text-primary">
                  {stat.icon}
                </div>

                <div className="text-xl font-extrabold sm:text-2xl text-foreground">
                  {stat.value}
                </div>

                <div className="mt-1 text-[11px] sm:text-xs font-medium text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FILTER
      ========================================================= */}
      <section className="sticky top-0 z-30 py-3 border-y bg-background/80 backdrop-blur-xl border-border/60">
        <div className="flex justify-center px-4">
          <div className="flex gap-2 p-1 overflow-x-auto rounded-2xl bg-muted/60 custom-scrollbar">
            {skillCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeFilter === category.id
                    ? "bg-foreground text-background shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/70"
                }`}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SKILLS
      ========================================================= */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredSkills.map((section, index) => (
              <motion.article
                key={section.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="overflow-hidden transition-all border rounded-3xl bg-card border-border/70 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Top gradient */}
                <div className={`h-1.5 bg-gradient-to-r ${section.gradient}`} />

                <div className="p-5 sm:p-7">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${section.gradient} text-white shadow-lg`}
                      >
                        {section.icon}
                      </div>

                      <div>
                        <h2 className="text-lg font-bold sm:text-xl text-foreground">
                          {section.title}
                        </h2>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {section.subtitle}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight size={18} className="text-muted-foreground" />
                  </div>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>

                  {/* Skills */}
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {section.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center gap-3 p-3 transition-all border rounded-2xl bg-muted/30 border-border/60 hover:bg-muted/60 hover:border-border"
                      >
                        <div
                          className={`flex items-center justify-center w-9 h-9 rounded-xl ${section.softBg} ${section.color}`}
                        >
                          {typeof skill.icon === "object"
                            ? skill.icon
                            : skill.icon}
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-sm font-bold truncate text-foreground">
                            {skill.name}
                          </h3>

                          <p className="text-[11px] text-muted-foreground truncate">
                            {skill.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CURRENTLY EXPLORING
      ========================================================= */}
      <section className="py-16 border-y bg-muted/30 border-border/60">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 text-xs font-semibold border rounded-full bg-primary/5 border-primary/10 text-primary">
              <ArrowUpRight size={14} />
              Continuous Learning
            </div>

            <h2 className="text-3xl font-black sm:text-4xl text-foreground">
              Currently{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                Exploring
              </span>
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Beyond my current stack, I am continuously improving my
              engineering fundamentals and learning how scalable systems are
              designed and built.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {learningPath.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                className="p-6 transition-all border rounded-3xl bg-card border-border/70 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className={`flex items-center justify-center w-12 h-12 mb-5 rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}
                >
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                <div className="flex items-center gap-2 mt-5 text-xs font-semibold text-primary">
                  <span>Learning & improving</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOTTOM CTA
      ========================================================= */}
      <section className="px-4 py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl px-6 py-10 mx-auto text-center border rounded-3xl sm:px-10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 border-border"
        >
          <div className="flex items-center justify-center w-12 h-12 mx-auto mb-5 rounded-2xl bg-primary/10 text-primary">
            <Smartphone size={22} />
          </div>

          <h2 className="text-2xl font-black sm:text-3xl text-foreground">
            Building with technology,
            <br className="hidden sm:block" />
            learning with every project.
          </h2>

          <p className="max-w-xl mx-auto mt-4 text-sm leading-relaxed text-muted-foreground">
            I enjoy turning ideas into functional products while continuously
            improving my understanding of software engineering and scalable
            systems.
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Skills;
