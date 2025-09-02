import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import SkillsPreview from "./components/SkillsPreview";
import FeaturedAchievements from "./components/FeaturedAchievements";
import FeaturedProjects from "./components/FeaturedProjects";
// import CurrentlyLearning from "./components/CurrentlyLearning";
// import SocialProof from "./components/SocialProof";
import Icon from "../../components/AppIcon";

const HomepageDeveloperPortfolioHeroExperience = () => {
  /* ───────── smooth-scroll for hash links ───────── */
  useEffect(() => {
    const handleSmoothScroll = e => {
      const target = e.target.getAttribute("href");
      if (target && target.startsWith("#")) {
        e.preventDefault();
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(l => l.addEventListener("click", handleSmoothScroll));
    return () => links.forEach(l => l.removeEventListener("click", handleSmoothScroll));
  }, []);

  return (
    <>
      {/* ──────────────── META / SEO ──────────────── */}
      <Helmet>
        <link rel="icon" href="/home-button.png" />
        <title>
          Ratnakar Singh Parihar - Full-Stack Developer &amp; Problem Solver |
          Portfolio
        </title>
        <meta
          name="description"
          content="Experienced Full-Stack Developer specializing in React, JavaScript, and modern web technologies. Building scalable applications with clean, maintainable code."
        />
        <meta
          name="keywords"
          content="React Developer, Full-Stack Developer, JavaScript, TypeScript, Web Development"
        />
        <meta name="author" content="Ratnakar Singh Parihar" />
        {/* Open Graph + Twitter tags omitted for brevity – keep yours here */}
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        {/* ──────────────── MAIN ──────────────── */}
        <main>
          <section id="hero">
            <HeroSection />
          </section>

          <section id="skills-preview">
            <SkillsPreview />
          </section>

          <section id="projects">
            <FeaturedProjects />
          </section>

          <section id="achievements">
            <FeaturedAchievements />
          </section>

          {/* <section id="learning"><CurrentlyLearning /></section> */}
          {/* <section id="social-proof"><SocialProof /></section> */}
        </main>

        {/* ──────────────── FOOTER ──────────────── */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-6 lg:px-8 grid md:grid-cols-4 gap-8">
            {/* brand */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg grid place-content-center">
                  <span className="text-white font-bold text-sm">RSP</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">
                    Ratnakar Singh Parihar
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Full-Stack Developer
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground max-w-md">
                Passionate about creating exceptional digital experiences
                through clean code, innovative solutions, and continuous
                learning.
              </p>

              <div className="flex space-x-4">
                {[
                  {
                    name: "Github",
                    href: "https://github.com/Ratnakar-Singh-parihar-123"
                  },
                  {
                    name: "Linkedin",
                    href:
                      "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
                  },
                  { name: "Twitter", href: "https://x.com/RatnakarSi85551" },
                  { name: "Mail", href: "mailto:ratnakarsinghparihar9399@gmail.com" }
                ].map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label={s.name}
                  >
                    <Icon name={s.name} size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* quick links */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Quick Links
              </h3>
              {[
                { label: "About", to: "/about-professional-story-journey" },
                {
                  label: "Skills",
                  to: "/skills-laboratory-interactive-technical-showcase"
                },
                {
                  label: "Projects",
                  to: "/projects-gallery-development-portfolio-showcase"
                },
                {
                  label: "Achievements",
                  to: "/achievements-center-credibility-growth-documentation"
                },
                {
                  label: "Contact",
                  to: "/contact-gateway-professional-connection-hub"
                }
              ].map(l => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* contact info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Get In Touch
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span className="text-sm">Bhopal, Madhya Pradesh (India)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span className="text-sm">
                    ratnakarsinghparihar9399@gmail.com
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span className="text-sm">+91&nbsp;939&nbsp;974&nbsp;1051</span>
                </div>
              </div>
            </div>
          </div>

          {/* bottom bar */}
          <div className="container mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RSP. All rights reserved.
            </span>

            <div className="flex space-x-4">
              {[
                {
                  name: "Github",
                  href: "https://github.com/Ratnakar-Singh-parihar-123"
                },
                {
                  name: "Linkedin",
                  href:
                    "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
                },
                { name: "Twitter", href: "https://x.com/RatnakarSi85551" },
                { name: "Mail", href: "mailto:ratnakarsinghparihar9399@gmail.com" }
              ].map(s => (
                <a
                  key={s.name}
                  href={s.href}
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={s.name}
                >
                  <Icon name={s.name} size={20} />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomepageDeveloperPortfolioHeroExperience;
