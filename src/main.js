import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppConstants from './constants/AppConstants';
import configureStore from './store/configureStore';
import RootRoutes from './routes';

import './styles/main.less';

if (module.hot) {
  module.hot.accept();
}

injectTapEventPlugin();
if (window.DATA_VERSION_TIMESTAMP) {
  AppConstants.DATA_VERSION_TIMESTAMP = window.DATA_VERSION_TIMESTAMP;
}


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RootRoutes store={store} />
  </Provider>,
  document.getElementById('main')
);
