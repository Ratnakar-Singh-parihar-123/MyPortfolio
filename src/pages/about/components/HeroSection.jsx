import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import AboutImg from "../../../assets/heroImg/hero.jpeg";
import {
  Sparkles,
  ArrowRight,
  Download,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Briefcase,
  Award,
  MapPin,
  Calendar,
  Heart,
  Zap,
  Shield,
  Star,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("work");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Ratnakar-Singh-parihar-123",
      icon: Github,
      color: "hover:bg-gray-900 hover:text-white",
      bgColor: "bg-gray-100 dark:bg-gray-800",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ratnakarsinghparihar/",
      icon: Linkedin,
      color: "hover:bg-blue-600 hover:text-white",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      name: "Twitter",
      url: "https://x.com/RatnakarSi85551",
      icon: Twitter,
      color: "hover:bg-sky-500 hover:text-white",
      bgColor: "bg-sky-100 dark:bg-sky-900/30",
    },
    {
      name: "Email",
      url: "mailto:ratnakarsinghparihar9399@gmail.com",
      icon: Mail,
      color: "hover:bg-red-500 hover:text-white",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ];

  const stats = [
    { value: "8+", label: "Projects", icon: Briefcase, color: "text-blue-500" },
    {
      value: "1+",
      label: "Years of Learning & Industry Experience",
      icon: Calendar,
      color: "text-purple-500",
    },
    {
      value: "15+",
      label: "Technologies",
      icon: Code,
      color: "text-green-500",
    },
    { value: "100%", label: "Commitment", icon: Heart, color: "text-pink-500" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Interactive Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          className="absolute rounded-full -top-40 -right-40 w-96 h-96 bg-blue-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
          className="absolute rounded-full -bottom-40 -left-40 w-96 h-96 bg-purple-500/30 blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * 0.015,
            y: mousePosition.y * -0.015,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/40 dark:bg-blue-300/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -40, 40, -40],
              x: [null, 40, -40, 40],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container relative flex items-center min-h-screen px-4 py-20 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid items-center w-full gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-blue-500/20">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -top-1 -right-1 dark:border-gray-900"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <span className="px-5 py-2.5 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-blue-100/50 dark:bg-blue-900/30 backdrop-blur-sm rounded-full border border-blue-200/50 dark:border-blue-800/30 shadow-lg">
                  ✨ OPEN FOR OPPORTUNITIES
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl text-gray-900 sm:text-6xl lg:text-7xl dark:text-white drop-shadow-sm"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Ratnakar Singh
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-300% animate-gradient">
                  Parihar
                </span>
              </motion.h2>
            </div>

            {/* Location & Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">
                  Bhopal, Madhya Pradesh ,India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                </span>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Title with decorative bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute w-1 h-14 -translate-y-1/2 rounded-full -left-4 top-1/2 bg-gradient-to-b from-blue-500 to-purple-500 shadow-[0_0_16px_rgba(59,130,246,0.4)]" />
              <p className="pl-4 text-xl leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Full Stack & React Native Developer
                </span>{" "}
                crafting high-performance web and mobile applications that
                combine modern architecture, intuitive design, and exceptional
                user experiences.
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="max-w-xl leading-relaxed text-gray-500 dark:text-gray-400"
            >
              I craft high-quality web and mobile applications using the MERN
              stack and React Native, turning complex problems into seamless,
              user-friendly solutions. My focus on clean architecture,
              performance, and scalability ensures applications that truly
              delight users.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col gap-4 pt-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-300 shadow-lg group bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <span className="relative flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  View Projects
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 font-semibold text-gray-900 transition-all duration-300 bg-white border-2 border-gray-200 shadow-md group dark:bg-gray-800 dark:text-white rounded-xl dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex gap-3"
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="relative group"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl ${link.bgColor} flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 ${link.color} shadow-md hover:shadow-lg`}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                  <span className="absolute px-2 py-1 text-xs text-white transition-opacity duration-300 -translate-x-1/2 bg-gray-900 rounded shadow-lg opacity-0 -top-8 left-1/2 group-hover:opacity-100 whitespace-nowrap">
                    {link.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-2 gap-4 pt-6 sm:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-3 text-center transition-all duration-300 border shadow-sm bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border-gray-200/60 dark:border-gray-700/60 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Premium Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md group">
              {/* Glow behind card */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute transition-opacity duration-500 -inset-4 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-2xl opacity-30 group-hover:opacity-50"
              />

              {/* Main Card */}
              <div className="relative overflow-hidden transition-all duration-500 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/50 rounded-3xl shadow-2xl hover:shadow-[0_20px_80px_rgba(59,130,246,0.3)] dark:hover:shadow-[0_20px_80px_rgba(59,130,246,0.2)] group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:rotate-1">
                {/* Animated border */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                      "linear-gradient(360deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)",
                    ],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-3xl p-[2px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-70"
                />

                {/* Inner content */}
                <div className="relative p-6 bg-white dark:bg-gray-900 rounded-3xl sm:p-8">
                  {/* Decorative top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl" />

                  {/* Profile Header */}
                  <div className="relative flex flex-col items-center">
                    {/* Avatar with rings */}
                    <div className="relative">
                      <motion.div
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute border-2 rounded-full -inset-4 border-purple-500/30 dark:border-purple-400/30"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                        className="absolute border rounded-full -inset-6 border-blue-500/20 dark:border-blue-400/20"
                      />

                      <motion.div
                        whileHover={{ scale: 1.08, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative w-32 h-32 overflow-hidden rounded-full shadow-2xl sm:w-36 sm:h-36 ring-4 ring-white/80 dark:ring-gray-800/80"
                      >
                        {!isImageLoaded && (
                          <motion.div
                            animate={{
                              backgroundPosition: ["200% 0", "-200% 0"],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700"
                            style={{ backgroundSize: "200% 100%" }}
                          />
                        )}

                        <Image
                          src={AboutImg}
                          alt="Ratnakar Singh Parihar"
                          className={`w-full h-full object-center transition-opacity duration-700 ${
                            isImageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          onLoad={() => setIsImageLoaded(true)}
                        />

                        {/* Status badge */}
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-lg bottom-1 right-1 dark:border-gray-900"
                        />
                      </motion.div>
                    </div>

                    {/* Name & Title */}
                    <div className="mt-5 text-center">
                      <h3
                        className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white"
                        style={{ fontFamily: "'Dancing Script', cursive" }}
                      >
                        Ratnakar Singh Parihar
                      </h3>

                      <div className="flex items-center justify-center gap-2 mt-1">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                          Full‑Stack Developer
                        </p>
                      </div>

                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="inline-block px-4 py-1 mt-2 text-xs font-semibold tracking-wider text-green-700 bg-green-100 border border-green-200 rounded-full shadow-sm dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                      >
                        ✨ Available for opportunities
                      </motion.span>
                    </div>
                  </div>

                  {/* Stats with icons */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    {[
                      { value: "8+", label: "Projects", icon: "🚀" },
                      {
                        value: "1+",
                        label: "Years of Learning & Industry Experience",
                        icon: "📚",
                      },
                      { value: "15+", label: "Skills", icon: "⚡" },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -4, scale: 1.05 }}
                        className="p-3 text-center transition-all duration-300 border bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 group"
                      >
                        <div className="mb-1 text-2xl transition-transform group-hover:scale-110">
                          {stat.icon}
                        </div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 leading-tight">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pb-2 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => scrollToSection("contact")}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <span>💬</span>
                      Hire Me
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="inline-block"
                      >
                        →
                      </motion.span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      href="https://github.com/Ratnakar-Singh-parihar-123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-5 py-3 text-gray-700 transition-all duration-300 bg-gray-100 shadow-md dark:bg-gray-800 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg"
                    >
                      <Icon name="Github" size={20} />
                    </motion.a>
                  </div>

                  {/* Decorative bottom bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-3xl opacity-30" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute z-10 hidden -translate-x-1/2 bottom-8 left-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500"
        >
          <span className="text-xs font-medium tracking-widest uppercase">
            Scroll
          </span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Gradient animation keyframes */}
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
