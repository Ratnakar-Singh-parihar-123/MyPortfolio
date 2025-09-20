import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import ProjectGrid from "./components/ProjectGrid";
import FilterBar from "./components/FilterBar";
import ProjectModal from "./components/ProjectModal";
import WorkInProgress from "./components/WorkInProgress";
import Icon from "../../components/AppIcon";
import { Link } from "react-router-dom";

const ProjectsGalleryDevelopmentPortfolioShowcase = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      category: "Full-stack",
      type: "Personal",
      status: "completed",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      description:
        "A comprehensive e-commerce management dashboard with real-time analytics, inventory tracking, and order management.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Chart.js",
        "Tailwind CSS",
      ],
      timeline: "3 months",
      challenges: [
        "Real-time data synchronization",
        "Performance optimization",
        "Complex filtering",
      ],
      learnings: [
        "Advanced React patterns",
        "Database optimization",
        "Real-time WebSocket connections",
      ],
      github: "https://github.com/alexchen/ecommerce-dashboard",
      demo: "https://ecommerce-dashboard-demo.com",
      metrics: {
        commits: 247,
        linesOfCode: "12,500+",
        contributors: 1,
      },
    },
    {
      id: 2,
      title: "Task Management App",
      category: "React",
      type: "Educational",
      status: "completed",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      description:
        "A collaborative task management application with drag-and-drop functionality, real-time updates, and team collaboration features.",
      technologies: [
        "React",
        "Redux Toolkit",
        "Firebase",
        "React Beautiful DND",
        "Material-UI",
      ],
      timeline: "2 months",
      challenges: [
        "Drag and drop implementation",
        "Real-time collaboration",
        "State management complexity",
      ],
      learnings: [
        "Redux Toolkit mastery",
        "Firebase real-time database",
        "Advanced UI interactions",
      ],
      github: "https://github.com/alexchen/task-manager",
      demo: "https://task-manager-demo.com",
      metrics: {
        commits: 156,
        linesOfCode: "8,200+",
        contributors: 1,
      },
    },
    {
      id: 3,
      title: "Weather Forecast PWA",
      category: "JavaScript",
      type: "Personal",
      status: "completed",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
      description:
        "A Progressive Web App that provides detailed weather forecasts with offline capabilities and location-based services.",
      technologies: [
        "Vanilla JavaScript",
        "Service Workers",
        "Weather API",
        "CSS Grid",
        "LocalStorage",
      ],
      timeline: "1 month",
      challenges: [
        "PWA implementation",
        "Offline functionality",
        "API data caching",
      ],
      learnings: [
        "Service Worker patterns",
        "Progressive enhancement",
        "Mobile-first design",
      ],
      github: "https://github.com/alexchen/weather-pwa",
      demo: "https://weather-pwa-demo.com",
      metrics: {
        commits: 89,
        linesOfCode: "4,500+",
        contributors: 1,
      },
    },
    {
      id: 4,
      title: "AI Chat Interface",
      category: "Full-stack",
      type: "Collaborative",
      status: "completed",
      featured: true,
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      description:
        "An intelligent chat interface with natural language processing, real-time messaging, and AI-powered response suggestions.",
      technologies: [
        "React",
        "TypeScript",
        "Socket.io",
        "OpenAI API",
        "Express.js",
        "MongoDB",
      ],
      timeline: "4 months",
      challenges: [
        "Real-time messaging",
        "AI integration",
        "Type safety implementation",
      ],
      learnings: [
        "TypeScript best practices",
        "AI API integration",
        "WebSocket architecture",
      ],
      github: "https://github.com/alexchen/ai-chat-interface",
      demo: "https://ai-chat-demo.com",
      metrics: {
        commits: 298,
        linesOfCode: "15,800+",
        contributors: 3,
      },
    },
    {
      id: 5,
      title: "Portfolio Website",
      category: "React",
      type: "Personal",
      status: "completed",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      description:
        "A responsive portfolio website showcasing projects, skills, and professional experience with smooth animations.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "React Router",
        "React Helmet",
      ],
      timeline: "3 weeks",
      challenges: [
        "Performance optimization",
        "SEO implementation",
        "Cross-browser compatibility",
      ],
      learnings: [
        "Animation libraries",
        "SEO best practices",
        "Performance optimization",
      ],
      github: "https://github.com/alexchen/portfolio-website",
      demo: "https://alexchen-portfolio.com",
      metrics: {
        commits: 134,
        linesOfCode: "6,700+",
        contributors: 1,
      },
    },
    {
      id: 6,
      title: "Expense Tracker",
      category: "JavaScript",
      type: "Educational",
      status: "completed",
      featured: false,
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      preview:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      description:
        "A personal finance tracker with expense categorization, budget planning, and visual analytics.",
      technologies: [
        "JavaScript ES6+",
        "Chart.js",
        "Local Storage",
        "CSS Flexbox",
        "PWA",
      ],
      timeline: "6 weeks",
      challenges: [
        "Data visualization",
        "Local data persistence",
        "Budget calculations",
      ],
      learnings: [
        "Chart.js mastery",
        "Financial calculations",
        "Data management",
      ],
      github: "https://github.com/alexchen/expense-tracker",
      demo: "https://expense-tracker-demo.com",
      metrics: {
        commits: 78,
        linesOfCode: "3,200+",
        contributors: 1,
      },
    },
  ];

  const wipProjects = [
    {
      id: 7,
      title: "Social Media Analytics Dashboard",
      category: "Full-stack",
      type: "Personal",
      status: "in-progress",
      progress: 75,
      image:
        "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=600&h=400&fit=crop",
      description:
        "Real-time social media analytics with sentiment analysis and engagement tracking.",
      technologies: [
        "Next.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Chart.js",
      ],
      timeline: "4 months (2 months remaining)",
      github: "https://github.com/alexchen/social-analytics",
      lastCommit: "2 days ago",
      estimatedCompletion: "March 2025",
    },
    {
      id: 8,
      title: "Mobile Recipe App",
      category: "React",
      type: "Collaborative",
      status: "in-progress",
      progress: 45,
      image:
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
      description:
        "A React Native app for recipe sharing with meal planning and shopping list features.",
      technologies: ["React Native", "Firebase", "Redux", "React Navigation"],
      timeline: "3 months (1.5 months remaining)",
      github: "https://github.com/alexchen/recipe-mobile-app",
      lastCommit: "5 hours ago",
      estimatedCompletion: "April 2025",
    },
  ];

  const filters = ["All", "React", "JavaScript", "Full-stack"];
  const typeFilters = ["All", "Personal", "Educational", "Collaborative"];

  const filteredProjects = projects?.filter((project) => {
    if (selectedFilter === "All") return true;
    return project?.category === selectedFilter;
  });

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <Helmet>
        <link rel="icon" href="/layers.png" />
        <title>Projects Gallery.| Ratnakar Singh Parihar</title>
        <meta
          name="description"
          content="Explore Ratnakar Singh Parihar comprehensive project portfolio featuring React applications, full-stack solutions, and JavaScript projects. View live demos, source code, and detailed case studies."
        />
        <meta
          name="keywords"
          content="React Projects, Full-Stack Portfolio, JavaScript Development, Web Applications, Project, Code"
        />
        <meta name="author" content="Ratnakar Singh Parihar" />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Projects Gallery - Development Portfolio Showcase"
        />
        <meta
          property="og:description"
          content="Explore Ratnakar Singh Parihar comprehensive project portfolio featuring React applications, full-stack solutions, and JavaScript projects."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://alexchen-portfolio.com/projects-gallery-development-portfolio-showcase"
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projects Gallery - Development Portfolio Showcase"
        />
        <meta
          name="twitter:description"
          content="Explore Ratnakar Singh Parihar comprehensive project portfolio featuring React applications, full-stack solutions, and JavaScript projects."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Filter Bar */}
          <FilterBar
            filters={filters}
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {/* Featured Projects Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Featured Projects
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Highlighted projects that showcase advanced technical skills,
                  innovative solutions, and significant impact on user
                  experience and business objectives.
                </p>
              </motion.div>

              <ProjectGrid
                projects={filteredProjects?.filter((p) => p?.featured)}
                onProjectClick={openModal}
                featured={true}
              />
            </div>
          </section>

          {/* All Projects Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  All Projects
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Complete portfolio of development work across different
                  technologies, project types, and collaboration styles.
                </p>
              </motion.div>

              <ProjectGrid
                projects={filteredProjects}
                onProjectClick={openModal}
                featured={false}
              />
            </div>
          </section>

          {/* Work in Progress Section */}
          <WorkInProgress projects={wipProjects} />
        </main>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">AC</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">
                      Ratnakar Singh Parihar
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Full-Stack Developer
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Building exceptional digital experiences through innovative
                  solutions, clean code architecture, and continuous learning.
                </p>
                <div className="flex space-x-4">
                  {[
                    { name: "Github", href: "#" },
                    { name: "Linkedin", href: "#" },
                    { name: "Twitter", href: "#" },
                    { name: "Mail", href: "#" },
                  ]?.map((social) => (
                    <a
                      key={social?.name}
                      href={social?.href}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      aria-label={social?.name}
                    >
                      <Icon name={social?.name} size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Quick Links
                </h3>

                <div className="space-y-2">
                  {[
                    { label: "Home", to: "/" },
                    { label: "About", to: "/about-professional-story-journey" },
                    {
                      label: "Skills",
                      to: "/skills-laboratory-interactive-technical-showcase",
                    },
                    {
                      label: "Achievements",
                      to: "/achievements-center-credibility-growth-documentation",
                    },
                    {
                      label: "Contact",
                      to: "/contact-gateway-professional-connection-hub",
                    },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      to={link.to} // ← use `to`, not `href`
                      className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Project Stats */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Project Stats
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Completed Projects</span>
                    <span className="text-sm font-medium text-foreground">
                      {projects?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <span className="text-sm font-medium text-foreground">
                      {wipProjects?.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technologies</span>
                    <span className="text-sm font-medium text-foreground">
                      15+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lines of Code</span>
                    <span className="text-sm font-medium text-foreground">
                      50,000+
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} RSP. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <div className="flex space-x-4">
                  {[
                    {
                      name: "Github",
                      href: "https://github.com/Ratnakar-Singh-parihar-123",
                    },
                    {
                      name: "Linkedin",
                      href: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
                    },
                    { name: "Twitter", href: "https://x.com/RatnakarSi85551" },
                    {
                      name: "Mail",
                      href: "ratnakarsinghparihar9399@gmail.com",
                    },
                  ]?.map((social) => (
                    <a
                      key={social?.name}
                      href={social?.href}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      aria-label={social?.name}
                    >
                      <Icon name={social?.name} size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProjectsGalleryDevelopmentPortfolioShowcase;
