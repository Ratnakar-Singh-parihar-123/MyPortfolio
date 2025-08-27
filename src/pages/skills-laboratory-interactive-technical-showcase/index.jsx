import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import SkillCard from './components/SkillCard';
import SkillCategoryFilter from './components/SkillCategoryFilter';
import LearningProgress from './components/LearningProgress';
import SkillSearch from './components/SkillSearch';
import SkillStats from './components/SkillStats';
import CodeDemo from './components/CodeDemo';

const SkillsLaboratory = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [proficiencyFilter, setProficiencyFilter] = useState('all');
  const [selectedSkillDemo, setSelectedSkillDemo] = useState(null);
  const [selectedCertification, setSelectedCertification] = useState(null);

  // Mock data for skills
  const skills = [
    {
      id: 1,
      name: "React",
      category: "frontend",
      icon: "Code",
      proficiency: "Advanced",
      experience: "3+ years",
      description: "Building modern, interactive user interfaces with React 18, hooks, and context API. Experienced in component architecture and state management.",
      details: `Extensive experience building scalable React applications with modern patterns including functional components, custom hooks, and context API. Proficient in React Router, form handling, and performance optimization techniques.`,
      keyFeatures: ["Functional Components", "Custom Hooks", "Context API", "React Router", "Performance Optimization"],
      recentProjects: ["E-commerce Platform", "Dashboard Analytics", "Portfolio Website"],
      certifications: [
        { name: "React Developer", issuer: "Meta", verificationUrl: "#" }
      ],
      hasDemo: true,
      codeRepository: "https://github.com/example/react-projects",
      isNew: false,
      lastUpdated: "2025-01-15",
      version: "18.2.0",
      demoCode: `import React, { useState, useEffect } from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { 
        id: Date.now(), 
        text: input, 
        completed: false 
      }]);
      setInput('');
    }
  };

  return (
    <div className="p-4">
      <h2>React Todo App</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a todo..."
          className="border p-2 rounded"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="p-2 border-b">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;`,
      explanation: "This React component demonstrates core concepts including state management with useState, event handling, and conditional rendering. It showcases modern functional component patterns and React best practices.",
      useCases: ["Single Page Applications", "Interactive Dashboards", "E-commerce Platforms", "Content Management Systems"]
    },
    {
      id: 2,
      name: "JavaScript",
      category: "frontend",
      icon: "Zap",
      proficiency: "Expert",
      experience: "4+ years",
      description: "Advanced JavaScript including ES6+, async/await, promises, and modern browser APIs. Strong understanding of closures, prototypes, and functional programming.",
      details: `Deep expertise in modern JavaScript including ES6+ features, asynchronous programming, and advanced concepts like closures, prototypes, and the event loop. Experience with both client-side and server-side JavaScript development.`,
      keyFeatures: ["ES6+ Syntax", "Async/Await", "Promises", "Closures", "Prototypes", "DOM Manipulation"],
      recentProjects: ["API Integration", "Interactive Animations", "Data Visualization"],
      certifications: [
        { name: "JavaScript Algorithms", issuer: "freeCodeCamp", verificationUrl: "#" }
      ],
      hasDemo: true,
      codeRepository: "https://github.com/example/js-projects",
      isNew: false,
      lastUpdated: "2025-01-20",
      version: "ES2023",
      demoCode: `// Advanced JavaScript Concepts Demo
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  // Using async/await with error handling
  async processData() {
    try {
      const results = await Promise.all(
        this.data.map(async (item) => {
          const processed = await this.processItem(item);
          return { ...item, processed };
        })
      );
      return results;
    } catch (error) {
      console.error('Processing failed:', error);
      throw error;
    }
  }

  // Simulated async operation
  processItem(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(item.value * 2);
      }, 100);
    });
  }

  // Using modern array methods and destructuring
  analyzeData() {
    const { sum, average, max } = this.data.reduce(
      (acc, { value }) => ({
        sum: acc.sum + value,
        max: Math.max(acc.max, value),
        count: acc.count + 1
      }),
      { sum: 0, max: -Infinity, count: 0 }
    );
    
    return { sum, average: sum / this.data.length, max };
  }
}

// Usage example
const processor = new DataProcessor([
  { id: 1, value: 10 },
  { id: 2, value: 20 },
  { id: 3, value: 30 }
]);

processor.processData().then(console.log);`,
      explanation: "This JavaScript example demonstrates advanced concepts including classes, async/await, promises, destructuring, and modern array methods. It shows practical application of ES6+ features in real-world scenarios.",
      useCases: ["Data Processing", "API Integration", "Interactive Web Applications", "Browser Extensions"]
    },
    {
      id: 3,
      name: "Node.js",
      category: "backend",
      icon: "Server",
      proficiency: "Intermediate",
      experience: "2+ years",
      description: "Server-side JavaScript development with Express.js, RESTful APIs, and database integration. Experience with middleware, authentication, and deployment.",
      details: `Solid experience in server-side development using Node.js and Express.js. Proficient in building RESTful APIs, handling authentication, working with databases, and implementing middleware for various functionalities.`,
      keyFeatures: ["Express.js", "RESTful APIs", "Middleware", "Authentication", "Database Integration"],
      recentProjects: ["REST API", "Authentication System", "File Upload Service"],
      certifications: [],
      hasDemo: true,
      codeRepository: "https://github.com/example/node-projects",
      isNew: false,
      lastUpdated: "2025-01-10",
      version: "18.19.0",
      demoCode: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

// Mock user database
const users = [];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = { 
      id: users.length + 1, 
      username, 
      password: hashedPassword 
    };
    users.push(user);
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  res.json({ username: user.username });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,
      explanation: "This Node.js example demonstrates building a secure authentication system with Express.js, including user registration, login, JWT tokens, and protected routes with middleware.",
      useCases: ["REST APIs", "Authentication Systems", "Real-time Applications", "Microservices"]
    },
    {
      id: 4,
      name: "Tailwind CSS",
      category: "frontend",
      icon: "Palette",
      proficiency: "Advanced",
      experience: "2+ years",
      description: "Utility-first CSS framework for rapid UI development. Expert in responsive design, custom configurations, and component-based styling patterns.",
      details: `Advanced proficiency in Tailwind CSS for creating responsive, maintainable, and scalable user interfaces. Experience with custom configurations, component extraction, and design system implementation.`,
      keyFeatures: ["Utility Classes", "Responsive Design", "Custom Components", "Dark Mode", "JIT Compilation"],
      recentProjects: ["Design System", "Landing Pages", "Dashboard UI"],
      certifications: [],
      hasDemo: true,
      codeRepository: "https://github.com/example/tailwind-projects",
      isNew: false,
      lastUpdated: "2025-01-18",
      version: "3.4.0",
      demoCode: `<!-- Tailwind CSS Component Example -->
<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
  <div class="md:flex">
    <div class="md:shrink-0">
      <img class="h-48 w-full object-cover md:h-full md:w-48" 
           src="/img/building.jpg" 
           alt="Modern building architecture">
    </div>
    <div class="p-8">
      <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
        Company retreat
      </div>
      <a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
        Incredible accommodation for your team
      </a>
      <p class="mt-2 text-slate-500">
        Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? 
        We have a list of places to do just that.
      </p>
      <div class="mt-4">
        <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
          Book Now
        </button>
      </div>
    </div>
  </div>
</div>

<!-- Responsive Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-2">Card 1</h3>
    <p class="text-purple-100">Beautiful gradient background with responsive design.</p>
  </div>
  <div class="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-2">Card 2</h3>
    <p class="text-green-100">Smooth transitions and hover effects.</p>
  </div>
  <div class="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-lg p-6 text-white">
    <h3 class="text-xl font-bold mb-2">Card 3</h3>
    <p class="text-yellow-100">Mobile-first responsive approach.</p>
  </div>
</div>`,
      explanation: "This Tailwind CSS example showcases utility-first styling with responsive design, gradients, shadows, and hover effects. It demonstrates how to build complex layouts with minimal custom CSS.",
      useCases: ["Rapid Prototyping", "Design Systems", "Responsive Layouts", "Component Libraries"]
    },
    {
      id: 5,
      name: "Git & GitHub",
      category: "tools",
      icon: "GitBranch",
      proficiency: "Advanced",
      experience: "3+ years",
      description: "Version control with Git, collaborative development workflows, branching strategies, and CI/CD integration with GitHub Actions.",
      details: `Comprehensive experience with Git version control and GitHub for collaborative development. Proficient in branching strategies, merge conflicts resolution, and implementing CI/CD pipelines.`,
      keyFeatures: ["Version Control", "Branching", "Merge Conflicts", "GitHub Actions", "Code Reviews"],
      recentProjects: ["CI/CD Pipeline", "Team Collaboration", "Open Source Contributions"],
      certifications: [],
      hasDemo: true,
      codeRepository: "https://github.com/example/git-workflows",
      isNew: false,
      lastUpdated: "2025-01-22",
      version: "2.43.0",
      demoCode: `# Git Workflow Commands

# Initialize a new repository
git init
git remote add origin https://github.com/username/repo.git

# Feature branch workflow
git checkout -b feature/user-authentication
git add .
git commit -m "feat: implement user authentication system

- Add login and registration forms
- Implement JWT token handling
- Add password validation
- Include error handling for auth failures"

# Push feature branch
git push -u origin feature/user-authentication

# Create pull request (via GitHub CLI)
gh pr create --title "Add user authentication" --body "Implements secure user authentication with JWT tokens"

# Merge and cleanup
git checkout main
git pull origin main
git branch -d feature/user-authentication

# Advanced Git operations
git log --oneline --graph --decorate
git rebase -i HEAD~3
git cherry-pick abc123
git stash push -m "WIP: working on new feature"

# GitHub Actions Workflow (.github/workflows/ci.yml)
name: CI/CD Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build`,
      explanation: "This Git example demonstrates professional version control workflows including feature branches, conventional commits, pull requests, and automated CI/CD with GitHub Actions.",
      useCases: ["Team Collaboration", "Code Reviews", "Continuous Integration", "Release Management"]
    },
    {
      id: 6,
      name: "TypeScript",
      category: "frontend",
      icon: "FileCode",
      proficiency: "Intermediate",
      experience: "1+ years",
      description: "Strongly-typed JavaScript development with TypeScript. Experience with interfaces, generics, and type-safe React applications.",
      details: `Growing expertise in TypeScript for building type-safe applications. Experience with interfaces, generics, utility types, and integrating TypeScript with React and Node.js projects.`,
      keyFeatures: ["Type Safety", "Interfaces", "Generics", "Utility Types", "React Integration"],
      recentProjects: ["Type-safe API Client", "React TypeScript App"],
      certifications: [],
      hasDemo: true,
      codeRepository: "https://github.com/example/typescript-projects",
      isNew: true,
      lastUpdated: "2025-01-25",
      version: "5.3.0",
      demoCode: `// TypeScript Advanced Types Demo
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  preferences?: UserPreferences;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
}

// Generic API Response Type
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Generic API Client Class
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    return response.json();
  }

  async post<T, U>(endpoint: string, data: T): Promise<ApiResponse<U>> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Usage with type safety
const apiClient = new ApiClient('https://api.example.com');

// Type-safe API calls
const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

const createUser = async (userData: Omit<User, 'id'>): Promise<User> => {
  const response = await apiClient.post<Omit<User, 'id'>, User>('/users', userData);
  return response.data;
};

// Utility type examples
type UserUpdate = Partial<Pick<User, 'name' | 'email' | 'preferences'>>;
type UserPublic = Omit<User, 'email'>;

// Advanced type guards
function isAdmin(user: User): user is User & { role: 'admin' } {
  return user.role === 'admin';
}`,
      explanation: "This TypeScript example demonstrates advanced type system features including generics, utility types, interfaces, and type guards for building robust, type-safe applications.",
      useCases: ["Large Scale Applications", "API Development", "React Applications", "Team Collaboration"]
    }
  ];

  // Mock data for learning skills
  const learningSkills = [
    {
      id: 1,
      name: "Next.js",
      platform: "Vercel Learn",
      icon: "Globe",
      progress: 75,
      startDate: "Dec 2024",
      targetDate: "Feb 2025",
      currentTopic: "Server-Side Rendering & Static Generation",
      certificateUrl: "https://nextjs.org/learn"
    },
    {
      id: 2,
      name: "GraphQL",
      platform: "Apollo GraphQL",
      icon: "Database",
      progress: 45,
      startDate: "Jan 2025",
      targetDate: "Mar 2025",
      currentTopic: "Schema Design & Resolvers",
      certificateUrl: "https://www.apollographql.com/tutorials/"
    },
    {
      id: 3,
      name: "Docker",
      platform: "Docker Academy",
      icon: "Package",
      progress: 30,
      startDate: "Jan 2025",
      targetDate: "Apr 2025",
      currentTopic: "Container Orchestration",
      certificateUrl: "https://docker.com/academy"
    }
  ];

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Skills', icon: 'Grid3x3' },
    { id: 'frontend', name: 'Frontend', icon: 'Monitor' },
    { id: 'backend', name: 'Backend', icon: 'Server' },
    { id: 'tools', name: 'Tools', icon: 'Wrench' },
    { id: 'database', name: 'Database', icon: 'Database' },
    { id: 'cloud', name: 'Cloud', icon: 'Cloud' }
  ];

  // Calculate skill counts by category
  const skillCounts = useMemo(() => {
    const counts = { all: skills?.length };
    categories?.forEach(category => {
      if (category?.id !== 'all') {
        counts[category.id] = skills?.filter(skill => skill?.category === category?.id)?.length;
      }
    });
    return counts;
  }, [skills]);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      totalSkills: skills?.length,
      expertSkills: skills?.filter(skill => skill?.proficiency === 'Expert')?.length,
      learningSkills: learningSkills?.length,
      certifications: skills?.reduce((total, skill) => total + (skill?.certifications?.length || 0), 0)
    };
  }, [skills, learningSkills]);

  // Filter and sort skills
  const filteredSkills = useMemo(() => {
    let filtered = skills?.filter(skill => {
      const matchesCategory = activeCategory === 'all' || skill?.category === activeCategory;
      const matchesSearch = skill?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           skill?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesProficiency = proficiencyFilter === 'all' || skill?.proficiency === proficiencyFilter;
      
      return matchesCategory && matchesSearch && matchesProficiency;
    });

    // Sort skills
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'proficiency':
          const proficiencyOrder = { 'Expert': 4, 'Advanced': 3, 'Intermediate': 2, 'Beginner': 1 };
          return proficiencyOrder?.[b?.proficiency] - proficiencyOrder?.[a?.proficiency];
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        case 'experience':
          return parseInt(b?.experience) - parseInt(a?.experience);
        default:
          return 0;
      }
    });

    return filtered;
  }, [skills, activeCategory, searchTerm, proficiencyFilter, sortBy]);

  const handleViewDemo = (skill) => {
    setSelectedSkillDemo(skill);
  };

  const handleViewCertification = (certification) => {
    setSelectedCertification(certification);
    window.open(certification?.verificationUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Skills Laboratory - Interactive Technical Showcase | Portfolio Pro</title>
        <meta name="description" content="Explore my technical skills through interactive demonstrations, code samples, and real-world project applications. From frontend to backend development." />
        <meta name="keywords" content="technical skills, programming, web development, React, JavaScript, Node.js, portfolio" />
      </Helmet>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-secondary to-accent text-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon name="Code2" size={32} color="white" />
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Skills Laboratory
                <span className="block text-2xl lg:text-3xl font-normal mt-2 text-white/90">
                  Interactive Technical Showcase
                </span>
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Explore my technical expertise through live demonstrations, interactive code samples, 
                and real-world project applications. From frontend magic to backend architecture.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2 text-white/90">
                  <Icon name="Zap" size={20} />
                  <span>Interactive Demos</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <Icon name="Code" size={20} />
                  <span>Live Code Samples</span>
                </div>
                <div className="flex items-center space-x-2 text-white/90">
                  <Icon name="Award" size={20} />
                  <span>Verified Certifications</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          {/* Stats Section */}
          <SkillStats stats={stats} />

          {/* Search and Filters */}
          <SkillSearch
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            proficiencyFilter={proficiencyFilter}
            onProficiencyFilterChange={setProficiencyFilter}
          />

          {/* Category Filter */}
          <SkillCategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            skillCounts={skillCounts}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Skills Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Technical Skills
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({filteredSkills?.length} skills)
                  </span>
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="Filter" size={16} />
                  <span>Filtered & Sorted</span>
                </div>
              </div>

              {filteredSkills?.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <Icon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No skills found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search terms or filters to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                      setProficiencyFilter('all');
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSkills?.map((skill) => (
                    <SkillCard
                      key={skill?.id}
                      skill={skill}
                      onViewDemo={handleViewDemo}
                      onViewCertification={handleViewCertification}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Learning Progress Sidebar */}
            <div className="lg:col-span-1">
              <LearningProgress learningSkills={learningSkills} />

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Icon name="Download" size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Download Skills Resume</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Icon name="Calendar" size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Schedule Skills Assessment</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <Icon name="MessageCircle" size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Discuss Project Requirements</span>
                  </button>
                </div>
              </div>

              {/* Skills Roadmap */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">2025 Learning Roadmap</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Q1: Next.js & GraphQL</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Q2: Docker & Kubernetes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Q3: AWS Cloud Services</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Q4: Machine Learning Basics</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Code Demo Modal */}
        {selectedSkillDemo && (
          <CodeDemo
            skill={selectedSkillDemo}
            onClose={() => setSelectedSkillDemo(null)}
          />
        )}
      </main>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Code2" size={24} color="white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ready to Build Something Amazing?</h3>
            <p className="text-gray-400 mb-6">
              Let's discuss how my skills can contribute to your next project.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start a Project
              </button>
              <button className="border border-gray-600 hover:border-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                View Portfolio
              </button>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date()?.getFullYear()} Portfolio Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SkillsLaboratory;