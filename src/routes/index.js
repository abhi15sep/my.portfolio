import React from 'react';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';

import App from '../containers/App';
import Page from '../containers/Page';
import Page404 from '../components/Page404';

const RootRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="ru" />
      <Route path="/en" component={Page} />
      <Route path="/ru" component={Page} />
      <Route path="404" component={Page404} />
    </Route>
    <Redirect from="*" to="404" />
  </Router>
);

export default RootRoutes;
