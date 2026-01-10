import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Printer, Eye, EyeOff, FileText, Award, Briefcase, GraduationCap, Star, Globe, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Icon from "./AppIcon";
import Button from "./ui/Button";
import resumefile from "../assets/resume/Ratnakar_Singh_Parihar.pdf";

const ResumePopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("preview");
  const [isPrintView, setIsPrintView] = useState(false);
  const [scale, setScale] = useState(1);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    const handleScroll = (e) => {
      if (modalRef.current?.contains(e.target)) {
        e.stopPropagation();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("scroll", handleScroll, true);
    
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("scroll", handleScroll, true);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumefile;
    link.download = "Ratnakar_Singh_Parihar_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("resume-print-content");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Ratnakar Singh Parihar - Resume</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
              
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }
              
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
                color: #1f2937;
                background: #ffffff;
                padding: 40px;
                max-width: 1000px;
                margin: 0 auto;
              }
              
              .resume-header {
                text-align: center;
                margin-bottom: 40px;
                padding-bottom: 30px;
                border-bottom: 3px solid #3b82f6;
              }
              
              .name {
                font-size: 36px;
                font-weight: 700;
                color: #1e40af;
                margin-bottom: 8px;
                letter-spacing: -0.5px;
              }
              
              .title {
                font-size: 20px;
                font-weight: 500;
                color: #4b5563;
                margin-bottom: 20px;
              }
              
              .contact-info {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 20px;
                font-size: 14px;
                color: #6b7280;
              }
              
              .contact-item {
                display: flex;
                align-items: center;
                gap: 6px;
              }
              
              .section {
                margin-bottom: 30px;
                page-break-inside: avoid;
              }
              
              .section-title {
                font-size: 18px;
                font-weight: 600;
                color: #1e40af;
                margin-bottom: 16px;
                padding-bottom: 8px;
                border-bottom: 2px solid #dbeafe;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              
              .experience-item, .education-item {
                margin-bottom: 24px;
                page-break-inside: avoid;
              }
              
              .item-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 8px;
              }
              
              .item-title {
                font-weight: 600;
                font-size: 16px;
                color: #1f2937;
              }
              
              .item-subtitle {
                color: #3b82f6;
                font-size: 14px;
              }
              
              .item-date {
                color: #6b7280;
                font-size: 14px;
                font-weight: 500;
              }
              
              ul {
                margin-left: 20px;
                margin-top: 8px;
              }
              
              li {
                margin-bottom: 4px;
                font-size: 14px;
                color: #4b5563;
              }
              
              .skills-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 10px;
              }
              
              .skill-category h4 {
                font-size: 15px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 10px;
              }
              
              .skill-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
              }
              
              .skill-tag {
                background: #eff6ff;
                color: #1d4ed8;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
                border: 1px solid #dbeafe;
              }
              
              .stats-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 10px;
              }
              
              .stat-item {
                text-align: center;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
              }
              
              .stat-value {
                font-size: 24px;
                font-weight: 700;
                color: #1e40af;
                margin-bottom: 4px;
              }
              
              .stat-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              
              .certifications {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
                margin-top: 10px;
              }
              
              .cert-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 14px;
                color: #4b5563;
              }
              
              .awards {
                margin-top: 10px;
              }
              
              .award-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                border-bottom: 1px solid #f1f5f9;
              }
              
              .award-item:last-child {
                border-bottom: none;
              }
              
              @media print {
                body {
                  padding: 20px;
                }
                
                .section {
                  page-break-inside: avoid;
                }
                
                .no-print {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  const tabs = [
    { id: "preview", label: "PDF Preview", icon: FileText },
    { id: "view", label: "Detailed View", icon: Eye },
  ];

  const skills = {
    "Frontend": ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Material-UI"],
    "Backend": ["Node.js", "Express", "MongoDB", "REST APIs", "JWT Authentication", "Socket.io"],
    "Tools & Others": ["Git", "GitHub", "VS Code", "Postman", "Figma", "Vercel", "Netlify"]
  };

  const experience = [
    {
      title: "Full-Stack Developer Intern",
      company: "PortfolioStudio",
      period: "Jun 2023 - Present",
      location: "Remote",
      achievements: [
        "Developed and maintained 15+ responsive web applications using React and Node.js",
        "Improved application performance by 40% through code optimization techniques",
        "Implemented modern UI/UX designs that increased user engagement by 60%",
        "Collaborated with cross-functional teams using Agile methodologies"
      ]
    },
    {
      title: "Frontend Developer",
      company: "TechCorp Solutions",
      period: "Jan 2023 - May 2023",
      location: "Remote",
      achievements: [
        "Built responsive user interfaces for 10+ client projects",
        "Optimized web applications for performance achieving 95+ Lighthouse scores",
        "Worked with REST APIs and implemented state management solutions",
        "Participated in code reviews and contributed to team knowledge sharing"
      ]
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology in Computer Science",
      institution: "Graphic Era Hill University",
      period: "2021 - 2025",
      details: "Specialized in Web Development and Data Structures",
      gpa: "CGPA: 8.5/10"
    }
  ];

  const certifications = [
    "AWS Certified Cloud Practitioner",
    "MongoDB Certified Developer",
    "Google Cloud Digital Leader",
    "Microsoft Azure Fundamentals"
  ];

  const awards = [
    { title: "Best Project Award", issuer: "University Hackathon", year: "2024" },
    { title: "Outstanding Performance", issuer: "PortfolioStudio", year: "2023" },
    { title: "Coding Competition Winner", issuer: "GeeksforGeeks", year: "2023" }
  ];

  const stats = [
    { value: "260+", label: "LeetCode Problems" },
    { value: "200+", label: "GFG Questions" },
    { value: "8+", label: "Projects Completed" },
    { value: "2+", label: "Years Experience" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Resume</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Ratnakar Singh Parihar</p>
                      </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="flex gap-1 ml-4">
                      {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              activeTab === tab.id
                                ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
                                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {activeTab === "preview" && (
                      <div className="flex items-center gap-1 mr-2">
                        <button
                          onClick={handleZoomOut}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          aria-label="Zoom out"
                        >
                          <Icon name="Minus" size={16} />
                        </button>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 min-w-[50px] text-center">
                          {Math.round(scale * 100)}%
                        </span>
                        <button
                          onClick={handleZoomIn}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                          aria-label="Zoom in"
                        >
                          <Icon name="Plus" size={16} />
                        </button>
                        <button
                          onClick={handleResetZoom}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-sm"
                          aria-label="Reset zoom"
                        >
                          Reset
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Download"
                        iconPosition="left"
                        onClick={handleDownload}
                      >
                        Download PDF
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Printer"
                        iconPosition="left"
                        onClick={handlePrint}
                      >
                        Print
                      </Button>
                      <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                        aria-label="Close"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 80px)" }}>
                {activeTab === "preview" ? (
                  <div className="p-6 bg-gray-50 dark:bg-gray-800">
                    <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
                      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                        <button
                          onClick={handlePrint}
                          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          aria-label="Print"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={handleDownload}
                          className="p-2 bg-blue-600 text-white rounded-lg shadow-sm hover:shadow-md hover:bg-blue-700 transition-all"
                          aria-label="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="overflow-auto p-8">
                        <iframe
                          src={resumefile + "#toolbar=0&navpanes=0"}
                          title="Resume Preview"
                          className="w-full min-h-[500px] border-0"
                          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
                        />
                      </div>
                      
                      <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-center gap-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            PDF loaded from: <span className="font-medium">Ratnakar_Singh_Parihar.pdf</span>
                          </p>
                          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                            Secure PDF
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div id="resume-print-content" className="p-8 bg-white dark:bg-gray-900">
                    {/* Header */}
                    <div className="text-center mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
                      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                        Ratnakar Singh Parihar
                      </h1>
                      <h2 className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-6">
                        Full-Stack Developer & UI/UX Enthusiast
                      </h2>
                      <div className="flex flex-wrap justify-center gap-6 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>ratnakar.parihar@example.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>+91 98765 43210</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>Dehradun, Uttarakhand</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          <span>ratnakar-portfolio.vercel.app</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column */}
                      <div className="lg:col-span-2 space-y-8">
                        {/* Professional Summary */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Professional Summary
                            </h3>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Final year Computer Science student specializing in the MERN stack with 
                            extensive experience in building modern web applications. Passionate about 
                            creating efficient, scalable solutions with clean code and exceptional user 
                            experiences. Proven track record of delivering projects that exceed expectations 
                            while maintaining high code quality standards.
                          </p>
                        </div>

                        {/* Experience */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Experience
                            </h3>
                          </div>
                          
                          {experience.map((exp, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
                            >
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {exp.title}
                                  </h4>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                                      {exp.company}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">•</span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm">
                                      {exp.location}
                                    </span>
                                  </div>
                                </div>
                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full">
                                  {exp.period}
                                </span>
                              </div>
                              <ul className="space-y-2">
                                {exp.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>

                        {/* Skills */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <Icon name="Code" size={20} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              Technical Skills
                            </h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Object.entries(skills).map(([category, skillList], index) => (
                              <motion.div
                                key={category}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5"
                              >
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                                  {category}
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {skillList.map((skill) => (
                                    <span
                                      key={skill}
                                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-200 dark:border-blue-800"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-8">
                        {/* Stats */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                            Quick Stats
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, index) => (
                              <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl border border-blue-100 dark:border-blue-800/50"
                              >
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                                  {stat.value}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                  {stat.label}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Education
                            </h3>
                          </div>
                          
                          {education.map((edu, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700"
                            >
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {edu.degree}
                              </h4>
                              <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                                {edu.institution}
                              </p>
                              <div className="flex justify-between items-center mt-3">
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {edu.period}
                                </span>
                                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                                  {edu.gpa}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                {edu.details}
                              </p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Certifications */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Certifications
                            </h3>
                          </div>
                          
                          <div className="space-y-3">
                            {certifications.map((cert, index) => (
                              <motion.div
                                key={cert}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-sm transition-shadow"
                              >
                                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                                  <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                </div>
                                <span className="text-sm text-gray-700 dark:text-gray-300">
                                  {cert}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Awards */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                              <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                              Awards & Recognition
                            </h3>
                          </div>
                          
                          <div className="space-y-3">
                            {awards.map((award, index) => (
                              <motion.div
                                key={award.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
                              >
                                <div>
                                  <h4 className="font-medium text-gray-900 dark:text-white">
                                    {award.title}
                                  </h4>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {award.issuer}
                                  </p>
                                </div>
                                <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded">
                                  {award.year}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        References and additional project details available upon request
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                        Last updated: January 2024
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <FileText className="w-4 h-4" />
                    <span>
                      {activeTab === "preview" ? "PDF Preview Mode" : "Detailed Resume View"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Download"
                      iconPosition="left"
                      onClick={handleDownload}
                    >
                      Download PDF
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Printer"
                      iconPosition="left"
                      onClick={handlePrint}
                    >
                      Print
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      iconName="Mail"
                      iconPosition="left"
                      className="bg-gradient-to-r from-blue-600 to-purple-600"
                      onClick={() => window.location.href = "mailto:ratnakar.parihar@example.com"}
                    >
                      Contact Me
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResumePopup;