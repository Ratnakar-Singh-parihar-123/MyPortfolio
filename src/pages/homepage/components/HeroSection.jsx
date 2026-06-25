import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
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
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for performance adjustments
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- Scroll parallax (disabled on mobile) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", isMobile ? "0%" : "25%"],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.7, 0]);

  // --- 3D tilt (only on non‑touch devices) ---
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || !imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateXVal = ((y - centerY) / centerY) * -6;
      const rotateYVal = ((x - centerX) / centerX) * 6;
      rotateX.set(rotateXVal);
      rotateY.set(rotateYVal);
    },
    [isMobile, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  // --- Memoized data ---
  const taglines = useMemo(
    () => [
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
    ],
    [],
  );

  const stats = useMemo(
    () => [
      {
        value: 8,
        label: "Projects Completed",
        color: "text-purple-500",
        icon: "🚀",
      },
      {
        value: 1,
        label: "Years of Experience",
        color: "text-indigo-500",
        icon: "📅",
      },
      {
        value: 15,
        label: "Technologies Mastered",
        color: "text-emerald-500",
        icon: "⚛️",
      },
      {
        value: "∞",
        label: "Passion for Code",
        color: "text-rose-500",
        icon: "❤️",
      },
    ],
    [],
  );

  // --- Auto-rotate tagline ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [taglines.length]);

  // --- 🔥 FIX: Control body scroll when popup is open ---
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  // --- Handlers ---
  const handlePopupOpen = useCallback(() => setIsPopupOpen(true), []);
  const handlePopupClose = useCallback(() => setIsPopupOpen(false), []);
  const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

  // --- Limit background shapes on mobile ---
  const shapeCount = isMobile ? 4 : 8;

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center w-full min-h-screen overflow-x-hidden no-scrollbar bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* ===== ANIMATED BACKGROUND (lighter on mobile) ===== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs - reduced blur on mobile */}
        <motion.div
          animate={
            !isMobile
              ? { scale: [1, 1.2, 1], x: [0, 40, 0], y: [0, -30, 0] }
              : {}
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 left-[5%] rounded-full bg-gradient-to-r from-blue-400/15 via-purple-400/15 to-pink-400/15 will-change-transform ${
            isMobile
              ? "w-[300px] h-[300px] blur-2xl"
              : "w-[500px] h-[500px] blur-3xl"
          }`}
        />
        <motion.div
          animate={
            !isMobile
              ? { scale: [1, 1.2, 1], x: [0, -40, 0], y: [0, 30, 0] }
              : {}
          }
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-1/4 right-[5%] rounded-full bg-gradient-to-r from-purple-400/15 via-pink-400/15 to-blue-400/15 will-change-transform ${
            isMobile
              ? "w-[350px] h-[350px] blur-2xl"
              : "w-[600px] h-[600px] blur-3xl"
          }`}
        />

        {/* Floating geometric shapes - fewer on mobile */}
        {[...Array(shapeCount)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border rounded-full border-blue-500/10 dark:border-blue-400/10 will-change-transform"
            style={{
              width: isMobile
                ? 10 + Math.random() * 30
                : 20 + Math.random() * 60,
              height: isMobile
                ? 10 + Math.random() * 30
                : 20 + Math.random() * 60,
              left: Math.random() * 90 + 5 + "%",
              top: Math.random() * 90 + 5 + "%",
            }}
            animate={{
              y: [0, -30 - Math.random() * 30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Grid pattern (subtle) - hidden on mobile for performance */}
        {!isMobile && (
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        )}
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 w-full px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 sm:py-16 md:py-20 lg:py-24">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-16 xl:gap-20">
          {/* ===== LEFT COLUMN ===== */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[55%] space-y-5 text-center lg:text-left"
          >
            {/* Badge with pulse */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 mx-auto lg:mx-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-full border border-gray-200/40 dark:border-gray-700/40 shadow-lg shadow-blue-500/5 cursor-default"
            >
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping" />
                <span className="relative inline-flex w-2.5 h-2.5 bg-green-500 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
              </span>
              <span className="text-xs font-semibold text-transparent sm:text-sm bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Open to Full-Time & Internship Opportunities
              </span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-sm text-blue-500"
              >
                →
              </motion.span>
            </motion.div>

            {/* Heading with gradient text */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="text-sm font-medium text-transparent sm:text-base bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              >
                👋 Hello, I'm
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[1.05] tracking-tight"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
                  Ratnakar Singh Parihar
                </span>
              </motion.h1>
            </div>

            {/* Tagline rotator with smoother crossfade */}
            <div className="overflow-hidden h-9 sm:h-10 md:h-11">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTagline}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`text-base sm:text-lg md:text-xl font-semibold bg-gradient-to-r ${taglines[currentTagline].color} bg-clip-text text-transparent`}
                >
                  {taglines[currentTagline].text}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Description with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-3"
            >
              <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-700 sm:text-base dark:text-gray-300 lg:mx-0">
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Full Stack & React Native Developer
                </span>{" "}
                passionate about crafting{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 font-semibold text-purple-600 dark:text-purple-400">
                    scalable and high‑performance digital solutions
                  </span>
                  <motion.span
                    animate={{ width: ["0%", "100%", "0%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-0 left-0 h-0.5 bg-purple-400/60"
                  />
                </span>{" "}
                through modern technologies, clean architecture, and efficient
                code.
              </p>
              <p className="max-w-2xl mx-auto text-sm text-gray-500 sm:text-base dark:text-gray-400 lg:mx-0">
                With expertise in <strong>MERN Stack</strong> and{" "}
                <strong>React Native</strong>, I build responsive UIs, secure
                backends, REST APIs, and cross‑platform mobile apps focused on
                performance and exceptional user experience.
              </p>
            </motion.div>

            {/* CTA Buttons with glow effects */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="flex flex-col items-center gap-4 pt-2 sm:flex-row"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative w-full sm:w-auto px-9 py-3.5 font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-xl shadow-blue-500/25 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-2.5 text-sm sm:text-base"
                >
                  <span>💬</span>
                  Let's Connect
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePopupOpen}
                className="relative w-full sm:w-auto px-9 py-3.5 font-bold text-gray-800 dark:text-white bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 flex items-center justify-center gap-2.5 overflow-hidden group text-sm sm:text-base"
              >
                <span className="absolute inset-0 transition duration-500 -skew-x-12 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span>📄</span>
                View Resume
              </motion.button>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="grid grid-cols-2 gap-3 pt-6 sm:grid-cols-4"
            >
              {stats.map((stat, idx) => (
                <StatCard key={stat.label} stat={stat} index={idx} />
              ))}
            </motion.div>
          </motion.div>

          {/* ===== RIGHT COLUMN – IMAGE with 3D tilt (desktop only) ===== */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-[40%] flex justify-center mt-6 lg:mt-0"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
          >
            <motion.div
              style={{
                rotateX: isMobile ? 0 : springRotateX,
                rotateY: isMobile ? 0 : springRotateY,
                transformPerspective: isMobile ? "none" : 1000,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md"
            >
              {/* Glow rings - reduced on mobile */}
              {!isMobile && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], rotate: [0, 180, 360] }}
                    transition={{
                      duration: 18,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute rounded-full -inset-8 bg-gradient-conic from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-2xl will-change-transform"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.15, 0.25, 0.15],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5 blur-xl"
                  />
                </>
              )}

              {/* Image container */}
              <div className="relative p-[3px] shadow-2xl rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-blue-500/20">
                <div className="relative overflow-hidden bg-white rounded-xl dark:bg-gray-900">
                  {!isImageLoaded && (
                    <motion.div
                      animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                      transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-800 dark:to-gray-700 rounded-xl"
                      style={{ backgroundSize: "200% 100%" }}
                    />
                  )}
                  <Image
                    src={HeroImg}
                    alt="Ratnakar Singh Parihar – Full-Stack Developer"
                    className={`w-full h-[400px] sm:h-[500px] md:h-[540px] lg:h-[530px] xl:h-[550px] object-cover object-center transition-all duration-700 ${
                      isImageLoaded
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                    onLoad={handleImageLoad}
                  />
                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 via-30% to-transparent to-70% rounded-xl" />
                  {/* Bottom decorative line */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-5 sm:left-7 right-5 sm:right-7"
                  >
                    <div className="h-[2px] bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.3)]" />
                  </motion.div>
                </div>
              </div>

              {/* Dot pattern behind - hidden on mobile */}
              {!isMobile && (
                <div className="absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 pointer-events-none -z-10 top-1/2 left-1/2 sm:w-72 sm:h-72">
                  <div
                    className="absolute inset-0 opacity-10 dark:opacity-15"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, rgba(59,130,246,0.15) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ===== SCROLL DOWN INDICATOR ===== */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute z-10 hidden -translate-x-1/2 bottom-24 sm:bottom-28 left-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-500"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <svg
            width="22"
            height="22"
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

      {/* ===== RESUME POPUP ===== */}
      <ResumePopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </section>
  );
};

// ─── Stat Card with smooth RAF counter ──────────────────────────────────
const StatCard = ({ stat, index }) => {
  const [count, setCount] = useState(0);
  const isNumeric = typeof stat.value === "number";
  const target = isNumeric ? stat.value : 0;
  const isInfinity = stat.value === "∞";
  const frameRef = useRef();

  useEffect(() => {
    if (!isNumeric || isInfinity) return;
    let startTime = performance.now();
    const duration = 1500;
    const animate = (time) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, isNumeric, isInfinity]);

  const displayValue = isInfinity ? "∞" : isNumeric ? count : stat.value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 + index * 0.06, duration: 0.4 }}
      whileHover={{ y: -5, scale: 1.04 }}
      className="p-3.5 rounded-xl border border-gray-200/40 dark:border-gray-700/40 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm transition-all duration-300 cursor-default group shadow-sm hover:shadow-md"
    >
      <div
        className={`text-xl sm:text-2xl font-bold ${stat.color} mb-0.5 group-hover:scale-110 transition-transform`}
      >
        {displayValue}
      </div>
      <div className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400 leading-tight flex items-center gap-1">
        <span>{stat.icon}</span>
        {stat.label}
      </div>
    </motion.div>
  );
};

export default HeroSection;
