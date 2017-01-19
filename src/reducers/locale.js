import AppConstants from '../constants/AppConstants';
import config from '../config';

const initialState = {
  language: config.locale,
  translations: {}
};

export default function locale(state = initialState, action) {
  switch (action.type) {
    case AppConstants.SET_LOCALE:
    case AppConstants.GET_TRANSLATIONS_SUCCESS:
      return { ...state, ...action.payload };

    case AppConstants.GET_TRANSLATIONS_FAIL:
      return { ...state, translations: {} };

    default:
      return state;
  }
}
