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
    <section className="relative overflow-hidden py-20 bg-gradient-to-b from-primary/10 via-background to-background">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-60 h-60 bg-primary/20 blur-[100px] rounded-full -z-10"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-accent/20 blur-[120px] rounded-full -z-10"></div>

      <div className="container-brand relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Let’s Build Something Great Together 🚀
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            I’m a final-year Computer Science student and an aspiring MERN Stack
            Developer passionate about creating meaningful digital experiences.
            Whether it’s a small idea or a big vision — let’s make it real!
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon name={method.icon} size={22} className="text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition">
                {method.label}
              </h4>
              <p className="text-sm text-muted-foreground mb-1">
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
          className="bg-gradient-brand text-white rounded-2xl shadow-2xl p-10 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Open to internship, full-time, and freelance opportunities in web development. 💼
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
            I’m currently looking for opportunities to apply my MERN stack
            skills in real-world projects. If you’re hiring or have something
            exciting in mind — I’d love to connect and contribute!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() =>
                (window.location.href = "mailto:ratnakarsinghparihar9399@gmail.com")
              }
            >
              Send a Message
            </Button>
            <Button
              variant="outline"
              size="lg"
              iconName="FolderOpen"
              iconPosition="left"
              className="border-white/30 text-white hover:bg-white/10"
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
          className="text-center mt-16 border-t border-border pt-8"
        >
          <p className="text-sm text-muted-foreground mb-2">
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