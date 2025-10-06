import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

// certificatesImg
import problemSolvingBasic from "../../../assets/caritificatesImg/Problem Silving Basic.png";
import problemSolvingIntermedated from "../../../assets/caritificatesImg/Problem solving intermedate.png";
import reactBasic from "../../../assets/caritificatesImg/React Basic.png";
import frontendRect from "../../../assets/caritificatesImg/frontend React.png";
import javaScriptBasic from "../../../assets/caritificatesImg/javascript basic.png";

const CertificatesSection = () => {
  const [activeCertificate, setActiveCertificate] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const certificates = [
    {
      id: 1,
      name: "Problem Solving (Basic)",
      issuer: "HackerRank",
      date: "October 2024",
      category: "Programming Fundamentals",
      credentialId: "HR-PSB-2024-001",
      image: problemSolvingBasic,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Demonstrates strong foundational problem-solving and algorithmic thinking skills using data structures and logical reasoning. Covers challenges involving loops, arrays, conditionals, and mathematical logic — validating the ability to write efficient and optimized code for real-world programming problems.",
      skills: [
        "Algorithms",
        "Data Structures",
        "Logic Building",
        "Analytical Thinking",
      ],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/5ce289a1a111",
      level: "Fundamental",
    },
    {
      id: 2,
      name: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "September 2024",
      category: "Programming & Algorithms",
      credentialId: "HR-PSI-2024-002",
      image: problemSolvingIntermedated,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Validates advanced problem-solving and algorithmic reasoning skills, focusing on complex data structures, recursion, optimization techniques, and time complexity analysis. Demonstrates the ability to write efficient, scalable, and clean code to tackle real-world computational challenges.",
      skills: [
        "Algorithms",
        "Data Structures",
        "Dynamic Programming",
        "Optimization",
        "Time Complexity Analysis",
      ],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
      level: "Intermediate",
    },
    {
      id: 3,
      name: "React (Basic)",
      issuer: "HackerRank",
      date: "August 2024",
      category: "Frontend Development",
      credentialId: "HR-RB-2024-003",
      image: reactBasic,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Demonstrates foundational proficiency in React.js, covering key concepts like components, state management, props, hooks, and JSX. Validates the ability to build modular, maintainable, and interactive user interfaces using modern React development practices.",
      skills: [
        "React.js",
        "Hooks & State Management",
        "Component Architecture",
        "JSX & Virtual DOM",
      ],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/240df00a1852",
      level: "Fundamental",
    },
    {
      id: 4,
      name: "Frontend Developer (React)",
      issuer: "HackerRank",
      date: "July 2024",
      category: "Frontend Development",
      credentialId: "HR-FR-2024-004",
      image: frontendRect,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Validates practical skills in building dynamic, component-driven user interfaces using React.js. Demonstrates understanding of key frontend concepts such as state and props management, React Hooks, routing, reusable UI architecture, and integration with REST APIs — showcasing the ability to create responsive and maintainable web applications.",
      skills: [
        "React.js",
        "JavaScript (ES6+)",
        "React Hooks",
        "Routing & State Management",
        "API Integration",
        "Responsive Design",
      ],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/eaae9fd31c8c",
      level: "Intermediate",
    },
    {
      id: 5,
      name: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "July 2024",
      category: "Web Development",
      credentialId: "HR-JSB-2024-005",
      image: javaScriptBasic,
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      description:
        "Demonstrates a solid understanding of core JavaScript fundamentals including syntax, data types, functions, scope, and control structures. Validates the ability to write clean, logical, and efficient code using modern JavaScript concepts such as ES6+, DOM manipulation, and event handling — essential for building interactive web applications.",
      skills: [
        "JavaScript (ES6+)",
        "Functions & Scope",
        "DOM Manipulation",
        "Event Handling",
        "Problem Solving",
      ],
      verificationUrl: "https://www.hackerrank.com/certificates/iframe/240df00a1852",
      level: "Fundamental",
    },
  ];

  // const stats = [
  //   { number: "12+", label: "Certifications", icon: "Award" },
  //   { number: "4", label: "Cloud Platforms", icon: "Cloud" },
  //   { number: "100%", label: "Up-to-date", icon: "CheckCircle" },
  //   { number: "2024", label: "Latest Year", icon: "Calendar" },
  // ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveCertificate((prev) => (prev + 1) % certificates?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, certificates?.length]);

  const nextCertificate = () => {
    setActiveCertificate((prev) => (prev + 1) % certificates?.length);
    setIsAutoPlaying(false);
  };

  const prevCertificate = () => {
    setActiveCertificate(
      (prev) => (prev - 1 + certificates?.length) % certificates?.length
    );
    setIsAutoPlaying(false);
  };

  const goToCertificate = (index) => {
    setActiveCertificate(index);
    setIsAutoPlaying(false);
  };

  const currentCert = certificates?.[activeCertificate];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-brand">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Professional Certifications
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuously expanding expertise through industry-recognized
            certifications and staying current with cutting-edge technologies.
          </p>
        </motion.div>

        {/* Main Certificate Display */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevCertificate}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200 z-10"
              aria-label="Previous certificate"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            <button
              onClick={nextCertificate}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 w-12 h-12 bg-background border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200 z-10"
              aria-label="Next certificate"
            >
              <Icon name="ChevronRight" size={20} />
            </button>

            {/* Certificate Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCertificate}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
              >
                {/* Certificate Visual */}
                <div className="relative">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-brand p-1">
                    <Image
                      src={currentCert?.image}
                      alt={currentCert?.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>

                    {/* Badge Overlay */}
                    <div className="absolute top-4 right-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg">
                        <Image
                          src={currentCert?.badge}
                          alt={`${currentCert?.issuer} badge`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full border">
                        {currentCert?.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                        {currentCert?.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {currentCert?.date}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {currentCert?.name}
                    </h3>
                    <p className="text-lg text-primary font-medium mb-4">
                      {currentCert?.issuer}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentCert?.description}
                    </p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Key Skills Validated
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentCert?.skills?.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-lg border border-border"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Credential Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-card border border-border rounded-lg">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Credential ID
                      </div>
                      <div className="font-mono text-sm text-foreground">
                        {currentCert?.credentialId}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">
                        Status
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span className="text-sm font-medium text-success">
                          Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button className="flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                      <Icon name="ExternalLink" size={18} />
                      <span>Verify Certificate</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors">
                      <Icon name="Download" size={18} />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Certificate Indicators */}
          <div className="flex justify-center space-x-2 mt-12">
            {certificates?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToCertificate(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === activeCertificate
                    ? "bg-primary scale-125"
                    : "bg-muted hover:bg-muted-foreground/30"
                }`}
                aria-label={`View certificate ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              <span>{isAutoPlaying ? "Pause" : "Play"} auto-rotation</span>
            </button>
          </div>
        </div>

        {/* Certification Stats */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border"
        >
          {stats?.map((stat, index) => (
            <motion.div
              key={stat?.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3">
                <Icon name={stat?.icon} size={24} className="text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat?.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat?.label}
              </div>
            </motion.div>
          ))}
        </motion.div> */}
      </div>
    </section>
  );
};

export default CertificatesSection;
