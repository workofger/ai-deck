"use client";

import { useState, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
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
    <SectionWrapper id="experiments" fullHeight={false} className="py-24">
      <SectionHeader
        label="03 — Journey"
        title="The Experiments"
        description="Experiments were not 'research projects'; they were vehicles to validate assumptions and push the infrastructure forward."
      />

      {/* Experiment Navigation */}
      <div className="relative mb-8">
        {/* Scroll Buttons */}
        <button
          onClick={() => scrollTo("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-dark/80 backdrop-blur-sm rounded-full border border-slate-mid hover:border-pr-yellow transition-colors hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollTo("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-dark/80 backdrop-blur-sm rounded-full border border-slate-mid hover:border-pr-yellow transition-colors hidden md:block"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>

        {/* Experiment Cards Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-12 scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
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
                className="flex-shrink-0 w-48 p-4 rounded-xl border text-left transition-all"
                style={{
                  scrollSnapAlign: "start",
                  borderColor: isActive ? colors.text : "var(--slate-mid)",
                  backgroundColor: isActive ? colors.bgLight : "rgba(20, 20, 20, 0.5)",
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                  style={{ backgroundColor: colors.bg }}
                >
                  <Icon name={exp.icon as IconName} size={20} style={{ color: colors.text }} />
                </div>
                <p className="text-sm font-medium text-white line-clamp-2">{exp.title}</p>
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
        <div className="flex justify-center gap-2 mt-4">
          {experiments.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveExperiment(index)}
              className="h-2 rounded-full transition-all"
              style={{
                width: activeExperiment === index ? "24px" : "8px",
                backgroundColor: activeExperiment === index ? "#FACC15" : "var(--slate-mid)",
              }}
              aria-label={`Go to experiment ${index + 1}`}
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
      >
        <Card glow={experiment.color as "teal" | "violet" | "blue" | "amber" | "emerald" | "rose"} hover={false} className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div 
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: expColors.bg }}
              >
                <Icon name={experiment.icon as IconName} size={28} style={{ color: expColors.text }} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-slate-muted font-mono text-sm">
                    Experiment {String(activeExperiment + 1).padStart(2, "0")}
                  </span>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </div>
                <h3 className="text-2xl font-semibold text-white">{experiment.title}</h3>
              </div>
            </div>
          </div>

          {/* Objective */}
          <div className="mb-6 p-4 rounded-lg bg-slate-dark/50 border border-slate-mid">
            <p className="text-sm text-slate-muted mb-1">Objective</p>
            <p className="text-white">{experiment.objective}</p>
          </div>

          {/* Tabs - Brand Yellow */}
          <div className="flex gap-2 mb-6">
            {(["design", "outcome", "learning"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab ? "#FACC15" : "rgba(20, 20, 20, 0.5)",
                  color: activeTab === tab ? "#0A0A0A" : "var(--slate-light)",
                }}
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
            className="min-h-[150px]"
          >
            {activeTab === "design" && (
              <ul className="space-y-3">
                {experiment.design.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span 
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: expColors.text }}
                    />
                    <span className="text-slate-light">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "outcome" && (
              <p className="text-slate-light leading-relaxed">{experiment.outcome}</p>
            )}

            {activeTab === "learning" && (
              <div 
                className="p-4 rounded-lg"
                style={{ 
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: expColors.border,
                  backgroundColor: expColors.bgLight,
                }}
              >
                <p className="text-sm text-slate-muted mb-2">Key Learning</p>
                <p className="font-medium" style={{ color: expColors.text }}>{experiment.learning}</p>
              </div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}
