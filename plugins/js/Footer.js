import  '../css/global.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';



var Footer = React.createClass({
    render: function () {
        return (
            <div className="m-footer">
                <p>©1997-2014 网易公司版权所有</p>
            </div>
        );
    }
});

module.exports = Footer;