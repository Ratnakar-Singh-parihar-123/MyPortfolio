import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilityStatus = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const availabilityData = {
    status: 'available', // available, busy, away
    currentProjects: 2,
    maxProjects: 4,
    nextAvailable: 'January 2025',
    responseTime: '< 24 hours',
    timezone: 'EST (UTC-5)',
    workingHours: '9:00 AM - 6:00 PM EST'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      case 'away':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available':
        return 'Available for New Projects';
      case 'busy':
        return 'Limited Availability';
      case 'away':
        return 'Currently Unavailable';
      default:
        return 'Status Unknown';
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  };

  const projectCapacity = (availabilityData?.currentProjects / availabilityData?.maxProjects) * 100;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Current Availability</h2>
        <p className="text-gray-600">
          Real-time status and project capacity information
        </p>
      </div>
      {/* Status Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-6 py-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor(availabilityData?.status)} animate-pulse`}></div>
          <span className="text-lg font-semibold text-gray-900">
            {getStatusText(availabilityData?.status)}
          </span>
        </div>
      </div>
      {/* Availability Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Clock" size={20} className="text-blue-600" />
            <h3 className="text-sm font-semibold text-gray-900">Response Time</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{availabilityData?.responseTime}</p>
          <p className="text-sm text-gray-600">Average response time for inquiries</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Globe" size={20} className="text-green-600" />
            <h3 className="text-sm font-semibold text-gray-900">Current Time</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">{formatTime(currentTime)}</p>
          <p className="text-sm text-gray-600">{availabilityData?.timezone}</p>
        </div>
      </div>
      {/* Project Capacity */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Project Capacity</h3>
          <span className="text-sm text-gray-600">
            {availabilityData?.currentProjects} of {availabilityData?.maxProjects} projects
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${projectCapacity}%` }}
          ></div>
        </div>
        
        <p className="text-sm text-gray-600">
          {projectCapacity < 75 ? 
            'Currently accepting new projects' : 'Limited capacity - priority projects only'
          }
        </p>
      </div>
      {/* Working Hours */}
      <div className="bg-blue-50 rounded-lg p-6 mb-6">
        <div className="flex items-start space-x-3">
          <Icon name="Calendar" size={20} className="text-blue-600 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-blue-900 mb-2">Working Hours</h4>
            <p className="text-blue-800 mb-2">{availabilityData?.workingHours}</p>
            <p className="text-sm text-blue-700">
              Monday - Friday. Weekend responses may be delayed.
            </p>
          </div>
        </div>
      </div>
      {/* Next Availability */}
      {availabilityData?.status !== 'available' && (
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-yellow-600 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-yellow-900 mb-2">Next Available</h4>
              <p className="text-yellow-800 mb-2">{availabilityData?.nextAvailable}</p>
              <p className="text-sm text-yellow-700">
                Join the waitlist to be notified when capacity opens up.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Communication Preferences */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferred Communication</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Mail" size={16} className="text-blue-600" />
            <span className="text-gray-700">Email (Primary)</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="MessageCircle" size={16} className="text-green-600" />
            <span className="text-gray-700">LinkedIn Messages</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Phone" size={16} className="text-purple-600" />
            <span className="text-gray-700">Scheduled Calls</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStatus;