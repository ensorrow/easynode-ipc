import  '../css/global.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';



let Header = React.createClass({
    render: function () {
        return (
            <div className="g-hd">
                <div className="g-doc">
                    <div className="m-bar m-bar-1">
                        <ul>
                            <li><Link to="/">ICP备案系统</Link></li>
                        </ul>
                    </div>
                    <div className="m-bar m-bar-2">
                        <ul>
                            <li>您好,陈琦</li>
                            <li><Link to="/help">备案帮助</Link></li>
                            <li><Link to="/recordlist">备案列表</Link></li>
                            <li><Link to="/exit">安全退出</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Header;