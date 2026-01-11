"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card, CardContent } from "@/components/ui/Card";
import { Truck, Store, Settings, ArrowRight } from "lucide-react";

// Use inline styles for dynamic colors (Tailwind purges dynamic classes)
const colorStyles: Record<string, { bg: string; text: string; dot: string }> = {
  emerald: { bg: "rgba(16, 185, 129, 0.2)", text: "#10B981", dot: "#10B981" },
  blue: { bg: "rgba(59, 130, 246, 0.2)", text: "#3B82F6", dot: "#3B82F6" },
  violet: { bg: "rgba(139, 92, 246, 0.2)", text: "#8B5CF6", dot: "#8B5CF6" },
};

const marketplaceNodes = [
  {
    id: "supply",
    title: "Supply",
    subtitle: "Drivers & Fleets",
    icon: Truck,
    color: "emerald",
    challenges: ["Availability tracking", "Performance scoring", "Onboarding at scale"],
  },
  {
    id: "demand",
    title: "Demand",
    subtitle: "Brands & Retailers",
    icon: Store,
    color: "blue",
    challenges: ["Quote requests", "Route optimization", "Service expectations"],
  },
  {
    id: "ops",
    title: "Operations",
    subtitle: "Execution & Support",
    icon: Settings,
    color: "violet",
    challenges: ["Matching & routing", "Incident handling", "Payment processing"],
  },
];

const transformationGoals = [
  {
    title: "Reliable Triggers",
    description: "High-volume operational actions can be triggered and tracked reliably.",
  },
  {
    title: "Progressive Structure",
    description: "Data becomes progressively more structured, even when inputs are messy.",
  },
  {
    title: "Auditable Decisions",
    description: "Decisions are auditable, repeatable, and measurable.",
  },
  {
    title: "Meaningful AI",
    description: "AI is applied where it meaningfully reduces manual work or increases speed/accuracy.",
  },
];

export function ContextSection() {
  return (
    <SectionWrapper id="context" background="grid">
      <SectionHeader
        label="01 — Context"
        title="The Marketplace Challenge"
        description="Partrunner operates a complex three-sided marketplace. The infrastructure goal was not 'build an AI demo,' but transform the company into a system."
      />

      {/* Marketplace Visualization */}
      <div className="mb-16">
        <div className="grid md:grid-cols-3 gap-6 relative">
          {marketplaceNodes.map((node, index) => {
            const styles = colorStyles[node.color];
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card glow={node.color as "emerald" | "blue" | "violet"} className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div 
                      className="p-3 rounded-xl"
                      style={{ backgroundColor: styles.bg }}
                    >
                      <node.icon 
                        className="w-6 h-6" 
                        style={{ color: styles.text }}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{node.title}</h3>
                      <p className="text-slate-muted text-sm">{node.subtitle}</p>
                    </div>
                  </div>
                  <CardContent>
                    <ul className="space-y-2">
                      {node.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-light">
                          <span 
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: styles.dot }}
                          />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {/* Connection Lines (desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-px">
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(to right, rgba(16, 185, 129, 0.5), rgba(59, 130, 246, 0.5))" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </div>
          <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-px">
            <motion.div
              className="h-full"
              style={{ background: "linear-gradient(to right, rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.5))" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
            />
          </div>
        </div>
      </div>

      {/* Transformation Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="heading-subsection text-white mb-8 text-center">
          The Transformation Goal
        </h3>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {transformationGoals.map((goal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group"
            >
              <div className="p-6 rounded-xl bg-slate-dark/50 border border-slate-mid hover:border-pr-yellow/50 transition-all h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-sm" style={{ color: "#FACC15" }}>0{index + 1}</span>
                  <ArrowRight className="w-4 h-4 text-slate-muted group-hover:text-pr-yellow transition-colors" />
                </div>
                <h4 className="text-white font-semibold mb-2">{goal.title}</h4>
                <p className="text-sm text-slate-light">{goal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <blockquote className="text-xl md:text-2xl text-slate-light italic max-w-3xl mx-auto">
          &ldquo;Turn the company into a system where AI is applied where it{" "}
          <span className="text-white font-medium not-italic">meaningfully</span> reduces 
          manual work or increases speed/accuracy.&rdquo;
        </blockquote>
      </motion.div>
    </SectionWrapper>
  );
}
