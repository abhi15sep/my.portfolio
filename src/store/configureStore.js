import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from '../reducers';
import config from '../config';

const { localStorage: localStorageConfig } = config;

export default function configureStore() {
  const enhancer = compose(
    applyMiddleware(thunkMiddleware),
    persistState(null, localStorageConfig)
  );

  const store = createStore(rootReducer, {}, enhancer);

  return store;
}
