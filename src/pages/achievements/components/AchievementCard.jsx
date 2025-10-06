import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AchievementCard = ({ achievement, index }) => {
  const { 
    id, 
    title, 
    category, 
    issuer, 
    date, 
    description, 
    badge, 
    verificationLink, 
    impact, 
    skills,
    type 
  } = achievement;

  const getCategoryIcon = (category) => {
    const icons = {
      'certification': 'Award',
      'project': 'Trophy',
      'recognition': 'Star',
      'achievement': 'Medal',
      'education': 'GraduationCap',
      'client': 'Heart'
    };
    return icons?.[category] || 'Award';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'certification': 'bg-blue-500',
      'project': 'bg-yellow-500',
      'recognition': 'bg-purple-500',
      'achievement': 'bg-green-500',
      'education': 'bg-indigo-500',
      'client': 'bg-pink-500'
    };
    return colors?.[category] || 'bg-blue-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Category Badge */}
      <div className="absolute -top-3 left-6">
        <div className={`${getCategoryColor(category)} text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1`}>
          <Icon name={getCategoryIcon(category)} size={12} />
          <span className="capitalize">{category}</span>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-start justify-between mb-4 mt-2">
        <div className="flex items-center space-x-4">
          {badge && (
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              <Image 
                src={badge} 
                alt={`${title} badge`}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{issuer}</p>
            <p className="text-xs text-muted-foreground mt-1">{date}</p>
          </div>
        </div>
        
        {verificationLink && (
          <a
            href={verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
            title="Verify Achievement"
          >
            <Icon name="ExternalLink" size={16} />
          </a>
        )}
      </div>
      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      {/* Impact Metrics */}
      {impact && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <h4 className="text-xs font-medium text-foreground mb-2 flex items-center">
            <Icon name="TrendingUp" size={14} className="mr-1" />
            Impact
          </h4>
          <p className="text-sm text-muted-foreground">{impact}</p>
        </div>
      )}
      {/* Skills Tags */}
      {skills && skills?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills?.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Calendar" size={12} />
          <span>{new Date(date)?.toLocaleDateString()}</span>
        </div>
        
        {type === 'featured' && (
          <div className="flex items-center space-x-1 text-xs text-yellow-600">
            <Icon name="Star" size={12} />
            <span>Featured</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementCard;