// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useMemo,
//   useCallback,
// } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import {
//   ArrowRight,
//   FileText,
//   Github,
//   Linkedin,
//   Twitter,
//   Mail,
//   Terminal,
//   Database,
//   Server,
//   Workflow,
//   Brain,
//   Smartphone,
//   Sparkles,
// } from "lucide-react";
// import {
//   SiJavascript,
//   SiReact,
//   SiNodedotjs,
//   SiExpress,
//   SiMongodb,
//   SiTailwindcss,
// } from "react-icons/si";
// import { FaJava } from "react-icons/fa";
// import Image from "../../../components/AppImage";
// import { Link } from "react-router-dom";
// import ResumePopup from "../../../components/ResumePopup";
// import HeroImg from "../../../assets/heroImg/hero.jpeg";

// const HeroSection = () => {
//   const [currentTagline, setCurrentTagline] = useState(0);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isImageLoaded, setIsImageLoaded] = useState(false);
//   const containerRef = useRef(null);
//   const imageRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   /* ---------------- Mobile detection ---------------- */
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   /* ---------------- 3D tilt (desktop) ---------------- */
//   const rotateX = useMotionValue(0);
//   const rotateY = useMotionValue(0);
//   const springConfig = { damping: 25, stiffness: 150 };
//   const springRotateX = useSpring(rotateX, springConfig);
//   const springRotateY = useSpring(rotateY, springConfig);

//   const handleMouseMove = useCallback(
//     (e) => {
//       if (isMobile || !imageRef.current) return;
//       const rect = imageRef.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;
//       const rotateXVal = ((y - centerY) / centerY) * -6;
//       const rotateYVal = ((x - centerX) / centerX) * 6;
//       rotateX.set(rotateXVal);
//       rotateY.set(rotateYVal);
//     },
//     [isMobile, rotateX, rotateY],
//   );

//   const handleMouseLeave = useCallback(() => {
//     rotateX.set(0);
//     rotateY.set(0);
//   }, [rotateX, rotateY]);

//   /* ---------------- Taglines ---------------- */
//   const taglines = useMemo(
//     () => [
//       "MERN & React Native Developer",
//       "Java & Backend Development",
//       "REST APIs & Scalable Systems",
//       "DSA & System Design",
//       "React & React Native Development",
//       "Software Engineer | Scalable Solutions",
//     ],
//     [],
//   );

//   /* ---------------- Tech stack ---------------- */
//   const techStack = useMemo(
//     () => [
//       {
//         name: "JavaScript",
//         icon: SiJavascript,
//         color:
//           "text-amber-500 dark:text-amber-400 bg-amber-500/10 border-amber-500/25 hover:bg-amber-500/20",
//         glow: "shadow-amber-500/10",
//         featured: true,
//       },
//       {
//         name: "React.js",
//         icon: SiReact,
//         color:
//           "text-cyan-500 dark:text-cyan-400 bg-cyan-500/10 border-cyan-500/25 hover:bg-cyan-500/20",
//         glow: "shadow-cyan-500/10",
//         featured: true,
//       },
//       {
//         name: "Node.js",
//         icon: SiNodedotjs,
//         color:
//           "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/25 hover:bg-emerald-500/20",
//         glow: "shadow-emerald-500/10",
//         featured: true,
//       },
//       {
//         name: "Java",
//         icon: FaJava,
//         color:
//           "text-red-500 dark:text-red-400 bg-red-500/10 border-red-500/25 hover:bg-red-500/20",
//         glow: "shadow-red-500/10",
//         featured: true,
//       },
//       {
//         name: "MongoDB",
//         icon: SiMongodb,
//         color:
//           "text-green-600 dark:text-green-400 bg-green-600/10 border-green-600/25 hover:bg-green-600/20",
//         glow: "shadow-green-600/10",
//         featured: true,
//       },
//       {
//         name: "MySQL",
//         icon: Database,
//         color:
//           "text-blue-500 dark:text-blue-400 bg-blue-500/10 border-blue-500/25 hover:bg-blue-500/20",
//         glow: "shadow-blue-500/10",
//         featured: true,
//       },
//       {
//         name: "System Design",
//         icon: Server,
//         color:
//           "text-purple-500 dark:text-purple-400 bg-purple-500/10 border-purple-500/25 hover:bg-purple-500/20",
//         glow: "shadow-purple-500/10",
//         featured: true,
//       },
//       {
//         name: "CI/CD",
//         icon: Workflow,
//         color:
//           "text-orange-500 dark:text-orange-400 bg-orange-500/10 border-orange-500/25 hover:bg-orange-500/20",
//         glow: "shadow-orange-500/10",
//         featured: true,
//       },
//       {
//         name: "React Native",
//         icon: Smartphone,
//         color:
//           "text-sky-500 dark:text-sky-400 bg-sky-500/10 border-sky-500/25 hover:bg-sky-500/20",
//         glow: "shadow-sky-500/10",
//         featured: false,
//       },
//       {
//         name: "Express.js",
//         icon: SiExpress,
//         color:
//           "text-slate-600 dark:text-slate-300 bg-slate-500/10 border-slate-500/25 hover:bg-slate-500/20",
//         glow: "shadow-slate-500/10",
//         featured: false,
//       },
//       {
//         name: "Tailwind CSS",
//         icon: SiTailwindcss,
//         color:
//           "text-teal-500 dark:text-teal-400 bg-teal-500/10 border-teal-500/25 hover:bg-teal-500/20",
//         glow: "shadow-teal-500/10",
//         featured: false,
//       },
//       {
//         name: "Data Structures & Algorithms",
//         icon: Brain,
//         color:
//           "text-indigo-500 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/25 hover:bg-indigo-500/20",
//         glow: "shadow-indigo-500/10",
//         featured: false,
//       },
//     ],
//     [],
//   );

//   /* ---------------- Stats ---------------- */
//   const stats = useMemo(
//     () => [
//       {
//         value: 10,
//         suffix: "+",
//         label: "Projects Built",
//         color: "text-blue-600 dark:text-blue-400",
//       },
//       {
//         value: 300,
//         suffix: "+",
//         label: "DSA Problems Solved",
//         color: "text-emerald-600 dark:text-emerald-400",
//       },
//       {
//         value: 15,
//         suffix: "+",
//         label: "Tech Stack",
//         color: "text-purple-600 dark:text-purple-400",
//       },
//       {
//         value: 1,
//         suffix: "+ Yrs",
//         label: "Industry & Practice",
//         color: "text-amber-600 dark:text-amber-400",
//       },
//     ],
//     [],
//   );

//   /* ---------------- Social links with real brand hover colors ---------------- */
//   const socialLinks = useMemo(
//     () => [
//       {
//         name: "GitHub",
//         url: "https://github.com/Ratnakar-Singh-parihar-123",
//         icon: Github,
//         // GitHub: dark slate/black
//         hoverClasses:
//           "hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:hover:bg-white dark:hover:text-slate-900 dark:hover:border-white",
//         hoverShadow: "hover:shadow-slate-900/25 dark:hover:shadow-white/20",
//       },
//       {
//         name: "LinkedIn",
//         url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
//         icon: Linkedin,
//         // LinkedIn brand blue
//         hoverClasses:
//           "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
//         hoverShadow: "hover:shadow-[#0A66C2]/30",
//       },
//       {
//         name: "Twitter",
//         url: "https://x.com/RatnakarSi85551",
//         icon: Twitter,
//         // X / Twitter: black (with X brand)
//         hoverClasses:
//           "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white",
//         hoverShadow: "hover:shadow-black/30 dark:hover:shadow-white/20",
//       },
//       {
//         name: "Email",
//         url: "mailto:ratnakarsinghparihar9399@gmail.com",
//         icon: Mail,
//         // Gmail-style red
//         hoverClasses:
//           "hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335]",
//         hoverShadow: "hover:shadow-[#EA4335]/30",
//       },
//     ],
//     [],
//   );

//   /* ---------------- Tagline rotation ---------------- */
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTagline((prev) => (prev + 1) % taglines.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [taglines.length]);

//   /* ---------------- Body scroll lock for resume modal ---------------- */
//   useEffect(() => {
//     document.body.style.overflow = isPopupOpen ? "hidden" : "";
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [isPopupOpen]);

//   const handlePopupOpen = useCallback(() => setIsPopupOpen(true), []);
//   const handlePopupClose = useCallback(() => setIsPopupOpen(false), []);

//   return (
//     <section
//       ref={containerRef}
//       className="relative flex items-center justify-center w-full min-h-screen pt-16 pb-16 overflow-x-hidden sm:pt-20 lg:pt-24 lg:pb-24 bg-background"
//     >
//       {/* Background Subtle Elements */}
//       <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//         <div className="absolute rounded-full top-1/4 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-blue-500/10 dark:bg-blue-600/15 blur-3xl" />
//         <div className="absolute rounded-full bottom-1/4 right-10 w-80 h-80 sm:w-96 sm:h-96 bg-purple-500/10 dark:bg-purple-600/15 blur-3xl" />

//         <div
//           className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
//           style={{
//             backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
//             backgroundSize: "32px 32px",
//           }}
//         />
//       </div>

//       {/* Main Container */}
//       <div className="relative z-10 w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <div className="grid items-center grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
//           {/* ============================================================
//               LEFT COLUMN — Hero Content
//               Mobile: order-2 (below image)
//               Desktop: order-1 (left side)
//              ============================================================ */}
//           <motion.div
//             initial={{ opacity: 0, y: 24 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, ease: "easeOut" }}
//             className="flex flex-col items-center order-2 space-y-6 text-center lg:col-span-7 lg:items-start lg:text-left lg:order-1"
//           >
//             {/* Status Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: 0.1, duration: 0.4 }}
//               className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs sm:text-sm font-medium shadow-sm backdrop-blur-sm"
//             >
//               <span className="relative flex w-2 h-2">
//                 <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />
//                 <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
//               </span>
//               <span>Open to Full-Time Software Engineering Opportunities</span>
//             </motion.div>

//             {/* Main Headline */}
//             <div className="w-full space-y-2">
//               <motion.span
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.2 }}
//                 className="text-sm font-semibold tracking-wide uppercase sm:text-base text-muted-foreground"
//               >
//                 Full Stack & React Native Developer
//               </motion.span>

//               <motion.h1
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.25, duration: 0.5 }}
//                 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.1] whitespace-nowrap"
//               >
//                 Ratnakar Singh{" "}
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
//                   Parihar
//                 </span>
//               </motion.h1>
//             </div>

//             {/* Dynamic Tagline Rotator */}
//             <div className="min-h-[2.5rem] flex items-center justify-center lg:justify-start w-full">
//               <AnimatePresence mode="wait">
//                 <motion.p
//                   key={currentTagline}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.4 }}
//                   className="text-base font-medium text-blue-600 sm:text-lg md:text-xl dark:text-blue-400"
//                 >
//                   {taglines[currentTagline]}
//                 </motion.p>
//               </AnimatePresence>
//             </div>

//             {/* Description */}
//             {/* <motion.p
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.35, duration: 0.5 }}
//               className="max-w-2xl text-sm leading-relaxed sm:text-base md:text-lg text-muted-foreground"
//             >
//               Full Stack & Mobile Engineer proficient in{" "}
//               <strong className="font-semibold text-foreground">
//                 JavaScript, Java, MERN Stack
//               </strong>
//               , and{" "}
//               <strong className="font-semibold text-foreground">
//                 React Native
//               </strong>
//               . Experienced in building scalable web & mobile applications,
//               designing RESTful APIs, optimizing{" "}
//               <strong className="font-semibold text-foreground">
//                 MySQL & MongoDB databases
//               </strong>
//               , and applying{" "}
//               <strong className="font-semibold text-foreground">
//                 System Design & CI/CD best practices
//               </strong>
//               .
//             </motion.p> */}

//             {/* Tech Stack */}
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.5 }}
//               className="w-full space-y-2.5 pt-1"
//             >
//               <div className="flex items-center justify-center gap-2 text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 lg:justify-start">
//                 <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
//                 <span>Technical Skill Set & Core Competencies</span>
//               </div>

//               <div className="flex flex-wrap items-center justify-center max-w-2xl gap-2 lg:justify-start">
//                 {techStack.map((tech) => {
//                   const IconComponent = tech.icon;
//                   return (
//                     <motion.div
//                       key={tech.name}
//                       whileHover={{ y: -2, scale: 1.05 }}
//                       whileTap={{ scale: 0.98 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 450,
//                         damping: 22,
//                       }}
//                       className={`
//                         inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md transition-all cursor-default
//                         ${tech.color} ${tech.glow}
//                         ${tech.featured ? "ring-1 ring-slate-400/20 dark:ring-slate-500/30 shadow-xs" : ""}
//                       `}
//                     >
//                       <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
//                       <span>{tech.name}</span>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </motion.div>

//             {/* CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.45, duration: 0.5 }}
//               className="flex flex-col items-center w-full gap-4 pt-2 sm:flex-row sm:w-auto"
//             >
//               <Link to="/contact" className="w-full sm:w-auto">
//                 <button
//                   type="button"
//                   className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base group"
//                 >
//                   <span>Let's Connect</span>
//                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </button>
//               </Link>

//               <button
//                 type="button"
//                 onClick={handlePopupOpen}
//                 className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-foreground bg-card hover:bg-muted border border-border shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
//               >
//                 <FileText className="w-4 h-4 text-blue-500" />
//                 <span>View Resume</span>
//               </button>
//             </motion.div>

//             {/* Social Icons — Real brand colors on hover */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//               className="flex items-center gap-3 pt-2"
//             >
//               {socialLinks.map((social) => {
//                 const IconComponent = social.icon;
//                 return (
//                   <a
//                     key={social.name}
//                     href={social.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     aria-label={social.name}
//                     className={`
//                       group/social relative p-2.5 rounded-lg
//                       border border-border/60 bg-card/80
//                       text-muted-foreground
//                       transition-all duration-300 ease-out
//                       hover:-translate-y-0.5 hover:shadow-lg
//                       ${social.hoverClasses}
//                       ${social.hoverShadow}
//                     `}
//                   >
//                     <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover/social:scale-110" />
//                   </a>
//                 );
//               })}
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               initial={{ opacity: 0, y: 15 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.55, duration: 0.5 }}
//               className="grid w-full grid-cols-2 gap-3 pt-6 sm:grid-cols-4"
//             >
//               {stats.map((stat) => (
//                 <div
//                   key={stat.label}
//                   className="p-3.5 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm text-center lg:text-left transition-all hover:border-border"
//                 >
//                   <div className={`text-2xl font-extrabold ${stat.color}`}>
//                     {stat.value}
//                     {stat.suffix}
//                   </div>
//                   <div className="text-xs text-muted-foreground font-medium mt-0.5">
//                     {stat.label}
//                   </div>
//                 </div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* ============================================================
//               RIGHT COLUMN — Profile Card & Visual Container
//               Mobile: order-1 (on top)
//               Desktop: order-2 (right side)
//              ============================================================ */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
//             className="flex justify-center order-1 w-full lg:col-span-5 lg:order-2"
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             ref={imageRef}
//           >
//             <motion.div
//               style={{
//                 rotateX: isMobile ? 0 : springRotateX,
//                 rotateY: isMobile ? 0 : springRotateY,
//                 transformPerspective: isMobile ? "none" : 1000,
//               }}
//               className="relative w-full max-w-sm sm:max-w-md"
//             >
//               <div className="relative p-1 shadow-2xl rounded-3xl bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 shadow-blue-500/10">
//                 <div className="relative overflow-hidden rounded-[22px] bg-card border border-border p-3 sm:p-4">
//                   {/* Photo Container */}
//                   <div className="relative overflow-hidden rounded-2xl bg-muted aspect-[4/5] w-full">
//                     <Image
//                       src={HeroImg}
//                       alt="Ratnakar Singh Parihar"
//                       className="object-cover object-top w-full h-full transition-transform duration-700 hover:scale-105"
//                       onLoad={() => setIsImageLoaded(true)}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//                     {/* Bottom Floating Identity Overlay */}
//                     <div className="absolute text-white bottom-4 left-4 right-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
//                             Full Stack Developer
//                           </p>
//                           <h3 className="text-lg font-bold">
//                             Ratnakar Singh Parihar
//                           </h3>
//                         </div>
//                         <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-medium backdrop-blur-md">
//                           🟢 Active
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Code Card Widget */}
//                   {/* <div className="p-3 mt-3 space-y-1 font-mono text-xs border shadow-inner rounded-xl bg-slate-900 text-slate-200 border-slate-800">
//                     <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
//                       <span className="flex items-center gap-1.5">
//                         <Terminal className="w-3.5 h-3.5 text-blue-400" />
//                         developer.config.ts
//                       </span>
//                       <span className="text-emerald-400">
//                         ● Full Stack & Systems
//                       </span>
//                     </div>
//                     <p className="pt-1">
//                       <span className="text-purple-400">const</span>{" "}
//                       <span className="text-blue-400">developer</span> = &#123;
//                     </p>
//                     <p className="pl-4">
//                       <span className="text-slate-400">name:</span>{" "}
//                       <span className="text-amber-300">
//                         "Ratnakar Singh Parihar"
//                       </span>
//                       ,
//                     </p>
//                     <p className="pl-4">
//                       <span className="text-slate-400">stack:</span> [
//                       <span className="text-emerald-300">"Java"</span>,{" "}
//                       <span className="text-emerald-300">"MERN"</span>,{" "}
//                       <span className="text-emerald-300">"MySQL"</span>,{" "}
//                       <span className="text-emerald-300">"System Design"</span>
//                       ],
//                     </p>
//                     <p className="pl-4">
//                       <span className="text-slate-400">status:</span>{" "}
//                       <span className="text-cyan-300">
//                         "Ready for Opportunities"
//                       </span>
//                     </p>
//                     <p>&#125;;</p>
//                   </div> */}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Resume Modal */}
//       <ResumePopup isOpen={isPopupOpen} onClose={handlePopupClose} />
//     </section>
//   );
// };

// export default HeroSection;
// //
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Database,
  Server,
  Workflow,
  Brain,
  Smartphone,
  Sparkles,
  MapPin,
  Code2,
  BriefcaseBusiness,
  ExternalLink,
  Network,
  Boxes,
  TestTube,
} from "lucide-react";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import Image from "../../../components/AppImage";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup";
import HeroImg from "../../../assets/heroImg/hero.jpeg";

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const imageRef = useRef(null);

  /* ============================================================
     MOBILE DETECTION
     ============================================================ */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  /* ============================================================
     3D PROFILE TILT
     ============================================================ */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = {
    damping: 28,
    stiffness: 150,
    mass: 0.7,
  };

  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || !imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateXValue = ((y - centerY) / centerY) * -4;
      const rotateYValue = ((x - centerX) / centerX) * 4;

      rotateX.set(rotateXValue);
      rotateY.set(rotateYValue);
    },
    [isMobile, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  /* ============================================================
     ROTATING SPECIALIZATIONS
     ============================================================ */
  const taglines = useMemo(
    () => [
      "MERN & React Native Developer",
      "Java & Backend Development",
      "REST APIs & Scalable Systems",
      "DSA & System Design",
      "React & Mobile Application Development",
    ],
    [],
  );

  /* ============================================================
     TECH STACK
     ============================================================ */
  const techStack = useMemo(
    () => [
      {
        name: "JavaScript",
        icon: SiJavascript,
        className:
          "text-amber-500 bg-amber-500/8 border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 hover:shadow-lg hover:shadow-amber-500/20 hover:-translate-y-0.5",
      },
      {
        name: "React",
        icon: SiReact,
        className:
          "text-cyan-500 bg-cyan-500/8 border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5",
      },
      {
        name: "Node.js",
        icon: SiNodedotjs,
        className:
          "text-emerald-500 bg-emerald-500/8 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        className:
          "text-foreground/80 bg-foreground/5 border-foreground/15 hover:bg-foreground/10 hover:border-foreground/40 hover:text-foreground hover:shadow-lg hover:shadow-foreground/10 hover:-translate-y-0.5",
      },
      {
        name: "Java",
        icon: FaJava,
        className:
          "text-red-500 bg-red-500/8 border-red-500/20 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 hover:shadow-lg hover:shadow-red-500/20 hover:-translate-y-0.5",
      },
      {
        name: "MongoDB",
        icon: SiMongodb,
        className:
          "text-green-600 dark:text-green-400 bg-green-500/8 border-green-500/20 hover:bg-green-500/20 hover:border-green-500/50 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5",
      },
      {
        name: "MySQL",
        icon: Database,
        className:
          "text-blue-500 bg-blue-500/8 border-blue-500/20 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5",
      },
      {
        name: "System Design",
        icon: Server,
        className:
          "text-purple-500 bg-purple-500/8 border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/50 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5",
      },
      {
        name: "Load Balancing",
        icon: Network,
        className:
          "text-violet-500 bg-violet-500/8 border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/50 hover:text-violet-400 hover:shadow-lg hover:shadow-violet-500/20 hover:-translate-y-0.5",
      },
      {
        name: "Caching",
        icon: Database,
        className:
          "text-pink-500 bg-pink-500/8 border-pink-500/20 hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5",
      },
      {
        name: "OOP",
        icon: Boxes,
        className:
          "text-fuchsia-500 bg-fuchsia-500/8 border-fuchsia-500/20 hover:bg-fuchsia-500/20 hover:border-fuchsia-500/50 hover:text-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/20 hover:-translate-y-0.5",
      },
      {
        name: "React Native",
        icon: Smartphone,
        className:
          "text-sky-500 bg-sky-500/8 border-sky-500/20 hover:bg-sky-500/20 hover:border-sky-500/50 hover:text-sky-400 hover:shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5",
      },
      {
        name: "CI/CD",
        icon: Workflow,
        className:
          "text-orange-500 bg-orange-500/8 border-orange-500/20 hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-400 hover:shadow-lg hover:shadow-orange-500/20 hover:-translate-y-0.5",
      },
      {
        name: "DSA",
        icon: Brain,
        className:
          "text-indigo-500 bg-indigo-500/8 border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-500/50 hover:text-indigo-400 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5",
      },
      {
        name: "Testing & Debugging",
        icon: TestTube,
        className:
          "text-emerald-500 bg-emerald-500/8 border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5",
      },
    ],
    [],
  );

  /* ============================================================
     STATS
     ============================================================ */
  const stats = useMemo(
    () => [
      {
        value: "10+",
        label: "Projects Built",
      },
      {
        value: "300+",
        label: "DSA Problems",
      },
      {
        value: "15+",
        label: "Technologies",
      },
      {
        value: "1+",
        label: "Years — Learning, Internships & Projects",
      },
    ],
    [],
  );

  /* ============================================================
     SOCIAL LINKS
     ============================================================ */
  const socialLinks = useMemo(
    () => [
      {
        name: "GitHub",
        url: "https://github.com/Ratnakar-Singh-parihar-123",
        icon: Github,
        hover:
          "hover:bg-slate-900 hover:text-white hover:border-slate-900 dark:hover:bg-white dark:hover:text-slate-900 dark:hover:border-white",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
        icon: Linkedin,
        hover: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
      },
      {
        name: "Twitter",
        url: "https://x.com/RatnakarSi85551",
        icon: Twitter,
        hover:
          "hover:bg-blue-500 hover:text-white hover:border-blue-500 dark:hover:bg-white dark:hover:text-blue-500 dark:hover:border-white",
      },
      {
        name: "Email",
        url: "mailto:ratnakarsinghparihar9399@gmail.com",
        icon: Mail,
        hover: "hover:bg-[#EA4335] hover:text-white hover:border-[#EA4335]",
      },
    ],
    [],
  );

  /* ============================================================
     TAGLINE ROTATION
     ============================================================ */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [taglines.length]);

  /* ============================================================
     RESUME MODAL SCROLL LOCK
     ============================================================ */
  useEffect(() => {
    document.body.style.overflow = isPopupOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handlePopupOpen = useCallback(() => {
    setIsPopupOpen(true);
  }, []);

  const handlePopupClose = useCallback(() => {
    setIsPopupOpen(false);
  }, []);

  return (
    <section
      id="home"
      className="relative flex items-center w-full min-h-screen overflow-hidden bg-background"
    >
      {/* ============================================================
          MAIN CONTAINER
          Clean background — no gradients / blobs / grid
          ============================================================ */}
      <div className="relative z-10 w-full px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-20 xl:py-24">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* ============================================================
              LEFT CONTENT
              ============================================================ */}
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {/* ========================================================
                  AVAILABILITY
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.4,
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3.5
                  py-1.5
                  rounded-full
                  border
                  border-emerald-500/20
                  bg-emerald-500/[0.05]
                "
              >
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-emerald-400" />

                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>

                <span
                  className="
                    text-[11px]
                    sm:text-xs
                    font-semibold
                    text-emerald-600
                    dark:text-emerald-400
                  "
                >
                  Open to Full-Time Opportunities
                </span>
              </motion.div>

              {/* ========================================================
                  ROLE LABEL
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.18,
                  duration: 0.4,
                }}
                className="flex items-center gap-2 mt-7"
              >
                <span className="w-6 h-px bg-blue-500" />

                <span
                  className="
                    text-xs
                    sm:text-sm
                    font-bold
                    tracking-[0.18em]
                    uppercase
                    text-muted-foreground
                  "
                >
                  Full Stack Developer
                </span>
              </motion.div>

              {/* ========================================================
                  NAME
                  ======================================================== */}
              <motion.h1
                initial={{
                  opacity: 0,
                  y: 18,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.24,
                  duration: 0.55,
                }}
                className="
                  mt-3
                  text-[clamp(2rem,4.5vw,3.7rem)]
                  lg:text-[3.65rem]
                  xl:text-[3.9rem]
                  font-extrabold
                  tracking-[-0.045em]
                  leading-[1.05]
                  whitespace-nowrap
                "
              >
                Ratnakar Singh{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400">
                  Parihar
                </span>
              </motion.h1>

              {/* ========================================================
                  DYNAMIC TAGLINE
                  ======================================================== */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  lg:justify-start
                  w-full
                  min-h-[40px]
                  mt-3
                "
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTagline}
                    initial={{
                      opacity: 0,
                      y: 7,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -7,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="flex items-center gap-2 text-sm font-semibold text-blue-600 sm:text-base md:text-lg dark:text-blue-400"
                  >
                    <Code2 className="w-4 h-4 shrink-0" />

                    <span>{taglines[currentTagline]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ========================================================
                  DESCRIPTION
                  Kept commented intentionally.
                  ======================================================== */}

              {/* <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="max-w-2xl mt-3 text-sm leading-relaxed sm:text-base md:text-lg text-muted-foreground"
              >
                Full Stack & Mobile Engineer proficient in{" "}
                <strong className="font-semibold text-foreground">
                  JavaScript, Java, MERN Stack
                </strong>
                , and{" "}
                <strong className="font-semibold text-foreground">
                  React Native
                </strong>
                . Experienced in building scalable web & mobile applications,
                designing RESTful APIs, optimizing{" "}
                <strong className="font-semibold text-foreground">
                  MySQL & MongoDB databases
                </strong>
                , and applying{" "}
                <strong className="font-semibold text-foreground">
                  System Design & CI/CD best practices
                </strong>
                .
              </motion.p> */}

              {/* ========================================================
                  TECH SECTION
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.5,
                }}
                className="w-full mt-5"
              >
                <div className="flex items-center justify-center gap-2 mb-3 lg:justify-start">
                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />

                  <span
                    className="
                      text-[10px]
                      sm:text-xs
                      font-bold
                      tracking-[0.16em]
                      uppercase
                      text-muted-foreground
                    "
                  >
                    Core Technologies
                  </span>
                </div>

                <div className="flex flex-wrap justify-center max-w-2xl gap-2 lg:justify-start">
                  {techStack.map((tech, index) => {
                    const IconComponent = tech.icon;

                    return (
                      <motion.div
                        key={tech.name}
                        initial={{
                          opacity: 0,
                          scale: 0.94,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: 0.38 + index * 0.03,
                          duration: 0.25,
                        }}
                        whileHover={{
                          y: -2,
                        }}
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          px-2.5
                          py-1.5
                          rounded-lg
                          border
                          text-[10px]
                          sm:text-[11px]
                          font-semibold
                          transition-all
                          duration-200
                          ${tech.className}
                        `}
                      >
                        <IconComponent className="w-3.5 h-3.5 shrink-0" />

                        <span>{tech.name}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* ========================================================
                  CTA
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.45,
                }}
                className="flex flex-col items-center w-full gap-3 mt-7 sm:flex-row sm:w-auto"
              >
                {/* ============================================================
      PRIMARY CTA — LET'S CONNECT
      Blue + Dark Blue combination
      ============================================================ */}
                <Link to="/contact" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="
        group
        relative
        flex
        items-center
        justify-center
        gap-2.5
        w-full
        sm:w-auto
        min-w-[165px]
        px-6
        py-3
        rounded-xl
        overflow-hidden
        bg-gradient-to-r
        from-blue-600
        via-blue-600
        to-indigo-600
        text-white
        text-sm
        font-bold
        border
        border-blue-500/40
        shadow-lg
        shadow-blue-600/20
        hover:shadow-xl
        hover:shadow-blue-600/30
        hover:-translate-y-1
        hover:from-blue-500
        hover:via-blue-600
        hover:to-indigo-500
        active:translate-y-0
        transition-all
        duration-300
      "
                  >
                    {/* Subtle shine */}
                    <span className="absolute inset-0 transition-transform duration-700 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full" />

                    <span className="relative z-10">Let's Connect</span>

                    <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>

                {/* ============================================================
      SECONDARY CTA — VIEW RESUME
      ============================================================ */}
                <button
                  type="button"
                  onClick={handlePopupOpen}
                  className="
      group
      flex
      items-center
      justify-center
      gap-2.5
      w-full
      sm:w-auto
      min-w-[165px]
      px-6
      py-3
      rounded-xl
      border
      border-blue-500/20
      bg-card/80
      text-foreground
      text-sm
      font-semibold
      backdrop-blur-sm
      shadow-sm
      hover:bg-blue-500/5
      hover:border-blue-500/40
      hover:text-blue-600
      dark:hover:text-blue-400
      hover:shadow-md
      hover:-translate-y-1
      active:translate-y-0
      transition-all
      duration-300
    "
                >
                  <FileText className="w-4 h-4 text-blue-500 transition-transform duration-300 group-hover:scale-110" />

                  <span>View Resume</span>
                </button>
              </motion.div>

              {/* ========================================================
                  LOCATION
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.56,
                  duration: 0.4,
                }}
                className="flex flex-wrap items-center justify-center mt-5 text-xs lg:justify-start gap-x-5 gap-y-2 text-muted-foreground"
              >
                {/* <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  Bengaluru, India
                </span> */}

                {/* <span className="hidden w-1 h-1 rounded-full sm:block bg-border" /> */}

                <span className="flex items-center gap-1.5">
                  <BriefcaseBusiness className="w-3.5 h-3.5 text-emerald-500" />
                  Available for Full-Time Roles
                </span>
              </motion.div>

              {/* ========================================================
                  SOCIAL LINKS
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.4,
                }}
                className="flex items-center gap-2.5 mt-5"
              >
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className={`
                        group
                        p-2.5
                        rounded-xl
                        border
                        border-border
                        bg-card
                        text-muted-foreground
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:shadow-md
                        ${social.hover}
                      `}
                    >
                      <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </motion.div>

              {/* ========================================================
                  STATS
                  ======================================================== */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.65,
                  duration: 0.45,
                }}
                className="grid w-full grid-cols-2 gap-2 mt-6 sm:grid-cols-4"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="px-3 py-3 text-center transition-all duration-200 border rounded-xl border-border/70 bg-card/50 hover:bg-card hover:border-border"
                  >
                    <div className="text-xl font-extrabold tracking-tight sm:text-2xl text-foreground">
                      {stat.value}
                    </div>

                    <div className="mt-0.5 text-[10px] sm:text-xs font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT — PROFILE CARD
              ============================================================ */}
          <motion.div
            initial={{
              opacity: 0,
              x: 25,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="flex justify-center order-1 lg:order-2 lg:col-span-5"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
          >
            <motion.div
              style={{
                rotateX: isMobile ? 0 : springRotateX,
                rotateY: isMobile ? 0 : springRotateY,
                transformPerspective: isMobile ? "none" : 1100,
              }}
              className="
                relative
                w-full
                max-w-[330px]
                sm:max-w-[365px]
                lg:max-w-[400px]
                xl:max-w-[420px]
              "
            >
              {/* ========================================================
                  OUTER BORDER
                  ======================================================== */}
              <div
                className="
                  relative
                  p-[1px]
                  rounded-[2rem]
                  bg-gradient-to-br
                  from-blue-500/35
                  via-purple-500/25
                  to-indigo-500/35
                  shadow-xl
                  shadow-black/5
                  dark:shadow-black/20
                "
              >
                <div
                  className="
                    relative
                    overflow-hidden
                    rounded-[2rem]
                    border
                    border-border/70
                    bg-card
                  "
                >
                  {/* ====================================================
                      IMAGE
                      ==================================================== */}
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <Image
                      src={HeroImg}
                      alt="Ratnakar Singh Parihar"
                      className="
                        object-cover
                        object-top
                        w-full
                        h-full
                        transition-transform
                        duration-700
                        hover:scale-[1.035]
                      "
                    />

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

                    {/* ==================================================
                        TOP BADGE
                        ================================================== */}
                    <div className="absolute flex items-center justify-between top-4 left-4 right-4">
                      <div
                        className="
                          inline-flex
                          items-center
                          gap-2
                          px-3
                          py-1.5
                          rounded-full
                          border
                          border-white/15
                          bg-black/25
                          backdrop-blur-md
                        "
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                        <span className="text-[10px] font-semibold text-white">
                          Available
                        </span>
                      </div>

                      {/* <div className="flex items-center justify-center w-8 h-8 border rounded-full border-white/15 bg-black/25 backdrop-blur-md">
                        <Code2 className="w-4 h-4 text-white" />
                      </div> */}
                    </div>

                    {/* ==================================================
                        PROFILE INFO
                        ================================================== */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <p
                        className="
                          mb-1
                          text-[10px]
                          sm:text-[11px]
                          font-bold
                          tracking-[0.18em]
                          uppercase
                          text-blue-300
                        "
                      >
                        Full Stack Developer
                      </p>

                      <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                        Ratnakar Singh Parihar
                      </h2>

                      <p className="mt-1 text-[11px] sm:text-xs text-white/65">
                        Building Scalable Web & Mobile Experiences
                      </p>
                    </div>
                  </div>

                  {/* ====================================================
                      CARD FOOTER
                      ==================================================== */}
                  <div className="grid grid-cols-3 border-t divide-x divide-border border-border bg-card">
                    <div className="px-2 py-4 text-center">
                      <p className="text-xs font-bold text-foreground">MERN</p>

                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Web
                      </p>
                    </div>

                    <div className="px-2 py-4 text-center">
                      <p className="text-xs font-bold text-foreground">
                        React Native
                      </p>

                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Mobile
                      </p>
                    </div>

                    <div className="px-2 py-4 text-center">
                      <p className="text-xs font-bold text-foreground">
                        Java / Node.js
                      </p>

                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Backend
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ========================================================
                  FLOATING CARD — PROJECTS
                  ======================================================== */}
              {/* <motion.div
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -left-5
                  top-16
                  hidden
                  md:flex
                  items-center
                  gap-2.5
                  px-3
                  py-2.5
                  rounded-xl
                  border
                  border-border
                  bg-card/95
                  backdrop-blur-md
                  shadow-lg
                "
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10">
                  <Code2 className="w-4 h-4 text-blue-500" />
                </div>

                <div>
                  <p className="text-[9px] text-muted-foreground">Building</p>

                  <p className="text-xs font-bold text-foreground">
                    Scalable Apps
                  </p>
                </div>
              </motion.div> */}

              {/* ========================================================
                  FLOATING CARD — SYSTEM DESIGN
                  ======================================================== */}
              {/* <motion.div
                animate={{
                  y: [0, 6, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -right-5
                  bottom-24
                  hidden
                  md:flex
                  items-center
                  gap-2.5
                  px-3
                  py-2.5
                  rounded-xl
                  border
                  border-border
                  bg-card/95
                  backdrop-blur-md
                  shadow-lg
                "
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                  <Server className="w-4 h-4 text-purple-500" />
                </div>

                <div>
                  <p className="text-[9px] text-muted-foreground">Focus</p>

                  <p className="text-xs font-bold text-foreground">
                    System Design
                  </p>
                </div>
              </motion.div> */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ==============================================================
          RESUME MODAL
          ============================================================== */}
      <ResumePopup isOpen={isPopupOpen} onClose={handlePopupClose} />
    </section>
  );
};

export default HeroSection;
