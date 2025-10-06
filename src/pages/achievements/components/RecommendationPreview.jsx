import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecommendationPreview = ({ recommendations }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Peer Recommendations</h3>
        </div>
        <span className="text-sm text-muted-foreground">{recommendations?.length} recommendations</span>
      </div>
      <div className="space-y-4">
        {recommendations?.slice(0, 3)?.map((recommendation, index) => (
          <motion.div
            key={recommendation?.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start space-x-3">
              <Image
                src={recommendation?.avatar}
                alt={recommendation?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground">{recommendation?.name}</h4>
                    <p className="text-sm text-muted-foreground">{recommendation?.position}</p>
                    <p className="text-xs text-muted-foreground">{recommendation?.company}</p>
                  </div>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} fill="currentColor" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{recommendation?.text}"
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-muted-foreground">
                    {new Date(recommendation.date)?.toLocaleDateString()}
                  </span>
                  <div className="flex items-center space-x-2">
                    {recommendation?.skills?.slice(0, 2)?.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {recommendations?.length > 3 && (
        <div className="mt-4 text-center">
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
            View all {recommendations?.length} recommendations
            <Icon name="ArrowRight" size={14} className="ml-1 inline" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecommendationPreview;