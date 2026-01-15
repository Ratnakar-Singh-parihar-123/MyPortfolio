import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jsPDF } from "jspdf";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

// Certificates images
import problemSolvingBasic from "../../../assets/caritificatesImg/Problem Silving Basic.png";
import problemSolvingIntermedated from "../../../assets/caritificatesImg/Problem solving intermedate.png";
import reactBasic from "../../../assets/caritificatesImg/React Basic.png";
import frontendRect from "../../../assets/caritificatesImg/frontend React.png";
import javaScriptBasic from "../../../assets/caritificatesImg/javascript basic.png";
import codingThinker from "../../../assets/caritificatesImg/coding-thinker-certificates.png";

//logo
import codingThinkerLogos from "../../../assets/brandLogos/coding-thinker-logo.png";

// Import background images
// import hackerrankBg from "../../../assets/brandLogos/HackerRank.png";
// import patternBg from "../../../assets/brandLogos/patternBg.jpg";

const CertificatesSection = () => {
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  const certificates = [
    {
      id: 1,
      name: "Problem Solving (Basic)",
      issuer: "HackerRank",
      date: "May 2025",
      category: "Programming Fundamentals",
      credentialId: "5CE289A1A111",
      image: problemSolvingBasic,
      badge: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description: "Demonstrates strong foundational problem-solving and algorithmic thinking skills using data structures and logical reasoning. Covers loops, arrays, conditionals, and mathematical logic — validating efficient and optimized coding ability.",
      skills: ["Algorithms", "Data Structures", "Logic Building", "Analytical Thinking"],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/5ce289a1a111",
      level: "Fundamental",
      color: "from-blue-500 to-cyan-500",
      glow: "rgba(59, 130, 246, 0.2)"
    },
    {
      id: 2,
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "May 2025",
      category: "Programming & Algorithms",
      credentialId: "CBF68707295D",
      image: problemSolvingIntermedated,
      badge: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description: "Validates advanced algorithmic reasoning and problem-solving skills focusing on recursion, optimization, and time complexity. Demonstrates ability to write scalable and clean code for real-world challenges.",
      skills: ["Algorithms", "Dynamic Programming", "Optimization", "Time Complexity Analysis"],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
      level: "Intermediate",
      color: "from-purple-500 to-pink-500",
      glow: "rgba(168, 85, 247, 0.2)"
    },
    {
      id: 3,
      name: "React (Basic)",
      issuer: "HackerRank",
      date: "Sep 2025",
      category: "Frontend Development",
      credentialId: "24ODFOOA1852",
      image: reactBasic,
      badge: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description: "Demonstrates foundational proficiency in React.js, covering components, props, state management, hooks, and JSX. Validates ability to build modular, maintainable, and interactive interfaces.",
      skills: ["React.js", "Hooks & State Management", "Component Architecture", "JSX & Virtual DOM"],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/240df00a1852",
      level: "Fundamental",
      color: "from-cyan-500 to-blue-500",
      glow: "rgba(6, 182, 212, 0.2)"
    },
    {
      id: 4,
      name: "Frontend Developer (React)",
      issuer: "HackerRank",
      date: "Aug 2025",
      category: "Frontend Development",
      credentialId: "EAAE9FD31C8C",
      image: frontendRect,
      badge: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description: "Validates practical skills in building dynamic, component-driven UIs using React.js. Demonstrates routing, hooks, reusable components, and REST API integration — showing ability to create responsive and maintainable apps.",
      skills: ["React.js", "JavaScript (ES6+)", "React Hooks", "Routing & State Management", "API Integration", "Responsive Design"],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/eaae9fd31c8c",
      level: "Intermediate",
      color: "from-green-500 to-emerald-500",
      glow: "rgba(16, 185, 129, 0.2)"
    },
    {
      id: 5,
      name: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "Aug 2025",
      category: "Web Development",
      credentialId: "438C313OE15",
      image: javaScriptBasic,
      badge: "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description: "Demonstrates a solid understanding of JavaScript fundamentals — syntax, functions, scope, ES6+, and DOM manipulation. Validates ability to build interactive and efficient web applications.",
      skills: ["JavaScript (ES6+)", "Functions & Scope", "DOM Manipulation", "Event Handling", "Problem Solving"],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/438c3130ea15",
      level: "Fundamental",
      color: "from-yellow-500 to-amber-500",
      glow: "rgba(245, 158, 11, 0.2)"
    },
    {
      id: 6,
      name: "45 Days Coding Challenge",
      issuer: "Coding Thinker",
      date: "Aug 2025",
      category: "Programming & Algorithms",
      credentialId: "CT-45DAYS-2025",
      image: codingThinker,
      badge: codingThinkerLogos,
      description: "Actively participated in the '45 Days Coding Challenge' organized by Coding Thinker from 14th July 2025. Demonstrated consistent effort, enthusiasm, and dedication towards learning Coding, Data Structures, and Algorithms while engaging and growing with the community.",
      skills: ["Coding", "Data Structures", "Algorithms", "Problem Solving", "Consistency", "Team Collaboration"],
      verificationUrl: "",
      level: "Participation",
      color: "from-violet-500 to-purple-500",
      glow: "rgba(139, 92, 246, 0.2)"
    },
  ];

  // Enhanced Auto rotation logic with pause on hover
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;

    autoPlayRef.current = setInterval(() => {
      setActiveCertificate((prev) => (prev + 1) % certificates.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovering, certificates.length]);

  const nextCertificate = () => {
    setActiveCertificate((prev) => (prev + 1) % certificates.length);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const prevCertificate = () => {
    setActiveCertificate((prev) => (prev - 1 + certificates.length) % certificates.length);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const goToCertificate = (index) => {
    setActiveCertificate(index);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const currentCert = certificates[activeCertificate];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevCertificate();
      if (e.key === 'ArrowRight') nextCertificate();
      if (e.key === ' ') setIsAutoPlaying(!isAutoPlaying);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAutoPlaying]);

  // PDF download handler
  const handleDownloadPDF = () => {
    if (currentCert?.image) {
      const pdf = new jsPDF("landscape", "mm", "a4");
      const img = new Image();
      img.src = currentCert.image;
      img.onload = () => {
        const imgWidth = 280;
        const imgHeight = (img.height * imgWidth) / img.width;
        const x = (297 - imgWidth) / 2;
        const y = (210 - imgHeight) / 2;

        pdf.addImage(currentCert.image, "PNG", x, y, imgWidth, imgHeight);
        pdf.setFontSize(16);
        pdf.setTextColor(40);
        pdf.text(currentCert.name, 148.5, 20, null, null, "center");
        pdf.save(`${currentCert.name.replace(/\s+/g, "_")}_Certificate.pdf`);
      };
    }
  };

  // Animation variants
  const certificateVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5
      }
    },
    exit: { opacity: 0, scale: 0.9, x: -100 }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-background via-background/95 to-muted/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-green-500/10 via-transparent to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <div className="container-brand relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center">
                <Icon name="Award" size={28} className="text-blue-500" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
              CERTIFICATIONS SHOWCASE
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            Professional
            <span className="relative ml-4">
              <span className="relative z-10">Certifications</span>
              <motion.span
                className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -rotate-1"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Industry-recognized credentials validating expertise in modern technologies,
            problem-solving, and software development best practices.
          </p>
        </motion.div>

        {/* Stats Bar */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { value: "6+", label: "Certifications", icon: "Award", color: "blue" },
            { value: "100%", label: "Verified", icon: "CheckCircle", color: "green" },
            { value: "3", label: "Skill Levels", icon: "TrendingUp", color: "purple" },
            { value: "24+", label: "Skills Validated", icon: "Code", color: "amber" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              className="p-4 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <Icon name={stat.icon} size={24} className={`text-${stat.color}-500`} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div> */}

        {/* Main Carousel Container */}
        <div
          ref={carouselRef}
          className="max-w-7xl mx-auto relative"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation Buttons with Enhanced Style */}
          <motion.button
            onClick={prevCertificate}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 lg:-translate-x-12 w-14 h-14 bg-background/80 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center hover:bg-background hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 z-10 group"
            aria-label="Previous certificate"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon name="ChevronLeft" size={24} className="text-foreground group-hover:text-primary transition-colors" />
          </motion.button>

          <motion.button
            onClick={nextCertificate}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 lg:translate-x-12 w-14 h-14 bg-background/80 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center hover:bg-background hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 z-10 group"
            aria-label="Next certificate"
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Icon name="ChevronRight" size={24} className="text-foreground group-hover:text-primary transition-colors" />
          </motion.button>

          {/* Certificate Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCertificate}
              variants={certificateVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative"
            >
              {/* Glow Effect */}
              <div
                className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-opacity duration-500"
                style={{ background: currentCert.glow }}
              />

              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-gradient-to-br from-card/50 to-card/30 border border-border/30 rounded-3xl p-6 lg:p-8 backdrop-blur-sm">
                {/* Certificate Image Container */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-white/10 shadow-2xl">
                    <motion.div
                      initial={{ scale: 1.05 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.7 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentCert?.image}
                        alt={currentCert?.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 border-2 border-transparent rounded-2xl">
                        <motion.div
                          className="absolute inset-0 border-2 rounded-2xl"
                          style={{ borderColor: currentCert.glow }}
                          animate={{ opacity: [0.3, 0.7, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      {/* Badge with Animation */}
                      <motion.div
                        className="absolute top-6 right-6 w-20 h-20 rounded-full overflow-hidden border-3 border-white/20 shadow-2xl"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Image
                          src={currentCert?.badge}
                          alt={`${currentCert?.issuer} badge`}
                          className="w-full h-full object-cover bg-white p-2"
                        />
                      </motion.div>

                      {/* Level Tag */}
                      <motion.div
                        className="absolute bottom-6 left-6"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${currentCert.color} text-white text-sm font-bold rounded-full border border-white/20 shadow-lg backdrop-blur-sm`}>
                          <Icon name="Star" size={14} className="mr-2" />
                          {currentCert?.level}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Certificate Information */}
                <div className="space-y-6">
                  {/* Header Info */}
                  <div>
                    <div className="flex items-center flex-wrap gap-3 mb-4">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                        {currentCert?.category}
                      </span>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        <span className="text-sm">{currentCert?.date}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
                      {currentCert?.name}
                    </h3>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center">
                        <Icon name="Building" size={16} className="text-primary" />
                      </div>
                      <p className="text-lg font-semibold text-primary">
                        {currentCert?.issuer}
                      </p>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-muted-foreground leading-relaxed text-lg"
                    >
                      {currentCert?.description}
                    </motion.p>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500/10 to-green-600/10 flex items-center justify-center">
                        <Icon name="CheckCircle" size={20} className="text-green-500" />
                      </div>
                      <h4 className="text-xl font-semibold text-foreground">
                        Validated Skills
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {currentCert?.skills?.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                          className="px-4 py-3 bg-gradient-to-br from-white/5 to-transparent text-foreground text-sm font-medium rounded-xl border border-border/50 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 text-center backdrop-blur-sm"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Credential Info Card */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-5 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-border/50 shadow-lg"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="Key" size={16} className="text-muted-foreground" />
                          <div className="text-xs text-muted-foreground">Credential ID</div>
                        </div>
                        <div className="font-mono text-sm text-foreground bg-muted/50 px-3 py-2 rounded-lg border border-border">
                          {currentCert?.credentialId}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon name="ShieldCheck" size={16} className="text-green-500" />
                          <div className="text-xs text-muted-foreground">Verification Status</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full relative"></div>
                          </div>
                          <span className="text-sm font-semibold text-green-600">
                            Verified & Authentic
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 pt-4"
                  >
                    {currentCert?.verificationUrl && (
                      <a
                        href={currentCert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Icon name="ExternalLink" size={20} />
                        <span>Verify Certificate</span>
                      </a>
                    )}

                    <button
                      onClick={handleDownloadPDF}
                      className="group relative flex-1 inline-flex items-center justify-center gap-3 border-2 border-border text-foreground px-8 py-4 rounded-2xl font-semibold hover:bg-muted hover:border-primary/30 hover:scale-[1.02] transition-all duration-300"
                    >
                      <Icon name="Download" size={20} />
                      <span>Download PDF</span>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center items-center gap-3 mt-12">
            {certificates.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToCertificate(index)}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeCertificate
                    ? "bg-primary scale-125"
                    : "bg-muted hover:bg-muted-foreground/50"
                  }`} />
                {index === activeCertificate && (
                  <motion.div
                    className="absolute -inset-2 rounded-full border-2 border-primary/30"
                    layoutId="activeDot"
                    initial={false}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8"
          >
            {/* Auto-play Control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="group flex items-center gap-3 text-foreground hover:text-primary transition-colors duration-200"
            >
              <div className={`w-12 h-6 rounded-full transition-all duration-300 ${isAutoPlaying ? 'bg-primary/20' : 'bg-muted'}`}>
                <motion.div
                  className={`w-6 h-6 rounded-full ${isAutoPlaying ? 'bg-primary' : 'bg-muted-foreground'}`}
                  animate={{ x: isAutoPlaying ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
              <span className="text-sm font-medium">
                {isAutoPlaying ? "Auto-play ON" : "Auto-play OFF"}
              </span>
            </button>

            {/* Progress Bar */}
            <div className="flex-1 max-w-md">
              <div className="h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/50"
                  animate={{ width: isAutoPlaying ? "100%" : `${(activeCertificate + 1) / certificates.length * 100}%` }}
                  transition={{ duration: isAutoPlaying ? 4 : 0.3, ease: "linear" }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Certificate {activeCertificate + 1} of {certificates.length}</span>
                <span>Press ← → to navigate</span>
              </div>
            </div>

            {/* Keyboard Shortcuts Hint */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <kbd className="px-2 py-1 bg-muted rounded text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-muted rounded text-xs">→</kbd>
              <span>Navigate</span>
              <kbd className="px-2 py-1 bg-muted rounded text-xs ml-4">Space</kbd>
              <span>Play/Pause</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;