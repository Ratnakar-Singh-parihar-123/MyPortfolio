import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SkillPreviewSection from './components/SkillPreviewSection';
import ProjectShowcaseSection from './components/ProjectShowcaseSection';
import CertificatesSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import FloatingActionButton from './components/FloatingActionButton';
import ReaalSections from './components/VideoModel';


const Homepage = () => {
  useEffect(() => {
    // Set page title
    document.title = 'Ratnakar Singh Parihar - Full-Stack Developer & Problem Solver ';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 'Full-Stack Developer & Problem Solver passionate about creating exceptional digital experiences. Specializing in React, Node.js, and modern web technologies.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Full-Stack Developer & Problem Solver UI/Ux passionate about creating exceptional digital experiences. Specializing in React, Node.js, and modern web technologies.';
      document.getElementsByTagName('head')?.[0]?.appendChild(meta);
    }

    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ratnakar Singh Parihar",
      "jobTitle": "Full-Stack Developer & UI/UX Designer",
      "description": "Full-Stack Developer & UI/UX Designer passionate about creating exceptional digital experiences",
      "url": "",
      "sameAs": [
        "https://github.com/Ratnakar-Singh-parihar-123",
        "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
        "https://x.com/RatnakarSi85551"
      ],
      "knowsAbout": ["React", "Node.js", "JavaScript", "UI/UX Design", "Full-Stack Development"],
      "alumniOf": "Tech University",
      "worksFor": {
        "@type": "Organization",
        "name": "PortfolioStudio"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.getElementsByTagName('head')?.[0]?.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript?.remove();
      }
    };
  }, []);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-background"
    >
      {/* Header Navigation */}
      <Header />
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* // reel sections  */}
        {/* <ReaalSections /> */}

        {/* Skills Preview Section */}
        <SkillPreviewSection />

        {/* Project Showcase Section */}
        <ProjectShowcaseSection />

        {/* Certificates Section */}
        <CertificatesSection />

        {/* Call-to-Action Section */}
        <CTASection />
      </main>
      {/* Floating Action Button */}
      <FloatingActionButton />
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
      {/* Scroll restoration */}
      <div id="main-content" className="sr-only">Main content starts here</div>
    </motion.div>
  );
};

export default Homepage;