import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Trophy,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Calendar,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  FolderOpen,
  Filter,
} from "lucide-react";

// Certificate Image Imports
import problemSolvingBasic from "../../assets/caritificatesImg/Problem Silving Basic.png";
import problemSolvingIntermedated from "../../assets/caritificatesImg/Problem solving intermedate.png";
import reactBasic from "../../assets/caritificatesImg/React Basic.png";
import frontendRect from "../../assets/caritificatesImg/frontend React.png";
import javaScriptBasic from "../../assets/caritificatesImg/javascript basic.png";
import codingThinker from "../../assets/caritificatesImg/coding-thinker-certificates.png";
import javaDsaCertificate from "../../assets/caritificatesImg/javaDsaWeb.jpeg";

// Brand Logo Imports
import codingThinkerLogo from "../../assets/brandLogos/coding-thinker-logo.png";

const ACHIEVEMENTS_DATA = [
  {
    id: "cert-1",
    title: "Java + DSA + Web Development",
    issuer: "Coding Thinker",
    date: "2026",
    image: javaDsaCertificate,
    isFeatured: true,
    itemType: "certificate",
    description:
      "Successfully completed intensive training in Java Programming, Data Structures & Algorithms, and Full Stack Web Development at Coding Thinker with hands-on project mastery.",
    link: "",
    badge: codingThinkerLogo,
    skills: ["Java", "Data Structures", "Algorithms", "Web Development", "OOP"],
    category: "certificates",
    credentialId: "CT-2026-JAVADSA",
  },
  {
    id: "cert-2",
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    date: "2025",
    image: problemSolvingIntermedated,
    isFeatured: false,
    itemType: "certificate",
    description:
      "Validated advanced algorithmic problem-solving capabilities covering graph algorithms, dynamic programming concepts, and complex recursion challenges on HackerRank.",
    link: "https://www.hackerrank.com/certificates/iframe/cbf68707295d",
    badge:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    skills: ["Algorithms", "Optimization", "Recursion", "Time Complexity"],
    category: "certificates",
    credentialId: "HR-5CE289A1",
  },
  {
    id: "cert-3",
    title: "Frontend Development (React)",
    issuer: "HackerRank",
    date: "2025",
    image: frontendRect,
    isFeatured: false,
    itemType: "certificate",
    description:
      "Certified ability to architect interactive user interfaces with React, managing state, lifecycle hooks, and scalable component architecture efficiently.",
    link: "https://www.hackerrank.com/certificates/iframe/eaae9fd31c8c",
    badge:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    skills: ["React.js", "Hooks", "State Management", "Component Architecture"],
    category: "certificates",
    credentialId: "HR-EAAE9FD3",
  },
  {
    id: "cert-4",
    title: "45 Days Coding Challenge",
    issuer: "Coding Thinker",
    date: "2025",
    image: codingThinker,
    isFeatured: true,
    itemType: "achievement",
    description:
      "Conquered the rigorous 45-day continuous coding challenge, demonstrating discipline, consistency, and algorithmic problem-solving grit across daily DSA problems.",
    link: "",
    badge: codingThinkerLogo,
    skills: ["Consistency", "DSA", "Daily Challenges", "Algorithmic Logic"],
    category: "achievements",
    credentialId: "CT-45DAYS-2025",
  },
  {
    id: "cert-5",
    title: "JavaScript (Basic)",
    issuer: "HackerRank",
    date: "2025",
    image: javaScriptBasic,
    isFeatured: false,
    itemType: "certificate",
    description:
      "Certified in core JavaScript programming skills including ES6+ syntax, asynchronous control flow, closures, and DOM manipulation fundamentals.",
    link: "https://www.hackerrank.com/certificates/iframe/438c3130ea15",
    badge:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    skills: ["JavaScript", "ES6+", "DOM", "Async JS"],
    category: "certificates",
    credentialId: "HR-438C3130",
  },
  {
    id: "cert-6",
    title: "React (Basic)",
    issuer: "HackerRank",
    date: "2025",
    image: reactBasic,
    isFeatured: false,
    itemType: "certificate",
    description:
      "Validated foundational React development competencies including JSX syntax, functional components, props drilling, and state hooks.",
    link: "https://www.hackerrank.com/certificates/iframe/240df00a1852",
    badge:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    skills: ["React", "JSX", "Props & State", "Functional Components"],
    category: "certificates",
    credentialId: "HR-240DF00A",
  },
  {
    id: "cert-7",
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "2025",
    image: problemSolvingBasic,
    isFeatured: false,
    itemType: "certificate",
    description:
      "Demonstrated strong core analytical thinking and foundational data structures logic through HackerRank's coding challenges.",
    link: "https://www.hackerrank.com/certificates/iframe/5ce289a1a111",
    badge:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
    skills: ["Data Structures", "Logic Building", "Conditionals & Loops"],
    category: "certificates",
    credentialId: "HR-5CE289A1-BASIC",
  },
];

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);

  useEffect(() => {
    document.title = "Achievements & Certificates | Ratnakar Singh Parihar";
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = ACHIEVEMENTS_DATA.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "achievements") return item.itemType === "achievement";
    if (activeTab === "certificates") return item.itemType === "certificate";
    return true;
  });

  const selectedItem =
    selectedModalIndex !== null ? filteredItems[selectedModalIndex] : null;

  const handleNextModal = () => {
    if (selectedModalIndex !== null) {
      setSelectedModalIndex((selectedModalIndex + 1) % filteredItems.length);
    }
  };

  const handlePrevModal = () => {
    if (selectedModalIndex !== null) {
      setSelectedModalIndex(
        (selectedModalIndex - 1 + filteredItems.length) % filteredItems.length,
      );
    }
  };

  return (
    <div className="min-h-screen px-4 pt-20 pb-32 overflow-hidden transition-colors sm:pt-24 lg:pt-28 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Background Ambient Glow – now using indigo/purple */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-indigo-500/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 text-center sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-semibold tracking-wide mb-4">
            <Trophy className="w-4 h-4 text-indigo-500" />
            Verified Portfolio Certifications
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-slate-900 dark:text-white">
            Achievements &{" "}
            <span className="text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-clip-text">
              Certificates
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-base leading-relaxed sm:text-lg text-slate-600 dark:text-slate-400">
            Milestones, certifications and achievements that represent my
            continuous growth, technical mastery, and problem-solving
            dedication.
          </p>

          {/* Category Switcher – unified styling */}
          <div className="inline-flex p-1 mt-8 border shadow-inner rounded-2xl bg-slate-200/80 dark:bg-slate-900 border-slate-300/80 dark:border-slate-800">
            {[
              { id: "all", label: "All Items" },
              { id: "achievements", label: "Achievements" },
              { id: "certificates", label: "Certificates" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="categoryActivePill"
                    className="absolute inset-0 bg-white shadow-md dark:bg-slate-800 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Asymmetric Staggered Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const isFeatured = item.isFeatured;

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  onClick={() => setSelectedModalIndex(index)}
                  className={`group relative cursor-pointer rounded-3xl overflow-hidden transition-all duration-300 border ${
                    isFeatured
                      ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-indigo-500/5 to-purple-500/5 dark:from-slate-900 dark:via-indigo-500/10 dark:to-purple-500/10 border-indigo-500/40 shadow-xl"
                      : "bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700"
                  }`}
                >
                  {/* Featured Badge – now indigo/purple */}
                  {isFeatured && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5" />
                      Featured Milestone
                    </div>
                  )}

                  {/* Document Image Preview Container */}
                  <div
                    className={`relative overflow-hidden ${
                      isFeatured ? "h-64 sm:h-80" : "h-52 sm:h-60"
                    } bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-3`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-contain w-full h-full transition-transform duration-500 rounded-2xl group-hover:scale-105 group-hover:drop-shadow-xl"
                    />

                    {/* Issuer Brand Badge overlay */}
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-white/10">
                      <img
                        src={item.badge}
                        alt={item.issuer}
                        className="w-4 h-4 rounded-full"
                      />
                      <span>{item.issuer}</span>
                    </div>

                    {/* Date Tag */}
                    <div className="absolute bottom-4 left-4 z-20 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold">
                      {item.date}
                    </div>

                    {/* Hover Reveal Glass Overlay Button */}
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-slate-950/40 backdrop-blur-xs group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold transition-transform duration-300 transform translate-y-2 bg-white shadow-2xl rounded-xl dark:bg-slate-900 text-slate-900 dark:text-white group-hover:translate-y-0">
                        <Search className="w-4 h-4 text-indigo-500" />
                        View Certificate
                      </span>
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="p-5 sm:p-6">
                    <h3 className="mb-1 text-lg font-bold transition-colors sm:text-xl text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      {item.title}
                    </h3>
                    <p className="flex items-center gap-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
                      <Building2 className="w-3.5 h-3.5" /> {item.issuer}
                    </p>

                    <p className="mb-4 text-xs leading-relaxed sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Skill Tags – now uniform indigo */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 text-[11px] font-medium rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* LIGHTBOX CERTIFICATE MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <CertificateModal
            item={selectedItem}
            currentIndex={selectedModalIndex}
            totalItems={filteredItems.length}
            onClose={() => setSelectedModalIndex(null)}
            onNext={handleNextModal}
            onPrev={handlePrevModal}
          />
        )}
      </AnimatePresence>

      {/* CTA Footer Section – now indigo/purple gradient */}
      <section className="relative max-w-5xl p-8 mx-auto mt-24 overflow-hidden text-center text-white shadow-2xl rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 sm:p-12">
        <h2 className="mb-4 text-3xl font-extrabold sm:text-4xl">
          Ready to See These Verified Skills in Action?
        </h2>
        <p className="max-w-xl mx-auto mb-8 text-sm sm:text-base text-white/90">
          Explore my production projects where I've applied these data
          structures, React frontend, and full-stack engineering skills.
        </p>
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-bold text-sm shadow-xl hover:bg-slate-100 transition-all"
        >
          <FolderOpen className="w-4 h-4 text-indigo-600" />
          View Featured Projects
        </a>
      </section>
    </div>
  );
};

// Sub-Component for Lightbox Modal – unified indigo theme
function CertificateModal({
  item,
  currentIndex,
  totalItems,
  onClose,
  onNext,
  onPrev,
}) {
  const [zoomLevel, setZoomLevel] = useState(1);

  useEffect(() => {
    setZoomLevel(1);
  }, [item.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "+" || e.key === "=")
        setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
      if (e.key === "-") setZoomLevel((prev) => Math.max(prev - 0.25, 1));
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto no-scrollbar bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row"
      >
        {/* Top Controls Toolbar */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-700/60 shadow-xl">
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5))}
            className="p-2 transition-colors rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.25, 1))}
            className="p-2 transition-colors rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            className="p-2 transition-colors rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
            title="Reset Zoom"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-slate-700 mx-0.5" />
          <button
            onClick={onClose}
            className="p-2 transition-colors rounded-xl text-slate-300 hover:text-white hover:bg-red-500/80"
            title="Close (ESC)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Left Side: Document Preview */}
        <div className="relative md:w-3/5 bg-slate-950 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[340px] md:min-h-[500px] overflow-hidden select-none">
          <motion.img
            key={item.id}
            src={item.image}
            alt={item.title}
            drag={zoomLevel > 1}
            dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            animate={{ scale: zoomLevel }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full h-auto max-h-[70vh] object-contain rounded-2xl shadow-2xl cursor-grab active:cursor-grabbing"
          />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-800 text-white text-xs font-semibold shadow-xl">
            <button
              onClick={onPrev}
              className="p-1 transition-colors rounded-lg hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              {currentIndex + 1} / {totalItems}
            </span>
            <button
              onClick={onNext}
              className="p-1 transition-colors rounded-lg hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Side: Metadata Panel */}
        <div className="flex flex-col justify-between p-6 md:w-2/5 sm:p-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={item.badge}
                alt={item.issuer}
                className="object-cover w-12 h-12 border shadow-sm rounded-2xl"
              />
              <div>
                <span className="text-xs font-bold tracking-wider text-indigo-500 uppercase">
                  {item.issuer}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Issued Year: {item.date}
                </p>
              </div>
            </div>

            <h2 className="mb-3 text-2xl font-bold leading-snug text-slate-900 dark:text-white">
              {item.title}
            </h2>

            <p className="mb-6 text-xs leading-relaxed sm:text-sm text-slate-600 dark:text-slate-400">
              {item.description}
            </p>

            {item.credentialId && (
              <div className="p-3 mb-6 border rounded-2xl bg-slate-100 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/50">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-0.5">
                  Credential ID:
                </span>
                <span className="font-mono text-xs font-semibold text-indigo-500">
                  {item.credentialId}
                </span>
              </div>
            )}

            {/* Verified Skills – now indigo */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-500" /> Verified
                Competencies:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center flex-1 gap-2 py-3 text-xs font-bold text-white transition-all shadow-lg rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:brightness-110"
              >
                <ExternalLink className="w-4 h-4" />
                Verify Credential
              </a>
            ) : (
              <span className="flex-1 py-3 text-xs font-semibold text-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                Verified Document
              </span>
            )}
            <button
              onClick={onClose}
              className="px-5 py-3 text-xs font-bold transition-colors rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AchievementsPage;
