import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          title: 'Rick & Morty',
          scrolledCharacters: 'Scrolled Characters',
          paginatedCharacters: 'Paginated Characters',
          pagination: 'Paginated',
          clientFilter: 'Client Filter',
          scrolled: 'Scrolled',
          status: 'Status',
          allStatus: 'All Status',
          alive: 'Alive',
          dead: 'Dead',
          unknown: 'Unknown',
          species: 'Species',
          allSpecies: 'All Species',
          human: 'Human',
          alien: 'Alien',
          robot: 'Robot',
          sortBy: 'Sort By',
          nameAZ: 'Name (A-Z)',
          originAZ: 'Origin (A-Z)',
          origin: 'Origin',
          clearFilters: 'Clear Filters',
          gender: 'Gender',
          male: 'Male',
          female: 'Female',
        },
      },
      de: {
        translation: {
          title: 'Rick & Morty',
          scrolledCharacters: 'Unendliche Scroll-Charaktere',
          paginatedCharacters: 'Paginierte Zeichen',
          pagination: 'Seitenweise',
          clientFilter: 'Client-Filter',
          scrolled: 'Gescrollt',
          status: 'Status',
          allStatus: 'Alle Status',
          alive: 'Lebendig',
          dead: 'Tot',
          unknown: 'Unbekannt',
          species: 'Spezies',
          allSpecies: 'Alle Spezies',
          human: 'Mensch',
          alien: 'Außerirdisch',
          robot: 'Roboter',
          sortBy: 'Sortieren nach',
          nameAZ: 'Name (A-Z)',
          originAZ: 'Herkunft (A-Z)',
          origin: 'Herkunft',
          clearFilters: 'Filter zurücksetzen',
          gender: 'Geschlecht',
          male: 'Männlich',
          female: 'Weiblich',
        },
      },
    },
  });

export default i18n;
