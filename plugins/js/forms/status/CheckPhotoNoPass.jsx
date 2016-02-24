import  '../../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import Utility from '../../utils/Utility';

import '../../es5-shim.min.js';
var ReactUI = require('../../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;
var Checkbox = ReactUI.Checkbox;



let CheckPhotoNoPass = React.createClass({
    render: function () {

        var reasons = [];
        if( __globals__.record.hasOwnProperty('reasons') ){
            var arr = Utility.parsePTag(__globals__.record.reasons);
            arr.forEach(function(v,i){
                reasons.push( <p className="tip-bd" key={i}>{i+1}、{v.replace(/<p>|<\/p>/g,"")}</p> );
            })
        }


        return (
            <div className="m-checkphotonopass">
                <div className="tip-label">
                    <img src="../assets/icon-err.png" alt="" className="tip-icon"/>
                </div>
                <div className="tip">
                    <p className="tip-header">照片审核未通过，请根据下列提示信息，修改备案申请！</p>

                    {reasons}
                </div>
            </div>
        );
    }
});


module.exports = CheckPhotoNoPass;