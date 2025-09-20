import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

// image 
// import FrontendReact from '../../../../public/assets/Certificate/FrontendDeveloper.png';
// import javaScript from '../../../../public/assets/Certificate/javaScriptBasics.png';

const RecentWinsSection = ({ recentAchievements, onViewDetails }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

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
    <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-8 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center space-x-3">
            <Icon name="Zap" size={28} className="text-primary" />
            <span>Recent Wins</span>
          </h2>
          <p className="text-gray-600">
            Latest achievements and milestones in my professional journey
          </p>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
          <Icon name="TrendingUp" size={16} />
          <span>Growing stronger every day</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentAchievements?.map((achievement, index) => (
          <div
            key={achievement?.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(achievement?.category)} animate-pulse`}></div>
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {formatDate(achievement?.completedDate)}
                </span>
              </div>
              
              {achievement?.verified && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Icon name="CheckCircle" size={14} />
                  <span className="text-xs font-medium">Verified</span>
                </div>
              )}
            </div>

            {/* Achievement Image */}
            {achievement?.image && (
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src={achievement?.image}
                  alt={achievement?.title}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            )}

            {/* Content */}
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors duration-200">
                {achievement?.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {achievement?.organization}
              </p>
              <p className="text-xs text-gray-700 line-clamp-2">
                {achievement?.learningStory}
              </p>
            </div>

            {/* Skills */}
            {achievement?.skills && achievement?.skills?.length > 0 && (
              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {achievement?.skills?.slice(0, 2)?.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                  >
                    {skill}
                  </span>
                ))}
                {achievement?.skills?.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    +{achievement?.skills?.length - 2}
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="xs"
                iconName="Eye"
                onClick={() => onViewDetails(achievement)}
              >
                View Story
              </Button>
              
              {achievement?.verificationUrl && (
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="ExternalLink"
                  onClick={() => window.open(achievement?.verificationUrl, '_blank')}
                >
                  Verify
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      {recentAchievements?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Award" size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent achievements to display</p>
        </div>
      )}
    </div>
  );
};

export default RecentWinsSection;