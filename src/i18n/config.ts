import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from '@/locales/en';
import { hi } from '@/locales/hi';

export const LANG_STORAGE_KEY = 'sheshark-lang';
export const LANG_CHOSEN_KEY = 'sheshark-lang-ui-chosen';

const saved = (typeof localStorage !== 'undefined' && localStorage.getItem(LANG_STORAGE_KEY)) || 'en';

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
  },
  lng: saved === 'hi' ? 'hi' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export function persistLanguage(lng: 'en' | 'hi') {
  localStorage.setItem(LANG_STORAGE_KEY, lng);
  document.documentElement.lang = lng === 'hi' ? 'hi' : 'en';
}

document.documentElement.lang = i18n.language === 'hi' ? 'hi' : 'en';

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng === 'hi' ? 'hi' : 'en';
});

export default i18n;
