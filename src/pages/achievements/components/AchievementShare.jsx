import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementShare = ({ achievement, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location?.origin}/achievements#${achievement?.id}`;
  const shareText = `Check out my achievement: ${achievement?.title} from ${achievement?.issuer}`;

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      icon: 'Linkedin',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    window.open(platform?.url, '_blank', 'width=600,height=400');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-card border border-border rounded-xl p-6 max-w-md w-full"
          onClick={(e) => e?.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Share Achievement</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Achievement Preview */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Award" size={20} className="text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement?.issuer}</p>
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Share on social media</h4>
            <div className="grid grid-cols-3 gap-3">
              {socialPlatforms?.map((platform) => (
                <button
                  key={platform?.name}
                  onClick={() => handleSocialShare(platform)}
                  className={`${platform?.color} text-white p-3 rounded-lg flex flex-col items-center space-y-1 transition-colors`}
                >
                  <Icon name={platform?.icon} size={20} />
                  <span className="text-xs">{platform?.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Copy Link */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-foreground">Or copy link</h4>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm text-muted-foreground"
              />
              <Button
                variant={copied ? "success" : "outline"}
                size="sm"
                onClick={handleCopyLink}
                iconName={copied ? "Check" : "Copy"}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementShare;