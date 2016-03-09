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

    },
    handleClose: function(){
        var onHidden = this.props.onHidden;
        onHidden && onHidden();
        console.log("handleClose");
    },
    handleDoubleClick: function(){
        this.handleClose();
    },
    render: function () {
        return (
            <div className="m-viewphoto">
                <img className="m-viewphoto-view" src={this.props.url} onDoubleClick={this.handleDoubleClick}></img>
                <img className="m-viewphoto-close" src="../assets/close.png" onClick={this.handleClose}></img>
            </div>
        );
    }
});


module.exports = ViewPhoto;