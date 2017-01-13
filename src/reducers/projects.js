import AppConstants from '../constants/AppConstants';

const initialState = {
  projects: []
};

export default function userstate(state = initialState, action) {
  switch (action.type) {
    case AppConstants.GET_PROJECTS_SUCCESS:
      return { ...state, ...action.payload };

    case AppConstants.GET_PROJECTS_FAIL:
      return { ...state, projects: [], error: action.error };

    default:
      return state;
  }
}
