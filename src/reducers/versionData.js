import AppConstants from '../constants/AppConstants';

const initialState = {
  timestamp: 0
};

export default function errors(state = initialState, action) {
  switch (action.type) {

    case AppConstants.ADD_DATA_VERSION:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}
