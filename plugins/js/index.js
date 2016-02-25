import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, match, RouterContext} from 'react-router';
import routes from './routes.jsx';

render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app'));
