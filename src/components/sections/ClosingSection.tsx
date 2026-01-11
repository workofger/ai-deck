"use client";

import { motion } from "framer-motion";
import { ArrowUp, FileText, Layers, FlaskConical } from "lucide-react";

export function ClosingSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="closing"
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-deep-navy">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet/10 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Flowing Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <motion.path
            d="M 0 50% Q 25% 30%, 50% 50% T 100% 50%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0" />
              <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-light leading-relaxed mb-8">
            &ldquo;The biggest learning is that infrastructure + AI is not about{" "}
            <span className="text-white font-medium">&apos;having AI.&apos;</span> It&apos;s about building a system that can{" "}
            <span className="text-gradient font-medium">safely absorb uncertainty</span>—messy inputs, 
            variable model outputs, operational edge cases—and still produce{" "}
            <span className="text-emerald font-medium">reliable, measurable outcomes</span>.&rdquo;
          </blockquote>
          
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-slate-mid" />
            <span className="text-white font-medium">Gerry</span>
            <div className="w-12 h-px bg-slate-mid" />
          </div>
        </motion.div>

        {/* Key Takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 p-6 rounded-2xl bg-slate-dark/50 border border-slate-mid inline-block"
        >
          <p className="text-slate-light">
            Where we&apos;ve been most successful:{" "}
            <span className="text-white">AI as a component inside disciplined engineering</span>
            <br />
            Where we&apos;ve failed:{" "}
            <span className="text-slate-muted">Substituting discipline with clever prompting</span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("architecture")}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-blue/10 border border-blue/30 text-blue hover:bg-blue/20 transition-all"
          >
            <Layers size={18} />
            <span>Explore Architecture</span>
          </button>
          
          <button
            onClick={() => scrollToSection("experiments")}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-violet/10 border border-violet/30 text-violet hover:bg-violet/20 transition-all"
          >
            <FlaskConical size={18} />
            <span>Review Experiments</span>
          </button>
          
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-dark border border-slate-mid text-slate-light hover:text-white hover:border-slate-light transition-all"
          >
            <ArrowUp size={18} />
            <span>Back to Start</span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 pt-8 border-t border-slate-mid/30"
        >
          <p className="text-sm text-slate-muted">
            Partrunner Infrastructure & AI Enablement • Technical Report • 6 Months of Building
          </p>
          <p className="text-xs text-slate-muted/60 mt-2">
            Process, Decisions, Learnings
          </p>
        </motion.div>
      </div>
    </section>
  );
}

