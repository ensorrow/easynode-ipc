/**
 * Created by hujiabao on 1/28/16.
 */
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

let messageContainer = null;
let message = '';

let Toast = React.createClass({

    propTypes:{
        className: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired
    },

    show
    render: function () {
        return (
            <div className={this.props.className}>
                {this.props.message}
            </div>
        );
    }
});

Toast.show = function(msg){
    createContainer();
    message = msg;

    renderContent();
}

function  createContainer(){
    messageContainer = document.createElement('div');
    document.body.appendChild(messageContainer);
}

function renderContent(){
    ReactDOM.render(<Message message={message} />, messageContainer);
}

module.exports = Toast;