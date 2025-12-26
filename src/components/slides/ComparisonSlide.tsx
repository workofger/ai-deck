'use client';

import { motion } from 'framer-motion';
import { X, Check, MessageSquare, Phone, MessagesSquare } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { ComparisonSlideData } from '@/lib/types';

interface Props {
  data: ComparisonSlideData;
  isActive: boolean;
}

const channelIcons: Record<string, React.ReactNode> = {
  'WhatsApp': <MessageSquare className="w-5 h-5" />,
  'Voz': <Phone className="w-5 h-5" />,
  'Voice': <Phone className="w-5 h-5" />,
  'Chat': <MessagesSquare className="w-5 h-5" />,
};

export default function ComparisonSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 via-transparent to-green-900/5" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Headline */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-pr-white leading-tight mb-3">
            {content.headline}
          </h1>
          <p className="text-pr-amber text-lg md:text-xl font-medium">
            {content.subheadline}
          </p>
        </motion.div>

        {/* Two columns comparison */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Traditional Approach */}
          <motion.div 
            variants={itemVariants}
            className="bg-pr-dark/60 border border-red-500/30 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-red-600" />
            
            <h3 className="text-red-400 font-bold text-xl mb-5 flex items-center gap-2">
              <X className="w-5 h-5" />
              {content.traditional.title}
            </h3>
            
            <ul className="space-y-3 mb-6">
              {content.traditional.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-pr-white/80">
                  <span className="text-red-500 mt-0.5">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4 border-t border-pr-gray/30">
              <p className="text-red-400 text-sm font-medium">{content.traditional.result}</p>
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div 
            variants={itemVariants}
            className="bg-pr-dark/60 border border-green-500/30 rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600" />
            
            <h3 className="text-green-400 font-bold text-xl mb-5 flex items-center gap-2">
              <Check className="w-5 h-5" />
              {content.ours.title}
            </h3>
            
            <ul className="space-y-3 mb-6">
              {content.ours.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-pr-white/80">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-4 border-t border-pr-gray/30">
              <p className="text-green-400 text-sm font-medium">{content.ours.result}</p>
            </div>
          </motion.div>
        </div>

        {/* Channel icons */}
        <motion.div variants={itemVariants} className="mt-8 flex justify-center gap-6">
          {content.channels.map((channel, i) => (
            <div key={i} className="flex items-center gap-2 text-pr-amber/80">
              {channelIcons[channel] || <MessageSquare className="w-5 h-5" />}
              <span className="text-sm font-medium">{channel}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

