import React, { useState, useEffect } from "react";
import Icon from "../../components/AppIcon";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import LocationMap from "./components/LocationMap";
// import TestimonialsPreview from "./components/TestimonialsPreview";

// logoImg
import logoImg from "../../assets/logo/logo.jpeg";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem("portfolioLanguage") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock form submission logic
      console.log("Form submitted:", formData);

      // In a real application, you would send this data to your backend
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      return { success: true };
    } catch (error) {
      console.error("Form submission error:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const tabs = [
    { id: "form", label: "Contact Form", icon: "MessageSquare" },
    { id: "info", label: "Contact Info", icon: "Info" },
    { id: "location", label: "Location", icon: "MapPin" },
    // { id: "testimonials", label: "Testimonials", icon: "Star" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "form":
        return (
          <ContactForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "info":
        return <ContactInfo />;
      case "location":
        return <LocationMap />;
      default:
        return (
          <ContactForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
            {/* Hero Section */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-12 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="max-w-2xl mx-auto text-center container-brand">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            <Icon name="MessageCircle" size={16} />
            <span>Let’s Connect</span>
          </div>

          {/* Heading */}
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-foreground">
            Let’s Build Something{" "}
            <span className="text-gradient-brand">Together</span>
          </h2>

          {/* Short Description */}
          <p className="mb-8 text-base leading-relaxed md:text-lg text-muted-foreground">
            Got an idea, project, or collaboration in mind? Let’s turn your
            vision into a beautiful and functional web experience.
          </p>

          {/* Availability + Response */}
          <div className="flex flex-col items-center justify-center gap-3 text-sm sm:flex-row">
            <div className="flex items-center gap-2 text-success">
              <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></div>
              <span>
                Available for internships, freelance, and full-time roles
              </span>
            </div>
            <div className="hidden w-px h-4 sm:block bg-border"></div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Replies within 24 hours</span>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container-brand">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* LEFT COLUMN: Contact Info, Socials, FAQs */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Contact Card Details */}
                <div className="p-6 border bg-card border-border rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Icon name="Mail" size={22} className="text-primary" />
                    <span>Contact Information</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Feel free to reach out directly via email, phone, or social channels.
                  </p>

                  <div className="space-y-3 pt-2">
                    {/* Email */}
                    <a
                      href="mailto:ratnakarsinghparihar9399@gmail.com"
                      className="flex items-center gap-3.5 p-3.5 border rounded-xl border-border/70 bg-muted/30 hover:bg-muted transition-all group"
                    >
                      <div className="flex items-center justify-center rounded-lg w-10 h-10 bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                        <Icon name="Mail" size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Email Me</p>
                        <p className="text-sm font-medium text-foreground truncate">
                          ratnakarsinghparihar9399@gmail.com
                        </p>
                      </div>
                    </a>

                    {/* Phone */}
                    <a
                      href="tel:+919399741051"
                      className="flex items-center gap-3.5 p-3.5 border rounded-xl border-border/70 bg-muted/30 hover:bg-muted transition-all group"
                    >
                      <div className="flex items-center justify-center rounded-lg w-10 h-10 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                        <Icon name="Phone" size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Call / WhatsApp</p>
                        <p className="text-sm font-medium text-foreground">
                          +91 93997 41051
                        </p>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex items-center gap-3.5 p-3.5 border rounded-xl border-border/70 bg-muted/30">
                      <div className="flex items-center justify-center rounded-lg w-10 h-10 bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        <Icon name="MapPin" size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Location</p>
                        <p className="text-sm font-medium text-foreground">
                          Bhopal, MP, India
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Connect on Social Media
                    </p>
                    <div className="flex items-center gap-3">
                      <a
                        href="https://github.com/Ratnakar-Singh-parihar-123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        aria-label="GitHub"
                      >
                        <Icon name="Github" size={18} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        aria-label="LinkedIn"
                      >
                        <Icon name="Linkedin" size={18} />
                      </a>
                      <a
                        href="https://x.com/RatnakarSi85551"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        aria-label="Twitter"
                      >
                        <Icon name="Twitter" size={18} />
                      </a>
                      <a
                        href="https://www.instagram.com/krishna_singh_pratihar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        aria-label="Instagram"
                      >
                        <Icon name="Instagram" size={18} />
                      </a>
                    </div>
                  </div>

                </div>

                {/* FAQ Section */}
                <div className="p-6 border bg-card border-border rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} className="text-primary" />
                    <span>Quick FAQ</span>
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50">
                      <p className="font-bold text-foreground mb-1">
                        🕒 What is your typical project timeline?
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Timelines range from 2–6 weeks depending on scope, features, and platform (web or React Native).
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50">
                      <p className="font-bold text-foreground mb-1">
                        💼 Are you available for full-time roles?
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Yes! I am actively open to Full-Time, Internship, and Freelance opportunities in Full-Stack & React Native development.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: Contact Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-brand">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl text-foreground">
              Ready to Build Something Amazing?
            </h2>
            <p className="mb-8 text-xl text-muted-foreground">
              Have a project idea or an opportunity to collaborate? Let’s
              connect and build something amazing together.
            </p>
            <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setActiveTab("form")}
                className="flex items-center px-8 py-3 space-x-2 font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="MessageSquare" size={18} />
                <span>Start a Conversation</span>
              </button>
              <a
                href="/projects"
                className="flex items-center px-8 py-3 space-x-2 font-medium transition-colors border rounded-lg border-border text-foreground hover:bg-muted"
              >
                <Icon name="Eye" size={18} />
                <span>View My Work</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 pb-28 sm:pb-32 border-t border-border bg-background">
        <div className="container-brand">
          <div className="grid items-start gap-10 md:grid-cols-3">
            {/* Brand Section */}
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-[2px]">
                <div className="flex items-center justify-center w-full h-full bg-background rounded-xl">
                  <img
                    src={logoImg}
                    alt="RSP Logo"
                    className="object-contain rounded-md w-7 h-7"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Ratnakar Singh Parihar
                </h3>

                <p className="max-w-xs mt-1 text-sm text-muted-foreground">
                  Full Stack & React Native Developer passionate about creating
                  scalable web and mobile applications with modern technologies,
                  clean code, and great user experiences.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Quick Links</span>

              <a href="/" className="transition-colors hover:text-foreground">
                Home
              </a>
              <a
                href="/about"
                className="transition-colors hover:text-foreground"
              >
                About
              </a>
              <a
                href="/projects"
                className="transition-colors hover:text-foreground"
              >
                Projects
              </a>
              <a
                href="/skills"
                className="transition-colors hover:text-foreground"
              >
                Skills
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">
                Connect With Me
              </span>

              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Ratnakar-Singh-parihar-123"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all rounded-md hover:bg-muted hover:scale-105"
                >
                  <Icon name="Github" size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 transition-all rounded-md hover:bg-muted hover:scale-105"
                >
                  <Icon name="Linkedin" size={18} />
                </a>

                <a
                  href="mailto:ratnakarsinghparihar9399@gmail.com"
                  className="p-2 transition-all rounded-md hover:bg-muted hover:scale-105"
                >
                  <Icon name="Mail" size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 mt-10 text-sm text-center border-t border-border text-muted-foreground">
            © {new Date().getFullYear()} Ratnakar Singh Parihar. Built with
            React.js & Tailwind CSS.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
