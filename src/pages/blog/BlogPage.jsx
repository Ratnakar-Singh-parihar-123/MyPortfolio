import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import Header from "../../components/ui/Header";

const BlogPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [readArticles, setReadArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Listen for theme changes from Header
  useEffect(() => {
    const handleThemeChange = (e) => {
      setDarkMode(e.detail.isDark);
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
    
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const blogCategories = [
    { id: "all", name: "All Posts", count: 32, icon: "Sparkles", gradient: "from-blue-500 to-cyan-500" },
    { id: "dsa", name: "DSA Mastery", count: 15, icon: "Cpu", gradient: "from-emerald-500 to-teal-400" },
    { id: "projects", name: "Live Projects", count: 9, icon: "Rocket", gradient: "from-purple-500 to-pink-500" },
    { id: "career", name: "Career Growth", count: 8, icon: "TrendingUp", gradient: "from-amber-500 to-orange-500" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Complete DSA Roadmap: From Zero to 260+ LeetCode Problems",
      excerpt: "How I systematically solved 260+ LeetCode and 200+ GFG problems while building a strong foundation in algorithms and data structures.",
      category: "dsa",
      readTime: "12 min read",
      date: "Apr 10, 2024",
      views: "2.1k",
      likes: 412,
      comments: 68,
      tags: ["LeetCode", "Algorithms", "Problem Solving", "Data Structures", "Roadmap"],
      featured: true,
      level: "Advanced",
      difficulty: "Hard",
      progress: 95,
      color: "bg-gradient-to-br from-emerald-500 to-teal-500",
      author: "Ratnakar Singh",
      content: "Detailed strategies, study plans, and key patterns..."
    },
    {
      id: 2,
      title: "Building Production-Ready Applications: My Full-Stack Internship Journey",
      excerpt: "From concept to deployment - complete breakdown of building scalable applications during my internship with real user traffic.",
      category: "projects",
      readTime: "15 min read",
      date: "Apr 5, 2024",
      views: "1.8k",
      likes: 356,
      comments: 52,
      tags: ["Full-Stack", "React", "Node.js", "MongoDB", "Deployment", "AWS"],
      featured: true,
      level: "Intermediate",
      difficulty: "Medium",
      progress: 92,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      author: "Ratnakar Singh",
      content: "Architecture decisions, challenges faced, and lessons learned..."
    },
    {
      id: 3,
      title: "System Design Decoded: From Monolith to Scalable Architecture",
      excerpt: "Practical guide to designing scalable systems with real examples from my internship projects handling thousands of requests.",
      category: "projects",
      readTime: "18 min read",
      date: "Mar 30, 2024",
      views: "2.4k",
      likes: 498,
      comments: 74,
      tags: ["System Design", "Scalability", "Microservices", "Database Design", "Caching"],
      featured: true,
      level: "Advanced",
      difficulty: "Hard",
      progress: 94,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      author: "Ratnakar Singh",
      content: "Step-by-step system design approach with trade-offs..."
    },
    {
      id: 4,
      title: "Balancing Final Year: Academics, Projects & Job Search",
      excerpt: "Effective strategies for managing time between college, personal projects, DSA practice, and internship preparation.",
      category: "career",
      readTime: "8 min read",
      date: "Mar 25, 2024",
      views: "1.2k",
      likes: 278,
      comments: 36,
      tags: ["Time Management", "Productivity", "Student Life", "Focus", "Balance"],
      level: "All Levels",
      difficulty: "Easy",
      progress: 100,
      color: "bg-gradient-to-br from-amber-500 to-orange-500",
      author: "Ratnakar Singh"
    },
    {
      id: 5,
      title: "React Patterns for Scalable Applications",
      excerpt: "Advanced React patterns and practices learned from building complex production applications during my internship.",
      category: "projects",
      readTime: "14 min read",
      date: "Mar 20, 2024",
      views: "1.6k",
      likes: 324,
      comments: 48,
      tags: ["React", "Performance", "Code Architecture", "Best Practices", "Hooks"],
      level: "Intermediate",
      difficulty: "Medium",
      progress: 88,
      color: "bg-gradient-to-br from-indigo-500 to-blue-500",
      author: "Ratnakar Singh"
    },
    {
      id: 6,
      title: "Cracking Technical Interviews: My Complete Preparation Strategy",
      excerpt: "3-month intensive preparation plan that helped me secure multiple internship offers with detailed resources and schedule.",
      category: "career",
      readTime: "16 min read",
      date: "Mar 15, 2024",
      views: "3.2k",
      likes: 645,
      comments: 92,
      tags: ["Interviews", "Preparation", "Strategy", "Resources", "Mock Tests"],
      featured: true,
      level: "All Levels",
      difficulty: "Medium",
      progress: 96,
      color: "bg-gradient-to-br from-rose-500 to-pink-500",
      author: "Ratnakar Singh"
    },
    {
      id: 7,
      title: "Backend Optimization Techniques for High-Traffic Apps",
      excerpt: "Lessons from optimizing backend systems to handle thousands of concurrent users during my internship.",
      category: "projects",
      readTime: "11 min read",
      date: "Mar 10, 2024",
      views: "1.4k",
      likes: 298,
      comments: 42,
      tags: ["Backend", "Optimization", "Performance", "Node.js", "Database"],
      level: "Advanced",
      difficulty: "Hard",
      progress: 90,
      color: "bg-gradient-to-br from-violet-500 to-purple-500",
      author: "Ratnakar Singh"
    },
    {
      id: 8,
      title: "From College to Corporate: Bridging the Gap",
      excerpt: "Practical advice on transitioning from academic projects to industry-standard development practices.",
      category: "career",
      readTime: "9 min read",
      date: "Mar 5, 2024",
      views: "1.1k",
      likes: 256,
      comments: 34,
      tags: ["Transition", "Industry", "Skills", "Learning", "Growth"],
      level: "Beginner",
      difficulty: "Easy",
      progress: 100,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      author: "Ratnakar Singh"
    },
    {
      id: 9,
      title: "Dynamic Programming Patterns Demystified",
      excerpt: "20 essential DP patterns with real problem examples and optimization techniques.",
      category: "dsa",
      readTime: "20 min read",
      date: "Feb 28, 2024",
      views: "2.8k",
      likes: 532,
      comments: 78,
      tags: ["Dynamic Programming", "Algorithms", "Optimization", "Patterns", "LeetCode"],
      featured: true,
      level: "Advanced",
      difficulty: "Hard",
      progress: 93,
      color: "bg-gradient-to-br from-cyan-500 to-blue-500",
      author: "Ratnakar Singh"
    },
    {
      id: 10,
      title: "Git Workflow for Team Collaboration",
      excerpt: "Professional Git practices and workflows learned from working on team projects during internship.",
      category: "projects",
      readTime: "10 min read",
      date: "Feb 22, 2024",
      views: "950",
      likes: 214,
      comments: 28,
      tags: ["Git", "Collaboration", "Workflow", "Best Practices", "CI/CD"],
      level: "Intermediate",
      difficulty: "Medium",
      progress: 85,
      color: "bg-gradient-to-br from-gray-700 to-gray-900",
      author: "Ratnakar Singh"
    },
  ];

  const achievements = [
    { icon: "Code", value: "260+", label: "LeetCode Solved", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { icon: "Database", value: "200+", label: "GFG Questions", color: "text-blue-400", bg: "bg-blue-500/10" },
    { icon: "Rocket", value: "4+", label: "Live Projects", color: "text-purple-400", bg: "bg-purple-500/10" },
    { icon: "Award", value: "5★", label: "Problem Solving", color: "text-amber-400", bg: "bg-amber-500/10" },
    { icon: "BookOpen", value: "32+", label: "Articles", color: "text-rose-400", bg: "bg-rose-500/10" },
    { icon: "Users", value: "2.5k+", label: "Readers", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeTab === "all" || post.category === activeTab;
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleBookmark = (id) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(bookmarkedArticles.filter(articleId => articleId !== id));
    } else {
      setBookmarkedArticles([...bookmarkedArticles, id]);
    }
  };

  const handleRead = (id) => {
    if (!readArticles.includes(id)) {
      setReadArticles([...readArticles, id]);
    }
    const post = blogPosts.find(p => p.id === id);
    setSelectedPost(post);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-500/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-900';
      case 'medium': return 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900';
      case 'hard': return 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  const PostModal = ({ post, onClose }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
            darkMode ? 'bg-gray-900' : 'bg-white'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <h2 className="text-2xl font-bold">{post.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`px-3 py-1.5 rounded-full text-sm font-bold border ${getDifficultyColor(post.difficulty)}`}>
                {post.difficulty}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Icon name="Clock" size={16} />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Icon name="Calendar" size={16} />
                {post.date}
              </div>
            </div>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">Content Preview</h3>
                <p>This article covers detailed strategies and insights from my journey. The full content includes step-by-step guides, code examples, and practical implementation advice.</p>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <Button
                  variant="gradient"
                  className="bg-gradient-to-r from-blue-500 to-purple-500"
                >
                  Read Full Article
                </Button>
                <Button
                  variant="outline"
                  iconName={bookmarkedArticles.includes(post.id) ? "BookmarkCheck" : "Bookmark"}
                  onClick={() => handleBookmark(post.id)}
                >
                  {bookmarkedArticles.includes(post.id) ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950' 
        : 'bg-gradient-to-b from-gray-50 via-white to-gray-50/50'
    }`}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🚀 Final Year CS Student • 260+ LeetCode • Live Projects
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="block text-gray-900 dark:text-white">Developer</span>
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Chronicles
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Documenting the journey from solving <span className="font-bold text-emerald-600 dark:text-emerald-400">260+ LeetCode</span> problems to building production applications. Real experiences, practical insights.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-2xl mx-auto mb-12"
            >
              <div className="relative">
                <Icon
                  name="Search"
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 z-10"
                  size={24}
                />
                <input
                  type="text"
                  placeholder="Search articles on DSA, System Design, React, Node.js, Interview prep..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-12 py-4 text-lg rounded-2xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl focus:border-blue-500 focus:ring-3 focus:ring-blue-500/30 outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Icon name="X" size={20} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`${achievement.bg} backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-800/50 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-2.5 rounded-xl ${achievement.bg} mb-2`}>
                      <Icon name={achievement.icon} size={20} className={achievement.color} />
                    </div>
                    <div className={`text-2xl font-bold ${achievement.color} mb-1`}>
                      {achievement.value}
                    </div>
                    <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {achievement.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className={`rounded-2xl border ${
                  darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'
                } p-6 shadow-lg backdrop-blur-sm`}>
                  <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Icon name="Sparkles" size={20} className="text-white" />
                    </div>
                    <span>Explore Topics</span>
                  </h3>
                  <div className="space-y-2">
                    {blogCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`group flex items-center justify-between w-full p-3.5 rounded-xl transition-all duration-300 ${
                          activeTab === category.id
                            ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                            : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={category.icon} size={20} />
                          <span className="font-semibold">{category.name}</span>
                        </div>
                        <span className={`text-sm px-2.5 py-1 rounded-full font-bold ${
                          activeTab === category.id
                            ? "bg-white/20"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Author Card */}
                <div className="relative overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10" />
                  <div className={`relative backdrop-blur-sm p-6 border ${
                    darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white/80'
                  }`}>
                    <div className="flex items-center gap-4 mb-5">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <Icon name="User" size={28} className="text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 shadow-lg">
                          <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Ratnakar Singh</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Final Year CS Student</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                          🔥 Actively Seeking Opportunities
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 leading-relaxed">
                      Documenting my journey through DSA mastery, production projects, and career growth. Passionate about solving complex problems and building scalable applications.
                    </p>
                    <Button
                      variant="gradient"
                      size="sm"
                      iconName="MessageCircle"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    >
                      Connect with Me
                    </Button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="lg:w-3/4">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          Featured
                        </span> Deep Dives
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Comprehensive guides with detailed breakdowns and code examples
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-200 dark:border-amber-800/30">
                      <Icon name="Star" className="text-amber-600 dark:text-amber-400" size={28} />
                    </div>
                  </div>
                  
                  <div className="grid lg:grid-cols-2 gap-8">
                    {featuredPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5 }}
                        className="group cursor-pointer"
                        onClick={() => handleRead(post.id)}
                      >
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-500 group-hover:shadow-2xl bg-white dark:bg-gray-900">
                          {/* Progress Bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
                            <div 
                              className={`h-full ${post.color} transition-all duration-1000`}
                              style={{ width: `${post.progress}%` }}
                            />
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${getDifficultyColor(post.difficulty)}`}>
                                  {post.difficulty}
                                </span>
                                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                  {post.level}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmark(post.id);
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                              >
                                <Icon 
                                  name="Bookmark" 
                                  size={20} 
                                  className={bookmarkedArticles.includes(post.id) 
                                    ? "text-blue-600 dark:text-blue-400 fill-current" 
                                    : "text-gray-400"
                                  } 
                                />
                              </button>
                            </div>
                            
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                              {post.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                              <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <Icon name="Calendar" size={16} />
                                  {post.date}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <Icon name="Clock" size={16} />
                                  {post.readTime}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                  <Icon name="Eye" size={16} />
                                  {post.views}
                                </span>
                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                  <Icon name="Heart" size={16} />
                                  {post.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                      {activeTab === "all" ? "All Articles" : 
                       blogCategories.find(c => c.id === activeTab)?.name}
                      <span className="text-blue-600 dark:text-blue-400 ml-3">
                        ({filteredPosts.length})
                      </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {readArticles.length} read • {bookmarkedArticles.length} saved
                    </p>
                  </div>
                </div>

                {regularPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {regularPosts.map((post) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ y: -3 }}
                        className="group cursor-pointer"
                        onClick={() => handleRead(post.id)}
                      >
                        <div className={`relative rounded-2xl border ${
                          darkMode ? 'border-gray-800 bg-gray-900/50' : 'border-gray-200 bg-white'
                        } hover:border-blue-500/30 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl overflow-hidden`}>
                          {/* Read Indicator */}
                          {readArticles.includes(post.id) && (
                            <div className="absolute top-3 right-3 z-10">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                          )}
                          
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(post.difficulty)}`}>
                                  {post.difficulty}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {post.readTime}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmark(post.id);
                                }}
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              >
                                <Icon 
                                  name="Bookmark" 
                                  size={16} 
                                  className={bookmarkedArticles.includes(post.id) 
                                    ? "text-blue-600 dark:text-blue-400 fill-current" 
                                    : "text-gray-400"
                                  } 
                                />
                              </button>
                            </div>
                            
                            <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                              {post.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {post.date}
                              </span>
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Icon name="Eye" size={12} />
                                  {post.views}
                                </span>
                                <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                  <Icon name="Heart" size={12} />
                                  {post.likes}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="inline-flex p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
                      <Icon name="Search" size={64} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">No articles found</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                      Try different keywords or browse all categories:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["DSA", "React", "System Design", "Interview", "Projects"].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setSearchQuery(suggestion)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 text-gray-700 dark:text-gray-300 font-medium transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Newsletter */}
              <div className="mt-20 relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20" />
                <div className={`relative p-8 md:p-12 ${
                  darkMode ? 'bg-gray-900/50' : 'bg-white/50'
                } backdrop-blur-sm`}>
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 mb-6">
                      <Icon name="Mail" size={48} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">
                      Get Weekly Developer Insights
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
                      Join developers receiving weekly insights on DSA, system design, interview prep, and career growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className={`flex-1 px-5 py-4 rounded-xl border ${
                          darkMode 
                            ? 'border-gray-700 bg-gray-800 text-white' 
                            : 'border-gray-300 bg-white text-gray-900'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                      />
                      <Button
                        variant="gradient"
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 font-bold shadow-lg"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
                      No spam ever. Unsubscribe anytime. Exclusive content for subscribers.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
};

export default BlogPage;