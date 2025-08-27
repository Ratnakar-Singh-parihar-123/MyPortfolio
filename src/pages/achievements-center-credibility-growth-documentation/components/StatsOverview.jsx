import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ achievements }) => {
  const calculateStats = () => {
    const totalAchievements = achievements?.length;
    const verifiedAchievements = achievements?.filter(a => a?.verified)?.length;
    const recentAchievements = achievements?.filter(a => a?.isRecent)?.length;
    
    const categoryStats = achievements?.reduce((acc, achievement) => {
      acc[achievement.category] = (acc?.[achievement?.category] || 0) + 1;
      return acc;
    }, {});

    const currentYear = new Date()?.getFullYear();
    const thisYearAchievements = achievements?.filter(a => 
      new Date(a.completedDate)?.getFullYear() === currentYear
    )?.length;

    return {
      total: totalAchievements,
      verified: verifiedAchievements,
      recent: recentAchievements,
      thisYear: thisYearAchievements,
      categories: categoryStats
    };
  };

  const stats = calculateStats();

  const statCards = [
    {
      title: 'Total Achievements',
      value: stats?.total,
      icon: 'Award',
      color: 'text-blue-600 bg-blue-50',
      description: 'Lifetime accomplishments'
    },
    {
      title: 'Verified Credentials',
      value: stats?.verified,
      icon: 'CheckCircle',
      color: 'text-green-600 bg-green-50',
      description: 'Officially verified'
    },
    {
      title: 'This Year',
      value: stats?.thisYear,
      icon: 'TrendingUp',
      color: 'text-purple-600 bg-purple-50',
      description: `Achievements in ${new Date()?.getFullYear()}`
    },
    {
      title: 'Recent Wins',
      value: stats?.recent,
      icon: 'Zap',
      color: 'text-orange-600 bg-orange-50',
      description: 'Latest accomplishments'
    }
  ];

  return (
    <div className="mb-8">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards?.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat?.color} flex items-center justify-center`}>
                <Icon name={stat?.icon} size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  {stat?.value}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {stat?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {stat?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Icon name="BarChart3" size={20} />
          <span>Achievement Distribution</span>
        </h3>
        
        <div className="space-y-4">
          {Object.entries(stats?.categories)?.map(([category, count]) => {
            const percentage = stats?.total > 0 ? (count / stats?.total) * 100 : 0;
            
            const getCategoryColor = (category) => {
              const colors = {
                'Technical Certifications': 'bg-blue-500',
                'Educational Achievements': 'bg-green-500',
                'Project Milestones': 'bg-purple-500',
                'Community Contributions': 'bg-orange-500'
              };
              return colors?.[category] || 'bg-gray-500';
            };

            return (
              <div key={category} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {category}
                    </span>
                    <span className="text-sm text-gray-600">
                      {count} ({Math.round(percentage)}%)
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${getCategoryColor(category)}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {Object.keys(stats?.categories)?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="BarChart3" size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No achievements to analyze yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsOverview;