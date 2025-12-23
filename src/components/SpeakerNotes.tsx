'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, StickyNote, Play, Pause, RotateCcw, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { useTimer } from '@/hooks';
import { useState } from 'react';

interface Props {
  notes: string[];
  isOpen: boolean;
  slideNumber: number;
  totalSlides: number;
  onClose: () => void;
}

export default function SpeakerNotes({ notes, isOpen, slideNumber, totalSlides, onClose }: Props) {
  const timer = useTimer();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className={`fixed z-40 transition-all duration-300 ${
            isMinimized 
              ? 'bottom-24 right-6 w-auto' 
              : 'bottom-24 right-6 w-full max-w-md'
          }`}
        >
          <div className="speaker-notes bg-pr-dark/95 backdrop-blur-xl border border-pr-gray/50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-pr-gray/30 bg-pr-gray/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-pr-amber">
                  <StickyNote className="w-4 h-4" />
                  <span className="text-sm font-medium">Speaker Notes</span>
                </div>
                <span className="text-pr-muted text-xs">
                  {slideNumber}/{totalSlides}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-pr-gray/50 text-pr-muted hover:text-pr-white transition-colors"
                  aria-label={isMinimized ? 'Expand notes' : 'Minimize notes'}
                >
                  {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-pr-gray/50 text-pr-muted hover:text-pr-white transition-colors"
                  aria-label="Close notes"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Timer bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-pr-charcoal/50 border-b border-pr-gray/20">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-pr-muted" />
                <span className={`font-mono text-lg font-semibold ${timer.isRunning ? 'text-pr-amber' : 'text-pr-white'}`}>
                  {timer.formatted}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={timer.toggle}
                  className={`p-2 rounded-lg transition-colors ${
                    timer.isRunning 
                      ? 'bg-pr-amber/20 text-pr-amber hover:bg-pr-amber/30' 
                      : 'bg-pr-gray/50 text-pr-muted hover:bg-pr-gray hover:text-pr-white'
                  }`}
                  aria-label={timer.isRunning ? 'Pause timer' : 'Start timer'}
                >
                  {timer.isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={timer.reset}
                  className="p-2 rounded-lg bg-pr-gray/50 text-pr-muted hover:bg-pr-gray hover:text-pr-white transition-colors"
                  aria-label="Reset timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notes content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 max-h-72 overflow-y-auto">
                    {notes.length > 0 ? (
                      <ul className="space-y-3">
                        {notes.map((note, index) => (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="flex gap-3 text-sm text-pr-white/90 leading-relaxed"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-pr-amber/20 text-pr-amber flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </span>
                            <span>{note}</span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-pr-muted text-sm text-center py-4">
                        No speaker notes for this slide.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Minimized state info */}
            {isMinimized && (
              <div className="px-4 py-2 flex items-center gap-2">
                <span className="text-pr-muted text-xs">{notes.length} notes</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
