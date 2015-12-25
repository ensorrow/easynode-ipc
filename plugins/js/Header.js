import  '../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';



class Header  extends React.Component{

    constructor(props,context){
        super(props,context);
        this.logOut = this.logOut.bind(this);
    }

    logOut(){
        alert('log out');
    }

    render() {
        return (
            <div className="g-top">
                <div className="g-topc">
                    <a className="m-logo" href="./index.html"><img src="../assets/logo.png" /><span>ICP备案系统</span></a>
                    <ul className="m-navbar f-fr">
                        <li><Link to="/help">备案帮助</Link></li>
                        <li><Link to="/recordlist">备案列表</Link></li>
                        <li><Link to="/exit">您好,陈琦,安全退出</Link></li>
                    </ul>
                </div>
            </div>
        );
    }
};

module.exports = Header;