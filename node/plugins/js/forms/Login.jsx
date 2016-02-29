import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

var LOGINTYPE_CLOUND = '0';
var LOGINTYPE_URL = '1';

let Login = React.createClass({

    getInitialState: function() {
        return {loginType:LOGINTYPE_CLOUND,accountName:'',password:''};
    },
    handleAccountnameChange: function(e){
        this.setState({accountName: e.target.value});
    },
    handlePasswordChange: function(e){
        this.setState({password: e.target.value});
    },
    handleSubmit: function(e){
        e.preventDefault();
        var accountName = this.state.accountName.trim();
        var password = this.state.password.trim();

        //验证输入
        if( !accountName || !password ){
            return false;
        }
        //TODO: send request to the server
        //this.setState({accountName:'',password:''});
    },
    render: function () {

        var accouttip = '';
        var passwordtip = '';
        if( __globals__.user &&  __globals__.user.hasOwnProperty('resCode') &&   __globals__.user.resCode != 1005 ){
            accouttip = <label> { __globals__.user.resReason } </label>;
        }
        if( __globals__.user &&  __globals__.user.hasOwnProperty('resCode') && __globals__.user.resCode == 1005 ){
            passwordtip = <label> { __globals__.user.resReason } </label>;
        }
        return (
            <div className="m-login">
                <form method="POST" action="https://auth.c.163.com/rest/login/callback">
                    <input type="hidden" name="service" value="NCE"/>
                    <input type="hidden" name="loginType" value={this.state.loginType}/>
                    <input type="hidden" name="errorCallback" value={__globals__.loginCallback.error}/>
                    <input type="hidden" name="callback" value={__globals__.loginCallback.success}/>
                    <input type="hidden" name="autoLogin" value="true"/>
                    <div className="m-login-hd">
                        <label>账号登录</label>
                    </div>
                    <div className="m-login-bd">
                        <ul className="login-type">
                            <li className={this.state.loginType  == LOGINTYPE_CLOUND ? 'active': ''}  onClick={this.switchAccount}>网易云账号</li>
                            <li className={this.state.loginType == LOGINTYPE_URL ? 'active': ''} onClick={this.switchAccount}>网易通行证</li>
                        </ul>

                        <input type="text" name="userName" placeholder={this.state.loginType == LOGINTYPE_CLOUND? "账号/手机/邮箱":"邮箱"} value={this.state.accountName} onChange={this.handleAccountnameChange}/>
                        {accouttip}
                        <input type="password" name="password" placeholder="密码" value={this.state.password} onChange={this.handlePasswordChange}/>
                        {passwordtip}
                        <input type="submit" className="u-commit" value="登陆"/>
                    </div>
                </form>
            </div>
        );
    },

    loggin:function(){
    },

    switchAccount: function(){
        this.setState({
            loginType: this.state.loginType == '0' ? '1' : '0'
        });
    }

});



module.exports = Login;
