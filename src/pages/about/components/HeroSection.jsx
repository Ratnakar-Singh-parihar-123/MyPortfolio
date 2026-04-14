import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import AboutImg from "../../../assets/about/about.jpeg";
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
      value: "2+",
      label: "Years Practical Experience",
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
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Interactive Background Grid */}
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black"></div>

      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -30, 30, -30],
              x: [null, 30, -30, 30],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl min-h-screen flex items-center py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* LEFT CONTENT - Enhanced Premium Design */}
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
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                  OPEN FOR OPPORTUNITIES
                </span>
              </div>
            </motion.div>

            {/* Name with Gradient Animation */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl text-gray-900 dark:text-white"
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
                <span className="text-sm"> Bhopal, Madhya Pradesh ,India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Available for work
                </span>
              </div>
            </motion.div>

            {/* Title with Icon Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              <p className="text-xl text-gray-700 dark:text-gray-300 pl-4 leading-relaxed">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Full Stack & React Native Developer
                </span>{" "}
                crafting high-performance web and mobile applications that
                combine modern architecture, intuitive design, and exceptional
                user experiences.
              </p>
            </motion.div>

            {/* Description with Typing Effect */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              I craft high-quality web and mobile applications using the MERN
              stack and React Native, turning complex problems into seamless,
              user-friendly solutions. My focus on clean architecture,
              performance, and scalability ensures applications that truly
              delight users.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links with Tooltips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex gap-3"
            >
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="relative group"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 rounded-xl ${link.bgColor} flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-white transition-all duration-300 ${link.color}`}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                  {/* Tooltip */}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -2 }}
                  className="text-center p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
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
            <div className="relative w-full max-w-md">
              {/* Profile Card */}
              <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-500">
                {/* Gradient Header */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

                {/* Profile Image */}
                <div className="relative pt-20 px-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden ring-4 ring-white dark:ring-gray-900 shadow-lg"
                  >
                    {!isImageLoaded && (
                      <motion.div
                        animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
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
                      className={`w-full h-full object-cover transition-opacity duration-700 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </motion.div>

                  {/* Profile Info */}
                  <div className="text-center mt-5">
                    <h3
                      className="text-2xl font-semibold text-gray-900 dark:text-white"
                      style={{ fontFamily: "'Dancing Script', cursive" }}
                    >
                      Ratnakar Singh Parihar
                    </h3>

                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      MERN Stack Developer
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        9+
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Projects
                      </div>
                    </div>

                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        1+
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Years Practice
                      </div>
                    </div>

                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        15+
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Skills
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-6 pb-6">
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Hire Me
                    </button>

                    <a
                      href="https://github.com/Ratnakar-Singh-parihar-123"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
