import deckSpecJson from '../../data/deck.spec.json';
import type { DeckSpec, LiveCounters } from './types';

// Get deck specification from JSON
export function getDeckSpec(): DeckSpec {
  return deckSpecJson as DeckSpec;
}

// Check if Supabase is configured
export function hasSupabase(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

// Get mock counters from spec
export function getMockCounters(): LiveCounters {
  const spec = getDeckSpec();
  return {
    q_convos_today: spec.data_layer.queries.q_convos_today.mock_value,
    q_docs_today: spec.data_layer.queries.q_docs_today.mock_value,
    q_matches_today: spec.data_layer.queries.q_matches_today.mock_value,
  };
}

// Fetch live counters (placeholder for Supabase integration)
export async function fetchLiveCounters(): Promise<LiveCounters | null> {
  if (!hasSupabase()) return null;
  
  // TODO: Implement actual Supabase queries
  return null;
}

// Get counters (live if available, otherwise mock)
export async function getCounters(): Promise<LiveCounters> {
  const liveCounters = await fetchLiveCounters();
  return liveCounters || getMockCounters();
}

// Animate a counter value
export function animateCounter(
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
  onComplete?: () => void
): () => void {
  const startTime = performance.now();
  let animationFrame: number;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out cubic)
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(start + (end - start) * eased);
    
    onUpdate(currentValue);

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  animationFrame = requestAnimationFrame(animate);
  
  // Return cleanup function
  return () => cancelAnimationFrame(animationFrame);
}

// Start a counter ticker (increments periodically)
export function startCounterTicker(
  initialValues: LiveCounters,
  onUpdate: (counters: LiveCounters) => void,
  intervalMs: number = 4000
): () => void {
  const interval = setInterval(() => {
    onUpdate({
      q_convos_today: initialValues.q_convos_today + Math.floor(Math.random() * 3) + 1,
      q_docs_today: initialValues.q_docs_today + (Math.random() > 0.5 ? 1 : 0),
      q_matches_today: initialValues.q_matches_today + (Math.random() > 0.7 ? 1 : 0),
    });
  }, intervalMs);

  return () => clearInterval(interval);
}
