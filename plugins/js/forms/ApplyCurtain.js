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
var Checkbox = ReactUI.Checkbox;

import ProgressBar from './ProgressBar.jsx';
import CascadeSelect from '../widgets/CascadeSelect2.jsx';

let ApplyCurtain = React.createClass({

    handleRegion: function(p,c,a){
        this.setState({province: p, city: c, area: a});
    },
    getInitialState: function() {
        return {province:'',city:'',area:''};
    },
    render: function () {
        return (
            <div className="m-applycurtain">
                <div className="m-applycurtain-header"><label>申请幕布</label><img src="../assets/close.png"></img></div>
                <div className="m-applycurtain-bd">
                    <div className="m-applycurtain-bd-tip">
                        <img src="../assets/yellowexclamationmark.png"></img>
                        <label>提交申请后，我们将尽快寄出幕布，您收到后也请及时拍照并上传。</label>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>幕布邮寄地址:</label>
                        </div>
                        <CascadeSelect  onChange={this.handleRegion} province={this.state.province} city={this.state.city} area={this.state.area}/>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>收件人姓名:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity"/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>收件人手机号:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity"/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>公司名称:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity"/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">

                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <label><input type="checkbox" name="1" checked="true" className=""/> <span className="small-font">同意ICP备案系统快递供应商可以获取如上联系信息邮寄幕布</span></label>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">

                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <button className="u-commit" type="button"><a href="#/returntobase">提交申请</a></button>
                            <button className="u-cancel" type="button"><a href="#/fillsiteinfo">取消</a></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = ApplyCurtain;