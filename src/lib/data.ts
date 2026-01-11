// ========================================
// PARTRUNNER DECK - CONTENT DATA
// ========================================

export const principles = [
  {
    id: 1,
    title: "Workflow-first",
    mantra: "Automation inside reliable workflows",
    description: "Automation is only useful if it lives inside a reliable workflow with triggers, retries, idempotency, and audit logs.",
    icon: "workflow",
    color: "blue",
  },
  {
    id: 2,
    title: "Contracts over vibes",
    mantra: "AI outputs constrained to schemas",
    description: "AI outputs must be constrained into a stable contract (schemas) before being trusted. No freeform responses in production.",
    icon: "file-json",
    color: "violet",
  },
  {
    id: 3,
    title: "Human-in-the-loop",
    mantra: "Design for review and rollback",
    description: "Whenever mistakes are costly, design for review, escalation, and rollback. Human judgment stays in the loop.",
    icon: "users",
    color: "emerald",
  },
  {
    id: 4,
    title: "Evaluation over belief",
    mantra: "Measure or you don't know",
    description: "If we can't measure improvement (latency, accuracy, conversion, cost), we don't actually know if it works.",
    icon: "chart",
    color: "amber",
  },
  {
    id: 5,
    title: "Progressive structure",
    mantra: "Accept mess, convert to structure",
    description: "Accept messy inputs; convert them into structured records over time. The system gets smarter as data accumulates.",
    icon: "layers",
    color: "cyan",
  },
];

export const experiments = [
  {
    id: 1,
    slug: "document-extraction",
    title: "Document Extraction & Normalization",
    objective: "Reduce manual effort and errors in processing invoices, payment proofs, IDs, and operational documents.",
    design: [
      "Central workflow in n8n triggered by incoming files",
      "Store original documents in Supabase Storage",
      "Run AI extraction and return structured JSON",
      "Normalize into database schema",
      "Emit Slack message with extracted fields + confidence + links",
    ],
    outcome: "Clear productivity win when output is constrained to a stable schema. The biggest benefit wasn't 'LLM reads PDF'—it was consistent normalization.",
    learning: "The extraction model is less important than the post-processing and the 'contract' enforced in DB.",
    status: "success",
    color: "teal",
    icon: "file-scan",
  },
  {
    id: 2,
    slug: "slack-block-kit",
    title: "Slack Block Kit as Operational UI",
    objective: "Make AI outputs operationally usable (readable, scannable, actionable) without building a full front-end.",
    design: [
      "Standard block templates (header, fields, context, action links)",
      "A 'normalizer prompt' that converts any extraction into Slack blocks",
    ],
    outcome: "Works well as a lightweight UI for operations. The failure mode is predictable: if field names drift, the message becomes confusing.",
    learning: "Slack messages become 'interfaces.' Treat them as products with versioning.",
    status: "success",
    color: "violet",
    icon: "message-square",
  },
  {
    id: 3,
    slug: "rag-vector-search",
    title: "RAG + Vector Search",
    objective: "Allow internal tools/agents to answer questions using company knowledge without hallucination.",
    design: [
      "Store normalized text chunks + embeddings in Supabase with pgvector",
      "Build retrieval step inside n8n before calling the LLM",
      "Use citation-like references (document_id, chunk_id) in outputs",
    ],
    outcome: "Works when the corpus is clean and chunking strategy is consistent. Underperforms when source text is messy, outdated, or poorly chunked.",
    learning: "RAG is a data quality project disguised as an AI feature.",
    status: "partial",
    color: "blue",
    icon: "search",
  },
  {
    id: 4,
    slug: "scoring-matching",
    title: "Scoring & Matching 2.0",
    objective: "Improve marketplace decisions: which drivers/fleets should be recommended, how to route, how to prioritize.",
    design: [
      "Start with rule-based scoring (availability, proximity, reliability)",
      "Add structured event logging (jobs offered/accepted/rejected)",
      "Experiment with AI-assisted interpretation of unstructured notes",
    ],
    outcome: "Rule-based gets you 60-70% quickly. AI helps most when it converts messy text into structured signals, not when it 'decides.'",
    learning: "AI is best used as a feature generator first, and a decision-maker later (if ever).",
    status: "success",
    color: "amber",
    icon: "target",
  },
  {
    id: 5,
    slug: "whatsapp-automation",
    title: "WhatsApp Automation",
    objective: "Scale communication flows: onboarding, follow-ups, referrals, documentation requests, and handoffs.",
    design: [
      "respond.io for channel/orchestration layer (templates, assignment, inbox)",
      "n8n handles logic: enrichment, validations, routing, logging",
    ],
    outcome: "Biggest operational leverage area. Also where edge cases explode: duplicate contacts, phone formats, template constraints, human follow-through.",
    learning: "Messaging automation needs strong idempotency and state machines.",
    status: "success",
    color: "emerald",
    icon: "message-circle",
  },
  {
    id: 6,
    slug: "ab-testing-negotiators",
    title: "AB Testing: Human vs AI Negotiator",
    objective: "Validate whether AI can increase conversion, reduce handle time, or improve margin.",
    design: [
      "Use n8n to route conversations by experiment group",
      "Track outcomes: response time, conversion, average margin, escalation frequency",
    ],
    outcome: "AI helps most as a copilot (drafting, summarizing, next-best-action), not as a full replacement.",
    learning: "The 'full AI negotiator' is mostly a governance + risk problem, not a model problem.",
    status: "partial",
    color: "rose",
    icon: "users-2",
  },
  {
    id: 7,
    slug: "voice-agent",
    title: "Voice Agent Exploration",
    objective: "Explore whether real-time voice agents can handle repetitive calls (availability checks, basic quoting).",
    design: [
      "Prototype with streaming audio, model responses, and TTS",
    ],
    outcome: "Useful for demos, but operationalization requires reliability, latency guarantees, and strict guardrails.",
    learning: "Voice adds complexity quickly; the infrastructure must be stable before voice becomes core.",
    status: "early",
    color: "violet",
    icon: "mic",
  },
];

export const modelStrategy = [
  {
    useCase: "High-accuracy extraction",
    examples: ["Invoice/payment proof extraction", "ID/form parsing", "Schema-constrained JSON generation"],
    model: "GPT-4o / GPT-4-class",
    rationale: "Extraction failures are expensive: they create downstream manual rework and trust loss. Better at consistent structured output.",
    color: "violet",
  },
  {
    useCase: "Cost-optimized classification",
    examples: ["Categorize inbound messages", "Detect intent", "Create lightweight tags"],
    model: "Smaller/cheaper LLMs",
    rationale: "The value is in throughput; mistakes are recoverable. Add confidence thresholds and fallback to stronger model.",
    color: "emerald",
  },
  {
    useCase: "RAG answer generation",
    examples: ["Policy Q&A", "Ops playbooks", "Summarizing historical cases"],
    model: "Strong general-purpose (GPT-4o class)",
    rationale: "RAG reduces hallucinations, but final synthesis still benefits from a strong model.",
    color: "blue",
  },
  {
    useCase: "Prototyping / rapid iteration",
    examples: ["Quick prompt experiments", "Early drafts for flows"],
    model: "Google AI Studio (Gemini-class)",
    rationale: "Fast iteration environment for prototyping and prompt testing. Not necessarily the final production provider.",
    color: "amber",
  },
];

export const architectureLayers = {
  channels: {
    title: "Channels",
    items: ["WhatsApp via respond.io", "Internal ops via Slack"],
    color: "emerald",
  },
  orchestration: {
    title: "Orchestration",
    items: ["n8n workflow engine", "Triggers, branching, retries", "Enrichment & logging"],
    color: "blue",
  },
  dataLayer: {
    title: "Data Layer",
    items: ["Supabase Postgres (system of record)", "Supabase Storage (documents)", "pgvector (embeddings)"],
    color: "violet",
  },
  aiServices: {
    title: "AI Services",
    items: ["LLM providers (extraction, classification, summarization)", "Embeddings provider"],
    color: "amber",
  },
  outputs: {
    title: "Outputs",
    items: ["Slack messages (Block Kit)", "respond.io templates", "BI dashboards"],
    color: "cyan",
  },
};

export const schemaCategories = [
  {
    id: "operational",
    title: "Operational Entities",
    color: "blue",
    entities: ["drivers", "fleets", "clients", "jobs", "routes", "pricing_quotes", "payments/invoices"],
  },
  {
    id: "communication",
    title: "Communication & Workflow",
    color: "emerald",
    entities: ["contacts", "conversations", "messages", "assignments"],
  },
  {
    id: "ai-artifacts",
    title: "AI Artifacts",
    color: "violet",
    entities: ["documents", "document_extractions", "ai_events", "prompts", "eval_runs"],
  },
  {
    id: "vector-rag",
    title: "Vector / RAG Layer",
    color: "amber",
    entities: ["knowledge_sources", "chunks", "embeddings"],
  },
];

export const wins = [
  {
    title: "Workflow + AI beats AI feature",
    description: "When AI was embedded into a deterministic workflow (n8n, retries, logging), we got sustainable gains.",
    icon: "workflow",
  },
  {
    title: "Schema-first extraction",
    description: "Converting messy input into normalized fields created the compounding advantage: downstream automation became easier.",
    icon: "file-json",
  },
  {
    title: "Slack as a thin UI",
    description: "Shipping operational value without full UI work let us iterate faster and prove usefulness before investing in front-end.",
    icon: "message-square",
  },
  {
    title: "pgvector in Postgres",
    description: "Keeping vectors inside the primary database reduced operational complexity and made joins/audit easy.",
    icon: "database",
  },
  {
    title: "Copilot pattern",
    description: "AI suggests, human decides. This pattern produced the best balance of speed and risk, especially for negotiation and ops decisions.",
    icon: "users",
  },
];

export const failures = [
  {
    title: "Over-trusting prompt quality",
    failure: "'The prompt is good, therefore the system is good.'",
    reality: "Prompts drift, edge cases appear, and outputs vary. Without validators and evals, the system degrades.",
    learning: "Prompts must be versioned, tested, and measured like code.",
    icon: "alert-triangle",
  },
  {
    title: "RAG hype vs reality",
    failure: "Expecting RAG to magically fix hallucinations.",
    reality: "Bad chunking, stale docs, or conflicting sources still produce confident wrong answers.",
    learning: "RAG is a content governance problem. Treat the knowledge base as a product.",
    icon: "search-x",
  },
  {
    title: "Inconsistent identifiers",
    failure: "Duplicates (contacts, jobs) because phone formats and channel metadata differ.",
    reality: "Data quality issues compound across the system.",
    learning: "Invest early in canonical identifiers and idempotency keys.",
    icon: "copy-x",
  },
  {
    title: "Full automation too early",
    failure: "Pushing to fully automate decisions before we had measurement and governance.",
    reality: "No way to know if the automation was actually helping.",
    learning: "Scale the observability and evaluation harness before scaling autonomy.",
    icon: "bot",
  },
  {
    title: "Cost surprises",
    failure: "Token costs creep in high-volume processes.",
    reality: "Unchecked API calls can become expensive quickly.",
    learning: "Instrument every LLM call with cost estimates and set guardrails (limits, caching, fallbacks).",
    icon: "dollar-sign",
  },
];

export const tools = {
  core: [
    { name: "Supabase", description: "Postgres, Storage, Auth/RLS, pgvector", status: "active" },
    { name: "n8n", description: "Workflow orchestration, integrations", status: "active" },
    { name: "respond.io", description: "WhatsApp inbox, templates, assignments", status: "active" },
  ],
  development: [
    { name: "Cursor", description: "Primary IDE, AI pair-programming", status: "active" },
    { name: "GitHub", description: "Version control, collaboration", status: "active" },
    { name: "Vercel", description: "Rapid deploys, CI/CD pipeline", status: "active" },
  ],
  ai: [
    { name: "OpenAI", description: "Spec drafting, extraction, schema output", status: "active" },
    { name: "Claude/Opus", description: "Implementation, refactoring, hardening", status: "active" },
    { name: "Google AI Studio", description: "Fast prototypes, agent flows", status: "active" },
    { name: "Gemini", description: "Prototyping, model comparison", status: "active" },
  ],
  ops: [
    { name: "Airtable", description: "Lightweight ops data modeling", status: "active" },
    { name: "Monday", description: "Project management", status: "active" },
    { name: "Read.ai", description: "Meeting capture and notes", status: "active" },
  ],
  discontinued: [
    { name: "Glide", description: "De-prioritized for control/versioning needs", status: "discontinued" },
    { name: "Zapier", description: "Replaced by n8n for better observability", status: "discontinued" },
    { name: "Lovable", description: "De-prioritized for production workflows", status: "discontinued" },
  ],
};

export const futureVision = [
  {
    id: 1,
    title: "Event-Driven Platform",
    description: "From workflow orchestration to explicit event schemas, clearer state machines for onboarding, quoting, matching, payments.",
    icon: "zap",
    priority: "high",
  },
  {
    id: 2,
    title: "Evaluation-First AI",
    description: "Build gold datasets, regression tests for prompts, metrics dashboards for accuracy, latency, cost, escalation rate. This converts AI from 'clever' to 'reliable.'",
    icon: "check-circle",
    priority: "high",
  },
  {
    id: 3,
    title: "Knowledge Layer as Product",
    description: "Curate policies and SOPs with versioning, enforce ownership and update cadence, deprecate outdated content, add citations and conflict resolution.",
    icon: "book-open",
    priority: "medium",
  },
  {
    id: 4,
    title: "Feature-Generation → Decision AI",
    description: "Continue using AI to generate structured signals (tags, classifications, summaries). Only after stable metrics should we increase autonomy.",
    icon: "cpu",
    priority: "medium",
  },
  {
    id: 5,
    title: "Strategic Model Routing",
    description: "Route tasks by complexity and risk, use caching and deterministic transforms when possible, maintain provider redundancy where critical.",
    icon: "git-branch",
    priority: "medium",
  },
  {
    id: 6,
    title: "Governance & Security",
    description: "Role-based access, RLS hygiene, PII redaction where needed, auditability for every automated decision.",
    icon: "shield",
    priority: "high",
  },
];

export const developmentLoop = [
  { step: 1, name: "Spec & Structure", tool: "OpenAI", description: "Draft use case, define output contract, design prompts" },
  { step: 2, name: "Rapid Prototype", tool: "Google AI Studio", description: "Build working proof quickly (UI, agent behavior)" },
  { step: 3, name: "Production Hardening", tool: "Cursor + Claude", description: "Add validation, error handling, logging" },
  { step: 4, name: "Deploy", tool: "GitHub → Vercel", description: "Push, deploy, iterate rapidly" },
  { step: 5, name: "Integrate", tool: "n8n + Supabase", description: "Wire into orchestration, ensure idempotency" },
];

