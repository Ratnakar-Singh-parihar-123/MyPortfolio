import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContactPage from './pages/contact';
import AchievementsPage from './pages/achievements';
import Skills from './pages/skills';
import Projects from './pages/projects';
import About from './pages/about';
import Homepage from './pages/homepage';
import BlogPage from "./pages/blog/BlogPage";
import Experience from "./pages/experience/experience";
import Education from "./pages/education/education"

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education/>}/>
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
