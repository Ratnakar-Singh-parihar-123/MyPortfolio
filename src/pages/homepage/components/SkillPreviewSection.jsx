import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const SkillPreviewSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "Monitor",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      borderColor: "border-blue-200 dark:border-blue-700",
      skills: [
        { name: "HTML", level: 95, icon: "FileCode" },
        { name: "CSS", level: 93, icon: "Palette" },
        { name: "JavaScript", level: 90, icon: "Code" },
        { name: "React", level: 88, icon: "Layout" },
        { name: "Tailwind CSS", level: 92, icon: "Wind" },
      ],
    },
    {
      title: "Backend Development",
      icon: "Server",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      borderColor: "border-green-200 dark:border-green-700",
      skills: [
        { name: "Node.js", level: 85, icon: "Terminal" },
        { name: "Express.js", level: 82, icon: "Zap" },
        { name: "MongoDB", level: 80, icon: "Database" },
        { name: "SQL", level: 78, icon: "Database" },
        { name: "Java", level: 75, icon: "Code2" },
      ],
    },
    {
      title: "Dev Tools & Deployment",
      icon: "Settings",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      borderColor: "border-orange-200 dark:border-orange-700",
      skills: [
        { name: "Git", level: 92, icon: "GitBranch" },
        { name: "GitHub", level: 90, icon: "Github" },
        { name: "Postman", level: 85, icon: "Send" },
        { name: "Vercel", level: 80, icon: "Globe" },
        { name: "Render", level: 78, icon: "Server" },
        { name: "VS Code", level: 95, icon: "Code" },
      ],
    },
    {
      title: "Other Skills",
      icon: "Brain",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      borderColor: "border-purple-200 dark:border-purple-700",
      skills: [
        { name: "Problem Solving", level: 88, icon: "Lightbulb" },
        { name: "UI/UX Understanding", level: 82, icon: "MonitorSmartphone" },
        { name: "REST APIs", level: 80, icon: "Network" },
        { name: "Responsive Design", level: 90, icon: "Smartphone" },
      ],
    },
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container-brand">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Technical Expertise
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning the full development lifecycle,
            from user experience design to scalable backend architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <motion.div
              key={category?.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className={`bg-card border ${category?.borderColor} rounded-xl p-6 hover:shadow-lg transition-all duration-300 group`}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div
                  className={`w-12 h-12 ${category?.bgColor} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon
                    name={category?.icon}
                    size={24}
                    className={category?.color}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg">
                    {category?.title}
                  </h3>
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
                    className="group/skill cursor-pointer"
                    onMouseEnter={() =>
                      setHoveredSkill(`${categoryIndex}-${skillIndex}`)
                    }
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon
                          name={skill?.icon}
                          size={16}
                          className="text-muted-foreground group-hover/skill:text-foreground transition-colors duration-200"
                        />
                        <span className="text-sm font-medium text-foreground">
                          {skill?.name}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {skill?.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill?.level}%` }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full transition-all duration-300 ${
                          hoveredSkill === `${categoryIndex}-${skillIndex}`
                            ? "bg-primary shadow-sm"
                            : "bg-primary/80"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View More Link */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="mt-6 pt-4 border-t border-border"
              >
                <a
                  href="/skills"
                  className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200"
                >
                  <span>Explore {category?.title}</span>
                  <Icon name="ArrowRight" size={14} />
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-brand rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">
              Let’s Build Something Amazing Together!
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              I’m a final-year student passionate about full-stack development.
              If you have an idea or project in mind, I’d love to collaborate
              and bring it to life with clean code and creative design.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors duration-200"
              >
                <Icon name="MessageCircle" size={18} />
                <span>Let’s Connect</span>
              </a>
              <a
                href="/skills"
                className="inline-flex items-center space-x-2 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
              >
                <Icon name="Code" size={18} />
                <span>Explore My Skills</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillPreviewSection;
