import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, onProjectClick, featured = false }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: featured ? 0.2 : 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (!projects || projects?.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No Projects Found</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more projects.</p>
      </div>
    );
  }

  // Featured projects use a special layout
  if (featured) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid lg:grid-cols-2 gap-8"
      >
        {projects?.map((project, index) => (
          <motion.div
            key={project?.id}
            variants={itemVariants}
            className={index === 0 ? "lg:row-span-2" : ""}
          >
            <ProjectCard 
              project={project} 
              onClick={() => onProjectClick(project)}
              featured={true}
              large={index === 0}
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  // Regular masonry-style grid
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects?.map((project) => (
        <motion.div
          key={project?.id}
          variants={itemVariants}
        >
          <ProjectCard 
            project={project} 
            onClick={() => onProjectClick(project)}
            featured={false}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;