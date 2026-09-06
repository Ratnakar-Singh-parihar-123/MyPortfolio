import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Loader from "components/Loader";

const Homepage = lazy(() => import('./pages/homepage'));
const ContactPage = lazy(() => import('./pages/contact'));
const AchievementsPage = lazy(() => import('./pages/achievements'));
const Skills = lazy(() => import('./pages/skills'));
const Projects = lazy(() => import('./pages/projects'));
const About = lazy(() => import('./pages/about'));
const BlogPage = lazy(() => import('./pages/blog/BlogPage'));
const Experience = lazy(() => import('./pages/experience/experience'));
const Education = lazy(() => import('./pages/education/education'));
const NotFound = lazy(() => import('./pages/NotFound'));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
          <RouterRoutes>
            <Route path="/" element={<Homepage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
