import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";

// image certificates
import problemSolvingBasic from "../../assets/caritificatesImg/Problem Silving Basic.png";
import problemSolvingIntermedated from "../../assets/caritificatesImg/Problem solving intermedate.png";
import reactBasic from "../../assets/caritificatesImg/React Basic.png";
import frontendRect from "../../assets/caritificatesImg/frontend React.png";
import javaScriptBasic from "../../assets/caritificatesImg/javascript basic.png";
import codingThinker from "../../assets/caritificatesImg/coding-thinker-certificates.png";

//codingThinker logo
import codingThinkerLogo from "../../assets/brandLogos/coding-thinker-logo.png";

const AchievementsPage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filter, setFilter] = useState("all");
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    document.title = "Achievements | Ratnakar Singh Parihar";
    window.scrollTo(0, 0);
  }, []);

  const achievements = [
    {
      title: "Problem Solving (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: problemSolvingBasic,
      description:
        "Demonstrated strong analytical thinking and mastery in basic algorithmic concepts including loops, arrays, and conditionals through HackerRank's coding challenges.",
      link: "https://www.hackerrank.com/certificates/iframe/5ce289a1a111",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["Algorithms", "Logic Building", "Basic Data Structures"],
      category: "problem-solving",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "2025",
      image: problemSolvingIntermedated,
      description:
        "Validated advanced problem-solving ability through complex challenges covering recursion, sorting, and optimization algorithms on HackerRank.",
      link: "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["Algorithms", "Optimization", "Recursion", "Time Complexity"],
      category: "problem-solving",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: javaScriptBasic,
      description:
        "Earned certification for core JavaScript programming skills including ES6 features, control flow, and DOM fundamentals through HackerRank assessment.",
      link: "https://www.hackerrank.com/certificates/iframe/438c3130ea15",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["JavaScript", "ES6+", "DOM", "Functions"],
      category: "language",
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Frontend Development (React)",
      issuer: "HackerRank",
      date: "2025",
      image: frontendRect,
      description:
        "Proven ability to build interactive user interfaces with React, handling props, hooks, and state management efficiently using best coding practices.",
      link: "https://www.hackerrank.com/certificates/iframe/eaae9fd31c8c",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["React", "Hooks", "State Management", "Component Architecture"],
      category: "frontend",
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "React (Basic)",
      issuer: "HackerRank",
      date: "2025",
      image: reactBasic,
      description:
        "Certified for foundational knowledge of React, including components, state management, props, JSX, and lifecycle methods for building interactive UIs.",
      link: "https://www.hackerrank.com/certificates/iframe/240df00a1852",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: [
        "React",
        "JSX",
        "Components",
        "State",
        "Props",
        "Lifecycle Methods",
      ],
      category: "frontend",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "45 Days Coding Challenge",
      issuer: "Coding Thinker",
      date: "30-08-2025",
      image: codingThinker,
      description:
        "Actively participated in the '45 Days Coding Challenge' organized by Coding Thinker from 14th July 2025, demonstrating consistent effort, enthusiasm, and dedication towards learning Coding, Data Structures, and Algorithms while engaging and growing with the community.",
      link: "",
      badge: codingThinkerLogo,
      skills: [
        "Coding",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Consistency",
        "Community Engagement",
      ],
      category: "challenge",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const categories = [
    { id: "all", name: "All Certificates", icon: "Award" },
    { id: "problem-solving", name: "Problem Solving", icon: "Brain" },
    { id: "frontend", name: "Frontend", icon: "Code" },
    { id: "language", name: "Languages", icon: "Globe" },
    { id: "challenge", name: "Challenges", icon: "Trophy" },
  ];

  const filteredAchievements =
    filter === "all"
      ? achievements
      : achievements.filter((item) => item.category === filter);

  const stats = [
    { label: "Total Certificates", value: achievements.length, icon: "Award" },
    {
      label: "HackerRank Certificates",
      value: achievements.filter((a) => a.issuer === "HackerRank").length,
      icon: "Code",
    },
    {
      label: "Skills Mastered",
      value: achievements.reduce((acc, curr) => acc + curr.skills.length, 0),
      icon: "Brain",
    },
    { label: "Active Year", value: "2025", icon: "Calendar" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <Header />

      {/* Hero Section with Stats */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />

        <div className="relative z-10 container-brand text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mb-6 border border-blue-200 dark:border-blue-800">
              <Icon
                name="Award"
                size={16}
                className="text-blue-600 dark:text-blue-400"
              />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Verified Achievements
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              My{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Certificates and recognitions that reflect my learning journey,
              dedication, and expertise in web development.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-y border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm sticky top-20 z-40">
        <div className="container-brand">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  filter === cat.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Icon name={cat.icon} size={14} />
                {cat.name}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16">
        <div className="container-brand">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAchievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Issuer Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <img
                        src={item.badge}
                        alt={item.issuer}
                        className="w-4 h-4 rounded-full"
                      />
                      <span>{item.issuer}</span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                      {item.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                          +{item.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View Button */}
                    <button
                      onClick={() => setSelectedCertificate(item)}
                      className="inline-flex items-center justify-between w-full group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-[2px] hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between w-full bg-white dark:bg-gray-800 rounded-xl px-4 py-2.5 group-hover/btn:bg-transparent transition-all">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/btn:text-white">
                          View Certificate
                        </span>
                        <Icon
                          name="ExternalLink"
                          size={16}
                          className="text-gray-500 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all"
                        />
                      </div>
                    </button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-3xl w-full shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative h-64 bg-gradient-to-br from-blue-600 to-purple-600">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-contain object-center"
                />
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={selectedCertificate.badge}
                    alt={selectedCertificate.issuer}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedCertificate.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCertificate.issuer} • {selectedCertificate.date}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  {selectedCertificate.description}
                </p>

                {/* Skills Section */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Skills Verified:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCertificate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  {selectedCertificate.link ? (
                    <a
                      href={selectedCertificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all"
                    >
                      <Icon name="ShieldCheck" size={18} />
                      <span>Verify Certificate</span>
                    </a>
                  ) : (
                    <div className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-xl cursor-not-allowed">
                      <Icon name="ShieldCheck" size={18} />
                      <span>Verification Link Unavailable</span>
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-2xl mx-auto text-center text-white px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to See These Skills in Action?
          </h2>
          <p className="text-white/90 mb-8 text-lg">
            Explore my projects where I've applied these technologies and earned
            these certifications in real-world applications.
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Icon name="FolderOpen" size={18} />
            View My Projects
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="container-brand text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Ratnakar Singh Parihar. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Built with ❤️ using React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AchievementsPage;
