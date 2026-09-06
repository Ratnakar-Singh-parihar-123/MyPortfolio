import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Briefcase,
  Code2,
  Layers,
  Heart,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Image from "../../../components/AppImage";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup";
import AboutImg from "../../../assets/heroImg/hero.jpeg";

const HeroSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const socialLinks = useMemo(
    () => [
      {
        name: "GitHub",
        url: "https://github.com/Ratnakar-Singh-parihar-123",
        icon: Github,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
        icon: Linkedin,
      },
      {
        name: "Twitter",
        url: "https://x.com/RatnakarSi85551",
        icon: Twitter,
      },
      {
        name: "Email",
        url: "mailto:ratnakarsinghparihar9399@gmail.com",
        icon: Mail,
      },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { value: "8+", label: "Projects Built", icon: Briefcase, color: "text-blue-600 dark:text-blue-400" },
      { value: "300+", label: "DSA Problems Solved", icon: Code2, color: "text-emerald-600 dark:text-emerald-400" },
      { value: "15+", label: "Technologies", icon: Layers, color: "text-purple-600 dark:text-purple-400" },
      { value: "100%", label: "Dedication", icon: Heart, color: "text-rose-600 dark:text-rose-400" },
    ],
    [],
  );

  const developerPillars = useMemo(
    () => [
      {
        title: "Full-Stack Web Development",
        desc: "Building responsive MERN applications with clean React components, robust Node.js APIs, and optimized MongoDB schemas.",
      },
      {
        title: "Cross-Platform Mobile Apps",
        desc: "Crafting fluid iOS and Android experiences using React Native with native-feeling performance.",
      },
      {
        title: "Clean Architecture & Logic",
        desc: "Writing maintainable, modular, and well-structured code with strong algorithmic problem-solving principles.",
      },
    ],
    [],
  );

  // Lock body scroll when resume popup is open
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handlePopupOpen = useCallback(() => setIsPopupOpen(true), []);
  const handlePopupClose = useCallback(() => setIsPopupOpen(false), []);

  return (
    <section className="relative w-full min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-x-hidden bg-background">
      {/* Background Subtle Orbs & Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-5 w-80 h-80 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-1/3 right-5 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* LEFT COLUMN — Visual Profile Card Composition */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Card Container */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-br from-purple-600/25 via-blue-600/25 to-pink-600/25 shadow-xl border border-border/50">
                <div className="relative overflow-hidden rounded-[22px] bg-card p-4 space-y-4">
                  
                  {/* Photo Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/4.8] w-full">
                    <Image
                      src={AboutImg}
                      alt="Ratnakar Singh Parihar"
                      className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                      onLoad={() => setIsImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    
                    {/* Status Pill on Photo */}
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Bhopal, MP, India</span>
                    </div>

                    {/* Photo Footer Label */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-lg font-bold">Ratnakar Singh Parihar</h3>
                      <p className="text-xs text-blue-300 font-medium">Software & Mobile App Engineer</p>
                    </div>
                  </div>

                  {/* Social Links Row */}
                  <div className="flex items-center justify-between pt-1 px-1">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Social Profiles
                    </span>
                    <div className="flex items-center gap-2">
                      {socialLinks.map((social) => {
                        const IconComp = social.icon;
                        return (
                          <a
                            key={social.name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className="p-2 rounded-lg border border-border/80 bg-background/80 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-muted transition-all"
                          >
                            <IconComp className="w-4 h-4" />
                          </a>
                        );
                      })}
                    </div>
                  </div>

                  {/* Stats Grid inside Card */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {stats.map((stat) => {
                      const IconComponent = stat.icon;
                      return (
                        <div
                          key={stat.label}
                          className="p-3 rounded-xl border border-border/60 bg-muted/40 text-center"
                        >
                          <IconComponent className={`w-4 h-4 mx-auto mb-1 ${stat.color}`} />
                          <div className="text-base font-extrabold text-foreground">{stat.value}</div>
                          <div className="text-[11px] text-muted-foreground font-medium leading-tight">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — About Story & Developer Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* About Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>About My Developer Journey</span>
            </motion.div>

            {/* Supporting Headline */}
            <div className="space-y-2 w-full">
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.2]"
              >
                Crafting Scalable Web & Mobile Apps with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 dark:from-purple-400 dark:via-blue-400 dark:to-indigo-400">
                  Purpose & Precision
                </span>
              </motion.h1>
            </div>

            {/* Story Paragraphs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="space-y-3 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl"
            >
              <p>
                I am <strong className="text-foreground font-semibold">Ratnakar Singh Parihar</strong>, a Full-Stack & React Native Developer currently pursuing my B.Tech in Computer Science & Engineering (Graduating 2026).
              </p>
              <p>
                My passion lies in taking complex real-world problems and engineering clean, efficient, and user-friendly digital solutions. From real-time MERN stack platforms like the <strong className="text-foreground font-semibold">Vehicle Service Booking Platform</strong> and <strong className="text-foreground font-semibold">YammiVerse</strong> to cross-platform mobile apps, I bring strong algorithmic thinking and production-minded engineering to every project.
              </p>
            </motion.div>

            {/* Core Developer Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-3 w-full max-w-2xl text-left"
            >
              {developerPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="p-3.5 rounded-xl border border-border/70 bg-card/70 backdrop-blur-sm flex items-start gap-3 transition-all hover:border-purple-500/30"
                >
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{pillar.title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full pt-2 sm:w-auto"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/35 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base group"
                >
                  <span>Let's Work Together</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <button
                type="button"
                onClick={handlePopupOpen}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-foreground bg-card hover:bg-muted border border-border shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 text-purple-500" />
                <span>View Resume</span>
              </button>
            </motion.div>

          </motion.div>

        </div>
      </div>

      {/* Resume Modal */}
      <ResumePopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </section>
  );
};

export default HeroSection;
