import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = () => {
  const [activeProofType, setActiveProofType] = useState('github');

  const githubStats = {
    contributions: 1247,
    repositories: 42,
    followers: 156,
    following: 89,
    streak: 23,
    languages: [
      { name: 'JavaScript', percentage: 45, color: 'bg-yellow-500' },
      { name: 'TypeScript', percentage: 25, color: 'bg-blue-500' },
      { name: 'Python', percentage: 15, color: 'bg-green-500' },
      { name: 'CSS', percentage: 10, color: 'bg-purple-500' },
      { name: 'Other', percentage: 5, color: 'bg-gray-500' }
    ],
    recentActivity: [
      { type: 'commit', repo: 'portfolio-pro', message: 'Add responsive navigation component', time: '2 hours ago' },
      { type: 'pr', repo: 'react-dashboard', message: 'Implement dark mode toggle', time: '1 day ago' },
      { type: 'issue', repo: 'open-source-lib', message: 'Fix accessibility issues in modal', time: '2 days ago' },
      { type: 'star', repo: 'awesome-react-hooks', message: 'Starred repository', time: '3 days ago' }
    ]
  };

  const learningPlatforms = [
    {
      name: 'freeCodeCamp',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
      points: 2450,
      certificates: 5,
      streak: 45,
      level: 'Advanced'
    },
    {
      name: 'Frontend Masters',
      logo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&h=100&fit=crop',
      points: 1890,
      certificates: 8,
      streak: 32,
      level: 'Expert'
    },
    {
      name: 'Coursera',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop',
      points: 3200,
      certificates: 12,
      streak: 28,
      level: 'Professional'
    },
    {
      name: 'Udemy',
      logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
      points: 1650,
      certificates: 15,
      streak: 19,
      level: 'Advanced'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      content: "Alex\'s React skills are exceptional. His attention to detail and problem-solving approach made our project delivery seamless. Highly recommend working with him.",
      rating: 5,
      project: "E-commerce Dashboard"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Tech Lead",
      company: "StartupXYZ",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      content: "Working with Alex was a great experience. He brought fresh ideas and implemented complex features with clean, maintainable code. A true professional.",
      rating: 5,
      project: "Mobile App Development"
    },
    {
      id: 3,
      name: "Emily Chen",
      role: "Product Manager",
      company: "InnovateLab",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      content: "Alex consistently delivered high-quality work on time. His communication skills and technical expertise made him an invaluable team member.",
      rating: 5,
      project: "SaaS Platform"
    }
  ];

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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Social Proof & Recognition
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Building credibility through verified achievements, community contributions, 
              and professional testimonials from colleagues and clients.
            </p>
          </motion.div>
        </motion.div>

        {/* Proof Type Navigation */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-card border border-border rounded-lg p-1 shadow-sm">
            {[
              { id: 'github', label: 'GitHub Activity', icon: 'Github' },
              { id: 'learning', label: 'Learning Platforms', icon: 'BookOpen' },
              { id: 'testimonials', label: 'Testimonials', icon: 'MessageSquare' }
            ]?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveProofType(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeProofType === tab?.id
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

        {/* GitHub Activity */}
        {activeProofType === 'github' && (
          <motion.div
            key="github"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* GitHub Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Contributions', value: githubStats?.contributions, icon: 'GitCommit' },
                { label: 'Repositories', value: githubStats?.repositories, icon: 'Folder' },
                { label: 'Followers', value: githubStats?.followers, icon: 'Users' },
                { label: 'Day Streak', value: `${githubStats?.streak} days`, icon: 'Flame' }
              ]?.map((stat) => (
                <div key={stat?.label} className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon name={stat?.icon} size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat?.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat?.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Language Distribution */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Language Distribution
              </h3>
              <div className="space-y-3">
                {githubStats?.languages?.map((lang) => (
                  <div key={lang?.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground font-medium">{lang?.name}</span>
                      <span className="text-muted-foreground">{lang?.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${lang?.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang?.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {githubStats?.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                    <div className="p-1 bg-primary/10 rounded">
                      <Icon 
                        name={activity?.type === 'commit' ? 'GitCommit' : 
                              activity?.type === 'pr' ? 'GitPullRequest' :
                              activity?.type === 'issue' ? 'AlertCircle' : 'Star'} 
                        size={14} 
                        className="text-primary" 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">
                        {activity?.repo}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {activity?.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {activity?.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Learning Platforms */}
        {activeProofType === 'learning' && (
          <motion.div
            key="learning"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {learningPlatforms?.map((platform) => (
              <div key={platform?.name} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={platform?.logo}
                      alt={platform?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {platform?.name}
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      Level: {platform?.level}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {platform?.points}
                    </div>
                    <div className="text-xs text-muted-foreground">Points</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {platform?.certificates}
                    </div>
                    <div className="text-xs text-muted-foreground">Certificates</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-foreground">
                      {platform?.streak}
                    </div>
                    <div className="text-xs text-muted-foreground">Day Streak</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Testimonials */}
        {activeProofType === 'testimonials' && (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials?.map((testimonial) => (
              <div key={testimonial?.id} className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial?.avatar}
                      alt={testimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial?.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial?.company}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-1 mb-3">
                  {renderStars(testimonial?.rating)}
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  "{testimonial?.content}"
                </p>

                <div className="text-xs text-muted-foreground">
                  Project: {testimonial?.project}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SocialProof;