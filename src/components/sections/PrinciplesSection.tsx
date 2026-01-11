"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icons";
import { principles } from "@/lib/data";
import { ChevronDown } from "lucide-react";

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue/20", text: "text-blue", border: "border-blue/30" },
  violet: { bg: "bg-violet/20", text: "text-violet", border: "border-violet/30" },
  emerald: { bg: "bg-emerald/20", text: "text-emerald", border: "border-emerald/30" },
  amber: { bg: "bg-amber/20", text: "text-amber", border: "border-amber/30" },
  cyan: { bg: "bg-cyan/20", text: "text-cyan", border: "border-cyan/30" },
};

export function PrinciplesSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <SectionWrapper id="principles" background="dots">
      <SectionHeader
        label="02 — Philosophy"
        title="Guiding Principles"
        description="I'm documenting these explicitly because most downstream decisions were simply consequences of them."
      />

      <div className="grid gap-4 max-w-4xl mx-auto">
        {principles.map((principle, index) => {
          const colors = colorClasses[principle.color];
          const isExpanded = expandedId === principle.id;
          
          return (
            <motion.div
              key={principle.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                glow={principle.color as "blue" | "violet" | "emerald" | "amber" | "cyan"}
                hover={false}
                className="overflow-hidden"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : principle.id)}
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-4">
                    {/* Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center relative`}>
                        <Icon 
                          name={principle.icon as "workflow" | "file-json" | "users" | "chart" | "layers"} 
                          size={24} 
                          className={colors.text} 
                        />
                        <span className={`absolute -top-2 -left-2 w-6 h-6 rounded-full bg-slate-dark border ${colors.border} flex items-center justify-center text-xs font-mono ${colors.text}`}>
                          {principle.id}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {principle.title}
                          </h3>
                          <p className={`text-sm font-medium ${colors.text}`}>
                            {principle.mantra}
                          </p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0"
                        >
                          <ChevronDown className="w-5 h-5 text-slate-muted" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-slate-mid ml-18">
                        <p className="text-slate-light leading-relaxed pl-[4.5rem]">
                          {principle.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Connecting Philosophy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-dark/50 border border-slate-mid">
          <span className="text-slate-muted text-sm">These principles connect</span>
          <span className="text-white text-sm">→</span>
          <span className="text-sm text-white font-medium">Every decision below follows from them</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

