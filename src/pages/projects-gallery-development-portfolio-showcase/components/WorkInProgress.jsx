import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WorkInProgress = ({ projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (progress) => ({
      width: `${progress}%`,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.5 }
    })
  };

  if (!projects || projects?.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-card rounded-full border border-border mb-4">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Work in Progress</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Current Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Active development projects with real-time progress tracking, 
              estimated completion dates, and live commit activity.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects?.map((project) => (
              <motion.div
                key={project?.id}
                variants={itemVariants}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-48 md:h-full overflow-hidden">
                    <Image
                      src={project?.image}
                      alt={project?.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm font-medium rounded-full">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span>In Progress</span>
                      </div>
                    </div>

                    {/* GitHub Link */}
                    <div className="absolute bottom-4 right-4">
                      <a
                        href={project?.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-background/90 backdrop-blur-sm rounded-lg text-foreground hover:bg-background transition-colors duration-200"
                        title="View Repository"
                      >
                        <Icon name="Github" size={16} />
                      </a>
                    </div>

                    {/* Progress Overlay */}
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-2xl font-bold">{project?.progress}%</div>
                      <div className="text-xs opacity-80">Complete</div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Icon name="Folder" size={16} />
                        <span>{project?.category} • {project?.type}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-foreground leading-tight">
                        {project?.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project?.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-foreground font-medium">{project?.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          variants={progressVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={project?.progress}
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        />
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Tech Stack:</div>
                      <div className="flex flex-wrap gap-1">
                        {project?.technologies?.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Timeline & Activity */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Icon name="Calendar" size={14} className="text-muted-foreground" />
                          <span className="font-medium text-foreground">Timeline</span>
                        </div>
                        <div className="text-xs text-muted-foreground pl-5">
                          {project?.timeline}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm">
                          <Icon name="Activity" size={14} className="text-muted-foreground" />
                          <span className="font-medium text-foreground">Last Commit</span>
                        </div>
                        <div className="text-xs text-muted-foreground pl-5">
                          {project?.lastCommit}
                        </div>
                      </div>
                    </div>

                    {/* Estimated Completion */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="Target" size={14} className="text-primary" />
                        <span className="text-sm font-medium text-foreground">Estimated Completion</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {project?.estimatedCompletion}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Footer */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-card rounded-lg border border-border">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">
                Real-time updates from GitHub activity
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkInProgress;