import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import enTranslation from '../public/locales/en/translation.json'
import frTranslation from '../public/locales/fr/translation.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation }
    },
    fallbackLng: 'fr', // French is default
    interpolation: {
      escapeValue: false, // React already escapes by default
    }
  })

export default i18n
