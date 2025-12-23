'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: <T>(content: { es: T; en: T }) => T;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  defaultLanguage = 'es' 
}: { 
  children: ReactNode; 
  defaultLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = <T,>(content: { es: T; en: T }): T => {
    return content[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language toggle component
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-1 bg-pr-dark/80 border border-pr-gray/40 rounded-lg p-1 ${className}`}>
      <button
        onClick={() => setLanguage('es')}
        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
          language === 'es'
            ? 'bg-pr-amber text-pr-charcoal'
            : 'text-pr-muted hover:text-pr-white'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
          language === 'en'
            ? 'bg-pr-amber text-pr-charcoal'
            : 'text-pr-muted hover:text-pr-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}

