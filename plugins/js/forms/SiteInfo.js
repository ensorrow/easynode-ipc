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
var CheckboxGroup = ReactUI.CheckboxGroup;

import ReturnWidget from '../widgets/ReturnWidget.jsx';
import ProgressBar from './ProgressBar.jsx';

let SiteInfo = React.createClass({

    getInitialState: function() {
        return {
            name:'',domain:'',domain1:'',domain2:'',domain3:'',domain4:'',homeUrl:'',serviceContent:'',languages:'',ispName:'',
            ip:'',accessMethod:'',serverRegion:'',managerName:'',managerIdType:0,managerIdNumber:'',officePhoneRegion:'',officePhoneNumber:'',mobile:'',
            email:'', qq:''
        };
    },

    tick: function(){
        console.log("tick siteinfo");
    },

    componentDidMount: function(){
        this.interval = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    handleName: function(e){
        e.preventDefault();
        this.setState({name: e.target.value});
        console.log("name",e.target.value);
    },
    handleDomain: function(e){
        e.preventDefault();
        this.setState({domain: e.target.value});
        console.log("domain",e.target.value);
    },
    handleDomain1: function(e){
        e.preventDefault();
        this.setState({domain1: e.target.value});
        console.log("domain1",e.target.value);
    },
    handleDomain2: function(e){
        e.preventDefault();
        this.setState({domain2: e.target.value});
        console.log("domain2",e.target.value);
    },
    handleDomain3: function(e){
        e.preventDefault();
        this.setState({domain3: e.target.value});
        console.log("domain3",e.target.value);
    },
    handleDomain4: function(e){
        e.preventDefault();
        this.setState({domain4: e.target.value});
        console.log("domain4",e.target.value);
    },
    handleHomeUrl: function(e){
        e.preventDefault();
        this.setState({homeUrl: e.target.value});
        console.log("homeUrl",e.target.value);
    },
    handleServiceContent: function(e){
        e.preventDefault();
        this.setState({serviceContent: e.target.value});
        console.log("serviceContent",e.target.value);
    },
    handleLanguages: function(e){
        e.preventDefault();
        this.setState({languages: e.target.value});
        console.log("languages",e.target.value);
    },
    handleIspName: function(e){
        e.preventDefault();
        this.setState({ispName: e.target.value});
        console.log("ispName",e.target.value);
    },
    handleIp: function(e){
        e.preventDefault();
        this.setState({ip: e.target.value});
        console.log("ip",e.target.value);
    },
    handleAccessMethod: function(e){
        e.preventDefault();
        this.setState({accessMethod: e.target.value});
        console.log("accessMethod",e.target.value);
    },
    handleServerRegion: function(e){
        e.preventDefault();
        this.setState({serverRegion: e.target.value});
        console.log("serverRegion",e.target.value);
    },

    handleManagerName: function(e){
        e.preventDefault();
        this.setState({managerName: e.target.value});
        console.log("managerName",e.target.value);
    },
    handleManagerIdType: function(e){
        e.preventDefault();
        this.setState({managerIdType: e.target.value});
        console.log("managerIdType",e.target.value);
    },
    handleManagerIdNumber: function(e){
        e.preventDefault();
        this.setState({managerIdNumber: e.target.value});
        console.log("managerIdNumber",e.target.value);
    },
    handleOfficePhoneRegion: function(e){
        e.preventDefault();
        this.setState({officePhoneRegion: e.target.value});
        console.log("officePhoneRegion",e.target.value);
    },
    handleOfficePhoneNumber: function(e){
        e.preventDefault();
        this.setState({officePhoneNumber: e.target.value});
        console.log("officePhoneNumber",e.target.value);
    },
    handleMobile: function(e){
        e.preventDefault();
        this.setState({mobile: e.target.value});
        console.log("mobile",e.target.value);
    },
    handleEmail: function(e){
        e.preventDefault();
        this.setState({email: e.target.value});
        console.log("email",e.target.value);
    },
    handleQq: function(e){
        e.preventDefault();
        this.setState({qq: e.target.value});
        console.log("qq",e.target.value);
    },
    render: function () {
        return (
            <div>
                <ReturnWidget/>
                <ProgressBar step={3} key={1}/>
                <div className="m-siteinfo">
                    <form className="">
                        <fieldset>
                            <div className="m-siteinfo-legend"><span>网站基本信息</span></div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站名称:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="identity" onChange={this.handleName}/>
                                    <span className="u-popover">请输入网站名称</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站域名:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <label className="siteurl">www</label><input type="text" name="identity" className="siteurl-input" onChange={this.handleDomain}/>
                                    <span className="u-popover">请输入网站域名</span>
                                </div>
                            </div>
                            <input type="button" value="+ 增加网站域名" className="m-siteinfo-item addsite"/>
                                <div className="m-siteinfo-item">
                                    <div className="item-label">
                                        <label>网站首页URL:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl">
                                        <label className="siteurl">http://</label><input type="text" name="identity" className="siteurl-input" onChange={this.handleHomeUrl}/>
                                        <span className="u-popover">请输入网站首页URL</span>
                                    </div>
                                </div>
                                <div className="m-siteinfo-item">
                                    <div className="item-label">
                                        <label>网站服务内容:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl">
                                        <select onChange={this.handleServiceContent} disabled>
                                            <option value ="1">其他</option>
                                        </select>
                                        <span className="u-popover hidden">请选择网站服务内容</span>
                                    </div>
                                </div>
                                <div className="m-siteinfo-item language">
                                    <div className="item-label ">
                                        <label>网站语言:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl f-fl languages">
                                        <label><input type="checkbox" name="1" onChange={this.handleLanguages}/> <span>中文简体</span></label>
                                        <label><input type="checkbox" name="2" onChange={this.handleLanguages}/> <span>中文繁体</span></label>
                                        <label><input type="checkbox" name="3" onChange={this.handleLanguages}/> <span>英语</span></label>
                                        <label><input type="checkbox" name="4" onChange={this.handleLanguages}/> <span>日语</span></label>
                                        <label><input type="checkbox" name="4" onChange={this.handleLanguages}/> <span>法语</span></label>
                                        <label><input type="checkbox" name="4" onChange={this.handleLanguages}/> <span>西班牙语</span></label>
                                        <label><input type="checkbox" name="4" onChange={this.handleLanguages}/> <span>阿拉伯语</span></label>
                                        <label><input type="checkbox" name="4" onChange={this.handleLanguages}/> <span>俄罗斯语</span></label>
                                        <label><input type="checkbox" name="4" onChange={this.handleLanguages}/> <span>自定义:</span></label>
                                        <input type="text" name="identity" className="item-ctrl-language-customize" onChange={this.handleLanguages}/>
                                        <span className="u-popover">请选择网站语言</span>
                                    </div>
                                </div>
                        </fieldset>

                        <fieldset>
                            <div className="m-siteinfo-legend"><span>网站负责人基本信息</span></div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>姓名:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="lpname" onChange={this.handleManagerName}/>
                                    <span className="u-popover">请输入网站负责人姓名</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>有效证件类型:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <select onChange={this.handleManagerIdType}>
                                        <option value ="0">--请选择证件类型--</option>
                                        <option value ="1">身份证b</option>
                                        <option value="2">护照</option>
                                        <option value="3">军官证</option>
                                        <option value="4">台胞证</option>
                                    </select>
                                    <span className="u-popover">请选择有效证件类型</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>有效证件号码:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="npidentity" onChange={this.handleManagerIdNumber}/>
                                    <span className="u-popover">请输入有效证件号码</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>办公室电话:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="officerphone" className="item-ctrl-office-onefourth" onChange={this.handleOfficePhoneRegion}/>
                                    <input type="text" name="officerphone" className="item-ctrl-office-threefourth" onChange={this.handleOfficePhoneNumber}/>
                                    <span className="u-popover">请输入办公室电话</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>手机号码:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="mobilephone" onChange={this.handleMobile}/>
                                    <span className="u-popover">请输入手机号码</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>电子邮箱:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email" onChange={this.handleEmail}/>
                                    <span className="u-popover">请输入电子邮箱</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>QQ账号:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email" onChange={this.handleQq}/>
                                    <span className="u-popover">请输入QQ账号</span>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="m-siteinfo-legend"><span>ICP备案接入信息</span></div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>ISP名称:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="lpname" className="gray" value="杭州网易雷火科技有限公司" disabled="true" onChange={this.handleIspName}/>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站IP地址:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp}/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp}/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp}/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp}/>
                                    <span className="u-popover">请输入IP地址</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站接入方式:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="checkbox" name="专线" onChange={this.handleAccessMethod}/><span>专线</span>
                                    <input type="checkbox" name="主机托管" onChange={this.handleAccessMethod}/><span>主机托管</span>
                                    <input type="checkbox" name="虚拟主机" onChange={this.handleAccessMethod}/><span>虚拟主机</span>
                                    <input type="checkbox" name="其他" onChange={this.handleAccessMethod}/><span>其他</span>
                                    <span className="u-popover">请选择网站接入方式</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>服务器放置地:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="checkbox" name="HZ1" checked="checked" onChange={this.handleServerRegion}/><span>HZ1</span>
                                    <span className="u-popover">请选择服务器放置地</span>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="w-btn">
                    <button className="u-return" type="button"><a href="#/returntobase">返回修改</a></button>
                    <button className="u-main" type="button"><a href="#/uploadmaterial">上传资料</a></button>
                    <button className="u-draft" type="button"><a href="#/savetodraft">保存草稿</a></button>
                </div>
            </div>
        );
    }
});


module.exports = SiteInfo;