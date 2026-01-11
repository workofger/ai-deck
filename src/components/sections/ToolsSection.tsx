"use client";

import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { tools, developmentLoop } from "@/lib/data";
import { ArrowRight, Database, Code, Cpu, Settings, XCircle } from "lucide-react";

const categoryIcons: Record<string, typeof Database> = {
  core: Database,
  development: Code,
  ai: Cpu,
  ops: Settings,
  discontinued: XCircle,
};

const categoryTitles: Record<string, string> = {
  core: "Core Infrastructure",
  development: "Development & Deploy",
  ai: "AI & Prototyping",
  ops: "Ops & Product",
  discontinued: "Transitioned Out",
};

// Inline styles to prevent Tailwind purging
const categoryStyles: Record<string, { bg: string; text: string; glow: "blue" | "emerald" | "violet" | "cyan" | "rose" }> = {
  core: { bg: "rgba(59, 130, 246, 0.2)", text: "#3B82F6", glow: "blue" },
  development: { bg: "rgba(16, 185, 129, 0.2)", text: "#10B981", glow: "emerald" },
  ai: { bg: "rgba(139, 92, 246, 0.2)", text: "#8B5CF6", glow: "violet" },
  ops: { bg: "rgba(6, 182, 212, 0.2)", text: "#06B6D4", glow: "cyan" },
  discontinued: { bg: "rgba(244, 63, 94, 0.2)", text: "#F43F5E", glow: "rose" },
};

export function ToolsSection() {
  return (
    <SectionWrapper id="tools" background="grid">
      <SectionHeader
        label="07 — Tooling"
        title="The Stack"
        description="What we actively use today, and what we learned from the tools we moved away from."
      />

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {Object.entries(tools).map(([category, toolList], categoryIndex) => {
          const IconComponent = categoryIcons[category];
          const styles = categoryStyles[category];
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
            >
              <Card 
                glow={styles.glow} 
                hover={false}
                className={category === "discontinued" ? "opacity-70" : ""}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: styles.bg }}
                  >
                    <IconComponent 
                      className="w-5 h-5" 
                      style={{ color: styles.text }}
                    />
                  </div>
                  <h3 className="font-semibold text-white">{categoryTitles[category]}</h3>
                </div>

                <div className="space-y-3">
                  {toolList.map((tool, index) => (
                    <div 
                      key={index}
                      className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-dark/50"
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{tool.name}</p>
                        <p className="text-xs text-slate-muted">{tool.description}</p>
                      </div>
                      <Badge 
                        variant={tool.status === "active" ? "active" : "discontinued"}
                        className="flex-shrink-0"
                      >
                        {tool.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Development Loop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-white mb-8 text-center">
          Development Workflow Loop
        </h3>

        <div className="relative">
          {/* Loop Visualization */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-2">
            {developmentLoop.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="relative">
                  <div className="p-4 rounded-xl bg-slate-dark border border-slate-mid hover:border-pr-yellow transition-colors group">
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="w-6 h-6 rounded-full text-xs font-mono flex items-center justify-center"
                        style={{ backgroundColor: "rgba(250, 204, 21, 0.2)", color: "#FACC15" }}
                      >
                        {step.step}
                      </span>
                      <span className="text-sm font-medium text-white">{step.name}</span>
                    </div>
                    <p className="text-xs font-mono" style={{ color: "#06B6D4" }}>{step.tool}</p>
                    <p className="text-xs text-slate-muted mt-1 max-w-[150px]">{step.description}</p>
                  </div>
                </div>

                {/* Arrow (not after last) */}
                {index < developmentLoop.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-slate-mid mx-2 hidden md:block flex-shrink-0" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Loop Back Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="hidden lg:block absolute -bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 text-slate-muted">
              <span className="text-xs">Iterate & Improve</span>
              <svg width="200" height="30" viewBox="0 0 200 30" className="text-slate-mid">
                <path
                  d="M 180 5 C 190 5, 195 15, 195 25 L 5 25 C 5 25, 0 15, 10 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 2"
                />
                <polygon points="5,25 10,20 10,30" fill="currentColor" />
              </svg>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Interpretation Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-slate-muted max-w-2xl mx-auto">
          <span className="text-slate-light font-medium">Interpretation:</span>{" "}
          Tools that were valuable for speed early on were de-prioritized once we needed 
          stronger control over data contracts, versioning, observability, and production-grade workflows.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
