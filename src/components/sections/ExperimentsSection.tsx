"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon, IconName } from "@/components/ui/Icons";
import { experiments } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Inline color styles to avoid Tailwind purging dynamic classes
const colorStyles: Record<string, { bg: string; bgLight: string; text: string; border: string }> = {
  teal: { bg: "rgba(13, 148, 136, 0.2)", bgLight: "rgba(13, 148, 136, 0.05)", text: "#0D9488", border: "rgba(13, 148, 136, 0.3)" },
  violet: { bg: "rgba(139, 92, 246, 0.2)", bgLight: "rgba(139, 92, 246, 0.05)", text: "#8B5CF6", border: "rgba(139, 92, 246, 0.3)" },
  blue: { bg: "rgba(59, 130, 246, 0.2)", bgLight: "rgba(59, 130, 246, 0.05)", text: "#3B82F6", border: "rgba(59, 130, 246, 0.3)" },
  amber: { bg: "rgba(245, 158, 11, 0.2)", bgLight: "rgba(245, 158, 11, 0.05)", text: "#F59E0B", border: "rgba(245, 158, 11, 0.3)" },
  emerald: { bg: "rgba(16, 185, 129, 0.2)", bgLight: "rgba(16, 185, 129, 0.05)", text: "#10B981", border: "rgba(16, 185, 129, 0.3)" },
  rose: { bg: "rgba(244, 63, 94, 0.2)", bgLight: "rgba(244, 63, 94, 0.05)", text: "#F43F5E", border: "rgba(244, 63, 94, 0.3)" },
  cyan: { bg: "rgba(6, 182, 212, 0.2)", bgLight: "rgba(6, 182, 212, 0.05)", text: "#06B6D4", border: "rgba(6, 182, 212, 0.3)" },
};

const statusLabels: Record<string, { label: string; variant: "success" | "partial" | "early" }> = {
  success: { label: "Success", variant: "success" },
  partial: { label: "Partial Success", variant: "partial" },
  early: { label: "Early Stage", variant: "early" },
};

type TabType = "design" | "outcome" | "learning";

export function ExperimentsSection() {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [activeTab, setActiveTab] = useState<TabType>("design");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Check scroll position to show/hide arrows
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollTo = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 220; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const experiment = experiments[activeExperiment];
  const status = statusLabels[experiment.status];
  const expColors = colorStyles[experiment.color] || colorStyles.blue;

  return (
    <SectionWrapper id="experiments" fullHeight={false} className="py-16 md:py-24">
      <SectionHeader
        label="03 — Journey"
        title="The Experiments"
        description="Experiments were not 'research projects'; they were vehicles to validate assumptions and push the infrastructure forward."
      />

      {/* Experiment Navigation */}
      <div className="relative mb-6 md:mb-8" role="region" aria-label="Experiment selector">
        {/* Scroll Buttons - Desktop */}
        <button
          onClick={() => scrollTo("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-dark/90 backdrop-blur-sm rounded-full border border-slate-mid transition-all hidden md:flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ 
            borderColor: canScrollLeft ? "#FACC15" : undefined,
            color: canScrollLeft ? "#FACC15" : "#737373"
          }}
          aria-label="Scroll experiments left"
          disabled={!canScrollLeft}
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollTo("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-dark/90 backdrop-blur-sm rounded-full border border-slate-mid transition-all hidden md:flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ 
            borderColor: canScrollRight ? "#FACC15" : undefined,
            color: canScrollRight ? "#FACC15" : "#737373"
          }}
          aria-label="Scroll experiments right"
          disabled={!canScrollRight}
        >
          <ChevronRight size={20} />
        </button>

        {/* Mobile swipe hint */}
        <div className="flex md:hidden items-center justify-center gap-2 mb-3 text-xs text-slate-muted">
          <ChevronLeft size={14} />
          <span>Swipe to explore</span>
          <ChevronRight size={14} />
        </div>

        {/* Experiment Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-4 px-2 md:px-12 scroll-smooth snap-x snap-mandatory touch-pan-x"
          style={{ 
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
          role="listbox"
          aria-label="Experiments list"
        >
          {experiments.map((exp, index) => {
            const colors = colorStyles[exp.color] || colorStyles.blue;
            const isActive = activeExperiment === index;
            
            return (
              <motion.button
                key={exp.id}
                onClick={() => {
                  setActiveExperiment(index);
                  setActiveTab("design");
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex-shrink-0 w-40 md:w-48 p-3 md:p-4 rounded-xl border text-left transition-all snap-start focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black"
                style={{
                  borderColor: isActive ? colors.text : "var(--slate-mid)",
                  backgroundColor: isActive ? colors.bgLight : "rgba(20, 20, 20, 0.5)",
                  // @ts-expect-error - CSS custom property for focus ring
                  "--tw-ring-color": colors.text,
                }}
                role="option"
                aria-selected={isActive}
                aria-label={`Experiment ${index + 1}: ${exp.title}`}
              >
                <div 
                  className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center mb-2 md:mb-3"
                  style={{ backgroundColor: colors.bg }}
                >
                  <Icon name={exp.icon as IconName} size={18} style={{ color: colors.text }} />
                </div>
                <p className="text-xs md:text-sm font-medium text-white line-clamp-2">{exp.title}</p>
                <div className="mt-2">
                  <Badge variant={statusLabels[exp.status].variant}>
                    {statusLabels[exp.status].label}
                  </Badge>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Progress Dots - Brand Yellow */}
        <div className="flex justify-center gap-1.5 md:gap-2 mt-3 md:mt-4" role="tablist" aria-label="Experiment navigation">
          {experiments.map((exp, index) => (
            <button
              key={index}
              onClick={() => setActiveExperiment(index)}
              className="h-1.5 md:h-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 focus:ring-offset-black"
              style={{
                width: activeExperiment === index ? "20px" : "6px",
                backgroundColor: activeExperiment === index ? "#FACC15" : "var(--slate-mid)",
              }}
              role="tab"
              aria-selected={activeExperiment === index}
              aria-label={`Go to experiment ${index + 1}: ${exp.title}`}
              aria-controls={`experiment-panel-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Experiment Detail Card */}
      <motion.div
        key={activeExperiment}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        id={`experiment-panel-${activeExperiment}`}
        role="tabpanel"
        aria-labelledby={`experiment-tab-${activeExperiment}`}
      >
        <Card glow={experiment.color as "teal" | "violet" | "blue" | "amber" | "emerald" | "rose"} hover={false} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="flex items-start gap-3 md:gap-4">
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: expColors.bg }}
              >
                <Icon name={experiment.icon as IconName} size={24} style={{ color: expColors.text }} />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1">
                  <span className="text-slate-muted font-mono text-xs md:text-sm">
                    Experiment {String(activeExperiment + 1).padStart(2, "0")}
                  </span>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="text-lg md:text-2xl font-semibold text-white">{experiment.title}</h3>
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-lg bg-slate-dark/50 border border-slate-mid">
            <p className="text-xs md:text-sm text-slate-muted mb-1">Objective</p>
            <p className="text-sm md:text-base text-white">{experiment.objective}</p>
          </div>

          {/* Tabs - Brand Yellow */}
          <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-6 overflow-x-auto" role="tablist" aria-label="Experiment details">
            {(["design", "outcome", "learning"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-yellow-400"
                style={{
                  backgroundColor: activeTab === tab ? "#FACC15" : "rgba(20, 20, 20, 0.5)",
                  color: activeTab === tab ? "#0A0A0A" : "var(--slate-light)",
                }}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`tab-panel-${tab}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-[120px] md:min-h-[150px]"
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
          >
            {activeTab === "design" && (
              <ul className="space-y-2 md:space-y-3">
                {experiment.design.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 md:gap-3">
                    <span 
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: expColors.text }}
                      aria-hidden="true"
                    />
                    <span className="text-sm md:text-base text-slate-light">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "outcome" && (
              <p className="text-sm md:text-base text-slate-light leading-relaxed">{experiment.outcome}</p>
            )}

            {activeTab === "learning" && (
              <div 
                className="p-3 md:p-4 rounded-lg"
                style={{ 
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: expColors.border,
                  backgroundColor: expColors.bgLight,
                }}
              >
                <p className="text-xs md:text-sm text-slate-muted mb-1 md:mb-2">Key Learning</p>
                <p className="text-sm md:text-base font-medium" style={{ color: expColors.text }}>{experiment.learning}</p>
              </div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}
