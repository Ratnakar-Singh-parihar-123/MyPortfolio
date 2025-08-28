import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
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

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative pt-32 pb-20 bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
      {/* Floating Icons */}
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        className="absolute top-1/4 left-10 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
      >
        <Icon name="Code" size={24} className="text-primary" />
      </motion.div>
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
        className="absolute top-1/3 right-16 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
      >
        <Icon name="Zap" size={24} className="text-secondary" />
      </motion.div>
      <motion.div 
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '4s' }}
        className="absolute bottom-1/4 right-1/4 p-3 bg-card/80 backdrop-blur-sm rounded-xl border border-border shadow-lg"
      >
        <Icon name="Palette" size={24} className="text-accent" />
      </motion.div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border">
              <Icon name="Folder" size={16} className="text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Project Portfolio</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Development
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"> Portfolio </span>
              Showcase
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              An immersive gallery showcasing full-stack applications, innovative React solutions, 
              and JavaScript projects that demonstrate technical expertise, problem-solving approach, 
              and continuous skill evolution.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-card/50 rounded-lg border border-border">
                <Icon name="GitBranch" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">6 Completed</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-card/50 rounded-lg border border-border">
                <Icon name="Clock" size={16} className="text-secondary" />
                <span className="text-sm font-medium text-foreground">2 In Progress</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-card/50 rounded-lg border border-border">
                <Icon name="Star" size={16} className="text-accent" />
                <span className="text-sm font-medium text-foreground">3 Featured</span>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-col items-center space-y-3"
          >
            <span className="text-sm text-muted-foreground">Explore Projects</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="p-2 rounded-full border border-border"
            >
              <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;