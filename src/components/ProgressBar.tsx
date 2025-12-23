'use client';

import { motion } from 'framer-motion';

interface Props {
  currentSlide: number;
  totalSlides: number;
}

export default function ProgressBar({ currentSlide, totalSlides }: Props) {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-pr-dark">
      <motion.div
        className="h-full bg-gradient-to-r from-pr-amber to-pr-amber-light"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}

