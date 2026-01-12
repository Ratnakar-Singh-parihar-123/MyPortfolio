import React, { useState, useEffect } from 'react';
import { 
  Code, Globe, GitBranch, Cpu, Layers, TrendingUp, 
  Rocket, Database, Zap, Target, Code2, CheckCircle,
  ExternalLink, Calendar, FolderGit2, Terminal,
  Smartphone, Monitor, ArrowRight, BarChart3,
  Clock, Users, Sparkles, ChevronRight
} from 'lucide-react';
import Header from '../../components/ui/Header';
import { motion } from 'framer-motion';

const Experience = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSkill, setActiveSkill] = useState(null);

  // Listen for dark mode changes from Header
  useEffect(() => {
    const handleThemeChange = (e) => {
      setDarkMode(e.detail.isDark);
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    
    // Initial check
    if (document.documentElement.classList.contains('dark')) {
      setDarkMode(true);
    }
    
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const experiences = [
    {
      title: "Freelance Full-Stack Developer",
      duration: "1+ Years",
      projects: "4 Live Projects",
      description: "Developed and deployed complete full-stack applications for clients, handling everything from UI/UX design to backend implementation and deployment.",
      skills: ["React.js", "Node.js", "MongoDB", "Express", "REST APIs", "Authentication", "JWT", "Redux"],
      icon: <Rocket className="h-5 w-5 md:h-6 md:w-6" />,
      highlights: [
        "End-to-end project development",
        "Client requirements & communication",
        "Deployment & maintenance"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Frontend Development",
      duration: "1+ Years",
      projects: "Multiple Projects",
      description: "Built responsive, interactive user interfaces with modern React, implementing complex features and ensuring cross-browser compatibility.",
      skills: ["React", "JavaScript ES6+", "HTML5", "CSS3", "Tailwind CSS", "Responsive Design"],
      icon: <Code2 className="h-5 w-5 md:h-6 md:w-6" />,
      highlights: [
        "Interactive UI components",
        "Performance optimization",
        "Cross-browser compatibility"
      ],
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Problem Solving Expert",
      duration: "Daily Practice",
      stats: "460+ Problems",
      description: "Sharpened algorithmic thinking and problem-solving skills through consistent practice on competitive coding platforms.",
      achievements: [
        "260+ problems on LeetCode",
        "200+ problems on GeeksforGeeks",
        "Strong grasp of DSA concepts"
      ],
      icon: <Target className="h-5 w-5 md:h-6 md:w-6" />,
      highlights: [
        "Data Structures & Algorithms",
        "Time & Space Complexity",
        "Pattern Recognition"
      ],
      color: "from-emerald-500 to-green-500"
    },
    {
      title: "Development Workflow",
      duration: "Professional Tools",
      description: "Experienced in modern development workflows including version control, collaborative coding, and deployment processes.",
      tools: [
        { name: "Git & GitHub", purpose: "Version Control", icon: <FolderGit2 className="h-4 w-4" /> },
        { name: "Vercel", purpose: "Deployment", icon: <Zap className="h-4 w-4" /> },
        { name: "VS Code", purpose: "Development", icon: <Terminal className="h-4 w-4" /> }
      ],
      icon: <GitBranch className="h-5 w-5 md:h-6 md:w-6" />,
      highlights: [
        "CI/CD workflows",
        "Team collaboration",
        "Debugging & optimization"
      ],
      color: "from-orange-500 to-amber-500"
    }
  ];

  const skillCategories = [
    {
      category: "Frontend Mastery",
      skills: [
        { name: "React.js", level: 90, icon: "⚛️" },
        { name: "JavaScript ES6+", level: 95, icon: "📜" },
        { name: "HTML5/CSS3", level: 98, icon: "🎨" },
        { name: "Tailwind CSS", level: 92, icon: "🌀" },
        { name: "Responsive Design", level: 94, icon: "📱" },
        { name: "UI/UX", level: 88, icon: "✨" }
      ],
      icon: <Code className="h-4 w-4 md:h-5 md:w-5" />
    },
    {
      category: "Backend & Databases",
      skills: [
        { name: "Node.js", level: 85, icon: "🟢" },
        { name: "Express.js", level: 87, icon: "⚡" },
        { name: "REST APIs", level: 90, icon: "🔌" },
        { name: "MongoDB", level: 82, icon: "🍃" },
        { name: "Authentication", level: 88, icon: "🔐" },
        { name: "Server Logic", level: 86, icon: "⚙️" }
      ],
      icon: <Database className="h-4 w-4 md:h-5 md:w-5" />
    },
    {
      category: "Tools & Practices",
      skills: [
        { name: "Git & GitHub", level: 92, icon: "🐙" },
        { name: "Vercel", level: 88, icon: "▲" },
        { name: "VS Code", level: 96, icon: "💻" },
        { name: "Problem Solving", level: 89, icon: "🧩" },
        { name: "Debugging", level: 91, icon: "🐛" },
        { name: "Code Optimization", level: 87, icon: "🚀" }
      ],
      icon: <Zap className="h-4 w-4 md:h-5 md:w-5" />
    }
  ];

  const problemStats = [
    { 
      platform: "LeetCode", 
      count: 260, 
      color: "from-orange-500 to-amber-500",
      textColor: "text-orange-600 dark:text-orange-400",
      icon: "📈",
      description: "Medium/Hard Focus"
    },
    { 
      platform: "GeeksforGeeks", 
      count: 200, 
      color: "from-green-500 to-emerald-500",
      textColor: "text-green-600 dark:text-green-400",
      icon: "💻",
      description: "DSA Practice"
    },
    { 
      platform: "Total", 
      count: 460, 
      color: "from-purple-500 to-pink-500",
      textColor: "text-purple-600 dark:text-purple-400",
      icon: "🏆",
      description: "Problems Solved"
    }
  ];

  const projectHighlights = [
    {
      title: "E-commerce Platform",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      type: "Full-Stack"
    },
    {
      title: "Task Management App",
      tech: ["React", "Firebase", "Tailwind"],
      type: "Frontend"
    },
    {
      title: "Blog Platform",
      tech: ["Next.js", "MongoDB", "Auth0"],
      type: "Full-Stack"
    }
  ];

  return (
    <section 
      id="experience" 
      className={`min-h-screen py-8 md:py-16 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' 
          : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800'
      }`}
    >
      <Header />
      
      <div className="max-w-7xl mx-auto pt-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16 px-2"
        >
          <div className="inline-block relative mb-4 md:mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl md:rounded-lg blur opacity-20 animate-pulse"></div>
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative ${
              darkMode ? 'text-white' : 'text-gray-800'
            }`}>
              <span className="block">Hands-On</span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
          </div>
          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto px-4 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Building real-world applications through freelance projects and sharpening problem-solving skills
          </p>
        </motion.div>

        {/* Stats Overview - Mobile First */}
        <div className="mb-8 md:mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { label: "Years Experience", value: "1+", icon: <Calendar className="h-4 w-4" /> },
              { label: "Live Projects", value: "4+", icon: <Rocket className="h-4 w-4" /> },
              { label: "LeetCode", value: "260+", icon: <Code className="h-4 w-4" /> },
              { label: "GFG", value: "200+", icon: <Database className="h-4 w-4" /> }
            ].map((stat, idx) => (
              <div 
                key={idx}
                className={`rounded-xl p-3 md:p-4 text-center ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                } shadow-sm`}
              >
                <div className="flex items-center justify-center mb-1 md:mb-2">
                  <div className={`p-1.5 md:p-2 rounded-lg ${
                    darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                  }`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Experience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-2xl p-4 md:p-6 transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/30' 
                  : 'bg-white border border-gray-200 hover:border-blue-200'
              } shadow-lg hover:shadow-xl`}
            >
              {/* Badge */}
              <div className="absolute -top-3 left-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${exp.color} text-white`}>
                  {exp.type || exp.title.split(' ')[0]}
                </span>
              </div>
              
              <div className="flex items-start mb-4 md:mb-6">
                <div className={`p-2 md:p-3 rounded-xl mr-3 md:mr-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <div className={`bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                    {exp.icon}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <h3 className="text-lg md:text-xl font-bold truncate">{exp.title}</h3>
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-1 md:mt-0">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {exp.duration}
                      </span>
                      {(exp.projects || exp.stats) && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {exp.projects || exp.stats}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className={`text-sm md:text-base mb-4 md:mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {exp.description}
              </p>
              
              {/* Skills/Tags */}
              <div className="mb-4 md:mb-6">
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {exp.skills?.slice(0, 4).map((skill, i) => (
                    <span 
                      key={i}
                      className={`px-2 py-1 rounded-lg text-xs ${
                        darkMode 
                          ? 'bg-gray-700/50 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {exp.skills?.length > 4 && (
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                    }`}>
                      +{exp.skills.length - 4}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Highlights */}
              {exp.highlights && (
                <div className="mb-4">
                  <h4 className={`text-sm font-semibold mb-2 flex items-center ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1.5" />
                    Highlights
                  </h4>
                  <ul className="space-y-1">
                    {exp.highlights.slice(0, 2).map((highlight, i) => (
                      <li key={i} className="flex items-start">
                        <ChevronRight className={`h-3 w-3 mt-0.5 mr-1.5 flex-shrink-0 ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`} />
                        <span className="text-xs md:text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* View More */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <button className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center">
                  View Details
                  <ArrowRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <div className={`rounded-2xl p-4 md:p-6 lg:p-8 mb-12 md:mb-20 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900/50 border border-gray-700' 
            : 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100'
        }`}>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Technical Skills <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proficiency</span>
            </h2>
            <p className={`text-sm md:text-base lg:text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Comprehensive overview of my technical capabilities and expertise levels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-4 md:p-6 ${
                  darkMode ? 'bg-gray-800/30' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-center mb-4 md:mb-6">
                  <div className={`p-2 rounded-lg mr-3 ${
                    darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold">{category.category}</h3>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  {category.skills.map((skill, i) => (
                    <div 
                      key={i}
                      className="group cursor-pointer"
                      onMouseEnter={() => setActiveSkill(skill.name)}
                      onMouseLeave={() => setActiveSkill(null)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <span className="mr-2 text-sm">{skill.icon}</span>
                          <span className={`text-sm md:text-base font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            {skill.name}
                          </span>
                        </div>
                        <span className={`text-sm font-bold ${
                          darkMode ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className={`h-1.5 md:h-2 rounded-full overflow-hidden ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full ${
                            skill.level >= 90 ? 'bg-gradient-to-r from-emerald-500 to-green-500' :
                            skill.level >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                            'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Problem Solving Stats */}
        <div className="mb-12 md:mb-20">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Problem Solving <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">Achievements</span>
            </h2>
            <p className={`text-sm md:text-base lg:text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Consistent practice to improve algorithmic thinking and coding efficiency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-8">
            {problemStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative rounded-2xl p-6 md:p-8 text-center overflow-hidden ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-xl`}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-full`}></div>
                </div>
                
                <div className="relative">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${stat.textColor}`}>
                    {stat.count}+
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">{stat.platform}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Practice Insights */}
          <div className={`rounded-2xl p-4 md:p-6 ${
            darkMode ? 'bg-gray-800/50' : 'bg-gradient-to-r from-blue-50 to-purple-50'
          }`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-500" />
                  Practice Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/30">
                    <span>Daily Consistency</span>
                    <span className="font-bold text-green-600">95%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/30">
                    <span>Medium Difficulty</span>
                    <span className="font-bold text-blue-600">65%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/30">
                    <span>Hard Problems</span>
                    <span className="font-bold text-purple-600">35%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-500" />
                  Focus Areas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Dynamic Programming", "Graphs", "Trees", "Arrays", "Strings", "Greedy"].map((area, idx) => (
                    <div 
                      key={idx}
                      className={`p-3 rounded-lg text-center ${
                        darkMode ? 'bg-gray-800/30' : 'bg-white/70'
                      }`}
                    >
                      <span className="text-sm font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Highlights */}
        <div className={`rounded-2xl p-4 md:p-6 lg:p-8 mb-12 md:mb-20 ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900/50' 
            : 'bg-gradient-to-br from-blue-50 to-cyan-50'
        }`}>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              Project <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Highlights</span>
            </h2>
            <p className={`text-sm md:text-base lg:text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Key projects showcasing full-stack development capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {projectHighlights.map((project, index) => (
              <div 
                key={index}
                className={`rounded-xl p-4 md:p-6 ${
                  darkMode ? 'bg-gray-800/30' : 'bg-white'
                } shadow-lg`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h4 className="text-lg font-bold">{project.title}</h4>
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                    darkMode ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {project.type}
                  </span>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-100'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center">
                  View Project
                  <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 md:p-8 lg:p-12 text-center ${
            darkMode 
              ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-800/30' 
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
          }`}
        >
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
            Ready to Build Something Amazing?
          </h3>
          <p className={`text-base md:text-lg lg:text-xl mb-6 md:mb-8 max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-blue-100'
          }`}>
            With hands-on experience in full-stack development and strong problem-solving skills, 
            I'm equipped to tackle complex challenges and deliver efficient solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className={`px-6 py-3 rounded-lg font-bold text-sm md:text-base ${
              darkMode 
                ? 'bg-white text-blue-600 hover:bg-gray-100' 
                : 'bg-white text-blue-600 hover:bg-gray-50'
            }`}>
              View My Projects
            </button>
            <button className={`px-6 py-3 rounded-lg font-bold text-sm md:text-base ${
              darkMode 
                ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                : 'bg-blue-700 hover:bg-blue-600 text-white'
            }`}>
              Contact Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;