import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import {
  Sparkles,
  Layers,
  Zap,
  Shield,
  Cpu,
  Globe,
  Server,
  Code,
} from "lucide-react";
import { ClockIcon } from "@heroicons/react/24/outline";

const SkillPreviewSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "Monitor",
      color: "text-blue-500",
      gradientFrom: "from-blue-500",
      gradientTo: "to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      lightBg: "bg-blue-50",
      darkBg: "dark:bg-blue-950/50",
      skills: [
        { name: "HTML", level: 95, icon: "FileCode", color: "text-orange-500" },
        { name: "CSS", level: 93, icon: "Palette", color: "text-blue-400" },
        {
          name: "JavaScript",
          level: 90,
          icon: "Code",
          color: "text-yellow-500",
        },
        { name: "React", level: 88, icon: "Layout", color: "text-cyan-500" },
        {
          name: "React Native",
          level: 88,
          icon: "Smartphone",
          color: "text-cyan-500",
        },
        {
          name: "Tailwind CSS",
          level: 92,
          icon: "Wind",
          color: "text-teal-500",
        },
      ],
    },
    {
      title: "Backend Development",
      icon: "Server",
      color: "text-green-500",
      gradientFrom: "from-green-500",
      gradientTo: "to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      lightBg: "bg-green-50",
      darkBg: "dark:bg-green-950/50",
      skills: [
        {
          name: "Node.js",
          level: 85,
          icon: "Terminal",
          color: "text-green-600",
        },
        { name: "Express.js", level: 82, icon: "Zap", color: "text-gray-600" },
        {
          name: "MongoDB",
          level: 80,
          icon: "Database",
          color: "text-green-500",
        },
        { name: "SQL", level: 78, icon: "Database", color: "text-blue-600" },
        { name: "Java", level: 75, icon: "Code2", color: "text-red-500" },
      ],
    },
    {
      title: "Dev Tools & Deployment",
      icon: "Settings",
      color: "text-orange-500",
      gradientFrom: "from-orange-500",
      gradientTo: "to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      lightBg: "bg-orange-50",
      darkBg: "dark:bg-orange-950/50",
      skills: [
        { name: "Git", level: 92, icon: "GitBranch", color: "text-orange-600" },
        { name: "GitHub", level: 90, icon: "Github", color: "text-purple-600" },
        { name: "Postman", level: 85, icon: "Send", color: "text-orange-500" },
        {
          name: "Vercel",
          level: 80,
          icon: "Globe",
          color: "text-black dark:text-white",
        },
        { name: "Render", level: 78, icon: "Server", color: "text-blue-600" },
        { name: "VS Code", level: 95, icon: "Code", color: "text-blue-500" },
        {
          name: "Android Studio",
          level: 85,
          icon: "Smartphone",
          color: "text-green-500",
        },
      ],
    },
    {
      title: "Core Competencies",
      icon: "Brain",
      color: "text-purple-500",
      gradientFrom: "from-purple-500",
      gradientTo: "to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      lightBg: "bg-purple-50",
      darkBg: "dark:bg-purple-950/50",
      skills: [
        {
          name: "Problem Solving",
          level: 88,
          icon: "Lightbulb",
          color: "text-yellow-500",
        },
        {
          name: "REST APIs",
          level: 80,
          icon: "Network",
          color: "text-green-500",
        },
        {
          name: "Responsive Design",
          level: 90,
          icon: "Smartphone",
          color: "text-blue-500",
        },
        {
          name: "Performance Opt.",
          level: 85,
          icon: "Zap",
          color: "text-orange-500",
        },
      ],
    },
  ];

  const overallStats = [
    {
      label: "Learning & Industry Experience",
      value: "1+ Years",
      icon: ClockIcon,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Projects Completed",
      value: "8+",
      icon: Layers,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Technologies",
      value: "15+",
      icon: Cpu,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Commits",
      value: "2K+",
      icon: Code,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary/5 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 blur-3xl"></div>
        <div className="absolute w-40 h-40 rounded-full top-1/4 left-1/4 bg-blue-500/10 blur-2xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full bottom-1/3 right-1/3 w-60 h-60 bg-pink-500/10 blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 container-brand">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <motion.div
                className="absolute w-4 h-4 rounded-full -top-1 -right-1 bg-primary"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="px-3 py-1 text-sm font-semibold rounded-full text-primary bg-primary/10">
              TECHNICAL EXPERTISE
            </span>
          </div>

          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-foreground">
            Skills &
            <span className="relative ml-4">
              <span className="relative z-10">Proficiencies</span>
              <motion.span
                className="absolute left-0 right-0 h-3 bottom-2 bg-primary/20 -rotate-1"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-muted-foreground">
            A comprehensive skill set spanning the full development lifecycle,
            from user experience design to scalable backend architecture.
          </p>
        </motion.div>

        {/* Overall Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 gap-4 mb-16 lg:grid-cols-4"
        >
          {overallStats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 group-hover:opacity-100 rounded-2xl"></div>
              <div className="relative p-6 transition-all duration-300 border rounded-2xl bg-card/50 border-border/50 backdrop-blur-sm hover:shadow-xl">
                <div
                  className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="mb-1 text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-6 mb-20 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories?.map((category, categoryIndex) => (
            <motion.div
              key={category?.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCategory(categoryIndex)}
              onMouseLeave={() => setHoveredCategory(null)}
              className="relative cursor-pointer group"
            >
              {/* Card Container */}
              <div className="relative h-full overflow-hidden transition-all duration-500 border shadow-lg bg-gradient-to-b from-card to-card/80 border-border/50 rounded-2xl hover:shadow-2xl hover:-translate-y-2">
                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradientFrom.replace("from-", "from-")} ${category.gradientTo.replace("to-", "to-")}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                {/* Content */}
                <div className="p-6">
                  {/* Category Header */}
                  <div className="flex items-center mb-6 space-x-3">
                    <div
                      className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 relative`}
                    >
                      <Icon
                        name={category?.icon}
                        size={24}
                        className={category?.color}
                      />
                      <motion.div
                        className="absolute w-3 h-3 bg-green-500 rounded-full -top-1 -right-1"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold transition-colors duration-300 text-foreground group-hover:text-primary">
                        {category?.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {category.skills.length} Technologies
                      </p>
                    </div>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-4">
                    {category?.skills?.map((skill, skillIndex) => (
                      <motion.div
                        key={skill?.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        viewport={{ once: true }}
                        className="group/skill"
                        onMouseEnter={() =>
                          setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                        }
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon
                              name={skill?.icon}
                              size={14}
                              className={`${skill.color || "text-muted-foreground"} group-hover/skill:scale-110 transition-transform duration-200`}
                            />
                            <span className="text-sm font-medium text-foreground">
                              {skill?.name}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-primary">
                            {skill?.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-muted/30 rounded-full h-1.5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill?.level}%` }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                            viewport={{ once: true }}
                            className={`h-full rounded-full bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} relative`}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>

                            {/* Animated pulse on hover */}
                            {hoveredSkill ===
                              `${categoryIndex}-${skillIndex}` && (
                              <motion.div
                                className="absolute inset-0 bg-white/30"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer with category stats */}
                  <div className="pt-4 mt-6 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-muted-foreground">
                          Avg.{" "}
                          {(
                            category.skills.reduce(
                              (acc, s) => acc + s.level,
                              0,
                            ) / category.skills.length
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <motion.a
                        href="/skills"
                        className="inline-flex items-center gap-1 font-medium transition-colors duration-200 text-primary hover:text-primary/80"
                        whileHover={{ x: 3 }}
                      >
                        <span>Explore</span>
                        <Icon name="ArrowRight" size={12} />
                      </motion.a>
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.gradientFrom} ${category.gradientTo}/5 rounded-bl-3xl`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>

          <div className="relative p-12 overflow-hidden text-center text-white border bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 rounded-3xl border-white/10">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary/20 blur-3xl"></div>
              <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <span className="px-3 py-1 text-sm font-semibold rounded-full text-primary-300 bg-white/10">
                  OPEN FOR OPPORTUNITIES
                </span>
              </div>

              <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                Let's Build Something Amazing Together!
              </h3>

              <p className="max-w-2xl mx-auto mb-8 text-lg text-white/80">
                I'm a passionate full-stack developer with expertise in modern
                web technologies. If you have an idea or project in mind, I'd
                love to collaborate and bring it to life with clean code and
                creative design.
              </p>

              <div className="flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative inline-flex items-center gap-2 px-8 py-4 overflow-hidden font-semibold text-gray-900 transition-all duration-300 bg-white group rounded-xl hover:shadow-xl"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <Icon name="MessageCircle" size={18} />
                  <span>Let's Connect</span>
                </motion.a>

                <motion.a
                  href="/skills"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-white transition-all duration-300 border-2 border-white/30 rounded-xl hover:bg-white/10"
                >
                  <Icon name="Code" size={18} />
                  <span>View All Skills</span>
                </motion.a>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 pt-8 mt-8 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white/60">8+ Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-white/60">Global Clients</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-white/60">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillPreviewSection;
