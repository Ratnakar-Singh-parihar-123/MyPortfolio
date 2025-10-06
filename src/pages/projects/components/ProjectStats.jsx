import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects }) => {
  const stats = [
    {
      icon: 'FolderOpen',
      label: 'Total Projects',
      value: projects?.length,
      color: 'text-primary'
    },
    {
      icon: 'Code',
      label: 'Technologies Used',
      value: [...new Set(projects.flatMap(p => p.technologies))]?.length,
      color: 'text-success'
    },
    {
      icon: 'Building',
      label: 'Industries Served',
      value: [...new Set(projects.map(p => p.industry))]?.length,
      color: 'text-warning'
    },
    {
      icon: 'Users',
      label: 'Total Team Members',
      value: projects?.reduce((sum, p) => sum + parseInt(p?.teamSize), 0),
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-card border border-border rounded-lg p-4 text-center hover-lift"
        >
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${
            stat?.color === 'text-primary' ? 'bg-primary/10' :
            stat?.color === 'text-success' ? 'bg-success/10' :
            stat?.color === 'text-warning'? 'bg-warning/10' : 'bg-accent/10'
          }`}>
            <Icon name={stat?.icon} size={24} className={stat?.color} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
          <div className="text-sm text-muted-foreground">{stat?.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectStats;