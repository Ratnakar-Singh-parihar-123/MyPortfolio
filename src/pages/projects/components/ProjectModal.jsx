import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  const tabs = [
    { id: "overview", label: "Overview", icon: "Eye" },
    { id: "technical", label: "Technical", icon: "Code" },
    { id: "timeline", label: "Timeline", icon: "Clock" },
    { id: "results", label: "Results", icon: "BarChart3" },
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-background border border-border rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FolderOpen" size={22} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground">
                    {project?.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {project?.category}
                  </p>
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

            {/* Tabs (Responsive) */}
            <div className="border-b border-border bg-muted/20 overflow-x-auto no-scrollbar flex sm:hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={tab.icon} size={15} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col sm:flex-row overflow-hidden">
              {/* Sidebar (Hidden on mobile) */}
              <div className="hidden sm:flex flex-col w-64 border-r border-border bg-muted/30 overflow-y-auto">
                <div className="p-4">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        activeTab === tab.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon name={tab.icon} size={16} />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
                <div className="p-4 border-t border-border space-y-2">
                  {project?.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      iconName="ExternalLink"
                      onClick={() => window.open(project.liveUrl, "_blank")}
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
                      onClick={() => window.open(project.githubUrl, "_blank")}
                    >
                      Source Code
                    </Button>
                  )}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Image Gallery */}
                {activeTab === "overview" && (
                  <>
                    <div className="relative rounded-lg overflow-hidden">
                      <Image
                        src={project?.gallery?.[currentImageIndex]}
                        alt="Project"
                        className="w-full h-56 sm:h-80 object-cover"
                      />
                      {project?.gallery?.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
                          >
                            <Icon name="ChevronLeft" size={18} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center"
                          >
                            <Icon name="ChevronRight" size={18} />
                          </button>
                        </>
                      )}
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                        Project Overview
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                        {project?.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3">
                        Key Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {project?.features?.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                          >
                            <Icon
                              name="Check"
                              size={15}
                              className="text-success mt-0.5"
                            />
                            <span className="text-sm">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Other Tabs */}
                {activeTab === "technical" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Technology Stack
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project?.technologies?.map((t, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 p-3 bg-muted/40 rounded-lg"
                        >
                          <Icon name="Code" size={15} className="text-primary" />
                          <span className="text-sm">{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;