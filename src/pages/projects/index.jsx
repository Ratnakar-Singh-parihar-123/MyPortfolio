import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Apple,
  Smartphone as AndroidIcon,
  Download,
  Star,
  ChevronRight,
  Search,
  X,
  Eye,
  Github,
  Globe,
  Signal,
  Wifi,
  Battery,
} from "lucide-react";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import RelatedProjects from "./components/RelatedProjects";

// Import all images
import vsbp from "../../assets/projectsImg/VSBPImg/VSBPHome.png";
import yammiverse from "../../assets/projectsImg/yammiverse.png";
import bodp from "../../assets/projectsImg/bloodAndOrganDonationsImg/jeevandaancareHome.png";
import textutils from "../../assets/projectsImg/textUtilksImg/textutils.png";
import portfolio from "../../assets/projectsImg/portfolioImg/portfolioHome.png";
import SpiceCraft from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders Home.png";
import RestaurantMain from "../../assets/projectsImg/restaurantImg/restaurant home.png";
import CoachingMain from "../../assets/projectsImg/coachingWebsitesimg/CoachingWebsiite Home.png";
import tiffinDelivery from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDeliveryHome.png";
// import AppImgs from "../../assets/AppImg/app.png";

// app img
import safeGuard from "../../assets/AppImg/safeGuard.jpeg";
import parkingapp from "../../assets/AppImg/parkingapp.jpeg";
import ecomm from "../../assets/AppImg/ecomm.jpeg";

// Gallery images
import bodp1 from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation 2.png";
import bodp6 from "../../assets/projectsImg/bloodAndOrganDonationsImg/loadinghompeage.png";
import bodp2 from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation 3.png";
import bodp3 from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation hospitals.png";
import bodp4 from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation About.png";
import bodp5 from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation Footers.png";
import textutils1 from "../../assets/projectsImg/textUtilksImg/Textutils1.png";
import textutilshome from "../../assets/projectsImg/textUtilksImg/Textutils home.png";
import textutils2 from "../../assets/projectsImg/textUtilksImg/TextUtils 2.png";
import SpiceCraft1 from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders 1.png";
import SpiceCraft2 from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders 2.png";
import SpiceCraft3 from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders 3.png";
import SpiceCraft4 from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders 4.png";
import SpiceCraft5 from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders 5.png";
import SpiceCraft6 from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders 6.png";
import RestaurantMenu from "../../assets/projectsImg/restaurantImg/restaurant 1.png";
import RestaurantChef from "../../assets/projectsImg/restaurantImg/restaurant 2.png";
import RestaurantGallery from "../../assets/projectsImg/restaurantImg/restaurant 3.png";
import RestaurantAbout from "../../assets/projectsImg/restaurantImg/restaurant 4.png";
import UpcomingEvents from "../../assets/projectsImg/restaurantImg/restaurant 5.png";
import RestaurantContact from "../../assets/projectsImg/restaurantImg/restaurant 6.png";
import RestaurantFooter from "../../assets/projectsImg/restaurantImg/restaurant 7.png";
import CoachingCourses from "../../assets/projectsImg/coachingWebsitesimg/CoachingWebsiite 2.png";
import CoachingHomeSecond from "../../assets/projectsImg/coachingWebsitesimg/CoachingWebsiite Home 1.png";
import CoachingFeatures from "../../assets/projectsImg/coachingWebsitesimg/CoachingWebsiite 4.png";
import CoachingTestimonials from "../../assets/projectsImg/coachingWebsitesimg/CoachingWebsiite 4.png";
import TiffinDeliveryUser from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDeliveryUser.png";
import TiffinDeliveryAdmindashboard from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery1.png";
import TiffinDeliveryCreateAcc from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery2.png";
import TiffinDelivery3 from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery3.png";
import TiffinDelivery4 from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery4.png";
import TiffinDelivery5 from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery5.png";
import TiffinDelivery6 from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery6.png";
import TiffinDelivery7 from "../../assets/projectsImg/tiffinDeliveryImg/TiffinDelivery7.png";
import portfolioHome1 from "../../assets/projectsImg/portfolioImg/portfolioHome1.png";
import portfolio1 from "../../assets/projectsImg/portfolioImg/portfolio1.png";
import portfolio2 from "../../assets/projectsImg/portfolioImg/portfolio2.png";
import portfolio3 from "../../assets/projectsImg/portfolioImg/portfolio3.png";
import portfolio4 from "../../assets/projectsImg/portfolioImg/portfolio4.png";
import portfolio5 from "../../assets/projectsImg/portfolioImg/portfolio5.png";
import portfolio6 from "../../assets/projectsImg/portfolioImg/portfolio6.png";
import portfolio7 from "../../assets/projectsImg/portfolioImg/portfolio7.png";
import portfolio8 from "../../assets/projectsImg/portfolioImg/portfolio8.png";
import portfolio9 from "../../assets/projectsImg/portfolioImg/portfolio9.png";
import portfolio10 from "../../assets/projectsImg/portfolioImg/portfolio10.png";
import portfolio11 from "../../assets/projectsImg/portfolioImg/portfolio11.png";
import portfolio12 from "../../assets/projectsImg/portfolioImg/portfolio12.png";
import portfolio13 from "../../assets/projectsImg/portfolioImg/portfolio13.png";
import portfolio14 from "../../assets/projectsImg/portfolioImg/portfolio14.png";
import portfolio15 from "../../assets/projectsImg/portfolioImg/portfolio15.png";
import portfolio16 from "../../assets/projectsImg/portfolioImg/portfolio15.png";
import portfolio17 from "../../assets/projectsImg/portfolioImg/portfolio15.png";
import VSBP1 from "../../assets/projectsImg/VSBPImg/VSBP1.png";
import VSBP2 from "../../assets/projectsImg/VSBPImg/VSBP2.png";
import VSBP3 from "../../assets/projectsImg/VSBPImg/VSBP3.png";
import VSBP4 from "../../assets/projectsImg/VSBPImg/VSBP4.png";
import VSBP5 from "../../assets/projectsImg/VSBPImg/VSBP5.png";
import VSBP6 from "../../assets/projectsImg/VSBPImg/VSBP6.png";
import VSBP7 from "../../assets/projectsImg/VSBPImg/VSBP7.png";
import VSBP8 from "../../assets/projectsImg/VSBPImg/VSBP8.png";
import VSBP9 from "../../assets/projectsImg/VSBPImg/VSBP9.png";
import VSBP10 from "../../assets/projectsImg/VSBPImg/VSBP10.png";
import VSBP11 from "../../assets/projectsImg/VSBPImg/VSBP11.png";
import VSBP12 from "../../assets/projectsImg/VSBPImg/VSBP12.png";
import VSBP13 from "../../assets/projectsImg/VSBPImg/VSBP13.png";
import VSBP14 from "../../assets/projectsImg/VSBPImg/VSBP14.png";
import VSBP15 from "../../assets/projectsImg/VSBPImg/VSBP15.png";
import VSBP16 from "../../assets/projectsImg/VSBPImg/VSBP16.png";
import VSBP17 from "../../assets/projectsImg/VSBPImg/VSBP17.png";
import VSBP18 from "../../assets/projectsImg/VSBPImg/VSBP18.png";
import VSBP19 from "../../assets/projectsImg/VSBPImg/VSBP19.png";
import VSBP20 from "../../assets/projectsImg/VSBPImg/VSBP20.png";
import VSBP21 from "../../assets/projectsImg/VSBPImg/VSBP21.png";
import VSBP22 from "../../assets/projectsImg/VSBPImg/VSBP22.png";
import VSBP23 from "../../assets/projectsImg/VSBPImg/VSBP23.png";
import VSBP24 from "../../assets/projectsImg/VSBPImg/VSBP24.png";
import VSBP25 from "../../assets/projectsImg/VSBPImg/VSBP25.png";

// Web Projects Data
const webProjects = [
  {
    id: 1,
    title: "Vehicle Service Booking Platform",
    category: "Full-Stack Web Application",
    projectType: "fullstack",
    industry: "Automotive",
    description:
      "A real-time vehicle service booking system connecting customers with local service centers.",
    fullDescription: `Developed a real-world MERN stack platform enabling customers to book, track, and manage vehicle services online. Service centers can view customer requests, update service status, and handle digital payments. Includes live chat, order tracking, and dynamic dashboards.`,
    image: vsbp,
    gallery: [
      vsbp,
      VSBP1,
      VSBP2,
      VSBP3,
      VSBP4,
      VSBP5,
      VSBP6,
      VSBP7,
      VSBP8,
      VSBP9,
      VSBP10,
      VSBP11,
      VSBP12,
      VSBP13,
      VSBP14,
      VSBP15,
      VSBP16,
      VSBP17,
      VSBP18,
      VSBP19,
      VSBP20,
      VSBP21,
      VSBP22,
      VSBP23,
      VSBP24,
      VSBP25,
    ],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
    ],
    complexity: "Advanced",
    duration: "5 months",
    teamSize: "3",
    rating: 5,
    impact: "30% faster service process",
    liveUrl: "https://vehicle-service-booking-platform.onrender.com",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Vehicle-Service-Booking-Platform",
    features: [
      "Role-based login",
      "Real-time chat",
      "Live service tracking",
      "Payment management",
      "Analytics dashboards",
    ],
    metrics: [
      { icon: "Users", value: "1000+", label: "Active Users" },
      { icon: "Wrench", value: "500+", label: "Services Completed" },
      { icon: "Clock", value: "Real-time", label: "Service Tracking" },
    ],
    status: "Live",
    featured: true,
  },
  {
    id: 2,
    title: "YammiVerse",
    category: "Web Application",
    projectType: "react",
    industry: "Food & Recipes",
    description:
      "A community-driven recipe platform for sharing, exploring, and saving food recipes.",
    fullDescription: `Built a feature-rich MERN stack application that allows users to upload, save, and discover recipes. Includes user authentication, image uploads, and responsive design.`,
    image: yammiverse,
    gallery: [yammiverse],
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    complexity: "Intermediate",
    duration: "3 months",
    teamSize: "2",
    rating: 4,
    impact: "10K+ recipes shared",
    liveUrl: "https://yammiverse.onrender.com",
    githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
    features: [
      "User authentication",
      "Recipe creation",
      "Favorites",
      "Responsive UI",
      "Search filtering",
    ],
    metrics: [
      { icon: "Utensils", value: "10K+", label: "Recipes Uploaded" },
      { icon: "Users", value: "3K+", label: "Active Users" },
      { icon: "Heart", value: "8K+", label: "Recipes Liked" },
    ],
    status: "Live",
    featured: true,
  },
  {
    id: 3,
    title: "Jeevandaan – Blood & Organ Donation",
    category: "Full-Stack Application",
    projectType: "fullstack",
    industry: "Healthcare",
    description:
      "Real-time healthcare platform connecting blood and organ donors with recipients.",
    fullDescription: `Jeevandaan is an advanced MERN stack healthcare platform designed to reduce emergency response time by intelligently connecting donors, recipients, and hospitals in real time.`,
    image: bodp,
    gallery: [bodp6, bodp, bodp1, bodp2, bodp3, bodp4, bodp5],
    technologies: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Twilio",
      "Tailwind CSS",
      "Mapbox",
    ],
    complexity: "Advanced",
    duration: "4 months",
    teamSize: "3",
    rating: 5,
    impact: "300+ Lives Positively Impacted",
    liveUrl: "https://jeevandaancare.vercel.app/",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Blood-Organ-Donations-",
    features: [
      "Real-time donor matching",
      "OTP authentication",
      "Emergency alerts",
      "Hospital dashboard",
      "Location search",
    ],
    metrics: [
      { icon: "HeartPulse", value: "250+", label: "Successful Donations" },
      { icon: "Hospital", value: "60+", label: "Partner Hospitals" },
      { icon: "Users", value: "1800+", label: "Verified Donors" },
    ],
    status: "Production Ready",
    featured: true,
  },
  {
    id: 4,
    title: "TextUtils",
    category: "React Utility App",
    projectType: "react",
    industry: "Productivity",
    description:
      "A lightweight React-based text utility app offering real-time text transformations.",
    fullDescription: `Developed a fast, interactive web app using React to manipulate and analyze text. Supports uppercase/lowercase conversion, word/character counting, and reading time estimation.`,
    image: textutils,
    gallery: [textutils, textutils1, textutils2, textutilshome],
    technologies: ["React", "Tailwind CSS"],
    complexity: "Beginner",
    duration: "2 weeks",
    teamSize: "1",
    rating: 4,
    impact: "500+ daily users",
    liveUrl: "https://ratnakar-singh-parihar-123.github.io/TextUtils/",
    githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/TextUtils",
    features: [
      "Text transformation",
      "Word counter",
      "Reading time",
      "Dark mode",
    ],
    metrics: [
      { icon: "Users", value: "500+", label: "Daily Users" },
      { icon: "Star", value: "4.0", label: "Rating" },
    ],
    status: "Live",
  },
  {
    id: 5,
    title: "Personal Portfolio Website",
    category: "Web Portfolio",
    projectType: "react",
    industry: "Personal Branding",
    description:
      "A professional developer portfolio showcasing projects, achievements, and skills.",
    fullDescription: `Developed using React and Tailwind CSS, this portfolio highlights all professional work, projects, and achievements.`,
    image: portfolio,
    gallery: [
      portfolio,
      portfolioHome1,
      portfolio1,
      portfolio2,
      portfolio3,
      portfolio4,
      portfolio5,
      portfolio6,
      portfolio7,
      portfolio8,
      portfolio9,
      portfolio10,
      portfolio11,
      portfolio12,
      portfolio13,
      portfolio14,
      portfolio15,
      portfolio16,
      portfolio17,
    ],
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    complexity: "Intermediate",
    duration: "2 months",
    teamSize: "1",
    rating: 5,
    liveUrl: "https://my-portfolio-78gt.vercel.app/",
    githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/MyPortfolio",
    features: [
      "Dark mode",
      "Smooth animations",
      "Projects section",
      "Responsive design",
    ],
    metrics: [
      { icon: "Users", value: "100+", label: "Visitors" },
      { icon: "Star", value: "5.0", label: "Rating" },
    ],
    status: "Live",
    featured: true,
  },
  {
    id: 6,
    title: "SpiceCraft Traders",
    category: "E-commerce Website",
    projectType: "htmlcss",
    industry: "Food & Spices",
    description:
      "A clean, responsive HTML-CSS website for a fictional spice brand.",
    fullDescription: `SpiceCraft Traders is a visually appealing and fast-loading spice brand website built using pure HTML and CSS.`,
    image: SpiceCraft,
    gallery: [
      SpiceCraft,
      SpiceCraft1,
      SpiceCraft2,
      SpiceCraft3,
      SpiceCraft4,
      SpiceCraft5,
      SpiceCraft6,
    ],
    technologies: ["HTML", "CSS"],
    complexity: "Beginner",
    duration: "1 week",
    teamSize: "1",
    rating: 3,
    liveUrl: "https://spice-craft-traders.vercel.app/",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/SpiceCraft-Traders",
    features: [
      "Hero banner",
      "Product section",
      "Hover animations",
      "Contact form",
      "Responsive",
    ],
    metrics: [{ icon: "Eye", value: "1K+", label: "Views" }],
    status: "Live",
  },
  {
    id: 7,
    title: "FlavorBite Restaurant",
    category: "Landing Page",
    projectType: "htmlcss",
    industry: "Food & Restaurant",
    description:
      "A modern, responsive restaurant landing page built with pure HTML and CSS.",
    fullDescription: `FlavorBite Restaurant is a fully responsive restaurant landing page with sections like hero banner, about us, menu highlights, services, and contact form.`,
    image: RestaurantMain,
    gallery: [
      RestaurantMain,
      RestaurantMenu,
      RestaurantAbout,
      RestaurantChef,
      RestaurantGallery,
      RestaurantContact,
      UpcomingEvents,
      RestaurantFooter,
    ],
    technologies: ["HTML", "CSS"],
    complexity: "Beginner",
    duration: "5 days",
    teamSize: "1",
    rating: 3,
    liveUrl: "https://restaurant-landing-page-one.vercel.app/",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Restaurant-Landing-Page",
    features: [
      "Hero section",
      "Menu highlights",
      "Gallery",
      "Contact form",
      "Responsive",
    ],
    metrics: [],
    status: "Live",
  },
  {
    id: 8,
    title: "EduMentor Coaching",
    category: "Landing Page",
    projectType: "htmlcss",
    industry: "Education & Coaching",
    description:
      "A clean and responsive coaching-course landing page built with pure HTML and CSS.",
    fullDescription: `EduMentor Coaching is a fully responsive coaching landing page with sections like hero banner, courses offered, features, testimonials, and contact form.`,
    image: CoachingMain,
    gallery: [
      CoachingMain,
      CoachingHomeSecond,
      CoachingCourses,
      CoachingFeatures,
      CoachingTestimonials,
    ],
    technologies: ["HTML", "CSS"],
    complexity: "Beginner",
    duration: "5 days",
    teamSize: "1",
    rating: 3,
    liveUrl: "https://coaching-course-website.vercel.app/",
    githubUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/Coaching-Course-Website",
    features: [
      "Hero section",
      "Courses section",
      "Testimonials",
      "Contact form",
      "Responsive",
    ],
    metrics: [],
    status: "Live",
  },
  {
    id: 9,
    title: "Tiffin Delivery Web App",
    category: "Food Delivery",
    projectType: "react",
    industry: "Food & Services",
    description:
      "A modern tiffin delivery web application with user authentication.",
    fullDescription: `Built using React and Tailwind CSS, this tiffin delivery platform allows users to register, log in, and explore daily meal plans.`,
    image: tiffinDelivery,
    gallery: [
      tiffinDelivery,
      TiffinDeliveryUser,
      TiffinDeliveryCreateAcc,
      TiffinDeliveryAdmindashboard,
      TiffinDelivery3,
      TiffinDelivery4,
      TiffinDelivery5,
      TiffinDelivery6,
      TiffinDelivery7,
    ],
    technologies: ["React", "Tailwind CSS", "React Router"],
    complexity: "Intermediate",
    duration: "1.5 months",
    teamSize: "1",
    rating: 4.8,
    liveUrl: "https://tiffin-delievery.vercel.app/",
    githubUrl: "https://github.com/your-username/tiffin-delivery",
    features: [
      "User login/signup",
      "Form validation",
      "Protected routes",
      "Responsive UI",
    ],
    metrics: [],
    status: "Live",
    featured: true,
  },
];

// Mobile Apps Data with phone mockup styling
const mobileAppsData = [
  {
    id: "app1",
    title: "SafeGuard",
    projectType: "mobile",
    description:
      "Real-time emergency response app with one-tap SOS alerts and live location sharing.",

    fullDescription: `SafeGuard is a real-time emergency response application built using React Native. It allows users to instantly send SOS alerts to emergency contacts along with live location tracking during critical situations. The app ensures user safety through fast communication, automatic alerts, and background tracking.\n\nAdditionally, users can quickly find nearby hospitals, police stations, and emergency services using integrated map features, ensuring immediate help when needed.`,

    image: safeGuard,
    gallery: [safeGuard],

    technologies: [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Google Maps API",
    ],

    platforms: ["iOS", "Android"],
    complexity: "Advanced",
    duration: "4 months",
    teamSize: "1",

    impact: "Improves emergency response time and user safety",
    liveUrl: "",
    githubUrl: "",
    status: "Planned",
    featured: true,

    iconColor: "from-red-500 to-pink-600",
    iconName: "Shield",
  },

  {
    id: "app2",
    title: "ParkEasy",
    projectType: "mobile",
    description:
      "Smart parking app with nearby search, real-time availability, and slot booking with secure payments.",

    fullDescription: `ParkEasy is a smart parking management application designed to simplify finding and booking parking spaces in urban areas. Users can search for nearby parking spots, check real-time slot availability, and book parking with integrated payment support.\n\nThe platform also includes a powerful admin system where parking owners can manage locations, monitor available and occupied slots, define parking capacity, and control overall parking operations efficiently.\n\nThis system reduces the time and stress of finding parking while providing full control and insights to parking owners.`,

    image: parkingapp,
    gallery: [parkingapp],

    technologies: ["React Native", "CSS", "Node.js", "Express.js", "MongoDB"],

    platforms: ["iOS", "Android"],
    complexity: "Intermediate",
    duration: "2 months",
    teamSize: "1",

    impact: "Optimizes parking management and reduces search time",
    liveUrl:
      "https://github.com/Ratnakar-Singh-parihar-123/ParkEasy/releases/download/v1.0/application-2b19fc59-78f1-4a7e-91b1-c437d35ac120.apk",
    githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/ParkEasy",
    status: "Planned",
    featured: true,

    iconColor: "from-blue-500 to-indigo-600",
    iconName: "Car",
  },

  {
    id: "app3",
    title: "ReWear Market",
    projectType: "mobile",
    description:
      "Second-hand marketplace app with real-time chat and smart product discovery.",

    fullDescription: `ReWear Market is a full-stack mobile marketplace application that enables users to buy and sell pre-owned products بسهولة. Users can list items with images, browse products using advanced search and filters, and connect with buyers/sellers through real-time chat.\n\nThe platform includes wishlist functionality, user profile management, and secure image uploads using Cloudinary. Built with scalability in mind, the app ensures a smooth and engaging user experience for modern digital commerce.`,

    image: ecomm,
    gallery: [ecomm],

    technologies: [
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
    ],

    platforms: ["iOS", "Android"],
    complexity: "Intermediate",
    duration: "4 months",
    teamSize: "1",

    impact: "Promotes sustainable and affordable shopping",
    liveUrl: "",
    githubUrl: "",
    status: "Planned",
    featured: true,

    iconColor: "from-purple-500 to-pink-500",
    iconName: "ShoppingBag",
  },
];

// Merge all projects
const allProjects = [...webProjects, ...mobileAppsData];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("category");

  const categories = [
    { id: "all", name: "All Projects", icon: "Grid3x3" },
    { id: "fullstack", name: "Full Stack", icon: "Layers" },
    { id: "react", name: "React Apps", icon: "React" },
    { id: "htmlcss", name: "HTML/CSS", icon: "Code" },
    { id: "mobile", name: "Mobile Apps", icon: "Smartphone" },
  ];

  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return allProjects.length;
    return allProjects.filter((p) => p.projectType === categoryId).length;
  };

  const filteredProjects = useMemo(() => {
    let filtered = allProjects;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((project) => {
        if (project.title?.toLowerCase().includes(query)) return true;
        if (project.description?.toLowerCase().includes(query)) return true;
        if (
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(query),
          )
        )
          return true;
        if (project.industry?.toLowerCase().includes(query)) return true;
        if (
          project.features?.some((feature) =>
            feature.toLowerCase().includes(query),
          )
        )
          return true;
        if (project.category?.toLowerCase().includes(query)) return true;
        return false;
      });
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.projectType === activeCategory,
      );
    }

    switch (sortBy) {
      case "category":
        const typeOrder = { fullstack: 1, react: 2, htmlcss: 3, mobile: 4 };
        return [...filtered].sort(
          (a, b) => typeOrder[a.projectType] - typeOrder[b.projectType],
        );
      case "recent":
        return [...filtered].sort((a, b) => b.id - a.id);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "complexity":
        const complexityOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return [...filtered].sort(
          (a, b) =>
            complexityOrder[b.complexity] - complexityOrder[a.complexity],
        );
      default:
        return filtered;
    }
  }, [searchQuery, activeCategory, sortBy]);

  const clearSearch = () => setSearchQuery("");
  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="FolderKanban" size={36} className="text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-5">
              My <span className="text-gradient-brand">Project Portfolio</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              Explore my journey through full-stack applications, React
              projects, HTML/CSS websites, and cross-platform mobile apps for
              iOS & Android.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Icon name="Layers" size={14} /> Full-Stack Apps
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium">
                <Icon name="React" size={14} /> React Projects
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium">
                <Icon name="Code" size={14} /> HTML/CSS Websites
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium">
                <Icon name="Smartphone" size={14} /> Mobile Apps
                <span className="ml-1 text-xs">iOS & Android</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-brand">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects by title, technology, industry, or features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 text-base bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all shadow-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-muted-foreground">
                    Found{" "}
                    <span className="font-semibold text-primary">
                      {filteredProjects.length}
                    </span>{" "}
                    project{filteredProjects.length !== 1 ? "s" : ""} matching "
                    <span className="font-medium text-foreground">
                      {searchQuery}
                    </span>
                    "
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Browse by Category
                </h2>
                <p className="text-muted-foreground mt-1">
                  Filter projects based on technology stack
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: {allProjects.length} projects
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-card hover:bg-accent text-foreground"
                  }`}
                >
                  <Icon name={category.icon} size={18} />
                  <span className="font-medium">{category.name}</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeCategory === category.id ? "bg-white/20" : "bg-primary/10 text-primary"}`}
                  >
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Section */}
          <div className="flex justify-end mb-6">
            <div className="flex items-center space-x-3">
              <Icon
                name="ArrowUpDown"
                size={20}
                className="text-muted-foreground"
              />
              <span className="text-sm font-medium text-foreground">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="category">Category</option>
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
                <option value="complexity">Complexity</option>
              </select>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) =>
              project.projectType === "mobile" ? (
                <MobileAppPhoneCard
                  key={project.id}
                  app={project}
                  onViewDetails={handleViewDetails}
                  index={index}
                />
              ) : (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={handleViewDetails}
                  index={index}
                />
              ),
            )}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-card rounded-2xl border border-border"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Projects Found
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {searchQuery
                  ? `No projects matching "${searchQuery}". Try a different search term.`
                  : "No projects in this category. Try selecting a different category."}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  iconName="X"
                  iconPosition="left"
                  onClick={clearSearch}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Clear Search
                </Button>
              )}
            </motion.div>
          )}

          {/* Related Projects */}
          {selectedProject && (
            <RelatedProjects
              projects={allProjects}
              currentProject={selectedProject}
              onProjectSelect={handleViewDetails}
            />
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-card via-background to-card">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-3">
              By the Numbers
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A quick look at my project portfolio across different technologies
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Layers" size={24} className="text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">
                    Full-Stack Apps
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete MERN stack applications with backend APIs, databases,
                and authentication
              </p>
            </div>
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Icon name="React" size={24} className="text-blue-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">
                    React Projects
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern React applications with state management, responsive
                design, and interactive features
              </p>
            </div>
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Icon name="Code" size={24} className="text-emerald-500" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">
                    HTML/CSS Websites
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Responsive websites built with pure HTML & CSS, focusing on
                clean design
              </p>
            </div>
            <div className="bg-background p-6 rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Icon
                    name="Smartphone"
                    size={24}
                    className="text-purple-500"
                  />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">
                    Mobile Apps
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Cross-platform mobile apps for iOS & Android built with React
                Native
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="container-brand">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Icon name="Rocket" size={30} className="text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug text-foreground">
              Ready to Build Something{" "}
              <span className="text-gradient-brand">Amazing?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              From full-stack web applications to React Native mobile apps and
              modern websites, I'm always excited to collaborate and transform
              ideas into scalable, user-friendly, and impactful digital
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="px-8 font-semibold shadow-md hover:shadow-lg"
                onClick={() =>
                  (window.location.href =
                    "mailto:ratnakarsinghparihar9399@gmail.com")
                }
              >
                Start a Conversation
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Github"
                iconPosition="left"
                className="px-8 font-medium"
                onClick={() =>
                  window.open(
                    "https://github.com/Ratnakar-Singh-parihar-123",
                    "_blank",
                  )
                }
              >
                View GitHub
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

// Mobile App Phone Card Component - Complete Phone Mockup Design
const MobileAppPhoneCard = ({ app, onViewDetails, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIconName = (iconName) => {
    switch (iconName) {
      case "Shield":
        return "Shield";
      case "FileText":
        return "FileText";
      case "ShoppingBag":
        return "ShoppingBag";
      default:
        return "Smartphone";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(app)}
      className="group cursor-pointer"
    >
      <div className="relative h-full bg-gradient-to-br from-card to-card/80 rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 p-4">
        {/* Compact Layout */}
        <div className="flex gap-4">
          {/* Smaller Phone Mockup */}
          <div className="flex-shrink-0">
            <div className="relative w-[140px]">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-xl">
                <div className="relative bg-black rounded-xl overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[25px] bg-black rounded-b-lg z-10 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-green-400/60" />
                  </div>

                  {/* App Screenshot */}
                  <div
                    className="relative w-full"
                    style={{ aspectRatio: "9/19" }}
                  >
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Status Bar */}
                    <div className="absolute top-1 left-0 right-0 px-3 py-0.5 flex justify-between text-white/60 text-[7px] font-medium">
                      <span>9:41</span>
                      <div className="flex items-center gap-0.5">
                        <Signal className="w-2 h-2" />
                        <Wifi className="w-2 h-2" />
                        <Battery className="w-2.5 h-2" />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-6 left-1">
                      <span className="px-1.5 py-0.5 text-[6px] font-semibold rounded-full bg-green-500/90 text-white backdrop-blur-sm">
                        {app.status}
                      </span>
                    </div>

                    {/* Platform Badge */}
                    <div className="absolute top-6 right-1">
                      <span className="px-1.5 py-0.5 text-[6px] font-medium rounded-full bg-purple-500/90 text-white backdrop-blur-sm flex items-center gap-0.5">
                        {app.platforms?.includes("iOS") && (
                          <Apple className="w-1.5 h-1.5" />
                        )}
                        {app.platforms?.includes("Android") && (
                          <AndroidIcon className="w-1.5 h-1.5" />
                        )}
                      </span>
                    </div>

                    {/* App Icon Overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${app.iconColor} flex items-center justify-center shadow-lg`}
                      >
                        <Icon
                          name={getIconName(app.iconName)}
                          size={18}
                          className="text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-white/20 rounded-full" />
                </div>

                {/* Side Buttons */}
                <div className="absolute left-0 top-12 -translate-x-[1px] w-0.5 h-5 bg-gray-700 rounded-l-full" />
                <div className="absolute left-0 top-18 -translate-x-[1px] w-0.5 h-8 bg-gray-700 rounded-l-full" />
                <div className="absolute right-0 top-14 translate-x-[1px] w-0.5 h-10 bg-gray-700 rounded-r-full" />
              </div>
            </div>
          </div>

          {/* App Info - Compact Version */}
          <div className="flex-1 min-w-0">
            {/* Header with Icon */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-8 h-8 rounded-lg bg-gradient-to-br ${app.iconColor} flex items-center justify-center shadow-md flex-shrink-0`}
              >
                <Icon
                  name={getIconName(app.iconName)}
                  size={16}
                  className="text-white"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors truncate">
                  {app.title}
                </h3>
                <p className="text-[10px] text-muted-foreground truncate">
                  {app.category || "Mobile App"}
                </p>
              </div>
            </div>

            {/* Rating */}
            {/* <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < Math.floor(app.rating) ? "fill-amber-500 text-amber-500" : "text-muted-foreground opacity-30"}`}
                />
              ))}
              <span className="text-xs font-medium ml-0.5">{app.rating}</span>
            </div> */}

            {/* Description */}
            <p className="text-[11px] text-muted-foreground mb-2 line-clamp-2">
              {app.description}
            </p>

            {/* Tech Stack - Compact */}
            <div className="flex flex-wrap gap-1 mb-2">
              {app.technologies?.slice(0, 2).map((tech, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 text-[8px] bg-muted text-muted-foreground rounded"
                >
                  {tech.split(" ")[0]}
                </span>
              ))}
              {app.technologies?.length > 2 && (
                <span className="px-1.5 py-0.5 text-[8px] bg-muted text-muted-foreground rounded">
                  +{app.technologies.length - 2}
                </span>
              )}
            </div>

            {/* Platforms - Compact */}
            <div className="flex items-center gap-1 mb-2">
              {app.platforms.map((platform, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-0.5 px-1.5 py-0.5 text-[8px] bg-muted rounded-full"
                >
                  {platform === "iOS" ? (
                    <Apple className="w-2 h-2" />
                  ) : (
                    <AndroidIcon className="w-2 h-2" />
                  )}
                  {platform}
                </span>
              ))}
            </div>

            {/* Metrics - Compact */}
            <div className="flex items-center justify-between mb-2 text-[10px]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-muted-foreground">
                  <Icon name="Calendar" size={9} />
                  <span>{app.duration}</span>
                </div>
                <div className="flex items-center gap-0.5 text-muted-foreground">
                  <Icon name="Users" size={9} />
                  <span>{app.teamSize}</span>
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-success">
                <Icon name="TrendingUp" size={9} />
                <span className="font-medium">{app.impact}</span>
              </div>
            </div>

            {/* Action Buttons - Compact */}
            <div className="flex gap-1.5">
              {app.liveUrl && (
                <Button
                  variant="secondary"
                  size="xs"
                  iconName="ExternalLink"
                  iconPosition="left"
                  className="flex-1 text-[10px] h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(app.liveUrl, "_blank");
                  }}
                >
                  Live
                </Button>
              )}
              {app.githubUrl && (
                <Button
                  variant="outline"
                  size="xs"
                  iconName="Github"
                  className="flex-1 text-[10px] h-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(app.githubUrl, "_blank");
                  }}
                >
                  Code
                </Button>
              )}
              <Button
                variant="outline"
                size="xs"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => onViewDetails(app)}
                className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 text-[10px] h-7"
              >
                Details
              </Button>
            </div>
          </div>
        </div>

        {/* Complexity Badge - Repositioned */}
        <div className="absolute top-3 right-3">
          <div
            className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium ${
              app.complexity === "Advanced"
                ? "bg-destructive/10 text-destructive border border-destructive/20"
                : app.complexity === "Intermediate"
                  ? "bg-warning/10 text-warning border border-warning/20"
                  : "bg-success/10 text-success border border-success/20"
            }`}
          >
            {app.complexity}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Optional: Add xs size to your Button component if not already present
// Button component size variants:
// size="xs" -> padding: "py-1 px-2", text: "text-[10px]", height: "h-7"
export default Projects;
