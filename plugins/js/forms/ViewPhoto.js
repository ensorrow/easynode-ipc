import  '../../css/index.css';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute } from 'react-router';

let ViewPhoto = React.createClass({
    propTypes:{
        url: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function(){
        "use strict";
        document.body.style.overflow = "hidden";
    },
    handleClose: function(){
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
        document.body.style.overflow = "scroll";
        console.log("handleClose");
    },
    handleDoubleClick: function(){
        this.handleClose();
    },
    render: function () {
        return (
            <div className="m-viewphoto-modal">
                <div className="m-viewphoto-mask">
                </div>
                <div className="m-viewphoto-dialog">
                    <img src={this.props.url} onDoubleClick={this.handleDoubleClick}></img>
                </div>
                <a className="m-viewphoto-close">
                    <img src={__globals__.surl +"close2.png"} alt="Icon shot x light" onClick={this.handleClose}></img>
                </a>
            </div>
        );
    }
});

module.exports = ViewPhoto;