"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper, SectionHeader } from "@/components/ui/SectionWrapper";
import { Card } from "@/components/ui/Card";
import { architectureLayers, schemaCategories } from "@/lib/data";
import { MessageSquare, Workflow, Database, Cpu, Monitor, ArrowRight, ChevronDown } from "lucide-react";

const layerIcons: Record<string, typeof MessageSquare> = {
  channels: MessageSquare,
  orchestration: Workflow,
  dataLayer: Database,
  aiServices: Cpu,
  outputs: Monitor,
};

const colorMap: Record<string, string> = {
  emerald: "#10B981",
  blue: "#3B82F6",
  violet: "#8B5CF6",
  amber: "#F59E0B",
  cyan: "#06B6D4",
};

export function ArchitectureSection() {
  const [expandedSchema, setExpandedSchema] = useState<string | null>(null);
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  const layers = Object.entries(architectureLayers);

  return (
    <SectionWrapper id="architecture" fullHeight={false} className="py-24">
      <SectionHeader
        label="05 — Architecture"
        title="The System"
        description="How everything connects. Supabase (Postgres + pgvector + Storage + RLS) became the backbone."
      />

      {/* High-Level Flow */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-white mb-8 text-center">System Flow</h3>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Flow Diagram */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {layers.map(([key, layer], index) => {
              const IconComponent = layerIcons[key];
              const isActive = activeLayer === key;
              
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 w-full md:w-auto"
                >
                  {/* Layer Card */}
                  <motion.button
                    onClick={() => setActiveLayer(isActive ? null : key)}
                    whileHover={{ scale: 1.02 }}
                    className={`flex-1 md:flex-initial p-4 rounded-xl border transition-all ${
                      isActive 
                        ? `border-${layer.color} bg-${layer.color}/10` 
                        : "border-slate-mid bg-slate-dark/50 hover:border-slate-light"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${colorMap[layer.color]}20` }}
                      >
                        <IconComponent 
                          className="w-5 h-5" 
                          style={{ color: colorMap[layer.color] }}
                        />
                      </div>
                      <span className="text-sm font-medium text-white">{layer.title}</span>
                    </div>
                  </motion.button>

                  {/* Arrow (not after last) */}
                  {index < layers.length - 1 && (
                    <ArrowRight className="hidden md:block w-5 h-5 text-slate-mid flex-shrink-0" />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Expanded Layer Details */}
          {activeLayer && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-slate-dark/50 border border-slate-mid"
            >
              <h4 className="text-white font-medium mb-3">
                {architectureLayers[activeLayer as keyof typeof architectureLayers].title}
              </h4>
              <ul className="space-y-2">
                {architectureLayers[activeLayer as keyof typeof architectureLayers].items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-light">
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: colorMap[architectureLayers[activeLayer as keyof typeof architectureLayers].color] }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Data Flow Animation */}
          <motion.div
            className="absolute top-1/2 left-0 right-0 h-px hidden md:block"
            style={{ zIndex: -1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-emerald via-blue to-cyan opacity-30"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
            />
          </motion.div>
        </div>
      </div>

      {/* Database Schema */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-white mb-8 text-center">Database Schema</h3>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {schemaCategories.map((category, index) => {
            const isExpanded = expandedSchema === category.id;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  glow={category.color as "blue" | "emerald" | "violet" | "amber"}
                  hover={false}
                  onClick={() => setExpandedSchema(isExpanded ? null : category.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colorMap[category.color] }}
                      />
                      <h4 className="font-semibold text-white">{category.title}</h4>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-slate-muted" />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isExpanded ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-slate-mid">
                      <div className="flex flex-wrap gap-2">
                        {category.entities.map((entity, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-md text-sm font-mono bg-slate-dark/50 text-slate-light border border-slate-mid"
                          >
                            {entity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {!isExpanded && (
                    <p className="text-sm text-slate-muted">
                      {category.entities.length} tables
                    </p>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Key Architectural Decisions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h3 className="text-xl font-semibold text-white mb-6 text-center">Key Architectural Decisions</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              title: "Versioning & Auditability",
              description: "Store raw output, normalized version, validation errors, prompt version, and model metadata.",
            },
            {
              title: "Separation of Concerns",
              description: "Operational tables don't depend on AI tables. AI layer decorates operations with signals.",
            },
            {
              title: "RLS & Security",
              description: "Row-level security for sensitive data. Documents treated as sensitive by default.",
            },
            {
              title: "pgvector Strategy",
              description: "Embeddings as retrieval mechanism, not substitute for structured data. Store chunk_id references.",
            },
          ].map((decision, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-slate-dark/30 border border-slate-mid"
            >
              <h4 className="text-white font-medium mb-2">{decision.title}</h4>
              <p className="text-sm text-slate-light">{decision.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}

