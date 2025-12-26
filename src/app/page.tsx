'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Presentation, Tv } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-pr-charcoal relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-diagonal-lines opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-pr-amber/10 via-transparent to-red-900/10" />
      
      {/* Floating orbs */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-pr-amber/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <div className="relative z-10 text-center space-y-8 px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-8"
        >
          <img
            src="/ia-deck/Logo.png"
            alt="PartRunner"
            className="h-14 md:h-16 mx-auto"
          />
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-pr-amber text-sm font-semibold tracking-[0.3em] uppercase">
            Presentación Ejecutiva
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-pr-white leading-none">
            AI <span className="text-gradient">Play</span>
          </h1>
          <p className="text-pr-muted text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            AI como capa operativa para logística <span className="text-pr-white font-medium">BIG & BULKY</span>
          </p>
        </motion.div>

        {/* Stats teaser */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-8 py-6"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-500">80%</div>
            <div className="text-pr-muted text-xs uppercase tracking-wider mt-1">Data perdida</div>
          </div>
          <div className="w-px h-12 bg-pr-gray/30" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-500">0%</div>
            <div className="text-pr-muted text-xs uppercase tracking-wider mt-1">Fricción usuario</div>
          </div>
          <div className="w-px h-12 bg-pr-gray/30" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-pr-amber">4</div>
            <div className="text-pr-muted text-xs uppercase tracking-wider mt-1">Casos de uso</div>
          </div>
        </motion.div>
        
        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link 
            href="/deck"
            className="group inline-flex items-center gap-3 bg-pr-amber text-pr-charcoal px-8 py-4 rounded-xl font-bold text-lg hover:bg-pr-amber-light transition-all duration-300 shadow-lg hover:shadow-pr-amber/30 hover:scale-105"
          >
            <Presentation className="w-5 h-5" />
            Entrar al Deck
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link 
            href="/live"
            className="group inline-flex items-center gap-3 bg-pr-dark border border-pr-gray/50 text-pr-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-pr-amber/50 transition-all duration-300"
          >
            <Tv className="w-5 h-5" />
            Vista Live (TV)
          </Link>
        </motion.div>
        
        {/* Keyboard hints */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-pr-muted text-sm space-y-1 pt-6"
        >
          <p>
            <kbd className="px-2 py-1 bg-pr-gray/50 rounded text-xs border border-pr-gray/30">←</kbd>
            {' '}<kbd className="px-2 py-1 bg-pr-gray/50 rounded text-xs border border-pr-gray/30">→</kbd>
            {' '}navegar
            {' • '}
            <kbd className="px-2 py-1 bg-pr-gray/50 rounded text-xs border border-pr-gray/30">P</kbd>
            {' '}notas
            {' • '}
            <kbd className="px-2 py-1 bg-pr-gray/50 rounded text-xs border border-pr-gray/30">F</kbd>
            {' '}fullscreen
          </p>
        </motion.div>
        
        {/* Icon at bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 1 }}
          className="pt-8"
        >
          <img
            src="/ia-deck/Isotipo.png"
            alt="PartRunner Icon"
            className="h-10 mx-auto"
          />
        </motion.div>
      </div>
    </main>
  );
}
