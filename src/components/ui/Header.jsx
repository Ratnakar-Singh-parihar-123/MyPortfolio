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
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const glowRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);
  const notificationTimeoutRef = useRef(null);

  // Responsive breakpoints
  const breakpoints = {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
    macbook13: 1440,
  };

  const navigationItems = [
    {
      name: "Home",
      path: "/",
      icon: "Home",
      gradient: "from-amber-400 via-orange-400 to-red-400",
      glow: "rgba(251, 191, 36, 0.5)",
      badge: null,
      description: "Welcome to my universe",
      mobileDesc: "Home",
      tabletDesc: "Home",
      particle: "✨",
    },
    {
      name: "About",
      path: "/about",
      icon: "User",
      gradient: "from-violet-400 via-purple-400 to-fuchsia-400",
      glow: "rgba(167, 139, 250, 0.5)",
      badge: null,
      description: "My journey & passion",
      mobileDesc: "About",
      tabletDesc: "About",
      particle: "🌟",
    },
    {
      name: "Skills",
      path: "/skills",
      icon: "Code",
      gradient: "from-emerald-400 via-teal-400 to-cyan-400",
      glow: "rgba(52, 211, 153, 0.5)",
      badge: "15+",
      description: "Technologies I master",
      mobileDesc: "Skills",
      tabletDesc: "Skills",
      particle: "⚡",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "FolderOpen",
      gradient: "from-rose-400 via-pink-400 to-orange-400",
      glow: "rgba(251, 113, 133, 0.5)",
      badge: "8+",
      description: "Latest creations",
      mobileDesc: "Projects",
      tabletDesc: "Projects",
      particle: "🚀",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "Mail",
      gradient: "from-sky-400 via-blue-400 to-indigo-400",
      glow: "rgba(56, 189, 248, 0.5)",
      badge: null,
      description: "Let's connect",
      mobileDesc: "Contact",
      tabletDesc: "Contact",
      particle: "💬",
    },
  ];

  const secondaryItems = [
    {
      name: "Achievements",
      path: "/achievements",
      icon: "Award",
      desc: "Awards & Recognitions",
      mobileDesc: "Awards",
      tabletDesc: "Achievements",
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      glow: "rgba(251, 191, 36, 0.5)",
      isNew: true,
      stats: "12+ Awards",
      particle: "🏆",
    },
    {
      name: "Education",
      path: "/education",
      icon: "GraduationCap",
      desc: "Academic Background",
      mobileDesc: "Education",
      tabletDesc: "Education",
      gradient: "from-indigo-400 via-blue-500 to-purple-500",
      glow: "rgba(129, 140, 248, 0.5)",
      isNew: false,
      stats: "B.Tech CSE",
      particle: "🎓",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
      gradient: "from-blue-600 via-blue-500 to-sky-400",
      glow: "rgba(37, 99, 235, 0.5)",
      tooltip: "Let's connect professionally",
      stats: "500+ connections",
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/Ratnakar-Singh-parihar-123",
      gradient: "from-gray-800 via-gray-700 to-gray-600",
      glow: "rgba(75, 85, 99, 0.5)",
      tooltip: "Check my code",
      stats: "50+ repositories",
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://x.com/RatnakarSi85551",
      gradient: "from-sky-500 via-sky-400 to-cyan-400",
      glow: "rgba(14, 165, 233, 0.5)",
      tooltip: "Follow for updates",
      stats: "Daily insights",
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://instagram.com",
      gradient: "from-pink-500 via-purple-500 to-orange-500",
      glow: "rgba(236, 72, 153, 0.5)",
      tooltip: "Behind the scenes",
      stats: "Daily stories",
    },
  ];

  // Mouse move effect for dynamic glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (headerRef.current && windowWidth >= breakpoints.lg) {
        const rect = headerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [windowWidth]);

  // Window resize handler with responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);

      // Close mobile menu on desktop
      if (width >= breakpoints.lg && isMenuOpen) {
        closeAll();
      }

      // Adjust header padding based on screen size
      if (headerRef.current) {
        if (width >= breakpoints["2xl"]) {
          headerRef.current.style.padding = "0 2rem";
        } else if (width >= breakpoints.xl) {
          headerRef.current.style.padding = "0 1.5rem";
        } else if (width >= breakpoints.lg) {
          headerRef.current.style.padding = "0 1rem";
        } else {
          headerRef.current.style.padding = "0 0.75rem";
        }
      }
    };

    handleResize(); // Call once to set initial padding
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Scroll effect with parallax
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

      // Parallax effect for header
      if (headerRef.current && windowWidth >= breakpoints.lg) {
        const scrolled = currentScrollY * 0.3;
        headerRef.current.style.backgroundPosition = `center ${scrolled}px`;
      }

      if (currentScrollY > 100) {
        const scrollDelta = currentScrollY - lastScrollY;
        if (scrollDelta > 15 && currentScrollY > 200 && !isMenuOpen) {
          setIsVisible(false);
        } else if (scrollDelta < -10 || currentScrollY < 80) {
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
  }, [lastScrollY, isMenuOpen, windowWidth]);

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        isMenuOpen
      ) {
        closeAll();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
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
    if (notificationTimeoutRef.current)
      clearTimeout(notificationTimeoutRef.current);
  };

  const closeAll = useCallback(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setHoveredItem(null);
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }, []);

  const showNotification = useCallback((message, type = "info") => {
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
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 200);
      showNotification("Welcome to the menu! 👋", "success");
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      showNotification("See you soon! ✨", "info");
    }
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = useCallback(
    (path, name) => {
      closeAll();
      setIsLoading(true);

      if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        showNotification(`✨ Back to ${name}`, "success");
      } else {
        navigate(path);
        showNotification(`📍 Exploring ${name}`, "info");
      }

      setTimeout(() => setIsLoading(false), 300);
    },
    [closeAll, location.pathname, navigate, showNotification],
  );

  const handleResumeDownload = () => {
    showNotification("📄 Resume download started!", "success");
  };

  const handleDropdownMouseEnter = () => {
    if (windowWidth < breakpoints.lg) return;
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown("more");
  };

  const handleDropdownMouseLeave = () => {
    if (windowWidth < breakpoints.lg) return;
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  // Responsive Logo Component
  const Logo = () => (
    <div className="relative group cursor-pointer perspective-1000">
      {/* Floating particles - hidden on mobile */}
      <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="flex items-center space-x-1.5 xs:space-x-2 sm:space-x-3 md:space-x-4 transform-gpu transition-all duration-700 hover:scale-105">
        {/* 3D Logo Container */}
        <div className="relative preserve-3d">
          {/* Animated rings - hidden on mobile */}
          <div className="absolute inset-0 animate-spin-slow hidden sm:block">
            <div className="absolute inset-0 border border-transparent border-t-blue-500 rounded-full animate-spin" />
            <div className="absolute inset-0 border border-transparent border-b-purple-500 rounded-full animate-spin-reverse" />
          </div>

          {/* Glow effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-xl md:rounded-2xl blur-md sm:blur-xl opacity-0 group-hover:opacity-50 sm:group-hover:opacity-70 transition-all duration-700" />

          {/* Main logo cube */}
          <div className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 transform-gpu rotate-45 group-hover:rotate-180 transition-transform duration-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-2xl group-hover:shadow-3xl transition-all duration-500">
              {/* Inner shine */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-lg sm:rounded-xl md:rounded-2xl" />

              {/* Logo image with perspective */}
              <div className="absolute inset-0.5 xs:inset-1 rounded-md xs:rounded-lg sm:rounded-xl overflow-hidden transform-gpu group-hover:scale-110 transition-transform duration-500">
                <img
                  src={logoImg}
                  alt="RSP Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    const parent = e.target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl">R</div>';
                    }
                  }}
                />
              </div>
            </div>

            {/* Floating orbs */}
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse" />
            <div className="absolute -bottom-1 -left-1 w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-blue-400 rounded-full animate-ping" />
          </div>
        </div>

        {/* Text with gradient animation - responsive sizing */}
        <div className="flex flex-col">
          <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2">
            <span className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-300% animate-gradient">
              RSP
            </span>
            <span className="text-[8px] xs:text-[10px] sm:text-xs px-1 xs:px-1.5 sm:px-2 py-0.5 xs:py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium animate-bounce-gentle shadow-lg">
              🧑🏻‍💻
            </span>
          </div>

          {/* Animated tagline - responsive visibility */}
          <div className="relative h-3 xs:h-4 sm:h-5 overflow-hidden hidden xs:block">
            <div className="absolute animate-slide-up-down">
              <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium block py-0.5">
                Ratnakar Singh
              </span>
              <span className="text-[8px] xs:text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 font-medium block py-0.5">
                Full Stack Dev
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Responsive Navigation Item
  const NavItem = ({ item, isMobile = false }) => {
    const isActive = isActivePath(item.path);
    const isHovered = hoveredItem === item.path;

    const getDisplayName = () => {
      if (isMobile) {
        if (windowWidth < breakpoints.sm) return item.mobileDesc;
        if (windowWidth < breakpoints.md) return item.tabletDesc || item.name;
        return item.name;
      }

      // Desktop responsive text
      if (windowWidth < breakpoints.xl) {
        // Hide text on smaller desktop, show only icon
        return null;
      }
      return item.name;
    };

    const iconSize = isMobile
      ? windowWidth < breakpoints.sm
        ? 16
        : windowWidth < breakpoints.md
          ? 18
          : 20
      : windowWidth < breakpoints.xl
        ? 18
        : 20;

    return (
      <Link
        to={item.path}
        onClick={() => handleNavClick(item.path, item.name)}
        onMouseEnter={() => setHoveredItem(item.path)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`
          relative overflow-hidden group/nav-item
          ${
            isMobile
              ? `flex items-center space-x-2 xs:space-x-3 sm:space-x-4 
                 px-2 xs:px-3 sm:px-4 md:px-5 
                 py-2 xs:py-2.5 sm:py-3 md:py-4 
                 rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl 
                 text-xs xs:text-sm sm:text-sm md:text-base`
              : `flex items-center justify-center
                 px-2 lg:px-2.5 xl:px-3 2xl:px-4 
                 py-1.5 lg:py-2 xl:py-2.5 
                 rounded-lg lg:rounded-xl 
                 text-xs lg:text-sm xl:text-sm 2xl:text-base`
          }
          transition-all duration-500 ease-out
          ${
            isActive
              ? `text-white bg-gradient-to-r ${item.gradient} shadow-lg lg:shadow-xl`
              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          }
        `}
      >
        {/* Animated background with glow */}
        {!isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/nav-item:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-800/50 opacity-0 group-hover/nav-item:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Active glow effect */}
        {isActive && (
          <>
            <div
              className="absolute inset-0 animate-pulse-slow"
              style={{
                background: `radial-gradient(circle at 30% 50%, ${item.glow}, transparent 70%)`,
              }}
            />
            <div className="absolute inset-0 bg-white/10 animate-shimmer" />
          </>
        )}

        {/* Icon with floating animation */}
        <div className="relative flex-shrink-0">
          <div
            className={`
            transform-gpu transition-all duration-500
            ${isHovered ? "scale-110 sm:scale-125 -rotate-6 sm:-rotate-12" : ""}
          `}
          >
            <Icon
              name={item.icon}
              size={iconSize}
              className={
                isActive
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 group-hover/nav-item:text-current"
              }
            />
          </div>

          {/* Particle effect */}
          {isHovered && (
            <span className="absolute -top-1 -right-1 text-[8px] xs:text-[10px] animate-float">
              {item.particle}
            </span>
          )}

          {/* Badge with 3D effect */}
          {item.badge && (
            <span className="absolute -top-1.5 -right-1.5 xs:-top-2 xs:-right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[6px] xs:text-[8px] px-1 xs:px-1.5 py-0.5 rounded-full font-bold shadow-lg animate-pulse-slow transform-gpu group-hover/nav-item:scale-110 transition-transform">
              {item.badge}
            </span>
          )}
        </div>

        {/* Text - hidden on smaller desktop screens */}
        {getDisplayName() && (
          <span
            className={`font-semibold ${!isMobile && windowWidth < breakpoints.xl ? "hidden" : "inline"}`}
          >
            {getDisplayName()}
          </span>
        )}

        {/* Active indicator with liquid effect */}
        {isActive && (
          <>
            <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-white/60 rounded-full animate-pulse-slow" />
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full animate-ping" />
          </>
        )}

        {/* Premium tooltip - only on large screens */}
        {!isMobile && !isActive && windowWidth >= breakpoints["2xl"] && (
          <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 px-3 py-2 bg-gray-900 text-white text-xs rounded-xl opacity-0 group-hover/nav-item:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-2xl z-50">
            <div className="flex items-center space-x-2">
              <span>{item.particle}</span>
              <span>{item.description}</span>
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-b-gray-900" />
          </div>
        )}
      </Link>
    );
  };

  // Responsive Notification Component
  const Notification = () => {
    if (!notification) return null;

    const gradients = {
      success: "from-green-500 to-emerald-500",
      error: "from-red-500 to-rose-500",
      info: "from-blue-500 to-indigo-500",
      warning: "from-yellow-500 to-amber-500",
    };

    const icons = {
      success: "CheckCircle",
      error: "AlertCircle",
      info: "Info",
      warning: "AlertTriangle",
    };

    const getResponsivePosition = () => {
      if (windowWidth < breakpoints.sm) return "top-16 right-2 left-2";
      if (windowWidth < breakpoints.md) return "top-20 right-4";
      return "top-24 right-6";
    };

    return (
      <div
        className={`fixed ${getResponsivePosition()} z-[9999] animate-slide-in-right`}
      >
        <div className="relative group">
          {/* Crystal background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 dark:from-gray-900/20 dark:to-gray-900/5 rounded-lg sm:rounded-xl md:rounded-2xl blur-md sm:blur-xl" />

          <div
            className={`
            relative bg-gradient-to-r ${gradients[notification.type] || gradients.info}
            text-white 
            px-3 xs:px-4 sm:px-5 
            py-2 xs:py-2.5 sm:py-3 
            rounded-lg xs:rounded-xl sm:rounded-2xl 
            shadow-lg sm:shadow-2xl
            flex items-center space-x-2 xs:space-x-2.5 sm:space-x-3
            transform-gpu hover:scale-105 hover:rotate-1
            transition-all duration-500
            border border-white/20 backdrop-blur-sm
            text-xs xs:text-sm sm:text-base
            max-w-[calc(100vw-1rem)] xs:max-w-sm sm:max-w-md
          `}
          >
            {/* Animated icon */}
            <div className="relative flex-shrink-0">
              <Icon
                name={icons[notification.type]}
                size={windowWidth < breakpoints.sm ? 16 : 20}
              />
              <div className="absolute inset-0 animate-ping opacity-50">
                <Icon
                  name={icons[notification.type]}
                  size={windowWidth < breakpoints.sm ? 16 : 20}
                />
              </div>
            </div>

            <span className="font-medium flex-1">{notification.message}</span>

            <button
              onClick={() => setNotification(null)}
              className="ml-auto hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
            >
              <Icon name="X" size={windowWidth < breakpoints.sm ? 12 : 14} />
            </button>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </div>
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

  // Determine if we should show desktop navigation
  const showDesktopNav = windowWidth >= breakpoints.lg;
  const showTabletNav =
    windowWidth >= breakpoints.md && windowWidth < breakpoints.lg;
  const showMobileNav = windowWidth < breakpoints.md;

  return (
    <>
      {/* Loading indicator with prism effect */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-0.5 xs:h-1 z-[60]">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-blue-500 animate-shimmer bg-[length:200%_100%]" />
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl sm:blur-3xl animate-pulse" />
        </div>
      )}

      {/* Dynamic cursor glow - only on large screens */}
      {windowWidth >= breakpoints.lg && (
        <div
          ref={glowRef}
          className="fixed pointer-events-none w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl sm:blur-3xl transition-transform duration-100 z-40 hidden lg:block"
          style={{
            transform: `translate(${mousePosition.x - 128}px, ${mousePosition.y - 128}px)`,
          }}
        />
      )}

      <Notification />

      {/* Main Header with glass morphism */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out transform-gpu ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${className}`}
      >
        {/* Animated background with pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-900/90 dark:to-gray-900/90 backdrop-blur-md sm:backdrop-blur-xl" />

          {/* Animated grid pattern - responsive opacity */}
          <div className="absolute inset-0 opacity-5 sm:opacity-10 dark:opacity-10 sm:dark:opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, gray 1px, transparent 0)`,
                backgroundSize:
                  windowWidth < breakpoints.sm ? "20px 20px" : "40px 40px",
              }}
            />
          </div>

          {/* Floating particles - hidden on mobile */}
          <div className="absolute inset-0 hidden sm:block">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-float-slow"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${30 + i * 10}%`,
                  animationDelay: `${i * 0.5}s`,
                }}
              />
            ))}
          </div>

          {/* Dynamic glow based on mouse - only on large screens */}
          {windowWidth >= breakpoints.lg && (
            <div
              className="absolute inset-0 opacity-20 sm:opacity-30 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.2), transparent 50%)`,
              }}
            />
          )}
        </div>

        {/* Gradient line at top with animation */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-blue-500 animate-gradient-x bg-[length:200%_100%]" />

        <div className="relative max-w-[1400px] 2xl:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 xs:h-14 sm:h-16 md:h-20 lg:h-24">
            {/* Logo with 3D effect */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                onClick={() => handleNavClick("/", "Home")}
                className="block transform-gpu hover:scale-105 transition-all duration-700"
                aria-label="Go to home page"
              >
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation (lg and above) */}
            {showDesktopNav && (
              <nav
                className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 2xl:space-x-2"
                aria-label="Main navigation"
              >
                {navigationItems.map((item) => (
                  <div key={item.path} className="relative">
                    <NavItem item={item} />
                  </div>
                ))}

                {/* Premium More Menu */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => {
                      if (windowWidth < breakpoints.lg) {
                        toggleMenu();
                      } else {
                        setActiveDropdown(
                          activeDropdown === "more" ? null : "more",
                        );
                      }
                    }}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                    className={`
                      relative flex items-center 
                      space-x-1 xl:space-x-2 
                      px-2 xl:px-3 2xl:px-4 
                      py-1.5 lg:py-2 xl:py-2.5 
                      rounded-lg lg:rounded-xl 
                      text-xs lg:text-sm xl:text-sm 2xl:text-base 
                      font-medium transition-all duration-500 overflow-hidden group
                      ${
                        activeDropdown === "more"
                          ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg lg:shadow-xl"
                          : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80"
                      }
                    `}
                    aria-expanded={activeDropdown === "more"}
                  >
                    {/* Hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <Icon
                      name="MoreHorizontal"
                      size={windowWidth < breakpoints.xl ? 16 : 18}
                      className={
                        activeDropdown === "more" ? "animate-pulse" : ""
                      }
                    />
                    <span className="hidden xl:inline 2xl:inline">More</span>
                    <Icon
                      name="ChevronDown"
                      size={windowWidth < breakpoints.xl ? 12 : 14}
                      className={`transition-all duration-500 ${
                        activeDropdown === "more"
                          ? "rotate-180 translate-y-0.5"
                          : ""
                      }`}
                    />

                    {/* Glow effect */}
                    {activeDropdown === "more" && (
                      <div className="absolute inset-0 animate-pulse-slow bg-white/10" />
                    )}
                  </button>

                  {/* Dropdown with crystal effect */}
                  {activeDropdown === "more" && (
                    <div
                      className="absolute top-full right-0 mt-2 lg:mt-3 w-72 lg:w-80 transform-gpu animate-dropdown"
                      onMouseEnter={handleDropdownMouseEnter}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl overflow-hidden border border-white/20 dark:border-gray-800/20">
                        {/* Header with gradient */}
                        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 lg:p-5">
                          <h3 className="text-white font-bold text-sm lg:text-lg flex items-center space-x-2">
                            <span>✨</span>
                            <span>Explore More</span>
                          </h3>
                          <p className="text-white/80 text-xs lg:text-sm mt-0.5 lg:mt-1">
                            Discover amazing content
                          </p>
                        </div>

                        {/* Content with smooth scroll */}
                        <div className="p-2 lg:p-4 max-h-80 lg:max-h-96 overflow-y-auto custom-scrollbar">
                          <div className="space-y-2 lg:space-y-3">
                            {secondaryItems.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() =>
                                  handleNavClick(item.path, item.name)
                                }
                                className="group/more-item relative flex items-center space-x-2 lg:space-x-4 p-2 lg:p-3 rounded-lg lg:rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-500 hover:scale-[1.02]"
                              >
                                {/* New badge with animation */}
                                {item.isNew && (
                                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[8px] lg:text-[10px] px-1 lg:px-2 py-0.5 rounded-full animate-bounce-gentle z-10">
                                    NEW
                                  </span>
                                )}

                                {/* Icon with 3D effect */}
                                <div
                                  className={`
                                  relative p-1.5 lg:p-3 rounded-lg lg:rounded-xl bg-gradient-to-br ${item.gradient}
                                  transform-gpu group-hover/more-item:scale-110 group-hover/more-item:-rotate-6
                                  transition-all duration-500 shadow-md lg:shadow-lg
                                `}
                                >
                                  <Icon
                                    name={item.icon}
                                    size={
                                      windowWidth < breakpoints.lg ? 14 : 18
                                    }
                                    className="text-white"
                                  />
                                  <div className="absolute inset-0 bg-white/20 rounded-lg lg:rounded-xl opacity-0 group-hover/more-item:opacity-100 transition-opacity" />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-1 lg:space-x-2">
                                    <p className="font-bold text-gray-900 dark:text-white text-xs lg:text-sm">
                                      {item.name}
                                    </p>
                                    <span className="text-[10px] lg:text-xs">
                                      {item.particle}
                                    </span>
                                  </div>
                                  <p className="text-[10px] lg:text-xs text-gray-500 dark:text-gray-400 truncate">
                                    {windowWidth < breakpoints.md
                                      ? item.mobileDesc || item.desc
                                      : item.desc}
                                  </p>
                                  <p className="text-[8px] lg:text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 lg:mt-1">
                                    {item.stats}
                                  </p>
                                </div>

                                <Icon
                                  name="ChevronRight"
                                  size={windowWidth < breakpoints.lg ? 10 : 14}
                                  className="text-gray-400 group-hover/more-item:translate-x-1 transition-transform flex-shrink-0"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Footer with resume download */}
                        <div className="border-t border-gray-200 dark:border-gray-800 p-2 lg:p-4 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/50">
                          <a
                            href={resumefile}
                            download="Ratnakar_Singh_Parihar_Resume.pdf"
                            onClick={handleResumeDownload}
                            className="group/resume flex items-center justify-center space-x-2 lg:space-x-3 text-xs lg:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-500 hover:scale-105"
                          >
                            <div className="relative p-1 lg:p-2 rounded-lg bg-blue-500/10 group-hover/resume:bg-blue-500/20 transition-colors">
                              <Icon
                                name="Download"
                                size={windowWidth < breakpoints.lg ? 12 : 16}
                              />
                              <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-ping opacity-0 group-hover/resume:opacity-100" />
                            </div>
                            <span>Download Resume</span>
                            <span className="text-[8px] lg:text-xs px-1 lg:px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                              PDF
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            )}

            {/* Right Actions - Desktop (lg and above) */}
            {showDesktopNav && (
              <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 2xl:space-x-3">
                <ThemeToggle />

                {/* Social Links with 3D effect - responsive count */}
                <div className="flex items-center space-x-0.5 xl:space-x-1">
                  {socialLinks
                    .slice(0, windowWidth < breakpoints.xl ? 3 : 4)
                    .map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                        relative p-1.5 lg:p-2 xl:p-2.5 rounded-lg lg:rounded-xl text-white
                        transition-all duration-500 hover:scale-110 hover:-translate-y-1
                        group shadow-md lg:shadow-lg hover:shadow-xl lg:hover:shadow-2xl
                        bg-gradient-to-br ${social.gradient}
                      `}
                        aria-label={social.name}
                      >
                        <Icon
                          name={social.icon}
                          size={windowWidth < breakpoints.xl ? 14 : 16}
                        />

                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-white/20 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* Floating particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                          <div className="absolute -top-1 -right-1 w-0.5 h-0.5 bg-white rounded-full animate-ping" />
                        </div>

                        {/* Premium tooltip - only on large screens */}
                        {windowWidth >= breakpoints["2xl"] && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 lg:mb-3 px-2 lg:px-3 py-1 lg:py-2 text-[10px] lg:text-xs text-white bg-gray-900 rounded-lg lg:rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none min-w-max shadow-xl lg:shadow-2xl">
                            <p className="font-semibold">{social.tooltip}</p>
                            <p className="text-gray-300 text-[8px] lg:text-[10px] mt-0.5 lg:mt-1">
                              {social.stats}
                            </p>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                          </div>
                        )}
                      </a>
                    ))}
                </div>

                {/* Resume Button with shine effect */}
                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  onClick={handleResumeDownload}
                  className="group relative"
                >
                  <Button
                    variant="outline"
                    size={windowWidth < breakpoints.xl ? "xs" : "sm"}
                    iconName="Download"
                    className="border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 hover:scale-105 text-xs lg:text-sm px-2 lg:px-3 xl:px-4 py-1 lg:py-1.5 xl:py-2 relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center space-x-1 lg:space-x-2">
                      <span className="hidden xl:inline">cv</span>
                      <span className="xl:hidden">CV</span>
                      <span className="text-[8px] lg:text-xs px-1 lg:px-1.5 py-0.5 bg-blue-500 text-white rounded-full">
                        PDF
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </Button>
                </a>

                {/* Contact Button with glow */}
                <Link to="/contact" className="group relative">
                  <Button
                    variant="primary"
                    size={windowWidth < breakpoints.xl ? "xs" : "sm"}
                    iconName="MessageCircle"
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl lg:shadow-xl lg:hover:shadow-2xl transition-all duration-500 hover:scale-105 text-xs lg:text-sm px-2 lg:px-3 xl:px-5 py-1 lg:py-1.5 xl:py-2"
                  >
                    <span className="flex items-center space-x-1 lg:space-x-2">
                      <span className="hidden xl:inline"></span>
                      <span className="xl:hidden">Hire</span>
                      <span className="text-[8px] lg:text-xs animate-pulse">
                        ✨
                      </span>
                    </span>
                  </Button>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md lg:blur-xl opacity-0 group-hover:opacity-30 lg:group-hover:opacity-50 transition-opacity" />
                </Link>
              </div>
            )}

            {/* Tablet Navigation (md to lg) */}
            {showTabletNav && (
              <div className="hidden md:flex lg:hidden items-center space-x-2">
                <ThemeToggle />

                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  onClick={handleResumeDownload}
                  className="block"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    className="text-xs border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 px-2"
                  >
                    <span>CV</span>
                  </Button>
                </a>

                <Link to="/contact">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="MessageCircle"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-xs px-2"
                  >
                    <span>Hire</span>
                  </Button>
                </Link>

                {/* Tablet Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 hover:scale-110 group"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <div className="relative">
                    <Icon name={isMenuOpen ? "X" : "Menu"} size={18} />

                    {/* Animated rings */}
                    {!isMenuOpen && (
                      <>
                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping" />
                        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      </>
                    )}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}

            {/* Mobile Actions (below md) */}
            {showMobileNav && (
              <div className="flex md:hidden items-center space-x-1 xs:space-x-2">
                <ThemeToggle />

                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  onClick={handleResumeDownload}
                  className="block"
                >
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="Download"
                    className="text-[10px] xs:text-xs border border-gray-300 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 px-1.5 xs:px-2"
                  >
                    <span className="hidden xs:inline">Resume</span>
                    <span className="xs:hidden">CV</span>
                  </Button>
                </a>

                {/* Premium Mobile Menu Button */}
                <button
                  onClick={toggleMenu}
                  className="relative p-1.5 xs:p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 hover:scale-110 group"
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                  <div className="relative">
                    <Icon name={isMenuOpen ? "X" : "Menu"} size={16} />

                    {/* Animated rings */}
                    {!isMenuOpen && (
                      <>
                        <div className="absolute -top-1 -right-1 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping" />
                        <div className="absolute -top-1 -right-1 w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                      </>
                    )}
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Premium Mobile/Tablet Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Animated backdrop */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-md sm:backdrop-blur-xl animate-fade-in"
            onClick={closeAll}
          >
            <div className="absolute inset-0 opacity-10 sm:opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize:
                    windowWidth < breakpoints.sm ? "30px 30px" : "50px 50px",
                }}
              />
            </div>
          </div>

          {/* Menu Panel with 3D effect */}
          <div
            ref={menuRef}
            className="absolute inset-y-0 right-0 w-full max-w-[280px] xs:max-w-sm sm:max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl transform-gpu transition-all duration-700 ease-out"
            style={{
              transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            {/* Profile Header with crystal effect */}
            <div className="sticky top-0 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30 p-4 xs:p-5 sm:p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 xs:space-x-4">
                  <div className="relative group flex-shrink-0">
                    {/* Animated rings */}
                    <div className="absolute inset-0 animate-spin-slow">
                      <div className="absolute inset-0 border border-transparent border-t-blue-500 rounded-xl sm:rounded-2xl animate-spin" />
                      <div className="absolute inset-0 border border-transparent border-b-purple-500 rounded-xl sm:rounded-2xl animate-spin-reverse" />
                    </div>

                    {/* Profile image with 3D effect */}
                    <div className="relative w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl sm:shadow-2xl transform-gpu group-hover:rotate-6 transition-transform duration-500">
                      <img
                        src={logoImg}
                        alt="Profile"
                        className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 object-cover rounded-lg sm:rounded-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          const parent = e.target.parentElement;
                          if (parent) {
                            parent.innerHTML =
                              '<div class="w-full h-full flex items-center justify-center text-white font-bold text-base xs:text-lg sm:text-xl">R</div>';
                          }
                        }}
                      />
                    </div>

                    {/* Status indicator */}
                    <div className="absolute -bottom-1 -right-1">
                      <div className="relative">
                        <div className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm xs:text-base sm:text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                      Ratnakar Singh
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-1">
                      <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                      <span className="truncate">Full Stack Developer</span>
                    </p>
                    <div className="flex items-center mt-1 xs:mt-2">
                      <span className="text-[8px] xs:text-[10px] sm:text-xs px-1.5 xs:px-2 py-0.5 xs:py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium truncate max-w-[100px] xs:max-w-none">
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeAll}
                  className="p-1.5 xs:p-2 rounded-lg xs:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500 hover:rotate-90 hover:scale-110 group flex-shrink-0"
                  aria-label="Close menu"
                >
                  <Icon
                    name="X"
                    size={windowWidth < breakpoints.sm ? 16 : 18}
                  />
                  <div className="absolute inset-0 bg-red-500/10 rounded-lg xs:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Scrollable Content with custom scrollbar */}
            <div className="h-[calc(100vh-120px)] xs:h-[calc(100vh-140px)] sm:h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
              <div className="p-4 xs:p-5 sm:p-6">
                {/* Main Navigation */}
                <nav className="space-y-1 xs:space-y-2">
                  <h4 className="text-[10px] xs:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 xs:px-3 mb-2 xs:mb-3 flex items-center space-x-1 xs:space-x-2">
                    <span className="w-1 h-3 xs:h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    <span>Main Navigation</span>
                  </h4>
                  {navigationItems.map((item) => (
                    <div key={item.path}>
                      <NavItem item={item} isMobile />
                    </div>
                  ))}
                </nav>

                {/* More Pages with grid layout */}
                <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h4 className="text-[10px] xs:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 xs:px-3 mb-3 xs:mb-4 flex items-center space-x-1 xs:space-x-2">
                    <span className="w-1 h-3 xs:h-4 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
                    <span>More Pages</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                    {secondaryItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => handleNavClick(item.path, item.name)}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl transform-gpu group-hover:scale-105 transition-transform duration-500" />
                        <div className="relative bg-white dark:bg-gray-800 p-2 xs:p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 text-center">
                          {item.isNew && (
                            <span className="absolute -top-1.5 -right-1.5 xs:-top-2 xs:-right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[8px] xs:text-[10px] px-1 xs:px-2 py-0.5 xs:py-1 rounded-full animate-bounce-gentle shadow-lg z-10">
                              NEW
                            </span>
                          )}

                          <div
                            className={`
                            w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 mx-auto rounded-lg xs:rounded-xl bg-gradient-to-br ${item.gradient}
                            flex items-center justify-center mb-1 xs:mb-2 sm:mb-3 shadow-md sm:shadow-lg
                            transform-gpu group-hover:scale-110 group-hover:-rotate-6
                            transition-all duration-500
                          `}
                          >
                            <Icon
                              name={item.icon}
                              size={
                                windowWidth < breakpoints.sm
                                  ? 14
                                  : windowWidth < breakpoints.md
                                    ? 16
                                    : 20
                              }
                              className="text-white"
                            />
                          </div>

                          <h5 className="font-bold text-gray-900 dark:text-white text-[10px] xs:text-xs sm:text-sm mb-0.5 xs:mb-1 truncate">
                            {windowWidth < breakpoints.sm
                              ? item.mobileDesc || item.name
                              : item.name}
                          </h5>
                          {windowWidth >= breakpoints.sm && (
                            <p className="text-[8px] xs:text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1 sm:mb-2 line-clamp-2">
                              {item.desc}
                            </p>
                          )}
                          <p className="text-[6px] xs:text-[8px] sm:text-[10px] font-medium px-1 xs:px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full inline-block">
                            {item.stats}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Links with premium styling */}
                <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h4 className="text-[10px] xs:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-2 xs:px-3 mb-3 xs:mb-4 flex items-center space-x-1 xs:space-x-2">
                    <span className="w-1 h-3 xs:h-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                    <span>Connect With Me</span>
                  </h4>

                  <div className="grid grid-cols-4 gap-2 xs:gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeAll}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg xs:rounded-xl transform-gpu group-hover:scale-110 transition-transform duration-500" />
                        <div
                          className={`
                          relative bg-gradient-to-br ${social.gradient}
                          p-1.5 xs:p-2 sm:p-3 rounded-lg xs:rounded-xl text-white
                          transition-all duration-500 hover:-translate-y-1
                          shadow-md xs:shadow-lg hover:shadow-xl
                        `}
                        >
                          <Icon
                            name={social.icon}
                            size={
                              windowWidth < breakpoints.sm
                                ? 14
                                : windowWidth < breakpoints.md
                                  ? 16
                                  : 20
                            }
                            className="mx-auto"
                          />

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 xs:mb-2 px-1 xs:px-2 py-0.5 xs:py-1 text-[8px] xs:text-[10px] text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20">
                            {social.name}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Action Bar with glass effect */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/90 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90 p-3 xs:p-4 sm:p-6 border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                  onClick={() => {
                    handleResumeDownload();
                    closeAll();
                  }}
                  className="group relative"
                >
                  <Button
                    variant="outline"
                    size={windowWidth < breakpoints.sm ? "xs" : "sm"}
                    iconName="Download"
                    className="w-full border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-500 hover:scale-105 text-[10px] xs:text-xs sm:text-sm"
                  >
                    Resume
                  </Button>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-md xs:blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <Link
                  to="/contact"
                  onClick={closeAll}
                  className="group relative"
                >
                  <Button
                    variant="primary"
                    size={windowWidth < breakpoints.sm ? "xs" : "sm"}
                    iconName="MessageCircle"
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-md xs:shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 text-[10px] xs:text-xs sm:text-sm"
                  >
                    Contact
                  </Button>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-md xs:blur-xl opacity-0 group-hover:opacity-30 xs:group-hover:opacity-50 transition-opacity" />
                </Link>
              </div>

              {/* Copyright with animation */}
              <div className="mt-3 xs:mt-4 sm:mt-6 pt-2 xs:pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                <p className="text-center text-[8px] xs:text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Ratnakar Singh Parihar
                </p>
                <p className="text-center text-[6px] xs:text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 xs:mt-1 animate-pulse">
                  Crafted with ❤️ using React
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Premium Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100%) translateY(-50%);
          }
          to {
            opacity: 1;
            transform: translateX(0) translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(90deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        @keyframes slide-up-down {
          0% {
            transform: translateY(0);
          }
          25% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(-100%);
          }
          75% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes dropdown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite linear;
          background-size: 200% 100%;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
          background-size: 300% 300%;
        }

        .animate-float {
          animation: float 2s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 6s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 6s linear infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 1.5s ease-in-out infinite;
        }

        .animate-slide-up-down {
          animation: slide-up-down 5s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-dropdown {
          animation: dropdown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .bg-300\% {
          background-size: 300% 300%;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        /* Extra small devices (320px and up) */
        @media (min-width: 320px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
          .xs\\:max-w-sm {
            max-width: 24rem;
          }
          .xs\\:text-xs {
            font-size: 0.75rem;
          }
          .xs\\:text-sm {
            font-size: 0.875rem;
          }
          .xs\\:px-2 {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          .xs\\:py-1 {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
          }
        }

        /* Small devices (640px and up) */
        @media (min-width: 640px) {
          .sm\\:text-sm {
            font-size: 0.875rem;
          }
          .sm\\:text-base {
            font-size: 1rem;
          }
          .sm\\:px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        /* Medium devices (768px and up) */
        @media (min-width: 768px) {
          .md\\:text-base {
            font-size: 1rem;
          }
          .md\\:text-lg {
            font-size: 1.125rem;
          }
          .md\\:px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }

        /* Large devices (1024px and up) */
        @media (min-width: 1024px) {
          .lg\\:text-lg {
            font-size: 1.125rem;
          }
          .lg\\:text-xl {
            font-size: 1.25rem;
          }
          .lg\\:px-8 {
            padding-left: 2rem;
            padding-right: 2rem;
          }
        }

        /* Extra large devices (1280px and up) */
        @media (min-width: 1280px) {
          .xl\\:text-xl {
            font-size: 1.25rem;
          }
          .xl\\:text-2xl {
            font-size: 1.5rem;
          }
        }

        /* 2XL devices (1536px and up) */
        @media (min-width: 1536px) {
          .\\32xl\\:text-2xl {
            font-size: 1.5rem;
          }
          .\\32xl\\:text-3xl {
            font-size: 1.875rem;
          }
        }

        /* MacBook 13-inch specific (1440px) */
        @media (min-width: 1440px) and (max-width: 1535px) {
          .mac\\:text-lg {
            font-size: 1.125rem;
          }
          .mac\\:text-xl {
            font-size: 1.25rem;
          }
          .mac\\:px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
