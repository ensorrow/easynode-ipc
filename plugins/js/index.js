//import '../css/index.css';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Dashboard from './Dashboard';
import Inbox from './Inbox';
import Calendar from './Calendar';
import App from './App';

let history = createBrowserHistory();

render((
    <Router history={history}>
    <Route path="/" component={App}>
    <IndexRoute component={Dashboard}/>
    <Route path="app" component={Dashboard}/>
    <Route path="calendar" component={Calendar}/>
    <Route path="*" component={Dashboard}/>
    </Route>
    </Router>
), document.getElementById('app'));

