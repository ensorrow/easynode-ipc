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
                <p>通管局审核已通过，备案号和备案密码已生成并邮件发送给您，请及时查收邮件！</p>
                <p>备案订单号: Icqrq-qtk5v123</p> <Button><Link to="/reviewrecorddetail">查看备案详请</Link></Button>
            </div>
        );
    }
});


module.exports = CheckCouncilPass;