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

import RecordType from './RecordType';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

let BaseInfo = React.createClass({
    render: function () {
        return (
            <div className="g-bd">
                <div className="g-bdc">
                    <ReturnWidget/>
                    <RecordType/>
                    <Button className="w-btn u-main"><Link to="/fillcompanyinfo">开始填写主体信息</Link></Button>
                    <Button className="w-btn u-draft"><Link to="/savetodraft">保存草稿</Link></Button>
                </div>
            </div>
        );
    }
});


module.exports = BaseInfo;