"use client";

import { Navigation } from "@/components/ui/Navigation";
import {
  HeroSection,
  ContextSection,
  PrinciplesSection,
  ExperimentsSection,
  ModelsSection,
  ArchitectureSection,
  AnalysisSection,
  ToolsSection,
  FutureSection,
  ClosingSection,
} from "@/components/sections";

export default function Home() {
  return (
    <main className="relative bg-deep-navy min-h-screen">
      {/* Navigation */}
      <Navigation />
      
      {/* Sections */}
      <HeroSection />
      <ContextSection />
      <PrinciplesSection />
      <ExperimentsSection />
      <ModelsSection />
      <ArchitectureSection />
      <AnalysisSection />
      <ToolsSection />
      <FutureSection />
      <ClosingSection />
    </main>
  );
}
