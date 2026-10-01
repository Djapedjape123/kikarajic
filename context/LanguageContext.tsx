"use client";

import React, { createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { translations, Language } from '@/lib/translations';

type LanguageContextType = {
  activeLang: Language;
  setActiveLang: (lang: Language) => void;
  t: typeof translations.SR;
  // dodaje jezik ispred interne putanje: lp('/o-meni') -> '/sr/o-meni'
  lp: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// jezik dolazi iz adrese (/sr/... ili /en/...), layout ga prosleđuje ovde
export function LanguageProvider({ lang, children }: { lang: string; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activeLang: Language = lang === 'en' ? 'EN' : 'SR';
  const prefix = `/${activeLang.toLowerCase()}`;

  const lp = (path: string) => (path === '/' ? prefix : `${prefix}${path}`);

  // ista stranica, drugi jezik: /sr/o-meni -> /en/o-meni
  const handleSetLang = (newLang: Language) => {
    if (newLang === activeLang) return;
    const newPrefix = `/${newLang.toLowerCase()}`;
    document.cookie = `NEXT_LOCALE=${newLang.toLowerCase()}; path=/; max-age=31536000; samesite=lax`;
    const rest = pathname.replace(/^\/(sr|en)(?=\/|$)/, '');
    router.push(`${newPrefix}${rest}`);
  };

  const t = translations[activeLang];

  return (
    <LanguageContext.Provider value={{ activeLang, setActiveLang: handleSetLang, t, lp }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
