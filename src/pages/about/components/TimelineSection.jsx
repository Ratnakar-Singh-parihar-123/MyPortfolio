import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import schoolImg from "../../../assets/schoolImg/schoolImg.webp";

const TimelineSection = () => {
  const [expanded, setExpanded] = useState(null);

  const COLORS = {
    primary:
      "from-blue-500/30 via-blue-500/10 to-blue-500/5 text-blue-400 border-blue-400/40 shadow-[0_0_20px_rgba(0,115,255,0.35)]",
    accent:
      "from-purple-500/30 via-purple-500/10 to-purple-500/5 text-purple-400 border-purple-400/40 shadow-[0_0_20px_rgba(170,0,255,0.35)]",
    warning:
      "from-yellow-500/30 via-yellow-500/10 to-yellow-500/5 text-yellow-400 border-yellow-400/40 shadow-[0_0_20px_rgba(255,200,0,0.35)]",
    success:
      "from-green-500/30 via-green-500/10 to-green-500/5 text-green-400 border-green-400/40 shadow-[0_0_20px_rgba(0,255,100,0.35)]",
  };

  const timeline = [
    {
      id: 1,
      year: "2022-2026",
      title: "B.Tech – Computer Science Engineering",
      institution: "IES University, Bhopal",
      icon: "GraduationCap",
      color: "primary",
      description:
        "Completed B.Tech in Computer Science Engineering with specialization in MERN stack, full-stack development, and scalable web applications.",
      achievements: [
        "Built advanced MERN stack projects",
        "Developed full-stack applications",
        "Mastered Authentication, JWT & REST APIs",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "JavaScript",
        "REST APIs",
        "JWT",
      ],
      image:
        "https://media.licdn.com/dms/image/v2/C511BAQFoeRqNJ3j_sw/company-background_10000/company-background_10000/0/1584491150389/ies_university_cover?e=2147483647&v=beta&t=sIBh9oqB6PY6yuI8VyOM-VS9i9KiPJiBp3gNlUFcBrY",
    },
  ];

  const toggle = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* ✨ Floating Particles Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-primary/10 blur-[120px] rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Subtle cyber grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(90deg,#fff1_1px,transparent_1px),linear-gradient(#fff1_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 container-brand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,150,255,0.4)]">
            My Learning Timeline
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A premium futuristic timeline showcasing skills, growth &
            achievements
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical neon line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-primary via-accent to-success shadow-[0_0_25px_rgba(0,225,255,0.5)] rounded-full"></div>

          {/* Timeline Cards */}
          <div className="space-y-32">
            {timeline.map((item, idx) => {
              const reverse = idx % 2 !== 0;
              const color = COLORS[item.color];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 70 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className={`relative flex ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-start`}
                >
                  {/* Node Dot */}
                  <motion.div
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ repeat: Infinity, duration: 2.4 }}
                    className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border-4 border-background bg-gradient-to-br ${color}`}
                  />

                  {/* Card */}
                  <div
                    className={`w-full md:w-5/12 mt-4 ${
                      reverse ? "md:pl-20" : "md:pr-20"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -10, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="relative p-8 border shadow-2xl cursor-pointer bg-white/5 backdrop-blur-xl border-white/10 rounded-2xl group"
                      onClick={() => toggle(item.id)}
                    >
                      {/* Soft glow */}
                      <div className="absolute inset-0 transition-all opacity-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent group-hover:opacity-10"></div>

                      {/* Header */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}
                          >
                            <Icon name={item.icon} size={24} />
                          </div>

                          <div>
                            <h3 className="text-xl font-semibold">
                              {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {item.year} — {item.institution}
                            </p>
                          </div>
                        </div>

                        <Icon
                          name={
                            expanded === item.id ? "ChevronUp" : "ChevronDown"
                          }
                          size={22}
                          className="text-muted-foreground"
                        />
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {item.technologies.map((tech, t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expanded === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.45 }}
                            className="pt-6 border-t border-white/10"
                          >
                            <Image
                              src={item.image}
                              className="object-cover w-full h-56 mb-4 rounded-xl"
                            />

                            <h4 className="mb-2 font-semibold">Highlights</h4>
                            <ul className="space-y-2">
                              {item.achievements.map((ach, a) => (
                                <li
                                  key={a}
                                  className="flex gap-2 text-sm text-muted-foreground"
                                >
                                  <Icon
                                    name="CheckCircle"
                                    size={16}
                                    className="text-green-400 mt-0.5"
                                  />
                                  {ach}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
