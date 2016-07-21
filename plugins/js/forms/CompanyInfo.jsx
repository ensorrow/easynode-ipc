import '../../css/index.css';
import React from 'react';
import { getRequest } from '../utils/Utility';
import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import CascadeSelect from '../widgets/CascadeSelect.jsx';
import FormValidator from '../utils/FormValidator';
import Toast from '../widgets/Toast.jsx';
import validator from 'validator';
import Global from '../utils/globals';
import assigner from 'object.assign';
var assign = assigner.getPolyfill();
import DataService from '../services/DataService.js';
import {IDTYPE, NATURE} from '../constants/define';
import { Button } from 'antd';

const FT = {
    'IDTYPE': 0,
    'NAME': 1,
    'LIVEADDRESS': 2,
    'COMMADDRESS':3,
    'OWNER':4,
    'OFFICEPHONENUMBER':5,
    'MOBILE':6,
    'EMAIL': 7,
    'RECORDNUMBER': 8,
    'RECORDPASSWORD': 9,
    'MANAGERADDRESS':10
};

let CompanyInfo = React.createClass({
    getInitialState: function () {
        return {
            processing : false,
            formError: {
                id: {isBlank: false, checked: true},
                province: {isBlank: false},
                city: {isBlank: false},
                area: {isBlank: false, checked:true},
                nature: {isBlank: false},
                idtype: {isBlank: false, focus: false},
                idnumber: {isBlank: false, regularFail: false, match: function (str) {
                    return true;
                }},
                name: {isBlank: false, focus: false, regularFail: false, match: function (str) {
                    return true;// /^[\u4e00-\u9fa5]$/.test(str);
                }},
                liveaddress:  {isBlank: false, focus: false, regularFail: false, match: function (str) {
                    return true;
                }},
                commaddress: {isBlank: false, focus: false, regularFail: false, match: function (str) {
                    return true;
                }},
                owner: {isBlank: false, focus: false, regularFail: false, match: function (str) {
                    return true;
                }},
                managername: {isBlank: false, regularFail: false, match: function (str) {
                    return true;
                }},
                manageraddress: {isBlank: false, regularFail: false, match: function (str) {
                    return true;
                }},
                manageridtype:  {isBlank: false},
                manageridnumber: {isBlank: false, regularFail: false, match: function (str) {
                    return true;
                }},
                officephoneregion: {isBlank: false, checked:true},
                officephonenumber: {isBlank: false, focus: false, regularFail: false, match: function (str) {
                    return /\d{5}|\d{9}/.test(str);
                }},
                mobile: {isBlank: false, focus: false, regularFail: false, match: function (str) {
                    return validator.isMobilePhone(str, 'zh-CN');
                }},
                email: {isBlank: false, regularFail: false, match: function (str) {
                    return validator.isEmail(str);
                }},
                recordnumber: {isBlank: false},
                recordpassword: {isBlank: false}
            },
            companyInfo: {
                province: '浙江省',
                city: '杭州市',
                area: '滨江区',
                nature: 0,
                idtype: 1,
                idnumber: '',
                name: '',
                liveaddress: '',
                commaddress: '',
                owner: '',
                managername: '',
                manageraddress:'',
                manageridtype: 0,
                manageridnumber: '',
              //  officephoneregion: '',
                officephonenumber: '',
                mobile: '',
                email: '',
                recordnumber: '',
                recordpassword: ''
            }
        };
    },
    handleFocus: function (id) {
        this.addressFocus(id, true);
    },
    handleBlur: function (id) {
        this.addressFocus(id, false);
    },
    addressFocus: function (id, focus) {
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
                   id == FT.EMAIL ? formError.email :
                   id == FT.RECORDNUMBER ? formError.recordnumber :
                   id == FT.RECORDPASSWORD ? formError.recordpassword :
                   id == FT.MANAGERADDRESS ? formError.manageraddress : formError.manageraddress;
        var val = id == FT.IDTYPE ? companyInfo.idtype :
                   id == FT.NAME ? companyInfo.name :
                   id == FT.LIVEADDRESS ? companyInfo.liveaddress :
                   id == FT.COMMADDRESS ? companyInfo.commaddress :
                   id == FT.OWNER ? companyInfo.owner :
                   id == FT.OFFICEPHONENUMBER ? companyInfo.officephonenumber :
                   id == FT.MOBILE ? companyInfo.mobile :
                   id == FT.EMAIL ? companyInfo.email :
                   id == FT.RECORDNUMBER ? companyInfo.recordnumber :
                   id == FT.RECORDPASSWORD ? companyInfo.recordpassword :
                   id == FT.MANAGERADDRESS ? companyInfo.manageraddress : companyInfo.manageraddress;

        ctrl.focus = focus;
        if( ctrl.hasOwnProperty('regularFail') && val.length > 0 ) {
            ctrl.regularFail = FormValidator.regular(val, ctrl.match);
            if( ctrl.focus == true ) {
                ctrl.regularFail = false;
            }
        }
        if( id == FT.RECORDPASSWORD ) {
            var me = this;
            setTimeout(function () {
                me.setState({
                    formError: formError
                });
            }, 300);
        }else{
            this.setState({
                formError: formError
            });
        }
    },
    resetFocus: function () {
        var formError = this.state.formError;
        for( var prop in formError ) {
            if( formError[prop].hasOwnProperty('focus') ) {
                formError[prop].focus = false;
            }
        }
    },
    validator: function (fieldName, value) {
        var formError = this.state.formError;

        formError[fieldName].isBlank = FormValidator.isEmpty(value);
        formError[fieldName].regularFail = FormValidator.regular(value, formError[fieldName].match);
        if( fieldName == 'id' ) {
            formError[fieldName].isBlank = false;
        }
        return formError;
    },
    getRecordNumber: function () {
        if( _g.baseinfo && _g.baseinfo.type > 0 ) {
            this.state.formError.recordnumber.checked = false;
            return (
                <div className="m-companyinfo-item">
                    <div className="item-label">
                        <span className="red f-fl">*</span><label>主体备案号:</label>
                    </div>
                    <div className="item-ctrl">
                        <input type="text" name="recordnumber" onChange={this.handleRecordNumber} value={this.state.companyInfo.recordnumber} onFocus={this.handleFocus.bind(this, FT.RECORDNUMBER)}/>
                        <span className={this.state.formError.recordnumber.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入主体备案</span>
                    </div>
                </div>

            );
        }else {
            this.state.formError.recordnumber.checked = true;
        }
    },
    getRecordPassword: function () {
        if( _g.baseinfo && _g.baseinfo.type > 0 ) {
            this.state.formError.recordpassword.checked = false;
            return (
                <div className="m-companyinfo-item">
                    <div className="item-label">
                        <span className="red f-fl">*</span><label>备案密码:</label>
                    </div>
                    <div className="item-ctrl">
                        <input type="text" name="recordpassword" onChange={this.handleRecordPassword} value={this.state.companyInfo.recordpassword} onFocus={this.handleFocus.bind(this, FT.RECORDPASSWORD)} onBlur={this.handleBlur.bind(this, FT.RECORDPASSWORD)}/>
                        <span className={this.state.formError.recordpassword.focus ? 'u-popover2' : 'u-popover2 hidden' }>登陆<a href="http://www.miibeian.gov.cn/state/outPortal/loginPortal.action" target="_blank" className="item-ctrl-a">工业和信息化部门网站</a>，点击找回密码</span>
                        <span className={this.state.formError.recordpassword.isBlank ? 'u-popover' : 'u-popover hidden' }><p>1、请输入备案密码</p></span>
                    </div>
                </div>
            );
        }else {
            this.state.formError.recordpassword.checked = true;
        }
    },
    checkForm: function () {
        var companyInfo = this.state.companyInfo;
        var formError;
        for( var field in companyInfo ) {
            if( companyInfo.hasOwnProperty(field) ) {
                formError = this.validator(field, companyInfo[field]);
            }
        }
        this.setState({
            formError: formError
        });

        return FormValidator.check(formError);
    },
    getMasterInfo: function () {
        var ret = '';
        var me = this;

        if( this.state.companyInfo.nature != '5' ) {
            this.state.formError.managername.checked = false;
            this.state.formError.manageraddress.checked = false;
            this.state.formError.manageridtype.checked = false;
            this.state.formError.manageridnumber.checked = false;
            this.state.formError.officephonenumber.checked = false;
            this.state.formError.mobile.checked = false;
            this.state.formError.email.checked = false;

            return (
                <fieldset>
                    <div className="m-companyinfo-legend"><span>主体单位负责人信息:</span></div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>负责人姓名:</label>
                        </div>
                        <div className="item-ctrl">
                            <input type="text" name="lpname" onChange={this.handleManagerName} value={this.state.companyInfo.managername} maxLength="30"/>
                            <span className={this.state.formError.managername.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入主体单位负责人信息</span>
                        </div>
                    </div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>负责人证件类型:</label>
                        </div>
                        <div className="item-ctrl">
                            <select onChange={this.handleManagerIdType} value={this.state.companyInfo.manageridtype}>
                                <option value ="0">请选择证件类型</option>
                                <option value ={IDTYPE.GR_SFZ}>身份证</option>
                                <option value={IDTYPE.GR_HZ}>护照</option>
                                <option value={IDTYPE.GR_JGZ}>军官证</option>
                                <option value={IDTYPE.GR_TBZ}>台胞证</option>
                            </select>
                            <span className={this.state.formError.manageridtype.isBlank ? 'u-popover' : 'u-popover hidden' }>请选择负责人证件类型</span>
                        </div>
                    </div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>负责人证件号码:</label>
                        </div>
                        <div className="item-ctrl">
                            <input type="text" name="npidentity" onChange={this.handleManagerIdNumber} value={this.state.companyInfo.manageridnumber} maxLength="20"/>
                            <span className={this.state.formError.manageridnumber.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入负责人证件号码</span>
                        </div>
                    </div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>负责人居住地址:</label>
                        </div>
                        <div className="item-ctrl">
                            <input type="text" name="manageraddress" onChange={this.handleManagerAddress} value={this.state.companyInfo.manageraddress} onFocus={me.handleFocus.bind(me, FT.MANAGERADDRESS)} onBlur={me.handleBlur.bind(me, FT.MANAGERADDRESS)} maxLength="50"/>
                            <span className={this.state.formError.manageraddress.isBlank > 0 ? 'u-popover' : 'u-popover hidden' }>请输入负责人地址</span>
                            <span className={this.state.formError.manageraddress.regularFail > 0 ? 'u-popover' : 'u-popover hidden' }>请输入负责人地址</span>
                        </div>
                    </div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>办公室电话:</label>
                        </div>
                        <div className="item-ctrl">
                            <input type="text" name="officerphone" onChange={this.handleOfficePhoneNumber} value={this.state.companyInfo.officephonenumber} onFocus={me.handleFocus.bind(me, FT.OFFICEPHONENUMBER)} onBlur={me.handleBlur.bind(me, FT.OFFICEPHONENUMBER)} minLength="8" maxLength="18"/>
                            <span className={this.state.formError.officephonenumber.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入办公室电话</span>
                            <span className={this.state.formError.officephonenumber.focus ? 'u-popover2' : 'u-popover2 hidden' }>1、请确保电话畅通能联系到本人</span>
                            <span className={this.state.formError.officephonenumber.regularFail ? 'u-popover' : 'u-popover hidden' }>请输入正确的办公室电话</span>
                        </div>
                    </div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>手机号码:</label>
                        </div>
                        <div className="item-ctrl">
                            <input type="text" name="mobilephone" min="1" max="10" onChange={this.handleMobile} value={this.state.companyInfo.mobile} onFocus={me.handleFocus.bind(me, FT.MOBILE)} onBlur={me.handleBlur.bind(me, FT.MOBILE)} maxLength="11"/>
                            <span className={this.state.formError.mobile.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入手机号码</span>
                            <span className={this.state.formError.mobile.focus ? 'u-popover2' : 'u-popover2 hidden' }>1、请确保电话畅通能联系到本人</span>
                            <span className={this.state.formError.mobile.regularFail ? 'u-popover' : 'u-popover hidden' }>请输入正确的手机号码</span>
                        </div>
                    </div>
                    <div className="m-companyinfo-item">
                        <div className="item-label">
                            <span className="red f-fl">*</span><label>电子邮箱:</label>
                        </div>
                        <div className="item-ctrl">
                            <input type="text" name="email" onChange={this.handleEmail} value={this.state.companyInfo.email} onFocus={me.handleFocus.bind(me, FT.EMAIL)} onBlur={me.handleBlur.bind(me, FT.EMAIL)} maxLength="50"/>
                            <span className={this.state.formError.email.isBlank > 0 ? 'u-popover' : 'u-popover hidden' }>请输入电子邮箱</span>
                            <span className={this.state.formError.email.regularFail > 0 ? 'u-popover' : 'u-popover hidden' }>请输入正确电子邮箱</span>
                        </div>
                    </div>
                </fieldset>
            );
        }else{
            this.state.formError.managername.checked = true;
            this.state.formError.manageraddress.checked = true;
            this.state.formError.manageridtype.checked = true;
            this.state.formError.manageridnumber.checked = true;
            this.state.formError.officephoneregion.checked = true;
            this.state.formError.officephonenumber.checked = true;

            this.state.formError.mobile.checked = false;
            this.state.formError.email.checked = false;
        }
    },
    handleSubmit: function (e) {
        e.preventDefault();
        if( this.state.processing ) {
            return;
        }

        var hasError = this.checkForm();


        if( hasError ) {
            this.setState({
                processing: false
            });
            return;
        }

        this.setState({
            processing: true
        });

        var me = this;
        this.onSave(function () {//TODO 原有的后端逻辑要保存必然会弹出草稿保存成功
            if(me.props.params.isChangeOwner == 'normalChange'){
                location.href = '#/fillsiteinfo/normalChange';
            } else{
                location.href = '#/fillsiteinfo/isChangeOwner';
            }
            me.setState({
                processing: false
            });
        }, function () {
            me.setState({
                processing: false
            });
        });

    },
    onSave: function (succ, err) {
        if( _g.companyinfo == undefined ) {
            _g.companyinfo = {};
        }

        _g.companyinfo = this.state.companyInfo;

        _g.drafttype = 2;

        // savedraft
        var reqData = JSON.stringify(_g);
        DataService.httpRequest('/savedraft', 'post', reqData, 'json', 'application/json', {},
            function (resp) {
                // {drafttype: formData.drafttype, id: r.insertId};
                if( resp.ret.drafttype == 2 ) {
                    _g.companyinfo.id = resp.ret.id;
                    Toast.show('保存草稿成功');

                    Global.set('global', _g);
                    if( typeof (succ) == 'function' ) {
                        succ();
                    }
                }
            },
            function (err2) {
                Toast.show('保存草稿失败');
            }
        );
    },
    onReturn: function () {
        location.href = '#/returntobase';
    },
    handleNature: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.nature = e.target.value;
        // Address idtype default value
        if( companyInfo.nature == NATURE.JD) {
            companyInfo.idtype = IDTYPE.JD_JDDH;
        }else if( companyInfo.nature == NATURE.ZFJG) {
            companyInfo.idtype = IDTYPE.ZFJG_ZZJGDMZS;
        }else if( companyInfo.nature == NATURE.SYDW) {
            companyInfo.idtype = IDTYPE.SY_ZZJGDMZ;
        }else if( companyInfo.nature == NATURE.QY) {
            companyInfo.idtype = IDTYPE.QY_GSYYZZ;
        }else if( companyInfo.nature == NATURE.GR) {
            companyInfo.idtype = IDTYPE.GR_SFZ;
        }else{
            companyInfo.idtype = IDTYPE.SFTT_STFRZS;
        }
        this.setState({companyInfo: companyInfo});
        /* if(parseInt(e.target.value) > 1){
            companyInfo.idtypeEnable = 1;
            this.setState({companyInfo: companyInfo});
        }*/
    },
    handleRegion: function (p, c, a) {
        var companyInfo = this.state.companyInfo;
        companyInfo.province = p;
        companyInfo.city = c;
        companyInfo.area = a;
        this.setState({companyInfo: companyInfo});
    },
    handleIdType: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.idtype = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleIdNumber: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.idnumber = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleRecordNumber: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.recordnumber = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleRecordPassword: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.recordpassword = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleName: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.name = e.target.value;
        this.setState({companyInfo: companyInfo});

    },
    handleLiveAddress: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.liveaddress = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleCommAddress: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.commaddress = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleOwner: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.owner = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleManagerName: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.managername = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleManagerAddress: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.manageraddress = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleManagerIdType: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.manageridtype = e.target.value;
        this.setState({companyInfo: companyInfo});
    },

    handleManagerIdNumber: function (e) {
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
    handleOfficePhoneNumber: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.officephonenumber = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleMobile: function (e) {
        e.preventDefault();
        var companyInfo = this.state.companyInfo;
        companyInfo.mobile = e.target.value;
        this.setState({companyInfo: companyInfo});
    },
    handleEmail: function (e) {
        e.preventDefault();

        var companyInfo = this.state.companyInfo;
        companyInfo.email = e.target.value;
        this.setState({companyInfo: companyInfo});
    },

    onClick: function (e) {
        e.preventDefault();
        window.location.href = '#/fillsiteinfo?a=a&b=b';
        getRequest();
    },

    tick: function () {
        this.onSave();
    },

    componentDidMount: function () {
        if(!this.props.params.isChangeOwner) {this.interval = setInterval(this.tick, 30 * 1000);}
        if( _g.companyinfo != undefined ) {
            this.setState( {companyInfo: assign( {}, this.state.companyInfo, _g.companyinfo) } );
        }
    },

    componentWillUnmount: function () {
        clearInterval(this.interval);
    },
    getIndividualMobile: function () {
        var me = this;
        if( this.state.companyInfo.nature == 5 ) {
            return (
                <div className="m-companyinfo-item">
                    <div className="item-label">
                        <span className="red f-fl">*</span><label>主体联系人手机号码:</label>
                    </div>
                    <div className="item-ctrl">
                        <input type="text" name="mobilephone" min="1" max="10" onChange={this.handleMobile} value={this.state.companyInfo.mobile} onFocus={me.handleFocus.bind(me, FT.MOBILE)} onBlur={me.handleBlur.bind(me, FT.MOBILE)} maxLength="11"/>
                        <span className={this.state.formError.mobile.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入手机号码</span>
                        <span className={this.state.formError.mobile.focus ? 'u-popover2' : 'u-popover2 hidden' }>1、请确保电话畅通能联系到本人</span>
                        <span className={this.state.formError.mobile.regularFail ? 'u-popover' : 'u-popover hidden' }>请输入正确的手机号码</span>
                    </div>
                </div>
            );
        }
    },
    getIndividualEmail: function () {
        var me = this;
        if( this.state.companyInfo.nature == 5 ) {
            return (
                <div className="m-companyinfo-item">
                    <div className="item-label">
                        <span className="red f-fl">*</span><label>主体联系人电子邮箱:</label>
                    </div>
                    <div className="item-ctrl">
                        <input type="text" name="email" onChange={this.handleEmail} value={this.state.companyInfo.email}
                               onFocus={me.handleFocus.bind(me, FT.EMAIL)} onBlur={me.handleBlur.bind(me, FT.EMAIL)}
                               maxLength="50"/>
                        <span className={this.state.formError.email.isBlank > 0 ? 'u-popover' : 'u-popover hidden' }>请输入电子邮箱</span>
                        <span
                            className={this.state.formError.email.regularFail > 0 ? 'u-popover' : 'u-popover hidden' }>请输入正确电子邮箱</span>
                    </div>
                </div>
            );
        }
    },
    getOptions: function (nature) {
        var me = this;
        if( nature == NATURE.JD ) {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                <option value ={IDTYPE.JD_JDDH}>军队代码</option>
                </select>
            );
        } else if( nature == NATURE.ZFJG ) {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                <option value ={IDTYPE.ZFJG_ZZJGDMZS}>组织机构代码证书</option>
                </select>
            );
        } else if( nature == NATURE.SYDW ) {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                <option value ={IDTYPE.SY_ZZJGDMZ}>组织机构代码证书</option>
                <option value ={IDTYPE.SY_FRZS}>事业法人证书</option>
                </select>
            );
        } else if( nature == NATURE.QY ) {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                <option value = {IDTYPE.QY_GSYYZZ}>工商营业执照</option>
                <option value = {IDTYPE.QY_ZZJGDMZS}>组织机构代码证书</option>
                </select>
            );
        } else if( nature == NATURE.GR ) {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                <option value ={IDTYPE.GR_SFZ}>身份证</option>
                <option value = {IDTYPE.GR_HZ}>护照</option>
                <option value = {IDTYPE.GR_JGZ}>军官证</option>
                <option value = {IDTYPE.GR_TBZ}>台胞证</option>
                </select>
            );
        } else if( nature == NATURE.SFTT ) {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                <option value = {IDTYPE.SFTT_STFRZS}>社团法人证书</option>
                <option value = {IDTYPE.SFTT_ZZJGDMZS}>组织机构代码证书</option>
                </select>
            );
        }
    },
    getIdType: function () {
        var me = this;
        if( this.state.companyInfo.nature > 0 ) {
            return this.getOptions(this.state.companyInfo.nature);
        } else {
            return (
                <select name="idtype" onChange={this.handleIdType} value={this.state.companyInfo.idtype} disabled="false" className="gray" onFocus={me.handleFocus.bind(me, FT.IDTYPE)} onBlur={me.handleBlur.bind(me, FT.IDTYPE)}>
                    <option value ="0">请选择主体单位证件类型</option>
                </select>
            );
        }
    },
    getIdTypeTips:function (nature) {
        var me = this;
        if( nature == NATURE.OTHER ) {
            return (
                <div className="item-ctrl">
                    {this.getIdType()}
                </div>
            );
        } else if( nature == NATURE.JD ) {
            return (
                <div className="item-ctrl">
                {this.getIdType()}
                <span className={this.state.formError.idtype.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、军队代码</p></span>
                </div>
            );
        } else if( nature == NATURE.ZFJG ) {
            return (
                <div className="item-ctrl">
                {this.getIdType()}
                <span className={this.state.formError.idtype.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、组织机构代码证书</p></span>
                </div>
            );
        } else if( nature == NATURE.SYDW ) {
            return (
                <div className="item-ctrl">
                    {this.getIdType()}
                    <span className={this.state.formError.idtype.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、级组机构代码证书</p><p>2、事业法人证书</p></span>
                </div>
            );
        } else if( nature == NATURE.QY ) {
            return (
                <div className="item-ctrl">
                    {this.getIdType()}
                    <span className={this.state.formError.idtype.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、工商营业执照</p><p>2、组织机构代码证书</p></span>
                </div>
            );
        } else if( nature == NATURE.GR ) {
            return (
                <div className="item-ctrl">
                    {this.getIdType()}
                    <span className={this.state.formError.idtype.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、身份证</p><p>2、护照</p><p>3、军官证</p><p>4、台胞证</p></span>
                </div>
            );
        } else if( nature == NATURE.SFTT ) {
            return (
                <div className="item-ctrl">
                    {this.getIdType()}
                    <span className={this.state.formError.idtype.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、社团法人证书</p><p>2、组织机构代码证书</p></span>
                </div>
            );
        }
    },

    render: function () {

        var me = this;
        let isChangeOwner = this.props.params.isChangeOwner;
        return (
            <div className="g-bd">
                <ReturnWidget/>
                <ProgressBar step={2} key={1}/>
                <div className="m-companyinfo">
                    <form className="">
                        <fieldset>
                            <div className="m-companyinfo-legend"><span>主体单位信息</span></div>
                            {this.getRecordNumber()}
                            {this.getRecordPassword()}
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位所属区域:</label>
                                </div>
                                <CascadeSelect onChange={this.handleRegion} isChangeOwner={isChangeOwner} province={this.state.companyInfo.province} city={this.state.companyInfo.city} area={this.state.companyInfo.area}/>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位性质:</label>
                                </div>
                                <div className="item-ctrl">
                                    <select name="nature" onChange={this.handleNature} value={this.state.companyInfo.nature}>
                                        <option value ="0">请选择主体单位的性质</option>
                                        <option value ="1">军队</option>
                                        <option value ="2">政府机关</option>
                                        <option value="3">企事业单位</option>
                                        <option value="4">企业</option>
                                        <option value="5">个人</option>
                                        <option value="6">社会团体</option>
                                    </select>
                                    <span className={this.state.formError.nature.isBlank ? 'u-popover' : 'u-popover hidden' }>请选择主体单位性质</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位证件类型:</label>
                                </div>
                                {this.getIdTypeTips(this.state.companyInfo.nature)}
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位证件号码:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="idnumber" onChange={this.handleIdNumber} value={this.state.companyInfo.idnumber} maxLength="30"/>
                                    <span className={this.state.formError.idnumber.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入主体单位号码</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位名称:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="name" onChange={this.handleName} value={this.state.companyInfo.name} onFocus={me.handleFocus.bind(me, FT.NAME)} onBlur={me.handleBlur.bind(me, FT.NAME)} maxLength="50"/>
                                    <span className={this.state.formError.name.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入主体单位名称</span>
                                    <span className={this.state.formError.name.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、必须输入与主体单位证件上一致的名称 </p><p>2、个人用户请填写个人姓名</p></span>
                                    <span className={this.state.formError.name.regularFail ? 'u-popover' : 'u-popover hidden' }>请正确输入单位名称</span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位证件住所:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="address" onChange={this.handleLiveAddress} value={this.state.companyInfo.liveaddress} onFocus={me.handleFocus.bind(me, FT.LIVEADDRESS)} onBlur={me.handleBlur.bind(me, FT.LIVEADDRESS)} maxLength="200"/>
                                    <span className={this.state.formError.liveaddress.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入主体单位住所地址</span>
                                    <span className={this.state.formError.liveaddress.focus ? 'u-popover2' : 'u-popover2 hidden' }>1、必须输入与主体单位证件上一致的地址 </span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>主体单位通讯地址:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="commaddress" onChange={this.handleCommAddress} value={this.state.companyInfo.commaddress} onFocus={me.handleFocus.bind(me, FT.COMMADDRESS)} onBlur={me.handleBlur.bind(me, FT.COMMADDRESS)} maxLength="200"/>
                                    <span className={this.state.formError.commaddress.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入主体单位通讯地址</span>
                                    <span className={this.state.formError.commaddress.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、必须输入真实准确的地址，精确到房间号</p><p>2、通信地址不能包含任何符号</p><p>3、通信地址选择的省市区必须与主体单位所属区</p></span>
                                </div>
                            </div>
                            <div className="m-companyinfo-item">
                                <div className="item-label">
                                    <span className="red f-fl">*</span><label>投资人或主管单位名称:</label>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="investorname" onChange={this.handleOwner} value={this.state.companyInfo.owner} onFocus={me.handleFocus.bind(me, FT.OWNER)} onBlur={me.handleBlur.bind(me, FT.OWNER)} maxLength="30"/>
                                    <span className={this.state.formError.owner.isBlank ? 'u-popover' : 'u-popover hidden' }>请输入投资人或主管单位名称</span>
                                    <span className={this.state.formError.owner.focus ? 'u-popover2' : 'u-popover2 hidden' }><p>1、单位用户在没有上级主管单位的情况下,建议填写主办单位全称或法人姓名</p><p>2、个人用户请填写个人姓名</p></span>
                                </div>
                            </div>
                            {this.getIndividualMobile()}
                            {this.getIndividualEmail()}
                        </fieldset>
                        {this.getMasterInfo()}
                    </form>
                </div>

                <ButtonList isChangeOwner={isChangeOwner} handleSubmit={this.handleSubmit} onReturn={this.onReturn} onSave={this.onSave}/>
            </div>
        );
    }
});
let ButtonList = React.createClass({
    propTypes: {
        isChangeOwner: React.PropTypes.string
    },
    render : function () {
        if(this.props.isChangeOwner == 'isChangeOwner'){
            return (
                <div className="w-btn">
                    <Button onClick={this.props.handleSubmit} type="primary">填写网站信息</Button>
                </div>
            )
        }else{
            return (
                <div className="w-btn">
                    <Button onClick={this.props.onReturn}> 返回修改 </Button>
                    <Button onClick={this.props.handleSubmit} type="primary">填写网站信息</Button>
                    <Button onClick={this.props.onSave}>保存草稿</Button>
                </div>
            )
        }
    }
});

module.exports = CompanyInfo;




