import { isLocalStorageAvailable } from './local-storage';
import supportedLanguages from './supported-languages';

const DREPAKIN_PREFERRED_LANGUAGE_KEY = 'DREPAKIN_STORED_PREFFERED_LANGUAGE';

const loadPreferredLanguage = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  const preferredLanguage = JSON.parse(
    localStorage.getItem(DREPAKIN_PREFERRED_LANGUAGE_KEY),
  );
  return preferredLanguage;
};

const storePreferredLanguage = preferredLanguage => {
  if (!isLocalStorageAvailable()) {
    return;
  }
  if (!supportedLanguages[preferredLanguage]) {
    // eslint-disable-next-line no-throw-literal
    throw 'UNSUPPORTED_LANGUAGE';
  }

  localStorage.setItem(
    DREPAKIN_PREFERRED_LANGUAGE_KEY,
    preferredLanguage ? JSON.stringify(preferredLanguage) : null,
  );
};

export { loadPreferredLanguage, storePreferredLanguage };
