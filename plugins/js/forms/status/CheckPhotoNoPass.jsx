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


let CheckPhotoNoPass = React.createClass({
    render: function () {
        return (
            <div>
                <p>照片审核未通过，请根据下列提示信息，修改备案申请！</p>
                <p>1、没有使用幕布。</p>
            </div>
        );
    }
});


module.exports = CheckPhotoNoPass;