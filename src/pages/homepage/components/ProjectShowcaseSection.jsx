// import React from "react";
// import { motion } from "framer-motion";
// import { Github, ExternalLink } from "lucide-react";
// // projects image
// import yammiverse from "../../../assets/projectsImg/yammiverse.png";
// import vsbp from "../../../assets/projectsImg/vsbp.png";
// import bodp from "../../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation Home.png";

// const projects = [
//   {
//     title: "Vehicle Service Booking Platform",
//     description:
//       "A full-stack MERN web app that connects customers with nearby vehicle service centers. Clients can book, track, and pay for services in real-time, while service centers can manage bookings, update statuses, and maintain complete service records. Features include live chat, secure payments, and role-based dashboards.",
//     image: vsbp,
//     tech: [
//       "React",
//       "Node.js",
//       "Express",
//       "MongoDB",
//       "Socket.io",
//       "Tailwind CSS",
//     ],
//     live: "https://vehicle-service-booking-platform.onrender.com",
//     github:
//       "https://github.com/Ratnakar-Singh-parihar-123/Vehicle-Service-Booking-Platform",
//   },
//   {
//     title: "YammiVerse",
//     description:
//       "A MERN-based recipe sharing platform where users can explore, create, and save food recipes with secure login and image uploads. Built with responsive design and smooth user experience in mind.",
//     image: yammiverse,
//     tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
//     live: "https://yammiverse.onrender.com",
//     github: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
//   },
//   {
//     title: "Blood & Organ Donation Platform",
//     description:
//       "A MERN-based life-saving platform that connects blood and organ donors with recipients. It features donor registration, real-time availability tracking, secure authentication, and an intuitive dashboard for hospitals and users.",
//     image: bodp,
//     tech: [
//       "React",
//       "Node.js",
//       "Express",
//       "MongoDB",
//       "Tailwind CSS",
//       "Framer Motion",
//     ],
//     live: "",
//     github: "",
//     status: "In Progress", // ✅ Added project status
//   },
// ];

// const ProjectShowcaseSection = () => {
//   return (
//     <section className="py-20 bg-background">
//       <div className="container-brand text-center">
//         {/* Header */}
//         <motion.h2
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl md:text-4xl font-bold text-foreground mb-4"
//         >
//           Projects
//         </motion.h2>
//         <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
//           Here are some of my favorite projects that showcase my passion for
//           building full-stack web apps and solving real-world problems using
//           modern technologies.
//         </p>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {projects.map((project, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
//             >
//               {/* Project Image */}
//               <div className="relative overflow-hidden">
//                 <img
//                   src={project.image}
//                   alt={project.title}
//                   className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
//                 />

//                 {/* ✅ Status Badge (In Progress) */}
//                 {project.status && (
//                   <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
//                     {project.status}
//                   </div>
//                 )}

//                 {/* Overlay on hover */}
//                 <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
//                   <div className="flex space-x-4">
//                     {project.github && (
//                       <a
//                         href={project.github}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
//                         aria-label="GitHub Link"
//                       >
//                         <Github size={18} className="text-gray-800" />
//                       </a>
//                     )}
//                     {project.live && (
//                       <a
//                         href={project.live}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
//                         aria-label="Live Link"
//                       >
//                         <ExternalLink size={18} className="text-gray-800" />
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Project Details */}
//               <div className="p-6 text-left">
//                 <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition">
//                   {project.title}
//                 </h3>
//                 <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
//                   {project.description}
//                 </p>
//                 <div className="flex flex-wrap gap-2">
//                   {project.tech.map((tech, i) => (
//                     <span
//                       key={i}
//                       className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
//                     >
//                       {tech}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* View More Projects Button */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="mt-14"
//         >
//           <a
//             href="/projects"
//             className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
//           >
//             <span>View More Projects</span>
//             <ExternalLink size={18} />
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default ProjectShowcaseSection;




import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, ArrowRight, Sparkles, Layers, Zap } from "lucide-react";
// projects image
import yammiverse from "../../../assets/projectsImg/yammiverse.png";
import vsbp from "../../../assets/projectsImg/vsbp.png";
import bodp from "../../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation Home.png";

const projects = [
  {
    title: "Vehicle Service Booking Platform",
    description: "A full-stack MERN web app that connects customers with nearby vehicle service centers. Clients can book, track, and pay for services in real-time, while service centers can manage bookings, update statuses, and maintain complete service records. Features include live chat, secure payments, and role-based dashboards.",
    fullDescription: "A comprehensive vehicle service ecosystem featuring real-time booking, live chat between customers and service providers, secure payment integration, and dynamic service tracking. Built with microservices architecture for scalability and performance optimization.",
    image: vsbp,
    tech: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS", "Razorpay", "JWT"],
    live: "https://vehicle-service-booking-platform.onrender.com",
    github: "https://github.com/Ratnakar-Singh-parihar-123/Vehicle-Service-Booking-Platform",
    category: "Full-Stack Web App",
    complexity: "Advanced",
    duration: "3 months",
    teamSize: "1",
    rating: "4.8",
    status: "Live",
    features: [
      "Real-time booking & tracking",
      "Live chat between users & service centers",
      "Secure payment gateway integration",
      "Role-based dashboards",
      "Service history & analytics",
      "Email/SMS notifications"
    ],
    metrics: [
      { value: "95%", label: "User Satisfaction", icon: "Heart" },
      { value: "2.5s", label: "Avg Load Time", icon: "Zap" },
      { value: "10K+", label: "Monthly Users", icon: "Users" }
    ]
  },
  {
    title: "YammiVerse",
    description: "A MERN-based recipe sharing platform where users can explore, create, and save food recipes with secure login and image uploads. Built with responsive design and smooth user experience in mind.",
    fullDescription: "A social recipe sharing community where food enthusiasts can discover, create, and share culinary creations. Features include AI-powered recipe recommendations, step-by-step cooking guides, nutritional analysis, and social interaction capabilities.",
    image: yammiverse,
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Cloudinary", "Redux"],
    live: "https://yammiverse.onrender.com",
    github: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
    category: "Recipe Sharing Platform",
    complexity: "Intermediate",
    duration: "2 months",
    teamSize: "1",
    rating: "4.5",
    status: "Live",
    features: [
      "Recipe creation with image uploads",
      "Social sharing & commenting",
      "Personal recipe collections",
      "Advanced search & filters",
      "Nutritional information display",
      "User ratings & reviews"
    ],
    metrics: [
      { value: "5K+", label: "Recipes Shared", icon: "BookOpen" },
      { value: "3.2K", label: "Active Users", icon: "Users" },
      { value: "98%", label: "Mobile Responsive", icon: "Smartphone" }
    ]
  },
  {
    title: "Blood & Organ Donation Platform",
    description: "A MERN-based life-saving platform that connects blood and organ donors with recipients. It features donor registration, real-time availability tracking, secure authentication, and an intuitive dashboard for hospitals and users.",
    fullDescription: "A life-saving platform connecting donors with recipients in critical need. Features advanced matching algorithms, real-time availability tracking, emergency alert systems, and comprehensive donor management tools for hospitals and organizations.",
    image: bodp,
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion", "Mapbox", "Twilio"],
    live: "",
    github: "",
    category: "Healthcare Platform",
    complexity: "Advanced",
    duration: "4 months",
    teamSize: "2",
    rating: "4.9",
    status: "In Development",
    features: [
      "Real-time donor matching",
      "Emergency alert system",
      "Hospital dashboard",
      "Donor management portal",
      "Location-based search",
      "Secure data encryption"
    ],
    metrics: [
      { value: "99.9%", label: "Data Security", icon: "Shield" },
      { value: "<1min", label: "Match Time", icon: "Clock" },
      { value: "100+", label: "Lives Impacted", icon: "Heart" }
    ]
  },
];

const ProjectShowcaseSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  return (
    <>
      <section className="relative py-24 bg-background overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="container-brand relative z-10">
          {/* Header with Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-primary" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                PORTFOLIO SHOWCASE
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Featured
              <span className="relative ml-4">
                <span className="relative z-10">Projects</span>
                <motion.span
                  className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -rotate-1"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore my portfolio of innovative solutions that combine cutting-edge technology
              with user-centric design to solve real-world problems.
            </p>
          </motion.div>

          {/* Stats Bar */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            <div className="p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">3+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">100%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Layers className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">15+</div>
                  <div className="text-sm text-muted-foreground">Technologies</div>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-card/50 border border-border backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">4.7</div>
                  <div className="text-sm text-muted-foreground">Avg Rating</div>
                </div>
              </div>
            </div>
          </motion.div> */}

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleProjectClick(project)}
                className="group relative cursor-pointer"
              >
                {/* Card Container */}
                <div className="relative bg-gradient-to-b from-card to-card/80 border border-border/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full hover:-translate-y-2">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Project Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${project.status === "Live" 
                        ? "bg-green-500/20 text-green-700 dark:text-green-300 border-green-200/50 dark:border-green-800/50"
                        : project.status === "In Development"
                        ? "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-200/50 dark:border-yellow-800/50"
                        : "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/50"
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Complexity Badge */}
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md border ${project.complexity === "Advanced"
                        ? "bg-red-500/20 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-800/50"
                        : project.complexity === "Intermediate"
                        ? "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50"
                        : "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50"
                      }`}>
                        {project.complexity}
                      </span>
                    </div>

                    {/* Project Image */}
                    <div className="relative h-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Quick Actions Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="flex items-center gap-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.live || project.github, "_blank");
                          }}
                        >
                          <ExternalLink className="w-5 h-5 text-white" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center hover:bg-primary/30 transition-colors"
                        >
                          <ArrowRight className="w-5 h-5 text-primary" />
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="p-6">
                    {/* Category */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 text-xs font-medium bg-muted/50 text-muted-foreground rounded-lg backdrop-blur-sm border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-3 py-1.5 text-xs font-medium bg-muted/50 text-muted-foreground rounded-lg backdrop-blur-sm border border-border">
                          +{project.tech.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer with Metrics */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${i < Math.floor(project.rating) 
                                ? "bg-amber-500" 
                                : "bg-muted"}`}
                            />
                          ))}
                          <span className="text-xs font-medium text-foreground ml-2">
                            {project.rating}/5
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-primary" />
                          <span className="text-xs text-muted-foreground">
                            {project.teamSize} member{project.teamSize !== "1" ? "s" : ""}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        className="flex items-center gap-1 text-primary text-sm font-medium"
                        initial={false}
                        animate={{ x: hoveredIndex === index ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-6">
              <div className="text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
                EXPLORE MY COMPLETE PORTFOLIO
              </div>
              
              <a
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold bg-gradient-to-r from-primary to-primary/80 text-white hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300 overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <span>View All Projects</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </a>

              <p className="text-sm text-muted-foreground max-w-md">
                Discover more innovative solutions, case studies, and technical implementations
                that showcase my expertise in full-stack development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal (You can integrate the enhanced ProjectModal here) */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-card border border-border rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Modal header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Layers className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary">
                        {selectedProject.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-10 h-10 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal content */}
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Project Overview</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProject.fullDescription}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            </div>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-lg border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject.metrics.map((metric, index) => (
                      <div key={index} className="p-4 rounded-xl bg-card border border-border text-center">
                        <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                        <div className="text-sm text-muted-foreground">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    {selectedProject.live && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-primary text-white hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    )}
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectShowcaseSection;