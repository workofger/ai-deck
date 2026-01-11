"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Fixed positions for particles to avoid hydration mismatch
const particlePositions = [
  { left: 10, top: 15 }, { left: 25, top: 30 }, { left: 40, top: 10 },
  { left: 55, top: 45 }, { left: 70, top: 20 }, { left: 85, top: 35 },
  { left: 15, top: 60 }, { left: 30, top: 75 }, { left: 45, top: 55 },
  { left: 60, top: 80 }, { left: 75, top: 65 }, { left: 90, top: 50 },
  { left: 20, top: 85 }, { left: 35, top: 25 }, { left: 50, top: 70 },
  { left: 65, top: 40 }, { left: 80, top: 90 }, { left: 5, top: 50 },
  { left: 95, top: 15 }, { left: 48, top: 92 },
];

const particleAnimations = [
  { x: [0, 30, 0], y: [0, -20, 0], duration: 3 },
  { x: [0, -25, 0], y: [0, 30, 0], duration: 3.5 },
  { x: [0, 40, 0], y: [0, 15, 0], duration: 4 },
  { x: [0, -35, 0], y: [0, -25, 0], duration: 3.2 },
  { x: [0, 20, 0], y: [0, 40, 0], duration: 3.8 },
];

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer1 = setTimeout(() => setShowSubtext(true), 1500);
    const timer2 = setTimeout(() => setShowTransition(true), 3000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-deep-navy">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-blue/20 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 bg-violet/20 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Glitch/Chaos Elements (left side) - Only render after mount */}
        <AnimatePresence>
          {mounted && !showTransition && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute left-0 top-0 w-1/2 h-full overflow-hidden"
            >
              {/* Chaotic particles with fixed positions */}
              {particlePositions.map((pos, i) => {
                const anim = particleAnimations[i % particleAnimations.length];
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-rose/50 rounded-full"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                    }}
                    animate={{
                      x: anim.x,
                      y: anim.y,
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: anim.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
              {/* Glitchy text */}
              <motion.div
                className="absolute top-1/3 left-8 text-4xl font-mono text-rose/30 animate-glitch"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {"AI_MAGIC()"}
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-16 text-2xl font-mono text-violet/30 animate-glitch"
                style={{ animationDelay: "0.1s" }}
                animate={{ opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                {"hallucinate..."}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Structured Elements (right side / full after transition) */}
        <motion.div
          className="absolute right-0 top-0 h-full overflow-hidden"
          initial={{ width: "50%" }}
          animate={{ width: mounted && showTransition ? "100%" : "50%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          {/* Structured grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Data flow lines */}
          <motion.div
            className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted && showTransition ? 1 : 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted && showTransition ? 1 : 0.5 }}
            transition={{ duration: 1, delay: 0.7 }}
          />
          <motion.div
            className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet/50 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted && showTransition ? 1 : 0.5 }}
            transition={{ duration: 1, delay: 0.9 }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        {/* Main Title with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="heading-hero text-white mb-2">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              This isn&apos;t another{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gradient"
            >
              AI demo
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              .
            </motion.span>
          </h1>
          
          <AnimatePresence>
            {showSubtext && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl md:text-3xl text-slate-light font-light"
              >
                This is what it{" "}
                <span className="text-white font-medium">actually</span> takes.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Subtitle */}
        <AnimatePresence>
          {showTransition && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <p className="text-slate-muted text-lg mb-2">
                Partrunner Infrastructure & AI Enablement
              </p>
              <p className="text-slate-light">
                6 Months of Building • Process, Decisions, Learnings
              </p>
              
              {/* Author */}
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-muted">
                <span>By</span>
                <span className="text-white font-medium">Gerry</span>
                <span>•</span>
                <span>Technical Report</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showTransition ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            className="flex flex-col items-center gap-2 text-slate-muted cursor-pointer"
            onClick={() => document.getElementById("context")?.scrollIntoView({ behavior: "smooth" })}
            whileHover={{ y: 5 }}
          >
            <span className="text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider Line */}
      <AnimatePresence>
        {mounted && !showTransition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-mid to-transparent"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
