import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import HeroImg from '../../../../public/assets/krishna.jpeg';
import ResumeActions from 'components/ui/ResumeActions';

const HeroSection = () => {
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const codeLines = [
    "const developer = new Developer();",
    "developer.setPassion('React & JavaScript');",
    "developer.addSkill('Problem Solving');",
    "developer.build('Amazing Experiences');"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCodeLine((prev) => (prev + 1) % codeLines?.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-secondary/20 rounded-lg rotate-45"></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-accent/20 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-20 h-20 border border-primary/20 rounded-lg rotate-12"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                  <span>Available for opportunities</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>India, Madhya Pradesh Bhopal</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ratnakar Singh Parihar
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
                Full-Stack Developer & Problem Solver..
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                I’m a final-year Computer Science student passionate about building modern and scalable web applications. With hands-on experience through projects, I blend technical learning with creative problem-solving to craft impactful digital experiences. Currently focused on mastering the React ecosystem and full-stack development.
              </p>
            </motion.div>

            {/* Floating Code Snippet */}
            <motion.div
              variants={itemVariants}
              className="relative bg-card border border-border rounded-lg p-4 font-mono text-sm shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-muted-foreground text-xs">currently-learning.js</span>
                </div>
                <Icon name="Code2" size={16} className="text-primary" />
              </div>
              <div className="space-y-1">
                {codeLines?.map((line, index) => (
                  <motion.div
                    key={index}
                    className={`transition-all duration-500 ${index === currentCodeLine
                        ? 'text-primary font-medium' : 'text-muted-foreground'
                      }`}
                    animate={{
                      scale: index === currentCodeLine ? 1.02 : 1,
                      x: index === currentCodeLine ? 4 : 0
                    }}
                  >
                    <span className="text-accent mr-2">{'>'}</span>
                    {line}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageCircle"
                iconPosition="left"
                asChild
              >
                <Link to="/contact-gateway-professional-connection-hub">
                  Let's Build Together
                </Link>
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
              >
                Download Resume
              </Button> */}
              <ResumeActions />

            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Connect with me:</span>
              <div className="flex space-x-3">
                {[
                  { icon: 'Github', href: 'https://github.com/Ratnakar-Singh-parihar-123', label: 'GitHub' },
                  { icon: 'Linkedin', href: 'https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/', label: 'LinkedIn' },
                  { icon: 'Twitter', href: 'https://x.com/RatnakarSi85551', label: 'Twitter' },
                  { icon: 'Mail', href: 'ratnakarsinghparihar9399@gmail.com', label: 'Email' }
                ]?.map((social) => (
                  <a
                    key={social?.icon}
                    href={social?.href}
                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200 transform hover:scale-110"
                    aria-label={social?.label}
                  >
                    <Icon name={social?.icon} size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Profile Image */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative mx-auto w-80 h-80 lg:w-96 lg:h-96">
              {/* Animated Background Elements */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full"
                animate={{
                  rotate: 360,
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              <motion.div
                className="absolute inset-4 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full"
                animate={{
                  rotate: -360,
                  scale: [1.05, 1, 1.05]
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              />

              {/* Profile Image */}
              <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  src={HeroImg}
                  alt="Ratnakar Singh Parihar - Full-Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Skills Badges */}
              <motion.div
                className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Java
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Problem Solver
              </motion.div>

              <motion.div
                className="absolute top-1/2 -left-8 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                animate={{ x: [-5, 5, -5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                JavaScript
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 text-muted-foreground">
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Icon name="ChevronDown" size={20} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;