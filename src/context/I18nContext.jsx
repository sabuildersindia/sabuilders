import { createContext, useContext, useEffect, useState } from 'react';
import { copy } from '../data';

const I18nContext = createContext(undefined);

function readSetting(key, fallback, allowed) {
  try {
    const value = window.localStorage.getItem(key);
    return allowed.includes(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => readSetting('terraforge-lang', 'en', ['en', 'ta']));
  const [theme, setTheme] = useState(() => readSetting('terraforge-theme', 'light', ['light', 'dark']));

  useEffect(() => {
    try { window.localStorage.setItem('terraforge-lang', lang); } catch {}
  }, [lang]);

  useEffect(() => {
    document.title = copy[lang].brand;
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { window.localStorage.setItem('terraforge-theme', theme); } catch {}
  }, [theme]);

  const value = { lang, setLang, theme, setTheme, t: copy[lang] };
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error('useI18n must be used inside I18nProvider');
  return value;
}
