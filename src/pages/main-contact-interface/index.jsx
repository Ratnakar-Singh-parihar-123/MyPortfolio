import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';

const MainContactInterface = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const contactInfo = {
    email: 'ratnakarsinghparihar9399@gmail.com',
    phone: '+91 (939) 974-1051',
    location: 'Bhopal Madhya Pradeh , India',
    socialMedia: [
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/',
        icon: 'Linkedin'
      },
      {
        platform: 'GitHub',
        url: 'https://github.com/Ratnakar-Singh-parihar-123',
        icon: 'Github'
      },
      {
        platform: 'Twitter',
        url: 'https://x.com/RatnakarSi85551',
        icon: 'Twitter'
      }
    ]
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formEndpoint = 'https://formspree.io/f/xldwgvaz'; // <-- Your Formspree endpoint URL as a string


    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // Required by Formspree and similar services
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Form submission failed.');
      }

    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitStatus === 'success' && (
            <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={24} className="text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-700">
                    Thank you for reaching out! I've received your message and will get back to you within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start space-x-3">
                <Icon name="AlertCircle" size={24} className="text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-red-700">
                    There was an error sending your message. Please try again or contact me directly via email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="MessageCircle" size={16} />
              <span>Let's Build Something Amazing Together</span>
            </div>
            {/* <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="MessageSquare" size={16} />
              <span>Get In Touch</span>
            </div> */}
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's Start a
              <span className="block text-blue-600">Conversation</span>
            </h1>
            {/* <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">
              Let's Start a
              <span className="block text-transparent bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text">
                Conversation
              </span>
            </h1> */}
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              I'm always interested in hearing about new opportunities and projects. Drop me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-border brand-shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent brand-transition"
                        placeholder="Enter your name ."
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent brand-transition"
                        placeholder="Enter your email."
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-text-primary mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent brand-transition"
                      placeholder="abhi isme kuch dalna hai"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent brand-transition resize-y"
                      placeholder="What would you like to discuss ? "
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed brand-transition flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader" size={20} className="animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-border brand-shadow-lg p-6">
                <h3 className="font-semibold text-text-primary mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon name="Mail" size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="font-medium text-text-primary hover:text-primary brand-transition"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Icon name="Phone" size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Phone</p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="font-medium text-text-primary hover:text-primary brand-transition"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Icon name="MapPin" size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Location</p>
                      <p className="font-medium text-text-primary">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-border brand-shadow-lg p-6">
                <h3 className="font-semibold text-text-primary mb-6">
                  Connect With Me
                </h3>
                <div className="space-y-3">
                  {contactInfo.socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted brand-transition group"
                    >
                      <Icon name={social.icon} size={18} className="text-text-secondary group-hover:text-primary brand-transition" />
                      <span className="font-medium text-text-primary group-hover:text-primary brand-transition">
                        {social.platform}
                      </span>
                      <Icon name="ExternalLink" size={14} className="text-text-secondary group-hover:text-primary brand-transition ml-auto" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Icon name="Clock" size={20} className="text-green-600" />
                  <h3 className="font-semibold text-green-800">
                    Response Time
                  </h3>
                </div>
                <p className="text-green-700 text-sm">
                  I typically respond to messages within <strong>24 hours</strong>.
                  For urgent inquiries, please call directly.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default MainContactInterface;
