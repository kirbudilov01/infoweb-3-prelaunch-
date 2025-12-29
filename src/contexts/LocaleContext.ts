import { createContext } from 'react';
import type { Locale, Translations } from '../i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

