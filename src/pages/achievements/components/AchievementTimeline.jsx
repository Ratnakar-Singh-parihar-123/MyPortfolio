import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const AchievementTimeline = ({ achievements }) => {
  const timelineData = achievements?.sort((a, b) => new Date(b.date) - new Date(a.date))?.slice(0, 8); // Show latest 8 achievements

  const getYearFromDate = (dateString) => {
    return new Date(dateString)?.getFullYear();
  };

  const groupByYear = (achievements) => {
    return achievements?.reduce((acc, achievement) => {
      const year = getYearFromDate(achievement?.date);
      if (!acc?.[year]) {
        acc[year] = [];
      }
      acc?.[year]?.push(achievement);
      return acc;
    }, {});
  };

  const groupedAchievements = groupByYear(timelineData);
  const years = Object.keys(groupedAchievements)?.sort((a, b) => b - a);

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
      <div className="space-y-8">
        {years?.map((year, yearIndex) => (
          <motion.div
            key={year}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: yearIndex * 0.1 }}
            className="relative"
          >
            {/* Year Marker */}
            <div className="flex items-center mb-6">
              <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full font-bold text-lg shadow-lg">
                {year}
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {groupedAchievements?.[year]?.length} Achievement{groupedAchievements?.[year]?.length !== 1 ? 's' : ''}
                </h3>
                <p className="text-sm text-muted-foreground">Major milestones achieved</p>
              </div>
            </div>

            {/* Achievements for this year */}
            <div className="ml-20 space-y-4">
              {groupedAchievements?.[year]?.map((achievement, index) => (
                <motion.div
                  key={achievement?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: (yearIndex * 0.1) + (index * 0.05) }}
                  className="relative bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon 
                        name={achievement?.category === 'certification' ? 'Award' : 
                              achievement?.category === 'project' ? 'Trophy' : 
                              achievement?.category === 'recognition' ? 'Star' : 'Medal'} 
                        size={16} 
                        className="text-primary" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{achievement?.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement?.issuer}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(achievement.date)?.toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      {achievement?.impact && (
                        <p className="text-xs text-primary mt-2 font-medium">{achievement?.impact}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AchievementTimeline;