'use client';

import { motion } from 'framer-motion';
import { ArrowRight, AlertTriangle, MapPin, Cpu, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { HowSlideData } from '@/lib/types';

interface Props {
  data: HowSlideData;
  isActive: boolean;
}

const stepIcons = [
  <AlertTriangle key="1" className="w-6 h-6" />,
  <MapPin key="2" className="w-6 h-6" />,
  <Cpu key="3" className="w-6 h-6" />,
  <Zap key="4" className="w-6 h-6" />,
];

const stepColors = [
  'from-red-500 to-red-600',
  'from-amber-500 to-amber-600',
  'from-blue-500 to-blue-600',
  'from-green-500 to-green-600',
];

export default function HowSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-pr-amber/5 via-transparent to-transparent" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Headline */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-pr-white">
            {content.headline}
          </h1>
        </motion.div>

        {/* 4 Steps horizontal flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          {content.steps.map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="relative">
              {/* Arrow between steps (desktop) */}
              {i < content.steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 lg:-right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-pr-gray/50" />
                </div>
              )}

              <div className="bg-pr-dark/70 border border-pr-gray/30 rounded-xl p-5 h-full flex flex-col hover:border-pr-amber/30 transition-colors">
                {/* Step number with icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stepColors[i]} flex items-center justify-center text-white mb-4`}>
                  {stepIcons[i]}
                </div>

                {/* Number badge */}
                <span className="text-pr-amber text-sm font-bold mb-2">
                  {step.number}
                </span>

                {/* Title */}
                <h3 className="text-pr-white font-semibold text-lg mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-pr-muted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

