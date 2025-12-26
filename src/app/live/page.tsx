'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, FileCheck, Phone, Calculator, QrCode, TrendingUp, Activity } from 'lucide-react';
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
  const [lastIncrement, setLastIncrement] = useState<string | null>(null);

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
      const rand = Math.random();
      let key: keyof LiveCounters;
      
      if (rand < 0.5) {
        key = 'q_convos_today';
      } else if (rand < 0.8) {
        key = 'q_docs_today';
      } else {
        key = 'q_matches_today';
      }
      
      setCounters(prev => ({
        ...prev,
        [key]: prev[key] + Math.floor(Math.random() * 2) + 1,
      }));
      setLastIncrement(key);
      
      setTimeout(() => setLastIncrement(null), 500);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Cycle through funnel steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % 4);
    }, 3500);

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
    <MessageSquare key="1" className="w-8 h-8" />,
    <FileCheck key="2" className="w-8 h-8" />,
    <Phone key="3" className="w-8 h-8" />,
    <Calculator key="4" className="w-8 h-8" />,
  ];

  const stepColors = [
    'from-green-500 to-green-600',
    'from-amber-500 to-amber-600',
    'from-purple-500 to-purple-600',
    'from-blue-500 to-blue-600',
  ];

  const counterIcons = [
    <MessageSquare key="1" className="w-6 h-6" />,
    <FileCheck key="2" className="w-6 h-6" />,
    <TrendingUp key="3" className="w-6 h-6" />,
  ];

  const counterKeys: (keyof LiveCounters)[] = ['q_convos_today', 'q_docs_today', 'q_matches_today'];

  return (
    <div className="min-h-screen bg-pr-charcoal relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-pr-amber/10 via-transparent to-green-900/10" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-pr-amber/5 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

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
        <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 backdrop-blur-sm">
          <motion.div 
            className="w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-red-400 font-bold text-sm">LIVE</span>
          <Activity className="w-4 h-4 text-red-400" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8 py-20">
        <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Live Counters */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-pr-white leading-tight">
                AI {language === 'es' ? 'operando' : 'operating'}
                <br />
                <span className="text-gradient">{language === 'es' ? 'en tiempo real' : 'in real time'}</span>
              </h1>
              <p className="text-pr-muted text-lg mt-4 max-w-lg">
                {language === 'es' 
                  ? 'Cada número representa datos que antes se perdían. Ahora se capturan automáticamente.'
                  : 'Every number represents data that used to be lost. Now captured automatically.'}
              </p>
            </motion.div>

            {/* Counters */}
            <div className="space-y-4">
              {liveConfig.counters.map((counter, i) => {
                const key = counterKeys[i];
                const value = counters[key];
                const isIncrementing = lastIncrement === key;
                
                return (
                  <motion.div
                    key={counter.query_ref}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className={`relative bg-pr-dark/60 border rounded-xl p-5 flex items-center justify-between overflow-hidden transition-all duration-300 ${
                      isIncrementing ? 'border-pr-amber shadow-lg shadow-pr-amber/20' : 'border-pr-gray/30'
                    }`}
                  >
                    {/* Background pulse on increment */}
                    <AnimatePresence>
                      {isIncrementing && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0.5 }}
                          animate={{ scale: 3, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-pr-amber rounded-xl"
                        />
                      )}
                    </AnimatePresence>
                    
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-pr-amber/10 flex items-center justify-center text-pr-amber">
                        {counterIcons[i]}
                      </div>
                      <span className="text-pr-white/80 text-lg font-medium">
                        {counter.label[language]}
                      </span>
                    </div>
                    
                    <motion.span
                      key={value}
                      initial={{ scale: isIncrementing ? 1.3 : 1, color: isIncrementing ? '#F5B301' : '#ffffff' }}
                      animate={{ scale: 1, color: '#ffffff' }}
                      transition={{ duration: 0.3 }}
                      className="font-display text-4xl md:text-5xl font-bold text-pr-white relative z-10"
                    >
                      {value.toLocaleString()}
                    </motion.span>
                  </motion.div>
                );
              })}
            </div>

            {/* QR section */}
            {liveConfig.qr_enabled && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-5 bg-pr-dark/50 border border-pr-amber/30 rounded-xl p-5"
              >
                <div className="w-24 h-24 bg-pr-white rounded-xl flex items-center justify-center shadow-lg">
                  <QrCode className="w-20 h-20 text-pr-charcoal" />
                </div>
                <div>
                  <p className="text-pr-white font-bold text-lg">
                    {language === 'es' ? 'Pruébalo en vivo' : 'Try it live'}
                  </p>
                  <p className="text-pr-muted text-sm mt-1">
                    {language === 'es' ? 'Escanea para chatear con Maya' : 'Scan to chat with Maya'}
                  </p>
                  <p className="text-pr-amber text-xs mt-2 font-medium">
                    {language === 'es' ? 'Onboarding completo via WhatsApp' : 'Full onboarding via WhatsApp'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT: Animated funnel steps */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="bg-pr-dark/50 border border-pr-gray/30 rounded-2xl p-8 backdrop-blur-sm">
              <h3 className="text-pr-white/60 text-sm font-bold mb-6 text-center uppercase tracking-widest">
                {language === 'es' ? 'Flujo de Operación' : 'Operation Flow'}
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
                    transition={{ duration: 0.4 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border bg-pr-dark/60 ${
                      currentStep === i ? 'border-pr-amber shadow-lg shadow-pr-amber/10' : 'border-pr-gray/20'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stepColors[i]} flex items-center justify-center text-white shadow-lg`}>
                      {stepIcons[i]}
                    </div>
                    <div className="flex-1">
                      <span className="text-pr-amber text-xs font-bold uppercase tracking-wider">
                        {language === 'es' ? `Paso ${i + 1}` : `Step ${i + 1}`}
                      </span>
                      <p className="text-pr-white font-medium text-lg">{step}</p>
                    </div>
                    {currentStep === i && (
                      <motion.div
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-3 h-3 bg-pr-amber rounded-full shadow-lg shadow-pr-amber/50"
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-6 h-2 bg-pr-gray/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pr-amber to-amber-400"
                  animate={{ width: `${((currentStep + 1) / 4) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <p className="text-pr-muted text-xs text-center mt-4">
                {language === 'es' 
                  ? 'Ciclo automático cada 3.5s • Datos en tiempo real'
                  : 'Auto-cycling every 3.5s • Real-time data'}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-pr-white/60 text-lg font-medium">
          {language === 'es' 
            ? '"No traemos usuarios a nosotros. Vamos hacia ellos."' 
            : '"We don\'t bring users to us. We go to them."'}
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
