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

import ProgressBar from './ProgressBar';

let RecordType = React.createClass({
    render: function () {
        return (
            <div className="m-recordtype">
                <ProgressBar/>
                <div className="">
                     备案类型:
                     主机区域:
                </div>
            </div>
        );
    }
});


module.exports = RecordType;
