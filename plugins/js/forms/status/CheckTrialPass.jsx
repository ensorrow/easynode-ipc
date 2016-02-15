import  '../../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


import DataService from '../../services/DataService.js';
import Global from '../../utils/globals';

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
    handleSubmit: function(e){
        e.preventDefault();

        DataService.getRecord( __globals__.record.id||0,
            function(){
                Global.set('global',__globals__);
                location.href = "#/reviewrecorddetail";
            },
            function(err){
                console.log("getRecord err")
                console.log(err);
            }
        );
    },
    render: function () {
        var code = '';
        if( __globals__.record && __globals__.record.code ){
            code = __globals__.record.code;
        }
        return (
            <div className="m-checktrialpass">
                <div className="tip-label">
                    <img src="../assets/selected.png" alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">备案信息初审已通过，请点击列表中的上传照片，完成后续步骤！</p>
                    <div>
                        <p className="tip-bd">备案订单号: {code} </p><button className="tip-button-detail" type="button" onClick={this.handleSubmit}> 查看备案详请 </button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CheckTrialPass;