import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillStats = ({ stats }) => {
  const statItems = [
    {
      id: 'total',
      label: 'Total Skills',
      value: stats?.totalSkills,
      icon: 'Code',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'expert',
      label: 'Expert Level',
      value: stats?.expertSkills,
      icon: 'Star',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'learning',
      label: 'Currently Learning',
      value: stats?.learningSkills,
      icon: 'TrendingUp',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'certifications',
      label: 'Certifications',
      value: stats?.certifications,
      icon: 'Award',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statItems?.map((item) => (
        <div key={item?.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${item?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.textColor} />
            </div>
            <div className={`w-3 h-3 ${item?.color} rounded-full animate-pulse`}></div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{item?.value}</div>
            <div className="text-sm text-gray-600">{item?.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillStats;