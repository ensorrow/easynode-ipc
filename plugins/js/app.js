import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

var App = React.createClass({
    render: function () {
        return (
            <div>
            <header>
            <ul>
            <li><Link to="/app">Dashboard</Link></li>
            <li><Link to="/inbox">Inbox</Link></li>
            <li><Link to="/calendar">Calendar</Link></li>
            </ul>
            Logged in as Jane
        </header>
        {this.props.children}
        </div>
        );
    }
});


module.exports = App;