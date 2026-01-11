"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type BadgeVariant = "success" | "partial" | "early" | "default" | "active" | "discontinued";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: "bg-emerald/20 text-emerald border-emerald/30",
  partial: "bg-amber/20 text-amber border-amber/30",
  early: "bg-violet/20 text-violet border-violet/30",
  default: "bg-slate-mid/50 text-slate-light border-slate-mid",
  active: "bg-emerald/20 text-emerald border-emerald/30",
  discontinued: "bg-rose/20 text-rose border-rose/30",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

