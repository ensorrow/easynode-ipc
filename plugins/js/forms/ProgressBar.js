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
            <div>
				<ul class="m-progress">
					<li >
						<div class="f-fl">
							<img src="../assets/prg-done.png" alt="">
							<span class="step">1</span>
							<span class="describe">填写基本信息</span>
						</div>
						<div class="f-fl arrow">
							<img src="../assets/arrow-right.png" alt="">
						</div>
					</li>
					<li>
						<div class="f-fl">
							<img src="../assets/prg-done.png" alt="">
							<span class="step">2</span>
							<span class="describe">填写主体信息</span>
						</div>
						<div class="f-fl arrow">
							<img src="../assets/arrow-right.png" alt="">
						</div>
					</li>
					<li>
						<div class="f-fl">
							<img src="../assets/prg-doing.png" alt="">
							<span class="step doing">3</span>
							<span class="describe">填写网站信息</span>
						</div>
						<div class="f-fl arrow">
							<img src="../assets/arrow-right.png" alt="">
						</div>
					</li>
					<li>
						<div class="f-fl">
							<img src="../assets/prg-do.png" alt="">
							<span class="step">4</span>
							<span class="describe">上传资料</span>
						</div>
						<div class="f-fl arrow">
							<img src="../assets/arrow-right.png" alt="">
						</div>
					</li>
					<li>
						<div class="f-fl">
							<img src="../assets/prg-do.png" alt="">
							<span class="step">5</span>
							<span class="describe">提交初审</span>
		                </div>
		            </li>
				</ul>
			</div>
        );
    }
});


module.exports = ProgressBar;
