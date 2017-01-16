import React from 'react';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import App from '../containers/App';
import ProjectsPage from '../containers/ProjectsPage';
import Page404 from '../components/Page404';

function getHistorySyncWithStore(store) {
  return syncHistoryWithStore(browserHistory, store);
}

const RootRoutes = ({ store }) => (
  <Router history={getHistorySyncWithStore(store)}>
    <Route path="/" component={App}>
      <IndexRedirect to="ru" />
      <Route path="/en" component={ProjectsPage} />
      <Route path="/ru" component={ProjectsPage} />
      <Route path="404" component={Page404} />
    </Route>
    <Redirect from="*" to="404" />
  </Router>
);

export default RootRoutes;
