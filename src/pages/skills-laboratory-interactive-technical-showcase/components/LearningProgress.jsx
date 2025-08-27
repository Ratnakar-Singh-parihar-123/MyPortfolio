import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningProgress = ({ learningSkills }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getProgressTextColor = (progress) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-orange-600';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-green-600 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Learning in Progress</h3>
            <p className="text-sm text-gray-600">Currently expanding my skill set</p>
          </div>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-accent/10 text-accent">
          {learningSkills?.length} Active
        </span>
      </div>
      <div className="space-y-4">
        {learningSkills?.map((skill) => (
          <div key={skill?.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Icon name={skill?.icon} size={16} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{skill?.name}</h4>
                  <p className="text-sm text-gray-600">{skill?.platform}</p>
                </div>
              </div>
              <span className={`text-sm font-medium ${getProgressTextColor(skill?.progress)}`}>
                {skill?.progress}%
              </span>
            </div>

            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(skill?.progress)}`}
                  style={{ width: `${skill?.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Started: {skill?.startDate}
                </span>
                <span className="text-gray-600">
                  Target: {skill?.targetDate}
                </span>
              </div>
              {skill?.certificateUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  onClick={() => window.open(skill?.certificateUrl, '_blank')}
                >
                  View Course
                </Button>
              )}
            </div>

            {skill?.currentTopic && (
              <div className="mt-3 p-2 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Current Topic:</span> {skill?.currentTopic}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Next Planned Skills:</span>
            <span className="ml-2">TypeScript, GraphQL, Docker</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            View Learning Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;