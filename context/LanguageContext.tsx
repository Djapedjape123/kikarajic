"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

type LanguageContextType = {
  activeLang: Language;
  setActiveLang: (lang: Language) => void;
  t: typeof translations.SR;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [activeLang, setActiveLang] = useState<Language>('SR');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && (savedLang === 'SR' || savedLang === 'EN')) {
      setActiveLang(savedLang);
    }
  }, []);

  const handleSetLang = (lang: Language) => {
    setActiveLang(lang);
    localStorage.setItem('lang', lang);
  };

  const t = translations[activeLang];

  return (
    <LanguageContext.Provider value={{ activeLang, setActiveLang: handleSetLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}