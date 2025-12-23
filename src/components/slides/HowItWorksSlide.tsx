'use client';

import { motion } from 'framer-motion';
import { Radio, Layers, Brain, Zap, Settings, ArrowDown } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { HowItWorksSlideData } from '@/lib/types';

interface Props {
  data: HowItWorksSlideData;
  isActive: boolean;
}

const stepIcons = [Radio, Layers, Brain, Zap];

const colorMap: Record<number, { bg: string; border: string; text: string }> = {
  0: { bg: 'bg-blue-500/15', border: 'border-blue-500/40', text: 'text-blue-400' },
  1: { bg: 'bg-purple-500/15', border: 'border-purple-500/40', text: 'text-purple-400' },
  2: { bg: 'bg-pink-500/15', border: 'border-pink-500/40', text: 'text-pink-400' },
  3: { bg: 'bg-pr-amber/15', border: 'border-pr-amber/40', text: 'text-pr-amber' },
};

export default function HowItWorksSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, x: -15, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { 
        delay: 0.5 + i * 0.12,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-pr-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-pr-charcoal to-purple-500/5" />
      
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pr-amber" />
      
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/40 text-blue-400 text-xs font-bold tracking-[0.2em] uppercase">
            <Settings className="w-4 h-4" />
            {content.badge}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-pr-white leading-[1.1] mb-2"
        >
          {content.headline}
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-pr-muted max-w-2xl mb-6"
        >
          {content.subheadline}
        </motion.p>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left: Flow Steps */}
          <motion.div variants={itemVariants} className="space-y-3">
            {content.flow_steps.map((step, index) => {
              const Icon = stepIcons[index];
              const colors = colorMap[index];
              
              return (
                <div key={index} className="relative">
                  <div className={`
                    flex items-start gap-4 p-4 rounded-xl ${colors.bg} border ${colors.border}
                    hover:scale-[1.01] transition-transform
                  `}>
                    {/* Number + Icon */}
                    <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex flex-col items-center justify-center ${colors.text}`}>
                      <span className="text-[10px] font-bold opacity-70">{step.number}</span>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-base font-bold ${colors.text} mb-1`}>{step.title}</h3>
                      <p className="text-pr-muted text-sm leading-relaxed mb-2">{step.desc}</p>
                      <code className="text-xs text-pr-white/60 bg-pr-charcoal/50 px-2 py-1 rounded font-mono">
                        {step.example}
                      </code>
                    </div>
                  </div>
                  
                  {/* Arrow down */}
                  {index < content.flow_steps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowDown className={`w-4 h-4 ${colors.text} opacity-50`} />
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Right: Live Example + Key Point */}
          <div className="space-y-4">
            {/* Live Example Chat */}
            <motion.div 
              variants={itemVariants}
              className="bg-pr-dark/80 border border-pr-gray/40 rounded-2xl overflow-hidden"
            >
              <div className="px-4 py-3 bg-green-500/15 border-b border-green-500/30 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-400 text-sm font-bold">{content.live_example.title}</span>
              </div>
              
              <div className="p-4 space-y-3 max-h-[320px] overflow-y-auto">
                {content.live_example.messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={messageVariants}
                    className={`flex ${msg.from === 'ai' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[85%] px-4 py-2.5 rounded-2xl text-sm
                      ${msg.from === 'ai' 
                        ? 'bg-pr-amber/20 text-pr-white rounded-br-sm border border-pr-amber/30' 
                        : 'bg-pr-gray/40 text-pr-white/90 rounded-bl-sm border border-pr-gray/40'
                      }
                    `}>
                      <span className={`text-[10px] font-bold block mb-1 ${msg.from === 'ai' ? 'text-pr-amber' : 'text-green-400'}`}>
                        {msg.from === 'ai' ? '🤖 Maya' : '🚚'}
                      </span>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Key Point */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-pr-amber/20 to-transparent border-l-4 border-pr-amber rounded-r-xl p-5"
            >
              <p className="text-pr-white text-lg font-bold mb-1">
                {content.key_point.text}
              </p>
              <p className="text-pr-amber/80 text-sm">
                {content.key_point.subtext}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
