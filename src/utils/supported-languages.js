import {
  loadPreferredLanguage,
  storePreferredLanguage,
} from './preferred-language';

const supportedLanguages = {
  fr_FR: { key: 'fr_FR', local: 'fr-FR', name: 'Français', display: 'Fr' },
  en_US: { key: 'en_US', local: 'en-US', name: 'English', display: 'En' },
};

const defaultLanguage = 'fr_FR';

const selectedLanguage = (lng) => {
  if (supportedLanguages[lng]) {
    storePreferredLanguage(lng);
    return lng;
  }

  const preferredLanguage = loadPreferredLanguage();

  if (preferredLanguage) {
    return preferredLanguage;
  }

  return defaultLanguage;
};

export default supportedLanguages;

export { selectedLanguage };
