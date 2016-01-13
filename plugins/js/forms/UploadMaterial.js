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
var Upload = ReactUI.Upload;

import ProgressBar from './ProgressBar.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

let UploadMaterial = React.createClass({
    render: function () {
        return (
            <div>
                <ReturnWidget/>
                <ProgressBar step={4} key={1}/>
                <div className="m-uploadmaterial">
                    <form className="">
                        <fieldset>
                            <div className="m-uploadmaterial-legend"><span>网站基本信息</span></div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>主体单位负责人证件图片:</label>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、需要上传身份证正反面合二为一复印件,需为彩色照片或扫描件,黑白照片无效,支持图片格式:JPEG\PNG\GIF</span>
                                    <span>2、不能包含公司、组织等企业性质的词语</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>核验单图片:</label>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、请点击下载 <a href="http://www.w3school.com.cn">《网站备案信息真实性核验单》</a>打印并按样例提示填写，不得涂改</span>
                                    <span>2、核验单上不要填写日期</span>
                                    <span>3、上传的核验单图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>4、请您保存3份签字并盖公章的核验单原件，以备后续环节使用</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>云平台服务协议第一页图片:</label>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、请点击下载 <a href="http://www.w3school.com.cn">《云平台服务协议》</a> 打印并按样例提示填写，不涂改</span>
                                    <span>2、上传的核验单图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>3、请您保存2份签字并盖公章的协议原件，以备后续环节使用</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>云平台服务协议第二页图片:</label>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、支持图片格式:JPEG\PNG\GIF</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>信息安全管理责任书第一页图片:</label>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、请点击下载 <a href="http://www.w3school.com.cn">《信息安全管理责任书》</a>打印并按样例提示填写，不涂改</span>
                                    <span>2、上传的责任书图片需清晰完整（不缺少边际线），建议使用扫描件上传。支持图片格式：JPEG\PNG\GIF</span>
                                    <span>3、请您保存2份签字并盖公章的责任书原件，以备后续环节使用</span>
                                </div>
                            </div>
                            <div className="m-uploadmaterial-item">
                                <div className="m-uploadmaterial-label">
                                    <span className="red">*</span><label>信息安全管理责任书第二页图片:</label>
                                </div>
                                <div className="m-uploadmaterial-ctrl">
                                    <div className="m-uploadmaterial-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                </div>
                                <div className="m-uploadmaterial-desc">
                                    <span>1、支持图片格式:JPEG\PNG\GIF</span>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="w-btn">
                    <button className="u-return" type="button"><a href="#/returntobase">返回修改</a></button>
                    <button className="u-main" type="button"><a href="#/committrial">提交初审</a></button>
                    <button className="u-draft" type="button"><a href="#/savetodraft">保存草稿</a></button>
                </div>
            </div>
        );
    }
});



module.exports = UploadMaterial;