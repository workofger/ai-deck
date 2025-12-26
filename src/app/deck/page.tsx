'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDeckSpec } from '@/lib/data';
import { LanguageProvider, LanguageToggle, useLanguage } from '@/lib/language-context';
import type { 
  DeckSpec, 
  ProblemSlideData,
  ComparisonSlideData,
  HowSlideData,
  UseCasesSlideData,
} from '@/lib/types';
import { 
  ProblemSlide, 
  ComparisonSlide, 
  HowSlide, 
  UseCasesSlide, 
} from '@/components/slides';
import DeckControls from '@/components/DeckControls';
import ProgressBar from '@/components/ProgressBar';
import SpeakerNotes from '@/components/SpeakerNotes';

function DeckContent() {
  const { language } = useLanguage();
  const [deckSpec, setDeckSpec] = useState<DeckSpec | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const spec = getDeckSpec();
    setDeckSpec(spec);
    setPresenterMode(spec.meta.ui.presenter_mode_default);
  }, []);

  // Navigation
  const nextSlide = useCallback(() => {
    if (deckSpec) {
      setCurrentSlide(prev => Math.min(prev + 1, deckSpec.slides.length - 1));
    }
  }, [deckSpec]);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'p' || e.key === 'P') {
        setPresenterMode(prev => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Click to advance (only on empty areas)
  const handleSlideClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('a') && !target.closest('input')) {
      nextSlide();
    }
  };

  // Fullscreen
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!deckSpec) {
    return (
      <div className="min-h-screen bg-pr-charcoal flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pr-amber border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-pr-amber text-lg font-medium">
            {language === 'es' ? 'Cargando presentación...' : 'Loading presentation...'}
          </p>
        </div>
      </div>
    );
  }

  const currentSlideData = deckSpec.slides[currentSlide];
  const speakerNotes = currentSlideData.speaker_notes?.[language] || [];

  const renderSlide = () => {
    switch (currentSlideData.type) {
      case 'ProblemSlide':
        return <ProblemSlide data={currentSlideData as ProblemSlideData} isActive={true} />;
      case 'ComparisonSlide':
        return <ComparisonSlide data={currentSlideData as ComparisonSlideData} isActive={true} />;
      case 'HowSlide':
        return <HowSlide data={currentSlideData as HowSlideData} isActive={true} />;
      case 'UseCasesSlide':
        return <UseCasesSlide data={currentSlideData as UseCasesSlideData} isActive={true} />;
      default:
        return <div className="text-pr-white text-center">Unknown slide type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-pr-charcoal overflow-hidden">
      {/* Progress bar */}
      {deckSpec.meta.ui.show_progress && (
        <ProgressBar currentSlide={currentSlide} totalSlides={deckSpec.slides.length} />
      )}

      {/* Logo + Language toggle - top left */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-4">
        <img
          src="/ia-deck/Logo.png"
          alt="PartRunner"
          width={140}
          height={35}
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
        <LanguageToggle />
      </div>

      {/* Slide number - top right */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-pr-dark/80 backdrop-blur-sm border border-pr-gray/30 rounded-lg px-3 py-1.5 text-pr-white/80 text-sm font-mono">
          {currentSlide + 1} / {deckSpec.slides.length}
        </div>
      </div>

      {/* Slide container */}
      <div 
        className="w-full h-screen cursor-pointer"
        onClick={handleSlideClick}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentSlide}-${language}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <DeckControls
        currentSlide={currentSlide}
        totalSlides={deckSpec.slides.length}
        presenterMode={presenterMode}
        demoMode={false}
        isFullscreen={isFullscreen}
        onPrev={prevSlide}
        onNext={nextSlide}
        onTogglePresenter={() => setPresenterMode(prev => !prev)}
        onToggleDemo={() => {}}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Speaker notes */}
      <SpeakerNotes
        notes={speakerNotes}
        isOpen={presenterMode}
        onClose={() => setPresenterMode(false)}
        slideNumber={currentSlide + 1}
        totalSlides={deckSpec.slides.length}
      />

      {/* Keyboard hints (shown briefly) */}
      <div className="fixed bottom-20 right-4 z-30 text-pr-muted/50 text-xs space-y-1 hidden lg:block">
        <p>← → navigate</p>
        <p>P presenter</p>
        <p>F fullscreen</p>
      </div>
    </div>
  );
}

export default function DeckPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-pr-charcoal flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pr-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <LanguageProvider>
      <DeckContent />
    </LanguageProvider>
  );
}
