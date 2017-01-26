import React from 'react';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../containers/App';
import CommercialProjects from '../containers/CommercialProjects';
import OwnProjects from '../containers/OwnProjects';
import Skills from '../containers/Skills';
import Page404 from '../components/Page404';
import Unavailable from '../components/Unavailable';

function getHistorySyncWithStore(store) {
  return syncHistoryWithStore(browserHistory, store);
}

const RootRoutes = ({ store }) => (
  <Router history={getHistorySyncWithStore(store)}>
    <Route path="/" component={App}>
      <IndexRedirect to="projects" />
      <Route path="/projects" component={CommercialProjects} />
      <Route path="/own-projects" component={OwnProjects} />
      <Route path="/skills" component={Skills} />
    </Route>
    <Route path="/404" component={Page404} />
    <Route path="/unavailable" component={Unavailable} />
    <Redirect from="*" to="404" />
  </Router>
);

export default RootRoutes;
