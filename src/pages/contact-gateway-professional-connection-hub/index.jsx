import React from 'react';
import Header from '../../components/ui/Header';
// import ContactForm from './components/ContactForm';
// import QuickConnectOptions from './components/QuickConnectOptions';
// import SocialConnections from './components/SocialConnections';
// import AvailabilityStatus from './components/AvailabilityStatus';
// import ContactInfo from './components/ContactInfo';
import Icon from '../../components/AppIcon';

const ContactGatewayPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="MessageCircle" size={16} />
              <span>Let's Build Something Amazing Together</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Contact Gateway
              <span className="block text-blue-600">Connection Hub</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to turn your ideas into reality? Whether you're looking for a development partner,
              have a project in mind, or just want to connect, I'm here to help make it happen.
            </p>
          </div>

          {/* Stats Row */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">24hrs</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-sm text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </div>
          </div> */}
        </div>
      </section>
      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Contact Form */}
            <div className="lg:col-span-2">
              {/* <ContactForm /> */}
            </div>

            {/* Right Column - Quick Options & Status */}
            <div className="space-y-8">
              {/* <QuickConnectOptions /> */}
              {/* <AvailabilityStatus /> */}
            </div>
          </div>
        </div>
      </section>
      {/* Social Connections Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* <SocialConnections /> */}
            {/* <ContactInfo /> */}
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      {/* <section className="pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-center text-white">
            <Icon name="Rocket" size={48} className="mx-auto mb-6 text-white" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Don't let your ideas stay as just ideas. Let's discuss how we can bring
              your vision to life with cutting-edge technology and creative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Send" size={20} />
                <span>Start Your Project</span>
              </button>
              <button
                onClick={() => window.open('https://calendly.com/portfoliopro', '_blank')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <Icon name="Calendar" size={20} />
                <span>Schedule a Call</span>
              </button>
            </div>
          </div>
        </div>
      </section> */}
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="Code2" size={18} color="white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold">Portfolio </span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Transforming ideas into exceptional digital experiences through innovative
                development and creative problem-solving.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/ratnakar-singh-parihar-a87528260/" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Linkedin" size={20} />
                </a>
                <a href="https://github.com/Ratnakar-Singh-parihar-123/MyPortfolio" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Github" size={20} />
                </a>
                <a href="https://x.com/RatnakarSi85551" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="mailto:ratnakarsinghparihar9399@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Mail" size={20} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/about-professional-story-journey" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/skills-laboratory-interactive-technical-showcase" className="hover:text-white transition-colors">Skills</a></li>
                <li><a href="/projects-gallery-development-portfolio-showcase" className="hover:text-white transition-colors duration-200">Projects</a></li>
                <li><a href="/achievements-center-credibility-growth-documentation" className="hover:text-white transition-colors">Achievements</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>developer@portfoliopro.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>+91 (939) 974-1051</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} />
                  <span>India, Madhya Pradesh Bhopal</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date()?.getFullYear()} RSP. All rights reserved. Built with React & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactGatewayPage;