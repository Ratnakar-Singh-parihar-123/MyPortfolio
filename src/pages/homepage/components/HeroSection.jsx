import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import HeroImg from "../../../assets/heroImg/hero.jpeg";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup";

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const taglines = [
    {
      text: "MERN Stack Developer Building Modern & Scalable Web Applications",
      emoji: "🚀",
      color: "from-blue-500 to-cyan-400",
    },
    {
      text: "Transforming Ideas into Real-World Full-Stack Solutions",
      emoji: "💡",
      color: "from-purple-500 to-pink-400",
    },
    {
      text: "Creating Clean Frontends with Powerful Backend Logic",
      emoji: "⚙️",
      color: "from-emerald-500 to-green-400",
    },
    {
      text: "React Interfaces Powered by Node.js & MongoDB",
      emoji: "⚛️",
      color: "from-orange-500 to-yellow-400",
    },
    {
      text: "Focused on Performance, Scalability & Great User Experience",
      emoji: "🎯",
      color: "from-indigo-500 to-purple-400",
    },
    {
      text: "Passionate Fresher Learning, Building & Growing Every Day",
      emoji: "📈",
      color: "from-red-500 to-orange-400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [taglines.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const stats = [
    {
      value: "8+",
      label: "Projects",
      icon: "FolderOpen",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      value: "2+",
      label: "Years Learning",
      icon: "Code",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      value: "10+",
      label: "Technologies",
      icon: "Layers",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      value: "24/7",
      label: "Dedication",
      icon: "Heart",
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
    },
  ];

  const techSkills = [
    "React",
    "Node.js",
    "MongoDB",
    "Express",
    "Tailwind",
    "JavaScript",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 md:pt-7">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-blue-500/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/5 rounded-full" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/40 to-purple-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="text-center lg:text-left w-full lg:w-1/2 space-y-8"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full border border-blue-200 dark:border-blue-800/30"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Open to Full-Time & Internship Opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-medium text-blue-600 dark:text-blue-400"
              >
                👋 Hello, I'm
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-gray-900 dark:text-white">
                  Ratnakar Singh
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Parihar
                </span>
              </motion.h1>
            </div>

            {/* Animated Tagline */}
            <div className="relative min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTagline}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center lg:justify-start gap-3"
                >
                  <span className="text-3xl animate-bounce">
                    {taglines[currentTagline].emoji}
                  </span>
                  <p
                    className={`text-xl sm:text-2xl font-semibold bg-gradient-to-r ${taglines[currentTagline].color} bg-clip-text text-transparent`}
                  >
                    {taglines[currentTagline].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Tagline Indicators */}
              <div className="flex justify-center lg:justify-start gap-2 mt-4">
                {taglines.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTagline(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentTagline
                        ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                        : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Show tagline ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Description with Gradient Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 space-y-4"
            >
              <p className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/10 p-4 rounded-xl">
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  Full Stack Developer
                </span>{" "}
                passionate about crafting{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  innovative solutions
                </span>{" "}
                that make a difference. I transform complex problems into
                elegant, user-friendly applications.
              </p>

              <p className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                  ⚛️ React
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                  🟢 Node.js
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                  🍃 MongoDB
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm">
                  ⚡ Express
                </span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="gradient"
                    size="lg"
                    iconName="MessageCircle"
                    className="w-full sm:w-auto px-8 py-4 text-base rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Let's Connect
                  </Button>
                </motion.div>
              </Link>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  iconName="FileText"
                  className="w-full sm:w-auto px-8 py-4 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                  onClick={() => setIsPopupOpen(true)}
                >
                  View Resume
                </Button>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className={`p-4 rounded-xl border border-gray-200 dark:border-gray-800 ${stat.bgColor} hover:shadow-xl transition-all duration-300 cursor-default group`}
                >
                  <div
                    className={`text-2xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="relative w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative max-w-md">
              {/* Glow Effects */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-8 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-3xl"
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl" />

              {/* Floating Orbs */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 w-20 h-20 bg-blue-400/20 rounded-full blur-xl"
              />

              {/* Main Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 shadow-2xl"
              >
                {/* Animated Border */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                  style={{ backgroundSize: "200% 200%" }}
                />

                {/* Inner Container */}
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
                  {/* Image Skeleton Loader */}
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
                      className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-2xl z-10"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  )}

                  {/* Main Image */}
                  <Image
                    src={HeroImg}
                    alt="Ratnakar Singh Parihar - Full-Stack Developer"
                    className={`w-full h-[350px] md:h-[450px] object-cover object-center transition-all duration-700 hover:scale-110 ${
                      isImageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setIsImageLoaded(true)}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Bottom Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-6 left-6 right-6"
                  >
                    <div className="text-white">
                      <motion.p
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-sm text-white/90 flex items-center gap-2"
                      >
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Available for opportunities
                      </motion.p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.4, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: -2 }}
                className="absolute top-6 -left-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Icon name="Zap" size={14} />
                  <span>Aspiring Software Engineer</span>
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                </div>
              </motion.div>

              {/* Tech Stack Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.6, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="absolute bottom-20 -right-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium rounded-xl shadow-2xl hover:shadow-green-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <Icon name="Code" size={14} />
                  <span>MERN Stack</span>
                </div>
              </motion.div>

              {/* Animated Dots Pattern */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
                <div
                  className="absolute inset-0 opacity-20 dark:opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                ></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={handleScrollDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex flex-col items-center gap-2 group"
          aria-label="Scroll down"
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center group-hover:border-blue-400 transition-colors duration-300"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2"
            />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Resume Popup */}
      <ResumePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default HeroSection;
