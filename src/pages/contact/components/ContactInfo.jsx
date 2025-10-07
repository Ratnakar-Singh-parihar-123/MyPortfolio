import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: "Mail",
      label: "Email",
      value: "ratnakarsinghparihar9399@gmail.com",
      description: "Best way to reach me for projects and queries",
      action: "mailto:ratnakarsinghparihar9399@gmail.com",
    },
    {
      icon: "Phone",
      label: "Phone",
      value: "+91 93997 41051",
      description: "Available 9 AM - 9 PM",
      action: "tel:+919399741051",
    },
    {
      icon: "MapPin",
      label: "Location",
      value: "Madhya Pradesh, Bhopal, India",
      description: "Available for remote & local collaborations",
    },
  ];

  const socialLinks = [
    {
      icon: "Github",
      label: "GitHub",
      username: "Ratnakar-Singh-parihar-123",
      url: "https://github.com/Ratnakar-Singh-parihar-123",
    },
    {
      icon: "Linkedin",
      label: "LinkedIn",
      username: "in/ratnakar-singh-parihar",
      url: "https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Availability */}
      <div className="bg-success/10 border border-success/20 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
          <div className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></div>
          <h3 className="text-base md:text-lg font-semibold text-success leading-snug">
            Open to internship, full-time, and freelance opportunities in web development.
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Currently available for freelance and full-time roles.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>
        <div className="space-y-3">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={method.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{method.label}</h4>
                  <p className="text-sm text-muted-foreground leading-snug">
                    {method.description}
                  </p>
                </div>
              </div>

              {/* Value (Email / Phone / Location) */}
              {method.action ? (
                <a
                  href={method.action}
                  className="text-primary hover:text-primary/80 text-sm font-medium break-all text-center sm:text-right transition-colors"
                >
                  {method.value}
                </a>
              ) : (
                <span className="text-sm text-foreground/80 text-center sm:text-right break-words">
                  {method.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Connect with Me</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:shadow-md transition-all group"
            >
              <Icon
                name={social.icon}
                size={20}
                className="text-primary group-hover:scale-110 transition-transform"
              />
              <div>
                <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {social.label}
                </div>
                <div className="text-xs text-muted-foreground break-all">
                  {social.username}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="Download"
          iconPosition="left"
          onClick={() =>
            window.open("/Ratnakar_Singh_Parihar_Resume.pdf", "_blank")
          }
        >
          Download Resume
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;