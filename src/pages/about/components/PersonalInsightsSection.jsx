import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PersonalInsightsSection = () => {
  const [activeTab, setActiveTab] = useState('workspace');

  const workspaceImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=400&fit=crop",
      alt: "Modern home office setup with dual monitors",
      title: "My Command Center",
      description: "Where ideas transform into reality"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
      alt: "Close-up of coding on laptop screen",
      title: "Late Night Coding",
      description: "When the best ideas come to life"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      alt: "Developer working with coffee and notebook",
      title: "Planning & Strategy",
      description: "Every great project starts with a plan"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      alt: "Team collaboration in modern office",
      title: "Collaboration Space",
      description: "Where teamwork creates magic"
    }
  ];

  const personalFacts = [
    {
      icon: "Coffee",
      title: "Coffee Enthusiast",
      description: "I\'ve perfected the art of brewing the perfect cup—essential fuel for those late-night coding sessions.",
      color: "warning"
    },
    {
      icon: "BookOpen",
      title: "Continuous Learner",
      description: "Currently reading \'Clean Architecture\' and taking a course on advanced React patterns.",
      color: "primary"
    },
    {
      icon: "Music",
      title: "Music & Code",
      description: "Lo-fi hip hop and ambient electronic music are my go-to soundtracks for deep focus work.",
      color: "accent"
    },
    {
      icon: "Camera",
      title: "Photography Hobbyist",
      description: "Capturing moments and compositions helps me see design and user experience from new angles.",
      color: "success"
    },
    {
      icon: "Gamepad2",
      title: "Gaming & UX",
      description: "Video games taught me about user engagement, feedback loops, and intuitive interface design.",
      color: "secondary"
    },
    {
      icon: "Plane",
      title: "Travel Inspiration",
      description: "Exploring different cultures and places fuels creativity and provides fresh perspectives on problem-solving.",
      color: "primary"
    }
  ];

  const dailyRoutine = [
    {
      time: "6:00 AM",
      activity: "Morning Routine",
      description: "Coffee, meditation, and reviewing the day's priorities",
      icon: "Sun"
    },
    {
      time: "7:00 AM",
      activity: "Learning Time",
      description: "Reading tech articles, documentation, or taking online courses",
      icon: "BookOpen"
    },
    {
      time: "9:00 AM",
      activity: "Deep Work",
      description: "Focused coding sessions on complex features and architecture",
      icon: "Code"
    },
    {
      time: "12:00 PM",
      activity: "Team Sync",
      description: "Standups, code reviews, and collaborative problem-solving",
      icon: "Users"
    },
    {
      time: "2:00 PM",
      activity: "Creative Work",
      description: "UI/UX design, prototyping, and experimental projects",
      icon: "Palette"
    },
    {
      time: "5:00 PM",
      activity: "Community",
      description: "Open source contributions, mentoring, or tech meetups",
      icon: "Heart"
    },
    {
      time: "7:00 PM",
      activity: "Personal Projects",
      description: "Side projects, learning new technologies, or writing",
      icon: "Lightbulb"
    },
    {
      time: "9:00 PM",
      activity: "Unwind",
      description: "Reading, gaming, or spending time with family and friends",
      icon: "Home"
    }
  ];

  const tabs = [
    { id: 'workspace', label: 'Workspace', icon: 'Monitor' },
    { id: 'personal', label: 'Personal', icon: 'User' },
    { id: 'routine', label: 'Daily Routine', icon: 'Clock' }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container-brand">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Behind the Scenes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the code—my workspace, interests, and the daily rhythms 
            that fuel creativity and productivity.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-muted rounded-lg p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'workspace' && (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 gap-6">
                {workspaceImages?.map((image, index) => (
                  <motion.div
                    key={image?.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="aspect-video overflow-hidden">
                      <Image
                        src={image?.src}
                        alt={image?.alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-lg font-semibold mb-1">{image?.title}</h3>
                      <p className="text-white/90 text-sm">{image?.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'personal' && (
            <motion.div
              key="personal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personalFacts?.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4 }}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-${fact?.color}/10 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon name={fact?.icon} size={24} className={`text-${fact?.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {fact?.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {fact?.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'routine' && (
            <motion.div
              key="routine"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-4">
                  {dailyRoutine?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="flex items-center space-x-4 bg-card border border-border rounded-xl p-4 hover:shadow-sm transition-all duration-300"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                          <Icon name={item?.icon} size={20} className="text-primary" />
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-20">
                        <span className="text-sm font-medium text-muted-foreground">
                          {item?.time}
                        </span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                          {item?.activity}
                        </h3>
                        <p className="text-muted-foreground">
                          {item?.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fun Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <div className="bg-gradient-subtle rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              Fun Facts & Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Cups of Coffee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Books Read</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">GitHub Commits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Countries Visited</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalInsightsSection;