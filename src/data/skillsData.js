import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
  SiFirebase,
  SiSocketdotio,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

import {
  Monitor,
  Server,
  Database,
  Wrench,
  FolderOpen,
  Clock3,
  Brain,
  Lightbulb,
  Layers3,
  Smartphone,
  ShieldCheck,
  Code2,
} from "lucide-react";

// =========================================================
// SKILL FILTER CATEGORIES
// =========================================================

export const skillCategories = [
  {
    id: "all",
    name: "All",
    icon: Layers3,
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: Monitor,
  },
  {
    id: "backend",
    name: "Backend",
    icon: Server,
  },
  {
    id: "database",
    name: "Database",
    icon: Database,
  },
  {
    id: "tools",
    name: "Tools",
    icon: Wrench,
  },
];

// =========================================================
// SKILL SECTIONS
// =========================================================

export const skillSections = [
  {
    id: "frontend",
    title: "Frontend & Mobile",
    subtitle: "Interfaces & experiences",
    icon: Monitor,
    gradient: "from-blue-500 to-cyan-500",
    softBg: "bg-blue-500/10",
    color: "text-blue-600 dark:text-blue-400",
    description:
      "Building responsive web interfaces and cross-platform mobile applications with a focus on clean UI, reusable components, and smooth user experiences.",
    skills: [
      {
        name: "HTML5",
        icon: SiHtml5,
        desc: "Semantic markup",
      },
      {
        name: "CSS3",
        icon: "CSS",
        desc: "Responsive styling",
      },
      {
        name: "JavaScript",
        icon: SiJavascript,
        desc: "ES6+ development",
      },
      {
        name: "React.js",
        icon: SiReact,
        desc: "Component architecture",
      },
      {
        name: "React Native",
        icon: SiReact,
        desc: "Cross-platform apps",
      },
      {
        name: "Tailwind CSS",
        icon: SiTailwindcss,
        desc: "Utility-first UI",
      },
    ],
  },

  {
    id: "backend",
    title: "Backend & APIs",
    subtitle: "Server-side engineering",
    icon: Server,
    gradient: "from-emerald-500 to-teal-500",
    softBg: "bg-emerald-500/10",
    color: "text-emerald-600 dark:text-emerald-400",
    description:
      "Developing REST APIs and backend services with authentication, real-time communication, validation, and structured application logic.",
    skills: [
      {
        name: "Node.js",
        icon: SiNodedotjs,
        desc: "Runtime & services",
      },
      {
        name: "Express.js",
        icon: SiExpress,
        desc: "REST API development",
      },
      {
        name: "Java",
        icon: FaJava,
        desc: "OOP & DSA",
      },
      {
        name: "REST APIs",
        icon: Code2,
        desc: "API architecture",
      },
      {
        name: "Socket.IO",
        icon: SiSocketdotio,
        desc: "Real-time systems",
      },
      {
        name: "JWT",
        icon: ShieldCheck,
        desc: "Authentication",
      },
    ],
  },

  {
    id: "database",
    title: "Database & Cloud",
    subtitle: "Data & deployment",
    icon: Database,
    gradient: "from-purple-500 to-pink-500",
    softBg: "bg-purple-500/10",
    color: "text-purple-600 dark:text-purple-400",
    description:
      "Working with relational and NoSQL databases while deploying applications and managing cloud-based development workflows.",
    skills: [
      {
        name: "MongoDB",
        icon: SiMongodb,
        desc: "NoSQL database",
      },
      {
        name: "MySQL",
        icon: SiMysql,
        desc: "Relational database",
      },
      {
        name: "Firebase",
        icon: SiFirebase,
        desc: "Backend services",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        desc: "Frontend deployment",
      },
      {
        name: "Render",
        icon: SiRender,
        desc: "Backend deployment",
      },
    ],
  },

  {
    id: "tools",
    title: "Tools & Workflow",
    subtitle: "Development ecosystem",
    icon: Wrench,
    gradient: "from-orange-500 to-amber-500",
    softBg: "bg-orange-500/10",
    color: "text-orange-600 dark:text-orange-400",
    description:
      "Using modern development tools for version control, API testing, debugging, deployment, and efficient day-to-day development.",
    skills: [
      {
        name: "Git",
        icon: SiGit,
        desc: "Version control",
      },
      {
        name: "GitHub",
        icon: SiGithub,
        desc: "Code collaboration",
      },
      {
        name: "Postman",
        icon: SiPostman,
        desc: "API testing",
      },
      {
        name: "VS Code",
        icon: "VS",
        desc: "Development environment",
      },
      {
        name: "Vercel",
        icon: SiVercel,
        desc: "Deployment",
      },
      {
        name: "Render",
        icon: SiRender,
        desc: "Backend hosting",
      },
    ],
  },
];

// =========================================================
// SKILLS STATISTICS
// =========================================================

export const stats = [
  {
    value: "15+",
    label: "Technologies",
    icon: Code2,
  },
  {
    value: "10+",
    label: "Projects Built",
    icon: FolderOpen,
  },
  {
    value: "300+",
    label: "DSA Problems",
    icon: Brain,
  },
  {
    value: "1+ Yrs",
    label: "Learning & Building",
    icon: Clock3,
  },
];

// =========================================================
// CURRENTLY EXPLORING / LEARNING PATH
// =========================================================

export const learningPath = [
  {
    title: "System Design",
    description:
      "Scalable architecture, APIs, caching, load balancing & distributed systems.",
    icon: Server,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "DSA & Problem Solving",
    description:
      "Strengthening algorithms, data structures, optimization and logical thinking.",
    icon: Brain,
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    title: "Backend Engineering",
    description:
      "Improving API design, concurrency, performance, reliability and clean architecture.",
    icon: Lightbulb,
    gradient: "from-orange-500 to-amber-500",
  },
];
