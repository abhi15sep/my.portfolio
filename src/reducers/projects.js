import AppConstants from '../constants/AppConstants';

const initialState = {
  items: [],
  isGalleryShow: false,
  currentProjectID: null
};

export default function projects(state = initialState, action) {
  switch (action.type) {

    case AppConstants.GET_PROJECTS_SUCCESS:
    case AppConstants.PROJECTS_SHOW_GALLERY:
      return { ...state, ...action.payload };

    case AppConstants.GET_PROJECTS_FAIL:
      return { ...state, items: [] };

    case AppConstants.PROJECTS_HIDE_GALLERY:
      return { ...state, isGalleryShow: false, currentProjectID: null };

    default:
      return state;
  }
}
