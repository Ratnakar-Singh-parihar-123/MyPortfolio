import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CodeBracketIcon,
  CommandLineIcon,
  DevicePhoneMobileIcon,
  RocketLaunchIcon,
  CircleStackIcon,
  PaintBrushIcon,
  CheckBadgeIcon,
  ArrowTrendingUpIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const WhyHireMe = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const skills = [
    {
      icon: CodeBracketIcon,
      title: "Clean Code Architecture",
      description:
        "Writing maintainable, scalable, and reusable code following best practices and design patterns",
      fullDescription:
        "I follow SOLID principles and design patterns to ensure code is modular, testable, and easy to maintain. Every line is written with future scalability in mind.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      textColor: "text-blue-500",
      borderColor: "border-blue-500/20",
      metrics: "100% Code Coverage",
      experience:
        "1+ Years of Development Journey Through Training, Internships & Real-World Projects",
    },
    {
      icon: CommandLineIcon,
      title: "Full-Stack Development",
      description:
        "MERN Stack (MongoDB, Express.js, React, Node.js) with JavaScript for type-safe applications",
      fullDescription:
        "End-to-end development expertise with modern JavaScript. Building robust APIs, responsive UIs, and scalable database solutions.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      textColor: "text-purple-500",
      borderColor: "border-purple-500/20",
      metrics: "15+ Projects",
      experience: "Full Stack",
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Responsive Design",
      description:
        "Mobile-first approach ensuring pixel-perfect layouts across all devices and screen sizes",
      fullDescription:
        "Creating seamless experiences from mobile to desktop with fluid layouts, adaptive components, and touch-friendly interactions.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      textColor: "text-green-500",
      borderColor: "border-green-500/20",
      metrics: "100% Responsive",
      experience: "All Devices",
    },
    {
      icon: RocketLaunchIcon,
      title: "Performance Optimization",
      description:
        "Lazy loading, code splitting, and optimization techniques for lightning-fast load times",
      fullDescription:
        "Implementing advanced optimization strategies including bundle splitting, image optimization, and caching to achieve sub-second load times.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
      borderColor: "border-orange-500/20",
      metrics: "40% Faster",
      experience: "Optimized",
    },
    {
      icon: CircleStackIcon,
      title: "Database Management",
      description:
        "MongoDB, MySQL, PostgreSQL, and Firebase with efficient query optimization",
      fullDescription:
        "Designing efficient database schemas, writing optimized queries, and implementing data caching strategies for high-performance applications.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      textColor: "text-indigo-500",
      borderColor: "border-indigo-500/20",
      metrics: "99.9% Uptime",
      experience: "Scalable",
    },
    {
      icon: PaintBrushIcon,
      title: "Modern UI/UX",
      description:
        "Creating beautiful interfaces with Tailwind CSS, Framer Motion, and Material-UI",
      fullDescription:
        "Crafting intuitive and visually stunning interfaces with smooth animations and thoughtful user experiences that users love.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
      textColor: "text-pink-500",
      borderColor: "border-pink-500/20",
      metrics: "4.8/5 Rating",
      experience: "User-Centric",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Animated Background Elements - Matching Project Section */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary/5 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 blur-3xl"></div>
        <div className="absolute w-40 h-40 rounded-full top-1/4 left-1/4 bg-blue-500/10 blur-2xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/3 right-1/3 w-60 h-60 bg-pink-500/10 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container-brand">
        {/* Header Section - Matching Project Section Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                <LightBulbIcon className="w-6 h-6 text-primary" />
              </div>
              <motion.div
                className="absolute w-4 h-4 rounded-full -top-1 -right-1 bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="px-3 py-1 text-sm font-semibold rounded-full text-primary bg-primary/10">
              WHY WORK WITH ME
            </span>
          </div>

          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground">
            Hire
            <span className="relative ml-4">
              <span className="relative z-10">Me</span>
              <motion.span
                className="absolute left-0 right-0 h-3 bottom-2 bg-primary/20 -rotate-1"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-muted-foreground">
            I design and develop modern web & mobile applications using the MERN
            stack and React Native, focusing on scalability, performance, and
            exceptional user experience. I transform ideas into impactful,
            real-world digital solutions with clean and efficient code.
          </p>
        </motion.div>

        {/* Code-Like Introduction - Matching Project Section Aesthetic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute transition-opacity duration-500 opacity-0 -inset-1 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:opacity-100"></div>

            {/* Code Block */}
            <div className="relative p-6 overflow-hidden font-mono text-sm border shadow-xl bg-card border-border/50 rounded-2xl">
              {/* Window Controls */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-xs text-muted-foreground">
                  developer.ts
                </span>
              </div>

              {/* Code Content */}
              <div className="space-y-3">
                <div>
                  <span className="text-blue-400">interface</span>{" "}
                  <span className="text-green-400">Developer</span> {"{"}
                </div>
                <div className="ml-4 space-y-2">
                  <div>
                    <span className="text-purple-400">name</span>:{" "}
                    <span className="text-green-400">
                      "Ratnakar Singh Parihar "
                    </span>
                    ,
                  </div>
                  <div>
                    <span className="text-purple-400">role</span>:{" "}
                    <span className="text-green-400">
                      "Full Stack Developer"
                    </span>
                    ,
                  </div>
                  <div>
                    <span className="text-purple-400">Experience</span>: [
                    <span className="text-yellow-400">
                      1+ Years of Learning, Internship & Project Experience
                    </span>
                    ],
                  </div>
                  <div>
                    <span className="text-purple-400">approach</span>: {"{"}
                  </div>
                  <div className="ml-4">
                    <span className="text-purple-400">code</span>:{" "}
                    <span className="text-green-400">"Clean & Scalable"</span>,
                    <br />
                    <span className="text-purple-400">design</span>:{" "}
                    <span className="text-green-400">"User-Centric"</span>,
                    <br />
                    <span className="text-purple-400">performance</span>:{" "}
                    <span className="text-green-400">"Optimized"</span>
                  </div>
                  <div>{"}"}</div>
                </div>
                <div>{"}"}</div>

                {/* Output Line */}
                <div className="pt-4 mt-4 border-t border-border/50">
                  <span className="text-gray-500">// Output: </span>
                  <span className="text-green-400">
                    "Ready to build amazing things together!"
                  </span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/5 blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-purple-500/5 blur-2xl"></div>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid - Matching Project Cards */}
        <div className="grid grid-cols-1 gap-6 mb-20 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative cursor-pointer group"
            >
              {/* Card Container */}
              <div className="relative h-full overflow-hidden transition-all duration-500 border shadow-lg bg-gradient-to-b from-card to-card/80 border-border/50 rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color.replace("from-", "from-").replace("to-", "to-")}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="p-6">
                  {/* Icon with Gradient */}
                  <div
                    className={`w-14 h-14 rounded-xl ${skill.bgColor} p-3 mb-4 relative`}
                  >
                    <skill.icon
                      className={`w-full h-full ${skill.textColor}`}
                    />
                    <motion.div
                      className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 -right-1"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 text-xl font-bold transition-colors duration-300 text-foreground group-hover:text-primary">
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {skill.description}
                  </p>

                  {/* Full Description (shown on hover) */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredIndex === index ? 1 : 0,
                      height: hoveredIndex === index ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pl-3 mb-4 text-sm leading-relaxed border-l-2 text-foreground/80 border-primary">
                      {skill.fullDescription}
                    </p>
                  </motion.div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium ${skill.bgColor} ${skill.textColor} rounded-lg border ${skill.borderColor}`}
                    >
                      {skill.metrics}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium bg-muted/50 text-muted-foreground rounded-lg border border-border`}
                    >
                      {skill.experience}
                    </span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="relative pt-2">
                    <div className="h-1 overflow-hidden rounded-full bg-muted/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent via-transparent to-primary/5 rounded-bl-3xl"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHireMe;
