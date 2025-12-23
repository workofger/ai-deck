'use client';

import { motion } from 'framer-motion';
import { Phone, MessageSquare, FileText, Database, PhoneOff, EyeOff, Repeat, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { ProblemSlideData } from '@/lib/types';
import Image from 'next/image';

interface Props {
  data: ProblemSlideData;
  isActive: boolean;
}

const stageIcons = [Phone, MessageSquare, FileText, Database];
const realityIcons = [PhoneOff, EyeOff, Repeat];

export default function ProblemSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={data.image.url}
          alt={data.image.alt}
          fill
          className="object-cover"
          priority
        />
        <div 
          className="absolute inset-0 bg-pr-charcoal" 
          style={{ opacity: data.image.overlay }}
        />
      </div>
      
      {/* Texture */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      
      {/* Red warning accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600" />
      
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-8 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left: Content (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-bold tracking-[0.2em] uppercase">
                <AlertTriangle className="w-4 h-4" />
                {content.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              variants={itemVariants}
              className="font-display text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] font-bold text-pr-white leading-[1.1]"
            >
              {content.headline}
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-pr-muted max-w-2xl"
            >
              {content.subheadline}
            </motion.p>

            {/* Metaphor callout */}
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-red-500/10 border border-red-500/30"
            >
              <span className="text-2xl">📞</span>
              <span className="text-red-300 font-medium">{content.metaphor}</span>
            </motion.div>

            {/* Data loss funnel */}
            <motion.div variants={itemVariants} className="mt-4">
              <div className="flex items-center gap-2 flex-wrap">
                {content.stages.map((stage, i) => {
                  const Icon = stageIcons[i];
                  const isLost = i < 3;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`
                        flex items-center gap-2 px-3 py-2 rounded-lg
                        ${isLost 
                          ? 'bg-red-500/15 border border-red-500/40 text-red-400' 
                          : 'bg-pr-amber/15 border border-pr-amber/40 text-pr-amber'
                        }
                      `}>
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-medium">{stage.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${isLost ? 'bg-red-500/30' : 'bg-pr-amber/30'}`}>
                          {stage.percent}
                        </span>
                      </div>
                      {i < content.stages.length - 1 && (
                        <span className="text-pr-muted/50 text-sm">→</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Reality points */}
            <motion.div variants={itemVariants} className="space-y-2 mt-4">
              {content.reality_points.map((point, index) => {
                const Icon = realityIcons[index];
                return (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-pr-dark/40 border border-pr-gray/20 hover:border-red-500/30 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center text-red-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-pr-white font-semibold text-sm">{point.title}</h4>
                      <p className="text-pr-muted text-xs leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Right: Big Stat (2 cols) */}
          <motion.div 
            variants={itemVariants} 
            className="lg:col-span-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-3xl scale-125" />
              
              <div className="relative bg-gradient-to-br from-pr-dark via-pr-dark to-red-950/30 border-2 border-red-500/40 rounded-3xl p-8 lg:p-10 text-center min-w-[260px]">
                {/* Warning stripe */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="font-display text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-red-400 via-red-500 to-red-600 leading-none">
                    {data.stat_value}
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <p className="text-pr-white text-base font-semibold mt-4 mb-2 leading-tight">
                    {content.stat_label}
                  </p>
                  <p className="text-pr-muted/70 text-sm leading-relaxed">
                    {content.stat_context}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footnote */}
        <motion.p 
          variants={itemVariants}
          className="absolute bottom-6 left-6 lg:left-12 text-pr-muted/50 text-xs max-w-md"
        >
          {content.footnote}
        </motion.p>
      </motion.div>
    </div>
  );
}
