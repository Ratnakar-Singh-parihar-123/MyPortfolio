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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
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
      gradient: "from-blue-500 via-cyan-400 to-teal-400",
      badge: null,
      description: "Welcome to my portfolio",
      mobileDesc: "Home",
    },
    {
      name: "About",
      path: "/about",
      icon: "User",
      gradient: "from-purple-500 via-pink-500 to-rose-400",
      badge: null,
      description: "My journey & passion",
      mobileDesc: "About me",
    },
    {
      name: "Skills",
      path: "/skills",
      icon: "Code",
      gradient: "from-emerald-500 via-green-400 to-teal-400",
      badge: "15+",
      description: "Technologies I master",
      mobileDesc: "My skills",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "FolderOpen",
      gradient: "from-orange-500 via-amber-400 to-yellow-400",
      badge: "8+",
      description: "Latest creations",
      mobileDesc: "My work",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "Mail",
      gradient: "from-rose-500 via-red-400 to-pink-500",
      badge: null,
      description: "Let's connect",
      mobileDesc: "Get in touch",
    },
  ];

  const secondaryItems = [
    {
      name: "Achievements",
      path: "/achievements",
      icon: "Award",
      desc: "Awards & Recognitions",
      mobileDesc: "Awards",
      gradient: "from-yellow-400 via-amber-500 to-orange-500",
      isNew: false,
      stats: "12+ Awards",
    },
    {
      name: "Education",
      path: "/education",
      icon: "GraduationCap",
      desc: "Academic Background",
      mobileDesc: "Education",
      gradient: "from-indigo-400 via-blue-500 to-purple-500",
      isNew: false,
      stats: "B.Tech CSE",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
      tooltip: "Connect on LinkedIn",
      stats: "500+ connections",
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/Ratnakar-Singh-parihar-123",
      color: "bg-gradient-to-br from-gray-800 to-gray-900",
      hoverColor: "hover:from-gray-900 hover:to-black",
      tooltip: "View GitHub Profile",
      stats: "50+ repositories",
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://x.com/RatnakarSi85551",
      color: "bg-gradient-to-br from-sky-500 to-sky-600",
      hoverColor: "hover:from-sky-600 hover:to-sky-700",
      tooltip: "Follow on Twitter",
      stats: "Daily updates",
    },
  ];

  // Window resize handler for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      // Close mobile menu on desktop
      if (window.innerWidth >= 1024 && isMenuOpen) {
        closeAll();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Scroll effect handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10);

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
  }, [lastScrollY, isMenuOpen]);

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
    if (windowWidth < 1024) return; // Disable hover dropdown on mobile
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown("more");
  };

  const handleDropdownMouseLeave = () => {
    if (windowWidth < 1024) return; // Disable hover dropdown on mobile
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  // Enhanced Logo Component with animation
  const Logo = () => (
    <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer">
      <div className="relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />

        {/* Logo container */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg sm:rounded-xl" />
          <img
            src={logoImg}
            alt="RSP Logo"
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain rounded-md sm:rounded-lg relative z-10 transform group-hover:scale-110 transition-transform duration-500"
            loading="eager"
            onError={(e) => {
              e.target.onerror = null;
              e.target.style.display = "none";
              // ✅ Fixed: Use a div instead of Icon component here
              const parent = e.target.parentElement;
              if (parent) {
                const fallbackDiv = document.createElement("div");
                fallbackDiv.className =
                  "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center";
                fallbackDiv.innerHTML =
                  '<span class="text-white font-bold text-base sm:text-lg md:text-xl animate-pulse">R</span>';
                parent.appendChild(fallbackDiv);
              }
            }}
          />
        </div>

        {/* Online indicator */}
        <div className="absolute -top-1 -right-1">
          <div className="relative">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center space-x-1">
          <span className="text-lg sm:text-xl md:text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-500">
            RSP
          </span>
          <span className="hidden xs:inline text-[8px] xs:text-[10px] px-1 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium animate-pulse">
            🧑🏻‍💻
          </span>
        </div>
        <span className="hidden sm:block text-[8px] xs:text-[10px] md:text-xs text-gray-600 dark:text-gray-400 font-medium -mt-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 translate-y-1">
          Ratnakar Singh Parihar
        </span>
      </div>
    </div>
  );

  // Enhanced Navigation Item Component
  const NavItem = ({ item, isMobile = false }) => {
    const isActive = isActivePath(item.path);
    const isHovered = hoveredItem === item.path;

    return (
      <Link
        to={item.path}
        onClick={() => handleNavClick(item.path, item.name)}
        onMouseEnter={() => setHoveredItem(item.path)}
        onMouseLeave={() => setHoveredItem(null)}
        className={`
          relative overflow-hidden
          ${
            isMobile
              ? "flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base"
              : "flex items-center space-x-2 px-3 py-2 rounded-lg text-xs xl:text-sm"
          }
          font-medium transition-all duration-300 group/nav-item
          ${
            isActive
              ? `text-white bg-gradient-to-r ${item.gradient} shadow-lg shadow-${item.gradient.split(" ")[0]}/20`
              : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 backdrop-blur-sm"
          }
        `}
      >
        {/* Hover effect background */}
        {!isActive && isHovered && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-transparent dark:from-gray-800/50 animate-slide-in" />
        )}

        {/* Icon with badge */}
        <div className="relative">
          <div
            className={`
            transition-transform duration-300 
            ${isHovered ? "scale-110 rotate-3" : ""}
          `}
          >
            <Icon
              name={item.icon}
              size={isMobile ? (windowWidth < 640 ? 18 : 20) : 16}
              className={
                isActive
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-400 group-hover/nav-item:text-current"
              }
            />
          </div>
          {item.badge && (
            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[6px] xs:text-[8px] px-1 py-0.5 rounded-full font-bold animate-pulse shadow-lg">
              {item.badge}
            </span>
          )}
        </div>

        <span className="font-medium">
          {isMobile && windowWidth < 640
            ? item.mobileDesc || item.name
            : item.name}
        </span>

        {/* Active indicator */}
        {isActive && (
          <>
            <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-white/60 rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-white/10 rounded-lg sm:rounded-xl animate-pulse" />
          </>
        )}

        {/* Tooltip for desktop */}
        {!isMobile && !isActive && windowWidth >= 1280 && (
          <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/nav-item:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-50">
            {item.description}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 border-4 border-transparent border-b-gray-900" />
          </div>
        )}
      </Link>
    );
  };

  // Notification Component
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

    return (
      <div className="fixed top-16 sm:top-20 right-2 sm:right-4 left-2 sm:left-auto z-[9999] animate-slide-in-right">
        <div
          className={`
          bg-gradient-to-r ${gradients[notification.type] || gradients.info}
          text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl shadow-2xl 
          flex items-center space-x-2 sm:space-x-3
          transform hover:scale-105 transition-transform duration-300
          border border-white/20 backdrop-blur-sm text-sm sm:text-base
          max-w-[calc(100vw-1rem)] sm:max-w-md
        `}
        >
          <div className="relative flex-shrink-0">
            <Icon
              name={icons[notification.type]}
              size={windowWidth < 640 ? 16 : 20}
            />
            <div className="absolute inset-0 animate-ping opacity-50">
              <Icon
                name={icons[notification.type]}
                size={windowWidth < 640 ? 16 : 20}
              />
            </div>
          </div>
          <span className="font-medium flex-1">{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-auto hover:bg-white/20 rounded-full p-1 transition-colors flex-shrink-0"
          >
            <Icon name="X" size={windowWidth < 640 ? 12 : 14} />
          </button>
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
        <div className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 z-[60]">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-blue-500 animate-shimmer" />
        </div>
      )}

      {/* Notification */}
      <Notification />

      {/* Main Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-b border-gray-200/20 dark:border-gray-800/20 shadow-2xl"
            : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
        } ${className}`}
      >
        {/* Gradient line at top */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 to-blue-500" />

        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                onClick={() => handleNavClick("/", "Home")}
                className="block transform hover:scale-105 transition-all duration-500 hover:rotate-1"
                aria-label="Go to home page"
              >
                <Logo />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center space-x-0.5 xl:space-x-1"
              aria-label="Main navigation"
            >
              {navigationItems.map((item) => (
                <div key={item.path} className="relative">
                  <NavItem item={item} />
                </div>
              ))}

              {/* More Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => {
                    if (windowWidth < 1024) {
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
                    flex items-center space-x-1 xl:space-x-2 px-3 xl:px-4 py-2 rounded-lg xl:rounded-xl text-xs xl:text-sm font-medium 
                    transition-all duration-300 relative overflow-hidden group
                    ${
                      activeDropdown === "more"
                        ? "text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/20"
                        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/80 backdrop-blur-sm"
                    }
                  `}
                  aria-expanded={activeDropdown === "more"}
                >
                  <Icon
                    name="MoreHorizontal"
                    size={windowWidth < 1280 ? 14 : 16}
                    className={activeDropdown === "more" ? "animate-pulse" : ""}
                  />
                  <span className="hidden xl:inline">More</span>
                  <Icon
                    name="ChevronDown"
                    size={12}
                    className={`transition-all duration-300 ${
                      activeDropdown === "more"
                        ? "rotate-180 translate-y-0.5"
                        : ""
                    }`}
                  />

                  {/* Pulse effect */}
                  <div className="absolute inset-0 bg-white/10 rounded-lg xl:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                {activeDropdown === "more" && (
                  <div
                    className="absolute top-full right-0 mt-2 w-72 bg-white dark:bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-200/20 dark:border-gray-800/20 backdrop-blur-xl animate-slide-down"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-3 sm:p-4">
                      <h3 className="text-white font-semibold text-sm sm:text-base">
                        Explore More
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm">
                        Discover additional sections
                      </p>
                    </div>

                    {/* Content */}
                    <div className="p-2 sm:p-3 max-h-80 overflow-y-auto custom-scrollbar">
                      <div className="space-y-1 sm:space-y-2">
                        {secondaryItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => handleNavClick(item.path, item.name)}
                            className="group/more-item relative flex items-center space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                          >
                            {/* New badge */}
                            {item.isNew && (
                              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[8px] px-1.5 py-0.5 rounded-full animate-pulse z-10">
                                NEW
                              </span>
                            )}

                            {/* Icon */}
                            <div
                              className={`
                              relative p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient}
                              transform group-hover/more-item:scale-110 group-hover/more-item:rotate-3
                              transition-all duration-300 shadow-lg flex-shrink-0
                            `}
                            >
                              <Icon
                                name={item.icon}
                                size={windowWidth < 640 ? 14 : 16}
                                className="text-white"
                              />
                              <div className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl opacity-0 group-hover/more-item:opacity-100 transition-opacity" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-1">
                                <p className="font-semibold text-gray-900 dark:text-white text-xs sm:text-sm truncate">
                                  {item.name}
                                </p>
                              </div>
                              <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">
                                {windowWidth < 640
                                  ? item.mobileDesc || item.desc
                                  : item.desc}
                              </p>
                              <p className="text-[8px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                                {item.stats}
                              </p>
                            </div>

                            <Icon
                              name="ChevronRight"
                              size={12}
                              className="text-gray-400 group-hover/more-item:translate-x-1 transition-transform flex-shrink-0"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-200 dark:border-gray-800 p-3 sm:p-4 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-gray-800/50">
                      <a
                        href={resumefile}
                        download="Ratnakar_Singh_Parihar_Resume.pdf"
                        onClick={handleResumeDownload}
                        className="group/resume flex items-center justify-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-300 hover:scale-105"
                      >
                        <div className="relative p-1.5 sm:p-2 rounded-lg bg-blue-500/10 group-hover/resume:bg-blue-500/20 transition-colors">
                          <Icon
                            name="Download"
                            size={windowWidth < 640 ? 12 : 14}
                          />
                          <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-ping opacity-0 group-hover/resume:opacity-100" />
                        </div>
                        <span>Download Resume</span>
                        <span className="text-[8px] sm:text-xs px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                          PDF
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              <ThemeToggle />

              {/* Social Links with tooltips */}
              <div className="flex items-center space-x-0.5 xl:space-x-1">
                {socialLinks.slice(0, 3).map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      relative p-2 xl:p-2.5 rounded-lg xl:rounded-xl text-white ${social.color} ${social.hoverColor}
                      transition-all duration-300 hover:scale-110 hover:rotate-3
                      group shadow-lg hover:shadow-xl
                    `}
                    aria-label={social.name}
                  >
                    <Icon
                      name={social.icon}
                      size={windowWidth < 1280 ? 14 : 16}
                    />

                    {/* Tooltip */}
                    {windowWidth >= 1280 && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1.5 text-xs text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none min-w-max">
                        <p className="font-semibold">{social.tooltip}</p>
                        <p className="text-gray-300 text-[8px]">
                          {social.stats}
                        </p>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900" />
                      </div>
                    )}

                    {/* Pulse effect on hover */}
                    <div className="absolute inset-0 bg-white/20 rounded-lg xl:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>

              {/* Resume Button */}
              <a
                href={resumefile}
                download="Ratnakar_Singh_Parihar_Resume.pdf"
                onClick={handleResumeDownload}
                className="group relative"
              >
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  className="border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 hover:shadow-lg text-xs xl:text-sm px-2 xl:px-3"
                >
                  <span className="relative z-10 hidden xl:inline">Resume</span>
                  <span className="relative z-10 xl:hidden">CV</span>
                </Button>
                <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              {/* Contact Button */}
              <Link to="/contact" className="group relative">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="MessageCircle"
                  className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-xs xl:text-sm px-2 xl:px-3"
                >
                  <span className="hidden xl:inline">Contact</span>
                  <span className="xl:hidden">Hire</span>
                </Button>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              </Link>
            </div>

            {/* Mobile & Tablet Actions */}
            <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2">
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
                  className="text-xs sm:text-sm border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 transition-all duration-300 px-2 sm:px-3"
                >
                  <span className="hidden xs:inline">Resume</span>
                  <span className="xs:hidden">CV</span>
                </Button>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="relative p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 group"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <Icon
                  name={isMenuOpen ? "X" : "Menu"}
                  size={windowWidth < 640 ? 18 : 20}
                />

                {/* Notification dot */}
                {!isMenuOpen && (
                  <>
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </>
                )}

                {/* Hover effect */}
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
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
            className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-xl animate-fade-in"
            onClick={closeAll}
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="absolute inset-y-0 right-0 w-full max-w-[280px] xs:max-w-sm bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 shadow-2xl transform transition-all duration-700 ease-out"
            style={{
              transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            {/* Profile Header */}
            <div className="sticky top-0 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-md border-b border-gray-200/30 dark:border-gray-800/30 p-4 sm:p-6 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative flex-shrink-0">
                    {/* Animated background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl blur-lg opacity-50 animate-pulse" />

                    {/* Profile image */}
                    <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300">
                      <img
                        src={logoImg}
                        alt="Profile"
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain rounded-lg sm:rounded-xl"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = "none";
                          // ✅ Fixed: Use a div instead of Icon component here
                          const parent = e.target.parentElement;
                          if (parent) {
                            const fallbackDiv = document.createElement("div");
                            fallbackDiv.className =
                              "w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center";
                            fallbackDiv.innerHTML =
                              '<span class="text-white font-bold text-xl sm:text-2xl animate-pulse">R</span>';
                            parent.appendChild(fallbackDiv);
                          }
                        }}
                      />
                    </div>

                    {/* Online indicator */}
                    <div className="absolute -bottom-1 -right-1">
                      <div className="relative">
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping" />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm sm:text-base md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                      Ratnakar Singh Parihar
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                      <span className="truncate">Full Stack Developer</span>
                    </p>
                    <div className="flex items-center mt-1.5 sm:mt-2">
                      <span className="text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium truncate max-w-[120px] sm:max-w-none">
                        Available for work
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={closeAll}
                  className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:rotate-90 hover:scale-110 group flex-shrink-0"
                  aria-label="Close menu"
                >
                  <Icon name="X" size={windowWidth < 640 ? 16 : 18} />
                  <div className="absolute inset-0 bg-red-500/10 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-[calc(100vh-200px)] sm:h-[calc(100vh-240px)] overflow-y-auto pb-20 sm:pb-32 custom-scrollbar">
              <div className="p-4 sm:p-6">
                {/* Main Navigation */}
                <nav className="space-y-1">
                  <h4 className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 sm:px-4 mb-2 sm:mb-3 flex items-center space-x-1 sm:space-x-2">
                    <span className="w-1 h-3 sm:h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                    <span>Main Navigation</span>
                  </h4>
                  {navigationItems.map((item) => (
                    <div key={item.path}>
                      <NavItem item={item} isMobile />
                    </div>
                  ))}
                </nav>

                {/* More Pages */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h4 className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 sm:px-4 mb-3 sm:mb-4 flex items-center space-x-1 sm:space-x-2">
                    <span className="w-1 h-3 sm:h-4 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
                    <span>More Pages</span>
                  </h4>

                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {secondaryItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => handleNavClick(item.path, item.name)}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl sm:rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                        <div className="relative bg-white dark:bg-gray-800 p-3 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 text-center">
                          {item.isNew && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[6px] sm:text-[8px] px-1 sm:px-2 py-0.5 sm:py-1 rounded-full animate-pulse shadow-lg z-10">
                              NEW
                            </span>
                          )}

                          <div
                            className={`
                            w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto rounded-lg sm:rounded-xl bg-gradient-to-br ${item.gradient}
                            flex items-center justify-center mb-2 sm:mb-3 shadow-lg
                            transform group-hover:scale-110 group-hover:rotate-3
                            transition-all duration-300
                          `}
                          >
                            <Icon
                              name={item.icon}
                              size={windowWidth < 640 ? 14 : 16}
                              className="text-white"
                            />
                          </div>

                          <h5 className="font-bold text-gray-900 dark:text-white text-[10px] sm:text-xs md:text-sm mb-0.5 sm:mb-1 truncate">
                            {windowWidth < 640
                              ? item.mobileDesc || item.name
                              : item.name}
                          </h5>
                          {windowWidth >= 640 && (
                            <p className="text-[8px] sm:text-xs text-gray-500 dark:text-gray-400 mb-1 sm:mb-2 line-clamp-2">
                              {item.desc}
                            </p>
                          )}
                          <p className="text-[6px] sm:text-[10px] font-medium px-1 sm:px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full inline-block">
                            {item.stats}
                          </p>

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <h4 className="text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 sm:px-4 mb-3 sm:mb-4 flex items-center space-x-1 sm:space-x-2">
                    <span className="w-1 h-3 sm:h-4 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                    <span>Connect With Me</span>
                  </h4>

                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeAll}
                        className="group relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg sm:rounded-xl transform group-hover:scale-110 transition-transform duration-300" />
                        <div
                          className={`
                          relative ${social.color} p-2 sm:p-3 rounded-lg sm:rounded-xl text-white
                          transition-all duration-300 hover:rotate-3
                          shadow-lg hover:shadow-xl
                        `}
                        >
                          <Icon
                            name={social.icon}
                            size={windowWidth < 640 ? 16 : 18}
                            className="mx-auto"
                          />

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-1.5 py-1 text-[8px] text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none z-20">
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

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-white/90 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900/90 p-4 sm:p-6 border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-md">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                    size="default"
                    iconName="Download"
                    className="w-full border-2 border-gray-300 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
                  >
                    Resume
                  </Button>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <Link
                  to="/contact"
                  onClick={closeAll}
                  className="group relative"
                >
                  <Button
                    variant="primary"
                    size="default"
                    iconName="MessageCircle"
                    className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-xs sm:text-sm px-2 sm:px-4"
                  >
                    Contact
                  </Button>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                </Link>
              </div>

              {/* Copyright */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200/50 dark:border-gray-800/50">
                <p className="text-center text-[8px] sm:text-xs text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Ratnakar Singh Parihar
                </p>
                <p className="text-center text-[6px] sm:text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 sm:mt-1">
                  Crafted with ❤️ using React
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
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
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
          background: linear-gradient(
            90deg,
            transparent,
            rgba(59, 130, 246, 0.3),
            rgba(147, 51, 234, 0.3),
            rgba(236, 72, 153, 0.3),
            transparent
          );
          background-size: 1000px 100%;
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

        /* Extra small devices (phones, 320px and up) */
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
        }
      `}</style>
    </>
  );
};

export default Header;
