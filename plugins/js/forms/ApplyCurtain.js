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
var Checkbox = ReactUI.Checkbox;

import ProgressBar from './ProgressBar.jsx';
import CascadeSelect from '../widgets/CascadeSelect2.jsx';

import Global from '../utils/globals';
import DataService from '../services/DataService.js';
import reqwest from 'reqwest';


let ApplyCurtain = React.createClass({

    handleRegion: function(p,c,a){
        this.setState({province: p, city: c, area: a});
    },
    getInitialState: function() {
        return {
            province:'',city:'',area:'',mailingaddress:'',recipient:'',recipientmobile:'',companyname:''};
    },
    componentDidMount: function(){
        if( __globals__.record != undefined ) {
            this.setState( __globals__.record );
        }
    },
    handleSubmit: function(){

        var data = {
            id:__globals__.record.id,
            mailingaddress: this.state.mailingaddress,
            recipient: this.state.recipient,
            recipientmobile: this.state.recipientmobile,
            companyname: this.state.companyname
        };

        //commit
        reqwest({
            url: '/record',
            method: 'put',
            data: JSON.stringify( data ),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                //{ true|false }
                console.log(resp);

                var onHidden = this.props.onHidden;
                onHidden && onHidden();
            },
            error: function(err){
                //TODO
            }
        });

        location.href = "#/submitchecksuccess";
    },
    handleCancel: function(){
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
        //location.href = "#/uploadphoto";
    },
    handleMailingAddress: function(e){
        e.preventDefault();
        var val = e.target.value;
        this.setState({mailingaddress: val});
    },
    handleRecipient: function(e){
        e.preventDefault();
        var val = e.target.value;
        this.setState({recipient: val});
    },
    handleRecipientMobile: function(e){
        e.preventDefault();
        var val = e.target.value;
        this.setState({recipientmobile: val});
    },
    handleCompanyName: function(e){
        e.preventDefault();
        var val = e.target.value;
        this.setState({companyname: val});
    },
    handleAgreement: function(e){

    },
    render: function () {
        // <CascadeSelect  onChange={this.handleRegion} province={this.state.province} city={this.state.city} area={this.state.area}/>

        return (
            <div className="m-applycurtain">
                <div className="m-applycurtain-header"><label>申请幕布</label><img src="../assets/close.png" onClick={this.handleCancel}></img></div>
                <div className="m-applycurtain-bd">
                    <div className="m-applycurtain-bd-tip">
                        <img src="../assets/yellowexclamationmark.png"></img>
                        <label>提交申请后，我们将尽快寄出幕布，您收到后也请及时拍照并上传。</label>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>幕布邮寄地址:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" placeholder="详细地址" onChange={this.handleMailingAddress} value={this.state.mailingaddress}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>收件人姓名:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text"  name="identity"  onChange={this.handleRecipient} value={this.state.recipient}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <span>*</span> <label>收件人手机号:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" onChange={this.handleRecipientMobile} value={this.state.recipientmobile}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">
                            <label>公司名称:</label>
                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <input type="text" name="identity" onChange={this.handleCompanyName} value={this.state.companyname}/>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">

                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <label><input type="checkbox" name="1" checked="true" className="" onChange={this.handleAgreement}/> <span className="small-font">同意ICP备案系统快递供应商可以获取如上联系信息邮寄幕布</span></label>
                        </div>
                    </div>
                    <div className="m-applycurtain-item">
                        <div className="m-applycurtain-item-label">

                        </div>
                        <div className="m-applycurtain-item-ctrl">
                            <button className="u-commit" type="button" onClick={this.handleSubmit}>提交申请</button>
                            <button className="u-cancel" type="button" onClick={this.handleCancel}>取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = ApplyCurtain;