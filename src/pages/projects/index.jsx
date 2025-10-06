import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ProjectCard from "./components/ProjectCard";
import ProjectModal from "./components/ProjectModal";
import ProjectFilters from "./components/ProjectFilters";
import RelatedProjects from "./components/RelatedProjects";
import ProjectStats from "./components/ProjectStats";

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
      title: "E-Commerce Platform Redesign",
      category: "Web Application",
      industry: "Retail",
      description:
        "Complete redesign and development of a modern e-commerce platform with advanced filtering, real-time inventory, and seamless checkout experience.",
      fullDescription: `Led the complete transformation of a legacy e-commerce platform serving over 50,000 monthly active users. The project involved modernizing the entire user experience, implementing advanced search and filtering capabilities, and creating a mobile-first responsive design that increased conversion rates by 40%.\n\nThe platform features real-time inventory management, personalized product recommendations, and a streamlined checkout process that reduced cart abandonment by 35%. Integration with multiple payment gateways and shipping providers ensures a seamless customer experience across all touchpoints.`,
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      ],
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      complexity: "Advanced",
      duration: "6 months",
      teamSize: "5",
      rating: 5,
      impact: "+40% conversion",
      liveUrl: "https://example-ecommerce.com",
      githubUrl: "https://github.com/example/ecommerce",
      features: [
        "Advanced product search and filtering",
        "Real-time inventory management",
        "Personalized recommendations",
        "Multi-payment gateway integration",
        "Mobile-responsive design",
        "Admin dashboard with analytics",
      ],
      architecture: [
        {
          title: "Frontend Architecture",
          description:
            "Built with React 18 and TypeScript, utilizing Redux Toolkit for state management and React Query for server state synchronization.",
        },
        {
          title: "Backend Services",
          description:
            "Microservices architecture with Node.js and Express, implementing RESTful APIs with comprehensive error handling and rate limiting.",
        },
        {
          title: "Database Design",
          description:
            "MongoDB with optimized indexing strategies for fast product searches and real-time inventory updates.",
        },
      ],
      challenges: [
        {
          problem:
            "Legacy system integration with modern frontend required complex data transformation and real-time synchronization.",
          solution:
            "Implemented a middleware layer with Redis caching and WebSocket connections for real-time updates, reducing data latency by 60%.",
        },
        {
          problem:
            "High traffic during sales events caused performance bottlenecks and slow page loads.",
          solution:
            "Implemented CDN distribution, image optimization, and lazy loading strategies, improving page load times by 45%.",
        },
      ],
      timeline: [
        {
          title: "Discovery & Planning",
          duration: "2 weeks",
          icon: "Search",
          description:
            "User research, competitor analysis, and technical architecture planning.",
          deliverables: [
            "User personas",
            "Technical specifications",
            "Project roadmap",
          ],
        },
        {
          title: "Design & Prototyping",
          duration: "3 weeks",
          icon: "Palette",
          description:
            "UI/UX design, wireframing, and interactive prototype development.",
          deliverables: [
            "Design system",
            "High-fidelity mockups",
            "Interactive prototype",
          ],
        },
        {
          title: "Development Phase 1",
          duration: "8 weeks",
          icon: "Code",
          description:
            "Core functionality development including product catalog and user authentication.",
          deliverables: [
            "Product catalog",
            "User system",
            "Search functionality",
          ],
        },
        {
          title: "Development Phase 2",
          duration: "6 weeks",
          icon: "ShoppingCart",
          description:
            "Shopping cart, checkout process, and payment integration.",
          deliverables: [
            "Shopping cart",
            "Checkout flow",
            "Payment integration",
          ],
        },
        {
          title: "Testing & Launch",
          duration: "3 weeks",
          icon: "Rocket",
          description:
            "Comprehensive testing, performance optimization, and production deployment.",
          deliverables: [
            "Test suite",
            "Performance optimization",
            "Production deployment",
          ],
        },
      ],
      metrics: [
        { icon: "TrendingUp", value: "+40%", label: "Conversion Rate" },
        { icon: "Users", value: "50K+", label: "Monthly Users" },
        { icon: "Zap", value: "45%", label: "Faster Load Time" },
      ],
      comparison: {
        before: [
          "Outdated design with poor mobile experience",
          "Slow search functionality taking 3-5 seconds",
          "High cart abandonment rate of 70%",
          "Limited payment options",
        ],
        after: [
          "Modern, mobile-first responsive design",
          "Instant search with real-time suggestions",
          "Reduced cart abandonment to 35%",
          "Multiple payment gateways integrated",
        ],
      },
      learnings: [
        "Real-time features require careful consideration of server resources and user experience balance.",
        "Mobile-first design approach significantly improves overall user engagement across all devices.",
        "Performance optimization should be considered from the beginning, not as an afterthought.",
      ],
      testimonial: {
        content:
          "The new platform exceeded our expectations. The team delivered a solution that not only looks great but also significantly improved our business metrics.",
        author: "Sarah Johnson",
        role: "VP of Digital Commerce",
      },
    },
    {
      id: 2,
      title: "Healthcare Management System",
      category: "Web Application",
      industry: "Healthcare",
      description:
        "Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.",
      fullDescription: `Developed a comprehensive healthcare management system that streamlines patient care workflows and improves operational efficiency for medical practices. The system handles patient records, appointment scheduling, billing, and includes telemedicine capabilities for remote consultations.\n\nThe platform ensures HIPAA compliance with end-to-end encryption and secure data handling. Features include automated appointment reminders, prescription management, and integrated billing systems that have reduced administrative overhead by 50%.`,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop",
      ],
      technologies: ["Vue.js", "Python", "PostgreSQL", "Docker", "AWS"],
      complexity: "Advanced",
      duration: "8 months",
      teamSize: "6",
      rating: 5,
      impact: "+50% efficiency",
      liveUrl: "https://example-healthcare.com",
      githubUrl: "https://github.com/example/healthcare",
      features: [
        "Patient record management",
        "Appointment scheduling system",
        "Telemedicine integration",
        "Prescription management",
        "HIPAA compliant security",
        "Automated billing system",
      ],
      architecture: [
        {
          title: "Security Architecture",
          description:
            "HIPAA-compliant security implementation with end-to-end encryption, role-based access control, and audit logging.",
        },
        {
          title: "Microservices Design",
          description:
            "Modular architecture separating patient management, scheduling, billing, and telemedicine services for scalability.",
        },
        {
          title: "Data Management",
          description:
            "PostgreSQL with encrypted data storage, automated backups, and disaster recovery procedures.",
        },
      ],
      challenges: [
        {
          problem:
            "HIPAA compliance requirements demanded complex security measures while maintaining user-friendly interface.",
          solution:
            "Implemented multi-layered security with seamless user experience through SSO and role-based permissions.",
        },
        {
          problem:
            "Integration with existing medical equipment and third-party systems required custom API development.",
          solution:
            "Created flexible API gateway with standardized data formats and real-time synchronization capabilities.",
        },
      ],
      timeline: [
        {
          title: "Requirements Analysis",
          duration: "3 weeks",
          icon: "FileText",
          description:
            "HIPAA compliance research, stakeholder interviews, and system requirements gathering.",
          deliverables: [
            "Compliance documentation",
            "System requirements",
            "Security protocols",
          ],
        },
        {
          title: "System Architecture",
          duration: "4 weeks",
          icon: "Database",
          description:
            "Database design, security architecture, and integration planning.",
          deliverables: [
            "Database schema",
            "Security framework",
            "API specifications",
          ],
        },
        {
          title: "Core Development",
          duration: "12 weeks",
          icon: "Code",
          description:
            "Patient management, scheduling, and core functionality development.",
          deliverables: [
            "Patient system",
            "Scheduling module",
            "Security implementation",
          ],
        },
        {
          title: "Integration & Testing",
          duration: "6 weeks",
          icon: "Link",
          description:
            "Third-party integrations, telemedicine features, and comprehensive testing.",
          deliverables: [
            "Telemedicine module",
            "Third-party integrations",
            "Test coverage",
          ],
        },
        {
          title: "Deployment & Training",
          duration: "3 weeks",
          icon: "Users",
          description:
            "Production deployment, staff training, and go-live support.",
          deliverables: [
            "Production system",
            "Training materials",
            "Support documentation",
          ],
        },
      ],
      metrics: [
        { icon: "Clock", value: "50%", label: "Time Saved" },
        { icon: "Shield", value: "100%", label: "HIPAA Compliant" },
        { icon: "Users", value: "1000+", label: "Patients Managed" },
      ],
      comparison: {
        before: [
          "Paper-based patient records",
          "Manual appointment scheduling",
          "No telemedicine capabilities",
          "Separate billing system",
        ],
        after: [
          "Digital patient records with search",
          "Automated scheduling with reminders",
          "Integrated telemedicine platform",
          "Unified billing and management",
        ],
      },
      learnings: [
        "Healthcare systems require extensive compliance considerations that should drive architectural decisions.",
        "User training and change management are crucial for successful healthcare system adoption.",
        "Security and usability must be balanced carefully in sensitive data environments.",
      ],
      testimonial: {
        content:
          "This system has transformed our practice. We're more efficient, our patients are happier, and we're fully compliant with all regulations.",
        author: "Dr. Michael Chen",
        role: "Chief Medical Officer",
      },
    },
    {
      id: 3,
      title: "Financial Dashboard Analytics",
      category: "Data Visualization",
      industry: "Finance",
      description:
        "Real-time financial analytics dashboard with advanced charting, portfolio tracking, and risk assessment tools.",
      fullDescription: `Created a sophisticated financial analytics dashboard that provides real-time market data visualization, portfolio performance tracking, and comprehensive risk assessment tools. The platform serves institutional investors and financial advisors with advanced charting capabilities and customizable reporting features.\n\nThe dashboard integrates with multiple financial data providers to deliver real-time market updates, automated portfolio rebalancing suggestions, and risk metrics that help users make informed investment decisions. Advanced filtering and comparison tools enable detailed analysis across different asset classes and time periods.`,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      ],
      technologies: ["React", "D3.js", "Python", "Redis", "WebSocket"],
      complexity: "Advanced",
      duration: "5 months",
      teamSize: "4",
      rating: 5,
      impact: "+60% insights",
      liveUrl: "https://example-finance.com",
      githubUrl: "https://github.com/example/finance",
      features: [
        "Real-time market data visualization",
        "Portfolio performance tracking",
        "Risk assessment algorithms",
        "Custom report generation",
        "Multi-asset class analysis",
        "Automated alerts system",
      ],
      architecture: [
        {
          title: "Real-time Data Pipeline",
          description:
            "WebSocket connections with financial data providers, Redis caching for low-latency data access.",
        },
        {
          title: "Visualization Engine",
          description:
            "Custom D3.js components for interactive charts with real-time updates and smooth animations.",
        },
        {
          title: "Analytics Backend",
          description:
            "Python-based analytics engine for portfolio optimization and risk calculations.",
        },
      ],
      challenges: [
        {
          problem:
            "Real-time data visualization with thousands of data points caused performance issues and browser crashes.",
          solution:
            "Implemented data virtualization and canvas-based rendering for smooth performance with large datasets.",
        },
        {
          problem:
            "Complex financial calculations required high precision and fast computation for real-time updates.",
          solution:
            "Developed optimized algorithms with WebWorkers for background processing and caching strategies.",
        },
      ],
      timeline: [
        {
          title: "Market Research",
          duration: "2 weeks",
          icon: "TrendingUp",
          description:
            "Financial industry analysis, competitor research, and user requirements gathering.",
          deliverables: [
            "Market analysis",
            "User personas",
            "Feature requirements",
          ],
        },
        {
          title: "Data Architecture",
          duration: "3 weeks",
          icon: "Database",
          description:
            "Data pipeline design, API integrations, and real-time processing setup.",
          deliverables: [
            "Data pipeline",
            "API integrations",
            "Processing framework",
          ],
        },
        {
          title: "Visualization Development",
          duration: "8 weeks",
          icon: "BarChart3",
          description:
            "Interactive chart development, dashboard layout, and user interface creation.",
          deliverables: [
            "Chart components",
            "Dashboard interface",
            "User interactions",
          ],
        },
        {
          title: "Analytics Engine",
          duration: "6 weeks",
          icon: "Calculator",
          description:
            "Risk assessment algorithms, portfolio optimization, and reporting features.",
          deliverables: [
            "Risk algorithms",
            "Portfolio tools",
            "Report generator",
          ],
        },
        {
          title: "Testing & Optimization",
          duration: "3 weeks",
          icon: "Zap",
          description:
            "Performance optimization, stress testing, and user acceptance testing.",
          deliverables: [
            "Performance optimization",
            "Test results",
            "User feedback",
          ],
        },
      ],
      metrics: [
        { icon: "Activity", value: "Real-time", label: "Data Updates" },
        { icon: "PieChart", value: "15+", label: "Chart Types" },
        { icon: "Gauge", value: "99.9%", label: "Uptime" },
      ],
      comparison: {
        before: [
          "Static reports updated daily",
          "Limited visualization options",
          "Manual risk calculations",
          "No real-time market data",
        ],
        after: [
          "Real-time interactive dashboards",
          "15+ customizable chart types",
          "Automated risk assessment",
          "Live market data integration",
        ],
      },
      learnings: [
        "Financial data visualization requires careful balance between information density and clarity.",
        "Real-time systems need robust error handling and fallback mechanisms for data provider outages.",
        "Performance optimization is critical when dealing with high-frequency financial data updates.",
      ],
      testimonial: {
        content:
          "The dashboard has become an essential tool for our investment decisions. The real-time insights have significantly improved our portfolio performance.",
        author: "Jennifer Walsh",
        role: "Portfolio Manager",
      },
    },
    {
      id: 4,
      title: "Learning Management System",
      category: "Educational Platform",
      industry: "Education",
      description:
        "Comprehensive LMS with course creation, student progress tracking, and interactive learning tools.",
      fullDescription: `Developed a comprehensive Learning Management System that facilitates online education with course creation tools, student progress tracking, and interactive learning features. The platform supports multiple content types including videos, quizzes, assignments, and live sessions.\n\nThe system includes advanced analytics for educators to track student engagement and performance, automated grading systems, and collaborative tools for group projects. Mobile-responsive design ensures seamless learning experience across all devices.`,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      ],
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Vercel"],
      complexity: "Intermediate",
      duration: "4 months",
      teamSize: "3",
      rating: 4,
      impact: "+75% engagement",
      liveUrl: "https://example-lms.com",
      githubUrl: "https://github.com/example/lms",
      features: [
        "Course creation and management",
        "Student progress tracking",
        "Interactive quizzes and assignments",
        "Video streaming integration",
        "Discussion forums",
        "Mobile-responsive design",
      ],
      architecture: [
        {
          title: "Full-stack Architecture",
          description:
            "Next.js with TypeScript for type-safe development, Prisma ORM for database management.",
        },
        {
          title: "Content Management",
          description:
            "Flexible content system supporting multiple media types with cloud storage integration.",
        },
        {
          title: "User Management",
          description:
            "Role-based access control with student, instructor, and admin permissions.",
        },
      ],
      challenges: [
        {
          problem:
            "Video streaming and large file uploads required efficient content delivery and storage solutions.",
          solution:
            "Implemented CDN integration with progressive video loading and optimized file compression.",
        },
        {
          problem:
            "Real-time collaboration features needed to work seamlessly across different devices and connection speeds.",
          solution:
            "Used WebSocket connections with offline synchronization and conflict resolution mechanisms.",
        },
      ],
      timeline: [
        {
          title: "Educational Research",
          duration: "1 week",
          icon: "BookOpen",
          description:
            "Learning methodology research and educational platform analysis.",
          deliverables: [
            "Research findings",
            "Platform requirements",
            "User stories",
          ],
        },
        {
          title: "System Design",
          duration: "2 weeks",
          icon: "Layout",
          description:
            "Database design, user interface planning, and system architecture.",
          deliverables: [
            "Database schema",
            "UI wireframes",
            "System architecture",
          ],
        },
        {
          title: "Core Development",
          duration: "10 weeks",
          icon: "Code",
          description:
            "Course management, user system, and content delivery implementation.",
          deliverables: [
            "Course system",
            "User management",
            "Content delivery",
          ],
        },
        {
          title: "Interactive Features",
          duration: "4 weeks",
          icon: "MessageSquare",
          description:
            "Quizzes, discussions, and collaboration tools development.",
          deliverables: [
            "Quiz system",
            "Discussion forums",
            "Collaboration tools",
          ],
        },
        {
          title: "Testing & Launch",
          duration: "2 weeks",
          icon: "CheckCircle",
          description:
            "User testing, performance optimization, and production deployment.",
          deliverables: [
            "Test results",
            "Performance optimization",
            "Production launch",
          ],
        },
      ],
      metrics: [
        { icon: "Users", value: "5000+", label: "Active Students" },
        { icon: "BookOpen", value: "200+", label: "Courses Created" },
        { icon: "Award", value: "95%", label: "Completion Rate" },
      ],
      comparison: {
        before: [
          "Traditional classroom-only learning",
          "Limited course materials access",
          "No progress tracking",
          "Manual assignment grading",
        ],
        after: [
          "Flexible online and hybrid learning",
          "24/7 access to course materials",
          "Detailed progress analytics",
          "Automated grading system",
        ],
      },
      learnings: [
        "Educational platforms require intuitive design to accommodate users with varying technical skills.",
        "Content organization and search functionality are crucial for large course catalogs.",
        "Mobile optimization is essential as many students access content on mobile devices.",
      ],
      testimonial: {
        content:
          "This LMS has revolutionized our online education delivery. Student engagement has increased dramatically since implementation.",
        author: "Prof. David Martinez",
        role: "Director of Online Learning",
      },
    },
    {
      id: 5,
      title: "Real Estate Platform",
      category: "Web Application",
      industry: "Real Estate",
      description:
        "Modern real estate platform with property listings, virtual tours, and advanced search capabilities.",
      fullDescription: `Built a comprehensive real estate platform that connects buyers, sellers, and agents through an intuitive interface with advanced property search, virtual tour integration, and comprehensive listing management. The platform includes mortgage calculators, neighborhood insights, and market analytics.\n\nFeatures include interactive maps with property overlays, saved searches with automated notifications, and integrated communication tools for seamless interaction between all parties. The platform has processed over $50M in property transactions since launch.`,
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1448630360428-65456885c650?w=800&h=600&fit=crop",
      ],
      technologies: ["React", "Express.js", "MongoDB", "Mapbox", "Stripe"],
      complexity: "Intermediate",
      duration: "6 months",
      teamSize: "4",
      rating: 4,
      impact: "$50M+ transactions",
      liveUrl: "https://example-realestate.com",
      githubUrl: "https://github.com/example/realestate",
      features: [
        "Advanced property search and filtering",
        "Interactive map integration",
        "Virtual tour capabilities",
        "Mortgage calculator tools",
        "Agent communication system",
        "Market analytics dashboard",
      ],
      architecture: [
        {
          title: "Geospatial Architecture",
          description:
            "MongoDB with geospatial indexing for location-based searches, Mapbox integration for interactive maps.",
        },
        {
          title: "Media Management",
          description:
            "Cloud-based image and video storage with automatic optimization and CDN delivery.",
        },
        {
          title: "Search Engine",
          description:
            "Elasticsearch integration for fast, flexible property searches with multiple filters and sorting options.",
        },
      ],
      challenges: [
        {
          problem:
            "Large property image galleries and virtual tours caused slow page loading and poor user experience.",
          solution:
            "Implemented progressive image loading, WebP format conversion, and lazy loading for optimal performance.",
        },
        {
          problem:
            "Complex search queries with multiple filters and location-based results required optimization.",
          solution:
            "Built efficient database indexing strategy and implemented search result caching for common queries.",
        },
      ],
      timeline: [
        {
          title: "Market Analysis",
          duration: "2 weeks",
          icon: "Home",
          description:
            "Real estate market research, competitor analysis, and user requirement gathering.",
          deliverables: [
            "Market research",
            "Competitor analysis",
            "User requirements",
          ],
        },
        {
          title: "Platform Design",
          duration: "3 weeks",
          icon: "Map",
          description:
            "User interface design, map integration planning, and database architecture.",
          deliverables: ["UI designs", "Map integration", "Database design"],
        },
        {
          title: "Core Development",
          duration: "12 weeks",
          icon: "Building",
          description:
            "Property listing system, search functionality, and user management.",
          deliverables: ["Listing system", "Search engine", "User management"],
        },
        {
          title: "Advanced Features",
          duration: "6 weeks",
          icon: "Camera",
          description:
            "Virtual tours, mortgage calculators, and communication tools.",
          deliverables: [
            "Virtual tours",
            "Calculators",
            "Communication system",
          ],
        },
        {
          title: "Launch & Marketing",
          duration: "3 weeks",
          icon: "Megaphone",
          description:
            "Platform launch, agent onboarding, and marketing campaign.",
          deliverables: [
            "Platform launch",
            "Agent training",
            "Marketing materials",
          ],
        },
      ],
      metrics: [
        { icon: "DollarSign", value: "$50M+", label: "Transactions" },
        { icon: "Home", value: "10K+", label: "Properties Listed" },
        { icon: "Users", value: "2500+", label: "Active Agents" },
      ],
      comparison: {
        before: [
          "Limited online property visibility",
          "Basic search functionality",
          "No virtual tour capabilities",
          "Manual agent communication",
        ],
        after: [
          "Comprehensive online listings",
          "Advanced search with 20+ filters",
          "Integrated virtual tour system",
          "Automated communication tools",
        ],
      },
      learnings: [
        "Real estate platforms require robust image handling and optimization for property galleries.",
        "Location-based features are crucial and require careful consideration of performance and accuracy.",
        "Trust and credibility features are essential in high-value transaction platforms.",
      ],
      testimonial: {
        content:
          "This platform has streamlined our entire sales process. We're closing deals faster and reaching more qualified buyers than ever before.",
        author: "Lisa Thompson",
        role: "Senior Real Estate Agent",
      },
    },
    {
      id: 6,
      title: "Social Media Analytics Tool",
      category: "Analytics Platform",
      industry: "Marketing",
      description:
        "Comprehensive social media analytics platform with multi-platform integration and automated reporting.",
      fullDescription: `Developed a comprehensive social media analytics platform that aggregates data from multiple social networks to provide unified insights, automated reporting, and competitive analysis. The platform serves marketing agencies and businesses with detailed performance metrics and actionable recommendations.\n\nFeatures include real-time social media monitoring, sentiment analysis, influencer identification, and automated report generation. The platform has helped clients improve their social media ROI by an average of 45% through data-driven insights and optimization recommendations.`,
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      ],
      technologies: ["Vue.js", "Node.js", "Python", "Redis", "Chart.js"],
      complexity: "Intermediate",
      duration: "5 months",
      teamSize: "3",
      rating: 4,
      impact: "+45% ROI",
      liveUrl: "https://example-analytics.com",
      githubUrl: "https://github.com/example/analytics",
      features: [
        "Multi-platform social media integration",
        "Real-time analytics dashboard",
        "Sentiment analysis algorithms",
        "Automated report generation",
        "Competitor benchmarking",
        "Influencer identification tools",
      ],
      architecture: [
        {
          title: "Data Integration",
          description:
            "API integrations with major social platforms, data normalization, and real-time processing pipelines.",
        },
        {
          title: "Analytics Engine",
          description:
            "Python-based analytics with machine learning for sentiment analysis and trend detection.",
        },
        {
          title: "Visualization Layer",
          description:
            "Vue.js frontend with Chart.js for interactive data visualization and customizable dashboards.",
        },
      ],
      challenges: [
        {
          problem:
            "Different social media APIs had varying rate limits and data formats requiring complex synchronization.",
          solution:
            "Built unified data layer with intelligent rate limiting and standardized data transformation pipelines.",
        },
        {
          problem:
            "Real-time sentiment analysis of large volumes of social media content required efficient processing.",
          solution:
            "Implemented distributed processing with Redis queues and optimized NLP algorithms for real-time analysis.",
        },
      ],
      timeline: [
        {
          title: "API Research",
          duration: "2 weeks",
          icon: "Link",
          description:
            "Social media API analysis, integration planning, and data mapping.",
          deliverables: [
            "API documentation",
            "Integration plan",
            "Data models",
          ],
        },
        {
          title: "Data Pipeline",
          duration: "4 weeks",
          icon: "Database",
          description:
            "Data collection system, processing pipelines, and storage optimization.",
          deliverables: [
            "Data pipeline",
            "Processing system",
            "Storage solution",
          ],
        },
        {
          title: "Analytics Development",
          duration: "8 weeks",
          icon: "BarChart3",
          description:
            "Dashboard creation, analytics algorithms, and visualization components.",
          deliverables: ["Analytics dashboard", "Algorithms", "Visualizations"],
        },
        {
          title: "Reporting System",
          duration: "4 weeks",
          icon: "FileText",
          description:
            "Automated reporting, export functionality, and scheduling system.",
          deliverables: [
            "Report generator",
            "Export tools",
            "Scheduling system",
          ],
        },
        {
          title: "Testing & Optimization",
          duration: "2 weeks",
          icon: "Zap",
          description:
            "Performance testing, accuracy validation, and user experience optimization.",
          deliverables: [
            "Performance optimization",
            "Accuracy testing",
            "UX improvements",
          ],
        },
      ],
      metrics: [
        { icon: "Share2", value: "10+", label: "Platforms Integrated" },
        { icon: "TrendingUp", value: "45%", label: "Average ROI Increase" },
        { icon: "Clock", value: "Real-time", label: "Data Processing" },
      ],
      comparison: {
        before: [
          "Manual data collection from platforms",
          "Weekly or monthly reporting cycles",
          "Limited competitive insights",
          "No sentiment analysis capabilities",
        ],
        after: [
          "Automated multi-platform data aggregation",
          "Real-time analytics and alerts",
          "Comprehensive competitor benchmarking",
          "AI-powered sentiment analysis",
        ],
      },
      learnings: [
        "Social media data requires careful handling due to API limitations and changing platform policies.",
        "Real-time analytics need to balance speed with accuracy, especially for sentiment analysis.",
        "User-friendly data visualization is crucial for making complex analytics accessible to marketers.",
      ],
      testimonial: {
        content:
          "This analytics platform has transformed how we approach social media marketing. The insights are invaluable for our strategy decisions.",
        author: "Mark Rodriguez",
        role: "Digital Marketing Director",
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
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="px-8 py-3 text-base border-border hover:bg-primary/10 hover:text-primary transition-all"
              >
                Download Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16">
        <div className="container-brand">
          {/* Project Stats */}
          <ProjectStats projects={projects} />

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
                    "mailto:ratnakarsinghparihar@gmail.com")
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
