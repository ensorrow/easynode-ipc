import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute,hashHistory, match, RouterContext} from 'react-router';
import routes from './routes.jsx';

import Global from './utils/globals';

window.onbeforeunload = function(){
    Global.set('global',__globals__);
}

window.onload  = function(){

    //another account login address, utilize other field except for user
    var user = __globals__.user;
    var loginCallback = __globals__.loginCallback;
    if( user ){
        __globals__ =  Global.get('global');
        __globals__.user = user;
        __globals__.loginCallback = loginCallback
    }
    render(
        <Router history={hashHistory} routes={routes}/>,
        document.getElementById('app')
    );
}