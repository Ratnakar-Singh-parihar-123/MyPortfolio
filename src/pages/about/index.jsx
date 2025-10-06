import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import ReadingProgressIndicator from "./components/ReadingProgressIndicator";
import Icon from "../../components/AppIcon"; // ✅ FIXED: Added missing import

const About = () => {
  useEffect(() => {
    // Set page title
    document.title = "About - PortfolioStudio | The Digital Craftsperson";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover the story behind The Digital Craftsperson - my journey, philosophy, and approach to creating meaningful digital experiences through thoughtful design and technical excellence."
      );
    }

    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Page Content */}
      <main className="pt-16">
        <HeroSection />
        <TimelineSection />
        <ReadingProgressIndicator />
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-foreground text-background py-12 mt-20 border-t border-border/30"
      >
        <div className="container-brand">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* Brand Section */}
            <div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">
                Ratnakar<span className="text-primary">.</span>
              </h3>
              <p className="text-background/80 text-sm leading-relaxed max-w-xs">
                Turning ideas into impactful digital experiences through clean
                design, efficient code, and creativity.
              </p>

              {/* Social Icons */}
              <div className="flex space-x-4 mt-5">
                {[
                  {
                    name: "Github",
                    href: "https://github.com/Ratnakar-Singh-parihar-123",
                  },
                  {
                    name: "Linkedin",
                    href: "https://linkedin.com/in/ratnakar-singh-parihar",
                  },
                  {
                    name: "Mail",
                    href: "mailto:ratnakarsinghparihar9399@gmail.com",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md bg-background/10 hover:bg-background/20 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon
                      name={social.name}
                      size={18}
                      className="text-background"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { name: "Home", href: "/homepage" },
                  { name: "Skills", href: "/skills" },
                  { name: "Projects", href: "/projects" },
                  { name: "Achievements", href: "/achievements" },
                  { name: "Contact", href: "/contact" },
                ].map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="text-background/70 hover:text-primary text-sm font-medium transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-background/70 text-sm">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-background">
                  Ratnakar Singh Parihar
                </span>
                . All rights reserved.
              </p>
              <p className="text-xs text-background/50 mt-1">
                Built with ❤️ using React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default About;