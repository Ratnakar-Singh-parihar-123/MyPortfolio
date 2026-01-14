import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Download, Printer, Eye, FileText, Award,
  Briefcase, GraduationCap, Star, Mail, Phone,
  MapPin, Menu, Maximize2, Minimize2, ZoomIn,
  ZoomOut, RotateCcw, Smartphone, Monitor,
  ChevronDown, ChevronUp, ExternalLink, Link,
  CheckCircle, Clock, User, Globe, Sparkles,
  Shield, Lock, FileCheck, BarChart3, Code,
  Database, Cloud, Cpu, Smartphone as SmartphoneIcon,
  Tablet, Laptop, Heart, ThumbsUp, TrendingUp,
  Users, GitBranch, Zap, Target, DownloadCloud,
  Share2, Copy, Check, Edit3, BookOpen,
  Coffee, Moon, Sun, Wifi, WifiOff, Search,
  Filter, Grid, List, Settings, HelpCircle,
  Info, AlertCircle, Bell, Star as StarIcon,
  Calendar, Map, Navigation, Compass, Flag,
  Gift, Package, ShoppingBag, Truck, CreditCard,
  DollarSign, Percent, TrendingDown, RefreshCw,
  RotateCw, Play, Pause, StopCircle, SkipBack,
  SkipForward, FastForward, Rewind, Volume2,
  VolumeX, Headphones, Mic, Video, Camera,
  Image, Film, Music, Radio, Tv, Gamepad2,
  Book, Newspaper, PenTool, Brush, Palette,
  Camera as CameraIcon, Film as FilmIcon,
  Music as MusicIcon, Gamepad2 as GamepadIcon
} from "lucide-react";
import Icon from "./AppIcon";
import Button from "./ui/Button";
import resumefile from "../assets/resume/Ratnakar_Singh_Parihar.pdf";

const ResumePopup = ({ isOpen, onClose }) => {
  // State Management
  const [activeTab, setActiveTab] = useState("preview");
  const [scale, setScale] = useState(1);
  const [deviceType, setDeviceType] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showStats, setShowStats] = useState(false);

  // Refs
  const modalRef = useRef(null);
  const pdfContainerRef = useRef(null);
  const pdfIframeRef = useRef(null);
  const tooltipTimeoutRef = useRef(null);

  // Device Detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setDeviceType({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Event Handlers and Effects
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          handleFullscreen();
        } else {
          onClose();
        }
      }
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

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      // Simulate PDF loading
      const timer = setTimeout(() => {
        setPdfLoaded(true);
        setTotalPages(2); // Simulated total pages
      }, 1500);

      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.body.style.overflow = "unset";
      setShowMobileMenu(false);
      setScale(1);
      setCurrentPage(1);
      setDownloadProgress(0);
    };
  }, [isOpen, onClose, isFullscreen]);

  // Tooltip Management
  const showTooltipDelayed = (id) => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    tooltipTimeoutRef.current = setTimeout(() => {
      setShowTooltip(id);
    }, 300);
  };

  const hideTooltip = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowTooltip(null);
  };

  // Zoom Functions
  const handleZoomIn = useCallback(() => {
    setScale(prev => {
      const newScale = Math.min(prev + 0.1, 3);
      return Math.round(newScale * 10) / 10;
    });
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prev => {
      const newScale = Math.max(prev - 0.1, 0.3);
      return Math.round(newScale * 10) / 10;
    });
  }, []);

  const handleResetZoom = useCallback(() => setScale(1), []);

  const handleZoomFit = useCallback(() => {
    if (pdfContainerRef.current && deviceType.isMobile) {
      const containerWidth = pdfContainerRef.current.clientWidth - 40;
      setScale(containerWidth / 794);
    } else {
      setScale(1);
    }
  }, [deviceType.isMobile]);

  // Navigation
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Download and Print
  const handleDownload = useCallback(() => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 50);

    setTimeout(() => {
      clearInterval(interval);
      setDownloadProgress(100);
      
      const link = document.createElement("a");
      link.href = resumefile;
      link.download = "Ratnakar_Singh_Parihar_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => setDownloadProgress(0), 1000);
    }, 1000);
  }, []);

  const handlePrint = useCallback(() => {
    setIsPrinting(true);
    const printWindow = window.open(resumefile, "_blank");
    
    setTimeout(() => {
      if (printWindow) {
        printWindow.focus();
        printWindow.print();
        setIsPrinting(false);
      }
    }, 500);
  }, []);

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      modalRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

  // Share Functions
  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ratnakar Singh Parihar - Resume',
          text: 'Check out my professional resume',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  // Tabs Configuration
  const tabs = [
    { 
      id: "preview", 
      label: "PDF Preview", 
      icon: FileText, 
      mobileLabel: "PDF",
      color: "from-blue-500 to-blue-600"
    },
    { 
      id: "details", 
      label: "Detailed View", 
      icon: Eye, 
      mobileLabel: "Details",
      color: "from-purple-500 to-purple-600"
    },
    { 
      id: "stats", 
      label: "Statistics", 
      icon: BarChart3, 
      mobileLabel: "Stats",
      color: "from-emerald-500 to-emerald-600"
    },
  ];

  // Data
  const skills = {
    "Frontend": [
      { name: "React.js", level: 95, icon: Code },
      { name: "Next.js", level: 90, icon: Code },
      { name: "TypeScript", level: 85, icon: Code },
      { name: "JavaScript", level: 95, icon: Code },
      { name: "HTML5", level: 98, icon: Code },
      { name: "CSS3", level: 95, icon: Code },
      { name: "Tailwind CSS", level: 90, icon: Palette },
      { name: "Material-UI", level: 85, icon: Palette }
    ],
    "Backend": [
      { name: "Node.js", level: 88, icon: Database },
      { name: "Express.js", level: 85, icon: Database },
      { name: "MongoDB", level: 82, icon: Database },
      { name: "REST APIs", level: 90, icon: Cloud },
      { name: "JWT Auth", level: 85, icon: Shield },
      { name: "Socket.io", level: 80, icon: Cpu },
      { name: "Redis", level: 75, icon: Database }
    ],
    "Tools & DevOps": [
      { name: "Git", level: 90, icon: GitBranch },
      { name: "GitHub", level: 95, icon: GitBranch },
      { name: "VS Code", level: 98, icon: Code },
      { name: "Postman", level: 85, icon: Cloud },
      { name: "Vercel", level: 80, icon: Cloud },
      { name: "Netlify", level: 80, icon: Cloud },
      { name: "Docker", level: 70, icon: Package },
      { name: "AWS", level: 65, icon: Cloud }
    ]
  };

  const experience = [
    {
      title: "Full-Stack Developer",
      company: "PortfolioStudio",
      period: "Jun 2023 - Present",
      location: "Remote",
      type: "Full-time",
      achievements: [
        "Developed and maintained 15+ responsive web applications using React and Node.js",
        "Improved application performance by 40% through code optimization techniques",
        "Implemented modern UI/UX designs that increased user engagement by 60%",
        "Collaborated with cross-functional teams using Agile methodologies"
      ],
      tech: ["React", "Node.js", "MongoDB", "AWS", "Docker"]
    },
    {
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      period: "Jan 2023 - May 2023",
      location: "Remote",
      type: "Contract",
      achievements: [
        "Built responsive user interfaces for 10+ client projects",
        "Optimized web applications for performance achieving 95+ Lighthouse scores",
        "Worked with REST APIs and implemented state management solutions",
        "Participated in code reviews and contributed to team knowledge sharing"
      ],
      tech: ["React", "TypeScript", "Tailwind", "Figma"]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Graphic Era Hill University",
      period: "2021 - 2025",
      details: "Specialized in Web Development and Data Structures",
      gpa: "CGPA: 8.5/10",
      courses: ["Web Technologies", "Data Structures", "Algorithms", "Database Systems"]
    }
  ];

  const certifications = [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon", year: "2024", icon: Award },
    { name: "MongoDB Certified Developer", issuer: "MongoDB", year: "2024", icon: Database },
    { name: "Google Cloud Digital Leader", issuer: "Google", year: "2023", icon: Cloud },
    { name: "Microsoft Azure Fundamentals", issuer: "Microsoft", year: "2023", icon: Cloud }
  ];

  const awards = [
    { title: "Best Project Award", issuer: "University Hackathon", year: "2024", icon: Award },
    { title: "Outstanding Performance", issuer: "PortfolioStudio", year: "2023", icon: StarIcon },
    { title: "Coding Competition Winner", issuer: "GeeksforGeeks", year: "2023", icon: Zap }
  ];

  const stats = {
    coding: [
      { label: "LeetCode Problems", value: "260+", icon: Code, color: "text-blue-500" },
      { label: "GitHub Contributions", value: "1500+", icon: GitBranch, color: "text-green-500" },
      { label: "Projects Completed", value: "8+", icon: Briefcase, color: "text-purple-500" },
      { label: "Years Experience", value: "2+", icon: Calendar, color: "text-amber-500" }
    ],
    performance: [
      { label: "Code Quality", value: "95%", icon: Star, color: "text-emerald-500" },
      { label: "Project Delivery", value: "100%", icon: CheckCircle, color: "text-green-500" },
      { label: "Client Satisfaction", value: "98%", icon: Heart, color: "text-red-500" },
      { label: "Bug Resolution", value: "99%", icon: Shield, color: "text-blue-500" }
    ]
  };

  const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];

  // Animation Variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 20,
      rotateX: 5
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 400,
        mass: 0.8
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  // Component for Skill Progress Bar
  const SkillProgress = ({ skill }) => {
    const IconComponent = skill.icon || Code;
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
          </div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
            {skill.level}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
          />
        </div>
      </div>
    );
  };

  // Component for Experience Card
  const ExperienceCard = ({ exp, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl"
    >
      {/* Timeline indicator */}
      <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-gray-800" />
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {exp.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                  {exp.company}
                </span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400">
                  {exp.location}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {exp.tech.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200 dark:border-blue-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm font-bold rounded-full">
            {exp.period}
          </span>
          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium rounded">
            {exp.type}
          </span>
        </div>
      </div>
      
      <ul className="space-y-3">
        {exp.achievements.map((achievement, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 + 0.2 }}
            className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600 dark:text-green-400" />
            </div>
            <span>{achievement}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95" />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-purple-900/30" />
            <div className="absolute inset-0 backdrop-blur-xl" />
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={onClose}
            />
          </motion.div>

          {/* Main Modal */}
          <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
            <motion.div
              ref={modalRef}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`relative bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 w-full h-screen sm:h-auto sm:max-h-[95vh] sm:max-w-7xl overflow-hidden border-0 sm:border border-gray-200/50 dark:border-gray-700/50 ${
                deviceType.isMobile ? 'rounded-none' : 'rounded-3xl'
              }`}
              style={{
                boxShadow: "0 32px 64px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Premium Header */}
              <div className="sticky top-0 z-40 bg-gradient-to-b from-white/98 via-white/96 to-white/94 dark:from-gray-900/98 dark:via-gray-900/96 dark:to-gray-900/94 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Animated Logo */}
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative flex-shrink-0"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <motion.div
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-3 h-3 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Title and Info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent truncate">
                          Interactive Resume
                        </h2>
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800"
                        >
                          {deviceType.isMobile ? (
                            <SmartphoneIcon className="w-3 h-3" />
                          ) : deviceType.isTablet ? (
                            <Tablet className="w-3 h-3" />
                          ) : (
                            <Laptop className="w-3 h-3" />
                          )}
                          {deviceType.isMobile ? "Mobile" : deviceType.isTablet ? "Tablet" : "Desktop"}
                        </motion.span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          Ratnakar Singh Parihar • Full-Stack Developer
                        </p>
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${pdfLoaded ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
                          <span className="text-xs text-gray-500">
                            {pdfLoaded ? 'Online' : 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center Tabs (Desktop/Tablet) */}
                  {!deviceType.isMobile && (
                    <div className="hidden md:flex items-center gap-1 bg-gradient-to-b from-gray-100 to-gray-200/50 dark:from-gray-800 dark:to-gray-900/50 rounded-2xl p-1.5 shadow-inner">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                              isActive
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                            }`}
                          >
                            {isActive && (
                              <motion.div
                                layoutId="activeTab"
                                className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-xl shadow-lg`}
                                transition={{ type: "spring", bounce: 0.2 }}
                              />
                            )}
                            <IconComponent className="relative z-10 w-4 h-4" />
                            <span className="relative z-10">{tab.label}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  )}

                  {/* Right Actions */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Share Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      onMouseEnter={() => showTooltipDelayed('share')}
                      onMouseLeave={hideTooltip}
                      className="relative p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/40 dark:hover:to-blue-700/40 transition-all"
                    >
                      <Share2 className="w-5 h-5" />
                      {showTooltip === 'share' && (
                        <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50">
                          Share Resume
                        </div>
                      )}
                      {copied && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Mobile Menu Button */}
                    {deviceType.isMobile && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="p-2.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-600 dark:text-gray-400"
                      >
                        <Menu className="w-5 h-5" />
                      </motion.button>
                    )}

                    {/* Close Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="p-2.5 rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-400 hover:from-red-100 hover:to-red-200 dark:hover:from-red-800/40 dark:hover:to-red-700/40 transition-all"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Mobile Tabs */}
                {deviceType.isMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <div className="flex gap-2">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <motion.button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            whileTap={{ scale: 0.95 }}
                            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                              isActive
                                ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            <span>{tab.mobileLabel}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mobile Menu */}
              <AnimatePresence>
                {showMobileMenu && deviceType.isMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-20 right-4 z-50 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white">Quick Actions</h3>
                        <button
                          onClick={() => setShowMobileMenu(false)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {activeTab === "preview" && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between px-3 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                            <span className="text-sm font-medium">Zoom Level</span>
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {Math.round(scale * 100)}%
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <button
                              onClick={handleZoomOut}
                              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center"
                            >
                              <ZoomOut className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleResetZoom}
                              className="p-3 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-medium col-span-2"
                            >
                              Reset Zoom
                            </button>
                            <button
                              onClick={handleZoomIn}
                              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center"
                            >
                              <ZoomIn className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={handleZoomFit}
                            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-sm font-medium"
                          >
                            Fit to Screen
                          </button>
                        </div>
                      )}

                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                        <button
                          onClick={handleDownload}
                          className="w-full flex items-center justify-between px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl group"
                        >
                          <div className="flex items-center gap-3">
                            <Download className="w-4 h-4" />
                            <span>Download PDF</span>
                          </div>
                          {downloadProgress > 0 && (
                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${downloadProgress}%` }}
                              />
                            </div>
                          )}
                        </button>
                        
                        <button
                          onClick={handlePrint}
                          className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                        >
                          <Printer className="w-4 h-4" />
                          <span>Print Resume</span>
                          {isPrinting && (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="ml-auto"
                            >
                              <RefreshCw className="w-4 h-4" />
                            </motion.div>
                          )}
                        </button>
                        
                        <button
                          onClick={handleFullscreen}
                          className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                        >
                          {isFullscreen ? (
                            <Minimize2 className="w-4 h-4" />
                          ) : (
                            <Maximize2 className="w-4 h-4" />
                          )}
                          <span>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</span>
                        </button>

                        <button
                          onClick={() => setShowStats(!showStats)}
                          className="w-full flex items-center gap-3 px-3 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl"
                        >
                          <BarChart3 className="w-4 h-4" />
                          <span>View Statistics</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main Content */}
              <div
                className="overflow-y-auto"
                style={{
                  maxHeight: deviceType.isMobile 
                    ? "calc(100vh - 180px)" 
                    : deviceType.isTablet 
                    ? "calc(95vh - 140px)" 
                    : "calc(95vh - 120px)"
                }}
              >
                {/* PDF Preview Tab */}
                {activeTab === "preview" && (
                  <div className="p-2 sm:p-4 bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900/50">
                    <div
                      ref={pdfContainerRef}
                      className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                    >
                      {/* Enhanced Floating Controls */}
                      {!deviceType.isMobile && (
                        <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
                          {/* Zoom Controls */}
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 border border-gray-200/50 dark:border-gray-700/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                                ZOOM CONTROLS
                              </span>
                              <button
                                onClick={handleResetZoom}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                Reset
                              </button>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleZoomOut}
                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <ZoomOut className="w-4 h-4" />
                              </motion.button>
                              
                              <div className="relative">
                                <select
                                  value={scale}
                                  onChange={(e) => setScale(parseFloat(e.target.value))}
                                  className="appearance-none w-24 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm font-semibold text-gray-800 dark:text-gray-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  {zoomLevels.map(level => (
                                    <option key={level} value={level}>
                                      {Math.round(level * 100)}%
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none text-gray-500" />
                              </div>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleZoomIn}
                                className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                              >
                                <ZoomIn className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </motion.div>

                          {/* Page Navigation */}
                          {totalPages > 1 && (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 }}
                              className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-2xl p-3 border border-gray-200/50 dark:border-gray-700/50"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={handlePrevPage}
                                  disabled={currentPage === 1}
                                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <ChevronUp className="w-4 h-4" />
                                </motion.button>
                                
                                <div className="text-center">
                                  <div className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                    Page {currentPage}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    of {totalPages}
                                  </div>
                                </div>
                                
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={handleNextPage}
                                  disabled={currentPage === totalPages}
                                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <ChevronDown className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Mobile PDF Controls */}
                      {deviceType.isMobile && (
                        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                          <div className="flex items-center gap-2 bg-black/80 backdrop-blur-xl rounded-full px-4 py-2">
                            <button
                              onClick={handleZoomOut}
                              className="p-1.5 text-white"
                            >
                              <ZoomOut className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-bold text-white px-2">
                              {Math.round(scale * 100)}%
                            </span>
                            <button
                              onClick={handleZoomIn}
                              className="p-1.5 text-white"
                            >
                              <ZoomIn className="w-4 h-4" />
                            </button>
                            <button
                              onClick={handleZoomFit}
                              className="text-xs px-3 py-1.5 bg-blue-500 text-white rounded-full ml-2"
                            >
                              Fit
                            </button>
                          </div>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={handleFullscreen}
                            className="p-2.5 bg-black/80 backdrop-blur-xl rounded-full text-white"
                          >
                            <Maximize2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      )}

                      {/* PDF Viewer */}
                      <div className="p-6 sm:p-10">
                        <div
                          className="mx-auto overflow-auto"
                          style={{
                            maxWidth: '794px',
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            minHeight: deviceType.isMobile ? '500px' : '700px'
                          }}
                        >
                          <iframe
                            ref={pdfIframeRef}
                            src={`${resumefile}#toolbar=0&navpanes=0&scrollbar=0&page=${currentPage}`}
                            title="Resume PDF Preview"
                            className="w-full h-full min-h-[500px] sm:min-h-[700px] border-0 shadow-2xl rounded-lg"
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Bottom Info Bar */}
                      <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-900/50">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                Secure Document
                              </span>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="w-4 h-4" />
                              <span>Updated: Jan 2024</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {totalPages} Pages • {currentPage} Active
                              </span>
                            </div>
                            <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 text-green-800 dark:text-green-300 text-xs font-bold rounded-full">
                              No Edit Protection
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Detailed View Tab */}
                {activeTab === "details" && (
                  <div className="p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900">
                    {/* Enhanced Header */}
                    <div className="text-center mb-10 pb-8 border-b border-gray-200/50 dark:border-gray-800/50">
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8"
                      >
                        <div className="text-left">
                          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
                            Ratnakar Singh Parihar
                          </h1>
                          <h2 className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-semibold mt-2">
                            Full-Stack Developer & Problem Solver
                          </h2>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-3">
                          {stats.coding.map((stat, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ scale: 1.05, y: -5 }}
                              className="text-center px-4 py-3 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                            >
                              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                              <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">
                                {stat.label}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Contact Info */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <Mail className="w-5 h-5" />
                          <span className="truncate">contact@ratnakar.dev</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <Phone className="w-5 h-5" />
                          <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                          <MapPin className="w-5 h-5" />
                          <span>Dehradun, Uttarakhand</span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column - Main Content */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Summary */}
                        <motion.section
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              Professional Summary
                            </h3>
                          </div>
                          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            Final year Computer Science student with expertise in MERN stack development.
                            Built 8+ production applications with focus on performance, scalability, and
                            user experience. Strong problem-solving skills with 260+ LeetCode solutions.
                            Passionate about clean code and modern web technologies.
                          </p>
                        </motion.section>

                        {/* Experience */}
                        <motion.section
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                              <Briefcase className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              Experience
                            </h3>
                          </div>

                          <div className="relative pl-6 border-l-2 border-blue-200 dark:border-blue-800 ml-3">
                            {experience.map((exp, idx) => (
                              <ExperienceCard key={idx} exp={exp} index={idx} />
                            ))}
                          </div>
                        </motion.section>

                        {/* Skills */}
                        <motion.section
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="space-y-6"
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                              <Code className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              Technical Skills
                            </h3>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(skills).map(([category, skillList], idx) => (
                              <div
                                key={idx}
                                className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg"
                              >
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
                                  {category}
                                </h4>
                                <div className="space-y-4">
                                  {skillList.map((skill, i) => (
                                    <SkillProgress key={i} skill={skill} />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.section>
                      </div>

                      {/* Right Column - Sidebar */}
                      <div className="space-y-8">
                        {/* Education */}
                        <motion.section
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Education
                            </h3>
                          </div>

                          <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                              {education[0].degree}
                            </h4>
                            <p className="text-blue-600 dark:text-blue-400 text-sm mt-2 font-medium">
                              {education[0].institution}
                            </p>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-gray-500 dark:text-gray-400 text-sm">
                                {education[0].period}
                              </span>
                              <span className="px-3 py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 font-bold rounded-full">
                                {education[0].gpa}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-4">
                              {education[0].details}
                            </p>
                            
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Key Courses:
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {education[0].courses.map((course, i) => (
                                  <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
                                  >
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.section>

                        {/* Certifications */}
                        <motion.section
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="space-y-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                              <Award className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Certifications
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {certifications.map((cert, idx) => {
                              const IconComponent = cert.icon;
                              return (
                                <motion.div
                                  key={idx}
                                  whileHover={{ x: 5 }}
                                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 border border-gray-200/50 dark:border-gray-700/50 rounded-xl hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
                                >
                                  <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg">
                                    <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                      {cert.name}
                                    </h4>
                                    <div className="flex items-center justify-between mt-1">
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {cert.issuer}
                                      </span>
                                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                                        {cert.year}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.section>

                        {/* Contact Card */}
                        <motion.section
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50"
                        >
                          <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4">
                            Get in Touch
                          </h3>
                          <div className="space-y-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.location.href = "mailto:contact@ratnakar.dev"}
                              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                            >
                              <Mail className="w-5 h-5" />
                              Send Email
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => window.open('https://portfolio.ratnakar.dev', '_blank')}
                              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:border-blue-400 dark:hover:border-blue-600 transition-colors"
                            >
                              <ExternalLink className="w-5 h-5" />
                              View Portfolio
                            </motion.button>
                          </div>
                        </motion.section>
                      </div>
                    </div>
                  </div>
                )}

                {/* Statistics Tab */}
                {activeTab === "stats" && (
                  <div className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                    <div className="max-w-6xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                      >
                        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Resume Analytics
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-3">
                          Detailed statistics and insights about my professional journey
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {stats.coding.map((stat, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-xl ${stat.color.replace('text', 'bg')}/10`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                              </div>
                              <div className="text-right">
                                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                  {stat.value}
                                </div>
                                <div className="text-sm text-gray-500">{stat.label}</div>
                              </div>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.random() * 80 + 20}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`h-full ${stat.color.replace('text', 'bg')} rounded-full`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Additional stats visualization would go here */}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Footer */}
              <div className="sticky bottom-0 border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl p-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${pdfLoaded ? 'bg-green-100 dark:bg-green-900/30' : 'bg-yellow-100 dark:bg-yellow-900/30'}`}>
                      {pdfLoaded ? (
                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                      )}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {activeTab === "preview"
                          ? `PDF ${pdfLoaded ? 'Ready' : 'Loading...'} • Page ${currentPage}/${totalPages}`
                          : 'Detailed View Mode'
                        }
                      </span>
                      <div className="text-xs text-gray-500">
                        Last updated: Jan 2024 • v2.1.0
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Progress Indicator for Download */}
                    {downloadProgress > 0 && downloadProgress < 100 && (
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${downloadProgress}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                          {downloadProgress}%
                        </span>
                      </div>
                    )}

                    {/* Primary Actions */}
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow"
                      >
                        <Download className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {isPrinting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <Printer className="w-4 h-4" />
                        )}
                        <span className="hidden sm:inline">Print</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFullscreen}
                        className="p-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {isFullscreen ? (
                          <Minimize2 className="w-4 h-4" />
                        ) : (
                          <Maximize2 className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
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