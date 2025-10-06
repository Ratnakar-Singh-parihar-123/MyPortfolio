import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import HeroImg from "../../../assets/heroImg/hero.jpeg";
import { Link } from "react-router-dom";
import ResumePopup from "../../../components/ResumePopup"; // ✅ added import

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ✅ added for popup

  const taglines = [
    "Full-Stack Developer & UI/UX Enthusiast",
    "Turning Ideas into Interactive Experiences",
    "Bridging Frontend Creativity with Backend Logic",
    "React Specialist & Problem Solver",
    "Designing Seamless Digital Experiences",
    "Building Scalable, Modern Web Solutions",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleVideo = () => setIsVideoPlaying(!isVideoPlaying);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-surface to-muted pt-24 md:pt-28 lg:pt-32">
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/40"></div>
        </div>
        {/* Background animation control */}
        <button
          onClick={toggleVideo}
          className="absolute bottom-6 right-6 z-10 p-3 bg-background/80 backdrop-blur-sm rounded-full border border-border hover:bg-background transition-all duration-200"
        >
          <Icon name={isVideoPlaying ? "Pause" : "Play"} size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container-brand pb-20 sm:pb-28 md:pb-32">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          {/* LEFT COLUMN - TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left w-full"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-success">
                Open to internship, full-time, and freelance opportunities in web development.
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Hi, I'm{" "}
              <span className="text-gradient-brand">
                Ratnakar Singh Parihar
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="h-16 md:h-20 flex items-center justify-center lg:justify-start mb-8"
            >
              <motion.p
                key={currentTagline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium"
              >
                {taglines[currentTagline]}
              </motion.p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed"
            >
              I’m an aspiring Full-Stack Developer specializing in the MERN
              stack. Passionate about turning ideas into responsive,
              user-friendly web apps. With a focus on clean design, efficient
              code, and problem-solving, I aim to build experiences that are
              both functional and meaningful.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link to="/contact">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="text-lg px-8 py-4 w-full sm:w-auto"
                >
                  Contact.
                </Button>
              </Link>

              {/* ✅ View Resume Button */}
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="text-lg px-8 py-4 w-full sm:w-auto"
                onClick={() => setIsPopupOpen(true)}
              >
                View Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN - IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative w-full flex justify-center"
          >
            <div className="relative max-w-md sm:max-w-lg mx-auto">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-[2px] shadow-xl">
                <Image
                  src={HeroImg}
                  alt="Ratnakar Singh Parihar - Full-Stack Developer"
                  className="w-full h-[420px] sm:h-[500px] md:h-[550px] object-cover rounded-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent rounded-3xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ✅ Resume Popup */}
      <ResumePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default HeroSection;