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



let CheckTrialNoPass = React.createClass({
    render: function () {
        return (
            <div className="m-checktrialnopass">
                <div className="tip-label">
                    <img src="../assets/icon-err.png" alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">备案信息初审未通过，请根据下列提示信息，修改备案申请！</p>

                    <p className="tip-bd">1、主体单位所属区域填写不正确。</p>
                    <p className="tip-bd">2、网站域名输入错误。</p>
                    <p className="tip-bd">3、主体单位所属区域填写不正确。</p>
                    <p className="tip-bd">4、网站域名输入错误。</p>
                </div>
            </div>
        );
    }
});


module.exports = CheckTrialNoPass;