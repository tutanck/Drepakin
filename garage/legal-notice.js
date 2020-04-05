import { isLocalStorageAvailable } from './local-storage';

const DREPAKIN_LEGAL_NOTICE_ACCEPTED_KEY = 'DREPAKIN_LEGAL_NOTICE_ACCEPTED';

const loadLegalNoticeStatus = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  const legalNoticeAccepted = JSON.parse(
    localStorage.getItem(DREPAKIN_LEGAL_NOTICE_ACCEPTED_KEY),
  );
  return legalNoticeAccepted;
};

const storeLegalNoticeStatus = () => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  localStorage.setItem(
    DREPAKIN_LEGAL_NOTICE_ACCEPTED_KEY,
    JSON.stringify(new Date()),
  );
};

export { loadLegalNoticeStatus, storeLegalNoticeStatus };
