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

import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

let RecordInfo = React.createClass({
    render: function () {
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
                                    <label>首次备案</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>主机区域:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>HZ1</label>
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
                                    <label>浙江省杭州市滨江区</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位性质:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>企业</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>工商执照</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>330100311363968</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>杭州朗和科技有限公司</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位证件住所:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>杭州市滨江区长河街道网商路599号4幢405室</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>投资人或主管单位名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>杭州朗和科技有限公司</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>主体单位通信地址:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>杭州市滨江区长河街道网商路599号4幢405室</label>
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
                                    <label>张小川</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>法人证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>身份证</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>法人证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>330107197505270043</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>办公室电话:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>0571-89852549</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>手机号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>13103768743</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>电子邮箱:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>zhangxiaochuan@corp.netse.com</label>
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
                                    <label>网易蜂巢</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>ISP名称:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>杭州网易雷火科技有限公司</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站域名:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>c.163.com/,c.163.com</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站IP地址:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>8.8.9.9</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站首页URL:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>https://c.163.com</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站接入方式:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>主机托管</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站服务内容:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>全SSD容器云</label>
                                </div>
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>服务器放置地:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>HZ1</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label-onetwo">
                                    <label>网站语言:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl-onetwo">
                                    <label>中文简体</label>
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
                                    <label>宋佳磊</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>有效证件类型:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>身份证</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>有效证件号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>330107197505270133</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>办公室电话:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>0571-89852518</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>手机号码:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>13405774355</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>电子邮箱:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>hzsonggalei@corp.netease.com</label>
                                </div>
                            </div>
                            <div className="m-recordinfo-item">
                                <div className="m-recordinfo-item-label">
                                    <label>QQ帐号:</label>
                                </div>
                                <div className="m-recordinfo-item-ctrl">
                                    <label>189677345</label>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>上传资料</span></div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">主体单位负责人证件图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">核验单图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">云平台服务协议第一页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">云平台服务协议第二页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">信息安全管理责任书第一页图片</span>
                            </div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">信息安全管理责任书第二页图片</span>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-recordinfo-legend"><span>上传照片</span></div>
                            <div className="m-recordinfo-item2">
                                <div className="m-recordinfo-item-icon">
                                    <img src="../assets/view.png" alt=""/>
                                </div>
                                <span className="m-recordinfo-item-icon-title">照片</span>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
});


module.exports = RecordInfo;