import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialConnections = () => {
  const socialPlatforms = [
    {
      name: 'LinkedIn',
      handle: '@portfoliopro',
      description: 'Professional networking and career updates',
      icon: 'Linkedin',
      url: 'https://linkedin.com/in/portfoliopro',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      followers: '2.5K connections'
    },
    {
      name: 'GitHub',
      handle: '@portfoliopro',
      description: 'Code repositories and open source contributions',
      icon: 'Github',
      url: 'https://github.com/portfoliopro',
      color: 'bg-gray-800',
      hoverColor: 'hover:bg-gray-900',
      followers: '1.2K followers'
    },
    {
      name: 'Twitter',
      handle: '@portfoliopro_dev',
      description: 'Tech insights and industry conversations',
      icon: 'Twitter',
      url: 'https://twitter.com/portfoliopro_dev',
      color: 'bg-blue-400',
      hoverColor: 'hover:bg-blue-500',
      followers: '890 followers'
    },
    {
      name: 'Email',
      handle: 'developer@portfoliopro.com',
      description: 'Direct communication for business inquiries',
      icon: 'Mail',
      url: 'mailto:developer@portfoliopro.com',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      followers: 'Primary contact'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Let's Connect</h2>
        <p className="text-gray-600">
          Find me on your preferred platform and let's start a conversation
        </p>
      </div>
      <div className="space-y-4">
        {socialPlatforms?.map((platform) => (
          <div
            key={platform?.name}
            className="group flex items-center p-4 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => window.open(platform?.url, '_blank')}
          >
            <div className={`${platform?.color} ${platform?.hoverColor} p-3 rounded-lg transition-all duration-300 group-hover:scale-110`}>
              <Icon name={platform?.icon} size={24} className="text-white" />
            </div>
            
            <div className="flex-1 ml-4">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {platform?.name}
                </h3>
                <span className="text-sm text-gray-500">{platform?.handle}</span>
              </div>
              <p className="text-gray-600 text-sm">{platform?.description}</p>
              <p className="text-xs text-gray-500 mt-1">{platform?.followers}</p>
            </div>
            
            <Icon 
              name="ExternalLink" 
              size={20} 
              className="text-gray-400 group-hover:text-blue-500 transition-colors duration-300" 
            />
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Response Time Commitment</h4>
              <p className="text-sm text-blue-800">
                I typically respond to messages within 24 hours on weekdays. For urgent matters, 
                email is the fastest way to reach me.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialConnections;