import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project?.image}
          alt={project?.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Live Demo Badge */}
        {project?.liveUrl && (
          <div className="absolute top-4 right-4">
            <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
              <div className="w-2 h-2 bg-success-foreground rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className={`absolute bottom-4 left-4 right-4 flex space-x-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {project?.liveUrl && (
            <Button
              variant="secondary"
              size="sm"
              iconName="ExternalLink"
              iconPosition="left"
              className="flex-1 bg-background/90 backdrop-blur-sm"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.liveUrl, '_blank');
              }}
            >
              Live Demo
            </Button>
          )}
          {project?.githubUrl && (
            <Button
              variant="outline"
              size="sm"
              iconName="Github"
              className="bg-background/90 backdrop-blur-sm border-border/50"
              onClick={(e) => {
                e?.stopPropagation();
                window.open(project?.githubUrl, '_blank');
              }}
            />
          )}
        </div>
      </div>
      {/* Project Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {project?.title}
            </h3>
            <p className="text-sm text-muted-foreground">{project?.category}</p>
          </div>
          <div className="flex items-center space-x-1 text-warning">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < project?.rating ? 'fill-current' : 'opacity-30'}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project?.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project?.technologies?.slice(0, 3)?.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {project?.technologies?.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
              +{project?.technologies?.length - 3} more
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Calendar" size={14} />
              <span>{project?.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{project?.teamSize}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-success">
            <Icon name="TrendingUp" size={14} />
            <span className="font-medium">{project?.impact}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onViewDetails(project)}
          className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
        >
          View Case Study
        </Button>
      </div>
      {/* Complexity Badge */}
      <div className="absolute top-4 left-4">
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          project?.complexity === 'Advanced' ?'bg-destructive/10 text-destructive border border-destructive/20'
            : project?.complexity === 'Intermediate' ?'bg-warning/10 text-warning border border-warning/20' :'bg-success/10 text-success border border-success/20'
        }`}>
          {project?.complexity}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;