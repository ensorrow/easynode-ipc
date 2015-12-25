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


let SubmitCheckSuccess = React.createClass({
    render: function () {
        return (
            <div>
                <p>照片提交成功，审核需要1-2个工作日，请耐心等待！</p>
                <p>备案订单号: Icqrq-qtk5v123</p> <Button>查看备案详请</Button>
                <p>审核通过后可查看审核结果并邮件通知，请及时查收邮件。</p>
            </div>
        );
    }
});


module.exports = SubmitCheckSuccess;