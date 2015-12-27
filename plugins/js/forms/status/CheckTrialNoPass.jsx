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
           <div>
               <div>备案信息初审未通过,请根据下列提示信息,修改备案申请!</div>
               <p>1、主体单位所属区域填写不正确。</p>
               <p>2、网站域名输入错误。</p>
               <p>3、主体单位所属区域填写不正确。</p>
               <p>1、主体单位所属区域填写不正确!。</p>
           </div>
        );
    }
});


module.exports = CheckTrialNoPass;