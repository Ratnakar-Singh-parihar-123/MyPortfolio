import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProjectCard = ({ project, onClick, featured = false, large = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const cardVariants = {
    idle: {
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
    },
    hover: {
      scale: featured ? 1.02 : 1.05,
      y: featured ? -8 : -12,
      rotateX: 2,
      rotateY: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    idle: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'in-progress':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Personal':
        return 'User';
      case 'Educational':
        return 'GraduationCap';
      case 'Collaborative':
        return 'Users';
      default:
        return 'Folder';
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative group cursor-pointer ${
        large ? 'h-96' : featured ? 'h-80' : 'h-72'
      } rounded-2xl overflow-hidden bg-card border border-border shadow-lg hover:shadow-2xl transition-shadow duration-300`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
              <Icon name="Star" size={12} />
              <span>Featured</span>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(project?.status)}`}>
            {project?.status === 'completed' ? 'Completed' : 'In Progress'}
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Quick Info */}
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center space-x-1 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md">
              <Icon name={getTypeIcon(project?.type)} size={12} className="text-white/80" />
              <span className="text-xs text-white/80 font-medium">{project?.type}</span>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md">
              <Icon name="Clock" size={12} className="text-white/80" />
              <span className="text-xs text-white/80">{project?.timeline}</span>
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className={`font-bold text-white ${large ? 'text-2xl' : featured ? 'text-xl' : 'text-lg'}`}>
            {project?.title}
          </h3>
          <p className={`text-white/80 ${large ? 'text-base' : 'text-sm'} line-clamp-2`}>
            {project?.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {project?.technologies?.slice(0, large ? 6 : 4)?.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/80 text-xs rounded-md"
              >
                {tech}
              </span>
            ))}
            {project?.technologies?.length > (large ? 6 : 4) && (
              <span className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/60 text-xs rounded-md">
                +{project?.technologies?.length - (large ? 6 : 4)}
              </span>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          variants={overlayVariants}
          initial="idle"
          animate={isHovered ? "hover" : "idle"}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Icon name="ExternalLink" size={24} className="text-white" />
            </div>
            <div>
              <div className="text-white font-semibold mb-1">View Details</div>
              <div className="text-white/60 text-sm">Click to explore project</div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center justify-center space-x-3">
              {project?.github && (
                <a
                  href={project?.github}
                  onClick={(e) => e?.stopPropagation()}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  title="View Source"
                >
                  <Icon name="Github" size={16} className="text-white" />
                </a>
              )}
              {project?.demo && (
                <a
                  href={project?.demo}
                  onClick={(e) => e?.stopPropagation()}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
                  title="Live Demo"
                >
                  <Icon name="ExternalLink" size={16} className="text-white" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;