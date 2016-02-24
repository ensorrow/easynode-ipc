import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


import '../es5-shim.min.js';
var ReactUI = require('../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;


let ReturnWidget = React.createClass({


    render: function () {
        if( __globals__.user && __globals__.user.recordnumber > 0 ){
            return (
                <div className="u-goback">
                    <a className="u-goback" href=""><img src="../assets/return.png" />返回列表</a>
                </div>
            );
        }else {
            return (
                <div>
                </div>
            );
        }
    }
});

module.exports = ReturnWidget;