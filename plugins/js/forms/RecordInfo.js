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

let RecordInfo = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                    <p>基本信息</p>
                    <div>
                        <p>备案类型:</p> <p>首次备案</p>
                    </div>
                    <div>
                        <p>主机区域:</p> <p>HZ1</p>
                    </div>
                </div>
                <div>
                    <div>
                        <p>主体单位所属区域:</p> <p>浙江省杭州市滨江区</p>
                    </div>
                    <div>
                        <p>主体单位性质:</p> <p>企业</p>
                    </div>
                    <div>
                        <p>主体单位证件类型:</p> <p>工商执照</p>
                    </div>
                    <div>
                        <p>主体单位证件号码:</p> <p>330100311363968</p>
                    </div>
                    <div>
                        <p>主体单位名称:</p> <p>杭州朗和科技有限公司</p>
                    </div>
                    <div>
                        <p>主体单位证件住所:</p> <p>杭州市滨江区长河街道网商路599号4幢405室</p>
                    </div>
                    <div>
                        <p>主体单位通信地址:</p> <p>杭州市滨江区长河街道网商路599号4幢405室</p>
                    </div>
                    <div>
                        <p>投资人或主管单位名称:</p> <p>杭州朗和科技有限公司</p>
                    </div>
                    <div>
                        <p>法人姓名:</p> <p>张小川</p>
                    </div>
                    <div>
                        <p>法人证件类型:</p> <p>身份证</p>
                    </div>
                    <div>
                        <p>法人证件号码:</p> <p>330107197505270043</p>
                    </div>
                    <div>
                        <p>办公室电话:</p> <p>0571-89852549</p>
                    </div>
                    <div>
                        <p>手机号码:</p> <p>13103768743</p>
                    </div>
                    <div>
                        <p>电子邮箱:</p> <p>zhangxiaochuan@corp.netease.com</p>
                    </div>
                    <div>
                        <p>网站信息</p>
                    </div>
                    <div>
                        <p>网站名称:</p> <p>网易蜂巢</p>
                    </div>
                    <div>
                        <p>网站域名:</p> <p>c.163.com/，c.163.com/</p>
                    </div>
                    <div>
                        <p>网站首页URL:</p> <p>https://c.163.com/</p>
                    </div>
                    <div>
                        <p>网站服务内容:</p> <p>全SSD容器云</p>
                    </div>
                    <div>
                        <p>网站语言:</p> <p>中文简体</p>
                    </div>
                    <div>
                        <p>姓名:</p> <p>宋佳磊</p>
                    </div>
                    <div>
                        <p>有效证件类型:</p> <p>身份证</p>
                    </div>
                    <div>
                        <p>有效证件号码:</p> <p>330107197505270133</p>
                    </div>
                    <div>
                        <p>办公室电话:</p> <p>0571-89852518</p>
                    </div>
                    <div>
                        <p>手机号码:</p> <p>13405774355</p>
                    </div>
                    <div>
                        <p>电子邮箱:</p> <p>hzsongjialei@corp.netease.com</p>
                    </div>
                    <div>
                        <p>QQ账号:</p> <p>189677345</p>
                    </div>
                    <div>
                        <p>ISP名称:</p> <p>杭州网易雷火科技有限公司</p>
                    </div>
                    <div>
                        <p>网站IP地址:</p> <p>192.168.152.114</p>
                    </div>
                    <div>
                        <p>网站接入方式:</p> <p>主机托管</p>
                    </div>
                    <div>
                        <p>服务器放置地:</p> <p>HZ1</p>
                    </div>
                    <div>
                        <p>上传资源</p>
                    </div>
                    <div>
                        <p>主体单位负责人证件图片:</p>
                    </div>
                    <div>
                        <p>核验单图片:</p>
                    </div>
                    <div>
                        <p>云平台服务协议第一页图片:</p>
                    </div>
                    <div>
                        <p>云平台服务协议第二页图片:</p>
                    </div>
                    <div>
                        <p>信息安全管理责任书第一页图片:</p>
                    </div>
                    <div>
                        <p>信息安全管理责任书第二页图片:</p>
                    </div>

                </div>
            </div>
        );
    }
});


module.exports = RecordInfo;