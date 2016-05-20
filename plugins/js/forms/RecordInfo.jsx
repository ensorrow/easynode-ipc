import '../../css/index.css';
import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';
import {IDTYPE, NATURE} from '../constants/define';

let RecordInfo = React.createClass({

    getInitialState: function () {
        return {};
    },
    getRecordType: function () {
        return _g.baseinfo.type == 0 ? '首次备案' :
            _g.baseinfo.type == 1 ? '新增网站' : '新增接入';
    },
    getServerRegion: function () {
        return _g.baseinfo.serverregion == 0 ? 'HZ1' : 'HZ1';
    },
    getZone: function () {
        return _g.companyinfo.province + _g.companyinfo.city + _g.companyinfo.area;
    },
    getNature: function () {
        var arr = ['军队', '政府机关', '事业单位', '企业', '个人', '社会团体'];
        return arr[_g.companyinfo.nature - 1];
    },
    getIdType: function () {
        var arr = ['工商营业执照', '身份证', '组织机构代码证书', '事业法人证书', '军队代码', '社团法人证书', '护照', '军官证', '组织机构代码证书', '组织机构代码证书', '台胞证', '组织机构代码证书'];
        return arr[_g.companyinfo.idtype - 1];
    },
    getPrechecktype: function () {
        var arr = ['暂无', '新闻', '出版', '教育', '医疗保健', '药品和医疗器械', '电子公告服务', '文化'];
        if( _g.siteinfo.prechecktype ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>前置或专项审批类型:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{ arr[_g.siteinfo.prechecktype] }</label>
                    </div>
                </div>
            );
        }
    },
    getChecknumber: function () {
        if( _g.siteinfo.prechecktype > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>审批号:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{ _g.siteinfo.checknumber }</label>
                    </div>
                </div>
            );
        }
    },
    getCheckfileurl: function () {
        if( _g.siteinfo.prechecktype > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>审批文件:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{ _g.siteinfo.checkfileurl }</label>
                    </div>
                </div>
            );
        }
    },
    getIndividualMobile: function () {
        if( _g.companyinfo.nature == 5 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>主体联系人手机号码:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.mobile}</label>
                    </div>
                </div>
            );
        }
    },
    getIndividualEmail: function () {
        if( _g.companyinfo.nature == 5 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>主体联系人电子邮箱:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.email}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner1: function () {
        if( _g.companyinfo.nature != 5 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>负责人姓名:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.managername}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner2: function () {
        if( _g.companyinfo.nature != NATURE.GR ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>负责人证件类型:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{this.getCompanyManagerIdType()}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner3: function () {
        if( _g.companyinfo.nature != NATURE.GR ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>负责人证件号码:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.manageridnumber}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner4: function () {
        if( _g.companyinfo.nature != NATURE.GR ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>负责人居住地址:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.manageraddress}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner5: function () {
        if( _g.companyinfo.nature != NATURE.GR ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>办公室电话:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.officephonenumber}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner6: function () {
        if( _g.companyinfo.nature != NATURE.GR ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>手机号码:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.mobile}</label>
                    </div>
                </div>
            );
        }
    },
    getOwner7: function () {
        if( _g.companyinfo.nature != NATURE.GR ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                        <label>电子邮箱:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{_g.companyinfo.email}</label>
                    </div>
                </div>
            );
        }
    },
    getIdNumber: function () {
        return _g.companyinfo.idnumber;
    },
    getDomain: function () {
        var domain = '';
        domain = _g.siteinfo.domain;
        return domain;
    },
    getDomain1: function () {
        if( _g.siteinfo.domain1.length > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label-onetwo">
                        <label>网站域名1:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl-onetwo">
                        <label>{_g.siteinfo.domain1}</label>
                    </div>
                </div>
            );
        }
    },
    getDomain2: function () {
        if( _g.siteinfo.domain2.length > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label-onetwo">
                        <label>网站域名2:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl-onetwo">
                        <label>{_g.siteinfo.domain2}</label>
                    </div>
                </div>
            );
        }
    },
    getDomain3: function () {
        if( _g.siteinfo.domain3.length > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label-onetwo">
                        <label>网站域名3:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl-onetwo">
                        <label>{_g.siteinfo.domain3}</label>
                    </div>
                </div>
            );
        }
    },
    getDomain4: function () {
        if( _g.siteinfo.domain4.length > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label-onetwo">
                        <label>网站域名4:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl-onetwo">
                        <label>{_g.siteinfo.domain4}</label>
                    </div>
                </div>
            );
        }
    },
    getIp: function () {
        return _g.siteinfo.ip.ip1 + '.' + _g.siteinfo.ip.ip2 + '.' + _g.siteinfo.ip.ip3 + '.' + _g.siteinfo.ip.ip4;
    },
    getAccessMethod: function () {
        var amObj = _g.siteinfo.accessmethod;
        var amStr = '';
        if( amObj.specialline ) {
            amStr = amStr + '专线';
        }
        if( amObj.webhost ) {
            amStr = amStr + '主机托管';
        }
        if( amObj.virtualhost ) {
            amStr = amStr + '虚拟主机';
        }
        if( amObj.other ) {
            amStr = amStr + '其他';
        }
        return amStr;
    },
    getLanguages: function () {

        var l = _g.siteinfo.languages;
        var lStr = '';
        if(l.chinese) {
            lStr = lStr + '中文简体';
        }
        if(l.chinesetraditional) {
            lStr = lStr + '中文繁体';
        }
        if(l.eglish) {
            lStr = lStr + '英语';
        }
        if(l.japanese) {
            lStr = lStr + '日文';
        }
        if(l.french) {
            lStr = lStr + '法语';
        }
        if(l.spanish) {
            lStr = lStr + '西班牙语';
        }
        if(l.arabic) {
            lStr = lStr + '阿拉伯语';
        }
        if(l.russian) {
            lStr = lStr + '俄罗斯语';
        }
        if(l.customize) {
            lStr = lStr + l.customizeLang;
        }
        return lStr;
    },
    getWebsiteManagerIdType: function () {
        return _g.siteinfo.manageridtype == IDTYPE.GR_SFZ ? '身份证' :
                _g.siteinfo.manageridtype == IDTYPE.GR_HZ ? '护照' :
                _g.siteinfo.manageridtype == IDTYPE.GR_JGZ ? '军官证' :
                _g.siteinfo.manageridtype == IDTYPE.GR_TBZ ? '台胞证' : '未知';
    },
    getCompanyManagerIdType: function () {
        return _g.companyinfo.manageridtype == IDTYPE.GR_SFZ ? '身份证' :
                _g.companyinfo.manageridtype == IDTYPE.GR_HZ ? '护照' :
                _g.companyinfo.manageridtype == IDTYPE.GR_JGZ ? '军官证' :
                _g.companyinfo.manageridtype == IDTYPE.GR_TBZ ? '台胞证' : '未知';
    },

    getSiteRecordNumber: function () {
        return _g.companyinfo.recordnumber;
    },
    getRecordNumber: function () {
        if( _g.baseinfo && _g.baseinfo.type > 0 ) {
            return (
                <div className="m-recordinfo-item">
                    <div className="m-recordinfo-item-label">
                       <label>主体备案号:</label>
                    </div>
                    <div className="m-recordinfo-item-ctrl">
                        <label>{this.getSiteRecordNumber()}</label>
                    </div>
                </div>
            );
        }
    },
    render: function () {
        var uppic;
        if( _g.baseinfo.status != 1
        &&
            _g.baseinfo.status != 2
        &&
            _g.baseinfo.status != 3
        ) {
            uppic = (
                <fieldset>
                <div className="m-recordinfo-legend"><span>上传照片</span></div>
                <div className="m-recordinfo-item2">
                <div className="m-recordinfo-item-icon">
                <img src={_g.record.curtainurl} alt=""/>
                </div>
                <span className="m-recordinfo-item-icon-title">照片</span>
                </div>
                </fieldset>
            );
        }
        return (
            <div>
                <ReturnWidget/>
                <div className="m-recordinfo">
                    <form className="">
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>基本信息</span></div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>备案类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{this.getRecordType()}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>主机区域:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{this.getServerRegion()}</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>主体信息</span></div>
                            {this.getRecordNumber()}
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位所属区域:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getZone()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位性质:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getNature()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getIdType()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getIdNumber()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label> {_g.companyinfo.name} </label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件住所:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.companyinfo.liveaddress}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>投资人或主管单位名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.companyinfo.owner}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位通信地址:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.companyinfo.commaddress}</label>
                                </div>
                            </div>
                            {this.getIndividualMobile()}
                            {this.getIndividualEmail()}
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                </div>
                            </div>
                            {this.getOwner1()}
                            {this.getOwner2()}
                            {this.getOwner3()}
                            {this.getOwner4()}
                            {this.getOwner5()}
                            {this.getOwner6()}
                            {this.getOwner7()}
                        </fieldset>
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>网站信息</span></div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{_g.siteinfo.name}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>ISP名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{_g.siteinfo.ispname}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站域名:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{this.getDomain()}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站IP地址:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{this.getIp()}</label>
                                </div>
                            </div>
                            {this.getDomain1()}
                            {this.getDomain2()}
                            {this.getDomain3()}
                            {this.getDomain4()}
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站首页URL:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{_g.siteinfo.homeurl}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站接入方式:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{this.getAccessMethod()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站服务内容:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{_g.siteinfo.servicecontent == '1' ? '其它' : '其它'}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>服务器放置地:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{_g.siteinfo.serverregion == '1' ? 'HZ1' : 'HZ1'}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站语言:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{this.getLanguages()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>姓名:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.siteinfo.managername}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>有效证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getWebsiteManagerIdType()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>有效证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.siteinfo.manageridnumber}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>办公室电话:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.siteinfo.officephoneregion}-{_g.siteinfo.officephonenumber}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>手机号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.siteinfo.mobile}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>电子邮箱:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.siteinfo.email}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>QQ帐号:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{_g.siteinfo.qq}</label>
                                </div>
                            </div>
                            {this.getPrechecktype()}
                            {this.getChecknumber()}
                            {this.getCheckfileurl()}
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                <label>备注:</label>
                            </div>
                            <div className="m-recordinfo-item-ctrl">
                                <label>{_g.siteinfo.remark}</label>
                            </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>上传资料</span></div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={_g.material.sitemanagerurl} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">主体单位负责人证件图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={_g.material.checklisturl} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">核验单图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={_g.material.protocolurl1} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">云平台服务协议第一页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={_g.material.protocolurl2} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">云平台服务协议第二页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={_g.material.securityurl1} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">信息安全管理责任书第一页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={_g.material.securityurl2} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">信息安全管理责任书第二页图片</span>
                            </div>
                        </fieldset>
                        {uppic}
                    </form>
                </div>
            </div>
        );
    }
});


module.exports = RecordInfo;

