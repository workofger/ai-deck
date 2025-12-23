'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getDeckSpec } from '@/lib/data';
import { LanguageProvider, LanguageToggle, useLanguage } from '@/lib/language-context';
import type { 
  DeckSpec, 
  ProblemSlideData,
  SolutionSlideData,
  HowItWorksSlideData,
  UseCasesSlideData,
  ImpactSlideData,
  LiveCounters 
} from '@/lib/types';
import { 
  ProblemSlide, 
  SolutionSlide, 
  HowItWorksSlide, 
  UseCasesSlide, 
  ImpactSlide 
} from '@/components/slides';
import DeckControls from '@/components/DeckControls';
import ProgressBar from '@/components/ProgressBar';
import SpeakerNotes from '@/components/SpeakerNotes';

function DeckContent() {
  const { language, t } = useLanguage();
  const [deckSpec, setDeckSpec] = useState<DeckSpec | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presenterMode, setPresenterMode] = useState(false);
  const [demoMode, setDemoMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [counters, setCounters] = useState<LiveCounters>({
    q_convos_today: 1247,
    q_docs_today: 186,
    q_matches_today: 92,
    q_onboarding_completed: 847,
  });

  useEffect(() => {
    const spec = getDeckSpec();
    setDeckSpec(spec);
    setPresenterMode(spec.meta.ui.presenter_mode_default);
    setDemoMode(spec.meta.ui.demo_mode_default);
    
    setCounters({
      q_convos_today: spec.data_layer.queries.q_convos_today.mock_value,
      q_docs_today: spec.data_layer.queries.q_docs_today.mock_value,
      q_matches_today: spec.data_layer.queries.q_matches_today.mock_value,
      q_onboarding_completed: spec.data_layer.queries.q_onboarding_completed?.mock_value || 847,
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (!deckSpec) return;
    const maxIndex = deckSpec.slides.length - 1;
    setCurrentSlide(Math.max(0, Math.min(index, maxIndex)));
  }, [deckSpec]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(deckSpec?.slides.length ? deckSpec.slides.length - 1 : 0);
          break;
        case 'p':
        case 'P':
          if (!e.metaKey && !e.ctrlKey) {
            setPresenterMode(prev => !prev);
          }
          break;
        case 'd':
        case 'D':
          if (!e.metaKey && !e.ctrlKey) {
            setDemoMode(prev => !prev);
          }
          break;
        case 'f':
        case 'F':
          if (!e.metaKey && !e.ctrlKey) {
            toggleFullscreen();
          }
          break;
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen?.();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, deckSpec, isFullscreen]);

  const handleSlideClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
      return;
    }
    nextSlide();
  }, [nextSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }, []);

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
  const speakerNotesData = (currentSlideData as { speaker_notes?: { es: string[]; en: string[] } }).speaker_notes;
  const speakerNotes = speakerNotesData ? speakerNotesData[language] : [];

  const renderSlide = () => {
    switch (currentSlideData.type) {
      case 'ProblemSlide':
        return <ProblemSlide data={currentSlideData as ProblemSlideData} isActive={true} />;
      case 'SolutionSlide':
        return <SolutionSlide data={currentSlideData as SolutionSlideData} isActive={true} />;
      case 'HowItWorksSlide':
        return <HowItWorksSlide data={currentSlideData as HowItWorksSlideData} isActive={true} />;
      case 'UseCasesSlide':
        return <UseCasesSlide data={currentSlideData as UseCasesSlideData} isActive={true} />;
      case 'ImpactSlide':
        return <ImpactSlide data={currentSlideData as ImpactSlideData} isActive={true} counters={counters} demoMode={demoMode} />;
      default:
        return <div className="text-pr-white">Unknown slide type</div>;
    }
  };

  const navLabels = t(deckSpec.i18n.nav);

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
          width={160}
          height={40}
          className="opacity-90 hover:opacity-100 transition-opacity"
        />
        <LanguageToggle />
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
        demoMode={demoMode}
        isFullscreen={isFullscreen}
        onPrev={prevSlide}
        onNext={nextSlide}
        onTogglePresenter={() => setPresenterMode(prev => !prev)}
        onToggleDemo={() => setDemoMode(prev => !prev)}
        onToggleFullscreen={toggleFullscreen}
        labels={navLabels}
      />

      {/* Speaker notes */}
      <SpeakerNotes
        notes={speakerNotes}
        isOpen={presenterMode}
        slideNumber={currentSlide + 1}
        totalSlides={deckSpec.slides.length}
        onClose={() => setPresenterMode(false)}
      />

      {/* Demo mode indicator */}
      {demoMode && (
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-pr-amber/20 border border-pr-amber/30">
            <span className="w-2 h-2 bg-pr-amber rounded-full animate-pulse" />
            <span className="text-pr-amber text-xs font-medium">{navLabels.demo}</span>
          </div>
        </div>
      )}

      {/* Slide indicator dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 hidden lg:flex items-center gap-2">
        {deckSpec.slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-pr-amber w-6' 
                : 'bg-pr-gray/50 hover:bg-pr-gray'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function DeckPage() {
  return (
    <LanguageProvider defaultLanguage="es">
      <DeckContent />
    </LanguageProvider>
  );
}
