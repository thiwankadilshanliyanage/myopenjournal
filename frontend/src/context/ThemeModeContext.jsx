import { createContext, useContext, useMemo, useState } from 'react';

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('sakura_note_mode') || 'light');

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('sakura_note_mode', next);
      return next;
    });
  };

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export const useThemeMode = () => useContext(ThemeModeContext);
