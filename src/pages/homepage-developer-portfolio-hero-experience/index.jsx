import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SkillsPreview from './components/SkillsPreview';
import FeaturedAchievements from './components/FeaturedAchievements';
import CurrentlyLearning from './components/CurrentlyLearning';
import SocialProof from './components/SocialProof';
import Icon from '../../components/AppIcon';


const HomepageDeveloperPortfolioHeroExperience = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleSmoothScroll = (e) => {
      const target = e?.target?.getAttribute('href');
      if (target && target?.startsWith('#')) {
        e?.preventDefault();
        const element = document.querySelector(target);
        if (element) {
          element?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add event listeners for smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links?.forEach(link => {
      link?.addEventListener('click', handleSmoothScroll);
    });

    // Cleanup event listeners
    return () => {
      links?.forEach(link => {
        link?.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Ratnakar Singh Parihar - Full-Stack Developer & Problem Solver | Portfolio </title>
        <meta 
          name="description" 
          content="Experienced Full-Stack Developer specializing in React, JavaScript, and modern web technologies. Building scalable applications with clean, maintainable code. Available for new opportunities." 
        />
        <meta name="keywords" content="React Developer, Full-Stack Developer, JavaScript, TypeScript, Web Development, Frontend, Backend, Portfolio" />
        <meta name="author" content="Alex Chen" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Ratnakar Singh Parihar - Full-Stack Developer & Problem Solver" />
        <meta property="og:description" content="Experienced Full-Stack Developer specializing in React, JavaScript, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ratnakarparihar-portfolio.com" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ratnakar Singh Parihar - Full-Stack Developer & Problem Solver" />
        <meta name="twitter:description" content="Experienced Full-Stack Developer specializing in React, JavaScript, and modern web technologies." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=630&fit=crop&crop=face" />
        
        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://ratnakarparihar-portfolio.com" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ratnakar Singh Parihar",
            "jobTitle": "Full-Stack Developer & Problem Solver",
            "description": "Experienced Full-Stack Developer specializing in React, JavaScript, and modern web technologies",
            "url": "https://ratnakarparihar-portfolio.com",
            "sameAs": [
              "https://github.com/Ratnakar-Singh-parihar-123",
              "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
              "https://x.com/RatnakarSi85551"
            ],
            "knowsAbout": [
              "React",
              "JavaScript",
              "Java",
              "Node.js",
              "Full-Stack Development",
              "Web Development"
            ]
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="relative">
          {/* Hero Section */}
          <section id="hero">
            <HeroSection />
          </section>

          {/* Skills Preview Section */}
          <section id="skills-preview">
            <SkillsPreview />
          </section>

          {/* Featured Achievements Section */}
          <section id="achievements">
            <FeaturedAchievements />
          </section>

          {/* Currently Learning Section */}
          <section id="learning">
            <CurrentlyLearning />
          </section>

          {/* Social Proof Section */}
          <section id="social-proof">
            <SocialProof />
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand Section */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RSP</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-foreground">Ratnakar Singh Parihar</div>
                    <div className="text-sm text-muted-foreground">Full-Stack Developer</div>
                  </div>
                </div>
                <p className="text-muted-foreground max-w-md">
                  Passionate about creating exceptional digital experiences through clean code, 
                  innovative solutions, and continuous learning.
                </p>
                <div className="flex space-x-4">
                  {[
                    { name: 'Github', href: 'https://github.com/Ratnakar-Singh-parihar-123' },
                    { name: 'Linkedin', href: 'https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/' },
                    { name: 'Twitter', href: 'https://x.com/RatnakarSi85551' },
                    { name: 'Mail', href: 'ratnakarsinghparihar9399@gmail.com' }
                  ]?.map((social) => (
                    <a
                      key={social?.name}
                      href={social?.href}
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                      aria-label={social?.name}
                    >
                      <Icon name={social?.name} size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {[
                    { name: 'About', href: '/about-professional-story-journey' },
                    { name: 'Skills', href: '/skills-laboratory-interactive-technical-showcase' },
                    { name: 'Achievements', href: '/achievements-center-credibility-growth-documentation' },
                    { name: 'Contact', href: '/contact-gateway-professional-connection-hub' }
                  ]?.map((link) => (
                    <a
                      key={link?.name}
                      href={link?.href}
                      className="block text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link?.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Get In Touch
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span className="text-sm">India, Madhya Pradesh Bhopal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} />
                    <span className="text-sm">ratnakarsinghparihar9399@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} />
                    <span className="text-sm">+91 (939) 974-1051</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Ratnakar Singh Parihar. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-200">
                  Sitemap
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomepageDeveloperPortfolioHeroExperience;