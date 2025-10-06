import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ImpactMetrics = ({ achievements }) => {
  const [animatedValues, setAnimatedValues] = useState({});

  const metrics = [
    {
      id: 'certifications',
      label: 'Certifications Earned',
      value: achievements?.filter(a => a?.category === 'certification')?.length,
      icon: 'Award',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      suffix: ''
    },
    {
      id: 'projects',
      label: 'Projects Completed',
      value: achievements?.filter(a => a?.category === 'project')?.length,
      icon: 'Trophy',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      suffix: '+'
    },
    {
      id: 'recognition',
      label: 'Industry Recognition',
      value: achievements?.filter(a => a?.category === 'recognition')?.length,
      icon: 'Star',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      suffix: ''
    },
    {
      id: 'clients',
      label: 'Happy Clients',
      value: achievements?.filter(a => a?.category === 'client')?.length,
      icon: 'Heart',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      suffix: '+'
    },
    {
      id: 'experience',
      label: 'Years Experience',
      value: new Date()?.getFullYear() - 2019, // Assuming started in 2019
      icon: 'Calendar',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      suffix: '+'
    },
    {
      id: 'skills',
      label: 'Technical Skills',
      value: 25, // Mock value
      icon: 'Code',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      suffix: '+'
    }
  ];

  useEffect(() => {
    const animateCounters = () => {
      metrics?.forEach(metric => {
        let start = 0;
        const end = metric?.value;
        const duration = 2000; // 2 seconds
        const increment = end / (duration / 16); // 60fps

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [metric?.id]: Math.floor(start)
          }));
        }, 16);
      });
    };

    // Start animation after component mounts
    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics?.map((metric, index) => (
        <motion.div
          key={metric?.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300"
        >
          <div className={`inline-flex items-center justify-center w-16 h-16 ${metric?.bgColor} rounded-full mb-4`}>
            <Icon name={metric?.icon} size={24} className={metric?.color} />
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl font-bold text-foreground">
              {animatedValues?.[metric?.id] || 0}{metric?.suffix}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {metric?.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ImpactMetrics;