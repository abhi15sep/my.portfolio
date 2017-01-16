import AppConstants from '../constants/AppConstants';
import api from '../api';

export default {
  setLocale(lang) {
    return (dispatch) => {
      dispatch({
        type: AppConstants.SET_LOCALE,
        payload: {
          language: lang
        }
      });
    };
  }
};
