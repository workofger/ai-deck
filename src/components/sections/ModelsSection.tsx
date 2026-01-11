"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { modelStrategy } from "@/lib/data";
import { ArrowRight, Zap, DollarSign, Target, FlaskConical } from "lucide-react";

const useCaseIcons: Record<string, typeof Zap> = {
  "High-accuracy extraction": Target,
  "Cost-optimized classification": DollarSign,
  "RAG answer generation": Zap,
  "Prototyping / rapid iteration": FlaskConical,
};

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  violet: { bg: "bg-violet/20", text: "text-violet", border: "border-violet/30", glow: "hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]" },
  emerald: { bg: "bg-emerald/20", text: "text-emerald", border: "border-emerald/30", glow: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)]" },
  blue: { bg: "bg-blue/20", text: "text-blue", border: "border-blue/30", glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]" },
  amber: { bg: "bg-amber/20", text: "text-amber", border: "border-amber/30", glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]" },
};

export function ModelsSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <SectionWrapper id="models" background="grid">
      <SectionHeader
        label="04 — Strategy"
        title="The LLM Playbook"
        description="The most important shift wasn't 'which model is best,' but how to combine them."
      />

      {/* Decision Tree Visualization */}
      <div className="mb-12">
        <div className="relative max-w-4xl mx-auto">
          {/* Central Input Node */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="px-6 py-3 rounded-full bg-slate-dark border border-cyan text-cyan font-medium">
              Incoming Task
            </div>
          </motion.div>

          {/* Branching Lines */}
          <svg className="absolute top-16 left-1/2 -translate-x-1/2 w-full h-24 hidden md:block" style={{ maxWidth: "800px" }}>
            <motion.path
              d="M 400 0 L 100 80"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.path
              d="M 400 0 L 266 80"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.path
              d="M 400 0 L 533 80"
              stroke="url(#gradient3)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <motion.path
              d="M 400 0 L 700 80"
              stroke="url(#gradient4)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {modelStrategy.map((item, index) => {
          const colors = colorClasses[item.color];
          const IconComponent = useCaseIcons[item.useCase];
          const isActive = activeCard === index;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                glow={item.color as "violet" | "emerald" | "blue" | "amber"}
                onClick={() => setActiveCard(isActive ? null : index)}
                className={`cursor-pointer transition-all ${isActive ? colors.glow : ""}`}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${colors.bg}`}>
                    <IconComponent className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{item.useCase}</h3>
                    <p className={`text-sm font-medium ${colors.text} mt-1`}>{item.model}</p>
                  </div>
                </div>

                {/* Examples */}
                <div className="mb-4">
                  <p className="text-xs text-slate-muted uppercase tracking-wide mb-2">Use Cases</p>
                  <div className="flex flex-wrap gap-2">
                    {item.examples.map((example, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rationale (expanded) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className={`pt-4 mt-4 border-t ${colors.border}`}>
                    <p className="text-sm text-slate-light leading-relaxed">
                      <span className="text-slate-muted">Rationale: </span>
                      {item.rationale}
                    </p>
                  </div>
                </motion.div>

                {/* Click hint */}
                <div className="flex items-center justify-end mt-2">
                  <span className="text-xs text-slate-muted">
                    {isActive ? "Click to collapse" : "Click for rationale"}
                  </span>
                  <ArrowRight className={`w-3 h-3 ml-1 text-slate-muted transition-transform ${isActive ? "rotate-90" : ""}`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Key Decision Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 max-w-3xl mx-auto"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue/10 via-violet/10 to-cyan/10 border border-blue/20">
          <h4 className="text-lg font-semibold text-white mb-3">The Key Decision</h4>
          <ul className="space-y-2 text-slate-light">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              Start with a cheaper model for easy tasks
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              Escalate to a stronger model when confidence is low
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet" />
              Enforce output contracts with validators
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue" />
              Log everything for later evaluation
            </li>
          </ul>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

