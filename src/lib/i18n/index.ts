import { Language, Translations, I18nConfig } from './types';
import { en } from './locales/en';
import { ja } from './locales/ja';

// Configuration
export const i18nConfig: I18nConfig = {
  defaultLanguage: 'en',
  supportedLanguages: ['en', 'ja'],
  fallbackLanguage: 'en'
};

// Translations map
const translations: Record<Language, Translations> = {
  en,
  ja
};

// Utility functions
export const getTranslations = (language: Language): Translations => {
  return translations[language] || translations[i18nConfig.fallbackLanguage];
};

export const isValidLanguage = (language: string): language is Language => {
  return i18nConfig.supportedLanguages.includes(language as Language);
};

export const getLanguageLabel = (language: Language): string => {
  const labels: Record<Language, string> = {
    en: 'English',
    ja: '日本語'
  };
  return labels[language];
};

export const getLanguageCode = (language: Language): string => {
  const codes: Record<Language, string> = {
    en: 'EN',
    ja: '日本語'
  };
  return codes[language];
};

// Re-export types and constants
export type { Language, Translations, ComingSoonTranslations } from './types';
export { en, ja }; 