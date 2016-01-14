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

let UploadPhoto = React.createClass({
    render: function () {
        return (
            <div>
                <ReturnWidget/>
                <div className="m-uploadphoto">
                    <form className="">
                        <fieldset>
                            <div className="m-uploadphoto-tip">
                                <img src="../assets/yellowexclamationmark.png"></img><span>拍照需幕布作为背景，若您还没有申请幕布，我们将免费邮寄给您，约2-3个工作日。幕布无需寄回，您可留下反复使用。若已有幕布，请直接上传照片。</span>
                            </div>
                            <div className="m-uploadphoto-legend"><span>我没有幕布</span></div>
                            <div className="m-uploadphoto-item-1">
                                <div className="m-uploadphoto-ctrl">
                                    <input type="button" value="申请幕布"/>
                                    <Upload
                                        autoUpload={true}
                                        width={12}
                                        name="test"
                                        action="http://216.189.159.94:8080/upload"
                                        accept="image/png,image/jpeg,image/gif"
                                        limit={3}
                                        content={<Button><Icon icon="upload" /> 申请幕布</Button>}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="m-uploadphoto-legend"><span>我已有幕布</span></div>
                            <div className="m-uploadphoto-item">
                                <div className="m-uploadphoto-label">
                                    <label>图片:</label>
                                </div>
                                <div className="m-uploadphoto-ctrl">
                                    <div className="m-uploadphoto-ctrl-picture">
                                        <img src="../assets/view.png" alt=""/>
                                    </div>
                                    <input type="button" value="上传图片"/>
                                    <Upload
                                        autoUpload={true}
                                        width={12}
                                        name="test"
                                        action="http://216.189.159.94:8080/upload"
                                        accept="image/png,image/jpeg,image/gif"
                                        limit={3}
                                        content={<Button><Icon icon="upload" /> 申请幕布</Button>}
                                    />
                                </div>
                                <div className="m-uploadphoto-desc">
                                    <span>1、请认真阅读拍照说明，以节省审核时间。点击查看          <a href="http://www.w3school.com.cn">拍照说明</a></span>
                                    <span>2、支持照片格式：JPG\PNG\GIF\JPEG，大小建议4M以下</span>
                                    <span>3、请务必上传带有相关幕布背景的照片</span>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div className="w-btn">
                    <button className="u-main" type="button"><a href="#/fillsiteinfo">提交审核</a></button>
                </div>
            </div>
        );
    }
});



module.exports = UploadPhoto;