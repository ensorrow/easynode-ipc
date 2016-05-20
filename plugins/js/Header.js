import auth from './utils/auth';
import '../css/index.css';
import React from 'react';
import { Link } from 'react-router';
var _g = window._g;

class Header extends React.Component {

    constructor (props, context) {
        super(props, context);
    }


    loggedIn () {
        var userName = _g.user ? _g.user.username : '';
        if(auth.loggedIn()) {
            return <ul className="m-navbar f-fr">
                <li><Link to="/help"><img src={_g.surl + 'help.png'}/><span className="help">备案帮助</span></Link></li>
                <li><Link to="/recordlist">备案列表</Link></li>
                <li><Link to="/exit">您好,[{ userName }],安全退出</Link></li>
            </ul>;
        }else{
            return <div></div>;
        }
    }

    render () {
        return (
            <div className="g-hd">
                <a className="m-logo" href="#"><img src={_g.surl + 'logo.png'}/><span>ICP备案系统</span></a>
                { this.loggedIn() }
            </div>
        );
    }
}


module.exports = Header;


