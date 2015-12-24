import  '../../css/global.css';
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


let SubmitTrialSuccess = React.createClass({
    render: function () {
        return (
            <div>
            <p>备案信息提交成功,初审需要1-2个工作日,请耐心等待!</p>
            <p>备案订单号: Icqrq-qtk5v123</p> <Button><Link to="/reviewrecorddetail">查看备案详请</Link></Button>
            <p>审核通过后将有邮件通知,请及时查收邮件!</p>
            </div>
        );
    }
});


module.exports = SubmitTrialSuccess;