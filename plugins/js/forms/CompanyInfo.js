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

import ProgressBar from './ProgressBar';

let CompanyInfo = React.createClass({
    render: function () {
        return (
        <div>
            <ProgressBar/>
            <div>
                <Form layout="aligned" onSubmit={data => console.log(data)}>
                    <div>
                        <p>主体单位信息</p>
                    </div>
                    <div>
                        <p>主体单位所属区域:</p>
                        <FormControl width={24} type="select" required={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} filterAble={false} mult={false} min={1} max={1} />
                    </div>
                    <div>
                        <FormControl width={24} type="select" required={true} data={["杭州", "宁波", "温州"]} filterAble={false} mult={false} min={1} max={1} />
                    </div>
                    <div>
                        <FormControl width={24} type="select" required={true} data={["滨江区", "西湖区", "上城区"]} filterAble={false} mult={false} min={1} max={1} />
                    </div>
                    <div>
                        <p>主体单位性质:</p>
                        <FormControl width={24} type="select" required={true} data={["军队", "政府机关", "事业单位", "企业", "个人"]} filterAble={false} mult={false} min={1} max={1} />
                    </div>
                    <div>
                        <p>主体单位证件类型:</p>
                        <FormControl width={24} type="select" required={true} data={["工商执照","组织机构代码"]} filterAble={false} mult={false} min={1} max={1} />
                    </div>
                    <div>
                        <p>主体单位证件号码:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>主体单位名称:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>主体单位证件住所:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>主体单位通信地址:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>投资人或主管单位名称:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>主体单位负责人信息</p>
                    </div>
                    <div>
                        <p>法人姓名:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>法人证件类型:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>法人证件号码:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                    </div>
                    <div>
                        <p>办公室电话:</p>
                        <FormControl type="text" required={true} min={2} max={10} />
                        <p>-----</p>
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
                </Form>
                <Button className="w-btn button-large">返回列表</Button>
                <Button className="w-btn u-main">填写网站信息</Button>
                <Button className="w-btn u-draft">保存草稿</Button>
            </div>
        </div>
        );
    }
});


module.exports = CompanyInfo;