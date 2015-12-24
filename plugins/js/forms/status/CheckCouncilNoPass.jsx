import  '../../../css/global.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


require('../../es5-shim.min.js');
var ReactUI = require('../../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;
var Checkbox = ReactUI.Checkbox;

import ProgressBar from '../ProgressBar';


let CheckCouncilPass = React.createClass({
    render: function () {
        return (
            <div>
                <p>通管局审核未通过，请根据下列提示信息，修改备案申请！</p>
                <p>1、XXXXXXX。</p>
            </div>
        );
    }
});


module.exports = CheckCouncilPass;