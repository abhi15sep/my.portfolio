import AppConstants from '../constants/AppConstants';
import config from '../config';

const initialState = {
  language: config.locale
};

export default function userstate(state = initialState, action) {
  switch (action.type) {
    case AppConstants.SET_LOCALE:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
