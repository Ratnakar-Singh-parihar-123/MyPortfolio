import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillsPreview = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      icon: 'Monitor',
      color: 'from-blue-500 to-blue-600',
      skills: [
        { name: 'React', level: 90, icon: 'Zap', certified: true },
        { name: 'JavaScript', level: 85, icon: 'Code', certified: true },
        { name: 'Java', level: 95, icon: 'FileCode', certified: false },
        { name: 'Tailwind CSS', level: 88, icon: 'Palette', certified: true }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      icon: 'Server',
      color: 'from-green-500 to-green-600',
      skills: [
        { name: 'Node.js', level: 82, icon: 'Cpu', certified: true },
        { name: 'Express.js', level: 80, icon: 'Layers', certified: false },
        { name: 'MongoDB', level: 75, icon: 'Database', certified: true },
        { name: 'MySQL', level: 70, icon: 'HardDrive', certified: false }
      ]
    },
    {
      id: 'tools',
      title: 'Tools & Technologies',
      icon: 'Wrench',
      color: 'from-purple-500 to-purple-600',
      skills: [
        { name: 'Git', level: 92, icon: 'GitBranch', certified: true },
        { name: 'Github', level: 85, icon: 'Package', certified: false },
        { name: 'VS Code', level: 90, icon: 'Cloud', certified: true },
        { name: 'Figma', level: 60, icon: 'Figma', certified: false }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Core Competencies
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and expertise areas, 
              continuously evolving through hands-on projects and professional development.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {skillCategories?.map((category) => (
            <motion.div
              key={category?.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredSkill(category?.id)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category?.color}`}>
                  <Icon name={category?.icon} size={24} color="white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {category?.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category?.skills?.map((skill, index) => (
                  <div key={skill?.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name={skill?.icon} size={16} className="text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {skill?.name}
                        </span>
                        {skill?.certified && (
                          <div className="w-2 h-2 bg-accent rounded-full" title="Certified"></div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        {skill?.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${category?.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill?.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: index * 0.1,
                          ease: "easeOut" 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <motion.div
                className="mt-6 pt-4 border-t border-border"
                animate={{
                  opacity: hoveredSkill === category?.id ? 1 : 0.7,
                  scale: hoveredSkill === category?.id ? 1.02 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {category?.skills?.filter(s => s?.certified)?.length} Certified
                  </span>
                  <span>
                    Avg: {Math.round(category?.skills?.reduce((acc, s) => acc + s?.level, 0) / category?.skills?.length)}%
                  </span>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-card border border-border rounded-xl p-8 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Skills', value: '15+', icon: 'Target' },
              { label: 'Certifications', value: '3', icon: 'Award' },
              { label: 'Years Experience', value: '0', icon: 'Clock' },
              { label: 'Projects Built', value: '18+', icon: 'Folder' }
            ]?.map((stat, index) => (
              <motion.div
                key={stat?.label}
                variants={itemVariants}
                className="text-center space-y-2"
              >
                <div className="flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon name={stat?.icon} size={24} className="text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground">
                    {stat?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            asChild
          >
            <Link to="/skills-laboratory-interactive-technical-showcase">
              Explore All Skills & Certifications
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsPreview;