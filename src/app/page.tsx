import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-pr-charcoal">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <p className="text-pr-amber text-sm font-medium tracking-widest uppercase">
            PartRunner
          </p>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-pr-white">
            AI Play
          </h1>
          <p className="text-pr-muted text-lg max-w-md mx-auto">
            AI as an operating layer for BIG & BULKY logistics
          </p>
        </div>
        
        <Link 
          href="/deck"
          className="inline-flex items-center gap-3 bg-pr-amber text-pr-charcoal px-8 py-4 rounded-lg font-semibold text-lg hover:bg-pr-amber-light transition-colors"
        >
          Enter Deck
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        
        <div className="text-pr-muted text-sm space-y-1">
          <p>Press <kbd className="px-2 py-1 bg-pr-gray rounded text-xs">←</kbd> <kbd className="px-2 py-1 bg-pr-gray rounded text-xs">→</kbd> to navigate</p>
          <p>Press <kbd className="px-2 py-1 bg-pr-gray rounded text-xs">P</kbd> for Presenter Mode</p>
        </div>
      </div>
    </main>
  )
}

