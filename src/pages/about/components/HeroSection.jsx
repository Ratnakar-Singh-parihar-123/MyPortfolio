import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import AboutImg from "../../../assets/heroImg/hero.jpeg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-b from-background via-surface/30 to-background overflow-hidden">
      <div className="container-brand relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Side - Intro */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Small Intro Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-medium"
            >
              👋 Hi, I’m Ratnakar Singh Parihar
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-foreground leading-tight"
            >
              Aspiring{" "}
              <span className="text-gradient-brand">
                Full-Stack Developer
              </span>{" "}
              <br />
              crafting clean & functional web apps.
            </motion.h1>

            {/* About / Short Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-muted-foreground text-lg leading-relaxed max-w-xl"
            >
              I’m a final-year Computer Science student passionate about
              building modern web applications using the{" "}
              <strong>MERN stack</strong>. I love turning ideas into responsive,
              user-friendly, and scalable solutions.
            </motion.p>

            {/* Quick Info / Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="/projects"
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Icon name="FolderOpen" size={18} />
                View My Projects
              </a>
              <a
                href="mailto:ratnakarsinghparihar@gmail.com"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/40 transition-colors"
              >
                <Icon name="MessageCircle" size={18} />
                Let’s Connect
              </a>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center"
          >
            <div className="relative w-[320px] md:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden shadow-2xl border border-border bg-card">
              <Image
                src={AboutImg}
                alt="Ratnakar Singh Parihar - Full Stack Developer"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Floating Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-xl p-3 shadow-lg flex items-center space-x-3"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Code2" size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Working on new ideas
                </p>
                <p className="text-xs text-muted-foreground">MERN Stack Dev</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Scroll down</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-5 h-9 border-2 border-muted-foreground rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;