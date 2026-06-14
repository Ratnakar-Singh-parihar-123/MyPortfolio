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
import javaDsaCertificate from "../../assets/caritificatesImg/javaDsaWeb.jpeg";

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
      date: "2025",
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
    {
      title: "Java + DSA + Web Development",
      issuer: "Coding Thinker",
      date: "2026",
      image: javaDsaCertificate,
      description:
        "Successfully completed intensive training in Java Programming, Data Structures & Algorithms, and Web Development at Coding Thinker. Developed strong problem-solving abilities and practical development skills through hands-on learning and projects.",
      link: "",
      badge: codingThinkerLogo,
      skills: [
        "Java",
        "Data Structures",
        "Algorithms",
        "Problem Solving",
        "Web Development",
        "Programming Fundamentals",
      ],
      category: "challenge",
      color: "from-orange-500 to-red-500",
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header />

      {/* Hero Section with Stats */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute rounded-full top-20 -left-32 w-96 h-96 bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute rounded-full bottom-20 -right-32 w-96 h-96 bg-purple-500/20 blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 blur-3xl animate-pulse" />

        <div className="relative z-10 text-center container-brand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-blue-200 rounded-full shadow-lg bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/40 dark:to-purple-900/40 dark:border-blue-800/50 backdrop-blur-sm">
              <Icon
                name="Award"
                size={16}
                className="text-blue-600 dark:text-blue-400"
              />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                Verified Achievements
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              My{" "}
              <span className="text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text">
                Achievements
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Certificates and recognitions that reflect my learning journey,
              dedication, and expertise in web development.
            </p>
          </motion.div>

          {/* Stats Grid with Icons and Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid max-w-4xl grid-cols-2 gap-5 mx-auto mt-16 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative p-6 transition-all duration-300 border shadow-xl group bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 transition-all duration-500 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 rounded-2xl" />
                <Icon
                  name={stat.icon}
                  size={24}
                  className="mx-auto mb-3 text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
                />
                <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter Section (Commented as per original) */}
      {/* <section className="sticky z-40 py-8 border-gray-200 border-y dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm top-20">
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
      </section> */}

      {/* Achievements Grid */}
      <section className="py-20">
        <div className="container-brand">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
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
                  className="relative overflow-hidden transition-all duration-500 bg-white border shadow-xl group dark:bg-slate-800/90 backdrop-blur-sm border-slate-200 dark:border-slate-700 rounded-2xl hover:shadow-2xl hover:-translate-y-2"
                >
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 transition-all duration-700 pointer-events-none bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 rounded-2xl" />

                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 transition-opacity duration-700`}
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-cover object-center w-full h-full transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Issuer Badge with Glass Effect */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <img
                        src={item.badge}
                        alt={item.issuer}
                        className="w-4 h-4 rounded-full"
                      />
                      <span>{item.issuer}</span>
                    </div>

                    {/* Date Badge */}
                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                      {item.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold transition-all duration-300 text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text">
                      {item.title}
                    </h3>

                    <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/70 rounded-full transition-all group-hover:shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 3 && (
                        <span className="px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700/70 rounded-full">
                          +{item.skills.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Modern View Button */}
                    <button
                      onClick={() => setSelectedCertificate(item)}
                      className="group/btn relative w-full inline-flex items-center justify-between overflow-hidden rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 p-[1.5px] hover:from-blue-500 hover:to-purple-600 transition-all duration-500"
                    >
                      <div className="relative flex items-center justify-between w-full bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 transition-all duration-500 group-hover/btn:bg-gradient-to-r group-hover/btn:from-blue-500/10 group-hover/btn:to-purple-600/10">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 group-hover/btn:text-transparent group-hover/btn:bg-gradient-to-r group-hover/btn:from-blue-600 group-hover/btn:to-purple-600 group-hover/btn:bg-clip-text">
                          View Certificate
                        </span>
                        <Icon
                          name="ExternalLink"
                          size={16}
                          className="transition-all duration-300 text-slate-500 group-hover/btn:translate-x-1 group-hover/btn:text-purple-600"
                        />
                      </div>
                    </button>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Enhanced Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden bg-white shadow-2xl dark:bg-slate-900 rounded-3xl"
            >
              {/* Modal Gradient Background */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />

              <div className="relative grid md:grid-cols-2">
                {/* Left Side Image */}
                <div className="relative flex items-center justify-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                  <img
                    src={selectedCertificate.image}
                    alt={selectedCertificate.title}
                    className="object-contain w-full h-auto max-h-[320px] md:max-h-[400px] rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
                  />
                </div>

                {/* Right Side Content */}
                <div className="relative p-8">
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="absolute p-2 transition-all rounded-xl top-5 right-5 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110"
                  >
                    <Icon name="X" size={20} className="text-slate-500" />
                  </button>

                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                      <img
                        src={selectedCertificate.badge}
                        alt=""
                        className="rounded-full shadow-lg w-14 h-14 ring-2 ring-blue-500/30"
                      />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text">
                        {selectedCertificate.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {selectedCertificate.issuer} •{" "}
                        {selectedCertificate.date}
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {selectedCertificate.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                      Skills Covered
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 text-sm font-medium rounded-full bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 dark:from-blue-500/10 dark:to-purple-500/10 dark:text-blue-300 shadow-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {selectedCertificate.link && (
                      <a
                        href={selectedCertificate.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 text-sm font-semibold text-center text-white transition-all duration-300 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] hover:shadow-xl"
                      >
                        Verify Certificate
                      </a>
                    )}

                    <button
                      onClick={() => setSelectedCertificate(null)}
                      className="px-6 py-3 text-sm font-semibold transition-all duration-300 border rounded-xl border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:shadow-md"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-xy">
          <div className="absolute inset-0 bg-black/30" />
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
          className="relative z-10 max-w-2xl px-4 mx-auto text-center text-white"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            Ready to See These Skills in Action?
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-white/90">
            Explore my projects where I've applied these technologies and earned
            these certifications in real-world applications.
          </p>
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 font-semibold text-blue-600 transition-all duration-300 bg-white rounded-xl hover:shadow-2xl hover:shadow-white/20"
          >
            <Icon name="FolderOpen" size={18} />
            View My Projects
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-slate-200 dark:border-slate-800">
        <div className="text-center container-brand">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Ratnakar Singh Parihar. All rights
            reserved.
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
            Built with ❤️ using React, Tailwind CSS & Framer Motion
          </p>
        </div>
      </footer>

      {/* Custom keyframes for gradient animation */}
      <style>{`
        @keyframes gradient-xy {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 10s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default AchievementsPage;
