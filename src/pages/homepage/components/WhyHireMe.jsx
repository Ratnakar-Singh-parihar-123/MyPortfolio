import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Shield,
  Users,
  Target,
  Heart,
  Code,
  Briefcase,
  Clock,
  Mail,
  Download,
  Sparkles,
  Trophy,
  Medal,
  Star,
  Crown,
  Phone,
  MapPin,
} from "lucide-react";

const WhyHireMe = () => {
  const [showContact, setShowContact] = useState(false);

  // Why Hire Me - Simple Points
  const whyHireMe = [
    {
      icon: Rocket,
      title: "Fast Learner",
      description: "Quickly adapt to new technologies and frameworks.",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Reliable",
      description:
        "Meet deadlines with quality code. I deliver what I promise.",
      color: "green",
    },
    {
      icon: Users,
      title: "Team Player",
      description: "Great communication and collaboration skills.",
      color: "purple",
    },
    {
      icon: Target,
      title: "Problem Solver",
      description: "I solve problems, not just write code.",
      color: "orange",
    },
    {
      icon: Heart,
      title: "Passionate",
      description: "I genuinely love building great experiences.",
      color: "pink",
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Write maintainable, scalable, and documented code.",
      color: "indigo",
    },
  ];

  // Simple Stats
  const stats = [
    { value: "15+", label: "Projects", icon: Briefcase },
    { value: "3+", label: "Years", icon: Clock },
    { value: "10+", label: "Clients", icon: Users },
    { value: "5+", label: "Awards", icon: Trophy },
  ];

  // Contact Info
  const contactInfo = {
    email: "ratnakarsinghparihar9399@gmail.com",
    phone: "+91 1234567890",
    location: "Mumbai, India",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Header */}
      <header className="pt-20 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Why Hire Me?
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gray-900 dark:text-white">
              Here's Why I'm
            </span>
            <br />
            <span className="text-blue-600 dark:text-blue-400">
              The Right Choice
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            A developer who cares about your project's success as much as you
            do.
          </p>
        </motion.div>
      </header>

      {/* Stats Strip */}
      <div className="container mx-auto px-4 max-w-3xl mb-8">
        <div className="grid grid-cols-4 gap-2 bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Cards */}
      <section className="container mx-auto px-4 max-w-5xl py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {whyHireMe.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-${item.color}-100 dark:bg-${item.color}-900/20 flex items-center justify-center mb-3`}
                >
                  <Icon
                    className={`w-5 h-5 text-${item.color}-600 dark:text-${item.color}-400`}
                  />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Simple CTA */}
      <section className="container mx-auto px-4 max-w-3xl py-12">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-center text-white">
          <h2 className="text-xl font-bold mb-2">Available for Work</h2>
          <p className="text-blue-100 text-sm mb-4">
            Open to freelance and full-time opportunities
          </p>

          <button
            onClick={() => setShowContact(true)}
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>

          <div className="mt-4 text-xs text-blue-100 flex justify-center gap-4">
            <span>{contactInfo.email}</span>
            <span>{contactInfo.location}</span>
          </div>
        </div>
      </section>

      {/* Simple Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-xl max-w-sm w-full p-5"
          >
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">
              Let's Connect
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-blue-500" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-green-500" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {contactInfo.location}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex-1 bg-blue-500 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                Send Email
              </a>
              <button
                onClick={() => setShowContact(false)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setShowContact(true)}
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center justify-center z-40"
      >
        <Mail className="w-5 h-5" />
      </button>
    </div>
  );
};

export default WhyHireMe;
