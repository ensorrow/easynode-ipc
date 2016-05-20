import React from 'react';
import { render } from 'react-dom';
import routes from './routes.jsx';
import { Router, hashHistory } from 'react-router';
import Global from './utils/globals';


window.onbeforeunload = function () {
    Global.set('global', _g);
};

window.onload = function () {

    // another account login address, utilize other field except for user
    var user = _g.user;
    var loginCallback = _g.loginCallback;
    if( user ) {
        _g = Global.get('global');
        _g.user = user;
        _g.loginCallback = loginCallback;
    }
    render(
        <Router history={hashHistory} routes={routes}/>,
        document.getElementById('app')
    );
};

