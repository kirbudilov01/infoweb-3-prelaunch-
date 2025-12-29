import { useState, useEffect, type ReactNode } from 'react';
import { LocaleContext } from './LocaleContext';
import { getTranslation } from '../i18n';
import type { Locale } from '../i18n';

const STORAGE_KEY = 'docs-locale';

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return (saved as Locale) || 'ru';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
  };

  const t = getTranslation(locale);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
};

