'use client';

import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, MapPin, Cpu, Zap, Settings } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { HowSlideData } from '@/lib/types';

interface Props {
  data: HowSlideData;
  isActive: boolean;
}

const stepIcons = [
  <AlertTriangle key="1" className="w-7 h-7" />,
  <MapPin key="2" className="w-7 h-7" />,
  <Cpu key="3" className="w-7 h-7" />,
  <Zap key="4" className="w-7 h-7" />,
];

const stepColors = [
  { bg: 'from-red-500 to-red-600', light: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  { bg: 'from-amber-500 to-amber-600', light: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
  { bg: 'from-blue-500 to-blue-600', light: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  { bg: 'from-green-500 to-green-600', light: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
];

export default function HowSlide({ data, isActive }: Props) {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-pr-amber/5 via-transparent to-blue-900/5" />
      
      {/* Accent */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-pr-amber/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 overflow-y-auto max-h-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
          <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pr-amber" />
          <span className="text-pr-amber text-xs sm:text-sm font-bold tracking-wider uppercase">
            {language === 'es' ? 'Cómo Funciona' : 'How It Works'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-10">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pr-white">
            {content.headline}
          </h1>
          <p className="text-pr-muted text-sm sm:text-lg mt-1 sm:mt-2 max-w-2xl">
            {language === 'es' 
              ? 'Un flujo simple que convierte caos en datos estructurados'
              : 'A simple flow that turns chaos into structured data'}
          </p>
        </motion.div>

        {/* 4 Steps flow - 2x2 on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {content.steps.map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="relative">
              {/* Connector arrow (desktop only) */}
              {i < content.steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2 lg:-right-4 transform -translate-y-1/2 z-10 items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-pr-charcoal rounded-full">
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-pr-amber" />
                </div>
              )}

              <div className={`h-full bg-pr-dark/70 border ${stepColors[i].border} rounded-lg sm:rounded-xl p-3 sm:p-5 hover:border-opacity-60 transition-all duration-300 group`}>
                {/* Step icon */}
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${stepColors[i].bg} flex items-center justify-center text-white mb-2 sm:mb-4 group-hover:scale-105 transition-transform`}>
                  {stepIcons[i]}
                </div>

                {/* Step number */}
                <span className={`text-[10px] sm:text-xs font-bold ${stepColors[i].text} uppercase tracking-wider`}>
                  {language === 'es' ? 'Paso' : 'Step'} {step.number}
                </span>

                {/* Title */}
                <h3 className="text-pr-white font-bold text-sm sm:text-lg mt-0.5 sm:mt-1 mb-1 sm:mb-2">
                  {step.title}
                </h3>

                {/* Description - shorter on mobile */}
                <p className="text-pr-muted text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div variants={itemVariants} className="mt-4 sm:mt-8 p-3 sm:p-5 bg-pr-dark/50 border border-pr-gray/30 rounded-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <p className="text-pr-white font-semibold text-sm sm:text-lg">
              {language === 'es' 
                ? 'Para el transportista es solo un chat normal.' 
                : 'For the driver, it\'s just a normal chat.'}
            </p>
            <p className="text-pr-amber text-xs sm:text-sm font-medium mt-0.5 sm:mt-1">
              {language === 'es'
                ? 'Para nosotros es un pipeline de datos estructurados.'
                : 'For us, it\'s a structured data pipeline.'}
            </p>
          </div>
          
          {/* Visual indicator */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pr-gray/30 flex items-center justify-center text-pr-muted text-sm sm:text-base">
                👤
              </div>
              <span className="text-[10px] sm:text-xs text-pr-muted mt-0.5 sm:mt-1 block">User</span>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pr-amber" />
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pr-amber/20 flex items-center justify-center text-pr-amber text-sm sm:text-base">
                🤖
              </div>
              <span className="text-[10px] sm:text-xs text-pr-muted mt-0.5 sm:mt-1 block">AI</span>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-pr-amber" />
            <div className="text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-sm sm:text-base">
                📊
              </div>
              <span className="text-[10px] sm:text-xs text-pr-muted mt-0.5 sm:mt-1 block">Data</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
