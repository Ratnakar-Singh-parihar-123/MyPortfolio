import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ filters, selectedFilter, onFilterChange }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const getFilterIcon = (filter) => {
    switch (filter) {
      case 'All':
        return 'Grid';
      case 'React':
        return 'Atom';
      case 'JavaScript':
        return 'Code2';
      case 'Full-stack':
        return 'Layers';
      default:
        return 'Filter';
    }
  };

  return (
    <section className="sticky top-20 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 lg:px-8 py-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          {/* Filter Title */}
          <motion.div variants={itemVariants} className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name="Filter" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Filter Projects</h3>
              <p className="text-sm text-muted-foreground">Sort by technology stack</p>
            </div>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2">
            {filters?.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border'
                }`}
              >
                <Icon name={getFilterIcon(filter)} size={16} />
                <span>{filter}</span>
                {selectedFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="w-1.5 h-1.5 bg-primary-foreground rounded-full"
                  />
                )}
              </button>
            ))}
          </motion.div>

          {/* Active Filter Count */}
          <motion.div variants={itemVariants} className="hidden lg:flex items-center space-x-2">
            <Icon name="Hash" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Showing {selectedFilter === 'All' ? 'all' : selectedFilter?.toLowerCase()} projects
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FilterBar;