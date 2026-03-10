import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import AboutImg from "../../../assets/about/about.jpeg";
// import schoolImg from "../../../assets/schoolImg/schoolImg.webp";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "github", url: "https://github.com/yourusername", icon: "Github" },
    {
      name: "linkedin",
      url: "https://linkedin.com/in/yourusername",
      icon: "Linkedin",
    },
    {
      name: "twitter",
      url: "https://twitter.com/yourusername",
      icon: "Twitter",
    },
    {
      name: "mail",
      url: "mailto:ratnakarsinghparihar9399@gmail.com",
      icon: "Mail",
    },
  ];

  const stats = [
    { value: "8+", label: "Projects", icon: "FolderOpen" },
    { value: "2+", label: "Years handExp", icon: "Calendar" },
    // { value: "260+", label: "LeetCode", icon: "Code" },
    { value: "15+", label: "Skills", icon: "Layers" },
  ];

  const techStack = [
    "React",
    "JavaScript.js",
    "Node.js",
    "MongoDB",
    // "TypeScript",
    "Tailwind",
    "Express",
    "SQL",
    "java",
    // "GraphQL",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: isMobile ? 20 : 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/5 dark:to-purple-400/5"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              x: [null, Math.random() * 100 + "vw"],
              y: [null, Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              filter: "blur(40px)",
            }}
          />
        ))}

        {/* Geometric Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-64 h-64 border-2 border-blue-200/20 dark:border-blue-500/10 rounded-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-16 w-48 h-48 border-2 border-purple-200/20 dark:border-purple-500/10 rounded-full"
        />
      </div>

      <div className="relative container z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-10 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full -top-40 -left-40 animate-pulse"></div>
          <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-3xl rounded-full -bottom-40 -right-40 animate-pulse"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur border px-5 py-3 rounded-full shadow-lg"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              >
                👋
              </motion.div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Hello there! I'm
                </p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  Ratnakar Singh Parihar
                </p>
              </div>
            </motion.div>

            {/* HEADING */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="block text-gray-900 dark:text-white">
                  Crafting
                </span>

                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                  Digital Magic
                </span>

                <span className="block text-gray-900 dark:text-white">
                  With Code
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 dark:text-gray-300"
              >
                Full-Stack Developer • MERN Stack • Problem Solver
              </motion.p>
            </div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              I specialize in building modern web applications using
              <span className="font-semibold text-blue-500"> MERN Stack </span>
              and crafting beautiful UI experiences that users love.
            </motion.p>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              {/* PROJECT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-purple-500/40 transition"
              >
                View My Projects
              </motion.button>

              {/* CONTACT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open(
                    "mailto:ratnakarsinghparihar9399@gmail.com",
                    "_blank",
                  )
                }
                className="bg-white/70 dark:bg-gray-800 border px-8 py-4 rounded-xl font-semibold hover:border-blue-500 transition"
              >
                Get In Touch
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              {/* FLOATING ICONS */}

              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-8 -left-8 bg-white/20 backdrop-blur p-4 rounded-xl"
              >
                ⚛️
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 bg-white/20 backdrop-blur p-4 rounded-xl"
              >
                🟢
              </motion.div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-1/2 -right-10 bg-white/20 backdrop-blur p-4 rounded-xl"
              >
                🍃
              </motion.div>

              {/* PROFILE IMAGE */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-40 blur-xl"></div>

                <div className="relative rounded-3xl overflow-hidden border-8 border-white dark:border-gray-900">
                  <Image
                    src={AboutImg}
                    alt="Ratnakar Singh Parihar"
                    className="w-full h-[500px] sm:h-[600px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-2xl"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
