import i18n from "i18next";
import { initReactI18next, Translation } from "react-i18next";
import en from './translations/en/testtranslateion.json'
import de from './translations/de/testtranslateion.json'
import es from './translations/es/testtranslateion.json'
import fr from './translations/fr/testtranslateion.json'
import it from './translations/it/testtranslateion.json'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    lng: "en",
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;