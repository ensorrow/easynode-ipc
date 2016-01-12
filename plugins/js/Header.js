import auth from './utils/auth';

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


    loggedIn(){
        if(auth.loggedIn()){
            return <ul className="m-navbar f-fr">
                <li><Link to="/help"><img src="../assets/help.png"/><span className="help">备案帮助</span></Link></li>
                <li><Link to="/recordlist">备案列表</Link></li>
                <li><Link to="/exit">您好,{ __globals__.user.userName },安全退出</Link></li>
            </ul>;
        }else{
            return <div></div>;
        }
    }

    render() {
        return (
            <div className="g-hd">
                <a className="m-logo" href="./index.html"><img src="../assets/logo.png" /><span>ICP备案系统</span></a>
                { this.loggedIn() }
            </div>
        );
    }
};


module.exports = Header;
