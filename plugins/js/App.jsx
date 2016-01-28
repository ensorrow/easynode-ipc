import  '../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';



import Header from './Header';
import Footer from './Footer';
import Login from './forms/Login.jsx';


var App = React.createClass({

    render: function () {
        console.log("app.render");
        if( __globals__.hasOwnProperty('user') ){
            return (
                <div className="app">
                    <Header/>
                    {this.props.children}
                    <Footer/>
                </div>
            );
        }else{
            return (
                <div className="app">
                    <Login/>
                </div>
            );
        }
    }
});


module.exports = App;