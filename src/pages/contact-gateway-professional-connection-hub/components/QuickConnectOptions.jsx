import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickConnectOptions = () => {
  const connectOptions = [
    {
      id: 'job-opportunity',
      title: 'Job Opportunities',
      description: 'Open to entry-level and internship roles',
      icon: 'Briefcase',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      action: () => window.open('mailto:yourmail@example.com?subject=Job Opportunity Discussion', '_blank')
    },
    {
      id: 'project',
      title: 'Projects & Internships',
      description: 'Excited to work on real-world projects',
      icon: 'FolderGit',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      action: () => window.open('mailto:ratnakarsinghparihar9399@gmail.com?subject=Project/Internship Opportunity', '_blank')
    },
    {
      id: 'networking',
      title: 'Networking',
      description: 'Connect with peers and professionals',
      icon: 'Network',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      action: () => window.open('https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/', '_blank')
    },
    {
      id: 'learning',
      title: 'Learning Together',
      description: 'Open to knowledge sharing & collaboration',
      icon: 'Lightbulb',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      action: () => window.open('mailto:ratnakarsinghparihar9399@gmail.com?subject=Learning & Collaboration', '_blank')
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Connect</h2>
        <p className="text-gray-600">
          Choose the type of connection that best fits your needs
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {connectOptions?.map((option) => (
          <div
            key={option?.id}
            className="group relative bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-gray-300"
            onClick={option?.action}
          >
            <div className="flex items-start space-x-4">
              <div className={`${option?.color} ${option?.hoverColor} p-3 rounded-lg transition-colors duration-300 group-hover:scale-110 transform`}>
                <Icon name={option?.icon} size={24} className="text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {option?.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {option?.description}
                </p>
              </div>

              <Icon
                name="ArrowUpRight"
                size={20}
                className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            Not sure which option fits best? Let's have a general conversation.
          </p>
          <Button
            variant="outline"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => window.open('mailto:developer@portfoliopro.com?subject=General Inquiry', '_blank')}
          >
            Start General Conversation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickConnectOptions;