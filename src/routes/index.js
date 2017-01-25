import React from 'react';
import { Router, Route, Redirect, IndexRedirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import config from '../config';
import App from '../containers/App';
import Projects from '../containers/Projects';
import Skills from '../containers/Skills';
import Page404 from '../components/Page404';
import Unavailable from '../components/Unavailable';

const routesPathes = config.routes.path;

const RootRoutes = ({ store }) => (
  <Router history={syncHistoryWithStore(browserHistory, store)}>
    <Route path="/" component={App}>
      <IndexRedirect to="projects" />
      <Route path={routesPathes.commercialProjects} component={Projects} />
      <Route path={routesPathes.ownProjects} component={Projects} />
      <Route path={routesPathes.skills} component={Skills} />
    </Route>
    <Route path="/404" component={Page404} />
    <Route path="/unavailable" component={Unavailable} />
    <Redirect from="*" to="404" />
  </Router>
);

export default RootRoutes;
