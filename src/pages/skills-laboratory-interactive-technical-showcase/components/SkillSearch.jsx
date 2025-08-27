import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const SkillSearch = ({ searchTerm, onSearchChange, sortBy, onSortChange, proficiencyFilter, onProficiencyFilterChange }) => {
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'proficiency', label: 'Proficiency Level' },
    { value: 'recent', label: 'Recently Used' },
    { value: 'experience', label: 'Years of Experience' }
  ];

  const proficiencyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'Expert', label: 'Expert' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Beginner', label: 'Beginner' }
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <Input
              type="text"
              placeholder="Search skills, technologies, or tools..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="min-w-[180px]">
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by..."
            />
          </div>
          
          <div className="min-w-[160px]">
            <Select
              options={proficiencyOptions}
              value={proficiencyFilter}
              onChange={onProficiencyFilterChange}
              placeholder="Filter by level..."
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} />
          <span>Advanced filters available</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-yellow-500" />
          <span>Real-time search</span>
        </div>
      </div>
    </div>
  );
};

export default SkillSearch;