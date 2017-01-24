import { pendingTask, begin, end } from 'react-redux-spinner';
import AppConstants from '../constants/AppConstants';
import api from '../api';

export default {
  showGallery(currentProjectID) {
    return (dispatch) => {
      dispatch({
        type: AppConstants.PROJECTS_SHOW_GALLERY,
        payload: {
          isGalleryShow: true,
          currentProjectID
        }
      });
    };
  },

  hideGallery() {
    return (dispatch) => {
      dispatch({
        type: AppConstants.PROJECTS_HIDE_GALLERY
      });
    };
  }
};
