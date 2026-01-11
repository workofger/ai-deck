"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useState } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "violet" | "emerald" | "amber" | "rose" | "cyan" | "teal";
  onClick?: () => void;
  delay?: number;
}

const glowColors = {
  blue: "hover:border-blue hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
  violet: "hover:border-violet hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
  emerald: "hover:border-emerald hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]",
  amber: "hover:border-amber hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
  rose: "hover:border-rose hover:shadow-[0_0_40px_rgba(244,63,94,0.15)]",
  cyan: "hover:border-cyan hover:shadow-[0_0_40px_rgba(6,182,212,0.15)]",
  teal: "hover:border-teal hover:shadow-[0_0_40px_rgba(13,148,136,0.15)]",
};

export function Card({ 
  children, 
  className, 
  hover = true, 
  glow = "blue",
  onClick,
  delay = 0,
}: CardProps) {
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
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : delay }}
      whileHover={hover && !prefersReducedMotion ? { y: -4 } : undefined}
      onClick={onClick}
      className={cn(
        "bg-slate-dark border border-slate-mid rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8",
        "transition-all duration-300",
        hover && glowColors[glow],
        onClick && "cursor-pointer",
        "focus-within:ring-2 focus-within:ring-yellow-400 focus-within:ring-offset-2 focus-within:ring-offset-black",
        className
      )}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </motion.div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("mb-3 md:mb-4", className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({ children, className, as: Tag = "h3" }: CardTitleProps) {
  return (
    <Tag className={cn("text-lg sm:text-xl md:text-2xl font-semibold text-white", className)}>
      {children}
    </Tag>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn("text-sm sm:text-base text-slate-light mt-2", className)}>
      {children}
    </p>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn("text-sm sm:text-base text-slate-light", className)}>
      {children}
    </div>
  );
}
