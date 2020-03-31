import { isLocalStorageAvailable } from './local-storage';

const DREPAKIN_LOCATION_DISCLAIMER_ACCEPTED_KEY =
  'DREPAKIN_LOCATION_DISCLAIMER_ACCEPTED';

const loadLocationDisclaimer = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  const disclaimerAccepted = JSON.parse(
    localStorage.getItem(DREPAKIN_LOCATION_DISCLAIMER_ACCEPTED_KEY),
  );
  return disclaimerAccepted;
};

const storeLocationDisclaimer = () => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  localStorage.setItem(
    DREPAKIN_LOCATION_DISCLAIMER_ACCEPTED_KEY,
    JSON.stringify(new Date()),
  );
};

export { loadLocationDisclaimer, storeLocationDisclaimer };
