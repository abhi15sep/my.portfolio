import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Redirect, IndexRedirect, hashHistory} from 'react-router';

import './css/main.less';
import App from './components/App.jsx';
import Projects from './components/Projects.jsx';
import Page404 from './components/Page404.jsx';

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to="/ru" />
          <Route path="ru" component={Projects} />
          <Route path="en" component={Projects} />
        </Route>
        <Route path="404" component={Page404} />
        <Redirect from='*' to='404/' />
    </Router>,
    document.getElementById('main')
);
