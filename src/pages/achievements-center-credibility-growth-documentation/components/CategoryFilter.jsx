import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryFilter = ({ categories, activeCategory, onCategoryChange, achievementCounts }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      'All': 'Grid3X3',
      'Technical Certifications': 'Award',
      'Educational Achievements': 'GraduationCap',
      'Project Milestones': 'Trophy',
      'Community Contributions': 'Users'
    };
    return icons?.[category] || 'Circle';
  };

  const getCategoryColor = (category, isActive) => {
    if (isActive) {
      return 'bg-primary text-white border-primary';
    }
    
    const colors = {
      'Technical Certifications': 'hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200',
      'Educational Achievements': 'hover:bg-green-50 hover:text-green-600 hover:border-green-200',
      'Project Milestones': 'hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200',
      'Community Contributions': 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
    };
    return colors?.[category] || 'hover:bg-gray-50 hover:text-gray-600 hover:border-gray-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Icon name="Filter" size={20} />
        <span>Filter by Category</span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories?.map((category) => {
          const isActive = activeCategory === category;
          const count = achievementCounts?.[category] || 0;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${getCategoryColor(category, isActive)}
                ${!isActive ? 'bg-white text-gray-700 border-gray-200' : ''}
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon 
                  name={getCategoryIcon(category)} 
                  size={20} 
                  className={isActive ? 'text-white' : 'text-gray-500'}
                />
                <span className="font-medium text-sm">
                  {category}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  {count} {count === 1 ? 'achievement' : 'achievements'}
                </span>
                
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;