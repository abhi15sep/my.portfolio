import AppConstants from '../constants/AppConstants';

export default function errors(state = [], action) {
  switch (action.type) {

    case AppConstants.ADD_ERROR:
      return state.concat([action.error]);

    default:
      return state;
  }
}
