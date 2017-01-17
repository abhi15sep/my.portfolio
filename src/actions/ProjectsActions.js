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
  }
};
