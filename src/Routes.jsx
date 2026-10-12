// import React, { Suspense, lazy } from "react";
// import {
//   BrowserRouter,
//   Routes as RouterRoutes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import ScrollToTop from "components/ScrollToTop";
// import ErrorBoundary from "components/ErrorBoundary";
// import Loader from "components/Loader";
// import Header from "components/ui/Header";
// import Dock from "components/ui/Dock";
// import RoleBasedAccess from "pages/roleBasedDesign";

// const Homepage = lazy(() => import("./pages/homepage"));
// const ContactPage = lazy(() => import("./pages/contact"));
// const AchievementsPage = lazy(() => import("./pages/achievements"));
// const Skills = lazy(() => import("./pages/skills"));
// const Projects = lazy(() => import("./pages/projects"));
// const About = lazy(() => import("./pages/about"));
// const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
// const Experience = lazy(() => import("./pages/experience/experience"));
// const Education = lazy(() => import("./pages/education/education"));
// const NotFound = lazy(() => import("./pages/NotFound"));

// const AnimatedRoutes = () => {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <RouterRoutes location={location} key={location.pathname}>
//         <Route path="/" element={<Homepage />} />
//         <Route path="/contact" element={<ContactPage />} />
//         <Route path="/achievements" element={<AchievementsPage />} />
//         <Route path="/skills" element={<Skills />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/homepage" element={<Homepage />} />
//         <Route path="/blog" element={<BlogPage />} />
//         <Route path="/experience" element={<Experience />} />
//         <Route path="/education" element={<Education />} />
//         <Route path="/role/rolebasedaccess" element={<RoleBasedAccess />} />
//         <Route path="*" element={<NotFound />} />
//       </RouterRoutes>
//     </AnimatePresence>
//   );
// };

// const Routes = () => {
//   return (
//     <BrowserRouter>
//       <ErrorBoundary>
//         <ScrollToTop />
//         <Header />
//         <Suspense fallback={<Loader />}>
//           <AnimatedRoutes />
//         </Suspense>
//         <Dock />
//       </ErrorBoundary>
//     </BrowserRouter>
//   );
// };

// export default Routes;

import React, { Suspense, lazy } from "react";

import {
  BrowserRouter,
  Routes as RouterRoutes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import Loader from "components/Loader";
import Header from "components/ui/Header";
import Dock from "components/ui/Dock";

import RoleDashboardLayout from "./Layout/RoleDashboardLayout";

import DashboardOverview from "./pages/roleBasedDesign/components/DashboardOverview";
import ComingSoon from "./pages/roleBasedDesign/components/ComingSoon";
import LeetCodeProfile from "./pages/roleBasedDesign/components/LeetcodeProfile";
import ResumePage from "pages/roleBasedDesign/components/ResumePage";

// Existing portfolio pages
const Homepage = lazy(() => import("./pages/homepage"));
const ContactPage = lazy(() => import("./pages/contact"));
const AchievementsPage = lazy(() => import("./pages/achievements"));
const Skills = lazy(() => import("./pages/skills"));
const Projects = lazy(() => import("./pages/projects"));
const About = lazy(() => import("./pages/about"));
const BlogPage = lazy(() => import("./pages/blog/BlogPage"));
const Experience = lazy(() => import("./pages/experience/experience"));
const Education = lazy(() => import("./pages/education/education"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AnimatedRoutes = () => {
  const location = useLocation();

  // Hide the portfolio header on all dashboard pages
  const isDashboardRoute = location.pathname.startsWith("/role-dashboard");

  return (
    <>
      {!isDashboardRoute && <Header />}

      <AnimatePresence mode="wait">
        <RouterRoutes location={location} key={location.pathname}>
          {/* Portfolio routes */}
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

          {/* Role Dashboard */}
          <Route path="/role-dashboard" element={<RoleDashboardLayout />}>
            {/* Dashboard home */}
            <Route index element={<DashboardOverview />} />
            <Route path="resumes" element={<ResumePage />} />

            {/* LeetCode Profile */}
            <Route path="leetcode" element={<LeetCodeProfile />} />
            {/* <Route path="resumes" element={<ResumePage />} /> */}

            {/* Role Profiles */}
            <Route
              path="roles"
              element={<ComingSoon title="Role Profiles" />}
            />

            {/* Projects */}
            <Route path="projects" element={<ComingSoon title="Projects" />} />

            {/* Skills */}
            <Route
              path="skills"
              element={<ComingSoon title="Skills & Technologies" />}
            />

            {/* Experience */}
            <Route
              path="experience"
              element={<ComingSoon title="Experience & Education" />}
            />

            {/* Resume Center */}

            {/* Share Profile */}
            <Route
              path="share"
              element={<ComingSoon title="Share Profile & Contact" />}
            />

            {/* Legacy sidebar URL */}
            <Route
              path="contact"
              element={<Navigate to="/role-dashboard/share" replace />}
            />

            {/* Unknown dashboard page */}
            <Route
              path="*"
              element={<Navigate to="/role-dashboard" replace />}
            />
          </Route>

          {/* Legacy dashboard URL */}
          <Route
            path="/role/rolebasedaccess"
            element={<Navigate to="/role-dashboard" replace />}
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </AnimatePresence>
    </>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />

        <Suspense fallback={<Loader />}>
          <AnimatedRoutes />
        </Suspense>

        {/* Dock stays visible on portfolio and dashboard */}
        <Dock />
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
