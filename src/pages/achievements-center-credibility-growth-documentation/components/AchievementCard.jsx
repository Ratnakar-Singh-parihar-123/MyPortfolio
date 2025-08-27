import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AchievementCard = ({ achievement, onViewDetails }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCategoryIcon = (category) => {
    const icons = {
      'Technical Certifications': 'Award',
      'Educational Achievements': 'GraduationCap',
      'Project Milestones': 'Trophy',
      'Community Contributions': 'Users'
    };
    return icons?.[category] || 'Award';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technical Certifications': 'text-blue-600 bg-blue-50',
      'Educational Achievements': 'text-green-600 bg-green-50',
      'Project Milestones': 'text-purple-600 bg-purple-50',
      'Community Contributions': 'text-orange-600 bg-orange-50'
    };
    return colors?.[category] || 'text-gray-600 bg-gray-50';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group overflow-hidden">
      {/* Achievement Image/Badge */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {achievement?.image && (
          <Image
            src={achievement?.image}
            alt={achievement?.title}
            className={`w-full h-full object-contain p-4 transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        {/* Category Badge */}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(achievement?.category)}`}>
          <div className="flex items-center space-x-1">
            <Icon name={getCategoryIcon(achievement?.category)} size={12} />
            <span>{achievement?.category}</span>
          </div>
        </div>

        {/* Verification Status */}
        {achievement?.verified && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
            <Icon name="CheckCircle" size={12} />
            <span>Verified</span>
          </div>
        )}

        {/* Recent Badge */}
        {achievement?.isRecent && (
          <div className="absolute bottom-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
            New
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Title and Organization */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors duration-200">
            {achievement?.title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">
            {achievement?.organization}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {achievement?.description}
        </p>

        {/* Skills/Technologies */}
        {achievement?.skills && achievement?.skills?.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {achievement?.skills?.slice(0, 3)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {achievement?.skills?.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  +{achievement?.skills?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Date and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Icon name="Calendar" size={14} />
            <span>{formatDate(achievement?.completedDate)}</span>
          </div>

          <div className="flex items-center space-x-2">
            {achievement?.verificationUrl && (
              <Button
                variant="outline"
                size="xs"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => window.open(achievement?.verificationUrl, '_blank')}
              >
                Verify
              </Button>
            )}
            
            <Button
              variant="ghost"
              size="xs"
              iconName="Eye"
              onClick={() => onViewDetails(achievement)}
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;