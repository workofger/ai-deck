"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Start", shortLabel: "•" },
  { id: "context", label: "Context", shortLabel: "01" },
  { id: "principles", label: "Principles", shortLabel: "02" },
  { id: "experiments", label: "Experiments", shortLabel: "03" },
  { id: "models", label: "Models", shortLabel: "04" },
  { id: "architecture", label: "Architecture", shortLabel: "05" },
  { id: "analysis", label: "Analysis", shortLabel: "06" },
  { id: "tools", label: "Tools", shortLabel: "07" },
  { id: "future", label: "Future", shortLabel: "08" },
  { id: "closing", label: "Close", shortLabel: "•" },
];

export function Navigation() {
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBackToTop(scrollPosition > window.innerHeight);

      // Find active section
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Don't render navigation until mounted to avoid hydration issues
  if (!mounted) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation - Right Side Dots */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              "group flex items-center justify-end gap-3 transition-all",
            )}
            aria-label={`Go to ${section.label}`}
          >
            <span
              className={cn(
                "text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity",
                activeSection === section.id ? "text-white" : "text-slate-400"
              )}
            >
              {section.label}
            </span>
            <span
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                activeSection === section.id
                  ? "bg-pr-orange scale-150"
                  : "bg-slate-mid group-hover:bg-pr-blue"
              )}
            />
          </button>
        ))}
      </nav>

      {/* Mobile Navigation - Hamburger */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-3 bg-slate-dark/80 backdrop-blur-sm rounded-full border border-slate-mid"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-deep-navy/95 backdrop-blur-md"
          >
            <motion.nav
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-4"
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-xl font-medium py-2 px-4 rounded-lg transition-colors",
                    activeSection === section.id
                      ? "text-white bg-slate-dark"
                      : "text-slate-light hover:text-white"
                  )}
                >
                  <span className="text-slate-muted mr-2">{section.shortLabel}</span>
                  {section.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => scrollToSection("hero")}
            className="fixed bottom-6 right-6 z-50 p-3 bg-slate-dark/80 backdrop-blur-sm rounded-full border border-slate-mid hover:border-blue transition-colors"
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Bar - Partrunner Brand */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-dark">
        <motion.div
          className="h-full"
          style={{ background: "linear-gradient(90deg, #2563EB, #F97316, #2563EB)" }}
          style={{
            width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </>
  );
}

