'use client';

import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-pr-charcoal flex items-center justify-center">
      <div className="w-full max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Logo placeholder */}
          <div className="flex justify-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-pr-gray/30 animate-pulse" />
          </div>

          {/* Title skeleton */}
          <div className="space-y-4">
            <div className="h-12 bg-pr-gray/30 rounded-xl w-3/4 mx-auto animate-pulse" />
            <div className="h-6 bg-pr-gray/20 rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>

          {/* Content skeleton */}
          <div className="space-y-3 mt-8">
            <div className="h-4 bg-pr-gray/20 rounded w-full animate-pulse" />
            <div className="h-4 bg-pr-gray/20 rounded w-5/6 animate-pulse" />
            <div className="h-4 bg-pr-gray/20 rounded w-4/6 animate-pulse" />
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-3">
              <motion.div
                className="w-2 h-2 rounded-full bg-pr-amber"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-pr-amber"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-2 h-2 rounded-full bg-pr-amber"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </div>

          <p className="text-pr-muted text-sm text-center mt-4">
            Loading presentation...
          </p>
        </motion.div>
      </div>
    </div>
  );
}

