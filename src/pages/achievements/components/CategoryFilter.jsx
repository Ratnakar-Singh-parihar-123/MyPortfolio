import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryConfig = {
    'all': { icon: 'Grid3X3', label: 'All Achievements', color: 'text-foreground' },
    'certification': { icon: 'Award', label: 'Certifications', color: 'text-blue-600' },
    'project': { icon: 'Trophy', label: 'Projects', color: 'text-yellow-600' },
    'recognition': { icon: 'Star', label: 'Recognition', color: 'text-purple-600' },
    'achievement': { icon: 'Medal', label: 'Achievements', color: 'text-green-600' },
    'education': { icon: 'GraduationCap', label: 'Education', color: 'text-indigo-600' },
    'client': { icon: 'Heart', label: 'Client Success', color: 'text-pink-600' }
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories?.map((category) => {
        const config = categoryConfig?.[category] || categoryConfig?.['all'];
        const isActive = activeCategory === category;
        
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon 
              name={config?.icon} 
              size={16} 
              className={isActive ? 'text-primary-foreground' : config?.color}
            />
            <span>{config?.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;