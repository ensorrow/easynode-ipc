import  content from '../css/index.css';
console.log(content);

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';


var App = React.createClass({
    render: function () {
        return (
            <div className="g-hd">
                <div className="g-doc">
                    <div className="m-bar m-bar-1">
                        <ul>
                            <li><Link to="/app">ICP备案系统</Link></li>
                            <li>您好,陈琦</li>
                            <li><Link to="/inbox">备案帮助</Link></li>
                            <li><Link to="/calendar">安全退出</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = App;