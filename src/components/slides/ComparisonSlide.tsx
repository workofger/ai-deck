'use client';

import { motion } from 'framer-motion';
import { X, Check, MessageSquare, Phone, MessagesSquare, Zap, Building2, Users } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { ComparisonSlideData } from '@/lib/types';

interface Props {
  data: ComparisonSlideData;
  isActive: boolean;
}

const channelIcons: Record<string, React.ReactNode> = {
  'WhatsApp': <MessageSquare className="w-6 h-6" />,
  'Voz': <Phone className="w-6 h-6" />,
  'Voice': <Phone className="w-6 h-6" />,
  'Chat': <MessagesSquare className="w-6 h-6" />,
};

export default function ComparisonSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-green-900/10" />
      
      {/* Accent orbs */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 right-20 w-64 h-64 bg-green-500/5 rounded-full blur-3xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 overflow-y-auto max-h-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
          <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pr-amber" />
          <span className="text-pr-amber text-xs sm:text-sm font-bold tracking-wider uppercase">
            {language === 'es' ? 'El Approach' : 'The Approach'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pr-white leading-tight mb-2 sm:mb-3">
            {content.headline}
          </h1>
          <p className="text-pr-amber text-sm sm:text-lg md:text-xl font-medium max-w-3xl">
            {content.subheadline}
          </p>
        </motion.div>

        {/* Two columns comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-8">
          
          {/* Traditional Approach */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-pr-dark/60 border border-red-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-red-500 to-red-600" />
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-red-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-red-500/20 flex items-center justify-center">
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />
              </div>
              <h3 className="text-red-400 font-bold text-base sm:text-xl">{content.traditional.title}</h3>
            </div>
            
            <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-5">
              {content.traditional.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3 text-pr-white/80 text-sm sm:text-base">
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-3 sm:pt-4 border-t border-red-500/20">
              <p className="text-red-400 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {content.traditional.result}
              </p>
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-pr-dark/60 border border-green-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-gradient-to-r from-green-500 to-green-600" />
            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-green-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-green-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              </div>
              <h3 className="text-green-400 font-bold text-base sm:text-xl">{content.ours.title}</h3>
            </div>
            
            <ul className="space-y-2 sm:space-y-3 mb-3 sm:mb-5">
              {content.ours.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 sm:gap-3 text-pr-white/80 text-sm sm:text-base">
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            
            <div className="pt-3 sm:pt-4 border-t border-green-500/20">
              <p className="text-green-400 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {content.ours.result}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom: Key insight + channels */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-3 sm:p-5 bg-pr-dark/40 border border-pr-amber/30 rounded-xl">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-pr-white font-semibold text-sm sm:text-lg">
              {language === 'es' 
                ? '💡 El usuario no cambia NADA.' 
                : '💡 The user changes NOTHING.'}
            </p>
            <p className="text-pr-muted text-xs sm:text-sm mt-0.5 sm:mt-1">
              {language === 'es'
                ? 'Sigue usando WhatsApp, llamadas, fotos.'
                : 'Still uses WhatsApp, calls, photos.'}
            </p>
          </div>
          
          {/* Channel icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {content.channels.map((channel, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5 sm:gap-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-pr-amber/10 flex items-center justify-center text-pr-amber">
                  {channelIcons[channel] || <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />}
                </div>
                <span className="text-pr-muted text-[10px] sm:text-xs">{channel}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
