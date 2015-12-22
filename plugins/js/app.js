import  '../css/global.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Header from './Header';
import Footer from './Footer';
import BaseInfo from './forms/BaseInfo';

var App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <Header/>
                <BaseInfo/>
                <Footer/>
            </div>
        );
    }
});


module.exports = App;