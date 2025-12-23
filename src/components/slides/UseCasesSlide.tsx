'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Calculator, Phone, FileCheck, Layers, X, ArrowRight, Check, FlaskConical, Clock, Plus } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { UseCasesSlideData, UseCaseItem } from '@/lib/types';
import Image from 'next/image';

interface Props {
  data: UseCasesSlideData;
  isActive: boolean;
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  'onboarding': UserPlus,
  'pricing': Calculator,
  'negotiation': Phone,
  'documents': FileCheck,
};

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  'green': { bg: 'bg-green-500/15', border: 'border-green-500/40', text: 'text-green-400' },
  'blue': { bg: 'bg-blue-500/15', border: 'border-blue-500/40', text: 'text-blue-400' },
  'purple': { bg: 'bg-purple-500/15', border: 'border-purple-500/40', text: 'text-purple-400' },
  'amber': { bg: 'bg-pr-amber/15', border: 'border-pr-amber/40', text: 'text-pr-amber' },
};

const statusConfig: Record<string, { icon: React.FC<{ className?: string }>; color: string }> = {
  'live': { icon: Check, color: 'text-green-400 bg-green-500/20 border-green-500/40' },
  'testing': { icon: FlaskConical, color: 'text-purple-400 bg-purple-500/20 border-purple-500/40' },
  'planned': { icon: Clock, color: 'text-pr-muted bg-pr-gray/30 border-pr-gray/40' },
};

const useCaseImages: Record<string, string> = {
  'onboarding': 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600',
  'pricing': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600',
  'negotiation': 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=600',
  'documents': 'https://images.unsplash.com/photo-1568234928966-359c35dd8327?w=600',
};

export default function UseCasesSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];
  const [selectedCase, setSelectedCase] = useState<UseCaseItem | null>(null);

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

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden bg-pr-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15" />
      
      {/* Accent line */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-pr-amber" />
      
      <motion.div 
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-6 pt-20"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-5 gap-3">
          <div>
            <motion.div variants={itemVariants} className="mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/40 text-green-400 text-xs font-bold tracking-[0.15em] uppercase">
                <Layers className="w-3.5 h-3.5" />
                {content.badge}
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-pr-white leading-[1.1] mb-1"
            >
              {content.headline}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-base text-pr-muted max-w-xl">
              {content.subheadline}
            </motion.p>
          </div>

          <motion.div 
            variants={itemVariants}
            className="px-4 py-2 rounded-lg bg-pr-amber/10 border border-pr-amber/30 max-w-sm"
          >
            <p className="text-pr-amber text-xs font-medium italic">{content.philosophy_note}</p>
          </motion.div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-3 mb-5">
          {content.use_cases.map((useCase) => {
            const Icon = iconMap[useCase.id] || UserPlus;
            const colors = colorMap[useCase.color] || colorMap.amber;
            const status = statusConfig[useCase.status];
            const StatusIcon = status.icon;
            
            return (
              <motion.div
                key={useCase.id}
                variants={itemVariants}
                onClick={() => setSelectedCase(useCase)}
                className={`
                  relative group cursor-pointer
                  bg-pr-dark/60 border ${colors.border} rounded-xl p-4
                  hover:scale-[1.01] transition-all duration-200 overflow-hidden
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center ${colors.text}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-pr-white text-base font-bold leading-tight">{useCase.title}</h3>
                      <p className={`text-xs ${colors.text}`}>{useCase.subtitle}</p>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold border ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                  </span>
                </div>

                {/* User experience */}
                <p className="text-pr-white/90 text-sm mb-3 leading-relaxed">
                  {useCase.user_experience}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-2">
                  {useCase.metrics.map((metric, i) => (
                    <div key={i} className={`px-2.5 py-1 rounded-lg ${colors.bg} border ${colors.border}`}>
                      <span className={`text-base font-bold ${colors.text}`}>{metric.value}</span>
                      <span className="text-pr-muted text-[10px] ml-1">{metric.label}</span>
                    </div>
                  ))}
                </div>

                <div className={`absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${colors.text}`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stacking Effect */}
        <motion.div 
          variants={itemVariants}
          className="bg-pr-dark/50 border border-pr-gray/30 rounded-xl p-4"
        >
          <h4 className="text-pr-muted text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-pr-amber" />
            {content.stacking.title}
          </h4>
          
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {content.use_cases.map((uc, i) => (
              <div key={uc.id} className="flex items-center gap-2">
                <div className={`px-3 py-1.5 rounded-lg ${colorMap[uc.color].bg} border ${colorMap[uc.color].border}`}>
                  <span className={`text-sm font-medium ${colorMap[uc.color].text}`}>{uc.title.split(' ')[0]}</span>
                </div>
                {i < content.use_cases.length - 1 && <Plus className="w-4 h-4 text-pr-amber/50" />}
              </div>
            ))}
            <ArrowRight className="w-5 h-5 text-pr-amber mx-2" />
            <div className="px-4 py-2 rounded-lg bg-pr-amber/20 border border-pr-amber/40">
              <span className="text-pr-amber text-sm font-bold">{content.stacking.combined}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setSelectedCase(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[80vh] bg-pr-dark border border-pr-gray rounded-2xl z-50 overflow-hidden"
            >
              <div className="relative h-40">
                <Image
                  src={useCaseImages[selectedCase.id]}
                  alt={selectedCase.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pr-dark via-pr-dark/70 to-transparent" />
                
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-3 right-3 p-2 rounded-full bg-pr-charcoal/80 hover:bg-pr-charcoal transition-colors"
                >
                  <X className="w-4 h-4 text-pr-white" />
                </button>
                
                <div className="absolute bottom-3 left-5">
                  <h2 className="text-xl font-bold text-pr-white">{selectedCase.title}</h2>
                  <p className={`text-sm ${colorMap[selectedCase.color].text}`}>{selectedCase.subtitle}</p>
                </div>
              </div>
              
              <div className="p-5 space-y-4">
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <h4 className="text-red-400 text-xs font-bold uppercase mb-1">{language === 'es' ? 'Problema' : 'Problem'}</h4>
                  <p className="text-pr-white/90 text-sm">{selectedCase.problem}</p>
                </div>
                
                <div className={`${colorMap[selectedCase.color].bg} border ${colorMap[selectedCase.color].border} rounded-lg p-3`}>
                  <h4 className={`${colorMap[selectedCase.color].text} text-xs font-bold uppercase mb-1`}>{language === 'es' ? 'Solución' : 'Solution'}</h4>
                  <p className="text-pr-white/90 text-sm">{selectedCase.solution}</p>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {selectedCase.metrics.map((metric, i) => (
                    <div key={i} className="bg-pr-charcoal/50 rounded-lg p-3 text-center">
                      <div className={`text-2xl font-bold ${colorMap[selectedCase.color].text}`}>{metric.value}</div>
                      <div className="text-pr-muted text-xs">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
