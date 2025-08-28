import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import ProjectCard from '../../projects-gallery-development-portfolio-showcase/components/ProjectCard';

const FeaturedProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const featuredProjects = [
    {
      id: 1,
      title: "TaskFlow Pro",
      description: "A comprehensive project management platform with real-time collaboration, Kanban boards, and team analytics. Built for modern distributed teams.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Tailwind"],
      type: "Personal",
      status: "completed",
      timeline: "6 months",
      github: "https://github.com/alexchen/taskflow-pro",
      demo: "https://taskflow-pro-demo.com"
    },
    {
      id: 2,
      title: "EcoTracker Mobile",
      description: "React Native app for tracking carbon footprint with AI-powered suggestions and social challenges. Over 10k downloads.",
      image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop",
      technologies: ["React Native", "TypeScript", "Firebase", "TensorFlow", "Redux"],
      type: "Collaborative",
      status: "completed",
      timeline: "8 months",
      github: "https://github.com/greenteam/ecotracker",
      demo: "https://apps.apple.com/app/ecotracker"
    },
    {
      id: 3,
      title: "DevToolkit",
      description: "Open-source developer utilities suite with code formatters, API testers, and productivity tools. 500+ GitHub stars.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "Electron", "Python", "Docker", "AWS"],
      type: "Personal",
      status: "in-progress",
      timeline: "4 months",
      github: "https://github.com/alexchen/devtoolkit",
      demo: "https://devtoolkit.dev"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
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
          
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Recent Projects
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover my latest work showcasing modern web development, creative problem-solving, 
            and user-centered design across various technologies and domains.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredProjects?.map((project, index) => (
            <motion.div key={project?.id} variants={itemVariants}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
                featured={index === 0}
                large={false}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/projects-gallery-development-portfolio-showcase"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200 group"
          >
            <span>View All Projects</span>
            <Icon 
              name="ArrowRight" 
              size={16} 
              className="ml-2 group-hover:translate-x-1 transition-transform duration-200" 
            />
          </a>
        </motion.div>

        {/* Project Stats */}
        <motion.div
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
              { label: "Client Satisfaction", value: "100%", icon: "Heart" }
            ]?.map((stat, index) => (
              <motion.div key={index} variants={itemVariants} className="space-y-2">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name={stat?.icon} size={24} className="text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;