"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { Icon, IconName } from "@/components/ui/Icons";
import { wins, failures } from "@/lib/data";
import { CheckCircle, AlertTriangle, ChevronDown } from "lucide-react";

export function AnalysisSection() {
  const [expandedWin, setExpandedWin] = useState<number | null>(null);
  const [expandedFailure, setExpandedFailure] = useState<number | null>(null);

  return (
    <SectionWrapper id="analysis" background="dots">
      <SectionHeader
        label="06 — Analysis"
        title="The Reckoning"
        description="Honest assessment of what worked, what failed, and what we learned. Building trust through transparency."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Wins Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-emerald/20">
              <CheckCircle className="w-5 h-5 text-emerald" />
            </div>
            <h3 className="text-xl font-semibold text-white">What Worked</h3>
          </div>

          <div className="space-y-4">
            {wins.map((win, index) => {
              const isExpanded = expandedWin === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card glow="emerald" hover={false} className="p-4">
                    <button
                      onClick={() => setExpandedWin(isExpanded ? null : index)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald/10 flex-shrink-0">
                          <Icon name={win.icon as IconName} size={18} className="text-emerald" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white">{win.title}</h4>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-slate-muted" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm text-slate-light mt-3 pl-11">
                            {win.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Failures Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber/20">
              <AlertTriangle className="w-5 h-5 text-amber" />
            </div>
            <h3 className="text-xl font-semibold text-white">What We Learned</h3>
          </div>

          <div className="space-y-4">
            {failures.map((failure, index) => {
              const isExpanded = expandedFailure === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card glow="amber" hover={false} className="p-4">
                    <button
                      onClick={() => setExpandedFailure(isExpanded ? null : index)}
                      className="w-full text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-amber/10 flex-shrink-0">
                          <Icon name={failure.icon as IconName} size={18} className="text-amber" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white">{failure.title}</h4>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4 text-slate-muted" />
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 pl-11 space-y-2">
                            <div className="p-2 rounded-lg bg-rose/10 border border-rose/20">
                              <p className="text-xs text-slate-muted mb-1">The Failure</p>
                              <p className="text-sm text-rose">{failure.failure}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-slate-dark/50">
                              <p className="text-xs text-slate-muted mb-1">Reality</p>
                              <p className="text-sm text-slate-light">{failure.reality}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald/10 border border-emerald/20">
                              <p className="text-xs text-slate-muted mb-1">Learning</p>
                              <p className="text-sm text-emerald">{failure.learning}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Summary Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center"
      >
        <div className="inline-block p-6 rounded-2xl bg-gradient-to-r from-emerald/10 via-slate-dark/50 to-amber/10 border border-slate-mid">
          <p className="text-lg text-slate-light max-w-2xl">
            <span className="text-emerald font-medium">Success</span> came when AI was embedded in{" "}
            <span className="text-white">disciplined workflows</span>.{" "}
            <span className="text-amber font-medium">Failure</span> came when we tried to substitute{" "}
            <span className="text-white">clever prompting</span> for engineering discipline.
          </p>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

