import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const CTASection = () => {
  const contactMethods = [
    {
      icon: "Mail",
      label: "Email",
      value: "ratnakarsinghparihar9399@gmail.com",
      href: "mailto:ratnakarsinghparihar9399@gmail.com",
      description: "Feel free to reach out anytime!",
    },
    {
      icon: "Linkedin",
      label: "LinkedIn",
      value: "Let's Connect Professionally",
      href: "https://linkedin.com/in/ratnakar-singh-parihar",
      description: "Let's grow and learn together 🚀",
    },
    {
      icon: "Github",
      label: "GitHub",
      value: "Explore My Code",
      href: "https://github.com/Ratnakar-Singh-parihar-123",
      description: "Check out my open-source projects",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-primary/20 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/20 blur-[120px] rounded-full -z-10"></div>

      <div className="relative z-10 container-brand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
            Let’s Build Something Great Together 🚀
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground">
            I’m a Computer Science Engineering graduate and a Full Stack & React
            Native Developer passionate about crafting scalable web and mobile
            applications. I turn ideas into fast, modern, and user-friendly
            digital experiences through clean code, innovative solutions, and
            thoughtful design.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col items-center p-6 text-center transition-all duration-300 border bg-card border-border rounded-2xl hover:shadow-xl hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 transition-colors rounded-xl bg-primary/10 group-hover:bg-primary/20">
                <Icon name={method.icon} size={22} className="text-primary" />
              </div>
              <h4 className="mb-1 text-lg font-semibold transition text-foreground group-hover:text-primary">
                {method.label}
              </h4>
              <p className="mb-1 text-sm text-muted-foreground">
                {method.value}
              </p>
              <span className="text-xs text-muted-foreground/80">
                {method.description}
              </span>
            </motion.a>
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl p-10 mx-auto text-center text-white shadow-2xl bg-gradient-brand rounded-2xl"
        >
          <h3 className="mb-4 text-2xl font-bold md:text-3xl">
            Open to Internship, Full-Time, and Freelance Opportunities 💼
          </h3>

          <p className="max-w-2xl mx-auto mb-6 leading-relaxed text-white/90">
            I’m a passionate Full Stack & React Native Developer, excited to
            contribute to projects that make a real impact. From building
            responsive web apps to cross-platform mobile solutions, I bring
            clean code, scalable architecture, and innovative ideas to the
            table. If you’re looking for someone driven and collaborative —
            let’s connect!
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="secondary"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() =>
                (window.location.href =
                  "mailto:ratnakarsinghparihar9399@gmail.com")
              }
            >
              Send a Message
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="FolderOpen"
              iconPosition="left"
              className="text-white border-white/30 hover:bg-white/10"
              onClick={() => (window.location.href = "/projects")}
            >
              View My Projects
            </Button>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-8 mt-16 text-center border-t border-border"
        >
          <p className="mb-2 text-sm text-muted-foreground">
            Let’s turn your ideas into impactful digital solutions.
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-foreground">
              Ratnakar Singh Parihar
            </span>{" "}
            — Built with ❤️ using React & Tailwind CSS
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
