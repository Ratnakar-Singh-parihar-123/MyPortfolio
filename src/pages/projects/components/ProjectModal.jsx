import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);
  const imageContainerRef = useRef(null);

  // Lock scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }
    
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0";
    };
  }, [isOpen]);

  // Reset states when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setActiveTab("overview");
      setIsLoading(true);
    }
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !project) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case " ":
          e.preventDefault();
          if (hasGallery && project.gallery.length > 1) {
            nextImage();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, project, onClose]);

  // Handle touch gestures for image swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    
    setTouchStart(null);
  };

  // Smooth image transitions
  const nextImage = useCallback(() => {
    if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % project.gallery.length;
      return nextIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [project, isAnimating]);

  const prevImage = useCallback(() => {
    if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;
    
    setIsAnimating(true);
    setCurrentImageIndex((prev) => {
      const nextIndex = prev === 0 ? project.gallery.length - 1 : prev - 1;
      return nextIndex;
    });
    
    setTimeout(() => setIsAnimating(false), 300);
  }, [project, isAnimating]);

  // Click outside to close
  const handleBackdropClick = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  if (!project) return null;

  const tabs = [
    { id: "overview", label: "Overview", icon: "Eye", color: "text-blue-500" },
    { id: "technical", label: "Technical", icon: "Code", color: "text-purple-500" },
    { id: "timeline", label: "Timeline", icon: "Clock", color: "text-amber-500" },
    { id: "results", label: "Results", icon: "BarChart3", color: "text-emerald-500" },
  ];

  const hasGallery = project?.gallery && project.gallery.length > 0;
  const currentImage = hasGallery 
    ? project.gallery[currentImageIndex]
    : project?.image;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const getProgressPercentage = () => {
    if (!hasGallery || project.gallery.length === 0) return 0;
    return ((currentImageIndex + 1) / project.gallery.length) * 100;
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Premium Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-gradient-to-br from-black/95 via-black/90 to-black/85 backdrop-blur-xl"
            onClick={handleBackdropClick}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-2 sm:p-3 md:p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.9, y: 20, rotateX: 5 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                  mass: 0.5
                }}
                className="relative w-full max-w-6xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/20 overflow-hidden border border-white/20 dark:border-gray-700/50"
              >
                {/* Header */}
                <div className="sticky top-0 z-20 bg-gradient-to-r from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 px-5 py-4 sm:px-8 sm:py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20">
                          <Icon name="FolderOpen" size={22} className="text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Icon name="Sparkles" size={10} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                          {project?.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {project?.category}
                          </span>
                          {project?.complexity && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${
                                project.complexity === "Advanced" 
                                  ? "bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                                  : project.complexity === "Intermediate"
                                  ? "bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                                  : "bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                              }`}>
                                {project.complexity}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="group relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
                      aria-label="Close"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon 
                        name="X" 
                        size={20} 
                        className="relative text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors" 
                      />
                    </button>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col xl:flex-row">
                  {/* Left Column - Gallery */}
                  <div className="xl:w-1/2 p-5 sm:p-6 md:p-8">
                    <div className="space-y-6">
                      {/* Image Gallery */}
                      <div 
                        ref={imageContainerRef}
                        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 shadow-lg"
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                      >
                        {/* Loading State */}
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
                            <div className="relative">
                              <div className="w-14 h-14 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Icon name="Image" size={20} className="text-blue-500" />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Main Image */}
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                          className="relative"
                        >
                          <Image
                            src={currentImage}
                            alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                            className={`w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover transition-all duration-500 ${
                              isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                            }`}
                            onLoad={handleImageLoad}
                          />
                          
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Gallery Navigation */}
                        {hasGallery && project.gallery.length > 1 && (
                          <>
                            {/* Navigation Arrows */}
                            <button
                              onClick={prevImage}
                              className="absolute left-4 top-1/2 -translate-y-1/2 group"
                              aria-label="Previous image"
                            >
                              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                                <Icon 
                                  name="ChevronLeft" 
                                  size={22} 
                                  className="text-white group-hover:text-blue-300 transition-colors" 
                                />
                              </div>
                            </button>
                            
                            <button
                              onClick={nextImage}
                              className="absolute right-4 top-1/2 -translate-y-1/2 group"
                              aria-label="Next image"
                            >
                              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95">
                                <Icon 
                                  name="ChevronRight" 
                                  size={22} 
                                  className="text-white group-hover:text-blue-300 transition-colors" 
                                />
                              </div>
                            </button>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800/50">
                              <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                                initial={{ width: "0%" }}
                                animate={{ width: `${getProgressPercentage()}%` }}
                                transition={{ duration: 0.5 }}
                              />
                            </div>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                              <Icon name="Image" size={14} className="text-blue-300" />
                              <span className="font-semibold">
                                {currentImageIndex + 1} / {project.gallery.length}
                              </span>
                            </div>

                            {/* Navigation Dots */}
                            <div className="absolute bottom-4 right-4 flex gap-1.5">
                              {project.gallery.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentImageIndex(index)}
                                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                                    currentImageIndex === index
                                      ? "bg-white scale-125 shadow-lg shadow-blue-500/50"
                                      : "bg-white/40 hover:bg-white/60 hover:scale-110"
                                  }`}
                                  aria-label={`View image ${index + 1}`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Thumbnail Grid */}
                      {hasGallery && project.gallery.length > 1 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Gallery ({project.gallery.length})
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Click to view
                            </span>
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2">
                            {project.gallery.map((img, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                                  currentImageIndex === index
                                    ? "border-blue-500 ring-2 ring-blue-500/20 scale-105"
                                    : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                                }`}
                              >
                                <div className="aspect-square">
                                  <Image
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {currentImageIndex === index && (
                                  <div className="absolute inset-0 bg-blue-500/10" />
                                )}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        {project?.duration && (
                          <div className="p-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                              <Icon name="Calendar" size={16} className="text-blue-500" />
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Duration</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                              {project.duration}
                            </p>
                          </div>
                        )}
                        {project?.teamSize && (
                          <div className="p-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                              <Icon name="Users" size={16} className="text-emerald-500" />
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Team</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                              {project.teamSize} member{project.teamSize !== "1" ? "s" : ""}
                            </p>
                          </div>
                        )}
                        {project?.rating && (
                          <div className="p-3 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                              <Icon name="Star" size={16} className="text-amber-500" />
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Rating</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                              {project.rating}/5
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project?.liveUrl && (
                          <Button
                            variant="default"
                            size="lg"
                            iconName="ExternalLink"
                            iconPosition="left"
                            className="group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-500/25"
                            onClick={() => window.open(project.liveUrl, "_blank")}
                          >
                            <span>Live Demo</span>
                            <Icon name="ArrowUpRight" size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Button>
                        )}
                        {project?.githubUrl && (
                          <Button
                            variant="outline"
                            size="lg"
                            iconName="Github"
                            iconPosition="left"
                            className="border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500"
                            onClick={() => window.open(project.githubUrl, "_blank")}
                          >
                            Source Code
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Content */}
                  <div className="xl:w-1/2 border-t xl:border-t-0 xl:border-l border-gray-200/50 dark:border-gray-700/50">
                    {/* Tabs Navigation */}
                    <div className="sticky top-0 z-10 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
                      <div className="flex overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group flex-1 min-w-0 flex flex-col items-center px-4 py-3 transition-all duration-300 ${
                              activeTab === tab.id
                                ? `bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 ${tab.color}`
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon 
                                name={tab.icon} 
                                size={18} 
                                className={`transition-transform ${activeTab === tab.id ? 'scale-110' : ''}`}
                              />
                              <span className="text-sm font-semibold whitespace-nowrap">
                                {tab.label}
                              </span>
                            </div>
                            <div className={`mt-2 h-0.5 w-8 rounded-full transition-all duration-300 ${
                              activeTab === tab.id 
                                ? `bg-gradient-to-r ${tab.color.replace('text-', 'bg-')} via-${tab.color.replace('text-', 'bg-').split('-')[1]}-400 to-${tab.color.replace('text-', 'bg-').split('-')[1]}-500` 
                                : 'bg-transparent'
                            }`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-5 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-250px)] xl:max-h-[calc(100vh-200px)]">
                      <AnimatePresence mode="wait">
                        {/* Overview Tab */}
                        {activeTab === "overview" && (
                          <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <div className="space-y-4">
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Project Overview
                              </h3>
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                                  {project?.fullDescription}
                                </p>
                              </div>
                            </div>

                            {project?.features && (
                              <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  Key Features
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {project.features.map((feature, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="group p-4 bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-900/10 dark:to-gray-900 rounded-xl border border-blue-100 dark:border-blue-800/30 hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
                                    >
                                      <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                          <Icon
                                            name="CheckCircle"
                                            size={16}
                                            className="text-blue-600 dark:text-blue-400"
                                          />
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                                          {feature}
                                        </span>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {project?.challenges && (
                              <div className="space-y-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                  Challenges & Solutions
                                </h3>
                                <div className="space-y-4">
                                  {project.challenges.map((challenge, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                                    >
                                      <div className="flex items-start gap-3 mb-3">
                                        <Icon
                                          name="AlertTriangle"
                                          size={20}
                                          className="text-amber-500 flex-shrink-0 mt-0.5"
                                        />
                                        <div className="flex-1">
                                          <span className="font-semibold text-gray-900 dark:text-white">
                                            Challenge
                                          </span>
                                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            {challenge.problem}
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flex items-start gap-3">
                                        <Icon
                                          name="Lightbulb"
                                          size={20}
                                          className="text-emerald-500 flex-shrink-0 mt-0.5"
                                        />
                                        <div className="flex-1">
                                          <span className="font-semibold text-gray-900 dark:text-white">
                                            Solution
                                          </span>
                                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                                            {challenge.solution}
                                          </p>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </motion.div>
                        )}

                        {/* Technical Tab */}
                        {activeTab === "technical" && (
                          <motion.div
                            key="technical"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Technology Stack
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                              {project?.technologies?.map((tech, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.03 }}
                                  whileHover={{ scale: 1.05 }}
                                  className="group p-4 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-900/10 dark:to-gray-900 rounded-xl border border-purple-100 dark:border-purple-800/30 hover:border-purple-200 dark:hover:border-purple-700 transition-all"
                                >
                                  <div className="flex flex-col items-center text-center gap-2">
                                    <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                      <Icon name="Code" size={18} className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                      {tech}
                                    </span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Timeline Tab */}
                        {activeTab === "timeline" && (
                          <motion.div
                            key="timeline"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Project Timeline
                            </h3>
                            <div className="p-5 bg-gradient-to-br from-amber-50/50 to-white dark:from-amber-900/10 dark:to-gray-900 rounded-2xl border border-amber-100 dark:border-amber-800/30">
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {project?.timeline}
                                </p>
                              </div>
                              
                              {project?.duration && (
                                <div className="mt-6 p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-amber-200 dark:border-amber-700/50">
                                  <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-400 flex items-center justify-center">
                                      <Icon name="Calendar" size={22} className="text-white" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Project Duration</p>
                                      <p className="text-lg font-bold text-gray-900 dark:text-white">{project.duration}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* Results Tab */}
                        {activeTab === "results" && (
                          <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                          >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Results & Outcomes
                            </h3>
                            <div className="p-5 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-900 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
                              <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {project?.results}
                                </p>
                              </div>
                              
                              {project?.metrics && (
                                <div className="mt-6 grid grid-cols-2 lg:grid-cols-3 gap-4">
                                  {project.metrics.map((metric, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: index * 0.1 }}
                                      whileHover={{ scale: 1.05 }}
                                      className="p-4 bg-white/50 dark:bg-gray-900/50 rounded-xl border border-emerald-200 dark:border-emerald-700/50 text-center"
                                    >
                                      <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-2">
                                        {metric.value}
                                      </div>
                                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {metric.label}
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;