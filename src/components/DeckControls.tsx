'use client';

import { ChevronLeft, ChevronRight, Presentation, Play, Maximize, Minimize } from 'lucide-react';

interface NavLabels {
  prev: string;
  next: string;
  presenter: string;
  demo: string;
  fullscreen: string;
}

interface Props {
  currentSlide: number;
  totalSlides: number;
  presenterMode: boolean;
  demoMode: boolean;
  isFullscreen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePresenter: () => void;
  onToggleDemo: () => void;
  onToggleFullscreen: () => void;
  labels?: NavLabels;
}

export default function DeckControls({
  currentSlide,
  totalSlides,
  presenterMode,
  demoMode,
  isFullscreen,
  onPrev,
  onNext,
  onTogglePresenter,
  onToggleDemo,
  onToggleFullscreen,
  labels = { prev: 'Previous', next: 'Next', presenter: 'Notes', demo: 'Demo', fullscreen: 'Fullscreen' }
}: Props) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2">
      {/* Navigation */}
      <div className="flex items-center gap-1 bg-pr-dark/90 backdrop-blur-sm border border-pr-gray/40 rounded-xl p-1">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          disabled={currentSlide === 0}
          className="p-2 rounded-lg hover:bg-pr-gray/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title={labels.prev}
        >
          <ChevronLeft className="w-5 h-5 text-pr-white" />
        </button>
        
        <span className="px-3 text-pr-white text-sm font-medium min-w-[60px] text-center">
          {currentSlide + 1} / {totalSlides}
        </span>
        
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          disabled={currentSlide === totalSlides - 1}
          className="p-2 rounded-lg hover:bg-pr-gray/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title={labels.next}
        >
          <ChevronRight className="w-5 h-5 text-pr-white" />
        </button>
      </div>

      {/* Mode toggles */}
      <div className="flex items-center gap-1 bg-pr-dark/90 backdrop-blur-sm border border-pr-gray/40 rounded-xl p-1">
        <button
          onClick={(e) => { e.stopPropagation(); onTogglePresenter(); }}
          className={`p-2 rounded-lg transition-colors ${
            presenterMode ? 'bg-pr-amber text-pr-charcoal' : 'hover:bg-pr-gray/50 text-pr-white'
          }`}
          title={labels.presenter}
        >
          <Presentation className="w-5 h-5" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); onToggleDemo(); }}
          className={`p-2 rounded-lg transition-colors ${
            demoMode ? 'bg-pr-amber text-pr-charcoal' : 'hover:bg-pr-gray/50 text-pr-white'
          }`}
          title={labels.demo}
        >
          <Play className="w-5 h-5" />
        </button>
        
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFullscreen(); }}
          className="p-2 rounded-lg hover:bg-pr-gray/50 text-pr-white transition-colors"
          title={labels.fullscreen}
        >
          {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
