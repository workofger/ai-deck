'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, FileText, Users, Eye, TrendingUp, Zap,
  CheckCircle2, Circle, ArrowRight, QrCode, ExternalLink, Rocket
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { ImpactSlideData, LiveCounters } from '@/lib/types';
import Image from 'next/image';

interface Props {
  data: ImpactSlideData;
  isActive: boolean;
  counters: LiveCounters;
  demoMode: boolean;
}

const counterIcons = [MessageSquare, FileText, Users];
const impactIcons = [Eye, TrendingUp, Zap];

export default function ImpactSlide({ data, isActive, counters, demoMode }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];
  const [displayCounters, setDisplayCounters] = useState(counters);

  useEffect(() => {
    if (!isActive || !demoMode) {
      setDisplayCounters(counters);
      return;
    }

    const duration = 2000;
    const startTime = performance.now();
    const startValues = {
      q_convos_today: Math.floor(counters.q_convos_today * 0.6),
      q_docs_today: Math.floor(counters.q_docs_today * 0.6),
      q_matches_today: Math.floor(counters.q_matches_today * 0.6),
      q_onboarding_completed: Math.floor((counters.q_onboarding_completed || 0) * 0.6),
    };

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayCounters({
        q_convos_today: Math.floor(startValues.q_convos_today + (counters.q_convos_today - startValues.q_convos_today) * eased),
        q_docs_today: Math.floor(startValues.q_docs_today + (counters.q_docs_today - startValues.q_docs_today) * eased),
        q_matches_today: Math.floor(startValues.q_matches_today + (counters.q_matches_today - startValues.q_matches_today) * eased),
        q_onboarding_completed: Math.floor(startValues.q_onboarding_completed + ((counters.q_onboarding_completed || 0) - startValues.q_onboarding_completed) * eased),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    const tickInterval = setInterval(() => {
      setDisplayCounters(prev => ({
        q_convos_today: prev.q_convos_today + Math.floor(Math.random() * 3) + 1,
        q_docs_today: prev.q_docs_today + (Math.random() > 0.5 ? 1 : 0),
        q_matches_today: prev.q_matches_today + (Math.random() > 0.7 ? 1 : 0),
        q_onboarding_completed: (prev.q_onboarding_completed || 0) + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(tickInterval);
  }, [isActive, demoMode, counters]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
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

  const getCounterValue = (queryRef: string): number => {
    const key = queryRef as keyof LiveCounters;
    return displayCounters[key] || 0;
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-pr-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-br from-pr-amber/10 via-pr-charcoal to-green-500/5" />
      
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pr-amber via-green-500 to-pr-amber" />
      
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-3">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pr-amber/15 border border-pr-amber/40 text-pr-amber text-xs font-bold tracking-[0.15em] uppercase">
            <Rocket className="w-3.5 h-3.5" />
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

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-5">
          
          {/* Left: Counters + Impact + Summary (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* Live Counters */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
              {content.counters.map((counter, index) => {
                const Icon = counterIcons[index];
                return (
                  <div 
                    key={counter.query_ref}
                    className="relative bg-pr-dark/60 border border-pr-gray/40 rounded-xl p-4 overflow-hidden hover:border-pr-amber/40 transition-colors"
                  >
                    {demoMode && (
                      <div className="absolute top-2 right-2 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </div>
                    )}
                    
                    <div className="w-9 h-9 rounded-lg bg-pr-amber/15 flex items-center justify-center text-pr-amber mb-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="font-display text-3xl font-bold text-pr-white">
                      {getCounterValue(counter.query_ref).toLocaleString()}
                    </div>
                    <p className="text-pr-white/80 text-sm font-medium">{counter.label}</p>
                    <p className="text-pr-muted text-xs">{counter.sublabel}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Business Impact */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-3">
              {content.business_impact.map((impact, index) => {
                const Icon = impactIcons[index];
                return (
                  <div 
                    key={index}
                    className="bg-pr-dark/50 border border-pr-gray/30 rounded-xl p-4 hover:border-green-500/40 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-green-500/15 flex items-center justify-center text-green-400 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-pr-white font-semibold text-sm mb-2">{impact.title}</h4>
                    <p className="text-red-400/80 text-xs line-through mb-1">{impact.before}</p>
                    <p className="text-green-400 text-xs font-medium">{impact.after}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Summary Statement */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-pr-amber/15 to-transparent border-l-4 border-pr-amber rounded-r-xl p-5"
            >
              <p className="text-pr-white text-lg font-semibold mb-1">
                {content.summary.text}
              </p>
              <p className="text-pr-amber/80 text-sm">
                {content.summary.emphasis}
              </p>
            </motion.div>

            {/* Roadmap */}
            <motion.div 
              variants={itemVariants}
              className="bg-pr-dark/40 border border-pr-gray/30 rounded-xl p-4"
            >
              <h4 className="text-pr-muted text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-pr-amber" />
                {content.roadmap_title}
              </h4>
              
              <div className="flex flex-wrap gap-2">
                {content.roadmap.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors ${
                      item.status === 'done' ? 'bg-green-500/10 text-green-400' :
                      item.status === 'active' ? 'bg-pr-amber/15 text-pr-amber border border-pr-amber/30' :
                      'bg-pr-gray/20 text-pr-muted'
                    }`}
                  >
                    {item.status === 'done' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : item.status === 'active' ? (
                      <Circle className="w-4 h-4 fill-pr-amber/30" />
                    ) : (
                      <Circle className="w-4 h-4" />
                    )}
                    <span className={`text-xs font-medium ${item.status === 'done' ? 'line-through opacity-70' : ''}`}>
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: CTA (1 col) */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="bg-gradient-to-br from-pr-amber/20 via-pr-dark to-pr-dark border border-pr-amber/40 rounded-2xl p-5 text-center h-full flex flex-col justify-center">
              {/* Logo icon */}
              <div className="mx-auto mb-4 w-20 h-20 relative">
                <Image
                  src="/Isotipo.png"
                  alt="PartRunner"
                  fill
                  className="object-contain"
                />
              </div>
              
              <h3 className="text-lg font-bold text-pr-white mb-1">{content.cta.title}</h3>
              <p className="text-pr-muted text-sm mb-5">{content.cta.subtitle}</p>
              
              {/* QR Code */}
              <div className="mx-auto mb-5 w-28 h-28 bg-pr-white rounded-xl flex items-center justify-center">
                <QrCode className="w-20 h-20 text-pr-charcoal" />
              </div>
              
              {/* Buttons */}
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  {content.cta.button_primary}
                </a>
                <button className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-pr-gray/40 hover:bg-pr-gray/60 text-pr-white font-medium rounded-xl transition-colors text-sm">
                  <ExternalLink className="w-4 h-4" />
                  {content.cta.button_secondary}
                </button>
              </div>
              
              {/* Closing tagline */}
              <div className="mt-5 pt-4 border-t border-pr-gray/30">
                <p className="text-pr-amber text-sm font-medium italic">
                  {content.closing}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
