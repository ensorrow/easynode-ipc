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


let ProgressBar = React.createClass({
    render: function () {
        return (
			<div className="m-progress">
				<ul className="m-progress-ul">
					<li>
						<div className="f-fl">
							<div className="step done">1</div>
							<span className="describe">基本信息</span>
						</div>
						<div className="f-fl arrow">
						</div>
					</li>
					<li>
						<div className="f-fl">
							<div className="step done">2</div>
							<span className="describe">填写主体信息</span>
						</div>
						<div className="f-fl arrow">
						</div>
					</li>
					<li>
						<div className="f-fl">
							<div className="step doing">3</div>
							<span className="describe">填写网站信息</span>
						</div>
						<div className="f-fl arrow">
						</div>
					</li>
					<li>
						<div className="f-fl">
							<div className="step do">4</div>
							<span className="describe">上传资料</span>
						</div>
						<div className="f-fl arrow">
						</div>
					</li>
					<li>
						<div className="f-fl">
							<div className="step do">5</div>
							<span className="describe">提交初审</span>
						</div>
					</li>
				</ul>
			</div>
        );
    }
});


module.exports = ProgressBar;
