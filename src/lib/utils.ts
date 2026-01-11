import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function staggerDelay(index: number, baseDelay: number = 0.1): number {
  return index * baseDelay;
}

