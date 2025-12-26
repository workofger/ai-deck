// Bilingual content wrapper
export type BilingualContent<T> = { es: T; en: T };

// Deck specification types
export interface DeckMeta {
  deck_title: string;
  subtitle: BilingualContent<string>;
  default_language: 'es' | 'en';
  available_languages: string[];
  brand: {
    accent_color_name: string;
    accent_hex_suggestion: string;
    logo: string;
    logo_icon: string;
  };
  ui: {
    show_progress: boolean;
    presenter_mode_default: boolean;
    demo_mode_default: boolean;
  };
}

export interface DataLayerQuery {
  mock_value: number;
}

export interface DataLayer {
  queries: {
    q_convos_today: DataLayerQuery;
    q_docs_today: DataLayerQuery;
    q_matches_today: DataLayerQuery;
  };
}

export interface I18n {
  nav: BilingualContent<{
    prev: string;
    next: string;
    presenter: string;
    demo: string;
    fullscreen: string;
    language: string;
  }>;
}

// Live counters for display
export interface LiveCounters {
  q_convos_today: number;
  q_docs_today: number;
  q_matches_today: number;
}

// ============================================
// NEW SIMPLIFIED SLIDE TYPES
// ============================================

// Slide 1: Problem with pie chart
export interface ProblemContent {
  headline: string;
  bullets: string[];
  chart_title: string;
  chart_caption: string;
}

export interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

export interface ProblemSlideData {
  id: string;
  type: 'ProblemSlide';
  content: BilingualContent<ProblemContent>;
  chart_data: ChartDataItem[];
  speaker_notes: BilingualContent<string[]>;
}

// Slide 2: Comparison (Traditional vs Ours)
export interface ComparisonContent {
  headline: string;
  subheadline: string;
  traditional: {
    title: string;
    points: string[];
    result: string;
  };
  ours: {
    title: string;
    points: string[];
    result: string;
  };
  channels: string[];
}

export interface ComparisonSlideData {
  id: string;
  type: 'ComparisonSlide';
  content: BilingualContent<ComparisonContent>;
  speaker_notes: BilingualContent<string[]>;
}

// Slide 3: How it works (4 simple steps)
export interface HowContent {
  headline: string;
  steps: Array<{
    number: string;
    title: string;
    desc: string;
  }>;
}

export interface HowSlideData {
  id: string;
  type: 'HowSlide';
  content: BilingualContent<HowContent>;
  speaker_notes: BilingualContent<string[]>;
}

// Slide 4: Use Cases with CTA
export interface UseCaseSimple {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  status: 'live' | 'testing' | 'planned';
}

export interface UseCasesContent {
  headline: string;
  cta_label: string;
  use_cases: UseCaseSimple[];
}

export interface UseCasesSlideData {
  id: string;
  type: 'UseCasesSlide';
  content: BilingualContent<UseCasesContent>;
  demo_url: string;
  speaker_notes: BilingualContent<string[]>;
}

// Union type for all slides
export type SlideData = 
  | ProblemSlideData 
  | ComparisonSlideData 
  | HowSlideData 
  | UseCasesSlideData;

// Live page configuration
export interface LivePageConfig {
  counters: Array<{
    query_ref: string;
    label: BilingualContent<string>;
  }>;
  video_steps: BilingualContent<string[]>;
  qr_enabled: boolean;
  qr_url: string;
}

// Full deck specification
export interface DeckSpec {
  meta: DeckMeta;
  data_layer: DataLayer;
  i18n: I18n;
  slides: SlideData[];
  live_page: LivePageConfig;
}
