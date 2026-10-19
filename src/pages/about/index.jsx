import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import ReadingProgressIndicator from "./components/ReadingProgressIndicator";
import Icon from "../../components/AppIcon";

const About = () => {
  useEffect(() => {
    // Set page title
    document.title = "About | Ratnakar Singh Parihar - Full-Stack Developer";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Learn more about Ratnakar Singh Parihar — Full-Stack & React Native Developer. Discover my journey, technical background, and passion for building scalable web & mobile apps.",
      );
    }

    // Scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* Page Content */}
      <main className="pt-0 pb-28">
        <HeroSection />
        <TimelineSection />
        <ReadingProgressIndicator />
      </main>

      {/* Footer */}
    </div>
  );
};

export default About;
