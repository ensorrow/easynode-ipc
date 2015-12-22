import  '../../css/global.css';
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

let UploadMaterial = React.createClass({
    render: function () {
        return (
            <div>
                <ProgressBar/>
                <div>
                    <Form layout="aligned" onSubmit={data => console.log(data)}>
                        <div>
                            <p>主体单位负责人证件图片:</p>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传图片</Button>}
                            />
                        </div>
                        <div>
                            <p>核验单图片:</p>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传图片</Button>}
                            />
                        </div>
                        <div>
                            <p>云平台服务协议第一页图片:</p>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传图片</Button>}
                            />
                        </div>
                        <div>
                            <p>云平台服务协议第二页图片:</p>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传图片</Button>}
                            />
                        </div>
                        <div>
                            <p>信息安全管理责任书第一页图片:</p>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传图片</Button>}
                            />
                        </div>
                        <div>
                            <p>信息安全管理责任书第二页图片:</p>
                            <Upload
                                autoUpload={true}
                                width={12}
                                name="test"
                                action="http://216.189.159.94:8080/upload"
                                accept="image/*"
                                limit={3}
                                content={<Button><Icon icon="upload" />上传图片</Button>}
                            />
                        </div>
                    </Form>
                    <Button className="w-btn button-large">返回修改</Button>
                    <Button className="w-btn u-main">提交初审</Button>
                    <Button className="w-btn u-draft">保存草稿</Button>
                </div>
            </div>
        );
    }
});



module.exports = UploadMaterial;