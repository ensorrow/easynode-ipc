import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


require('../es5-shim.min.js');
var ReactUI = require('../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;


let ReturnWidget = React.createClass({
    render: function () {
        return (
            <div className="g-bd-return">
                <a className="m-return" href="./index.html"><img src="../assets/return.png" />返回列表</a>
            </div>
        );
    }
});


module.exports = ReturnWidget;