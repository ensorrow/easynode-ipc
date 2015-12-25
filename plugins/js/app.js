import  '../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';



import Header from './Header';
import Footer from './Footer';

var App = React.createClass({

    render: function () {
        return (
            <div className="app">
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
});


module.exports = App;