import { pendingTask, begin, end } from 'react-redux-spinner';
import AppConstants from '../constants/AppConstants';
import api from '../api';

export default {
  getProjects(lang) {
    return (dispatch) => {
      api.getProjects(lang)
      .then((projects) => {
        dispatch({
          type: AppConstants.GET_PROJECTS_SUCCESS,
          payload: {
            projects
          }
        });
      })
      .catch((err) => {
        dispatch({
          type: AppConstants.GET_PROJECTS_FAIL,
          error: err
        });
      });
    };
  },
  getLocaleData(lang) {
    return (dispatch) => {
      dispatch({
        type: AppConstants.GET_LOCALE_DATA_REQUEST,
        [pendingTask]: begin
      });

      api.getLocaleData(lang)
      .then((data) => {
        console.log(data);
        dispatch({
          type: AppConstants.GET_LOCALE_DATA_SUCCESS,
          payload: {
            data
          },
          [pendingTask]: end
        });
      })
      .catch((err) => {
        dispatch({
          type: AppConstants.GET_LOCALE_DATA_FAIL,
          error: err,
          [pendingTask]: end
        });
      });
    };
  }
};
