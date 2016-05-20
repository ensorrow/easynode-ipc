import '../css/index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Login from './forms/Login.jsx';


var App = React.createClass({

    render: function () {
        if( _g.hasOwnProperty('user') && _g.user.hasOwnProperty('id') ) {
            document.body.style.background = '#F7F7F7';
            return (
                <div className="app">
                    <Header/>
                    {this.props.children}
                    <Footer/>
                </div>
            );
        }else{
            document.body.style.background = '#3f5573';
            return (
                <div className="app">
                    <Login/>
                </div>
            );
        }
    }
});

module.exports = App;

