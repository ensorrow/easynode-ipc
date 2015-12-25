import  '../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';



var Footer = React.createClass({
    render: function () {
        return (
            <div className="g-ft">
                <footer className="m-footer">
                    <span>©1997-2014 网易公司版权所有</span>
                </footer>
            </div>
        );
    }
});

module.exports = Footer;