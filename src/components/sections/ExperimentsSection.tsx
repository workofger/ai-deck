"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Icon, IconName } from "@/components/ui/Icons";
import { experiments } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-dark/80 backdrop-blur-sm rounded-full border border-slate-mid hover:border-blue transition-colors hidden md:block"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => scrollTo("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-slate-dark/80 backdrop-blur-sm rounded-full border border-slate-mid hover:border-blue transition-colors hidden md:block"
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
          {experiments.map((exp, index) => (
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
              className={`flex-shrink-0 w-48 p-4 rounded-xl border text-left transition-all scroll-snap-start ${
                activeExperiment === index
                  ? `border-${exp.color} bg-${exp.color}/10`
                  : "border-slate-mid bg-slate-dark/50 hover:border-slate-light"
              }`}
              style={{ scrollSnapAlign: "start" }}
            >
              <div className={`w-10 h-10 rounded-lg bg-${exp.color}/20 flex items-center justify-center mb-3`}>
                <Icon name={exp.icon as IconName} size={20} className={`text-${exp.color}`} />
              </div>
              <p className="text-sm font-medium text-white line-clamp-2">{exp.title}</p>
              <div className="mt-2">
                <Badge variant={statusLabels[exp.status].variant}>
                  {statusLabels[exp.status].label}
                </Badge>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {experiments.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveExperiment(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeExperiment === index ? "bg-blue w-6" : "bg-slate-mid hover:bg-slate-light"
              }`}
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
              <div className={`w-14 h-14 rounded-xl bg-${experiment.color}/20 flex items-center justify-center flex-shrink-0`}>
                <Icon name={experiment.icon as IconName} size={28} className={`text-${experiment.color}`} />
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

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {(["design", "outcome", "learning"] as TabType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-blue text-white"
                    : "bg-slate-dark/50 text-slate-light hover:text-white"
                }`}
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
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-${experiment.color} flex-shrink-0`} />
                    <span className="text-slate-light">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === "outcome" && (
              <p className="text-slate-light leading-relaxed">{experiment.outcome}</p>
            )}

            {activeTab === "learning" && (
              <div className={`p-4 rounded-lg border border-${experiment.color}/30 bg-${experiment.color}/5`}>
                <p className="text-sm text-slate-muted mb-2">Key Learning</p>
                <p className={`text-${experiment.color} font-medium`}>{experiment.learning}</p>
              </div>
            )}
          </motion.div>
        </Card>
      </motion.div>
    </SectionWrapper>
  );
}

