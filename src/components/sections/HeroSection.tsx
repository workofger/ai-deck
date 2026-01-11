"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    
    const timer1 = setTimeout(() => setShowSubtext(true), prefersReducedMotion ? 0 : 1500);
    const timer2 = setTimeout(() => setShowTransition(true), prefersReducedMotion ? 0 : 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [prefersReducedMotion]);

  const scrollToContext = () => {
    document.getElementById("context")?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0A0A0A" }}
      aria-label="Hero section - Introduction to Partrunner AI Infrastructure"
    >
      {/* Animated Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        
        {/* Partrunner Brand Gradient Orbs - Yellow */}
        <motion.div
          className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
          style={{ background: "rgba(250, 204, 21, 0.08)" }}
          animate={prefersReducedMotion ? {} : {
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
          className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl"
          style={{ background: "rgba(250, 204, 21, 0.08)" }}
          animate={prefersReducedMotion ? {} : {
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Glitch/Chaos Elements (left side) - Only render after mount, hidden on mobile */}
        <AnimatePresence>
          {mounted && !showTransition && !prefersReducedMotion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute left-0 top-0 w-1/2 h-full overflow-hidden hidden md:block"
            >
              {/* Chaotic particles with fixed positions */}
              {particlePositions.map((pos, i) => {
                const anim = particleAnimations[i % particleAnimations.length];
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      background: i % 2 === 0 ? "rgba(250, 204, 21, 0.6)" : "rgba(244, 63, 94, 0.5)",
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
                className="absolute top-1/3 left-8 text-4xl font-mono animate-glitch"
                style={{ color: "rgba(250, 204, 21, 0.3)" }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                {"AI_MAGIC()"}
              </motion.div>
              <motion.div
                className="absolute top-1/2 left-16 text-2xl font-mono animate-glitch"
                style={{ color: "rgba(163, 163, 163, 0.3)", animationDelay: "0.1s" }}
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
          initial={{ width: "100%" }}
          animate={{ width: mounted && showTransition ? "100%" : "50%" }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.5, ease: "easeInOut" }}
        >
          {/* Structured grid lines - Yellow */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FACC15" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          
          {/* Data flow lines - Yellow */}
          <motion.div
            className="absolute top-1/4 left-0 right-0 h-px hidden md:block"
            style={{ background: "linear-gradient(to right, transparent, rgba(250, 204, 21, 0.4), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted && showTransition ? 1 : 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.5 }}
          />
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px hidden md:block"
            style={{ background: "linear-gradient(to right, transparent, rgba(250, 204, 21, 0.6), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted && showTransition ? 1 : 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.7 }}
          />
          <motion.div
            className="absolute top-3/4 left-0 right-0 h-px hidden md:block"
            style={{ background: "linear-gradient(to right, transparent, rgba(250, 204, 21, 0.4), transparent)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: mounted && showTransition ? 1 : 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: 0.9 }}
          />
        </motion.div>
      </div>

      {/* Main Content - Centered with flex-grow */}
      <div className="relative z-10 text-center px-4 sm:px-6 flex-grow flex flex-col justify-center py-20 md:py-0">
        {/* Partrunner Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="mb-6 md:mb-8 flex justify-center"
        >
          <Image
            src="/logo-partrunner.png"
            alt="Partrunner"
            width={200}
            height={50}
            className="h-8 sm:h-10 w-auto"
            priority
          />
        </motion.div>

        {/* Main Title with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="mb-4 md:mb-6"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 leading-tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            >
              This isn&apos;t another{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
              className="text-gradient"
            >
              AI demo
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.6 }}
            >
              .
            </motion.span>
          </h1>
          
          <AnimatePresence>
            {showSubtext && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                className="text-xl sm:text-2xl md:text-3xl font-light"
                style={{ color: "#A3A3A3" }}
              >
                This is what it{" "}
                <span className="font-medium" style={{ color: "#FACC15" }}>actually</span> takes.
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
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.5 }}
              className="mt-6 md:mt-12"
            >
              <p className="text-base md:text-lg mb-2" style={{ color: "#737373" }}>
                Infrastructure & AI Enablement
              </p>
              <p className="text-sm md:text-base" style={{ color: "#A3A3A3" }}>
                6 Months of Building • Process, Decisions, Learnings
              </p>
              
              {/* Author */}
              <div className="mt-6 md:mt-8 flex items-center justify-center gap-2 text-xs md:text-sm" style={{ color: "#737373" }}>
                <span>By</span>
                <span className="text-white font-medium">Gerry</span>
                <span>•</span>
                <span>Technical Report</span>
              </div>

              {/* Brand Divider - Yellow */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 1 }}
                className="mt-6 md:mt-8 mx-auto w-24 md:w-32 h-1 rounded-full"
                style={{ background: "#FACC15" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scroll Indicator - Fixed at bottom, separate from content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showTransition ? 1 : 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 1.5 }}
        className="relative z-10 pb-6 md:pb-8"
      >
        <motion.button
          className="flex flex-col items-center gap-1 md:gap-2 cursor-pointer transition-colors p-2 rounded-lg"
          style={{ color: "#737373" }}
          onClick={scrollToContext}
          whileHover={prefersReducedMotion ? {} : { y: 5 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll down to explore the content"
        >
          <span className="text-xs md:text-sm">Scroll to explore</span>
          <motion.div
            animate={prefersReducedMotion ? {} : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="md:w-6 md:h-6" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Divider Line - Hidden on mobile */}
      <AnimatePresence>
        {mounted && !showTransition && !prefersReducedMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(250, 204, 21, 0.3), transparent)" }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
