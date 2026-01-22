import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import HeroImg from "../../../assets/heroImg/hero.jpeg";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup";

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const taglines = [
    {
      text: "MERN Stack Full-Stack Developer | Building End-to-End Web Solutions",
      emoji: "🚀",
      color: "from-blue-500 to-cyan-400",
    },
    {
      text: "Turning Ideas into Functional & Scalable Web Applications",
      emoji: "💡",
      color: "from-purple-500 to-pink-400",
    },
    {
      text: "Crafting Clean Frontends with Powerful Backend Logic",
      emoji: "⚙️",
      color: "from-emerald-500 to-green-400",
    },
    {
      text: "React-Driven Interfaces with Node & MongoDB at the Core",
      emoji: "⚛️",
      color: "from-orange-500 to-yellow-400",
    },
    {
      text: "Focused on Performance, Usability & Real-World Problem Solving",
      emoji: "🎯",
      color: "from-indigo-500 to-purple-400",
    },
    {
      text: "Learning, Building & Growing as a Full-Stack Developer",
      emoji: "📈",
      color: "from-red-500 to-orange-400",
    },
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    });
  };

  const stats = [
    { value: "260+", label: "LeetCode", icon: "Code", color: "text-emerald-500", bgColor: "bg-emerald-50 dark:bg-emerald-900/20" },
    { value: "200+", label: "GFG Questions", icon: "Database", color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-900/20" },
    { value: "8+", label: "Projects", icon: "FolderOpen", color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-900/20" },
    {
      value: "1+",
      label: "Hands-on Development & Freelancing",
      icon: "Code",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    }


  ];

  const techSkills = ["React", "Node.js", "MongoDB", "Express", "TypeScript", "Tailwind CSS"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 pt-16 md:pt-20">

      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
        <div
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out ${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left w-full lg:w-1/2 space-y-10"
          >
            {/* Welcome Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full border border-blue-200 dark:border-blue-700/30"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  👋 Welcome to my Portfolio
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <div className="space-y-2">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-medium text-blue-600 dark:text-blue-400"
                >
                  Hello, I'm
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                >
                  <span className="text-gray-900 dark:text-white">Ratnakar Singh</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Parihar
                  </span>
                </motion.h1>
              </div>
            </div>

            {/* Animated Tagline */}
            <div className="relative min-h-[80px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTagline}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-center lg:justify-start gap-3"
                >
                  <span className="text-2xl" role="img" aria-label="tagline icon">
                    {taglines[currentTagline].emoji}
                  </span>
                  <p className={`text-xl sm:text-2xl font-semibold bg-gradient-to-r ${taglines[currentTagline].color} bg-clip-text text-transparent`}>
                    {taglines[currentTagline].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Tagline Dots */}
              <div className="flex justify-center lg:justify-start gap-2 mt-4">
                {taglines.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTagline(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentTagline
                      ? "w-6 bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }`}
                    aria-label={`Show tagline ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 space-y-4"
            >
              <p>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  Full Stack Developer
                </span>{" "}
                passionate about crafting{" "}
                <span className="font-semibold text-purple-600 dark:text-purple-400">
                  innovative solutions
                </span>{" "}
                and turning ideas into{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  scalable applications
                </span>.
              </p>

              <p>
                Committed to leveraging{" "}
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  modern technologies
                </span>{" "}
                to solve{" "}
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  real-world challenges
                </span>{" "}
                and create a{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  meaningful impact
                </span>.
              </p>
            </motion.div>


            {/* Tech Skills */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pt-4"
            >
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {techSkills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:shadow-md transition-shadow duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div> */}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
            >
              <Link to="/contact" className="w-full sm:w-auto">
                <Button
                  variant="gradient"
                  size="lg"
                  iconName="MessageCircle"
                  className="w-full sm:w-auto px-8 py-3.5 text-base rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Get in Touch
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                iconName="FileText"
                className="w-full sm:w-auto px-8 py-3.5 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                onClick={() => setIsPopupOpen(true)}
              >
                View Resume
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className={`p-4 rounded-xl border border-gray-200 dark:border-gray-900 ${stat.bgColor} hover:shadow-md transition-all duration-300 cursor-default`}
                >
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full lg:w-1/2 flex justify-center"
          >
            <div className="relative max-w-md">
              {/* Glow Effect */}
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl" />

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1 shadow-lg">
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900">
                  {/* Image Skeleton Loader */}
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse rounded-2xl z-10" />
                  )}

                  <Image
                    src={HeroImg}
                    alt="Ratnakar Singh Parihar - Full-Stack Developer"
                    className={`w-full h-[350px] md:h-[450px] object-cover object-center transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Tech Badges */}
              <div className="absolute -bottom-4 -left-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Full-Stack</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Developer</div>
                  </div>
                </motion.div>
              </div>

              <div className="absolute -top-4 -right-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Icon name="Brain" size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">DSA</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Enthusiast</div>

                  </div>
                </motion.div>
              </div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
                className="absolute top-6 -left-2 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-1.5">
                  <Icon name="Award" size={14} />
                  <span>Aspiring Software Engineer</span>

                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center gap-2 group"
          aria-label="Scroll down"
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
            Scroll down
          </span>
          <div className="w-5 h-8 border border-gray-300 dark:border-gray-600 rounded-full flex justify-center group-hover:border-blue-400 transition-colors duration-300">
            <div className="w-1 h-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2 animate-bounce" />
          </div>
        </button>
      </motion.div>

      {/* Resume Popup */}
      <ResumePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;