import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

import { getRequest } from '../utils/Utility';

require('../es5-shim.min.js');
var ReactUI = require('../ReactUI');
var Form = ReactUI.Form;
var FormControl = ReactUI.FormControl;
var Icon = ReactUI.Icon;
var Input = ReactUI.Input;
var Button = ReactUI.Button;
var FormSubmit = ReactUI.FormSubmit;

import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import CascadeSelect from '../widgets/CascadeSelect.jsx';

let CompanyInfo = React.createClass({


    getInitialState: function() {
        return {
            province:'',city:'',area:'',nature:0,idType:0,idNumber:'',name:'',liveAddress:'',commAddress:'',owner:'',
            companyId:0,managerName:'',managerIdType:0,managerIdNumber:'',officePhoneRegion:'',officePhoneNumber:'',mobile:'',email:'',
            idTypeEnable: 0
        };
    },
    onClick: function(){
        this.onSave();
        location.href = "#/fillsiteinfo";
    },
    onSave: function(){
        __globals__.companyinfo = {};
        __globals__.companyinfo = this.state;
    },
    onReturn: function(){
        location.href = "#/";
    },
    handleNature: function(e){
        e.preventDefault();
        this.setState({nature: e.target.value});
        if(parseInt(e.target.value) > 1){
            this.setState({idTypeEnable:1});
        }
        console.log("nature",e.target.value);
    },
    handleRegion: function(p,c,a){
        console.log(p,c,a);
        this.setState({province:p});
        this.setState({city:c});
        this.setState({area:a})
    },
    handleIdType: function(e){
        e.preventDefault();
        this.setState({idType: e.target.value});
        console.log("idType",e.target.value);
    },
    handleIdNumber: function(e){
        e.preventDefault();
        this.setState({idNumber: e.target.value});
        console.log("idNumber", e.target.value);
        console.log(e.target.value);
    },
    handleName: function(e){
        e.preventDefault();
        this.setState({name:e.target.value});
        console.log("name",e.target.value);
    },
    handleLiveAddress: function(e){
        e.preventDefault();
        this.setState({liveAddress:e.target.value});
        console.log("liveAddress",e.target.value);
    },
    handleCommAddress: function(e){
        e.preventDefault();
        this.setState({commAddress:e.target.value});
        console.log("liveAddress",e.target.value);
    },
    handleOwner: function(e){
        e.preventDefault();
        this.setState({owner:e.target.value});
        console.log("owner",e.target.value);
    },
    handleManagerName: function(e){
        e.preventDefault();
        this.setState({managerName:e.target.value});
        console.log("managerName",e.target.value);
    },
    handleManagerIdType: function(e){
        e.preventDefault();
        this.setState({managerIdType:e.target.value});
        console.log("managerIdType",e.target.value);
    },

    handleManagerIdNumber: function(e){
        e.preventDefault();
        this.setState({managerIdNumber:e.target.value});
        console.log("managerIdNumber",e.target.value);
    },
    handleOfficePhoneRegion: function(e){
        e.preventDefault();
        this.setState({officePhoneRegion:e.target.value});
        console.log("officePhoneRegion",e.target.value);
    },
    handleOfficePhoneNumber: function(e){
        e.preventDefault();
        this.setState({officePhoneNumber:e.target.value});
        console.log("officePhoneNumber",e.target.value);
    },
    handleMobile: function(e){
        e.preventDefault();
        this.setState({mobile:e.target.value});
        console.log("mobile",e.target.value);
    },
    handleEmail: function(e){
        e.preventDefault();
        this.setState({email:e.target.value});
        console.log(this.state);
        console.log("email",e.target.value);
    },

    onClick: function(e){
        e.preventDefault();
        console.log("onClick", e.target.value);
        window.location.href = '#/fillsiteinfo?a=a&b=b';
        getRequest();
        console.log(getRequest()["a"]);
    },

    tick: function(){
        console.log("tick ccom");
    },

    componentDidMount: function(){
        this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    render: function () {
        return (
        <div className="g-bd">
            <ReturnWidget/>
            <ProgressBar step={2} key={1}/>
            <div className="m-companyinfo">
                <form className="">
                    <fieldset>
                        <div className="m-companyinfo-legend"><span>主体单位信息</span></div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位所属区域:</label>
                            </div>
                            <CascadeSelect  onChange={this.handleRegion}/>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位性质:</label>
                            </div>
                            <div className="item-ctrl">
                                <select onChange={this.handleNature} >
                                    <option value ="0">请选择主体单位的性质</option>
                                    <option value ="1">军队</option>
                                    <option value ="2">政府机关</option>
                                    <option value="3">企事业单位</option>
                                    <option value="4">企业</option>
                                    <option value="5">个人</option>
                                </select>
                                <span className={this.state.nature > 0 ? "u-popover hidden" : "u-popover" }>请选择主体单位性质</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件类型:</label>
                            </div>
                            <div className="item-ctrl">
                                <select  onChange={this.handleIdType} >
                                    <option value ="0">请选择主体单位证件类型</option>
                                    <option value ="1">工商执照</option>
                                    <option value="2">组织机构代码</option>
                                </select>
                                <span className={this.state.idType > 0 ? "u-popover hidden" : "u-popover" }>1、企业建议选择工商执照 2、民办企业建议选择组织机构代码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件号码:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="identity"  onChange={this.handleIdNumber}/>
                                <span className={this.state.idNumber.length > 0 ? "u-popover hidden" : "u-popover" }>请输入主体单位号码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位名称:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="name" onChange={this.handleName}/>
                                <span className={this.state.name.length > 0 ? "u-popover hidden" : "u-popover" }>请输入主体单位名称</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件住所:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="address" onChange={this.handleLiveAddress}/>
                                <span className={this.state.liveAddress.length > 0 ? "u-popover hidden" : "u-popover" }>请输入主体单位信所地址</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位通讯地址:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="commaddress" onChange={this.handleCommAddress}/>
                                <span className={this.state.commAddress.length > 0 ? "u-popover hidden" : "u-popover" }>请输入主体单位通讯地址</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>投资人或主管单位名称:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="investorname" onChange={this.handleOwner}/>
                                <span className={this.state.owner.length > 0 ? "u-popover hidden" : "u-popover" }>请输入投资人或主管单位名称</span>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="m-companyinfo-legend"><span>主体单位负责人信息:</span></div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人姓名:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="lpname" onChange={this.handleManagerName}/>
                                <span className={this.state.managerName.length > 0 ? "u-popover hidden" : "u-popover" }>请输入主体单位负责人信息</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人证件类型:</label>
                            </div>
                            <div className="item-ctrl">
                                <select onChange={this.handleManagerIdType}>
                                    <option value ="0">请选择主体单位的性质</option>
                                    <option value ="1">军队</option>
                                    <option value ="2">政府机关</option>
                                    <option value="3">企事业单位</option>
                                    <option value="4">企业</option>
                                    <option value="5">个人</option>
                                </select>
                                <span className={this.state.managerIdType > 0 ? "u-popover hidden" : "u-popover" }>请选择法人证件类型</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人证件号码:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="npidentity" onChange={this.handleManagerIdNumber}/>
                                <span className={this.state.managerIdNumber.length > 0 ? "u-popover hidden" : "u-popover" }>请输入法人证件号码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>办公室电话:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="officerphone" onChange={this.handleOfficePhoneNumber}/>
                                <span className={this.state.officePhoneNumber.length > 0 ? "u-popover hidden" : "u-popover" }>请输入办公室电话</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>手机号码:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="mobilephone"onChange={this.handleMobile}/>
                                <span className={this.state.mobile.length > 0 ? "u-popover hidden" : "u-popover" }>请输入手机号码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>电子邮箱:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="email" onChange={this.handleEmail}/>
                                <span className={this.state.email.length > 0 ? "u-popover hidden" : "u-popover" }>请输入电子邮箱</span>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div className="w-btn">
                <button className="u-return" type="button" onClick={this.onReturn}> 返回修改 </button>
                <button className="u-main" type="button"  onClick={this.onClick}>填写网站信息</button>
                <button className="u-draft" type="button"  onClick={this.onSave}>保存草稿</button>
            </div>
        </div>
        );
    }
});


module.exports = CompanyInfo;