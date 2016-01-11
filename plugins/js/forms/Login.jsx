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
var CheckboxGroup = ReactUI.CheckboxGroup;
var Upload = ReactUI.Upload;


let Login = React.createClass({
    render: function () {
        return (
            <div className="m-login">
                <div className="m-login-hd">
                    <label>账号登录</label><img src="../assets/close.png"></img>
                </div>
                <div className="m-login-bd">
                    <ul className="login-type">
                        <li className="active">网易云账号</li>
                        <li className="active">网易通读证</li>
                    </ul>

                    <input type="text" name="identity" placeholder="邮箱">
                        <input type="text" name="identity" placeholder="密码">

                            <button className="u-commit" type="button">登陆</button>
                </div>
            </div>
        );
    }
});



module.exports = Login;