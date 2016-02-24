import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';
import es5 from '../es5-shim.min.js';
import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

let RecordInfo = React.createClass({

    getInitialState: function() {
        return {};
    },
    getRecordType: function(){
        return __globals__.baseinfo.type == 0 ? "首次备案" :
            __globals__.baseinfo.type == 1 ? "新增网站" : "新增接入";
    },
    getServerRegion: function(){
        return __globals__.baseinfo.serverregion == 0 ? "HZ1" : "HZ1";
    },
    getZone: function(){
        return __globals__.companyinfo.province +  __globals__.companyinfo.city + __globals__.companyinfo.area;
    },
    getNature: function(){
        return  __globals__.companyinfo.nature == 1 ? "军队" :
                __globals__.companyinfo.nature == 1 ? "政府机关" :
                __globals__.companyinfo.nature == 1 ? "事业单位" :
                __globals__.companyinfo.nature == 1 ? "企业" :
                __globals__.companyinfo.nature == 1 ? "个人" : "企业";
    },
    getIdType: function(){
        return  __globals__.companyinfo.type == 1 ? "工商执照" :
            __globals__.companyinfo.type == 1 ? "组织机构代码" : "组织机构代码";
    },
    getIdNumber: function(){
        return  __globals__.companyinfo.idnumber;
    },
    getDomain: function(){
        var domain = '';
        domain =  __globals__.siteinfo.domain;
        if( __globals__.siteinfo.domain1.length > 0 ){
            domain =  domain + ';';
            domain = domain + __globals__.siteinfo.domain1;
        }
        if( __globals__.siteinfo.domain2.length > 0 ){
            domain = domain + ';';
            domain =  domain + __globals__.siteinfo.domain2;
        }
        if( __globals__.siteinfo.domain3.length > 0 ){
            domain = domain + ';';
            domain =  domain +__globals__.siteinfo.domain3;
        }
        if( __globals__.siteinfo.domain4.length > 0 ){
            domain  =  domain + ';';
            domain  = domain + __globals__.siteinfo.domain4;
        }
        return domain;
    },
    getIp: function(){
        return   __globals__.siteinfo.ip.ip1 + '.' + __globals__.siteinfo.ip.ip2 + '.' + __globals__.siteinfo.ip.ip3 + '.' + __globals__.siteinfo.ip.ip4;
    },
    getAccessMethod: function(){
        var amObj = __globals__.siteinfo.accessmethod  ;
        var amStr = '';
        if( amObj.specialline ){
            amStr = amStr + "专线";
        }
        if( amObj.webhost ){
            amStr = amStr + "主机托管";
        }
        if( amObj.virtualhost ){
            amStr = amStr + "虚拟主机";
        }
        if( amObj.other ){
            amStr = amStr + "其他";
        }
        return amStr;
    },
    getLanguages: function(){

        var l  =  __globals__.siteinfo.languages;
        var lStr = '';
        if(l.chinese){
            lStr = lStr + "中文简体";
        }
        if(l.chinesetraditional){
            lStr = lStr + "中文繁体";
        }
        if(l.eglish){
            lStr = lStr + "英语";
        }
        if(l.japanese){
            lStr = lStr + "日文";
        }
        if(l.french){
            lStr = lStr + "法语";
        }
        if(l.spanish){
            lStr = lStr + "西班牙语";
        }
        if(l.arabic){
            lStr = lStr + "阿拉伯语";
        }
        if(l.russian){
            lStr = lStr + "俄罗斯语";
        }
        if(l.customize){
            lStr = lStr + l.customizeLang;
        }
        return lStr;
    },
    getManagerIdType: function(){
        return  __globals__.siteinfo.manageridtype == 1 ? "身份证" :
                __globals__.siteinfo.manageridtype == 2 ? "护照" :
                __globals__.siteinfo.manageridtype == 3 ? "军官证" :
                __globals__.siteinfo.manageridtype == 4 ? "台胞证" : "台胞证";
    },
    render: function () {
        var uppic;
        if( __globals__.baseinfo.status != 1
        &&
            __globals__.baseinfo.status != 2
        &&
            __globals__.baseinfo.status != 3
        ){
            uppic = (
                <fieldset>
                <div className="m-recordinfo-legend"><span>上传照片</span></div>
                <div className="m-recordinfo-item2">
                <div className="m-recordinfo-item-icon">
                <img src={__globals__.record.curtainurl} alt=""/>
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
                                    <label> {__globals__.companyinfo.name} </label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件住所:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.liveaddress}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>投资人或主管单位名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.owner}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位通信地址:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.commaddress}</label>
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
                                    <label>法人姓名:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.managername}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>法人证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getManagerIdType()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>法人证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.manageridnumber}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>办公室电话:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.officephonenumber}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>手机号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.mobile}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>电子邮箱:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.companyinfo.email}</label>
                                </div>
                            </div>
                        </fieldset>


                        <fieldset>
                            <div className="m-recordinfo-legend"><span>网站信息</span></div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{__globals__.siteinfo.name}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>ISP名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{__globals__.siteinfo.ispname}</label>
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
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站首页URL:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{__globals__.siteinfo.homeurl}</label>
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
                                    <label>{__globals__.siteinfo.servicecontent == "1" ?  "其它" : "其它"}</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>服务器放置地:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>{__globals__.siteinfo.serverregion == "1" ? "HZ1" : "HZ1"}</label>
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
                                    <label>{__globals__.siteinfo.managername}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>有效证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{this.getManagerIdType()}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>有效证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.siteinfo.manageridnumber}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>办公室电话:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.siteinfo.officephoneregion}-{__globals__.siteinfo.officephonenumber}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>手机号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.siteinfo.mobile}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>电子邮箱:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.siteinfo.email}</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>QQ帐号:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>{__globals__.siteinfo.qq}</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>上传资料</span></div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={__globals__.material.sitemanagerurl} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">主体单位负责人证件图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={__globals__.material.checklisturl} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">核验单图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={__globals__.material.protocolurl1} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">云平台服务协议第一页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={__globals__.material.protocolurl2} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">云平台服务协议第二页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={__globals__.material.securityurl1} alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">信息安全管理责任书第一页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src={__globals__.material.securityurl2} alt=""/>
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