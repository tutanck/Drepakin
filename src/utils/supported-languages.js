import { loadPreferredLanguage } from './preferred-language';

const supportedLanguages = {
  fr_FR: { key: 'fr_FR', local: 'fr-FR', name: 'Français', display: 'Fr' },
  en_US: { key: 'en_US', local: 'en-US', name: 'English', display: 'En' },
};

const defaultLanguage = 'fr_FR';

const selectedLanguage = (lang) => {
  if (supportedLanguages[lang]) {
    return lang;
  }

  const preferredLanguage = loadPreferredLanguage();

  if (preferredLanguage) {
    return preferredLanguage;
  }

  return defaultLanguage;
};

export default supportedLanguages;

export { selectedLanguage };
