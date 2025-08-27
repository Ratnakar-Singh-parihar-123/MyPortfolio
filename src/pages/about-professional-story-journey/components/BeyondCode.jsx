import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BeyondCode = () => {
  const [activeInterest, setActiveInterest] = useState(0);

  const interests = [
    {
      id: 0,
      title: "Travel",
      description: "Exploring new places and cultures broadens my perspective, teaches adaptability, and helps me appreciate diversity—qualities that strengthen creativity in problem-solving and design.",
      image: "https://media.istockphoto.com/id/1497396873/photo/ready-for-starting-my-beach-holiday.jpg?s=612x612&w=0&k=20&c=Rfb7IbYAZR1hNTF6KUDYq8CVu9Yr4wRgK2VLZIZyORY=",
      icon: "Globe",
      skills: ["Adaptability", "Cultural Awareness", "Creativity", "Open-Mindedness"],
      connection: "Travel inspires creativity and helps me bring fresh ideas into web development and design by observing diverse perspectives."
    },

    {
      id: 1,
      title: "Cricket",
      description: "Cricket teaches teamwork, patience, and strategy—whether batting, bowling, or fielding, it requires focus, practice, and coordination to achieve success.",
      image: "https://thumbs.dreamstime.com/b/cricket-bat-ball-26560801.jpg",
      icon: "Trophy",
      skills: ["Teamwork", "Patience", "Strategic Thinking", "Focus"],
      connection: "The teamwork and patience from cricket help me collaborate effectively on projects and handle challenges with a steady mindset."
    },

    {
      id: 2,
      title: "Reading",
      description: "From technical books to science fiction, reading expands my knowledge base and keeps me curious about new ideas, technologies, and different ways of thinking about problems.",
      image: "https://littlescholars-kashipur.com/images/blog/Yellow%20And%20Red%20Modern%20Business%20Coach%20Blog%20Banner.png",
      icon: "BookOpen",
      skills: ["Continuous Learning", "Critical Thinking", "Communication", "Research Skills"],
      connection: "Reading keeps me updated with industry trends and helps me communicate complex technical concepts more effectively."
    },

    {
      id: 3,
      title: "Fitness",
      description: "Regular exercise and maintaining physical health helps me stay focused, manage stress, and maintain the energy needed for long coding sessions and continuous learning.",
      image: "https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      icon: "Dumbbell",
      skills: ["Discipline", "Goal Setting", "Stress Management", "Consistency"],
      connection: "The discipline and goal-setting from fitness routines directly apply to learning new technologies and completing challenging projects."
    }
  ];

  const personalValues = [
    {
      title: "Curiosity",
      description: "Always asking \'why\' and \'how can this be better?'",
      icon: "Search"
    },
    {
      title: "Integrity",
      description: "Honest about my current skills while committed to growth",
      icon: "Shield"
    },
    {
      title: "Collaboration",
      description: "Believing that the best solutions come from diverse perspectives",
      icon: "Users"
    },
    {
      title: "Impact",
      description: "Focused on creating meaningful solutions that matter",
      icon: "Target"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Beyond the Code
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The interests, values, and experiences that shape who I am as a person
            and how they make me a better developer and team member.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {/* Interests Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              What I'm Passionate About
            </h3>

            {/* Interest Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {interests?.map((interest, index) => (
                <button
                  key={interest?.id}
                  onClick={() => setActiveInterest(index)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeInterest === index
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                    }`}
                >
                  <Icon name={interest?.icon} size={16} />
                  <span>{interest?.title}</span>
                </button>
              ))}
            </div>

            {/* Active Interest Details */}
            <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden">
              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={interests?.[activeInterest]?.image}
                    alt={interests?.[activeInterest]?.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2 text-white">
                      <Icon name={interests?.[activeInterest]?.icon} size={24} />
                      <span className="text-xl font-bold">{interests?.[activeInterest]?.title}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12">
                  <div className="space-y-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {interests?.[activeInterest]?.description}
                    </p>

                    {/* Skills Developed */}
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center space-x-2">
                        <Icon name="Lightbulb" size={18} color="var(--color-accent)" />
                        <span>Skills Developed</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {interests?.[activeInterest]?.skills?.map((skill, index) => (
                          <div
                            key={index}
                            className="bg-muted/50 text-foreground px-3 py-2 rounded-lg text-sm font-medium text-center"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Connection to Development */}
                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Icon name="ArrowRight" size={18} color="var(--color-primary)" className="mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-primary mb-1">How This Helps My Development</h5>
                          <p className="text-sm text-foreground">
                            {interests?.[activeInterest]?.connection}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              Core Values That Drive Me
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {personalValues?.map((value, index) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:border-primary/50"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name={value?.icon} size={24} color="var(--color-primary)" />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {value?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {value?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Fit Section */}
          <div className="bg-background rounded-2xl border border-border p-8 lg:p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-green-500 rounded-xl flex items-center justify-center mx-auto">
                <Icon name="Heart" size={32} color="white" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                Why This Matters for Teams
              </h3>

              <p className="text-lg text-muted-foreground leading-relaxed">
                I believe that great software is built by great teams, and great teams are made up of
                well-rounded individuals who bring diverse perspectives, maintain positive energy, and
                support each other's growth. My interests and values shape me into someone who not only
                writes good code but also contributes to a positive, collaborative work environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                  <Icon name="MessageCircle" size={18} />
                  <span>Let's Connect</span>
                </button>
                <button className="inline-flex items-center justify-center space-x-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors duration-200">
                  <Icon name="Coffee" size={18} />
                  <span>Grab a Coffee</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeyondCode;