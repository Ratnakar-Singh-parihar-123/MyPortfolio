import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./AppIcon";
import Button from "./ui/Button";

const ResumeModal = ({ isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleDownloadPDF = () => {
    // Create a dummy PDF download - in real application, this would be an actual PDF file
    const link = document.createElement("a");
    link.href = "data:application/pdf;base64,"; // In real app, this would be the actual PDF URL
    link.download = "Alex-Chen-Resume.pdf";
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = document.getElementById("resume-content");
    if (printContent) {
      const printWindow = window.open("", "_blank");
      printWindow?.document?.write(`
        <html>
          <head>
            <title>Alex Chen - Resume</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 20px; }
              .resume-section { margin-bottom: 20px; }
              .section-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #2563eb; }
              .item { margin-bottom: 15px; }
              .item-title { font-weight: 600; }
              .item-subtitle { color: #666; font-size: 14px; }
              .skills { display: flex; flex-wrap: wrap; gap: 8px; }
              .skill-tag { background: #f3f4f6; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            </style>
          </head>
          <body>
            ${printContent?.innerHTML}
          </body>
        </html>
      `);
      printWindow?.document?.close();
      printWindow?.print();
      printWindow?.close();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 pt-10">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-background border border-border rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">
                Resume Preview
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleDownloadPDF}
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
                  className="flex items-center justify-center w-10 h-10 transition-colors rounded-full bg-muted hover:bg-muted/80"
                  aria-label="Close modal"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">
              <div id="resume-content" className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="space-y-4 text-center">
                  <h1 className="text-4xl font-bold text-foreground">
                    Alex Chen
                  </h1>
                  <h2 className="text-xl font-medium text-primary">
                    Full-Stack Developer & UI/UX Designer
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Mail" size={16} />
                      <span>alex.chen@portfoliostudio.com</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Phone" size={16} />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={16} />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Globe" size={16} />
                      <span>portfoliostudio.com</span>
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="resume-section">
                  <h3 className="pb-2 mb-3 text-lg font-semibold border-b section-title text-primary border-border">
                    Professional Summary
                  </h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Experienced Full-Stack Developer and UI/UX Designer with 3+
                    years of expertise in creating exceptional digital
                    experiences. Specialized in React, Node.js, and modern web
                    technologies. Passionate about transforming complex problems
                    into elegant, user-centered solutions that drive real
                    business impact. Proven track record of delivering 50+
                    successful projects with 98% client satisfaction rate.
                  </p>
                </div>

                {/* Experience */}
                <div className="resume-section">
                  <h3 className="pb-2 mb-3 text-lg font-semibold border-b section-title text-primary border-border">
                    Professional Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="item">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold item-title text-foreground">
                            Senior Full-Stack Developer
                          </div>
                          <div className="item-subtitle text-primary">
                            PortfolioStudio • San Francisco, CA
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          2022 - Present
                        </div>
                      </div>
                      <ul className="ml-4 space-y-1 list-disc list-inside text-muted-foreground">
                        <li>
                          Led development of 10+ enterprise web applications and
                          mobile apps using React,React Native, Tailwind CSS,
                          Node.js, Express.js and MongoDB
                        </li>
                        <li>
                          Improved application performance by 40% through code
                          optimization and modern deployment practices
                        </li>
                        <li>
                          Collaborated with cross-functional teams to deliver
                          projects 20% faster than industry average
                        </li>
                        <li>
                          Mentored junior developers and established coding
                          standards that reduced bugs by 35%
                        </li>
                      </ul>
                    </div>

                    <div className="item">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold item-title text-foreground">
                            Frontend Developer
                          </div>
                          <div className="item-subtitle text-primary">
                            TechCorp Inc. • Remote
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          2021 - 2022
                        </div>
                      </div>
                      <ul className="ml-4 space-y-1 list-disc list-inside text-muted-foreground">
                        <li>
                          Developed responsive web applications for 10+ clients
                          using React and JavaScript
                        </li>
                        {/* <li>
                          Implemented modern UI/UX designs that increased user
                          engagement by 60%
                        </li> */}
                        <li>
                          Optimized applications for performance, achieving 95+
                          Lighthouse scores consistently
                        </li>
                        <li>
                          Collaborated with designers to translate wireframes
                          into pixel-perfect interfaces
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="resume-section">
                  <h3 className="pb-2 mb-3 text-lg font-semibold border-b section-title text-primary border-border">
                    Education
                  </h3>

                  <div className="item">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-semibold item-title text-foreground">
                          Bachelor of Technology in Computer Science &
                          Engineering
                        </div>

                        <div className="item-subtitle text-primary">
                          IES Institute of Technology and Management • Bhopal,
                          Madhya Pradesh
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        2022 - 2026
                      </div>
                    </div>

                    {/* <p className="text-muted-foreground">
                      CGPA: 8.01/10.0 • B.Tech Completed
                    </p> */}
                  </div>
                </div>
                {/* Skills */}
                <div className="resume-section">
                  <h3 className="pb-2 mb-3 text-lg font-semibold border-b section-title text-primary border-border">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        Frontend Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2 skills">
                        {[
                          "React",
                          "React-Native",
                          "Tailwind CSS",
                          "CSS",
                          "Framer Motion",
                        ]?.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded skill-tag bg-muted text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        Backend Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2 skills">
                        {[
                          "Java",
                          "JavaScript",
                          "Node.js",
                          "Express.js",
                          "MongoDB",
                          "MySQL",
                          "REST APIs",
                        ]?.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded skill-tag bg-muted text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      {/* <h4 className="mb-2 font-medium text-foreground">
                        Cloud & DevOps
                      </h4>
                      <div className="flex flex-wrap gap-2 skills">
                        {[
                          "AWS",
                          "Google Cloud",
                          "Docker",
                          "Kubernetes",
                          "CI/CD",
                          "Vercel",
                        ]?.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded skill-tag bg-muted text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div> */}
                    </div>
                    <div>
                      <h4 className="mb-2 font-medium text-foreground">
                        Design & Tools
                      </h4>
                      <div className="flex flex-wrap gap-2 skills">
                        {[
                          "Git",
                          "GitHub",
                          "IntelliJ IDEA",
                          "VS Code",
                          "Android Studio",
                        ]?.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 text-xs rounded skill-tag bg-muted text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="resume-section">
                  <h3 className="pb-2 mb-3 text-lg font-semibold border-b section-title text-primary border-border">
                    Certifications
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      [
                        "HackerRank React (Basic)",
                        "HackerRank JavaScript (Basic)",
                        "HackerRank Problem Solving (Basic)",
                        "HackerRank Problem Solving (Intermediate)",
                        "Coding Thinker MERN Stack Development",
                        "Coding Thinker Java DSA",
                      ],
                    ]?.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Icon name="Award" size={16} className="text-primary" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                {/* <div className="resume-section">
                  <h3 className="pb-2 mb-3 text-lg font-semibold border-b section-title text-primary border-border">
                    Awards & Recognition
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        Developer of the Year
                      </span>
                      <span className="text-sm text-muted-foreground">
                        TechCorp Inc. • 2022
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        Outstanding Innovation Award
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Tech University • 2021
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
