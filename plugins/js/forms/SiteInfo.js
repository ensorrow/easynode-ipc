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
                                    <input type="text" name="identity"/>
                                    <span className="u-popover">请输入网站名称</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站域名:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <label className="siteurl">www</label><input type="text" name="identity" className="siteurl-input"/>
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
                                        <label className="siteurl">http://</label><input type="text" name="identity" className="siteurl-input"/>
                                        <span className="u-popover">aaaa</span>
                                    </div>
                                </div>
                                <div className="m-siteinfo-item">
                                    <div className="item-label">
                                        <label>网站服务内容:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl">
                                        <select>
                                            <option value ="volvo">Volvo</option>
                                            <option value ="saab">Saab</option>
                                            <option value="opel">Opel</option>
                                            <option value="audi">Audi</option>
                                        </select>
                                        <span className="u-popover">请选择网站服务内容</span>
                                    </div>
                                </div>
                                <div className="m-siteinfo-item language">
                                    <div className="item-label ">
                                        <label>网站语言:</label>
                                        <span className="red f-fr">*</span>
                                    </div>
                                    <div className="item-ctrl f-fl languages">
                                        <label><input type="checkbox" name="1"/> <span>中文简体</span></label>
                                        <label><input type="checkbox" name="2"/> <span>中文繁体</span></label>
                                        <label><input type="checkbox" name="3"/> <span>英语</span></label>
                                        <label><input type="checkbox" name="4"/> <span>日语</span></label>
                                        <label><input type="checkbox" name="4"/> <span>法语</span></label>
                                        <label><input type="checkbox" name="4"/> <span>西班牙语</span></label>
                                        <label><input type="checkbox" name="4"/> <span>阿拉伯语</span></label>
                                        <label><input type="checkbox" name="4"/> <span>俄罗斯语</span></label>
                                        <label><input type="checkbox" name="4"/> <span>自定义:</span></label>
                                        <input type="text" name="identity" className="item-ctrl-customize-language"/>
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
                                    <input type="text" name="lpname"/>
                                    <span className="u-popover">请输入网站负责人姓名</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>有效证件类型:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <select>
                                        <option value ="volvo">Volvo</option>
                                        <option value ="saab">Saab</option>
                                        <option value="opel">Opel</option>
                                        <option value="audi">Audi</option>
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
                                    <input type="text" name="npidentity"/>
                                    <span className="u-popover">请输入有效证件号码</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>办公室电话:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="officerphone" className="item-ctrl-office-onefourth"/>
                                    <input type="text" name="officerphone" className="item-ctrl-office-threefourth"/>
                                    <span className="u-popover">请输入办公室电话</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>手机号码:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="mobilephone"/>
                                    <span className="u-popover">请输入手机号码</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>电子邮箱:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email"/>
                                    <span className="u-popover">请输入电子邮箱</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>QQ账号:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="email"/>
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
                                    <input type="text" name="lpname" className="gray" value="杭州网易雷火科技有限公司" disabled="true"/>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站IP地址:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="text" name="npidentity" className="item-ctrl-ip"/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip"/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip"/>
                                    <input type="text" name="npidentity" className="item-ctrl-ip"/>
                                    <span className="u-popover">请输入IP地址</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>网站接入方式:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="checkbox" name="专线"/><span>专线</span>
                                    <input type="checkbox" name="主机托管"/><span>主机托管</span>
                                    <input type="checkbox" name="虚拟主机"/><span>虚拟主机</span>
                                    <input type="checkbox" name="其他"/><span>其他</span>
                                    <span className="u-popover">请选择网站接入方式</span>
                                </div>
                            </div>
                            <div className="m-siteinfo-item">
                                <div className="item-label">
                                    <label>服务器放置地:</label>
                                    <span className="red f-fr">*</span>
                                </div>
                                <div className="item-ctrl">
                                    <input type="checkbox" name="HZ1" checked="checked"/><span>HZ1</span>
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