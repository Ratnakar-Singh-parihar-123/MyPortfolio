import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import AchievementCard from "./components/AchievementCard";
import AchievementTimeline from "./components/AchievementTimeline";
import ImpactMetrics from "./components/ImpactMetrics";
import CategoryFilter from "./components/CategoryFilter";
import AchievementShare from "./components/AchievementShare";
import RecommendationPreview from "./components/RecommendationPreview";

const AchievementsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'timeline'
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "AWS Certified Solutions Architect",
      category: "certification",
      issuer: "Amazon Web Services",
      date: "2024-09-15",
      description:
        "Demonstrated expertise in designing distributed systems on AWS with focus on scalability, security, and cost optimization.",
      badge:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center",
      verificationLink: "https://aws.amazon.com/certification/verify",
      impact: "Led cloud migration projects saving 40% in infrastructure costs",
      skills: ["AWS", "Cloud Architecture", "DevOps", "Security"],
      type: "featured",
    },
    {
      id: 2,
      title: "React Advanced Certification",
      category: "certification",
      issuer: "Meta (Facebook)",
      date: "2024-08-20",
      description:
        "Advanced React development certification covering hooks, context, performance optimization, and modern React patterns.",
      badge:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop&crop=center",
      verificationLink: "https://developers.facebook.com/certification",
      impact:
        "Improved application performance by 60% using advanced React techniques",
      skills: ["React", "JavaScript", "Performance", "Testing"],
      type: "featured",
    },
    {
      id: 3,
      title: "E-commerce Platform Redesign",
      category: "project",
      issuer: "TechCorp Solutions",
      date: "2024-07-10",
      description:
        "Complete redesign and development of e-commerce platform serving 100K+ users with improved UX and conversion rates.",
      badge:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
      impact: "Increased conversion rate by 35% and reduced bounce rate by 25%",
      skills: ["React", "Node.js", "MongoDB", "Stripe API"],
      type: "featured",
    },
    {
      id: 4,
      title: "Developer of the Year 2024",
      category: "recognition",
      issuer: "Tech Excellence Awards",
      date: "2024-06-05",
      description:
        "Recognized for outstanding contributions to open-source projects and innovative solutions in web development.",
      badge:
        "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=100&h=100&fit=crop&crop=center",
      impact: "Open-source contributions used by 10K+ developers worldwide",
      skills: ["Leadership", "Open Source", "Mentoring", "Innovation"],
    },
    {
      id: 5,
      title: "Google Analytics Certified",
      category: "certification",
      issuer: "Google",
      date: "2024-05-18",
      description:
        "Comprehensive certification in Google Analytics 4, covering advanced tracking, reporting, and data analysis.",
      badge:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center",
      verificationLink: "https://skillshop.exceedlms.com/student/catalog",
      impact:
        "Improved client marketing ROI by 45% through data-driven insights",
      skills: ["Analytics", "Data Analysis", "Marketing", "Reporting"],
    },
    {
      id: 6,
      title: "Client Success Story - FinTech App",
      category: "client",
      issuer: "FinanceFlow Inc.",
      date: "2024-04-22",
      description:
        "Delivered a secure financial application with real-time transactions and comprehensive dashboard analytics.",
      badge:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop&crop=center",
      impact: "Processed $2M+ in transactions with 99.9% uptime",
      skills: ["React", "Security", "Real-time", "Financial APIs"],
    },
    {
      id: 7,
      title: "TypeScript Expert Certification",
      category: "certification",
      issuer: "Microsoft",
      date: "2024-03-15",
      description:
        "Advanced TypeScript certification demonstrating expertise in type systems, generics, and enterprise-scale applications.",
      badge:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop&crop=center",
      verificationLink:
        "https://docs.microsoft.com/en-us/learn/certifications/",
      impact: "Reduced production bugs by 70% through strong typing",
      skills: ["TypeScript", "JavaScript", "Type Safety", "Enterprise"],
    },
    {
      id: 8,
      title: "Accessibility Champion Award",
      category: "recognition",
      issuer: "Web Accessibility Initiative",
      date: "2024-02-28",
      description:
        "Recognized for exceptional commitment to web accessibility and inclusive design practices.",
      badge:
        "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop&crop=center",
      impact: "Made 50+ websites accessible to users with disabilities",
      skills: ["Accessibility", "WCAG", "Inclusive Design", "Testing"],
    },
  ];

  // Mock recommendations data
  const recommendations = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Product Manager",
      company: "TechCorp Solutions",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "Exceptional developer with deep technical knowledge and excellent communication skills. Delivered our e-commerce platform ahead of schedule.",
      date: "2024-08-15",
      skills: ["React", "Leadership", "Communication"],
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CTO",
      company: "FinanceFlow Inc.",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "Outstanding work on our financial application. The attention to security and performance was remarkable. Highly recommended!",
      date: "2024-07-20",
      skills: ["Security", "Performance", "FinTech"],
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Lead Designer",
      company: "Creative Studios",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      text: "Great collaboration on multiple projects. Brings designs to life with pixel-perfect implementation and smooth animations.",
      date: "2024-06-10",
      skills: ["Frontend", "Animation", "Collaboration"],
    },
    {
      id: 4,
      name: "David Kim",
      position: "Engineering Manager",
      company: "StartupXYZ",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      text: "Mentored our junior developers excellently while delivering high-quality code. A true team player and technical leader.",
      date: "2024-05-25",
      skills: ["Mentoring", "Leadership", "Code Quality"],
    },
  ];

  const categories = ["all", ...new Set(achievements.map((a) => a.category))];

  const filteredAchievements =
    activeCategory === "all"
      ? achievements
      : achievements?.filter((a) => a?.category === activeCategory);

  const handleShare = (achievement) => {
    setSelectedAchievement(achievement);
    setShareModalOpen(true);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>
          Achievements - PortfolioStudio | Professional Milestones & Recognition
        </title>
        <meta
          name="description"
          content="Explore my professional achievements, certifications, project successes, and industry recognition. A comprehensive showcase of milestones and accomplishments."
        />
        <meta
          name="keywords"
          content="achievements, certifications, awards, recognition, professional milestones, project success, developer achievements"
        />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container-brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center px-4 py-2 mb-6 space-x-2 text-sm font-medium rounded-full bg-primary/10 text-primary">
                <Icon name="Trophy" size={16} />
                <span>Achievement Trophy Room</span>
              </div>

              <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl text-foreground">
                Professional
                <span className="block text-gradient-brand">Achievements</span>
              </h1>

              <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                A comprehensive showcase of milestones, certifications, and
                recognition that demonstrate technical excellence, professional
                growth, and meaningful impact in the digital landscape.
              </p>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={16} />
                  <span>Updated {new Date()?.toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Award" size={16} />
                  <span>{achievements?.length} Total Achievements</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-16">
          <div className="container-brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Impact at a Glance
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Quantified achievements and measurable impact across various
                domains of expertise
              </p>
            </motion.div>

            <ImpactMetrics achievements={achievements} />
          </div>
        </section>

        {/* View Toggle & Category Filter */}
        <section className="py-8 border-t border-border">
          <div className="container-brand">
            <div className="flex flex-col items-center justify-between mb-8 space-y-4 lg:flex-row lg:space-y-0">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex p-1 rounded-lg bg-muted">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "grid"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} />
                    <span>Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("timeline")}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      viewMode === "timeline"
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon name="Clock" size={16} />
                    <span>Timeline</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Display */}
        <section className="pb-16">
          <div className="container-brand">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredAchievements?.map((achievement, index) => (
                  <div key={achievement?.id} className="relative">
                    <AchievementCard achievement={achievement} index={index} />
                    <button
                      onClick={() => handleShare(achievement)}
                      className="absolute p-2 transition-opacity rounded-lg opacity-0 top-4 right-4 bg-background/80 backdrop-blur-sm group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
                      title="Share Achievement"
                    >
                      <Icon name="Share2" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <AchievementTimeline achievements={filteredAchievements} />
            )}

            {filteredAchievements?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <Icon
                  name="Search"
                  size={48}
                  className="mx-auto mb-4 text-muted-foreground"
                />
                <h3 className="mb-2 text-lg font-medium text-foreground">
                  No achievements found
                </h3>
                <p className="text-muted-foreground">
                  Try selecting a different category to see more achievements.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="py-16 bg-muted/30">
          <div className="container-brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                What Others Say
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground">
                Testimonials and recommendations from colleagues, clients, and
                industry peers
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <RecommendationPreview recommendations={recommendations} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container-brand">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-8 text-center text-white bg-gradient-brand rounded-2xl md:p-12"
            >
              <Icon
                name="Rocket"
                size={48}
                className="mx-auto mb-6 opacity-90"
              />
              <h2 className="mb-4 text-3xl font-bold">
                Ready to Achieve More Together?
              </h2>
              <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
                Let's collaborate on your next project and create achievements
                worth celebrating. I bring proven expertise and a track record
                of delivering exceptional results.
              </p>
              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 space-x-2 font-medium transition-colors bg-white rounded-lg text-primary hover:bg-white/90"
                >
                  <Icon name="MessageCircle" size={20} />
                  <span>Start a Conversation</span>
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 space-x-2 font-medium text-white transition-colors border rounded-lg border-white/30 hover:bg-white/10"
                >
                  <Icon name="FolderOpen" size={20} />
                  <span>View My Work</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Share Modal */}
      {selectedAchievement && (
        <AchievementShare
          achievement={selectedAchievement}
          isOpen={shareModalOpen}
          onClose={() => {
            setShareModalOpen(false);
            setSelectedAchievement(null);
          }}
        />
      )}
      {/* Footer */}
      <footer className="py-8 border-t bg-muted/50 border-border">
        <div className="container-brand">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Trophy" size={16} />
              <span>
                © {new Date()?.getFullYear()} PortfolioStudio. All achievements
                verified.
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/contact"
                className="text-sm transition-colors text-muted-foreground hover:text-foreground"
              >
                Contact
              </a>
              <a
                href="/projects"
                className="text-sm transition-colors text-muted-foreground hover:text-foreground"
              >
                Projects
              </a>
              <a
                href="/skills"
                className="text-sm transition-colors text-muted-foreground hover:text-foreground"
              >
                Skills
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AchievementsPage;
