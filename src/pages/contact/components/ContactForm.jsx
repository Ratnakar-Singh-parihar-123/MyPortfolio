import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields!");
      setTimeout(() => setStatus("idle"), 4000);
      return;
    }

    setStatus("loading");

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "No Subject",
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
          setTimeout(() => setStatus("idle"), 5000);
        },
        (error) => {
          setStatus("error");
          setErrorMessage("Something went wrong. Please try again later.");
          setTimeout(() => setStatus("idle"), 4000);
        }
      );
  };

  const InputField = ({ label, type = "text", name, placeholder, required, isTextarea = false }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-blue-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
        {isTextarea ? (
          <textarea
            name={name}
            rows="5"
            placeholder={placeholder}
            required={required}
            value={formData[name]}
            onChange={handleChange}
            className="relative w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-accent resize-none transition-all duration-300"
          ></textarea>
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            value={formData[name]}
            onChange={handleChange}
            className="relative w-full px-5 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-accent transition-all duration-300"
          />
        )}
      </div>
    </div>
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/20 dark:shadow-black/20"
    >
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent/10 to-blue-500/10 rounded-2xl mb-6 shadow-inner shadow-black/5">
          <Mail className="w-8 h-8 text-accent" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Get in Touch</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Have a question or a project idea? Send me a message!
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-3 p-4 mb-8 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 rounded-xl text-green-600 dark:text-green-400"
          >
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">Message sent successfully! I'll reply soon.</p>
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center space-x-3 p-4 mb-8 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400"
          >
            <AlertCircle className="w-6 h-6 flex-shrink-0" />
            <p className="font-medium">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <InputField label="Your Name" name="name" placeholder="John Doe" required />
          <InputField label="Your Email" type="email" name="email" placeholder="john@example.com" required />
        </div>

        <InputField label="Subject" name="subject" placeholder="What is this about?" />
        <InputField label="Message" name="message" placeholder="Write your message here..." required isTextarea />

        <button
          type="submit"
          disabled={status === "loading"}
          className="relative w-full group overflow-hidden rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg px-8 py-4 flex justify-center items-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </span>
        </button>

        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
          I usually reply within 24 hours ✉️
        </p>
      </form>
    </motion.section>
  );
};

export default ContactForm;