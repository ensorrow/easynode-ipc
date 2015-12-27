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


let RecordType = React.createClass({
    render: function () {
        return (
            <div className="m-recordtype">
                <div className="recordtype">
                    <div className="type">
                        <span className="red">* </span><span>备案类型:</span>
                    </div>

                    <ul className="select-list">
                        <li className="item">
                            <div className="item-icon">
                                <img src="../assets/first.png" alt=""/>
                                <span className="title">首次备案</span>
                            </div>
                            <span className="item-describe">域名未备案,备案主体证件无备案号,需要备案</span>
                        </li>

                        <li className="item">
                            <div className="item-icon">
                                <img src="../assets/addsite.png" alt=""/>
                                <span className="title">新增网站</span>
                            </div>
                            <span className="item-describe">主体已经备过案,需要再给其它网站备案.</span>
                        </li>
                        <li className="item">
                            <div className="item-icon">
                                <img src="../assets/import.png" alt=""/>
                                    <span className="title">新增接入</span>
                            </div>
                            <span className="item-describe">域名在别的接入商备案过,需要变更接入商.</span>
                        </li>
                    </ul>
                </div>

                <div className="clear"></div>

                <div className="recordarean">
                    <div className="area">
                        <span className="red">* </span><span>主机区域:</span>
                    </div>

                    <ul className="select-list">
                        <li className="item-2">
                            <span className="title">HZ1</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});


module.exports = RecordType;
