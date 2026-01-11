"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", handleMotionChange);
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowBackToTop(scrollPosition > window.innerHeight * 0.5);

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);
  
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
    setIsMenuOpen(false);
  }, [prefersReducedMotion]);

  // Don't render navigation until mounted to avoid hydration issues
  if (!mounted) return null;

  const progress = ((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100;

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#context"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-yellow-400 focus:text-black focus:rounded-lg focus:font-medium"
      >
        Skip to main content
      </a>

      {/* Desktop Navigation - Right Side Dots */}
      <nav 
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2 md:gap-3"
        aria-label="Section navigation"
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={cn(
              "group flex items-center justify-end gap-2 md:gap-3 transition-all p-1 rounded-lg",
              "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
            )}
            aria-label={`Navigate to ${section.label} section`}
            aria-current={activeSection === section.id ? "true" : undefined}
          >
            <span
              className={cn(
                "text-xs font-medium opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity",
                activeSection === section.id ? "text-white" : "text-slate-400"
              )}
            >
              {section.label}
            </span>
            <span
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                activeSection === section.id
                  ? "scale-150"
                  : "bg-slate-mid group-hover:bg-yellow-400"
              )}
              style={activeSection === section.id ? { background: "#FACC15" } : undefined}
              aria-hidden="true"
            />
          </button>
        ))}
      </nav>

      {/* Mobile Navigation - Hamburger */}
      <div className="fixed top-3 right-3 md:top-4 md:right-4 z-50 lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            "p-2.5 md:p-3 bg-slate-dark/90 backdrop-blur-sm rounded-full border transition-all",
            "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black",
            isMenuOpen ? "border-yellow-400" : "border-slate-mid"
          )}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.nav
              initial={{ y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 }}
              className="flex flex-col items-center justify-center h-full gap-3 md:gap-4 px-4"
            >
              {sections.map((section, index) => (
                <motion.button
                  key={section.id}
                  initial={{ y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: prefersReducedMotion ? 0 : index * 0.05 }}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "text-lg md:text-xl font-medium py-2 px-4 rounded-lg transition-colors w-full max-w-xs text-center",
                    "focus:outline-none focus:ring-2 focus:ring-yellow-400",
                    activeSection === section.id
                      ? "text-black bg-yellow-400"
                      : "text-slate-light hover:text-white hover:bg-slate-dark/50"
                  )}
                  aria-current={activeSection === section.id ? "page" : undefined}
                >
                  <span className={cn(
                    "mr-2 font-mono text-sm",
                    activeSection === section.id ? "text-black/60" : "text-slate-muted"
                  )}>
                    {section.shortLabel}
                  </span>
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
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={() => scrollToSection("hero")}
            className={cn(
              "fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-2.5 md:p-3",
              "bg-slate-dark/90 backdrop-blur-sm rounded-full border border-slate-mid",
              "transition-colors hover:border-yellow-400 hover:text-yellow-400",
              "focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
            )}
            aria-label="Scroll back to top"
          >
            <ChevronUp size={18} className="md:w-5 md:h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress Bar - Partrunner Yellow */}
      <div 
        className="fixed top-0 left-0 right-0 z-50 h-0.5 md:h-1" 
        style={{ background: "#141414" }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <motion.div
          className="h-full"
          style={{
            background: "#FACC15",
            width: `${progress}%`,
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        />
      </div>
    </>
  );
}
