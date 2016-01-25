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

        console.log(__globals__.baseinfo);

        __globals__.drafttype = 1;

        //savedraft
        reqwest({
            url: '/savedraft',
            method: 'post',
            data: JSON.stringify(__globals__),
            type:'json',
            contentType: 'application/json',
            success: function(resp){
               console.log("savetodraft success",__globals__.drafttype);
                //{drafttype: formData.drafttype, id: r.insertId};
                if( resp.ret.drafttype == 1 ){
                    __globals__.baseinfo.id = resp.ret.id;
                }
            },
            error: function(err){
                //TODO
                console.log(err);
                console.log("savetodraft error",__globals__.drafttype);
            }
        });
    },
    componentDidMount: function(){
        if( __globals__.baseinfo != undefined ) {
            this.setState( __globals__.baseinfo );
        }
    },

    componentWillUnmount: function(){
        console.log("componentWillUnmount");
    },

    onChange: function(type, region){
        this.setState({type:type,serverregion: region});
    },
    onClick: function(){
        this.onSave();
        location.href = "#/fillcompanyinfo";
    },
    render: function () {
        console.log("render");
        console.log(this.state);
        return (
            <div classNameName="g-bd">
                <ReturnWidget/>
                <div classNameName="g-bdc">
                    <ProgressBar step={1} key={1}/>
                    <RecordType selected={this.state} onChange={this.onChange}/>
                    <div className="w-btn">
                        <button className="u-main" type="button" onClick={this.onClick}>开始填写主体信息</button>
                        <button className="u-draft" type="button" onClick={this.onSave}>保存草稿</button>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = BaseInfo;