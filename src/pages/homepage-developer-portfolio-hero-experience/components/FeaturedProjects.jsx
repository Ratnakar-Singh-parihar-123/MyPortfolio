import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import ProjectCard from "../../projects-gallery-development-portfolio-showcase/components/ProjectCard";
import { Link } from "react-router-dom";

// projects image import

import Pimge from "../../../../public/assets/PtojectsImage/premium vehicel services.png";
import Bimge from "../../../../public/assets/PtojectsImage/Blood organ donation platfrom.png";
import Simge from "../../../../public/assets/PtojectsImage/scooty fy.png";

const FeaturedProjects = () => {
  /* ------------------------------------------------------------------ */
  /*                         Component state                            */
  /* ------------------------------------------------------------------ */
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProjects = [
    {
      id: 1,
      title: "Premium Vechicel Services",
      description:
        "Premium Vehicle Services - trusted care for your car with expert maintenance, detailing, and complete service solutions.",
      image:
        Pimge,
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
      type: "Personal",
      status: "completed",
      timeline: "6 months",
      github: "https://github.com/Ratnakar-Singh-parihar-123/Vehicle-Service-Booking-Platform",
      demo: "https://vehicle-service-booking-platform.onrender.com",
    },
    {
      id: 2,
      title: "Blood organ donation platfrom",
      description:
        "Donate blood, donate organs - give hope, save lives, and be someone’s reason to live.",
      image:
        Bimge,
      technologies: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Tailwind CSS",
      ],
      type: "Personal",
      status: "completed",
      timeline: "8 months",
      github: "",
      demo: "",
    },
    {
      id: 3,
      title: "scooty fy",
      description:
        "ScootyFy - a convenient platform for reliable two-wheeler rides and services.",
      image:
        Simge,
      technologies: ["Vue.js", "Electron", "Python", "Docker", "AWS"],
      type: "Personal",
      status: "in-progress",
      timeline: "3 months",
      github: "",
      demo: "",
    },
  ];

  /* ------------------------------------------------------------------ */
  /*                    Inline Modal & Popup helpers                    */
  /* ------------------------------------------------------------------ */
  const Modal = ({ open, onClose, children }) => {
    /* close on Esc */
    const escHandler = useCallback(
      (e) => e.key === "Escape" && onClose(),
      [onClose]
    );
    useEffect(() => {
      if (open) window.addEventListener("keydown", escHandler);
      return () => window.removeEventListener("keydown", escHandler);
    }, [open, escHandler]);

    const backdrop = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
    const dropIn = {
      hidden: { y: "-40%", opacity: 0 },
      visible: {
        y: "0%",
        opacity: 1,
        transition: { type: "spring", damping: 25, stiffness: 500 },
      },
      exit: { y: "-40%", opacity: 0 },
    };

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            <motion.div
              className="relative w-full max-w-3xl bg-background rounded-lg shadow-xl overflow-hidden"
              variants={dropIn}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const ProjectPopup = ({ project }) => (
    <div className="grid md:grid-cols-2 gap-8 p-8">
      {/* Screenshot */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 object-cover rounded-md"
      />

      {/* Details */}
      <div className="space-y-4">
        <h3 className="text-3xl font-bold">{project.title}</h3>
        <p className="text-muted-foreground">{project.description}</p>

        <div>
          <span className="font-medium">Tech:</span>{" "}
          {project.technologies.join(", ")}
        </div>

        <div className="flex gap-4">
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
          >
            Live Demo
            <Icon name="ExternalLink" size={16} className="ml-2" />
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-border rounded-md hover:bg-accent transition"
          >
            GitHub
          </a>
        </div>

        {/* Audio track — replace src with any MP3/playlist */}
        <audio controls className="w-full mt-4">
          <source
            src="https://www.bensound.com/bensound-music/bensound-energy.mp3"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );

  /* ------------------------------------------------------------------ */
  /*                    Animation variants (unchanged)                  */
  /* ------------------------------------------------------------------ */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  /* ------------------------------------------------------------------ */
  /*                               JSX                                  */
  /* ------------------------------------------------------------------ */
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-4">
              <Icon name="Code" size={14} className="mr-2" />
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6"
          >
            Projects
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Discover my latest work showcasing modern web development,
            creative problem-solving, and user-centered design across various
            technologies and domains.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredProjects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
                featured={index === 0}
                large={false}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/projects-gallery-development-portfolio-showcase"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 group"
          >
            <span>View All Projects</span>
            <Icon
              name="ArrowRight"
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform duration-200"
            />
          </Link>
        </motion.div>

        {/* Stats */}
        {/* <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20 pt-16 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Projects Completed", value: "15+", icon: "CheckCircle" },
              { label: "Technologies Used", value: "20+", icon: "Code" },
              { label: "GitHub Stars", value: "500+", icon: "Star" },
              { label: "Client Satisfaction", value: "100%", icon: "Heart" },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name={stat.icon} size={24} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div> */}
      </div>

      {/* Modal */}
      <Modal open={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && <ProjectPopup project={selectedProject} />}
      </Modal>
    </section>
  );
};

export default FeaturedProjects;
