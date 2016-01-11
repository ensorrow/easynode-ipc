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

import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

let CompanyInfo = React.createClass({
    render: function () {
        return (
        <div className="g-bd">
            <ReturnWidget/>
            <ProgressBar/>
            <div className="m-companyinfo">
                <form className="">
                    <fieldset>
                        <div className="m-companyinfo-legend"><span>主体单位信息</span></div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位所属区域:</label>
                            </div>
                            <div className="item-ctrl">
                                <select className="item-ctrl-three">
                                    <option value ="volvo">Volvo</option>
                                    <option value ="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <select className="item-ctrl-three">
                                    <option value ="volvo">Volvo</option>
                                    <option value ="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <select className="item-ctrl-three">
                                    <option value ="volvo">Volvo</option>
                                    <option value ="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位性质:</label>
                            </div>
                            <div>
                                <select  className="item-ctrl" >
                                    <option value ="volvo">Volvo</option>
                                    <option value ="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件类型:</label>
                            </div>
                            <div>
                                <select  className="item-ctrl" >
                                    <option value ="volvo">Volvo</option>
                                    <option value ="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件号码:</label>
                            </div>
                            <div>
                                <input type="text" name="identity" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位名称:</label>
                            </div>
                            <div>
                                <input type="text" name="name" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位证件住所:</label>
                            </div>
                            <div>
                                <input type="text" name="address" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>主体单位通讯地址:</label>
                            </div>
                            <div>
                                <input type="text" name="commaddress" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>投资人或主管单位名称:</label>
                            </div>
                            <div>
                                <input type="text" name="investorname" className="item-ctrl"/>
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="m-companyinfo-legend"><span>主体单位负责人信息:</span></div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人姓名:</label>
                            </div>
                            <div>
                                <input type="text" name="lpname" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人证件类型:</label>
                            </div>
                            <div>
                                <select  className="item-ctrl" >
                                    <option value ="volvo">Volvo</option>
                                    <option value ="saab">Saab</option>
                                    <option value="opel">Opel</option>
                                    <option value="audi">Audi</option>
                                </select>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>法人证件号码:</label>
                            </div>
                            <div>
                                <input type="text" name="npidentity" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>办公室电话:</label>
                            </div>
                            <div>
                                <input type="text" name="officerphone" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>手机号码:</label>
                            </div>
                            <div>
                                <input type="text" name="mobilephone" className="item-ctrl"/>
                            </div>
                        </div>
                        <div className="m-companyinfo-item">
                            <div className="item-label">
                                <span className="red f-fl">*</span><label>电子邮箱:</label>
                            </div>
                            <div>
                                <input type="text" name="email" className="item-ctrl"/>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div className="w-btn">
                <button className="u-return" type="button"><a href="#/returntobase">返回修改</a></button>
                <button className="u-main" type="button"><a href="#/fillsiteinfo">填写网站信息</a></button>
                <button className="u-draft" type="button"><a href="#/savetodraft">保存草稿</a></button>
            </div>
        </div>
        );
    }
});


module.exports = CompanyInfo;