import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ur';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isUrdu: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('fredos_lang');
      return (stored === 'ur' ? 'ur' : 'en') as Language;
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('fredos_lang', lang);
    } catch (e) {
      console.warn(e);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ur' : 'en');
  };

  const isUrdu = language === 'ur';

  useEffect(() => {
    document.documentElement.dir = isUrdu ? 'rtl' : 'ltr';
    document.documentElement.lang = isUrdu ? 'ur' : 'en';
  }, [isUrdu]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isUrdu }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
