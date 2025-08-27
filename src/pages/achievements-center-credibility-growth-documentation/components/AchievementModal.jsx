import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AchievementModal = ({ achievement, isOpen, onClose }) => {
  if (!isOpen || !achievement) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Technical Certifications': 'text-blue-600 bg-blue-50 border-blue-200',
      'Educational Achievements': 'text-green-600 bg-green-50 border-green-200',
      'Project Milestones': 'text-purple-600 bg-purple-50 border-purple-200',
      'Community Contributions': 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors?.[category] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(achievement?.category)}`}>
                {achievement?.category}
              </div>
              {achievement?.verified && (
                <div className="flex items-center space-x-1 text-green-600">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">Verified</span>
                </div>
              )}
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Achievement Image */}
          {achievement?.image && (
            <div className="w-32 h-32 mx-auto mb-6 rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
              <Image
                src={achievement?.image}
                alt={achievement?.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
          )}

          {/* Title and Organization */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {achievement?.title}
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              {achievement?.organization}
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              About This Achievement
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {achievement?.description}
            </p>
          </div>

          {/* Learning Story */}
          {achievement?.learningStory && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Icon name="BookOpen" size={20} />
                <span>Learning Journey</span>
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {achievement?.learningStory}
                </p>
              </div>
            </div>
          )}

          {/* Skills and Technologies */}
          {achievement?.skills && achievement?.skills?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Icon name="Code" size={20} />
                <span>Skills & Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {achievement?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-lg font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Achievement Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Calendar" size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-900">Completion Date</span>
              </div>
              <p className="text-gray-700">{formatDate(achievement?.completedDate)}</p>
            </div>

            {achievement?.credentialId && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Hash" size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">Credential ID</span>
                </div>
                <p className="text-gray-700 font-mono text-sm">{achievement?.credentialId}</p>
              </div>
            )}

            {achievement?.validUntil && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">Valid Until</span>
                </div>
                <p className="text-gray-700">{formatDate(achievement?.validUntil)}</p>
              </div>
            )}

            {achievement?.score && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Star" size={16} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">Score</span>
                </div>
                <p className="text-gray-700">{achievement?.score}</p>
              </div>
            )}
          </div>

          {/* Social Proof */}
          {achievement?.socialProof && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span>Recognition</span>
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 italic">"{achievement?.socialProof}"</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            {achievement?.verificationUrl && (
              <Button
                variant="default"
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => window.open(achievement?.verificationUrl, '_blank')}
                className="flex-1"
              >
                Verify Achievement
              </Button>
            )}
            
            {achievement?.certificateUrl && (
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="right"
                onClick={() => window.open(achievement?.certificateUrl, '_blank')}
                className="flex-1"
              >
                Download Certificate
              </Button>
            )}
            
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementModal;