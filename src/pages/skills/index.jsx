import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";

const Skills = () => {
  useEffect(() => {
    document.title = "Skills | Ratnakar Singh Parihar";
    window.scrollTo(0, 0);
  }, []);

  const skillSections = [
    {
      title: "Frontend Development",
      icon: "Monitor",
      color: "text-blue-600",
      bg: "bg-blue-50",
      description:
        "I build clean, responsive, and interactive web interfaces using modern technologies focused on user experience and design consistency.",
      skills: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
    },
    {
      title: "Backend Development",
      icon: "Server",
      color: "text-green-600",
      bg: "bg-green-50",
      description:
        "I create robust server-side applications, REST APIs, and handle authentication and data management using Node.js and Express.",
      skills: ["Node.js", "Express.js", "Java", "REST API"],
    },
    {
      title: "Database & Tools",
      icon: "Database",
      color: "text-purple-600",
      bg: "bg-purple-50",
      description:
        "I efficiently manage databases, version control, and deployment tools for smooth and collaborative development workflows.",
      skills: [
        "MongoDB",
        "MySQL",
        "Git & GitHub",
        "Postman",
        "Vercel",
        "Render",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-primary/5 via-background to-background text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            My{" "}
            <span className="text-gradient-brand bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Skills
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Here are the core technologies and tools I’ve learned and practiced
            while building full-stack web projects.
          </p>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-12">
        <div className="container-brand grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl border border-border shadow-sm hover:shadow-lg transition-all duration-300 bg-card`}
            >
              <div className={`absolute inset-0 rounded-xl ${section.bg} opacity-40`} />
              <div className="relative z-10 p-6">
                {/* Header */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-md bg-muted`}>
                    <Icon name={section.icon} size={22} className={section.color} />
                  </div>
                  <h3 className="text-xl font-semibold">{section.title}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {section.description}
                </p>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {section.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1 text-xs font-medium bg-muted text-foreground/80 rounded-full shadow-sm hover:bg-muted/70 transition"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Want to see these skills in action?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Explore my projects where I’ve implemented these technologies to
            build real-world, functional web applications.
          </p>
          <a
            href="/projects"
            className="inline-block px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-white/90 transition-all shadow-md"
          >
            View My Projects
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border bg-foreground text-background text-center">
        <p className="text-sm text-background/80">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">Ratnakar Singh Parihar</span>. All
          rights reserved.
        </p>
        <p className="text-xs text-background/60 mt-1">
          Built with ❤️ using React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default Skills;