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

import reqwest from 'reqwest';
import Toast from '../widgets/Toast.jsx';
import validator from 'validator';


const FT = {
    "IDTYPE": 0,
    "NAME": 1,
    "LIVEADDRESS": 2,
    "COMMADDRESS":3,
    "OWNER":4,
    "OFFICEPHONENUMBER":5,
    "MOBILE":6,
    "EMAIL": 7
};

let CompanyInfo = React.createClass({
    getInitialState: function() {
        return {
            processing : false,
            formError: {
                id: {isBlank: false, checked: true},
                province: {isBlank: false},
                city: {isBlank: false},
                area: {isBlank: false,checked:true},
                nature: {isBlank: false},
                idtype: {isBlank: false,focus: false},
                idnumber: {isBlank: false,regularFail: false, match: function(str){
                    return true;
                }},
                name: {isBlank: false,focus: false,regularFail: false, match: function(str){
                       return /^[\u4e00-\u9fa5]$/.test(str);
                }},
                liveaddress:  {isBlank: false,focus: false,regularFail: false, match: function(str){
                    return true;
                }},
                commaddress: {isBlank: false,focus: false,regularFail: false, match: function(str){
                    return true;
                }},
                owner: {isBlank: false,focus: false,regularFail: false, match: function(str){
                    return true;
                }},
                managername: {isBlank: false,regularFail: false, match: function(str){
                    return true;
                }},
                manageridtype:  {isBlank: false},
                manageridnumber: {isBlank: false,regularFail: false, match: function(str){
                    return true;
                }},
                officephoneregion: {isBlank: false,checked:true},
                officephonenumber: {isBlank: false,focus: false,regularFail: false, match: function(str){
                    return /\d{8}|\d{7}/.test(str);
                }},
                mobile: {isBlank: false,focus: false,regularFail: false, match: function(str){
                    return validator.isMobilePhone(str,"zh-CN");
                }},
                email: {isBlank: false,regularFail: false, match: function(str){
                    return validator.isEmail(str);
                }},
                recordnumber: {isBlank: false}
            },
            companyInfo: {
                province: '浙江省',
                city: '杭州市',
                area: '滨江区',
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
                email: '',
                recordnumber: ''
            }
        };
    },
    handleFocus: function(id){
        this.addressFocus(id,true);
    },
    handleBlur: function(id){
        this.addressFocus(id,false);
    },
    addressFocus: function(id,focus){
        this.resetFocus();
        var formError = this.state.formError;
        var companyInfo = this.state.companyInfo;
        var ctrl = id == FT.IDTYPE ? formError.idtype :
                   id == FT.NAME ? formError.name :
                   id == FT.LIVEADDRESS ? formError.liveaddress :
                   id == FT.COMMADDRESS ? formError.commaddress :
                   id == FT.OWNER ? formError.owner :
                   id == FT.OFFICEPHONENUMBER ? formError.officephonenumber :
                   id == FT.MOBILE ? formError.mobile :
                   id == FT.EMAIL ? formError.email : formError.email;
        var val =  id == FT.IDTYPE ? companyInfo.idtype :
                   id == FT.NAME ? companyInfo.name :
                   id == FT.LIVEADDRESS ? companyInfo.liveaddress :
                   id == FT.COMMADDRESS ? companyInfo.commaddress :
                   id == FT.OWNER ? companyInfo.owner :
                   id == FT.OFFICEPHONENUMBER ? companyInfo.officephonenumber :
                   id == FT.MOBILE ? companyInfo.mobile :
                   id == FT.EMAIL ? companyInfo.email : companyInfo.email;

        ctrl.focus = focus;
        if( ctrl.hasOwnProperty("regularFail") && val.length > 0 ){
            ctrl.regularFail = FormValidator.regular(val, ctrl.match);
            if( ctrl.focus == true ){
                ctrl.regularFail = false;
            }
        }
        this.setState({
            formError: formError
        });
    },
    resetFocus: function(){
        var formError = this.state.formError;
        for( var prop in formError ){
            if( formError[prop].hasOwnProperty('focus') ){
                formError[prop].focus = false;
            }
        }
    },
    validator: function(fieldName,value){
        var formError = this.state.formError;
        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        formError[fieldName].regularFail = FormValidator.regular(value, formError[fieldName].match);
        if( fieldName == 'id' ){
            formError[fieldName].isBlank = false;
        }
        return formError;
    },
    getRecordNumber: function(){
        if( __globals__.baseinfo && __globals__.baseinfo.type > 0 ){
            this.state.formError.recordnumber.checked = false;
            return (
                <div className="m-companyinfo-item">
                    <div className="item-label">
                        <span className="red f-fl">*</span><label>主体备案号:</label>
                    </div>
                    <div className="item-ctrl">
                        <input type="text" name="identity"  onChange={this.handleRecordNumber} value={this.state.companyInfo.recordnumber} onFocus={this.handleFocus}/>
                        <span className={this.state.formError.recordnumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体备案</span>
                    </div>
                </div>
            );
        }else {
            this.state.formError.recordnumber.checked = true;
        }
    },
    checkForm: function(){
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

        return FormValidator.check(formError);
    },
    handleSubmit: function(e){
        e.preventDefault();
        if( this.state.processing ){
            return;
        }

        var hasError = this.checkForm();

        console.log(hasError);

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
        if( __globals__.companyinfo == undefined )
            __globals__.companyinfo = {};

        __globals__.companyinfo = this.state.companyInfo;

        __globals__.drafttype = 2;

        //savedraft
        reqwest({
            url: '/savedraft',
            method: 'post',
            data: JSON.stringify(__globals__),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                //{drafttype: formData.drafttype, id: r.insertId};
                if( resp.ret.drafttype == 2 ){
                    __globals__.companyinfo.id = resp.ret.id;
                    Toast.show("保存草稿成功");
                }
            },
            error: function(err){
                Toast.show("保存草稿失败");
            }
        });

    },
    onReturn: function(){
        location.href = "#/returntobase";
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
    },
    handleRegion: function(p,c,a){
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
    },
    handleIdNumber: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.idnumber = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleRecordNumber: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.recordnumber = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleName: function(e){
        e.preventDefault()
        var companyInfo = this.state.companyInfo;
        companyInfo.name = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleLiveAddress: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.liveaddress = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleCommAddress: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.commaddress = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleOwner: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.owner = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleManagerName: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.managername = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleManagerIdType: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.manageridtype = e.target.value;
        this.setState({companyInfo: companyInfo});
    },

    handleManagerIdNumber: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.manageridnumber = e.target.value;
        this.setState({companyInfo: companyInfo});
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
     },
    handleMobile: function(e){
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.mobile = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleEmail: function(e){
        e.preventDefault();

        var companyInfo = this.state.companyInfo;
        companyInfo.email = e.target.value;
        this.setState({companyInfo: companyInfo});
    },

    onClick: function(e){
        e.preventDefault();
        window.location.href = '#/fillsiteinfo?a=a&b=b';
        getRequest();
    },

    tick: function(){
        this.onSave();
    },

    componentDidMount: function(){
        this.interval = setInterval(this.tick, 30*1000);
        if( __globals__.companyinfo != undefined ) {
            this.setState( {companyInfo: Object.assign( {},this.state.companyInfo,__globals__.companyinfo) } );
        }
    },

    componentWillUnmount: function(){
        clearInterval(this.interval);
    },
    getIdType: function(){
        var me = this;
        if( this.state.companyInfo.nature > 0 ){
            return (
                <select  onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me,FT.IDTYPE)} onBlur={me.handleBlur.bind(me,FT.IDTYPE)}>
                    <option value ="0">请选择主体单位证件类型</option>
                    <option value ="1">工商执照</option>
                    <option value="2">组织机构代码</option>
                </select>
            );
        }
        else {
            return (
                <select onChange={this.handleIdType} value={this.state.companyInfo.idtype} disabled="false" className="gray" onFocus={me.handleFocus.bind(me,FT.IDTYPE)} onBlur={me.handleBlur.bind(me,FT.IDTYPE)}>
                    <option value ="0">请选择主体单位证件类型</option>
                    <option value ="1">工商执照</option>
                    <option value="2">组织机构代码</option>
                </select>
            );
        }
    },
    render: function () {

        var me = this;
        return (
            <div className="g-bd">
                <ReturnWidget/>
                <ProgressBar step={2} key={1}/>
                <div className="m-companyinfo">
                    <form className="">
                        <fieldset>
                            <div className="m-companyinfo-legend"><span>主体单位信息</span></div>
                            {this.getRecordNumber()}
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位所属区域:</label>
                                </div>
                                <CascadeSelect  onChange={this.handleRegion} province={this.state.companyInfo.province} city={this.state.companyInfo.city} area={this.state.companyInfo.area}/>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位性质:</label>
                                </div>
                                <div className="item-ctrl">
                                    <select onChange={this.handleNature} value={this.state.companyInfo.nature}>
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
                                    {this.getIdType()}
                                    <span className={this.state.formError.idtype.focus ? "u-popover2" : "u-popover2 hidden" }><p>1、企业建议选择工商执照</p><p>2、民办企业建议选择组织机构代码</p></span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位证件号码:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="identity"  onChange={this.handleIdNumber} value={this.state.companyInfo.idnumber} maxLength="30"/>
                                    <span className={this.state.formError.idnumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位号码</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位名称:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="name" onChange={this.handleName} value={this.state.companyInfo.name} onFocus={me.handleFocus.bind(me,FT.NAME)} onBlur={me.handleBlur.bind(me,FT.NAME)} maxLength="50"/>
                                    <span className={this.state.formError.name.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位名称</span>
                                    <span className={this.state.formError.name.focus ? "u-popover2" : "u-popover2 hidden" }><p>1、必须输入与主体单位证件上一致的名称 </p><p>2、个人用户请填写个人姓名</p></span>
                                    <span className={this.state.formError.name.regularFail ? "u-popover" : "u-popover hidden" }>请正确输入单位名称</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位证件住所:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="address" onChange={this.handleLiveAddress} value={this.state.companyInfo.liveaddress} onFocus={me.handleFocus.bind(me,FT.LIVEADDRESS)} onBlur={me.handleBlur.bind(me,FT.LIVEADDRESS)} maxLength="50"/>
                                    <span className={this.state.formError.liveaddress.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位信所地址</span>
                                    <span className={this.state.formError.liveaddress.focus ? "u-popover2" : "u-popover2 hidden" }>1、必须输入与主体单位证件上一致的地址 </span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位通讯地址:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="commaddress" onChange={this.handleCommAddress} value={this.state.companyInfo.commaddress} onFocus={me.handleFocus.bind(me,FT.COMMADDRESS)} onBlur={me.handleBlur.bind(me,FT.COMMADDRESS)} maxLength="50"/>
                                    <span className={this.state.formError.commaddress.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位通讯地址</span>
                                    <span className={this.state.formError.commaddress.focus ? "u-popover2" : "u-popover2 hidden" }><p>1、必须输入真实准确的地址，精确到房间号</p><p>2、通信地址不能包含任何符号</p><p>3、通信地址选择的省市区必须与主体单位所属区</p></span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>投资人或主管单位名称:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="investorname" onChange={this.handleOwner} value={this.state.companyInfo.owner} onFocus={me.handleFocus.bind(me,FT.OWNER)} onBlur={me.handleBlur.bind(me,FT.OWNER)} maxLength="30"/>
                                    <span className={this.state.formError.owner.isBlank ? "u-popover" : "u-popover hidden" }>请输入投资人或主管单位名称</span>
                                    <span className={this.state.formError.owner.focus ? "u-popover2" : "u-popover2 hidden" }><p>1、单位用户建议填写法人姓名或主办单位全称</p><p>2、个人用户请填写个人姓名</p></span>
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
                                    <input type="text" name="lpname" onChange={this.handleManagerName} value={this.state.companyInfo.managername} maxLength="30"/>
                                    <span className={this.state.formError.managername.isBlank ? "u-popover" : "u-popover hidden" }>请输入主体单位负责人信息</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>法人证件类型:</label>
                                </div>
                                <div className="item-ctrl">
                                    <select onChange={this.handleManagerIdType} value={this.state.companyInfo.manageridtype}>
                                        <option value ="0">请选择证件类型</option>
                                        <option value ="1">身份证</option>
                                        <option value="2">护照</option>
                                        <option value="3">军官证</option>
                                        <option value="4">台胞证</option>
                                    </select>
                                    <span className={this.state.formError.manageridtype.isBlank ? "u-popover" : "u-popover hidden" }>请选择法人证件类型</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>法人证件号码:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="npidentity" onChange={this.handleManagerIdNumber} value={this.state.companyInfo.manageridnumber} maxLength="20"/>
                                    <span className={this.state.formError.manageridnumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入法人证件号码</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>办公室电话:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="number" name="officerphone" min="1" max="10" onChange={this.handleOfficePhoneNumber} value={this.state.companyInfo.officephonenumber} onFocus={me.handleFocus.bind(me,FT.OFFICEPHONENUMBER)} onBlur={me.handleBlur.bind(me,FT.OFFICEPHONENUMBER)} maxLength="12"/>
                                    <span className={this.state.formError.officephonenumber.isBlank ? "u-popover" : "u-popover hidden" }>请输入办公室电话</span>
                                    <span className={this.state.formError.officephonenumber.focus ? "u-popover2" : "u-popover2 hidden" }>1、请确保电话畅通能联系到本人</span>
                                    <span className={this.state.formError.officephonenumber.regularFail ? "u-popover" : "u-popover hidden" }>请输入正确的办公室电话</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>手机号码:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="number" name="mobilephone" min="1" max="10" onChange={this.handleMobile} value={this.state.companyInfo.mobile} onFocus={me.handleFocus.bind(me,FT.MOBILE)} onBlur={me.handleBlur.bind(me,FT.MOBILE)} maxLength="11"/>
                                    <span className={this.state.formError.mobile.isBlank ? "u-popover" : "u-popover hidden" }>请输入手机号码</span>
                                    <span className={this.state.formError.mobile.focus ? "u-popover2" : "u-popover2 hidden" }>1、请确保电话畅通能联系到本人</span>
                                    <span className={this.state.formError.mobile.regularFail ? "u-popover" : "u-popover hidden" }>请输入正确的手机号码</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>电子邮箱:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email" onChange={this.handleEmail} value={this.state.companyInfo.email} onFocus={me.handleFocus.bind(me,FT.EMAIL)} onBlur={me.handleBlur.bind(me,FT.EMAIL)} maxLength="30"/>
                                    <span className={this.state.formError.email.isBlank > 0 ? "u-popover" : "u-popover hidden" }>请输入电子邮箱</span>
                                    <span className={this.state.formError.email.regularFail > 0 ? "u-popover" : "u-popover hidden" }>请输入正确电子邮箱</span>
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