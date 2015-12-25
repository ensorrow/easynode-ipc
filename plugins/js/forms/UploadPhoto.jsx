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

import ProgressBar from './ProgressBar';

let UploadPhoto = React.createClass({
    render: function () {
        return (
            <div>
                <div>
                    <p>我没有幕布</p>
                    <Button>申请幕布</Button>
                    <p>收货信息:</p><p>浙江省杭州市滨江区网商路599号 网易杭州研究院 张小川 13388984765</p>
                    <Button>修改</Button>
                </div>
                <div>
                    <Form layout="aligned" onSubmit={data => console.log(data)}>
                        <div>
                            <p>照片:</p>
                            <img src="" alt=""/>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传照片</Button>}
                            />
                            <p>1、请认真阅读拍照说明，以节省审核时间。点击查看拍照说明</p>
                            <p>2、支持照片格式：JPG\PNG\GIF\JPEG，大小建议4M以下</p>
                            <p>3、请务必上传带有相关幕布背景的照片!</p>
                        </div>
                    </Form>
                    <Button className="w-btn u-main">提交审核</Button>
                </div>
            </div>
        );
    }
});



module.exports = UploadPhoto;