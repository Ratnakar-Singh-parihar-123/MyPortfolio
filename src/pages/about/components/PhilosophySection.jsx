import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhilosophySection = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophies = [
    {
      id: 0,
      title: "User-Centered Design",
      subtitle: "People First, Technology Second",
      description: "Every line of code I write serves a human need. Technology should be invisible, intuitive, and empowering—never a barrier between users and their goals.",
      principles: [
        "Empathy drives every design decision",
        "Accessibility is not optional, it's essential",
        "Simple solutions to complex problems",
        "Continuous user feedback integration"
      ],
      icon: "Users",
      color: "primary",
      quote: "The best technology is the one you don't notice—it just works."
    },
    {
      id: 1,
      title: "Craftsmanship Excellence",
      subtitle: "Quality Over Quantity",
      description: "I believe in writing code that stands the test of time. Clean, maintainable, and well-documented code is not just professional courtesy—it's respect for future developers.",
      principles: [
        "Code should tell a story",
        "Performance is a feature, not an afterthought",
        "Testing is integral to development",
        "Continuous learning and improvement"
      ],
      icon: "Wrench",
      color: "accent",
      quote: "Code is poetry written for machines but read by humans."
    },
    {
      id: 2,
      title: "Collaborative Innovation",
      subtitle: "Together We Build Better",
      description: "The best solutions emerge from diverse perspectives and open collaboration. I thrive in environments where ideas flow freely and everyone\'s voice matters.",
      principles: [
        "Knowledge sharing accelerates growth",
        "Diverse teams create better products",
        "Mentorship is a two-way street",
        "Open source contribution benefits all"
      ],
      icon: "Users2",
      color: "success",
      quote: "Innovation happens at the intersection of different minds."
    },
    {
      id: 3,
      title: "Sustainable Development",
      subtitle: "Building for Tomorrow",
      description: "Technology should enhance life without compromising our future. I'm committed to creating efficient, scalable solutions that consider environmental and social impact.",
      principles: [
        "Optimize for performance and efficiency",
        "Consider the full lifecycle of applications",
        "Promote digital accessibility and inclusion",
        "Support sustainable business practices"
      ],
      icon: "Leaf",
      color: "warning",
      quote: "Great code today shouldn\'t become tomorrow\'s technical debt."
    }
  ];

  const coreValues = [
    {
      title: "Integrity",
      description: "Honest communication, transparent processes, and ethical decision-making in every project.",
      icon: "Shield",
      color: "primary"
    },
    {
      title: "Excellence",
      description: "Striving for the highest quality in code, design, and user experience without compromise.",
      icon: "Star",
      color: "accent"
    },
    {
      title: "Growth",
      description: "Continuous learning, adaptation, and improvement in both technical and soft skills.",
      icon: "TrendingUp",
      color: "success"
    },
    {
      title: "Impact",
      description: "Creating meaningful solutions that solve real problems and add genuine value.",
      icon: "Target",
      color: "warning"
    }
  ];

  return (
    <section className="py-20 bg-surface">
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
            My Development Philosophy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles and beliefs that guide my approach to creating meaningful digital experiences.
          </p>
        </motion.div>

        {/* Philosophy Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {philosophies?.map((philosophy, index) => (
              <button
                key={philosophy?.id}
                onClick={() => setActivePhilosophy(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activePhilosophy === index
                    ? `bg-${philosophy?.color} text-white shadow-sm`
                    : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
                }`}
              >
                <Icon name={philosophy?.icon} size={16} />
                <span>{philosophy?.title}</span>
              </button>
            ))}
          </div>

          {/* Active Philosophy Content */}
          <motion.div
            key={activePhilosophy}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-card border border-border rounded-2xl p-8 shadow-sm"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 bg-${philosophies?.[activePhilosophy]?.color}/10 rounded-xl flex items-center justify-center`}>
                    <Icon 
                      name={philosophies?.[activePhilosophy]?.icon} 
                      size={24} 
                      className={`text-${philosophies?.[activePhilosophy]?.color}`} 
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {philosophies?.[activePhilosophy]?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {philosophies?.[activePhilosophy]?.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-foreground leading-relaxed mb-6">
                  {philosophies?.[activePhilosophy]?.description}
                </p>

                {/* Quote */}
                <div className="bg-muted rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="Quote" size={20} className="text-muted-foreground mt-1 flex-shrink-0" />
                    <p className="text-foreground font-medium italic">
                      {philosophies?.[activePhilosophy]?.quote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Principles */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Core Principles</h4>
                <div className="space-y-3">
                  {philosophies?.[activePhilosophy]?.principles?.map((principle, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-6 h-6 bg-${philosophies?.[activePhilosophy]?.color}/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon 
                          name="Check" 
                          size={14} 
                          className={`text-${philosophies?.[activePhilosophy]?.color}`} 
                        />
                      </div>
                      <p className="text-foreground leading-relaxed">{principle}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Core Values That Drive Me
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues?.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-${value?.color}/10 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon name={value?.icon} size={28} className={`text-${value?.color}`} />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  {value?.title}
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value?.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Manifesto Download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-brand rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Want to dive deeper into my philosophy?
              </h3>
              <p className="text-white/90 mb-6 leading-relaxed">
                Download my complete development manifesto—a detailed exploration of my approach 
                to creating meaningful digital experiences and building sustainable technology solutions.
              </p>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90 border-white"
              >
                Download My Manifesto
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PhilosophySection;