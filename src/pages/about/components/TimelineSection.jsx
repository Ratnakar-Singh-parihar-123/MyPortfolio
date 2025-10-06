import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const TimelineSection = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const timelineData = [
    {
      id: 1,
      year: "2025",
      title: "Bachelor of Technology (B.Tech) in Computer Science Engineering",
      institution: "IES University, Bhopal",
      location: "Madhya Pradesh, India",
      description:
        "Currently pursuing my final year of B.Tech in Computer Science Engineering at IES University, Bhopal. Throughout my degree, I have developed a strong foundation in full-stack web development, data structures, and modern JavaScript frameworks. My primary focus is on mastering the MERN stack to build scalable, high-performance web applications.",
      achievements: [
        "Developed and deployed multiple real-world full-stack projects using the MERN stack",
        "Designed responsive, user-friendly interfaces with React.js and Tailwind CSS",
        "Implemented secure RESTful APIs using Node.js and Express.js",
        "Integrated MongoDB for efficient data storage and management",
        "Actively improving problem-solving and debugging skills through daily coding challenges",
      ],
      technologies: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
        "Git & GitHub",
        "JavaScript (ES6+)",
      ],
      image:
        "https://content.jdmagicbox.com/comp/bhopal/65/0755p755std2700465/catalogue/ies-university-bhopal-kalkheda-bhopal-institutes-9h4364j1aw.jpg",
      icon: "GraduationCap",
      color: "primary",
    },
    {
      id: 2,
      year: "2023",
      title: "Personal Projects & Skill Development",
      institution: "Self-Learning & Online Platforms",
      location: "Remote / Online",
      description:
        "Dedicated an entire year to mastering full-stack web development through self-learning, real-world projects, and consistent practice. Focused on building scalable, user-friendly applications while exploring the complete MERN ecosystem and deployment workflows.",
      achievements: [
        "Developed full-stack projects including YammiVerse (Recipe App) and LocalKart (Hyperlocal Marketplace)",
        "Learned and applied responsive UI design principles using Tailwind CSS",
        "Implemented secure user authentication, RESTful APIs, and database integration",
        "Deployed production-ready applications using Render and Vercel",
        "Built a strong foundation in problem-solving and real-world debugging",
      ],
      technologies: [
        "React.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Git & GitHub",
        "REST APIs",
      ],
      image:
        "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=1000&q=80",
      icon: "Code2",
      color: "accent",
    },
    {
      id: 3,
      year: "2022",
      title: "Frontend Foundations",
      institution: "Self-Learning & Online Resources",
      location: "Remote / Online",
      description:
        "Started my journey into web development by building a strong foundation in frontend technologies. Focused on mastering HTML, CSS, and JavaScript fundamentals to create visually appealing and responsive websites, while developing a passion for clean design and structured code.",
      achievements: [
        "Built my first personal portfolio website from scratch",
        "Learned responsive design using Flexbox and CSS Grid",
        "Explored JavaScript fundamentals including DOM manipulation and events",
        "Developed a strong understanding of semantic HTML and clean coding practices",
        "Gained early exposure to design thinking and user experience principles",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "VS Code", "Git"],
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
      icon: "Monitor",
      color: "warning",
    },
    {
      id: 4,
      year: "2019",
      title: "Higher Secondary Education (Science Stream)",
      institution: "Saraswati Higher Secondary School, Nagod",
      location: "Satna, Madhya Pradesh, India",
      description:
        "Completed my higher secondary education with a focus on Science and Mathematics at Saraswati Higher Secondary School, Nagod. It was during this time that I developed a deep interest in computers, technology, and problem-solving — laying the foundation for my journey into web development and software engineering.",
      achievements: [
        "Excelled in core subjects including Physics, Chemistry, and Mathematics",
        "Participated in school-level coding and technical quiz competitions",
        "Discovered a strong passion for programming and digital innovation",
        "Started experimenting with HTML and basic computer networking concepts",
      ],
      technologies: ["Java", "HTML", "MS Office", "Basic Programming"],
      image:
        "https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqqlofVT1QWwGe8yuCzV6ZoF_9_OheIwhFuB0KIMdTuBrIAzW3Qw7vMrBggRuIMvt6gkqwTR26R6vfh4rKFQSMyONv1uHci97dMGwKN31NunwYVIhyNx5XcJmBYnx3bmzYKU4xz=s1360-w1360-h1020-rw",
      icon: "School",
      color: "success",
    },
  ];

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section className="py-20 bg-background">
      <div className="container-brand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            My Learning Journey 🎓
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of how I started my journey from school days to becoming
            a passionate full-stack web developer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-2 md:-translate-x-2 z-10">
                  <div
                    className={`w-4 h-4 rounded-full border-4 border-background bg-${item.color} shadow-lg`}
                  ></div>
                </div>

                {/* Card */}
                <div
                  className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 bg-${item.color}/10 rounded-lg flex items-center justify-center`}
                        >
                          <Icon
                            name={item.icon}
                            size={20}
                            className={`text-${item.color}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.year} — {item.institution}
                          </p>
                        </div>
                      </div>
                      <Icon
                        name={
                          expandedItem === item.id ? "ChevronUp" : "ChevronDown"
                        }
                        size={18}
                        className="text-muted-foreground"
                      />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {item.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {item.technologies.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                          +{item.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Expand Content */}
                    <AnimatePresence>
                      {expandedItem === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border pt-4 mt-4"
                        >
                          <Image
                            src={item.image}
                            alt={item.title}
                            className="w-full h-44 object-cover rounded-lg mb-4"
                          />
                          <h4 className="text-sm font-semibold text-foreground mb-2">
                            Highlights
                          </h4>
                          <ul className="space-y-2">
                            {item.achievements.map((ach, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-muted-foreground"
                              >
                                <Icon
                                  name="CheckCircle"
                                  size={16}
                                  className="text-success mt-0.5"
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
