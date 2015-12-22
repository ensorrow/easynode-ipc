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
var Checkbox = ReactUI.Checkbox;

import ProgressBar from './ProgressBar';

let ApplyCurtain = React.createClass({
    render: function () {
        return (
            <div>
                <p>申请幕布</p>
                <div>
                    <Form layout="aligned" onSubmit={data => console.log(data)}>
                        <div>
                            <p>幕布邮寄地址:</p>
                        </div>
                        <div>
                            <FormControl width={24} type="select" required={true} data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} filterAble={false} mult={false} min={1} max={1} />
                        </div>
                        <div>
                            <FormControl width={24} type="select" required={true} data={["杭州", "宁波", "温州"]} filterAble={false} mult={false} min={1} max={1} />
                        </div>
                        <div>
                            <FormControl width={24} type="select" required={true} data={["滨江区", "西湖区", "上城区"]} filterAble={false} mult={false} min={1} max={1} />
                        </div>
                        <div>
                            <Input
                                id={"id"}
                                type={"text"}        // text, email, alpha, alphanum, password, url, textarea, number, integer
                                placeholder={"address detail"} // 占位提示文字
                                readOnly={false}      // 只读，默认为 false
                                rows={1}           // 当 type 为 textarea 时需要设置
                            />
                        </div>
                        <div>
                            <p>收件人姓名:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>收件人手机号码:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <p>公司名称:</p>
                            <FormControl type="text" required={true} min={2} max={10} />
                        </div>
                        <div>
                            <Checkbox checked={true} readOnly={true} text="同意ICP备案系统快递供应商可以获取如上联系信息邮寄幕布" />
                        </div>
                    </Form>
                    <Button className="w-btn button-large">提交申请</Button>
                    <Button className="w-btn u-main">取消</Button>
                </div>
            </div>
        );
    }
});


module.exports = ApplyCurtain;