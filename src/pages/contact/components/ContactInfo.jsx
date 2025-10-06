import React from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: "Mail",
      label: "Email",
      value: "ratnakarsinghparihar@gmail.com",
      description: "Best way to reach me for projects and queries",
      action: "mailto:ratnakarsinghparihar@gmail.com",
    },
    {
      icon: "Phone",
      label: "Phone",
      value: "+91 98765 43210",
      description: "Available 9 AM - 6 PM IST",
      action: "tel:+919876543210",
    },
    {
      icon: "MapPin",
      label: "Location",
      value: "Madhya Pradesh, India",
      description: "Available for remote & local collaborations",
    },
  ];

  const socialLinks = [
    {
      icon: "Github",
      label: "GitHub",
      username: "@ratnakar-singh",
      url: "https://github.com/ratnakar-singh",
    },
    {
      icon: "Linkedin",
      label: "LinkedIn",
      username: "in/ratnakar-singh-parihar",
      url: "https://linkedin.com/in/ratnakar-singh-parihar",
    },
    {
      icon: "Globe",
      label: "Portfolio",
      username: "ratnakar-portfolio.vercel.app",
      url: "https://ratnakar-portfolio.vercel.app",
    },
  ];

  // const workingHours = [
  //   { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  //   { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
  //   { day: "Sunday", hours: "Closed" },
  // ];

  return (
    <div className="space-y-8">
      {/* Availability */}
      <div className="bg-success/10 border border-success/20 rounded-xl p-5 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-success">
            Available for New Projects
          </h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Currently open to freelance and full-time opportunities.
        </p>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Get in Touch</h3>
        <div className="space-y-3">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={method.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{method.label}</h4>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </div>
              {method.action ? (
                <a
                  href={method.action}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                >
                  {method.value}
                </a>
              ) : (
                <span className="text-sm text-foreground/80">{method.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Connect with Me
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-card border border-border rounded-lg hover:shadow-md transition-all group"
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
                <div className="text-xs text-muted-foreground">
                  {social.username}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      {/* <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Working Hours</h3>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="space-y-2">
            {workingHours.map((time, index) => (
              <div
                key={index}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>{time.day}</span>
                <span className="font-medium text-foreground">
                  {time.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div> */}

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
        <Button
          variant="outline"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={() =>
            window.open("https://calendly.com/ratnakar-meeting", "_blank")
          }
        >
          Schedule a Call
        </Button>
      </div>
    </div>
  );
};

export default ContactInfo;