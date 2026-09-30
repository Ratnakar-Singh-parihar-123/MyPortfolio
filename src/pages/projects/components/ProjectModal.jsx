import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Maximize2,
  Minimize2,
  ExternalLink,
  Download,
  Github,
  Calendar,
  Users,
  Star,
  CheckCircle,
  Smartphone,
  Eye,
  Cpu,
  Layers,
  TrendingUp,
  Target,
  AlertCircle,
  Lightbulb,
  FolderKanban,
} from "lucide-react";
import Icon from "../../../components/AppIcon";

/* ============================================================
   🎨 TAB COLORS
   ============================================================ */
const TAB_COLORS = {
  blue: {
    textActive: "text-blue-600 dark:text-blue-400",
    underline: "bg-blue-500",
  },
  purple: {
    textActive: "text-purple-600 dark:text-purple-400",
    underline: "bg-purple-500",
  },
  emerald: {
    textActive: "text-emerald-600 dark:text-emerald-400",
    underline: "bg-emerald-500",
  },
  orange: {
    textActive: "text-orange-600 dark:text-orange-400",
    underline: "bg-orange-500",
  },
};

/* ============================================================
   🎯 SAFE ICON
   ============================================================ */
const SafeIcon = ({ name, size = 16, className = "", fallback = Target }) => {
  const Fallback = fallback;
  if (!name) return <Fallback size={size} className={className} />;
  return <Icon name={name} size={size} className={className} />;
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const modalRef = useRef(null);
  const tabContentRef = useRef(null);

  /* ---------- BODY SCROLL LOCK + hide bottom dock ---------- */
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevPadding = document.body.style.paddingRight;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      // ⭐ Add class so any floating dock can hide itself
      document.body.classList.add("project-modal-open");

      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.paddingRight = prevPadding;
        document.body.classList.remove("project-modal-open");
      };
    }
  }, [isOpen]);

  /* ---------- RESET ON PROJECT CHANGE ---------- */
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setActiveTab("overview");
      setIsFullscreen(false);
      if (tabContentRef.current) tabContentRef.current.scrollTop = 0;
    }
  }, [project]);

  /* ---------- NAV HELPERS ---------- */
  const goNext = useCallback(() => {
    if (!project?.gallery?.length) return;
    setCurrentImageIndex((p) => (p + 1) % project.gallery.length);
  }, [project]);

  const goPrev = useCallback(() => {
    if (!project?.gallery?.length) return;
    setCurrentImageIndex((p) => (p === 0 ? project.gallery.length - 1 : p - 1));
  }, [project]);

  /* ---------- KEYBOARD ---------- */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (isFullscreen) setIsFullscreen(false);
        else onClose();
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, isFullscreen, onClose, goPrev, goNext]);

  /* ---------- TOUCH SWIPE ---------- */
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  if (!project) return null;

  const gallery =
    project.gallery?.length > 0
      ? project.gallery
      : [project.image].filter(Boolean);
  const hasGallery = gallery.length > 0;
  const currentImage = gallery[currentImageIndex];

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye, color: "blue" },
    { id: "technical", label: "Tech", icon: Cpu, color: "purple" },
    { id: "features", label: "Features", icon: Layers, color: "emerald" },
    { id: "impact", label: "Impact", icon: TrendingUp, color: "orange" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center lg:items-center lg:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full 
              h-[92vh] max-h-[720px]
              sm:h-[88vh] sm:max-h-[720px]
              lg:h-[86vh] lg:max-h-[700px] lg:max-w-5xl
              bg-white dark:bg-gray-900 
              rounded-t-3xl lg:rounded-2xl 
              shadow-2xl overflow-hidden 
              ring-1 ring-black/5 dark:ring-white/10 
              flex flex-col"
          >
            {/* Mobile drag handle */}
            <div className="flex justify-center flex-shrink-0 pt-2.5 pb-1 lg:hidden">
              <div className="w-10 h-1 bg-gray-300 rounded-full dark:bg-gray-700" />
            </div>

            {/* ================================================== */}
            {/* HEADER                                              */}
            {/* ================================================== */}
            <div className="flex items-center justify-between flex-shrink-0 gap-3 px-4 py-3 border-b border-gray-100 sm:px-5 dark:border-gray-800">
              <div className="flex items-center flex-1 min-w-0 gap-3">
                <div className="flex items-center justify-center flex-shrink-0 shadow-lg w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  {project.iconName ? (
                    <SafeIcon
                      name={project.iconName}
                      size={16}
                      className="text-white"
                      fallback={FolderKanban}
                    />
                  ) : (
                    <FolderKanban size={16} className="text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-sm font-bold text-gray-900 truncate sm:text-base dark:text-white">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-medium text-blue-600 truncate dark:text-blue-400">
                      {project.category}
                    </span>
                    {project.complexity && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                          project.complexity === "Advanced"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : project.complexity === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {project.complexity}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="flex-shrink-0 p-2 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
              >
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            {/* ================================================== */}
            {/* MAIN — column on mobile, row on desktop             */}
            {/* ================================================== */}
            <div className="flex flex-col flex-1 min-h-0 lg:flex-row">
              {/* ========== LEFT / TOP: GALLERY ========== */}
              {hasGallery && (
                <div className="flex flex-col flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 lg:w-[55%]">
                  {/* Main image */}
                  <div
                    className="relative bg-black h-[180px] sm:h-[220px] lg:h-auto lg:flex-1 lg:min-h-0"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img
                      src={currentImage}
                      alt={project.title}
                      className="absolute inset-0 object-contain w-full h-full select-none"
                      draggable={false}
                    />

                    {/* Counter */}
                    {gallery.length > 1 && (
                      <div className="absolute flex items-center gap-1.5 px-2 py-0.5 text-[10px] sm:text-xs text-white rounded-full top-2.5 left-2.5 sm:top-3 sm:left-3 bg-black/60 backdrop-blur-md ring-1 ring-white/15">
                        <ImageIcon size={11} className="text-blue-400" />
                        <span className="font-medium">
                          {currentImageIndex + 1} / {gallery.length}
                        </span>
                      </div>
                    )}

                    {/* Fullscreen */}
                    <button
                      onClick={() => setIsFullscreen(true)}
                      className="absolute flex items-center justify-center gap-1 px-2 py-0.5 text-[10px] sm:text-xs text-white transition rounded-full top-2.5 right-2.5 sm:top-3 sm:right-3 bg-black/60 backdrop-blur-md hover:bg-black/80 ring-1 ring-white/15"
                    >
                      <Maximize2 size={11} />
                      <span className="hidden sm:inline">Zoom</span>
                    </button>

                    {/* Arrows */}
                    {gallery.length > 1 && (
                      <>
                        <button
                          onClick={goPrev}
                          className="absolute flex items-center justify-center w-8 h-8 text-white transition -translate-y-1/2 rounded-full lg:w-9 lg:h-9 left-2 lg:left-3 top-1/2 bg-black/60 backdrop-blur-md hover:bg-black/85 active:scale-95"
                          aria-label="Previous"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={goNext}
                          className="absolute flex items-center justify-center w-8 h-8 text-white transition -translate-y-1/2 rounded-full lg:w-9 lg:h-9 right-2 lg:right-3 top-1/2 bg-black/60 backdrop-blur-md hover:bg-black/85 active:scale-95"
                          aria-label="Next"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails */}
                  {gallery.length > 1 && (
                    <div className="flex-shrink-0 px-3 py-2 overflow-x-auto border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                      <div className="flex gap-1.5 lg:gap-2">
                        {gallery.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-12 h-9 lg:w-14 lg:h-11 rounded-md lg:rounded-lg overflow-hidden transition-all duration-200 ${
                              currentImageIndex === idx
                                ? "ring-2 ring-blue-500 scale-105"
                                : "ring-1 ring-gray-200 dark:ring-gray-700 opacity-60 hover:opacity-100"
                            }`}
                            aria-label={`Image ${idx + 1}`}
                          >
                            <img
                              src={img}
                              alt={`Thumb ${idx + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========== RIGHT / BOTTOM: INFO ========== */}
              <div className="flex flex-col flex-1 min-w-0 min-h-0">
                {/* Meta strip */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30">
                  {project.duration && (
                    <Pill icon={Calendar} value={project.duration} />
                  )}
                  {project.teamSize && (
                    <Pill icon={Users} value={project.teamSize} />
                  )}
                  {project.rating && (
                    <Pill
                      icon={Star}
                      value={`${project.rating}/5`}
                      iconClass="text-yellow-500"
                    />
                  )}
                  {project.status && (
                    <Pill
                      icon={CheckCircle}
                      value={project.status}
                      iconClass="text-green-500"
                    />
                  )}
                  {project.platforms?.length > 0 && (
                    <Pill
                      icon={Smartphone}
                      value={project.platforms.join(", ")}
                      iconClass="text-purple-500"
                    />
                  )}
                </div>

                {/* Action buttons */}
                {(project.liveUrl ||
                  project.githubUrl ||
                  project.downloadUrl) && (
                  <div className="flex flex-wrap gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-100 dark:border-gray-800">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-white transition rounded-lg bg-primary hover:bg-primary/90 shadow-sm shadow-primary/25"
                      >
                        <ExternalLink size={12} />
                        Live Demo
                      </a>
                    )}
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-white transition rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-sm"
                      >
                        <Download size={12} />
                        Download
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold transition border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <Github size={12} />
                        Code
                      </a>
                    )}
                  </div>
                )}

                {/* Tabs */}
                <div className="flex-shrink-0 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex">
                    {tabs.map((tab) => {
                      const TabIcon = tab.icon;
                      const colors = TAB_COLORS[tab.color];
                      const isActive = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            setActiveTab(tab.id);
                            if (tabContentRef.current)
                              tabContentRef.current.scrollTop = 0;
                          }}
                          className={`flex-1 flex items-center justify-center gap-1 py-2.5 sm:py-3 text-[11px] sm:text-xs font-semibold transition relative ${
                            isActive
                              ? colors.textActive
                              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                          }`}
                        >
                          <TabIcon size={13} />
                          <span>{tab.label}</span>
                          {isActive && (
                            <motion.div
                              layoutId="modalTabIndicator"
                              className={`absolute bottom-0 left-2 right-2 h-[2px] ${colors.underline} rounded-full`}
                              transition={{
                                type: "spring",
                                bounce: 0.15,
                                duration: 0.4,
                              }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Tab content (internal scroll) */}
                <div
                  ref={tabContentRef}
                  className="flex-1 min-h-0 px-3 py-3 overflow-y-auto sm:px-4 sm:py-4 modal-scroll"
                  style={{ overscrollBehavior: "contain" }}
                >
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div>
                          <h3 className="mb-2 text-[13px] font-bold sm:text-sm text-gray-900 dark:text-white">
                            About this project
                          </h3>
                          <p className="text-[12px] sm:text-[13px] leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {project.fullDescription || project.description}
                          </p>
                        </div>
                        {project.impact && (
                          <div className="p-2.5 sm:p-3 border-l-4 border-blue-500 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <div className="flex gap-2.5">
                              <div className="flex items-center justify-center flex-shrink-0 bg-blue-500 rounded-lg w-7 h-7">
                                <Target size={14} className="text-white" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="mb-0.5 text-[11px] font-bold sm:text-xs text-gray-900 dark:text-white">
                                  Impact
                                </h4>
                                <p className="text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300">
                                  {project.impact}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "technical" && (
                      <motion.div
                        key="technical"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        <div>
                          <h3 className="mb-2 text-[13px] font-bold sm:text-sm text-gray-900 dark:text-white">
                            Tech Stack
                          </h3>
                          <div className="flex flex-wrap gap-1.5">
                            {project.technologies?.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-semibold rounded-lg bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        {project.challenges?.length > 0 && (
                          <div>
                            <h3 className="mb-2 text-[13px] font-bold sm:text-sm text-gray-900 dark:text-white">
                              Challenges & Solutions
                            </h3>
                            <div className="space-y-2">
                              {project.challenges.map((c, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 sm:p-3 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
                                >
                                  <div className="flex gap-2.5">
                                    <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-red-100 rounded-lg sm:w-7 sm:h-7 dark:bg-red-900/30">
                                      <AlertCircle
                                        size={13}
                                        className="text-red-600 dark:text-red-400"
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0 space-y-1">
                                      <p className="text-[11px] sm:text-[12px]">
                                        <span className="font-bold text-red-600 dark:text-red-400">
                                          Challenge:
                                        </span>{" "}
                                        <span className="text-gray-700 dark:text-gray-300">
                                          {c.problem}
                                        </span>
                                      </p>
                                      <p className="text-[11px] sm:text-[12px]">
                                        <span className="font-bold text-green-600 dark:text-green-400">
                                          Solution:
                                        </span>{" "}
                                        <span className="text-gray-700 dark:text-gray-300">
                                          {c.solution}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "features" && (
                      <motion.div
                        key="features"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-2"
                      >
                        {project.features?.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                          >
                            <div className="flex items-center justify-center flex-shrink-0 rounded-md w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 mt-0.5">
                              <CheckCircle size={10} className="text-white" />
                            </div>
                            <span className="text-[12px] sm:text-[13px] font-medium text-gray-800 dark:text-gray-200">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === "impact" && (
                      <motion.div
                        key="impact"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-3 sm:space-y-4"
                      >
                        {project.metrics?.length > 0 && (
                          <div>
                            <h3 className="mb-2 text-[13px] font-bold sm:text-sm text-gray-900 dark:text-white">
                              Key Metrics
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                              {project.metrics.map((m, idx) => (
                                <div
                                  key={idx}
                                  className="p-2.5 sm:p-3 text-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20"
                                >
                                  <div className="text-base font-extrabold text-transparent sm:text-lg bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text">
                                    {m.value}
                                  </div>
                                  <div className="mt-0.5 text-[9px] sm:text-[10px] font-medium text-gray-600 dark:text-gray-400">
                                    {m.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {project.learnings?.length > 0 && (
                          <div>
                            <h3 className="mb-2 text-[13px] font-bold sm:text-sm text-gray-900 dark:text-white">
                              Learnings
                            </h3>
                            <div className="space-y-1.5 sm:space-y-2">
                              {project.learnings.map((l, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-start gap-2 p-2 sm:p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20"
                                >
                                  <Lightbulb
                                    size={13}
                                    className="text-yellow-500 flex-shrink-0 mt-0.5"
                                  />
                                  <span className="text-[11px] sm:text-[12px] text-gray-700 dark:text-gray-300">
                                    {l}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ==================== FULLSCREEN ==================== */}
          <AnimatePresence>
            {isFullscreen && hasGallery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsFullscreen(false)}
                className="fixed inset-0 z-[300] flex items-center justify-center p-2 bg-black/95 sm:p-6"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(false);
                  }}
                  className="absolute z-10 flex items-center justify-center w-10 h-10 text-white rounded-full top-4 right-4 bg-white/10 backdrop-blur-md hover:bg-white/20 ring-1 ring-white/20"
                  aria-label="Close"
                >
                  <Minimize2 size={20} />
                </button>

                {gallery.length > 1 && (
                  <div className="absolute px-3 py-1 text-xs font-semibold text-white -translate-x-1/2 rounded-full top-4 left-1/2 bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                    {currentImageIndex + 1} / {gallery.length}
                  </div>
                )}

                <img
                  src={currentImage}
                  alt={project.title}
                  className="object-contain w-full h-full max-w-full max-h-full"
                  onClick={(e) => e.stopPropagation()}
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goPrev();
                      }}
                      className="absolute flex items-center justify-center text-white -translate-y-1/2 rounded-full w-11 h-11 left-3 sm:left-6 top-1/2 bg-white/10 backdrop-blur-md hover:bg-white/25 ring-1 ring-white/20"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goNext();
                      }}
                      className="absolute flex items-center justify-center text-white -translate-y-1/2 rounded-full w-11 h-11 right-3 sm:right-6 top-1/2 bg-white/10 backdrop-blur-md hover:bg-white/25 ring-1 ring-white/20"
                      aria-label="Next"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ============================================================
   📊 PILL
   ============================================================ */
function Pill({ icon: Icon, value, iconClass = "text-blue-500" }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[10px] sm:text-[11px] font-medium rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
      <Icon size={11} className={iconClass} />
      <span className="truncate max-w-[120px]">{value}</span>
    </span>
  );
}

export default ProjectModal;
