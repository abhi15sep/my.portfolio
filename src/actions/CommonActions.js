import { pendingTask, begin, end } from 'react-redux-spinner';
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
  },

  getTranslations(lang) {
    return (dispatch) => {
      dispatch({
        type: AppConstants.GET_TRANSLATIONS_REQUEST,
        [pendingTask]: begin
      });

      api.getTranslations(lang)
      .then((data) => {
        dispatch({
          type: AppConstants.GET_TRANSLATIONS_SUCCESS,
          payload: {
            translations: data
          },
          [pendingTask]: end
        });
      })
      .catch((err) => {
        dispatch({
          type: AppConstants.GET_TRANSLATIONS_FAIL,
          [pendingTask]: end
        });

        dispatch({ type: AppConstants.ADD_ERROR, error: err });
      });
    };
  },

  getProjects(lang) {
    return (dispatch) => {
      api.getProjects(lang)
      .then((items) => {
        dispatch({
          type: AppConstants.GET_PROJECTS_SUCCESS,
          payload: {
            items
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: AppConstants.GET_PROJECTS_FAIL,
          error: err
        });

        dispatch({ type: AppConstants.ADD_ERROR, error: err });
      });
    };
  }
};
