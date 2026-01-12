import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import AboutImg from "../../../assets/heroImg/hero.jpeg";

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
    { name: "linkedin", url: "https://linkedin.com/in/yourusername", icon: "Linkedin" },
    { name: "twitter", url: "https://twitter.com/yourusername", icon: "Twitter" },
    { name: "mail", url: "mailto:ratnakarsinghparihar9399@gmail.com", icon: "Mail" },
  ];

  const stats = [
    { value: "15+", label: "Projects", icon: "FolderOpen" },
    { value: "2+", label: "Years Exp", icon: "Calendar" },
    { value: "260+", label: "LeetCode", icon: "Code" },
    { value: "10+", label: "Skills", icon: "Layers" },
  ];

  const techStack = ["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind", "Express", "GraphQL"];

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

      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 px-5 py-3 rounded-full shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
              >
                <span className="text-white">👋</span>
              </motion.div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Hello there! I'm</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">Ratnakar Singh Parihar</p>
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="block text-gray-900 dark:text-white">Crafting</span>
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Digital Magic
                  </span>
                  <motion.span
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </span>
                <span className="block text-gray-900 dark:text-white">With Code</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0"
              >
                Full-Stack Developer • UI/UX Designer • Problem Solver
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              I specialize in building modern, responsive web applications using the{" "}
              <span className="font-semibold text-blue-600 dark:text-blue-400">MERN stack</span>. 
              Passionate about creating seamless user experiences and scalable solutions that make an impact.
            </motion.p>

            {/* Stats Grid */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-md mx-auto lg:mx-0"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                      <Icon name={stat.icon} size={20} className="text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div> */}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("projects")}
                className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3">
                  <Icon name="FolderKanban" size={22} />
                  View My Projects
                  <Icon name="ArrowRight" size={18} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open("mailto:ratnakarsinghparihar9399@gmail.com", "_blank")}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-3">
                  <Icon name="MessageSquare" size={22} className="text-blue-600 dark:text-blue-400" />
                  Get In Touch
                  <Icon name="ExternalLink" size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </span>
              </motion.button>
            </motion.div>

            {/* Tech Stack */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="pt-6"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">Tech Stack I Love:</p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 + index * 0.05, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right Side - Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Profile Container */}
            <div className="relative w-full max-w-md">
              {/* Floating Elements */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-200/20 dark:border-blue-500/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Icon name="Sparkles" size={24} className="text-blue-500 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-200/20 dark:border-purple-500/10 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Icon name="Code" size={20} className="text-purple-500 dark:text-purple-400" />
                  </motion.div>
                </>
              )}

              {/* Profile Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                {/* Gradient Border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-xl"></div>
                
                {/* Image */}
                <div className="relative rounded-3xl overflow-hidden border-8 border-white dark:border-gray-900 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <Image
                    src={AboutImg}
                    alt="Ratnakar Singh Parihar - Full Stack Developer"
                    className="w-full h-[500px] sm:h-[600px] object-cover object-center"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                  
                  {/* Interactive Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-4 shadow-2xl min-w-[280px]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <Icon name="Cpu" size={24} className="text-white" />
                        </div>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute -inset-2 border-2 border-blue-500/20 rounded-xl"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Currently Building</p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Innovative MERN Stack Applications
                        </p>
                      </div>
                      <div className="text-xs px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 rounded-full font-semibold">
                        Active
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Elements */}
      
      </div>
    </section>
  );
};

export default HeroSection;