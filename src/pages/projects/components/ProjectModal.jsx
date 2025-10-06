import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'technical', label: 'Technical Details', icon: 'Code' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'results', label: 'Results', icon: 'BarChart3' }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project?.gallery?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project?.gallery?.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{project?.title}</h2>
                  <p className="text-muted-foreground">{project?.category}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                iconName="X"
                onClick={onClose}
                className="hover:bg-muted"
              />
            </div>

            {/* Content */}
            <div className="flex h-[calc(90vh-120px)]">
              {/* Sidebar */}
              <div className="w-64 border-r border-border bg-muted/30">
                <div className="p-4">
                  <nav className="space-y-2">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t border-border">
                  <div className="space-y-2">
                    {project?.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        iconName="ExternalLink"
                        iconPosition="left"
                        onClick={() => window.open(project?.liveUrl, '_blank')}
                      >
                        Live Demo
                      </Button>
                    )}
                    {project?.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        iconName="Github"
                        iconPosition="left"
                        onClick={() => window.open(project?.githubUrl, '_blank')}
                      >
                        Source Code
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="Download"
                      iconPosition="left"
                    >
                      Case Study PDF
                    </Button>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Image Gallery */}
                      <div className="relative">
                        <div className="relative h-80 rounded-lg overflow-hidden">
                          <Image
                            src={project?.gallery?.[currentImageIndex]}
                            alt={`${project?.title} screenshot ${currentImageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          {project?.gallery?.length > 1 && (
                            <>
                              <button
                                onClick={prevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <Icon name="ChevronLeft" size={20} />
                              </button>
                              <button
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                              >
                                <Icon name="ChevronRight" size={20} />
                              </button>
                            </>
                          )}
                        </div>
                        {project?.gallery?.length > 1 && (
                          <div className="flex justify-center mt-4 space-x-2">
                            {project?.gallery?.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  index === currentImageIndex ? 'bg-primary' : 'bg-muted-foreground/30'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Project Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Project Overview</h3>
                        <p className="text-muted-foreground leading-relaxed">{project?.fullDescription}</p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {project?.features?.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Client Testimonial */}
                      {project?.testimonial && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <Icon name="Quote" size={24} className="text-primary flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-foreground italic mb-3">"{project?.testimonial?.content}"</p>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                  <Icon name="User" size={16} className="text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{project?.testimonial?.author}</p>
                                  <p className="text-sm text-muted-foreground">{project?.testimonial?.role}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className="space-y-6">
                      {/* Tech Stack */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Technology Stack</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {project?.technologies?.map((tech, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                                <Icon name="Code" size={16} className="text-primary" />
                              </div>
                              <span className="text-sm font-medium text-foreground">{tech}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Architecture */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Architecture & Approach</h3>
                        <div className="space-y-4">
                          {project?.architecture?.map((item, index) => (
                            <div key={index} className="border border-border rounded-lg p-4">
                              <h4 className="font-medium text-foreground mb-2">{item?.title}</h4>
                              <p className="text-sm text-muted-foreground">{item?.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Challenges & Solutions */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Challenges & Solutions</h3>
                        <div className="space-y-4">
                          {project?.challenges?.map((challenge, index) => (
                            <div key={index} className="border border-border rounded-lg p-4">
                              <div className="flex items-start space-x-3 mb-3">
                                <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                                <h4 className="font-medium text-foreground">Challenge</h4>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{challenge?.problem}</p>
                              <div className="flex items-start space-x-3">
                                <Icon name="Lightbulb" size={16} className="text-success mt-0.5" />
                                <div>
                                  <h4 className="font-medium text-foreground mb-1">Solution</h4>
                                  <p className="text-sm text-muted-foreground">{challenge?.solution}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'timeline' && (
                    <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3">Development Timeline</h3>
                      <div className="relative">
                        {project?.timeline?.map((phase, index) => (
                          <div key={index} className="relative flex items-start space-x-4 pb-8">
                            <div className="flex flex-col items-center">
                              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                <Icon name={phase?.icon} size={16} className="text-primary-foreground" />
                              </div>
                              {index < project?.timeline?.length - 1 && (
                                <div className="w-0.5 h-16 bg-border mt-2" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-foreground">{phase?.title}</h4>
                                <span className="text-sm text-muted-foreground">{phase?.duration}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{phase?.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {phase?.deliverables?.map((deliverable, delIndex) => (
                                  <span
                                    key={delIndex}
                                    className="px-2 py-1 bg-success/10 text-success text-xs rounded-md"
                                  >
                                    {deliverable}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div className="space-y-6">
                      {/* Key Metrics */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Project Impact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {project?.metrics?.map((metric, index) => (
                            <div key={index} className="text-center p-6 bg-muted/50 rounded-lg">
                              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                                <Icon name={metric?.icon} size={24} className="text-primary" />
                              </div>
                              <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
                              <div className="text-sm text-muted-foreground">{metric?.label}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Before/After Comparison */}
                      {project?.comparison && (
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">Before vs After</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-medium text-destructive flex items-center space-x-2">
                                <Icon name="X" size={16} />
                                <span>Before</span>
                              </h4>
                              <ul className="space-y-2">
                                {project?.comparison?.before?.map((item, index) => (
                                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                    <Icon name="Minus" size={14} className="text-destructive mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-medium text-success flex items-center space-x-2">
                                <Icon name="Check" size={16} />
                                <span>After</span>
                              </h4>
                              <ul className="space-y-2">
                                {project?.comparison?.after?.map((item, index) => (
                                  <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                                    <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Lessons Learned */}
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Key Learnings</h3>
                        <div className="space-y-3">
                          {project?.learnings?.map((learning, index) => (
                            <div key={index} className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
                              <Icon name="BookOpen" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-foreground">{learning}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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