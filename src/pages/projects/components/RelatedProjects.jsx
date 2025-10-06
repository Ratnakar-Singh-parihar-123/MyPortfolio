import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedProjects = ({ projects, currentProject, onProjectSelect }) => {
  const relatedProjects = projects?.filter(project => 
      project?.id !== currentProject?.id &&
      (project?.technologies?.some(tech => currentProject?.technologies?.includes(tech)) ||
       project?.category === currentProject?.category)
    )?.slice(0, 3);

  if (relatedProjects?.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="GitBranch" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Related Projects</h3>
          <p className="text-sm text-muted-foreground">
            Similar projects you might find interesting
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedProjects?.map((project, index) => (
          <motion.div
            key={project?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-card border border-border rounded-lg overflow-hidden hover-lift cursor-pointer"
            onClick={() => onProjectSelect(project)}
          >
            {/* Project Image */}
            <div className="relative h-32 overflow-hidden">
              <Image
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Quick View Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  variant="secondary"
                  size="sm"
                  iconName="Eye"
                  className="bg-background/90 backdrop-blur-sm"
                >
                  Quick View
                </Button>
              </div>
            </div>

            {/* Project Info */}
            <div className="p-4">
              <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {project?.description}
              </p>

              {/* Common Technologies */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project?.technologies?.filter(tech => currentProject?.technologies?.includes(tech))?.slice(0, 2)?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                {project?.technologies?.filter(tech => 
                  currentProject?.technologies?.includes(tech)
                )?.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                    +{project?.technologies?.filter(tech => 
                      currentProject?.technologies?.includes(tech)
                    )?.length - 2}
                  </span>
                )}
              </div>

              {/* Project Stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{project?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>{project?.rating}/5</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProjects;