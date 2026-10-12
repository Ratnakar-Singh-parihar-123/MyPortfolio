// ============================================================
// 📄 ROLE-WISE RESUMES
//    PDFs live in  public/resumes/
//    Change the `file` paths + highlights to match your own.
// ============================================================

export const RESUMES = [
  {
    id: "fullstack",
    title: "Full-Stack Developer",
    subtitle: "MERN • React • Node.js",
    icon: "Layers",
    accent: "indigo",
    file: "/src//assets/resume/Ratnakar_Singh_Parihar.pdf",
    fileName: "Ratnakar-Singh-FullStack-Developer.pdf",
    description:
      "Complete MERN-stack profile covering frontend, backend, databases, authentication, real-time features, and deployment.",
    highlights: [
      "8+ production-style full-stack projects",
      "REST APIs, JWT auth, Socket.io real-time",
      "MongoDB, Express, React, Node.js",
      "Payments, Firebase, Google Maps integrations",
    ],
    tech: ["React", "Node.js", "Express.js", "MongoDB", "Socket.io", "JWT"],
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    subtitle: "React • Tailwind • UI Engineering",
    icon: "Code2",
    accent: "violet",
    file: "/src//assets/resume/Ratnakar_Singh_Parihar.pdf",
    fileName: "Ratnakar-Singh-Frontend-Developer.pdf",
    description:
      "Frontend-focused resume highlighting component architecture, responsive design, animation systems, and design-system thinking.",
    highlights: [
      "React, hooks, routing, state management",
      "Tailwind CSS, responsive layouts, dark mode",
      "Framer Motion animations & micro-interactions",
      "Accessibility, performance & Lighthouse optimisation",
    ],
    tech: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
      "React Router",
    ],
  },
  {
    id: "backend",
    title: "Backend Developer",
    subtitle: "Node.js • Express • APIs • MongoDB",
    icon: "Server",
    accent: "sky",
    file: "/src//assets/resume/Ratnakar_Singh_Parihar.pdf",
    fileName: "Ratnakar-Singh-Backend-Developer.pdf",
    description:
      "Backend-focused resume covering REST API design, authentication, real-time systems, and database modelling.",
    highlights: [
      "REST API design with Express.js",
      "JWT & cookie-based authentication",
      "Socket.io real-time messaging & events",
      "MongoDB schema design & aggregation",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "JWT", "Socket.io", "REST APIs"],
  },
  {
    id: "mobile",
    title: "Mobile App Developer",
    subtitle: "React Native • Android",
    icon: "Smartphone",
    accent: "emerald",
    file: "/src//assets/resume/Ratnakar_Singh_Parihar.pdf",
    fileName: "Ratnakar-Singh-Mobile-Developer.pdf",
    description:
      "React Native resume covering the FoodMitra mobile ecosystem — customer, delivery partner, and vendor apps with real-time backends.",
    highlights: [
      "React Native apps (Android APK shipped)",
      "Firebase auth + OTP flows",
      "Real-time updates with Socket.io",
      "Google Maps, Razorpay, push-ready architecture",
    ],
    tech: ["React Native", "Firebase", "Socket.io", "Google Maps", "Razorpay"],
  },
  {
    id: "java",
    title: "Java / System Design",
    subtitle: "Java • DSA • Distributed Systems",
    icon: "Coffee",
    accent: "amber",
    file: "/src//assets/resume/Ratnakar_Singh_Parihar.pdf",
    fileName: "Ratnakar-Singh-Java-System-Design.pdf",
    description:
      "Java and system-design resume centred on data structures, concurrency, and the ScaleGate load-balancer project.",
    highlights: [
      "Core Java, DSA, multithreading, concurrency",
      "Load balancing: Round Robin, Least Connections",
      "Consistent hashing with TreeMap hash ring",
      "Health checks, retries, rate limiting, circuit breakers",
    ],
    tech: ["Java", "Data Structures", "Multithreading", "Networking", "Docker"],
  },
];
