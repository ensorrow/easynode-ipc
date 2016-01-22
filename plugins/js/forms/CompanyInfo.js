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
import FormValidator from '../utils/FormValidator';

let CompanyInfo = React.createClass({


    getInitialState: function() {
        return {
            processing : false,
            formError: {
                province: {isBlank: false},
                city: {isBlank: false},
                area: {isBlank: false,checked:true},
                nature: {isBlank: false},
                idtype: {isBlank: false},
                idnumber: {isBlank: false},
                name: {isBlank: false},
                liveaddress:  {isBlank: false},
                commaddress: {isBlank: false},
                owner: {isBlank: false},
                managername: {isBlank: false},
                manageridtype:  {isBlank: false},
                manageridnumber: {isBlank: false},
               // officephoneregion: {isBlank: false},
                officephonenumber: {isBlank: false},
                mobile: {isBlank: false},
                email: {isBlank: false}
            },
            companyInfo: {
                province: '',
                city: '',
                area: '',
                nature: 0,
                idtype: 0,
                idnumber: '',
                name: '',
                liveaddress: '',
                commaddress: '',
                owner: '',
                managername: '',
                manageridtype: 0,
                manageridnumber: '',
              //  officephoneregion: '',
                officephonenumber: '',
                mobile: '',
                email: ''
            }
        };
    },
    validator: function(fieldName,value){
        var formError = this.state.formError;
        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        return formError;
    },
    handleSubmit: function(e){
        e.preventDefault();
        if( this.state.processing ){
            return;
        }
        var companyInfo = this.state.companyInfo;
        var formError;
        for( var field in companyInfo ){
            if( companyInfo.hasOwnProperty(field) ){
                formError = this.validator(field, companyInfo[field]);
            }
        }
        this.setState({
            formError: formError
        });
        var hasError = false;

        console.log(formError);
        console.log(companyInfo);

        var hasError = FormValidator.check(formError);

        console.log("haseError",hasError);

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
        location.href = "#/fillsiteinfo";

        this.setState({
            processing: false
        });
    },
    onSave: function(){
        __globals__.companyinfo = {};
        __globals__.companyinfo = this.state.companyInfo;
    },
    onReturn: function(){
        location.href = "#/";
    },
    handleNature: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.nature = e.target.value;
        this.setState({companyInfo: companyInfo});
        /*if(parseInt(e.target.value) > 1){
            companyInfo.idtypeEnable = 1;
            this.setState({companyInfo: companyInfo});
        }*/
        console.log("nature",e.target.value);
    },
    handleRegion: function(p,c,a){
        console.log(p,c,a);
        var companyInfo = this.state.companyInfo;
        companyInfo.province = p;
        companyInfo.city = c;
        companyInfo.area = a;
        this.setState({companyInfo: companyInfo});
    },
    handleIdType: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.idtype = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("idtype",e.target.value);
    },
    handleIdNumber: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.idnumber = e.target.value;
        this.setState({companyInfo: companyInfo});

        console.log("idnumber", e.target.value);
        console.log(e.target.value);
    },
    handleName: function(e){
        e.preventDefault()
        var companyInfo = this.state.companyInfo;
        companyInfo.name = e.target.value;
        this.setState({companyInfo: companyInfo});

        console.log("name",e.target.value);
    },
    handleLiveAddress: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.liveaddress = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("liveaddress",e.target.value);
    },
    handleCommAddress: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.commaddress = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("liveaddress",e.target.value);
    },
    handleOwner: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.owner = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("owner",e.target.value);
    },
    handleManagerName: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.managername = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("managername",e.target.value);
    },
    handleManagerIdType: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.manageridtype = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("manageridtype",e.target.value);
    },

    handleManagerIdNumber: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.manageridnumber = e.target.value;
        this.setState({companyInfo: companyInfo});
        console.log("manageridnumber",e.target.value);
    },
   /* handleOfficePhoneRegion: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.officephoneregion = e.target.value;
        this.setState({companyInfo: companyInfo});

        console.log("officephoneregion",e.target.value);
    },*/
    handleOfficePhoneNumber: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.officephonenumber = e.target.value;
        this.setState({companyInfo: companyInfo});

        console.log("officephonenumber",e.target.value);
    },
    handleMobile: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.mobile = e.target.value;
        this.setState({companyInfo: companyInfo});

        console.log("mobile",e.target.value);
    },
    handleEmail: function(e){
        e.preventDefault();

        var companyInfo = this.state.companyInfo;
        companyInfo.email = e.target.value;
        this.setState({companyInfo: companyInfo});

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
        this.interval = setInterval(this.tick, 100*1000);
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
                                <span className={this.state.formError.nature.isBlank  ? "u-popover" : "u-popover hidden" }>请选择主体单位性质</span>
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
                                <span className={this.state.formError.idtype.isBlank ? "u-popover" : "u-popover hidden" }>1、企业建议选择工商执照 2、民办企业建议选择组织机构代码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件号码:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="identity"  onChange={this.handleIdNumber}/>
                                <span className={this.state.formError.idnumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位号码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位名称:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="name" onChange={this.handleName}/>
                                <span className={this.state.formError.name.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位名称</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件住所:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="address" onChange={this.handleLiveAddress}/>
                                <span className={this.state.formError.liveaddress.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位信所地址</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位通讯地址:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="commaddress" onChange={this.handleCommAddress}/>
                                <span className={this.state.formError.commaddress.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位通讯地址</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>投资人或主管单位名称:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="investorname" onChange={this.handleOwner}/>
                                <span className={this.state.formError.owner.isBlank ? "u-popover" : "u-popover hidden" }>请输入投资人或主管单位名称</span>
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
                                <span className={this.state.formError.managername.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位负责人信息</span>
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
                                <span className={this.state.formError.manageridtype.isBlank ? "u-popover" : "u-popover hidden" }>请选择法人证件类型</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人证件号码:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="npidentity" onChange={this.handleManagerIdNumber}/>
                                <span className={this.state.formError.manageridnumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入法人证件号码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>办公室电话:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="officerphone" onChange={this.handleOfficePhoneNumber}/>
                                <span className={this.state.formError.officephonenumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入办公室电话</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>手机号码:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="mobilephone"onChange={this.handleMobile}/>
                                <span className={this.state.formError.mobile.isBlank ? "u-popover" : "u-popover hidden" }>请输入手机号码</span>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>电子邮箱:</label>
                            </div>
                            <div className="item-ctrl">
                                <input type="text" name="email" onChange={this.handleEmail}/>
                                <span className={this.state.formError.email.isBlank > 0 ? "u-popover" : "u-popover hidden" }>请输入电子邮箱</span>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div className="w-btn">
                <button className="u-return" type="button" onClick={this.onReturn}> 返回修改 </button>
                <button className="u-main" type="button"  onClick={this.handleSubmit}>填写网站信息</button>
                <button className="u-draft" type="button"  onClick={this.onSave}>保存草稿</button>
            </div>
        </div>
        );
    }
});


module.exports = CompanyInfo;