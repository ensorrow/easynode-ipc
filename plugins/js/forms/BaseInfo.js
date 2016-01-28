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
var Message =  ReactUI.Message;

import RecordType from './RecordType.jsx';
import ReturnWidget from '../widgets/ReturnWidget.jsx';

import ProgressBar from './ProgressBar.jsx';
import reqwest from 'reqwest';

let BaseInfo = React.createClass({

    getInitialState: function() {
        return {type:0,serverregion:"1"};
    },
    onSave: function(){
        if( __globals__.baseinfo == undefined )
            __globals__.baseinfo = {};
        __globals__.baseinfo.type = this.state.type;
        __globals__.baseinfo.serverregion = this.state.serverregion;


        __globals__.drafttype = 1;

        //savedraft
        reqwest({
            url: '/savedraft',
            method: 'post',
            data: JSON.stringify(__globals__),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
                //{drafttype: formData.drafttype, id: r.insertId};
                if( resp.ret.drafttype == 1 ){
                    __globals__.baseinfo.id = resp.ret.id;
                    Message.show("保存草稿成功");
                }
            },
            error: function(err){
                //TODO
                Message.show("保存草稿失败");
            }
        });
    },
    componentDidMount: function(){
        if( __globals__.baseinfo != undefined ) {
            this.setState( __globals__.baseinfo );
        }
    },

    componentWillUnmount: function(){
    },

    onChange: function(type, region){
        this.setState({type:type,serverregion: region});
    },
    handleSubmit: function(){
        this.onSave();
        location.href = "#/fillcompanyinfo";
    },
    render: function () {
        return (
            <div classNameName="g-bd">
                <ReturnWidget/>
                <div classNameName="g-bdc">
                    <ProgressBar step={1} key={1}/>
                    <RecordType selected={this.state} onChange={this.onChange}/>
                    <div className="w-btn">
                        <button className="u-main" type="button" onClick={this.handleSubmit}>开始填写主体信息</button>
                        <button className="u-draft" type="button" onClick={this.onSave}>保存草稿</button>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = BaseInfo;