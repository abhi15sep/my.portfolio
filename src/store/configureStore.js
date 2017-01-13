import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore() {
  const store = compose(
    applyMiddleware(thunkMiddleware)
  )(createStore)(rootReducer);

  return store;
}
