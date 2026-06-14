// // import React, { useState, useEffect, useCallback, useRef } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import Icon from "../../../components/AppIcon";
// // import Image from "../../../components/AppImage";
// // import Button from "../../../components/ui/Button";

// // const ProjectModal = ({ project, isOpen, onClose }) => {
// //   const [activeTab, setActiveTab] = useState("overview");
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [touchStart, setTouchStart] = useState(null);
// //   const [isAnimating, setIsAnimating] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [isFullscreen, setIsFullscreen] = useState(false);
// //   const [showGallery, setShowGallery] = useState(false);
// //   const [isScrolling, setIsScrolling] = useState(false);
// //   const modalRef = useRef(null);
// //   const imageContainerRef = useRef(null);
// //   const contentRef = useRef(null);

// //   // Check for mobile device
// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };

// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);

// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   // Lock scroll when modal opens with smooth transition
// //   useEffect(() => {
// //     if (isOpen) {
// //       document.body.style.overflow = "hidden";
// //       document.body.style.position = "fixed";
// //       document.body.style.width = "100%";
// //       document.body.style.height = "100%";

// //       const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
// //       if (scrollbarWidth > 0) {
// //         document.body.style.paddingRight = `${scrollbarWidth}px`;
// //       }

// //       // Add class for smooth transitions
// //       document.documentElement.classList.add('modal-open');
// //     }

// //     return () => {
// //       document.body.style.overflow = "";
// //       document.body.style.position = "";
// //       document.body.style.width = "";
// //       document.body.style.height = "";
// //       document.body.style.paddingRight = "";
// //       document.documentElement.classList.remove('modal-open');
// //     };
// //   }, [isOpen]);

// //   // Reset states when project changes
// //   useEffect(() => {
// //     if (project) {
// //       setCurrentImageIndex(0);
// //       setActiveTab("overview");
// //       setIsLoading(true);
// //       setShowGallery(false);
// //       setIsFullscreen(false);

// //       // Preload images
// //       if (project.gallery && project.gallery.length > 0) {
// //         project.gallery.forEach(src => {
// //           const img = new window.Image();
// //           img.src = src;
// //         });
// //       }
// //     }
// //   }, [project]);

// //   // Handle keyboard navigation
// //   useEffect(() => {
// //     const handleKeyDown = (e) => {
// //       if (!isOpen || !project) return;

// //       switch (e.key) {
// //         case "Escape":
// //           if (isFullscreen) {
// //             setIsFullscreen(false);
// //           } else {
// //             onClose();
// //           }
// //           break;
// //         case "ArrowLeft":
// //           prevImage();
// //           break;
// //         case "ArrowRight":
// //           nextImage();
// //           break;
// //         case " ":
// //           e.preventDefault();
// //           if (hasGallery && project.gallery.length > 1) {
// //             nextImage();
// //           }
// //           break;
// //         case "f":
// //           e.preventDefault();
// //           if (hasGallery) {
// //             setIsFullscreen(!isFullscreen);
// //           }
// //           break;
// //         case "g":
// //           e.preventDefault();
// //           if (hasGallery && project.gallery.length > 1) {
// //             setShowGallery(!showGallery);
// //           }
// //           break;
// //         default:
// //           break;
// //       }
// //     };

// //     window.addEventListener("keydown", handleKeyDown);
// //     return () => window.removeEventListener("keydown", handleKeyDown);
// //   }, [isOpen, project, onClose, isFullscreen, showGallery]);

// //   // Handle touch gestures for image swiping
// //   const handleTouchStart = (e) => {
// //     setTouchStart(e.touches[0].clientX);
// //     setIsScrolling(false);
// //   };

// //   const handleTouchMove = (e) => {
// //     if (touchStart === null) return;
// //     const diff = touchStart - e.touches[0].clientX;
// //     setIsScrolling(Math.abs(diff) < 10);
// //   };

// //   const handleTouchEnd = (e) => {
// //     if (!touchStart || isScrolling) {
// //       setTouchStart(null);
// //       return;
// //     }

// //     const touchEnd = e.changedTouches[0].clientX;
// //     const diff = touchStart - touchEnd;
// //     const minSwipeDistance = isMobile ? 30 : 50;

// //     if (Math.abs(diff) > minSwipeDistance) {
// //       if (diff > 0) {
// //         nextImage();
// //       } else {
// //         prevImage();
// //       }
// //     }

// //     setTouchStart(null);
// //   };

// //   // Smooth image transitions with parallax effect
// //   const nextImage = useCallback(() => {
// //     if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;

// //     setIsAnimating(true);
// //     setCurrentImageIndex((prev) => {
// //       const nextIndex = (prev + 1) % project.gallery.length;
// //       return nextIndex;
// //     });

// //     setTimeout(() => setIsAnimating(false), 400);
// //   }, [project, isAnimating]);

// //   const prevImage = useCallback(() => {
// //     if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;

// //     setIsAnimating(true);
// //     setCurrentImageIndex((prev) => {
// //       const nextIndex = prev === 0 ? project.gallery.length - 1 : prev - 1;
// //       return nextIndex;
// //     });

// //     setTimeout(() => setIsAnimating(false), 400);
// //   }, [project, isAnimating]);

// //   // Click outside to close
// //   const handleBackdropClick = useCallback((e) => {
// //     if (isFullscreen) {
// //       setIsFullscreen(false);
// //       return;
// //     }

// //     if (modalRef.current && !modalRef.current.contains(e.target)) {
// //       onClose();
// //     }
// //   }, [onClose, isFullscreen]);

// //   // Handle scroll for parallax effect
// //   const handleScroll = useCallback(() => {
// //     if (contentRef.current && !isMobile) {
// //       const scrolled = contentRef.current.scrollTop;
// //       const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
// //       const progress = scrolled / maxScroll;

// //       if (imageContainerRef.current) {
// //         imageContainerRef.current.style.transform = `translateY(${progress * 20}px)`;
// //         imageContainerRef.current.style.opacity = `${1 - progress * 0.3}`;
// //       }
// //     }
// //   }, [isMobile]);

// //   useEffect(() => {
// //     const content = contentRef.current;
// //     if (content) {
// //       content.addEventListener('scroll', handleScroll);
// //       return () => content.removeEventListener('scroll', handleScroll);
// //     }
// //   }, [handleScroll]);

// //   if (!project) return null;

// //   const tabs = [
// //     {
// //       id: "overview",
// //       label: "Overview",
// //       icon: "Eye",
// //       color: "from-blue-500 via-blue-400 to-blue-300",
// //       gradient: "bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-300/20"
// //     },
// //     {
// //       id: "technical",
// //       label: "Technical",
// //       icon: "Cpu",
// //       color: "from-purple-500 via-purple-400 to-purple-300",
// //       gradient: "bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-300/20"
// //     },
// //     {
// //       id: "features",
// //       label: "Features",
// //       icon: "Layers",
// //       color: "from-emerald-500 via-emerald-400 to-emerald-300",
// //       gradient: "bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-300/20"
// //     },
// //     {
// //       id: "impact",
// //       label: "Impact",
// //       icon: "TrendingUp",
// //       color: "from-amber-500 via-amber-400 to-amber-300",
// //       gradient: "bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-300/20"
// //     },
// //   ];

// //   const hasGallery = project?.gallery && project.gallery.length > 0;
// //   const currentImage = hasGallery
// //     ? project.gallery[currentImageIndex]
// //     : project?.image;

// //   const handleImageLoad = () => {
// //     setIsLoading(false);
// //   };

// //   const getProgressPercentage = () => {
// //     if (!hasGallery || project.gallery.length === 0) return 0;
// //     return ((currentImageIndex + 1) / project.gallery.length) * 100;
// //   };

// //   // Animation variants
// //   const modalVariants = {
// //     hidden: {
// //       opacity: 0,
// //       scale: 0.95,
// //       y: isMobile ? 50 : 0,
// //       rotateX: 10
// //     },
// //     visible: {
// //       opacity: 1,
// //       scale: 1,
// //       y: 0,
// //       rotateX: 0,
// //       transition: {
// //         type: "spring",
// //         damping: 25,
// //         stiffness: 400,
// //         mass: 0.8
// //       }
// //     },
// //     exit: {
// //       opacity: 0,
// //       scale: 0.95,
// //       y: isMobile ? 50 : 0,
// //       rotateX: 10,
// //       transition: { duration: 0.2 }
// //     }
// //   };

// //   const backdropVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         duration: 0.4,
// //         ease: "easeOut"
// //       }
// //     },
// //     exit: {
// //       opacity: 0,
// //       transition: {
// //         duration: 0.3,
// //         ease: "easeIn"
// //       }
// //     }
// //   };

// //   return (
// //     <AnimatePresence mode="wait">
// //       {isOpen && (
// //         <>
// //           {/* Premium Backdrop with gradient animation */}
// //           <motion.div
// //             variants={backdropVariants}
// //             initial="hidden"
// //             animate="visible"
// //             exit="exit"
// //             className="fixed inset-0 z-50"
// //           >
// //             <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
// //             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
// //             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
// //             <div
// //               className="absolute inset-0 backdrop-blur-xl"
// //               onClick={handleBackdropClick}
// //             />
// //           </motion.div>

// //           {/* Modal Container */}
// //           <div className="fixed inset-0 z-50 overflow-y-auto">
// //             <div className="flex items-start justify-center min-h-full p-0 sm:items-center sm:p-2 md:p-4">
// //               <motion.div
// //                 ref={modalRef}
// //                 variants={modalVariants}
// //                 initial="hidden"
// //                 animate="visible"
// //                 exit="exit"
// //                 className="relative w-full h-screen sm:h-auto sm:max-h-[95vh] sm:max-w-7xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-none sm:rounded-3xl shadow-2xl shadow-black/30 overflow-hidden border-0 sm:border border-white/10 dark:border-gray-700/30"
// //                 style={{
// //                   boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
// //                 }}
// //               >
// //                 {/* Header with glass morphism effect */}
// //                 <div className="sticky top-0 z-50 px-4 py-3 border-b bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70 backdrop-blur-xl border-white/20 dark:border-gray-700/30 sm:px-8 sm:py-5">
// //                   <div className="flex items-center justify-between gap-2 sm:gap-4">
// //                     <div className="flex items-center min-w-0 gap-3 sm:gap-4">
// //                       {/* Animated Project Icon */}
// //                       <motion.div
// //                         className="relative flex-shrink-0"
// //                         animate={{
// //                           rotate: [0, 5, -5, 0],
// //                           scale: [1, 1.05, 1]
// //                         }}
// //                         transition={{
// //                           duration: 2,
// //                           repeat: Infinity,
// //                           repeatDelay: 5
// //                         }}
// //                       >
// //                         <div className="relative flex items-center justify-center w-10 h-10 shadow-lg sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 shadow-blue-500/30">
// //                           <Icon name="FolderKanban" size={isMobile ? 18 : 22} className="text-white" />
// //                           {/* Pulsing glow effect */}
// //                           <motion.div
// //                             className="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-500/30"
// //                             animate={{ scale: [1, 1.3, 1] }}
// //                             transition={{
// //                               duration: 2,
// //                               repeat: Infinity,
// //                               ease: "easeInOut"
// //                             }}
// //                           />
// //                         </div>
// //                         {/* Floating particles */}
// //                         <motion.div
// //                           className="absolute flex items-center justify-center w-4 h-4 rounded-full shadow-lg -top-1 -right-1 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-400 to-blue-300 shadow-blue-400/50"
// //                           animate={{
// //                             y: [0, -4, 0],
// //                             rotate: [0, 360]
// //                           }}
// //                           transition={{
// //                             y: {
// //                               duration: 1.5,
// //                               repeat: Infinity,
// //                               ease: "easeInOut"
// //                             },
// //                             rotate: {
// //                               duration: 3,
// //                               repeat: Infinity,
// //                               ease: "linear"
// //                             }
// //                           }}
// //                         >
// //                           <Icon name="Sparkles" size={isMobile ? 8 : 10} className="text-white" />
// //                         </motion.div>
// //                       </motion.div>

// //                       {/* Project Title with typewriter effect */}
// //                       <div className="flex-1 min-w-0">
// //                         <motion.h2
// //                           initial={{ opacity: 0, x: -20 }}
// //                           animate={{ opacity: 1, x: 0 }}
// //                           transition={{ delay: 0.2 }}
// //                           className="text-lg font-bold text-transparent truncate sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text"
// //                         >
// //                           {project?.title}
// //                         </motion.h2>
// //                         <motion.div
// //                           initial={{ opacity: 0 }}
// //                           animate={{ opacity: 1 }}
// //                           transition={{ delay: 0.3 }}
// //                           className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5"
// //                         >
// //                           <span className="text-xs font-medium text-transparent truncate sm:text-sm bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text">
// //                             {project?.category}
// //                           </span>
// //                           {project?.complexity && (
// //                             <>
// //                               <span className="hidden text-gray-400 sm:inline">•</span>
// //                               <motion.span
// //                                 initial={{ scale: 0.8 }}
// //                                 animate={{ scale: 1 }}
// //                                 transition={{ type: "spring", delay: 0.4 }}
// //                                 className={`text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm ${project.complexity === "Advanced"
// //                                     ? "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50"
// //                                     : project.complexity === "Intermediate"
// //                                       ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50"
// //                                       : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50"
// //                                   }`}
// //                               >
// //                                 {project.complexity}
// //                               </motion.span>
// //                             </>
// //                           )}
// //                         </motion.div>
// //                       </div>
// //                     </div>

// //                     {/* Close Button with hover animation */}
// //                     <motion.button
// //                       initial={{ opacity: 0, rotate: -90 }}
// //                       animate={{ opacity: 1, rotate: 0 }}
// //                       transition={{ delay: 0.3, type: "spring" }}
// //                       whileHover={{ scale: 1.1, rotate: 90 }}
// //                       whileTap={{ scale: 0.9 }}
// //                       onClick={onClose}
// //                       className="relative flex items-center justify-center flex-shrink-0 w-8 h-8 transition-all duration-200 rounded-lg group sm:w-10 sm:h-10 md:w-11 md:h-11 sm:rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 backdrop-blur-sm"
// //                       aria-label="Close"
// //                     >
// //                       <div className="absolute inset-0 transition-opacity rounded-lg opacity-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-800/50 dark:to-gray-700/50 sm:rounded-xl group-hover:opacity-100" />
// //                       <Icon
// //                         name="X"
// //                         size={isMobile ? 18 : 20}
// //                         className="relative text-gray-600 transition-colors dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
// //                       />
// //                     </motion.button>
// //                   </div>
// //                 </div>

// //                 {/* Main Content */}
// //                 <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] sm:h-auto">
// //                   {/* Left Column - Gallery with floating effect */}
// //                   <motion.div
// //                     ref={imageContainerRef}
// //                     className={`lg:w-1/2 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200/20 dark:border-gray-700/20 ${showGallery ? 'lg:flex lg:flex-col' : ''}`}
// //                     animate={isFullscreen ? {
// //                       position: 'fixed',
// //                       top: 0,
// //                       left: 0,
// //                       right: 0,
// //                       bottom: 0,
// //                       width: '100vw',
// //                       height: '100vh',
// //                       zIndex: 60,
// //                       padding: 0,
// //                       borderRadius: 0
// //                     } : {}}
// //                     transition={{ type: "spring", damping: 25 }}
// //                   >
// //                     <div className={`space-y-4 sm:space-y-6 ${showGallery ? 'flex-1 flex flex-col' : ''}`}>
// //                       {/* Fullscreen Controls */}
// //                       {hasGallery && (
// //                         <div className="flex items-center justify-between mb-2">
// //                           <div className="text-xs text-gray-500 dark:text-gray-400">
// //                             Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">F</kbd> for fullscreen
// //                           </div>
// //                           {hasGallery && project.gallery.length > 1 && (
// //                             <Button
// //                               variant="ghost"
// //                               size="xs"
// //                               iconName={showGallery ? "X" : "Grid3x3"}
// //                               onClick={() => setShowGallery(!showGallery)}
// //                               className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// //                             >
// //                               {showGallery ? "Close Gallery" : "View Grid"}
// //                             </Button>
// //                           )}
// //                         </div>
// //                       )}

// //                       {/* Image Gallery */}
// //                       {showGallery ? (
// //                         // Grid Gallery View
// //                         <div className="flex-1 overflow-y-auto">
// //                           <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 auto-rows-max">
// //                             {project.gallery.map((img, index) => (
// //                               <motion.button
// //                                 key={index}
// //                                 layoutId={`gallery-image-${index}`}
// //                                 initial={{ opacity: 0, scale: 0.9 }}
// //                                 animate={{ opacity: 1, scale: 1 }}
// //                                 transition={{ delay: index * 0.05 }}
// //                                 whileHover={{ scale: 1.02, zIndex: 10 }}
// //                                 whileTap={{ scale: 0.98 }}
// //                                 onClick={() => {
// //                                   setCurrentImageIndex(index);
// //                                   setShowGallery(false);
// //                                 }}
// //                                 className={`relative aspect-square rounded-lg sm:rounded-xl overflow-hidden group ${currentImageIndex === index
// //                                     ? "ring-2 sm:ring-3 ring-blue-500"
// //                                     : "ring-1 ring-gray-200 dark:ring-gray-700"
// //                                   }`}
// //                               >
// //                                 <Image
// //                                   src={img}
// //                                   alt={`Gallery image ${index + 1}`}
// //                                   className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
// //                                 />
// //                                 <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />
// //                                 <div className="absolute px-2 py-1 text-xs text-white transition-opacity rounded opacity-0 bottom-2 left-2 bg-black/60 group-hover:opacity-100">
// //                                   View
// //                                 </div>
// //                               </motion.button>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       ) : (
// //                         // Single Image View
// //                         <div
// //                           ref={imageContainerRef}
// //                           className="relative overflow-hidden shadow-2xl rounded-xl sm:rounded-2xl xl:rounded-3xl bg-gradient-to-br from-gray-100/50 via-gray-200/30 to-gray-100/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 shadow-black/10"
// //                           onTouchStart={handleTouchStart}
// //                           onTouchMove={handleTouchMove}
// //                           onTouchEnd={handleTouchEnd}
// //                         >
// //                           {/* Loading Animation */}
// //                           {isLoading && (
// //                             <div className="absolute inset-0 flex items-center justify-center">
// //                               <div className="relative">
// //                                 <div className="border-4 rounded-full w-14 h-14 sm:w-20 sm:h-20 border-blue-500/20 border-t-blue-500 border-r-blue-400 animate-spin"></div>
// //                                 <div className="absolute inset-0 flex items-center justify-center">
// //                                   <motion.div
// //                                     animate={{ rotate: 360 }}
// //                                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
// //                                   >
// //                                     <Icon name="Loader" size={isMobile ? 24 : 32} className="text-blue-500" />
// //                                   </motion.div>
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           )}

// //                           {/* Main Image with parallax */}
// //                           <motion.div
// //                             key={currentImageIndex}
// //                             initial={{ opacity: 0, scale: 1.1 }}
// //                             animate={{ opacity: 1, scale: 1 }}
// //                             exit={{ opacity: 0, scale: 0.9 }}
// //                             transition={{
// //                               duration: 0.5,
// //                               ease: "easeOut"
// //                             }}
// //                             className="relative"
// //                           >
// //                             <Image
// //                               src={currentImage}
// //                               alt={`${project?.title} - Image ${currentImageIndex + 1}`}
// //                               className={`w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-all duration-700 ${isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
// //                                 }`}
// //                               style={{
// //                                 transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
// //                                 filter: isAnimating ? 'brightness(1.1)' : 'brightness(1)'
// //                               }}
// //                               onLoad={handleImageLoad}
// //                             />

// //                             {/* Animated Gradient Overlay */}
// //                             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
// //                             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

// //                             {/* Floating Particles */}
// //                             <div className="absolute inset-0 overflow-hidden">
// //                               {[...Array(5)].map((_, i) => (
// //                                 <motion.div
// //                                   key={i}
// //                                   className="absolute w-1 h-1 rounded-full bg-white/30"
// //                                   initial={{
// //                                     x: Math.random() * 100 + '%',
// //                                     y: Math.random() * 100 + '%',
// //                                     opacity: 0
// //                                   }}
// //                                   animate={{
// //                                     y: [null, '-100px'],
// //                                     opacity: [0, 1, 0]
// //                                   }}
// //                                   transition={{
// //                                     duration: Math.random() * 3 + 2,
// //                                     repeat: Infinity,
// //                                     delay: Math.random() * 2
// //                                   }}
// //                                 />
// //                               ))}
// //                             </div>
// //                           </motion.div>

// //                           {/* Gallery Navigation */}
// //                           {hasGallery && project.gallery.length > 1 && (
// //                             <>
// //                               {/* Navigation Arrows with glow */}
// //                               <motion.button
// //                                 initial={{ opacity: 0, x: -20 }}
// //                                 animate={{ opacity: 1, x: 0 }}
// //                                 transition={{ delay: 0.5 }}
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                                 onClick={prevImage}
// //                                 className="absolute -translate-y-1/2 left-2 sm:left-4 top-1/2 group"
// //                                 aria-label="Previous image"
// //                               >
// //                                 <div className="relative">
// //                                   <div className="absolute inset-0 transition-all rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-md group-hover:blur-lg"></div>
// //                                   <div className="relative flex items-center justify-center w-8 h-8 transition-all rounded-full sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-md group-hover:bg-black/80">
// //                                     <Icon
// //                                       name="ChevronLeft"
// //                                       size={isMobile ? 18 : 24}
// //                                       className="text-white transition-colors group-hover:text-blue-300"
// //                                     />
// //                                   </div>
// //                                 </div>
// //                               </motion.button>

// //                               <motion.button
// //                                 initial={{ opacity: 0, x: 20 }}
// //                                 animate={{ opacity: 1, x: 0 }}
// //                                 transition={{ delay: 0.5 }}
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                                 onClick={nextImage}
// //                                 className="absolute -translate-y-1/2 right-2 sm:right-4 top-1/2 group"
// //                                 aria-label="Next image"
// //                               >
// //                                 <div className="relative">
// //                                   <div className="absolute inset-0 transition-all rounded-full bg-gradient-to-r from-purple-500 to-blue-500 blur-md group-hover:blur-lg"></div>
// //                                   <div className="relative flex items-center justify-center w-8 h-8 transition-all rounded-full sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-md group-hover:bg-black/80">
// //                                     <Icon
// //                                       name="ChevronRight"
// //                                       size={isMobile ? 18 : 24}
// //                                       className="text-white transition-colors group-hover:text-blue-300"
// //                                     />
// //                                   </div>
// //                                 </div>
// //                               </motion.button>

// //                               {/* Progress Indicator */}
// //                               <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gray-800/30 backdrop-blur-sm">
// //                                 <motion.div
// //                                   className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
// //                                   initial={{ width: "0%" }}
// //                                   animate={{ width: `${getProgressPercentage()}%` }}
// //                                   transition={{
// //                                     duration: 0.8,
// //                                     ease: "easeInOut"
// //                                   }}
// //                                   style={{
// //                                     backgroundSize: '200% 100%',
// //                                     backgroundPosition: '100% 0',
// //                                     animation: 'gradientFlow 2s ease infinite'
// //                                   }}
// //                                 />
// //                               </div>

// //                               {/* Image Counter with animation */}
// //                               <motion.div
// //                                 initial={{ opacity: 0, y: 10 }}
// //                                 animate={{ opacity: 1, y: 0 }}
// //                                 transition={{ delay: 0.6 }}
// //                                 className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-2 border border-white/10"
// //                               >
// //                                 <motion.div
// //                                   animate={{ rotate: [0, 360] }}
// //                                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //                                 >
// //                                   <Icon name="Image" size={isMobile ? 12 : 16} className="text-blue-300" />
// //                                 </motion.div>
// //                                 <span className="font-semibold">
// //                                   {currentImageIndex + 1} / {project.gallery.length}
// //                                 </span>
// //                               </motion.div>

// //                               {/* Fullscreen Button */}
// //                               <motion.button
// //                                 initial={{ opacity: 0, scale: 0.8 }}
// //                                 animate={{ opacity: 1, scale: 1 }}
// //                                 transition={{ delay: 0.7 }}
// //                                 whileHover={{ scale: 1.1 }}
// //                                 whileTap={{ scale: 0.9 }}
// //                                 onClick={() => setIsFullscreen(!isFullscreen)}
// //                                 className="absolute p-2 text-white transition-colors border rounded-lg bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 backdrop-blur-md border-white/10 hover:bg-black/70"
// //                                 aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
// //                               >
// //                                 <Icon
// //                                   name={isFullscreen ? "Minimize2" : "Maximize2"}
// //                                   size={isMobile ? 16 : 20}
// //                                 />
// //                               </motion.button>
// //                             </>
// //                           )}
// //                         </div>
// //                       )}

// //                       {/* Thumbnail Rail */}
// //                       {hasGallery && project.gallery.length > 1 && !showGallery && (
// //                         <div className="space-y-2 sm:space-y-3">
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center gap-2">
// //                               <Icon name="GalleryVertical" size={16} className="text-gray-500" />
// //                               <span className="text-xs font-medium text-gray-700 sm:text-sm dark:text-gray-300">
// //                                 Scroll Gallery
// //                               </span>
// //                             </div>
// //                             <span className="text-xs text-gray-500 dark:text-gray-400">
// //                               {project.gallery.length} images
// //                             </span>
// //                           </div>
// //                           <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pb-2">
// //                             {project.gallery.map((img, index) => (
// //                               <motion.button
// //                                 key={index}
// //                                 whileHover={{ scale: 1.05, y: -2 }}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 onClick={() => setCurrentImageIndex(index)}
// //                                 className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${currentImageIndex === index
// //                                     ? "ring-2 sm:ring-3 ring-blue-500 shadow-lg shadow-blue-500/30 scale-105"
// //                                     : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600 opacity-80 hover:opacity-100"
// //                                   }`}
// //                               >
// //                                 <Image
// //                                   src={img}
// //                                   alt={`Thumbnail ${index + 1}`}
// //                                   className="object-cover w-full h-full"
// //                                 />
// //                                 {currentImageIndex === index && (
// //                                   <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px]" />
// //                                 )}
// //                                 <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${currentImageIndex === index
// //                                     ? 'bg-gradient-to-r from-blue-500 to-purple-500'
// //                                     : 'bg-transparent'
// //                                   }`} />
// //                               </motion.button>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}

// //                       {/* Quick Stats with animated counters */}
// //                       <div className="grid grid-cols-3 gap-2 sm:gap-3">
// //                         {project?.duration && (
// //                           <motion.div
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             transition={{ delay: 0.8 }}
// //                             className="p-2 transition-all duration-300 border group sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border-white/20 dark:border-gray-700/30 hover:border-blue-500/20 dark:hover:border-blue-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10"
// //                           >
// //                             <div className="flex items-center gap-1 sm:gap-2">
// //                               <motion.div
// //                                 animate={{ rotate: [0, 360] }}
// //                                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //                               >
// //                                 <Icon name="Calendar" size={isMobile ? 14 : 18} className="text-blue-500 transition-transform group-hover:scale-110" />
// //                               </motion.div>
// //                               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Duration</span>
// //                             </div>
// //                             <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
// //                               {project.duration}
// //                             </p>
// //                           </motion.div>
// //                         )}
// //                         {project?.teamSize && (
// //                           <motion.div
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             transition={{ delay: 0.9 }}
// //                             className="p-2 transition-all duration-300 border group sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border-white/20 dark:border-gray-700/30 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10"
// //                           >
// //                             <div className="flex items-center gap-1 sm:gap-2">
// //                               <motion.div
// //                                 animate={{ scale: [1, 1.1, 1] }}
// //                                 transition={{ duration: 2, repeat: Infinity }}
// //                               >
// //                                 <Icon name="Users" size={isMobile ? 14 : 18} className="transition-transform text-emerald-500 group-hover:scale-110" />
// //                               </motion.div>
// //                               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Team</span>
// //                             </div>
// //                             <p className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
// //                               {project.teamSize} member{project.teamSize !== "1" ? "s" : ""}
// //                             </p>
// //                           </motion.div>
// //                         )}
// //                         {project?.rating && (
// //                           <motion.div
// //                             initial={{ opacity: 0, y: 20 }}
// //                             animate={{ opacity: 1, y: 0 }}
// //                             transition={{ delay: 1 }}
// //                             className="p-2 transition-all duration-300 border group sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border-white/20 dark:border-gray-700/30 hover:border-amber-500/20 dark:hover:border-amber-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10"
// //                           >
// //                             <div className="flex items-center gap-1 sm:gap-2">
// //                               <motion.div
// //                                 animate={{ rotate: [0, 180, 0] }}
// //                                 transition={{ duration: 3, repeat: Infinity }}
// //                               >
// //                                 <Icon name="Star" size={isMobile ? 14 : 18} className="transition-transform text-amber-500 group-hover:scale-110" />
// //                               </motion.div>
// //                               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Rating</span>
// //                             </div>
// //                             <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
// //                               <p className="text-sm font-bold text-transparent bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 bg-clip-text">
// //                                 {project.rating}/5
// //                               </p>
// //                               <div className="flex ml-1">
// //                                 {[...Array(5)].map((_, i) => (
// //                                   <Icon
// //                                     key={i}
// //                                     name="Star"
// //                                     size={10}
// //                                     className={i < project.rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}
// //                                   />
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           </motion.div>
// //                         )}
// //                       </div>

// //                       {/* Action Buttons with animated hover */}
// //                       <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         transition={{ delay: 1.1 }}
// //                         className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-3"
// //                       >
// //                         {project?.liveUrl && (
// //                           <Button
// //                             variant="default"
// //                             size={isMobile ? "md" : "lg"}
// //                             iconName="ExternalLink"
// //                             iconPosition="left"
// //                             className="relative w-full overflow-hidden shadow-lg group bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
// //                             onClick={() => window.open(project.liveUrl, "_blank")}
// //                           >
// //                             {/* Animated background */}
// //                             <motion.div
// //                               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
// //                               animate={{
// //                                 x: ["-100%", "100%"]
// //                               }}
// //                               transition={{
// //                                 duration: 1.5,
// //                                 repeat: Infinity,
// //                                 ease: "linear"
// //                               }}
// //                             />
// //                             <span className="relative font-semibold truncate">Live Demo</span>
// //                             <motion.div
// //                               animate={{ x: [0, 4, 0] }}
// //                               transition={{ duration: 1, repeat: Infinity }}
// //                               className="relative ml-2"
// //                             >
// //                               <Icon name="ArrowUpRight" size={isMobile ? 16 : 18} />
// //                             </motion.div>
// //                           </Button>
// //                         )}
// //                         {project?.githubUrl && (
// //                           <Button
// //                             variant="outline"
// //                             size={isMobile ? "md" : "lg"}
// //                             iconName="Github"
// //                             iconPosition="left"
// //                             className="relative w-full overflow-hidden border-gray-300 group dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-lg"
// //                             onClick={() => window.open(project.githubUrl, "_blank")}
// //                           >
// //                             <span className="relative font-semibold truncate">Source Code</span>
// //                             <motion.div
// //                               animate={{ rotate: [0, 360] }}
// //                               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
// //                               className="relative ml-2"
// //                             >
// //                               <Icon name="Github" size={isMobile ? 16 : 18} />
// //                             </motion.div>
// //                           </Button>
// //                         )}
// //                       </motion.div>
// //                     </div>
// //                   </motion.div>

// //                   {/* Right Column - Content */}
// //                   <div className="flex flex-col lg:w-1/2">
// //                     {/* Tabs Navigation with animated indicators */}
// //                     <div className="sticky top-0 z-20 border-b bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl border-gray-200/30 dark:border-gray-700/30">
// //                       <div className="flex overflow-x-auto scrollbar-hide">
// //                         {tabs.map((tab) => (
// //                           <motion.button
// //                             key={tab.id}
// //                             onClick={() => setActiveTab(tab.id)}
// //                             className={`group relative flex-1 min-w-0 flex flex-col items-center px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 ${activeTab === tab.id
// //                                 ? "text-gray-900 dark:text-white"
// //                                 : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
// //                               }`}
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                           >
// //                             {/* Background gradient on active */}
// //                             {activeTab === tab.id && (
// //                               <motion.div
// //                                 layoutId="activeTab"
// //                                 className={`absolute inset-0 ${tab.gradient}`}
// //                                 transition={{ type: "spring", bounce: 0.2 }}
// //                               />
// //                             )}

// //                             <div className="relative flex items-center gap-1.5 sm:gap-2 z-10">
// //                               <motion.div
// //                                 animate={activeTab === tab.id ? {
// //                                   scale: [1, 1.2, 1],
// //                                   rotate: [0, 5, -5, 0]
// //                                 } : {}}
// //                                 transition={{ duration: 0.5 }}
// //                               >
// //                                 <Icon
// //                                   name={tab.icon}
// //                                   size={isMobile ? 16 : 20}
// //                                   className={activeTab === tab.id ? `bg-gradient-to-r ${tab.color} bg-clip-text text-transparent` : ''}
// //                                 />
// //                               </motion.div>
// //                               <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-r ' + tab.color + ' bg-clip-text text-transparent' : ''
// //                                 }`}>
// //                                 {isMobile ? tab.label.substring(0, 3) : tab.label}
// //                               </span>
// //                             </div>

// //                             {/* Animated underline */}
// //                             <div className="relative mt-1.5 sm:mt-2 h-0.5 w-4 sm:w-8 rounded-full overflow-hidden">
// //                               <motion.div
// //                                 className={`h-full bg-gradient-to-r ${tab.color}`}
// //                                 initial={false}
// //                                 animate={{
// //                                   width: activeTab === tab.id ? "100%" : "0%",
// //                                   opacity: activeTab === tab.id ? 1 : 0
// //                                 }}
// //                                 transition={{ duration: 0.3 }}
// //                               />
// //                             </div>
// //                           </motion.button>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     {/* Tab Content */}
// //                     <div
// //                       ref={contentRef}
// //                       className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-h-[calc(100vh-300px)] sm:max-h-[calc(95vh-200px)] lg:max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
// //                     >
// //                       <AnimatePresence mode="wait">
// //                         <motion.div
// //                           key={activeTab}
// //                           initial={{ opacity: 0, x: 20 }}
// //                           animate={{ opacity: 1, x: 0 }}
// //                           exit={{ opacity: 0, x: -20 }}
// //                           transition={{
// //                             duration: 0.3,
// //                             ease: "easeInOut"
// //                           }}
// //                           className="space-y-6 sm:space-y-8"
// //                         >
// //                           {/* Overview Tab */}
// //                           {activeTab === "overview" && (
// //                             <>
// //                               <div className="space-y-4">
// //                                 <motion.h3
// //                                   initial={{ opacity: 0, y: 10 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.1 }}
// //                                   className="text-xl font-bold text-transparent sm:text-2xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text"
// //                                 >
// //                                   Project Overview
// //                                 </motion.h3>
// //                                 <motion.div
// //                                   initial={{ opacity: 0 }}
// //                                   animate={{ opacity: 1 }}
// //                                   transition={{ delay: 0.2 }}
// //                                   className="prose-sm prose dark:prose-invert max-w-none"
// //                                 >
// //                                   <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line sm:text-base dark:text-gray-300">
// //                                     {project?.fullDescription}
// //                                   </p>
// //                                 </motion.div>
// //                               </div>

// //                               {project?.impact && (
// //                                 <motion.div
// //                                   initial={{ opacity: 0, y: 20 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.3 }}
// //                                   className="p-4 border sm:p-5 bg-gradient-to-br from-blue-50/50 to-white/50 dark:from-blue-900/20 dark:to-gray-900/20 rounded-xl sm:rounded-2xl border-blue-100/50 dark:border-blue-800/20 backdrop-blur-sm"
// //                                 >
// //                                   <div className="flex items-start gap-3">
// //                                     <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400">
// //                                       <Icon name="Target" size={20} className="text-white" />
// //                                     </div>
// //                                     <div>
// //                                       <h4 className="mb-1 text-base font-semibold text-gray-900 sm:text-lg dark:text-white">
// //                                         Project Impact
// //                                       </h4>
// //                                       <p className="text-sm text-gray-600 sm:text-base dark:text-gray-300">
// //                                         {project.impact}
// //                                       </p>
// //                                     </div>
// //                                   </div>
// //                                 </motion.div>
// //                               )}
// //                             </>
// //                           )}

// //                           {/* Technical Tab */}
// //                           {activeTab === "technical" && (
// //                             <>
// //                               <div className="space-y-4">
// //                                 <motion.h3
// //                                   initial={{ opacity: 0, y: 10 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.1 }}
// //                                   className="text-xl font-bold text-transparent sm:text-2xl bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text"
// //                                 >
// //                                   Technology Stack
// //                                 </motion.h3>
// //                                 <motion.p
// //                                   initial={{ opacity: 0 }}
// //                                   animate={{ opacity: 1 }}
// //                                   transition={{ delay: 0.2 }}
// //                                   className="text-sm text-gray-600 sm:text-base dark:text-gray-300"
// //                                 >
// //                                   Built using modern technologies and frameworks
// //                                 </motion.p>
// //                               </div>

// //                               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
// //                                 {project?.technologies?.map((tech, index) => (
// //                                   <motion.div
// //                                     key={index}
// //                                     initial={{ opacity: 0, scale: 0.8, y: 20 }}
// //                                     animate={{ opacity: 1, scale: 1, y: 0 }}
// //                                     transition={{
// //                                       delay: index * 0.05,
// //                                       type: "spring",
// //                                       stiffness: 200
// //                                     }}
// //                                     whileHover={{
// //                                       scale: 1.05,
// //                                       y: -5,
// //                                       transition: { type: "spring", stiffness: 400 }
// //                                     }}
// //                                     className="group"
// //                                   >
// //                                     <div className="p-3 transition-all duration-300 border shadow-sm sm:p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border-gray-200/50 dark:border-gray-700/50 group-hover:border-purple-200 dark:group-hover:border-purple-700/50 group-hover:shadow-lg group-hover:shadow-purple-500/10">
// //                                       <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
// //                                         <div className="flex items-center justify-center w-10 h-10 transition-transform duration-300 rounded-lg sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-gray-900 group-hover:scale-110">
// //                                           <motion.div
// //                                             animate={{ rotate: [0, 360] }}
// //                                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
// //                                           >
// //                                             <Icon name="Code" size={isMobile ? 18 : 22} className="text-purple-600 dark:text-purple-400" />
// //                                           </motion.div>
// //                                         </div>
// //                                         <span className="w-full text-xs font-semibold text-gray-900 truncate sm:text-sm dark:text-white">
// //                                           {tech}
// //                                         </span>
// //                                       </div>
// //                                     </div>
// //                                   </motion.div>
// //                                 ))}
// //                               </div>

// //                               {project?.challenges && project.challenges.length > 0 && (
// //                                 <motion.div
// //                                   initial={{ opacity: 0 }}
// //                                   animate={{ opacity: 1 }}
// //                                   transition={{ delay: 0.5 }}
// //                                   className="mt-6 space-y-4"
// //                                 >
// //                                   <h4 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
// //                                     Technical Challenges
// //                                   </h4>
// //                                   <div className="space-y-3">
// //                                     {project.challenges.map((challenge, index) => (
// //                                       <motion.div
// //                                         key={index}
// //                                         initial={{ opacity: 0, x: -20 }}
// //                                         animate={{ opacity: 1, x: 0 }}
// //                                         transition={{ delay: 0.6 + index * 0.1 }}
// //                                         className="p-4 border border-gray-200 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl dark:border-gray-700"
// //                                       >
// //                                         <div className="flex items-start gap-3">
// //                                           <div className="flex-shrink-0">
// //                                             <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-gray-900">
// //                                               <Icon name="AlertCircle" size={16} className="text-amber-600 dark:text-amber-400" />
// //                                             </div>
// //                                           </div>
// //                                           <div className="flex-1">
// //                                             <p className="mb-2 text-sm text-gray-600 sm:text-base dark:text-gray-300">
// //                                               <span className="font-semibold text-gray-900 dark:text-white">Challenge: </span>
// //                                               {challenge.problem}
// //                                             </p>
// //                                             <p className="text-sm text-gray-600 sm:text-base dark:text-gray-300">
// //                                               <span className="font-semibold text-gray-900 dark:text-white">Solution: </span>
// //                                               {challenge.solution}
// //                                             </p>
// //                                           </div>
// //                                         </div>
// //                                       </motion.div>
// //                                     ))}
// //                                   </div>
// //                                 </motion.div>
// //                               )}
// //                             </>
// //                           )}

// //                           {/* Features Tab */}
// //                           {activeTab === "features" && project?.features && (
// //                             <>
// //                               <div className="space-y-4">
// //                                 <motion.h3
// //                                   initial={{ opacity: 0, y: 10 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.1 }}
// //                                   className="text-xl font-bold text-transparent sm:text-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text"
// //                                 >
// //                                   Key Features
// //                                 </motion.h3>
// //                                 <motion.p
// //                                   initial={{ opacity: 0 }}
// //                                   animate={{ opacity: 1 }}
// //                                   transition={{ delay: 0.2 }}
// //                                   className="text-sm text-gray-600 sm:text-base dark:text-gray-300"
// //                                 >
// //                                   Core functionalities and capabilities
// //                                 </motion.p>
// //                               </div>

// //                               <div className="grid grid-cols-1 gap-3 sm:gap-4">
// //                                 {project.features.map((feature, index) => (
// //                                   <motion.div
// //                                     key={index}
// //                                     initial={{ opacity: 0, y: 20 }}
// //                                     animate={{ opacity: 1, y: 0 }}
// //                                     transition={{
// //                                       delay: 0.3 + index * 0.1,
// //                                       type: "spring",
// //                                       stiffness: 100
// //                                     }}
// //                                     whileHover={{ x: 5 }}
// //                                     className="group"
// //                                   >
// //                                     <div className="p-4 transition-colors border sm:p-5 bg-gradient-to-br from-emerald-50/50 to-white/50 dark:from-emerald-900/10 dark:to-gray-900/10 rounded-xl sm:rounded-2xl border-emerald-100/50 dark:border-emerald-800/20 hover:border-emerald-200 dark:hover:border-emerald-700/30 backdrop-blur-sm">
// //                                       <div className="flex items-start gap-3 sm:gap-4">
// //                                         <motion.div
// //                                           className="flex-shrink-0"
// //                                           animate={{
// //                                             rotate: [0, 10, -10, 0],
// //                                             scale: [1, 1.1, 1]
// //                                           }}
// //                                           transition={{
// //                                             duration: 2,
// //                                             repeat: Infinity,
// //                                             repeatDelay: 2
// //                                           }}
// //                                         >
// //                                           <div className="flex items-center justify-center w-10 h-10 rounded-lg shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-emerald-500/30">
// //                                             <Icon name="CheckCircle" size={20} className="text-white" />
// //                                           </div>
// //                                         </motion.div>
// //                                         <div className="flex-1">
// //                                           <p className="text-sm font-medium text-gray-900 sm:text-base dark:text-white">
// //                                             {feature}
// //                                           </p>
// //                                         </div>
// //                                         <motion.div
// //                                           initial={{ opacity: 0, x: -10 }}
// //                                           animate={{ opacity: 1, x: 0 }}
// //                                           transition={{ delay: 0.5 + index * 0.1 }}
// //                                           className="flex-shrink-0 transition-opacity opacity-0 group-hover:opacity-100"
// //                                         >
// //                                           <Icon name="ArrowRight" size={20} className="text-emerald-500" />
// //                                         </motion.div>
// //                                       </div>
// //                                     </div>
// //                                   </motion.div>
// //                                 ))}
// //                               </div>
// //                             </>
// //                           )}

// //                           {/* Impact Tab */}
// //                           {activeTab === "impact" && (
// //                             <>
// //                               <div className="space-y-4">
// //                                 <motion.h3
// //                                   initial={{ opacity: 0, y: 10 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.1 }}
// //                                   className="text-xl font-bold text-transparent sm:text-2xl bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 bg-clip-text"
// //                                 >
// //                                   Impact & Results
// //                                 </motion.h3>
// //                               </div>

// //                               {project?.metrics && project.metrics.length > 0 && (
// //                                 <motion.div
// //                                   initial={{ opacity: 0 }}
// //                                   animate={{ opacity: 1 }}
// //                                   transition={{ delay: 0.2 }}
// //                                   className="grid grid-cols-2 gap-3 lg:grid-cols-3 sm:gap-4"
// //                                 >
// //                                   {project.metrics.map((metric, index) => (
// //                                     <motion.div
// //                                       key={index}
// //                                       initial={{ opacity: 0, scale: 0.8 }}
// //                                       animate={{ opacity: 1, scale: 1 }}
// //                                       transition={{
// //                                         delay: 0.3 + index * 0.1,
// //                                         type: "spring",
// //                                         stiffness: 200
// //                                       }}
// //                                       whileHover={{ scale: 1.05 }}
// //                                       className="p-4 text-center border sm:p-5 bg-gradient-to-br from-amber-50/50 to-white/50 dark:from-amber-900/10 dark:to-gray-900/10 rounded-xl sm:rounded-2xl border-amber-100/50 dark:border-amber-800/20 backdrop-blur-sm"
// //                                     >
// //                                       <div className="mb-2 text-2xl font-bold text-transparent sm:text-3xl md:text-4xl bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text">
// //                                         {metric.value}
// //                                       </div>
// //                                       <div className="flex items-center justify-center gap-2">
// //                                         <Icon name={metric.icon} size={16} className="text-amber-500" />
// //                                         <div className="text-xs font-medium text-gray-700 truncate sm:text-sm dark:text-gray-300">
// //                                           {metric.label}
// //                                         </div>
// //                                       </div>
// //                                     </motion.div>
// //                                   ))}
// //                                 </motion.div>
// //                               )}

// //                               {project?.testimonial && (
// //                                 <motion.div
// //                                   initial={{ opacity: 0, y: 20 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.6 }}
// //                                   className="mt-6"
// //                                 >
// //                                   <div className="relative p-5 overflow-hidden border border-gray-200 shadow-lg sm:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl dark:border-gray-700"
// //                                   >
// //                                     {/* Quote marks */}
// //                                     <div className="absolute font-serif text-5xl top-4 left-4 text-blue-500/10">"</div>
// //                                     <div className="absolute font-serif text-5xl bottom-4 right-4 text-blue-500/10">"</div>

// //                                     <div className="relative z-10">
// //                                       <p className="mb-4 text-base italic text-gray-700 sm:text-lg dark:text-gray-300">
// //                                         "{project.testimonial.content}"
// //                                       </p>
// //                                       <div className="flex items-center gap-3">
// //                                         <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500">
// //                                           <Icon name="User" size={20} className="text-white" />
// //                                         </div>
// //                                         <div>
// //                                           <p className="font-semibold text-gray-900 dark:text-white">
// //                                             {project.testimonial.author}
// //                                           </p>
// //                                           <p className="text-sm text-gray-600 dark:text-gray-400">
// //                                             {project.testimonial.role}
// //                                           </p>
// //                                         </div>
// //                                       </div>
// //                                     </div>
// //                                   </div>
// //                                 </motion.div>
// //                               )}

// //                               {project?.learnings && (
// //                                 <motion.div
// //                                   initial={{ opacity: 0, y: 20 }}
// //                                   animate={{ opacity: 1, y: 0 }}
// //                                   transition={{ delay: 0.7 }}
// //                                   className="mt-6 space-y-4"
// //                                 >
// //                                   <h4 className="text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
// //                                     Key Learnings
// //                                   </h4>
// //                                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
// //                                     {project.learnings.map((learning, index) => (
// //                                       <motion.div
// //                                         key={index}
// //                                         initial={{ opacity: 0, scale: 0.9 }}
// //                                         animate={{ opacity: 1, scale: 1 }}
// //                                         transition={{ delay: 0.8 + index * 0.1 }}
// //                                         className="p-3 border sm:p-4 bg-gradient-to-br from-blue-50/50 to-white/50 dark:from-blue-900/10 dark:to-gray-900/10 rounded-xl border-blue-100/50 dark:border-blue-800/20"
// //                                       >
// //                                         <div className="flex items-start gap-2">
// //                                           <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
// //                                             <Icon name="Lightbulb" size={12} className="text-white" />
// //                                           </div>
// //                                           <p className="text-sm text-gray-700 dark:text-gray-300">
// //                                             {learning}
// //                                           </p>
// //                                         </div>
// //                                       </motion.div>
// //                                     ))}
// //                                   </div>
// //                                 </motion.div>
// //                               )}
// //                             </>
// //                           )}
// //                         </motion.div>
// //                       </AnimatePresence>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </div>

// //           {/* Custom CSS for animations */}
// //           <style jsx global>{`
// //             @keyframes gradientFlow {
// //               0% { background-position: 100% 0; }
// //               50% { background-position: 0 0; }
// //               100% { background-position: 100% 0; }
// //             }

// //             .modal-open {
// //               overflow: hidden;
// //             }

// //             .scrollbar-thin::-webkit-scrollbar {
// //               width: 4px;
// //               height: 4px;
// //             }

// //             .scrollbar-thin::-webkit-scrollbar-track {
// //               background: transparent;
// //             }

// //             .scrollbar-thin::-webkit-scrollbar-thumb {
// //               background: #d1d5db;
// //               border-radius: 4px;
// //             }

// //             .dark .scrollbar-thin::-webkit-scrollbar-thumb {
// //               background: #4b5563;
// //             }

// //             .scrollbar-hide::-webkit-scrollbar {
// //               display: none;
// //             }
// //           `}</style>
// //         </>
// //       )}
// //     </AnimatePresence>
// //   );
// // };

// // export default ProjectModal;
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Icon from "../../../components/AppIcon";
// import Image from "../../../components/AppImage";
// import Button from "../../../components/ui/Button";

// const ProjectModal = ({ project, isOpen, onClose }) => {
//   // State
//   const [activeTab, setActiveTab] = useState("overview");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showGallery, setShowGallery] = useState(false);
//   const [touchStart, setTouchStart] = useState(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   // Refs
//   const modalRef = useRef(null);
//   const contentRef = useRef(null);

//   // Detect if it's a mobile app project
//   const isMobileApp =
//     project?.type === "mobile-app" ||
//     project?.platforms ||
//     project?.isMobileApp;

//   // Check mobile device
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Lock body scroll
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
//     } else {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.paddingRight = "";
//     };
//   }, [isOpen]);

//   // Reset states
//   useEffect(() => {
//     if (project) {
//       setCurrentImageIndex(0);
//       setActiveTab("overview");
//       setIsLoading(true);
//       setImageLoaded(false);
//       setShowGallery(false);
//       setIsFullscreen(false);
//       if (contentRef.current) contentRef.current.scrollTop = 0;
//     }
//   }, [project]);

//   // Keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isOpen) return;
//       if (e.key === "Escape") onClose();
//       if (e.key === "ArrowLeft" && !showGallery) handlePrevImage();
//       if (e.key === "ArrowRight" && !showGallery) handleNextImage();
//       if (e.key === "f" && !isMobileApp && hasGallery)
//         setIsFullscreen(!isFullscreen);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, showGallery, isFullscreen, isMobileApp]);

//   // Image navigation
//   const handleNextImage = useCallback(() => {
//     if (!project?.gallery?.length) return;
//     setImageLoaded(false);
//     setIsLoading(true);
//     setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
//   }, [project]);

//   const handlePrevImage = useCallback(() => {
//     if (!project?.gallery?.length) return;
//     setImageLoaded(false);
//     setIsLoading(true);
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? project.gallery.length - 1 : prev - 1,
//     );
//   }, [project]);

//   // Touch handlers
//   const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
//   const handleTouchEnd = (e) => {
//     if (!touchStart) return;
//     const diff = touchStart - e.changedTouches[0].clientX;
//     if (Math.abs(diff) > 50) {
//       diff > 0 ? handleNextImage() : handlePrevImage();
//     }
//     setTouchStart(null);
//   };

//   // Click outside
//   const handleBackdropClick = (e) => {
//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       onClose();
//     }
//   };

//   if (!project) return null;

//   const hasGallery = project.gallery?.length > 0;
//   const currentImage = hasGallery
//     ? project.gallery[currentImageIndex]
//     : project.image;

//   const tabs = [
//     {
//       id: "overview",
//       label: "Overview",
//       icon: "Eye",
//       color: "blue",
//       gradient: "from-blue-500 to-blue-600",
//     },
//     {
//       id: "technical",
//       label: isMobileApp ? "Tech" : "Technical",
//       icon: "Cpu",
//       color: "purple",
//       gradient: "from-purple-500 to-purple-600",
//     },
//     {
//       id: "features",
//       label: "Features",
//       icon: "Layers",
//       color: "emerald",
//       gradient: "from-emerald-500 to-emerald-600",
//     },
//     {
//       id: "impact",
//       label: "Impact",
//       icon: "TrendingUp",
//       color: "orange",
//       gradient: "from-orange-500 to-orange-600",
//     },
//   ];

//   // ========== PHONE MODAL RENDER (For Mobile Apps) ==========
//   if (isMobileApp) {
//     return (
//       <AnimatePresence mode="wait">
//         {isOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-xl"
//               onClick={handleBackdropClick}
//             />

//             {/* Phone Frame */}
//             <motion.div
//               ref={modalRef}
//               initial={{ opacity: 0, scale: 0.8, y: 100 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.8, y: 100 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//               className="relative w-full max-w-[400px] h-[750px] sm:max-w-[380px] sm:h-[700px]"
//             >
//               {/* Phone Outer Frame */}
//               <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl shadow-black/50 p-2">
//                 {/* Phone Inner Screen */}
//                 <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] overflow-hidden flex flex-col">
//                   {/* Dynamic Island */}
//                   <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
//                     <div className="w-2 h-2 rounded-full shadow-lg bg-emerald-500/90 animate-pulse shadow-emerald-500/50" />
//                     <div className="w-12 h-3 bg-gray-800 rounded-full" />
//                   </div>

//                   {/* Status Bar */}
//                   <div className="absolute top-2 left-0 right-0 px-6 py-1 flex justify-between text-white/70 text-[11px] font-medium z-20">
//                     <span className="font-semibold">9:41</span>
//                     <div className="flex gap-1.5">
//                       <Icon name="Signal" size={11} className="text-white/70" />
//                       <Icon name="Wifi" size={11} className="text-white/70" />
//                       <Icon
//                         name="Battery"
//                         size={13}
//                         className="text-white/70"
//                       />
//                     </div>
//                   </div>

//                   {/* Header */}
//                   <div className="flex-shrink-0 px-5 pt-12 pb-4 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center flex-1 min-w-0 gap-3">
//                         <motion.div
//                           whileHover={{ scale: 1.05, rotate: 5 }}
//                           className="flex items-center justify-center flex-shrink-0 w-12 h-12 shadow-xl rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-purple-500/30"
//                         >
//                           <Icon
//                             name={project.iconName || "Smartphone"}
//                             size={20}
//                             className="text-white"
//                           />
//                         </motion.div>
//                         <div className="flex-1 min-w-0">
//                           <h2 className="text-base font-bold text-white truncate">
//                             {project.title}
//                           </h2>
//                           <div className="flex items-center gap-2 mt-0.5">
//                             <p className="text-[11px] text-blue-400 font-medium">
//                               {project.category}
//                             </p>
//                             {project.complexity && (
//                               <span
//                                 className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
//                                   project.complexity === "Advanced"
//                                     ? "bg-red-500/20 text-red-400"
//                                     : project.complexity === "Intermediate"
//                                       ? "bg-yellow-500/20 text-yellow-400"
//                                       : "bg-green-500/20 text-green-400"
//                                 }`}
//                               >
//                                 {project.complexity}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                       <motion.button
//                         whileHover={{ scale: 1.1, rotate: 90 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={onClose}
//                         className="p-2 transition rounded-full hover:bg-white/10"
//                       >
//                         <Icon name="X" size={18} className="text-white/70" />
//                       </motion.button>
//                     </div>
//                   </div>

//                   {/* Scrollable Content */}
//                   <div className="flex-1 overflow-y-auto custom-scroll">
//                     {/* App Screenshots */}
//                     {hasGallery && (
//                       <div className="border-b border-white/10">
//                         <div
//                           className="relative bg-black/30"
//                           onTouchStart={handleTouchStart}
//                           onTouchEnd={handleTouchEnd}
//                         >
//                           {(isLoading || !imageLoaded) && (
//                             <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
//                               <div className="relative">
//                                 <div className="w-10 h-10 border-2 border-blue-500 rounded-full border-t-transparent animate-spin" />
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                   <div className="w-6 h-6 border-2 border-purple-500 rounded-full border-t-transparent animate-spin" />
//                                 </div>
//                               </div>
//                             </div>
//                           )}
//                           <img
//                             src={currentImage}
//                             alt={project.title}
//                             className="object-cover w-full transition-all duration-500 h-72"
//                             onLoad={() => {
//                               setIsLoading(false);
//                               setImageLoaded(true);
//                             }}
//                             style={{ display: isLoading ? "none" : "block" }}
//                           />

//                           {/* Gradient Overlay */}
//                           <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent" />

//                           {project.gallery.length > 1 && (
//                             <>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={handlePrevImage}
//                                 className="absolute z-20 flex items-center justify-center w-8 h-8 transition-all -translate-y-1/2 rounded-full left-2 top-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80"
//                               >
//                                 <Icon
//                                   name="ChevronLeft"
//                                   size={16}
//                                   className="text-white"
//                                 />
//                               </motion.button>
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={handleNextImage}
//                                 className="absolute z-20 flex items-center justify-center w-8 h-8 transition-all -translate-y-1/2 rounded-full right-2 top-1/2 bg-black/60 backdrop-blur-sm hover:bg-black/80"
//                               >
//                                 <Icon
//                                   name="ChevronRight"
//                                   size={16}
//                                   className="text-white"
//                                 />
//                               </motion.button>
//                               <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 z-20">
//                                 <Icon
//                                   name="Image"
//                                   size={10}
//                                   className="text-blue-400"
//                                 />
//                                 <span className="font-medium">
//                                   {currentImageIndex + 1}/
//                                   {project.gallery.length}
//                                 </span>
//                               </div>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Content */}
//                     <div className="p-5 space-y-5">
//                       {/* Rating & Platform */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-1.5">
//                           <div className="flex gap-0.5">
//                             {[...Array(5)].map((_, i) => (
//                               <Icon
//                                 key={i}
//                                 name="Star"
//                                 size={14}
//                                 className={
//                                   i < (project.rating || 0)
//                                     ? "text-yellow-500 fill-yellow-500"
//                                     : "text-gray-600"
//                                 }
//                               />
//                             ))}
//                           </div>
//                           <span className="ml-1 text-xs font-semibold text-white/80">
//                             {project.rating}
//                           </span>
//                         </div>
//                         <div className="flex gap-1.5">
//                           {project.platforms?.map((platform, idx) => (
//                             <span
//                               key={idx}
//                               className="text-[10px] px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full text-white/80 font-medium"
//                             >
//                               {platform}
//                             </span>
//                           ))}
//                         </div>
//                       </div>

//                       {/* Description */}
//                       <p className="text-xs leading-relaxed text-white/70">
//                         {project.description}
//                       </p>

//                       {/* Tech Stack */}
//                       <div className="flex flex-wrap gap-1.5">
//                         {project.technologies?.slice(0, 4).map((tech, idx) => (
//                           <span
//                             key={idx}
//                             className="text-[9px] px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full font-medium"
//                           >
//                             {tech}
//                           </span>
//                         ))}
//                         {project.technologies?.length > 4 && (
//                           <span className="text-[9px] px-2 py-1 bg-white/10 text-white/60 rounded-full">
//                             +{project.technologies.length - 4}
//                           </span>
//                         )}
//                       </div>

//                       {/* Quick Stats */}
//                       <div className="grid grid-cols-3 gap-2.5">
//                         {project.duration && (
//                           <motion.div
//                             whileHover={{ scale: 1.02, y: -2 }}
//                             className="text-center p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//                           >
//                             <Icon
//                               name="Calendar"
//                               size={16}
//                               className="mx-auto mb-1.5 text-blue-400"
//                             />
//                             <p className="text-[9px] text-white/50">Duration</p>
//                             <p className="text-[11px] font-bold text-white/90">
//                               {project.duration}
//                             </p>
//                           </motion.div>
//                         )}
//                         {project.teamSize && (
//                           <motion.div
//                             whileHover={{ scale: 1.02, y: -2 }}
//                             className="text-center p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//                           >
//                             <Icon
//                               name="Users"
//                               size={16}
//                               className="mx-auto mb-1.5 text-green-400"
//                             />
//                             <p className="text-[9px] text-white/50">Team</p>
//                             <p className="text-[11px] font-bold text-white/90">
//                               {project.teamSize}
//                             </p>
//                           </motion.div>
//                         )}
//                         {project.downloads && (
//                           <motion.div
//                             whileHover={{ scale: 1.02, y: -2 }}
//                             className="text-center p-2.5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
//                           >
//                             <Icon
//                               name="Download"
//                               size={16}
//                               className="mx-auto mb-1.5 text-purple-400"
//                             />
//                             <p className="text-[9px] text-white/50">
//                               Downloads
//                             </p>
//                             <p className="text-[11px] font-bold text-white/90">
//                               {project.downloads}
//                             </p>
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Action Buttons */}
//                       <div className="flex gap-2.5 pt-2">
//                         {project.liveUrl && (
//                           <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             className="flex-1"
//                           >
//                             <Button
//                               variant="default"
//                               size="sm"
//                               iconName="ExternalLink"
//                               className="w-full text-xs bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
//                               onClick={() =>
//                                 window.open(project.liveUrl, "_blank")
//                               }
//                             >
//                               Open App
//                             </Button>
//                           </motion.div>
//                         )}
//                         {project.githubUrl && (
//                           <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             className="flex-1"
//                           >
//                             <Button
//                               variant="outline"
//                               size="sm"
//                               iconName="Github"
//                               className="w-full text-xs border-white/20 hover:bg-white/10"
//                               onClick={() =>
//                                 window.open(project.githubUrl, "_blank")
//                               }
//                             >
//                               Code
//                             </Button>
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Tabs */}
//                       <div className="flex gap-1.5 pt-3 border-t border-white/10">
//                         {tabs.map((tab) => (
//                           <button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`flex-1 py-2.5 text-[10px] font-semibold rounded-xl transition-all duration-200 ${
//                               activeTab === tab.id
//                                 ? `bg-gradient-to-r ${tab.gradient} text-white shadow-lg`
//                                 : "text-white/50 hover:text-white/70 hover:bg-white/5"
//                             }`}
//                           >
//                             <div className="flex items-center justify-center gap-1.5">
//                               <Icon name={tab.icon} size={12} />
//                               <span>{tab.label}</span>
//                             </div>
//                           </button>
//                         ))}
//                       </div>

//                       {/* Tab Content */}
//                       <div className="space-y-4">
//                         {activeTab === "overview" && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="space-y-4"
//                           >
//                             <p className="text-xs leading-relaxed text-white/70">
//                               {project.fullDescription || project.description}
//                             </p>
//                             {project.impact && (
//                               <div className="p-3.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
//                                 <div className="flex items-start gap-2.5">
//                                   <div className="flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-lg bg-blue-500/20">
//                                     <Icon
//                                       name="Target"
//                                       size={12}
//                                       className="text-blue-400"
//                                     />
//                                   </div>
//                                   <div>
//                                     <p className="text-[11px] font-semibold text-blue-400 mb-1">
//                                       Impact
//                                     </p>
//                                     <p className="text-[11px] text-white/70">
//                                       {project.impact}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </motion.div>
//                         )}

//                         {activeTab === "technical" && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="space-y-4"
//                           >
//                             <div>
//                               <h4 className="text-[11px] font-semibold text-purple-400 mb-2.5 flex items-center gap-1.5">
//                                 <Icon name="Code" size={12} />
//                                 Tech Stack
//                               </h4>
//                               <div className="flex flex-wrap gap-1.5">
//                                 {project.technologies?.map((tech, idx) => (
//                                   <span
//                                     key={idx}
//                                     className="text-[10px] px-2.5 py-1.5 bg-white/10 rounded-lg text-white/80 font-medium"
//                                   >
//                                     {tech}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             {project.challenges?.map((challenge, idx) => (
//                               <div
//                                 key={idx}
//                                 className="p-3 bg-white/5 rounded-xl"
//                               >
//                                 <p className="text-[10px] mb-2 text-white/70">
//                                   <span className="font-semibold text-red-400">
//                                     Challenge:
//                                   </span>{" "}
//                                   {challenge.problem}
//                                 </p>
//                                 <p className="text-[10px] text-white/70">
//                                   <span className="font-semibold text-green-400">
//                                     Solution:
//                                   </span>{" "}
//                                   {challenge.solution}
//                                 </p>
//                               </div>
//                             ))}
//                           </motion.div>
//                         )}

//                         {activeTab === "features" && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="space-y-2.5"
//                           >
//                             {project.features?.map((feature, idx) => (
//                               <div
//                                 key={idx}
//                                 className="flex items-start gap-2.5 p-2.5 bg-white/5 rounded-xl"
//                               >
//                                 <Icon
//                                   name="CheckCircle"
//                                   size={14}
//                                   className="text-emerald-400 mt-0.5 flex-shrink-0"
//                                 />
//                                 <span className="text-[11px] text-white/80">
//                                   {feature}
//                                 </span>
//                               </div>
//                             ))}
//                           </motion.div>
//                         )}

//                         {activeTab === "impact" && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="space-y-4"
//                           >
//                             {project.metrics?.map((metric, idx) => (
//                               <div
//                                 key={idx}
//                                 className="p-3 text-center border bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-xl border-orange-500/20"
//                               >
//                                 <div className="text-xl font-bold text-white">
//                                   {metric.value}
//                                 </div>
//                                 <div className="text-[10px] text-white/60 mt-1">
//                                   {metric.label}
//                                 </div>
//                               </div>
//                             ))}
//                             {project.learnings?.map((learning, idx) => (
//                               <div
//                                 key={idx}
//                                 className="flex items-start gap-2.5 p-2.5 bg-white/5 rounded-xl"
//                               >
//                                 <Icon
//                                   name="Lightbulb"
//                                   size={14}
//                                   className="text-yellow-400 mt-0.5 flex-shrink-0"
//                                 />
//                                 <span className="text-[11px] text-white/80">
//                                   {learning}
//                                 </span>
//                               </div>
//                             ))}
//                           </motion.div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Home Indicator */}
//                   <div className="flex justify-center flex-shrink-0 py-3">
//                     <div className="h-1 rounded-full w-36 bg-white/20" />
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     );
//   }

//   // ========== REGULAR MODAL RENDER (For Web/Other Projects) ==========
//   return (
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/90 backdrop-blur-md"
//             onClick={handleBackdropClick}
//           />

//           {/* Regular Modal */}
//           <motion.div
//             ref={modalRef}
//             initial={{ opacity: 0, scale: 0.9, y: 30 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 30 }}
//             transition={{ type: "spring", damping: 25, stiffness: 400 }}
//             className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
//           >
//             {/* Header */}
//             <div className="flex-shrink-0 px-6 py-5 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center flex-1 min-w-0 gap-4">
//                   <motion.div
//                     whileHover={{ scale: 1.05, rotate: 5 }}
//                     className="flex items-center justify-center flex-shrink-0 shadow-lg w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
//                   >
//                     <Icon
//                       name={project.iconName || "FolderKanban"}
//                       size={24}
//                       className="text-white"
//                     />
//                   </motion.div>
//                   <div className="flex-1 min-w-0">
//                     <h2 className="text-xl font-bold text-gray-900 truncate sm:text-2xl dark:text-white">
//                       {project.title}
//                     </h2>
//                     <div className="flex flex-wrap items-center gap-2 mt-1">
//                       <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
//                         {project.category}
//                       </span>
//                       {project.complexity && (
//                         <span
//                           className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
//                             project.complexity === "Advanced"
//                               ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
//                               : project.complexity === "Intermediate"
//                                 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
//                                 : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                           }`}
//                         >
//                           {project.complexity}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.1, rotate: 90 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={onClose}
//                   className="p-2 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   <Icon name="X" size={20} className="text-gray-500" />
//                 </motion.button>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex-1 overflow-y-auto custom-scroll">
//               {/* Gallery Section */}
//               {hasGallery && (
//                 <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
//                   <div
//                     className="relative"
//                     onTouchStart={handleTouchStart}
//                     onTouchEnd={handleTouchEnd}
//                   >
//                     {(isLoading || !imageLoaded) && (
//                       <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
//                         <div className="relative">
//                           <div className="w-12 h-12 border-blue-500 rounded-full border-3 border-t-transparent animate-spin" />
//                           <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="w-8 h-8 border-purple-500 rounded-full border-3 border-t-transparent animate-spin" />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                     <img
//                       src={currentImage}
//                       alt={project.title}
//                       className="w-full h-[400px] object-cover transition-all duration-500"
//                       onLoad={() => {
//                         setIsLoading(false);
//                         setImageLoaded(true);
//                       }}
//                       style={{ display: isLoading ? "none" : "block" }}
//                     />

//                     {project.gallery.length > 1 && (
//                       <>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={handlePrevImage}
//                           className="absolute flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
//                         >
//                           <Icon
//                             name="ChevronLeft"
//                             size={24}
//                             className="text-white"
//                           />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={handleNextImage}
//                           className="absolute flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
//                         >
//                           <Icon
//                             name="ChevronRight"
//                             size={24}
//                             className="text-white"
//                           />
//                         </motion.button>
//                         <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2">
//                           <Icon
//                             name="Image"
//                             size={14}
//                             className="text-blue-400"
//                           />
//                           <span className="font-medium">
//                             {currentImageIndex + 1}/{project.gallery.length}
//                           </span>
//                         </div>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => setIsFullscreen(!isFullscreen)}
//                           className="absolute p-2 text-white transition-all rounded-full bottom-4 right-4 bg-black/70 backdrop-blur-md hover:bg-black/80"
//                         >
//                           <Icon
//                             name={isFullscreen ? "Minimize2" : "Maximize2"}
//                             size={18}
//                           />
//                         </motion.button>
//                       </>
//                     )}
//                   </div>

//                   {/* Thumbnail Strip */}
//                   {project.gallery.length > 1 && !isMobile && (
//                     <div className="p-3 overflow-x-auto">
//                       <div className="flex justify-center gap-2">
//                         {project.gallery.map((img, idx) => (
//                           <motion.button
//                             key={idx}
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => {
//                               setImageLoaded(false);
//                               setIsLoading(true);
//                               setCurrentImageIndex(idx);
//                             }}
//                             className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all ${
//                               currentImageIndex === idx
//                                 ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30"
//                                 : "ring-1 ring-gray-200 dark:ring-gray-700 opacity-70 hover:opacity-100"
//                             }`}
//                           >
//                             <img
//                               src={img}
//                               alt={`Thumb ${idx + 1}`}
//                               className="object-cover w-full h-full"
//                             />
//                           </motion.button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Stats Cards */}
//               <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30">
//                 {project.duration && (
//                   <motion.div
//                     whileHover={{ y: -2 }}
//                     className="p-3 text-center bg-white shadow-sm dark:bg-gray-800 rounded-xl"
//                   >
//                     <Icon
//                       name="Calendar"
//                       size={22}
//                       className="mx-auto mb-2 text-blue-500"
//                     />
//                     <p className="text-xs text-gray-500">Duration</p>
//                     <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
//                       {project.duration}
//                     </p>
//                   </motion.div>
//                 )}
//                 {project.teamSize && (
//                   <motion.div
//                     whileHover={{ y: -2 }}
//                     className="p-3 text-center bg-white shadow-sm dark:bg-gray-800 rounded-xl"
//                   >
//                     <Icon
//                       name="Users"
//                       size={22}
//                       className="mx-auto mb-2 text-green-500"
//                     />
//                     <p className="text-xs text-gray-500">Team Size</p>
//                     <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
//                       {project.teamSize}
//                     </p>
//                   </motion.div>
//                 )}
//                 {project.rating && (
//                   <motion.div
//                     whileHover={{ y: -2 }}
//                     className="p-3 text-center bg-white shadow-sm dark:bg-gray-800 rounded-xl"
//                   >
//                     <Icon
//                       name="Star"
//                       size={22}
//                       className="mx-auto mb-2 text-yellow-500"
//                     />
//                     <p className="text-xs text-gray-500">Rating</p>
//                     <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
//                       {project.rating}/5.0
//                     </p>
//                   </motion.div>
//                 )}
//                 {project.status && (
//                   <motion.div
//                     whileHover={{ y: -2 }}
//                     className="p-3 text-center bg-white shadow-sm dark:bg-gray-800 rounded-xl"
//                   >
//                     <Icon
//                       name="CheckCircle"
//                       size={22}
//                       className="mx-auto mb-2 text-purple-500"
//                     />
//                     <p className="text-xs text-gray-500">Status</p>
//                     <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
//                       {project.status}
//                     </p>
//                   </motion.div>
//                 )}
//               </div>

//               {/* Action Buttons */}
//               {(project.liveUrl || project.githubUrl) && (
//                 <div className="flex flex-col gap-3 p-6 border-b border-gray-200 sm:flex-row dark:border-gray-800">
//                   {project.liveUrl && (
//                     <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
//                       <Button
//                         variant="default"
//                         size="md"
//                         iconName="ExternalLink"
//                         className="w-full"
//                         onClick={() => window.open(project.liveUrl, "_blank")}
//                       >
//                         Live Demo
//                       </Button>
//                     </motion.div>
//                   )}
//                   {project.githubUrl && (
//                     <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
//                       <Button
//                         variant="outline"
//                         size="md"
//                         iconName="Github"
//                         className="w-full"
//                         onClick={() => window.open(project.githubUrl, "_blank")}
//                       >
//                         Source Code
//                       </Button>
//                     </motion.div>
//                   )}
//                 </div>
//               )}

//               {/* Tabs */}
//               <div className="sticky top-0 z-10 flex bg-white border-b border-gray-200 dark:border-gray-800 dark:bg-gray-900">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex-1 py-4 text-sm font-medium transition-all relative ${
//                       activeTab === tab.id
//                         ? `text-${tab.color}-600 dark:text-${tab.color}-400`
//                         : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                     }`}
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <Icon name={tab.icon} size={18} />
//                       <span className="hidden sm:inline">{tab.label}</span>
//                       <span className="sm:hidden">
//                         {tab.label.substring(0, 3)}
//                       </span>
//                     </div>
//                     {activeTab === tab.id && (
//                       <motion.div
//                         layoutId="activeTab"
//                         className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${tab.color}-500`}
//                         transition={{
//                           type: "spring",
//                           bounce: 0.2,
//                           duration: 0.6,
//                         }}
//                       />
//                     )}
//                   </button>
//                 ))}
//               </div>

//               {/* Tab Content */}
//               <div ref={contentRef} className="p-6 space-y-6">
//                 {/* Overview Tab */}
//                 {activeTab === "overview" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="space-y-5"
//                   >
//                     <div>
//                       <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
//                         About This Project
//                       </h3>
//                       <p className="leading-relaxed text-gray-600 dark:text-gray-300">
//                         {project.fullDescription || project.description}
//                       </p>
//                     </div>
//                     {project.impact && (
//                       <div className="p-5 border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl dark:border-blue-800/30">
//                         <div className="flex gap-3">
//                           <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-lg shadow-lg bg-gradient-to-br from-blue-500 to-blue-600">
//                             <Icon
//                               name="Target"
//                               size={20}
//                               className="text-white"
//                             />
//                           </div>
//                           <div>
//                             <h4 className="mb-1 font-semibold text-gray-900 dark:text-white">
//                               Project Impact
//                             </h4>
//                             <p className="text-sm text-gray-600 dark:text-gray-300">
//                               {project.impact}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </motion.div>
//                 )}

//                 {/* Technical Tab */}
//                 {activeTab === "technical" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="space-y-5"
//                   >
//                     <div>
//                       <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
//                         Technology Stack
//                       </h3>
//                       <div className="flex flex-wrap gap-2">
//                         {project.technologies?.map((tech, idx) => (
//                           <motion.span
//                             key={idx}
//                             initial={{ opacity: 0, scale: 0.8 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: idx * 0.05 }}
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             className="px-3 py-2 text-sm font-medium text-purple-700 rounded-lg shadow-sm bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 dark:text-purple-300"
//                           >
//                             {tech}
//                           </motion.span>
//                         ))}
//                       </div>
//                     </div>
//                     {project.challenges?.map((challenge, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         className="p-4 border border-gray-200 bg-gray-50 dark:bg-gray-800/50 rounded-xl dark:border-gray-700"
//                       >
//                         <div className="flex items-start gap-3">
//                           <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg dark:bg-red-900/30">
//                             <Icon
//                               name="AlertCircle"
//                               size={16}
//                               className="text-red-600 dark:text-red-400"
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <p className="mb-2 text-sm">
//                               <span className="font-semibold text-red-600 dark:text-red-400">
//                                 Challenge:
//                               </span>{" "}
//                               {challenge.problem}
//                             </p>
//                             <p className="text-sm">
//                               <span className="font-semibold text-green-600 dark:text-green-400">
//                                 Solution:
//                               </span>{" "}
//                               {challenge.solution}
//                             </p>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === "features" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="space-y-3"
//                   >
//                     {project.features?.map((feature, idx) => (
//                       <motion.div
//                         key={idx}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: idx * 0.05 }}
//                         whileHover={{ x: 5 }}
//                         className="flex items-start gap-3 p-4 border bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-emerald-100 dark:border-emerald-800/30"
//                       >
//                         <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg shadow-md bg-emerald-500">
//                           <Icon
//                             name="CheckCircle"
//                             size={16}
//                             className="text-white"
//                           />
//                         </div>
//                         <span className="text-gray-700 dark:text-gray-300">
//                           {feature}
//                         </span>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 )}

//                 {/* Impact Tab */}
//                 {activeTab === "impact" && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="space-y-5"
//                   >
//                     {project.metrics?.length > 0 && (
//                       <div>
//                         <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
//                           Key Metrics
//                         </h3>
//                         <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
//                           {project.metrics.map((metric, idx) => (
//                             <motion.div
//                               key={idx}
//                               initial={{ opacity: 0, scale: 0.8 }}
//                               animate={{ opacity: 1, scale: 1 }}
//                               transition={{ delay: idx * 0.1 }}
//                               whileHover={{ scale: 1.05 }}
//                               className="p-4 text-center border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-xl dark:border-orange-800/30"
//                             >
//                               <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text">
//                                 {metric.value}
//                               </div>
//                               <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
//                                 {metric.label}
//                               </div>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {project.learnings?.length > 0 && (
//                       <div>
//                         <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
//                           Key Learnings
//                         </h3>
//                         <div className="space-y-2">
//                           {project.learnings.map((learning, idx) => (
//                             <motion.div
//                               key={idx}
//                               initial={{ opacity: 0, x: -20 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               transition={{ delay: idx * 0.05 }}
//                               className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/10"
//                             >
//                               <Icon
//                                 name="Lightbulb"
//                                 size={18}
//                                 className="text-yellow-500 flex-shrink-0 mt-0.5"
//                               />
//                               <span className="text-sm text-gray-700 dark:text-gray-300">
//                                 {learning}
//                               </span>
//                             </motion.div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                     {project.testimonial && (
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         className="relative p-6 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-xl"
//                       >
//                         <Icon
//                           name="Quote"
//                           size="40"
//                           className="absolute text-gray-300 dark:text-gray-600 top-4 left-4"
//                         />
//                         <div className="relative z-10 pt-8">
//                           <p className="mb-4 text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">
//                             "{project.testimonial.content}"
//                           </p>
//                           <div className="flex items-center gap-3">
//                             <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-500">
//                               <Icon
//                                 name="User"
//                                 size={18}
//                                 className="text-white"
//                               />
//                             </div>
//                             <div>
//                               <p className="font-semibold text-gray-900 dark:text-white">
//                                 {project.testimonial.author}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 {project.testimonial.role}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </motion.div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProjectModal;
import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProjectModal = ({ project, isOpen, onClose }) => {
  // ========== STATE ==========
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);

  // ========== REFS ==========
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const autoSlideInterval = useRef(null);
  const restartTimeout = useRef(null);

  // ========== DETECT MOBILE ==========
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ========== BODY SCROLL LOCK ==========
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  // ========== RESET ON PROJECT CHANGE ==========
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setActiveTab("overview");
      setIsLoading(true);
      setImageLoaded(false);
      setIsAutoSliding(true);
      setUserInteracted(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  }, [project]);

  // ========== CLEANUP TIMERS ==========
  useEffect(() => {
    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      if (restartTimeout.current) clearTimeout(restartTimeout.current);
    };
  }, []);

  // ========== AUTO-SLIDE LOGIC ==========
  useEffect(() => {
    const hasGallery = project?.gallery?.length > 1;
    if (isOpen && hasGallery && isAutoSliding && !userInteracted) {
      autoSlideInterval.current = setInterval(() => {
        setCurrentImageIndex((prev) => {
          const next = (prev + 1) % project.gallery.length;
          setImageLoaded(false);
          setIsLoading(true);
          return next;
        });
      }, 4000);
    }
    return () => {
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
    };
  }, [isOpen, project?.gallery?.length, isAutoSliding, userInteracted]);

  const stopAutoSlide = useCallback(() => {
    if (!userInteracted) {
      setUserInteracted(true);
      setIsAutoSliding(false);
      if (autoSlideInterval.current) clearInterval(autoSlideInterval.current);
      if (restartTimeout.current) clearTimeout(restartTimeout.current);
      restartTimeout.current = setTimeout(() => {
        if (isOpen && project?.gallery?.length > 1) {
          setUserInteracted(false);
          setIsAutoSliding(true);
        }
      }, 10000);
    }
  }, [userInteracted, isOpen, project?.gallery?.length]);

  // ========== KEYBOARD NAVIGATION ==========
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        stopAutoSlide();
        handlePrevImage();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        stopAutoSlide();
        handleNextImage();
      }
      if (e.key === "f" && project?.gallery?.length > 0) {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, project?.gallery?.length]);

  // ========== IMAGE NAVIGATION ==========
  const handleNextImage = useCallback(() => {
    if (!project?.gallery?.length) return;
    stopAutoSlide();
    setImageLoaded(false);
    setIsLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
  }, [project, stopAutoSlide]);

  const handlePrevImage = useCallback(() => {
    if (!project?.gallery?.length) return;
    stopAutoSlide();
    setImageLoaded(false);
    setIsLoading(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.gallery.length - 1 : prev - 1,
    );
  }, [project, stopAutoSlide]);

  // ========== TOUCH SWIPE ==========
  const handleTouchStart = (e) => {
    stopAutoSlide();
    setTouchStart(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const diff = Math.abs(touchStart - e.touches[0].clientX);
    if (diff > 10) e.preventDefault();
  };
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      e.preventDefault();
      diff > 0 ? handleNextImage() : handlePrevImage();
    }
    setTouchStart(null);
  };

  // ========== CLICK OUTSIDE ==========
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
  };

  if (!project) return null;

  const hasGallery = project.gallery?.length > 0;
  const currentImage = hasGallery
    ? project.gallery[currentImageIndex]
    : project.image;

  const tabs = [
    { id: "overview", label: "Overview", icon: "Eye", color: "blue" },
    { id: "technical", label: "Technical", icon: "Cpu", color: "purple" },
    { id: "features", label: "Features", icon: "Layers", color: "emerald" },
    { id: "impact", label: "Impact", icon: "TrendingUp", color: "orange" },
  ];

  // ========== RENDER ==========
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6">
          {/* Premium Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md"
            onClick={handleBackdropClick}
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col ring-1 ring-black/5 dark:ring-white/10"
          >
            {/* Header with Glassmorphism */}
            <div className="flex-shrink-0 px-5 py-4 border-b border-gray-100 sm:px-7 sm:py-5 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center flex-1 min-w-0 gap-4">
                  {/* Animated Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="flex items-center justify-center flex-shrink-0 w-12 h-12 shadow-lg sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-blue-500/30"
                  >
                    <Icon
                      name={project.iconName || "FolderKanban"}
                      size={22}
                      className="text-white sm:w-6 sm:h-6"
                    />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 truncate sm:text-2xl dark:text-white">
                      {project.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {project.category}
                      </span>
                      {project.complexity && (
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold shadow-sm ${
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
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 transition-all rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <Icon name="X" size={20} className="text-gray-500" />
                </motion.button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto custom-scroll"
              style={{ overscrollBehavior: "contain" }}
            >
              {/* Gallery Section */}
              {hasGallery && (
                <div className="border-b border-gray-100 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/30 dark:to-gray-900">
                  <div
                    className="relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* Auto-slide indicator */}
                    {isAutoSliding &&
                      project.gallery.length > 1 &&
                      !userInteracted && (
                        <div className="absolute top-4 right-4 z-30 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 text-[11px] text-white/90 flex items-center gap-2 shadow-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-sm" />
                          Auto-slide
                        </div>
                      )}

                    {/* Loading State */}
                    {(isLoading || !imageLoaded) && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <div className="relative">
                          <div className="w-10 h-10 border-blue-500 rounded-full border-3 border-t-transparent animate-spin" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="relative w-full h-[320px] sm:h-[440px] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                      <img
                        src={currentImage}
                        alt={project.title}
                        className="object-contain w-full h-full transition-opacity duration-500"
                        onLoad={() => {
                          setIsLoading(false);
                          setImageLoaded(true);
                        }}
                        style={{
                          display: isLoading ? "none" : "block",
                          opacity: imageLoaded ? 1 : 0,
                        }}
                      />
                    </div>

                    {/* Navigation Arrows */}
                    {project.gallery.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handlePrevImage}
                          className="absolute z-20 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 rounded-full shadow-lg left-4 top-1/2 bg-black/60 backdrop-blur-md hover:bg-black/80"
                        >
                          <Icon
                            name="ChevronLeft"
                            size={22}
                            className="text-white"
                          />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleNextImage}
                          className="absolute z-20 flex items-center justify-center w-10 h-10 transition-all -translate-y-1/2 rounded-full shadow-lg right-4 top-1/2 bg-black/60 backdrop-blur-md hover:bg-black/80"
                        >
                          <Icon
                            name="ChevronRight"
                            size={22}
                            className="text-white"
                          />
                        </motion.button>

                        {/* Counter Badge */}
                        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md text-white text-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-md">
                          <Icon
                            name="Image"
                            size={14}
                            className="text-blue-400"
                          />
                          <span className="font-medium">
                            {currentImageIndex + 1} / {project.gallery.length}
                          </span>
                        </div>

                        {/* Fullscreen Toggle */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="absolute p-2 text-white transition-all rounded-full shadow-md bottom-4 right-4 bg-black/70 backdrop-blur-md hover:bg-black/80"
                        >
                          <Icon
                            name={isFullscreen ? "Minimize2" : "Maximize2"}
                            size={16}
                          />
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Thumbnails - Modern Scroll */}
                  {project.gallery.length > 1 && !isMobile && (
                    <div className="px-5 py-4 overflow-x-auto scrollbar-thin">
                      <div className="flex justify-center gap-3">
                        {project.gallery.map((img, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.05, y: -3 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              stopAutoSlide();
                              setImageLoaded(false);
                              setIsLoading(true);
                              setCurrentImageIndex(idx);
                            }}
                            className={`flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                              currentImageIndex === idx
                                ? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/30 scale-105"
                                : "ring-1 ring-gray-200 dark:ring-gray-700 opacity-70 hover:opacity-100 hover:ring-gray-300"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumb ${idx + 1}`}
                              className="object-cover w-full h-full"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Stats Cards - Glass Design */}
              {(project.duration ||
                project.teamSize ||
                project.rating ||
                project.status ||
                project.platforms) && (
                <div className="grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-7 bg-gradient-to-r from-gray-50/80 to-gray-100/50 dark:from-gray-800/30 dark:to-gray-800/10">
                  {project.duration && (
                    <div className="p-3 text-center transition-all duration-300 bg-white shadow-md dark:bg-gray-800/80 rounded-xl hover:shadow-lg hover:-translate-y-1">
                      <Icon
                        name="Calendar"
                        size={20}
                        className="mx-auto mb-2 text-blue-500"
                      />
                      <p className="text-xs font-medium text-gray-500">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                        {project.duration}
                      </p>
                    </div>
                  )}
                  {project.teamSize && (
                    <div className="p-3 text-center transition-all duration-300 bg-white shadow-md dark:bg-gray-800/80 rounded-xl hover:shadow-lg hover:-translate-y-1">
                      <Icon
                        name="Users"
                        size={20}
                        className="mx-auto mb-2 text-green-500"
                      />
                      <p className="text-xs font-medium text-gray-500">Team</p>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                        {project.teamSize}
                      </p>
                    </div>
                  )}
                  {project.rating && (
                    <div className="p-3 text-center transition-all duration-300 bg-white shadow-md dark:bg-gray-800/80 rounded-xl hover:shadow-lg hover:-translate-y-1">
                      <Icon
                        name="Star"
                        size={20}
                        className="mx-auto mb-2 text-yellow-500"
                      />
                      <p className="text-xs font-medium text-gray-500">
                        Rating
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
                        {project.rating}/5.0
                      </p>
                    </div>
                  )}
                  {project.status && (
                    <div className="p-3 text-center transition-all duration-300 bg-white shadow-md dark:bg-gray-800/80 rounded-xl hover:shadow-lg hover:-translate-y-1">
                      <Icon
                        name="CheckCircle"
                        size={20}
                        className="mx-auto mb-2 text-purple-500"
                      />
                      <p className="text-xs font-medium text-gray-500">
                        Status
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-900 truncate dark:text-white">
                        {project.status}
                      </p>
                    </div>
                  )}
                  {project.platforms && project.platforms.length > 0 && (
                    <div className="col-span-2 p-3 text-center transition-all duration-300 bg-white shadow-md dark:bg-gray-800/80 rounded-xl sm:col-span-1 hover:shadow-lg hover:-translate-y-1">
                      <Icon
                        name="Smartphone"
                        size={20}
                        className="mx-auto mb-2 text-indigo-500"
                      />
                      <p className="text-xs font-medium text-gray-500">
                        Platforms
                      </p>
                      <p className="mt-1 text-sm font-bold text-gray-900 truncate dark:text-white">
                        {project.platforms.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons - Enhanced */}
              {(project.liveUrl ||
                project.githubUrl ||
                project.downloadUrl) && (
                <div className="flex flex-col gap-3 p-5 border-b border-gray-100 sm:flex-row sm:p-7 dark:border-gray-800">
                  {project.liveUrl && (
                    <Button
                      variant="default"
                      size="md"
                      iconName="ExternalLink"
                      className="w-full shadow-md sm:flex-1 hover:shadow-lg"
                      onClick={() => window.open(project.liveUrl, "_blank")}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project.downloadUrl && (
                    <Button
                      variant="default"
                      size="md"
                      iconName="Download"
                      className="w-full shadow-md sm:flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg"
                      onClick={() => window.open(project.downloadUrl, "_blank")}
                    >
                      Download App
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="md"
                      iconName="Github"
                      className="w-full border-gray-300 shadow-md sm:flex-1 dark:border-gray-600 hover:shadow-lg"
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      Source Code
                    </Button>
                  )}
                </div>
              )}

              {/* Tabs - Modern Indicator */}
              <div className="sticky top-0 z-10 flex bg-white border-b border-gray-100 dark:border-gray-800 dark:bg-gray-900">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 py-4 text-sm font-semibold transition-all relative ${
                      activeTab === tab.id
                        ? `text-${tab.color}-600 dark:text-${tab.color}-400`
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Icon name={tab.icon} size={18} />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">
                        {tab.label.substring(0, 3)}
                      </span>
                    </div>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${tab.color}-500 rounded-full`}
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.5,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content - Improved Cards */}
              <div className="p-6 space-y-6 sm:p-7">
                {/* Overview */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        About This Project
                      </h3>
                      <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                        {project.fullDescription || project.description}
                      </p>
                    </div>
                    {project.impact && (
                      <div className="p-5 border-l-4 border-blue-500 shadow-md bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                        <div className="flex gap-4">
                          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg shadow-md">
                            <Icon
                              name="Target"
                              size={20}
                              className="text-white"
                            />
                          </div>
                          <div>
                            <h4 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                              Impact
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                              {project.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Technical */}
                {activeTab === "technical" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Tech Stack
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.technologies?.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 text-sm font-semibold text-purple-700 transition-all shadow-sm rounded-xl bg-purple-50 dark:bg-purple-900/30 dark:text-purple-300 hover:shadow-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    {project.challenges?.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="p-5 border border-gray-100 shadow-sm rounded-xl bg-gray-50 dark:bg-gray-800/50 dark:border-gray-700"
                      >
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-lg dark:bg-red-900/30">
                              <Icon
                                name="AlertCircle"
                                size={20}
                                className="text-red-600 dark:text-red-400"
                              />
                            </div>
                          </div>
                          <div className="flex-1 space-y-2">
                            <p className="text-base">
                              <span className="font-bold text-red-600 dark:text-red-400">
                                Challenge:
                              </span>{" "}
                              {challenge.problem}
                            </p>
                            <p className="text-base">
                              <span className="font-bold text-green-600 dark:text-green-400">
                                Solution:
                              </span>{" "}
                              {challenge.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Features */}
                {activeTab === "features" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-3"
                  >
                    {project.features?.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 p-4 transition-all rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 hover:shadow-md"
                      >
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg shadow-sm bg-emerald-500">
                            <Icon
                              name="CheckCircle"
                              size={16}
                              className="text-white"
                            />
                          </div>
                        </div>
                        <span className="text-base font-medium text-gray-800 dark:text-gray-200">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Impact */}
                {activeTab === "impact" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    {project.metrics?.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                          Key Metrics
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {project.metrics.map((metric, idx) => (
                            <div
                              key={idx}
                              className="p-4 text-center transition-all shadow-md rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:scale-105"
                            >
                              <div className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text">
                                {metric.value}
                              </div>
                              <div className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {project.learnings?.length > 0 && (
                      <div>
                        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                          Learnings
                        </h3>
                        <div className="space-y-3">
                          {project.learnings.map((learning, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20"
                            >
                              <Icon
                                name="Lightbulb"
                                size={20}
                                className="text-yellow-500 flex-shrink-0 mt-0.5"
                              />
                              <span className="text-base text-gray-700 dark:text-gray-300">
                                {learning}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
