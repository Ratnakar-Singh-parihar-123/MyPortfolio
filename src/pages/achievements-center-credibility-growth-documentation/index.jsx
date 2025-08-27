import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import AchievementCard from './components/AchievementCard';
import CategoryFilter from './components/CategoryFilter';
import RecentWinsSection from './components/RecentWinsSection';
import ProgressTracker from './components/ProgressTracker';
import AchievementModal from './components/AchievementModal';
import StatsOverview from './components/StatsOverview';

const AchievementsCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "AWS Certified Developer - Associate",
      organization: "Amazon Web Services",
      category: "Technical Certifications",
      description: "Comprehensive certification covering AWS services, deployment, security, and troubleshooting for cloud applications.",
      completedDate: "2024-08-15",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      verified: true,
      isRecent: true,
      verificationUrl: "https://aws.amazon.com/verification",
      credentialId: "AWS-DEV-2024-001",
      validUntil: "2027-08-15",
      skills: ["AWS Lambda", "DynamoDB", "S3", "CloudFormation", "API Gateway"],
      learningStory: `This certification journey was intense but rewarding. I spent 3 months diving deep into AWS services, building hands-on projects, and understanding cloud architecture patterns. The exam challenged my practical knowledge of serverless computing and infrastructure as code.`,
      socialProof: "Demonstrated exceptional understanding of AWS development practices and cloud-native application design.",
      score: "892/1000"
    },
    {
      id: 2,
      title: "React Advanced Patterns Certification",
      organization: "Meta (Facebook)",
      category: "Technical Certifications",
      description: "Advanced React certification covering hooks, context, performance optimization, and modern development patterns.",
      completedDate: "2024-07-22",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      verified: true,
      isRecent: true,
      verificationUrl: "https://developers.facebook.com/certification",
      credentialId: "META-REACT-2024-045",
      skills: ["React Hooks", "Context API", "Performance Optimization", "Testing", "TypeScript"],
      learningStory: `Building complex React applications taught me the importance of component composition and state management. This certification validated my expertise in modern React patterns and best practices.`,
      socialProof: "Showcased mastery of advanced React concepts and modern frontend development practices."
    },
    {
      id: 3,
      title: "Full Stack Web Development Bootcamp",
      organization: "The Odin Project",
      category: "Educational Achievements",
      description: "Comprehensive full-stack development program covering frontend, backend, databases, and deployment strategies.",
      completedDate: "2024-06-10",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      verified: true,
      isRecent: false,
      verificationUrl: "https://theodinproject.com/certificates",
      skills: ["HTML/CSS", "JavaScript", "Node.js", "Express", "MongoDB", "Git"],
      learningStory: `This intensive bootcamp transformed me from a beginner to a confident full-stack developer. The project-based learning approach helped me build real-world applications and understand the complete development lifecycle.`,
      socialProof: "Completed with distinction, demonstrating strong problem-solving skills and technical proficiency."
    },
    {
      id: 4,
      title: "E-Commerce Platform Launch",
      organization: "Personal Project",
      category: "Project Milestones",
      description: "Successfully launched a full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.",
      completedDate: "2024-05-28",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      verified: false,
      isRecent: false,
      skills: ["React", "Node.js", "Stripe API", "JWT", "MongoDB"],
      learningStory: `Building this e-commerce platform from scratch was my biggest challenge yet. I learned about payment processing, security best practices, and scalable architecture design. The project now serves real customers and processes actual transactions.`,
      socialProof: "Successfully deployed and maintained with 99.9% uptime and positive user feedback."
    },
    {
      id: 5,
      title: "Open Source Contributor - React Router",
      organization: "Remix (React Router)",
      category: "Community Contributions",
      description: "Contributed bug fixes and feature improvements to React Router, one of the most popular React libraries.",
      completedDate: "2024-04-15",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
      verified: true,
      isRecent: false,
      verificationUrl: "https://github.com/remix-run/react-router/contributors",
      skills: ["React", "TypeScript", "Testing", "Documentation"],
      learningStory: `Contributing to React Router taught me about large-scale open source development. I learned to write clean, well-tested code and collaborate with maintainers from around the world. My contributions helped improve the library for thousands of developers.`,
      socialProof: "Recognized by maintainers for high-quality contributions and attention to detail."
    },
    {
      id: 6,
      title: "JavaScript Algorithms and Data Structures",
      organization: "freeCodeCamp",
      category: "Educational Achievements",
      description: "Comprehensive course covering fundamental algorithms, data structures, and problem-solving techniques in JavaScript.",
      completedDate: "2024-03-20",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
      verified: true,
      isRecent: false,
      verificationUrl: "https://freecodecamp.org/certification",
      credentialId: "FCC-JS-ALG-2024-789",
      skills: ["JavaScript", "Algorithms", "Data Structures", "Problem Solving"],
      learningStory: `This course strengthened my computer science fundamentals. Learning algorithms and data structures improved my problem-solving approach and made me a more efficient programmer. The hands-on challenges were particularly valuable.`,
      socialProof: "Completed all 300+ coding challenges with optimal solutions and clean code practices."
    },
    {
      id: 7,
      title: "Mentorship Program Completion",
      organization: "ADPList",
      category: "Community Contributions",
      description: "Completed a structured mentorship program, helping junior developers transition into tech careers.",
      completedDate: "2024-02-14",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      verified: true,
      isRecent: false,
      verificationUrl: "https://adplist.org/mentors",
      skills: ["Mentoring", "Communication", "Career Guidance", "Technical Leadership"],
      learningStory: `Mentoring others reinforced my own knowledge while helping newcomers navigate their tech journey. I guided 5 mentees through career transitions, resume reviews, and technical interviews. Seeing their success was incredibly rewarding.`,
      socialProof: "Received 5-star ratings from all mentees with testimonials highlighting impact on their careers."
    },
    {
      id: 8,
      title: "Google Analytics Certified",
      organization: "Google",
      category: "Technical Certifications",
      description: "Certification in Google Analytics covering data analysis, reporting, and digital marketing insights.",
      completedDate: "2024-01-30",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      verified: true,
      isRecent: false,
      verificationUrl: "https://skillshop.exceedlms.com/student/catalog",
      credentialId: "GOOGLE-GA-2024-456",
      validUntil: "2025-01-30",
      skills: ["Google Analytics", "Data Analysis", "Digital Marketing", "Reporting"],
      learningStory: `Understanding user behavior through analytics became crucial for my web development projects. This certification taught me how to make data-driven decisions and optimize user experiences based on real metrics.`,
      socialProof: "Applied analytics insights to improve website performance by 40% across multiple projects."
    }
  ];

  // Mock progress tracking data
  const progressData = [
    {
      category: "Cloud Certifications",
      description: "Building expertise in cloud platforms and services",
      items: [
        { title: "AWS Developer Associate", provider: "Amazon", status: "completed", targetDate: "Aug 2024" },
        { title: "AWS Solutions Architect", provider: "Amazon", status: "in-progress", targetDate: "Dec 2024" },
        { title: "Azure Fundamentals", provider: "Microsoft", status: "planned", targetDate: "Mar 2025" },
        { title: "Google Cloud Associate", provider: "Google", status: "planned", targetDate: "Jun 2025" }
      ]
    },
    {
      category: "Frontend Mastery",
      description: "Advanced frontend development skills and frameworks",
      items: [
        { title: "React Advanced Patterns", provider: "Meta", status: "completed", targetDate: "Jul 2024" },
        { title: "Next.js Certification", provider: "Vercel", status: "in-progress", targetDate: "Oct 2024" },
        { title: "Vue.js Certification", provider: "Vue School", status: "planned", targetDate: "Jan 2025" },
        { title: "TypeScript Deep Dive", provider: "Microsoft", status: "planned", targetDate: "Apr 2025" }
      ]
    },
    {
      category: "Backend & DevOps",
      description: "Server-side development and deployment expertise",
      items: [
        { title: "Node.js Certification", provider: "OpenJS Foundation", status: "in-progress", targetDate: "Nov 2024" },
        { title: "Docker Certified Associate", provider: "Docker", status: "planned", targetDate: "Feb 2025" },
        { title: "Kubernetes Administrator", provider: "CNCF", status: "planned", targetDate: "May 2025" }
      ]
    }
  ];

  const categories = ['All', 'Technical Certifications', 'Educational Achievements', 'Project Milestones', 'Community Contributions'];

  const getAchievementCounts = () => {
    const counts = { 'All': achievements?.length };
    categories?.slice(1)?.forEach(category => {
      counts[category] = achievements?.filter(a => a?.category === category)?.length;
    });
    return counts;
  };

  const getFilteredAchievements = () => {
    let filtered = achievements;
    
    if (activeCategory !== 'All') {
      filtered = filtered?.filter(achievement => achievement?.category === activeCategory);
    }
    
    if (searchTerm) {
      filtered = filtered?.filter(achievement =>
        achievement?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        achievement?.organization?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        achievement?.skills?.some(skill => skill?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const getRecentAchievements = () => {
    return achievements?.filter(achievement => achievement?.isRecent)?.sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate))?.slice(0, 6);
  };

  const handleViewDetails = (achievement) => {
    setSelectedAchievement(achievement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAchievement(null);
  };

  const filteredAchievements = getFilteredAchievements();
  const recentAchievements = getRecentAchievements();
  const achievementCounts = getAchievementCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Helmet>
        <title>Achievements Center - Credibility & Growth Documentation | Portfolio Pro</title>
        <meta name="description" content="Comprehensive documentation of verified accomplishments, certifications, and continuous professional development milestones showcasing technical expertise and growth." />
        <meta name="keywords" content="achievements, certifications, professional development, technical skills, credentials, portfolio" />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Icon name="Award" size={40} className="text-white" />
                <h1 className="text-4xl md:text-5xl font-bold">
                  Achievements Center
                </h1>
              </div>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Comprehensive documentation of verified accomplishments, certifications, and continuous 
                professional development milestones showcasing technical expertise and growth journey.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={20} />
                  <span>Verified Credentials</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="TrendingUp" size={20} />
                  <span>Continuous Growth</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={20} />
                  <span>Goal-Oriented Learning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Stats Overview */}
          <StatsOverview achievements={achievements} />

          {/* Recent Wins Section */}
          <RecentWinsSection 
            recentAchievements={recentAchievements}
            onViewDetails={handleViewDetails}
          />

          {/* Progress Tracker */}
          <ProgressTracker progressData={progressData} />

          {/* Search and Filter Section */}
          <div className="mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Icon name="Search" size={24} />
                  <span>Explore Achievements</span>
                </h2>
                
                <div className="relative max-w-md w-full">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search achievements, skills, or organizations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              achievementCounts={achievementCounts}
            />
          </div>

          {/* Achievements Grid */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeCategory === 'All' ? 'All Achievements' : activeCategory}
              </h2>
              <div className="text-sm text-gray-600">
                {filteredAchievements?.length} {filteredAchievements?.length === 1 ? 'achievement' : 'achievements'} found
              </div>
            </div>

            {filteredAchievements?.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements?.map((achievement) => (
                  <AchievementCard
                    key={achievement?.id}
                    achievement={achievement}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icon name="Search" size={64} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No achievements found
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? `No achievements match "${searchTerm}". Try adjusting your search terms.`
                    : `No achievements found in the ${activeCategory} category.`
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('All');
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Clear filters and show all achievements
                </button>
              </div>
            )}
          </section>

          {/* Call to Action */}
          <section className="mt-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build Something Amazing Together?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              These achievements represent my commitment to continuous learning and technical excellence. 
              Let's discuss how I can bring this expertise to your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="/contact-gateway-professional-connection-hub"
                className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="MessageCircle" size={20} />
                <span>Let's Connect</span>
              </a>
              <a
                href="/skills-laboratory-interactive-technical-showcase"
                className="inline-flex items-center space-x-2 bg-white text-primary border border-primary px-6 py-3 rounded-lg hover:bg-primary/5 transition-colors duration-200"
              >
                <Icon name="Code" size={20} />
                <span>View Skills</span>
              </a>
            </div>
          </section>
        </div>
      </main>
      {/* Achievement Modal */}
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Code2" size={18} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold">Portfolio Pro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Showcasing technical excellence through verified achievements and continuous professional development.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Icon name="Github" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Icon name="Linkedin" size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Icon name="Twitter" size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/homepage-developer-portfolio-hero-experience" className="hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href="/about-professional-story-journey" className="hover:text-white transition-colors duration-200">About</a></li>
                <li><a href="/skills-laboratory-interactive-technical-showcase" className="hover:text-white transition-colors duration-200">Skills</a></li>
                <li><a href="/contact-gateway-professional-connection-hub" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Achievements</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Technical Certifications</li>
                <li>Educational Achievements</li>
                <li>Project Milestones</li>
                <li>Community Contributions</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date()?.getFullYear()} Portfolio Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AchievementsCenterPage;