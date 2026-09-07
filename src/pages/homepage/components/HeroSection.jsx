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
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Terminal,
  Database,
  Server,
  Workflow,
  Brain,
  Cpu,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
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

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 3D tilt effect for desktop profile image card
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

  // Memoized tagline data
  const taglines = useMemo(
    () => [
      "Full Stack & Mobile Engineer — Scalable Web & Mobile Apps",
      "Java, MERN & React Native Developer — Robust Backend & Modern UI",
      "System Design, RESTful APIs & High-Performance Databases",
      "Clean Code, Data Structures & CI/CD Automated Pipelines",
      "React & React Native Interfaces Powered by Node.js, Java & SQL",
      "Passionate Software Engineer Exploring Full-Stack & System Architecture",
    ],
    [],
  );

  // Complete technical skill set (13 items with icons & visual prioritization)
  const techStack = useMemo(
    () => [
      // Primary Priority Skills (JavaScript, React.js, Node.js, Java, MongoDB, SQL, System Design, CI/CD)
      {
        name: "JavaScript",
        icon: SiJavascript,
        color: "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/25 hover:bg-amber-500/20",
        glow: "shadow-amber-500/10",
        featured: true,
      },
      {
        name: "React.js",
        icon: SiReact,
        color: "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25 hover:bg-cyan-500/20",
        glow: "shadow-cyan-500/10",
        featured: true,
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        color: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/20",
        glow: "shadow-emerald-500/10",
        featured: true,
      },
      {
        name: "Java",
        icon: FaJava,
        color: "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/25 hover:bg-red-500/20",
        glow: "shadow-red-500/10",
        featured: true,
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        color: "text-green-600 dark:text-green-400 bg-green-600/10 border-green-600/25 hover:bg-green-600/20",
        glow: "shadow-green-600/10",
        featured: true,
      },
      {
        name: "SQL",
        icon: Database,
        color: "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/25 hover:bg-blue-500/20",
        glow: "shadow-blue-500/10",
        featured: true,
      },
      {
        name: "System Design",
        icon: Server,
        color: "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/25 hover:bg-purple-500/20",
        glow: "shadow-purple-500/10",
        featured: true,
      },
      {
        name: "CI/CD",
        icon: Workflow,
        color: "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/25 hover:bg-orange-500/20",
        glow: "shadow-orange-500/10",
        featured: true,
      },
      // Core Stack & CS Fundamentals
      {
        name: "React Native",
        icon: Smartphone,
        color: "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/25 hover:bg-sky-500/20",
        glow: "shadow-sky-500/10",
        featured: false,
      },
      {
        name: "Express.js",
        icon: SiExpress,
        color: "text-slate-600 dark:text-slate-300 bg-slate-500/10 border-slate-500/25 hover:bg-slate-500/20",
        glow: "shadow-slate-500/10",
        featured: false,
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        color: "text-teal-500 dark:text-teal-400 bg-teal-500/10 border-teal-500/25 hover:bg-teal-500/20",
        glow: "shadow-teal-500/10",
        featured: false,
      },
      {
        name: "Data Structures & Algorithms",
        icon: Brain,
        color: "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25 hover:bg-indigo-500/20",
        glow: "shadow-indigo-500/10",
        featured: false,
      },
      {
        name: "Computer Science",
        icon: Cpu,
        color: "text-violet-500 dark:text-violet-400 bg-violet-500/10 border-violet-500/25 hover:bg-violet-500/20",
        glow: "shadow-violet-500/10",
        featured: false,
      },
    ],
    [],
  );

  const stats = useMemo(
    () => [
      { value: 8, suffix: "+", label: "Projects Built", color: "text-blue-600 dark:text-blue-400" },
      { value: 300, suffix: "+", label: "DSA Problems Solved", color: "text-emerald-600 dark:text-emerald-400" },
      { value: 15, suffix: "+", label: "Tech Stack", color: "text-purple-600 dark:text-purple-400" },
      { value: 1, suffix: "+ Yrs", label: "Industry & Practice", color: "text-amber-600 dark:text-amber-400" },
    ],
    [],
  );

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

  // Auto-rotate tagline
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  // Lock scroll when resume modal opens
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handlePopupOpen = useCallback(() => setIsPopupOpen(true), []);
  const handlePopupClose = useCallback(() => setIsPopupOpen(false), []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen pt-16 sm:pt-20 lg:pt-24 pb-16 lg:pb-24 flex items-center justify-center overflow-x-hidden bg-background"
    >
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Subtle gradient glowing spots */}
        <div className="absolute top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-purple-500/10 dark:bg-purple-600/15 blur-3xl" />

        {/* Ambient Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN — Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Full-Time & Internship Roles</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-2 w-full">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base font-semibold tracking-wide text-muted-foreground uppercase"
              >
                Full Stack & React Native Developer
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
              >
                Ratnakar Singh <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  Parihar
                </span>
              </motion.h1>
            </div>

            {/* Dynamic Tagline Rotator */}
            <div className="min-h-[2.5rem] flex items-center justify-center lg:justify-start w-full">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentTagline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-base sm:text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400"
                >
                  {taglines[currentTagline]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl"
            >
              Full Stack & Mobile Engineer proficient in{" "}
              <strong className="text-foreground font-semibold">JavaScript, Java, MERN Stack</strong>, and{" "}
              <strong className="text-foreground font-semibold">React Native</strong>. Experienced in building scalable web & mobile applications, designing RESTful APIs, optimizing{" "}
              <strong className="text-foreground font-semibold">SQL & MongoDB databases</strong>, and applying{" "}
              <strong className="text-foreground font-semibold">System Design & CI/CD best practices</strong>.
            </motion.p>

            {/* Tech Stack Skill Badges Container */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-full space-y-2.5 pt-1"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 justify-center lg:justify-start">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>Technical Skill Set & Core Competencies</span>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-2xl">
                {techStack.map((tech) => {
                  const IconComponent = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -2, scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 450, damping: 22 }}
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all cursor-default
                        ${tech.color} ${tech.glow}
                        ${tech.featured ? "ring-1 ring-slate-400/20 dark:ring-slate-500/30 shadow-xs" : ""}
                      `}
                    >
                      <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{tech.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Buttons & Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full pt-2 sm:w-auto"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base group"
                >
                  <span>Let's Connect</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <button
                type="button"
                onClick={handlePopupOpen}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-foreground bg-card hover:bg-muted border border-border shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 text-blue-500" />
                <span>View Resume</span>
              </button>
            </motion.div>

            {/* Social Icons Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3 pt-2"
            >
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
                Connect:
              </span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="p-2.5 rounded-lg border border-border/60 bg-card/80 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-muted transition-all duration-200"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full pt-6"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm text-center lg:text-left transition-all hover:border-border"
                >
                  <div className={`text-2xl font-extrabold ${stat.color}`}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>

          {/* RIGHT COLUMN — Profile Card & Visual Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center w-full"
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
              className="relative w-full max-w-sm sm:max-w-md"
            >
              {/* Outer Decorative Gradient Border Card */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 shadow-2xl shadow-blue-500/10">
                <div className="relative overflow-hidden rounded-[22px] bg-card border border-border p-3 sm:p-4">
                  
                  {/* Photo Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/5] w-full">
                    <Image
                      src={HeroImg}
                      alt="Ratnakar Singh Parihar"
                      className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                      onLoad={() => setIsImageLoaded(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Bottom Floating Identity Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider">Full-Stack Engineer</p>
                          <h3 className="text-lg font-bold">Ratnakar Singh Parihar</h3>
                        </div>
                        <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium backdrop-blur-md">
                          🟢 Active
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Card Widget */}
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs border border-slate-800 shadow-inner space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-blue-400" />
                        developer.config.ts
                      </span>
                      <span className="text-emerald-400">● Full Stack & Systems</span>
                    </div>
                    <p className="pt-1"><span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = &#123;</p>
                    <p className="pl-4"><span className="text-slate-400">name:</span> <span className="text-amber-300">"Ratnakar Singh Parihar"</span>,</p>
                    <p className="pl-4"><span className="text-slate-400">stack:</span> [<span className="text-emerald-300">"Java"</span>, <span className="text-emerald-300">"MERN"</span>, <span className="text-emerald-300">"SQL"</span>, <span className="text-emerald-300">"System Design"</span>],</p>
                    <p className="pl-4"><span className="text-slate-400">status:</span> <span className="text-cyan-300">"Ready for Opportunities"</span></p>
                    <p>&#125;;</p>
                  </div>

                </div>
              </div>

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
