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



let CheckTrialPass = React.createClass({
    render: function () {
        return (
            <div class="m-checktrialpass">
                <div class="tip-label">
                    <img src="../assets/selected.png" alt="" class="tip-icon"/>
                </div>
                <div class="tip">
                    <p class="tip-header">备案信息初审已通过，请点击列表中的上传照片，完成后续步骤！</p>
                    <div>
                        <p class="tip-bd">备案订单号: Icqrq-qtk5v123</p><input type="button" value="查看备案详请" class="tip-button-detail"/>
                    </div>
                </div>
            </div>
        );
    }
});

/*<div>
    <p>备案信息初审已通过，请点击列表中的上传照片，完成后续步骤！</p>
    <p>备案订单号: Icqrq-qtk5v123</p> <Button><Link to="/reviewrecorddetail">查看备案详请</Link></Button>
</div>*/
/*
<div class="m-checktrialpass">
    <div class="tip-label">
        <img src="../assets/selected.png" alt="" class="tip-icon">
    </div>
    <div class="tip">
        <p class="tip-header">备案信息初审已通过，请点击列表中的上传照片，完成后续步骤！</p>
        <div>
            <p class="tip-bd">备案订单号: Icqrq-qtk5v123</p><input type="button" value="查看备案详请" class="tip-button-detail">
        </div>
    </div>
</div>*/
module.exports = CheckTrialPass;