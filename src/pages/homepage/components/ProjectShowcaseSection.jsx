import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
// projects image
import yammiverse from "../../../assets/projectsImg/yammiverse.png";
import vsbp from "../../../assets/projectsImg/vsbp.png";
import bodp from "../../../assets/projectsImg/bloodAndOrganDonationsImg/Blood And Organ Donation Home.png";

const projects = [
  {
    title: "Vehicle Service Booking Platform",
    description:
      "A full-stack MERN web app that connects customers with nearby vehicle service centers. Clients can book, track, and pay for services in real-time, while service centers can manage bookings, update statuses, and maintain complete service records. Features include live chat, secure payments, and role-based dashboards.",
    image: vsbp,
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.io",
      "Tailwind CSS",
    ],
    live: "https://vehicle-service-booking-platform.onrender.com",
    github:
      "https://github.com/Ratnakar-Singh-parihar-123/Vehicle-Service-Booking-Platform",
  },
  {
    title: "YammiVerse",
    description:
      "A MERN-based recipe sharing platform where users can explore, create, and save food recipes with secure login and image uploads. Built with responsive design and smooth user experience in mind.",
    image: yammiverse,
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    live: "https://yammiverse.onrender.com",
    github: "https://github.com/Ratnakar-Singh-parihar-123/YammiVerse",
  },
  {
    title: "Blood & Organ Donation Platform",
    description:
      "A MERN-based life-saving platform that connects blood and organ donors with recipients. It features donor registration, real-time availability tracking, secure authentication, and an intuitive dashboard for hospitals and users.",
    image: bodp,
    tech: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Framer Motion",
    ],
    live: "",
    github: "",
    status: "In Progress", // ✅ Added project status
  },
];

const ProjectShowcaseSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container-brand text-center">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Projects
        </motion.h2>
        <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my favorite projects that showcase my passion for
          building full-stack web apps and solving real-world problems using
          modern technologies.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* ✅ Status Badge (In Progress) */}
                {project.status && (
                  <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                    {project.status}
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                        aria-label="GitHub Link"
                      >
                        <Github size={18} className="text-gray-800" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                        aria-label="Live Link"
                      >
                        <ExternalLink size={18} className="text-gray-800" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <a
            href="/projects"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View More Projects</span>
            <ExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectShowcaseSection;