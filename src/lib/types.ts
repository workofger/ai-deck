// Bilingual content wrapper
export type BilingualContent<T> = { es: T; en: T };

// Deck specification types
export interface DeckMeta {
  deck_title: string;
  subtitle: BilingualContent<string>;
  default_language: 'es' | 'en';
  available_languages: string[];
  philosophy: string;
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
    q_onboarding_completed?: DataLayerQuery;
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
  labels: BilingualContent<{
    live: string;
    problem: string;
    solution: string;
    user_experience: string;
    before: string;
    after: string;
  }>;
}

// Live counters for display
export interface LiveCounters {
  q_convos_today: number;
  q_docs_today: number;
  q_matches_today: number;
  q_onboarding_completed?: number;
}

// Slide content types (language-specific)
export interface ProblemContent {
  badge: string;
  headline: string;
  subheadline: string;
  metaphor: string;
  stages: Array<{ label: string; percent: string }>;
  stat_label: string;
  stat_context: string;
  reality_points: Array<{ title: string; desc: string }>;
  footnote: string;
}

export interface SolutionContent {
  badge: string;
  headline: string;
  headline_accent: string;
  subheadline: string;
  key_insight: {
    main: string;
    detail: string;
    punchline: string;
  };
  pillars: Array<{
    number: string;
    title: string;
    desc: string;
    result: string;
  }>;
  contrast: {
    old_way: { title: string; points: string[]; result: string };
    our_way: { title: string; points: string[]; result: string };
  };
}

export interface HowItWorksContent {
  badge: string;
  headline: string;
  subheadline: string;
  flow_steps: Array<{
    number: string;
    title: string;
    desc: string;
    example: string;
  }>;
  live_example: {
    title: string;
    messages: Array<{ from: string; text: string }>;
  };
  key_point: {
    text: string;
    subtext: string;
  };
}

export interface UseCaseItem {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  status: 'live' | 'testing' | 'planned';
  problem: string;
  solution: string;
  user_experience: string;
  metrics: Array<{ value: string; label: string }>;
}

export interface UseCasesContent {
  badge: string;
  headline: string;
  subheadline: string;
  philosophy_note: string;
  use_cases: UseCaseItem[];
  stacking: {
    title: string;
    combined: string;
  };
}

export interface ImpactContent {
  badge: string;
  headline: string;
  subheadline: string;
  counters: Array<{
    query_ref: string;
    label: string;
    sublabel: string;
  }>;
  business_impact: Array<{
    title: string;
    before: string;
    after: string;
  }>;
  summary: {
    text: string;
    emphasis: string;
  };
  roadmap_title: string;
  roadmap: Array<{
    status: 'done' | 'active' | 'planned';
    text: string;
  }>;
  cta: {
    title: string;
    subtitle: string;
    button_primary: string;
    button_secondary: string;
  };
  closing: string;
}

// Slide data types
export interface ProblemSlideData {
  id: string;
  type: 'ProblemSlide';
  content: BilingualContent<ProblemContent>;
  stat_value: string;
  image: {
    url: string;
    alt: string;
    overlay: number;
  };
  speaker_notes: BilingualContent<string[]>;
}

export interface SolutionSlideData {
  id: string;
  type: 'SolutionSlide';
  content: BilingualContent<SolutionContent>;
  speaker_notes: BilingualContent<string[]>;
}

export interface HowItWorksSlideData {
  id: string;
  type: 'HowItWorksSlide';
  content: BilingualContent<HowItWorksContent>;
  speaker_notes: BilingualContent<string[]>;
}

export interface UseCasesSlideData {
  id: string;
  type: 'UseCasesSlide';
  content: BilingualContent<UseCasesContent>;
  speaker_notes: BilingualContent<string[]>;
}

export interface ImpactSlideData {
  id: string;
  type: 'ImpactSlide';
  content: BilingualContent<ImpactContent>;
  speaker_notes: BilingualContent<string[]>;
}

// Union type for all slides
export type SlideData = 
  | ProblemSlideData 
  | SolutionSlideData 
  | HowItWorksSlideData 
  | UseCasesSlideData 
  | ImpactSlideData;

// Full deck specification
export interface DeckSpec {
  meta: DeckMeta;
  data_layer: DataLayer;
  i18n: I18n;
  slides: SlideData[];
}
