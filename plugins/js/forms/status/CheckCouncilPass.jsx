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



let CheckCouncilPass = React.createClass({
    render: function () {
        return (
            <div className="m-checkcouncilpass">
                <div className="tip-label">
                    <img src="../assets/selected.png" alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">备案信息初审已通过，请点击列表中的上传照片，完成后续步骤！</p>
                    <div>
                        <p className="tip-bd">备案订单号: Icqrq-qtk5v123</p><input type="button" value="查看备案详请" className="tip-button-detail"/>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = CheckCouncilPass;