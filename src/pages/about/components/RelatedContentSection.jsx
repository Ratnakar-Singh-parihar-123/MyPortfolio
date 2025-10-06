import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedContentSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of My Development Philosophy",
      excerpt: "How 5 years in the industry shaped my approach to building meaningful digital experiences and the lessons learned along the way.",
      category: "Philosophy",
      readTime: "8 min read",
      date: "Oct 2024",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
      tags: ["Development", "Career", "Philosophy"],
      color: "primary"
    },
    {
      id: 2,
      title: "Building Accessible Web Applications",
      excerpt: "A comprehensive guide to creating inclusive digital experiences that work for everyone, with practical examples and implementation strategies.",
      category: "Technical",
      readTime: "12 min read",
      date: "Sep 2024",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
      tags: ["Accessibility", "Web Development", "UX"],
      color: "success"
    },
    {
      id: 3,
      title: "The Art of Code Reviews",
      excerpt: "Best practices for giving and receiving constructive feedback in code reviews, fostering team growth and maintaining code quality.",
      category: "Team",
      readTime: "6 min read",
      date: "Sep 2024",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop",
      tags: ["Code Review", "Team Work", "Best Practices"],
      color: "accent"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Development Manifesto",
      description: "My complete philosophy on creating meaningful digital experiences",
      type: "PDF",
      size: "2.3 MB",
      icon: "FileText",
      color: "primary"
    },
    {
      id: 2,
      title: "Code Style Guide",
      description: "Comprehensive guidelines for writing clean, maintainable code",
      type: "PDF",
      size: "1.8 MB",
      icon: "Code",
      color: "accent"
    },
    {
      id: 3,
      title: "Project Checklist",
      description: "Essential checklist for launching production-ready applications",
      type: "PDF",
      size: "0.9 MB",
      icon: "CheckSquare",
      color: "success"
    },
    {
      id: 4,
      title: "Learning Resources",
      description: "Curated list of books, courses, and tools that shaped my career",
      type: "PDF",
      size: "1.2 MB",
      icon: "BookOpen",
      color: "warning"
    }
  ];

  const socialLinks = [
    {
      platform: "GitHub",
      username: "@digitalcraftsperson",
      description: "Open source contributions and personal projects",
      icon: "Github",
      color: "foreground",
      followers: "2.3k"
    },
    {
      platform: "LinkedIn",
      username: "Digital Craftsperson",
      description: "Professional updates and industry insights",
      icon: "Linkedin",
      color: "primary",
      followers: "5.1k"
    },
    {
      platform: "Twitter",
      username: "@dev_craftsperson",
      description: "Tech thoughts, tips, and community discussions",
      icon: "Twitter",
      color: "accent",
      followers: "1.8k"
    },
    {
      platform: "Dev.to",
      username: "digitalcraftsperson",
      description: "Technical articles and tutorials",
      icon: "PenTool",
      color: "success",
      followers: "892"
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="container-brand">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore More
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dive deeper into my thoughts, resources, and connect with me across different platforms.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Blog Posts */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-6">
                Latest Insights
              </h3>
              
              <div className="space-y-6">
                {blogPosts?.map((post, index) => (
                  <motion.article
                    key={post?.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -2 }}
                    className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="aspect-video md:aspect-square overflow-hidden">
                          <Image
                            src={post?.image}
                            alt={post?.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 bg-${post?.color}/10 text-${post?.color} text-xs font-medium rounded-full`}>
                            {post?.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post?.date}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post?.readTime}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                          {post?.title}
                        </h4>
                        
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {post?.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post?.tags?.slice(0, 2)?.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            iconName="ArrowRight"
                            iconPosition="right"
                            className="text-primary hover:text-primary"
                          >
                            Read More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Free Resources
              </h3>
              
              <div className="space-y-4">
                {resources?.map((resource, index) => (
                  <motion.div
                    key={resource?.id}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 4 }}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 bg-${resource?.color}/10 rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon name={resource?.icon} size={18} className={`text-${resource?.color}`} />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-semibold text-foreground text-sm mb-1">
                          {resource?.title}
                        </h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                          {resource?.description}
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>{resource?.type}</span>
                          <span>•</span>
                          <span>{resource?.size}</span>
                        </div>
                      </div>
                      <Icon name="Download" size={16} className="text-muted-foreground" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-foreground mb-6">
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                {socialLinks?.map((social, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ x: 4 }}
                    className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-${social?.color === 'foreground' ? 'muted' : social?.color + '/10'} rounded-lg flex items-center justify-center`}>
                        <Icon 
                          name={social?.icon} 
                          size={18} 
                          className={social?.color === 'foreground' ? 'text-foreground' : `text-${social?.color}`} 
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-foreground text-sm">
                            {social?.platform}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {social?.followers} followers
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs">
                          {social?.username}
                        </p>
                        <p className="text-muted-foreground text-xs leading-relaxed mt-1">
                          {social?.description}
                        </p>
                      </div>
                      <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedContentSection;