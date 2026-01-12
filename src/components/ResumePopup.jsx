import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Download, Printer, Eye, FileText, Award,
  Briefcase, GraduationCap, Star, Mail, Phone,
  MapPin, Menu, Maximize2, Minimize2, ZoomIn,
  ZoomOut, RotateCcw, Smartphone, Monitor,
  ChevronDown, ChevronUp, ExternalLink, Link,
  CheckCircle, Clock, User, Globe
} from "lucide-react";
import Icon from "./AppIcon";
import Button from "./ui/Button";
import resumefile from "../assets/resume/Ratnakar_Singh_Parihar.pdf";

const ResumePopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showZoomControls, setShowZoomControls] = useState(true);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const modalRef = useRef(null);
  const pdfContainerRef = useRef(null);
  const pdfIframeRef = useRef(null);

  // Responsive breakpoints
  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    checkResponsive();
    window.addEventListener('resize', checkResponsive);

    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Event listeners and effects
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "+" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleZoomIn();
      }
      if (e.key === "-" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleZoomOut();
      }
      if (e.key === "0" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleResetZoom();
      }
    };

    document.addEventListener("keydown", handleEscape);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto-detect pages after PDF loads
      setTimeout(() => {
        if (pdfIframeRef.current) {
          const iframe = pdfIframeRef.current;
          iframe.onload = () => {
            try {
              const pdf = iframe.contentWindow?.PDFViewerApplication?.pdfDocument;
              if (pdf) {
                pdf.getPageCount().then(count => {
                  setTotalPages(count);
                });
              }
            } catch (e) {
              console.log("PDF page detection not available");
            }
            setPdfLoaded(true);
          };
        }
      }, 1000);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
      setShowMobileMenu(false);
      setScale(1);
      setCurrentPage(1);
    };
  }, [isOpen, onClose]);

  // Zoom handlers
  const handleZoomIn = () => {
    setScale(prev => {
      const newScale = Math.min(prev + 0.1, 3);
      return Math.round(newScale * 10) / 10;
    });
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.1, 0.3);
      return Math.round(newScale * 10) / 10;
    });
  };

  const handleResetZoom = () => setScale(1);

  const handleZoomFit = () => {
    if (pdfContainerRef.current && isMobile) {
      const containerWidth = pdfContainerRef.current.clientWidth - 40;
      setScale(containerWidth / 794); // Standard A4 width in pixels
    } else {
      setScale(1);
    }
  };

  const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Download and Print
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumefile;
    link.download = "Ratnakar_Singh_Parihar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("resume-print-content");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Ratnakar Singh Parihar - Resume</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
              
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: 'Inter', sans-serif;
                line-height: 1.6;
                color: #1f2937;
                background: #fff;
                padding: 20px;
                max-width: 1000px;
                margin: 0 auto;
              }
              
              .resume-header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #3b82f6;
              }
              
              .name { font-size: 28px; font-weight: 700; color: #1e40af; margin-bottom: 6px; }
              .title { font-size: 18px; font-weight: 500; color: #4b5563; margin-bottom: 15px; }
              
              .contact-info {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: #6b7280;
              }
              
              .contact-item { display: flex; align-items: center; gap: 6px; }
              .section { margin-bottom: 25px; page-break-inside: avoid; }
              
              .section-title {
                font-size: 16px;
                font-weight: 600;
                color: #1e40af;
                margin-bottom: 12px;
                padding-bottom: 6px;
                border-bottom: 1px solid #dbeafe;
                text-transform: uppercase;
                letter-spacing: 0.3px;
              }
              
              .experience-item, .education-item { margin-bottom: 20px; page-break-inside: avoid; }
              .item-header { margin-bottom: 6px; }
              .item-title { font-weight: 600; font-size: 15px; color: #1f2937; }
              .item-subtitle { color: #3b82f6; font-size: 13px; }
              .item-date { color: #6b7280; font-size: 13px; font-weight: 500; }
              
              ul { margin-left: 18px; margin-top: 6px; }
              li { margin-bottom: 3px; font-size: 13px; color: #4b5563; }
              
              .skills-grid { display: grid; grid-template-columns: 1fr; gap: 15px; margin-top: 8px; }
              .skill-category h4 { font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 8px; }
              .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
              .skill-tag { 
                background: #eff6ff; 
                color: #1d4ed8; 
                padding: 3px 8px; 
                border-radius: 15px; 
                font-size: 11px; 
                font-weight: 500; 
                border: 1px solid #dbeafe; 
              }
              
              .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 8px; }
              .stat-item { text-align: center; padding: 12px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; }
              .stat-value { font-size: 20px; font-weight: 700; color: #1e40af; margin-bottom: 3px; }
              .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.3px; }
              
              .certifications { display: grid; grid-template-columns: 1fr; gap: 12px; margin-top: 8px; }
              .cert-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #4b5563; }
              
              .awards { margin-top: 8px; }
              .award-item { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 8px 0; 
                border-bottom: 1px solid #f1f5f9; 
              }
              .award-item:last-child { border-bottom: none; }
              
              @media (min-width: 768px) {
                body { padding: 40px; }
                .name { font-size: 36px; }
                .contact-info { 
                  flex-direction: row; 
                  flex-wrap: wrap; 
                  justify-content: center; 
                  gap: 20px; 
                }
                .skills-grid { grid-template-columns: repeat(2, 1fr); }
                .certifications { grid-template-columns: repeat(2, 1fr); }
              }
              
              @media print {
                body { padding: 20px; }
                .section { page-break-inside: avoid; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // Navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // Tabs
  const tabs = [
    { id: "preview", label: "PDF Preview", icon: FileText, mobileLabel: "PDF" },
    { id: "details", label: "Detailed View", icon: Eye, mobileLabel: "Details" },
  ];

  // Data
  const skills = {
    "Frontend": ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Material-UI"],
    "Backend": ["Node.js", "Express.js", "MongoDB", "REST APIs", "JWT Auth", "Socket.io", "Redis"],
    "Tools & DevOps": ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Netlify", "Docker", "AWS"]
  };

  const experience = [
    {
      title: "Full-Stack Developer",
      company: "PortfolioStudio",
      period: "Jun 2023 - Present",
      location: "Remote",
      achievements: [
        "Developed and maintained 15+ responsive web applications using React and Node.js",
        "Improved application performance by 40% through code optimization techniques",
        "Implemented modern UI/UX designs that increased user engagement by 60%",
        "Collaborated with cross-functional teams using Agile methodologies"
      ]
    },
    {
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      period: "Jan 2023 - May 2023",
      location: "Remote",
      achievements: [
        "Built responsive user interfaces for 10+ client projects",
        "Optimized web applications for performance achieving 95+ Lighthouse scores",
        "Worked with REST APIs and implemented state management solutions",
        "Participated in code reviews and contributed to team knowledge sharing"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Graphic Era Hill University",
      period: "2021 - 2025",
      details: "Specialized in Web Development and Data Structures",
      gpa: "CGPA: 8.5/10"
    }
  ];

  const certifications = [
    "AWS Certified Cloud Practitioner",
    "MongoDB Certified Developer",
    "Google Cloud Digital Leader",
    "Microsoft Azure Fundamentals"
  ];

  const awards = [
    { title: "Best Project Award", issuer: "University Hackathon", year: "2024" },
    { title: "Outstanding Performance", issuer: "PortfolioStudio", year: "2023" },
    { title: "Coding Competition Winner", issuer: "GeeksforGeeks", year: "2023" }
  ];

  const stats = [
    { value: "260+", label: "LeetCode" },
    { value: "200+", label: "GFG Questions" },
    { value: "8+", label: "Projects" },
    { value: "2+", label: "Years Exp" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95, y: isMobile ? 20 : 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: isMobile ? 20 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative bg-white dark:bg-gray-900 rounded-none sm:rounded-2xl shadow-2xl w-full h-screen sm:h-auto sm:max-h-[95vh] sm:max-w-7xl overflow-hidden border-0 sm:border border-gray-200 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-20 bg-gradient-to-r from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Title and Device Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="hidden sm:flex p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                          Resume
                        </h2>
                        <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                          {isMobile ? <Smartphone className="w-3 h-3" /> :
                            isTablet ? <Monitor className="w-3 h-3" /> :
                              <Monitor className="w-3 h-3" />}
                          {isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        Ratnakar Singh Parihar • Full-Stack Developer
                      </p>
                    </div>
                  </div>

                  {/* Center: Tabs for Desktop/Tablet */}
                  {!isMobile && (
                    <div className="hidden md:flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                                ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                              }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Right: Actions */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Zoom Indicator */}
                    {activeTab === "preview" && !isMobile && (
                      <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        <ZoomOut className="w-3 h-3 text-gray-500" />
                        <span className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300 min-w-[40px] text-center">
                          {Math.round(scale * 100)}%
                        </span>
                        <ZoomIn className="w-3 h-3 text-gray-500" />
                      </div>
                    )}

                    {/* Mobile Menu Button */}
                    {isMobile && (
                      <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        aria-label="Menu"
                      >
                        <Menu className="w-5 h-5" />
                      </button>
                    )}

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300" />
                    </button>
                  </div>
                </div>

                {/* Mobile Tabs */}
                {isMobile && (
                  <div className="mt-4">
                    <div className="flex gap-2">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                              }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{tab.mobileLabel}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Overlay */}
              {showMobileMenu && isMobile && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-20 right-4 z-30 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 w-64"
                >
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 px-2">
                      Quick Actions
                    </h3>

                    {activeTab === "preview" && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <span className="text-sm">Zoom Level</span>
                          <span className="text-sm font-bold">{Math.round(scale * 100)}%</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={handleZoomOut}
                            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                          >
                            <ZoomOut className="w-4 h-4" />
                          </button>
                          <button
                            onClick={handleResetZoom}
                            className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                          >
                            Reset
                          </button>
                          <button
                            onClick={handleZoomIn}
                            className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={handleZoomFit}
                          className="w-full p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium"
                        >
                          Fit to Screen
                        </button>
                      </div>
                    )}

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button
                        onClick={handlePrint}
                        className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Printer className="w-4 h-4" />
                        Print Resume
                      </button>
                      <button
                        onClick={handleFullscreen}
                        className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        <Maximize2 className="w-4 h-4" />
                        Fullscreen
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Content Area */}
              <div
                className="overflow-y-auto"
                style={{
                  maxHeight: isMobile ? "calc(100vh - 180px)" :
                    isTablet ? "calc(95vh - 140px)" :
                      "calc(95vh - 120px)"
                }}
              >
                {activeTab === "preview" ? (
                  <div className="p-2 sm:p-4 bg-gray-50 dark:bg-gray-800/50">
                    {/* PDF Container with Enhanced Controls */}
                    <div
                      ref={pdfContainerRef}
                      className="relative bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      {/* Floating Controls for Desktop */}
                      {!isMobile && (
                        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                          <div className="flex flex-col bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-2">
                            <div className="flex items-center gap-2 mb-2">
                              <button
                                onClick={handleZoomOut}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label="Zoom out"
                              >
                                <ZoomOut className="w-4 h-4" />
                              </button>
                              <div className="relative">
                                <select
                                  value={scale}
                                  onChange={(e) => setScale(parseFloat(e.target.value))}
                                  className="appearance-none bg-transparent border-0 text-sm font-medium text-gray-700 dark:text-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                  {zoomLevels.map(level => (
                                    <option key={level} value={level}>
                                      {Math.round(level * 100)}%
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 pointer-events-none" />
                              </div>
                              <button
                                onClick={handleZoomIn}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                aria-label="Zoom in"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={handleResetZoom}
                              className="text-xs px-2 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                              Reset Zoom
                            </button>
                          </div>

                          {/* Page Navigation */}
                          {totalPages > 1 && (
                            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg p-2">
                              <div className="flex items-center justify-between gap-2">
                                <button
                                  onClick={handlePrevPage}
                                  disabled={currentPage === 1}
                                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </button>
                                <span className="text-sm font-medium">
                                  {currentPage} / {totalPages}
                                </span>
                                <button
                                  onClick={handleNextPage}
                                  disabled={currentPage === totalPages}
                                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Mobile PDF Controls Bar */}
                      {isMobile && activeTab === "preview" && (
                        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-2">
                            <button
                              onClick={handleZoomOut}
                              className="p-1 text-white"
                            >
                              <ZoomOut className="w-4 h-4" />
                            </button>
                            <span className="text-xs font-medium text-white px-2">
                              {Math.round(scale * 100)}%
                            </span>
                            <button
                              onClick={handleZoomIn}
                              className="p-1 text-white"
                            >
                              <ZoomIn className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleZoomFit}
                              className="text-xs text-white px-2 py-1 bg-blue-500/50 rounded"
                            >
                              Fit
                            </button>
                          </div>
                          <button
                            onClick={handleFullscreen}
                            className="p-2 bg-black/70 backdrop-blur-sm rounded-full text-white"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* PDF Viewer */}
                      <div className="p-4 sm:p-8">
                        <div
                          className="mx-auto overflow-auto"
                          style={{
                            maxWidth: '794px',
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            minHeight: isMobile ? '400px' : '600px'
                          }}
                        >
                          <iframe
                            ref={pdfIframeRef}
                            src={`${resumefile}#toolbar=0&navpanes=0&page=${currentPage}`}
                            title="Resume PDF Preview"
                            className="w-full h-full min-h-[400px] sm:min-h-[600px] border-0 shadow-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-blue-500" />
                              <span className="text-sm font-medium">Secure PDF Document</span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>Updated: Jan 2024</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
                              No Edit Protection
                            </span>
                            <button
                              onClick={() => setShowZoomControls(!showZoomControls)}
                              className="hidden sm:inline text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              {showZoomControls ? "Hide Controls" : "Show Controls"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Detailed Resume View
                  <div id="resume-print-content" className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900">
                    {/* Responsive Header */}
                    <div className="text-center mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="text-left">
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Ratnakar Singh Parihar
                          </h1>
                          <h2 className="text-lg sm:text-xl text-blue-600 dark:text-blue-400 font-medium">
                            Full-Stack Developer & Problem Solver
                          </h2>
                        </div>
                        <div className="flex flex-col items-center sm:items-end gap-2">
                          <div className="flex items-center gap-2">
                            {stats.map((stat, idx) => (
                              <div key={idx} className="text-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">ratnakar.parihar@example.com</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Dehradun, Uttarakhand</span>
                        </div>
                      </div>
                    </div>

                    {/* Responsive Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                      {/* Main Content */}
                      <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Summary */}
                        <section className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Professional Summary
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Final year Computer Science student with expertise in MERN stack development.
                            Built 8+ production applications with focus on performance, scalability, and
                            user experience. Strong problem-solving skills with 260+ LeetCode solutions.
                            Passionate about clean code and modern web technologies.
                          </p>
                        </section>

                        {/* Experience */}
                        <section className="space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Experience
                            </h3>
                          </div>

                          <div className="space-y-6">
                            {experience.map((exp, idx) => (
                              <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                                  <div>
                                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                      {exp.title}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                                        {exp.company}
                                      </span>
                                      <span className="text-gray-500">•</span>
                                      <span className="text-gray-500 dark:text-gray-400">
                                        {exp.location}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full w-fit">
                                    {exp.period}
                                  </span>
                                </div>
                                <ul className="space-y-2">
                                  {exp.achievements.map((achievement, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-600 dark:text-gray-300">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span>{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* Skills */}
                        <section className="space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <Icon name="Code" size={20} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Technical Skills
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(skills).map(([category, skillList], idx) => (
                              <div key={idx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5">
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                  {category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {skillList.map(skill => (
                                    <span
                                      key={skill}
                                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-800"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-6 md:space-y-8">
                        {/* Education */}
                        <section className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Education
                            </h3>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              {education[0].degree}
                            </h4>
                            <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                              {education[0].institution}
                            </p>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                {education[0].period}
                              </span>
                              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                                {education[0].gpa}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-3">
                              {education[0].details}
                            </p>
                          </div>
                        </section>

                        {/* Certifications */}
                        <section className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Certifications
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {certifications.map((cert, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <Award className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{cert}</span>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* Awards */}
                        <section className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                              <Star className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Awards
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {awards.map((award, idx) => (
                              <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                    {award.title}
                                  </h4>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {award.issuer}
                                  </p>
                                </div>
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded">
                                  {award.year}
                                </span>
                              </div>
                            ))}
                          </div>
                        </section>

                        {/* Quick Contact */}
                        <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                            Get in Touch
                          </h3>
                          <div className="space-y-3">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
                              <Mail className="w-4 h-4" />
                              Send Email
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                              <Link className="w-4 h-4" />
                              View Portfolio
                            </button>
                          </div>
                        </section>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        References and project portfolio available upon request
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Last updated: January 2024 • Document ID: RSP-2024-RES
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${pdfLoaded ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    <span>
                      {activeTab === "preview"
                        ? `${pdfLoaded ? 'PDF Loaded' : 'Loading PDF...'} • Page ${currentPage} of ${totalPages}`
                        : 'Detailed Resume View'
                      }
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-normal">
                    {/* Mobile Quick Actions */}
                    {isMobile && (
                      <>
                        <button
                          onClick={handleDownload}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium"
                        >
                          <Download className="w-4 h-4" />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                        <button
                          onClick={handlePrint}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                        >
                          <Printer className="w-4 h-4" />
                          <span className="hidden sm:inline">Print</span>
                        </button>
                      </>
                    )}

                    {/* Desktop Actions */}
                    {!isMobile && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Download"
                          onClick={handleDownload}
                        >
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Printer"
                          onClick={handlePrint}
                        >
                          Print
                        </Button>
                        <Button
                          variant="gradient"
                          size="sm"
                          iconName="Mail"
                          className="bg-gradient-to-r from-blue-600 to-purple-600"
                          onClick={() => window.location.href = "mailto:ratnakar.parihar@example.com"}
                        >
                          Contact
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumePopup;