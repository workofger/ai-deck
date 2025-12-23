'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Database, Zap, ArrowRight, X, Check, Sparkles, Users, Target } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { SolutionSlideData } from '@/lib/types';
import Image from 'next/image';

interface Props {
  data: SolutionSlideData;
  isActive: boolean;
}

const pillarIcons = [MessageCircle, Database, Zap];

export default function SolutionSlide({ data, isActive }: Props) {
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

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-pr-charcoal">
      {/* Background with dramatic gradient */}
      <div className="absolute inset-0">
        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-pr-charcoal via-pr-charcoal to-green-950/30" />
        
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pr-amber/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>
      
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pr-amber via-green-500 to-pr-amber" />
      
      {/* Decorative side element */}
      <div className="absolute right-0 top-0 bottom-0 w-1/4 hidden xl:block">
        <div className="absolute inset-0 bg-gradient-to-l from-green-500/5 to-transparent" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64">
          <div className="relative w-full h-full">
            {/* Circular diagram decoration */}
            <div className="absolute inset-0 border-2 border-dashed border-pr-amber/20 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
            <div className="absolute inset-8 border-2 border-dashed border-green-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
            <div className="absolute inset-16 bg-pr-amber/10 rounded-full flex items-center justify-center">
              <Target className="w-12 h-12 text-pr-amber/40" />
            </div>
          </div>
        </div>
      </div>
      
      <motion.div 
        className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 py-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/40 text-green-400 text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles className="w-4 h-4" />
            {content.badge}
          </span>
        </motion.div>

        {/* Two-line headline with accent */}
        <motion.div variants={itemVariants} className="mb-4">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-pr-white leading-[1.1]">
            {content.headline}
          </h1>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-pr-amber leading-[1.1] mt-1">
            {content.headline_accent}
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="text-lg text-pr-muted max-w-2xl mb-6"
        >
          {content.subheadline}
        </motion.p>

        {/* Key Insight - Hero box */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-pr-amber/40 bg-gradient-to-r from-pr-amber/20 via-pr-amber/10 to-transparent p-6">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pr-amber/10 rounded-bl-full" />
            
            <div className="relative flex items-start gap-4">
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-pr-amber/20 border border-pr-amber/30 flex items-center justify-center">
                <Users className="w-7 h-7 text-pr-amber" />
              </div>
              <div>
                <p className="text-pr-amber text-2xl md:text-3xl font-bold mb-2">
                  {content.key_insight.main}
                </p>
                <p className="text-pr-white/90 text-base mb-2">
                  {content.key_insight.detail}
                </p>
                <p className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  {content.key_insight.punchline}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main content: Pillars + Contrast */}
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Left: Three Pillars */}
          <motion.div variants={itemVariants} className="space-y-3">
            {content.pillars.map((pillar, index) => {
              const Icon = pillarIcons[index];
              return (
                <div
                  key={index}
                  className="relative group bg-pr-dark/60 border border-pr-gray/30 rounded-xl p-4 hover:border-pr-amber/40 transition-all overflow-hidden"
                >
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pr-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-pr-amber/15 border border-pr-amber/30 flex items-center justify-center text-pr-amber">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="mt-2 text-center">
                        <span className="text-pr-amber/50 text-xs font-bold">{pillar.number}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-pr-white text-lg font-bold mb-1">{pillar.title}</h3>
                      <p className="text-pr-muted text-sm leading-relaxed mb-2">{pillar.desc}</p>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-bold">
                        <Check className="w-3 h-3" />
                        {pillar.result}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right: Before/After Contrast */}
          <motion.div variants={itemVariants} className="space-y-3">
            {/* Old Way */}
            <div className="relative bg-pr-dark/40 border border-red-500/20 rounded-xl p-4 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500/50 to-transparent" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-bl-full" />
              
              <h4 className="text-red-400 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <X className="w-4 h-4" />
                {content.contrast.old_way.title}
              </h4>
              <ul className="space-y-1.5 mb-3">
                {content.contrast.old_way.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-pr-muted/70 text-sm">
                    <span className="w-1 h-1 rounded-full bg-red-500/50" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-red-500/20">
                <p className="text-red-400/80 text-xs font-medium">{content.contrast.old_way.result}</p>
              </div>
            </div>

            {/* Our Way */}
            <div className="relative bg-pr-dark/40 border border-green-500/30 rounded-xl p-4 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-full" />
              
              <h4 className="text-green-400 text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                {content.contrast.our_way.title}
              </h4>
              <ul className="space-y-1.5 mb-3">
                {content.contrast.our_way.points.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-pr-white/90 text-sm font-medium">
                    <span className="w-1 h-1 rounded-full bg-green-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-green-500/30">
                <p className="text-green-400 text-sm font-medium">{content.contrast.our_way.result}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
