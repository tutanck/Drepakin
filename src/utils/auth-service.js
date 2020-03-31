import axios from 'axios';
import { isLocalStorageAvailable } from './local-storage';

const DREPAKIN_USER_KEY = 'DREPAKIN_APP_STORED_USER_INFO';

const getBearedToken = token => 'Bearer_' + token;

const setAuthHeader = authHeader => {
  axios.defaults.headers.common['Authorization'] = authHeader || '';
};

const empowerUser = user => {
  setAuthHeader(user ? getBearedToken(user.authToken) : null);
};

const loadStoredUser = () => {
  if (!isLocalStorageAvailable()) {
    return null;
  }

  const user = JSON.parse(localStorage.getItem(DREPAKIN_USER_KEY));

  empowerUser(user);

  return user;
};

const storeUser = user => {
  if (!isLocalStorageAvailable()) {
    return;
  }

  empowerUser(user);

  localStorage.setItem(DREPAKIN_USER_KEY, user ? JSON.stringify(user) : null);
};

export { loadStoredUser, storeUser, getBearedToken };
