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
import javaDsaWebDev from "../../../assets/caritificatesImg/javaDsaWeb.jpeg";

// Logo
import codingThinkerLogos from "../../../assets/brandLogos/coding-thinker-logo.png";

const CertificatesSection = () => {
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const touchRef = useRef(null);
  const contentRef = useRef(null);

  const certificates = [
    {
      id: 1,
      name: "Problem Solving (Basic)",
      issuer: "HackerRank",
      date: "May 2025",
      category: "Programming Fundamentals",
      credentialId: "5CE289A1A111",
      image: problemSolvingBasic,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Demonstrates strong foundational problem-solving and algorithmic thinking skills using data structures and logical reasoning. Covers loops, arrays, conditionals, and mathematical logic — validating efficient and optimized coding ability.",
      skills: [
        "Algorithms",
        "Data Structures",
        "Logic Building",
        "Analytical Thinking",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/5ce289a1a111",
      level: "Fundamental",
      color: "from-blue-500 to-cyan-500",
      glow: "rgba(59, 130, 246, 0.15)",
    },
    {
      id: 2,
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "May 2025",
      category: "Programming & Algorithms",
      credentialId: "CBF68707295D",
      image: problemSolvingIntermedated,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Validates advanced algorithmic reasoning and problem-solving skills focusing on recursion, optimization, and time complexity. Demonstrates ability to write scalable and clean code for real-world challenges.",
      skills: [
        "Algorithms",
        "Dynamic Programming",
        "Optimization",
        "Time Complexity Analysis",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
      level: "Intermediate",
      color: "from-purple-500 to-pink-500",
      glow: "rgba(168, 85, 247, 0.15)",
    },
    {
      id: 3,
      name: "React (Basic)",
      issuer: "HackerRank",
      date: "Sep 2025",
      category: "Frontend Development",
      credentialId: "24ODFOOA1852",
      image: reactBasic,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Demonstrates foundational proficiency in React.js, covering components, props, state management, hooks, and JSX. Validates ability to build modular, maintainable, and interactive interfaces.",
      skills: [
        "React.js",
        "Hooks & State Management",
        "Component Architecture",
        "JSX & Virtual DOM",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/240df00a1852",
      level: "Fundamental",
      color: "from-cyan-500 to-blue-500",
      glow: "rgba(6, 182, 212, 0.15)",
    },
    {
      id: 4,
      name: "Frontend Developer (React)",
      issuer: "HackerRank",
      date: "Aug 2025",
      category: "Frontend Development",
      credentialId: "EAAE9FD31C8C",
      image: frontendRect,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Validates practical skills in building dynamic, component-driven UIs using React.js. Demonstrates routing, hooks, reusable components, and REST API integration — showing ability to create responsive and maintainable apps.",
      skills: [
        "React.js",
        "JavaScript (ES6+)",
        "React Hooks",
        "Routing & State Management",
        "API Integration",
        "Responsive Design",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/eaae9fd31c8c",
      level: "Intermediate",
      color: "from-green-500 to-emerald-500",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    {
      id: 5,
      name: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "Aug 2025",
      category: "Web Development",
      credentialId: "438C313OE15",
      image: javaScriptBasic,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Demonstrates a solid understanding of JavaScript fundamentals — syntax, functions, scope, ES6+, and DOM manipulation. Validates ability to build interactive and efficient web applications.",
      skills: [
        "JavaScript (ES6+)",
        "Functions & Scope",
        "DOM Manipulation",
        "Event Handling",
        "Problem Solving",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/438c3130ea15",
      level: "Fundamental",
      color: "from-yellow-500 to-amber-500",
      glow: "rgba(245, 158, 11, 0.15)",
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
      description:
        "Actively participated in the '45 Days Coding Challenge' organized by Coding Thinker from 14th July 2025. Demonstrated consistent effort, enthusiasm, and dedication towards learning Coding, Data Structures, and Algorithms while engaging and growing with the community.",
      skills: [
        "Coding",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Consistency",
        "Team Collaboration",
      ],
      verificationUrl: "",
      level: "Participation",
      color: "from-violet-500 to-purple-500",
      glow: "rgba(139, 92, 246, 0.15)",
    },
    {
      id: 7,
      name: "Java + DSA + Web Development",
      issuer: "Coding Thinker",
      date: "Feb 2026",
      category: "Full Stack Development",
      credentialId: "CT-JDW-2026",

      image: javaDsaWebDev,

      badge: codingThinkerLogos,

      description:
        "Successfully completed professional training in Java Programming, Data Structures & Algorithms, and Web Development at Coding Thinker. Gained strong problem-solving, programming, and modern web development skills through practical learning and project-based training.",

      skills: [
        "Java",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Web Development",
        "Frontend Development",
        "Backend Fundamentals",
      ],

      verificationUrl: "",

      level: "Professional",

      color: "from-orange-500 via-red-500 to-pink-500",

      glow: "rgba(249,115,22,0.15)",
    },
  ];

  // Enhanced Auto rotation with smooth transitions
  useEffect(() => {
    if (!isAutoPlaying || isHovering) return;

    const interval = setInterval(() => {
      setActiveCertificate((prev) => (prev + 1) % certificates.length);
    }, 5000); // Increased to 5 seconds for better viewing

    autoPlayRef.current = interval;

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHovering, certificates.length]);

  // Smooth navigation functions
  const navigateToCertificate = (direction) => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    setActiveCertificate((prev) => {
      if (direction === "next") {
        return (prev + 1) % certificates.length;
      } else {
        return (prev - 1 + certificates.length) % certificates.length;
      }
    });
  };

  const nextCertificate = () => navigateToCertificate("next");
  const prevCertificate = () => navigateToCertificate("prev");

  const goToCertificate = (index) => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setActiveCertificate(index);
  };

  const currentCert = certificates[activeCertificate];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") prevCertificate();
      if (e.key === "ArrowRight") nextCertificate();
      if (e.key === " ") {
        e.preventDefault();
        setIsAutoPlaying(!isAutoPlaying);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAutoPlaying]);

  // Touch swipe handling
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextCertificate();
      } else {
        prevCertificate();
      }
    }

    setTouchStartX(null);
  };

  // PDF download handler
  const handleDownloadPDF = async () => {
    if (!currentCert?.image) {
      alert("Certificate image not available for download.");
      return;
    }

    setIsLoading(true);
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");

      // Load image and get dimensions
      const img = new window.Image();
      img.src = currentCert.image;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to maintain aspect ratio
      const imgRatio = img.width / img.height;
      const pageRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;
      if (imgRatio > pageRatio) {
        finalWidth = pdfWidth * 0.9;
        finalHeight = finalWidth / imgRatio;
      } else {
        finalHeight = pdfHeight * 0.9;
        finalWidth = finalHeight * imgRatio;
      }

      const x = (pdfWidth - finalWidth) / 2;
      const y = (pdfHeight - finalHeight) / 2;

      pdf.addImage(currentCert.image, "PNG", x, y, finalWidth, finalHeight);

      // Add metadata
      pdf.setFontSize(12);
      pdf.setTextColor(100);
      pdf.text(`Issuer: ${currentCert.issuer}`, 15, 15);
      pdf.text(`Date: ${currentCert.date}`, pdfWidth - 15, 15, {
        align: "right",
      });
      pdf.text(`ID: ${currentCert.credentialId}`, 15, pdfHeight - 10);

      pdf.save(`${currentCert.name.replace(/\s+/g, "_")}_Certificate.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants for smooth transitions
  const certificateVariants = {
    hidden: { opacity: 0, scale: 0.96, x: 80 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 25,
        mass: 0.8,
        duration: 0.6,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      x: -80,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-20 overflow-hidden md:py-24 bg-gradient-to-b from-background via-background to-background/95">
      {/* Background Elements - Reduced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/5 via-transparent to-pink-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container-brand">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-12 text-center md:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 5 }}
            >
              <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10">
                <Icon name="Award" size={24} className="text-blue-500" />
              </div>
            </motion.div>
            <span className="px-4 py-2 text-sm font-semibold rounded-full text-primary bg-primary/10">
              CERTIFICATIONS
            </span>
          </div>

          <motion.h2
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground md:mb-6"
          >
            Professional Certifications
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-muted-foreground md:max-w-3xl"
          >
            Industry-recognized credentials validating expertise in modern
            technologies and software development practices.
          </motion.p>
        </motion.div>

        {/* Main Carousel Container */}
        <div
          ref={carouselRef}
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Buttons */}
          <motion.button
            onClick={prevCertificate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 border rounded-full shadow-lg left-2 md:left-4 top-1/2 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-primary/30"
            aria-label="Previous certificate"
          >
            <Icon name="ChevronLeft" size={20} className="text-foreground" />
          </motion.button>

          <motion.button
            onClick={nextCertificate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute z-10 flex items-center justify-center w-10 h-10 transition-all duration-300 -translate-y-1/2 border rounded-full shadow-lg right-2 md:right-4 top-1/2 md:w-12 md:h-12 bg-background/80 backdrop-blur-sm border-border/50 hover:bg-background hover:border-primary/30"
            aria-label="Next certificate"
          >
            <Icon name="ChevronRight" size={20} className="text-foreground" />
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
              {/* Subtle Glow Effect */}
              <div
                className="absolute transition-opacity duration-500 -inset-3 md:-inset-4 rounded-3xl blur-xl opacity-20"
                style={{ background: currentCert.glow }}
              />

              <div
                ref={contentRef}
                className="relative grid items-center grid-cols-1 gap-6 p-4 border shadow-lg lg:grid-cols-2 md:gap-8 bg-gradient-to-br from-card/80 to-card/60 border-border/30 rounded-2xl md:rounded-3xl md:p-6 lg:p-8 backdrop-blur-sm"
              >
                {/* Certificate Image Container */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl">
                    <motion.div
                      initial={{ scale: 1.03 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={currentCert?.image}
                        alt={currentCert?.name}
                        className="object-cover w-full h-full"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                      {/* Badge */}
                      <motion.div
                        className="absolute w-12 h-12 overflow-hidden border-2 rounded-full shadow-xl top-3 md:top-4 right-3 md:right-4 md:w-16 md:h-16 border-white/20"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Image
                          src={currentCert?.badge}
                          alt={`${currentCert?.issuer} badge`}
                          className="object-cover w-full h-full p-1 bg-white md:p-2"
                        />
                      </motion.div>

                      {/* Level Tag */}
                      <motion.div
                        className="absolute bottom-3 md:bottom-4 left-3 md:left-4"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span
                          className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${currentCert.color} text-white text-xs md:text-sm font-semibold rounded-full border border-white/20 shadow-lg`}
                        >
                          {currentCert?.level}
                        </span>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Certificate Information */}
                <div className="space-y-4 md:space-y-6">
                  {/* Header Info */}
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="px-3 py-1 text-xs font-medium border rounded-full md:text-sm text-primary bg-primary/10 border-primary/20">
                        {currentCert?.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Icon name="Calendar" size={14} />
                        <span className="text-xs md:text-sm">
                          {currentCert?.date}
                        </span>
                      </div>
                    </div>

                    <h3 className="mb-2 text-xl font-bold leading-snug md:text-2xl lg:text-3xl text-foreground">
                      {currentCert?.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center justify-center w-6 h-6 rounded-lg md:w-7 md:h-7 bg-gradient-to-br from-blue-500/10 to-blue-600/10">
                        <Icon
                          name="Building"
                          size={14}
                          className="text-primary"
                        />
                      </div>
                      <p className="text-base font-semibold md:text-lg text-primary">
                        {currentCert?.issuer}
                      </p>
                    </div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-sm leading-relaxed md:text-base text-muted-foreground"
                    >
                      {currentCert?.description}
                    </motion.p>
                  </div>

                  {/* Skills Grid */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg md:w-9 md:h-9 bg-gradient-to-br from-green-500/10 to-green-600/10">
                        <Icon
                          name="CheckCircle"
                          size={16}
                          className="text-green-500"
                        />
                      </div>
                      <h4 className="text-lg font-semibold md:text-xl text-foreground">
                        Skills Validated
                      </h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3">
                      {currentCert?.skills?.map((skill, index) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                          className="px-3 py-2 text-xs font-medium text-center transition-all duration-300 border rounded-lg bg-gradient-to-br from-white/5 to-transparent text-foreground md:text-sm border-border/50 hover:border-primary/30"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Credential Info */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="p-3 border md:p-4 bg-gradient-to-br from-card to-card/50 rounded-xl md:rounded-2xl border-border/50"
                  >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Icon
                            name="Key"
                            size={14}
                            className="text-muted-foreground"
                          />
                          <div className="text-xs text-muted-foreground">
                            Credential ID
                          </div>
                        </div>
                        <div className="font-mono text-xs md:text-sm text-foreground bg-muted/50 px-3 py-1.5 rounded-lg border border-border">
                          {currentCert?.credentialId}
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <Icon
                            name="ShieldCheck"
                            size={14}
                            className="text-green-500"
                          />
                          <div className="text-xs text-muted-foreground">
                            Status
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-green-600 md:text-sm">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-3 pt-3 sm:flex-row"
                  >
                    {currentCert?.verificationUrl && (
                      <a
                        href={currentCert.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center flex-1 gap-2 px-4 py-3 font-medium text-white transition-all duration-300 group bg-gradient-to-r from-primary to-primary/90 md:px-6 rounded-xl hover:shadow-lg hover:shadow-primary/20"
                      >
                        <Icon name="ExternalLink" size={18} />
                        <span>Verify Certificate</span>
                      </a>
                    )}

                    <button
                      onClick={handleDownloadPDF}
                      disabled={isLoading}
                      className={`group flex-1 inline-flex items-center justify-center gap-2 border border-border text-foreground px-4 md:px-6 py-3 rounded-xl font-medium hover:bg-muted/50 transition-all duration-300 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <Icon
                              name="Loader"
                              size={18}
                              className="animate-spin"
                            />
                          </motion.div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <Icon name="Download" size={18} />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8 md:gap-3 md:mt-12">
            {certificates.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToCertificate(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === activeCertificate
                      ? "bg-primary"
                      : "bg-muted hover:bg-muted-foreground/50"
                  }`}
                />
                {index === activeCertificate && (
                  <motion.div
                    className="absolute -inset-1.5 rounded-full border border-primary/30"
                    layoutId="activeDot"
                    initial={false}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 mt-6 sm:flex-row md:gap-6 md:mt-8"
          >
            {/* Auto-play Control */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 transition-colors duration-200 text-foreground hover:text-primary group"
            >
              <div
                className={`w-10 h-5 md:w-12 md:h-6 rounded-full transition-all duration-300 ${isAutoPlaying ? "bg-primary/20" : "bg-muted"}`}
              >
                <motion.div
                  className={`w-5 h-5 md:w-6 md:h-6 rounded-full ${isAutoPlaying ? "bg-primary" : "bg-muted-foreground"}`}
                  animate={{
                    x: isAutoPlaying ? (window.innerWidth < 768 ? 20 : 24) : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              </div>
              <span className="text-xs font-medium md:text-sm">
                Auto-play {isAutoPlaying ? "On" : "Off"}
              </span>
            </button>

            {/* Progress Indicator */}
            <div className="flex-1 max-w-md">
              <div className="h-1 overflow-hidden rounded-full bg-muted/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/70"
                  animate={{
                    width: isAutoPlaying
                      ? "100%"
                      : `${((activeCertificate + 1) / certificates.length) * 100}%`,
                  }}
                  transition={{
                    duration: isAutoPlaying ? 5 : 0.3,
                    ease: "linear",
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1.5">
                <span>
                  {activeCertificate + 1} of {certificates.length}
                </span>
                <span>Swipe or use ← → keys</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
