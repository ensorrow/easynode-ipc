import  '../../../css/index.css';
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



let CheckPhotoPass = React.createClass({
    render: function () {
        return (
            <div className="m-checkphotopass">
                <div className="tip-label">
                    <img src="../assets/selected.png" alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">照片审核已通过，将在1个工作日内将您的备案信息提交至省通信管理局审核！</p>
                    <div>
                        <p className="tip-bd">备案订单号: Icqrq-qtk5v123</p><input type="button" value="查看备案详请" className="tip-button-detail"/>
                    </div>
                    <div>
                        <p className="tip-footer">省通信管理局审核通过后将生成备案号和备案密码。并邮件发送给您，请及时查收邮件。</p>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = CheckPhotoPass;