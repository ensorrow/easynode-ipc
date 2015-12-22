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

import ProgressBar from './ProgressBar';

let SiteInfo = React.createClass({
    render: function () {
        return (
            <div>
                <ProgressBar/>
                <div>
                    <Form layout="aligned" onSubmit={data => console.log(data)}>
                        <div>
                            <p>网站基本信息</p>
                        </div>
                        <div>
                            <p>网站名称:</p>
                            <FormControl required={true} type="text" min={2} max={10}/>
                        </div>
                        <div>
                            <p>网站域名:</p>
                            <p>www.</p>
                            <FormControl required={true} type="text" min={2} max={10}/>
                            <div>
                                <Button className="w-btn button-large">+增加网站域名</Button>
                            </div>
                        </div>
                        <div>
                            <p>网站首页URL:</p>
                            <p>http://</p>
                            <FormControl type="url" />
                        </div>
                        <div>
                            <p>网站服务内容:</p>
                            <FormControl width={24} type="select" required={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} filterAble={false} mult={false} min={1} max={1} />
                        </div>
                        <div>
                            <p>网站语言:</p>
                            <CheckboxGroup inline={true} data={[
                                  { "id": "nanjing", "text": "中文" },
                                  { "id": "beijing", "text": "英文" }
                                ]} />
                        </div>
                        <div>
                            <p>网站负责人基本信息:</p>
                        </div>
                        <div>
                            <p>姓名:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>有效证件类型:</p>
                            <FormControl width={24} type="select" required={true} data={["身份证", "护照", "军官证", "台胞证"]} filterAble={false} mult={false} min={1} max={1} />
                        </div>
                        <div>
                            <p>有效证件号码:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>办公定电话:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                            <p>---</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>手机号码:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>电子邮箱:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>QQ账号:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>

                        <div>
                            <p>ICP备案网站接入信息</p>
                        </div>
                        <div>
                            <p>ISP名称:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>网站IP地址:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>网站接入方式:</p>
                            <FormControl name="checkboxgroup" data={["专线","主机托管","虚拟主机","其它"]} label="checkbox group" type="checkbox-group" />
                        </div>
                        <div>
                            <p>服务器放置地:</p>
                            <FormControl name="checkboxgroup" data={["HZ1"]} label="checkbox group" type="checkbox-group" />
                        </div>
                    </Form>
                    <Button className="w-btn button-large">返回修改</Button>
                    <Button className="w-btn u-main">上传资料</Button>
                    <Button className="w-btn u-draft">保存草稿</Button>
                </div>
            </div>
        );
    }
});


module.exports = SiteInfo;