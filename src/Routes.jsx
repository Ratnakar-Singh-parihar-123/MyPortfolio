import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AboutProfessionalStoryJourney from './pages/about-professional-story-journey';
import AchievementsCenterPage from './pages/achievements-center-credibility-growth-documentation';
import HomepageDeveloperPortfolioHeroExperience from './pages/homepage-developer-portfolio-hero-experience';
// import ContactGatewayPage from './pages/contact-gateway-professional-connection-hub';
import MainContactInterface from './pages/main-contact-interface';

import TodoApp from './pages/skills-laboratory-interactive-technical-showcase';
import ProjectsGalleryDevelopmentPortfolioShowcase from './pages/projects-gallery-development-portfolio-showcase';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomepageDeveloperPortfolioHeroExperience />} />
        <Route path="/about-professional-story-journey" element={<AboutProfessionalStoryJourney />} />
        <Route path="/achievements-center-credibility-growth-documentation" element={<AchievementsCenterPage />} />
        <Route path="/homepage-developer-portfolio-hero-experience" element={<HomepageDeveloperPortfolioHeroExperience />} />
        <Route path="/contact-gateway-professional-connection-hub" element={<MainContactInterface />} />
        <Route path="/skills-laboratory-interactive-technical-showcase" element={<TodoApp />} />
        <Route path="/projects-gallery-development-portfolio-showcase" element={<ProjectsGalleryDevelopmentPortfolioShowcase />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;