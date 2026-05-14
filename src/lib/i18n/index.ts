import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(LanguageDetector) // auto-detect from browser / localStorage
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    interpolation: {
      escapeValue: false, // React already escapes
    },
    detection: {
      // Detection priority: localStorage key → browser language
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'app_lang',
      caches: ['localStorage'],
    },
  });

export default i18n;

/** Supported locales with display labels */
export const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
] as const;

export type LocaleCode = (typeof LOCALES)[number]['code'];
