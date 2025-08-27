import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const WhatsNext = () => {
  const [activeGoal, setActiveGoal] = useState(0);

  const careerGoals = [
    {
      id: 0,
      timeframe: "Next 6 Months",
      title: "Land My First Professional Role",
      description: `My immediate goal is to secure a junior developer position where I can apply my skills in a real-world environment, learn from experienced developers, and contribute to meaningful projects. I'm particularly interested in companies that value growth, learning, and collaborative development.`,
      objectives: [
        "Complete 2-3 more portfolio projects showcasing different skills",
        "Contribute to open-source projects to gain collaborative experience",
        "Network with developers and attend tech meetups/conferences",
        "Prepare thoroughly for technical interviews and coding challenges"
      ],
      icon: "Briefcase",
      color: "from-blue-500 to-purple-500",
      status: "In Progress"
    },
    {
      id: 1,
      timeframe: "Year 1-2",
      title: "Establish Technical Foundation",
      description: `Focus on becoming proficient in my chosen tech stack while learning industry best practices, development workflows, and how to work effectively in a team environment. This phase is about building confidence and competence in professional software development.`,
      objectives: [
        "Master advanced React patterns and state management",
        "Learn backend development with Node.js and databases",
        "Understand CI/CD pipelines and deployment strategies",
        "Develop strong debugging and testing skills"
      ],
      icon: "Building2",
      color: "from-green-500 to-teal-500",
      status: "Planned"
    },
    {
      id: 2,
      timeframe: "Year 3-5",
      title: "Grow Into Technical Leadership",
      description: `Transition from individual contributor to someone who can mentor others, lead technical decisions, and contribute to architectural discussions. This involves developing both technical depth and soft skills necessary for leadership roles.`,
      objectives: [
        "Mentor junior developers and contribute to team knowledge",
        "Lead feature development and technical decision-making",
        "Contribute to open-source projects and tech community",
        "Develop expertise in system design and architecture"
      ],
      icon: "Users",
      color: "from-orange-500 to-red-500",
      status: "Future Vision"
    },
    {
      id: 3,
      timeframe: "Long-term Vision",
      title: "Make Meaningful Impact",
      description: `Ultimately, I want to work on projects that make a positive difference in people's lives. Whether that's through innovative products, educational technology, or tools that help other developers, I want my work to have lasting, meaningful impact.`,
      objectives: [
        "Work on products that solve real-world problems",
        "Contribute to developer tools and educational resources",
        "Speak at conferences and share knowledge with the community",
        "Potentially start my own tech venture or consultancy"
      ],
      icon: "Rocket",
      color: "from-purple-500 to-pink-500",
      status: "Aspiration"
    }
  ];

  const learningPriorities = [
    {
      category: "Technical Skills",
      items: [
        { name: "JavaScript", priority: "High", reason: "Industry standard for large applications" },
        { name: "Testing (Jest, RTL)", priority: "High", reason: "Essential for professional development" },
        { name: "Backend Development", priority: "Medium", reason: "Become a full-stack developer" },
        { name: "Cloud Platforms", priority: "Medium", reason: "Modern deployment and scaling" }
      ],
      icon: "Code"
    },
    {
      category: "Soft Skills",
      items: [
        { name: "Technical Communication", priority: "High", reason: "Essential for team collaboration" },
        { name: "Project Management", priority: "Medium", reason: "Understanding development workflows" },
        { name: "Mentoring", priority: "Low", reason: "Future leadership preparation" },
        { name: "Public Speaking", priority: "Low", reason: "Community involvement and career growth" }
      ],
      icon: "Users"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Planned': return 'text-green-600 bg-green-50 border-green-200';
      case 'Future Vision': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Aspiration': return 'text-pink-600 bg-pink-50 border-pink-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            What's Next in My Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My roadmap for growth, learning objectives, and career aspirations as I continue
            evolving as a developer and professional.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {/* Career Goals Timeline */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Career Roadmap
            </h3>

            {/* Goal Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {careerGoals?.map((goal, index) => (
                <button
                  key={goal?.id}
                  onClick={() => setActiveGoal(index)}
                  className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 min-w-[140px] ${activeGoal === index
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                    }`}
                >
                  <Icon name={goal?.icon} size={20} />
                  <span className="text-center">{goal?.timeframe}</span>
                </button>
              ))}
            </div>

            {/* Active Goal Details */}
            <div className="bg-muted/30 rounded-2xl border border-border overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${careerGoals?.[activeGoal]?.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon
                          name={careerGoals?.[activeGoal]?.icon}
                          size={28}
                          color="white"
                        />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground font-medium mb-1">
                          {careerGoals?.[activeGoal]?.timeframe}
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                          {careerGoals?.[activeGoal]?.title}
                        </h3>
                      </div>
                    </div>

                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(careerGoals?.[activeGoal]?.status)}`}>
                      {careerGoals?.[activeGoal]?.status}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {careerGoals?.[activeGoal]?.description}
                  </p>

                  {/* Objectives */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                      <Icon name="Target" size={20} color="var(--color-accent)" />
                      <span>Key Objectives</span>
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {careerGoals?.[activeGoal]?.objectives?.map((objective, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 bg-background border border-border rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-accent"></div>
                          </div>
                          <span className="text-sm text-foreground leading-relaxed">
                            {objective}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Priorities */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Current Learning Priorities
            </h3>

            <div className="grid lg:grid-cols-2 gap-8">
              {learningPriorities?.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="bg-background border border-border rounded-xl p-6 lg:p-8"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={category?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <h4 className="text-xl font-semibold text-foreground">
                      {category?.category}
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {category?.items?.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{item?.name}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item?.priority)}`}>
                            {item?.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item?.reason}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto">
                <Icon name="Handshake" size={32} color="white" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Let's Build the Future Together
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm excited about the journey ahead and would love to connect with like-minded
                professionals, potential mentors, or teams looking for a dedicated developer who
                brings enthusiasm, curiosity, and a commitment to continuous growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                  <Icon name="MessageCircle" size={18} />
                  <span>Start a Conversation</span>
                </button>
                <button className="inline-flex items-center justify-center space-x-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors duration-200">
                  <Icon name="Calendar" size={18} />
                  <span>Schedule a Call</span>
                </button>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  Open to entry-level opportunities • Eager to learn and grow • Excited to connect with fellow developers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNext;