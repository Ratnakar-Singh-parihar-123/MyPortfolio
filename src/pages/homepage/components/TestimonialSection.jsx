
import React, { useState, useEffect } from "react";
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
  const [selectedCert, setSelectedCert] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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
        "Time Complexity",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
      level: "Intermediate",
      color: "from-purple-500 to-pink-500",
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
        "Hooks & State",
        "Component Architecture",
        "JSX & Virtual DOM",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/240df00a1852",
      level: "Fundamental",
      color: "from-cyan-500 to-blue-500",
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
        "API Integration",
        "Responsive Design",
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/eaae9fd31c8c",
      level: "Intermediate",
      color: "from-green-500 to-emerald-500",
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
      ],
      verificationUrl:
        "https://www.hackerrank.com/certificates/iframe/438c3130ea15",
      level: "Fundamental",
      color: "from-yellow-500 to-amber-500",
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
        "Actively participated in the '45 Days Coding Challenge' organized by Coding Thinker from 14th July 2025. Demonstrated consistent effort, enthusiasm, and dedication towards learning Coding, Data Structures, and Algorithms.",
      skills: ["Coding", "Data Structures", "Algorithms", "Consistency"],
      verificationUrl: "",
      level: "Participation",
      color: "from-violet-500 to-purple-500",
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
        "Successfully completed professional training in Java Programming, Data Structures & Algorithms, and Web Development at Coding Thinker. Gained strong problem-solving and modern web development skills through practical, project-based training.",
      skills: [
        "Java",
        "Data Structures",
        "Algorithms",
        "Web Development",
        "Frontend",
        "Backend Fundamentals",
      ],
      verificationUrl: "",
      level: "Professional",
      color: "from-orange-500 to-red-500",
    },
  ];

  /* Duplicate for seamless infinite loop */
  const loopCerts = [...certificates, ...certificates];

  /* =========================================================
     BODY SCROLL LOCK WHEN MODAL OPEN
  ========================================================= */
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  /* =========================================================
     ESC TO CLOSE
  ========================================================= */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* =========================================================
     PDF DOWNLOAD
  ========================================================= */
  const handleDownloadPDF = async (cert) => {
    if (!cert?.image) {
      alert("Certificate image not available for download.");
      return;
    }

    setIsDownloading(true);
    try {
      const pdf = new jsPDF("landscape", "mm", "a4");

      const img = new window.Image();
      img.src = cert.image;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

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

      pdf.addImage(cert.image, "PNG", x, y, finalWidth, finalHeight);

      pdf.setFontSize(12);
      pdf.setTextColor(100);
      pdf.text(`Issuer: ${cert.issuer}`, 15, 15);
      pdf.text(`Date: ${cert.date}`, pdfWidth - 15, 15, { align: "right" });
      pdf.text(`ID: ${cert.credentialId}`, 15, pdfHeight - 10);

      pdf.save(`${cert.name.replace(/\s+/g, "_")}_Certificate.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  /* =========================================================
     CARD COMPONENT
  ========================================================= */
  const CertCard = ({ cert, index }) => {
    const isHovered = hoveredCard === index;

    return (
      <button
        onMouseEnter={() => {
          setHoveredCard(index);
          setIsPaused(true);
        }}
        onMouseLeave={() => {
          setHoveredCard(null);
          setIsPaused(false);
        }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsPaused(false), 1200);
        }}
        onClick={() => setSelectedCert(cert)}
        className="
          group relative flex flex-col shrink-0
          w-[260px] sm:w-[280px] md:w-[300px]
          bg-card border border-border/60 rounded-2xl
          shadow-sm hover:shadow-xl hover:border-primary/30
          transition-all duration-300
          text-left overflow-hidden
          cursor-pointer
        "
        style={{
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          transition:
            "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s, border-color 0.35s",
        }}
      >
        {/* ===================== IMAGE ===================== */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
          <Image
            src={cert.image}
            alt={cert.name}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-[1.06]"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />

          {/* Issuer badge */}
          <div className="absolute p-1 bg-white rounded-lg shadow-lg top-3 right-3 w-9 h-9 ring-1 ring-black/5">
            <Image
              src={cert.badge}
              alt={cert.issuer}
              className="object-contain w-full h-full"
            />
          </div>

          {/* Level pill */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`inline-flex items-center px-2.5 py-1 bg-gradient-to-r ${cert.color} text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg`}
            >
              {cert.level}
            </span>
          </div>
        </div>

        {/* ===================== CONTENT ===================== */}
        <div className="flex flex-col flex-1 p-4 sm:p-5">
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-2">
            {cert.category}
          </span>

          {/* Title */}
          <h3 className="text-sm sm:text-[15px] font-bold leading-snug text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
            {cert.name}
          </h3>

          {/* Issuer + Date row */}
          <div className="flex items-center justify-between gap-2 mb-3.5 pb-3.5 border-b border-border/60">
            <div className="flex items-center gap-1.5 min-w-0">
              <Icon
                name="Building"
                size={12}
                className="text-muted-foreground shrink-0"
              />
              <span className="text-[11px] font-medium text-muted-foreground truncate">
                {cert.issuer}
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <Icon
                name="Calendar"
                size={12}
                className="text-muted-foreground"
              />
              <span className="text-[11px] font-medium text-muted-foreground">
                {cert.date}
              </span>
            </div>
          </div>

          {/* Skills preview */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cert.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 text-[10px] font-medium bg-muted/60 text-muted-foreground rounded-md border border-border/40"
              >
                {skill}
              </span>
            ))}
            {cert.skills.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium bg-muted/60 text-muted-foreground rounded-md border border-border/40">
                +{cert.skills.length - 3}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/40">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary">
              View details
              <Icon name="ArrowRight" size={12} />
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-medium text-muted-foreground">
                Verified
              </span>
            </div>
          </div>
        </div>
      </button>
    );
  };

  return (
    <section className="relative py-20 overflow-hidden md:py-24 bg-background">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-blue-500/5 blur-3xl" />
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 blur-3xl" />
      </div>

      {/* =========================================================
          SCROLL ANIMATION KEYFRAMES
      ========================================================= */}
      <style>{`
        @keyframes cert-scroll-horizontal {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .cert-scroll-track {
          animation: cert-scroll-horizontal 45s linear infinite;
          will-change: transform;
          width: max-content;
        }

        .cert-scroll-track.is-paused {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .cert-scroll-track {
            animation: none;
          }
        }
      `}</style>

      <div className="relative z-10 container-brand">
        {/* ===================== HEADER ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="mb-10 text-center md:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-5 border rounded-full bg-primary/10 border-primary/20">
            <Icon name="Award" size={16} className="text-primary" />
            <span className="text-xs font-semibold tracking-wider uppercase text-primary">
              Certifications
            </span>
          </div>

          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-foreground">
            Professional{" "}
            <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
              Certifications
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-muted-foreground">
            Industry-recognized credentials validating expertise in modern
            technologies and software development practices.
          </p>

          <div className="inline-flex items-center gap-2 mt-5 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Icon name="MousePointer2" size={12} />
              Hover to pause
            </span>
            <span className="text-border">•</span>
            <span className="flex items-center gap-1.5">
              <Icon name="Hand" size={12} />
              Tap to view
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================
          HORIZONTAL SCROLLING MARQUEE
          Desktop: inset with left/right padding (not edge-to-edge)
          Mobile: full bleed with soft fades
      ========================================================= */}
      <div className="relative w-full">
        {/* Desktop: contained viewport with breathing space on sides */}
        <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative py-6 overflow-hidden border rounded-3xl border-border/40 bg-gradient-to-b from-muted/20 to-transparent sm:py-8 lg:py-10">
            {/* Left fade */}
            {/* <div className="absolute top-0 bottom-0 left-0 z-20 w-12 pointer-events-none sm:w-16 md:w-20 bg-gradient-to-r from-background via-background/85 to-transparent" />

            {/* Right fade */}
            {/* <div className="absolute top-0 bottom-0 right-0 z-20 w-12 pointer-events-none sm:w-16 md:w-20 bg-gradient-to-l from-background via-background/85 to-transparent" /> */} */}

            {/* Scroll viewport */}
            <div
              className="relative overflow-hidden"
              // style={{
              //   maskImage:
              //     "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              //   WebkitMaskImage:
              //     "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
              // }}
            >
              <div
                className={`cert-scroll-track flex gap-4 sm:gap-5 md:gap-6 ${
                  isPaused ? "is-paused" : ""
                }`}
                style={{
                  animationPlayState: isPaused ? "paused" : "running",
                }}
              >
                {loopCerts.map((cert, index) => (
                  <CertCard
                    key={`${cert.id}-${index}`}
                    cert={cert}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted-foreground">
          <div
            className={`w-2 h-2 rounded-full transition-colors ${
              isPaused ? "bg-primary" : "bg-green-500 animate-pulse"
            }`}
          />
          <span className="font-medium">
            {isPaused ? "Paused — click a card" : "Auto-scrolling"}
          </span>
        </div>
      </div>

      {/* =========================================================
          MODAL — DETAILED VIEW
      ========================================================= */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-6"
          >
            <div
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute z-30 flex items-center justify-center transition-all border rounded-full top-3 right-3 w-9 h-9 bg-background/80 backdrop-blur-md border-border/60 text-foreground hover:bg-background hover:text-red-500 active:scale-95"
                aria-label="Close"
              >
                <Icon name="X" size={18} />
              </button>

              <div className="overflow-y-auto overscroll-contain">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* LEFT: IMAGE */}
                  <div className="relative p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-muted/40 to-muted/10">
                    <div className="lg:sticky lg:top-8">
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border/60 shadow-lg bg-white">
                        <Image
                          src={selectedCert.image}
                          alt={selectedCert.name}
                          className="object-contain w-full h-full"
                        />

                        <div className="absolute top-3 right-3 w-12 h-12 p-1.5 bg-white rounded-xl shadow-lg ring-1 ring-black/5">
                          <Image
                            src={selectedCert.badge}
                            alt={selectedCert.issuer}
                            className="object-contain w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-4">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 bg-gradient-to-r ${selectedCert.color} text-white text-xs font-bold uppercase tracking-wider rounded-full shadow`}
                        >
                          {selectedCert.level}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-500">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="font-medium">Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: DETAILS */}
                  <div className="p-5 space-y-5 sm:p-6 lg:p-8">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full">
                        {selectedCert.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Icon name="Calendar" size={13} />
                        {selectedCert.date}
                      </span>
                    </div>

                    <div>
                      <h3 className="mb-2 text-xl font-bold leading-tight sm:text-2xl text-foreground">
                        {selectedCert.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Icon name="Building" size={15} />
                        {selectedCert.issuer}
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selectedCert.description}
                    </p>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2.5">
                        Skills Validated
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedCert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1.5 text-xs font-medium bg-muted/60 text-foreground rounded-lg border border-border/50"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60">
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Icon
                          name="Key"
                          size={13}
                          className="text-muted-foreground"
                        />
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                          Credential ID
                        </span>
                      </div>
                      <div className="font-mono text-xs break-all sm:text-sm text-foreground">
                        {selectedCert.credentialId}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
                      {selectedCert.verificationUrl && (
                        <a
                          href={selectedCert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary to-primary/90 rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-[0.98]"
                        >
                          <Icon name="ExternalLink" size={16} />
                          Verify Certificate
                        </a>
                      )}

                      <button
                        onClick={() => handleDownloadPDF(selectedCert)}
                        disabled={isDownloading}
                        className={`group flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold border border-border text-foreground rounded-xl hover:bg-muted/50 transition-all duration-300 active:scale-[0.98] ${
                          isDownloading ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isDownloading ? (
                          <>
                            <Icon
                              name="Loader"
                              size={16}
                              className="animate-spin"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Icon name="Download" size={16} />
                            Download PDF
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CertificatesSection;
