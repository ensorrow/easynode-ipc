import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


var data = [
    {id:0, src: '../assets/first.png',title: '首次备案',describe: '域名未备案,备案主体证件无备案号,需要备案'},
    {id:1, src: '../assets/addsite.png',title: '新增网站',describe: '主体已经备过案,需要再给其它网站备案.'},
    {id:2, src: '../assets/import.png',title: '新增接入',describe: '域名在别的接入商备案过,需要变更接入商.'}
];

let RecordType = React.createClass({

    render: function () {
        var me = this;
        var itemsList = data.map(function(item){
                return (
                    <li className={me.props.selected.type == item.id ? "item selected" : "item"} onClick={me.handleSelectType.bind(me,item.id)} key={item.id}>
                        <div className="item-icon">
                            <img src={item.src} alt=""/>
                            <span className="title">{item.title}</span>
                        </div>
                        <span className="item-describe">{item.describe}</span>
                    </li>
                );
        });

        return (
            <div className="m-recordtype">
                <div className="recordtype">
                    <div className="type">
                        <span className="red">* </span><span>备案类型:</span>
                    </div>

                    <ul className="ul-items">
                        {itemsList}
                    </ul>
                </div>


                <div className="recordarea">
                    <div className="area">
                        <span className="red">* </span><span>主机区域:</span>
                    </div>

                    <ul className="ul-items">
                        <li className="item-2">
                            <span className="title">HZ1</span>
                        </li>
                    </ul>
                </div>
            </div>
        );
    },

    handleSelectType: function(id){
        this.props.selected.type = id;
        var onChange = this.props.onChange;
        onChange && onChange( this.props.selected.type , "1" );
    }
});


module.exports = RecordType;
