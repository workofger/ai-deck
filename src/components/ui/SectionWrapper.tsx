"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

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
  return (
    <section
      id={id}
      className={cn(
        "relative px-4 md:px-8 lg:px-16",
        fullHeight && "min-h-screen",
        "flex flex-col justify-center",
        "py-16 md:py-24",
        backgrounds[background],
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mb-12 md:mb-16", className)}
    >
      {label && (
        <span className="label text-blue mb-2 block">{label}</span>
      )}
      <h2 className="heading-section text-white mb-4">{title}</h2>
      {description && (
        <p className="body-large max-w-3xl">{description}</p>
      )}
    </motion.div>
  );
}

