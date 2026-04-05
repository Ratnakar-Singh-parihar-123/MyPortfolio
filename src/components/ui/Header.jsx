import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "../AppIcon";
import Button from "./Button";
import { ThemeToggle } from "../ThemeProvider";
import { Link } from "react-router-dom";

// logo
import logoImg from "../../assets/logo/logo.jpeg";

// resume
import resumefile from "../../assets/resume/Ratnakar_Singh_Parihar.pdf";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Search Data - All pages content for search
const searchData = [
  // Home Page
  {
    id: "home-1",
    title: "Home",
    path: "/",
    category: "Page",
    description:
      "Welcome to my portfolio - Ratnakar Singh Parihar, Full Stack Developer",
    keywords: ["home", "welcome", "portfolio", "introduction"],
    icon: "Home",
  },

  // About Page
  {
    id: "about-1",
    title: "About Me",
    path: "/about",
    category: "Page",
    description:
      "Learn about my journey, passion for coding, and professional background",
    keywords: ["about", "bio", "journey", "background", "passion"],
    icon: "User",
  },

  // Skills Page
  {
    id: "skills-1",
    title: "Skills",
    path: "/skills",
    category: "Page",
    description:
      "My technical skills: React, Node.js, MongoDB, Express, Tailwind CSS, and more",
    keywords: [
      "skills",
      "technologies",
      "react",
      "node",
      "mongodb",
      "express",
      "mern",
    ],
    icon: "Code",
  },
  {
    id: "skills-2",
    title: "Frontend Skills",
    path: "/skills",
    category: "Skill",
    description:
      "React, Next.js, Tailwind CSS, Framer Motion, Redux, HTML5, CSS3, JavaScript",
    keywords: ["frontend", "react", "nextjs", "tailwind", "framer", "redux"],
    icon: "Monitor",
  },
  {
    id: "skills-3",
    title: "Backend Skills",
    path: "/skills",
    category: "Skill",
    description:
      "Node.js, Express.js, MongoDB, PostgreSQL, REST APIs, Socket.io, JWT",
    keywords: ["backend", "node", "express", "mongodb", "api", "socket"],
    icon: "Server",
  },
  {
    id: "skills-4",
    title: "Mobile Development",
    path: "/skills",
    category: "Skill",
    description:
      "React Native, Flutter, iOS, Android, Cross-platform development",
    keywords: ["mobile", "react native", "flutter", "ios", "android"],
    icon: "Smartphone",
  },

  // Projects Page
  {
    id: "projects-1",
    title: "All Projects",
    path: "/projects",
    category: "Page",
    description: "Explore my portfolio of web applications and mobile apps",
    keywords: ["projects", "portfolio", "work", "showcase"],
    icon: "FolderOpen",
  },
  {
    id: "project-vsbp",
    title: "Vehicle Service Booking Platform",
    path: "/projects",
    category: "Project",
    description:
      "Full-stack MERN app for booking vehicle services with real-time tracking",
    keywords: ["vehicle", "service", "booking", "mern", "real-time", "vsbp"],
    icon: "Car",
    projectType: "fullstack",
  },
  {
    id: "project-yammiverse",
    title: "YammiVerse",
    path: "/projects",
    category: "Project",
    description:
      "Recipe sharing platform for food enthusiasts to discover and share recipes",
    keywords: ["recipe", "food", "cooking", "share", "yammiverse"],
    icon: "Utensils",
    projectType: "react",
  },
  {
    id: "project-jeevandaan",
    title: "Jeevandaan",
    path: "/projects",
    category: "Project",
    description:
      "Healthcare platform for blood and organ donation with real-time matching",
    keywords: [
      "blood",
      "organ",
      "donation",
      "healthcare",
      "emergency",
      "jeevandaan",
    ],
    icon: "Heart",
    projectType: "fullstack",
  },
  {
    id: "project-textutils",
    title: "TextUtils",
    path: "/projects",
    category: "Project",
    description:
      "React-based text utility app for text transformations and analysis",
    keywords: ["text", "utility", "convert", "analyze", "textutils"],
    icon: "FileText",
    projectType: "react",
  },
  {
    id: "project-portfolio",
    title: "Personal Portfolio",
    path: "/projects",
    category: "Project",
    description: "Modern developer portfolio with dark mode and animations",
    keywords: ["portfolio", "personal", "website", "developer"],
    icon: "User",
    projectType: "react",
  },
  {
    id: "project-spicecraft",
    title: "SpiceCraft Traders",
    path: "/projects",
    category: "Project",
    description: "Responsive HTML/CSS website for a spice brand",
    keywords: ["spice", "ecommerce", "html", "css", "brand"],
    icon: "ShoppingBag",
    projectType: "htmlcss",
  },
  {
    id: "project-flavorbite",
    title: "FlavorBite Restaurant",
    path: "/projects",
    category: "Project",
    description: "Modern restaurant landing page with menu and gallery",
    keywords: ["restaurant", "food", "landing", "menu"],
    icon: "Utensils",
    projectType: "htmlcss",
  },
  {
    id: "project-edumentor",
    title: "EduMentor Coaching",
    path: "/projects",
    category: "Project",
    description: "Coaching website with courses and testimonials",
    keywords: ["coaching", "education", "courses", "learning"],
    icon: "GraduationCap",
    projectType: "htmlcss",
  },
  {
    id: "project-tiffin",
    title: "Tiffin Delivery App",
    path: "/projects",
    category: "Project",
    description: "Food delivery web app with user authentication",
    keywords: ["tiffin", "delivery", "food", "authentication"],
    icon: "Package",
    projectType: "react",
  },
  {
    id: "app-foodiehub",
    title: "FoodieHub",
    path: "/projects",
    category: "Mobile App",
    description:
      "Food delivery app for iOS and Android with real-time tracking",
    keywords: ["food", "delivery", "mobile", "ios", "android", "foodiehub"],
    icon: "Smartphone",
    platform: "mobile",
  },
  {
    id: "app-fitlife",
    title: "FitLife",
    path: "/projects",
    category: "Mobile App",
    description: "Fitness tracking app with workout plans and nutrition guide",
    keywords: ["fitness", "workout", "health", "tracking", "fitlife"],
    icon: "Activity",
    platform: "mobile",
  },
  {
    id: "app-shopease",
    title: "ShopEase",
    path: "/projects",
    category: "Mobile App",
    description: "E-commerce app with seamless shopping experience",
    keywords: ["ecommerce", "shopping", "mobile", "shop", "shopease"],
    icon: "ShoppingBag",
    platform: "mobile",
  },
  {
    id: "app-socialcircle",
    title: "SocialCircle",
    path: "/projects",
    category: "Mobile App",
    description: "Social media app with stories, reels, and messaging",
    keywords: ["social", "media", "chat", "stories", "socialcircle"],
    icon: "MessageCircle",
    platform: "mobile",
  },

  // Achievements Page
  {
    id: "achievements-1",
    title: "Achievements",
    path: "/achievements",
    category: "Page",
    description: "My awards, certifications, and recognitions",
    keywords: ["achievements", "awards", "certifications", "recognition"],
    icon: "Award",
  },
  {
    id: "achievement-hackathon",
    title: "Hackathon Winner",
    path: "/achievements",
    category: "Achievement",
    description:
      "Winner of XYZ Hackathon 2024 for innovative healthcare solution",
    keywords: ["hackathon", "winner", "competition", "award"],
    icon: "Trophy",
  },
  {
    id: "achievement-certification",
    title: "MERN Stack Certification",
    path: "/achievements",
    category: "Achievement",
    description: "Certified Full Stack Developer from recognized institution",
    keywords: ["certification", "mern", "full stack", "certified"],
    icon: "Award",
  },

  // Education Page
  {
    id: "education-1",
    title: "Education",
    path: "/education",
    category: "Page",
    description: "My academic background and qualifications",
    keywords: ["education", "academic", "qualification", "degree"],
    icon: "GraduationCap",
  },
  {
    id: "education-btech",
    title: "B.Tech Computer Science",
    path: "/education",
    category: "Education",
    description: "Bachelor of Technology in Computer Science and Engineering",
    keywords: ["btech", "computer science", "engineering", "degree"],
    icon: "GraduationCap",
  },

  // Contact Page
  {
    id: "contact-1",
    title: "Contact",
    path: "/contact",
    category: "Page",
    description: "Get in touch with me for collaborations or opportunities",
    keywords: ["contact", "email", "message", "reach", "connect"],
    icon: "Mail",
  },
  {
    id: "contact-email",
    title: "Email",
    path: "/contact",
    category: "Contact",
    description: "ratnakarsinghparihar9399@gmail.com",
    keywords: ["email", "mail", "contact"],
    icon: "Mail",
    isContact: true,
  },
  {
    id: "contact-linkedin",
    title: "LinkedIn",
    path: "/contact",
    category: "Contact",
    description: "Connect with me professionally on LinkedIn",
    keywords: ["linkedin", "professional", "network"],
    icon: "Linkedin",
    externalUrl:
      "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
  },
  {
    id: "contact-github",
    title: "GitHub",
    path: "/contact",
    category: "Contact",
    description: "Check out my code and projects on GitHub",
    keywords: ["github", "code", "repository", "projects"],
    icon: "Github",
    externalUrl: "https://github.com/Ratnakar-Singh-parihar-123",
  },
];

const Header = ({ className = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("/");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  // Search Modal State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Refs for GSAP animations
  const headerRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const dropdownRef = useRef(null);
  const menuItemsRef = useRef([]);
  const socialLinksRef = useRef([]);

  // Timeline refs
  const menuTimeline = useRef(null);
  const headerTimeline = useRef(null);

  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  };

  const navigationItems = [
    {
      name: "Home",
      path: "/",
      icon: "Home",
      gradient: "from-amber-500 to-orange-500",
      description: "Welcome",
      color: "#F59E0B",
    },
    {
      name: "About",
      path: "/about",
      icon: "User",
      gradient: "from-violet-500 to-purple-500",
      description: "My story",
      color: "#8B5CF6",
    },
    {
      name: "Skills",
      path: "/skills",
      icon: "Code",
      gradient: "from-emerald-500 to-teal-500",
      description: "Tech stack",
      color: "#10B981",
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "FolderOpen",
      gradient: "from-rose-500 to-pink-500",
      description: "My work",
      color: "#F43F5E",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "Mail",
      gradient: "from-sky-500 to-blue-500",
      description: "Get in touch",
      color: "#0EA5E9",
    },
  ];

  const secondaryItems = [
    {
      name: "Achievements",
      path: "/achievements",
      icon: "Award",
      desc: "Awards & recognition",
      gradient: "from-yellow-500 to-orange-500",
      isNew: true,
      stats: "12+ Awards",
    },
    {
      name: "Education",
      path: "/education",
      icon: "GraduationCap",
      desc: "Academic background",
      gradient: "from-indigo-500 to-purple-500",
      isNew: false,
      stats: "B.Tech CSE",
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: "Linkedin",
      url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
      bgColor: "bg-[#0077B5]",
      hoverColor: "hover:bg-[#0077B5]",
    },
    {
      name: "GitHub",
      icon: "Github",
      url: "https://github.com/Ratnakar-Singh-parihar-123",
      bgColor: "bg-[#333]",
      hoverColor: "hover:bg-[#333]",
    },
    {
      name: "Twitter",
      icon: "Twitter",
      url: "https://x.com/RatnakarSi85551",
      bgColor: "bg-[#1DA1F2]",
      hoverColor: "hover:bg-[#1DA1F2]",
    },
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://www.instagram.com/krishna_singh_pratihar/",
      bgColor: "bg-gradient-to-r from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700",
    },
  ];

  // Search Functionality
  const handleSearch = useCallback((query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchData.filter((item) => {
      // Search in title
      if (item.title.toLowerCase().includes(lowerQuery)) return true;
      // Search in description
      if (item.description.toLowerCase().includes(lowerQuery)) return true;
      // Search in keywords
      if (
        item.keywords?.some((keyword) =>
          keyword.toLowerCase().includes(lowerQuery),
        )
      )
        return true;
      return false;
    });

    // Sort results by relevance
    const sortedResults = results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().includes(lowerQuery);
      const bTitleMatch = b.title.toLowerCase().includes(lowerQuery);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    setSearchResults(sortedResults);
    setSelectedIndex(-1);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSearchOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < searchResults.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        case "Escape":
          closeSearch();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, searchResults, selectedIndex]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex >= 0 && searchResultsRef.current) {
      const selectedElement = searchResultsRef.current.children[selectedIndex];
      selectedElement?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  const handleResultClick = (result) => {
    if (result.externalUrl) {
      window.open(result.externalUrl, "_blank");
    } else {
      navigate(result.path);
      if (result.isContact) {
        // If it's a contact item, navigate and scroll to contact section if needed
        setTimeout(() => {
          const element = document.getElementById(result.id);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
    closeSearch();
  };

  // Group results by category
  const groupedResults = useMemo(() => {
    const groups = {};
    searchResults.forEach((result) => {
      if (!groups[result.category]) {
        groups[result.category] = [];
      }
      groups[result.category].push(result);
    });
    return groups;
  }, [searchResults]);

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      Page: "from-blue-500 to-indigo-500",
      Project: "from-rose-500 to-pink-500",
      "Mobile App": "from-purple-500 to-pink-500",
      Skill: "from-emerald-500 to-teal-500",
      Achievement: "from-yellow-500 to-orange-500",
      Education: "from-indigo-500 to-purple-500",
      Contact: "from-sky-500 to-blue-500",
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      Page: "Layout",
      Project: "FolderOpen",
      "Mobile App": "Smartphone",
      Skill: "Code",
      Achievement: "Award",
      Education: "GraduationCap",
      Contact: "Mail",
    };
    return icons[category] || "FileText";
  };

  // Initialize GSAP animations
  useEffect(() => {
    if (headerRef.current) {
      headerTimeline.current = gsap.timeline({ paused: true });

      headerTimeline.current
        .fromTo(
          headerRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        )
        .fromTo(
          logoRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
          "-=0.4",
        )
        .fromTo(
          navItemsRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );

      headerTimeline.current.play();
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > 100) {
        const scrollDelta = currentScrollY - lastScrollY;
        if (scrollDelta > 10 && currentScrollY > 200 && !isMenuOpen) {
          gsap.to(headerRef.current, { y: -100, opacity: 0, duration: 0.3 });
          setIsVisible(false);
        } else if (scrollDelta < -10 || currentScrollY < 80) {
          gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 0.3 });
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    const throttledScroll = throttle(handleScroll, 50);
    window.addEventListener("scroll", throttledScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      headerTimeline.current?.kill();
    };
  }, [lastScrollY, isMenuOpen]);

  // Window resize handler
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= breakpoints.lg && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Menu animation timeline
  useEffect(() => {
    menuTimeline.current = gsap.timeline({ paused: true });

    if (menuOverlayRef.current && menuPanelRef.current) {
      gsap.set(menuPanelRef.current, { x: "100%", visibility: "visible" });
      gsap.set(menuOverlayRef.current, { opacity: 0, visibility: "visible" });

      menuTimeline.current
        .to(menuOverlayRef.current, {
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        })
        .to(
          menuPanelRef.current,
          {
            x: "0%",
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          menuItemsRef.current,
          { x: 20, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
          "-=0.3",
        )
        .fromTo(
          socialLinksRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.05 },
          "-=0.2",
        );
    }
  }, []);

  const openMenu = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
    if (menuOverlayRef.current && menuPanelRef.current) {
      gsap.set(menuOverlayRef.current, { display: "block" });
      gsap.set(menuPanelRef.current, { display: "block" });
      menuTimeline.current?.play();
    }
  };

  const closeMenu = () => {
    menuTimeline.current?.reverse().then(() => {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
      if (menuOverlayRef.current && menuPanelRef.current) {
        gsap.set(menuOverlayRef.current, { display: "none" });
        gsap.set(menuPanelRef.current, { display: "none" });
      }
    });
  };

  const toggleMenu = () => {
    isMenuOpen ? closeMenu() : openMenu();
  };

  const handleNavClick = (path, name) => {
    if (isMenuOpen) closeMenu();

    gsap.to(headerRef.current, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate(path);
    }
  };

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      if (!inThrottle) {
        func.apply(this, arguments);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  useEffect(() => {
    setActiveSection(location.pathname);
  }, [location.pathname]);

  // Refs for menu
  const menuOverlayRef = useRef(null);
  const menuPanelRef = useRef(null);

  // Logo Component
  const Logo = () => (
    <div
      ref={logoRef}
      className="flex items-center space-x-3 group cursor-pointer"
    >
      <div className="relative w-10 h-10 sm:w-12 sm:h-12">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg overflow-hidden">
          <img
            src={logoImg}
            alt="RSP"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.parentElement.innerHTML =
                '<div class="w-full h-full flex items-center justify-center text-white font-bold text-lg">R</div>';
            }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          R.S.P
        </span>
        <span
          className="text-sm text-gray-600 dark:text-gray-400"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Ratnakar Singh Parihar
        </span>
      </div>
    </div>
  );

  // Navigation Item
  const NavItem = ({ item, index, isMobile = false }) => {
    const isActive = activeSection === item.path;
    const itemRef = useRef(null);

    useEffect(() => {
      if (isMobile) {
        menuItemsRef.current[index] = itemRef.current;
      } else {
        navItemsRef.current[index] = itemRef.current;
      }
    }, [index, isMobile]);

    return (
      <Link
        ref={itemRef}
        to={item.path}
        onClick={() => handleNavClick(item.path, item.name)}
        className={`
          relative flex items-center
          ${
            isMobile
              ? "space-x-3 px-4 py-3 rounded-xl w-full text-base"
              : "space-x-2 px-3 py-2 rounded-lg text-sm"
          }
          transition-all duration-200
          ${
            isActive
              ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }
        `}
      >
        <Icon name={item.icon} size={isMobile ? 20 : 18} />
        <span className="font-medium">{item.name}</span>

        {isActive && (
          <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-white/60 rounded-full" />
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        } ${className}`}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link to="/" onClick={() => handleNavClick("/", "Home")}>
              <Logo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item, index) => (
                <NavItem key={item.path} item={item} index={index} />
              ))}

              {/* More Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === "more" ? null : "more")
                  }
                  onMouseEnter={() =>
                    windowWidth >= breakpoints.lg && setActiveDropdown("more")
                  }
                  onMouseLeave={() =>
                    windowWidth >= breakpoints.lg && setActiveDropdown(null)
                  }
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <Icon name="MoreHorizontal" size={18} />
                  <span className="hidden xl:inline text-sm">More</span>
                  <Icon
                    name="ChevronDown"
                    size={14}
                    className={`transition-transform duration-200 ${activeDropdown === "more" ? "rotate-180" : ""}`}
                  />
                </button>

                {activeDropdown === "more" && (
                  <div
                    className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                    onMouseEnter={() =>
                      windowWidth >= breakpoints.lg && setActiveDropdown("more")
                    }
                    onMouseLeave={() =>
                      windowWidth >= breakpoints.lg && setActiveDropdown(null)
                    }
                  >
                    <div className="p-2">
                      {secondaryItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => handleNavClick(item.path, item.name)}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                        >
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient} text-white`}
                          >
                            <Icon name={item.icon} size={16} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.desc}
                            </p>
                          </div>
                          {item.isNew && (
                            <span className="text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full">
                              NEW
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-800 p-3">
                      <a
                        href={resumefile}
                        download="Ratnakar_Singh_Parihar_Resume.pdf"
                        className="flex items-center justify-center space-x-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                      >
                        <Icon name="Download" size={16} />
                        <span>Download Resume</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <motion.button
                onClick={openSearch}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                aria-label="Search"
              >
                <Icon name="Search" size={20} />
              </motion.button>

              <ThemeToggle />

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {socialLinks.slice(0, 3).map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg text-white ${social.bgColor} ${social.hoverColor} transition-all duration-200 hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon name={social.icon} size={16} />
                    </a>
                  ))}
                </div>

                <a
                  href={resumefile}
                  download="Ratnakar_Singh_Parihar_Resume.pdf"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Download"
                    className="border-2 hover:border-blue-500"
                  >
                    Resume
                  </Button>
                </a>

                <Link to="/contact">
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="MessageCircle"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Hire Me
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden w-11 h-11 rounded-xl
    bg-white/20 dark:bg-gray-900/20
    backdrop-blur-md
    border border-white/30 dark:border-gray-700/30
    hover:bg-white/30 dark:hover:bg-gray-800/30
    hover:border-white/50 dark:hover:border-gray-600/50
    shadow-lg
    transition-all duration-200
    flex items-center justify-center
    group"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 block w-5 h-0.5 
        bg-gray-800 dark:bg-gray-200
        rounded-full
        transform transition-all duration-200
        ${isMenuOpen ? "rotate-45 top-2.5" : "rotate-0 top-1"}`}
                  />
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 block w-5 h-0.5 
        bg-gray-800 dark:bg-gray-200
        rounded-full
        transition-all duration-200 top-2.5
        ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                  />
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 block w-5 h-0.5 
        bg-gray-800 dark:bg-gray-200
        rounded-full
        transform transition-all duration-200
        ${isMenuOpen ? "-rotate-45 top-2.5" : "rotate-0 top-4"}`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-16 sm:pt-20 md:pt-24"
          >
            {/* Backdrop with glass effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSearch}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Search Modal */}
            <motion.div
              initial={{ scale: 0.95, y: -30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl mx-4 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 dark:border-gray-800/50"
            >
              {/* Decorative Gradient Header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

              {/* Search Header */}
              <div className="p-4 sm:p-5 border-b border-gray-200 dark:border-gray-800">
                <div className="relative">
                  <Icon
                    name="Search"
                    size={20}
                    className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search projects, skills, pages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-base sm:text-lg"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Icon name="X" size={18} className="text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Search Stats */}
                <div className="flex items-center justify-between mt-3">
                  <p className="text-xs sm:text-sm text-gray-500">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {searchResults.length}
                    </span>{" "}
                    result{searchResults.length !== 1 ? "s" : ""} found
                  </p>
                  <p className="text-xs text-gray-400 hidden sm:block">
                    {searchQuery && `Searching for "${searchQuery}"`}
                  </p>
                </div>
              </div>

              {/* Search Results */}
              <div
                ref={searchResultsRef}
                className="max-h-[50vh] sm:max-h-[55vh] md:max-h-[60vh] overflow-y-auto custom-scrollbar"
              >
                {searchResults.length > 0 ? (
                  <div className="p-3 sm:p-4 space-y-6">
                    {Object.entries(groupedResults).map(([category, items]) => (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        {/* Category Header */}
                        <div className="flex items-center gap-2 px-2 sm:px-3">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-r ${getCategoryColor(category)} flex items-center justify-center shadow-md`}
                          >
                            <Icon
                              name={getCategoryIcon(category)}
                              size={14}
                              className="text-white"
                            />
                          </div>
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {category}
                          </h3>
                          <span className="text-xs text-gray-400 ml-auto">
                            {items.length} item{items.length !== 1 ? "s" : ""}
                          </span>
                        </div>

                        {/* Results Grid */}
                        <div className="grid grid-cols-1 gap-2">
                          {items.map((result, idx) => {
                            const globalIndex = searchResults.findIndex(
                              (r) => r.id === result.id,
                            );
                            const isSelected = selectedIndex === globalIndex;
                            return (
                              <motion.button
                                key={result.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleResultClick(result)}
                                className={`
                            w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl 
                            transition-all duration-200 group
                            ${
                              isSelected
                                ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 shadow-md"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                            }
                          `}
                              >
                                <div className="flex items-start gap-3 sm:gap-4">
                                  {/* Icon with gradient */}
                                  <div
                                    className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-r ${getCategoryColor(category)} text-white flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200`}
                                  >
                                    <Icon
                                      name={
                                        result.icon || getCategoryIcon(category)
                                      }
                                      size={18}
                                    />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                                        {result.title}
                                      </p>
                                      {result.isNew && (
                                        <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full animate-pulse">
                                          NEW
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                                      {result.description}
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                                      <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-400">
                                        {result.category}
                                      </span>
                                      {result.projectType && (
                                        <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                                          {result.projectType}
                                        </span>
                                      )}
                                      {result.platform && (
                                        <span className="text-[10px] sm:text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                                          {result.platform}
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  {/* Arrow Icon */}
                                  <div className="flex-shrink-0">
                                    <Icon
                                      name="ArrowRight"
                                      size={18}
                                      className={`text-gray-400 transition-all duration-200 ${
                                        isSelected
                                          ? "translate-x-1 text-blue-500"
                                          : "group-hover:translate-x-1"
                                      }`}
                                    />
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  // No Results State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 sm:py-16 px-4"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center">
                      <Icon name="Search" size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      No results found
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
                      We couldn't find anything matching "
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {searchQuery}
                      </span>
                      "
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        React
                      </span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        Projects
                      </span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        Skills
                      </span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        MongoDB
                      </span>
                      <span className="text-xs px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                        Mobile Apps
                      </span>
                    </div>
                  </motion.div>
                ) : (
                  // Empty State - Suggestions
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 sm:py-12"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                        <Icon
                          name="Search"
                          size={28}
                          className="text-blue-500"
                        />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
                        What are you looking for?
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Try searching for pages, projects, or skills
                      </p>
                    </div>

                    {/* Quick Suggestions */}
                    <div className="px-4 sm:px-6">
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 text-center">
                        Popular searches
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          "Projects",
                          "React",
                          "Skills",
                          "Achievements",
                          "Mobile Apps",
                          "Contact",
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => setSearchQuery(suggestion)}
                            className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-700 dark:text-gray-300"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Search Footer with Keyboard Shortcuts */}
              <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-[10px] sm:text-xs font-mono shadow-sm">
                          ↑
                        </kbd>
                        <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-[10px] sm:text-xs font-mono shadow-sm">
                          ↓
                        </kbd>
                      </div>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-[10px] sm:text-xs font-mono shadow-sm">
                        Enter
                      </kbd>
                      <span>Select</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-[10px] sm:text-xs font-mono shadow-sm">
                        Esc
                      </kbd>
                      <span>Close</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-[10px] sm:text-xs font-mono shadow-sm">
                        ⌘K
                      </kbd>
                      <span className="hidden sm:inline">Search</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop with blur effect */}
            <motion.div
              ref={menuOverlayRef}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Menu Panel */}
            <motion.div
              ref={menuPanelRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
              className="absolute inset-y-0 right-0 w-full max-w-sm 
          bg-gradient-to-b from-white to-gray-50 
          dark:from-gray-900 dark:to-gray-950
          shadow-2xl overflow-y-auto"
            >
              {/* Decorative Header Gradient */}
              <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />

              {/* Close Button - Floating with glass effect */}
              <motion.button
                onClick={closeMenu}
                className="absolute top-4 right-4 p-2.5 rounded-xl 
            bg-white/90 dark:bg-gray-800/90 
            backdrop-blur-sm border border-gray-200 dark:border-gray-700
            shadow-lg hover:shadow-xl z-10
            hover:scale-110 active:scale-95 transition-all duration-200
            group"
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 90 }}
              >
                <Icon
                  name="X"
                  size={20}
                  className="text-gray-600 dark:text-gray-300 
              group-hover:text-gray-900 dark:group-hover:text-white
              transition-colors"
                />
              </motion.button>

              {/* Profile Section - Enhanced with glass morphism */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                      "linear-gradient(45deg, #8b5cf6, #ec4899, #3b82f6)",
                      "linear-gradient(45deg, #ec4899, #3b82f6, #8b5cf6)",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0 opacity-90"
                />

                {/* Pattern overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />

                {/* Content */}
                <div className="relative p-6 pb-8">
                  <div className="flex items-center gap-4">
                    {/* Animated Avatar Container */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative"
                    >
                      {/* Glow effect */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-md"
                      />

                      {/* Avatar */}
                      <div className="relative w-20 h-20 bg-white/20 backdrop-blur-xl rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl">
                        {logoImg ? (
                          <img
                            src={logoImg}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold text-3xl">
                            R
                          </div>
                        )}
                      </div>

                      {/* Online status with pulse */}
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="absolute -bottom-1 -right-1 w-5 h-5 
                    bg-green-500 border-2 border-white rounded-full"
                      />
                    </motion.div>

                    {/* User Info */}
                    <div className="flex-1">
                      <motion.h3
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white font-bold text-xl"
                      >
                        Ratnakar Singh Parihar
                      </motion.h3>

                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-white/90 text-sm"
                      >
                        Full Stack MERN Developer
                      </motion.p>

                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="inline-block mt-3 text-xs 
                    bg-white/20 backdrop-blur-md
                    text-white px-3 py-1.5 rounded-full
                    border border-white/30"
                      >
                        ✨ Available for work
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation Items - Main */}
              <div className="p-5 space-y-1">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleNavClick(item.path, item.name)}
                      className="flex items-center gap-3 p-3 rounded-xl
                  hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100
                  dark:hover:from-gray-800 dark:hover:to-gray-900
                  transition-all duration-200 group relative overflow-hidden"
                    >
                      {/* Hover background effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Icon with gradient */}
                      <div
                        className={`relative p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} 
                    text-white shadow-lg group-hover:scale-110 
                    group-hover:rotate-3 transition-all duration-300`}
                      >
                        <Icon name={item.icon} size={18} />
                      </div>

                      {/* Label */}
                      <span
                        className="relative font-medium text-gray-700 dark:text-gray-200 
                  group-hover:text-gray-900 dark:group-hover:text-white
                  transition-colors"
                      >
                        {item.name}
                      </span>

                      {/* Active indicator */}
                      {location.pathname === item.path && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute left-0 w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-r-full"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Secondary Items */}
              {secondaryItems?.length > 0 && (
                <div className="p-5 border-t border-gray-200 dark:border-gray-800">
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs font-semibold text-gray-500 
                dark:text-gray-400 uppercase mb-4 tracking-wider"
                  >
                    More
                  </motion.h4>

                  <div className="space-y-2">
                    {secondaryItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => handleNavClick(item.path, item.name)}
                          className="flex items-center gap-3 p-3 rounded-xl
                      hover:bg-gray-100 dark:hover:bg-gray-800
                      transition-all duration-200 group"
                        >
                          {/* Icon */}
                          <div
                            className={`p-2 rounded-lg bg-gradient-to-br ${item.gradient} text-white
                        group-hover:scale-110 transition-transform duration-200`}
                          >
                            <Icon name={item.icon} size={16} />
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 dark:text-white text-sm">
                              {item.name}
                            </p>
                            {item.desc && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {item.desc}
                              </p>
                            )}
                          </div>

                          {/* New badge */}
                          {item.isNew && (
                            <motion.span
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Infinity }}
                              className="text-xs px-2 py-1
                          bg-gradient-to-r from-red-500 to-pink-500
                          text-white rounded-full font-medium"
                            >
                              NEW
                            </motion.span>
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div className="p-5 border-t border-gray-200 dark:border-gray-800">
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xs font-semibold text-gray-500 
              dark:text-gray-400 uppercase mb-4 tracking-wider"
                >
                  Connect
                </motion.h4>

                <div className="grid grid-cols-4 gap-2">
                  {socialLinks.map((social, index) => (
                    <motion.div
                      key={social.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className={`flex items-center justify-center p-3 rounded-xl 
                    ${social.bgColor} text-white
                    hover:shadow-xl transition-all duration-200
                    relative overflow-hidden group`}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.5 }}
                        />
                        <Icon name={social.icon} size={18} />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer with copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="p-5 text-center"
              >
                <p className="text-xs text-gray-400">
                  © 2026 Ratnakar Singh Parihar
                </p>
              </motion.div>

              {/* Bottom padding for scroll */}
              <div className="h-10" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Header;
