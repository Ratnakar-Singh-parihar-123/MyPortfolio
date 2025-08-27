import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const JourneyTimeline = () => {
  const [activePhase, setActivePhase] = useState(0);

  const journeyPhases = [
    {
      id: 0,
      year: "2022",
      title: "The Spark",
      subtitle: "First Line of Code",
      description: `My journey began with curiosity about how websites work. I started with HTML and CSS, creating my first "Hello World" webpage. The excitement of seeing my code come to life on the browser was the moment I knew I wanted to pursue development seriously.`,
      skills: ["HTML", "CSS", "Basic JavaScript"],
      milestone: "Built my first personal webpage",
      icon: "Zap",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 1,
      year: "2023",
      title: "Foundation Building",
      subtitle: "Diving Deeper",
      description: `Enrolled in comprehensive web development courses and started building more complex projects. Learned the fundamentals of JavaScript, responsive design, and version control. This phase was about building solid foundations and understanding core programming concepts.`,
      skills: ["JavaScript ES6+", "Git/GitHub", "Responsive Design", "Bootstrap"],
      milestone: "Completed 5 practice projects",
      icon: "Building",
      color: "from-blue-500 to-purple-500"
    },
    {
      id: 2,
      year: "2024",
      title: "Framework Mastery",
      subtitle: "React & Modern Tools",
      description: `Transitioned to modern frameworks and tools. Mastered React, learned state management, and started working with APIs. This phase marked my evolution from a beginner to someone who could build real-world applications with confidence.`,
      skills: ["React", "Node.js", "REST APIs", "Tailwind CSS"],
      milestone: "Built 3 full-stack applications",
      icon: "Rocket",
      color: "from-green-500 to-teal-500"
    },
    {
      id: 3,
      year: "2025",
      title: "Professional Growth",
      subtitle: "Current Focus",
      description: `Currently focusing on advanced React patterns, performance optimization, and contributing to open-source projects. Building a portfolio of meaningful projects while continuously learning new technologies and best practices.`,
      skills: ["Advanced React", "TypeScript", "Testing", "Performance Optimization"],
      milestone: "Seeking first professional role",
      icon: "Target",
      color: "from-primary to-secondary"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            My Development Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From curiosity to competence - here's how I've grown as a developer, 
            one milestone at a time.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Timeline Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {journeyPhases?.map((phase, index) => (
              <button
                key={phase?.id}
                onClick={() => setActivePhase(index)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activePhase === index
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <span>{phase?.year}</span>
                <span className="hidden sm:inline">- {phase?.title}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Content */}
          <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Content Side */}
              <div className="p-8 lg:p-12">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${journeyPhases?.[activePhase]?.color} flex items-center justify-center`}>
                        <Icon 
                          name={journeyPhases?.[activePhase]?.icon} 
                          size={24} 
                          color="white" 
                        />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {journeyPhases?.[activePhase]?.year}
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">
                          {journeyPhases?.[activePhase]?.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-lg text-primary font-medium">
                      {journeyPhases?.[activePhase]?.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {journeyPhases?.[activePhase]?.description}
                  </p>

                  {/* Milestone */}
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name="Trophy" size={18} color="var(--color-accent)" />
                      <span className="text-sm font-medium text-accent">Key Milestone</span>
                    </div>
                    <p className="text-foreground font-medium mt-1">
                      {journeyPhases?.[activePhase]?.milestone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Side */}
              <div className="bg-muted/50 p-8 lg:p-12">
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                    <Icon name="Code" size={20} />
                    <span>Technologies Learned</span>
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {journeyPhases?.[activePhase]?.skills?.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-background border border-border rounded-lg p-3 text-center hover:shadow-md transition-shadow duration-200"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Journey Progress</span>
                      <span className="text-sm font-medium text-foreground">
                        {Math.round(((activePhase + 1) / journeyPhases?.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${journeyPhases?.[activePhase]?.color} transition-all duration-500`}
                        style={{ width: `${((activePhase + 1) / journeyPhases?.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
              disabled={activePhase === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activePhase === 0
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="ChevronLeft" size={18} />
              <span>Previous</span>
            </button>

            <div className="flex space-x-2">
              {journeyPhases?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === activePhase ? 'bg-primary' : 'bg-border'
                  }`}
                ></div>
              ))}
            </div>

            <button
              onClick={() => setActivePhase(Math.min(journeyPhases?.length - 1, activePhase + 1))}
              disabled={activePhase === journeyPhases?.length - 1}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activePhase === journeyPhases?.length - 1
                  ? 'text-muted-foreground cursor-not-allowed'
                  : 'text-foreground hover:bg-muted'
              }`}
            >
              <span>Next</span>
              <Icon name="ChevronRight" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;