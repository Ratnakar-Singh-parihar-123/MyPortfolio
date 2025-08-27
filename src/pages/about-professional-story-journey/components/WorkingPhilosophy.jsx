import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WorkingPhilosophy = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophies = [
    {
      id: 0,
      title: "Growth Mindset",
      subtitle: "Always Learning, Always Improving",
      description: `I believe that every challenge is an opportunity to learn something new. In the rapidly evolving world of technology, staying curious and adaptable isn't just beneficial—it's essential. I approach each project with the mindset that there's always a better way to solve a problem, and I'm committed to finding it.`,
      principles: [
        "Embrace challenges as learning opportunities",
        "Seek feedback and act on it constructively",
        "Stay updated with industry trends and best practices",
        "Share knowledge and learn from others"
      ],
      icon: "TrendingUp",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 1,
      title: "User-Centric Approach",
      subtitle: "Code with Purpose and Impact",
      description: `Every line of code I write serves a purpose: to create meaningful experiences for users. I believe that great software isn't just about elegant code—it's about solving real problems and making people's lives easier. This drives me to think beyond the technical implementation to the human impact.`,
      principles: [
        "Prioritize user experience in every decision",
        "Write clean, maintainable code for future developers",
        "Consider accessibility and inclusivity from the start",
        "Test thoroughly to ensure reliability"
      ],
      icon: "Users",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Collaborative Spirit",
      subtitle: "Better Together Than Alone",
      description: `I thrive in collaborative environments where diverse perspectives come together to create something greater than the sum of its parts. I believe that the best solutions emerge from open communication, mutual respect, and shared ownership of both successes and challenges.`,
      principles: [
        "Communicate clearly and listen actively",
        "Respect different viewpoints and approaches",
        "Contribute to team knowledge and documentation",
        "Support teammates and celebrate collective wins"
      ],
      icon: "Users2",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: "Quality & Reliability",
      subtitle: "Excellence in Every Detail",
      description: `I'm committed to delivering work that I can be proud of. This means writing code that's not just functional, but maintainable, scalable, and robust. I believe that taking the time to do things right the first time saves everyone time and frustration in the long run.`,
      principles: [
        "Write self-documenting, clean code",
        "Implement comprehensive testing strategies",
        "Follow established patterns and conventions",
        "Continuously refactor and improve existing code"
      ],
      icon: "Shield",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            My Working Philosophy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide my approach to development and collaboration, 
            shaping how I tackle challenges and work with teams.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Philosophy Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {philosophies?.map((philosophy, index) => (
              <button
                key={philosophy?.id}
                onClick={() => setActivePhilosophy(index)}
                className={`text-left p-6 rounded-xl border transition-all duration-300 hover:shadow-lg ${
                  activePhilosophy === index
                    ? 'border-primary bg-primary/5 shadow-lg'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${philosophy?.color} flex items-center justify-center`}>
                    <Icon name={philosophy?.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      {philosophy?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {philosophy?.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Philosophy Details */}
          <div className="bg-muted/30 rounded-2xl border border-border overflow-hidden">
            <div className="grid lg:grid-cols-3">
              {/* Content */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${philosophies?.[activePhilosophy]?.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon 
                        name={philosophies?.[activePhilosophy]?.icon} 
                        size={28} 
                        color="white" 
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                        {philosophies?.[activePhilosophy]?.title}
                      </h3>
                      <p className="text-lg text-primary font-medium">
                        {philosophies?.[activePhilosophy]?.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {philosophies?.[activePhilosophy]?.description}
                  </p>

                  {/* Call to Action */}
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-accent">
                      <Icon name="Lightbulb" size={18} />
                      <span className="font-medium text-sm">In Practice</span>
                    </div>
                    <p className="text-foreground mt-2">
                      This philosophy drives my daily decisions, from choosing the right tools 
                      to structuring code and collaborating with team members.
                    </p>
                  </div>
                </div>
              </div>

              {/* Principles Sidebar */}
              <div className="bg-background border-l border-border p-8 lg:p-12">
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Icon name="CheckCircle" size={20} color="var(--color-accent)" />
                    <span>Key Principles</span>
                  </h4>
                  
                  <div className="space-y-4">
                    {philosophies?.[activePhilosophy]?.principles?.map((principle, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                      >
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-accent"></div>
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">
                          {principle}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">Philosophy</span>
                      <span className="text-xs font-medium text-foreground">
                        {activePhilosophy + 1} of {philosophies?.length}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      {philosophies?.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            index === activePhilosophy ? 'bg-primary' : 'bg-border'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingPhilosophy;