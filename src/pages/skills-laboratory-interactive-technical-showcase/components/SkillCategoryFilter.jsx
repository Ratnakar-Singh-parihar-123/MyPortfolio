import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillCategoryFilter = ({ categories, activeCategory, onCategoryChange, skillCounts }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategoryChange(category?.id)}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
              activeCategory === category?.id
                ? 'border-primary bg-primary/5 text-primary' :'border-gray-200 hover:border-gray-300 text-gray-600 hover:text-gray-900'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
              activeCategory === category?.id
                ? 'bg-primary text-white' :'bg-gray-100 text-gray-600'
            }`}>
              <Icon name={category?.icon} size={20} />
            </div>
            <span className="text-sm font-medium text-center">{category?.name}</span>
            <span className="text-xs opacity-75 mt-1">
              {skillCounts?.[category?.id] || 0} skills
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillCategoryFilter;