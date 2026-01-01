import { ru } from './locales/ru';
import { en } from './locales/en';
import { zh } from './locales/zh';

export type Locale = 'ru' | 'en' | 'zh';
export type Translations = typeof ru;

export const translations: Record<Locale, Translations> = {
  ru,
  en,
  zh,
};

export const getTranslation = (locale: Locale): Translations => {
  return translations[locale] || translations.ru;
};

