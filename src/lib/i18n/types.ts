export type Language = 'en' | 'ja';

export interface ComingSoonTranslations {
  title: string;
  subtitle: string;
  description: string;
  comingSoon: string;
  features: string[];
  emailPlaceholder: string;
  joinWaitlist: string;
  successMessage: string;
  errorMessage: string;
}

export interface Translations {
  comingSoon: ComingSoonTranslations;
  // Add other page translations here as you expand
  // home: HomeTranslations;
  // profile: ProfileTranslations;
}

export interface I18nConfig {
  defaultLanguage: Language;
  supportedLanguages: Language[];
  fallbackLanguage: Language;
} 