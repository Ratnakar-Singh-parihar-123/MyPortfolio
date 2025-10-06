import React, { useState, useEffect } from "react";
import Header from "../../components/ui/Header";
import Icon from "../../components/AppIcon";
import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";
import LocationMap from "./components/LocationMap";
// import TestimonialsPreview from "./components/TestimonialsPreview";

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
      <Header />
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-primary/5 to-background">
        <div className="container-brand">
          <div className="max-w-3xl mx-auto text-center">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-5">
              <Icon name="MessageCircle" size={16} />
              <span>Let’s Connect</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Let’s Build Something
              <span className="text-gradient-brand block">
                Amazing Together
              </span>
            </h1>

            {/* Short Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Have an idea or project in mind? I’d love to hear about it and see
              how we can turn your vision into a real web experience using
              modern technologies.
            </p>

            {/* Status Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-success">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="font-medium">Open for new projects</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Replies within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16">
        <div className="container-brand">
          <div className="max-w-7xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center mb-12">
              <div className="bg-card border border-border rounded-xl p-2 inline-flex">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeTab === tab?.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2">
                <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
                  {renderTabContent()}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* 🌟 Quick Contact */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Mail" size={20} />
                    <span>Quick Contact</span>
                  </h3>

                  <div className="space-y-3">
                    {/* Email */}
                    <a
                      href="mailto:ratnakarsinghparihar@gmail.com"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition"
                    >
                      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Mail" size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Email Me</p>
                        <p className="text-sm text-muted-foreground">
                          ratnakarsinghparihar@gmail.com
                        </p>
                      </div>
                    </a>

                    {/* Phone */}
                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition"
                    >
                      <div className="w-9 h-9 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="Phone" size={18} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Call Me</p>
                        <p className="text-sm text-muted-foreground">
                          +91 98765 43210
                        </p>
                      </div>
                    </a>

                    {/* Schedule */}
                    <button
                      onClick={() =>
                        window.open(
                          "https://calendly.com/ratnakar-meeting",
                          "_blank"
                        )
                      }
                      className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-muted transition w-full text-left"
                    >
                      <div className="w-9 h-9 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon
                          name="Calendar"
                          size={18}
                          className="text-accent"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          Schedule a Call
                        </p>
                        <p className="text-sm text-muted-foreground">
                          30-minute chat
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* ⏰ Response Info */}
                <div className="bg-muted rounded-xl p-5 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Clock" size={18} />
                    <h3 className="text-lg font-semibold">Response Time</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    I usually reply within{" "}
                    <span className="font-medium">24 hours</span> on weekdays.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span>Open for new projects</span>
                  </div>
                </div>

                {/* 💬 FAQ Section */}
                <div className="bg-card border border-border rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} />
                    <span>Quick FAQ</span>
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">
                        🕒 What’s your typical project timeline?
                      </p>
                      <p className="text-muted-foreground">
                        Usually 4–10 weeks depending on complexity.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground">
                        🌍 Do you work with international clients?
                      </p>
                      <p className="text-muted-foreground">
                        Yes, I work with clients from all over the world.
                      </p>
                    </div>

                    <div>
                      <p className="font-medium text-foreground">
                        💻 What technologies do you use?
                      </p>
                      <p className="text-muted-foreground">
                        React, Node.js, Express, and Tailwind CSS.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container-brand">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's discuss your project and explore how we can work together to
              create exceptional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setActiveTab("form")}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <Icon name="MessageSquare" size={18} />
                <span>Start a Conversation</span>
              </button>
              <a
                href="/projects"
                className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-muted transition-colors flex items-center space-x-2"
              >
                <Icon name="Eye" size={18} />
                <span>View My Work</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container-brand">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
                <Icon name="Code2" size={18} color="white" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold text-foreground">
                PortfolioStudio
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} PortfolioStudio. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
