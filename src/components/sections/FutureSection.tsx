"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Icon, IconName } from "@/components/ui/Icons";
import { futureVision } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const priorityColors: Record<string, { bg: string; text: string; label: string }> = {
  high: { bg: "bg-rose/20", text: "text-rose", label: "High Priority" },
  medium: { bg: "bg-amber/20", text: "text-amber", label: "Medium Priority" },
  low: { bg: "bg-slate-mid/50", text: "text-slate-light", label: "Future" },
};

export function FutureSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <SectionWrapper id="future" background="gradient">
      <SectionHeader
        label="08 — Vision"
        title="The Horizon"
        description="Where this is heading. These priorities will compound: every new automation will be easier, cheaper, and safer to ship."
      />

      {/* Vision Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {futureVision.map((item, index) => {
          const priority = priorityColors[item.priority];
          const isHovered = hoveredId === item.id;
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Card 
                glow="cyan" 
                hover={true}
                className="h-full relative overflow-hidden"
              >
                {/* Priority Badge */}
                <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-medium ${priority.bg} ${priority.text}`}>
                  {priority.label}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-cyan/20 flex items-center justify-center mb-4">
                  <Icon name={item.icon as IconName} size={24} className="text-cyan" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-white mb-2 pr-20">{item.title}</h3>
                <p className="text-sm text-slate-light leading-relaxed">{item.description}</p>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute bottom-4 right-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-cyan" />
                </motion.div>

                {/* Glow Effect on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Key Callout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="relative p-8 rounded-2xl bg-gradient-to-r from-cyan/10 via-blue/10 to-violet/10 border border-cyan/20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="check-circle" className="text-cyan" size={24} />
              <span className="text-sm text-cyan font-medium uppercase tracking-wide">
                The Most Important Next Step
              </span>
            </div>
            
            <h4 className="text-2xl font-bold text-white mb-3">
              Build an Evaluation Harness
            </h4>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-slate-light">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                Gold datasets for document extraction
              </li>
              <li className="flex items-center gap-2 text-slate-light">
                <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                Regression tests for prompts
              </li>
              <li className="flex items-center gap-2 text-slate-light">
                <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                Metrics dashboards for accuracy, latency, cost
              </li>
            </ul>
            
            <p className="text-cyan font-medium">
              This is what converts AI from &ldquo;clever&rdquo; to &ldquo;reliable.&rdquo;
            </p>
          </div>
        </div>
      </motion.div>

      {/* Timeline Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-16"
      >
        <div className="relative h-2 bg-slate-dark rounded-full max-w-2xl mx-auto overflow-hidden">
          {/* Progress Gradient */}
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald via-blue to-violet rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "35%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          
          {/* Milestones */}
          <div className="absolute inset-y-0 left-[35%] w-4 h-4 -top-1 bg-violet rounded-full border-2 border-deep-navy" />
        </div>
        
        <div className="flex justify-between max-w-2xl mx-auto mt-4 text-xs text-slate-muted">
          <span>Foundation Built</span>
          <span className="text-violet font-medium">Current Position</span>
          <span>Full Vision</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

