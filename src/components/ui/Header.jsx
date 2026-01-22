// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Icon from "../AppIcon";
// import Button from "./Button";
// import { ThemeToggle } from "../ThemeProvider";
// import { Link } from "react-router-dom";

// // logo
// import logoImg from "../../assets/logo/logo.jpeg";

// // resume
// import resumefile from "../../assets/resume/Ratnakar_Singh_Parihar.pdf";

// const Header = ({ className = "" }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [isVisible, setIsVisible] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const headerRef = useRef(null);
//   const menuRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const dropdownTimeoutRef = useRef(null);

//   const navigationItems = [
//     { name: "Home", path: "/", icon: "Home", gradient: "from-blue-500 to-cyan-400" },
//     { name: "About", path: "/about", icon: "User", gradient: "from-purple-500 to-pink-500" },
//     { name: "Skills", path: "/skills", icon: "Code", gradient: "from-emerald-500 to-green-400" },
//     { name: "Projects", path: "/projects", icon: "FolderOpen", gradient: "from-orange-500 to-amber-400" },
//     { name: "Contact", path: "/contact", icon: "Mail", gradient: "from-rose-500 to-red-400" },
//   ];

//   const secondaryItems = [
//     // { 
//     //   name: "Blog", 
//     //   path: "/blog", 
//     //   icon: "BookOpen", 
//     //   desc: "Tech Insights & Tutorials",
//     //   gradient: "from-blue-400 to-indigo-500"
//     // },
//     { 
//       name: "Achievements", 
//       path: "/achievements", 
//       icon: "Award", 
//       desc: "Awards & Recognitions",
//       gradient: "from-yellow-400 to-amber-500"
//     },
//     // { 
//     //   name: "Experience", 
//     //   path: "/experience", 
//     //   icon: "Briefcase", 
//     //   desc: "Professional Journey",
//     //   gradient: "from-purple-400 to-violet-500"
//     // },
//     { 
//       name: "Education", 
//       path: "/education", 
//       icon: "GraduationCap", 
//       desc: "Academic Background",
//       gradient: "from-indigo-400 to-blue-500"
//     },
//   ];

//   const socialLinks = [
//     { name: "LinkedIn", icon: "Linkedin", url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/", color: "bg-blue-600 hover:bg-blue-700" },
//     { name: "GitHub", icon: "Github", url: "https://github.com/Ratnakar-Singh-parihar-123", color: "bg-gray-800 hover:bg-gray-900" },
//     // { name: "Twitter", icon: "Twitter", url: "#", color: "bg-sky-500 hover:bg-sky-600" },
//   ];

//   // Scroll effect handler
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
      
//       setIsScrolled(currentScrollY > 20);
      
//       if (currentScrollY > 100) {
//         const scrollDelta = currentScrollY - lastScrollY;
        
//         if (scrollDelta > 10 && currentScrollY > 150 && !isMenuOpen) {
//           setIsVisible(false);
//         } 
//         else if (scrollDelta < -5 || currentScrollY < 80) {
//           setIsVisible(true);
//         }
//       } else {
//         setIsVisible(true);
//       }
      
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [lastScrollY, isMenuOpen]);

//   // Close handlers and event listeners
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//       if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
//         closeAll();
//       }
//     };

//     const handleEscapeKey = (event) => {
//       if (event.key === 'Escape') {
//         closeAll();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     document.addEventListener("keydown", handleEscapeKey);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleEscapeKey);
//       if (dropdownTimeoutRef.current) {
//         clearTimeout(dropdownTimeoutRef.current);
//       }
//     };
//   }, [isMenuOpen]);

//   const closeAll = useCallback(() => {
//     setIsMenuOpen(false);
//     setActiveDropdown(null);
//     document.body.style.overflow = '';
//     document.body.style.paddingRight = '';
//   }, []);

//   const toggleMenu = () => {
//     if (!isMenuOpen) {
//       const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
//       document.body.style.overflow = 'hidden';
//       if (scrollbarWidth > 0) {
//         document.body.style.paddingRight = `${scrollbarWidth}px`;
//       }
//       setIsLoading(true);
//       setTimeout(() => setIsLoading(false), 200);
//     } else {
//       document.body.style.overflow = '';
//       document.body.style.paddingRight = '';
//     }
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const isActivePath = (path) => {
//     if (path === "/") {
//       return location.pathname === path;
//     }
//     return location.pathname.startsWith(path);
//   };

//   const handleNavClick = useCallback((path) => {
//     closeAll();
//     setIsLoading(true);
    
//     if (location.pathname === path) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     } else {
//       navigate(path);
//     }
    
//     setTimeout(() => setIsLoading(false), 300);
//   }, [closeAll, location.pathname, navigate]);

//   const handleDropdownMouseEnter = () => {
//     if (dropdownTimeoutRef.current) {
//       clearTimeout(dropdownTimeoutRef.current);
//     }
//     setActiveDropdown('more');
//   };

//   const handleDropdownMouseLeave = () => {
//     dropdownTimeoutRef.current = setTimeout(() => {
//       setActiveDropdown(null);
//     }, 200);
//   };

//   // Logo Component
//   const Logo = () => (
//     <div className="flex items-center space-x-3 group cursor-pointer">
//       <div className="relative">
//         <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
//           <img
//             src={logoImg}
//             alt="RSP Logo"
//             className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg"
//             loading="eager"
//           />
//         </div>
//         <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900">
//           <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping" />
//         </div>
//       </div>
      
//       <div className="flex flex-col">
//         <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
//           RSP
//         </span>
//         <span className="text-xs text-gray-600 dark:text-gray-400 font-medium -mt-1">
//           Ratnakar Singh Parihar
//         </span>
//       </div>
//     </div>
//   );

//   // Navigation Item Component
//   const NavItem = ({ item, isMobile = false }) => {
//     const isActive = isActivePath(item.path);
    
//     return (
//       <Link
//         to={item.path}
//         onClick={() => handleNavClick(item.path)}
//         className={`
//           ${isMobile ? 'flex items-center space-x-4 px-4 py-3 rounded-lg text-base' : 'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm'}
//           font-medium transition-all duration-200 relative
//           ${isActive 
//             ? `text-white bg-gradient-to-r ${item.gradient} shadow-md` 
//             : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
//           }
//         `}
//       >
//         <Icon 
//           name={item.icon} 
//           size={isMobile ? 20 : 16} 
//           className={isActive ? "text-white" : "text-gray-600 dark:text-gray-400"}
//         />
//         <span className="font-medium">{item.name}</span>
//       </Link>
//     );
//   };

//   return (
//     <>
//       {/* Loading indicator */}
//       {isLoading && (
//         <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer" />
//       )}

//       {/* Main Header */}
//       <header
//         ref={headerRef}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isVisible ? 'translate-y-0' : '-translate-y-full'
//         } ${
//           isScrolled
//             ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30 shadow-sm"
//             : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm"
//         } ${className}`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14 sm:h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link 
//                 to="/" 
//                 onClick={() => handleNavClick("/")}
//                 className="block"
//                 aria-label="Go to home page"
//               >
//                 <Logo />
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
//               {navigationItems.map((item) => (
//                 <div key={item.path} className="relative">
//                   <NavItem item={item} />
//                 </div>
//               ))}

//               {/* More Menu */}
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
//                   onMouseEnter={handleDropdownMouseEnter}
//                   onMouseLeave={handleDropdownMouseLeave}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
//                   aria-expanded={activeDropdown === 'more'}
//                 >
//                   <Icon name="MoreHorizontal" size={16} />
//                   <span>More</span>
//                 </button>

//                 {activeDropdown === 'more' && (
//                   <div 
//                     className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden"
//                     onMouseEnter={handleDropdownMouseEnter}
//                     onMouseLeave={handleDropdownMouseLeave}
//                     style={{ animation: "fadeIn 0.2s ease-out" }}
//                   >
//                     <div className="p-3">
//                       <div className="space-y-1">
//                         {secondaryItems.map((item) => (
//                           <Link
//                             key={item.path}
//                             to={item.path}
//                             onClick={() => handleNavClick(item.path)}
//                             className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
//                           >
//                             <div className={`p-2 rounded-md bg-gradient-to-br ${item.gradient} bg-opacity-10`}>
//                               <Icon name={item.icon} size={16} className="text-gray-700 dark:text-gray-300" />
//                             </div>
//                             <div>
//                               <p className="font-medium text-sm text-gray-900 dark:text-white">{item.name}</p>
//                               <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
//                             </div>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="border-t border-gray-200 dark:border-gray-800 p-3">
//                       <a
//                         href={resumefile}
//                         download="Ratnakar_Singh_Parihar_Resume.pdf"
//                         className="flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
//                       >
//                         <Icon name="Download" size={16} />
//                         <span>Download Resume</span>
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </nav>

//             {/* Right Actions - Desktop */}
//             <div className="hidden lg:flex items-center space-x-2">
//               <ThemeToggle />
              
//               <a
//                 href={resumefile}
//                 download="Ratnakar_Singh_Parihar_Resume.pdf"
//                 className="ml-2"
//               >
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   iconName="Download"
//                   className="border-gray-300 dark:border-gray-700 hover:border-blue-500/50"
//                 >
//                   Resume
//                 </Button>
//               </a>
              
//               <Link to="/contact">
//                 <Button
//                   variant="default"
//                   size="sm"
//                   iconName="MessageCircle"
//                   className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//                 >
//                   Contact
//                 </Button>
//               </Link>
//             </div>

//             {/* Mobile & Tablet Actions */}
//             <div className="flex lg:hidden items-center space-x-2">
//               <ThemeToggle />
              
//               <a
//                 href={resumefile}
//                 download="Ratnakar_Singh_Parihar_Resume.pdf"
//                 className="hidden sm:block"
//               >
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   iconName="Download"
//                   className="text-sm border-gray-300 dark:border-gray-700"
//                 >
//                   Resume
//                 </Button>
//               </a>
              
//               <button
//                 onClick={toggleMenu}
//                 className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//                 aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//               >
//                 <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-40">
//           {/* Backdrop */}
//           <div 
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//             onClick={closeAll}
//           />
          
//           {/* Menu Panel */}
//           <div
//             ref={menuRef}
//             className="absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300"
//             style={{ 
//               transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
//             }}
//           >
//             {/* Profile Header */}
//             <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-xl flex items-center justify-center border border-gray-200 dark:border-gray-800">
//                     <img
//                       src={logoImg}
//                       alt="Profile"
//                       className="w-10 h-10 object-contain rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-gray-900 dark:text-white">Ratnakar Singh</h3>
//                     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Full Stack Developer</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={closeAll}
//                   className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//                   aria-label="Close menu"
//                 >
//                   <Icon name="X" size={20} />
//                 </button>
//               </div>
//             </div>

//             {/* Scrollable Content */}
//             <div className="h-[calc(100vh-180px)] overflow-y-auto pb-24">
//               <div className="p-4">
//                 {/* Main Navigation */}
//                 <nav className="space-y-1">
//                   {navigationItems.map((item) => (
//                     <div key={item.path}>
//                       <NavItem item={item} isMobile />
//                     </div>
//                   ))}
//                 </nav>

//                 {/* More Pages */}
//                 <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
//                   <h4 className="font-bold text-gray-900 dark:text-white mb-3">
//                     More Pages
//                   </h4>
                  
//                   <div className="grid grid-cols-2 gap-2">
//                     {secondaryItems.map((item) => (
//                       <Link
//                         key={item.path}
//                         to={item.path}
//                         onClick={() => handleNavClick(item.path)}
//                         className="group p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                       >
//                         <div className="flex flex-col items-center text-center">
//                           <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-1`}>
//                             <Icon name={item.icon} size={16} className="text-white" />
//                           </div>
//                           <span className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</span>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Social Links */}
//                 <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
//                   <h5 className="text-center text-sm font-medium text-gray-900 dark:text-white mb-3">
//                     Connect With Me
//                   </h5>
//                   <div className="flex justify-center space-x-3">
//                     {socialLinks.map((social) => (
//                       <a
//                         key={social.name}
//                         href={social.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className={`p-2 rounded-lg text-white ${social.color} transition-colors`}
//                         aria-label={social.name}
//                       >
//                         <Icon name={social.icon} size={18} />
//                       </a>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Action Bar */}
//             <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800">
//               <div className="grid grid-cols-2 gap-2">
//                 <a
//                   href={resumefile}
//                   download="Ratnakar_Singh_Parihar_Resume.pdf"
//                   onClick={closeAll}
//                   className="w-full"
//                 >
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     iconName="Download"
//                     className="w-full border-gray-300 dark:border-gray-700"
//                   >
//                     Resume
//                   </Button>
//                 </a>
//                 <Link
//                   to="/contact"
//                   onClick={closeAll}
//                   className="w-full"
//                 >
//                   <Button
//                     variant="default"
//                     size="sm"
//                     iconName="MessageCircle"
//                     className="w-full bg-gradient-to-r from-blue-500 to-blue-600"
//                   >
//                     Contact
//                   </Button>
//                 </Link>
//               </div>
              
//               {/* Quick Stats */}
//               <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
//                 <div className="grid grid-cols-3 gap-2 text-center">
//                   {[
//                     { value: "5+", label: "Projects", icon: "FolderOpen", color: "text-blue-500" },
//                     { value: "260+", label: "LeetCode", icon: "Code", color: "text-emerald-500" },
//                     { value: "20+", label: "Skills", icon: "Layers", color: "text-purple-500" },
//                   ].map((stat, index) => (
//                     <div key={index} className="flex flex-col items-center">
//                       <div className="flex items-center justify-center space-x-1 mb-1">
//                         <Icon name={stat.icon} size={12} className={stat.color} />
//                         <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
//                       </div>
//                       <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Custom Animations */}
//       <style>{`
//         @keyframes fadeIn {
//           from { 
//             opacity: 0; 
//             transform: translateY(-8px); 
//           }
//           to { 
//             opacity: 1; 
//             transform: translateY(0); 
//           }
//         }
        
//         @keyframes shimmer {
//           0% {
//             background-position: -1000px 0;
//           }
//           100% {
//             background-position: 1000px 0;
//           }
//         }
        
//         .animate-shimmer {
//           animation: shimmer 2s infinite linear;
//           background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
//           background-size: 1000px 100%;
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;


import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";
import { ThemeToggle } from "../ThemeProvider";
import { Link } from "react-router-dom";

// logo
import logoImg from "../../assets/logo/logo.jpeg";

// resume
import resumefile from "../../assets/resume/Ratnakar_Singh_Parihar.pdf";

const Header = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeSection, setActiveSection] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  const navigationItems = [
    { 
      name: "Home", 
      path: "/", 
      icon: "Home", 
      gradient: "from-blue-500 to-cyan-400",
      badge: null
    },
    { 
      name: "About", 
      path: "/about", 
      icon: "User", 
      gradient: "from-purple-500 to-pink-500",
      badge: null
    },
    { 
      name: "Skills", 
      path: "/skills", 
      icon: "Code", 
      gradient: "from-emerald-500 to-green-400",
      badge: "20+"
    },
    { 
      name: "Projects", 
      path: "/projects", 
      icon: "FolderOpen", 
      gradient: "from-orange-500 to-amber-400",
      badge: "5+"
    },
    { 
      name: "Contact", 
      path: "/contact", 
      icon: "Mail", 
      gradient: "from-rose-500 to-red-400",
      badge: null
    },
  ];

  const secondaryItems = [
    { 
      name: "Achievements", 
      path: "/achievements", 
      icon: "Award", 
      desc: "Awards & Recognitions",
      gradient: "from-yellow-400 to-amber-500",
      isNew: false
    },
    { 
      name: "Education", 
      path: "/education", 
      icon: "GraduationCap", 
      desc: "Academic Background",
      gradient: "from-indigo-400 to-blue-500",
      isNew: false
    },
    // { 
    //   name: "Certifications", 
    //   path: "/certifications", 
    //   icon: "BadgeCheck", 
    //   desc: "Professional Certificates",
    //   gradient: "from-green-400 to-emerald-500",
    //   isNew: true
    // },
  ];

  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: "Linkedin", 
      url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/", 
      color: "bg-blue-600 hover:bg-blue-700",
      tooltip: "Connect on LinkedIn"
    },
    { 
      name: "GitHub", 
      icon: "Github", 
      url: "https://github.com/Ratnakar-Singh-parihar-123", 
      color: "bg-gray-800 hover:bg-gray-900",
      tooltip: "View GitHub Profile"
    },
    // { 
    //   name: "LeetCode", 
    //   icon: "Code", 
    //   url: "https://leetcode.com/u/Ratnakar_Singh/", 
    //   color: "bg-amber-600 hover:bg-amber-700",
    //   tooltip: "260+ Problems Solved"
    // },
  ];

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 10);
      
      // Smart hide/show logic
      if (currentScrollY > 100) {
        const scrollDelta = currentScrollY - lastScrollY;
        
        if (scrollDelta > 15 && currentScrollY > 200 && !isMenuOpen) {
          setIsVisible(false);
        } 
        else if (scrollDelta < -10 || currentScrollY < 80) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll, { passive: true });
    
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [lastScrollY, isMenuOpen]);

  // Throttle function for performance
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Set active section based on path
  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  // Close handlers and event listeners
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        closeAll();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeAll();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      clearAllTimeouts();
    };
  }, [isMenuOpen]);

  const clearAllTimeouts = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
  };

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setNotification(null);
    }, 3000);
  }, []);

  const toggleMenu = () => {
    if (!isMenuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 200);
      showNotification("Menu opened", "info");
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      showNotification("Menu closed", "info");
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = useCallback((path, name) => {
    closeAll();
    setIsLoading(true);
    
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      showNotification(`Refreshed ${name} page`, "success");
    } else {
      navigate(path);
      showNotification(`Navigating to ${name}`, "info");
    }
    
    setTimeout(() => setIsLoading(false), 300);
  }, [closeAll, location.pathname, navigate, showNotification]);

  const handleResumeDownload = () => {
    showNotification("Resume download started!", "success");
    // Add download tracking here if needed
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown('more');
  };

  const handleDropdownMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  // Logo Component with animation
  const Logo = () => (
    <div className="flex items-center space-x-3 group cursor-pointer">
      <div className="relative">
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <img
            src={logoImg}
            alt="RSP Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg relative z-10"
            loading="eager"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<div class="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-bold text-lg">R</div>';
            }}
          />
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse">
          <div className="absolute inset-0 bg-green-400/30 rounded-full animate-ping" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-400 transition-all duration-300">
          RSP
        </span>
        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium -mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ratnakar Singh Parihar
        </span>
      </div>
    </div>
  );

  // Navigation Item Component
  const NavItem = ({ item, isMobile = false }) => {
    const isActive = isActivePath(item.path);
    
    return (
      <Link
        to={item.path}
        onClick={() => handleNavClick(item.path, item.name)}
        className={`
          ${isMobile ? 'flex items-center space-x-4 px-4 py-3 rounded-lg text-base' : 'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm'}
          font-medium transition-all duration-200 relative group/nav-item overflow-hidden
          ${isActive 
            ? `text-white bg-gradient-to-r ${item.gradient} shadow-md` 
            : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
          }
        `}
      >
        <div className="relative">
          <Icon 
            name={item.icon} 
            size={isMobile ? 20 : 16} 
            className={isActive ? "text-white" : "text-gray-600 dark:text-gray-400 group-hover/nav-item:text-current"}
          />
          {item.badge && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
        <span className="font-medium">{item.name}</span>
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 animate-pulse" />
        )}
      </Link>
    );
  };

  // Notification Component
  const Notification = () => {
    if (!notification) return null;
    
    const bgColor = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500"
    }[notification.type] || "bg-blue-500";

    return (
      <div className="fixed top-20 right-4 z-[9999] animate-slide-in-right">
        <div className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2`}>
          <Icon name="Bell" size={16} />
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      </div>
    );
  };

  const isActivePath = (path) => {
    if (path === "/") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-shimmer" />
      )}

      {/* Notification */}
      <Notification />

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/30 dark:border-gray-800/30 shadow-xl"
            : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                to="/" 
                onClick={() => handleNavClick("/", "Home")}
                className="block hover:scale-105 transition-transform duration-300"
                aria-label="Go to home page"
              >
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main navigation">
              {navigationItems.map((item) => (
                <div key={item.path} className="relative">
                  <NavItem item={item} />
                </div>
              ))}

              {/* More Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
                  onMouseEnter={handleDropdownMouseEnter}
                  onMouseLeave={handleDropdownMouseLeave}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeDropdown === 'more'
                      ? "text-white bg-gradient-to-r from-indigo-500 to-purple-500 shadow-md"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                  }`}
                  aria-expanded={activeDropdown === 'more'}
                >
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                  <Icon 
                    name="ChevronDown" 
                    size={12} 
                    className={`transition-transform duration-200 ${
                      activeDropdown === 'more' ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {activeDropdown === 'more' && (
                  <div 
                    className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="p-2">
                      <div className="mb-2 px-3 py-2">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Additional Pages
                        </h3>
                      </div>
                      <div className="space-y-1">
                        {secondaryItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => handleNavClick(item.path, item.name)}
                            className="group/more-item flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-[1.02]"
                          >
                            <div className={`relative p-2 rounded-lg bg-gradient-to-br ${item.gradient} bg-opacity-10 group-hover/more-item:bg-opacity-20 transition-all duration-200`}>
                              <Icon name={item.icon} size={16} className="text-gray-700 dark:text-gray-300" />
                              {item.isNew && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] px-1 rounded-full animate-pulse">
                                  NEW
                                </span>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                  {item.name}
                                </p>
                                {item.isNew && (
                                  <span className="bg-red-500 text-white text-[10px] px-1 rounded">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                {item.desc}
                              </p>
                            </div>
                            <Icon name="ChevronRight" size={12} className="text-gray-400" />
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/50">
                      <a
                        href={resumefile}
                        download="Ratnakar_Singh_Parihar_Resume.pdf"
                        onClick={handleResumeDownload}
                        className="group/resume flex items-center justify-center space-x-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                      >
                        <div className="p-1 rounded-md bg-blue-500/10 group-hover/resume:bg-blue-500/20 transition-colors">
                          <Icon name="Download" size={16} />
                        </div>
                        <span>Download Resume</span>
                        <span className="text-xs text-gray-500">(PDF, 2MB)</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-2">
              <ThemeToggle />
              
              <div className="flex items-center space-x-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg text-white ${social.color} transition-all duration-200 hover:scale-110 relative group`}
                    aria-label={social.name}
                    title={social.tooltip}
                  >
                    <Icon name={social.icon} size={16} />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                      {social.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                    </div>
                  </a>
                ))}
              </div>
              
              <a
                href={resumefile}
                download="Ratnakar_Singh_Parihar_Resume.pdf"
                onClick={handleResumeDownload}
                className="ml-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  className="border-gray-300 dark:border-gray-700 hover:border-blue-500/50 hover:shadow-md transition-all duration-200"
                >
                  <span className="hidden sm:inline">Resume</span>
                  <span className="sm:hidden">CV</span>
                </Button>
              </a>
              
              <Link to="/contact">
                <Button
                  variant="default"
                  size="sm"
                  iconName="MessageCircle"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                >
                  Contact
                </Button>
              </Link>
            </div>

            {/* Mobile & Tablet Actions */}
            <div className="flex lg:hidden items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-1">
                {socialLinks.slice(0, 2).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg text-white ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon name={social.icon} size={16} />
                  </a>
                ))}
              </div>
              
              <ThemeToggle />
              
              <a
                href={resumefile}
                download="Ratnakar_Singh_Parihar_Resume.pdf"
                onClick={handleResumeDownload}
                className="hidden sm:block"
              >
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  className="text-sm border-gray-300 dark:border-gray-700 hover:border-blue-500/50"
                >
                  Resume
                </Button>
              </a>
              
              <button
                onClick={toggleMenu}
                className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
                {!isMenuOpen && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-75" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            onClick={closeAll}
          />
          
          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="absolute inset-y-0 right-0 w-full max-w-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl transform transition-all duration-500 ease-out"
            style={{ 
              transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            }}
          >
            {/* Profile Header */}
            <div className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30 p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-2xl flex items-center justify-center border border-gray-200 dark:border-gray-800 shadow-md">
                      <img
                        src={logoImg}
                        alt="Profile"
                        className="w-12 h-12 object-contain rounded-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = '<div class="w-12 h-12 flex items-center justify-center text-blue-600 font-bold text-2xl">R</div>';
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Ratnakar Singh</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Full Stack Developer</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">📍 Available for work</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeAll}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hover:rotate-90 duration-300"
                  aria-label="Close menu"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-[calc(100vh-240px)] overflow-y-auto pb-32 custom-scrollbar">
              <div className="p-6">
                {/* Main Navigation */}
                <nav className="space-y-2">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-2">
                    Main Navigation
                  </h4>
                  {navigationItems.map((item) => (
                    <div key={item.path}>
                      <NavItem item={item} isMobile />
                    </div>
                  ))}
                </nav>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-4">
                    Quick Stats
                  </h4>
                  <div className="grid grid-cols-3 gap-3 px-2">
                    {[
                      { value: "5+", label: "Projects", icon: "FolderOpen", color: "from-blue-500 to-cyan-400" },
                      // { value: "260+", label: "LeetCode", icon: "Code", color: "from-emerald-500 to-green-400" },
                      { value: "20+", label: "Skills", icon: "Layers", color: "from-purple-500 to-pink-500" },
                    ].map((stat, index) => (
                      <div 
                        key={index} 
                        className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-4 rounded-xl shadow-sm text-center group hover:shadow-md transition-all duration-200"
                      >
                        <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 mb-2`}>
                          <Icon name={stat.icon} size={16} className="text-gray-700 dark:text-gray-300" />
                        </div>
                        <p className="text-2xl font-bold bg-gradient-to-br bg-clip-text text-transparent bg-gradient-to-r">
                          {stat.value}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* More Pages */}
                <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-4 mb-4">
                    More Pages
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {secondaryItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => handleNavClick(item.path, item.name)}
                        className="group relative bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] border border-gray-200/50 dark:border-gray-700/50"
                      >
                        {item.isNew && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">
                            NEW
                          </span>
                        )}
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-3 shadow-md`}>
                            <Icon name={item.icon} size={18} className="text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {item.name}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h5 className="text-center text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    Connect With Me
                  </h5>
                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeAll}
                        className={`p-3 rounded-xl text-white ${social.color} transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg`}
                        aria-label={social.name}
                        title={social.tooltip}
                      >
                        <Icon name={social.icon} size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/90 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90 p-6 border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  onClick={() => {
                    handleResumeDownload();
                    closeAll();
                  }}
                  className="w-full"
                >
                  <Button
                    variant="outline"
                    size="default"
                    iconName="Download"
                    className="w-full border-gray-300 dark:border-gray-700 hover:border-blue-500/50 shadow-sm"
                  >
                    Resume
                  </Button>
                </a>
                <Link
                  to="/contact"
                  onClick={closeAll}
                  className="w-full"
                >
                  <Button
                    variant="default"
                    size="default"
                    iconName="MessageCircle"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md"
                  >
                    Contact
                  </Button>
                </Link>
              </div>
              
              {/* Copyright */}
              <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Ratnakar Singh Parihar. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-8px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.4),
            rgba(147, 51, 234, 0.4),
            rgba(59, 130, 246, 0.4),
            transparent
          );
          background-size: 1000px 100%;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.3);
          border-radius: 2px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.5);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Header;