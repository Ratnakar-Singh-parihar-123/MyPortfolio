import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Layers,
  Zap,
  Award,
  Eye,
  Users,
  Clock,
  Heart,
  Shield,
  BookOpen,
  Smartphone,
  Monitor,
  Star,
  Code,
  Rocket,
  TrendingUp,
  CheckCircle,
  Play,
  Info,
  Apple,
  Cpu,
  Download,
  Globe,
  Store,
  Share2,
  ShoppingBag,
  MapPin,
  MessageCircle,
  Calendar,
  DollarSign,
  Camera,
  Music,
  Video,
  Coffee,
  Briefcase,
  ChevronRight,
  X,
  Menu,
  Grid,
  List,
  Filter,
  Battery,
  Wifi,
  Signal,
  Car,
} from "lucide-react";

// Import your images
import yammiverse from "../../../assets/projectsImg/yammiverse.png";
import vsbp from "../../../assets/projectsImg/vsbp.png";
import bodp from "../../../assets/projectsImg/bloodAndOrganDonationsImg/jeevandaancareHome.png";

// import appimg
import ECommrce from "../../../assets/AppImg/ecomm.jpeg";
import safeGuard from "../../../assets/AppImg/safeGuard.jpeg";
import parkingapp from "../../../assets/AppImg/parkingapp.jpeg";

// App Images
const getAppImage = (appName) => {
  const images = {
    emergencyApp: safeGuard,
    notesApp: parkingapp,
    marketplaceApp: ECommrce,
    SafeGuard: safeGuard,
    ParkEasy: parkingapp,
    ReWearMarket: ECommrce,
  };
  return (
    images[appName] ||
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=800&fit=crop"
  );
};

// Web Projects Data
const webProjects = [
  {
    id: 1,
    title: "Vehicle Service Booking Platform",
    shortDescription:
      "Connect customers with nearby vehicle service centers for real-time booking.",
    description:
      "A full-stack MERN web app that connects customers with nearby vehicle service centers.",
    fullDescription:
      "A comprehensive vehicle service ecosystem featuring real-time booking, live chat between customers and service providers, secure payment integration, and dynamic service tracking. Built with microservices architecture for scalability and performance optimization.",
    image: vsbp,
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
    ],
    liveUrl: "https://vehicle-service-booking-platform.onrender.com",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Vehicle-Service-Booking-Platform",
    category: "Full-Stack",
    complexity: "Advanced",
    rating: 4.8,
    status: "Live",
    color: "from-blue-600 to-cyan-500",
    features: [
      "Real-time booking & tracking",
      "Instant messaging",
      "Secure payments",
      "Role-based dashboards",
      "Service analytics",
      "Email/SMS notifications",
    ],
  },
  {
    id: 2,
    title: "YammiVerse",
    shortDescription:
      "Recipe sharing platform for food enthusiasts to discover and share creations.",
    description:
      "A MERN-based recipe sharing platform with secure login and image uploads.",
    fullDescription:
      "A social recipe sharing community where food enthusiasts can discover, create, and share culinary creations. Features include AI-powered recipe recommendations, step-by-step cooking guides, nutritional analysis, and social interaction capabilities.",
    image: yammiverse,
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Cloudinary",
    ],
    liveUrl: "https://yammiverse.onrender.com",
    githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
    category: "Recipe Platform",
    complexity: "Intermediate",
    rating: 4.5,
    status: "Live",
    color: "from-orange-500 to-red-500",
    features: [
      "Create & share recipes",
      "Likes & comments",
      "Recipe collections",
      "Advanced search",
      "AI recommendations",
      "Nutritional info",
    ],
  },
  {
    id: 3,
    title: "Jeevandaan",
    shortDescription:
      "Life-saving healthcare platform connecting donors with recipients.",
    description:
      "Healthcare platform for blood and organ donation with real-time matching.",
    fullDescription:
      "Jeevandaan is a life-saving full-stack healthcare platform that intelligently connects blood and organ donors with patients in critical need through real-time matching. Features OTP-based authentication, location-based donor search, emergency alert broadcasting, and comprehensive hospital management dashboard.",
    image: bodp,
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Mapbox",
      "Twilio",
    ],
    liveUrl: "https://jeevandaancare.vercel.app/",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Blood-Organ-Donations-",
    category: "Healthcare",
    complexity: "Advanced",
    rating: 4.9,
    status: "Production",
    color: "from-red-500 to-pink-500",
    features: [
      "Real-time donor matching",
      "OTP authentication",
      "Emergency alerts",
      "Hospital dashboard",
      "Location search",
      "Live availability",
    ],
  },
];

// Mobile Apps Data
const mobileApps = [
  {
    id: 1,
    title: "SafeGuard",
    tagline: "Your Safety, Just One Tap Away",
    shortDescription:
      "A real-time emergency response app with one-tap SOS alerts, live location tracking, and instant access to nearby emergency services.",
    fullDescription:
      "SafeGuard is a real-time emergency response application designed to enhance personal safety during critical situations. With a single tap, users can instantly trigger an SOS alert that shares their live location with pre-selected emergency contacts.\n\nThe app ensures rapid assistance through real-time location tracking, automatic emergency calling, and instant notifications. It is optimized to work reliably even in the background, ensuring continuous protection.\n\nAdditionally, users can quickly locate nearby hospitals, police stations, and emergency services using integrated map-based features, making help easily accessible when needed most.",
    imageKey: "SafeGuard",
    iconBg: "from-red-500 to-pink-600",
    icon: Shield,
    platforms: ["iOS", "Android"],
    status: "Coming Soon",
    rating: 4.8,
    technologies: [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Google Maps API",
    ],
    features: [
      "One-tap SOS alert with live location sharing",
      "Real-time location tracking for emergency contacts",
      "Automatic emergency calling system",
      "Nearby hospitals, police stations & emergency services",
      "Push notifications for instant alerts",
      "Background location tracking for continuous safety",
      "Fast, reliable, and user-friendly interface",
    ],
    metrics: [
      { icon: Download, value: "Soon", label: "Downloads" },
      { icon: Star, value: "4.8", label: "Expected Rating" },
      { icon: Shield, value: "24/7", label: "Emergency Support" },
    ],
  },
  {
    id: 2,
    title: "ParkEasy",
    tagline: "Smart Parking, Simplified",
    shortDescription:
      "A smart parking app with real-time availability, location-based search, and seamless booking with secure payments.",
    fullDescription:
      "ParkEasy is a smart parking management application built to simplify finding and booking parking spaces in busy urban environments. Users can discover nearby parking locations, check real-time slot availability, and reserve spaces with secure in-app payments.\n\nThe platform features a dual-role system. Users benefit from a smooth, intuitive experience, while admins (parking owners) gain access to a powerful dashboard to manage parking locations, monitor available and occupied slots, define capacity, and oversee operations.\n\nParkEasy reduces the time and stress involved in parking while providing full control and valuable insights to parking owners.",
    imageKey: "ParkEasy",
    iconBg: "from-blue-500 to-indigo-600",
    icon: Car,
    platforms: ["iOS", "Android"],
    status: "Coming Soon",
    rating: 4.7,
    technologies: ["React Native", "Node.js", "Express.js", "MongoDB"],
    features: [
      "Location-based nearby parking search",
      "Real-time parking slot availability",
      "Secure booking and payment system",
      "User and Admin role-based access",
      "Admin dashboard for full parking management",
      "Track available and occupied slots",
      "Manage multiple parking locations and capacity",
    ],
    metrics: [
      { icon: Download, value: "Soon", label: "Downloads" },
      { icon: Star, value: "4.7", label: "Expected Rating" },
      { icon: Users, value: "1K+", label: "Target Users" },
    ],
  },
  {
    id: 3,
    title: "ReWear Market",
    tagline: "Smart Marketplace for Pre-Owned Products",
    shortDescription:
      "A full-stack marketplace app for buying and selling second-hand products with real-time chat and smart discovery features.",
    fullDescription:
      "ReWear Market is a modern full-stack mobile marketplace application that enables users to buy and sell pre-owned products efficiently. Users can list items with images, explore products through advanced search and filtering, and communicate instantly via real-time chat.\n\nThe platform enhances user experience with wishlist functionality, user profile management, and secure image handling using Cloudinary. Built with scalability and performance in mind, it delivers a smooth and engaging digital marketplace experience.\n\nReWear Market promotes sustainable and affordable shopping by encouraging the reuse of products.",
    imageKey: "ReWearMarket",
    iconBg: "from-purple-500 to-pink-500",
    icon: ShoppingBag,
    platforms: ["iOS", "Android"],
    status: "Coming Soon",
    rating: 4.8,
    technologies: [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
    ],
    features: [
      "Product listing with image uploads",
      "Real-time chat between buyers and sellers (Socket.io)",
      "Advanced search and filtering system",
      "Wishlist and saved products",
      "User profile and listing management",
      "Secure image storage with Cloudinary",
      "Responsive and smooth mobile experience",
    ],
    metrics: [
      { icon: Download, value: "Soon", label: "Downloads" },
      { icon: Star, value: "4.8", label: "Expected Rating" },
      { icon: ShoppingBag, value: "5K+", label: "Target Listings" },
    ],
  },
];

const ProjectShowcaseSection = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [activeTab, setActiveTab] = useState("web");
  const [viewMode, setViewMode] = useState("grid");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  const categories = [
    { id: "all", label: "All Projects", icon: Grid },
    { id: "Full-Stack", label: "Full Stack", icon: Layers },
    { id: "Recipe Platform", label: "Recipe Apps", icon: BookOpen },
    { id: "Healthcare", label: "Healthcare", icon: Heart },
  ];

  const filteredProjects = webProjects.filter((project) =>
    filterCategory === "all" ? true : project.category === filterCategory,
  );

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden";
  };

  const handleAppClick = (app) => {
    setSelectedApp(app);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedApp(null);
    document.body.style.overflow = "auto";
  };

  const openDownloadLink = (url) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-muted/20 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          style={{ opacity }}
          className="container-brand relative z-10 px-4 sm:px-6 mx-auto max-w-7xl"
        >
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeaderInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Rocket className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                MY PORTFOLIO
              </span>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 px-4">
              <span className="text-foreground">Featured </span>
              <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Projects
              </span>
              <span className="text-foreground"> & Apps</span>
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Explore my collection of web applications and mobile apps that
              solve real-world problems with elegant design and cutting-edge
              technology.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 md:mb-12">
            <div className="inline-flex p-1 rounded-full bg-card border border-border">
              <button
                onClick={() => setActiveTab("web")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === "web"
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Web Applications</span>
                <span className="sm:hidden">Web</span>
              </button>
              <button
                onClick={() => setActiveTab("apps")}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === "apps"
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile Apps</span>
                <span className="sm:hidden">Apps</span>
              </button>
            </div>

            {activeTab === "web" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setViewMode(viewMode === "grid" ? "list" : "grid")
                  }
                  className="p-2 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                >
                  {viewMode === "grid" ? (
                    <List className="w-4 h-4" />
                  ) : (
                    <Grid className="w-4 h-4" />
                  )}
                </button>
                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="text-sm hidden sm:inline">Filter</span>
                  </button>
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-20"
                      >
                        {categories.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setFilterCategory(category.id);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2 ${
                              filterCategory === category.id
                                ? "text-primary bg-primary/10"
                                : ""
                            }`}
                          >
                            <category.icon className="w-4 h-4" />
                            {category.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

          {/* Web Projects */}
          {activeTab === "web" && (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                  : "space-y-4"
              }
            >
              {filteredProjects.map((project, index) =>
                viewMode === "grid" ? (
                  <WebProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isHovered={hoveredId === project.id}
                    onHoverStart={() => setHoveredId(project.id)}
                    onHoverEnd={() => setHoveredId(null)}
                    onClick={() => handleProjectClick(project)}
                  />
                ) : (
                  <WebProjectListItem
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={() => handleProjectClick(project)}
                  />
                ),
              )}
            </div>
          )}

          {/* Mobile Apps */}
          {activeTab === "apps" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-6">
              {mobileApps.map((app, index) => (
                <MobileAppCard
                  key={app.id}
                  app={app}
                  index={index}
                  onClick={() => handleAppClick(app)}
                />
              ))}
            </div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12 md:mt-16"
          >
            <a
              href="/projectss"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold bg-primary text-white hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 group text-sm sm:text-base"
            >
              <span>View Full Project Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={closeModal} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedApp && (
          <AppModal
            app={selectedApp}
            onClose={closeModal}
            openDownloadLink={openDownloadLink}
            getAppImage={getAppImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Mobile App Card Component
const MobileAppCard = ({ app, index, onClick }) => {
  const IconComponent = app.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="flex flex-col items-center">
        {/* Phone Mockup */}
        <div className="relative w-[260px] md:w-[280px]">
          {/* Phone Frame */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-1.5 shadow-2xl">
            <div className="relative bg-black rounded-[1.75rem] overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
              </div>

              {/* App Screenshot */}
              <div className="relative w-full" style={{ aspectRatio: "9/19" }}>
                <img
                  src={getAppImage(app.imageKey)}
                  alt={app.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Status Bar */}
                <div className="absolute top-2 left-0 right-0 px-5 py-1 flex justify-between text-white/70 text-[9px] font-medium">
                  <span>9:41</span>
                  <div className="flex items-center gap-0.5">
                    <Signal className="w-2.5 h-2.5" />
                    <Wifi className="w-2.5 h-2.5" />
                    <Battery className="w-3.5 h-2.5" />
                  </div>
                </div>

                {/* App Icon Overlay on Hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center shadow-2xl`}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-white/30 rounded-full" />
            </div>

            {/* Side Buttons */}
            <div className="absolute left-0 top-20 -translate-x-[1.5px] w-0.5 h-7 bg-gray-700 rounded-l-full" />
            <div className="absolute left-0 top-28 -translate-x-[1.5px] w-0.5 h-11 bg-gray-700 rounded-l-full" />
            <div className="absolute right-0 top-24 translate-x-[1.5px] w-0.5 h-14 bg-gray-700 rounded-r-full" />
          </div>
        </div>

        {/* Card Content Below Phone */}
        <div className="mt-5 text-center max-w-[260px]">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center shadow-md`}
            >
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
              {app.title}
            </h3>
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {app.shortDescription}
          </p>

          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium">{app.rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{app.status}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-2">
            {app.platforms.map((platform, idx) => (
              <span
                key={idx}
                className="flex items-center gap-0.5 px-2 py-0.5 text-[10px] bg-muted rounded-full"
              >
                {platform === "iOS" ? (
                  <Apple className="w-2.5 h-2.5" />
                ) : (
                  <Cpu className="w-2.5 h-2.5" />
                )}
                {platform}
              </span>
            ))}
          </div>

          <div className="mt-3 text-primary text-xs font-medium flex items-center justify-center gap-1">
            <span>Tap to explore</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// App Modal Component
const AppModal = ({ app, onClose, openDownloadLink, getAppImage }) => {
  const IconComponent = app.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative bg-gradient-to-br from-card to-muted rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm float-right m-4"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <div className="p-6 md:p-8 pt-0">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Phone Mockup */}
            <div className="lg:w-[300px] flex-shrink-0">
              <div className="flex justify-center">
                {/* Phone Frame */}
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] p-1.5 shadow-2xl">
                  <div className="relative bg-black rounded-[1.75rem] overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[32px] bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                    </div>

                    <div
                      className="relative w-[280px]"
                      style={{ aspectRatio: "9/19" }}
                    >
                      <img
                        src={getAppImage(app.imageKey)}
                        alt={app.title}
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute top-2 left-0 right-0 px-5 py-1 flex justify-between text-white/70 text-[9px] font-medium">
                        <span>9:41</span>
                        <div className="flex items-center gap-0.5">
                          <Signal className="w-2.5 h-2.5" />
                          <Wifi className="w-2.5 h-2.5" />
                          <Battery className="w-3.5 h-2.5" />
                        </div>
                      </div>

                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-0.5 bg-white/30 rounded-full" />
                    </div>

                    <div className="absolute left-0 top-20 -translate-x-[1.5px] w-0.5 h-7 bg-gray-700 rounded-l-full" />
                    <div className="absolute left-0 top-28 -translate-x-[1.5px] w-0.5 h-11 bg-gray-700 rounded-l-full" />
                    <div className="absolute right-0 top-24 translate-x-[1.5px] w-0.5 h-14 bg-gray-700 rounded-r-full" />
                  </div>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="mt-6 space-y-2">
                {app.platforms.includes("iOS") && (
                  <button
                    onClick={() => openDownloadLink("#")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white hover:bg-gray-800 transition-all duration-300 group"
                  >
                    <Apple className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-[9px] opacity-80">
                        Download on the
                      </div>
                      <div className="text-xs font-semibold">App Store</div>
                    </div>
                  </button>
                )}
                {app.platforms.includes("Android") && (
                  <button
                    onClick={() => openDownloadLink("#")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 text-white hover:bg-green-700 transition-all duration-300 group"
                  >
                    <Cpu className="w-4 h-4" />
                    <div className="text-left">
                      <div className="text-[9px] opacity-80">GET IT ON</div>
                      <div className="text-xs font-semibold">Google Play</div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Right Side - App Details */}
            <div className="flex-1">
              {/* App Header */}
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center shadow-xl`}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {app.title}
                  </h2>
                  <p className="text-primary text-sm font-medium">
                    {app.tagline}
                  </p>
                </div>
              </div>

              {/* Rating & Platforms */}
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(app.rating) ? "fill-amber-500 text-amber-500" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-base font-bold">{app.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  {app.platforms.map((platform, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-full"
                    >
                      {platform === "iOS" ? (
                        <Apple className="w-3 h-3" />
                      ) : (
                        <Cpu className="w-3 h-3" />
                      )}
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">About This App</h3>
                <div className="text-muted-foreground leading-relaxed text-sm space-y-2">
                  {app.fullDescription.split("\n\n").map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {app.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {app.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-muted/50">
                {app.metrics.map((metric, idx) => (
                  <div key={idx} className="text-center">
                    <metric.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-base font-bold">{metric.value}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Web Project Card Component (Grid View)
const WebProjectCard = ({
  project,
  index,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative h-full bg-card rounded-xl sm:rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold rounded-full bg-green-500/90 text-white backdrop-blur-sm">
              {project.status}
            </span>
          </div>

          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
            <span
              className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-medium rounded-full bg-gradient-to-r ${project.color} text-white`}
            >
              {project.category}
            </span>
          </div>

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <div className="flex gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
            {project.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-muted text-muted-foreground rounded-md">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-border">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
              <span className="text-xs sm:text-sm font-medium">
                {project.rating}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                /5
              </span>
            </div>
            <div className="flex items-center gap-1 text-primary text-xs sm:text-sm font-medium">
              <span>Details</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Web Project List Item Component
const WebProjectListItem = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative w-full sm:w-48 h-32 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/90 text-white">
            {project.status}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary">
              {project.category}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] sm:text-xs text-muted-foreground"
              >
                {tech}
                {i < project.technologies.slice(0, 4).length - 1 && " •"}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium">{project.rating}/5</span>
            </div>
            <div className="flex items-center gap-1 text-primary text-xs font-medium">
              <span>View Details</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative bg-card rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
      >
        <div className="relative h-48 sm:h-56 md:h-72 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded-full bg-gradient-to-r ${project.color} text-white`}
              >
                {project.category}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-white/80 text-xs sm:text-sm">
                {project.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Project Overview
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                {project.fullDescription}
              </p>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Key Features
              </h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm bg-primary/10 text-primary rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                Project Details
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Complexity
                  </span>
                  <span className="text-xs sm:text-sm font-medium">
                    {project.complexity}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
                    <span className="text-xs sm:text-sm font-medium">
                      {project.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors text-sm sm:text-base"
              >
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition-colors text-sm sm:text-base"
              >
                <Github className="w-3 h-3 sm:w-4 sm:h-4" /> Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectShowcaseSection;
