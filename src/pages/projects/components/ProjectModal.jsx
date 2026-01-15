// import React, { useState, useEffect, useCallback, useRef } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Icon from "../../../components/AppIcon";
// import Image from "../../../components/AppImage";
// import Button from "../../../components/ui/Button";

// const ProjectModal = ({ project, isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState("overview");
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [touchStart, setTouchStart] = useState(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const [showGallery, setShowGallery] = useState(false);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const modalRef = useRef(null);
//   const imageContainerRef = useRef(null);
//   const contentRef = useRef(null);

//   // Check for mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);

//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Lock scroll when modal opens with smooth transition
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//       document.body.style.position = "fixed";
//       document.body.style.width = "100%";
//       document.body.style.height = "100%";

//       const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//       if (scrollbarWidth > 0) {
//         document.body.style.paddingRight = `${scrollbarWidth}px`;
//       }

//       // Add class for smooth transitions
//       document.documentElement.classList.add('modal-open');
//     }

//     return () => {
//       document.body.style.overflow = "";
//       document.body.style.position = "";
//       document.body.style.width = "";
//       document.body.style.height = "";
//       document.body.style.paddingRight = "";
//       document.documentElement.classList.remove('modal-open');
//     };
//   }, [isOpen]);

//   // Reset states when project changes
//   useEffect(() => {
//     if (project) {
//       setCurrentImageIndex(0);
//       setActiveTab("overview");
//       setIsLoading(true);
//       setShowGallery(false);
//       setIsFullscreen(false);

//       // Preload images
//       if (project.gallery && project.gallery.length > 0) {
//         project.gallery.forEach(src => {
//           const img = new window.Image();
//           img.src = src;
//         });
//       }
//     }
//   }, [project]);

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isOpen || !project) return;

//       switch (e.key) {
//         case "Escape":
//           if (isFullscreen) {
//             setIsFullscreen(false);
//           } else {
//             onClose();
//           }
//           break;
//         case "ArrowLeft":
//           prevImage();
//           break;
//         case "ArrowRight":
//           nextImage();
//           break;
//         case " ":
//           e.preventDefault();
//           if (hasGallery && project.gallery.length > 1) {
//             nextImage();
//           }
//           break;
//         case "f":
//           e.preventDefault();
//           if (hasGallery) {
//             setIsFullscreen(!isFullscreen);
//           }
//           break;
//         case "g":
//           e.preventDefault();
//           if (hasGallery && project.gallery.length > 1) {
//             setShowGallery(!showGallery);
//           }
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isOpen, project, onClose, isFullscreen, showGallery]);

//   // Handle touch gestures for image swiping
//   const handleTouchStart = (e) => {
//     setTouchStart(e.touches[0].clientX);
//     setIsScrolling(false);
//   };

//   const handleTouchMove = (e) => {
//     if (touchStart === null) return;
//     const diff = touchStart - e.touches[0].clientX;
//     setIsScrolling(Math.abs(diff) < 10);
//   };

//   const handleTouchEnd = (e) => {
//     if (!touchStart || isScrolling) {
//       setTouchStart(null);
//       return;
//     }

//     const touchEnd = e.changedTouches[0].clientX;
//     const diff = touchStart - touchEnd;
//     const minSwipeDistance = isMobile ? 30 : 50;

//     if (Math.abs(diff) > minSwipeDistance) {
//       if (diff > 0) {
//         nextImage();
//       } else {
//         prevImage();
//       }
//     }

//     setTouchStart(null);
//   };

//   // Smooth image transitions with parallax effect
//   const nextImage = useCallback(() => {
//     if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;

//     setIsAnimating(true);
//     setCurrentImageIndex((prev) => {
//       const nextIndex = (prev + 1) % project.gallery.length;
//       return nextIndex;
//     });

//     setTimeout(() => setIsAnimating(false), 400);
//   }, [project, isAnimating]);

//   const prevImage = useCallback(() => {
//     if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;

//     setIsAnimating(true);
//     setCurrentImageIndex((prev) => {
//       const nextIndex = prev === 0 ? project.gallery.length - 1 : prev - 1;
//       return nextIndex;
//     });

//     setTimeout(() => setIsAnimating(false), 400);
//   }, [project, isAnimating]);

//   // Click outside to close
//   const handleBackdropClick = useCallback((e) => {
//     if (isFullscreen) {
//       setIsFullscreen(false);
//       return;
//     }

//     if (modalRef.current && !modalRef.current.contains(e.target)) {
//       onClose();
//     }
//   }, [onClose, isFullscreen]);

//   // Handle scroll for parallax effect
//   const handleScroll = useCallback(() => {
//     if (contentRef.current && !isMobile) {
//       const scrolled = contentRef.current.scrollTop;
//       const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
//       const progress = scrolled / maxScroll;

//       if (imageContainerRef.current) {
//         imageContainerRef.current.style.transform = `translateY(${progress * 20}px)`;
//         imageContainerRef.current.style.opacity = `${1 - progress * 0.3}`;
//       }
//     }
//   }, [isMobile]);

//   useEffect(() => {
//     const content = contentRef.current;
//     if (content) {
//       content.addEventListener('scroll', handleScroll);
//       return () => content.removeEventListener('scroll', handleScroll);
//     }
//   }, [handleScroll]);

//   if (!project) return null;

//   const tabs = [
//     {
//       id: "overview",
//       label: "Overview",
//       icon: "Eye",
//       color: "from-blue-500 via-blue-400 to-blue-300",
//       gradient: "bg-gradient-to-r from-blue-500/20 via-blue-400/20 to-blue-300/20"
//     },
//     {
//       id: "technical",
//       label: "Technical",
//       icon: "Cpu",
//       color: "from-purple-500 via-purple-400 to-purple-300",
//       gradient: "bg-gradient-to-r from-purple-500/20 via-purple-400/20 to-purple-300/20"
//     },
//     {
//       id: "features",
//       label: "Features",
//       icon: "Layers",
//       color: "from-emerald-500 via-emerald-400 to-emerald-300",
//       gradient: "bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-300/20"
//     },
//     {
//       id: "impact",
//       label: "Impact",
//       icon: "TrendingUp",
//       color: "from-amber-500 via-amber-400 to-amber-300",
//       gradient: "bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-300/20"
//     },
//   ];

//   const hasGallery = project?.gallery && project.gallery.length > 0;
//   const currentImage = hasGallery
//     ? project.gallery[currentImageIndex]
//     : project?.image;

//   const handleImageLoad = () => {
//     setIsLoading(false);
//   };

//   const getProgressPercentage = () => {
//     if (!hasGallery || project.gallery.length === 0) return 0;
//     return ((currentImageIndex + 1) / project.gallery.length) * 100;
//   };

//   // Animation variants
//   const modalVariants = {
//     hidden: {
//       opacity: 0,
//       scale: 0.95,
//       y: isMobile ? 50 : 0,
//       rotateX: 10
//     },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       rotateX: 0,
//       transition: {
//         type: "spring",
//         damping: 25,
//         stiffness: 400,
//         mass: 0.8
//       }
//     },
//     exit: {
//       opacity: 0,
//       scale: 0.95,
//       y: isMobile ? 50 : 0,
//       rotateX: 10,
//       transition: { duration: 0.2 }
//     }
//   };

//   const backdropVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut"
//       }
//     },
//     exit: {
//       opacity: 0,
//       transition: {
//         duration: 0.3,
//         ease: "easeIn"
//       }
//     }
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {isOpen && (
//         <>
//           {/* Premium Backdrop with gradient animation */}
//           <motion.div
//             variants={backdropVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 z-50"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
//             <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
//             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
//             <div
//               className="absolute inset-0 backdrop-blur-xl"
//               onClick={handleBackdropClick}
//             />
//           </motion.div>

//           {/* Modal Container */}
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="min-h-full flex items-start sm:items-center justify-center p-0 sm:p-2 md:p-4">
//               <motion.div
//                 ref={modalRef}
//                 variants={modalVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="relative w-full h-screen sm:h-auto sm:max-h-[95vh] sm:max-w-7xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-none sm:rounded-3xl shadow-2xl shadow-black/30 overflow-hidden border-0 sm:border border-white/10 dark:border-gray-700/30"
//                 style={{
//                   boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
//                 }}
//               >
//                 {/* Header with glass morphism effect */}
//                 <div className="sticky top-0 z-50 bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 px-4 py-3 sm:px-8 sm:py-5">
//                   <div className="flex items-center justify-between gap-2 sm:gap-4">
//                     <div className="flex items-center gap-3 sm:gap-4 min-w-0">
//                       {/* Animated Project Icon */}
//                       <motion.div
//                         className="relative flex-shrink-0"
//                         animate={{
//                           rotate: [0, 5, -5, 0],
//                           scale: [1, 1.05, 1]
//                         }}
//                         transition={{
//                           duration: 2,
//                           repeat: Infinity,
//                           repeatDelay: 5
//                         }}
//                       >
//                         <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
//                           <Icon name="FolderKanban" size={isMobile ? 18 : 22} className="text-white" />
//                           {/* Pulsing glow effect */}
//                           <motion.div
//                             className="absolute inset-0 rounded-xl sm:rounded-2xl bg-blue-500/30"
//                             animate={{ scale: [1, 1.3, 1] }}
//                             transition={{
//                               duration: 2,
//                               repeat: Infinity,
//                               ease: "easeInOut"
//                             }}
//                           />
//                         </div>
//                         {/* Floating particles */}
//                         <motion.div
//                           className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-400 to-blue-300 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/50"
//                           animate={{
//                             y: [0, -4, 0],
//                             rotate: [0, 360]
//                           }}
//                           transition={{
//                             y: {
//                               duration: 1.5,
//                               repeat: Infinity,
//                               ease: "easeInOut"
//                             },
//                             rotate: {
//                               duration: 3,
//                               repeat: Infinity,
//                               ease: "linear"
//                             }
//                           }}
//                         >
//                           <Icon name="Sparkles" size={isMobile ? 8 : 10} className="text-white" />
//                         </motion.div>
//                       </motion.div>

//                       {/* Project Title with typewriter effect */}
//                       <div className="flex-1 min-w-0">
//                         <motion.h2
//                           initial={{ opacity: 0, x: -20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: 0.2 }}
//                           className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent truncate"
//                         >
//                           {project?.title}
//                         </motion.h2>
//                         <motion.div
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ delay: 0.3 }}
//                           className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5"
//                         >
//                           <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
//                             {project?.category}
//                           </span>
//                           {project?.complexity && (
//                             <>
//                               <span className="text-gray-400 hidden sm:inline">•</span>
//                               <motion.span
//                                 initial={{ scale: 0.8 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ type: "spring", delay: 0.4 }}
//                                 className={`text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm ${project.complexity === "Advanced"
//                                     ? "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50"
//                                     : project.complexity === "Intermediate"
//                                       ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50"
//                                       : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50"
//                                   }`}
//                               >
//                                 {project.complexity}
//                               </motion.span>
//                             </>
//                           )}
//                         </motion.div>
//                       </div>
//                     </div>

//                     {/* Close Button with hover animation */}
//                     <motion.button
//                       initial={{ opacity: 0, rotate: -90 }}
//                       animate={{ opacity: 1, rotate: 0 }}
//                       transition={{ delay: 0.3, type: "spring" }}
//                       whileHover={{ scale: 1.1, rotate: 90 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={onClose}
//                       className="group relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 backdrop-blur-sm flex-shrink-0"
//                       aria-label="Close"
//                     >
//                       <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
//                       <Icon
//                         name="X"
//                         size={isMobile ? 18 : 20}
//                         className="relative text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
//                       />
//                     </motion.button>
//                   </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] sm:h-auto">
//                   {/* Left Column - Gallery with floating effect */}
//                   <motion.div
//                     ref={imageContainerRef}
//                     className={`lg:w-1/2 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200/20 dark:border-gray-700/20 ${showGallery ? 'lg:flex lg:flex-col' : ''}`}
//                     animate={isFullscreen ? {
//                       position: 'fixed',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       width: '100vw',
//                       height: '100vh',
//                       zIndex: 60,
//                       padding: 0,
//                       borderRadius: 0
//                     } : {}}
//                     transition={{ type: "spring", damping: 25 }}
//                   >
//                     <div className={`space-y-4 sm:space-y-6 ${showGallery ? 'flex-1 flex flex-col' : ''}`}>
//                       {/* Fullscreen Controls */}
//                       {hasGallery && (
//                         <div className="flex items-center justify-between mb-2">
//                           <div className="text-xs text-gray-500 dark:text-gray-400">
//                             Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">F</kbd> for fullscreen
//                           </div>
//                           {hasGallery && project.gallery.length > 1 && (
//                             <Button
//                               variant="ghost"
//                               size="xs"
//                               iconName={showGallery ? "X" : "Grid3x3"}
//                               onClick={() => setShowGallery(!showGallery)}
//                               className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                             >
//                               {showGallery ? "Close Gallery" : "View Grid"}
//                             </Button>
//                           )}
//                         </div>
//                       )}

//                       {/* Image Gallery */}
//                       {showGallery ? (
//                         // Grid Gallery View
//                         <div className="flex-1 overflow-y-auto">
//                           <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 auto-rows-max">
//                             {project.gallery.map((img, index) => (
//                               <motion.button
//                                 key={index}
//                                 layoutId={`gallery-image-${index}`}
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: index * 0.05 }}
//                                 whileHover={{ scale: 1.02, zIndex: 10 }}
//                                 whileTap={{ scale: 0.98 }}
//                                 onClick={() => {
//                                   setCurrentImageIndex(index);
//                                   setShowGallery(false);
//                                 }}
//                                 className={`relative aspect-square rounded-lg sm:rounded-xl overflow-hidden group ${currentImageIndex === index
//                                     ? "ring-2 sm:ring-3 ring-blue-500"
//                                     : "ring-1 ring-gray-200 dark:ring-gray-700"
//                                   }`}
//                               >
//                                 <Image
//                                   src={img}
//                                   alt={`Gallery image ${index + 1}`}
//                                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                                 />
//                                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                                 <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
//                                   View
//                                 </div>
//                               </motion.button>
//                             ))}
//                           </div>
//                         </div>
//                       ) : (
//                         // Single Image View
//                         <div
//                           ref={imageContainerRef}
//                           className="relative rounded-xl sm:rounded-2xl xl:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100/50 via-gray-200/30 to-gray-100/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 shadow-2xl shadow-black/10"
//                           onTouchStart={handleTouchStart}
//                           onTouchMove={handleTouchMove}
//                           onTouchEnd={handleTouchEnd}
//                         >
//                           {/* Loading Animation */}
//                           {isLoading && (
//                             <div className="absolute inset-0 flex items-center justify-center">
//                               <div className="relative">
//                                 <div className="w-14 h-14 sm:w-20 sm:h-20 border-4 border-blue-500/20 border-t-blue-500 border-r-blue-400 rounded-full animate-spin"></div>
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                   <motion.div
//                                     animate={{ rotate: 360 }}
//                                     transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//                                   >
//                                     <Icon name="Loader" size={isMobile ? 24 : 32} className="text-blue-500" />
//                                   </motion.div>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {/* Main Image with parallax */}
//                           <motion.div
//                             key={currentImageIndex}
//                             initial={{ opacity: 0, scale: 1.1 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             exit={{ opacity: 0, scale: 0.9 }}
//                             transition={{
//                               duration: 0.5,
//                               ease: "easeOut"
//                             }}
//                             className="relative"
//                           >
//                             <Image
//                               src={currentImage}
//                               alt={`${project?.title} - Image ${currentImageIndex + 1}`}
//                               className={`w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-all duration-700 ${isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
//                                 }`}
//                               style={{
//                                 transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
//                                 filter: isAnimating ? 'brightness(1.1)' : 'brightness(1)'
//                               }}
//                               onLoad={handleImageLoad}
//                             />

//                             {/* Animated Gradient Overlay */}
//                             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
//                             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />

//                             {/* Floating Particles */}
//                             <div className="absolute inset-0 overflow-hidden">
//                               {[...Array(5)].map((_, i) => (
//                                 <motion.div
//                                   key={i}
//                                   className="absolute w-1 h-1 bg-white/30 rounded-full"
//                                   initial={{
//                                     x: Math.random() * 100 + '%',
//                                     y: Math.random() * 100 + '%',
//                                     opacity: 0
//                                   }}
//                                   animate={{
//                                     y: [null, '-100px'],
//                                     opacity: [0, 1, 0]
//                                   }}
//                                   transition={{
//                                     duration: Math.random() * 3 + 2,
//                                     repeat: Infinity,
//                                     delay: Math.random() * 2
//                                   }}
//                                 />
//                               ))}
//                             </div>
//                           </motion.div>

//                           {/* Gallery Navigation */}
//                           {hasGallery && project.gallery.length > 1 && (
//                             <>
//                               {/* Navigation Arrows with glow */}
//                               <motion.button
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.5 }}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={prevImage}
//                                 className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 group"
//                                 aria-label="Previous image"
//                               >
//                                 <div className="relative">
//                                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-md group-hover:blur-lg transition-all"></div>
//                                   <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all group-hover:bg-black/80">
//                                     <Icon
//                                       name="ChevronLeft"
//                                       size={isMobile ? 18 : 24}
//                                       className="text-white group-hover:text-blue-300 transition-colors"
//                                     />
//                                   </div>
//                                 </div>
//                               </motion.button>

//                               <motion.button
//                                 initial={{ opacity: 0, x: 20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: 0.5 }}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={nextImage}
//                                 className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 group"
//                                 aria-label="Next image"
//                               >
//                                 <div className="relative">
//                                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md group-hover:blur-lg transition-all"></div>
//                                   <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all group-hover:bg-black/80">
//                                     <Icon
//                                       name="ChevronRight"
//                                       size={isMobile ? 18 : 24}
//                                       className="text-white group-hover:text-blue-300 transition-colors"
//                                     />
//                                   </div>
//                                 </div>
//                               </motion.button>

//                               {/* Progress Indicator */}
//                               <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gray-800/30 backdrop-blur-sm">
//                                 <motion.div
//                                   className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
//                                   initial={{ width: "0%" }}
//                                   animate={{ width: `${getProgressPercentage()}%` }}
//                                   transition={{
//                                     duration: 0.8,
//                                     ease: "easeInOut"
//                                   }}
//                                   style={{
//                                     backgroundSize: '200% 100%',
//                                     backgroundPosition: '100% 0',
//                                     animation: 'gradientFlow 2s ease infinite'
//                                   }}
//                                 />
//                               </div>

//                               {/* Image Counter with animation */}
//                               <motion.div
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.6 }}
//                                 className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-2 border border-white/10"
//                               >
//                                 <motion.div
//                                   animate={{ rotate: [0, 360] }}
//                                   transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                                 >
//                                   <Icon name="Image" size={isMobile ? 12 : 16} className="text-blue-300" />
//                                 </motion.div>
//                                 <span className="font-semibold">
//                                   {currentImageIndex + 1} / {project.gallery.length}
//                                 </span>
//                               </motion.div>

//                               {/* Fullscreen Button */}
//                               <motion.button
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 transition={{ delay: 0.7 }}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => setIsFullscreen(!isFullscreen)}
//                                 className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-lg border border-white/10 hover:bg-black/70 transition-colors"
//                                 aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
//                               >
//                                 <Icon
//                                   name={isFullscreen ? "Minimize2" : "Maximize2"}
//                                   size={isMobile ? 16 : 20}
//                                 />
//                               </motion.button>
//                             </>
//                           )}
//                         </div>
//                       )}

//                       {/* Thumbnail Rail */}
//                       {hasGallery && project.gallery.length > 1 && !showGallery && (
//                         <div className="space-y-2 sm:space-y-3">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <Icon name="GalleryVertical" size={16} className="text-gray-500" />
//                               <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 Scroll Gallery
//                               </span>
//                             </div>
//                             <span className="text-xs text-gray-500 dark:text-gray-400">
//                               {project.gallery.length} images
//                             </span>
//                           </div>
//                           <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pb-2">
//                             {project.gallery.map((img, index) => (
//                               <motion.button
//                                 key={index}
//                                 whileHover={{ scale: 1.05, y: -2 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => setCurrentImageIndex(index)}
//                                 className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${currentImageIndex === index
//                                     ? "ring-2 sm:ring-3 ring-blue-500 shadow-lg shadow-blue-500/30 scale-105"
//                                     : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600 opacity-80 hover:opacity-100"
//                                   }`}
//                               >
//                                 <Image
//                                   src={img}
//                                   alt={`Thumbnail ${index + 1}`}
//                                   className="w-full h-full object-cover"
//                                 />
//                                 {currentImageIndex === index && (
//                                   <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px]" />
//                                 )}
//                                 <div className={`absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300 ${currentImageIndex === index
//                                     ? 'bg-gradient-to-r from-blue-500 to-purple-500'
//                                     : 'bg-transparent'
//                                   }`} />
//                               </motion.button>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Quick Stats with animated counters */}
//                       <div className="grid grid-cols-3 gap-2 sm:gap-3">
//                         {project?.duration && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.8 }}
//                             className="group p-2 sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-blue-500/20 dark:hover:border-blue-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
//                           >
//                             <div className="flex items-center gap-1 sm:gap-2">
//                               <motion.div
//                                 animate={{ rotate: [0, 360] }}
//                                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                               >
//                                 <Icon name="Calendar" size={isMobile ? 14 : 18} className="text-blue-500 group-hover:scale-110 transition-transform" />
//                               </motion.div>
//                               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Duration</span>
//                             </div>
//                             <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
//                               {project.duration}
//                             </p>
//                           </motion.div>
//                         )}
//                         {project?.teamSize && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.9 }}
//                             className="group p-2 sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
//                           >
//                             <div className="flex items-center gap-1 sm:gap-2">
//                               <motion.div
//                                 animate={{ scale: [1, 1.1, 1] }}
//                                 transition={{ duration: 2, repeat: Infinity }}
//                               >
//                                 <Icon name="Users" size={isMobile ? 14 : 18} className="text-emerald-500 group-hover:scale-110 transition-transform" />
//                               </motion.div>
//                               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Team</span>
//                             </div>
//                             <p className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
//                               {project.teamSize} member{project.teamSize !== "1" ? "s" : ""}
//                             </p>
//                           </motion.div>
//                         )}
//                         {project?.rating && (
//                           <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 1 }}
//                             className="group p-2 sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-amber-500/20 dark:hover:border-amber-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
//                           >
//                             <div className="flex items-center gap-1 sm:gap-2">
//                               <motion.div
//                                 animate={{ rotate: [0, 180, 0] }}
//                                 transition={{ duration: 3, repeat: Infinity }}
//                               >
//                                 <Icon name="Star" size={isMobile ? 14 : 18} className="text-amber-500 group-hover:scale-110 transition-transform" />
//                               </motion.div>
//                               <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Rating</span>
//                             </div>
//                             <div className="flex items-center gap-1 mt-0.5 sm:mt-1">
//                               <p className="text-sm font-bold bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent">
//                                 {project.rating}/5
//                               </p>
//                               <div className="flex ml-1">
//                                 {[...Array(5)].map((_, i) => (
//                                   <Icon
//                                     key={i}
//                                     name="Star"
//                                     size={10}
//                                     className={i < project.rating ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}
//                                   />
//                                 ))}
//                               </div>
//                             </div>
//                           </motion.div>
//                         )}
//                       </div>

//                       {/* Action Buttons with animated hover */}
//                       <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 1.1 }}
//                         className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3"
//                       >
//                         {project?.liveUrl && (
//                           <Button
//                             variant="default"
//                             size={isMobile ? "md" : "lg"}
//                             iconName="ExternalLink"
//                             iconPosition="left"
//                             className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 w-full overflow-hidden"
//                             onClick={() => window.open(project.liveUrl, "_blank")}
//                           >
//                             {/* Animated background */}
//                             <motion.div
//                               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                               animate={{
//                                 x: ["-100%", "100%"]
//                               }}
//                               transition={{
//                                 duration: 1.5,
//                                 repeat: Infinity,
//                                 ease: "linear"
//                               }}
//                             />
//                             <span className="relative font-semibold truncate">Live Demo</span>
//                             <motion.div
//                               animate={{ x: [0, 4, 0] }}
//                               transition={{ duration: 1, repeat: Infinity }}
//                               className="relative ml-2"
//                             >
//                               <Icon name="ArrowUpRight" size={isMobile ? 16 : 18} />
//                             </motion.div>
//                           </Button>
//                         )}
//                         {project?.githubUrl && (
//                           <Button
//                             variant="outline"
//                             size={isMobile ? "md" : "lg"}
//                             iconName="Github"
//                             iconPosition="left"
//                             className="group relative border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-lg w-full overflow-hidden"
//                             onClick={() => window.open(project.githubUrl, "_blank")}
//                           >
//                             <span className="relative font-semibold truncate">Source Code</span>
//                             <motion.div
//                               animate={{ rotate: [0, 360] }}
//                               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                               className="relative ml-2"
//                             >
//                               <Icon name="Github" size={isMobile ? 16 : 18} />
//                             </motion.div>
//                           </Button>
//                         )}
//                       </motion.div>
//                     </div>
//                   </motion.div>

//                   {/* Right Column - Content */}
//                   <div className="lg:w-1/2 flex flex-col">
//                     {/* Tabs Navigation with animated indicators */}
//                     <div className="sticky top-0 z-20 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30">
//                       <div className="flex overflow-x-auto scrollbar-hide">
//                         {tabs.map((tab) => (
//                           <motion.button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`group relative flex-1 min-w-0 flex flex-col items-center px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 ${activeTab === tab.id
//                                 ? "text-gray-900 dark:text-white"
//                                 : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
//                               }`}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                           >
//                             {/* Background gradient on active */}
//                             {activeTab === tab.id && (
//                               <motion.div
//                                 layoutId="activeTab"
//                                 className={`absolute inset-0 ${tab.gradient}`}
//                                 transition={{ type: "spring", bounce: 0.2 }}
//                               />
//                             )}

//                             <div className="relative flex items-center gap-1.5 sm:gap-2 z-10">
//                               <motion.div
//                                 animate={activeTab === tab.id ? {
//                                   scale: [1, 1.2, 1],
//                                   rotate: [0, 5, -5, 0]
//                                 } : {}}
//                                 transition={{ duration: 0.5 }}
//                               >
//                                 <Icon
//                                   name={tab.icon}
//                                   size={isMobile ? 16 : 20}
//                                   className={activeTab === tab.id ? `bg-gradient-to-r ${tab.color} bg-clip-text text-transparent` : ''}
//                                 />
//                               </motion.div>
//                               <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${activeTab === tab.id ? 'bg-gradient-to-r ' + tab.color + ' bg-clip-text text-transparent' : ''
//                                 }`}>
//                                 {isMobile ? tab.label.substring(0, 3) : tab.label}
//                               </span>
//                             </div>

//                             {/* Animated underline */}
//                             <div className="relative mt-1.5 sm:mt-2 h-0.5 w-4 sm:w-8 rounded-full overflow-hidden">
//                               <motion.div
//                                 className={`h-full bg-gradient-to-r ${tab.color}`}
//                                 initial={false}
//                                 animate={{
//                                   width: activeTab === tab.id ? "100%" : "0%",
//                                   opacity: activeTab === tab.id ? 1 : 0
//                                 }}
//                                 transition={{ duration: 0.3 }}
//                               />
//                             </div>
//                           </motion.button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Tab Content */}
//                     <div
//                       ref={contentRef}
//                       className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-h-[calc(100vh-300px)] sm:max-h-[calc(95vh-200px)] lg:max-h-[calc(100vh-200px)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
//                     >
//                       <AnimatePresence mode="wait">
//                         <motion.div
//                           key={activeTab}
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           exit={{ opacity: 0, x: -20 }}
//                           transition={{
//                             duration: 0.3,
//                             ease: "easeInOut"
//                           }}
//                           className="space-y-6 sm:space-y-8"
//                         >
//                           {/* Overview Tab */}
//                           {activeTab === "overview" && (
//                             <>
//                               <div className="space-y-4">
//                                 <motion.h3
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.1 }}
//                                   className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
//                                 >
//                                   Project Overview
//                                 </motion.h3>
//                                 <motion.div
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   transition={{ delay: 0.2 }}
//                                   className="prose prose-sm dark:prose-invert max-w-none"
//                                 >
//                                   <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
//                                     {project?.fullDescription}
//                                   </p>
//                                 </motion.div>
//                               </div>

//                               {project?.impact && (
//                                 <motion.div
//                                   initial={{ opacity: 0, y: 20 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.3 }}
//                                   className="p-4 sm:p-5 bg-gradient-to-br from-blue-50/50 to-white/50 dark:from-blue-900/20 dark:to-gray-900/20 rounded-xl sm:rounded-2xl border border-blue-100/50 dark:border-blue-800/20 backdrop-blur-sm"
//                                 >
//                                   <div className="flex items-start gap-3">
//                                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center flex-shrink-0">
//                                       <Icon name="Target" size={20} className="text-white" />
//                                     </div>
//                                     <div>
//                                       <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
//                                         Project Impact
//                                       </h4>
//                                       <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
//                                         {project.impact}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </>
//                           )}

//                           {/* Technical Tab */}
//                           {activeTab === "technical" && (
//                             <>
//                               <div className="space-y-4">
//                                 <motion.h3
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.1 }}
//                                   className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent"
//                                 >
//                                   Technology Stack
//                                 </motion.h3>
//                                 <motion.p
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   transition={{ delay: 0.2 }}
//                                   className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
//                                 >
//                                   Built using modern technologies and frameworks
//                                 </motion.p>
//                               </div>

//                               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
//                                 {project?.technologies?.map((tech, index) => (
//                                   <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, scale: 0.8, y: 20 }}
//                                     animate={{ opacity: 1, scale: 1, y: 0 }}
//                                     transition={{
//                                       delay: index * 0.05,
//                                       type: "spring",
//                                       stiffness: 200
//                                     }}
//                                     whileHover={{
//                                       scale: 1.05,
//                                       y: -5,
//                                       transition: { type: "spring", stiffness: 400 }
//                                     }}
//                                     className="group"
//                                   >
//                                     <div className="p-3 sm:p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 group-hover:border-purple-200 dark:group-hover:border-purple-700/50 shadow-sm group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300">
//                                       <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
//                                         <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                                           <motion.div
//                                             animate={{ rotate: [0, 360] }}
//                                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                                           >
//                                             <Icon name="Code" size={isMobile ? 18 : 22} className="text-purple-600 dark:text-purple-400" />
//                                           </motion.div>
//                                         </div>
//                                         <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate w-full">
//                                           {tech}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </motion.div>
//                                 ))}
//                               </div>

//                               {project?.challenges && project.challenges.length > 0 && (
//                                 <motion.div
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   transition={{ delay: 0.5 }}
//                                   className="mt-6 space-y-4"
//                                 >
//                                   <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
//                                     Technical Challenges
//                                   </h4>
//                                   <div className="space-y-3">
//                                     {project.challenges.map((challenge, index) => (
//                                       <motion.div
//                                         key={index}
//                                         initial={{ opacity: 0, x: -20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         transition={{ delay: 0.6 + index * 0.1 }}
//                                         className="p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
//                                       >
//                                         <div className="flex items-start gap-3">
//                                           <div className="flex-shrink-0">
//                                             <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-gray-900 flex items-center justify-center">
//                                               <Icon name="AlertCircle" size={16} className="text-amber-600 dark:text-amber-400" />
//                                             </div>
//                                           </div>
//                                           <div className="flex-1">
//                                             <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">
//                                               <span className="font-semibold text-gray-900 dark:text-white">Challenge: </span>
//                                               {challenge.problem}
//                                             </p>
//                                             <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
//                                               <span className="font-semibold text-gray-900 dark:text-white">Solution: </span>
//                                               {challenge.solution}
//                                             </p>
//                                           </div>
//                                         </div>
//                                       </motion.div>
//                                     ))}
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </>
//                           )}

//                           {/* Features Tab */}
//                           {activeTab === "features" && project?.features && (
//                             <>
//                               <div className="space-y-4">
//                                 <motion.h3
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.1 }}
//                                   className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent"
//                                 >
//                                   Key Features
//                                 </motion.h3>
//                                 <motion.p
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   transition={{ delay: 0.2 }}
//                                   className="text-sm sm:text-base text-gray-600 dark:text-gray-300"
//                                 >
//                                   Core functionalities and capabilities
//                                 </motion.p>
//                               </div>

//                               <div className="grid grid-cols-1 gap-3 sm:gap-4">
//                                 {project.features.map((feature, index) => (
//                                   <motion.div
//                                     key={index}
//                                     initial={{ opacity: 0, y: 20 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     transition={{
//                                       delay: 0.3 + index * 0.1,
//                                       type: "spring",
//                                       stiffness: 100
//                                     }}
//                                     whileHover={{ x: 5 }}
//                                     className="group"
//                                   >
//                                     <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50/50 to-white/50 dark:from-emerald-900/10 dark:to-gray-900/10 rounded-xl sm:rounded-2xl border border-emerald-100/50 dark:border-emerald-800/20 hover:border-emerald-200 dark:hover:border-emerald-700/30 transition-colors backdrop-blur-sm">
//                                       <div className="flex items-start gap-3 sm:gap-4">
//                                         <motion.div
//                                           className="flex-shrink-0"
//                                           animate={{
//                                             rotate: [0, 10, -10, 0],
//                                             scale: [1, 1.1, 1]
//                                           }}
//                                           transition={{
//                                             duration: 2,
//                                             repeat: Infinity,
//                                             repeatDelay: 2
//                                           }}
//                                         >
//                                           <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
//                                             <Icon name="CheckCircle" size={20} className="text-white" />
//                                           </div>
//                                         </motion.div>
//                                         <div className="flex-1">
//                                           <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
//                                             {feature}
//                                           </p>
//                                         </div>
//                                         <motion.div
//                                           initial={{ opacity: 0, x: -10 }}
//                                           animate={{ opacity: 1, x: 0 }}
//                                           transition={{ delay: 0.5 + index * 0.1 }}
//                                           className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
//                                         >
//                                           <Icon name="ArrowRight" size={20} className="text-emerald-500" />
//                                         </motion.div>
//                                       </div>
//                                     </div>
//                                   </motion.div>
//                                 ))}
//                               </div>
//                             </>
//                           )}

//                           {/* Impact Tab */}
//                           {activeTab === "impact" && (
//                             <>
//                               <div className="space-y-4">
//                                 <motion.h3
//                                   initial={{ opacity: 0, y: 10 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.1 }}
//                                   className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent"
//                                 >
//                                   Impact & Results
//                                 </motion.h3>
//                               </div>

//                               {project?.metrics && project.metrics.length > 0 && (
//                                 <motion.div
//                                   initial={{ opacity: 0 }}
//                                   animate={{ opacity: 1 }}
//                                   transition={{ delay: 0.2 }}
//                                   className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
//                                 >
//                                   {project.metrics.map((metric, index) => (
//                                     <motion.div
//                                       key={index}
//                                       initial={{ opacity: 0, scale: 0.8 }}
//                                       animate={{ opacity: 1, scale: 1 }}
//                                       transition={{
//                                         delay: 0.3 + index * 0.1,
//                                         type: "spring",
//                                         stiffness: 200
//                                       }}
//                                       whileHover={{ scale: 1.05 }}
//                                       className="p-4 sm:p-5 bg-gradient-to-br from-amber-50/50 to-white/50 dark:from-amber-900/10 dark:to-gray-900/10 rounded-xl sm:rounded-2xl border border-amber-100/50 dark:border-amber-800/20 text-center backdrop-blur-sm"
//                                     >
//                                       <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-2">
//                                         {metric.value}
//                                       </div>
//                                       <div className="flex items-center justify-center gap-2">
//                                         <Icon name={metric.icon} size={16} className="text-amber-500" />
//                                         <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
//                                           {metric.label}
//                                         </div>
//                                       </div>
//                                     </motion.div>
//                                   ))}
//                                 </motion.div>
//                               )}

//                               {project?.testimonial && (
//                                 <motion.div
//                                   initial={{ opacity: 0, y: 20 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.6 }}
//                                   className="mt-6"
//                                 >
//                                   <div className="p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg relative overflow-hidden"
//                                   >
//                                     {/* Quote marks */}
//                                     <div className="absolute top-4 left-4 text-5xl text-blue-500/10 font-serif">"</div>
//                                     <div className="absolute bottom-4 right-4 text-5xl text-blue-500/10 font-serif">"</div>

//                                     <div className="relative z-10">
//                                       <p className="text-base sm:text-lg italic text-gray-700 dark:text-gray-300 mb-4">
//                                         "{project.testimonial.content}"
//                                       </p>
//                                       <div className="flex items-center gap-3">
//                                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
//                                           <Icon name="User" size={20} className="text-white" />
//                                         </div>
//                                         <div>
//                                           <p className="font-semibold text-gray-900 dark:text-white">
//                                             {project.testimonial.author}
//                                           </p>
//                                           <p className="text-sm text-gray-600 dark:text-gray-400">
//                                             {project.testimonial.role}
//                                           </p>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </motion.div>
//                               )}

//                               {project?.learnings && (
//                                 <motion.div
//                                   initial={{ opacity: 0, y: 20 }}
//                                   animate={{ opacity: 1, y: 0 }}
//                                   transition={{ delay: 0.7 }}
//                                   className="mt-6 space-y-4"
//                                 >
//                                   <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
//                                     Key Learnings
//                                   </h4>
//                                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                     {project.learnings.map((learning, index) => (
//                                       <motion.div
//                                         key={index}
//                                         initial={{ opacity: 0, scale: 0.9 }}
//                                         animate={{ opacity: 1, scale: 1 }}
//                                         transition={{ delay: 0.8 + index * 0.1 }}
//                                         className="p-3 sm:p-4 bg-gradient-to-br from-blue-50/50 to-white/50 dark:from-blue-900/10 dark:to-gray-900/10 rounded-xl border border-blue-100/50 dark:border-blue-800/20"
//                                       >
//                                         <div className="flex items-start gap-2">
//                                           <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center flex-shrink-0 mt-0.5">
//                                             <Icon name="Lightbulb" size={12} className="text-white" />
//                                           </div>
//                                           <p className="text-sm text-gray-700 dark:text-gray-300">
//                                             {learning}
//                                           </p>
//                                         </div>
//                                       </motion.div>
//                                     ))}
//                                   </div>
//                                 </motion.div>
//                               )}
//                             </>
//                           )}
//                         </motion.div>
//                       </AnimatePresence>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Custom CSS for animations */}
//           <style jsx global>{`
//             @keyframes gradientFlow {
//               0% { background-position: 100% 0; }
//               50% { background-position: 0 0; }
//               100% { background-position: 100% 0; }
//             }
            
//             .modal-open {
//               overflow: hidden;
//             }
            
//             .scrollbar-thin::-webkit-scrollbar {
//               width: 4px;
//               height: 4px;
//             }
            
//             .scrollbar-thin::-webkit-scrollbar-track {
//               background: transparent;
//             }
            
//             .scrollbar-thin::-webkit-scrollbar-thumb {
//               background: #d1d5db;
//               border-radius: 4px;
//             }
            
//             .dark .scrollbar-thin::-webkit-scrollbar-thumb {
//               background: #4b5563;
//             }
            
//             .scrollbar-hide::-webkit-scrollbar {
//               display: none;
//             }
//           `}</style>
//         </>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ProjectModal;


import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showTechGlow, setShowTechGlow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const modalRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);
  const tabsRef = useRef([]);

  // Check for mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fix scroll locking issue - only hide overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Reset states when project changes
  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0);
      setActiveTab("overview");
      setIsLoading(true);
      setShowGallery(false);
      setIsFullscreen(false);
      setShowTechGlow(false);
      setScrollProgress(0);
    }
  }, [project]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen || !project) return;

      switch (e.key) {
        case "Escape":
          if (isFullscreen) {
            setIsFullscreen(false);
          } else {
            onClose();
          }
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "f":
          if (hasGallery) {
            toggleFullscreen();
          }
          break;
        case "g":
          if (hasGallery && project.gallery?.length > 1) {
            setShowGallery(!showGallery);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, project, onClose, isFullscreen, showGallery]);

  // Enhanced scroll tracking
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      const scrolled = contentRef.current.scrollTop;
      const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const progress = maxScroll > 0 ? scrolled / maxScroll : 0;
      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Smooth image transitions
  const nextImage = useCallback(() => {
    if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;

    setIsAnimating(true);
    setCurrentImageIndex((prev) => {
      const nextIndex = (prev + 1) % project.gallery.length;
      return nextIndex;
    });

    setTimeout(() => setIsAnimating(false), 400);
  }, [project, isAnimating]);

  const prevImage = useCallback(() => {
    if (!project?.gallery || project.gallery.length <= 1 || isAnimating) return;

    setIsAnimating(true);
    setCurrentImageIndex((prev) => {
      const nextIndex = prev === 0 ? project.gallery.length - 1 : prev - 1;
      return nextIndex;
    });

    setTimeout(() => setIsAnimating(false), 400);
  }, [project, isAnimating]);

  // Click outside to close
  const handleBackdropClick = useCallback((e) => {
    if (isFullscreen) {
      setIsFullscreen(false);
      return;
    }

    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose, isFullscreen]);

  // Tech glow effect
  useEffect(() => {
    if (activeTab === 'technical') {
      const timer = setTimeout(() => setShowTechGlow(true), 300);
      return () => {
        clearTimeout(timer);
        setShowTechGlow(false);
      };
    }
  }, [activeTab]);

  // Enhanced fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch(console.log);
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, [isFullscreen]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!project) return null;

  // Enhanced tabs data
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: "Eye",
      gradient: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
      glow: "rgba(59, 130, 246, 0.3)"
    },
    {
      id: "technical",
      label: "Technical",
      icon: "Cpu",
      gradient: "linear-gradient(135deg, #8b5cf6, #ec4899)",
      glow: "rgba(139, 92, 246, 0.4)"
    },
    {
      id: "features",
      label: "Features",
      icon: "Layers",
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
      glow: "rgba(16, 185, 129, 0.3)"
    },
    {
      id: "impact",
      label: "Impact",
      icon: "TrendingUp",
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
      glow: "rgba(245, 158, 11, 0.3)"
    },
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

  // Animation variants
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: isMobile ? 50 : 0,
      rotateX: 10
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
      y: isMobile ? 50 : 0,
      rotateX: 10,
      transition: { duration: 0.2 }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

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
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]"></div>
            <div
              className="absolute inset-0 backdrop-blur-xl"
              onClick={handleBackdropClick}
            />
          </motion.div>

          {/* Modal Container - Fixed height and overflow handling */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-full flex items-start sm:items-center justify-center p-0 sm:p-2 md:p-4">
              <motion.div
                ref={modalRef}
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative w-full h-screen sm:h-auto sm:max-h-[95vh] sm:max-w-7xl bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-none sm:rounded-3xl shadow-2xl shadow-black/30 overflow-hidden border-0 sm:border border-white/10 dark:border-gray-700/30"
                style={{
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                }}
              >
                {/* Header */}
                <div className="sticky top-0 z-50 bg-gradient-to-b from-white/90 via-white/80 to-white/70 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-900/70 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 px-4 py-3 sm:px-8 sm:py-5">
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      {/* Project Icon */}
                      <motion.div
                        className="relative flex-shrink-0"
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 5
                        }}
                      >
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 flex items-center justify-center shadow-lg shadow-blue-500/30">
                          <Icon name="FolderKanban" size={isMobile ? 18 : 22} className="text-white" />
                        </div>
                      </motion.div>

                      {/* Project Title */}
                      <div className="flex-1 min-w-0">
                        <motion.h2
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent truncate"
                        >
                          {project?.title}
                        </motion.h2>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex flex-wrap items-center gap-1 sm:gap-2 mt-0.5"
                        >
                          <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate">
                            {project?.category}
                          </span>
                          {project?.complexity && (
                            <>
                              <span className="text-gray-400 hidden sm:inline">•</span>
                              <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", delay: 0.4 }}
                                className={`text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full font-semibold shadow-lg backdrop-blur-sm ${project.complexity === "Advanced"
                                    ? "bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-700 dark:text-red-300 border border-red-200/50 dark:border-red-800/50"
                                    : project.complexity === "Intermediate"
                                      ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50"
                                      : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/50"
                                  }`}
                              >
                                {project.complexity}
                              </motion.span>
                            </>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Close Button */}
                    <motion.button
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={onClose}
                      className="group relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-lg sm:rounded-xl hover:bg-white/20 dark:hover:bg-gray-800/50 transition-all duration-200 backdrop-blur-sm flex-shrink-0"
                      aria-label="Close"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 dark:from-gray-800/50 dark:to-gray-700/50 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Icon
                        name="X"
                        size={isMobile ? 18 : 20}
                        className="relative text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Main Content with proper overflow handling */}
                <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] sm:h-auto">
                  {/* Left Column - Gallery */}
                  <div
                    ref={imageContainerRef}
                    className={`lg:w-1/2 p-4 sm:p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-200/20 dark:border-gray-700/20 ${showGallery ? 'lg:flex lg:flex-col' : ''}`}
                    style={{
                      transform: `translateY(${scrollProgress * 20}px)`,
                      opacity: 1 - scrollProgress * 0.2
                    }}
                  >
                    <div className={`space-y-4 sm:space-y-6 ${showGallery ? 'flex-1 flex flex-col' : ''}`}>
                      {/* Gallery Controls */}
                      {hasGallery && (
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-xs">F</kbd> for fullscreen
                          </div>
                          {hasGallery && project.gallery.length > 1 && (
                            <Button
                              variant="ghost"
                              size="xs"
                              iconName={showGallery ? "X" : "Grid3x3"}
                              onClick={() => setShowGallery(!showGallery)}
                              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                              {showGallery ? "Close Gallery" : "View Grid"}
                            </Button>
                          )}
                        </div>
                      )}

                      {/* Image Gallery */}
                      {showGallery ? (
                        // Grid Gallery View
                        <div ref={galleryRef} className="flex-1 overflow-y-auto">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 auto-rows-max">
                            {project.gallery.map((img, index) => (
                              <motion.button
                                key={index}
                                layoutId={`gallery-image-${index}`}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                  setCurrentImageIndex(index);
                                  setShowGallery(false);
                                }}
                                className={`relative aspect-square rounded-lg sm:rounded-xl overflow-hidden group ${currentImageIndex === index
                                    ? "ring-2 sm:ring-3 ring-blue-500"
                                    : "ring-1 ring-gray-200 dark:ring-gray-700"
                                  }`}
                              >
                                <Image
                                  src={img}
                                  alt={`Gallery image ${index + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                  View
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        // Single Image View
                        <div className="relative rounded-xl sm:rounded-2xl xl:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100/50 via-gray-200/30 to-gray-100/50 dark:from-gray-800/50 dark:via-gray-900/30 dark:to-gray-800/50 shadow-2xl shadow-black/10">
                          {/* Loading Animation */}
                          {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative">
                                <div className="w-14 h-14 sm:w-20 sm:h-20 border-4 border-blue-500/20 border-t-blue-500 border-r-blue-400 rounded-full animate-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  >
                                    <Icon name="Loader" size={isMobile ? 24 : 32} className="text-blue-500" />
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Main Image */}
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{
                              duration: 0.5,
                              ease: "easeOut"
                            }}
                            className="relative"
                          >
                            <Image
                              src={currentImage}
                              alt={`${project?.title} - Image ${currentImageIndex + 1}`}
                              className={`w-full h-48 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover transition-all duration-700 ${isLoading ? 'opacity-0 blur-sm' : 'opacity-100 blur-0'
                                }`}
                              onLoad={handleImageLoad}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
                          </motion.div>

                          {/* Gallery Navigation */}
                          {hasGallery && project.gallery.length > 1 && (
                            <>
                              {/* Navigation Arrows */}
                              <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={prevImage}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 group z-10"
                                aria-label="Previous image"
                              >
                                <div className="relative">
                                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all group-hover:bg-black/80">
                                    <Icon
                                      name="ChevronLeft"
                                      size={isMobile ? 18 : 24}
                                      className="text-white group-hover:text-blue-300 transition-colors"
                                    />
                                  </div>
                                </div>
                              </motion.button>

                              <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={nextImage}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 group z-10"
                                aria-label="Next image"
                              >
                                <div className="relative">
                                  <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/70 backdrop-blur-md rounded-full flex items-center justify-center transition-all group-hover:bg-black/80">
                                    <Icon
                                      name="ChevronRight"
                                      size={isMobile ? 18 : 24}
                                      className="text-white group-hover:text-blue-300 transition-colors"
                                    />
                                  </div>
                                </div>
                              </motion.button>

                              {/* Progress Indicator */}
                              <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-1.5 bg-gray-800/30 backdrop-blur-sm">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
                                  initial={{ width: "0%" }}
                                  animate={{ width: `${getProgressPercentage()}%` }}
                                  transition={{
                                    duration: 0.8,
                                    ease: "easeInOut"
                                  }}
                                />
                              </div>

                              {/* Image Counter */}
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg flex items-center gap-1 sm:gap-2 border border-white/10"
                              >
                                <motion.div
                                  animate={{ rotate: [0, 360] }}
                                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                >
                                  <Icon name="Image" size={isMobile ? 12 : 16} className="text-blue-300" />
                                </motion.div>
                                <span className="font-semibold">
                                  {currentImageIndex + 1} / {project.gallery.length}
                                </span>
                              </motion.div>

                              {/* Fullscreen Button */}
                              <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleFullscreen}
                                className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-lg border border-white/10 hover:bg-black/70 transition-colors"
                                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                              >
                                <Icon
                                  name={isFullscreen ? "Minimize2" : "Maximize2"}
                                  size={isMobile ? 16 : 20}
                                />
                              </motion.button>
                            </>
                          )}
                        </div>
                      )}

                      {/* Thumbnail Rail */}
                      {hasGallery && project.gallery.length > 1 && !showGallery && (
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon name="GalleryVertical" size={16} className="text-gray-500" />
                              <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                Scroll Gallery
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {project.gallery.length} images
                            </span>
                          </div>
                          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pb-2">
                            {project.gallery.map((img, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${currentImageIndex === index
                                    ? "ring-2 sm:ring-3 ring-blue-500 shadow-lg shadow-blue-500/30 scale-105"
                                    : "ring-1 ring-gray-200 dark:ring-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600 opacity-80 hover:opacity-100"
                                  }`}
                              >
                                <Image
                                  src={img}
                                  alt={`Thumbnail ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {currentImageIndex === index && (
                                  <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[1px]" />
                                )}
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-2 sm:gap-3">
                        {project?.duration && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="group p-2 sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-blue-500/20 dark:hover:border-blue-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                          >
                            <div className="flex items-center gap-1 sm:gap-2">
                              <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              >
                                <Icon name="Calendar" size={isMobile ? 14 : 18} className="text-blue-500" />
                              </motion.div>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Duration</span>
                            </div>
                            <p className="text-sm font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
                              {project.duration}
                            </p>
                          </motion.div>
                        )}
                        {project?.teamSize && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="group p-2 sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-emerald-500/20 dark:hover:border-emerald-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                          >
                            <div className="flex items-center gap-1 sm:gap-2">
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Icon name="Users" size={isMobile ? 14 : 18} className="text-emerald-500" />
                              </motion.div>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Team</span>
                            </div>
                            <p className="text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
                              {project.teamSize}
                            </p>
                          </motion.div>
                        )}
                        {project?.status && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="group p-2 sm:p-3 bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl sm:rounded-2xl border border-white/20 dark:border-gray-700/30 hover:border-amber-500/20 dark:hover:border-amber-500/20 backdrop-blur-sm hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300"
                          >
                            <div className="flex items-center gap-1 sm:gap-2">
                              <motion.div
                                animate={{ rotate: [0, 180, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              >
                                <Icon name="CheckCircle" size={isMobile ? 14 : 18} className="text-amber-500" />
                              </motion.div>
                              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Status</span>
                            </div>
                            <p className="text-sm font-bold bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent mt-0.5 sm:mt-1">
                              {project.status}
                            </p>
                          </motion.div>
                        )}
                      </div>

                      {/* Action Buttons - Fixed visibility */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                        className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3"
                      >
                        {project?.liveUrl && (
                          <Button
                            variant="default"
                            size={isMobile ? "md" : "lg"}
                            iconName="ExternalLink"
                            iconPosition="left"
                            className="group relative bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 w-full overflow-hidden"
                            onClick={() => window.open(project.liveUrl, "_blank")}
                          >
                            <span className="relative font-semibold truncate">Live Demo</span>
                            <motion.div
                              animate={{ x: [0, 4, 0] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="relative ml-2"
                            >
                              <Icon name="ArrowUpRight" size={isMobile ? 16 : 18} />
                            </motion.div>
                          </Button>
                        )}
                        {project?.githubUrl && (
                          <Button
                            variant="outline"
                            size={isMobile ? "md" : "lg"}
                            iconName="Github"
                            iconPosition="left"
                            className="group relative border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover:shadow-lg w-full overflow-hidden"
                            onClick={() => window.open(project.githubUrl, "_blank")}
                          >
                            <span className="relative font-semibold truncate">Source Code</span>
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              className="relative ml-2"
                            >
                              <Icon name="Github" size={isMobile ? 16 : 18} />
                            </motion.div>
                          </Button>
                        )}
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Column - Content with proper scrolling */}
                  <div className="lg:w-1/2 flex flex-col">
                    {/* Tabs Navigation */}
                    <div className="sticky top-0 z-20 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl border-b border-gray-200/30 dark:border-gray-700/30">
                      <div className="flex overflow-x-auto scrollbar-hide">
                        {tabs.map((tab, index) => (
                          <motion.button
                            key={tab.id}
                            ref={el => tabsRef.current[index] = el}
                            onClick={() => setActiveTab(tab.id)}
                            className={`group relative flex-1 min-w-0 flex flex-col items-center px-3 sm:px-4 py-2 sm:py-3 transition-all duration-300 ${activeTab === tab.id
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                              }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {/* Background gradient on active */}
                            {activeTab === tab.id && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0"
                                style={{ background: `linear-gradient(135deg, ${tab.glow}, transparent)` }}
                                transition={{ type: "spring", bounce: 0.2 }}
                              />
                            )}

                            <div className="relative flex items-center gap-1.5 sm:gap-2 z-10">
                              <motion.div
                                animate={activeTab === tab.id ? {
                                  scale: [1, 1.2, 1],
                                  rotate: [0, 5, -5, 0]
                                } : {}}
                                transition={{ duration: 0.5 }}
                              >
                                <Icon
                                  name={tab.icon}
                                  size={isMobile ? 16 : 20}
                                  className={activeTab === tab.id ? '' : 'opacity-60'}
                                />
                              </motion.div>
                              <span className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${activeTab === tab.id ? '' : 'opacity-80'
                                }`}>
                                {isMobile ? tab.label.substring(0, 3) : tab.label}
                              </span>
                            </div>

                            {/* Animated underline */}
                            <div className="relative mt-1.5 sm:mt-2 h-0.5 w-4 sm:w-8 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full"
                                style={{ background: tab.gradient }}
                                initial={false}
                                animate={{
                                  width: activeTab === tab.id ? "100%" : "0%",
                                  opacity: activeTab === tab.id ? 1 : 0
                                }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Tab Content with smooth scrolling */}
                    <div
                      ref={contentRef}
                      className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut"
                          }}
                          className="space-y-6 sm:space-y-8"
                        >
                          {/* Overview Tab */}
                          {activeTab === "overview" && (
                            <>
                              <div className="space-y-4">
                                <motion.h3
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
                                >
                                  Project Overview
                                </motion.h3>
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="prose prose-sm dark:prose-invert max-w-none"
                                >
                                  <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                    {project?.fullDescription}
                                  </p>
                                </motion.div>
                              </div>

                              {project?.impact && (
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                  className="p-4 sm:p-5 bg-gradient-to-br from-blue-50/50 to-white/50 dark:from-blue-900/20 dark:to-gray-900/20 rounded-xl sm:rounded-2xl border border-blue-100/50 dark:border-blue-800/20 backdrop-blur-sm"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center flex-shrink-0">
                                      <Icon name="Target" size={20} className="text-white" />
                                    </div>
                                    <div>
                                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        Project Impact
                                      </h4>
                                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                                        {project.impact}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </>
                          )}

                          {/* Technical Tab */}
                          {activeTab === "technical" && (
                            <>
                              <div className="space-y-4">
                                <motion.h3
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent"
                                >
                                  Technology Stack
                                </motion.h3>
                              </div>

                              {/* Tech Glow Effect */}
                              {showTechGlow && (
                                <motion.div
                                  className="absolute inset-0 pointer-events-none"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 0.1 }}
                                  style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.5), transparent 70%)'
                                  }}
                                />
                              )}

                              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                                {project?.technologies?.map((tech, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                      delay: index * 0.05,
                                      type: "spring",
                                      stiffness: 200
                                    }}
                                    whileHover={{
                                      scale: 1.05,
                                      y: -5,
                                      transition: { type: "spring", stiffness: 400 }
                                    }}
                                    className="group"
                                  >
                                    <div className="p-3 sm:p-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 group-hover:border-purple-200 dark:group-hover:border-purple-700/50 shadow-sm group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300">
                                      <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                          <Icon name="Code" size={isMobile ? 18 : 22} className="text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate w-full">
                                          {tech}
                                        </span>
                                      </div>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </>
                          )}

                          {/* Features Tab */}
                          {activeTab === "features" && project?.features && (
                            <>
                              <div className="space-y-4">
                                <motion.h3
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-300 bg-clip-text text-transparent"
                                >
                                  Key Features
                                </motion.h3>

                                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                  {project.features.map((feature, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: 0.3 + index * 0.1,
                                        type: "spring",
                                        stiffness: 100
                                      }}
                                      whileHover={{ x: 5 }}
                                      className="group"
                                    >
                                      <div className="p-4 sm:p-5 bg-gradient-to-br from-emerald-50/50 to-white/50 dark:from-emerald-900/10 dark:to-gray-900/10 rounded-xl sm:rounded-2xl border border-emerald-100/50 dark:border-emerald-800/20 hover:border-emerald-200 dark:hover:border-emerald-700/30 transition-colors backdrop-blur-sm">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                          <div className="flex-shrink-0">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                              <Icon name="CheckCircle" size={20} className="text-white" />
                                            </div>
                                          </div>
                                          <div className="flex-1">
                                            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">
                                              {feature}
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </>
                          )}

                          {/* Impact Tab */}
                          {activeTab === "impact" && (
                            <>
                              <div className="space-y-4">
                                <motion.h3
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 dark:from-amber-400 dark:to-amber-300 bg-clip-text text-transparent"
                                >
                                  Impact & Results
                                </motion.h3>
                              </div>

                              {project?.metrics && project.metrics.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                                >
                                  {project.metrics.map((metric, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{
                                        delay: 0.3 + index * 0.1,
                                        type: "spring",
                                        stiffness: 200
                                      }}
                                      whileHover={{ scale: 1.05 }}
                                      className="p-4 sm:p-5 bg-gradient-to-br from-amber-50/50 to-white/50 dark:from-amber-900/10 dark:to-gray-900/10 rounded-xl sm:rounded-2xl border border-amber-100/50 dark:border-amber-800/20 text-center backdrop-blur-sm"
                                    >
                                      <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent mb-2">
                                        {metric.value}
                                      </div>
                                      <div className="flex items-center justify-center gap-2">
                                        <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                                          {metric.label}
                                        </div>
                                      </div>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </>
                          )}
                        </motion.div>
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