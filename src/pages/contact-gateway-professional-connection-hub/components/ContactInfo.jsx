import React from 'react';
import Icon from '../../../components/AppIcon';

const ContactInfo = () => {
  const contactDetails = [
    {
      type: 'Email',
      value: 'ratnakarsinghparihar9399@gmail.com',
      description: 'Primary contact for business inquiries',
      icon: 'Mail',
      action: () => window.open('mailto:ratnakarsinghparihar9399@gmail.com', '_blank'),
      color: 'text-blue-600'
    },
    {
      type: 'Phone',
      value: '+91 (999) 974-1051',
      description: 'Available for scheduled calls',
      icon: 'Phone',
      action: () => window.open('tel:+15551234567', '_blank'),
      color: 'text-green-600'
    },
    {
      type: 'Location',
      value: 'India, Madhya Pradesh Bhopal',
      description: 'Eastern Time Zone (UTC-5)',
      icon: 'MapPin',
      action: null,
      color: 'text-purple-600'
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/ratnakar-singh-parihar-a87528260/',
      description: 'Professional networking',
      icon: 'Linkedin',
      action: () => window.open('https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/', '_blank'),
      color: 'text-blue-700'
    }
  ];

  const officeHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 2:00 PM EST' },
    { day: 'Sunday', hours: 'Emergency only' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Get In Touch</h2>
        <p className="text-gray-600">
          Multiple ways to reach out and connect. Choose what works best for you.
        </p>
      </div>
      {/* Contact Methods */}
      <div className="space-y-4 mb-8">
        {contactDetails?.map((contact, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-300 ${contact?.action ? 'cursor-pointer hover:shadow-md' : ''
              }`}
            onClick={contact?.action}
          >
            <div className="flex-shrink-0">
              <Icon name={contact?.icon} size={24} className={contact?.color} />
            </div>
            <div className="ml-4 flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-gray-900">{contact?.type}</h3>
                {contact?.action && (
                  <Icon name="ExternalLink" size={16} className="text-gray-400" />
                )}
              </div>
              <p className="text-gray-800 font-medium">{contact?.value}</p>
              <p className="text-sm text-gray-600">{contact?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Office Hours */}
      {/* <div className="border-t border-gray-200 pt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Office Hours</h3>
        <div className="space-y-3">
          {officeHours?.map((schedule, index) => (
            <div key={index} className="flex justify-between items-center py-2">
              <span className="text-gray-700 font-medium">{schedule?.day}</span>
              <span className="text-gray-600">{schedule?.hours}</span>
            </div>
          ))}
        </div>
      </div> */}
      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Quick Response Guarantee</h4>
              <p className="text-sm text-blue-800">
                All inquiries receive a response within 24 hours during business days.
                For urgent matters, please mention "URGENT" in your subject line.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Map Integration */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Location</h3>
        <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-200">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="New York Location"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
            className="border-0"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Based in India, Madhya Pradesh Bhoapl city. available for remote work worldwide
        </p>
      </div>

    </div >
  );
};

export default ContactInfo;