import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFilters = ({ 
  filters, 
  activeFilters, 
  onFilterChange, 
  onClearFilters,
  projectCount 
}) => {
  const filterCategories = [
    {
      key: 'technology',
      label: 'Technology',
      icon: 'Code',
      options: filters?.technologies
    },
    {
      key: 'industry',
      label: 'Industry',
      icon: 'Building',
      options: filters?.industries
    },
    {
      key: 'complexity',
      label: 'Complexity',
      icon: 'BarChart3',
      options: filters?.complexities
    }
  ];

  const hasActiveFilters = Object.values(activeFilters)?.some(arr => arr?.length > 0);

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Filter Projects</h3>
            <p className="text-sm text-muted-foreground">
              Showing {projectCount} project{projectCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Filter Categories */}
      <div className="space-y-6">
        {filterCategories?.map((category) => (
          <div key={category?.key}>
            <div className="flex items-center space-x-2 mb-3">
              <Icon name={category?.icon} size={16} className="text-muted-foreground" />
              <h4 className="font-medium text-foreground">{category?.label}</h4>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category?.options?.map((option) => {
                const isActive = activeFilters?.[category?.key]?.includes(option);
                
                return (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onFilterChange(category?.key, option)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                    }`}
                  >
                    {option}
                  </motion.button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <h4 className="font-medium text-foreground">Active Filters</h4>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([category, values]) =>
              values?.map((value) => (
                <div
                  key={`${category}-${value}`}
                  className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => onFilterChange(category, value)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters;