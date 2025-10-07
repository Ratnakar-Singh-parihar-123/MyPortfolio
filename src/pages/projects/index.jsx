import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectFilters from "./components/ProjectFilters";
import RelatedProjects from "./components/RelatedProjects";
// import ProjectStats from "./components/ProjectStats";


// projects image
import vsbp from "../../assets/projectsImg/vsbp.png";
import yammiverse from "../../assets/projectsImg/yammiverse.png";
import bodp from "../../assets/projectsImg/bloodOrganDonatiosn.png";
import textutils from "../../assets/projectsImg/textutils.png";
// import scootyFy from "../../assets/projectsImg/scootyfy.png";
// import nodepad from "../../assets/projectsImg/";
import portfolio from "../../assets/projectsImg/myportfolio.png";


const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    technology: [],
    industry: [],
    complexity: [],
  });
  const [sortBy, setSortBy] = useState("recent");

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "Vehicle Service Booking Platform",
      category: "Full-Stack Web Application",
      industry: "Automotive",
      description:
        "A real-time vehicle service booking system connecting customers with local service centers through an intuitive online platform.",
      fullDescription: `Developed a real-world MERN stack platform enabling customers to book, track, and manage vehicle services online. Service centers can view customer requests, update service status, and handle digital payments. 
  Includes live chat, order tracking, and dynamic dashboards for both customers and admins.`,
      image:
        vsbp,
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
    },
    {
      id: 2,
      title: "YammiVerse",
      category: "Web Application",
      industry: "Food & Recipes",
      description:
        "A community-driven recipe platform for sharing, exploring, and saving food recipes with images and ingredients.",
      fullDescription: `Built a feature-rich MERN stack application that allows users to upload, save, and discover recipes. 
  Includes user authentication, image uploads, and responsive design for smooth browsing across devices.`,
      image:
        yammiverse,
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
    },
    {
      id: 3,
      title: "Blood & Organ Donation Platform",
      category: "Full-Stack Application",
      industry: "Healthcare",
      description:
        "A social impact platform connecting blood and organ donors with recipients and hospitals in real time.",
      fullDescription: `Built a MERN stack donation management platform to streamline the donor-recipient connection process. 
  Includes role-based dashboards, secure data handling, and campaign management tools for hospitals.`,
      image:
        bodp,
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
      githubUrl:
        "",
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
    },
    {
      id: 4,
      title: "TextUtils",
      category: "React Utility App",
      industry: "Productivity",
      description:
        "A lightweight React-based text utility app offering real-time text transformations and analytics.",
      fullDescription: `Developed a fast, interactive web app using React to manipulate and analyze text. 
  Supports uppercase/lowercase conversion, word/character counting, and reading time estimation.`,
      image:
        textutils,
      technologies: ["React", "Tailwind CSS" , "APIs"],
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
  //   {
  //     id: 5,
  //     title: "NodePad",
  //     category: "Full-Stack Notes App",
  //     industry: "Productivity",
  //     description:
  //       "A secure note-taking web app built with the MERN stack, offering real-time syncing and authentication.",
  //     fullDescription: `NodePad allows users to create, edit, and delete notes securely in the cloud. 
  // It features user authentication, autosave, and persistent storage using MongoDB.`,
  //     image:
  //       "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800&h=600&fit=crop",
  //     technologies: ["React", "Node.js", "Express.js", "MongoDB", "JWT Auth"],
  //     complexity: "Intermediate",
  //     duration: "3 months",
  //     teamSize: "1",
  //     rating: 4,
  //     impact: "1000+ notes created",
  //     liveUrl: "",
  //     githubUrl: "https://github.com/Ratnakar-Singh-parihar-123/NodePad",
  //     features: [
  //       "User authentication with JWT",
  //       "CRUD operations for notes",
  //       "Autosave and cloud persistence",
  //       "Responsive design",
  //       "Dark/light mode",
  //     ],
  //     challenges: [
  //       {
  //         problem: "Maintaining data consistency across multiple sessions.",
  //         solution:
  //           "Used real-time state synchronization and MongoDB’s change streams for efficient updates.",
  //       },
  //     ],
  //     learnings: [
  //       "JWT authentication enhances app security.",
  //       "Backend optimization reduces latency in CRUD operations.",
  //     ],
  //     testimonial: {
  //       content:
  //         "Fast, reliable, and beautifully simple — perfect for daily productivity.",
  //       author: "Karan Mehta",
  //       role: "Student Developer",
  //     },
  //   },
    {
      id: 6,
      title: "Personal Portfolio Website",
      category: "Web Portfolio",
      industry: "Personal Branding",
      description:
        "A professional developer portfolio showcasing projects, achievements, and skills with dark/light mode and responsive design.",
      fullDescription: `Developed using React and Tailwind CSS, this portfolio highlights all professional work, projects, and achievements. 
  Includes dynamic sections like About, Skills, Projects, Achievements, and Contact with a polished responsive layout.`,
      image:
        portfolio,
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      complexity: "Intermediate",
      duration: "2 months",
      teamSize: "1",
      rating: 5,
      impact: "100% recruiter-friendly design",
      liveUrl: "",
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
          "The portfolio beautifully represents Ratnakar’s skills and creative design sense.",
        author: "Anonymous Reviewer",
        role: "Frontend Developer",
      },
    },
  ];

  // Filter options
  const filterOptions = {
    technologies: [...new Set(projects.flatMap((p) => p.technologies))].sort(),
    industries: [...new Set(projects.map((p) => p.industry))].sort(),
    complexities: [...new Set(projects.map((p) => p.complexity))].sort(),
  };

  // Filter projects based on active filters
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply filters
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
  }, [activeFilters, sortBy]);

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
    });
  };

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
            className="text-center max-w-3xl mx-auto"
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-inner">
                <Icon name="FolderOpen" size={32} className="text-primary" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-5">
              My <span className="text-gradient-brand">Project Showcase</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10">
              A collection of my best works — from full-stack web applications
              to interactive front-end projects. Each one reflects my learning,
              creativity, and problem-solving approach.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() =>
                  document
                    .getElementById("projects-grid")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Projects
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="px-8 py-3 text-base border-border hover:bg-primary/10 hover:text-primary transition-all"
              >
                Download Portfolio
              </Button> */}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16">
        <div className="container-brand">
          {/* Project Stats */}
          {/* <ProjectStats projects={projects} /> */}

          {/* Filters */}
          <ProjectFilters
            filters={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
            projectCount={filteredProjects.length}
          />

          {/* Sort Options */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Icon
                name="SlidersHorizontal"
                size={20}
                className="text-muted-foreground"
              />
              <span className="text-sm font-medium text-foreground">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="recent">Most Recent</option>
                <option value="rating">Highest Rated</option>
                <option value="complexity">Most Complex</option>
              </select>
            </div>

            <div className="text-sm text-muted-foreground">
              {filteredProjects.length} of {projects.length} projects
            </div>
          </div>

          {/* Projects Grid */}
          <div
            id="projects-grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewDetails}
                index={index}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon
                  name="Search"
                  size={32}
                  className="text-muted-foreground"
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Projects Found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your filters to see more projects.
              </p>
              <Button
                variant="outline"
                iconName="RotateCcw"
                iconPosition="left"
                onClick={clearAllFilters}
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}

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

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary/90 text-white text-center relative overflow-hidden">
        {/* Soft Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_70%)]"></div>

        <div className="container-brand relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            {/* Icon */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                <Icon name="Rocket" size={30} className="text-white" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-snug">
              Let’s Build Something{" "}
              <span className="text-white/90">Amazing Together</span>
            </h2>

            {/* Description */}
            <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10">
              Whether it’s a small idea or a big project, I’d love to
              collaborate and help bring your vision to life with clean design
              and solid code.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                className="bg-white text-primary font-semibold hover:bg-white/90 transition-all shadow-md"
                onClick={() =>
                  (window.location.href =
                    "mailto:ratnakarsinghparihar9399@gmail.com")
                }
              >
                Get in Touch
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="FolderOpen"
                iconPosition="left"
                className="border-white/70 text-white hover:bg-white hover:text-primary font-medium"
                onClick={() => (window.location.href = "/projects")}
              >
                View My Projects
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
