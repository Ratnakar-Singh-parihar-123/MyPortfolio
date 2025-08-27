import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CurrentlyLearning = () => {
  const [activeTab, setActiveTab] = useState('current');

  const learningData = {
    current: [
      {
        id: 1,
        title: "Advanced React Patterns & Architecture",
        platform: "Epic React by Kent C. Dodds",
        progress: 75,
        timeSpent: "32 hours",
        estimatedCompletion: "2 weeks",
        icon: "Zap",
        color: "from-blue-500 to-blue-600",
        topics: ["Compound Components", "Render Props", "Custom Hooks", "Performance Optimization"],
        lastActivity: "2 hours ago"
      },
      {
        id: 2,
        title: "System Design for Frontend Engineers",
        platform: "Frontend Masters",
        progress: 45,
        timeSpent: "18 hours",
        estimatedCompletion: "3 weeks",
        icon: "Layers",
        color: "from-green-500 to-green-600",
        topics: ["Scalability", "Performance", "Architecture Patterns", "Micro-frontends"],
        lastActivity: "1 day ago"
      },
      {
        id: 3,
        title: "TypeScript Advanced Types",
        platform: "TypeScript Deep Dive",
        progress: 60,
        timeSpent: "24 hours",
        estimatedCompletion: "1 week",
        icon: "FileCode",
        color: "from-purple-500 to-purple-600",
        topics: ["Conditional Types", "Mapped Types", "Template Literals", "Utility Types"],
        lastActivity: "5 hours ago"
      }
    ],
    planned: [
      {
        id: 4,
        title: "GraphQL with Apollo Client",
        platform: "Apollo GraphQL",
        startDate: "January 2025",
        duration: "4 weeks",
        icon: "Database",
        color: "from-pink-500 to-pink-600",
        topics: ["Query Optimization", "Caching", "Subscriptions", "Error Handling"]
      },
      {
        id: 5,
        title: "Docker & Kubernetes Fundamentals",
        platform: "Docker Official Training",
        startDate: "February 2025",
        duration: "6 weeks",
        icon: "Package",
        color: "from-indigo-500 to-indigo-600",
        topics: ["Containerization", "Orchestration", "CI/CD", "Monitoring"]
      },
      {
        id: 6,
        title: "Web3 & Blockchain Development",
        platform: "Ethereum Foundation",
        startDate: "March 2025",
        duration: "8 weeks",
        icon: "Link",
        color: "from-orange-500 to-orange-600",
        topics: ["Smart Contracts", "DApps", "Web3.js", "Solidity"]
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground font-medium">Growth Mindset</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Currently Learning
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continuous learning is at the core of my development philosophy. 
              Here's what I'm currently studying and what's coming up next.
            </p>
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-card border border-border rounded-lg p-1 shadow-sm">
            {[
              { id: 'current', label: 'Currently Learning', icon: 'BookOpen' },
              { id: 'planned', label: 'Learning Pipeline', icon: 'Calendar' }
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Learning Content */}
        <motion.div
          key={activeTab}
          variants={tabVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {learningData?.[activeTab]?.map((item, index) => (
            <motion.div
              key={item?.id}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${item?.color}`}>
                  <Icon name={item?.icon} size={24} color="white" />
                </div>
                {activeTab === 'current' && (
                  <div className="text-xs text-muted-foreground">
                    {item?.lastActivity}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight">
                    {item?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item?.platform}
                  </p>
                </div>

                {/* Progress or Timeline */}
                {activeTab === 'current' ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">{item?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${item?.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item?.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Start Date</span>
                      <span className="font-medium text-foreground">{item?.startDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium text-foreground">{item?.duration}</span>
                    </div>
                  </div>
                )}

                {/* Topics */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Key Topics:</div>
                  <div className="flex flex-wrap gap-1">
                    {item?.topics?.map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                {activeTab === 'current' && (
                  <div className="pt-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-foreground">{item?.timeSpent}</div>
                        <div className="text-xs text-muted-foreground">Time Spent</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-foreground">{item?.estimatedCompletion}</div>
                        <div className="text-xs text-muted-foreground">ETA</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Learning Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 bg-card border border-border rounded-xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Learning Journey Stats
            </h3>
            <p className="text-muted-foreground">
              Tracking my continuous learning and skill development
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Hours This Month', value: '74', icon: 'Clock', color: 'text-blue-500' },
              { label: 'Courses Completed', value: '12', icon: 'BookOpen', color: 'text-green-500' },
              { label: 'Certificates Earned', value: '7', icon: 'Award', color: 'text-purple-500' },
              { label: 'Learning Streak', value: '23 days', icon: 'Flame', color: 'text-orange-500' }
            ]?.map((stat, index) => (
              <motion.div
                key={stat?.label}
                variants={itemVariants}
                className="text-center space-y-2"
              >
                <div className="flex justify-center">
                  <Icon name={stat?.icon} size={24} className={stat?.color} />
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold text-foreground">
                    {stat?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CurrentlyLearning;