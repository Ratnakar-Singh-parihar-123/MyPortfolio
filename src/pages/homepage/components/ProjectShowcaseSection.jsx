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
  Utensils,
  Bike,
} from "lucide-react";

// Import your images
import yammiverse from "../../../assets/projectsImg/yammiverse.png";
import vsbp from "../../../assets/projectsImg/vsbp.png";
import bodp from "../../../assets/projectsImg/bloodAndOrganDonationsImg/jeevandaancareHome.png";
import foodmitra from "../../../assets/projectsImg/foodmitra/foodmitra.png";

// import appimg
import ECommrce from "../../../assets/AppImg/ecomm.jpeg";
import safeGuard from "../../../assets/AppImg/safeGuard.jpeg";
import parkingapp from "../../../assets/AppImg/parkingapp.jpeg";
import FoodMitraCustumer from "../../../assets/AppImg/FoodMitra/FoodMitraCustumer.jpeg";
import FoodMitraDeliveryPartner from "../../../assets/AppImg/FoodMitraDelivery/FoodMitraDeliveryPartner.jpeg";
import FoodMitraHouseTiffin from "../../../assets/AppImg/FoodMitraHouseTiffin/FoodMitraHouseTiffin.jpeg";

// App Images
const getAppImage = (appName) => {
  const images = {
    emergencyApp: safeGuard,
    notesApp: parkingapp,
    marketplaceApp: ECommrce,
    SafeGuard: safeGuard,
    ParkEasy: parkingapp,
    FoodMitraCustumer: FoodMitraCustumer,
    FoodMitraDeliveryPartner: FoodMitraDeliveryPartner,
    FoodMitraTiffinHouse: FoodMitraHouseTiffin,
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
    title: "FoodMitra",
    shortDescription:
      "Full-stack food delivery ecosystem connecting customers, vendors, delivery partners, and home-based tiffin providers.",
    description:
      "A full-stack food delivery platform consisting of Customer, Delivery Partner, and House Tiffin applications.",
    fullDescription:
      "FoodMitra is a full-stack food delivery ecosystem built to connect customers, food vendors, delivery partners, and home-based tiffin providers through a unified platform. The ecosystem includes a Customer App for browsing and ordering food, a Delivery Partner App for managing assigned deliveries and updating order status, and FoodMitra House Tiffin for connecting customers with locally prepared home-style meals. The platform includes role-based authentication, vendor approval workflows, real-time order and delivery updates using Socket.IO, online payments with Razorpay, Firebase services, Google APIs for location and map-related functionality, and REST APIs powered by Node.js, Express.js, and MongoDB.",
    image: foodmitra,
    technologies: [
      "React",
      "React Native",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "JWT",
      "Firebase",
      "Google APIs",
      "Razorpay",
      "Tailwind CSS",
      "Custom CSS",
    ],
    liveUrl: "https://myfoodmitra.vercel.app/",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Food-Delivery-Platform-",
    category: "Food Delivery",
    complexity: "Advanced",
    rating: 4.9,
    status: "Live",
    color: "from-orange-500 to-amber-500",
    features: [
      "Customer food ordering",
      "Delivery partner app",
      "House tiffin platform",
      "Role-based authentication",
      "Real-time order tracking",
      "Vendor approval workflow",
      "Online payments",
      "Location & map integration",
      "Admin management",
    ],
  },
  {
    id: 2,
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
  // {
  //   id: 4,
  //   title: "YammiVerse",
  //   shortDescription:
  //     "Recipe sharing platform for food enthusiasts to discover and share creations.",
  //   description:
  //     "A MERN-based recipe sharing platform with secure login and image uploads.",
  //   fullDescription:
  //     "A social recipe sharing community where food enthusiasts can discover, create, and share culinary creations. Features include AI-powered recipe recommendations, step-by-step cooking guides, nutritional analysis, and social interaction capabilities.",
  //   image: yammiverse,
  //   technologies: [
  //     "React",
  //     "Node.js",
  //     "Express",
  //     "MongoDB",
  //     "Tailwind CSS",
  //     "Cloudinary",
  //   ],
  //   liveUrl: "https://yammiverse.onrender.com",
  //   githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
  //   category: "Recipe Platform",
  //   complexity: "Intermediate",
  //   rating: 4.5,
  //   status: "Live",
  //   color: "from-orange-500 to-red-500",
  //   features: [
  //     "Create & share recipes",
  //     "Likes & comments",
  //     "Recipe collections",
  //     "Advanced search",
  //     "AI recommendations",
  //     "Nutritional info",
  //   ],
  // },
];

// Mobile Apps Data
const mobileApps = [
  {
    id: 1,
    title: "FoodMitra",
    tagline: "Your Food, Delivered with Ease",
    shortDescription:
      "A complete food ordering and delivery platform that connects customers with local food vendors and Tiffin Houses for convenient meal ordering and doorstep delivery.",
    fullDescription:
      "FoodMitra is a full-stack food ordering and delivery platform designed to connect customers with local restaurants, food vendors, and Tiffin Houses through a seamless digital experience.\n\nCustomers can discover nearby food options, explore menus, add items to their cart, place orders, make secure online payments, and track their orders. The application uses location-based services to provide relevant nearby food options and a smooth ordering experience.\n\nFoodMitra is built as part of a multi-app ecosystem that connects customers, delivery partners, and Tiffin Houses. The platform focuses on real-time order processing, secure authentication, location-based services, payment integration, and reliable communication between all participants.",
    imageKey: "FoodMitraCustumer",
    iconBg: "from-orange-500 to-red-500",
    icon: Utensils,
    platforms: ["Android"],
    status: "Live • Development Updates",
    rating: 4.8,
    technologies: [
      "React Native",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Socket.io",
      "Google Maps API",
    ],
    features: [
      "Browse nearby food vendors and Tiffin Houses",
      "Location-based food discovery",
      "Explore menus and food items",
      "Cart and order management",
      "Secure online payment integration",
      "Real-time order status updates",
      "Order tracking using location services",
      "Customer authentication and profile management",
      "Push notifications for order updates",
      "Seamless communication between customers, vendors, and delivery partners",
    ],
    metrics: [
      { icon: Download, value: "Soon", label: "Downloads" },
      { icon: Star, value: "4.8", label: "Expected Rating" },
      { icon: Users, value: "1K+", label: "Target Users" },
    ],
  },
  {
    id: 2,
    title: "FoodMitra Delivery Partner",
    tagline: "Deliver Smarter, Earn Better",
    shortDescription:
      "A dedicated delivery partner application for managing food deliveries, discovering nearby orders, tracking routes, and handling the complete delivery workflow in real time.",
    fullDescription:
      "FoodMitra Delivery Partner is the dedicated rider application of the FoodMitra ecosystem, built to help delivery partners efficiently manage and complete food deliveries.\n\nDelivery partners can receive nearby delivery requests, view order details, accept or decline orders, access pickup and delivery locations, and manage their active deliveries through a centralized interface. Location services and map-based navigation help riders reach vendors and customers efficiently.\n\nThe application works as a real-time communication layer between customers, Tiffin Houses, and delivery partners. Order updates are synchronized across the ecosystem, allowing riders to manage their delivery workflow from order acceptance through pickup and final delivery.",
    imageKey: "FoodMitraDeliveryPartner",
    iconBg: "from-blue-500 to-cyan-500",
    icon: Bike,
    platforms: ["Android", "iOS"],
    status: "Live • Development Updates",
    rating: 4.8,
    technologies: [
      "React Native",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Google Maps API",
    ],
    features: [
      "Real-time nearby delivery requests",
      "Accept or decline delivery orders",
      "Order details and customer information",
      "Vendor pickup and customer delivery locations",
      "Real-time location tracking",
      "Map-based navigation support",
      "Active delivery management",
      "Order status updates",
      "Push notifications for new orders",
      "Delivery workflow from pickup to completion",
      "Real-time communication with the FoodMitra platform",
    ],
    metrics: [
      { icon: Download, value: "Soon", label: "Downloads" },
      { icon: Star, value: "4.8", label: "Expected Rating" },
      { icon: Users, value: "100+", label: "Target Partners" },
    ],
  },
  {
    id: 3,
    title: "FoodMitra House Tiffin",
    tagline: "Manage Your Kitchen, Grow Your Business",
    shortDescription:
      "A dedicated platform for Tiffin Houses and food vendors to manage menus, orders, customers, delivery operations, and daily food business activities.",
    fullDescription:
      "FoodMitra Tiffin House is the vendor-side application of the FoodMitra ecosystem, designed for Tiffin Houses and local food businesses to manage their digital food operations.\n\nTiffin House owners can manage their food items and menu, receive and process customer orders, monitor order status, and coordinate deliveries through the FoodMitra platform. The application provides a centralized interface for managing day-to-day food business activities.\n\nThe platform connects Tiffin Houses directly with customers and delivery partners, creating an integrated workflow from food listing and order placement to preparation, pickup, and final delivery. This helps local food businesses establish a digital presence while managing their orders efficiently.",
    imageKey: "FoodMitraTiffinHouse",
    iconBg: "from-green-500 to-emerald-600",
    icon: Store,
    platforms: ["Android"],
    status: "Live • Development Updates",
    rating: 4.8,
    technologies: [
      "React Native",
      "CSS",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Razorpay",
    ],
    features: [
      "Tiffin House and vendor registration",
      "Manage food items and menus",
      "Receive real-time customer orders",
      "Accept and process orders",
      "Update order preparation status",
      "Manage daily food availability",
      "Order history and management",
      "Customer and delivery partner coordination",
      "Real-time order status synchronization",
      "Push notifications for new orders",
      "Integrated delivery workflow",
    ],
    metrics: [
      { icon: Download, value: "Soon", label: "Downloads" },
      { icon: Star, value: "4.8", label: "Expected Rating" },
      { icon: Users, value: "100+", label: "Target Vendors" },
    ],
  },
  {
    id: 4,
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
    status: "Live • Updates Coming Soon",
    androidUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/ParkEasy/releases/download/v1.0/application-2b19fc59-78f1-4a7e-91b1-c437d35ac120.apk",
    technologies: ["React Native", "CSS", "Node.js", "Express.js", "MongoDB"],
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
        className="relative py-16 overflow-hidden md:py-24 lg:py-32 bg-gradient-to-b from-background via-background to-muted/20"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 px-4 mx-auto container-brand sm:px-6 max-w-7xl"
        >
          {/* Header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center md:mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isHeaderInView ? { scale: 1 } : {}}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-3 mb-6"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5">
                  <Rocket className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                </div>
                <motion.div
                  className="absolute w-2 h-2 rounded-full -top-1 -right-1 md:w-3 md:h-3 bg-primary"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-primary bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full">
                MY PORTFOLIO
              </span>
            </motion.div>

            <h2 className="px-4 mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl md:mb-6">
              <span className="text-foreground">Featured </span>
              <span className="text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text">
                Projects
              </span>
              <span className="text-foreground"> & Apps</span>
            </h2>

            <p className="max-w-2xl px-4 mx-auto text-base md:text-lg text-muted-foreground">
              Explore my collection of web applications and mobile apps that
              solve real-world problems with elegant design and cutting-edge
              technology.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row md:mb-12">
            <div className="inline-flex p-1 border rounded-full bg-card border-border">
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
                  className="p-2 transition-colors border rounded-lg bg-card border-border hover:border-primary"
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
                    className="flex items-center gap-2 px-3 py-2 transition-colors border rounded-lg bg-card border-border hover:border-primary"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden text-sm sm:inline">Filter</span>
                  </button>
                  <AnimatePresence>
                    {isFilterOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 z-20 w-48 mt-2 border rounded-lg shadow-lg bg-card border-border"
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

          {/* Mobile Apps - Responsive Grid */}
          {activeTab === "apps" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 lg:gap-5 xl:gap-6 justify-items-center">
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
            className="mt-12 text-center md:mt-16"
          >
            <a
              href="/projectss"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl bg-primary hover:shadow-2xl hover:shadow-primary/30 group sm:text-base"
            >
              <span>View Full Project Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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

/* ============================================================
   MOBILE APP CARD — Compact + Platform-specific Phone Design
   Hover pe app ka apna lucide icon (Store / Bike / Utensils / Car) dikhta hai
============================================================ */
const MobileAppCard = ({ app, index, onClick }) => {
  const IconComponent = app.icon;
  const isAndroid = app.platforms.includes("Android");

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer w-full max-w-[220px] mx-auto"
    >
      <div className="flex flex-col items-center">
        {/* Phone Mockup */}
        <div className="relative w-[130px] sm:w-[140px] md:w-[150px]">
          <div
            className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl transition-all duration-500 group-hover:shadow-primary/30 ${
              isAndroid ? "rounded-[1.3rem] p-1" : "rounded-[1.8rem] p-1.5"
            }`}
          >
            <div
              className={`relative bg-black overflow-hidden ${
                isAndroid ? "rounded-[1rem]" : "rounded-[1.5rem]"
              }`}
            >
              {/* Camera Notch: Android punch-hole / iOS Dynamic Island */}
              {isAndroid ? (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black ring-[1.5px] ring-gray-700/80 z-10">
                  <div className="absolute inset-[2px] rounded-full bg-gray-900/80" />
                </div>
              ) : (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[52px] h-[16px] bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-green-500/50 animate-pulse" />
                  <div className="w-5 h-1.5 rounded-full bg-gray-900" />
                </div>
              )}

              {/* App Screenshot */}
              <div className="relative w-full" style={{ aspectRatio: "9/19" }}>
                <img
                  src={getAppImage(app.imageKey)}
                  alt={app.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-100" />

                {/* Status Bar */}
                <div
                  className={`absolute left-0 right-0 flex justify-between text-white/70 text-[6px] font-medium z-10 ${
                    isAndroid ? "top-1 px-2.5" : "top-1 px-3"
                  }`}
                >
                  <span>9:41</span>
                  <div className="flex items-center gap-0.5">
                    <Signal className="w-1.5 h-1.5" />
                    <Wifi className="w-1.5 h-1.5" />
                    <Battery className="w-2 h-1.5" />
                  </div>
                </div>

                {/* ⭐ HOVER pe app ka apna lucide icon dikhta hai (Store / Bike / Utensils / Car) */}
                <div className="absolute transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 opacity-0 top-1/2 left-1/2 group-hover:opacity-100 group-hover:scale-110">
                  <div
                    className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center shadow-2xl ring-2 ring-white/20`}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-0.5 bg-white/30 rounded-full" />
            </div>

            {/* Side Buttons — Platform specific */}
            {isAndroid ? (
              <>
                {/* Android: power + volume dono right side */}
                <div className="absolute right-0 top-8 translate-x-[1px] w-0.5 h-4 bg-gray-700 rounded-r-full" />
                <div className="absolute right-0 top-14 translate-x-[1px] w-0.5 h-6 bg-gray-700 rounded-r-full" />
                {/* Left side (assistant button) */}
                <div className="absolute left-0 top-12 -translate-x-[1px] w-0.5 h-4 bg-gray-700 rounded-l-full" />
              </>
            ) : (
              <>
                {/* iOS: volume left, power right */}
                <div className="absolute left-0 top-10 -translate-x-[1.5px] w-0.5 h-4 bg-gray-700 rounded-l-full" />
                <div className="absolute left-0 top-16 -translate-x-[1.5px] w-0.5 h-6 bg-gray-700 rounded-l-full" />
                <div className="absolute right-0 top-14 translate-x-[1.5px] w-0.5 h-7 bg-gray-700 rounded-r-full" />
              </>
            )}
          </div>
        </div>

        {/* Card Content Below Phone */}
        <div className="w-full mt-3 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <div
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${app.iconBg} flex items-center justify-center shadow-md flex-shrink-0`}
            >
              <IconComponent className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-xs font-bold transition-colors sm:text-sm text-foreground group-hover:text-primary line-clamp-1">
              {app.title}
            </h3>
          </div>

          <p className="text-[10px] sm:text-[11px] text-muted-foreground line-clamp-2 px-2">
            {app.shortDescription}
          </p>

          <div className="flex items-center justify-center gap-2 mt-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
              <span className="text-[11px] font-medium">{app.rating}</span>
            </div>
            <span className="text-[9px] text-muted-foreground">•</span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground line-clamp-1">
              {app.status}
            </span>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-1.5 flex-wrap">
            {app.platforms.map((platform, idx) => (
              <span
                key={idx}
                className="flex items-center gap-0.5 px-1.5 py-0.5 text-[9px] bg-muted rounded-full"
              >
                {platform === "iOS" ? (
                  <Apple className="w-2 h-2" />
                ) : (
                  <Cpu className="w-2 h-2" />
                )}
                {platform}
              </span>
            ))}
          </div>

          <div className="mt-1.5 text-primary text-[10px] font-medium flex items-center justify-center gap-1">
            <span>Tap to explore</span>
            <ChevronRight className="w-2.5 h-2.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   APP MODAL — Compact phone, hover icon same, platform frame
============================================================ */
const AppModal = ({ app, onClose, openDownloadLink, getAppImage }) => {
  const IconComponent = app.icon;
  const isAndroid = app.platforms.includes("Android");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute z-30 flex items-center justify-center w-8 h-8 transition-all rounded-full top-3 right-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row md:gap-8">
              {/* Left Side - Phone Mockup */}
              <div className="lg:w-[300px] xl:w-[340px] flex-shrink-0">
                <div className="sticky flex flex-col items-center top-4">
                  {/* Phone Frame */}
                  <div className="relative w-[220px] sm:w-[240px] md:w-[260px]">
                    <div
                      className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl ${
                        isAndroid
                          ? "rounded-[1.8rem] p-1.5"
                          : "rounded-[2.2rem] p-1.5"
                      }`}
                    >
                      <div
                        className={`relative bg-black overflow-hidden ${
                          isAndroid ? "rounded-[1.4rem]" : "rounded-[1.9rem]"
                        }`}
                      >
                        {/* Camera Notch */}
                        {isAndroid ? (
                          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-black ring-[2px] ring-gray-700/80 z-10">
                            <div className="absolute inset-[2px] rounded-full bg-gray-900/70" />
                          </div>
                        ) : (
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-b-xl z-10 flex items-center justify-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
                            <div className="w-8 h-2 bg-gray-900 rounded-full" />
                          </div>
                        )}

                        {/* Status Bar */}
                        <div
                          className={`absolute left-0 right-0 flex justify-between text-white/70 text-[8px] font-medium z-10 ${
                            isAndroid ? "top-1.5 px-3" : "top-2 px-5"
                          }`}
                        >
                          <span className="font-semibold">9:41</span>
                          <div className="flex items-center gap-1">
                            <Signal className="w-2 h-2" />
                            <Wifi className="w-2 h-2" />
                            <Battery className="w-3 h-2" />
                          </div>
                        </div>

                        {/* App Screenshot */}
                        <div
                          className="relative w-full"
                          style={{ aspectRatio: "9/19" }}
                        >
                          <img
                            src={getAppImage(app.imageKey)}
                            alt={app.title}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/30 rounded-full" />
                      </div>

                      {/* Side Buttons */}
                      {isAndroid ? (
                        <>
                          <div className="absolute right-0 top-16 translate-x-[1px] w-0.5 h-5 bg-gray-700 rounded-r-full" />
                          <div className="absolute right-0 top-24 translate-x-[1px] w-0.5 h-9 bg-gray-700 rounded-r-full" />
                          <div className="absolute left-0 top-20 -translate-x-[1px] w-0.5 h-8 bg-gray-700 rounded-l-full" />
                        </>
                      ) : (
                        <>
                          <div className="absolute left-0 top-16 -translate-x-[1.5px] w-0.5 h-6 bg-gray-700 rounded-l-full" />
                          <div className="absolute left-0 top-24 -translate-x-[1.5px] w-0.5 h-10 bg-gray-700 rounded-l-full" />
                          <div className="absolute right-0 top-20 translate-x-[1.5px] w-0.5 h-12 bg-gray-700 rounded-r-full" />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Download Buttons */}
                  <div className="mt-6 w-full max-w-[260px] space-y-3">
                    {/* iOS Button */}
                    {app.iosUrl && (
                      <button
                        onClick={() => openDownloadLink(app.iosUrl)}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-black text-white hover:scale-[1.02] hover:bg-gray-900 transition-all duration-300 shadow-md"
                      >
                        <Apple className="w-5 h-5" />
                        <div className="leading-tight text-left">
                          <div className="text-[10px] opacity-70">
                            Download on the
                          </div>
                          <div className="text-sm font-semibold">App Store</div>
                        </div>
                      </button>
                    )}

                    {/* Android / APK Button */}
                    {app.androidUrl && (
                      <button
                        onClick={() => openDownloadLink(app.androidUrl)}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-[1.02] hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-md"
                      >
                        <Cpu className="w-5 h-5" />
                        <div className="leading-tight text-left">
                          <div className="text-[10px] opacity-80">
                            GET IT ON
                          </div>
                          <div className="text-sm font-semibold">
                            {app.status === "Live"
                              ? "Google Play / APK"
                              : "Download APK"}
                          </div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side - App Details */}
              <div className="flex-1 min-w-0">
                {/* App Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.iconBg} flex items-center justify-center shadow-xl flex-shrink-0`}
                  >
                    <IconComponent className="text-white w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 truncate md:text-2xl dark:text-white">
                      {app.title}
                    </h2>
                    <p className="text-sm font-medium truncate text-primary">
                      {app.tagline}
                    </p>
                  </div>
                </div>

                {/* Rating & Platforms */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(app.rating)
                            ? "fill-amber-500 text-amber-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-base font-bold text-gray-900 dark:text-white">
                      {app.rating}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {app.platforms.map((platform, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-300"
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
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    About This App
                  </h3>
                  <div className="space-y-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {app.fullDescription.split("\n\n").map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {app.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-6">
                  <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {app.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  {app.metrics.map((metric, idx) => (
                    <div key={idx} className="text-center">
                      <metric.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <div className="text-base font-bold text-gray-900 dark:text-white">
                        {metric.value}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ============================================================
   WEB PROJECT CARD (Grid View)
============================================================ */
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
      className="cursor-pointer group"
    >
      <div className="relative h-full overflow-hidden transition-all duration-300 border bg-card rounded-xl sm:rounded-2xl border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden sm:h-52">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:opacity-100" />

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

          <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 bg-black/50 group-hover:opacity-100">
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-8 h-8 transition-all duration-300 transform translate-y-4 rounded-full sm:w-10 sm:h-10 bg-white/20 backdrop-blur group-hover:translate-y-0">
                <Eye className="w-4 h-4 text-white sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="mb-2 text-base font-bold transition-colors sm:text-lg text-foreground line-clamp-1 group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mb-3 text-xs sm:text-sm text-muted-foreground sm:mb-4 line-clamp-2">
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

          <div className="flex items-center justify-between pt-2 border-t sm:pt-3 border-border">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
              <span className="text-xs font-medium sm:text-sm">
                {project.rating}
              </span>
              <span className="text-[10px] sm:text-xs text-muted-foreground">
                /5
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-primary sm:text-sm">
              <span>Details</span>
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   WEB PROJECT LIST ITEM
============================================================ */
const WebProjectListItem = ({ project, index, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className="flex flex-col gap-4 p-4 transition-all duration-300 border sm:flex-row sm:p-5 bg-card rounded-xl border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1">
        <div className="relative flex-shrink-0 w-full h-32 overflow-hidden rounded-lg sm:w-48 sm:h-24">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-500/90 text-white">
            {project.status}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
            <h3 className="text-base font-bold transition-colors sm:text-lg text-foreground group-hover:text-primary">
              {project.title}
            </h3>
            <span className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary">
              {project.category}
            </span>
          </div>
          <p className="mb-2 text-xs sm:text-sm text-muted-foreground line-clamp-2">
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
            <div className="flex items-center gap-1 text-xs font-medium text-primary">
              <span>View Details</span>
              <ChevronRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ============================================================
   PROJECT MODAL (Web)
============================================================ */
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
        <div className="relative h-48 overflow-hidden sm:h-56 md:h-72">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
              {project.title}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`px-2 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs rounded-full bg-gradient-to-r ${project.color} text-white`}
              >
                {project.category}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-xs text-white/80 sm:text-sm">
                {project.status}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center transition-colors rounded-full top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-black/50 hover:bg-black/70"
          >
            <X className="w-3 h-3 text-white sm:w-4 sm:h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2 sm:gap-6">
            <div>
              <h3 className="mb-2 text-base font-semibold sm:text-lg sm:mb-3">
                Project Overview
              </h3>
              <p className="mb-4 text-xs leading-relaxed sm:text-sm text-muted-foreground sm:mb-6">
                {project.fullDescription}
              </p>
              <h3 className="mb-2 text-base font-semibold sm:text-lg sm:mb-3">
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
              <h3 className="mb-2 text-base font-semibold sm:text-lg sm:mb-3">
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
              <h3 className="mb-2 text-base font-semibold sm:text-lg sm:mb-3">
                Project Details
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Complexity
                  </span>
                  <span className="text-xs font-medium sm:text-sm">
                    {project.complexity}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Rating
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-500 text-amber-500" />
                    <span className="text-xs font-medium sm:text-sm">
                      {project.rating}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 mt-6 border-t sm:flex-row sm:gap-4 sm:mt-8 sm:pt-6 border-border">
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
