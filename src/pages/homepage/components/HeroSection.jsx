import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "../../../components/AppImage";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup";
import HeroImg from "../../../assets/heroImg/hero.jpeg";

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.6, 0]);

  const taglines = [
    {
      text: "MERN & React Native Developer — Scalable Web & Mobile Apps",
      color: "from-blue-400 to-cyan-300",
    },
    {
      text: "Transforming Ideas into Full-Stack & Mobile Solutions",
      color: "from-purple-400 to-pink-300",
    },
    {
      text: "Clean Web & Mobile UIs with Powerful Backend Logic",
      color: "from-emerald-400 to-green-300",
    },
    {
      text: "React & React Native Interfaces Powered by Node.js & MongoDB",
      color: "from-orange-400 to-yellow-300",
    },
    {
      text: "High-Performance Apps with Great UX Across Web & Mobile",
      color: "from-indigo-400 to-purple-300",
    },
    {
      text: "Passionate Developer Exploring Web & Mobile Tech Every Day",
      color: "from-rose-400 to-orange-300",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const stats = [
    {
      value: "8+",
      label: "Projects Completed",
      color: "text-purple-500",
      bg: "bg-purple-50/70 dark:bg-purple-950/30",
      border: "border-purple-200/50 dark:border-purple-800/40",
    },
    {
      value: "1+ Year",
      label: "Learning & Industry Exp.",
      color: "text-indigo-500",
      bg: "bg-indigo-50/70 dark:bg-indigo-950/30",
      border: "border-indigo-200/50 dark:border-indigo-800/40",
    },
    {
      value: "15+",
      label: "Technologies Mastered",
      color: "text-emerald-500",
      bg: "bg-emerald-50/70 dark:bg-emerald-950/30",
      border: "border-emerald-200/50 dark:border-emerald-800/40",
    },
    {
      value: "∞",
      label: "Passion for Code",
      color: "text-rose-500",
      bg: "bg-rose-50/70 dark:bg-rose-950/30",
      border: "border-rose-200/50 dark:border-rose-800/40",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center w-full min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100/80 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
    >
      {/* ===== BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20" />

        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-[5%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-pink-400/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-[5%] w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-blue-400/10 blur-3xl"
        />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-40 h-40 border-2 rounded-full top-20 right-20 border-blue-500/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-56 h-56 border-2 rounded-full bottom-20 left-20 border-purple-500/10"
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 7,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20 dark:from-gray-950/30 dark:via-transparent dark:to-gray-950/30" />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16 xl:gap-20">
          {/* ===== LEFT COLUMN ===== */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
            className="w-full lg:w-[55%] space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 mx-auto lg:mx-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full border border-gray-200/40 dark:border-gray-700/40 shadow-lg shadow-blue-500/10 cursor-pointer transition-all duration-300"
            >
              <span className="relative flex w-3 h-3">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                <span className="relative inline-flex w-3 h-3 bg-green-500 rounded-full shadow-[0_0_16px_rgba(34,197,94,0.8)]" />
              </span>
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Open to Full-Time & Internship Opportunities
              </span>
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="text-blue-500"
              >
                →
              </motion.span>
            </motion.div>

            {/* Heading */}
            <div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-base font-medium text-transparent sm:text-lg bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                👋 Hello, I'm
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight text-gray-900 dark:text-white"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Ratnakar Singh Parihar
              </motion.h1>
            </div>

            {/* Tagline Rotator */}
            <div className="overflow-hidden h-9 sm:h-10 md:h-11">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTagline}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r ${taglines[currentTagline].color} bg-clip-text text-transparent`}
                >
                  {taglines[currentTagline].text}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300 lg:mx-0">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Full Stack & React Native Developer
                </span>{" "}
                passionate about crafting{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-semibold text-purple-600 dark:text-purple-400">
                    scalable and high-performance digital solutions
                  </span>
                  <motion.span
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4.5, repeat: Infinity }}
                    className="absolute bottom-0 left-0 h-0.5 bg-purple-400/60"
                  />
                </span>{" "}
                through modern technologies, clean architecture, and efficient
                code.
              </p>
              <p className="max-w-2xl mx-auto text-sm text-gray-500 sm:text-base dark:text-gray-400 lg:mx-0">
                With expertise in <strong>MERN Stack</strong> and{" "}
                <strong>React Native</strong>, I build responsive UIs, secure
                backends, REST APIs, and cross-platform mobile apps focused on
                performance and exceptional user experience.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center gap-5 pt-4 sm:flex-row"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.06, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full sm:w-auto px-10 py-4 font-bold text-white rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-2xl shadow-blue-500/30 hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    💬
                  </motion.span>
                  Let's Connect
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsPopupOpen(true)}
                className="relative w-full sm:w-auto px-10 py-4 font-bold text-gray-800 dark:text-white bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-2 border-gray-200/60 dark:border-gray-700/60 rounded-2xl shadow-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group"
              >
                <span className="absolute inset-0 transition duration-500 -skew-x-12 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <motion.span
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  📄
                </motion.span>
                View Resume
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 gap-4 pt-8 sm:grid-cols-4"
            >
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + idx * 0.08, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className={`p-4 rounded-2xl border ${stat.border} ${stat.bg} backdrop-blur-sm transition-all duration-300 cursor-default group shadow-sm hover:shadow-xl`}
                >
                  <div
                    className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 group-hover:scale-110 transition-transform`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-medium text-gray-600 dark:text-gray-400 leading-tight">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ===== RIGHT COLUMN – IMAGE (RESPONSIVE) ===== */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="w-full lg:w-[40%] flex justify-center mt-8 lg:mt-0"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
              {/* Glow orbs */}
              <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                className="absolute rounded-full -inset-10 bg-gradient-conic from-blue-600/15 via-purple-600/15 to-pink-600/15 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-2xl"
              />

              {/* Floating accents */}
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 12, 0], rotate: [0, 360] }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-16 h-16 rounded-full -top-6 -right-6 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 blur-xl"
              />
              <motion.div
                animate={{ y: [0, 20, 0], x: [0, -12, 0], rotate: [360, 0] }}
                transition={{
                  duration: 11,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute w-16 h-16 rounded-full -bottom-6 -left-6 bg-gradient-to-tr from-blue-400/30 to-indigo-400/30 blur-xl"
              />

              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative p-1 shadow-2xl rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-blue-500/20"
              >
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 rounded-2xl"
                  style={{ backgroundSize: "200% 200%" }}
                />

                <div className="relative overflow-hidden bg-white rounded-xl dark:bg-gray-900">
                  {/* Skeleton */}
                  {!isImageLoaded && (
                    <motion.div
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-xl"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  )}

                  {/* Image with responsive height */}
                  <motion.div
                    animate={{ scale: [1, 1.03, 1] }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative overflow-hidden rounded-xl"
                  >
                    <Image
                      src={HeroImg}
                      alt="Ratnakar Singh Parihar – Full-Stack Developer"
                      className={`w-full h-[430px] sm:h-[530px] md:h-[580px] lg:h-[570px] xl:h-[570px] object-cover object-center transition-all duration-700 ${
                        isImageLoaded
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105"
                      } hover:scale-110`}
                      onLoad={() => setIsImageLoaded(true)}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 via-30% to-transparent to-70% rounded-xl" />

                    {/* Bottom content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2, duration: 0.6 }}
                      className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-5 sm:left-7 right-5 sm:right-7"
                    >
                      <div className="space-y-2 text-white">
                        {/* <motion.p
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="flex items-center gap-2.5 px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide border rounded-full shadow-lg backdrop-blur-md bg-black/30 w-fit border-white/20"
                        >
                          <span className="relative flex w-2 h-2">
                            <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                            <span className="relative inline-flex w-2 h-2 bg-green-500 rounded-full shadow-[0_0_16px_#22c55e]" />
                          </span>
                          Available for opportunities
                        </motion.p> */}

                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{
                            delay: 1.4,
                            duration: 1,
                            ease: "easeOut",
                          }}
                          className="h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-[0_0_16px_rgba(59,130,246,0.4)]"
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Background dots */}
              <div className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none w-72 h-72 -z-10 top-1/2 left-1/2 sm:w-80 sm:h-80">
                <div
                  className="absolute inset-0 opacity-15 dark:opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(59,130,246,0.2) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ===== SCROLLING TICKER =====
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute left-0 right-0 z-10 px-4 bottom-4 sm:bottom-6"
      >
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden border shadow-2xl rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border-white/30 dark:border-white/10 shadow-blue-500/5">
          <div className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none bg-gradient-to-r from-white/40 dark:from-black/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none bg-gradient-to-l from-white/40 dark:from-black/40 to-transparent" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            className="flex items-center gap-10 px-6 py-3 text-sm font-semibold sm:text-base whitespace-nowrap"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              🚀 Crafting Modern Web Experiences
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              💻 Full Stack Developer
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              📱 React Native Developer
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              ⚛ React • Node.js • Express • MongoDB
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              📧 ratnakarsinghparihar9399@gmail.com
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              📞 +91 93997-41051
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              🚀 Crafting Modern Web Experiences
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              💻 Full Stack Developer
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              📱 React Native Developer
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
              ⚛ React • Node.js • Express • MongoDB
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">
              📧 ratnakarsinghparihar9399@gmail.com
            </span>
            <span className="text-gray-400/60">•</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              📞 +91 93997-41051
            </span>
          </motion.div>
        </div>
      </motion.div> */}

      {/* ===== SCROLL DOWN INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute z-10 hidden -translate-x-1/2 bottom-24 sm:bottom-28 left-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5" />
              <path d="M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ===== RESUME POPUP ===== */}
      <ResumePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default HeroSection;
