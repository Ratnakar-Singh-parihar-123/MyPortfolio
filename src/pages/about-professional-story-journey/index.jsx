import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import JourneyTimeline from './components/JourneyTimeline';
// import WorkingPhilosophy from './components/WorkingPhilosophy';
import BeyondCode from './components/BeyondCode';
// import WhatsNext from './components/WhatsNext';

const AboutProfessionalStoryJourney = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <link rel="icon" href="/about.png" />
        <title>About - Learning, Building, Growing | Portfolio </title>
        <meta
          name="description"
          content="Discover my development journey from curiosity to competence. Learn about my working philosophy, personal interests, and career aspirations as a passionate developer committed to continuous growth and meaningful impact."
        />
        <meta name="keywords" content="developer story, professional journey, working philosophy, career goals, personal interests, growth mindset, collaboration, technical skills" />
        <meta property="og:title" content="About - Professional Story & Journey | Portfolio Pro" />
        <meta property="og:description" content="From first line of code to future aspirations - explore my authentic development journey and what drives me as a developer." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about-professional-story-journey" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Journey Timeline */}
          <JourneyTimeline />

          {/* Working Philosophy */}
          {/* <WorkingPhilosophy /> */}

          {/* Beyond Code */}
          <BeyondCode />

          {/* What's Next */}
          {/* <WhatsNext /> */}
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-background py-12">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">P</span>
                  </div>
                  <span className="text-xl font-bold">Portfolio</span>
                </div>
                <p className="text-background/80 text-sm">
                  Coding, not just for today ,but for tomorrow.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h4 className="font-semibold text-background">Quick Links</h4>
                <div className="space-y-2 text-sm">
                  <div><a href="/" className="text-background/80 hover:text-background transition-colors">Home</a></div>
                  <div><a href="/skills-laboratory-interactive-technical-showcase" className="text-background/80 hover:text-background transition-colors">Skills</a></div>
                  <div><a href="/projects-gallery-development-portfolio-showcase" className="text-background/80 hover:text-background transition-colors">Projects</a></div>
                  <div><a href="/achievements-center-credibility-growth-documentation" className="text-background/80 hover:text-background transition-colors">Achievements</a></div>
                  <div><a href="/contact-gateway-professional-connection-hub" className="text-background/80 hover:text-background transition-colors">Contact</a></div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-background">Let's Connect</h4>
                <div className="space-y-2 text-sm text-background/80">
                  <div>Available for opportunities</div>
                  <div>Open to collaboration</div>
                  <div>Always learning, always growing</div>
                </div>
              </div>
            </div>

            <div className="border-t border-background/20 mt-8 pt-8 text-center">
              <p className="text-background/60 text-sm">
                © {new Date()?.getFullYear()} Portfolio. Built with passion and continuous learning.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutProfessionalStoryJourney;