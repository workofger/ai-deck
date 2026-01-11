"use client";

import {
  Workflow,
  FileJson,
  Users,
  BarChart3,
  Layers,
  FileScan,
  MessageSquare,
  Search,
  Target,
  MessageCircle,
  Users2,
  Mic,
  Zap,
  CheckCircle,
  BookOpen,
  Cpu,
  GitBranch,
  Shield,
  AlertTriangle,
  SearchX,
  CopyX,
  Bot,
  DollarSign,
  Database,
  ArrowRight,
  ChevronDown,
  ExternalLink,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  workflow: Workflow,
  "file-json": FileJson,
  users: Users,
  chart: BarChart3,
  layers: Layers,
  "file-scan": FileScan,
  "message-square": MessageSquare,
  search: Search,
  target: Target,
  "message-circle": MessageCircle,
  "users-2": Users2,
  mic: Mic,
  zap: Zap,
  "check-circle": CheckCircle,
  "book-open": BookOpen,
  cpu: Cpu,
  "git-branch": GitBranch,
  shield: Shield,
  "alert-triangle": AlertTriangle,
  "search-x": SearchX,
  "copy-x": CopyX,
  bot: Bot,
  "dollar-sign": DollarSign,
  database: Database,
  "arrow-right": ArrowRight,
  "chevron-down": ChevronDown,
  "external-link": ExternalLink,
  play: Play,
  pause: Pause,
  "rotate-ccw": RotateCcw,
};

type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Icon({ name, size = 24, className, style }: IconProps) {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return <IconComponent size={size} className={cn(className)} style={style} />;
}

export type { IconName };

