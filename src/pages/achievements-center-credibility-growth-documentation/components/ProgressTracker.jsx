import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ progressData }) => {
  const getStatusColor = (status) => {
    const colors = {
      'completed': 'bg-green-500',
      'in-progress': 'bg-blue-500',
      'planned': 'bg-gray-300'
    };
    return colors?.[status] || 'bg-gray-300';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'completed': 'CheckCircle',
      'in-progress': 'Clock',
      'planned': 'Circle'
    };
    return icons?.[status] || 'Circle';
  };

  const getStatusText = (status) => {
    const texts = {
      'completed': 'Completed',
      'in-progress': 'In Progress',
      'planned': 'Planned'
    };
    return texts?.[status] || 'Unknown';
  };

  const calculateProgress = (items) => {
    const completed = items?.filter(item => item?.status === 'completed')?.length;
    return items?.length > 0 ? (completed / items?.length) * 100 : 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
          <Icon name="Target" size={24} className="text-primary" />
          <span>Progress Tracking</span>
        </h2>
        
        <div className="text-sm text-gray-500">
          Continuous improvement journey
        </div>
      </div>
      <div className="space-y-6">
        {progressData?.map((track, index) => {
          const progress = calculateProgress(track?.items);
          
          return (
            <div key={index} className="border border-gray-100 rounded-lg p-4">
              {/* Track Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {track?.category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {track?.description}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(progress)}%
                  </div>
                  <div className="text-xs text-gray-500">
                    Complete
                  </div>
                </div>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              {/* Progress Items */}
              <div className="space-y-3">
                {track?.items?.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item?.status)}`}>
                        {item?.status === 'completed' && (
                          <Icon name="Check" size={12} className="text-white" />
                        )}
                      </div>
                      
                      <div>
                        <div className="font-medium text-gray-900 text-sm">
                          {item?.title}
                        </div>
                        {item?.provider && (
                          <div className="text-xs text-gray-500">
                            {item?.provider}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${item?.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                        ${item?.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : ''}
                        ${item?.status === 'planned' ? 'bg-gray-100 text-gray-700' : ''}
                      `}>
                        {getStatusText(item?.status)}
                      </span>
                      
                      {item?.targetDate && (
                        <div className="text-xs text-gray-500">
                          {item?.status === 'completed' ? 'Completed' : 'Target'}: {item?.targetDate}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {/* Track Stats */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {track?.items?.filter(item => item?.status === 'completed')?.length}
                    </div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">
                      {track?.items?.filter(item => item?.status === 'in-progress')?.length}
                    </div>
                    <div className="text-xs text-gray-500">In Progress</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-600">
                      {track?.items?.filter(item => item?.status === 'planned')?.length}
                    </div>
                    <div className="text-xs text-gray-500">Planned</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;