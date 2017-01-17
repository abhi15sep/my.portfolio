import AppConstants from '../constants/AppConstants';
import config from '../config';

const initialState = {
  language: config.locale,
  translations: {}
};

export default function userstate(state = initialState, action) {
  switch (action.type) {
    case AppConstants.SET_LOCALE:
    case AppConstants.GET_TRANSLATIONS_SUCCESS:
      return { ...state, ...action.payload };

    case AppConstants.GET_TRANSLATIONS_FAIL:
      return { ...state, translations: {}, error: action.error };

    default:
      return state;
  }
}
