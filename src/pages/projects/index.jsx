import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectFilters from "./components/ProjectFilters";
import RelatedProjects from "./components/RelatedProjects";

// Import all images
// Main project images
import vsbp from "../../assets/projectsImg/vsbp.png";
import yammiverse from "../../assets/projectsImg/yammiverse.png";
import bodp from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation Home.png";
import textutils from "../../assets/projectsImg/textUtilksImg/textutils.png";
import portfolio from "../../assets/projectsImg/myportfolio.png";
import SpiceCraft from "../../assets/projectsImg/spiceCraftTradersImg/SpiceCraft Traders Home.png";
import RestaurantMain from "../../assets/projectsImg/restaurantImg/restaurant home.png";
import CoachingMain from "../../assets/projectsImg/coachingWebsitesimg/CoachingWebsiite Home.png";

// Gallery images
import bodp1 from "../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation 2.png";
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

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    technology: [],
    industry: [],
    complexity: [],
    category: [], // New category filter
  });
  const [sortBy, setSortBy] = useState("category");
  const [activeCategory, setActiveCategory] = useState("all");

  // Categories for tabs
  const categories = [
    { id: "all", name: "All Projects", icon: "Grid3x3", count: 8 },
    { id: "fullstack", name: "Full Stack", icon: "Layers", count: 3 },
    { id: "react", name: "React Apps", icon: "React", count: 3 },
    { id: "htmlcss", name: "HTML/CSS", icon: "Code", count: 3 },
  ];

  // Define project categories explicitly
  const projects = [
    // Full Stack Projects
    {
      id: 1,
      title: "Vehicle Service Booking Platform",
      category: "Full-Stack Web Application",
      projectType: "fullstack",
      industry: "Automotive",
      description:
        "A real-time vehicle service booking system connecting customers with local service centers through an intuitive online platform.",
      fullDescription: `Developed a real-world MERN stack platform enabling customers to book, track, and manage vehicle services online. Service centers can view customer requests, update service status, and handle digital payments. 
  Includes live chat, order tracking, and dynamic dashboards for both customers and admins.`,
      image: vsbp,
      gallery: [vsbp],
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
        "Role-based login for customers and service centers",
        "Real-time chat using Socket.io",
        "Live service tracking and notifications",
        "Payment and invoice management",
        "Admin and analytics dashboards",
      ],
      challenges: [
        {
          problem: "Maintaining real-time synchronization for multiple users.",
          solution:
            "Used WebSockets (Socket.io) for event-based updates and state synchronization between clients and servers.",
        },
        {
          problem: "Performance issues with large service data sets.",
          solution:
            "Optimized queries using MongoDB indexes and implemented pagination for scalability.",
        },
      ],
      metrics: [
        { icon: "Users", value: "1000+", label: "Active Users" },
        { icon: "Wrench", value: "500+", label: "Services Completed" },
        { icon: "Clock", value: "Real-time", label: "Service Tracking" },
      ],
      learnings: [
        "Efficient WebSocket handling is key for real-time platforms.",
        "MongoDB indexing greatly enhances scalability and performance.",
      ],
      testimonial: {
        content:
          "Our service operations became more organized and transparent after implementing this system.",
        author: "Amit Verma",
        role: "Service Center Owner",
      },
      badge: "Featured",
      featured: true,
    },
    {
      id: 2,
      title: "YammiVerse",
      category: "Web Application",
      projectType: "fullstack",
      industry: "Food & Recipes",
      description:
        "A community-driven recipe platform for sharing, exploring, and saving food recipes with images and ingredients.",
      fullDescription: `Built a feature-rich MERN stack application that allows users to upload, save, and discover recipes. 
  Includes user authentication, image uploads, and responsive design for smooth browsing across devices.`,
      image: yammiverse,
      gallery: [yammiverse],
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Tailwind CSS",
      ],
      complexity: "Intermediate",
      duration: "3 months",
      teamSize: "2",
      rating: 4,
      impact: "10K+ recipes shared",
      liveUrl: "https://yammiverse.onrender.com",
      githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
      features: [
        "User authentication and profile management",
        "Recipe creation with image uploads",
        "Favorites and save recipes",
        "Responsive modern UI",
        "Search and category filtering",
      ],
      challenges: [
        {
          problem: "Handling large image uploads efficiently.",
          solution:
            "Used Cloudinary integration for optimized and fast image delivery.",
        },
        {
          problem: "Implementing fast recipe search across categories.",
          solution:
            "Added full-text search and MongoDB indexing for better performance.",
        },
      ],
      metrics: [
        { icon: "Utensils", value: "10K+", label: "Recipes Uploaded" },
        { icon: "Users", value: "3K+", label: "Active Users" },
        { icon: "Heart", value: "8K+", label: "Recipes Liked" },
      ],
      learnings: [
        "Media handling can drastically affect performance and UX.",
        "Optimized searching ensures scalability in data-heavy apps.",
      ],
      testimonial: {
        content:
          "I love how YammiVerse connects food lovers like me! Clean UI and super-fast uploads.",
        author: "Priya Sharma",
        role: "Food Blogger",
      },
      featured: true,
    },
    {
      id: 3,
      title: "Blood & Organ Donation Platform",
      category: "Full-Stack Application",
      projectType: "fullstack",
      industry: "Healthcare",
      description:
        "A social impact platform connecting blood and organ donors with recipients and hospitals in real time.",
      fullDescription: `Built a MERN stack donation management platform to streamline the donor-recipient connection process. 
  Includes role-based dashboards, secure data handling, and campaign management tools for hospitals.`,
      image: bodp,
      gallery: [bodp, bodp1, bodp2, bodp3, bodp4, bodp5],
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Framer Motion",
        "Tailwind CSS",
      ],
      complexity: "In Progress",
      duration: "4 months",
      teamSize: "3",
      rating: 5,
      impact: "300+ lives impacted",
      liveUrl: "",
      githubUrl: "",
      features: [
        "Role-based dashboards for donors, hospitals, and admins",
        "Donation tracking system",
        "Secure data and user verification",
        "Campaign management for hospitals",
        "Animated, accessible UI with Framer Motion",
      ],
      challenges: [
        {
          problem:
            "Ensuring data privacy and security in healthcare environment.",
          solution:
            "Implemented encryption, secure authentication, and access control at multiple levels.",
        },
        {
          problem: "Maintaining engagement between donors and hospitals.",
          solution:
            "Added campaign updates and notifications for better transparency and trust.",
        },
      ],
      metrics: [
        { icon: "HeartPulse", value: "200+", label: "Successful Donations" },
        { icon: "Hospital", value: "50+", label: "Partner Hospitals" },
        { icon: "Users", value: "1500+", label: "Registered Donors" },
      ],
      learnings: [
        "Security and trust are fundamental for healthcare apps.",
        "Real-time notifications enhance platform credibility.",
      ],
      testimonial: {
        content:
          "This platform revolutionized how we connect with donors — saving precious time in emergencies.",
        author: "Dr. Meera Patel",
        role: "Medical Director",
      },
      badge: "Social Impact",
    },

    // React Projects
    {
      id: 4,
      title: "TextUtils",
      category: "React Utility App",
      projectType: "react",
      industry: "Productivity",
      description:
        "A lightweight React-based text utility app offering real-time text transformations and analytics.",
      fullDescription: `Developed a fast, interactive web app using React to manipulate and analyze text. 
  Supports uppercase/lowercase conversion, word/character counting, and reading time estimation.`,
      image: textutils,
      gallery: [textutils, textutils1, textutils2, textutilshome],
      technologies: ["React", "Tailwind CSS", "APIs"],
      complexity: "Beginner",
      duration: "2 weeks",
      teamSize: "1",
      rating: 4,
      impact: "500+ daily users",
      liveUrl: "https://ratnakar-singh-parihar-123.github.io/TextUtils/",
      githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/TextUtils",
      features: [
        "Instant text transformation (uppercase/lowercase)",
        "Word and character counter",
        "Reading time calculator",
        "Dark/light mode toggle",
        "Responsive minimal UI",
      ],
      learnings: [
        "React state management makes UI updates seamless.",
        "Clean UX and utility apps can attract consistent daily users.",
      ],
      testimonial: {
        content:
          "Simple yet powerful — a must-have tool for content creators and developers.",
        author: "Anjali Gupta",
        role: "Freelance Writer",
      },
    },
    {
      id: 5,
      title: "Personal Portfolio Website",
      category: "Web Portfolio",
      projectType: "react",
      industry: "Personal Branding",
      description:
        "A professional developer portfolio showcasing projects, achievements, and skills with dark/light mode and responsive design.",
      fullDescription: `Developed using React and Tailwind CSS, this portfolio highlights all professional work, projects, and achievements. 
  Includes dynamic sections like About, Skills, Projects, Achievements, and Contact with a polished responsive layout.`,
      image: portfolio,
      gallery: [portfolio],
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      complexity: "Intermediate",
      duration: "2 months",
      teamSize: "1",
      rating: 5,
      impact: "100% recruiter-friendly design",
      liveUrl: "https://my-portfolio-78gt.vercel.app/",
      githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/MyPortfolio",
      features: [
        "Dark/light mode toggle",
        "Smooth animations using Framer Motion",
        "Projects, achievements, and skills section",
        "Fully responsive and optimized UI",
        "Contact form integration",
      ],
      learnings: [
        "Portfolio design should reflect developer personality and skill depth.",
        "Animations enhance user experience when used subtly.",
      ],
      testimonial: {
        content:
          "The portfolio beautifully represents Ratnakar's skills and creative design sense.",
        author: "Anonymous Reviewer",
        role: "Frontend Developer",
      },
      featured: true,
    },

    // HTML/CSS Projects
    {
      id: 6,
      title: "SpiceCraft Traders",
      category: "E-commerce Website",
      projectType: "htmlcss",
      industry: "Food & Spices",
      description:
        "A clean, responsive HTML-CSS website created for a fictional spice brand, showcasing high-quality masalas with a modern UI.",
      fullDescription: `SpiceCraft Traders is a visually appealing and fast-loading spice brand website built using pure HTML and CSS. 
  Designed with a premium masala brand theme, the site highlights products such as turmeric, red chili powder, cumin, and garam masala.
  It includes smooth hover effects, product cards, brand story section, contact form, and fully mobile-responsive layouts.`,
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
        "Modern landing page with hero spice banner",
        "Dedicated product section (masalas, herbs, blends)",
        "Smooth hover animations for product cards",
        "Brand story + quality assurance section",
        "Contact form for customer inquiries",
        "Fully responsive layout for mobile/tablet/desktop",
      ],
      learnings: [
        "Mastered responsive design fundamentals using pure CSS.",
        "Learned how to structure brand-themed landing pages with product cards.",
        "Improved my UI sense for color combinations and layout spacing.",
      ],
      testimonial: {
        content:
          "The website feels premium and gives a real spice brand vibe. Clean, fast, and visually appealing!",
        author: "Radhika Sharma",
        role: "Food Blogger",
      },
      impact:
        "Gives a professional brand identity feel — ideal for small spice businesses.",
    },
    {
      id: 7,
      title: "FlavorBite Restaurant",
      category: "Landing Page",
      projectType: "htmlcss",
      industry: "Food & Restaurant",
      description:
        "A modern, responsive restaurant landing page built using pure HTML and CSS, showcasing menu, ambiance, and contact details with a clean UI.",
      fullDescription: `FlavorBite Restaurant is a fully responsive and visually engaging restaurant landing page developed using pure HTML and CSS.
  The website is designed to represent a real-world restaurant with sections like hero banner, about us, menu highlights, services, and contact form.
  It focuses on clean layout, smooth hover effects, and mobile-first responsiveness to deliver a complete website-like experience.`,
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
      duration: "5–7 days",
      teamSize: "1",
      rating: 3,
      liveUrl: "https://restaurant-landing-page-one.vercel.app/",
      githubUrl:
        "https://github.com/Ratnakar-Singh-parihar-123/Restaurant-Landing-Page",
      features: [
        "Attractive hero section with restaurant branding",
        "About section describing restaurant story",
        "Menu highlights with food cards",
        "Smooth hover effects and transitions",
        "Food gallery section",
        "Contact form with restaurant details",
        "Fully responsive for mobile, tablet, and desktop",
      ],
      learnings: [
        "Understood real-world website layout structure using HTML.",
        "Improved CSS skills including Flexbox and responsive design.",
        "Learned how to build a complete landing page without JavaScript.",
        "Enhanced UI design sense for food and restaurant websites.",
      ],
      testimonial: {
        content:
          "The website looks professional and perfectly represents a modern restaurant. Clean layout and smooth responsiveness.",
        author: "Amit Verma",
        role: "Restaurant Owner",
      },
      impact:
        "Provides a professional online presence for restaurants and cafes, suitable for showcasing menus and attracting customers.",
    },
    {
      id: 8,
      title: "EduMentor Coaching",
      category: "Landing Page",
      projectType: "htmlcss",
      industry: "Education & Coaching",
      description:
        "A clean and responsive coaching-course landing page built using pure HTML and CSS, designed to promote courses and boost student engagement.",
      fullDescription: `EduMentor Coaching is a fully responsive coaching and online course landing page developed using pure HTML and CSS.
  The website is structured like a real educational platform with sections such as hero banner, courses offered, features, testimonials,
  instructor highlights, and a contact/enrollment section. The focus is on clarity, readability, and conversion-oriented UI.`,
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
      duration: "5–7 days",
      teamSize: "1",
      rating: 3,
      liveUrl: "https://coaching-course-website.vercel.app/",
      githubUrl:
        "https://github.com/Ratnakar-Singh-parihar-123/Coaching-Course-Website",
      features: [
        "Hero section with coaching brand and call-to-action",
        "Courses section with structured course cards",
        "Why choose us / key features section",
        "Mentor or instructor highlight section",
        "Student testimonials section",
        "Contact / enrollment form",
        "Fully responsive layout for all screen sizes",
      ],
      learnings: [
        "Learned how to design education-focused landing pages.",
        "Improved responsive design using CSS Flexbox and media queries.",
        "Understood content hierarchy for better user engagement.",
        "Enhanced UI skills for professional and minimal layouts.",
      ],
      testimonial: {
        content:
          "A well-structured and professional coaching website layout. Very clean and student-friendly design.",
        author: "Neha Gupta",
        role: "Online Educator",
      },
      impact:
        "Helps coaching institutes and educators establish a strong online presence and attract students effectively.",
    },
  ];

  // Filter options
  const filterOptions = {
    technologies: [...new Set(projects.flatMap((p) => p.technologies))].sort(),
    industries: [...new Set(projects.map((p) => p.industry))].sort(),
    complexities: [...new Set(projects.map((p) => p.complexity))].sort(),
    categories: ["Full Stack", "React", "HTML/CSS"],
  };

  // Filter projects based on active filters and category
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (project) => project.projectType === activeCategory
      );
    }

    // Apply technology filters
    if (activeFilters.technology.length > 0) {
      filtered = filtered.filter((project) =>
        project.technologies.some((tech) =>
          activeFilters.technology.includes(tech)
        )
      );
    }

    if (activeFilters.industry.length > 0) {
      filtered = filtered.filter((project) =>
        activeFilters.industry.includes(project.industry)
      );
    }

    if (activeFilters.complexity.length > 0) {
      filtered = filtered.filter((project) =>
        activeFilters.complexity.includes(project.complexity)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "category":
        // Sort by project type: fullstack > react > htmlcss
        const typeOrder = { fullstack: 1, react: 2, htmlcss: 3 };
        return filtered.sort((a, b) => typeOrder[a.projectType] - typeOrder[b.projectType]);
      case "recent":
        return filtered.sort((a, b) => b.id - a.id);
      case "rating":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "complexity":
        const complexityOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
        return filtered.sort(
          (a, b) =>
            complexityOrder[b.complexity] - complexityOrder[a.complexity]
        );
      default:
        return filtered;
    }
  }, [activeFilters, sortBy, activeCategory]);

  const handleFilterChange = (category, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  const clearAllFilters = () => {
    setActiveFilters({
      technology: [],
      industry: [],
      complexity: [],
      category: [],
    });
    setActiveCategory("all");
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  // Get category count
  const getCategoryCount = (categoryId) => {
    if (categoryId === "all") return projects.length;
    return projects.filter((p) => p.projectType === categoryId).length;
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
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <Icon name="FolderKanban" size={36} className="text-primary" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-5">
              My <span className="text-gradient-brand">Project Portfolio</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
              Explore my journey through full-stack applications, React projects,
              and pure HTML/CSS websites. Each project showcases my growth in
              web development and design.
            </p>

            {/* Category Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Icon name="Layers" size={14} />
                Full-Stack Apps
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium">
                <Icon name="React" size={14} />
                React Projects
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-sm font-medium">
                <Icon name="Code" size={14} />
                HTML/CSS Websites
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-brand">
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
                Total: {projects.length} projects
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 ${activeCategory === category.id
                      ? "bg-primary text-white shadow-md"
                      : "bg-card hover:bg-accent text-foreground"
                    }`}
                >
                  <Icon
                    name={category.icon}
                    size={18}
                    className={
                      activeCategory === category.id
                        ? "text-white"
                        : "text-muted-foreground"
                    }
                  />
                  <span className="font-medium">{category.name}</span>
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-primary/10 text-primary"
                      }`}
                  >
                    {getCategoryCount(category.id)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="bg-card rounded-2xl p-6 mb-8 border border-border shadow-sm">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex-1">
                <ProjectFilters
                  filters={filterOptions}
                  activeFilters={activeFilters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={clearAllFilters}
                  projectCount={filteredProjects.length}
                />
              </div>

              <div className="flex items-center space-x-3 min-w-[200px]">
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
                  className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full max-w-[180px]"
                >
                  <option value="category">Category</option>
                  <option value="recent">Most Recent</option>
                  <option value="rating">Highest Rated</option>
                  <option value="complexity">Complexity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Projects Grid with Category Sections */}
          <div id="projects-grid" className="space-y-12">
            {/* Full Stack Projects Section */}
            {activeCategory === "all" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="Layers" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Full-Stack Applications
                    </h3>
                    <p className="text-muted-foreground">
                      MERN stack applications with backend APIs & databases
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter((p) => p.projectType === "fullstack")
                    .map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        index={index}
                      />
                    ))}
                </div>
              </motion.div>
            )}

            {/* React Projects Section */}
            {(activeCategory === "all" || activeCategory === "react") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Icon name="React" size={20} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      React Applications
                    </h3>
                    <p className="text-muted-foreground">
                      Frontend projects built with React & modern frameworks
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter(
                      (p) =>
                        p.projectType === "react" &&
                        (activeCategory === "all" ||
                          activeCategory === "react")
                    )
                    .map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        index={index}
                      />
                    ))}
                </div>
              </motion.div>
            )}

            {/* HTML/CSS Projects Section */}
            {(activeCategory === "all" || activeCategory === "htmlcss") && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Icon
                      name="Code"
                      size={20}
                      className="text-emerald-500"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      HTML/CSS Websites
                    </h3>
                    <p className="text-muted-foreground">
                      Responsive websites built with pure HTML & CSS
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects
                    .filter(
                      (p) =>
                        p.projectType === "htmlcss" &&
                        (activeCategory === "all" ||
                          activeCategory === "htmlcss")
                    )
                    .map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        onViewDetails={handleViewDetails}
                        index={index}
                      />
                    ))}
                </div>
              </motion.div>
            )}

            {/* Show filtered projects when not viewing "all" */}
            {activeCategory !== "all" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onViewDetails={handleViewDetails}
                    index={index}
                  />
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 bg-card rounded-2xl border border-border"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary/5 to-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon
                    name="Search"
                    size={32}
                    className="text-primary"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Projects Found
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Try adjusting your filters or select a different category to
                  see more projects.
                </p>
                <Button
                  variant="outline"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={clearAllFilters}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>

          {/* Related Projects */}
          {selectedProject && (
            <RelatedProjects
              projects={projects}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-6 rounded-2xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Layers" size={24} className="text-primary" />
                </div>
                <div className="text-left">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-background p-6 rounded-2xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Icon name="React" size={24} className="text-blue-500" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-foreground">2</div>
                  <div className="text-sm text-muted-foreground">
                    React Projects
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern React applications with state management, responsive
                design, and interactive features
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-background p-6 rounded-2xl border border-border shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Icon name="Code" size={24} className="text-emerald-500" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-foreground">3</div>
                  <div className="text-sm text-muted-foreground">
                    HTML/CSS Websites
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Responsive websites built with pure HTML & CSS, focusing on
                clean design and mobile-first approach
              </p>
            </motion.div>
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
              Whether it's a full-stack application, React project, or a
              beautiful website, I'd love to collaborate and bring your ideas to
              life.
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
                    "_blank"
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

export default Projects;