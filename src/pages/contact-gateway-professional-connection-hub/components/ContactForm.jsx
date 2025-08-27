import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm();

  const projectTypes = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile Application' },
    { value: 'full-stack', label: 'Full Stack Solution' },
    { value: 'frontend', label: 'Frontend Development' },
    { value: 'backend', label: 'Backend Development' },
    { value: 'consultation', label: 'Technical Consultation' },
    { value: 'other', label: 'Other Project Type' }
  ];

  const budgetRanges = [
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k+', label: '$50,000+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush Project)' },
    { value: '1-month', label: '1 Month' },
    { value: '2-3-months', label: '2-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-months+', label: '6+ Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchedProjectType = watch('projectType');

  if (submitSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-600 mb-4">
          Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
        </p>
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            <Icon name="Clock" size={16} className="inline mr-2" />
            Expected response time: Within 24 hours
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setSubmitSuccess(false)}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Start Your Project</h2>
        <p className="text-gray-600">
          Ready to bring your ideas to life? Share your project details and let's discuss how we can work together.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            required
            error={errors?.fullName?.message}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="john@company.com"
            required
            error={errors?.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company/Organization"
            type="text"
            placeholder="Your Company Name"
            {...register('company')}
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register('phone')}
          />
        </div>

        {/* Project Details */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Select
              label="Project Type"
              placeholder="Select project type"
              options={projectTypes}
              value={selectedProjectType}
              onChange={setSelectedProjectType}
              required
              error={errors?.projectType?.message}
              {...register('projectType', { required: 'Please select a project type' })}
            />
            
            <Select
              label="Timeline"
              placeholder="Select timeline"
              options={timelineOptions}
              {...register('timeline')}
            />
          </div>

          <div className="mb-6">
            <Select
              label="Budget Range"
              placeholder="Select budget range"
              options={budgetRanges}
              {...register('budget')}
            />
          </div>

          <Input
            label="Project Title"
            type="text"
            placeholder="Brief title for your project"
            required
            error={errors?.projectTitle?.message}
            {...register('projectTitle', {
              required: 'Project title is required',
              minLength: { value: 5, message: 'Title must be at least 5 characters' }
            })}
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            rows={6}
            placeholder="Describe your project in detail. Include goals, requirements, target audience, and any specific features you need..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            {...register('description', {
              required: 'Project description is required',
              minLength: { value: 50, message: 'Description must be at least 50 characters' }
            })}
          />
          {errors?.description && (
            <p className="mt-1 text-sm text-red-600">{errors?.description?.message}</p>
          )}
        </div>

        {/* Additional Requirements */}
        {watchedProjectType && (
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Additional Requirements</h4>
            <div className="space-y-3">
              <Checkbox
                label="Responsive design for mobile and tablet"
                {...register('requirements.responsive')}
              />
              <Checkbox
                label="SEO optimization"
                {...register('requirements.seo')}
              />
              <Checkbox
                label="Content management system"
                {...register('requirements.cms')}
              />
              <Checkbox
                label="Third-party integrations"
                {...register('requirements.integrations')}
              />
              <Checkbox
                label="Ongoing maintenance and support"
                {...register('requirements.maintenance')}
              />
            </div>
          </div>
        )}

        {/* Contact Preferences */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Communication Preferences</h3>
          <div className="space-y-3">
            <Checkbox
              label="I prefer email communication"
              {...register('preferences.email')}
            />
            <Checkbox
              label="I'm available for a phone/video call"
              {...register('preferences.call')}
            />
            <Checkbox
              label="Send me updates about project progress"
              {...register('preferences.updates')}
            />
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="bg-blue-50 rounded-lg p-4">
          <Checkbox
            label="I agree to the terms and conditions and privacy policy"
            required
            error={errors?.terms?.message}
            {...register('terms', { required: 'Please agree to the terms and conditions' })}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isSubmitting}
            iconName="Send"
            iconPosition="right"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending Message...' : 'Send Project Inquiry'}
          </Button>
          
          <p className="text-center text-sm text-gray-500 mt-3">
            <Icon name="Shield" size={14} className="inline mr-1" />
            Your information is secure and will never be shared with third parties.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;