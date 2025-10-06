import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simple form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields!");
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border rounded-xl p-8 shadow-sm max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
          <Icon name="Mail" size={22} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Get in Touch
        </h2>
        <p className="text-muted-foreground text-sm">
          Have a question, project, or collaboration idea? Send me a message —
          I’d love to hear from you!
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="bg-success/10 text-success border border-success/20 rounded-lg py-3 px-4 mb-6 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="CheckCircle" size={18} className="text-success" />
            <span>Message sent successfully! I’ll reply soon.</span>
          </div>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Your Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Your Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Subject"
          name="subject"
          type="text"
          placeholder="What is this about?"
          value={formData.subject}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Message <span className="text-destructive">*</span>
          </label>
          <textarea
            name="message"
            rows="5"
            placeholder="Write your message..."
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          ></textarea>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          iconName="Send"
          iconPosition="right"
        >
          Send Message
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-3">
          I usually reply within 24 hours ✉️
        </p>
      </form>
    </motion.section>
  );
};

export default ContactForm;