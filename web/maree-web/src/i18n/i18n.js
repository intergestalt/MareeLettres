import i18n from 'i18next';

i18n
  .init({
    // we init with resources
    lng: "fr",
    resources: {
      en: {
        translations: {
          "loading": "loading...",
          "live": "live",
          "sort_top": "Top",
          "sort_new": "Newest",
          "sort_trend": "Trending",
          "load_more": "Load more",
          "open_past_challenges": "Show past topics",
          "close_past_challenges": "Hide past topics",
          "counting_votes": "counting votes..."
        }
      },
      fr: {
        translations: {
          "loading": "chargement...",
          "live": "en direct",
          "sort_top": "Top",
          "sort_new": "Plus récents",
          "sort_trend": "Tendances",
          "load_more": "Load more fr",
          "open_past_challenges": "Show past topics fr",
          "close_past_challenges": "Hide past topics fr",
          "counting_votes": "counting votes... fr"
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