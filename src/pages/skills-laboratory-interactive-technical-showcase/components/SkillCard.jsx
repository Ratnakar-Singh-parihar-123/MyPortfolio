import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillCard = ({ skill, onViewDemo, onViewCertification }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Advanced':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Intermediate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Beginner':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getProficiencyWidth = (level) => {
    switch (level) {
      case 'Expert':
        return 'w-full';
      case 'Advanced':
        return 'w-4/5';
      case 'Intermediate':
        return 'w-3/5';
      case 'Beginner':
        return 'w-2/5';
      default:
        return 'w-1/5';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Icon name={skill?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{skill?.name}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getProficiencyColor(skill?.proficiency)}`}>
              {skill?.proficiency}
            </span>
          </div>
        </div>
        {skill?.isNew && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-white">
            New
          </span>
        )}
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{skill?.description}</p>
      {/* Proficiency Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500">Proficiency</span>
          <span className="text-xs text-gray-500">{skill?.experience}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={`bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500 ${getProficiencyWidth(skill?.proficiency)}`}></div>
        </div>
      </div>
      {/* Recent Projects */}
      {skill?.recentProjects && skill?.recentProjects?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Projects</h4>
          <div className="flex flex-wrap gap-1">
            {skill?.recentProjects?.slice(0, 3)?.map((project, index) => (
              <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700">
                {project}
              </span>
            ))}
            {skill?.recentProjects?.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-500">
                +{skill?.recentProjects?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Certifications */}
      {skill?.certifications && skill?.certifications?.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Certifications</h4>
          <div className="flex items-center space-x-2">
            {skill?.certifications?.map((cert, index) => (
              <button
                key={index}
                onClick={() => onViewCertification(cert)}
                className="inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Icon name="Award" size={12} />
                <span>{cert?.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Expandable Details */}
      {skill?.details && (
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
            <span>{isExpanded ? 'Less Details' : 'More Details'}</span>
          </button>
          {isExpanded && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">{skill?.details}</p>
              {skill?.keyFeatures && (
                <div>
                  <h5 className="text-xs font-medium text-gray-700 mb-1">Key Features:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {skill?.keyFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-1">
                        <Icon name="Check" size={12} className="text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        {skill?.hasDemo && (
          <Button
            variant="outline"
            size="sm"
            iconName="Play"
            iconPosition="left"
            onClick={() => onViewDemo(skill)}
            className="flex-1"
          >
            View Demo
          </Button>
        )}
        {skill?.codeRepository && (
          <Button
            variant="ghost"
            size="sm"
            iconName="Github"
            iconPosition="left"
            onClick={() => window.open(skill?.codeRepository, '_blank')}
          >
            Code
          </Button>
        )}
      </div>
    </div>
  );
};

export default SkillCard;