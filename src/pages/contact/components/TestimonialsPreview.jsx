import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsPreview = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Working with PortfolioStudio was exceptional. They delivered a complex e-commerce platform that exceeded our expectations. The attention to detail and technical expertise was outstanding.`,
      rating: 5,
      project: "E-commerce Platform",
      date: "September 2024"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "InnovateLab",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `The mobile app development was flawless. Great communication throughout the project, delivered on time and within budget. Highly recommend for any React Native projects.`,
      rating: 5,
      project: "Mobile App Development",
      date: "August 2024"
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Founder",
      company: "StartupVision",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `From concept to deployment, the entire process was smooth. The technical consultation helped us make informed decisions that saved both time and money.`,
      rating: 5,
      project: "Technical Consultation",
      date: "July 2024"
    },
    {
      id: 4,
      name: "David Park",
      role: "Engineering Lead",
      company: "DataDriven Inc",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `Outstanding work on our dashboard redesign. The performance improvements were significant, and the user experience is now top-notch. Professional and reliable.`,
      rating: 5,
      project: "Dashboard Redesign",
      date: "June 2024"
    }
  ];

  const references = [
    {
      name: "Jennifer Walsh",
      role: "Senior Developer",
      company: "Microsoft",
      relationship: "Former Colleague",
      contact: "jennifer.walsh@microsoft.com",
      available: true
    },
    {
      name: "Alex Thompson",
      role: "Tech Lead",
      company: "Google",
      relationship: "Project Collaborator",
      contact: "alex.thompson@google.com",
      available: true
    },
    {
      name: "Maria Santos",
      role: "Product Director",
      company: "Stripe",
      relationship: "Client Reference",
      contact: "maria.santos@stripe.com",
      available: true
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials?.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < rating ? "var(--color-warning)" : "var(--color-muted-foreground)"}
        className={index < rating ? "fill-current" : ""}
      />
    ));
  };

  const currentTestimonialData = testimonials?.[currentTestimonial];

  return (
    <div className="space-y-8">
      {/* Featured Testimonial */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Client Testimonials</h3>
          <div className="flex items-center space-x-1">
            {renderStars(currentTestimonialData?.rating)}
          </div>
        </div>

        <div className="space-y-4">
          <blockquote className="text-muted-foreground italic leading-relaxed">
            "{currentTestimonialData?.content}"
          </blockquote>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Image
                src={currentTestimonialData?.avatar}
                alt={currentTestimonialData?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
            </div>
            <div>
              <div className="font-medium text-foreground">{currentTestimonialData?.name}</div>
              <div className="text-sm text-muted-foreground">
                {currentTestimonialData?.role} at {currentTestimonialData?.company}
              </div>
              <div className="text-xs text-muted-foreground">
                {currentTestimonialData?.project} • {currentTestimonialData?.date}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="flex space-x-2">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length)}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length)}
              className="p-1 rounded-full hover:bg-muted transition-colors"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">50+</div>
          <div className="text-sm text-muted-foreground">Projects Completed</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-success mb-1">98%</div>
          <div className="text-sm text-muted-foreground">Client Satisfaction</div>
        </div>
        <div className="text-center p-4 bg-card border border-border rounded-lg">
          <div className="text-2xl font-bold text-accent mb-1">5.0</div>
          <div className="text-sm text-muted-foreground">Average Rating</div>
        </div>
      </div>
      {/* Professional References */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Professional References</h3>
        <div className="space-y-3">
          {references?.map((reference, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <div className="font-medium text-foreground">{reference?.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {reference?.role} at {reference?.company}
                  </div>
                  <div className="text-xs text-muted-foreground">{reference?.relationship}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {reference?.available && (
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-xs text-success">Available</span>
                  </div>
                )}
                <button className="text-primary hover:text-primary/80 text-sm font-medium">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Indicators */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} />
            <span>Verified Professional</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} />
            <span>Top Rated</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>5+ Years Experience</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPreview;