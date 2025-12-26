'use client';

import { motion } from 'framer-motion';
import { UserPlus, FileCheck, Phone, Calculator, ExternalLink, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { UseCasesSlideData } from '@/lib/types';

interface Props {
  data: UseCasesSlideData;
  isActive: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  'user-plus': <UserPlus className="w-8 h-8" />,
  'file-check': <FileCheck className="w-8 h-8" />,
  'phone': <Phone className="w-8 h-8" />,
  'calculator': <Calculator className="w-8 h-8" />,
};

const statusConfig = {
  live: { label: 'LIVE', color: 'bg-green-500', textColor: 'text-green-400' },
  testing: { label: 'TESTING', color: 'bg-amber-500', textColor: 'text-amber-400' },
  planned: { label: 'PLANNED', color: 'bg-blue-500', textColor: 'text-blue-400' },
};

export default function UseCasesSlide({ data, isActive }: Props) {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-pr-amber/5 via-transparent to-green-900/5" />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-8 lg:px-12 py-8"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Headline */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-pr-white">
            {content.headline}
          </h1>
        </motion.div>

        {/* Use case cards - 2x2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {content.use_cases.map((useCase, i) => {
            const status = statusConfig[useCase.status];
            return (
              <motion.div
                key={useCase.id}
                variants={itemVariants}
                className="bg-pr-dark/70 border border-pr-gray/30 rounded-xl p-5 hover:border-pr-amber/40 transition-all duration-300 group cursor-pointer"
              >
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-pr-gray/30 flex items-center justify-center text-pr-amber group-hover:bg-pr-amber/20 transition-colors`}>
                    {iconMap[useCase.icon] || <FileCheck className="w-8 h-8" />}
                  </div>
                  <span className={`flex items-center gap-1.5 text-xs font-bold ${status.textColor}`}>
                    {useCase.status === 'live' ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    {status.label}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-pr-white font-bold text-lg mb-1">
                  {useCase.title}
                </h3>
                <p className="text-pr-muted text-sm">
                  {useCase.subtitle}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button - Clear and prominent */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <a
            href={data.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-pr-amber hover:bg-pr-amber-light text-pr-charcoal font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pr-amber/30 hover:scale-105"
          >
            <ExternalLink className="w-5 h-5" />
            {content.cta_label}
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
