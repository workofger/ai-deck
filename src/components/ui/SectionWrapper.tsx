"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
  background?: "default" | "grid" | "dots" | "gradient";
}

const backgrounds = {
  default: "",
  grid: "bg-grid-pattern",
  dots: "bg-dot-pattern",
  gradient: "bg-gradient-to-b from-deep-navy via-slate-dark/50 to-deep-navy",
};

export function SectionWrapper({ 
  id, 
  children, 
  className,
  fullHeight = true,
  background = "default",
}: SectionWrapperProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <section
      id={id}
      className={cn(
        "relative px-4 sm:px-6 md:px-8 lg:px-16",
        fullHeight && "min-h-screen min-h-[100dvh]",
        "flex flex-col justify-center",
        "py-12 sm:py-16 md:py-24",
        backgrounds[background],
        className
      )}
      aria-labelledby={`${id}-heading`}
    >
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
        className="max-w-7xl mx-auto w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({ label, title, description, className }: SectionHeaderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <motion.header
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className={cn("mb-8 sm:mb-12 md:mb-16", className)}
    >
      {label && (
        <span 
          className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 block" 
          style={{ color: "#FACC15" }}
        >
          {label}
        </span>
      )}
      <h2 
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight"
      >
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-slate-light max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.header>
  );
}
