import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import ProblemSolvingBasic from '../../../../public/assets/Certificate/basic.png'
import ProblemSolvingIntermediate from '../../../../public/assets/Certificate/Intermediate.png'

const FeaturedAchievements = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const achievements = [

    {
      id: 1,
      title: "Problem Solving (Basic) Certificate",
      issuer: "HackerRank",
      date: "July 2024",
      type: "certification",
      icon: "Award",
      image: ProblemSolvingBasic,
      description: "Earned recognition for foundational problem-solving skills, covering data structures, algorithms, and logical reasoning challenges.",
      verificationLink: "#",
      skills: ["Algorithms", "Data Structures", "Logic Building"],
      credentialId: "HR-PSB-2024-001"
    },
    {
      id: 2,
      title: "Problem Solving (Intermediate) Certificate",
      issuer: "HackerRank",
      date: "May 2025",
      type: "certification",
      icon: "Award",
      image: ProblemSolvingIntermediate,
      description: "Validated intermediate-level problem-solving expertise with advanced algorithmic and coding challenges.",
      verificationLink: "#",
      skills: ["Dynamic Programming", "Greedy Algorithms", "Optimization"],
      credentialId: "HR-PSI-2024-002"
    },
    {
      id: 3,
      title: "Java Programming Certificate",
      issuer: "Online Coding Platform",
      date: "September 2024",
      type: "certification",
      icon: "Code",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      description: "Demonstrated proficiency in Java programming, object-oriented principles, and application development.",
      verificationLink: "#",
      skills: ["Java", "OOPs", "Exception Handling", "Collections"],
      credentialId: "JAVA-2024-003"
    },
    {
      id: 4,
      title: "MERN Stack Developer Certificate",
      issuer: "Coding Thinker",
      date: "October 2024",
      type: "certification",
      icon: "Globe",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
      description: "Completed MERN stack training with practical projects covering full-stack web development using MongoDB, Express, React, and Node.js.",
      verificationLink: "#",
      skills: ["MongoDB", "Express.js", "React", "Node.js"],
      credentialId: "MERN-2024-004"
    }

  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % achievements?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, achievements?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % achievements?.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + achievements?.length) % achievements?.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
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
              Latest Achievements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recent certifications, awards, and milestones that showcase continuous learning
              and professional growth in the tech industry.
            </p>
          </motion.div>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={achievements?.[currentSlide]?.image}
                      alt={achievements?.[currentSlide]?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* Achievement Type Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${achievements?.[currentSlide]?.type === 'certification'
                          ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'
                        }`}>
                        {achievements?.[currentSlide]?.type === 'certification' ? 'Certification' : 'Achievement'}
                      </div>
                    </div>

                    {/* Verification Link */}
                    <div className="absolute bottom-4 right-4">
                      <a
                        href={achievements?.[currentSlide]?.verificationLink}
                        className="p-2 bg-background/90 backdrop-blur-sm rounded-lg text-foreground hover:bg-background transition-colors duration-200"
                        title="Verify Credential"
                      >
                        <Icon name="ExternalLink" size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon name={achievements?.[currentSlide]?.icon} size={20} className="text-primary" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {achievements?.[currentSlide]?.issuer} • {achievements?.[currentSlide]?.date}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-foreground leading-tight">
                        {achievements?.[currentSlide]?.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed">
                        {achievements?.[currentSlide]?.description}
                      </p>
                    </div>

                    {/* Skills Tags */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Key Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {achievements?.[currentSlide]?.skills?.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Credential ID */}
                    <div className="pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground font-mono">
                        ID: {achievements?.[currentSlide]?.credentialId}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/90 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-all duration-200 shadow-lg"
              aria-label="Previous achievement"
            >
              <Icon name="ChevronLeft" size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-background/90 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-all duration-200 shadow-lg"
              aria-label="Next achievement"
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {achievements?.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide
                    ? 'bg-primary scale-110' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 px-3 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name={isAutoPlaying ? "Pause" : "Play"} size={14} />
              <span>{isAutoPlaying ? "Pause" : "Play"} Auto-scroll</span>
            </button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            asChild
          >
            <Link to="/achievements-center-credibility-growth-documentation">
              View All Achievements & Certifications
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedAchievements;