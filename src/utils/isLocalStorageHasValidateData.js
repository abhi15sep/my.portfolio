import config from '../config';
import AppConstants from '../constants/AppConstants';

const { localStorage: localStorageConfig } = config;

function isDateOfExpirationValid(localStorageDataTimestamp) {
  if (!window.DATA_VERSION_TIMESTAMP
    || window.DATA_VERSION_TIMESTAMP !== localStorageDataTimestamp) {
    return false;
  }

  const currentDate = new Date(Date.now());
  const localStorageDateVersion = new Date(localStorageDataTimestamp * 1000);

  const timeDiff = Math.abs(localStorageDateVersion.getTime() - currentDate.getTime());
  const daysOfDiffData = Math.ceil(timeDiff / (1000 * 3600 * 24));

  if (daysOfDiffData > localStorageConfig.daysExpirationOfData) {
    return false;
  }

  return true;
}

export default function () {
  const appLocalStorage = window.localStorage.getItem(localStorageConfig.key);
  const persistedState = appLocalStorage ? JSON.parse(appLocalStorage) : null;

  if (!persistedState) {
    return false;
  }
  if (!isDateOfExpirationValid(persistedState.versionData.timestamp)) {
    return false;
  }

  return true;
}
