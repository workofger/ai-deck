'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Grid3X3 } from 'lucide-react';
import { overlayVariants, modalVariants } from '@/lib/animations';
import { useFocusTrap } from '@/hooks';
import type { SlideData } from '@/lib/types';

interface Props {
  isOpen: boolean;
  slides: SlideData[];
  currentSlide: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

const slideTypeColors: Record<string, string> = {
  ProblemSlide: 'from-red-500/20 to-orange-500/20',
  SolutionSlide: 'from-green-500/20 to-emerald-500/20',
  HowItWorksSlide: 'from-blue-500/20 to-cyan-500/20',
  UseCasesSlide: 'from-purple-500/20 to-pink-500/20',
  ImpactSlide: 'from-amber-500/20 to-yellow-500/20',
};

const slideTypeLabels: Record<string, string> = {
  ProblemSlide: 'Problem',
  SolutionSlide: 'Solution',
  HowItWorksSlide: 'How It Works',
  UseCasesSlide: 'Use Cases',
  ImpactSlide: 'Impact',
};

export default function SlideOverview({ isOpen, slides, currentSlide, onSelect, onClose }: Props) {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            ref={containerRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-pr-dark border border-pr-gray/50 rounded-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-pr-gray/30">
              <div className="flex items-center gap-3">
                <Grid3X3 className="w-5 h-5 text-pr-amber" />
                <h2 className="text-lg font-semibold text-pr-white">Slide Overview</h2>
                <span className="text-pr-muted text-sm">({slides.length} slides)</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-pr-gray/50 text-pr-muted hover:text-pr-white transition-colors"
                aria-label="Close overview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {slides.map((slide, index) => (
                  <motion.button
                    key={slide.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      onSelect(index);
                      onClose();
                    }}
                    className={`
                      relative aspect-video rounded-xl overflow-hidden border-2 transition-all
                      ${index === currentSlide 
                        ? 'border-pr-amber shadow-lg shadow-pr-amber/20' 
                        : 'border-pr-gray/30 hover:border-pr-gray/60'
                      }
                    `}
                  >
                    {/* Slide preview background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${slideTypeColors[slide.type] || 'from-pr-gray/20 to-pr-gray/10'}`} />
                    
                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-2xl font-bold text-pr-white mb-1">
                        {index + 1}
                      </span>
                      <span className="text-xs text-pr-muted">
                        {slideTypeLabels[slide.type] || slide.type}
                      </span>
                    </div>

                    {/* Current indicator */}
                    {index === currentSlide && (
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pr-amber" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-6 py-3 border-t border-pr-gray/30 bg-pr-charcoal/50">
              <p className="text-pr-muted text-sm text-center">
                Click a slide to navigate • Press <kbd className="px-1.5 py-0.5 bg-pr-gray/50 rounded text-xs">Esc</kbd> to close
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
