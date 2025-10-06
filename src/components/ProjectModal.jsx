import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';
import Image from './AppImage';
import Button from './ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
              aria-label="Close modal"
            >
              <Icon name="X" size={20} />
            </button>
            
            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80">
                <Image
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 text-xs font-medium rounded-full ${
                    project?.status === 'Live' ?'bg-success text-success-foreground' :'bg-warning text-warning-foreground'
                  }`}>
                    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                    <span>{project?.status}</span>
                  </span>
                </div>
                
                {/* Category */}
                <div className="absolute bottom-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-medium rounded-full">
                    {project?.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Title and Description */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      {project?.title}
                    </h2>
                    {project?.year && (
                      <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                        {project?.year}
                      </span>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project?.description}
                  </p>
                </div>

                {/* Technologies */}
                {project?.technologies && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-lg border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Metrics */}
                {project?.metrics && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Key Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(project?.metrics)?.map(([key, value]) => (
                        <div key={key} className="text-center p-4 bg-muted/50 rounded-lg">
                          <div className="text-2xl font-bold text-primary">{value}</div>
                          <div className="text-sm text-muted-foreground capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {project?.features && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project?.features?.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Challenges & Solutions */}
                {project?.challenges && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Challenges & Solutions</h3>
                    <div className="space-y-4">
                      {project?.challenges?.map((item, index) => (
                        <div key={index} className="p-4 bg-muted/30 rounded-lg">
                          <div className="font-medium text-foreground mb-2">{item?.challenge}</div>
                          <div className="text-muted-foreground text-sm">{item?.solution}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border">
                  {project?.links?.live && (
                    <Button
                      variant="default"
                      size="lg"
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="flex-1 sm:flex-none"
                      onClick={() => window.open(project?.links?.live, '_blank', 'noopener,noreferrer')}
                    >
                      Live Demo
                    </Button>
                  )}
                  {project?.links?.github && (
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Github"
                      iconPosition="left"
                      className="flex-1 sm:flex-none"
                      onClick={() => window.open(project?.links?.github, '_blank', 'noopener,noreferrer')}
                    >
                      View Code
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="lg"
                    iconName="Share2"
                    iconPosition="left"
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: project?.title,
                          text: project?.description,
                          url: project?.links?.live || window.location?.href,
                        });
                      } else {
                        // Fallback: copy to clipboard
                        navigator.clipboard?.writeText(project?.links?.live || window.location?.href);
                      }
                    }}
                  >
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;