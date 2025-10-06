import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';
import Button from './ui/Button';

const ResumeModal = ({ isOpen, onClose }) => {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  const handleDownloadPDF = () => {
    // Create a dummy PDF download - in real application, this would be an actual PDF file
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,'; // In real app, this would be the actual PDF URL
    link.download = 'Alex-Chen-Resume.pdf';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('resume-content');
    if (printContent) {
      const printWindow = window.open('', '_blank');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Resume Preview</h2>
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
                  className="w-10 h-10 bg-muted hover:bg-muted/80 rounded-full flex items-center justify-center transition-colors"
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
                <div className="text-center space-y-4">
                  <h1 className="text-4xl font-bold text-foreground">Alex Chen</h1>
                  <h2 className="text-xl text-primary font-medium">Full-Stack Developer & UI/UX Designer</h2>
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
                  <h3 className="section-title text-lg font-semibold text-primary mb-3 pb-2 border-b border-border">
                    Professional Summary
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Experienced Full-Stack Developer and UI/UX Designer with 3+ years of expertise in creating 
                    exceptional digital experiences. Specialized in React, Node.js, and modern web technologies. 
                    Passionate about transforming complex problems into elegant, user-centered solutions that 
                    drive real business impact. Proven track record of delivering 50+ successful projects with 
                    98% client satisfaction rate.
                  </p>
                </div>

                {/* Experience */}
                <div className="resume-section">
                  <h3 className="section-title text-lg font-semibold text-primary mb-3 pb-2 border-b border-border">
                    Professional Experience
                  </h3>
                  <div className="space-y-6">
                    <div className="item">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="item-title text-foreground font-semibold">Senior Full-Stack Developer</div>
                          <div className="item-subtitle text-primary">PortfolioStudio • San Francisco, CA</div>
                        </div>
                        <div className="text-muted-foreground text-sm">2022 - Present</div>
                      </div>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Led development of 15+ enterprise web applications using React, Node.js, and MongoDB</li>
                        <li>Improved application performance by 40% through code optimization and modern deployment practices</li>
                        <li>Collaborated with cross-functional teams to deliver projects 20% faster than industry average</li>
                        <li>Mentored junior developers and established coding standards that reduced bugs by 35%</li>
                      </ul>
                    </div>
                    
                    <div className="item">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="item-title text-foreground font-semibold">Frontend Developer</div>
                          <div className="item-subtitle text-primary">TechCorp Inc. • Remote</div>
                        </div>
                        <div className="text-muted-foreground text-sm">2021 - 2022</div>
                      </div>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                        <li>Developed responsive web applications for 10+ clients using React and TypeScript</li>
                        <li>Implemented modern UI/UX designs that increased user engagement by 60%</li>
                        <li>Optimized applications for performance, achieving 95+ Lighthouse scores consistently</li>
                        <li>Collaborated with designers to translate wireframes into pixel-perfect interfaces</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="resume-section">
                  <h3 className="section-title text-lg font-semibold text-primary mb-3 pb-2 border-b border-border">
                    Education
                  </h3>
                  <div className="item">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="item-title text-foreground font-semibold">Bachelor of Science in Computer Science</div>
                        <div className="item-subtitle text-primary">Tech University • San Francisco, CA</div>
                      </div>
                      <div className="text-muted-foreground text-sm">2018 - 2021</div>
                    </div>
                    <p className="text-muted-foreground">Graduated Magna Cum Laude • GPA: 3.8/4.0</p>
                  </div>
                </div>

                {/* Skills */}
                <div className="resume-section">
                  <h3 className="section-title text-lg font-semibold text-primary mb-3 pb-2 border-b border-border">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Frontend Technologies</h4>
                      <div className="skills flex flex-wrap gap-2">
                        {['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Framer Motion']?.map(skill => (
                          <span key={skill} className="skill-tag bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Backend Technologies</h4>
                      <div className="skills flex flex-wrap gap-2">
                        {['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST APIs']?.map(skill => (
                          <span key={skill} className="skill-tag bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Cloud & DevOps</h4>
                      <div className="skills flex flex-wrap gap-2">
                        {['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD', 'Vercel']?.map(skill => (
                          <span key={skill} className="skill-tag bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Design & Tools</h4>
                      <div className="skills flex flex-wrap gap-2">
                        {['Figma', 'Adobe XD', 'Git', 'Jira', 'Slack', 'VS Code']?.map(skill => (
                          <span key={skill} className="skill-tag bg-muted text-muted-foreground px-2 py-1 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="resume-section">
                  <h3 className="section-title text-lg font-semibold text-primary mb-3 pb-2 border-b border-border">
                    Certifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'AWS Certified Solutions Architect',
                      'Google Cloud Professional Developer',
                      'MongoDB Certified Developer',
                      'Certified Kubernetes Administrator'
                    ]?.map(cert => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Icon name="Award" size={16} className="text-primary" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Awards */}
                <div className="resume-section">
                  <h3 className="section-title text-lg font-semibold text-primary mb-3 pb-2 border-b border-border">
                    Awards & Recognition
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-medium">Developer of the Year</span>
                      <span className="text-muted-foreground text-sm">TechCorp Inc. • 2022</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground font-medium">Outstanding Innovation Award</span>
                      <span className="text-muted-foreground text-sm">Tech University • 2021</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;