import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .init({
    // we init with resources
    resources: {
      en: {
        translations: {
          "loading": "loading en",
          "live": "live",
          "sort_top": "Top",
          "sort_new": "Newest",
          "sort_trend": "Trending",
          "load_more": "Load more"
        }
      },
      fr: {
        translations: {
          "loading": "loading fr",
          "live": "en direct",
          "sort_top": "Top",
          "sort_new": "Plus récents",
          "sort_trend": "Tendances",
          "load_more": "Load more fr"
        }
      }
    },
    fallbackLng: 'en',

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ','
    },

    react: {
      wait: true
    }
  });

export default i18n;