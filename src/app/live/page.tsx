'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, FileCheck, Phone, Calculator, QrCode } from 'lucide-react';
import { getDeckSpec } from '@/lib/data';
import { LanguageProvider, LanguageToggle, useLanguage } from '@/lib/language-context';
import type { DeckSpec, LiveCounters } from '@/lib/types';

function LiveContent() {
  const { language } = useLanguage();
  const [deckSpec, setDeckSpec] = useState<DeckSpec | null>(null);
  const [counters, setCounters] = useState<LiveCounters>({
    q_convos_today: 0,
    q_docs_today: 0,
    q_matches_today: 0,
  });
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const spec = getDeckSpec();
    setDeckSpec(spec);
    
    // Initialize counters
    setCounters({
      q_convos_today: spec.data_layer.queries.q_convos_today.mock_value,
      q_docs_today: spec.data_layer.queries.q_docs_today.mock_value,
      q_matches_today: spec.data_layer.queries.q_matches_today.mock_value,
    });
  }, []);

  // Simulate live counter ticking
  useEffect(() => {
    const interval = setInterval(() => {
      setCounters(prev => ({
        q_convos_today: prev.q_convos_today + Math.floor(Math.random() * 3),
        q_docs_today: prev.q_docs_today + (Math.random() > 0.7 ? 1 : 0),
        q_matches_today: prev.q_matches_today + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Cycle through funnel steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (!deckSpec) {
    return (
      <div className="min-h-screen bg-pr-charcoal flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pr-amber border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const liveConfig = deckSpec.live_page;
  const videoSteps = liveConfig.video_steps[language];

  const stepIcons = [
    <MessageSquare key="1" className="w-10 h-10" />,
    <FileCheck key="2" className="w-10 h-10" />,
    <Phone key="3" className="w-10 h-10" />,
    <Calculator key="4" className="w-10 h-10" />,
  ];

  const stepColors = [
    'from-green-500 to-green-600',
    'from-amber-500 to-amber-600',
    'from-purple-500 to-purple-600',
    'from-blue-500 to-blue-600',
  ];

  return (
    <div className="min-h-screen bg-pr-charcoal relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-br from-pr-amber/5 via-transparent to-green-900/5" />

      {/* Header */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-4">
        <img
          src="/ia-deck/Logo.png"
          alt="PartRunner"
          className="h-10 opacity-90"
        />
        <LanguageToggle />
      </div>

      {/* "LIVE" indicator */}
      <div className="absolute top-6 right-6 z-50">
        <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-red-400 font-bold text-sm">LIVE</span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Live Counters */}
          <div className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold text-pr-white leading-tight"
            >
              {language === 'es' ? 'AI operando en tiempo real' : 'AI operating in real time'}
            </motion.h1>

            {/* Counters */}
            <div className="space-y-4">
              {liveConfig.counters.map((counter, i) => {
                const value = counters[counter.query_ref as keyof LiveCounters];
                return (
                  <motion.div
                    key={counter.query_ref}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="bg-pr-dark/60 border border-pr-gray/30 rounded-xl p-5 flex items-center justify-between"
                  >
                    <span className="text-pr-white/80 text-lg">
                      {counter.label[language]}
                    </span>
                    <motion.span
                      key={value}
                      initial={{ scale: 1.2, color: '#F5B301' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      className="font-display text-4xl font-bold text-pr-white"
                    >
                      {value.toLocaleString()}
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>

            {/* Optional QR */}
            {liveConfig.qr_enabled && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 bg-pr-dark/40 border border-pr-gray/20 rounded-xl p-4"
              >
                <div className="w-20 h-20 bg-pr-white rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-pr-charcoal" />
                </div>
                <div>
                  <p className="text-pr-white font-medium">
                    {language === 'es' ? 'Pruébalo en vivo' : 'Try it live'}
                  </p>
                  <p className="text-pr-muted text-sm">
                    {language === 'es' ? 'Escanea para chatear con Maya' : 'Scan to chat with Maya'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Animated funnel steps */}
          <div className="relative">
            <div className="bg-pr-dark/40 border border-pr-gray/30 rounded-2xl p-8">
              <h3 className="text-pr-white/60 text-sm font-medium mb-6 text-center uppercase tracking-wider">
                {language === 'es' ? 'Flujo de operación' : 'Operation flow'}
              </h3>

              {/* Steps visualization */}
              <div className="space-y-4">
                {videoSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      opacity: currentStep >= i ? 1 : 0.3,
                      scale: currentStep === i ? 1.02 : 1,
                      borderColor: currentStep === i ? '#F5B301' : 'rgba(255,255,255,0.1)',
                    }}
                    transition={{ duration: 0.5 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border bg-pr-dark/50 ${
                      currentStep === i ? 'border-pr-amber' : 'border-pr-gray/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stepColors[i]} flex items-center justify-center text-white`}>
                      {stepIcons[i]}
                    </div>
                    <div className="flex-1">
                      <span className="text-pr-amber text-xs font-bold">
                        {language === 'es' ? `PASO ${i + 1}` : `STEP ${i + 1}`}
                      </span>
                      <p className="text-pr-white font-medium">{step}</p>
                    </div>
                    {currentStep === i && (
                      <motion.div
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-3 h-3 bg-pr-amber rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-1 bg-pr-gray/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-pr-amber"
                  animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-pr-muted text-sm">
          {language === 'es' 
            ? 'No traemos usuarios a nosotros. Vamos hacia ellos.' 
            : "We don't bring users to us. We go to them."}
        </p>
      </div>
    </div>
  );
}

export default function LivePage() {
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
      <LiveContent />
    </LanguageProvider>
  );
}

