import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import configureStore from './store/configureStore';

import RootRoutes from './routes';

if (module.hot) {
  module.hot.accept();
}

injectTapEventPlugin();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RootRoutes store={store} />
  </Provider>,
  document.getElementById('main')
);
