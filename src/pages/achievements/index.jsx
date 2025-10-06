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

const AchievementsPage = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    document.title = "Achievements | Ratnakar Singh Parihar";
    window.scrollTo(0, 0);
  }, []);

  const achievements = [
    {
      title: "Problem Solving (Basic)",
      issuer: "HackerRank",
      date: "2024",
      image: problemSolvingBasic,
      description:
        "Demonstrated strong analytical thinking and mastery in basic algorithmic concepts including loops, arrays, and conditionals through HackerRank’s coding challenges.",
      link: "https://www.hackerrank.com/certificates",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["Algorithms", "Logic Building", "Basic Data Structures"],
    },
    {
      title: "Problem Solving (Intermediate)",
      issuer: "HackerRank",
      date: "2023",
      image: problemSolvingIntermedated,
      description:
        "Validated advanced problem-solving ability through complex challenges covering recursion, sorting, and optimization algorithms on HackerRank.",
      link: "https://www.hackerrank.com/certificates",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["Algorithms", "Optimization", "Recursion", "Time Complexity"],
    },
    {
      title: "JavaScript (Basic)",
      issuer: "HackerRank",
      date: "2023",
      image: javaScriptBasic,
      description:
        "Earned certification for core JavaScript programming skills including ES6 features, control flow, and DOM fundamentals through HackerRank assessment.",
      link: "https://www.hackerrank.com/certificates",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["JavaScript", "ES6+", "DOM", "Functions"],
    },
    {
      title: "Frontend Development (React)",
      issuer: "HackerRank",
      date: "2023",
      image: frontendRect,
      description:
        "Proven ability to build interactive user interfaces with React, handling props, hooks, and state management efficiently using best coding practices.",
      link: "https://www.hackerrank.com/certificates",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["React", "Hooks", "State Management", "Component Architecture"],
    },
    {
      title: "REST API (Intermediate)",
      issuer: "HackerRank",
      date: "2023",
      image: reactBasic,
      description:
        "Certified for understanding and implementing RESTful APIs, HTTP methods, and JSON handling for building real-world backend integrations.",
      link: "https://www.hackerrank.com/certificates",
      badge:
        "https://upload.wikimedia.org/wikipedia/commons/4/40/HackerRank_Icon-1000px.png",
      skills: ["REST API", "HTTP", "JSON", "Backend Integration"],
    },

    // {
    //   title: "MERN Stack Projects",
    //   issuer: "Personal Projects",
    //   date: "2024",
    //   image: "",
    //   description:
    //     "Developed full-stack applications using React, Node.js, MongoDB, and Tailwind CSS.",
    //   link: "/projects",
    // },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-primary/5 to-background text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          My <span className="text-gradient-brand">Achievements & Certificates</span>
        </motion.h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Certificates and projects that reflect my learning, dedication, and
          experience in web development.
        </p>
      </section>

      {/* Achievements Grid */}
      <section className="py-12">
        <div className="container-brand grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {item.issuer} • {item.date}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                {item.description}
              </p>
              <button
                onClick={() => setSelectedCertificate(item)}
                className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium transition"
              >
                <Icon name="ExternalLink" size={14} className="mr-2" />
                View Certificate
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-brand text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-4">
            Want to See These Skills in Action?
          </h2>
          <p className="text-white/90 mb-6">
            Explore my projects where I’ve applied these technologies and earned
            these certifications in real-world applications.
          </p>
          <a
            href="/projects"
            className="inline-block bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition"
          >
            View My Projects
          </a>
        </motion.div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-xl p-6 max-w-2xl w-full shadow-lg relative"
            >
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>

              <img
                src={selectedCertificate.image}
                alt={selectedCertificate.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />

              <h3 className="text-xl font-semibold mb-2">
                {selectedCertificate.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedCertificate.issuer} • {selectedCertificate.date}
              </p>
              <p className="text-sm text-foreground mb-6">
                {selectedCertificate.description}
              </p>

              <a
                href={selectedCertificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
              >
                <Icon name="ShieldCheck" size={16} />
                <span>Verify Certificate</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-foreground text-background text-center">
        <p className="text-sm text-background/70">
          © {new Date().getFullYear()} Ratnakar Singh Parihar. All rights
          reserved.
        </p>
        <p className="text-xs text-background/50 mt-1">
          Built with ❤️ using React & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};

export default AchievementsPage;
