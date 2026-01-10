import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";

const BlogPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [readArticles, setReadArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  const blogCategories = [
    { id: "all", name: "All Posts", count: 28, icon: "Grid", gradient: "from-blue-500 to-cyan-400" },
    { id: "dsa", name: "DSA Journey", count: 12, icon: "Code", gradient: "from-emerald-500 to-green-400" },
    { id: "projects", name: "Live Projects", count: 8, icon: "FolderOpen", gradient: "from-purple-500 to-pink-500" },
    { id: "internship", name: "Internship", count: 5, icon: "Briefcase", gradient: "from-amber-500 to-orange-400" },
    { id: "tips", name: "Career Tips", count: 3, icon: "Lightbulb", gradient: "from-rose-500 to-red-400" },
    { id: "system-design", name: "System Design", count: 4, icon: "Cpu", gradient: "from-indigo-500 to-blue-500" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "My DSA Journey: From Zero to 260+ LeetCode Problems",
      excerpt: "A comprehensive guide on how I systematically solved 260+ problems on LeetCode and 200+ on GeeksforGeeks while building rock-solid fundamentals.",
      category: "dsa",
      readTime: "8 min read",
      date: "Mar 15, 2024",
      views: "1.2k",
      likes: 245,
      comments: 42,
      tags: ["DSA", "LeetCode", "Problem Solving", "Algorithms", "Data Structures"],
      featured: true,
      level: "Advanced",
      difficulty: "Hard",
      progress: 95,
    },
    {
      id: 2,
      title: "Internship Experience: Building Real-World Applications at Scale",
      excerpt: "Working on production-level projects during my internship taught me more than any classroom ever could. Complete journey with technical insights.",
      category: "internship",
      readTime: "12 min read",
      date: "Mar 10, 2024",
      views: "890",
      likes: 187,
      comments: 28,
      tags: ["Internship", "Real Projects", "Industry Experience", "Production", "Scaling"],
      featured: true,
      level: "Intermediate",
      difficulty: "Medium",
      progress: 88,
    },
    {
      id: 3,
      title: "System Design Patterns: Building Scalable Architectures",
      excerpt: "My systematic approach to solving complex system design problems with real-world examples from my projects at internship.",
      category: "system-design",
      readTime: "15 min read",
      date: "Mar 5, 2024",
      views: "1.5k",
      likes: 312,
      comments: 56,
      tags: ["System Design", "Architecture", "Scalability", "Microservices", "AWS"],
      featured: true,
      level: "Advanced",
      difficulty: "Hard",
      progress: 92,
    },
    {
      id: 4,
      title: "Time Management Mastery for Final Year Students",
      excerpt: "Balancing academics, projects, DSA practice, internship search, and personal life - my proven strategies that actually work.",
      category: "tips",
      readTime: "6 min read",
      date: "Feb 28, 2024",
      views: "745",
      likes: 156,
      comments: 19,
      tags: ["Productivity", "Time Management", "Student Life", "Focus", "Routines"],
      level: "Beginner",
      difficulty: "Easy",
      progress: 100,
    },
    {
      id: 5,
      title: "From Classroom to Corporate: A Smooth Transition Guide",
      excerpt: "How I applied theoretical CS knowledge to solve real business problems during my internship. Practical lessons learned.",
      category: "internship",
      readTime: "9 min read",
      date: "Feb 25, 2024",
      views: "920",
      likes: 198,
      comments: 31,
      tags: ["Transition", "Corporate Skills", "Practical Learning", "Soft Skills", "Communication"],
      level: "Intermediate",
      difficulty: "Medium",
      progress: 85,
    },
    {
      id: 6,
      title: "Advanced DSA Patterns: The Game Changers",
      excerpt: "20 key patterns and techniques that helped me solve 80% of complex problems efficiently. With code examples and explanations.",
      category: "dsa",
      readTime: "11 min read",
      date: "Feb 20, 2024",
      views: "1.1k",
      likes: 267,
      comments: 38,
      tags: ["Patterns", "Algorithms", "Optimization", "DP", "Graphs", "Trees"],
      featured: true,
      level: "Advanced",
      difficulty: "Hard",
      progress: 90,
    },
    {
      id: 7,
      title: "Building Scalable Backends: Production-Ready Lessons",
      excerpt: "Practical lessons from developing and deploying production-ready backend systems during live projects at internship.",
      category: "projects",
      readTime: "13 min read",
      date: "Feb 15, 2024",
      views: "1.3k",
      likes: 289,
      comments: 47,
      tags: ["Backend", "Scalability", "Best Practices", "Node.js", "MongoDB", "Redis"],
      level: "Intermediate",
      difficulty: "Medium",
      progress: 87,
    },
    {
      id: 8,
      title: "Technical Interview Mastery: Complete Preparation Strategy",
      excerpt: "My complete 3-month preparation strategy that helped me crack multiple FAANG-level technical interviews. Includes schedules, resources, and mock tests.",
      category: "tips",
      readTime: "10 min read",
      date: "Feb 10, 2024",
      views: "1.8k",
      likes: 421,
      comments: 64,
      tags: ["Interview Prep", "Coding Tests", "Mock Interviews", "FAANG", "Strategy"],
      featured: true,
      level: "All Levels",
      difficulty: "Medium",
      progress: 95,
    },
  ];

  const achievements = [
    { icon: "Code", value: "260+", label: "LeetCode Problems", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { icon: "Database", value: "200+", label: "GFG Questions", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: "Briefcase", value: "4+", label: "Live Projects", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: "Award", value: "5★", label: "Problem Solving", color: "text-amber-500", bg: "bg-amber-500/10" },
    { icon: "Cpu", value: "12+", label: "System Designs", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { icon: "BookOpen", value: "28+", label: "Articles", color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  const learningStats = [
    {
      title: "LeetCode Progress",
      current: 260,
      total: 300,
      color: "from-emerald-500 to-green-500",
      description: "Problems Solved",
      icon: "Code",
      milestone: "Top 10% Globally",
    },
    {
      title: "GFG Practice",
      current: 200,
      total: 250,
      color: "from-blue-500 to-cyan-500",
      description: "Questions Completed",
      icon: "Database",
      milestone: "Institute Topper",
    },
    {
      title: "Projects Built",
      current: 8,
      total: 12,
      color: "from-purple-500 to-pink-500",
      description: "Live Applications",
      icon: "FolderOpen",
      milestone: "Production Ready",
    },
    {
      title: "Articles Written",
      current: 28,
      total: 50,
      color: "from-amber-500 to-orange-500",
      description: "Blog Posts",
      icon: "BookOpen",
      milestone: "1.5k+ Reads",
    },
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
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900/50">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-60 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-full mb-8 shadow-lg"
            >
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30" />
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                🚀 Final Year CS Student • Internship Experience • 260+ LeetCode • Live Projects
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight"
            >
              Documenting the{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Developer Journey
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl leading-relaxed"
            >
              Sharing my journey from solving <span className="font-bold text-emerald-600 dark:text-emerald-400">260+ LeetCode</span> and <span className="font-bold text-blue-600 dark:text-blue-400">200+ GFG</span> problems to building production-ready applications during internships. Real experiences, practical insights.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative max-w-3xl mx-auto mb-16"
            >
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                <div className="relative">
                  <Icon
                    name="Search"
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                    size={22}
                  />
                  <input
                    type="text"
                    placeholder="Search articles by title, tags, or content (e.g., 'DSA patterns', 'system design', 'interview prep')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-12 py-5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl focus:ring-3 focus:ring-blue-500/30 focus:border-blue-500 outline-none transition-all text-lg shadow-xl"
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
              </div>
            </motion.div>

            {/* Achievements Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500" />
                  <div className={`relative ${achievement.bg} backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 group-hover:border-transparent transition-all duration-300`}>
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-3 rounded-xl ${achievement.bg} mb-3`}>
                        <Icon name={achievement.icon} size={28} className={achievement.color} />
                      </div>
                      <div className={`text-3xl font-bold ${achievement.color} mb-1`}>
                        {achievement.value}
                      </div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {achievement.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                      <Icon name="Grid" size={20} className="text-white" />
                    </div>
                    <span>Explore Topics</span>
                  </h3>
                  <div className="space-y-2">
                    {blogCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`group flex items-center justify-between w-full p-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                          activeTab === category.id
                            ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon name={category.icon} size={20} />
                          <span className="font-semibold">{category.name}</span>
                        </div>
                        <span className={`text-sm px-2.5 py-1 rounded-full font-bold ${
                          activeTab === category.id
                            ? "bg-white/20"
                            : "bg-gray-100 dark:bg-gray-700"
                        }`}>
                          {category.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* About Author */}
                <div className="relative overflow-hidden rounded-2xl border border-blue-200 dark:border-blue-800/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent" />
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6">
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
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">Ratnakar Singh</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Final Year CS Student</p>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                          🔥 Actively Seeking Opportunities
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-5 leading-relaxed">
                      Passionate about solving complex problems and building scalable applications. 
                      Documenting my journey through DSA mastery, production projects, and career growth.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {["DSA Expert", "React.js", "Node.js", "MongoDB", "AWS", "System Design", "Python", "Docker"].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 rounded-full text-xs font-semibold text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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

                {/* Reading Progress */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-2xl border border-emerald-200 dark:border-emerald-800/30 p-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-emerald-600 dark:text-emerald-400" />
                    Your Reading Progress
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Articles Read</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                          {readArticles.length}/{blogPosts.length}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500"
                          style={{ width: `${(readArticles.length / blogPosts.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Bookmarked</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">
                          {bookmarkedArticles.length} saved
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                          style={{ width: `${(bookmarkedArticles.length / blogPosts.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:w-3/4">
              {/* Featured Posts */}
              {featuredPosts.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Featured Deep Dives
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Comprehensive guides and detailed breakdowns
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
                        className="group relative"
                        onClick={() => handleRead(post.id)}
                      >
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500" />
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:border-blue-500/30 dark:group-hover:border-blue-500/50 transition-all duration-500 group-hover:shadow-2xl">
                          {/* Progress Bar */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                              style={{ width: `${post.progress}%` }}
                            />
                          </div>
                          
                          {/* Header */}
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getDifficultyColor(post.difficulty)}`}>
                                  {post.difficulty}
                                </span>
                                <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-bold text-gray-700 dark:text-gray-300">
                                  {post.level}
                                </span>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBookmark(post.id);
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
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
                            
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
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
                                  className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
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
                                <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                  <Icon name="MessageCircle" size={16} />
                                  {post.comments}
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
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                      {activeTab === "all" ? "All Articles" : 
                       blogCategories.find(c => c.id === activeTab)?.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {filteredPosts.length} articles • {readArticles.length} read • {bookmarkedArticles.length} saved
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      className="border-gray-300 dark:border-gray-700"
                    >
                      Export List
                    </Button>
                    <div className="relative group">
                      <button className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                        <Icon name="Filter" size={20} />
                      </button>
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Newest First</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Most Viewed</button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Most Liked</button>
                      </div>
                    </div>
                  </div>
                </div>

                {regularPosts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="group"
                        onClick={() => handleRead(post.id)}
                      >
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl overflow-hidden">
                          {/* Read Indicator */}
                          {readArticles.includes(post.id) && (
                            <div className="absolute top-3 right-3 z-10">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className="p-5">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${getDifficultyColor(post.difficulty)}`}>
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
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
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
                            
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
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
                                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-500">
                                  +{post.tags.length - 3}
                                </span>
                              )}
                            </div>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
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
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      No articles found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                      Try different keywords or browse all categories. Maybe try:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["DSA", "System Design", "Interview", "Projects", "React"].map((suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() => setSearchQuery(suggestion)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 rounded-xl text-gray-700 dark:text-gray-300 font-medium transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Section */}
              <div className="mt-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Learning Journey Statistics
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    Tracking progress and sharing insights from my coding journey. Every number tells a story.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {learningStats.map((stat, index) => {
                    const percentage = (stat.current / stat.total) * 100;
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group"
                      >
                        <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-500/30 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl">
                          <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300`}>
                              <Icon name={stat.icon} size={24} className="text-gray-700 dark:text-gray-300" />
                            </div>
                            <div className="text-right">
                              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                {stat.current}
                                <span className="text-lg text-gray-500 dark:text-gray-400">/{stat.total}</span>
                              </div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {percentage.toFixed(0)}% Complete
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                            {stat.title}
                          </h4>
                          
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-2">
                              <span className="font-medium text-gray-700 dark:text-gray-300">
                                {stat.description}
                              </span>
                              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                                {stat.milestone}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-1000`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {index === 0 && "Focusing on medium-hard problems with optimal solutions"}
                            {index === 1 && "Covering all major DSA topics with explanations"}
                            {index === 2 && "Real-world applications deployed and tested"}
                            {index === 3 && "Detailed guides with code examples and best practices"}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-20 relative overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20" />
                <div className="relative p-8 md:p-12 text-white">
                  <div className="max-w-2xl mx-auto text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                      <Icon name="Mail" size={48} className="opacity-90" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">
                      Never Miss an Update
                    </h3>
                    <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                      Join 500+ developers receiving weekly insights on DSA, system design, interview prep, and career growth.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Your best email address"
                        className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 text-white backdrop-blur-sm"
                      />
                      <Button
                        variant="default"
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-white/90 font-bold shadow-lg"
                      >
                        Subscribe Now
                      </Button>
                    </div>
                    <p className="text-sm opacity-75 mt-6">
                      No spam ever. Unsubscribe anytime. Exclusive content for subscribers.
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Icon name="PenTool" size={24} className="text-white" />
                </div>
                <span className="text-2xl font-bold">RSP Blog</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                A technical blog documenting the journey of a final year computer science student passionate about problem solving and building impactful solutions.
              </p>
              <div className="flex gap-4">
                {["LinkedIn", "GitHub", "Twitter", "Instagram"].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors hover:scale-110"
                    aria-label={platform}
                  >
                    <Icon name={platform} size={18} />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Popular Topics</h4>
              <ul className="space-y-3">
                {["LeetCode Solutions", "System Design", "React Patterns", "Node.js Best Practices", "Interview Prep", "Career Growth"].map((topic) => (
                  <li key={topic}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      <Icon name="ChevronRight" size={14} />
                      {topic}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Resources</h4>
              <ul className="space-y-3">
                {["DSA Sheet", "System Design Primer", "Interview Questions", "Project Ideas", "Learning Path", "Tools & Stack"].map((resource) => (
                  <li key={resource}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                      <Icon name="Download" size={14} />
                      {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-3">
                  <Icon name="Mail" size={16} />
                  <span>ratnakar@example.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="Phone" size={16} />
                  <span>+91 9876543210</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="MapPin" size={16} />
                  <span>India</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} Ratnakar Singh Parihar. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Built with React • Tailwind CSS • Framer Motion • 💻 by a passionate developer
            </p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default BlogPage;