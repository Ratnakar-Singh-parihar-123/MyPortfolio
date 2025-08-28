import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef?.current && !modalRef?.current?.contains(e?.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document?.addEventListener('keydown', handleEscape);
      document?.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document?.removeEventListener('keydown', handleEscape);
      document?.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 100,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] bg-card rounded-2xl border border-border shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-colors duration-200"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Modal Content */}
            <div className="grid md:grid-cols-2 h-full max-h-[90vh]">
              {/* Image Section */}
              <div className="relative h-64 md:h-auto">
                <Image
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                
                {/* Status & Type Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {project?.featured && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full">
                      <Icon name="Star" size={14} />
                      <span>Featured</span>
                    </div>
                  )}
                  <div className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project?.status)}`}>
                    {project?.status === 'completed' ? 'Completed' : 'In Progress'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  {project?.github && (
                    <a
                      href={project?.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-background/90 backdrop-blur-sm rounded-lg border border-border hover:bg-background transition-colors duration-200"
                      title="View Source Code"
                    >
                      <Icon name="Github" size={16} />
                    </a>
                  )}
                  {project?.demo && (
                    <a
                      href={project?.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
                      title="Live Demo"
                    >
                      <Icon name="ExternalLink" size={16} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <motion.div 
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="p-8 overflow-y-auto"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Icon name={getTypeIcon(project?.type)} size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{project?.type} Project</div>
                        <div className="text-sm text-muted-foreground">{project?.category}</div>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl font-bold text-foreground leading-tight">
                      {project?.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {project?.description}
                    </p>
                  </motion.div>

                  {/* Technologies */}
                  <motion.div variants={itemVariants} className="space-y-3">
                    <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                      <Icon name="Code" size={18} />
                      <span>Technologies Used</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-md border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Project Details */}
                  <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                        <span className="font-medium text-foreground">Timeline:</span>
                      </div>
                      <div className="text-sm text-muted-foreground pl-6">{project?.timeline}</div>
                    </div>
                    
                    {project?.metrics && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Icon name="BarChart" size={16} className="text-muted-foreground" />
                          <span className="font-medium text-foreground">Metrics:</span>
                        </div>
                        <div className="text-sm text-muted-foreground pl-6">
                          {project?.metrics?.commits} commits<br/>
                          {project?.metrics?.linesOfCode} lines<br/>
                          {project?.metrics?.contributors} contributor(s)
                        </div>
                      </div>
                    )}
                  </motion.div>

                  {/* Challenges */}
                  {project?.challenges && (
                    <motion.div variants={itemVariants} className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                        <Icon name="Target" size={18} />
                        <span>Key Challenges</span>
                      </h3>
                      <ul className="space-y-2">
                        {project?.challenges?.map((challenge, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                            <span className="text-sm text-muted-foreground">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Learnings */}
                  {project?.learnings && (
                    <motion.div variants={itemVariants} className="space-y-3">
                      <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                        <Icon name="Lightbulb" size={18} />
                        <span>Key Learnings</span>
                      </h3>
                      <ul className="space-y-2">
                        {project?.learnings?.map((learning, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-secondary mt-0.5" />
                            <span className="text-sm text-muted-foreground">{learning}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 pt-4">
                    {project?.demo && (
                      <Button
                        variant="default"
                        size="lg"
                        iconName="ExternalLink"
                        iconPosition="right"
                        asChild
                      >
                        <a href={project?.demo} target="_blank" rel="noopener noreferrer">
                          View Live Demo
                        </a>
                      </Button>
                    )}
                    {project?.github && (
                      <Button
                        variant="outline"
                        size="lg"
                        iconName="Github"
                        iconPosition="left"
                        asChild
                      >
                        <a href={project?.github} target="_blank" rel="noopener noreferrer">
                          View Source Code
                        </a>
                      </Button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;