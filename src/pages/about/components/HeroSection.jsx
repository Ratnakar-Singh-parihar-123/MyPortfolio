import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import AboutImg from "../../../assets/about/about.jpeg";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
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
      url: "https://github.com/ratnakar5938",
      icon: "Github",
      color: "hover:bg-gray-900",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ratnakar5938",
      icon: "Linkedin",
      color: "hover:bg-blue-600",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/ratnakar5938",
      icon: "Twitter",
      color: "hover:bg-sky-500",
    },
    {
      name: "Email",
      url: "mailto:ratnakarsinghparihar9399@gmail.com",
      icon: "Mail",
      color: "hover:bg-red-500",
    },
  ];

  const stats = [
    { value: "8+", label: "Projects Completed", icon: "Briefcase" },
    // { value: "3+", label: "Years Experience", icon: "Award" },
    // { value: "50+", label: "Happy Clients", icon: "Users" },
    { value: "15+", label: "Technologies", icon: "Code" },
  ];

  const techStack = [
    { name: "React", icon: "⚛️", color: "from-cyan-500 to-blue-500" },
    { name: "Node.js", icon: "🟢", color: "from-green-500 to-emerald-500" },
    { name: "MongoDB", icon: "🍃", color: "from-green-600 to-teal-500" },
    // { name: "TypeScript", icon: "🔷", color: "from-blue-600 to-indigo-500" },
    // { name: "Next.js", icon: "▲", color: "from-gray-900 to-gray-700" },
    { name: "Tailwind", icon: "🎨", color: "from-sky-400 to-cyan-400" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Animated Background with Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-full -top-40 -left-40 blur-3xl"
        />
        <motion.div
          animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
          className="absolute w-[600px] h-[600px] bg-gradient-to-l from-orange-600/20 via-red-600/20 to-yellow-600/20 rounded-full -bottom-40 -right-40 blur-3xl"
        />

        {/* Animated Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isMobile ? "#ccc" : "#888"} 1px, transparent 0)`,
            backgroundSize: "50px 50px",
            opacity: 0.1,
          }}
        />

        {/* Floating Particles */}
        {Array.from({ length: isMobile ? 15 : 25 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-400/10 dark:to-purple-400/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 150 + 50 + "px",
              height: Math.random() * 150 + 50 + "px",
              filter: "blur(50px)",
            }}
          />
        ))}
      </div>

      <div className="relative container z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-20">
          {/* LEFT CONTENT - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity },
                  }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl shadow-lg"
                >
                  👋
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-blue-500 rounded-2xl -z-10"
                />
              </div>

              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Hello there! I'm
                </p>
                <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ratnakar Singh Parihar
                </p>
              </div>
            </motion.div>

            {/* Main Heading with Type Effect */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[1.1]"
              >
                <span className="block text-gray-900 dark:text-white">
                  Crafting
                </span>
                <motion.span
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 10, repeat: Infinity }}
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%]"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #3b82f6, #a855f7, #ec4899, #3b82f6)",
                    backgroundSize: "300% 100%",
                  }}
                >
                  Digital Magic
                </motion.span>
                <span className="block text-gray-900 dark:text-white">
                  With Code
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 dark:text-gray-300 font-medium"
              >
                Full-Stack Developer • MERN Stack Expert • UI/UX Enthusiast
              </motion.p>
            </div>

            {/* Description with Gradient Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl"
            >
              I specialize in building{" "}
              <span className="relative inline-block">
                <span className="relative z-10 font-semibold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                  scalable web applications
                </span>
                <motion.span
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                />
              </span>{" "}
              using the MERN stack. I transform complex problems into elegant,
              user-friendly solutions that make a difference.
            </motion.p>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              {techStack.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`px-4 py-2 rounded-xl bg-gradient-to-r ${tech.color} text-white text-sm font-medium shadow-lg flex items-center gap-2 cursor-default`}
                >
                  <span>{tech.icon}</span>
                  {tech.name}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 30px -10px rgba(168,85,247,0.5)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="relative group px-8 py-4 rounded-2xl font-semibold text-lg overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x bg-[length:200%] group-hover:opacity-90 transition-opacity" />
                <span className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                <span className="relative text-white flex items-center gap-2">
                  View My Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  window.open("mailto:ratnakarsinghparihar9399@gmail.com")
                }
                className="group relative px-8 py-4 rounded-2xl font-semibold text-lg bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-all overflow-hidden"
              >
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:text-white transition-colors">
                  Get In Touch
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className={`w-12 h-12 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xl hover:text-white transition-all duration-300 ${link.color}`}
                >
                  <Icon name={link.icon} size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - Enhanced Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-lg">
              {/* Floating Tech Icons */}
              {[
                // { icon: "⚛️", delay: 0, top: -10, left: -10, rotate: 0 },
                // { icon: "🟢", delay: 1, bottom: -10, right: -10, rotate: 15 },
                // { icon: "🍃", delay: 2, top: "30%", right: -30, rotate: -10 },
                // { icon: "🔷", delay: 1.5, bottom: "20%", left: -30, rotate: 5 },
                // { icon: "▲", delay: 2.5, top: "50%", left: -40, rotate: -5 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: item.rotate }}
                  transition={{ delay: 1 + item.delay, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className="absolute z-20 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl cursor-pointer border border-gray-200 dark:border-gray-700"
                  style={{
                    top: item.top,
                    left: item.left,
                    bottom: item.bottom,
                    right: item.right,
                  }}
                >
                  <span className="text-3xl">{item.icon}</span>
                </motion.div>
              ))}

              {/* Profile Image with Advanced Effects */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                {/* Animated Gradient Border */}
                {/* <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-[2rem] opacity-75 blur-md"
                /> */}

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-[2rem] overflow-hidden shadow-2xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={AboutImg}
                      alt="Ratnakar Singh Parihar"
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Status Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.5 }}
                      className="absolute bottom-6 left-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl px-4 py-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-2 h-2 bg-green-500 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Available for work
                        </span>
                      </div>
                    </motion.div>

                    {/* Stats Overlay */}
                    {/* <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                      className="absolute top-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl px-4 py-3 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">3+</p>
                        <p className="text-xs text-gray-500">Years</p>
                      </div>
                    </motion.div> */}
                  </div>
                </motion.div>
              </motion.div>

              {/* Stats Cards */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.2 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="text-center"
                    >
                      <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-gray-400 dark:border-gray-600 flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
