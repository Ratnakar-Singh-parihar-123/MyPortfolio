import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CodeDemo = ({ skill, onClose }) => {
  const [activeTab, setActiveTab] = useState('code');
  const [isRunning, setIsRunning] = useState(false);

  const handleRunDemo = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const tabs = [
    { id: 'code', label: 'Code', icon: 'Code' },
    { id: 'preview', label: 'Preview', icon: 'Eye' },
    { id: 'explanation', label: 'Explanation', icon: 'BookOpen' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name={skill?.icon} size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{skill?.name} Demo</h3>
              <p className="text-sm text-gray-600">Interactive code demonstration</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'code' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700">Sample Implementation</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Copy"
                    iconPosition="left"
                  >
                    Copy Code
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    loading={isRunning}
                    onClick={handleRunDemo}
                  >
                    Run Demo
                  </Button>
                </div>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-100">
                  <code>{skill?.demoCode}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Live Preview</h4>
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[300px] flex items-center justify-center">
                {isRunning ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-sm text-gray-600">Running demo...</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Icon name="Play" size={48} className="text-gray-400 mb-4" />
                    <p className="text-gray-600">Click "Run Demo" to see the preview</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'explanation' && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Technical Explanation</h4>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-600 mb-4">{skill?.explanation}</p>
                
                {skill?.keyFeatures && (
                  <div className="mb-4">
                    <h5 className="font-medium text-gray-900 mb-2">Key Features Demonstrated:</h5>
                    <ul className="space-y-2">
                      {skill?.keyFeatures?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="Check" size={16} className="text-green-500 mt-0.5" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {skill?.useCases && (
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Common Use Cases:</h5>
                    <ul className="space-y-1">
                      {skill?.useCases?.map((useCase, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="ArrowRight" size={14} className="text-primary mt-1" />
                          <span className="text-gray-600">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Last updated: {skill?.lastUpdated}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="GitBranch" size={14} />
              <span>Version: {skill?.version}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => window.open(skill?.codeRepository, '_blank')}
            >
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeDemo;