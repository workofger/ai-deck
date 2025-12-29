'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, FileCheck, Phone, Calculator, ExternalLink, CheckCircle, Clock, Sparkles, ArrowRight, QrCode, RotateCcw, MessageSquare, Play, Mic } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import type { UseCasesSlideData } from '@/lib/types';

interface Props {
  data: UseCasesSlideData;
  isActive: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  'user-plus': <UserPlus className="w-8 h-8" />,
  'file-check': <FileCheck className="w-8 h-8" />,
  'phone': <Phone className="w-8 h-8" />,
  'calculator': <Calculator className="w-8 h-8" />,
};

const colorConfig: Record<string, { bg: string; border: string; text: string; glow: string; gradient: string }> = {
  'onboarding': { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', glow: 'shadow-green-500/20', gradient: 'from-green-500 to-green-600' },
  'documents': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'shadow-amber-500/20', gradient: 'from-amber-500 to-amber-600' },
  'voice': { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20', gradient: 'from-purple-500 to-purple-600' },
  'pricing': { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'shadow-blue-500/20', gradient: 'from-blue-500 to-blue-600' },
};

const statusConfig = {
  live: { label: 'LIVE', color: 'bg-green-500', textColor: 'text-green-400', dotColor: 'bg-green-500' },
  testing: { label: 'TESTING', color: 'bg-amber-500', textColor: 'text-amber-400', dotColor: 'bg-amber-500' },
  planned: { label: 'PLANNED', color: 'bg-blue-500', textColor: 'text-blue-400', dotColor: 'bg-blue-500' },
};

const metrics: Record<string, { es: string; en: string }[]> = {
  'onboarding': [
    { es: '847 completados', en: '847 completed' },
    { es: '< 24h tiempo', en: '< 24h time' },
  ],
  'documents': [
    { es: '186 hoy', en: '186 today' },
    { es: '99% accuracy', en: '99% accuracy' },
  ],
  'voice': [
    { es: '78% éxito', en: '78% success' },
    { es: 'A/B testing', en: 'A/B testing' },
  ],
  'pricing': [
    { es: '< 5s respuesta', en: '< 5s response' },
    { es: '24/7 disponible', en: '24/7 available' },
  ],
};

// Demo configurations per use case
const demoConfig: Record<string, { 
  type: 'qr' | 'button' | 'elevenlabs';
  url: string;
  agentId?: string;
  qrLabel: { es: string; en: string };
  buttonLabel: { es: string; en: string };
  description: { es: string; en: string };
}> = {
  'onboarding': {
    type: 'qr',
    url: 'https://wa.me/message/partrunner',
    qrLabel: { es: 'Escanea para chatear con Maya', en: 'Scan to chat with Maya' },
    buttonLabel: { es: 'Abrir WhatsApp', en: 'Open WhatsApp' },
    description: { es: 'Completa un onboarding real via WhatsApp', en: 'Complete a real onboarding via WhatsApp' },
  },
  'documents': {
    type: 'qr',
    url: 'https://wa.me/message/partrunner-docs',
    qrLabel: { es: 'Escanea para enviar un documento', en: 'Scan to send a document' },
    buttonLabel: { es: 'Probar verificación', en: 'Try verification' },
    description: { es: 'Envía una foto de documento y ve la extracción automática', en: 'Send a document photo and see automatic extraction' },
  },
  'voice': {
    type: 'elevenlabs',
    url: '#',
    agentId: 'agent_01jy023manf7hvc5908ekv23p3',
    qrLabel: { es: 'Habla con el agente AI', en: 'Talk to AI agent' },
    buttonLabel: { es: 'Iniciar llamada', en: 'Start call' },
    description: { es: 'Haz click en el micrófono para iniciar una negociación con AI', en: 'Click the microphone to start an AI negotiation' },
  },
  'pricing': {
    type: 'qr',
    url: 'https://wa.me/message/partrunner-pricing',
    qrLabel: { es: 'Escanea para consultar precios', en: 'Scan to check prices' },
    buttonLabel: { es: 'Consultar pricing', en: 'Check pricing' },
    description: { es: 'Pregunta "¿Cuánto cuesta CDMX a MTY?" y obtén respuesta en segundos', en: 'Ask "How much CDMX to MTY?" and get instant response' },
  },
};

// ElevenLabs widget component
function ElevenLabsWidget({ agentId }: { agentId: string }) {
  useEffect(() => {
    // Load ElevenLabs script if not already loaded (beta version required)
    if (!document.querySelector('script[src*="elevenlabs/convai-widget"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed@beta';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div 
      className="elevenlabs-widget-wrapper w-full h-full flex items-center justify-center"
      dangerouslySetInnerHTML={{
        __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`
      }}
    />
  );
}

export default function UseCasesSlide({ data, isActive }: Props) {
  const { language } = useLanguage();
  const content = data.content[language];
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-pr-charcoal">
      {/* Background */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-pr-amber/5 via-transparent to-green-900/5" />
      
      {/* Accents */}
      <motion.div 
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-4 sm:py-6 overflow-y-auto max-h-full"
        variants={containerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3 sm:mb-4">
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pr-amber" />
          <span className="text-pr-amber text-xs sm:text-sm font-bold tracking-wider uppercase">
            {language === 'es' ? 'En Producción' : 'In Production'}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-pr-white">
            {content.headline}
          </h1>
          <p className="text-pr-muted text-sm sm:text-lg mt-1 sm:mt-2">
            {language === 'es' 
              ? 'Toca cada tarjeta para probar el demo →'
              : 'Tap each card to try the demo →'}
          </p>
        </motion.div>

        {/* Use case cards with flip animation - scrollable on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {content.use_cases.map((useCase, i) => {
            const status = statusConfig[useCase.status];
            const colors = colorConfig[useCase.id] || colorConfig['onboarding'];
            const useCaseMetrics = metrics[useCase.id] || [];
            const demo = demoConfig[useCase.id];
            const isFlipped = flippedCards.has(useCase.id);
            const isVoiceCard = useCase.id === 'voice';
            const isVoiceExpanded = isVoiceCard && isFlipped;
            
            return (
              <motion.div
                key={useCase.id}
                variants={itemVariants}
                className={`relative cursor-pointer ${isVoiceExpanded ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2 z-20' : ''}`}
                style={{ perspective: '1000px' }}
                onClick={(e) => toggleFlip(useCase.id, e)}
                layout
                animate={{
                  height: isVoiceExpanded ? 350 : 240,
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div
                  className="relative w-full h-full"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* FRONT of card */}
                  <div 
                    className={`absolute inset-0 bg-pr-dark/70 border ${colors.border} rounded-xl p-3 sm:p-5 hover:shadow-lg ${colors.glow} transition-all duration-300 group`}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {/* Status badge */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text} group-hover:scale-105 transition-transform`}>
                        {iconMap[useCase.icon] || <FileCheck className="w-6 h-6 sm:w-8 sm:h-8" />}
                      </div>
                      <span className={`flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold ${status.textColor}`}>
                        {useCase.status === 'live' ? (
                          <>
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${status.dotColor} animate-pulse`} />
                            {status.label}
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                            {status.label}
                          </>
                        )}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-pr-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-pr-muted text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                      {useCase.subtitle}
                    </p>

                    {/* Mini metrics */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-4">
                      {useCaseMetrics.map((metric, j) => (
                        <span key={j} className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${colors.bg} ${colors.text}`}>
                          {metric[language]}
                        </span>
                      ))}
                    </div>

                    {/* Click hint */}
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex items-center gap-1 text-pr-muted text-[10px] sm:text-xs group-hover:text-pr-amber transition-colors">
                      <span>{language === 'es' ? 'Ver demo' : 'View demo'}</span>
                      <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>

                  {/* BACK of card */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-xl p-3 sm:p-5 flex flex-col items-center justify-center text-center overflow-hidden`}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {demo?.type === 'qr' ? (
                      <>
                        {/* QR Code */}
                        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-xl flex items-center justify-center mb-2 sm:mb-4 shadow-lg">
                          <QrCode className="w-16 h-16 sm:w-24 sm:h-24 text-pr-charcoal" />
                        </div>
                        <p className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                          {demo.qrLabel[language]}
                        </p>
                        <p className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-4 px-2 line-clamp-2">
                          {demo.description[language]}
                        </p>
                        <a
                          href={demo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors min-h-[44px]"
                        >
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {demo.buttonLabel[language]}
                        </a>
                      </>
                    ) : demo?.type === 'elevenlabs' ? (
                      <>
                        {/* ElevenLabs Voice Widget - Responsive layout */}
                        <div className="flex flex-col items-center justify-start h-full w-full p-2 sm:p-4 pt-3 sm:pt-6">
                          <div className="text-center mb-2 sm:mb-4">
                            <p className="text-white font-bold text-sm sm:text-lg mb-0.5 sm:mb-1">
                              {demo.qrLabel[language]}
                            </p>
                            <p className="text-white/70 text-[10px] sm:text-sm px-2">
                              {demo.description[language]}
                            </p>
                          </div>
                          
                          {/* ElevenLabs Widget Container */}
                          {isFlipped && demo.agentId && (
                            <div 
                              onClick={(e) => e.stopPropagation()} 
                              className="relative z-10 flex-1 w-full flex items-center justify-center"
                              style={{ minHeight: '180px' }}
                            >
                              <ElevenLabsWidget agentId={demo.agentId} />
                            </div>
                          )}
                          
                          <p className="text-white/50 text-[10px] sm:text-xs mt-1 sm:mt-2">
                            {language === 'es' ? 'Toca el botón para hablar' : 'Tap the button to talk'}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Button action (fallback) */}
                        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mb-2 sm:mb-4">
                          <Play className="w-7 h-7 sm:w-10 sm:h-10 text-white" />
                        </div>
                        <p className="text-white font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                          {demo?.qrLabel[language]}
                        </p>
                        <p className="text-white/70 text-[10px] sm:text-xs mb-2 sm:mb-4 px-2">
                          {demo?.description[language]}
                        </p>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/20 hover:bg-white/30 active:bg-white/40 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-lg transition-colors min-h-[44px]"
                        >
                          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {demo?.buttonLabel[language]}
                        </button>
                      </>
                    )}

                    {/* Flip back hint */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center gap-1 text-white/60 text-[10px] sm:text-xs">
                      <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 p-3 sm:p-5 bg-pr-dark/50 border border-pr-amber/30 rounded-xl">
          <div className="text-center sm:text-left">
            <p className="text-pr-white font-semibold text-sm sm:text-lg">
              {language === 'es' 
                ? '💡 Pequeñas cosas apiladas crean una experiencia mejorada'
                : '💡 Small things stacked create a better experience'}
            </p>
            <p className="text-pr-muted text-xs sm:text-sm mt-0.5 sm:mt-1 hidden sm:block">
              {language === 'es'
                ? 'Cada caso de uso por sí solo es útil. El poder está en apilarlos.'
                : 'Each use case alone is useful. The power is in stacking them.'}
            </p>
          </div>
          
          {/* CTA Button */}
          <a
            href={data.demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-pr-amber hover:bg-pr-amber-light active:bg-pr-amber text-pr-charcoal font-bold text-sm sm:text-lg px-4 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-pr-amber/30 sm:hover:scale-105 whitespace-nowrap w-full sm:w-auto min-h-[44px]"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            {content.cta_label}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
