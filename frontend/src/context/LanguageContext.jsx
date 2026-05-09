import { createContext, useContext, useMemo, useState } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(localStorage.getItem('sakura_note_lang') || 'ja');

  const changeLanguage = (nextLanguage) => {
    localStorage.setItem('sakura_note_lang', nextLanguage);
    setLanguage(nextLanguage);
  };

  const t = (key) => translations[language][key] || key;

  const value = useMemo(() => ({ language, changeLanguage, t }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLanguage = () => useContext(LanguageContext);
