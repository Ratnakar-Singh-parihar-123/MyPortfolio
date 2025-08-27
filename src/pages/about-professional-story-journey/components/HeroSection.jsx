import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import AboutImg from '../../../../public/assets/krishna.jpeg'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-muted/30 to-primary/5 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-accent/20 rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="User" size={16} />
                <span>About Me</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Coding,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {" "}not just for today{" "}
                </span>
                ,but for tomorrow.
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                I’m a passionate developer, driven by continuous learning and growth. For me, development isn’t just about writing code—it’s about solving real problems and creating meaningful impact through technology.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary">2+</div>
                <div className="text-sm text-muted-foreground">Years Learning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-secondary">15+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-accent">8+</div>
                <div className="text-sm text-muted-foreground">Technologies</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200">
                <Icon name="MessageCircle" size={18} />
                <span>Let's Connect</span>
              </button>
              <button className="inline-flex items-center justify-center space-x-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors duration-200">
                <Icon name="Download" size={18} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={AboutImg}
                  alt="Professional developer portrait"
                  className="w-full h-[500px] object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-background border border-border rounded-lg p-3 shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Available for work</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-background border border-border rounded-lg p-4 shadow-lg z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Code2" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-foreground">Currently Learning</div>
                    <div className="text-xs text-muted-foreground">DSA Patterns & Techniques</div>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;