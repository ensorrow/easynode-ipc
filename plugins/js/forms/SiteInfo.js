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

import FormValidator from '../utils/FormValidator';

import reqwest from 'reqwest';
import Toast from '../widgets/Toast.jsx';


var LANG_CHINESE = 1;
var LANG_CHINESETRADITIONAL = 2 ;
var LANG_ENGLISH = 3;
var LANG_JAPANESE = 4;
var LANG_FRENCH =  5;
var LANG_SPANISH =  6;
var LANG_ARABIC = 7;
var LANG_RUSSIAN = 8;
var LANG_CUSTOMIZE = 9;

var AM_SPECIALLINE = 1;
var AM_WEBHOST = 2;
var AM_VIRTUALHOST = 3;
var AM_OTHER = 4;


let SiteInfo = React.createClass({

    getInitialState: function() {
        return {
            inited: true,
            processing: false,
            domains:[],
            sitesCount: 0,
            formError: {
                id: {isBlank: false, checked: true},
                name: {isBlank: false},
                domain: {isBlank: false},
                domain1: {isBlank: false,checked:true},
                domain2: {isBlank: false,checked:true},
                domain3: {isBlank: false,checked:true},
                domain4: {isBlank: false,checked:true},
                homeurl: {isBlank: false},
                servicecontent: {isBlank: false,checked:true},
                languages: {
                    chinese: true,
                    chinesetraditional: false,
                    eglish: false,
                    japanese: false,
                    french: false,
                    spanish: false,
                    arabic: false,
                    russian: false,
                    customize: false,
                    customizeLang: '',
                    checked: true
                },
                ispname: {isBlank: false,checked:true},
                ip: {
                    ip1: false,
                    ip2: false,
                    ip3: false,
                    ip4: false,
                    checked: true
                },
                accessmethod: {
                    specialline: false,
                    webhost: false,
                    virtualhost: true,
                    other: false,
                    checked:true
                },
                serverregion: {isBlank: false},

                managername: {isBlank: false},
                manageridtype: {isBlank: false},
                manageridnumber: {isBlank: false},
                officephoneregion: {isBlank: false},
                officephonenumber: {isBlank: false},
                mobile: {isBlank: false},
                email: {isBlank: false},
                qq: {isBlank: false}
            },
            siteInfo:{
                name:'',domain:'',domain1:'',domain2:'',domain3:'',domain4:'',homeurl:'',servicecontent:"1",languages:{
                    chinese: true,
                    chinesetraditional: false,
                    eglish: false,
                    japanese: false,
                    french: false,
                    spanish: false,
                    arabic: false,
                    russian: false,
                    customize: false,
                    customizeLang: ''
                },
                ispname:'杭州网易雷火科技有限公司',
                ip:{
                    ip1:'',
                    ip2:'',
                    ip3:'',
                    ip4:''
                },accessmethod:{
                    specialline: false,
                    webhost: false,
                    virtualhost: true,
                    other: false
                },serverregion:'1',managername:'',manageridtype:0,manageridnumber:'',officephoneregion:'',officephonenumber:'',mobile:'',
                email:'', qq:''
            }
        };
    },
    validator: function(fieldName,value){
        var formError = this.state.formError;
        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        return formError;
    },
    onReturn: function(){
        location.href = "#/fillcompanyinfo";
    },
    handleSubmit: function(e){
        e.preventDefault();
        this.setState({
            inited: false,
        });
        if( this.state.processing ){
            return;
        }
        var siteInfo = this.state.siteInfo;
        var formError;
        for( var field in siteInfo ){
            if( siteInfo.hasOwnProperty(field) ){
                formError = this.validator(field,siteInfo[field]);
            }
        }
        this.setState({
            formError: formError
        });
        var hasError = FormValidator.check(formError);


        if( hasError ){
            this.setState({
                processing: false
            });
            return ;
        }

        this.setState({
            processing: true
        });

        this.onSave();
        location.href = "#/uploadmaterial";

        this.setState({
            processing: false
        });
    },
    onSave: function(){
        if( __globals__.siteinfo == undefined ) {
            __globals__.siteinfo = {};
            __globals__.domains = [];
        }
        __globals__.siteinfo = this.state.siteInfo;
        __globals__.domains = this.state.domains;

        __globals__.drafttype = 3;
        //savedraft
        reqwest({
            url: '/savedraft',
            method: 'post',
            data: JSON.stringify(__globals__),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                //{drafttype: formData.drafttype, id: r.insertId};
                if( resp.ret.drafttype == 3 ){
                    __globals__.siteinfo.id = resp.ret.id;
                    Toast.show("保存草稿成功");
                }
            },
            error: function(err){
                Toast.show("保存草稿失败");
            }
        });
    },
    tick: function(){
        this.onSave();
    },

    componentDidMount: function(){
        this.interval = setInterval(this.tick, 30*1000);

        var url = location.search;
        //console.log("url",location.hash);

        if( __globals__.siteinfo != undefined && __globals__.siteinfo.hasOwnProperty('name') ) {
            this.setState( {siteInfo: Object.assign( {},this.state.siteinfo,__globals__.siteinfo ) } );
            this.setState( {domains: __globals__.domains} );
        }
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },

    handleName: function(e){
        e.preventDefault();
        var siteInfo = this.state.siteInfo;
        siteInfo.name = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleAddSite: function(e){
        var count = this.state.sitesCount+1;
        this.setState({
            sitesCount: count
        });
        var domains = this.state.domains;
        domains.push(this.state.domains.length+1);
        this.setState({
            domains: domains
        });
    },
    handleDomainOther: function(e){
        e.preventDefault();
        var siteInfo = this.state.siteInfo;

        switch(e.target.id){
            case "1":
                siteInfo.domain1 = e.target.value;
                break;
            case "2":
                siteInfo.domain2 = e.target.value;
                break;
            case "3":
                siteInfo.domain3 = e.target.value;
                break;
            case "4":
                siteInfo.domain4 = e.target.value;
                break;
        }
        this.setState({siteInfo: siteInfo});
    },
    handleDomain: function(e){
        e.preventDefault();
        var siteInfo = this.state.siteInfo;
        siteInfo.domain = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleHomeUrl: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.homeurl = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleServiceContent: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.servicecontent = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    enableLanguagesTips: function(){
        var siteInfo = this.state.siteInfo;
        for( var i in siteInfo.languages ){
            if( siteInfo.languages[i] == true )
                return false;
        }
        return true;
    },
    enableAccessMethodTips: function(){
        var siteInfo = this.state.siteInfo;
        for( var i in siteInfo.accessmethod ){
            if( siteInfo.accessmethod[i] == true )
                return false;
        }
        return true;
    },
    enableIpTips: function(){
        var siteInfo = this.state.siteInfo;
        if( this.state.inited == true )
            return false;
        for( var i in siteInfo.ip ){
            if( FormValidator.isEmpty(siteInfo.ip[i]) )
                return true;
        }
        return false;
    },
    handleLanguages: function(id){
        var siteInfo = this.state.siteInfo;
        switch(id){
            case LANG_CHINESE:
                siteInfo.languages.chinese = !siteInfo.languages.chinese;
                break;
            case LANG_CHINESETRADITIONAL:
                siteInfo.languages.chinesetraditional = !siteInfo.languages.chinesetraditional;
                break;
            case LANG_ENGLISH:
                siteInfo.languages.eglish = !siteInfo.languages.eglish;
                break;
            case LANG_JAPANESE:
                siteInfo.languages.japanese = !siteInfo.languages.japanese;
                break;
            case LANG_FRENCH:
                siteInfo.languages.french = !siteInfo.languages.french;
                break;
            case LANG_SPANISH:
                siteInfo.languages.spanish = !siteInfo.languages.spanish;
                break;
            case LANG_ARABIC:
                siteInfo.languages.arabic = !siteInfo.languages.arabic;
                break;
            case LANG_RUSSIAN:
                siteInfo.languages.russian = !siteInfo.languages.russian;
                break;
            case LANG_CUSTOMIZE:
                siteInfo.languages.customize = !siteInfo.languages.customize;
                break;
        }
        this.setState({
            siteInfo: siteInfo
        });

    },
    handleLanguagesCustomiz: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.languages.customizeLang = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleIspName: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.ispname = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleIp1: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.ip.ip1 = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleIp2: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.ip.ip2 = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleIp3: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.ip.ip3 = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleIp4: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.ip.ip4 = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleAccessMethod: function(id){
        var siteInfo = this.state.siteInfo;
        switch(id){
            case AM_SPECIALLINE:
                siteInfo.accessmethod.specialline = !siteInfo.accessmethod.specialline;
                break;
            case AM_WEBHOST:
                siteInfo.accessmethod.webhost = !siteInfo.accessmethod.webhost;
                break;
            case AM_VIRTUALHOST:
                siteInfo.accessmethod.virtualhost = !siteInfo.accessmethod.virtualhost;
                break;
            case AM_OTHER:
                siteInfo.accessmethod.other = !siteInfo.accessmethod.other;
                break;
        }
        this.setState({
            siteInfo: siteInfo
        });
    },
    handleServerRegion: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.serverregion = e.target.value;
        this.setState({siteInfo: siteInfo});
    },

    handleManagerName: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.managername = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleManagerIdType: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.manageridtype = parseInt(e.target.value);
        this.setState({siteInfo: siteInfo});
    },
    handleManagerIdNumber: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.manageridnumber = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleOfficePhoneRegion: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.officephoneregion = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleOfficePhoneNumber: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.officephonenumber = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleMobile: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.mobile = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleEmail: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.email = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    handleQq: function(e){
        e.preventDefault();

        var siteInfo = this.state.siteInfo;
        siteInfo.qq = e.target.value;
        this.setState({siteInfo: siteInfo});
    },
    getLanguageInput: function(){
        var siteInfo = this.state.siteInfo;
        if( siteInfo.languages.customize ){
            return (
                <input type="text" name="identity"  className="item-ctrl-language-customize"  onChange={this.handleLanguagesCustomiz} value={this.state.siteInfo.customizeLang}/>
            );
        }else {
            return (
                <input type="text" name="identity"  className="item-ctrl-language-customize" disabled  onChange={this.handleLanguagesCustomiz} value={this.state.siteInfo.customizeLang}/>
            );
        }
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
                                    <input type="text" name="identity" onChange={this.handleName} value={this.state.siteInfo.name}/>
                                    <span className={this.state.formError.name.isBlank  ? "u-popover" : "u-popover hidden" }>请输入网站名称</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站域名:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <div className="item-ctrl item-ctrl-in">
                                        <label className="siteurl">www</label><input type="text" name="identity" className="siteurl-input" onChange={this.handleDomain} value={this.state.siteInfo.domain}/>
                                        <span className={this.state.formError.domain.isBlank  ? "u-popover" : "u-popover hidden" }>请输入网站域名</span>
                                    </div>
                                    { this.renderDomains() }
                                </div>
                            </div>
                            <input type="button" value="+ 增加网站域名" className={this.state.sitesCount > 3 ? "m-siteinfo-item addsite hidden" : "m-siteinfo-item addsite"} onClick={this.handleAddSite}/>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站首页URL:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <label className="siteurl">http://</label><input type="text" name="identity" className="siteurl-input" onChange={this.handleHomeUrl} value={this.state.siteInfo.homeurl}/>
                                    <span className={this.state.formError.homeurl.isBlank  ? "u-popover" : "u-popover hidden" }>请输入网站首页URL</span>
                                </div>
                            </div>
                                <div className="m-siteinfo-item">
                                    <div className="item-label">
                                        <label>网站服务内容:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl">
                                        <select onChange={this.handleServiceContent} disabled value="1">
                                            <option value ="1">其他</option>
                                        </select>
                                        <span className={this.state.formError.servicecontent.isBlank  ? "u-popover" : "u-popover hidden" }>请选择网站服务内容</span>
                                    </div>
                                </div>
                                <div className="m-siteinfo-item language">
                                    <div className="item-label ">
                                        <label>网站语言:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl f-fl languages">
                                        <label><input type="checkbox" id="1" onChange={this.handleLanguages.bind(this,LANG_CHINESE)} checked={this.state.siteInfo.languages.chinese ? "checked": "" }/> <span>中文简体</span></label>
                                        <label><input type="checkbox" id="2" onChange={this.handleLanguages.bind(this,LANG_CHINESETRADITIONAL)} checked={this.state.siteInfo.languages.chinesetraditional ? "checked": "" }/> <span>中文繁体</span></label>
                                        <label><input type="checkbox" id="3" onChange={this.handleLanguages.bind(this,LANG_ENGLISH)} checked={this.state.siteInfo.languages.eglish ? "checked": "" }/> <span>英语</span></label>
                                        <label><input type="checkbox" id="4" onChange={this.handleLanguages.bind(this,LANG_JAPANESE)} checked={this.state.siteInfo.languages.japanese ? "checked": "" }/> <span>日语</span></label>
                                        <label><input type="checkbox" id="5" onChange={this.handleLanguages.bind(this,LANG_FRENCH)} checked={this.state.siteInfo.languages.french ? "checked": "" }/> <span>法语</span></label>
                                        <label><input type="checkbox" id="6" onChange={this.handleLanguages.bind(this,LANG_SPANISH)} checked={this.state.siteInfo.languages.spanish ? "checked": "" }/> <span>西班牙语</span></label>
                                        <label><input type="checkbox" id="7" onChange={this.handleLanguages.bind(this,LANG_ARABIC)} checked={this.state.siteInfo.languages.arabic ? "checked": "" }/> <span>阿拉伯语</span></label>
                                        <label><input type="checkbox" id="8" onChange={this.handleLanguages.bind(this,LANG_RUSSIAN)} checked={this.state.siteInfo.languages.russian ? "checked": "" }/> <span>俄罗斯语</span></label>
                                        <label><input type="checkbox" id="9" onChange={this.handleLanguages.bind(this,LANG_CUSTOMIZE)} checked={this.state.siteInfo.languages.customize ? "checked": "" }/> <span>自定义:</span></label>
                                        {this.getLanguageInput()}
                                        <span className={this.enableLanguagesTips()  ? "u-popover" : "u-popover hidden" }>请选择网站语言</span>
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
                                    <input type="text" name="lpname" onChange={this.handleManagerName} value={this.state.siteInfo.managername}/>
                                    <span className={this.state.formError.managername.isBlank  ? "u-popover" : "u-popover hidden" }>请输入网站负责人姓名</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>有效证件类型:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <select onChange={this.handleManagerIdType} value={this.state.siteInfo.manageridtype}>
                                        <option value ="0">--请选择证件类型--</option>
                                        <option value ="1">身份证</option>
                                        <option value="2">护照</option>
                                        <option value="3">军官证</option>
                                        <option value="4">台胞证</option>
                                    </select>
                                    <span className={this.state.formError.manageridtype.isBlank  ? "u-popover" : "u-popover hidden" }>请选择有效证件类型</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>有效证件号码:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="npidentity" onChange={this.handleManagerIdNumber} value={this.state.siteInfo.manageridnumber}/>
                                    <span className={this.state.formError.manageridnumber.isBlank  ? "u-popover" : "u-popover hidden" }>请输入有效证件号码</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>办公室电话:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="officerphone" className="item-ctrl-office-onefourth" onChange={this.handleOfficePhoneRegion} value={this.state.siteInfo.officephoneregion}/>
                                    <input type="text" name="officerphone" className="item-ctrl-office-threefourth" onChange={this.handleOfficePhoneNumber} value={this.state.siteInfo.officephonenumber}/>
                                    <span className={this.state.formError.officephonenumber.isBlank  ? "u-popover" : "u-popover hidden" }>请输入办公室电话</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>手机号码:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="mobilephone" onChange={this.handleMobile} value={this.state.siteInfo.mobile}/>
                                    <span className={this.state.formError.mobile.isBlank  ? "u-popover" : "u-popover hidden" }>请输入手机号码</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>电子邮箱:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email" onChange={this.handleEmail} value={this.state.siteInfo.email}/>
                                    <span className={this.state.formError.email.isBlank  ? "u-popover" : "u-popover hidden" }>请输入电子邮箱</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>QQ账号:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email" onChange={this.handleQq} value={this.state.siteInfo.qq}/>
                                    <span className={this.state.formError.qq.isBlank  ? "u-popover" : "u-popover hidden" }>请输入QQ账号</span>
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
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp1} value={this.state.siteInfo.ip.ip1}/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp2} value={this.state.siteInfo.ip.ip2}/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp3} value={this.state.siteInfo.ip.ip3}/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip" onChange={this.handleIp4} value={this.state.siteInfo.ip.ip4}/>
                                    <span className={this.enableIpTips()  ? "u-popover" : "u-popover hidden" }>请输入IP地址</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站接入方式:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="checkbox" name="专线"  id='11' onChange={this.handleAccessMethod.bind(this,AM_SPECIALLINE)} checked={this.state.siteInfo.accessmethod.specialline ? "checked": "" }/><span>专线</span>
                                    <input type="checkbox" name="主机托管" id='12' onChange={this.handleAccessMethod.bind(this,AM_WEBHOST)} checked={this.state.siteInfo.accessmethod.webhost ? "checked": "" }/><span>主机托管</span>
                                    <input type="checkbox" name="虚拟主机" id='13' onChange={this.handleAccessMethod.bind(this,AM_VIRTUALHOST)} checked={this.state.siteInfo.accessmethod.virtualhost ? "checked": "" }/><span>虚拟主机</span>
                                    <input type="checkbox" name="其他" id='14' onChange={this.handleAccessMethod.bind(this,AM_OTHER)} checked={this.state.siteInfo.accessmethod.other ? "checked": "" }/><span>其他</span>
                                    <span className={this.enableAccessMethodTips()  ? "u-popover" : "u-popover hidden" }>请选择网站接入方式</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>服务器放置地:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="checkbox" name="HZ1" checked="checked" onChange={this.handleServerRegion}/><span>HZ1</span>
                                    <span className={this.state.formError.serverregion.isBlank  ? "u-popover" : "u-popover hidden" }>请选择服务器放置地</span>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="w-btn">
                    <button className="u-return" type="button"  onClick={this.onReturn}> 返回修改 </button>
                    <button className="u-main" type="button" onClick={this.handleSubmit}> 上传资料 </button>
                    <button className="u-draft" type="button" onClick={this.onSave}>保存草稿</button>
                </div>
            </div>
        );
    },
    onRemoveSite: function(){
        //console.log("onRemoveSite");
        var count = this.state.sitesCount-1;
        this.setState({
            sitesCount: count
        });
        var domains = this.state.domains;
        domains.pop(this.state.domains.length+1);
        this.setState({
            domains: domains
        });
    },
    renderDomains: function(){

        return this.state.domains.map((domain)=>{
            var value = domain == 1 ? this.state.siteInfo.domain1 :
                        domain == 2 ? this.state.siteInfo.domain2 :
                        domain == 3 ? this.state.siteInfo.domain3 : this.state.siteInfo.domain4;
            return (
                <div className="item-ctrl item-ctrl-in" key={domain}>
                    <label className="siteurl">www</label>
                    <input type="text" name="identity" className="siteurl-input" onChange={this.handleDomainOther} id={domain} value={value}/>
                    <button className="siteurl-delete" type="button" onClick={this.onRemoveSite}></button>
                </div>
            )
        });
    }
});


module.exports = SiteInfo;