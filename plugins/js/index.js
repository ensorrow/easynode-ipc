import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory, match, RouterContext} from 'react-router';
import routes from './routes.jsx';

import Global from './utils/globals';

window.onbeforeunload = function(){
    console.log("onbeforeunload");
    Global.set('global',__globals__);

}

window.onload  = function(){
    console.log("onload");
    __globals__ =  Global.get('global');
    render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app'));
}