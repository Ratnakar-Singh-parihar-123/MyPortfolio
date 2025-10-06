import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-success';
      case 'Advanced': return 'bg-primary';
      case 'Intermediate': return 'bg-warning';
      case 'Beginner': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getProficiencyWidth = (level) => {
    switch (level) {
      case 'Expert': return '95%';
      case 'Advanced': return '85%';
      case 'Intermediate': return '70%';
      case 'Beginner': return '50%';
      default: return '0%';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skill Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${skill?.color} bg-opacity-10`}>
            <Icon 
              name={skill?.icon} 
              size={24} 
              className={`${skill?.color?.replace('bg-', 'text-')}`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {skill?.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {skill?.category}
            </p>
          </div>
        </div>
        
        {skill?.certified && (
          <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
            <Icon name="Award" size={12} />
            <span>Certified</span>
          </div>
        )}
      </div>
      {/* Proficiency Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            Proficiency
          </span>
          <span className={`text-sm font-semibold ${getProficiencyColor(skill?.proficiency)?.replace('bg-', 'text-')}`}>
            {skill?.proficiency}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${getProficiencyColor(skill?.proficiency)}`}
            initial={{ width: 0 }}
            animate={{ width: getProficiencyWidth(skill?.proficiency) }}
            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
          />
        </div>
      </div>
      {/* Experience */}
      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span>{skill?.experience} experience</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Briefcase" size={14} />
          <span>{skill?.projects} projects</span>
        </div>
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {skill?.description}
      </p>
      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {skill?.technologies?.slice(0, 3)?.map((tech, techIndex) => (
          <span
            key={techIndex}
            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
          >
            {tech}
          </span>
        ))}
        {skill?.technologies?.length > 3 && (
          <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
            +{skill?.technologies?.length - 3} more
          </span>
        )}
      </div>
      {/* Action Buttons */}
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors">
          <Icon name="Play" size={12} />
          <span>Demo</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 border border-border text-foreground text-xs rounded-lg hover:bg-muted transition-colors">
          <Icon name="Code" size={12} />
          <span>Code</span>
        </button>
      </motion.div>
      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default SkillCard;