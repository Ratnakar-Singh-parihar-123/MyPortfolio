import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import HeroImg from "../../../assets/heroImg/hero.jpeg";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup";
// import DraggableSkills from "./DraggableSkills";

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const taglines = [
    {
      text: "MERN & React Native Developer Building Scalable Web & Mobile Apps",
      emoji: "",
      icon: "Rocket",
      color: "from-blue-500 to-cyan-400",
      gradient: "bg-gradient-to-r from-blue-500 to-cyan-400",
    },
    {
      text: "Transforming Ideas into Real-World Full-Stack & Mobile Solutions",
      emoji: "",
      icon: "Lightbulb",
      color: "from-purple-500 to-pink-400",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-400",
    },
    {
      text: "Creating Clean Web & Mobile UIs with Powerful Backend Logic",
      emoji: "",
      icon: "Settings",
      color: "from-emerald-500 to-green-400",
      gradient: "bg-gradient-to-r from-emerald-500 to-green-400",
    },
    {
      text: "React & React Native Interfaces Powered by Node.js & MongoDB",
      emoji: "",
      icon: "Smartphone", // 🔥 better for mobile vibe
      color: "from-orange-500 to-yellow-400",
      gradient: "bg-gradient-to-r from-orange-500 to-yellow-400",
    },
    {
      text: "Building High-Performance Apps with Great UX Across Web & Mobile",
      emoji: "",
      icon: "Target",
      color: "from-indigo-500 to-purple-400",
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-400",
    },
    {
      text: "Passionate Developer Exploring Web & Mobile Technologies Every Day",
      emoji: "",
      icon: "TrendingUp",
      color: "from-red-500 to-orange-400",
      gradient: "bg-gradient-to-r from-red-500 to-orange-400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
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
      value: "9+",
      label: "Projects Completed",
      icon: "Briefcase",
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    {
      value: "1+",
      label: "Hands-on Experience",
      icon: "Award",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    {
      value: "15+",
      label: "Technologies",
      icon: "Layers",
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    {
      value: "∞",
      label: "Passion",
      icon: "Heart",
      color: "text-rose-500",
      bgColor: "bg-rose-50 dark:bg-rose-900/20",
      borderColor: "border-rose-200 dark:border-rose-800",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pt-24 md:pt-28 lg:pt-32"
    >
      {/* Simple & Elegant Background Design */}
      <div className="absolute inset-0 z-0">
        {/* Soft Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

        {/* Single Large Gradient Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />

        {/* Subtle Accent Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

        {/* Minimal Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-blue-500/10 rounded-full" />
        <div className="absolute bottom-20 left-20 w-40 h-40 border border-purple-500/10 rounded-full" />

        {/* Subtle Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Clean Vignette Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white dark:from-gray-950 dark:via-transparent dark:to-gray-950 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-gray-950 dark:via-transparent dark:to-gray-950 opacity-50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20 pt-7">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 xl:gap-20">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-center lg:text-left w-full lg:w-1/2 space-y-6 lg:space-y-8"
          >
            {/* Enhanced Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-gray-200 dark:border-gray-700 shadow-lg mx-auto lg:mx-0 group cursor-pointer"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                Open to Full-Time & Internship Opportunities
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-blue-500"
              >
                →
              </motion.span>
            </motion.div>

            {/* Main Heading with 3D Effect */}
            <div className="space-y-2 perspective-1000">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                👋 Hello, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* First Name */}
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 0 rgba(0,0,0,0)",
                      "0 8px 16px rgba(0,0,0,0.15)",
                      "0 0 0 rgba(0,0,0,0)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="block text-gray-900 dark:text-white"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Ratnakar Singh
                </motion.span>

                {/* Last Name Gradient */}
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%]"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Parihar
                </motion.span>
              </motion.h1>
            </div>

            {/* Enhanced Animated Tagline */}
            <div className="relative min-h-[100px] sm:min-h-[120px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTagline}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="flex items-center justify-center lg:justify-start gap-4"
                >
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl sm:text-4xl bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl shadow-lg"
                  >
                    {taglines[currentTagline].emoji}
                  </motion.div>

                  <div className="relative">
                    <p
                      className={`text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r ${taglines[currentTagline].color} bg-clip-text text-transparent max-w-lg leading-relaxed`}
                    >
                      {taglines[currentTagline].text}
                    </p>

                    {/* Animated Underline */}
                    <motion.div
                      layoutId="tagline-underline"
                      className={`absolute bottom-0 left-0 h-0.5 ${taglines[currentTagline].gradient}`}
                      style={{ width: "100%" }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Enhanced Tagline Indicators */}
              <div className="flex justify-center lg:justify-start gap-2 mt-4">
                {taglines.map((tagline, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentTagline(index)}
                    className="group relative"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`Show tagline ${index + 1}`}
                  >
                    <motion.div
                      animate={{
                        scale: index === currentTagline ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        duration: 1,
                        repeat: index === currentTagline ? Infinity : 0,
                      }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentTagline
                          ? `w-8 ${tagline.gradient}`
                          : "w-2 bg-gray-300 dark:bg-gray-600 group-hover:bg-gray-400 dark:group-hover:bg-gray-500"
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Enhanced Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Full Stack & React Native Developer
                </span>{" "}
                passionate about building{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-semibold text-purple-600 dark:text-purple-400">
                    scalable web & mobile applications
                  </span>
                  <motion.span
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute bottom-0 left-0 h-0.5 bg-purple-400"
                  />
                </span>{" "}
                that deliver real-world impact. I specialize in transforming
                complex ideas into seamless, user-friendly experiences using
                modern technologies and clean, maintainable code.
              </p>

              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0">
                From responsive frontend interfaces to robust backend systems
                and cross-platform mobile apps, I focus on performance,
                scalability, and intuitive design to create products that users
                love.
              </p>

              {/* Draggable Skills Component */}
              {/* <div className="mt-6">
    <DraggableSkills />
  </div> */}
            </motion.div>

            {/* Enhanced CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 pt-6"
            >
              {/* CONTACT BUTTON */}
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  {/* Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition duration-300"></div>

                  <button className="relative flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                    {/* Icon */}
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      💬
                    </motion.span>
                    Let's Connect
                  </button>
                </motion.div>
              </Link>

              {/* RESUME BUTTON */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                {/* Border Animation */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl opacity-70 group-hover:opacity-100 transition duration-300"></div>

                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="relative flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto rounded-xl bg-white dark:bg-black text-gray-800 dark:text-white font-semibold backdrop-blur-lg border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Shine Effect */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-[shine_2s_infinite]"></span>
                  {/* Icon */}
                  <motion.span
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    📄
                  </motion.span>
                  View Resume
                </button>
              </motion.div>
            </motion.div>

            {/* Enhanced Stats Grid */}
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
                  transition={{ delay: 1 + index * 0.1, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className={`p-4 rounded-xl border ${stat.borderColor} ${stat.bgColor} hover:shadow-2xl transition-all duration-300 cursor-default group relative overflow-hidden`}
                >
                  {/* Hover Effect */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 4 }}
                    transition={{ duration: 0.4 }}
                    className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`text-2xl md:text-3xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium leading-tight">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          {/* Right Column - Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="relative w-full lg:w-1/2 flex justify-center mt-12 lg:mt-0"
          >
            <div className="relative max-w-sm sm:max-w-md md:max-w-lg">
              {/* Enhanced Glow Effects */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-10 bg-gradient-conic from-blue-600 via-purple-600 to-pink-600 rounded-full blur-3xl"
              />

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl"
              />

              {/* Floating Orbs */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full blur-xl opacity-60"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -10, 0],
                  rotate: [360, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-full blur-xl opacity-60"
              />

              {/* Main Image Container */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative overflow-hidden rounded-3xl sm:rounded-4xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1.5 shadow-2xl"
              >
                {/* Animated Border */}
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
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
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white dark:bg-gray-900">
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
                      className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-2xl sm:rounded-3xl z-10"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  )}

                  {/* Main Image */}
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src={HeroImg}
                      alt="Ratnakar Singh Parihar - Full-Stack Developer"
                      className={`w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover object-center transition-all duration-700 hover:scale-110 ${
                        isImageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </motion.div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Bottom Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-10 left-4 sm:left-8 right-4 sm:right-8"
                  >
                    <div className="text-white space-y-2">
                      <motion.p
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-xs sm:text-sm text-white/90 flex items-center gap-2"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Available for opportunities
                      </motion.p>

                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Animated Dots Pattern */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-80 h-64 sm:h-80">
                <div
                  className="absolute inset-0 opacity-20 dark:opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(59,130,246,0.3) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute top-16 sm:top-20 w-full overflow-hidden z-10 flex justify-center"
      >
        <div className="relative w-full max-w-7xl overflow-hidden rounded-xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 shadow-lg py-4">
          {/* Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-black to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-black to-transparent z-10"></div>

          {/* Scrolling Content */}
          <motion.div
            animate={{ x: ["0%", "-70%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex items-center gap-10 whitespace-nowrap text-sm sm:text-base md:text-lg font-semibold tracking-wide px-6"
          >
            {/* Items */}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              🚀 Crafting Modern Web Experiences
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              💻 MERN Stack Developer
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              📱 React Native Developer
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              ⚛ React • Node.js • Express.js • MongoDB • MySQL
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              📧 ratnakarsinghparihar9399@gmail.com
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              📞+91 93997-41051
            </span>

            {/* Duplicate for seamless loop */}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              🚀 Crafting Modern Web Experiences
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              💻 MERN Stack Developer
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              📱 React Native Developer
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              ⚛ React • Node.js • Express.js • MongoDB • MySQL
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              📧 ratnakarsinghparihar9399@gmail.com
            </span>

            <span className="text-gray-500">•</span>

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              📞+91 93997-41051
            </span>
          </motion.div>
        </div>
      </motion.div>
      {/* Resume Popup */}
      <ResumePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default HeroSection;
