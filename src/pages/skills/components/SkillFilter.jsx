import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SkillFilter = ({ onFilterChange, onSearchChange, onSortChange }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'All Skills', icon: 'Grid3x3', count: 24 },
    { id: 'frontend', name: 'Frontend', icon: 'Monitor', count: 8 },
    { id: 'backend', name: 'Backend', icon: 'Server', count: 6 },
    { id: 'database', name: 'Database', icon: 'Database', count: 4 },
    { id: 'tools', name: 'Tools', icon: 'Wrench', count: 6 }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name A-Z' },
    { value: 'proficiency', label: 'Proficiency' },
    { value: 'experience', label: 'Experience' },
    { value: 'recent', label: 'Recently Used' }
  ];

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleSortChange = (e) => {
    const value = e?.target?.value;
    setSortBy(value);
    onSortChange(value);
  };

  const clearFilters = () => {
    setActiveFilter('all');
    setSearchTerm('');
    setSortBy('name');
    onFilterChange('all');
    onSearchChange('');
    onSortChange('name');
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Filter & Search
            </h3>
            <p className="text-sm text-muted-foreground">
              Find specific skills and technologies
            </p>
          </div>
        </div>
        
        <button
          onClick={clearFilters}
          className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
        >
          <Icon name="X" size={16} />
          <span>Clear All</span>
        </button>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search skills, technologies, or frameworks..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>
      </div>
      {/* Category Filters */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <motion.button
              key={category?.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFilterChange(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeFilter === category?.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-background border border-border text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeFilter === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h4 className="text-sm font-medium text-foreground">Sort by:</h4>
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex bg-muted rounded-lg p-1">
            <button className="p-2 bg-background rounded-md shadow-sm">
              <Icon name="Grid3x3" size={16} className="text-foreground" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground">
              <Icon name="List" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(activeFilter !== 'all' || searchTerm) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-border"
        >
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Active filters:</span>
            {activeFilter !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md">
                <span>{categories?.find(c => c?.id === activeFilter)?.name}</span>
                <button onClick={() => handleFilterChange('all')}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-md">
                <span>"{searchTerm}"</span>
                <button onClick={() => handleSearchChange({ target: { value: '' } })}>
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillFilter;