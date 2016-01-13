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

import RecordType from './RecordType.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

import ProgressBar from './ProgressBar.jsx';


let BaseInfo = React.createClass({
    render: function () {
        return (
            <div classNameName="g-bd">
                <ReturnWidget/>
                <div classNameName="g-bdc">
                    <ProgressBar step={1} key={1}/>
                    <RecordType/>
                    <div className="w-btn">
                        <button className="u-main" type="button"><a href="#/fillcompanyinfo">开始填写主体信息</a></button>
                        <button className="u-draft" type="button"><a href="#/savetodraft">保存草稿</a></button>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = BaseInfo;