import { ru } from './locales/ru';
import { en } from './locales/en';

export type Locale = 'ru' | 'en';
export type Translations = typeof ru;

export const translations: Record<Locale, Translations> = {
  ru,
  en,
};

export const getTranslation = (locale: Locale): Translations => {
  return translations[locale] || translations.ru;
};

