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
var Checkbox = ReactUI.Checkbox;

let ViewPhoto = React.createClass({
    propTypes:{
        url: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function(){

    },
    handleClose: function(){
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
        console.log("handleClose");
    },
    render: function () {
        return (
            <div className="m-viewphoto">
                <img className="m-viewphoto-view" src={this.props.url}></img>
                <img className="m-viewphoto-close" src="../assets/close.png" onClick={this.handleClose}></img>
            </div>
        );
    }
});


module.exports = ViewPhoto;